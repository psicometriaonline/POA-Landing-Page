import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlayCircle, X } from "lucide-react";
import heroImg from "@assets/optimized/Hero_1773535655024.webp";
import { RegistrationLink } from "@/components/ui/registration-link";

export function HeroSection() {
  const [onlineUsers, setOnlineUsers] = useState(783);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers((prev) => {
        const change = Math.floor(Math.random() * 17) - 8;
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
      className="relative flex flex-col lg:flex-row min-h-[520px] overflow-hidden"
    >
      {/* Left panel */}
      <div
        className="flex-1 flex items-center pt-20"
        style={{ backgroundColor: "#f1f1f1" }}
      >
        <div className="w-full px-6 md:px-10 lg:pl-10 xl:pl-16 lg:pr-10 py-10 md:py-12 lg:max-w-[620px] lg:ml-auto">
          <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E5EA] text-[#0A2E76] text-body-sm mb-5 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="font-medium">{onlineUsers} pesquisadores online agora</span>
            </div>
          </div>

          <h1
            className="animate-fade-up text-display-sm md:text-display text-[#0A2E76] font-heading mb-4 leading-[1.1]"
            style={{ animationDelay: "100ms" }}
          >
            A maior plataforma de pesquisa quantitativa da{" "}
            <span className="text-[#0065FF]">América Latina.</span>
          </h1>

          <p
            className="animate-fade-up text-body-lg text-[hsl(215,15%,45%)] max-w-xl mb-6 leading-relaxed"
            style={{ animationDelay: "200ms" }}
          >
            Cadastre-se gratuitamente e tenha acesso a várias ferramentas estatísticas e dezenas de cursos para te tornar um pesquisador de excelência.
          </p>

          <div
            className="animate-fade-up flex flex-col gap-2 mb-4"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                className="h-12 bg-white border-[#E2E5EA] rounded-md focus:ring-[#0065FF]"
              />
              <RegistrationLink data-testid="button-hero-cta">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 bg-[#0065FF] text-white border-[#0065FF] font-semibold px-8 whitespace-nowrap"
                >
                  Cadastre-se. É grátis!
                </Button>
              </RegistrationLink>
            </div>
            <p className="text-body-sm text-[hsl(215,15%,55%)]">
              Ao se cadastrar, você concorda com nossos{" "}
              <a href="#" className="underline hover:text-[#0065FF] transition-colors">Termos de Privacidade</a>.
            </p>
          </div>

          <button
            onClick={() => setIsVideoOpen(true)}
            className="animate-fade-up flex items-center gap-2 text-[#0A2E76] font-medium hover:text-[#0065FF] transition-colors w-fit"
            style={{ animationDelay: "400ms" }}
          >
            <PlayCircle className="w-5 h-5" />
            <span>Assistir vídeo</span>
          </button>
        </div>
      </div>

      {/* Right panel — phone mockup */}
      <div
        className="hidden lg:block flex-1 relative animate-fade-in-right"
        style={{ backgroundColor: "#f1f1f1", animationDelay: "200ms" }}
      >
        <img
          src={heroImg}
          alt="Plataforma Psicometria Online Academy no celular com cursos de análise de dados"
          fetchPriority="high"
          className="absolute bottom-0 left-0 h-full w-auto object-contain object-bottom"
        />
      </div>

      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 animate-fade-in"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl animate-scale-in"
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
          </div>
        </div>
      )}
    </section>
  );
}
