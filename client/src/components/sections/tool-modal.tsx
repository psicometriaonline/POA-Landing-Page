import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import logoImg from "@assets/optimized/Academy_colorful_1770925025438.webp";
import imgTamanhoAmostral from "@assets/optimized/Tamanho_Amostral_1771268936173.webp";
import imgTamanhoEfeito from "@assets/optimized/Tamanho_de_Efeito_1771268936175.webp";
import imgClassificador from "@assets/optimized/Classificador_de_Análise_1771268936176.webp";
import imgGlossario from "@assets/optimized/Glossário_1771268936178.webp";
import imgGeradorSintaxe from "@assets/optimized/Gerador_de_Sintaxe_1771268936177.webp";
import imgBiblioteca from "@assets/optimized/Biblioteca_Eletrônica_1771268936178.webp";

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
    previewImage: imgTamanhoAmostral,
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
    previewImage: imgTamanhoEfeito,
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
    previewImage: imgClassificador,
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
    previewImage: imgGlossario,
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
    previewImage: imgGeradorSintaxe,
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
    title: "Biblioteca Eletrônica",
    shortTitle: "Encontre artigos que resolvem seus desafios metodológicos",
    previewImage: imgBiblioteca,
    features: [
      {
        title: "Centenas de artigos científicos",
        text: "Acesse uma coleção curada com centenas de artigos que abordam os principais problemas metodológicos enfrentados por pesquisadores.",
      },
      {
        title: "Organização por tema e técnica",
        text: "Encontre rapidamente artigos organizados por área temática, técnica estatística e tipo de delineamento de pesquisa.",
      },
      {
        title: "Soluções práticas para sua pesquisa",
        text: "Cada artigo foi selecionado por resolver um problema metodológico concreto, com aplicações diretas para dissertações, teses e publicações.",
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

          <div className="hidden md:flex items-center justify-center p-6 pt-0 pb-8">
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
              </div>
              <img
                src={tool.previewImage}
                alt={`Preview ${tool.title}`}
                loading="lazy"
                className="w-full h-auto block"
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
