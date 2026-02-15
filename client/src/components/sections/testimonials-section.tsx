import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
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

export function TestimonialsSection() {
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
    <section className="bg-[#0A2E76] py-16 md:py-24" data-testid="section-testimonials">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-heading font-bold text-white"
            data-testid="text-testimonials-title"
          >
            O que dizem os nossos alunos
          </h2>
        </motion.div>

        <div className="relative" ref={containerRef}>
          <div className="flex gap-5 items-stretch">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={`main-${currentIndex}`}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex-1 min-w-0 bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 flex flex-col md:flex-row gap-6"
                data-testid={`card-testimonial-${currentIndex}`}
              >
                <div className="flex-shrink-0 flex flex-col items-center md:items-start">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-28 h-28 md:w-36 md:h-36 rounded-xl object-cover"
                    data-testid={`img-testimonial-${currentIndex}`}
                  />
                  <h4 className="text-white font-heading font-bold text-sm mt-3">{current.name}</h4>
                  <p className="text-white/50 text-xs">{current.role}</p>
                </div>
                <div className="flex-1 flex items-center">
                  <p className="text-white/80 text-sm leading-relaxed">
                    "{current.text}"
                  </p>
                </div>
              </motion.div>

              {peek && (
                <motion.div
                  key={`peek-${currentIndex + 1}`}
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.4, ease: "easeInOut", delay: 0.05 }}
                  className="hidden md:flex w-[220px] flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 flex-col items-center justify-center text-center"
                  data-testid={`card-testimonial-peek-${currentIndex + 1}`}
                >
                  <img
                    src={peek.image}
                    alt={peek.name}
                    className="w-24 h-24 rounded-xl object-cover mb-3"
                  />
                  <h4 className="text-white font-heading font-bold text-sm">{peek.name}</h4>
                  <p className="text-white/50 text-xs">{peek.role}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white transition-opacity disabled:opacity-30"
              data-testid="button-testimonial-prev"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-1.5">
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

            <button
              onClick={goNext}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white transition-opacity disabled:opacity-30"
              data-testid="button-testimonial-next"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
