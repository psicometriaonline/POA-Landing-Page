import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, Zap, Crown, Star } from "lucide-react";

type BillingPeriod = "mensal" | "anual";

interface Plan {
  id: string;
  name: string;
  icon: typeof Star;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  highlighted?: boolean;
  badge?: string;
  features: string[];
  cta: string;
  ctaVariant: "outline" | "default";
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    icon: Star,
    description: "Para quem quer conhecer a plataforma e dar os primeiros passos.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Em breve",
    ],
    cta: "Comece Grátis",
    ctaVariant: "outline",
  },
  {
    id: "master",
    name: "Master",
    icon: Zap,
    description: "Para quem busca aprofundamento com acesso ampliado aos cursos.",
    monthlyPrice: 59.90,
    yearlyPrice: 39.90,
    features: [
      "Em breve",
    ],
    cta: "Assinar Master",
    ctaVariant: "default",
  },
  {
    id: "pro",
    name: "Pro",
    icon: Sparkles,
    description: "O plano mais escolhido. Acesso completo com suporte prioritário.",
    monthlyPrice: 89.90,
    yearlyPrice: 59.90,
    highlighted: true,
    badge: "Mais Popular",
    features: [
      "Em breve",
    ],
    cta: "Assinar Pro",
    ctaVariant: "default",
  },
  {
    id: "premium",
    name: "Premium",
    icon: Crown,
    description: "Experiência completa com mentorias exclusivas e acesso ilimitado.",
    monthlyPrice: 149.90,
    yearlyPrice: 99.90,
    features: [
      "Em breve",
    ],
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
            Para sempre
          </p>
        )}
      </div>

      <div className="flex-1 mb-8">
        <div className={`h-px mb-5 ${plan.highlighted ? "bg-white/10" : "bg-[#E2E5EA]"}`} />
        <ul className="space-y-3">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                plan.highlighted
                  ? "bg-[#0065FF]/20"
                  : "bg-[#0065FF]/10"
              }`}>
                <Check className={`w-3 h-3 ${plan.highlighted ? "text-[#4D9FFF]" : "text-[#0065FF]"}`} />
              </div>
              <span
                className={`text-sm leading-snug ${plan.highlighted ? "text-white/85" : "text-[hsl(215,15%,35%)]"}`}
                data-testid={`text-plan-feature-${plan.id}-${i}`}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
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

        <div className="relative pt-28 md:pt-32 pb-32 md:pb-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-white/80 border border-white/10 mb-6"
                data-testid="badge-planos-header"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Planos e Preços
              </span>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-5"
                data-testid="text-planos-title"
              >
                Invista no seu crescimento{" "}
                <span className="text-[#4D9FFF]">acadêmico</span>
              </h1>
              <p
                className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-10"
                data-testid="text-planos-subtitle"
              >
                Escolha o plano ideal para a sua jornada. Acesse cursos, ferramentas
                e uma comunidade de pesquisadores comprometidos com a excelência.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center p-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10"
              data-testid="toggle-billing"
            >
              <button
                onClick={() => setBilling("mensal")}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  billing === "mensal"
                    ? "bg-white text-[#0A2E76] shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
                data-testid="button-billing-mensal"
              >
                Mensal
              </button>
              <button
                onClick={() => setBilling("anual")}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 relative ${
                  billing === "anual"
                    ? "bg-white text-[#0A2E76] shadow-md"
                    : "text-white/70 hover:text-white"
                }`}
                data-testid="button-billing-anual"
              >
                Anual
                <span className="absolute -top-2.5 -right-3 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-green-500 text-white leading-none">
                  -33%
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative -mt-20 md:-mt-24 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 items-start">
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
