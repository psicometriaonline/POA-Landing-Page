import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import logoImg from "@assets/Academy_colorful_1770925025438.png";

interface ToolFeature {
  title: string;
  text: string;
}

interface ToolModalData {
  title: string;
  shortTitle: string;
  features: ToolFeature[];
  previewImage: string;
}

const toolModalData: ToolModalData[] = [
  {
    title: "Calculadora de Tamanho Amostral",
    shortTitle: "Calcule o N ideal para sua pesquisa",
    previewImage: "/images/tool-preview-1.webp",
    features: [
      {
        title: "Cálculo para diferentes delineamentos",
        text: "Defina o tamanho amostral adequado para estudos correlacionais, experimentais, comparativos e de levantamento, com base nos parâmetros exigidos pela sua pesquisa.",
      },
      {
        title: "Parâmetros estatísticos ajustáveis",
        text: "Configure nível de significância, poder estatístico e tamanho de efeito esperado para obter estimativas precisas e replicáveis.",
      },
      {
        title: "Resultados com interpretação direta",
        text: "Receba o N mínimo necessário acompanhado de explicação clara sobre os critérios utilizados, facilitando a justificativa na sua dissertação ou artigo.",
      },
    ],
  },
  {
    title: "Calculadoras de Tamanho de Efeito",
    shortTitle: "Quantifique a magnitude dos seus resultados",
    previewImage: "/images/tool-preview-2.webp",
    features: [
      {
        title: "Múltiplas métricas de efeito",
        text: "Calcule d de Cohen, eta-quadrado, r de Pearson e outras medidas de tamanho de efeito para diferentes tipos de análise estatística.",
      },
      {
        title: "Interpretação automática",
        text: "Receba classificações automáticas (pequeno, médio, grande) com base nas convenções de Cohen, facilitando a interpretação dos resultados.",
      },
      {
        title: "Comparação entre grupos",
        text: "Compare a magnitude prática dos efeitos encontrados em diferentes variáveis ou condições experimentais da sua pesquisa.",
      },
    ],
  },
  {
    title: "Classificador de Análise de Dados",
    shortTitle: "Descubra a análise correta com IA",
    previewImage: "/images/tool-preview-3.webp",
    features: [
      {
        title: "Classificação inteligente",
        text: "Responda perguntas sobre seus dados e objetivos de pesquisa, e nossa inteligência artificial recomenda a técnica estatística mais adequada.",
      },
      {
        title: "Suporte a múltiplas técnicas",
        text: "Cobre desde testes paramétricos e não paramétricos até análises multivariadas, modelagem de equações estruturais e teoria de resposta ao item.",
      },
      {
        title: "Justificativa metodológica",
        text: "Receba não apenas a recomendação, mas também uma explicação de por que aquela análise é a mais adequada para os seus dados.",
      },
    ],
  },
  {
    title: "Glossário de Termos Psicométricos e Estatísticos",
    shortTitle: "Consulte definições rápidas e objetivas",
    previewImage: "/images/tool-preview-4.webp",
    features: [
      {
        title: "Busca instantânea",
        text: "Encontre rapidamente definições precisas de termos como validade, fidedignidade, análise fatorial, entre centenas de outros conceitos.",
      },
      {
        title: "Linguagem acessível",
        text: "Cada definição foi escrita para ser compreensível por pesquisadores de todos os níveis, sem perder rigor técnico.",
      },
      {
        title: "Exemplos práticos",
        text: "Termos acompanhados de exemplos de aplicação em pesquisas reais, ajudando a conectar teoria e prática.",
      },
    ],
  },
  {
    title: "Gerador de Sintaxe em R",
    shortTitle: "Gere sintaxes prontas para rodar",
    previewImage: "/images/tool-preview-5.webp",
    features: [
      {
        title: "Sintaxes comentadas linha a linha",
        text: "Cada linha de código gerada inclui comentários explicativos, para que você aprenda R enquanto executa suas análises.",
      },
      {
        title: "Configuração guiada",
        text: "Responda perguntas simples sobre suas variáveis e delineamento, e receba a sintaxe completa pronta para copiar e executar no RStudio.",
      },
      {
        title: "Múltiplas análises disponíveis",
        text: "Gere sintaxes para testes t, ANOVA, regressão, análise fatorial, correlação, e muitas outras técnicas estatísticas.",
      },
    ],
  },
  {
    title: "Calculadora de Tamanho de Amostra para Surveys",
    shortTitle: "Determine o N ideal para sua pesquisa survey",
    previewImage: "/images/tool-preview-6.webp",
    features: [
      {
        title: "Margem de erro controlada",
        text: "Defina a margem de erro aceitável e o nível de confiança desejado para obter o tamanho amostral preciso para seu levantamento.",
      },
      {
        title: "Populações finitas e infinitas",
        text: "Calcule amostras tanto para populações conhecidas quanto desconhecidas, com correção automática para populações finitas.",
      },
      {
        title: "Planejamento de coleta",
        text: "Receba recomendações práticas sobre quantos questionários enviar considerando a taxa de resposta esperada.",
      },
    ],
  },
];

interface ToolModalProps {
  toolIndex: number | null;
  onClose: () => void;
}

export function ToolModal({ toolIndex, onClose }: ToolModalProps) {
  const [activeFeature, setActiveFeature] = useState(0);

  if (toolIndex === null) return null;
  const tool = toolModalData[toolIndex];
  if (!tool) return null;

  return (
    <Dialog
      open={toolIndex !== null}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          setActiveFeature(0);
        }
      }}
    >
      <DialogContent
        className="max-w-4xl p-0 gap-0 overflow-hidden border-none rounded-2xl"
        data-testid="dialog-tool-modal"
      >
        <div className="p-8 pb-0 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img
              src={logoImg}
              alt="Psicometria Online Academy"
              loading="lazy"
              className="h-7 object-contain"
              data-testid="img-modal-logo"
            />
          </div>

          <h2
            className="text-2xl md:text-3xl font-heading font-bold text-[#0A2E76] mb-8 leading-tight"
            data-testid="text-modal-title"
          >
            {tool.shortTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="p-8 pt-0 flex flex-col justify-between">
            <div className="space-y-0">
              {tool.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer"
                  onClick={() => setActiveFeature(idx)}
                  data-testid={`button-feature-${idx}`}
                >
                  <div
                    className={`py-4 border-l-2 pl-4 transition-all duration-300 ${
                      activeFeature === idx
                        ? "border-l-[#0065FF]"
                        : "border-l-[#E2E5EA]"
                    }`}
                  >
                    <h3
                      className={`text-[15px] font-semibold mb-0 transition-colors duration-300 ${
                        activeFeature === idx
                          ? "text-[#0A2E76]"
                          : "text-[hsl(215,15%,55%)]"
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <div
                      className={`overflow-hidden transition-all duration-400 ease-in-out ${
                        activeFeature === idx
                          ? "max-h-40 opacity-100 mt-2"
                          : "max-h-0 opacity-0 mt-0"
                      }`}
                    >
                      <p className="text-sm text-[hsl(215,15%,45%)] leading-relaxed">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pb-2">
              <Button
                size="lg"
                data-testid="button-modal-cta"
                className="bg-[#0065FF] text-white border-[#0065FF] font-semibold px-6"
              >
                Comece gratuitamente
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center p-4 pt-0">
            <div className="w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#0A2E76] to-[#0065FF] p-4">
              <img
                src={tool.previewImage}
                alt={`Preview ${tool.title}`}
                loading="lazy"
                className="w-full h-auto rounded-lg shadow-xl"
                data-testid="img-modal-preview"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { toolModalData };
