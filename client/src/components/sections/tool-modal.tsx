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

interface ToolModalData {
  title: string;
  previewImage: string;
}

const toolModalData: ToolModalData[] = [
  {
    title: "Calculadora de Tamanho Amostral",
    previewImage: imgTamanhoAmostral,
  },
  {
    title: "Calculadoras de Tamanho de Efeito",
    previewImage: imgTamanhoEfeito,
  },
  {
    title: "Classificador de Análise de Dados",
    previewImage: imgClassificador,
  },
  {
    title: "Glossário de Termos Psicométricos e Estatísticos",
    previewImage: imgGlossario,
  },
  {
    title: "Gerador de Sintaxe em R",
    previewImage: imgGeradorSintaxe,
  },
  {
    title: "Biblioteca Eletrônica",
    previewImage: imgBiblioteca,
  },
];

interface ToolModalProps {
  toolIndex: number | null;
  onClose: () => void;
}

export function ToolModal({ toolIndex, onClose }: ToolModalProps) {
  if (toolIndex === null) return null;
  const tool = toolModalData[toolIndex];
  if (!tool) return null;

  return (
    <Dialog
      open={toolIndex !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className="max-w-5xl p-0 gap-0 overflow-hidden border-none rounded-2xl"
        data-testid="dialog-tool-modal"
      >
        <div className="px-6 pt-6 pb-4 md:px-8 md:pt-8 md:pb-5 flex flex-col items-center gap-4">
          <img
            src={logoImg}
            alt="Psicometria Online Academy"
            loading="lazy"
            className="h-7 object-contain"
            data-testid="img-modal-logo"
          />
          <h2
            className="text-lg md:text-xl font-heading font-bold text-[#0A2E76] text-center leading-tight"
            data-testid="text-modal-title"
          >
            {tool.title}
          </h2>
        </div>

        <div className="px-4 md:px-8">
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

        <div className="px-6 py-5 md:px-8 md:py-6 flex justify-center">
          <Button
            size="lg"
            data-testid="button-modal-cta"
            className="bg-[#0065FF] text-white border-[#0065FF] font-semibold px-8"
          >
            Quero testar gratuitamente
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { toolModalData };
