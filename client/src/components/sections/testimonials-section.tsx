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
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const current = testimonials[currentIndex];
  const peek = testimonials[(currentIndex + 1) % testimonials.length];

  return (
    <section className="bg-[#0A2E76] py-16 md:py-24" data-testid="section-testimonials">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
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
              className="hidden md:flex flex-shrink-0 w-11 h-11 rounded-full bg-white/10 border border-white/20 items-center justify-center text-white transition-opacity hover:bg-white/20"
              data-testid="button-testimonial-prev"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 flex gap-5 items-stretch">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={`main-${currentIndex}`}
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
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
                      loading="lazy"
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

                <motion.div
                  key={`peek-${(currentIndex + 1) % testimonials.length}`}
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.4, ease: "easeInOut", delay: 0.05 }}
                  className="hidden md:flex w-[240px] flex-shrink-0 rounded-2xl p-6 flex-col items-center justify-center text-center border border-white/10 relative overflow-hidden shadow-2xl"
                  style={{ background: "linear-gradient(135deg, #0D3B94 0%, #1252C4 50%, #1A6BF0 100%)" }}
                  data-testid={`card-testimonial-peek-${(currentIndex + 1) % testimonials.length}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E76]/80 via-transparent to-transparent pointer-events-none" />
                  <img
                    src={peek.image}
                    alt={peek.name}
                    loading="lazy"
                    className="w-32 h-40 rounded-xl object-cover mb-4 shadow-lg relative z-10"
                  />
                  <h4 className="text-white font-heading font-bold text-sm relative z-10">{peek.name}</h4>
                  <p className="text-white/50 text-xs mt-0.5 relative z-10">{peek.role}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={goNext}
              className="hidden md:flex flex-shrink-0 w-11 h-11 rounded-full bg-white/10 border border-white/20 items-center justify-center text-white transition-opacity hover:bg-white/20"
              data-testid="button-testimonial-next"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex md:hidden items-center justify-center gap-4 mt-6">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white transition-opacity hover:bg-white/20"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white transition-opacity hover:bg-white/20"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center gap-1.5 mt-6">
            {testimonials.map((_, i) => (
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
    </section>
  );
}
