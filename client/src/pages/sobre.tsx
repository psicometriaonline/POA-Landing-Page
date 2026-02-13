import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import founderPhoto from "@assets/image_1770946309483.png";
import prof1 from "@assets/professor-1.jpg";
import prof2 from "@assets/professor-2.jpg";
import prof3 from "@assets/professor-3.jpg";
import prof4 from "@assets/professor-4.jpg";
import prof5 from "@assets/professor-5.jpg";
import prof6 from "@assets/professor-6.jpg";
import prof7 from "@assets/professor-7.jpg";
import prof8 from "@assets/professor-8.jpg";
import prof9 from "@assets/professor-9.jpg";
import prof10 from "@assets/professor-10.jpg";
import prof11 from "@assets/professor-11.jpg";
import prof12 from "@assets/professor-12.jpg";

interface Professor {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo: string;
}

const professors: Professor[] = [
  {
    id: 1,
    name: "Lucas Mendes",
    role: "Psicometria Clássica",
    bio: "Doutor em Psicologia pela USP, com especialização em Teoria Clássica dos Testes. Atua há mais de 10 anos no desenvolvimento e validação de instrumentos psicológicos para o contexto brasileiro.",
    photo: prof1,
  },
  {
    id: 2,
    name: "Mariana Costa",
    role: "Análise Fatorial",
    bio: "Mestre e Doutora em Psicologia pela UFMG, com foco em análise fatorial exploratória e confirmatória. Pesquisadora com ampla experiência em modelagem de equações estruturais.",
    photo: prof2,
  },
  {
    id: 3,
    name: "Roberto Almeida",
    role: "Teoria de Resposta ao Item",
    bio: "Professor Doutor com pós-doutorado em TRI pela Universidade de Amsterdam. Especialista em modelos de Rasch e calibração de itens para avaliações de larga escala.",
    photo: prof3,
  },
  {
    id: 4,
    name: "Camila Ferreira",
    role: "Estatística Aplicada",
    bio: "Doutora em Estatística pela UNICAMP, com foco em métodos quantitativos aplicados às ciências sociais. Experiência em consultoria estatística para pesquisas acadêmicas.",
    photo: prof4,
  },
  {
    id: 5,
    name: "André Oliveira",
    role: "Análise de Dados com R",
    bio: "Mestre em Ciência de Dados pela PUC-Rio. Especialista em programação em R e Python para análises psicométricas, com foco em automação de relatórios e visualização de dados.",
    photo: prof5,
  },
  {
    id: 6,
    name: "Juliana Santos",
    role: "Avaliação Psicológica",
    bio: "Doutora em Avaliação Psicológica pela UnB. Membro do SATEPSI e especialista em construção, adaptação e validação de testes psicológicos no contexto clínico e organizacional.",
    photo: prof6,
  },
  {
    id: 7,
    name: "Felipe Rocha",
    role: "Machine Learning",
    bio: "Doutor em Inteligência Artificial pela COPPE/UFRJ. Pesquisador com foco na aplicação de técnicas de machine learning e IA para análise de dados comportamentais e psicométricos.",
    photo: prof7,
  },
  {
    id: 8,
    name: "Isabela Lima",
    role: "Metodologia de Pesquisa",
    bio: "Doutora em Metodologia de Pesquisa pela UFSC. Especialista em delineamentos experimentais, meta-análise e revisão sistemática aplicados à Psicologia.",
    photo: prof8,
  },
  {
    id: 9,
    name: "Patrícia Duarte",
    role: "Psicologia Positiva",
    bio: "Pós-Doutora em Psicologia Positiva pela University of Pennsylvania. Pesquisadora com foco em bem-estar subjetivo, forças de caráter e florescimento humano.",
    photo: prof9,
  },
  {
    id: 10,
    name: "Thiago Nascimento",
    role: "Análise Multinível",
    bio: "Doutor em Psicologia Social pela UERJ. Especialista em modelagem multinível e análise de dados longitudinais aplicados ao contexto organizacional e educacional.",
    photo: prof10,
  },
  {
    id: 11,
    name: "Carolina Vieira",
    role: "Neuropsicometria",
    bio: "Doutora em Neurociência pela UFRGS. Pesquisadora com foco na interface entre neurociência cognitiva e psicometria, desenvolvendo instrumentos de avaliação neuropsicológica.",
    photo: prof11,
  },
  {
    id: 12,
    name: "Ricardo Martins",
    role: "Análise Bayesiana",
    bio: "Pós-Doutor em Estatística Bayesiana pela University of Cambridge. Especialista em modelos bayesianos aplicados à psicometria e estimação de parâmetros em amostras reduzidas.",
    photo: prof12,
  },
];

function ProfessorCard({ professor, onClick }: { professor: Professor; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="cursor-pointer group"
      onClick={onClick}
      data-testid={`card-professor-${professor.id}`}
    >
      <div className="aspect-[4/5] rounded-xl overflow-hidden mb-4">
        <img
          src={professor.photo}
          alt={professor.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="text-base font-heading font-bold text-[#0A2E76]">{professor.name}</h3>
      <p className="text-sm text-[#0065FF] font-medium mt-0.5">{professor.role}</p>
      <p className="text-sm text-[hsl(215,15%,45%)] mt-1.5 leading-relaxed line-clamp-2">{professor.bio}</p>
    </motion.div>
  );
}

function ProfessorModal({ professor, onClose }: { professor: Professor; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col sm:flex-row"
        onClick={(e) => e.stopPropagation()}
        data-testid={`modal-professor-${professor.id}`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#0A2E76] hover:bg-white transition-colors"
          data-testid="button-close-professor-modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="sm:w-2/5 flex-shrink-0">
          <div className="aspect-[3/4] sm:h-full">
            <img
              src={professor.photo}
              alt={professor.name}
              className="w-full h-full object-cover rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl"
            />
          </div>
        </div>

        <div className="p-6 sm:p-8 flex flex-col justify-center sm:w-3/5">
          <h3
            className="text-xl font-heading font-bold text-[#0A2E76] mb-1"
            data-testid="text-modal-professor-name"
          >
            {professor.name}
          </h3>
          <p className="text-sm font-semibold text-[#0065FF] mb-5">{professor.role}</p>
          <p className="text-body-md text-[hsl(215,15%,35%)] leading-relaxed">{professor.bio}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Sobre() {
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);

  return (
    <main data-testid="page-sobre" className="pt-20">
      <section
        className="section-padding"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-sm font-semibold text-[#0065FF] uppercase tracking-wider mb-4"
                data-testid="text-sobre-label"
              >
                Sobre o Fundador
              </p>
              <h1
                className="text-display-sm md:text-display-md font-heading font-bold text-[#0A2E76] leading-[1.1] mb-8"
                data-testid="text-sobre-title"
              >
                Minha missão de levar formação de excelência para todos.
              </h1>
              <div className="space-y-5">
                <p
                  className="text-body-md text-[hsl(215,15%,35%)] leading-relaxed"
                  data-testid="text-sobre-bio-1"
                >
                  Sou psicólogo (UEPB), mestre e doutor em Psicologia (UFRGS, CAPES 7), com foco em psicometria e análise quantitativa de dados desde 2007. Fui professor do Instituto de Psicologia da UFRJ, onde coordenei o Laboratório de Psicometria e Psicologia Positiva (LP3) e atuei como chefe do Departamento de Psicometria (2015-2019) e coordenador do Comitê de Ética do CFCH (2017-2019). Fui editor-chefe da Trends in Psychology (2012-2016), da Sociedade Brasileira de Psicologia (SBP) e Editor-Associado da Spanish Journal of Psychology, na área de Psicometria e Métodos Quantitativos.
                </p>
                <p
                  className="text-body-md text-[hsl(215,15%,35%)] leading-relaxed"
                  data-testid="text-sobre-bio-2"
                >
                  Em 2020, pedi exoneração da UFRJ para fundar a Psicometria Online Academy, uma formação com um objetivo claro: alavancar sua trajetória acadêmica e formar pesquisadores de excelência.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
                <div data-testid="stat-experience">
                  <p className="text-2xl md:text-3xl font-heading font-bold text-[#0A2E76]">17+</p>
                  <p className="text-sm text-[hsl(215,15%,45%)] mt-1">Anos de Experiência</p>
                </div>
                <div data-testid="stat-articles">
                  <p className="text-2xl md:text-3xl font-heading font-bold text-[#0A2E76]">60+</p>
                  <p className="text-sm text-[hsl(215,15%,45%)] mt-1">Artigos Publicados</p>
                </div>
                <div data-testid="stat-citations">
                  <p className="text-2xl md:text-3xl font-heading font-bold text-[#0A2E76]">5.200+</p>
                  <p className="text-sm text-[hsl(215,15%,45%)] mt-1">Citações</p>
                </div>
                <div data-testid="stat-students">
                  <p className="text-2xl md:text-3xl font-heading font-bold text-[#0A2E76]">2.000+</p>
                  <p className="text-sm text-[hsl(215,15%,45%)] mt-1">Alunos Formados</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div
                className="relative w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden shadow-xl"
                data-testid="img-founder-photo"
              >
                <img
                  src={founderPhoto}
                  alt="Bruno Figueiredo Damásio - Fundador da Psicometria Online Academy"
                  className="w-full h-full object-cover object-[center_15%]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        className="section-padding"
        style={{ backgroundColor: "#F4F5F7" }}
      >
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p
              className="text-sm font-semibold text-[#0065FF] uppercase tracking-wider mb-4"
              data-testid="text-team-label"
            >
              Um sonho compartilhado
            </p>
            <h2
              className="text-display-sm md:text-display-md font-heading font-bold text-[#0A2E76] leading-[1.1] max-w-3xl mx-auto"
              data-testid="text-team-title"
            >
              Somos mais de 15 pesquisadores dedicados à sua formação.
            </h2>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
            data-testid="grid-team-members"
          >
            {professors.map((professor) => (
              <ProfessorCard
                key={professor.id}
                professor={professor}
                onClick={() => setSelectedProfessor(professor)}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProfessor && (
          <ProfessorModal
            professor={selectedProfessor}
            onClose={() => setSelectedProfessor(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
