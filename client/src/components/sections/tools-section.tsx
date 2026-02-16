import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Calculator, Sparkles, BookOpen, Code, BarChart3, X } from "lucide-react";
import { toolImages } from "./tool-modal";

const tools = [
  {
    icon: Users,
    title: "Calculadora de Tamanho Amostral",
    description: "Calcule o N necessário para realizar as análises da sua pesquisa.",
  },
  {
    icon: Calculator,
    title: "Calculadoras de Tamanho de Efeito",
    description: "Quantifique a magnitude real dos resultados obtidos, com interpretações diretas sobre os achados.",
  },
  {
    icon: Sparkles,
    title: "Classificador de Análise de Dados",
    description: "Descubra com ajuda da nossa IA a análise correta para os seus dados.",
  },
  {
    icon: BookOpen,
    title: "Glossário de Termos Psicométricos e Estatísticos",
    description: "Definições rápidas e objetivas para consultas no momento em que surgem dúvidas conceituais.",
  },
  {
    icon: Code,
    title: "Gerador de Sintaxe em R",
    description: "Crie sintaxes em R prontas para rodar, respondendo apenas algumas perguntas.",
  },
  {
    icon: BarChart3,
    title: "Biblioteca Eletrônica",
    description: "Acesse centenas de artigos científicos que resolvem problemas metodológicos da sua pesquisa.",
  },
];

export function ToolsSection() {
  const [selectedTool, setSelectedTool] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedTool !== null && previewRef.current) {
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        previewRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [selectedTool]);

  return (
    <section
      id="ferramentas"
      data-testid="section-tools"
      className="section-padding"
      style={{ backgroundColor: "#F4F5F7" }}
    >
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-heading-1 md:text-display-sm text-[#0A2E76] font-heading leading-[1.15]"
          >
            Resolva desafios da sua pesquisa com nossas ferramentas{" "}
            <span className="text-[#0065FF]">estatísticas.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6 lg:pt-2"
          >
            <p className="text-body-lg text-[hsl(215,15%,45%)] leading-relaxed">
              Cada ferramenta resolve um problema específico da sua pesquisa e, juntas, impulsionam o seu desenvolvimento acadêmico.
            </p>
            <div className="hidden lg:flex flex-wrap gap-3">
              <Button
                size="lg"
                data-testid="button-tools-start"
                className="bg-[#0A2E76] text-white border-[#0A2E76] font-semibold px-6"
              >
                Comece gratuitamente
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                data-testid="button-tools-plans"
                className="font-semibold px-6 border-[#0A2E76] text-[#0A2E76]"
              >
                Ver planos
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          <div className="flex flex-col gap-3 lg:w-1/2 shrink-0">
            {tools.map((tool, idx) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <Card
                  className={`p-4 bg-white border-[#E2E5EA] hover-elevate cursor-pointer transition-all duration-300 group flex flex-row items-center gap-4 ${
                    selectedTool === idx ? "ring-2 ring-[#0065FF] border-[#0065FF]" : ""
                  }`}
                  onClick={() => setSelectedTool(selectedTool === idx ? null : idx)}
                  data-testid={`card-tool-${idx}`}
                >
                  <div className={`w-10 h-10 min-w-[2.5rem] rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    selectedTool === idx
                      ? "bg-[#0A2E76] border-[#0A2E76]"
                      : "bg-[#F4F5F7] border border-[#E2E5EA]"
                  }`}>
                    <tool.icon className={`w-4 h-4 transition-colors duration-300 ${
                      selectedTool === idx
                        ? "text-white"
                        : "text-[#0A2E76]"
                    }`} />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h3 className="text-[14px] font-bold text-[#0A2E76] font-heading leading-snug">
                      {tool.title}
                    </h3>
                    <p className="text-[13px] text-[hsl(215,15%,45%)] leading-snug">
                      {tool.description}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className={`font-semibold shrink-0 text-[12px] px-3 ${
                      selectedTool === idx
                        ? "bg-[#0065FF] text-white border-[#0065FF]"
                        : "bg-[#0A2E76] text-white border-[#0A2E76]"
                    }`}
                    data-testid={`button-tool-saiba-mais-${idx}`}
                    onClick={(e) => { e.stopPropagation(); setSelectedTool(selectedTool === idx ? null : idx); }}
                  >
                    {selectedTool === idx ? "Fechar" : "Saiba mais"}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="lg:w-1/2 flex flex-col" ref={previewRef}>
            <AnimatePresence mode="wait">
              {selectedTool !== null ? (
                <motion.div
                  key={selectedTool}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-5 sticky top-24 z-[9999]"
                >
                  <div className="w-full rounded-xl overflow-hidden shadow-2xl">
                    <div className="bg-[#E8ECEF] px-3 py-2 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                      </div>
                      <div className="flex-1 mx-2">
                        <div className="bg-white rounded-md px-3 py-0.5 text-[10px] text-[hsl(215,10%,55%)] text-center truncate">
                          psicometriaonline.com.br
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedTool(null)}
                        className="w-5 h-5 flex items-center justify-center rounded-full text-[hsl(215,10%,45%)] transition-colors"
                        data-testid="button-close-preview"
                        aria-label="Fechar preview"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <img
                      src={toolImages[selectedTool]}
                      alt={`Preview ${tools[selectedTool].title}`}
                      loading="lazy"
                      className="w-full h-auto block"
                      data-testid="img-tool-preview"
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      data-testid="button-tool-cta"
                      className="bg-[#0065FF] text-white border-[#0065FF] font-semibold px-8"
                    >
                      Quero testar gratuitamente
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:block rounded-2xl overflow-hidden h-full"
                >
                  <img
                    src="/images/tools-collab.webp"
                    alt="Equipe colaborando em pesquisa acadêmica"
                    loading="lazy"
                    className="w-full h-full object-cover rounded-2xl"
                    data-testid="img-tools-collab"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex lg:hidden flex-wrap gap-3 mt-8 justify-center">
          <Button
            size="lg"
            data-testid="button-tools-start-mobile"
            className="bg-[#0A2E76] text-white border-[#0A2E76] font-semibold px-6"
          >
            Comece gratuitamente
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            data-testid="button-tools-plans-mobile"
            className="font-semibold px-6 border-[#0A2E76] text-[#0A2E76]"
          >
            Ver planos
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ToolsSection;
