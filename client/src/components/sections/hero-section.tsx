import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Users, BookOpen, Wrench, PlayCircle } from "lucide-react";
import phoneMockup from "@assets/image_1770910768711.png";

const stats = [
  { icon: Users, value: "6.000+", label: "Pesquisadores" },
  { icon: BookOpen, value: "50+", label: "Cursos" },
  { icon: Wrench, value: "20+", label: "Ferramentas" },
];

export function HeroSection() {
  return (
    <section
      data-testid="section-hero"
      className="relative min-h-[90vh] flex items-center pt-24 md:pt-32"
      style={{ backgroundColor: "#F4F5F7" }}
    >
      <div className="container-narrow relative z-10 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-left">
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
              className="text-display-sm md:text-display text-[#0A2E76] font-heading text-balance mb-6 leading-[1.1]"
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
              className="text-body-lg text-[hsl(215,15%,45%)] max-w-xl mb-10 leading-relaxed"
            >
              Cursos, ferramentas e uma comunidade com mais de 6.000 pesquisadores.
              Tudo o que voce precisa para dominar a ciencia da medicao psicologica em um so lugar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-4 mb-10"
            >
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg">
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="h-12 bg-white border-[#E2E5EA] rounded-md focus:ring-[#0065FF]"
                />
                <Button
                  size="lg"
                  data-testid="button-hero-cta"
                  className="w-full sm:w-auto h-12 bg-[#0065FF] text-white border-[#0065FF] font-semibold px-8 whitespace-nowrap"
                >
                  Cadastre-se - e gratis!
                </Button>
              </div>
              <p className="text-body-sm text-[hsl(215,15%,55%)]">
                Ao se cadastrar, voce concorda com nossos{" "}
                <a href="#" className="underline hover:text-[#0065FF] transition-colors">Termos de Privacidade</a>.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-2 text-[#0A2E76] font-medium hover:text-[#0065FF] transition-colors"
            >
              <PlayCircle className="w-5 h-5" />
              <span>Assistir video</span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-8 md:gap-12 mt-16"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3" data-testid={`stat-${stat.label.toLowerCase()}`}>
                  <div className="w-10 h-10 rounded-md bg-[#0A2E76] flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-heading-3 text-[#0A2E76] font-heading leading-tight">{stat.value}</div>
                    <div className="text-body-sm text-[hsl(215,15%,45%)]">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <img
              src={phoneMockup}
              alt="Plataforma no celular"
              className="w-full h-auto object-contain max-w-[540px] ml-auto drop-shadow-2xl"
            />
            {/* Elementos decorativos inspirados na imagem */}
            <div className="absolute top-1/2 -left-8 -translate-y-1/2 w-16 h-16 bg-orange-400 rotate-45 rounded-lg -z-10 blur-[1px]" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
