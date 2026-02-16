import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, X } from "lucide-react";
import heroImg from "@assets/Subcabeçalho_1771221977416.jpg";

export function HeroSection() {
  const [onlineUsers, setOnlineUsers] = useState(783);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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
      className="relative pt-16 md:pt-20 overflow-hidden"
      style={{ backgroundColor: "#F4F5F7" }}
    >
      <div className="relative z-10 flex flex-col lg:flex-row items-stretch">
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-[700px] ml-auto px-6 md:px-10 lg:pl-[max(2rem,calc((100vw-1200px)/2))] lg:pr-12 py-8 md:py-10 pb-8 md:pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E5EA] text-[#0A2E76] text-body-sm mb-5 shadow-sm">
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
              className="text-display-sm md:text-display text-[#0A2E76] font-heading text-balance mb-4 leading-[1.1]"
            >
              A maior plataforma de pesquisa quantitativa da{" "}
              <span className="text-[#0065FF]">América Latina.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-body-lg text-[hsl(215,15%,45%)] max-w-xl mb-6 leading-relaxed"
            >
              Cadastre-se gratuitamente e tenha acesso a várias ferramentas estatísticas e dezenas de cursos para te tornar um pesquisador de excelência.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-2 mb-4"
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
              onClick={() => setIsVideoOpen(true)}
              className="flex items-center gap-2 text-[#0A2E76] font-medium hover:text-[#0065FF] transition-colors w-fit"
            >
              <PlayCircle className="w-5 h-5" />
              <span>Assistir vídeo</span>
            </motion.button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:block flex-1 relative min-h-[480px]"
        >
          <img
            src={heroImg}
            alt="Pesquisadores da Psicometria Online Academy - In Science We Trust"
            fetchPriority="high"
            width={800}
            height={533}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-50 p-3 bg-white hover:bg-white/90 rounded-full text-[#0A2E76] shadow-xl transition-all hover:scale-110 active:scale-95 border border-[#E2E5EA]"
                aria-label="Fechar vídeo"
              >
                <X className="w-6 h-6 stroke-[2.5px]" />
              </button>
              
              <iframe
                src="https://player.vimeo.com/video/367756121?h=9d6c4d7e35&autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479&controls=0&title=0&byline=0&portrait=0"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="POA Video"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
