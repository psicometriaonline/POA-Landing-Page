import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Já sei um pouco de análise de dados. Vou me beneficiar?",
    answer:
      "Se você já sabe análise de dados, certamente precisou ralar muito sozinho! A partir de agora, esse desenvolvimento solitário não fará mais parte da sua vida. Você estará conectado em uma formação onde milhares de pesquisadores respiram pesquisa quantitativa. Além disso, terá toda nossa estrutura de suporte para continuar avançando, agora em ritmo muito mais acelerado.",
  },
  {
    question: "Quais softwares serão utilizados?",
    answer:
      "O uso do software vai depender da análise a ser realizada. Utilizamos o SPSS e JASP para as análises bi e multivariadas (correlação, regressões, teste t, análises de variância, testes não-paramétricos, curva ROC, qui-quadrado, etc), FACTOR para análises fatoriais exploratórias, JASP para Análises Fatoriais Confirmatórias e Análises de Rede e Mplus para toda a família da modelagem por equações estruturais. Além disso, todas as análises serão replicadas em R. Sempre que um novo software for inserido, teremos aulas específicas ensinando como utilizá-lo.",
  },
  {
    question: "Para quais áreas a formação se aplica?",
    answer:
      "Temos alunos dos mais diversos cursos, como: psicologia, enfermagem, educação física, medicina, odontologia, epidemiologia, fonoaudiologia, nutrição, economia, ciências agrárias, bioquímica. Focamos mais em pesquisas na área da saúde e com seres humanos, mas temos cursos que são úteis para pesquisadores das mais diversas áreas.",
  },
  {
    question: "Não sou da Psicologia. Isso é um problema?",
    answer:
      "De forma alguma. Temos alunos dos mais diversos cursos, como: psicologia, enfermagem, educação física, medicina, odontologia, epidemiologia, fonoaudiologia, nutrição, economia, ciências agrárias, bioquímica. Focamos mais em pesquisas na área da saúde e com seres humanos, mas temos cursos que são úteis para pesquisadores das mais diversas áreas.",
  },
  {
    question: "Terei os resultados mencionados?",
    answer:
      "A Psicometria Online Academy lhe oferece todos os recursos para que você possa se tornar um pesquisador de alto nível! Contamos com o seu empenho e dedicação para que você consiga conquistar todos os seus sonhos acadêmicos.",
  },
];

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="bg-white rounded-xl border border-[#E2E5EA] px-6"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-start gap-4 py-5 group cursor-pointer"
        data-testid={`button-faq-${index}`}
        aria-expanded={open}
      >
        <span className="flex-1 text-base md:text-lg font-heading font-semibold text-[#0A2E76] leading-snug">
          {question}
        </span>
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0065FF]/10 flex items-center justify-center transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <ChevronDown className="w-4 h-4 text-[#0065FF]" />
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "500px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p
          className="text-sm md:text-base text-[hsl(215,15%,40%)] leading-relaxed pb-5 pr-12"
          data-testid={`text-faq-answer-${index}`}
        >
          {answer}
        </p>
      </div>
    </motion.div>
  );
}

export function FaqSection() {
  return (
    <section
      id="faq"
      data-testid="section-faq"
      className="section-padding"
      style={{ backgroundColor: "#F4F5F7" }}
    >
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            className="text-heading-1 md:text-display-sm font-heading font-bold text-[#0A2E76] leading-[1.15] mb-4"
            data-testid="text-faq-title"
          >
            Perguntas Frequentes
          </h2>
          <p
            className="text-body-lg text-[hsl(215,15%,45%)] max-w-2xl mx-auto leading-relaxed"
            data-testid="text-faq-subtitle"
          >
            Tire suas dúvidas sobre a formação, os softwares e como a Academy pode ajudar na sua pesquisa.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <FaqItem key={i} question={faq.question} answer={faq.answer} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
