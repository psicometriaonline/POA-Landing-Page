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
    detail: "Defina o tamanho amostral adequado para diferentes delineamentos de pesquisa. Configure nível de significância, poder estatístico e tamanho de efeito, e receba o N mínimo necessário com explicação clara dos critérios utilizados.",
  },
  {
    icon: Calculator,
    title: "Calculadoras de Tamanho de Efeito",
    description: "Quantifique a magnitude real dos resultados obtidos, com interpretações diretas sobre os achados.",
    detail: "Calcule d de Cohen, eta-quadrado, r de Pearson e outras medidas de tamanho de efeito. Receba classificações automáticas (pequeno, médio, grande) com base nas convenções de Cohen para facilitar a interpretação dos seus resultados.",
  },
  {
    icon: Sparkles,
    title: "Classificador de Análise de Dados",
    description: "Descubra com ajuda da nossa IA a análise correta para os seus dados.",
    detail: "Responda perguntas sobre seus dados e objetivos de pesquisa, e nossa inteligência artificial recomenda a técnica estatística mais adequada, com justificativa metodológica completa para sua dissertação ou artigo.",
  },
  {
    icon: BookOpen,
    title: "Glossário de Termos Psicométricos e Estatísticos",
    description: "Definições rápidas e objetivas para consultas no momento em que surgem dúvidas conceituais.",
    detail: "Encontre rapidamente definições precisas de centenas de termos como validade, fidedignidade e análise fatorial. Cada definição foi escrita com linguagem acessível e acompanhada de exemplos práticos de aplicação em pesquisas reais.",
  },
  {
    icon: Code,
    title: "Gerador de Sintaxe em R",
    description: "Crie sintaxes em R prontas para rodar, respondendo apenas algumas perguntas.",
    detail: "Responda perguntas simples sobre suas variáveis e delineamento, e receba a sintaxe completa em R pronta para copiar e executar no RStudio, com comentários explicativos linha a linha para que você aprenda enquanto analisa.",
  },
  {
    icon: BarChart3,
    title: "Biblioteca Eletrônica",
    description: "Acesse centenas de artigos científicos que resolvem problemas metodológicos da sua pesquisa.",
    detail: "Uma coleção curada com centenas de artigos organizados por área temática e técnica estatística. Cada artigo foi selecionado por resolver um problema metodológico concreto, com aplicações diretas para dissertações, teses e publicações.",
  },
];

function ToolPreview({ toolIndex, onClose }: { toolIndex: number; onClose: () => void }) {
  const tool = tools[toolIndex];
  return (
    <motion.div
      key={toolIndex}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-[#E2E5EA] shadow-lg p-5 md:p-6 flex flex-col gap-4"
    >
      <div className="text-center">
        <h3
          className="text-lg font-heading font-bold text-[#0A2E76] mb-2"
          data-testid="text-tool-preview-title"
        >
          {tool.title}
        </h3>
        <p
          className="text-sm text-[hsl(215,15%,45%)] leading-relaxed"
          data-testid="text-tool-preview-detail"
        >
          {tool.detail}
        </p>
      </div>

      <div className="w-full rounded-xl overflow-hidden shadow-md">
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
            onClick={onClose}
            className="w-5 h-5 flex items-center justify-center rounded-full text-[hsl(215,10%,45%)] transition-colors"
            data-testid="button-close-preview"
            aria-label="Fechar preview"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
        <img
          src={toolImages[toolIndex]}
          alt={`Preview ${tool.title}`}
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
  );
}

export function ToolsSection() {
  const [selectedTool, setSelectedTool] = useState<number | null>(0);
  const [mobileOpenTools, setMobileOpenTools] = useState<Set<number>>(new Set([0]));
  const previewRef = useRef<HTMLDivElement>(null);
  const mobilePreviewRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (selectedTool !== null && previewRef.current) {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        const headerHeight = 96;
        const rect = previewRef.current.getBoundingClientRect();
        const isAboveViewport = rect.top < headerHeight;
        const isBelowViewport = rect.top > window.innerHeight * 0.6;
        if (isAboveViewport || isBelowViewport) {
          const top = window.scrollY + rect.top - headerHeight - 8;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }
  }, [selectedTool]);

  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleSelectDesktop = (idx: number) => {
    setSelectedTool(selectedTool === idx ? null : idx);
  };

  const handleSelectMobile = (idx: number) => {
    const isOpen = mobileOpenTools.has(idx);
    const next = new Set(mobileOpenTools);
    if (isOpen) {
      next.delete(idx);
    } else {
      next.add(idx);
      const ref = mobileCardRefs.current[idx];
      if (ref) {
        const headerOffset = 108;
        const y = ref.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: y });
      }
    }
    setMobileOpenTools(next);
  };

  return (
    <section
      id="ferramentas"
      data-testid="section-tools"
      className="section-padding"
      style={{ backgroundColor: "#F4F5F7" }}
    >
      <div className="container-narrow">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-heading-1 md:text-display-sm text-[#0A2E76] font-heading leading-[1.15] mb-4"
          >
            Resolva desafios da sua pesquisa com nossas ferramentas{" "}
            <span className="text-[#0065FF]">estatísticas.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-body-lg text-[hsl(215,15%,45%)] leading-relaxed"
          >
            Cada ferramenta resolve um problema específico da sua pesquisa e, juntas, impulsionam o seu desenvolvimento acadêmico.
          </motion.p>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:flex flex-row gap-12 items-start">
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
                  onClick={() => handleSelectDesktop(idx)}
                  data-testid={`card-tool-${idx}`}
                >
                  <div className={`w-10 h-10 min-w-[2.5rem] rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    selectedTool === idx
                      ? "bg-[#0A2E76] border-[#0A2E76]"
                      : "bg-[#F4F5F7] border border-[#E2E5EA]"
                  }`}>
                    <tool.icon className={`w-4 h-4 transition-colors duration-300 ${
                      selectedTool === idx ? "text-white" : "text-[#0A2E76]"
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
                    onClick={(e) => { e.stopPropagation(); handleSelectDesktop(idx); }}
                  >
                    {selectedTool === idx ? "Fechar" : "Saiba mais"}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex-1 flex flex-col" ref={previewRef}>
            <div className="sticky top-24 z-40">
              <AnimatePresence mode="wait">
                {selectedTool !== null && (
                  <ToolPreview
                    key={selectedTool}
                    toolIndex={selectedTool}
                    onClose={() => setSelectedTool(null)}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col gap-3 lg:hidden">
          {tools.map((tool, idx) => {
            const isOpen = mobileOpenTools.has(idx);
            return (
              <div key={tool.title} ref={(el) => { mobileCardRefs.current[idx] = el; }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                >
                  <Card
                    className={`p-4 bg-white border-[#E2E5EA] hover-elevate cursor-pointer transition-all duration-300 group flex flex-row items-center gap-4 ${
                      isOpen ? "ring-2 ring-[#0065FF] border-[#0065FF]" : ""
                    }`}
                    onClick={() => handleSelectMobile(idx)}
                    data-testid={`card-tool-mobile-${idx}`}
                  >
                    <div className={`w-10 h-10 min-w-[2.5rem] rounded-lg flex items-center justify-center transition-colors duration-300 ${
                      isOpen
                        ? "bg-[#0A2E76] border-[#0A2E76]"
                        : "bg-[#F4F5F7] border border-[#E2E5EA]"
                    }`}>
                      <tool.icon className={`w-4 h-4 transition-colors duration-300 ${
                        isOpen ? "text-white" : "text-[#0A2E76]"
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
                        isOpen
                          ? "bg-[#0065FF] text-white border-[#0065FF]"
                          : "bg-[#0A2E76] text-white border-[#0A2E76]"
                      }`}
                      data-testid={`button-tool-mobile-saiba-mais-${idx}`}
                      onClick={(e) => { e.stopPropagation(); handleSelectMobile(idx); }}
                    >
                      {isOpen ? "Fechar" : "Saiba mais"}
                    </Button>
                  </Card>
                </motion.div>

                <div ref={(el) => { mobilePreviewRefs.current[idx] = el; }}>
                  <AnimatePresence mode="wait">
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-3"
                      >
                        <ToolPreview
                          toolIndex={idx}
                          onClose={() => handleSelectMobile(idx)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ToolsSection;
