import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Users, BookOpen, Wrench } from "lucide-react";

const stats = [
  { icon: Users, value: "6.000+", label: "Pesquisadores" },
  { icon: BookOpen, value: "50+", label: "Cursos" },
  { icon: Wrench, value: "20+", label: "Ferramentas" },
];

export function HeroSection() {
  return (
    <section
      data-testid="section-hero"
      className="relative min-h-[90vh] flex items-center"
      style={{ backgroundColor: "#F4F5F7" }}
    >
      <div className="container-narrow relative z-10 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E5EA] text-[#0A2E76] text-body-sm mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              783 pesquisadores online agora
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display-sm md:text-display text-[#0A2E76] font-heading text-balance mb-6"
          >
            A plataforma completa para{" "}
            <span className="text-[#0065FF]">
              pesquisadores em Psicometria
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-body-lg text-[hsl(215,15%,45%)] max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Cursos, ferramentas e uma comunidade com mais de 6.000 pesquisadores.
            Tudo o que voce precisa para dominar a ciencia da medicao psicologica em um so lugar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              size="lg"
              data-testid="button-hero-cta"
              className="bg-[#0065FF] text-white border-[#0065FF] font-semibold"
            >
              Comece Sua Formacao
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              data-testid="button-hero-secondary"
              className="border-[#0A2E76] text-[#0A2E76] bg-transparent"
            >
              Conheca a Plataforma
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3" data-testid={`stat-${stat.label.toLowerCase()}`}>
                <div className="w-10 h-10 rounded-md bg-[#0A2E76] flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-heading-3 text-[#0A2E76] font-heading">{stat.value}</div>
                  <div className="text-body-sm text-[hsl(215,15%,45%)]">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
