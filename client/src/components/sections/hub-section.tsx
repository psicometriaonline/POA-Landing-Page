import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ArrowRight,
  BookOpen,
  Brain,
  PenTool,
  BarChart3,
  GraduationCap,
  Code,
  Sparkles,
  Briefcase,
  ChevronRight,
} from "lucide-react";

interface Course {
  name: string;
  description: string;
  syllabus: string[];
}

interface SubCategory {
  name: string;
  courses: Course[];
}

interface Block {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  icon: typeof BookOpen;
  totalCourses: number;
  subcategories: SubCategory[];
}

const blocks: Block[] = [
  {
    id: 1,
    name: "Ciclo da Autonomia",
    subtitle: "Construa as bases para a independência acadêmica",
    description: "Domine os três pilares fundamentais da pesquisa científica: método, análise de dados e escrita científica.",
    icon: GraduationCap,
    totalCourses: 8,
    subcategories: [
      {
        name: "Desenvolvendo as Competências Essenciais",
        courses: [
          {
            name: "Fundamentos de Estatística para Pesquisadores",
            description: "Domine os conceitos fundamentais de estatística descritiva e inferencial aplicados à pesquisa científica.",
            syllabus: [
              "Introdução aos conceitos fundamentais de estatística descritiva e inferencial",
              "Medidas de tendência central, dispersão e distribuição de frequências",
              "Testes de hipóteses e intervalos de confiança",
              "Correlação e regressão linear simples",
              "Aplicações práticas com exemplos de pesquisas reais",
            ],
          },
          {
            name: "Metodologia de Pesquisa Científica",
            description: "Aprenda a formular problemas de pesquisa e escolher o delineamento mais adequado para seus objetivos.",
            syllabus: [
              "Formulação de problemas e questões de pesquisa",
              "Delineamentos experimentais e quase-experimentais",
              "Pesquisa quantitativa vs. qualitativa vs. mista",
              "Amostragem probabilística e não probabilística",
              "Ética em pesquisa e submissão ao comitê de ética",
            ],
          },
          {
            name: "Escrita Científica e Normas APA",
            description: "Desenvolva habilidades de redação acadêmica seguindo as normas APA 7ª edição.",
            syllabus: [
              "Estrutura do artigo científico: introdução, método, resultados e discussão",
              "Normas APA 7ª edição para formatação e referências",
              "Técnicas de redação objetiva e concisa",
              "Construção de tabelas e figuras para publicação",
              "Estratégias para submissão em periódicos indexados",
            ],
          },
          {
            name: "Análise de Dados com SPSS",
            description: "Realize análises estatísticas completas utilizando o software SPSS com confiança.",
            syllabus: [
              "Interface e configuração do ambiente SPSS",
              "Importação e preparação de bancos de dados",
              "Análises descritivas e exploratórias",
              "Testes paramétricos e não paramétricos",
              "Geração e interpretação de outputs estatísticos",
            ],
          },
          {
            name: "Introdução ao JASP e Jamovi",
            description: "Conheça alternativas gratuitas ao SPSS para suas análises estatísticas.",
            syllabus: [
              "Visão geral dos softwares gratuitos JASP e Jamovi",
              "Comparação com SPSS e quando utilizar cada um",
              "Realização de análises frequentistas básicas",
              "Introdução à estatística bayesiana no JASP",
              "Criação de relatórios visuais e exportação de resultados",
            ],
          },
        ],
      },
      {
        name: "Gerenciadores de Referências",
        courses: [
          {
            name: "Mendeley: do Básico ao Avançado",
            description: "Organize toda a sua biblioteca acadêmica e automatize suas citações com o Mendeley.",
            syllabus: [
              "Instalação e configuração do Mendeley Desktop e Web",
              "Organização de bibliotecas e coleções de artigos",
              "Inserção automática de citações no Word",
              "Colaboração em grupos e compartilhamento de referências",
              "Anotações, marcações e busca dentro dos PDFs",
            ],
          },
          {
            name: "Zotero para Pesquisadores",
            description: "Utilize o Zotero para gerenciar referências de forma eficiente e integrada.",
            syllabus: [
              "Configuração inicial e extensão para navegador",
              "Importação de referências de bases de dados acadêmicas",
              "Integração com Google Docs e processadores de texto",
              "Plugins e complementos úteis para pesquisadores",
              "Sincronização e backup da biblioteca de referências",
            ],
          },
          {
            name: "EndNote: Gestão Profissional de Referências",
            description: "Domine o EndNote para gestão avançada de bibliotecas bibliográficas de grande porte.",
            syllabus: [
              "Funcionalidades avançadas do EndNote",
              "Criação de estilos bibliográficos personalizados",
              "Gestão de bibliotecas de grande porte",
              "Integração com bases de dados como Web of Science",
              "Dicas de produtividade e automação de referências",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Aprofundamento Estratégico",
    subtitle: "Domine técnicas avançadas de análise e pesquisa",
    description: "Com os nossos cursos de aprofundamento estratégico, você passará a ser reconhecido como um expert na sua área específica de conhecimento.",
    icon: Brain,
    totalCourses: 16,
    subcategories: [
      {
        name: "Modelos Generalizados e Mistos",
        courses: [
          {
            name: "Modelos Lineares Generalizados (GLM)",
            description: "Aprenda a aplicar GLMs para dados que não seguem distribuição normal.",
            syllabus: [
              "Fundamentos teóricos dos modelos lineares generalizados",
              "Regressão logística binária e multinomial",
              "Regressão de Poisson e modelos para dados de contagem",
              "Seleção de modelos e diagnósticos de ajuste",
              "Aplicações práticas com interpretação de resultados",
            ],
          },
          {
            name: "Modelos Mistos e Multinível",
            description: "Analise dados hierárquicos e longitudinais com modelos de efeitos mistos.",
            syllabus: [
              "Introdução à análise multinível e dados hierárquicos",
              "Modelos de efeitos fixos, aleatórios e mistos",
              "Estimação por máxima verossimilhança e REML",
              "Análise longitudinal com medidas repetidas",
              "Interpretação de componentes de variância e ICC",
            ],
          },
        ],
      },
      {
        name: "Psicometria Básica e Avançada",
        courses: [
          {
            name: "Teoria Clássica dos Testes (TCT)",
            description: "Domine os fundamentos da TCT e aprenda a avaliar a qualidade dos seus instrumentos.",
            syllabus: [
              "Fundamentos da TCT: escore verdadeiro e erro de medida",
              "Fidedignidade: alfa de Cronbach, teste-reteste, formas paralelas",
              "Validade de conteúdo, critério e construto",
              "Análise de itens: dificuldade, discriminação e distratores",
              "Padronização e normatização de instrumentos",
            ],
          },
          {
            name: "Análise Fatorial Exploratória (AFE)",
            description: "Descubra a estrutura latente dos seus dados com análise fatorial exploratória.",
            syllabus: [
              "Pressupostos e adequação da amostra (KMO e Bartlett)",
              "Métodos de extração: componentes principais, eixos principais e ML",
              "Critérios de retenção de fatores: autovalor, scree plot, análise paralela",
              "Rotação ortogonal e oblíqua",
              "Interpretação e nomeação de fatores",
            ],
          },
          {
            name: "Análise Fatorial Confirmatória (AFC)",
            description: "Confirme modelos teóricos e avalie invariância de medida com AFC.",
            syllabus: [
              "Especificação de modelos fatoriais confirmatórios",
              "Índices de ajuste: CFI, TLI, RMSEA, SRMR",
              "Modificação de modelos e análise de resíduos",
              "Invariância de medida: configural, métrica e escalar",
              "Comparação entre modelos rivais",
            ],
          },
          {
            name: "Teoria de Resposta ao Item (TRI)",
            description: "Aplique modelos da TRI para análise avançada de itens e escalas.",
            syllabus: [
              "Modelos unidimensionais: 1PL, 2PL e 3PL",
              "Curvas características do item (CCI) e funções de informação",
              "Estimação de parâmetros dos itens e das pessoas",
              "Funcionamento diferencial do item (DIF)",
              "Testagem adaptativa computadorizada (CAT)",
            ],
          },
          {
            name: "Modelagem de Equações Estruturais (MEE)",
            description: "Teste modelos complexos com variáveis latentes e relações causais.",
            syllabus: [
              "Fundamentos teóricos da MEE e path analysis",
              "Especificação de modelos de mensuração e estruturais",
              "Estimação e avaliação de ajuste do modelo",
              "Mediação, moderação e efeitos indiretos",
              "MEE com variáveis latentes e observadas",
            ],
          },
          {
            name: "Construção e Validação de Instrumentos",
            description: "Aprenda todo o processo de criação e validação de escalas psicológicas.",
            syllabus: [
              "Etapas da construção de escalas psicológicas",
              "Revisão da literatura e definição do construto",
              "Elaboração, análise semântica e análise de juízes",
              "Estudo piloto e análise de itens",
              "Evidências de validade e fidedignidade",
            ],
          },
          {
            name: "Análise de Redes em Psicometria",
            description: "Explore relações entre variáveis usando a abordagem de redes.",
            syllabus: [
              "Introdução à abordagem de redes na psicologia",
              "Estimação de redes: LASSO, EBICglasso e redes bayesianas",
              "Centralidade, estabilidade e interpretação de grafos",
              "Comparação entre redes de diferentes grupos",
              "Aplicações clínicas e em psicopatologia",
            ],
          },
          {
            name: "Validade e Evidências de Validade",
            description: "Compreenda a evolução do conceito de validade e como reunir evidências robustas.",
            syllabus: [
              "Evolução do conceito de validade na psicometria",
              "Evidências de validade baseadas no conteúdo",
              "Evidências de validade baseadas na estrutura interna",
              "Evidências de validade baseadas nas relações com variáveis externas",
              "Integração das evidências e argumentação de validade",
            ],
          },
          {
            name: "Análise de Clusters e Perfis Latentes",
            description: "Identifique subgrupos nos seus dados com técnicas de clustering e perfis latentes.",
            syllabus: [
              "Análise de clusters hierárquica e k-means",
              "Análise de perfis latentes (LPA) e classes latentes (LCA)",
              "Critérios de seleção do número de perfis ou clusters",
              "Validação e interpretação dos perfis encontrados",
              "Aplicações práticas em pesquisa psicológica",
            ],
          },
        ],
      },
      {
        name: "Revisões da Literatura e Metanálise",
        courses: [
          {
            name: "Revisão Sistemática da Literatura",
            description: "Conduza revisões sistemáticas seguindo o protocolo PRISMA.",
            syllabus: [
              "Diferenças entre revisão narrativa, integrativa e sistemática",
              "Protocolo PRISMA e registro no PROSPERO",
              "Estratégias de busca em bases de dados acadêmicas",
              "Seleção e extração de dados dos estudos",
              "Avaliação de qualidade e risco de viés",
            ],
          },
          {
            name: "Metanálise: Teoria e Prática",
            description: "Realize sínteses quantitativas de evidências com rigor metodológico.",
            syllabus: [
              "Fundamentos da síntese quantitativa de evidências",
              "Modelos de efeito fixo e efeito aleatório",
              "Heterogeneidade: Q de Cochran e I²",
              "Forest plots e funnel plots",
              "Análise de moderadores e metarregressão",
            ],
          },
        ],
      },
      {
        name: "Análise de Dados Textuais",
        courses: [
          {
            name: "Análise de Conteúdo Quantitativa",
            description: "Analise textos de forma sistemática com técnicas quantitativas.",
            syllabus: [
              "Fundamentos da análise de conteúdo segundo Bardin",
              "Definição de categorias e unidades de análise",
              "Codificação e concordância entre avaliadores (kappa)",
              "Frequência, co-ocorrência e análise temática",
              "Softwares para análise de conteúdo: NVivo e ATLAS.ti",
            ],
          },
          {
            name: "Análise Textual com IRaMuTeQ",
            description: "Utilize o IRaMuTeQ para análises textuais avançadas de corpus.",
            syllabus: [
              "Instalação e preparação do corpus textual",
              "Classificação Hierárquica Descendente (CHD)",
              "Análise de similitude e nuvem de palavras",
              "Análise fatorial de correspondência",
              "Interpretação e apresentação de resultados textuais",
            ],
          },
          {
            name: "Mineração de Texto e NLP para Pesquisa",
            description: "Aplique técnicas de processamento de linguagem natural nos seus dados textuais.",
            syllabus: [
              "Introdução ao processamento de linguagem natural",
              "Pré-processamento de textos: tokenização, stemming e lematização",
              "Análise de sentimento e extração de tópicos",
              "Modelos de tópicos: LDA e STM",
              "Integração de análise textual com dados quantitativos",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Análise de Dados com o R",
    subtitle: "Domine a linguagem R para análise estatística",
    description: "Uma formação inteira em R para você que deseja aprofundar ainda mais o seu conhecimento.",
    icon: Code,
    totalCourses: 6,
    subcategories: [
      {
        name: "Do Básico ao Avançado em R",
        courses: [
          {
            name: "R do Zero: Primeiros Passos",
            description: "Comece a programar em R mesmo sem nenhuma experiência prévia em programação.",
            syllabus: [
              "Instalação do R e RStudio",
              "Tipos de dados, vetores e data frames",
              "Importação e exportação de dados",
              "Funções básicas e operações com dados",
              "Introdução ao tidyverse: dplyr e tidyr",
            ],
          },
          {
            name: "Visualização de Dados com ggplot2",
            description: "Crie gráficos profissionais para publicação com o pacote ggplot2.",
            syllabus: [
              "Gramática dos gráficos: estéticas, geometrias e camadas",
              "Gráficos de barras, dispersão, boxplot e histogramas",
              "Personalização de temas, cores e rótulos",
              "Gráficos para publicação científica",
              "Exportação em alta resolução para artigos e apresentações",
            ],
          },
          {
            name: "Estatística Inferencial no R",
            description: "Execute todas as principais análises inferenciais diretamente no R.",
            syllabus: [
              "Testes t, ANOVA e ANCOVA no R",
              "Correlação de Pearson e Spearman",
              "Regressão linear e múltipla",
              "Testes não paramétricos: Wilcoxon, Kruskal-Wallis e Mann-Whitney",
              "Tamanho de efeito e poder estatístico",
            ],
          },
          {
            name: "Psicometria com R: Pacotes Essenciais",
            description: "Utilize os pacotes especializados em psicometria disponíveis no R.",
            syllabus: [
              "Pacote psych: análise fatorial e fidedignidade",
              "Pacote lavaan: AFC e modelagem de equações estruturais",
              "Pacote mirt: teoria de resposta ao item",
              "Pacote semTools: invariância de medida",
              "Pacote EGAnet: análise de redes e dimensionalidade",
            ],
          },
          {
            name: "R Markdown e Relatórios Reproduzíveis",
            description: "Produza relatórios dinâmicos que integram código, análise e texto.",
            syllabus: [
              "Criação de documentos dinâmicos com R Markdown",
              "Integração de código, resultados e texto",
              "Formatação para PDF, HTML e Word",
              "Automatização de relatórios de análise",
              "Boas práticas de pesquisa reproduzível",
            ],
          },
          {
            name: "R Avançado: Programação Funcional e Automação",
            description: "Leve suas habilidades em R ao próximo nível com programação funcional.",
            syllabus: [
              "Funções personalizadas e programação funcional com purrr",
              "Loops e iterações eficientes",
              "Web scraping e coleta automatizada de dados",
              "Criação de pacotes R próprios",
              "Integração com APIs e automação de fluxos de trabalho",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Inteligência Artificial Aplicada a Pesquisas Científicas",
    subtitle: "Use IA para acelerar sua pesquisa científica",
    description: "Aprenda procedimentos de análise de dados extremamente inovadores, para responder perguntas de pesquisa cada vez melhores e mais complexas.",
    icon: Sparkles,
    totalCourses: 7,
    subcategories: [
      {
        name: "IA na Pesquisa Científica",
        courses: [
          {
            name: "Introdução à IA para Pesquisadores",
            description: "Entenda o que é IA e como aplicá-la de forma ética na pesquisa científica.",
            syllabus: [
              "O que é inteligência artificial e machine learning",
              "Aplicações da IA na pesquisa científica",
              "Ferramentas de IA generativa: ChatGPT, Claude e Gemini",
              "Prompt engineering para pesquisa acadêmica",
              "Limitações e questões éticas do uso de IA na ciência",
            ],
          },
          {
            name: "ChatGPT para Revisão de Literatura",
            description: "Acelere sua revisão de literatura com estratégias assistidas por IA.",
            syllabus: [
              "Estratégias de busca assistidas por IA",
              "Sumarização e síntese de artigos com ChatGPT",
              "Identificação de lacunas na literatura",
              "Geração de mapas conceituais e frameworks teóricos",
              "Verificação e validação das informações geradas",
            ],
          },
          {
            name: "IA para Análise Qualitativa",
            description: "Otimize sua análise qualitativa com codificação assistida por IA.",
            syllabus: [
              "Codificação assistida por inteligência artificial",
              "Análise temática com suporte de LLMs",
              "Categorização automatizada de respostas abertas",
              "Triangulação entre análise humana e análise por IA",
              "Diretrizes para reportar uso de IA em pesquisa qualitativa",
            ],
          },
          {
            name: "Escrita Científica Assistida por IA",
            description: "Aprimore seus textos acadêmicos com uso ético e eficaz de IA.",
            syllabus: [
              "Uso ético de IA na redação acadêmica",
              "Paráfrase, revisão e aprimoramento de textos",
              "Tradução científica com ferramentas de IA",
              "Criação de resumos e abstracts com assistência de IA",
              "Diretrizes de periódicos sobre uso de IA na escrita",
            ],
          },
          {
            name: "Automação de Coleta de Dados com IA",
            description: "Automatize a coleta e o processamento de dados para sua pesquisa.",
            syllabus: [
              "Web scraping inteligente com assistência de IA",
              "Extração automatizada de dados de artigos em PDF",
              "OCR e processamento de documentos",
              "Criação de pipelines de dados automatizados",
              "Integração com APIs de IA para processamento em larga escala",
            ],
          },
          {
            name: "Machine Learning para Ciências Sociais",
            description: "Aplique algoritmos de machine learning em pesquisas da área social e comportamental.",
            syllabus: [
              "Diferenças entre abordagem estatística e machine learning",
              "Classificação, regressão e clustering",
              "Validação cruzada e prevenção de overfitting",
              "Random forests, SVM e gradient boosting",
              "Interpretabilidade de modelos e SHAP values",
            ],
          },
          {
            name: "Criação de Dashboards com IA",
            description: "Construa dashboards interativos para visualizar seus dados de pesquisa.",
            syllabus: [
              "Introdução à visualização interativa de dados",
              "Criação de dashboards com Shiny (R) e Streamlit (Python)",
              "Integração de modelos de IA em dashboards",
              "Automatização de relatórios visuais",
              "Publicação e compartilhamento de dashboards online",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Desenvolvimento Profissional",
    subtitle: "Transforme conhecimento em carreira",
    description: "Acesse formações profissionalizantes, seja para você que deseja seguir a carreira de professor-pesquisador ou você que quer se tornar consultor em Análise de Dados.",
    icon: Briefcase,
    totalCourses: 2,
    subcategories: [
      {
        name: "Carreira e Mercado",
        courses: [
          {
            name: "Viver de Análise de Dados",
            description: "Aprenda a construir uma carreira sólida como consultor em análise de dados.",
            syllabus: [
              "Panorama do mercado de consultoria em análise de dados",
              "Precificação de serviços estatísticos e consultoria",
              "Captação de clientes e construção de portfólio",
              "Gestão de projetos de consultoria acadêmica",
              "Marketing pessoal e posicionamento profissional",
            ],
          },
          {
            name: "Preparação para Concursos Acadêmicos",
            description: "Prepare-se estrategicamente para concursos de docente universitário.",
            syllabus: [
              "Estrutura e etapas de concursos para docente universitário",
              "Elaboração de memorial acadêmico e plano de trabalho",
              "Preparação de aula didática para banca examinadora",
              "Análise de editais e critérios de pontuação",
              "Estratégias para prova escrita e arguição oral",
            ],
          },
        ],
      },
    ],
  },
];

const competencies = [
  { icon: BarChart3, label: "Análise de Dados" },
  { icon: BookOpen, label: "Método de Pesquisa" },
  { icon: PenTool, label: "Escrita Científica" },
];

export function HubSection() {
  const [activeBlock, setActiveBlock] = useState(0);
  const [syllabusModal, setSyllabusModal] = useState<Course | null>(null);
  const currentBlock = blocks[activeBlock];

  return (
    <section
      data-testid="section-hub"
      className="section-padding"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl px-8 py-14 md:px-16 md:py-20 mb-12 text-center"
          style={{ background: "linear-gradient(135deg, #0A2E76 0%, #0045B5 100%)" }}
        >
          <h2
            className="text-display-sm md:text-display-md font-heading font-bold text-white leading-[1.1] mb-6 tracking-tight"
            data-testid="text-hub-label"
          >
            Hub Educacional
          </h2>
          <p className="text-body-lg md:text-xl text-white/85 leading-relaxed max-w-3xl mx-auto mb-8">
            Tenha acesso a maior formação em Psicometria e Análise Quantitativa de Dados da América Latina e desenvolva todas as principais competências acadêmicas.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {competencies.map((comp) => (
              <div
                key={comp.label}
                className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-md px-4 py-2 border border-white/20"
                data-testid={`badge-competency-${comp.label.toLowerCase().replace(/ /g, "-")}`}
              >
                <comp.icon className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">{comp.label}</span>
              </div>
            ))}
          </div>
          <p className="text-body-md text-white/70 leading-relaxed max-w-2xl mx-auto">
            Nossos cursos vão te levar do absoluto zero até o avançado em análise de dados.
            <br />
            <span className="text-white font-semibold">Você não precisa de nenhum conhecimento prévio.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center mb-10">
            <h3 className="text-heading-1 md:text-display-sm font-heading font-bold text-[#0A2E76] mb-3">
              Uma estrutura hierárquica de aprendizado
            </h3>
            <p className="text-body-lg text-[hsl(215,15%,45%)] max-w-2xl mx-auto leading-relaxed">
              Desenvolvemos uma estrutura hierarquicamente organizada, para que você se desenvolva sem qualquer dificuldade.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
            <div className="space-y-1">
              {blocks.map((block, idx) => (
                <button
                  key={block.id}
                  onClick={() => setActiveBlock(idx)}
                  className={`w-full text-left px-5 py-4 rounded-lg transition-all duration-200 ${
                    activeBlock === idx
                      ? "bg-[#0A2E76] shadow-lg"
                      : "bg-[#F4F5F7]"
                  }`}
                  data-testid={`tab-block-${block.id}`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <block.icon className={`w-4 h-4 shrink-0 ${activeBlock === idx ? "text-white" : "text-[#0065FF]"}`} />
                    <span className={`text-sm font-bold ${activeBlock === idx ? "text-white" : "text-[#0A2E76]"}`}>
                      {block.name}
                    </span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ml-auto shrink-0 ${
                      activeBlock === idx ? "bg-white/20 text-white" : "bg-[#E2E5EA] text-[hsl(215,15%,55%)]"
                    }`}>
                      {block.totalCourses}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed pl-7 ${activeBlock === idx ? "text-white/75" : "text-[hsl(215,15%,55%)]"}`}>
                    {block.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="bg-[#F4F5F7] rounded-2xl p-6 md:p-8 min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBlock.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <currentBlock.icon className="w-5 h-5 text-[#0065FF]" />
                    <h4 className="text-lg font-heading font-bold text-[#0A2E76]">
                      {currentBlock.name}
                    </h4>
                  </div>
                  <p className="text-sm text-[hsl(215,15%,45%)] mb-6">
                    {currentBlock.subtitle} — <span className="font-semibold text-[#0065FF]">{currentBlock.totalCourses} cursos</span>
                  </p>

                  <div className="space-y-6">
                    {currentBlock.subcategories.map((sub, subIdx) => (
                      <div key={sub.name}>
                        <div className="flex items-center gap-2 mb-3">
                          <ChevronRight className="w-4 h-4 text-[#0065FF]" />
                          <h5 className="text-sm font-heading font-semibold text-[#0A2E76]">
                            {sub.name}
                          </h5>
                          <span className="text-xs text-[hsl(215,15%,55%)] bg-white px-2 py-0.5 rounded-full">
                            {sub.courses.length} {sub.courses.length === 1 ? "curso" : "cursos"}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {sub.courses.map((course, courseIdx) => (
                            <div
                              key={course.name}
                              className="bg-white rounded-lg px-4 py-3 flex items-start justify-between gap-3"
                              data-testid={`course-item-${currentBlock.id}-${subIdx}-${courseIdx}`}
                            >
                              <div className="flex items-start gap-3 min-w-0">
                                <div className="w-7 h-7 rounded-md bg-[#F4F5F7] border border-[#E2E5EA] flex items-center justify-center shrink-0 mt-0.5">
                                  <BookOpen className="w-3 h-3 text-[#0065FF]" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-[#0A2E76] leading-snug">
                                    {course.name}
                                  </p>
                                  <p className="text-xs text-[hsl(215,15%,50%)] mt-0.5 leading-relaxed">
                                    {course.description}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => setSyllabusModal(course)}
                                className="text-xs font-semibold text-[#0065FF] whitespace-nowrap shrink-0 mt-1"
                                data-testid={`button-syllabus-${currentBlock.id}-${subIdx}-${courseIdx}`}
                              >
                                Ver ementa
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button
              size="lg"
              data-testid="button-hub-start"
              className="bg-[#0065FF] text-white border-[#0065FF] font-semibold px-6"
            >
              Comece gratuitamente
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-testid="button-hub-plans"
              className="font-semibold px-6 border-[#0A2E76] text-[#0A2E76]"
            >
              Ver planos
            </Button>
          </div>
        </motion.div>
      </div>

      <Dialog open={syllabusModal !== null} onOpenChange={(open) => { if (!open) setSyllabusModal(null); }}>
        <DialogContent className="max-w-lg" data-testid="dialog-syllabus">
          {syllabusModal && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#F4F5F7] border border-[#E2E5EA] flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-[#0065FF]" />
                </div>
                <h3 className="text-lg font-heading font-bold text-[#0A2E76] leading-snug">
                  {syllabusModal.name}
                </h3>
              </div>
              <p className="text-sm text-[hsl(215,15%,45%)] mb-4 leading-relaxed">
                {syllabusModal.description}
              </p>
              <p className="text-xs font-semibold text-[hsl(215,15%,55%)] uppercase tracking-wider mb-3">
                Ementa do curso
              </p>
              <ul className="space-y-2.5">
                {syllabusModal.syllabus.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[hsl(215,15%,40%)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0065FF] mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
