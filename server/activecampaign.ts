import type { Lead } from "@shared/lead-schema";
import { leadTagFor } from "@shared/lead-schema";

/**
 * Integração com a API v3 do Active Campaign.
 *
 * Todas as chamadas passam por uma fila serializada: a conta tem limite de
 * 5 requisições por segundo e o endpoint de leads pode receber rajadas.
 */

const API_URL = (process.env.ACTIVECAMPAIGN_API_URL ?? "").replace(/\/+$/, "");
const API_KEY = process.env.ACTIVECAMPAIGN_API_KEY ?? "";
const LIST_ID = process.env.ACTIVECAMPAIGN_LIST_ID ?? "";

/** Intervalo mínimo entre chamadas, com folga sobre o limite de 5 req/s. */
const MIN_INTERVAL_MS = 220;
const REQUEST_TIMEOUT_MS = 5000;
const MAX_ATTEMPTS = 3;

export function isConfigured(): boolean {
  return API_URL !== "" && API_KEY !== "";
}

/** Descreve o que faltou configurar, para o log de inicialização. */
export function missingConfig(): string[] {
  const missing: string[] = [];
  if (!API_URL) missing.push("ACTIVECAMPAIGN_API_URL");
  if (!API_KEY) missing.push("ACTIVECAMPAIGN_API_KEY");
  if (!LIST_ID) missing.push("ACTIVECAMPAIGN_LIST_ID");
  return missing;
}

let queue: Promise<unknown> = Promise.resolve();

/** Enfileira uma chamada respeitando o intervalo mínimo entre requisições. */
function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const result = queue.then(task, task);
  queue = result.then(
    () => sleep(MIN_INTERVAL_MS),
    () => sleep(MIN_INTERVAL_MS),
  );
  return result;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class ActiveCampaignError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "ActiveCampaignError";
  }
}

async function request<T>(
  method: "GET" | "POST",
  path: string,
  body?: unknown,
): Promise<T> {
  return enqueue(async () => {
    let lastError: unknown;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      try {
        const res = await fetch(`${API_URL}/api/3${path}`, {
          method,
          headers: {
            "Api-Token": API_KEY,
            Accept: "application/json",
            ...(body ? { "Content-Type": "application/json" } : {}),
          },
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });

        // 429/503 são as respostas do rate limit da conta: vale tentar de novo.
        if (res.status === 429 || res.status === 503) {
          throw new ActiveCampaignError(
            `rate limit (${res.status})`,
            res.status,
          );
        }

        if (!res.ok) {
          const detail = (await res.text()).slice(0, 300);
          throw new ActiveCampaignError(
            `${method} ${path} falhou: ${res.status} ${detail}`,
            res.status,
          );
        }

        return (await res.json()) as T;
      } catch (error) {
        lastError = error;

        const retriable =
          error instanceof ActiveCampaignError
            ? error.status === 429 || error.status === 503
            : true; // abort/rede

        if (!retriable || attempt === MAX_ATTEMPTS) break;
        await sleep(300 * attempt);
      } finally {
        clearTimeout(timer);
      }
    }

    throw lastError;
  });
}

interface ContactResponse {
  contact?: { id?: string };
}

interface TagsResponse {
  tags?: Array<{ id?: string; tag?: string }>;
}

/** Cache de IDs de tag: os nomes são fixos, então basta resolver uma vez. */
const tagIdCache = new Map<string, string>();

/** Cria ou atualiza o contato pelo e-mail e devolve o ID. */
async function syncContact(lead: Lead): Promise<string> {
  const [firstName, ...rest] = lead.name.split(/\s+/);

  const data = await request<ContactResponse>("POST", "/contact/sync", {
    contact: {
      email: lead.email,
      firstName,
      lastName: rest.join(" "),
      phone: `+${lead.countryCode}${lead.phone}`,
    },
  });

  const id = data.contact?.id;
  if (!id) throw new ActiveCampaignError("contact/sync não retornou um id");
  return id;
}

/** Inscreve o contato na lista configurada (status 1 = ativo). */
async function addToList(contactId: string): Promise<void> {
  if (!LIST_ID) return;

  await request("POST", "/contactLists", {
    contactList: { list: LIST_ID, contact: contactId, status: 1 },
  });
}

/** Resolve o ID da tag pelo nome, criando-a se ainda não existir. */
async function resolveTagId(name: string): Promise<string> {
  const cached = tagIdCache.get(name);
  if (cached) return cached;

  const found = await request<TagsResponse>(
    "GET",
    `/tags?search=${encodeURIComponent(name)}`,
  );

  // O search é uma busca parcial: só serve o nome idêntico.
  const match = found.tags?.find((tag) => tag.tag === name);
  if (match?.id) {
    tagIdCache.set(name, match.id);
    return match.id;
  }

  const created = await request<{ tag?: { id?: string } }>("POST", "/tags", {
    tag: { tag: name, tagType: "contact", description: "Lead da landing page" },
  });

  const id = created.tag?.id;
  if (!id) throw new ActiveCampaignError(`não foi possível criar a tag ${name}`);

  tagIdCache.set(name, id);
  return id;
}

async function addTag(contactId: string, tagId: string): Promise<void> {
  await request("POST", "/contactTags", {
    contactTag: { contact: contactId, tag: tagId },
  });
}

/**
 * Registra o lead no Active Campaign: cria/atualiza o contato, inscreve na
 * lista e aplica a tag correspondente ao plano e à periodicidade escolhidos.
 */
export async function registerLead(lead: Lead): Promise<void> {
  const contactId = await syncContact(lead);
  const tagId = await resolveTagId(leadTagFor(lead.plan, lead.billing));

  await addToList(contactId);
  await addTag(contactId, tagId);
}
