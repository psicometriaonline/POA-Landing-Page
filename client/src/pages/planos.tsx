import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X as XIcon, ArrowRight, Plus, Minus } from "lucide-react";

type BillingPeriod = "mensal" | "anual";

interface PlanHeader {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  yearlyTotal: number;
  badge?: string;
  cta: string;
}

const planHeaders: PlanHeader[] = [
  {
    id: "master",
    name: "Master",
    monthlyPrice: 75.90,
    yearlyPrice: 58.08,
    yearlyTotal: 697.00,
    cta: "Assinar Master",
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 109.90,
    yearlyPrice: 83.08,
    yearlyTotal: 997.00,
    badge: "Mais acessado",
    cta: "Assinar Pro",
  },
  {
    id: "premium",
    name: "Premium",
    monthlyPrice: 169.90,
    yearlyPrice: 124.75,
    yearlyTotal: 1497.00,
    cta: "Assinar Premium",
  },
];

type CellValue = boolean | string;

interface FeatureRow {
  label: string;
  sub?: string;
  values: [CellValue, CellValue, CellValue];
}

interface CategoryGroup {
  category: string;
  rows: FeatureRow[];
}

const featureTable: CategoryGroup[] = [
  {
    category: "Formações",
    rows: [
      { label: "Formação Básica em Pesquisa Científica", values: [true, true, true] },
      { label: "Formação Avançada em Psicometria Análise de Dados", sub: "Modelos Mistos, Metanálise, Psicometria, Dados Textuais e Estudos Epidemiológicos", values: [false, true, true] },
      { label: "Formação Completa em Análise de Dados com R", values: [false, true, true] },
    ],
  },
  {
    category: "Formações Especiais",
    rows: [
      { label: "Curso de Preparação para Concursos", values: [false, false, true] },
      { label: "Formação Viver de Análise de Dados", values: [false, false, true] },
      { label: "Inteligência Artificial Aplicada a Pesquisas Científicas", values: [false, false, true] },
    ],
  },
  {
    category: "Ferramentas Estatísticas",
    rows: [
      { label: "Calculadora de Tamanho Amostral", values: [true, true, true] },
      { label: "Calculadora de Tamanho de Efeito", values: [true, true, true] },
      { label: "Classificador de Análises Estatísticas", values: [true, true, true] },
      { label: "Gerador de Sintaxe em R", values: [true, true, true] },
    ],
  },
  {
    category: "Recursos Didáticos",
    rows: [
      { label: "Biblioteca Eletrônica", values: [true, true, true] },
      { label: "Glossário Acadêmico", values: [true, true, true] },
      { label: "Livros Metodológicos", values: [true, true, true] },
      { label: "Certificados de conclusão", values: [true, true, true] },
    ],
  },
  {
    category: "Suporte",
    rows: [
      { label: "Chatbot", values: [true, true, true] },
      { label: "Comunidade de alunos", values: [true, true, true] },
      { label: "Suporte por email", values: [false, true, true] },
      { label: "Suporte direto pela plataforma", values: [false, true, true] },
    ],
  },
  {
    category: "Inteligência Artificial",
    rows: [
      { label: "Tokens incluídos por mês", values: ["100.000", "300.000", "500.000"] },
    ],
  },
];

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

function CellIcon({ value }: { value: CellValue }) {
  if (typeof value === "string") {
    return <span className="font-bold text-[#0A2E76] text-sm">{value}</span>;
  }
  if (value) {
    return (
      <div className="w-6 h-6 rounded-full bg-[#0050CC]/10 flex items-center justify-center mx-auto">
        <Check className="w-3.5 h-3.5 text-[#0050CC]" />
      </div>
    );
  }
  return (
    <div className="w-6 h-6 rounded-full bg-[#F34266]/10 flex items-center justify-center mx-auto">
      <XIcon className="w-3.5 h-3.5 text-[#F34266]" />
    </div>
  );
}

function MobileAccordion({ billing }: { billing: BillingPeriod }) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="md:hidden">
      <div className="sticky top-[88px] z-30" style={{ backgroundColor: "#F4F5F7" }}>
        <div className="bg-white rounded-t-2xl border border-[#E2E5EA] shadow-sm">
          <div className="grid grid-cols-3 divide-x divide-[#E2E5EA]">
            {planHeaders.map((plan) => {
              const price = billing === "mensal" ? plan.monthlyPrice : plan.yearlyPrice;
              return (
                <div key={plan.id} className="p-3 text-center relative" data-testid={`mobile-th-${plan.id}`}>
                  {plan.badge && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 inline-block px-3 py-1 rounded-t-lg text-[8px] font-bold uppercase tracking-wider bg-[#0A2E76] text-white whitespace-nowrap">
                      {plan.badge}
                    </span>
                  )}
                  <div className="font-heading font-bold text-sm text-[#0A2E76]">{plan.name}</div>
                  <div className="text-lg font-heading font-bold text-[#0A2E76] mt-0.5">
                    {formatPrice(price)}
                    <span className="text-[10px] font-normal text-[hsl(215,15%,55%)]">/mês</span>
                  </div>
                  {billing === "anual" && (
                    <p className="text-[9px] text-[#0065FF] font-semibold mt-0.5">
                      -{Math.round(((plan.monthlyPrice * 12 - plan.yearlyTotal) / (plan.monthlyPrice * 12)) * 100)}% ({formatPrice(plan.yearlyTotal)}/ano)
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-b-2xl border-x border-b border-[#E2E5EA] shadow-sm">
        {featureTable.map((group, gi) => (
          <div key={gi}>
            <button
              onClick={() => toggle(gi)}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#0A2E76]/[0.06]"
              data-testid={`mobile-toggle-${gi}`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A2E76]">
                {group.category}
              </span>
              {expanded[gi] ? (
                <Minus className="w-4 h-4 text-[#0A2E76]" />
              ) : (
                <Plus className="w-4 h-4 text-[#0A2E76]" />
              )}
            </button>
            <AnimatePresence>
              {expanded[gi] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  {group.rows.map((row, ri) => (
                    <div
                      key={ri}
                      className={`border-b border-[#F4F5F7] ${ri % 2 === 1 ? "bg-[#FAFBFC]" : ""}`}
                    >
                      <div className="px-4 py-2.5">
                        <span className="text-xs text-[hsl(215,15%,30%)]">{row.label}</span>
                        {row.sub && (
                          <span className="block text-[10px] text-[hsl(215,15%,55%)] mt-0.5">{row.sub}</span>
                        )}
                      </div>
                      <div className="grid grid-cols-3 pb-3">
                        {row.values.map((val, vi) => (
                          <div key={vi} className="flex justify-center">
                            <CellIcon value={val} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        <div className="grid grid-cols-3 gap-2 p-3 border-t-2 border-[#E2E5EA]">
          {planHeaders.map((plan) => (
            <a
              key={plan.id}
              href="https://psicometriaonline.com.br/academy/"
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`mobile-cta-${plan.id}`}
            >
              <Button
                className="w-full bg-[#0065FF] text-white font-semibold hover:bg-[#0050CC] text-[11px] px-2"
              >
                Assinar
              </Button>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopTable({ billing }: { billing: BillingPeriod }) {
  return (
    <div className="hidden md:block relative">
      <div className="sticky top-[96px] z-30" style={{ backgroundColor: "#F4F5F7" }}>
        <div className="flex" style={{ paddingLeft: "40%" }}>
          {planHeaders.map((plan) => (
            <div key={plan.id} className="flex-1 flex justify-center">
              {plan.badge && (
                <span
                  className="inline-block px-5 py-2 rounded-t-lg text-[11px] font-bold uppercase tracking-wider bg-[#0A2E76] text-white"
                  data-testid={`badge-plan-${plan.id}`}
                >
                  {plan.badge}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="flex border border-[#E2E5EA] bg-white rounded-t-2xl shadow-sm">
          <div className="w-[40%] flex items-center p-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(215,15%,55%)]">
              Recursos
            </span>
          </div>
          {planHeaders.map((plan) => {
            const price = billing === "mensal" ? plan.monthlyPrice : plan.yearlyPrice;
            return (
              <div key={plan.id} className="w-[20%] p-5 text-center" data-testid={`th-plan-${plan.id}`}>
                <div className="font-heading font-bold text-lg text-[#0A2E76]">{plan.name}</div>
                <div className="text-2xl font-heading font-bold text-[#0A2E76] mt-1">
                  {formatPrice(price)}
                  <span className="text-xs font-normal text-[hsl(215,15%,55%)]">/mês</span>
                </div>
                {billing === "anual" && (
                  <p className="text-[11px] text-[#0065FF] font-semibold mt-1">
                    -{Math.round(((plan.monthlyPrice * 12 - plan.yearlyTotal) / (plan.monthlyPrice * 12)) * 100)}% &mdash; {formatPrice(plan.yearlyTotal)}/ano
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-white rounded-b-2xl border-x border-b border-[#E2E5EA] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[640px]" data-testid="table-plans">
            <tbody>
              {featureTable.map((group, gi) => (
                <>
                  <tr key={`cat-${gi}`} className="bg-[#0A2E76]/[0.06]">
                    <td colSpan={4} className="px-5 py-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0A2E76]">
                        {group.category}
                      </span>
                    </td>
                  </tr>
                  {group.rows.map((row, ri) => (
                    <tr
                      key={`row-${gi}-${ri}`}
                      className={`border-b border-[#F4F5F7] ${ri % 2 === 1 ? "bg-[#FAFBFC]" : ""}`}
                    >
                      <td className="px-5 py-3.5 text-sm text-[hsl(215,15%,30%)] w-[40%]">
                        {row.label}
                        {row.sub && (
                          <span className="block text-xs text-[hsl(215,15%,55%)] mt-0.5">{row.sub}</span>
                        )}
                      </td>
                      {row.values.map((val, vi) => (
                        <td key={vi} className="px-5 py-3.5 text-center w-[20%]">
                          <CellIcon value={val} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
              <tr className="border-t-2 border-[#E2E5EA]">
                <td className="p-5" />
                {planHeaders.map((plan) => (
                  <td key={plan.id} className="p-5 text-center">
                    <a
                      href="https://psicometriaonline.com.br/academy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`button-plan-cta-${plan.id}`}
                    >
                      <Button
                        className="w-full bg-[#0065FF] text-white font-semibold hover:bg-[#0050CC] gap-2"
                      >
                        {plan.cta}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Planos() {
  const [billing, setBilling] = useState<BillingPeriod>("anual");

  return (
    <main data-testid="page-planos" className="min-h-screen" style={{ backgroundColor: "#F4F5F7" }}>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0A2E76 0%, #001A4D 50%, #0A2E76 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, #0065FF 1px, transparent 1px), radial-gradient(circle at 80% 20%, #0065FF 1px, transparent 1px), radial-gradient(circle at 50% 80%, #0065FF 1px, transparent 1px)",
            backgroundSize: "60px 60px, 80px 80px, 70px 70px",
          }}
        />

        <div className="relative pt-32 md:pt-40 pb-16 md:pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-5"
                data-testid="text-planos-title"
              >
                Impulsione a sua carreira{" "}
                <span className="text-[#4D9FFF]">acadêmica</span>
              </h1>
              <p
                className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed mb-3"
                data-testid="text-planos-subtitle"
              >
                Acesse gratuitamente por 14 dias a maior plataforma de pesquisa quantitativa da América Latina.
              </p>
              <p
                className="text-sm text-white/50 tracking-wide mb-8"
                data-testid="text-planos-pillars"
              >
                Ferramentas Estatísticas &bull; Cursos de Análise de Dados &bull; Suporte
              </p>

              <a
                href="https://psicometriaonline.com.br/academy/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-hero-signup"
              >
                <Button
                  className="bg-[#0065FF] text-white font-semibold rounded-full px-10 py-6 text-base hover:bg-[#0050CC] shadow-lg shadow-[#0065FF]/30"
                >
                  Cadastre-se Gratuitamente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>

              <div className="mt-5">
                <p
                  className="text-[13px] text-white/55"
                  data-testid="text-free-trial-line1"
                >
                  Nenhum cartão de crédito requerido.
                </p>
                <p
                  className="text-[13px] text-white/45 mt-0.5"
                  data-testid="text-free-trial-line2"
                >
                  Experimente todos os recursos antes de escolher seu plano.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pt-16 md:pt-20 pb-20 md:pb-28" style={{ backgroundColor: "#F4F5F7" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#0A2E76] mb-4"
              data-testid="text-planos-pricing-title"
            >
              Planos e Preços
            </h2>
            <p className="text-base text-[hsl(215,15%,45%)] max-w-2xl mx-auto leading-relaxed mb-8">
              Comece com acesso completo por 14 dias e escolha o plano que acompanhará o seu ritmo de crescimento.
            </p>

            <div className="flex justify-center">
              <div
                className="inline-flex items-center p-1 rounded-full bg-[#0A2E76]/5 border border-[#0A2E76]/10"
                data-testid="toggle-billing"
              >
                <button
                  onClick={() => setBilling("mensal")}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    billing === "mensal"
                      ? "bg-[#0A2E76] text-white shadow-md"
                      : "text-[#0A2E76]/60 hover:text-[#0A2E76]"
                  }`}
                  data-testid="button-billing-mensal"
                >
                  Mensal
                </button>
                <button
                  onClick={() => setBilling("anual")}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 relative ${
                    billing === "anual"
                      ? "bg-[#0A2E76] text-white shadow-md"
                      : "text-[#0A2E76]/60 hover:text-[#0A2E76]"
                  }`}
                  data-testid="button-billing-anual"
                >
                  Anual
                  <span className="absolute -top-2.5 -right-6 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-green-500 text-white leading-none whitespace-nowrap">
                    até -27%
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <DesktopTable billing={billing} />
            <MobileAccordion billing={billing} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-white rounded-2xl border border-[#E2E5EA] p-8 md:p-12 max-w-3xl mx-auto">
              <h3
                className="text-xl font-heading font-bold text-[#0A2E76] mb-3"
                data-testid="text-planos-guarantee-title"
              >
                Satisfação Garantida
              </h3>
              <p className="text-sm text-[hsl(215,15%,45%)] leading-relaxed max-w-lg mx-auto mb-2">
                Todos os planos contam com <span className="font-semibold text-[#0A2E76]">7 dias de garantia incondicional</span>.
                Se não ficar satisfeito, devolvemos 100% do seu investimento.
              </p>
              <p className="text-xs text-[hsl(215,15%,55%)]">
                Cancele a qualquer momento, sem burocracia.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
