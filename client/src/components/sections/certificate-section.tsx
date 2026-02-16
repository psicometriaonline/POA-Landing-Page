import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronRight, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import certificateImg from "@assets/Im-2-copiar_1770941008351.webp";
import imgVanessa from "@assets/Vanessa_Cesnik_1771207282488.png";
import imgGustavo from "@assets/Gustavo_Pfister_Pirola_1771207282488.jpg";
import imgFrancine from "@assets/Francine-Alves_1771207282487.webp";
import imgWalquiria from "@assets/Walquiria_de_Andrade_1771207282485.jpg";
import imgMarcio from "@assets/Márcio_Miranda_Leitão_1771207282487.png";
import imgMatheus from "@assets/Matheus_Felix_1771207282486.png";
import imgKaline from "@assets/Kaline_Lima_1771207282489.jpg";
import imgLuis from "@assets/Luis_Felipe_1771207282489.jpg";
import imgMiriam from "@assets/Miriam-Strelhow-2_1771207282488.webp";

const testimonials = [
  {
    name: "Dra. Vanessa Cesnik",
    role: "Dra. em Psicologia (USP)",
    image: imgVanessa,
    text: "É o lugar onde me sinto segura pra poder estudar e tomar minhas decisões metodológicas e de pesquisa. Apesar de ter feito doutorado na USP, não aprendi nem metade do que aprendi na Academy. Isso que nem fiz todos os módulos ainda.",
  },
  {
    name: "Me. Gustavo Pfister",
    role: "Mestre em Psicologia (UFES)",
    image: imgGustavo,
    text: "Recentemente defendi minha dissertação e a banca elogiou bastante as análises dos dados. O caminho proporcionado pela Academy foi essencial pelo sucesso nesse processo de virar mestre. Só tenho a agradecer (muitíssimo!). Melhor investimento que fiz com a bolsa da pós.",
  },
  {
    name: "Dra. Francine Alves",
    role: "Dra. em Ciências (UNG)",
    image: imgFrancine,
    text: "Defendi meu doutorado. Só posso agradecer à Academy. Com o conhecimento fiz as análises sozinha, descrevi e a banca não teve nenhum comentário ou pergunta sobre as análises que realizei. Pelo contrário, foi elogiada toda a parte da análise de dados.",
  },
  {
    name: "Dra. Walquiria de Andrade",
    role: "Dra. em Educação Física (UEL)",
    image: imgWalquiria,
    text: "A Academy permitiu que eu aprendesse sobre algo que eu achava impossível me apropriar. A Academy fez o movimento inverso, me fazendo acreditar que eu podia sim fazer minha própria análise de forma segura com embasamento teórico científico de excelência.",
  },
  {
    name: "Dr. Márcio de Miranda Leitão",
    role: "Professor do curso de Letras da UFPB",
    image: imgMarcio,
    text: "A Academy é um porto seguro. Enriqueceu sobremaneira minha formação e consolidou meu conhecimento prévio em estatística. Também leciono nessa área de metodologia quantitativa e bioestatística e tem sido fundamental para melhorar meu material, minhas aulas e meu conhecimento.",
  },
  {
    name: "Dr. Matheus Felix",
    role: "Dr. em Ciências do Comportamento (UnB)",
    image: imgMatheus,
    text: "Acabei de me tornar doutor pela UnB em Ciências do Comportamento (área de Cognição e Neurociências). Me formei pela UFMG e no mestrado pela USP e mesmo tendo passado pelas melhores instituições de ensino nesse país, nunca tive um aprofundamento tão amplo em psicometria quanto tive na Academy. A parte das análises que conduzi sozinho foi extremamente elogiada e isso devo sobretudo às aulas e às indicações de leituras da Academy.",
  },
  {
    name: "Dra. Kaline Lima",
    role: "Professora da UNIFOR",
    image: imgKaline,
    text: "Conhecia o Bruno antes mesmo da Psicometria Online Academy, pois sempre quis ser Psicometrista também. Ao lançar a plataforma, entrei na primeira turma. Maratonei todas as aulas, inseri todos os certificados no meu currículo, finalizei meu doutorado sem nenhuma dificuldade teórica ou metodológica. Publiquei vários artigos nacionais e internacionais com a ajuda da Academy. E realizei um sonho de me tornar professora de um renomado Programa de Pós-Graduação na UNIFOR.",
  },
  {
    name: "Dr. Luis Felipe",
    role: "Professor do curso de Enfermagem (UESPI)",
    image: imgLuis,
    text: "Conheci a Academy quando precisava analisar os dados da minha dissertação. Foi lá que adquiri o conhecimento necessário para conquistar autonomia e me tornar um pesquisador independente. Além de me ajudar a defender minha dissertação com segurança, a Academy também contribuiu diretamente para minha aprovação como professor em uma universidade pública. Foi o melhor investimento que fiz na minha formação como pesquisador.",
  },
  {
    name: "Dra. Miriam Raquel Strelhow",
    role: "Professora do Departamento de Psicologia (PUC-SP)",
    image: imgMiriam,
    text: "Desde de que entrei na Academy, desenvolvi novos e importantes conhecimentos. Fiz todas as minhas análises do pós-doc e passei a auxiliar com mais convicção os grupos de pesquisa dos quais faço parte na USP. Fiz consultorias de análises para colegas. Melhorei meus conhecimentos em Metodologia de Pesquisa e já ministrei aulas sobre isso desde então. Me sinto segura, pois sei que quando preciso, posso recorrer à Academy.",
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
              className="bg-white text-[#0A2E76] font-semibold mb-4 text-sm px-4 py-1 no-default-hover-elevate no-default-active-elevate"
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
                className="hidden md:flex flex-shrink-0 w-11 h-11 rounded-full bg-white/25 border border-white/35 items-center justify-center text-white transition-opacity disabled:opacity-30"
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
                      <p className="text-white/80 text-base leading-relaxed">
                        "{current.text}"
                      </p>
                    </div>
                    <button
                      onClick={goPrev}
                      disabled={currentIndex === 0}
                      className="flex md:hidden absolute left-2 top-1/2 -translate-y-1/2 mt-8 w-8 h-8 rounded-full bg-white/20 border border-white/30 items-center justify-center text-white transition-opacity disabled:opacity-30 z-20"
                      data-testid="button-testimonial-prev-mobile"
                      aria-label="Depoimento anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={goNext}
                      disabled={currentIndex >= maxIndex}
                      className="flex md:hidden absolute right-2 top-1/2 -translate-y-1/2 mt-8 w-8 h-8 rounded-full bg-white/20 border border-white/30 items-center justify-center text-white transition-opacity disabled:opacity-30 z-20"
                      data-testid="button-testimonial-next-mobile"
                      aria-label="Próximo depoimento"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
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
                className="hidden md:flex flex-shrink-0 w-11 h-11 rounded-full bg-white/25 border border-white/35 items-center justify-center text-white transition-opacity disabled:opacity-30"
                data-testid="button-testimonial-next"
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
