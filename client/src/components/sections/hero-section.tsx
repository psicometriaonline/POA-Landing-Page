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
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(213 80% 12%) 0%, hsl(213 80% 22%) 50%, hsl(213 65% 30%) 100%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, hsl(195 85% 50%) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-1/3 -left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, hsl(213 80% 60%) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container-narrow relative z-10 pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white/80 text-body-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              783 pesquisadores online agora
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display-sm md:text-display text-white font-heading text-balance mb-6"
          >
            A plataforma completa para{" "}
            <span className="text-[hsl(195,85%,60%)]">
              pesquisadores em Psicometria
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-body-lg text-white/65 max-w-xl mb-10 leading-relaxed"
          >
            Cursos, ferramentas e uma comunidade com mais de 6.000 pesquisadores.
            Tudo o que voce precisa para dominar a ciencia da medicao psicologica em um so lugar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-4 mb-16"
          >
            <Button
              size="lg"
              data-testid="button-hero-cta"
              className="bg-white text-[hsl(213,80%,20%)] border-white/80 font-semibold"
            >
              Comece Sua Formacao
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              data-testid="button-hero-secondary"
              className="border-white/25 text-white bg-white/5 backdrop-blur-sm"
            >
              Conheca a Plataforma
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-8 md:gap-12"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3" data-testid={`stat-${stat.label.toLowerCase()}`}>
                <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-[hsl(195,85%,60%)]" />
                </div>
                <div>
                  <div className="text-heading-3 text-white font-heading">{stat.value}</div>
                  <div className="text-body-sm text-white/50">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
