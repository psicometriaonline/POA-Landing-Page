import { motion } from "framer-motion";
import founderPhoto from "@assets/image_1770946309483.png";

export default function Sobre() {
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
                  Em 2020, deixei a carreira acadêmica para fundar a Psicometria Online Academy, uma formação com um objetivo claro: alavancar sua trajetória acadêmica e formar pesquisadores de excelência.
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
            className="text-center mb-12"
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-testid="grid-team-members"
          >
            {/* Cards dos professores serão adicionados aqui */}
          </div>
        </div>
      </section>
    </main>
  );
}
