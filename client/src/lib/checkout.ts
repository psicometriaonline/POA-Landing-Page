import type { BillingPeriod, PlanId } from "@shared/lead-schema";

const CHECKOUT_BASE = "https://pay.hotmart.com/K70625495G";

/** Código da oferta Hotmart para cada plano em cada periodicidade. */
const CHECKOUT_OFFERS: Record<PlanId, Record<BillingPeriod, string>> = {
  master: { mensal: "qo0nxh5o", anual: "0jqbbxpi" },
  pro: { mensal: "sagl0t2g", anual: "xt6tt3j3" },
  premium: { mensal: "h5p99vuc", anual: "o16u9wgw" },
};

export interface CountryOption {
  /** ISO 3166-1 alpha-2, usado só como chave do select. */
  iso: string;
  /** Código telefônico do país, em dígitos e sem o "+". */
  dial: string;
  flag: string;
  label: string;
}

/**
 * Países de origem mais frequentes dos alunos. O Brasil vem primeiro por ser o
 * padrão; os demais seguem em ordem alfabética.
 */
export const COUNTRIES: CountryOption[] = [
  { iso: "BR", dial: "55", flag: "🇧🇷", label: "Brasil" },
  { iso: "AO", dial: "244", flag: "🇦🇴", label: "Angola" },
  { iso: "AR", dial: "54", flag: "🇦🇷", label: "Argentina" },
  { iso: "CL", dial: "56", flag: "🇨🇱", label: "Chile" },
  { iso: "CO", dial: "57", flag: "🇨🇴", label: "Colômbia" },
  { iso: "ES", dial: "34", flag: "🇪🇸", label: "Espanha" },
  { iso: "US", dial: "1", flag: "🇺🇸", label: "Estados Unidos" },
  { iso: "FR", dial: "33", flag: "🇫🇷", label: "França" },
  { iso: "IT", dial: "39", flag: "🇮🇹", label: "Itália" },
  { iso: "MX", dial: "52", flag: "🇲🇽", label: "México" },
  { iso: "MZ", dial: "258", flag: "🇲🇿", label: "Moçambique" },
  { iso: "PY", dial: "595", flag: "🇵🇾", label: "Paraguai" },
  { iso: "PE", dial: "51", flag: "🇵🇪", label: "Peru" },
  { iso: "PT", dial: "351", flag: "🇵🇹", label: "Portugal" },
  { iso: "GB", dial: "44", flag: "🇬🇧", label: "Reino Unido" },
  { iso: "UY", dial: "598", flag: "🇺🇾", label: "Uruguai" },
];

export const DEFAULT_COUNTRY = COUNTRIES[0];

export interface CheckoutBuyer {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
}

/**
 * Separa DDD e número de um telefone brasileiro (10 ou 11 dígitos).
 * Retorna null quando não há dígitos suficientes para um DDD válido.
 */
export function splitBrazilianPhone(
  digits: string,
): { areaCode: string; number: string } | null {
  const clean = digits.replace(/\D/g, "");
  if (clean.length < 10 || clean.length > 11) return null;
  return { areaCode: clean.slice(0, 2), number: clean.slice(2) };
}

/** Máscara progressiva (00) 0000-0000 / (00) 00000-0000 para números do Brasil. */
export function formatBrazilianPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/**
 * Monta a URL do checkout da Hotmart já pré-populada com os dados do lead.
 *
 * A Hotmart aceita `name`, `email`, `phoneac` (DDD) e `phonenumber`. Não há
 * parâmetro documentado para o código do país: o checkout deduz o DDI pela
 * localização do comprador. Por isso o telefone só é enviado para números do
 * Brasil — em qualquer outro país o número seria interpretado sob um DDI
 * errado, e é preferível deixar o campo vazio a preenchê-lo incorretamente.
 * Nome e e-mail continuam sendo pré-populados em todos os casos.
 */
export function buildCheckoutUrl(
  plan: PlanId,
  billing: BillingPeriod,
  buyer?: CheckoutBuyer,
): string {
  const params: Array<[string, string]> = [];

  const off = CHECKOUT_OFFERS[plan]?.[billing];
  if (off) params.push(["off", off]);

  if (buyer) {
    params.push(["name", buyer.name], ["email", buyer.email]);

    if (buyer.countryCode === DEFAULT_COUNTRY.dial) {
      const parts = splitBrazilianPhone(buyer.phone);
      if (parts) {
        params.push(
          ["phoneac", parts.areaCode],
          ["phonenumber", parts.number],
        );
      }
    }
  }

  const src = originSrc();
  if (src) params.push(["src", src]);
  params.push(["sck", `popup-${plan}-${billing}`]);

  // encodeURIComponent em vez de URLSearchParams: este último codifica espaço
  // como "+", e o checkout precisa receber "%20" para não exibir o sinal.
  const query = params
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  return `${CHECKOUT_BASE}?${query}`;
}

/** Repassa a origem do tráfego (src ou utm_source) para o checkout. */
function originSrc(): string | null {
  if (typeof window === "undefined") return null;
  const current = new URLSearchParams(window.location.search);
  return current.get("src") ?? current.get("utm_source");
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/** Coleta os parâmetros UTM da URL atual para enviar junto do lead. */
export function collectUtm(): Record<string, string> | undefined {
  if (typeof window === "undefined") return undefined;
  const current = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = current.get(key);
    if (value) utm[key] = value.slice(0, 200);
  }
  return Object.keys(utm).length > 0 ? utm : undefined;
}
