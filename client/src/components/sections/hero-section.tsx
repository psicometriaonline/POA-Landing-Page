import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

export function HeroSection() {
  const [onlineUsers, setOnlineUsers] = useState(783);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers((prev) => {
        const change = Math.floor(Math.random() * 17) - 8; // -8 to +8
        const next = prev + change;
        if (next < 783) return 783 + Math.abs(change);
        if (next > 985) return 985 - Math.abs(change);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      data-testid="section-hero"
      className="relative flex items-center pt-20 md:pt-24"
      style={{ backgroundColor: "#F4F5F7" }}
    >
      <div className="container-narrow relative z-10 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          <div className="flex flex-col justify-center text-left py-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E5EA] text-[#0A2E76] text-body-sm mb-8 shadow-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="font-medium">{onlineUsers} pesquisadores online agora</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-display-sm md:text-display text-[#0A2E76] font-heading text-balance mb-6 leading-[1.1]"
            >
              A maior plataforma de pesquisa quantitativa da{" "}
              <span className="text-[#0065FF]">América Latina.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-body-lg text-[hsl(215,15%,45%)] max-w-xl mb-10 leading-relaxed"
            >
              Cadastre-se gratuitamente e tenha acesso a várias ferramentas estatísticas e dezenas de cursos para te tornar um pesquisador de excelência.
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
                  Cadastre-se. É grátis!
                </Button>
              </div>
              <p className="text-body-sm text-[hsl(215,15%,55%)]">
                Ao se cadastrar, você concorda com nossos{" "}
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
              <span>Assistir vídeo</span>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:flex items-center"
          >
            <div className="w-full h-full min-h-[500px] bg-slate-200 rounded-2xl overflow-hidden shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
                alt="Plataforma POA"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0A2E76]/20 to-transparent" />
            </div>
            <div className="absolute top-1/2 -left-8 -translate-y-1/2 w-16 h-16 bg-orange-400 rotate-45 rounded-lg -z-10 blur-[1px]" />
            <div className="absolute bottom-0 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
