import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Calculator, Sparkles, BookOpen, Code, BarChart3 } from "lucide-react";

const tools = [
  {
    icon: Users,
    title: "Calculadora de Tamanho Amostral",
    highlight: "Amostral",
    description: "Calcule o N necessário para realizar as análises da sua pesquisa.",
  },
  {
    icon: Calculator,
    title: "Calculadoras de Tamanho de Efeito",
    highlight: "de Efeito",
    description: "Quantifique a magnitude real dos resultados obtidos, com interpretações diretas sobre os achados.",
  },
  {
    icon: Sparkles,
    title: "Classificador de Análise de Dados",
    highlight: "de Dados",
    description: "Descubra com ajuda da nossa IA a análise correta para os seus dados.",
  },
  {
    icon: BookOpen,
    title: "Glossário de Termos Psicométricos e Estatísticos",
    highlight: "Estatísticos",
    description: "Definições rápidas e objetivas para consultas no momento em que surgem dúvidas conceituais.",
  },
  {
    icon: Code,
    title: "Gerador de Sintaxe em R",
    highlight: "em R",
    description: "Crie sintaxes em R prontas para rodar, respondendo apenas algumas perguntas. Nossas sintaxes são todas comentadas para que você aprenda enquanto utiliza a ferramenta.",
  },
  {
    icon: BarChart3,
    title: "Calculadora de Tamanho de Amostra para Surveys",
    highlight: "para Surveys",
    description: "Determine o tamanho ideal da sua amostra para pesquisas com margem de erro e nível de confiança controlados.",
  },
];

function highlightText(title: string, highlight: string) {
  const index = title.lastIndexOf(highlight);
  if (index === -1) return <>{title}</>;
  const before = title.slice(0, index);
  const match = title.slice(index, index + highlight.length);
  const after = title.slice(index + highlight.length);
  return (
    <>
      {before}<span className="text-[#00B8D4]">{match}</span>{after}
    </>
  );
}

export function ToolsSection() {
  return (
    <section
      data-testid="section-tools"
      className="section-padding"
      style={{ backgroundColor: "#F4F5F7" }}
    >
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-heading-1 md:text-display-sm text-[#0A2E76] font-heading leading-[1.15]"
          >
            Resolva desafios da sua pesquisa com nossas ferramentas{" "}
            <span className="text-[#00B8D4]">estatísticas.</span>
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
            <div>
              <Button
                size="lg"
                data-testid="button-tools-cta"
                className="bg-[#0A2E76] text-white border-[#0A2E76] font-semibold px-8"
              >
                Cadastre-se gratuitamente
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool, idx) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Card className="p-6 h-full bg-white border-[#E2E5EA] hover-elevate cursor-pointer transition-all duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-[#F4F5F7] border border-[#E2E5EA] flex items-center justify-center mb-6 group-hover:bg-[#0A2E76] group-hover:border-[#0A2E76] transition-colors duration-300">
                  <tool.icon className="w-5 h-5 text-[#0A2E76] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-heading-3 text-[#0A2E76] font-heading mb-3 leading-snug">
                  {highlightText(tool.title, tool.highlight)}
                </h3>
                <p className="text-body-sm text-[hsl(215,15%,45%)] leading-relaxed">
                  {tool.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
