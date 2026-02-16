import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import founderPhoto from "@assets/optimized/image_1770946309483.webp";
import prof1 from "@assets/optimized/Douglas_2_1771009276690.webp";
import prof2 from "@assets/optimized/Alex_França_1771008596696.webp";
import prof3 from "@assets/optimized/Érica_Midori_Ikegami_2_1771009641365.webp";
import prof4 from "@assets/optimized/Vinicius_Coscioni_1771008596701.webp";
import prof5 from "@assets/optimized/Nelson_Carvas_Junior_1771008596706.webp";
import prof6 from "@assets/optimized/Leonardo_Mose_1771008596708.webp";
import prof7 from "@assets/optimized/Thayane_1771008596707.webp";
import prof8 from "@assets/optimized/George_Jó_Sousa_1771008596702.webp";
import prof9 from "@assets/optimized/Gisele_Magarotto_Machado_1771008596703.webp";
import prof10 from "@assets/optimized/Marcio_Braga_de_Melo_1771008596710.webp";
import prof11 from "@assets/optimized/Icaro_Moreira_Costa_1771008596705.webp";

interface Professor {
  id: number;
  name: string;
  institution: string;
  role: string;
  cardLabel: string;
  bio: string;
  photo: string;
  photoPosition?: string;
  photoScale?: number;
}

const professors: Professor[] = [
  {
    id: 1,
    name: "Me. Douglas de Farias Dutra",
    institution: "Psicometria Online Academy",
    role: "Análise de Dados com o R",
    cardLabel: "Professor do Curso de Análise de Dados com o R",
    photoPosition: "center 30%",
    photoScale: 1.4,
    bio: "Mestre em Psicologia pela Universidade Federal do Rio de Janeiro (UFRJ), com foco em funções executivas e neuropsicologia cognitiva. Fundador da Psicometria Online Academy, atua como professor e consultor em psicometria, análise quantitativa de dados e construção de instrumentos psicológicos. Especialista em linguagem R aplicada à pesquisa científica desde 2017. Na Academy, será seu professor de Análise de Dados com o R.",
    photo: prof1,
  },
  {
    id: 2,
    name: "Dr. Alex Bacadini França",
    institution: "Psicometria Online Academy",
    role: "Análise de Redes",
    cardLabel: "Professor do Curso de Análise de Redes: Teoria e Prática",
    bio: "Doutor e Mestre em Psicologia pela Universidade Federal de São Carlos, com estágio-sanduíche na Universidade do Porto (Portugal) e pós-doutorado na Open University (Inglaterra). Especialista em análise quantitativa de dados, psicometria e análise de redes (network analysis). Possui experiência com testes e medidas psicológicas, metacognição, envelhecimento e qualidade de vida. Na Academy, será seu professor de Análise de Redes: Teoria e Prática.",
    photo: prof2,
  },
  {
    id: 3,
    name: "Dra. Érica Midori Ikegami",
    institution: "Universidade Federal do Triângulo Mineiro",
    role: "Zotero",
    cardLabel: "Professora do Curso de Zotero",
    bio: "Doutora e Mestre em Atenção à Saúde pela Universidade Federal do Triângulo Mineiro (UFTM). Especialista em Fisioterapia em Gerontologia, com pós-graduação em Residência Integrada Multiprofissional em Saúde (UFTM). Possui vasta experiência em pesquisa quantitativa, revisões sistemáticas e gerenciamento de referências bibliográficas. Na Academy, será sua professora de Zotero.",
    photo: prof3,
  },
  {
    id: 4,
    name: "Dr. Vinicius Coscioni",
    institution: "Utrecht University",
    role: "Metodologia e Revisões da Literatura",
    cardLabel: "Professor do Curso de Metodologia e Revisões da Literatura",
    bio: "Professor Assistente no Departamento de Psicologia do Desenvolvimento da Universidade de Utrecht, Holanda. Doutor em Psicologia pela Universidade de Coimbra (Portugal) e pela UFRGS. Especialista em revisões sistemáticas, scoping reviews e síntese de evidências. Autor de múltiplas revisões publicadas em periódicos internacionais, com expertise em metodologia de pesquisa e desenvolvimento de escalas psicométricas validadas internacionalmente. Na Academy, será seu professor de Metodologia e Revisões da Literatura.",
    photo: prof4,
  },
  {
    id: 5,
    name: "Dr. Nelson Carvas Junior",
    institution: "UNIFESP (Cochrane)",
    role: "Metanálise",
    cardLabel: "Professor do Curso de Metanálise",
    photoPosition: "top",
    bio: "Doutorando em Saúde Baseada em Evidências pela UNIFESP e pesquisador voluntário da Cochrane Brasil. Mestre em Ciências da Saúde, com expertise em metanálise em rede (network meta-analysis), revisões sistemáticas rápidas e vivas (rapid living systematic reviews). Atua como estatístico e metodologista em múltiplos projetos multicêntricos de síntese de evidências. Na Academy, será seu professor de Metanálise.",
    photo: prof5,
  },
  {
    id: 6,
    name: "Dr. Leonardo de Barros Mose",
    institution: "Universidade São Francisco",
    role: "Multinível e Controle de Vieses de Resposta",
    cardLabel: "Professor do Curso de Multinível e Controle de Vieses de Resposta",
    bio: "Doutor e Mestre em Psicologia pela Universidade São Francisco (CAPES 7). Membro do GT de Psicometria na ANPEPP. Especialista em psicometria, modelagem de equações estruturais, teoria de resposta ao item, análises multinível e multigrupo, avaliação em larga escala e controle de vieses de resposta. Atua nas áreas de personalidade, interesses profissionais e habilidades socioemocionais. Na Academy, será seu professor de Modelos Multinível e Controle de Vieses de Resposta.",
    photo: prof6,
  },
  {
    id: 7,
    name: "Dra. Thayane Woellner Sviercoski Manosso",
    institution: "Universidade Federal de Santa Maria",
    role: "Mendeley e EndNote",
    cardLabel: "Professora do Curso de Mendeley e EndNote",
    bio: "Doutoranda em Engenharia de Produção pela UFSM. Mestre em Administração pela Universidade de Passo Fundo (bolsista CAPES). Pós-graduada em Economia e Gestão do Agronegócio pela FGV e Engenheira Agrônoma pela UEPG. Possui expertise em análise de dados, metodologia de pesquisa e gerenciamento de referências bibliográficas. Na Academy, será sua professora de Mendeley e EndNote.",
    photo: prof7,
  },
  {
    id: 8,
    name: "Dr. George Jó Bezerra Sousa",
    institution: "Ministério da Saúde, Brasil",
    role: "Análise de Dados para Estudos Epidemiológicos",
    cardLabel: "Professor do Curso de Análise de Dados para Estudos Epidemiológicos",
    bio: "Doutor em Cuidados Clínicos em Enfermagem e Saúde pela UECE. Especialista em Informática em Saúde (UNIFESP). Ex-bolsista Ciências sem Fronteiras na James Cook University (Austrália). Consultor Técnico do Programa de Hanseníase do Ministério da Saúde. Membro do Grupo de Pesquisa Clínica e Epidemiologia das Doenças Infecciosas e Parasitárias (CEDIP-UECE). Especialista em análise espacial, séries temporais e mineração de dados em saúde. Na Academy, será seu professor de Análise de Dados para Estudos Epidemiológicos.",
    photo: prof8,
  },
  {
    id: 9,
    name: "Dra. Gisele Magarotto Machado",
    institution: "Universidade de Oslo / Akershus University Hospital",
    role: "Análise de Perfis e Classes Latentes",
    cardLabel: "Professora do Curso de Análise de Classes e Perfis Latentes (LCA/LPA)",
    bio: "Doutora e Mestre em Psicologia com ênfase em Avaliação Psicológica pela Universidade São Francisco (bolsista CAPES). Realizou Doutorado Sanduíche na Universidade de Oslo (PDSE-CAPES). Atualmente é pesquisadora de pós-doutorado duplamente afiliada ao Akershus University Hospital e à Universidade de Oslo (Noruega). Especialista em saúde mental, psicometria, personalidade e transtornos de personalidade. Na Academy, será sua professora de Análise de Classes e Perfis Latentes (LCA/LPA).",
    photo: prof9,
  },
  {
    id: 10,
    name: "Dr. Márcio Braga de Melo",
    institution: "Universidade Federal do Ceará",
    role: "GLM e Equações de Estimativas Generalizadas",
    cardLabel: "Professor do Curso de Modelo Linear Generalizado e Equações de Estimativas Generalizadas",
    bio: "Professor Efetivo no Departamento de Psicologia da Universidade Federal do Ceará (UFC). Doutor e Mestre em Ciências na linha de Neurobiologia da Memória pela UNIFESP (CAPES 7). Pós-graduado em Neuropsicologia pelo CDN-SP. Graduado em Psicologia pela UFAL. Especialista em modelos lineares generalizados (GLM), equações de estimativas generalizadas (GEE) e modelos lineares mistos generalizados (GLMM). Na Academy, será seu professor de Modelo Linear Generalizado e Equações de Estimativas Generalizadas.",
    photo: prof10,
  },
  {
    id: 11,
    name: "Dr. Ícaro Moreira Costa",
    institution: "Universidade de Fortaleza",
    role: "IRAMUTEQ",
    cardLabel: "Professor do Curso de IRAMUTEQ",
    bio: "Doutor em Psicologia pela UFRGS, Mestre e Graduado em Psicologia pela Universidade de Fortaleza (UNIFOR). Professor na área de Avaliação Psicológica e Pesquisa Quantitativa na UNIFOR. Psicólogo clínico com orientação cognitivo-comportamental. Dedicado a estudos em saúde mental, psicometria e análise de dados textuais. Na Academy, será seu professor de IRAMUTEQ.",
    photo: prof11,
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
          style={{
            ...(professor.photoPosition ? { objectPosition: professor.photoPosition } : {}),
            ...(professor.photoScale ? { transform: `scale(${professor.photoScale})` } : {}),
          }}
        />
      </div>
      <h3 className="text-base font-heading font-bold text-[#0A2E76]">{professor.name}</h3>
      <p className="text-sm text-[hsl(215,15%,45%)] mt-0.5">{professor.institution}</p>
      <p className="text-sm text-[#0065FF] font-medium mt-1">{professor.cardLabel}</p>
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
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
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

        <div className="p-6 pb-0 flex justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#F4F5F7] shadow-lg flex-shrink-0">
            <img
              src={professor.photo}
              alt={professor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="p-6 pt-4 text-center">
          <h3
            className="text-xl font-heading font-bold text-[#0A2E76] mb-1"
            data-testid="text-modal-professor-name"
          >
            {professor.name}
          </h3>
          <p className="text-sm text-[hsl(215,15%,45%)] mb-1">{professor.institution}</p>
          <p className="text-sm font-semibold text-[#0065FF] mb-4">{professor.role}</p>
          {(() => {
            const parts = professor.bio.split(/(Na Academy,.*$)/);
            return (
              <>
                <p className="text-sm text-[hsl(215,15%,35%)] leading-relaxed text-left mb-4">{parts[0].trim()}</p>
                {parts[1] && (
                  <p className="text-sm font-semibold text-[#0065FF] text-left mb-6">{parts[1].trim()}</p>
                )}
              </>
            );
          })()}
          <a
            href="https://psicometriaonline.com.br/academy/"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-professor-signup"
          >
            <Button className="w-full bg-[#0065FF] hover:bg-[#0050CC] text-white font-semibold gap-2">
              Cadastre-se Gratuitamente
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
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
