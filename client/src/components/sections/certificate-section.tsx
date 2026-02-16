import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronRight, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import certificateImg from "@assets/Im-2-copiar_1770941008351.webp";
import avatar1 from "@assets/19_1771128693704.png";
import avatar2 from "@assets/36_1771128693705.png";
import avatar3 from "@assets/38_1771128693705.png";
import avatar4 from "@assets/10_1771128693706.png";
import avatar5 from "@assets/11_1771128693706.png";
import avatar6 from "@assets/9_1771128693707.png";
import avatar7 from "@assets/34_1771128693707.png";

const testimonials = [
  {
    name: "Carolina Mendes",
    role: "Doutoranda em Psicologia - USP",
    image: avatar1,
    text: "A Psicometria Online Academy transformou completamente a minha pesquisa de doutorado. As ferramentas de análise fatorial e as aulas sobre TRI me deram a base que eu precisava para validar meu instrumento com confiança.",
  },
  {
    name: "Ricardo Almeida",
    role: "Professor Universitário - UFMG",
    image: avatar2,
    text: "Como professor, preciso estar sempre atualizado. A plataforma me permitiu dominar técnicas avançadas de psicometria que agora aplico em sala de aula e nas minhas orientações de mestrado e doutorado.",
  },
  {
    name: "Juliana Santos",
    role: "Pesquisadora - FIOCRUZ",
    image: avatar3,
    text: "O suporte da comunidade é incrível. Sempre que tive dúvidas sobre modelagem de equações estruturais, encontrei respostas rápidas e precisas. A formação em R foi um divisor de águas na minha carreira.",
  },
  {
    name: "Fernanda Lima",
    role: "Mestranda em Educação - UNICAMP",
    image: avatar4,
    text: "Eu não tinha nenhuma experiência com análise quantitativa antes da POA. Hoje, consigo rodar minhas próprias análises e interpretar resultados com segurança. A didática dos cursos é excepcional.",
  },
  {
    name: "Patrícia Oliveira",
    role: "Psicóloga Organizacional",
    image: avatar5,
    text: "A certificação da POA abriu portas no mercado de trabalho. As empresas valorizam profissionais que dominam construção e validação de instrumentos psicométricos. Recomendo a todos os colegas.",
  },
  {
    name: "Marcos Tavares",
    role: "Pesquisador - INEP",
    image: avatar6,
    text: "Trabalho com avaliação educacional em larga escala e a formação em TRI da POA foi fundamental. O conteúdo é atualizado, prático e aplicável diretamente ao meu dia a dia profissional.",
  },
  {
    name: "Luciana Ferreira",
    role: "Doutora em Saúde Coletiva - UERJ",
    image: avatar7,
    text: "A plataforma consegue tornar acessível conteúdos que normalmente só encontramos em artigos complexos em inglês. As videoaulas e os exercícios práticos fazem toda a diferença no aprendizado.",
  },
];

export function CertificateSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleCount = 2;
  const maxIndex = testimonials.length - visibleCount;

  const goNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const current = testimonials[currentIndex];
  const peek = testimonials[currentIndex + 1];

  return (
    <section
      data-testid="section-certificate"
      className="relative"
      style={{ background: "linear-gradient(180deg, #0A2E76 0%, #0B3486 30%, #0C3A96 60%, #0A2E76 100%)" }}
    >
      <div className="relative section-padding">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2
              className="text-heading-1 md:text-display-sm font-heading font-bold text-white leading-[1.15] mb-4"
              data-testid="text-certificate-title"
            >
              Certificado +300 horas
            </h2>
            <p
              className="text-body-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
              data-testid="text-certificate-subtitle"
            >
              A dedicação que você vai ter na nossa plataforma <span className="font-bold text-white">pode e deve ser comprovada.</span>
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white rounded-2xl border border-[#E2E5EA] shadow-lg px-5 py-3 md:px-7 md:py-4 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-[#F4F5F7] border border-[#E2E5EA] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#0065FF]" />
                </div>
                <h3 className="text-xl font-heading font-bold text-[#0A2E76]">
                  Currículo potencializado
                </h3>
              </div>
              <p className="text-body-lg text-[hsl(215,15%,35%)] leading-relaxed mb-6">
                Você recebe certificados em{" "}
                <span className="underline decoration-[#0065FF] underline-offset-4 font-semibold text-[#0A2E76]">
                  todos os cursos concluídos, mais de 300 horas certificadas
                </span>
                , válidas como formação complementar no currículo e nos processos seletivos.
              </p>
              <p className="text-body-lg text-[hsl(215,15%,35%)] leading-relaxed">
                Até professores de universidades europeias incluem essa formação em seus currículos.
              </p>
            </div>

            <div className="flex justify-center">
              <img
                src={certificateImg}
                alt="Certificados da Psicometria Online Academy"
                className="w-full max-w-md lg:max-w-lg object-contain drop-shadow-xl"
                data-testid="img-certificate"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-narrow">
        <div className="border-t border-white/10" />
      </div>

      <div className="relative pt-10 md:pt-14 pb-16 md:pb-24">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <Badge
              className="bg-white text-[#0A2E76] font-semibold mb-4 no-default-hover-elevate no-default-active-elevate"
              data-testid="badge-testimonials"
            >
              Depoimentos
            </Badge>
            <h2
              className="text-3xl md:text-5xl font-heading font-bold text-white"
              data-testid="text-testimonials-title"
            >
              O que dizem os nossos alunos
            </h2>
          </motion.div>

          <div className="relative" ref={containerRef}>
            <div className="flex items-center gap-4">
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="hidden md:flex flex-shrink-0 w-11 h-11 rounded-full bg-white/10 border border-white/20 items-center justify-center text-white transition-opacity disabled:opacity-30"
                data-testid="button-testimonial-prev"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex-1 flex gap-5 items-stretch">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={`main-${currentIndex}`}
                    initial={{ opacity: 0, x: 60, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -60, scale: 0.97 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex-1 min-w-0 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 md:gap-10 border border-white/10 relative overflow-hidden shadow-2xl"
                    style={{ background: "linear-gradient(135deg, #0D3B94 0%, #1252C4 50%, #1A6BF0 100%)" }}
                    data-testid={`card-testimonial-${currentIndex}`}
                  >
                    <div className="absolute bottom-[-60px] right-4 text-[300px] md:text-[380px] leading-none pointer-events-none select-none" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "rgba(255,255,255,0.06)" }} aria-hidden="true">
                      &rdquo;
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center md:items-start relative z-10">
                      <img
                        src={current.image}
                        alt={current.name}
                        className="w-32 h-44 md:w-44 md:h-56 rounded-xl object-cover shadow-lg"
                        data-testid={`img-testimonial-${currentIndex}`}
                      />
                      <h4 className="text-white font-heading font-bold text-sm mt-4">{current.name}</h4>
                      <p className="text-white/50 text-xs mt-0.5">{current.role}</p>
                    </div>
                    <div className="flex-1 flex items-center relative z-10">
                      <p className="text-white/80 text-sm leading-relaxed">
                        "{current.text}"
                      </p>
                    </div>
                  </motion.div>

                  {peek && (
                    <motion.div
                      key={`peek-${currentIndex + 1}`}
                      initial={{ opacity: 0, x: 60, scale: 0.97 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -60, scale: 0.97 }}
                      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.08 }}
                      className="hidden md:flex w-[240px] flex-shrink-0 rounded-2xl p-6 flex-col items-center justify-center text-center border border-white/10 relative overflow-hidden shadow-2xl"
                      style={{ background: "linear-gradient(135deg, #0D3B94 0%, #1252C4 50%, #1A6BF0 100%)" }}
                      data-testid={`card-testimonial-peek-${currentIndex + 1}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E76]/80 via-transparent to-transparent pointer-events-none" />
                      <img
                        src={peek.image}
                        alt={peek.name}
                        className="w-32 h-40 rounded-xl object-cover mb-4 shadow-lg relative z-10"
                      />
                      <h4 className="text-white font-heading font-bold text-sm relative z-10">{peek.name}</h4>
                      <p className="text-white/50 text-xs mt-0.5 relative z-10">{peek.role}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={goNext}
                disabled={currentIndex >= maxIndex}
                className="hidden md:flex flex-shrink-0 w-11 h-11 rounded-full bg-white/10 border border-white/20 items-center justify-center text-white transition-opacity disabled:opacity-30"
                data-testid="button-testimonial-next"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex md:hidden items-center justify-center gap-4 mt-6">
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white transition-opacity disabled:opacity-30"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                disabled={currentIndex >= maxIndex}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white transition-opacity disabled:opacity-30"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center gap-1.5 mt-6">
              {testimonials.slice(0, maxIndex + 1).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? "bg-white w-5" : "bg-white/30"
                  }`}
                  data-testid={`button-testimonial-dot-${i}`}
                  aria-label={`Ir para depoimento ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
