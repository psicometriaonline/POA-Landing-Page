import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X as XIcon, ArrowRight, Plus, Minus, ChevronDown } from "lucide-react";
import { RegistrationLink } from "@/components/ui/registration-link";

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
    cta: "Começar Grátis",
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 109.90,
    yearlyPrice: 83.08,
    yearlyTotal: 997.00,
    badge: "Mais acessado",
    cta: "Começar Grátis",
  },
  {
    id: "premium",
    name: "Premium",
    monthlyPrice: 169.90,
    yearlyPrice: 124.75,
    yearlyTotal: 1497.00,
    cta: "Começar Grátis",
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
      { label: "Formação Básica em Pesquisa Científica", sub: "Método de Pesquisa, Análise de Dados Bi e Multivariadas, Escrita Científica, Cálculo de Poder Amostral, Gerenciadores de Referências", values: [true, true, true] },
      { label: "Formação Avançada em Psicometria e Análise de Dados", sub: "Modelos Mistos, Metanálise, Psicometria, Dados Textuais e Estudos Epidemiológicos", values: [false, true, true] },
      { label: "Formação Completa em Análise de Dados com R", sub: "Linguagem, Scripts e Funções, Análises de Dados Bi e Multivariadas, Análises Psicométricas, tidyverse e ggplot2", values: [false, true, true] },
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
      { label: "Suporte direto pela plataforma", values: [false, true, true] },
      { label: "Suporte por email", values: [false, true, true] },
      { label: "Suporte Ao Vivo (Academeeting)", values: [false, true, true] },
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
                <div key={plan.id} className="p-2 text-center relative" data-testid={`mobile-th-${plan.id}`}>
                  {plan.badge && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 inline-block px-3 py-1 rounded-t-lg text-[8px] font-bold uppercase tracking-wider bg-[#0A2E76] text-white whitespace-nowrap">
                      {plan.badge}
                    </span>
                  )}
                  <div className="font-heading font-bold text-xs text-[#0A2E76]">{plan.name}</div>
                  {billing === "mensal" ? (
                    <div className="text-sm font-heading font-bold text-[#0A2E76] mt-0.5">
                      {formatPrice(plan.monthlyPrice)}
                      <span className="text-[9px] font-normal text-[hsl(215,15%,55%)]">/mês</span>
                    </div>
                  ) : (
                    <>
                      <div className="text-sm font-heading font-bold text-[#0A2E76] mt-0.5">
                        {formatPrice(plan.yearlyTotal)}
                        <span className="text-[9px] font-normal text-[hsl(215,15%,55%)]">/ano</span>
                      </div>
                      <p className="text-[8px] text-[#0065FF] font-semibold mt-0.5 leading-tight">
                        -{Math.round(((plan.monthlyPrice * 12 - plan.yearlyTotal) / (plan.monthlyPrice * 12)) * 100)}%
                      </p>
                    </>
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

        <div className="flex justify-center p-4 border-t-2 border-[#E2E5EA]">
          <RegistrationLink data-testid="mobile-cta-main">
            <Button
              className="bg-[#0065FF] text-white font-semibold hover:bg-[#0050CC] px-8"
            >
              Começar Grátis
            </Button>
          </RegistrationLink>
        </div>
      </div>
    </div>
  );
}

function DesktopTable({ billing }: { billing: BillingPeriod }) {
  return (
    <div className="hidden md:block relative bg-white rounded-2xl border border-[#E2E5EA] shadow-sm">
      <table className="w-full border-collapse table-fixed" data-testid="table-plans">
        <colgroup>
          <col className="w-[40%]" />
          <col className="w-[20%]" />
          <col className="w-[20%]" />
          <col className="w-[20%]" />
        </colgroup>
        <thead className="sticky top-[96px] z-30">
          <tr>
            <td colSpan={4} className="p-0" style={{ backgroundColor: "#F4F5F7" }}>
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
            </td>
          </tr>
          <tr className="bg-white border-b border-[#E2E5EA]">
            <th className="p-5 text-left align-middle font-normal">
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(215,15%,55%)]">
                Recursos
              </span>
            </th>
            {planHeaders.map((plan) => (
              <th key={plan.id} className="p-5 text-center align-middle font-normal" data-testid={`th-plan-${plan.id}`}>
                <div className="font-heading font-bold text-lg text-[#0A2E76]">{plan.name}</div>
                {billing === "mensal" ? (
                  <div className="text-2xl font-heading font-bold text-[#0A2E76] mt-1">
                    {formatPrice(plan.monthlyPrice)}
                    <span className="text-xs font-normal text-[hsl(215,15%,55%)]">/mês</span>
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-heading font-bold text-[#0A2E76] mt-1">
                      {formatPrice(plan.yearlyTotal)}
                      <span className="text-xs font-normal text-[hsl(215,15%,55%)]">/ano</span>
                    </div>
                    <p className="text-[11px] text-[#0065FF] font-semibold mt-1">
                      Economia de {formatPrice(plan.monthlyPrice * 12 - plan.yearlyTotal)} -{Math.round(((plan.monthlyPrice * 12 - plan.yearlyTotal) / (plan.monthlyPrice * 12)) * 100)}%
                    </p>
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
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
                  <td className="px-5 py-3.5 text-sm text-[hsl(215,15%,30%)]">
                    {row.label}
                    {row.sub && (
                      <span className="block text-xs text-[hsl(215,15%,55%)] mt-0.5">{row.sub}</span>
                    )}
                  </td>
                  {row.values.map((val, vi) => (
                    <td key={vi} className="px-5 py-3.5 text-center">
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
                <RegistrationLink data-testid={`button-plan-cta-${plan.id}`}>
                  <Button
                    className="w-full bg-[#0065FF] text-white font-semibold hover:bg-[#0050CC] gap-2"
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </RegistrationLink>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
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

              <RegistrationLink data-testid="button-hero-signup">
                <Button
                  className="bg-[#0065FF] text-white font-semibold rounded-full px-10 py-6 text-base hover:bg-[#0050CC] shadow-lg shadow-[#0065FF]/30"
                >
                  Cadastre-se Gratuitamente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </RegistrationLink>

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

        </div>
      </section>

      <DetailedBreakdown />

      <TrustCarousel />

      <section className="pb-20 md:pb-28 border-t border-[#E2E5EA]" style={{ backgroundColor: "#F4F5F7" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center pt-16 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-[1.75rem] md:text-display-sm font-heading font-bold text-[#0A2E76] mb-3"
              data-testid="text-planos-final-cta-title"
            >
              Comece a usar a Psicometria Online Academy hoje mesmo
            </h2>
            <p className="text-sm md:text-base text-[hsl(215,15%,45%)] mb-8">
              Experimente agora gratuitamente / Não é necessário cartão de crédito
            </p>
            <RegistrationLink data-testid="button-planos-final-cta">
              <Button
                className="bg-[#0065FF] text-white font-semibold rounded-full px-10 py-6 text-base hover:bg-[#0050CC] shadow-lg shadow-[#0065FF]/30 gap-2"
              >
                Começar
                <ArrowRight className="w-4 h-4" />
              </Button>
            </RegistrationLink>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

type PlanAvailability = [boolean, boolean, boolean];

interface DetailedCourse {
  name: string;
  plans: PlanAvailability;
}

interface DetailedSubcategory {
  name: string;
  courses: DetailedCourse[];
}

interface DetailedBlock {
  name: string;
  subcategories: DetailedSubcategory[];
}

const detailedCourses: DetailedBlock[] = [
  {
    name: "Formação Básica em Pesquisa Científica",
    subcategories: [
      {
        name: "Competências Essenciais",
        courses: [
          { name: "Introdução à Metodologia Científica", plans: [true, true, true] },
          { name: "Análise Bi e Multivariadas (SPSS e JASP)", plans: [true, true, true] },
          { name: "Escrita Científica de Alto Impacto", plans: [true, true, true] },
          { name: "Cálculo de Tamanho Amostral", plans: [true, true, true] },
        ],
      },
      {
        name: "Gerenciadores de Referências",
        courses: [
          { name: "Zotero", plans: [true, true, true] },
          { name: "Mendeley", plans: [true, true, true] },
          { name: "EndNote", plans: [true, true, true] },
        ],
      },
    ],
  },
  {
    name: "Formação Avançada em Psicometria e Análise de Dados",
    subcategories: [
      {
        name: "Modelos Mistos e Hierárquicos",
        courses: [
          { name: "Modelos Lineares Generalizados (GLM)", plans: [false, true, true] },
          { name: "Equações de Estimativas Generalizadas (GEE)", plans: [false, true, true] },
          { name: "Modelos Multinível", plans: [false, true, true] },
          { name: "Análise de Mediação e Moderação", plans: [false, true, true] },
        ],
      },
      {
        name: "Revisões da Literatura e Metanálise",
        courses: [
          { name: "Revisões da Literatura (Narrativa, Escopo e Sistemática)", plans: [false, true, true] },
          { name: "Metanálise", plans: [false, true, true] },
        ],
      },
      {
        name: "Análise de Dados Textuais",
        courses: [
          { name: "IRAMUTEQ", plans: [false, true, true] },
        ],
      },
      {
        name: "Psicometria Básica e Avançada",
        courses: [
          { name: "Construção, Adaptação & Validação de Instrumentos", plans: [false, true, true] },
          { name: "Análise Fatorial Exploratória e Confirmatória", plans: [false, true, true] },
          { name: "Modelagem por Equações Estruturais", plans: [false, true, true] },
          { name: "Teoria de Resposta ao Item (TRI)", plans: [false, true, true] },
          { name: "Análise de Redes: Teoria e Prática", plans: [false, true, true] },
          { name: "Análise de Classes e Perfis Latentes (LCA/LPA)", plans: [false, true, true] },
          { name: "Controle de Aquiescência", plans: [false, true, true] },
          { name: "Controle de Desejabilidade Social", plans: [false, true, true] },
          { name: "Métodos de Escolha Forçada", plans: [false, true, true] },
        ],
      },
      {
        name: "Estudos Epidemiológicos e Populacionais",
        courses: [
          { name: "Análise de Dados de Estudos Epidemiológicos", plans: [false, true, true] },
          { name: "Séries Temporais", plans: [false, true, true] },
          { name: "Pesquisa com Dados Abertos", plans: [false, true, true] },
        ],
      },
    ],
  },
  {
    name: "Formação Completa em Análise de Dados com R",
    subcategories: [
      {
        name: "Fundamentos do R",
        courses: [
          { name: "R: Linguagem, Scripts e Funções", plans: [false, true, true] },
        ],
      },
      {
        name: "Análises Estatísticas e Psicométricas",
        courses: [
          { name: "R: Análises Bi & Multivariadas", plans: [false, true, true] },
          { name: "R: Análise Fatorial e MEE", plans: [false, true, true] },
          { name: "R: Testes Não Paramétricos para Delineamentos Complexos", plans: [false, true, true] },
          { name: "R: Teoria de Resposta ao Item", plans: [false, true, true] },
        ],
      },
      {
        name: "Manipulação e Visualização de Dados",
        courses: [
          { name: "R: ggplot2", plans: [false, true, true] },
          { name: "R: Tidyverse", plans: [false, true, true] },
        ],
      },
    ],
  },
  {
    name: "Inteligência Artificial Aplicada a Pesquisas Científicas",
    subcategories: [
      {
        name: "Machine Learning e IA",
        courses: [
          { name: "Machine Learning Aplicado à Pesquisa Científica", plans: [false, false, true] },
          { name: "Processamento de Linguagem Natural", plans: [false, false, true] },
          { name: "Probabilistic Graph Models", plans: [false, false, true] },
          { name: "Redes Neurais Artificiais", plans: [false, false, true] },
        ],
      },
    ],
  },
  {
    name: "Desenvolvimento Profissional",
    subcategories: [
      {
        name: "Carreira Acadêmica e Mercado",
        courses: [
          { name: "Curso de Preparação para Concursos", plans: [false, false, true] },
          { name: "Viver de Análise de Dados", plans: [false, false, true] },
        ],
      },
    ],
  },
];

interface DetailedResourceRow {
  name: string;
  plans: PlanAvailability | [string, string, string];
}

interface DetailedResourceGroup {
  category: string;
  rows: DetailedResourceRow[];
}

const detailedResources: DetailedResourceGroup[] = [
  {
    category: "Ferramentas Estatísticas",
    rows: [
      { name: "Calculadora de Tamanho Amostral", plans: [true, true, true] },
      { name: "Calculadora de Tamanho de Efeito", plans: [true, true, true] },
      { name: "Classificador de Análises Estatísticas", plans: [true, true, true] },
      { name: "Gerador de Sintaxe em R", plans: [true, true, true] },
    ],
  },
  {
    category: "Recursos Didáticos",
    rows: [
      { name: "Biblioteca Eletrônica", plans: [true, true, true] },
      { name: "Glossário Acadêmico", plans: [true, true, true] },
      { name: "Livros Metodológicos", plans: [true, true, true] },
      { name: "Certificados de conclusão", plans: [true, true, true] },
    ],
  },
  {
    category: "Suporte",
    rows: [
      { name: "Chatbot", plans: [true, true, true] },
      { name: "Comunidade de alunos", plans: [true, true, true] },
      { name: "Suporte direto pela plataforma", plans: [false, true, true] },
      { name: "Suporte por email", plans: [false, true, true] },
      { name: "Suporte Ao Vivo (Academeeting)", plans: [false, true, true] },
    ],
  },
  {
    category: "Inteligência Artificial",
    rows: [
      { name: "Tokens incluídos por mês", plans: ["100.000", "300.000", "500.000"] },
    ],
  },
];

function DetailedPlanIcon({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="font-bold text-[#0A2E76] text-xs">{value}</span>;
  }
  if (value) {
    return (
      <div className="w-5 h-5 rounded-full bg-[#0050CC]/10 flex items-center justify-center mx-auto">
        <Check className="w-3 h-3 text-[#0050CC]" />
      </div>
    );
  }
  return (
    <div className="w-5 h-5 rounded-full bg-[#F34266]/10 flex items-center justify-center mx-auto">
      <XIcon className="w-3 h-3 text-[#F34266]" />
    </div>
  );
}

function DetailedBreakdown() {
  const [isExpanded, setIsExpanded] = useState(false);
  const planNames = ["Master", "Pro", "Premium"];

  return (
    <section className="pb-16 md:pb-20" style={{ backgroundColor: "#F4F5F7" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2
            className="text-2xl sm:text-3xl font-heading font-bold text-[#0A2E76] mb-3"
            data-testid="text-detailed-title"
          >
            Detalhe de Cursos por Plano
          </h2>
          <p className="text-sm text-[hsl(215,15%,45%)] max-w-2xl mx-auto leading-relaxed mb-6">
            Veja exatamente quais cursos, ferramentas e recursos estão incluídos em cada plano.
          </p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 bg-[#0A2E76] text-white hover:bg-[#0A2E76]/90 shadow-md"
            data-testid="button-toggle-detailed"
          >
            {isExpanded ? "Ocultar detalhes" : "Ver todos os cursos por plano"}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
          </button>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <>
              <div className="hidden md:block bg-white rounded-2xl border border-[#E2E5EA] shadow-sm">
            <div className="sticky top-[96px] z-30 grid grid-cols-[1fr_120px_120px_120px] border-b border-[#E2E5EA] bg-[#0A2E76] rounded-t-2xl">
              <div className="px-5 py-4">
                <span className="text-sm font-semibold text-white/80">Cursos e Recursos</span>
              </div>
              {planNames.map((name) => (
                <div key={name} className="px-3 py-4 text-center">
                  <span className="text-sm font-bold text-white">{name}</span>
                </div>
              ))}
            </div>

            {detailedCourses.map((block, bi) => (
              <div key={bi}>
                <div className="grid grid-cols-[1fr_120px_120px_120px] bg-[#0A2E76]/[0.08]">
                  <div className="px-5 py-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0A2E76]">
                      {block.name}
                    </span>
                  </div>
                  <div /><div /><div />
                </div>

                {block.subcategories.map((sub, si) => (
                  <div key={si}>
                    <div className="grid grid-cols-[1fr_120px_120px_120px] bg-[#F8F9FB]">
                      <div className="px-5 py-2 pl-9">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0A2E76]/60">
                          {sub.name}
                        </span>
                      </div>
                      <div /><div /><div />
                    </div>
                    {sub.courses.map((course, ci) => (
                      <div
                        key={ci}
                        className={`grid grid-cols-[1fr_120px_120px_120px] border-b border-[#F4F5F7] ${ci % 2 === 1 ? "bg-[#FAFBFC]" : ""}`}
                      >
                        <div className="px-5 py-3 pl-9">
                          <span className="text-sm text-[hsl(215,15%,30%)]">{course.name}</span>
                        </div>
                        {course.plans.map((val, vi) => (
                          <div key={vi} className="px-3 py-3 flex items-center justify-center">
                            <DetailedPlanIcon value={val} />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            <div className="border-t-2 border-[#E2E5EA]" />

            {detailedResources.map((group, gi) => (
              <div key={gi}>
                <div className="grid grid-cols-[1fr_120px_120px_120px] bg-[#0A2E76]/[0.08]">
                  <div className="px-5 py-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0A2E76]">
                      {group.category}
                    </span>
                  </div>
                  <div /><div /><div />
                </div>
                {group.rows.map((row, ri) => (
                  <div
                    key={ri}
                    className={`grid grid-cols-[1fr_120px_120px_120px] border-b border-[#F4F5F7] ${ri % 2 === 1 ? "bg-[#FAFBFC]" : ""}`}
                  >
                    <div className="px-5 py-3">
                      <span className="text-sm text-[hsl(215,15%,30%)]">{row.name}</span>
                    </div>
                    {row.plans.map((val, vi) => (
                      <div key={vi} className="px-3 py-3 flex items-center justify-center">
                        <DetailedPlanIcon value={val} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="md:hidden bg-white rounded-2xl border border-[#E2E5EA] shadow-sm">
            <div className="sticky top-[88px] z-30 grid grid-cols-[1fr_1fr_1fr] border-b border-[#E2E5EA] bg-[#0A2E76] rounded-t-2xl">
              {planNames.map((name) => (
                <div key={name} className="py-3 text-center">
                  <span className="text-[11px] font-bold text-white">{name}</span>
                </div>
              ))}
            </div>

            {detailedCourses.map((block, bi) => (
              <div key={bi}>
                <div className="px-4 py-3 bg-[#0A2E76]/[0.06]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A2E76]">
                    {block.name}
                  </span>
                </div>

                {block.subcategories.map((sub, si) => (
                  <div key={si}>
                    <div className="px-4 py-2 bg-[#F8F9FB]">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0A2E76]/60">
                        {sub.name}
                      </span>
                    </div>
                    {sub.courses.map((course, ci) => (
                      <div key={ci} className={`border-b border-[#F4F5F7] ${ci % 2 === 1 ? "bg-[#FAFBFC]" : ""}`}>
                        <div className="px-4 py-2">
                          <span className="text-xs text-[hsl(215,15%,30%)]">{course.name}</span>
                        </div>
                        <div className="grid grid-cols-3 pb-2.5">
                          {course.plans.map((val, vi) => (
                            <div key={vi} className="flex justify-center">
                              <DetailedPlanIcon value={val} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            <div className="border-t-2 border-[#E2E5EA]" />

            {detailedResources.map((group, gi) => (
              <div key={gi}>
                <div className="px-4 py-3 bg-[#0A2E76]/[0.06]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A2E76]">
                    {group.category}
                  </span>
                </div>
                {group.rows.map((row, ri) => (
                  <div key={ri} className={`border-b border-[#F4F5F7] ${ri % 2 === 1 ? "bg-[#FAFBFC]" : ""}`}>
                    <div className="px-4 py-2">
                      <span className="text-xs text-[hsl(215,15%,30%)]">{row.name}</span>
                    </div>
                    <div className="grid grid-cols-3 pb-2.5">
                      {row.plans.map((val, vi) => (
                        <div key={vi} className="flex justify-center">
                          <DetailedPlanIcon value={val} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

              <div className="flex justify-center mt-10">
                <RegistrationLink data-testid="button-detailed-cta">
                  <Button
                    className="bg-[#0065FF] text-white font-semibold rounded-full px-10 py-6 text-base hover:bg-[#0050CC] shadow-lg shadow-[#0065FF]/30 gap-2"
                  >
                    Começar Já
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </RegistrationLink>
              </div>
              </>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

const trustUniversities = [
  { name: "USP", logo: "/logos/USP.webp" },
  { name: "UFRJ", logo: "/logos/UFRJ.webp" },
  { name: "UNICAMP", logo: "/logos/UNICAMP.webp" },
  { name: "UFMG", logo: "/logos/UFMG.webp" },
  { name: "UFRGS", logo: "/logos/UFRGS.webp" },
  { name: "UFSCar", logo: "/logos/UFSCAR.webp" },
  { name: "UMass Dartmouth", logo: "/logos/Dartmouth.webp" },
  { name: "Utrecht University", logo: "/logos/Utrecht.webp" },
  { name: "UC Davis", logo: "/logos/Davis.webp" },
  { name: "Universidade do Minho", logo: "/logos/Minho.webp" },
  { name: "Universidade do Porto", logo: "/logos/Porto.webp" },
];

function TrustCarousel() {
  const scrollItems = [...trustUniversities, ...trustUniversities, ...trustUniversities];

  return (
    <section className="py-16 md:py-20 overflow-hidden bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#0A2E76] text-center leading-tight"
          data-testid="text-trust-title"
        >
          As melhores universidades do Brasil e do Mundo confiam na Psicometria Online Academy
        </motion.h2>
      </div>

      {/* Desktop carousel */}
      <div className="hidden md:flex relative overflow-hidden">
        <motion.div
          className="flex gap-12 md:gap-20 items-center whitespace-nowrap px-6"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {scrollItems.map((uni, idx) => (
            <div
              key={`${uni.name}-${idx}`}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <img
                src={uni.logo}
                alt={uni.name}
                width={56}
                height={56}
                loading="lazy"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile carousel */}
      <div className="md:hidden w-full overflow-hidden">
        <motion.div
          className="flex gap-8 items-center whitespace-nowrap"
          animate={{ x: ["0px", "-1000px"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          {[...trustUniversities, ...trustUniversities].map((uni, idx) => (
            <div
              key={`${uni.name}-mobile-${idx}`}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <img
                src={uni.logo}
                alt={uni.name}
                width={40}
                height={40}
                loading="lazy"
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
