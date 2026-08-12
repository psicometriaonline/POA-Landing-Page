import type { Express } from "express";
import { createServer, type Server } from "http";
import { leadSchema, leadTagFor } from "@shared/lead-schema";
import * as activeCampaign from "./activecampaign";
import * as leadStore from "./lead-store";
import { rateLimit } from "./rate-limit";
import { log } from "./log";

/**
 * Tempo máximo que a requisição espera pelas integrações. Estourado o prazo, a
 * resposta sai assim mesmo e o trabalho continua em segundo plano: o lead nunca
 * fica preso esperando o CRM para chegar ao checkout.
 */
const INTEGRATION_BUDGET_MS = 4000;

/** Oculta o e-mail nos logs — só o suficiente para identificar um registro. */
function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain) return "***";
  return `${user.slice(0, 2)}***@${domain}`;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const missing = activeCampaign.missingConfig();
  if (missing.length > 0) {
    log(
      `Active Campaign incompleto, leads não serão sincronizados. Faltando: ${missing.join(", ")}`,
      "leads",
    );
  }
  if (!leadStore.isEnabled()) {
    log("DATABASE_URL ausente: leads não serão gravados localmente.", "leads");
  }

  app.post(
    "/api/leads",
    rateLimit({ windowMs: 60_000, max: 10 }),
    async (req, res) => {
      const parsed = leadSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          message: "Dados inválidos.",
          errors: parsed.error.flatten().fieldErrors,
        });
      }

      const lead = parsed.data;

      // Campo armadilha preenchido: é bot. Responde como sucesso para não
      // entregar o mecanismo, mas não grava nem sincroniza nada.
      if (lead.website) {
        return res.json({ ok: true });
      }

      const work = (async () => {
        let leadId: string | null = null;

        try {
          leadId = await leadStore.saveLead({
            name: lead.name,
            email: lead.email,
            countryCode: lead.countryCode,
            phone: lead.phone,
            plan: lead.plan,
            billing: lead.billing,
            tag: leadTagFor(lead.plan, lead.billing),
            utm: lead.utm ?? null,
            pageUrl: lead.pageUrl ?? null,
          });
        } catch (error) {
          log(`falha ao gravar lead localmente: ${error}`, "leads");
        }

        if (!activeCampaign.isConfigured()) return;

        try {
          await activeCampaign.registerLead(lead);
          if (leadId) await leadStore.markCrmStatus(leadId, "ok");
        } catch (error) {
          log(
            `falha ao sincronizar ${maskEmail(lead.email)} com o Active Campaign: ${error}`,
            "leads",
          );
          if (leadId) {
            await leadStore
              .markCrmStatus(leadId, "error")
              .catch(() => undefined);
          }
        }
      })();

      // O trabalho segue mesmo se estourar o orçamento de tempo.
      work.catch((error) => log(`erro inesperado no lead: ${error}`, "leads"));

      await Promise.race([
        work,
        new Promise((resolve) => setTimeout(resolve, INTEGRATION_BUDGET_MS)),
      ]);

      return res.json({ ok: true });
    },
  );

  return httpServer;
}
