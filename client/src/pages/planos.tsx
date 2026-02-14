import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X as XIcon, ArrowRight, Sparkles, Zap, Crown, Star, Coins } from "lucide-react";

type BillingPeriod = "mensal" | "anual";

interface Plan {
  id: string;
  name: string;
  subtitle: string;
  icon: typeof Star;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  highlighted?: boolean;
  badge?: string;
  features: string[];
  notIncluded?: string[];
  tokens: string;
  cta: string;
  ctaVariant: "outline" | "default";
}

const plans: Plan[] = [
  {
    id: "master",
    name: "Master",
    subtitle: "R$ 75,90/mês",
    icon: Zap,
    description: "Para quem busca aprofundamento com acesso ampliado aos cursos.",
    monthlyPrice: 75.90,
    yearlyPrice: 49.90,
    features: [
      "Biblioteca Eletrônica",
      "Cursos - Ciclo da Autonomia",
      "Calculadora de Tamanho Amostral",
      "Calculadora de Tamanho de Efeito",
      "Emissão de Certificado",
      "Cursos Extras - Preparação para Concursos",
      "Cursos Extras - IA para Pesquisas Científicas",
      "Cursos Extras - Viver de Análise de Dados",
      "Glossário Acadêmico",
      "IA - Gerador de Sintaxe",
      "Suporte - Chatbot",
      "Suporte - Plataforma",
      "Todos os cursos da Academy",
    ],
    notIncluded: [
      "Cursos - Todos os demais",
      "IA - Classificador de Análise",
      "Suporte - Academeeting",
      "Suporte - Comunidade de Alunos",
      "Suporte - Email",
    ],
    tokens: "100.000 tokens/mês",
    cta: "Assinar Master",
    ctaVariant: "default",
  },
  {
    id: "pro",
    name: "Pro",
    subtitle: "R$ 109,90/mês",
    icon: Sparkles,
    description: "O plano mais escolhido. Acesso completo com suporte prioritário.",
    monthlyPrice: 109.90,
    yearlyPrice: 74.90,
    highlighted: true,
    badge: "Mais Popular",
    features: [
      "Biblioteca Eletrônica",
      "Cursos - Ciclo da Autonomia",
      "Calculadora de Tamanho Amostral",
      "Calculadora de Tamanho de Efeito",
      "Emissão de Certificado",
      "Cursos Extras - Preparação para Concursos",
      "Glossário Acadêmico",
      "IA - Classificador de Análise",
      "IA - Gerador de Sintaxe",
      "Suporte - Academeeting",
      "Suporte - Chatbot",
      "Suporte - Comunidade de Alunos",
      "Suporte - Email",
      "Suporte - Plataforma",
      "Todos os cursos da Academy",
    ],
    notIncluded: [
      "Cursos - Todos os demais",
      "Cursos Extras - IA para Pesquisas Científicas",
      "Cursos Extras - Viver de Análise de Dados",
    ],
    tokens: "300.000 tokens/mês",
    cta: "Assinar Pro",
    ctaVariant: "default",
  },
  {
    id: "premium",
    name: "Premium",
    subtitle: "R$ 169,90/mês",
    icon: Crown,
    description: "Acesso ilimitado a tudo. A experiência completa da Academy.",
    monthlyPrice: 169.90,
    yearlyPrice: 114.90,
    features: [
      "Biblioteca Eletrônica",
      "Cursos - Ciclo da Autonomia",
      "Cursos - Todos os demais",
      "Calculadora de Tamanho Amostral",
      "Calculadora de Tamanho de Efeito",
      "Emissão de Certificado",
      "Cursos Extras - Preparação para Concursos",
      "Cursos Extras - IA para Pesquisas Científicas",
      "Cursos Extras - Viver de Análise de Dados",
      "Glossário Acadêmico",
      "IA - Classificador de Análise",
      "IA - Gerador de Sintaxe",
      "Suporte - Academeeting",
      "Suporte - Chatbot",
      "Suporte - Comunidade de Alunos",
      "Suporte - Email",
      "Suporte - Plataforma",
      "Todos os cursos da Academy",
    ],
    tokens: "500.000 tokens/mês",
    cta: "Assinar Premium",
    ctaVariant: "default",
  },
];

function formatPrice(price: number) {
  if (price === 0) return "Grátis";
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

function PlanCard({ plan, billing, index }: { plan: Plan; billing: BillingPeriod; index: number }) {
  const price = billing === "mensal" ? plan.monthlyPrice : plan.yearlyPrice;
  const isFree = plan.monthlyPrice === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col rounded-2xl p-6 lg:p-8 transition-all duration-300 ${
        plan.highlighted
          ? "bg-[#0A2E76] text-white shadow-2xl shadow-[#0A2E76]/20 scale-[1.02] lg:scale-105 z-10 border-2 border-[#0065FF]"
          : "bg-white text-[#0A2E76] border border-[#E2E5EA] hover:border-[#0065FF]/30 hover:shadow-lg"
      }`}
      data-testid={`card-plan-${plan.id}`}
    >
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0065FF] text-white shadow-lg shadow-[#0065FF]/30"
            data-testid={`badge-plan-${plan.id}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {plan.badge}
          </span>
        </div>
      )}

      <div className="mb-6">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
          plan.highlighted
            ? "bg-white/10"
            : "bg-[#F4F5F7]"
        }`}>
          <plan.icon className={`w-5 h-5 ${plan.highlighted ? "text-[#0065FF]" : "text-[#0065FF]"}`} />
        </div>
        <h3
          className={`text-xl font-heading font-bold mb-2 ${plan.highlighted ? "text-white" : "text-[#0A2E76]"}`}
          data-testid={`text-plan-name-${plan.id}`}
        >
          {plan.name}
        </h3>
        <p
          className={`text-sm leading-relaxed ${plan.highlighted ? "text-white/70" : "text-[hsl(215,15%,45%)]"}`}
          data-testid={`text-plan-description-${plan.id}`}
        >
          {plan.description}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span
            className={`text-4xl font-heading font-bold ${plan.highlighted ? "text-white" : "text-[#0A2E76]"}`}
            data-testid={`text-plan-price-${plan.id}`}
          >
            {isFree ? "R$ 0" : formatPrice(price)}
          </span>
          {!isFree && (
            <span className={`text-sm ${plan.highlighted ? "text-white/60" : "text-[hsl(215,15%,55%)]"}`}>
              /mês
            </span>
          )}
        </div>
        {!isFree && billing === "anual" && (
          <p className={`text-xs mt-1.5 ${plan.highlighted ? "text-[#0065FF]/80" : "text-[#0065FF]"}`}>
            <span className="font-semibold">
              Economia de {formatPrice((plan.monthlyPrice - plan.yearlyPrice) * 12)}/ano
            </span>
          </p>
        )}
        {isFree && (
          <p className={`text-xs mt-1.5 ${plan.highlighted ? "text-white/60" : "text-[hsl(215,15%,55%)]"}`}>
            Acesso por 14 dias
          </p>
        )}
      </div>

      <div className="flex-1 mb-8">
        <div className={`h-px mb-5 ${plan.highlighted ? "bg-white/10" : "bg-[#E2E5EA]"}`} />
        <ul className="space-y-2.5">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                plan.highlighted
                  ? "bg-[#0065FF]/20"
                  : "bg-[#0065FF]/10"
              }`}>
                <Check className={`w-3 h-3 ${plan.highlighted ? "text-[#4D9FFF]" : "text-[#0065FF]"}`} />
              </div>
              <span
                className={`text-[13px] leading-snug ${plan.highlighted ? "text-white/85" : "text-[hsl(215,15%,35%)]"}`}
                data-testid={`text-plan-feature-${plan.id}-${i}`}
              >
                {feature}
              </span>
            </li>
          ))}
          {plan.notIncluded?.map((feature, i) => (
            <li key={`no-${i}`} className="flex items-start gap-2.5 opacity-50">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                plan.highlighted
                  ? "bg-white/5"
                  : "bg-[#E2E5EA]"
              }`}>
                <XIcon className={`w-3 h-3 ${plan.highlighted ? "text-white/40" : "text-[hsl(215,15%,55%)]"}`} />
              </div>
              <span
                className={`text-[13px] leading-snug line-through ${plan.highlighted ? "text-white/40" : "text-[hsl(215,15%,55%)]"}`}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className={`mt-5 pt-4 border-t ${plan.highlighted ? "border-white/10" : "border-[#E2E5EA]"}`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
              plan.highlighted ? "bg-[#0065FF]/20" : "bg-[#0065FF]/10"
            }`}>
              <Coins className={`w-3 h-3 ${plan.highlighted ? "text-[#4D9FFF]" : "text-[#0065FF]"}`} />
            </div>
            <span className={`text-[13px] font-semibold ${plan.highlighted ? "text-white/85" : "text-[#0A2E76]"}`}>
              {plan.tokens}
            </span>
          </div>
        </div>
      </div>

      <a
        href="https://psicometriaonline.com.br/academy/"
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`button-plan-cta-${plan.id}`}
      >
        <Button
          className={`w-full gap-2 font-semibold ${
            plan.highlighted
              ? "bg-white text-[#0A2E76] hover:bg-white/90"
              : plan.ctaVariant === "default"
                ? "bg-[#0065FF] text-white hover:bg-[#0050CC]"
                : "border-[#0A2E76]/20 text-[#0A2E76] hover:bg-[#0A2E76]/5"
          }`}
          variant={plan.ctaVariant === "outline" && !plan.highlighted ? "outline" : "default"}
        >
          {plan.cta}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </a>
    </motion.div>
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

        <div className="relative pt-28 md:pt-32 pb-16 md:pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-8"
                data-testid="text-planos-title"
              >
                Invista no seu crescimento{" "}
                <span className="text-[#4D9FFF]">acadêmico</span>
              </h1>

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

              <div className="mt-6">
                <p
                  className="text-[15px] text-white/80 font-medium"
                  data-testid="text-free-trial-line1"
                >
                  Comece com acesso completo por 14 dias
                </p>
                <p
                  className="text-sm text-white/55 mt-1"
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#0A2E76] mb-4"
              data-testid="text-planos-pricing-title"
            >
              Planos e Preços
            </h2>

            <div className="flex justify-center mb-2">
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
                  <span className="absolute -top-2.5 -right-3 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-green-500 text-white leading-none">
                    -33%
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-5 items-start">
            {plans.map((plan, index) => (
              <PlanCard key={plan.id} plan={plan} billing={billing} index={index} />
            ))}
          </div>

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
