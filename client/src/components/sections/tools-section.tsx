import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Calculator, Sparkles, BookOpen, Code, BarChart3 } from "lucide-react";
import { ToolModal } from "./tool-modal";

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
    title: "Calculadora de Amostra para Surveys",
    description: "Determine o tamanho ideal da sua amostra para pesquisas com margem de erro controlada.",
  },
];

export function ToolsSection() {
  const [selectedTool, setSelectedTool] = useState<number | null>(null);

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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 items-stretch">
          <div className="flex flex-col gap-3">
            {tools.map((tool, idx) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <Card
                  className="p-4 bg-white border-[#E2E5EA] hover-elevate cursor-pointer transition-all duration-300 group flex flex-row items-center gap-4"
                  onClick={() => setSelectedTool(idx)}
                  data-testid={`card-tool-${idx}`}
                >
                  <div className="w-10 h-10 min-w-[2.5rem] rounded-lg bg-[#F4F5F7] border border-[#E2E5EA] flex items-center justify-center group-hover:bg-[#0A2E76] group-hover:border-[#0A2E76] transition-colors duration-300">
                    <tool.icon className="w-4 h-4 text-[#0A2E76] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h3 className="text-[14px] font-bold text-[#0A2E76] font-heading leading-snug">
                      {tool.title}
                    </h3>
                    <p className="text-[13px] text-[hsl(215,15%,45%)] leading-snug">
                      {tool.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0A2E76] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0" />
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block rounded-2xl overflow-hidden"
          >
            <img
              src="/images/tools-collab.webp"
              alt="Equipe colaborando em pesquisa acadêmica"
              loading="lazy"
              className="w-full h-full object-cover"
              data-testid="img-tools-collab"
            />
          </motion.div>
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

      <ToolModal
        toolIndex={selectedTool}
        onClose={() => setSelectedTool(null)}
      />
    </section>
  );
}

export default ToolsSection;
