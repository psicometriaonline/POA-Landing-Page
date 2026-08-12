import { z } from "zod";

/** Planos vendidos na página /planos. */
export const PLAN_IDS = ["master", "pro", "premium"] as const;
export type PlanId = (typeof PLAN_IDS)[number];

/** Periodicidade selecionada no toggle da página /planos. */
export const BILLING_PERIODS = ["mensal", "anual"] as const;
export type BillingPeriod = (typeof BILLING_PERIODS)[number];

/**
 * Tags criadas no Active Campaign a cada lead capturado, uma por combinação
 * de plano + periodicidade.
 */
export const LEAD_TAGS: Record<PlanId, Record<BillingPeriod, string>> = {
  master: { mensal: "Lead-Master-Mensal", anual: "Lead-Master-Anual" },
  pro: { mensal: "Lead-Pro-Mensal", anual: "Lead-Pro-Anual" },
  premium: { mensal: "Lead-Premium-Mensal", anual: "Lead-Premium-Anual" },
};

export function leadTagFor(plan: PlanId, billing: BillingPeriod): string {
  return LEAD_TAGS[plan][billing];
}

/** Dígitos do número, sem o código do país e sem máscara. */
const nationalNumber = z
  .string()
  .transform((value) => value.replace(/\D/g, ""))
  .pipe(
    z
      .string()
      .min(6, "Telefone incompleto")
      .max(15, "Telefone inválido"),
  );

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo")
    .max(120, "Nome muito longo"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("E-mail inválido")
    .max(160, "E-mail muito longo"),
  /** Código do país em dígitos, sem o "+". Ex.: "55" para o Brasil. */
  countryCode: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .pipe(z.string().min(1, "Selecione o país").max(4, "Código inválido")),
  phone: nationalNumber,
  plan: z.enum(PLAN_IDS),
  billing: z.enum(BILLING_PERIODS),
  /**
   * Campo armadilha: preenchido apenas por bots. Aceito na validação de
   * propósito — quem trata é a rota, que responde como sucesso sem gravar nada.
   */
  website: z.string().max(200).optional(),
  utm: z.record(z.string().max(200)).optional(),
  pageUrl: z.string().max(500).optional(),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;
