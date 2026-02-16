import { useState, useRef } from "react";
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
  ChevronDown,
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
    name: "Formação Básica em Pesquisa Científica",
    subtitle: "Construa as bases para a independência acadêmica",
    description: "Domine os três pilares fundamentais da pesquisa científica: método, análise de dados e escrita científica.",
    icon: GraduationCap,
    totalCourses: 7,
    subcategories: [
      {
        name: "Competências Essenciais",
        courses: [
          {
            name: "Introdução à Metodologia Científica",
            description: "Aprenda os fundamentos da ciência, os principais delineamentos de pesquisa e como planejar e executar projetos científicos com rigor metodológico.",
            syllabus: [
              "História & Epistemologia da Ciência",
              "Conhecimento Religioso, Filosófico, Popular e Científico",
              "Indutivismo, Karl Popper e Thomas Kuhn",
              "Ciências Humanas e Pós-modernismo",
              "Pesquisa Quantitativa e Qualitativa",
              "Delineamentos de Pesquisa Empírica",
              "Pesquisa Experimental, Levantamentos, Métodos Qualitativos, Modelos Mistos",
              "Planejando uma Pesquisa",
              "Teoria, Problema e Objetivo",
              "Hipóteses e Expectativas",
              "Variáveis de pesquisa, Participantes e Instrumentos",
              "Como escrever projetos de pesquisa",
              "Ética em pesquisa",
            ],
          },
          {
            name: "Análise Bi e Multivariadas (SPSS e JASP)",
            description: "Domine as principais análises estatísticas bi e multivariadas utilizando os softwares SPSS e JASP.",
            syllabus: [
              "Estatísticas descritivas (média, moda, mediana, desvio e erro-padrão, escore z)",
              "Curva normal",
              "Correlações (Pearson, Spearman, Kendall)",
              "Regressões (Linear, logística, Poisson, Cox)",
              "Testes t (amostra única, dependente e independente)",
              "ANOVAs e MANOVAs (Simples, Fatorial e de Medidas Repetidas)",
              "Qui-Quadrado de aderência e independência para duas e múltiplas categorias",
              "Qui-quadrado longitudinal (Q de Cochran e McNemar)",
              "Testes não-paramétricos (Mann-Whitney, Kruskal-Wallis, Wilcoxon Signed-Rank, ANOVA de Friedman)",
              "Curva ROC",
            ],
          },
          {
            name: "Escrita Científica de Alto Impacto",
            description: "Aprenda a redigir artigos científicos de alto impacto, desde a estrutura do texto até a submissão e avaliação por pares.",
            syllabus: [
              "Como delinear uma boa pesquisa",
              "Entendendo o estado da arte",
              "Otimizando buscas em bases de dados",
              "O estilo da escrita científica",
              "Principais erros da escrita científica",
              "A estrutura do método",
              "Como escrever os seus resultados, discussão e conclusão",
              "Submissão de um artigo científico",
              "Processo de avaliação de um artigo científico",
              "Critérios de autoria",
              "Bônus 1: Checklists de revisão de texto",
              "Bônus 2: Modelos de carta de submissão e respostas aos pareceristas",
              "Bônus 3: Revisão da Literatura com Ferramentas de IA",
              "Bônus 4: Correção de escrita científica com IA (de maneira totalmente ética!)",
            ],
          },
          {
            name: "Cálculo de Tamanho Amostral",
            description: "Aprenda a calcular o tamanho amostral adequado para diferentes delineamentos de pesquisa, garantindo poder estatístico e representatividade.",
            syllabus: [
              "Métodos de Amostragem",
              "Amostragem probabilística",
              "Amostragem não-probabilística",
              "Representatividade e poder estatístico",
              "Revisão de Estatística Inferencial",
              "Tamanhos de efeito",
              "Tipos de análise de poder",
              "Cálculo de Tamanho de Efeito: Correlação",
              "Cálculo de Tamanho de Efeito: Teste t independente",
              "Cálculo de Tamanho de Efeito: Teste t dependente",
              "Cálculo de Tamanho de Efeito: ANOVA simples",
              "Cálculo de Tamanho de Efeito: ANCOVA",
              "Cálculo de Tamanho de Efeito: ANOVA Fatorial",
              "Cálculo de Tamanho de Efeito: ANOVA de Medidas Repetidas",
              "Cálculo de Tamanho de Efeito: Regressão Linear (Simples e Múltipla)",
              "Cálculo de Tamanho de Efeito: Regressão Logística",
              "E muito mais…",
            ],
          },
        ],
      },
      {
        name: "Gerenciadores de Referências",
        courses: [
          {
            name: "Zotero",
            description: "Domine o Zotero para organizar, gerenciar e citar suas referências bibliográficas de forma eficiente.",
            syllabus: [
              "Introdução ao Zotero",
              "Comparação com outros gerenciadores de referências",
              "Conhecendo Zotero Desktop",
              "Criação de biblioteca, coleção e subcoleção",
              "Adicionando Itens no Zotero Desktop",
              "Painéis (biblioteca, itens e metadados)",
              "Busca de itens",
              "Uso do Zotero no Editor de Textos",
              "Site do Zotero (Documentação, Fórum, Colaboração e Emprego)",
              "Criação e gerenciamento de grupos",
              "Zoterobib",
              "Fichamentos de artigos no Zotero",
              "Uso do Zotero para condução de Revisões da Literatura",
              "Protegendo seus arquivos",
            ],
          },
          {
            name: "Mendeley",
            description: "Utilize o Mendeley para organizar sua biblioteca acadêmica, inserir citações e colaborar em grupos de pesquisa.",
            syllabus: [
              "Introdução ao Mendeley",
              "Formatos de bibliotecas",
              "Estilos de Citação de Referências",
              "Mendeley Online (MRM)",
              "Busca online no Mendeley",
              "Biblioteca Mendeley: Caderno, Informações e Notas",
              "Ferramenta de Edição de PDF",
              "Preferências e Organização da Biblioteca",
              "Inserir leituras na sua biblioteca",
              "Coleções de leituras (Pastas)",
              "Grupos de Estudo (compartilhamento de leituras)",
              "Mendeley Reference Manager (MRM) Desktop",
              "Mendeley Web Importer para navegadores",
              "Mendeley Cite para Word",
              "Mendeley Cite: Estilos de citação",
              "Mendeley Desktop",
              "Mendeley Citation Style Language Editor",
              "Editando Estilos de Citação com o CSL",
              "Layout e Citações pelo plug-in Mendeley no Word",
              "Estilos de Citação no plug-in do Word",
            ],
          },
          {
            name: "EndNote",
            description: "Domine o EndNote para gestão profissional de referências bibliográficas e integração com bases de dados acadêmicas.",
            syllabus: [
              "Introdução ao EndNote",
              "Conceitos básicos",
              "Formatos de Bibliotecas",
              "Estilos de Citação",
              "EndNote Web",
              "Criando, inserindo e gerenciando referências online",
              "Master Journal List (Encontre o periódico ideal)",
              "EndNote Cite",
              "Inserindo citações",
              "Formatando, convertendo e exportando citações",
              "EndNote Click",
              "EndNote Versões IOS e EndNote 20",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Formação Avançada em Psicometria e Análise de Dados",
    subtitle: "Em cinco blocos independentes, domine técnicas avançadas de análise de dados, de acordo com a sua necessidade",
    description: "Passe a ser reconhecido como um expert na sua área específica de conhecimento.",
    icon: Brain,
    totalCourses: 19,
    subcategories: [
      {
        name: "Modelos Mistos e Hierárquicos",
        courses: [
          {
            name: "Modelos Lineares Generalizados (GLM)",
            description: "Aprenda a aplicar Modelos Lineares Generalizados para analisar dados com diferentes distribuições de probabilidade.",
            syllabus: [
              "O que são Modelos Generalizados?",
              "Aplicações dos Modelos Generalizados",
              "Vantagens em Relação às ANOVAS",
              "Distribuições de Probabilidade: Variáveis Contínuas e Discretas",
              "Funções de Ligação",
              "Matrizes de covariância",
              "Execução, Interpretação e Descrição dos resultados (GLM)",
            ],
          },
          {
            name: "Equações de Estimativas Generalizadas (GEE)",
            description: "Domine as GEE para análise de dados longitudinais e com medidas repetidas utilizando diferentes distribuições.",
            syllabus: [
              "O que são as Equações de Estimativas Generalizadas (GEE)?",
              "Aplicações das Equações de Estimativas Generalizadas (GEE)",
              "Vantagens em Relação às ANOVAS",
              "Distribuições de Probabilidade: Variáveis Contínuas e Discretas",
              "Funções de Ligação",
              "Matrizes de covariância",
              "Execução, Interpretação e Descrição dos resultados (GEE)",
            ],
          },
          {
            name: "Modelos Multinível",
            description: "Analise dados hierárquicos e aninhados com modelos de regressão multinível.",
            syllabus: [
              "Introdução às Análises Multinível",
              "Regressões lineares multinível",
              "Regressões logísticas multinível",
              "Análises práticas (R, JASP e Mplus)",
              "Descrevendo os resultados",
            ],
          },
          {
            name: "Análise de Mediação e Moderação",
            description: "Aprenda a testar hipóteses de mediação e moderação em seus modelos de pesquisa.",
            syllabus: [
              "Introdução à Análises de Moderação e Mediação",
              "Diferenças entre Mediação e Moderação",
              "Realizando uma análise de Mediação",
              "Realizando uma análise de Moderação",
              "Descrevendo os resultados",
            ],
          },
        ],
      },
      {
        name: "Revisões da Literatura e Metanálise",
        courses: [
          {
            name: "Revisões da Literatura (Revisão Narrativa, Revisão de Escopo e Revisão Sistemática)",
            description: "Domine os diferentes tipos de revisão da literatura, desde o delineamento até a publicação, seguindo os protocolos mais atualizados.",
            syllabus: [
              "Tipos de revisões da literatura",
              "Revisão Sistemática",
              "Scoping Review",
              "Revisão Narrativa",
              "Comparando os diferentes tipos de Revisões",
              "Delineamento de questões de pesquisa",
              "Objetivos da Revisão Narrativa",
              "Objetivos da Revisão de Escopo",
              "Objetivos da Revisão Sistemática",
              "Perguntas de pesquisa dos diferentes tipos de revisão",
              "Identificação e seleção da literatura relevante",
              "Estratégias de Buscas",
              "Buscas nas bases de dados",
              "Seleção da literatura relevante",
              "Análises de concordância",
              "Avaliação do risco de viés",
              "Extração e síntese dos dados",
              "Registro no PROSPERO",
              "Registro no OSF",
              "Publicação dos Protocolos de Revisão",
              "Protocolo PRISMA",
              "Redação de artigos de revisão",
            ],
          },
          {
            name: "Metanálise",
            description: "Realize sínteses quantitativas de evidências científicas com rigor metodológico e domine a avaliação de viés de publicação.",
            syllabus: [
              "Introdução à metanálise",
              "Modelo de efeito fixo",
              "Heterogeneidade",
              "Modelo de efeitos aleatórios",
              "Modelo de Efeito Fixo vs Modelo de Efeitos Aleatórios",
              "Heterogeneidade na metanálise",
              "Análise de subgrupos",
              "Robustez da medida metanalítica (Análise de sensibilidade)",
              "Avaliação do viés de publicação na metanálise (funnel plot; teste de Egger; teste de Begg)",
              "Ajustando o viés de publicação usando o método de Trim-and-Fill",
            ],
          },
        ],
      },
      {
        name: "Análise de Dados Textuais",
        courses: [
          {
            name: "IRAMUTEQ",
            description: "Utilize o IRAMUTEQ para realizar análises textuais avançadas a partir de corpus textuais.",
            syllabus: [
              "Introdução ao IRAMUTEQ",
              "Configuração do Corpus textuais",
              "Nuvem de palavras",
              "Análises de similitude",
              "Análises de especificidades",
              "Análise Fatorial por Correspondência",
              "Classificação Hierárquica Descendente",
            ],
          },
        ],
      },
      {
        name: "Psicometria Básica e Avançada",
        courses: [
          {
            name: "Construção, Adaptação & Validação de Instrumentos",
            description: "Domine todas as etapas da construção, adaptação transcultural e validação de instrumentos psicológicos.",
            syllabus: [
              "Introdução à construção de medidas",
              "Revisão da literatura (aspectos constitutivos e operacionais dos itens)",
              "Construção dos itens",
              "Dificuldade dos itens",
              "Etapas da avaliação por experts e população alvo",
              "Medidas de concordância (IVC, RVC, CVC)",
              "Etapas de Adaptação Transcultural de Instrumentos",
              "Validade de conteúdo",
              "Validade baseada na estrutura interna",
              "Validade baseada na relação com medidas externas",
              "Validade baseada no processo de resposta",
              "Validade consequencial",
            ],
          },
          {
            name: "Análise Fatorial Exploratória e Confirmatória",
            description: "Domine a teoria e prática das análises fatoriais exploratórias e confirmatórias, incluindo modelos avançados e multigrupo.",
            syllabus: [
              "Teoria e Prática de Análises Fatoriais Exploratórias e Análises Fatoriais Confirmatórias",
              "Modelos unifatorial",
              "Modelos multifatorial",
              "Modelos de segunda-ordem",
              "Modelos bi-factor",
              "Análises Fatoriais Confirmatórias Multigrupo",
            ],
          },
          {
            name: "Modelagem por Equações Estruturais",
            description: "Teste modelos complexos com variáveis latentes e relações causais utilizando MEE.",
            syllabus: [
              "Aspectos teóricos da MEE",
              "Símbolos e terminologias",
              "Conceitos de Graus de liberdade",
              "Índices de ajuste",
              "Índices de modificação",
              "Métodos de Estimação",
              "Execução prática de Modelagem por Equações Estruturais Completa",
            ],
          },
          {
            name: "Teoria de Resposta ao Item (TRI)",
            description: "Aplique modelos da TRI para análise avançada de itens e escalas, do 1-PL ao 4-PL e modelos Rasch.",
            syllabus: [
              "Introdução à Teoria de Resposta ao Item",
              "Teoria Clássica dos testes versus Teoria de Resposta ao Item",
              "TRI 1-parâmetro logístico (1-PL)",
              "TRI 2-parâmetros logísticos (2-PL)",
              "TRI 3-parâmetros logísticos (3-PL)",
              "TRI 4-parâmetros logísticos (4-PL)",
              "Curva Característica e de informação do Item (CCI e CII)",
              "Funcionamento diferencial do item (DIF)",
              "Modelo Rasch (dados dicotômicos e politômicos)",
              "Medidas de Ajuste",
              "Confiabilidade item-pessoa",
              "Infit e Outfit",
              "Avaliação de Thresholds",
            ],
          },
          {
            name: "Análise de Redes: Teoria e Prática",
            description: "Explore relações entre variáveis usando a abordagem de redes, incluindo EGA e comparação multigrupo.",
            syllabus: [
              "Teoria da Análise de Redes",
              "Terminologias e Conceitos",
              "Estimação e Seleção do Modelo",
              "Descrição da Rede",
              "Tamanho Amostral",
              "Precisão das Arestas",
              "Estabilidade das Redes",
              "Aulas práticas (R e JASP)",
              "Exploratory Graph Analysis (Teoria e Prática)",
              "Análise de Redes Multigrupo (Network Comparison Test; NCT - Teoria e Prática)",
            ],
          },
          {
            name: "Análise de Classes e Perfis Latentes (LCA/LPA)",
            description: "Identifique subgrupos nos seus dados com técnicas de classes e perfis latentes.",
            syllabus: [
              "O que é Análise de Classes Latentes (LCA)",
              "O que é Análise de Perfis Latentes (LPA)",
              "Aplicações dos Modelos de LPA/LCA",
              "Pressupostos e pré-requisitos para implementação da LCA/LPA",
              "Decidindo o número de classes e perfis latentes",
              "LCA e LPA na prática (JAMOVI e R)",
              "Interpretando os resultados de uma LCA/LPA",
              "Reportando os resultados",
              "Utilizando os resultados de uma LCA/LPA em análises subsequentes",
              "Controlando vieses nas análises de LCA/LPA",
              "Introdução ao tidySEM",
            ],
          },
          {
            name: "Controle de Aquiescência",
            description: "Aprenda a identificar e controlar o viés de aquiescência em instrumentos psicológicos.",
            syllabus: [
              "Introdução ao Vieses de Resposta",
              "Introdução à Aquiescência",
              "Calculando os Escores",
              "Modelo de Interceptos Randômicos",
              "Modelo de Interceptos Randômicos (TRI – Multidimensional)",
              "Recentralização",
              "Modelo MIMIC",
            ],
          },
          {
            name: "Controle de Desejabilidade Social",
            description: "Domine as técnicas para identificar e controlar o viés de desejabilidade social em pesquisas.",
            syllabus: [
              "Introdução à Desejabilidade Social",
              "Análises de Juízes na Desejabilidade Social",
              "Avaliação de Estrutura Interna (Quádruplas)",
              "Avaliação de Estrutura Interna (Escala Neutralizada)",
              "Análises Multigrupo + MIMIC",
            ],
          },
          {
            name: "Métodos de Escolha Forçada",
            description: "Aprenda a utilizar e analisar dados de instrumentos com formato de escolha forçada.",
            syllabus: [
              "Introdução à Escolha Forçada",
              "Recodificando Variáveis",
              "Modelo Fatorial Thurstoniano",
              "Modelo da Teoria de Resposta ao Item Thurstoniano",
              "Análises de Precisão da Escolha Forçada",
            ],
          },
        ],
      },
      {
        name: "Estudos Epidemiológicos e Populacionais",
        courses: [
          {
            name: "Análise de Dados de Estudos Epidemiológicos",
            description: "Domine as técnicas de análise de dados epidemiológicos, incluindo regressões especializadas e análises de sobrevida.",
            syllabus: [
              "Regressão de Poisson Simples",
              "Modelo superdisperso",
              "Regressão binomial negativa",
              "Regressão de Poisson Robusta",
              "Análises de Sobrevida (Survival Analyses)",
              "Tábua de sobrevida",
              "Teste log-rank",
              "Regressão de Cox Simples",
              "Regressão de Cox Multivariada",
            ],
          },
          {
            name: "Séries Temporais",
            description: "Aprenda a analisar tendências e variações ao longo do tempo com o software Joinpoint e técnicas de séries temporais.",
            syllabus: [
              "Introdução a Séries Temporais",
              "Instalando o Joinpoint",
              "Análise de taxa e indicadores",
              "Análise de taxa e indicadores (Interpretação)",
              "Análise de taxas e indicadores por categorias",
              "Interpretação Análise por categorias",
              "Análise ajustada por idade",
              "Análise ajustada por idade (usando by)",
              "Descrição dos resultados",
            ],
          },
          {
            name: "Pesquisa com Dados Abertos",
            description: "Aprenda a utilizar bases de dados públicas brasileiras para conduzir pesquisas com dados secundários.",
            syllabus: [
              "Introdução à Pesquisa com dados secundários",
              "DATASUS – Tabwin",
              "Descomprimindo arquivos DBC via Tabwin e R",
              "Realizando pesquisa com dados individuados (Processamento e análise)",
              "DATASUS – Dados agregados via Tabwin e Tabnet",
              "Atlas Brasil – Censo demográfico e Desenvolvimento humano",
              "INEP – Dados educacionais",
              "IPEA – Dados econômicos",
              "INMET – Clima e tempo",
              "IBGE e Portal brasileiro de dados abertos",
              "Criando um banco para estudos de séries temporais",
              "Criando banco de dados para estudos correlacionais",
              "Processamento e análise de dados agregados em SPSS",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Formação Completa em Análise de Dados com R",
    subtitle: "Domine a linguagem R para análise estatística",
    description: "Uma formação inteira em R para você que deseja aprofundar ainda mais o seu conhecimento.",
    icon: Code,
    totalCourses: 7,
    subcategories: [
      {
        name: "Fundamentos do R: linguagem, scripts e funções",
        courses: [
          {
            name: "R: Linguagem, Scripts e Funções",
            description: "Comece a programar em R do zero, dominando a linguagem, criação de objetos, estruturas de dados e manipulação de arquivos.",
            syllabus: [
              "Introdução ao R e RStudio",
              "Painéis do RStudio",
              "Criando Objetos",
              "Manejando o workspace",
              "Criando vetores",
              "Classes de dados (logicals, numeric, integer, complex, characters, factor)",
              "Estrutura de dados",
              "Trabalhando com vetores",
              "Reciclagem",
              "Matrizes",
              "Arrays",
              "Data frame",
              "Importando e exportando arquivos",
              "Manipulação de dados",
            ],
          },
        ],
      },
      {
        name: "Análises estatísticas e psicométricas",
        courses: [
          {
            name: "R: Análises Bi & Multivariadas",
            description: "Execute todas as principais análises bi e multivariadas diretamente no R.",
            syllabus: [
              "Estatísticas descritivas (média, moda, mediana, desvio e erro-padrão, escore z)",
              "Curva normal",
              "Correlações (Pearson, Spearman, Kendall)",
              "Regressões (Linear, logística, Poisson, Cox)",
              "Testes t (amostra única, dependente e independente)",
              "ANOVAs e MANOVAs (Simples, Fatorial e de Medidas Repetidas)",
              "Qui-Quadrado de aderência e independência para duas e múltiplas categorias",
              "Qui-quadrado longitudinal (Q de Cochran e McNemar)",
              "Testes não-paramétricos (Mann-Whitney, Kruskal-Wallis, Wilcoxon Signed-Rank, ANOVA de Friedman)",
              "Curva ROC",
            ],
          },
          {
            name: "R: Análise Fatorial e Modelagem por Equações Estruturais",
            description: "Realize análises fatoriais exploratórias, confirmatórias e MEE completas no R.",
            syllabus: [
              "Análise Fatorial Exploratória",
              "Análise Fatorial Confirmatória Unifatorial",
              "Análise Fatorial Confirmatória Multifatorial",
              "Análise Fatorial Confirmatória de Segunda-Ordem",
              "Análise Fatorial Confirmatória (Bi-factor)",
              "Análise Fatorial Confirmatória Multigrupo",
            ],
          },
          {
            name: "R: Testes Não Paramétricos para Delineamentos Complexos",
            description: "Domine testes não paramétricos avançados para estudos transversais, longitudinais e multivariados no R.",
            syllabus: [
              "Estudos Transversais: rankFD – Introdução às análises não paramétricas avançadas",
              "Análises com um fator independente",
              "Análise com dois fatores independentes",
              "Estudos longitudinais: nparLD – Análise com um fator (medidas repetidas)",
              "Análise com dois fatores (delineamento misto)",
              "Análise com três fatores (delineamento misto)",
              "Métodos multivariados: MANOVA.RM – Análise multivariada de um fator",
              "Análise multivariada com dois fatores independentes",
              "Análise multivariada com dois fatores (delineamento misto)",
            ],
          },
          {
            name: "R: Teoria de Resposta ao Item",
            description: "Aplique modelos da TRI no R, do 1-PL ao multidimensional, incluindo Rasch e DIF.",
            syllabus: [
              "TRI 1-parâmetro logístico (1-PL)",
              "TRI 2-parâmetros logísticos (2-PL)",
              "TRI 3-parâmetros logísticos (3-PL)",
              "TRI Multidimensional",
              "Curva Característica e de informação do Item (CCI e CII)",
              "Funcionamento diferencial do item (DIF)",
              "Modelo Rasch (dados dicotômicos e politômicos)",
              "Medidas de Ajuste",
              "Confiabilidade item-pessoa",
              "Infit e Outfit",
              "Avaliação de Thresholds",
            ],
          },
        ],
      },
      {
        name: "Manipulação e visualização de dados",
        courses: [
          {
            name: "R: ggplot2",
            description: "Crie gráficos profissionais para publicação científica com o pacote ggplot2.",
            syllabus: [
              "Introdução ao ggplot2",
              "Alterando cor, forma e tamanho",
              "Legendas e temas",
              "Personalizando o tema",
              "Exportando o gráfico",
              "Gráficos univariados",
              "Função theme_set()",
              "Histograma básico",
              "Dividindo o histograma por cor",
              "Dividindo o histograma por facetas",
              "Histograma para diversas variáveis",
              "Gráfico de Densidade",
              "Interpretando o Boxplot",
              "Criando o Boxplot",
              "Unindo o boxplot com outros gráficos",
            ],
          },
          {
            name: "R: Tidyverse",
            description: "Domine o tidyverse para manipulação eficiente de dados com dplyr, tidyr e forcats.",
            syllabus: [
              "Funções Básicas dplyr e tidyr",
              "Tibble e glimpse()",
              "Selecionando variáveis: select() e verbos auxiliares",
              "Renomeando variáveis: rename() e rename_with()",
              "Criando e alterando variáveis: mutate(), transmute(), across()",
              "Selecionando casos: filter() e slice()",
              "Reordenando casos: arrange()",
              "Contando frequências: count()",
              "Resumindo informações: summarise() e group_by()",
              "Alterando formato do banco: pivot_wider e pivot_longer",
              "Fatores: forcats",
              "Organizando níveis: fct_relevel()",
              "Renomeando e colapsando níveis: fct_recode() e fct_collapse()",
              "Reordenando níveis automaticamente: fct_reorder() e fct_infreq()",
              "Reduzindo níveis: fct_lump_()",
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
    description: "Aprenda vários procedimentos de Machine Learning aplicados à pesquisa científica.",
    icon: Sparkles,
    totalCourses: 4,
    subcategories: [
      {
        name: "Machine Learning Aplicado à Pesquisa Científica",
        courses: [
          {
            name: "Machine Learning Aplicado à Pesquisa Científica",
            description: "Entenda o que é Machine Learning, como a máquina aprende e aplique algoritmos supervisionados e não-supervisionados na pesquisa científica.",
            syllabus: [
              "O que é Machine Learning",
              "Machine Learning e Psicometria",
              "Como a Máquina Aprende",
              "Machine Learning Supervisionado",
              "Machine Learning Não-Supervisionado",
              "Selecionando Algoritmos e Métodos",
              "JASP (Clustering)",
              "JASP (Classificação)",
              "JASP (Regressão)",
              "Conhecendo o software ORANGE",
              "Aula Bônus: IA na Avaliação Psicológica",
              "Aula Bônus: Livros recomendados",
              "Aula Bônus: O futuro da IA na sociedade",
              "Aula Bônus: Estudos de caso (Pesquisas científicas)",
            ],
          },
          {
            name: "Processamento de Linguagem Natural",
            description: "Aprenda técnicas de PLN para analisar dados textuais, desde a codificação de palavras até a análise de sentimentos.",
            syllabus: [
              "Introdução à Processamento de Linguagem Natural",
              "Preparação do seu banco de dados",
              "Codificando palavras no PLN: Teoria e Prática",
              "Visual Analytics de Palavras: Teoria e Prática",
              "Codificando frases no PLN: Teoria e Prática",
              "Trabalhando com \"Menções\": Teoria e Prática",
              "Codificando \"Assuntos\": Teoria e Prática",
              "Codificando \"Sentimentos\": Teoria e Prática",
            ],
          },
          {
            name: "Probabilistic Graph Models",
            description: "Domine os modelos gráficos probabilísticos e suas aplicações na pesquisa científica.",
            syllabus: [
              "Definição de PGMs",
              "Constituintes de um PGM",
              "Criação de uma PGM",
              "Tipologia de uma PGM",
              "Realizando uma PGM no R",
              "PGMs versus MEE",
            ],
          },
          {
            name: "Redes Neurais Artificiais",
            description: "Introdução a Deep Learning e Redes Neurais aplicadas à pesquisa científica.",
            syllabus: [
              "Introdução a Deep Learning",
              "Avaliando Deep Learning",
              "Redes Neurais (SPSS): Teoria e Prática",
              "Estudos de Caso (Pesquisa Científica)",
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
    description: "Cursos específicos para quem deseja seguir a carreira de professor concursado ou se tornar consultor em Análise de Dados.",
    icon: Briefcase,
    totalCourses: 2,
    subcategories: [
      {
        name: "Carreira Acadêmica e Mercado",
        courses: [
          {
            name: "Curso de Preparação para Concursos",
            description: "Prepare-se estrategicamente para concursos de docente universitário, da análise do edital à prova de aula.",
            syllabus: [
              "Entendendo em profundidade o Edital do Concurso",
              "Avaliando as especificidades do Instituto",
              "Conhecendo a banca",
              "Descobrindo o perfil do candidato ideal",
              "Preparação estratégica da Prova Escrita",
              "Preparação estratégica da Prova de Aula",
              "Preparação estratégica do Memorial",
            ],
          },
          {
            name: "Viver de Análise de Dados",
            description: "Aprenda a construir uma carreira sólida como consultor em análise de dados, da precificação ao crescimento.",
            syllabus: [
              "Por que se tornar um consultor em análise de dados",
              "Quem pode prestar consultoria em análise de dados",
              "Quando começar (aspectos subjetivos)",
              "Quando começar (aspectos objetivos)",
              "Como e para quem divulgar",
              "Como cobrar (Estimando o valor do seu trabalho)",
              "Como cobrar (estimando a demanda do cliente)",
              "Escrita do Relatório e Devolutiva",
              "Consultoria com dados problemáticos",
              "Consultoria para Pessoa Jurídica",
              "Consultoria com CPF ou CNPJ",
              "Consultoria e Dedicação Exclusiva",
              "Escala e Crescimento",
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
  const [openSubcategory, setOpenSubcategory] = useState(0);
  const contentPanelRef = useRef<HTMLDivElement>(null);
  const mobileBlockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileSubcategoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const currentBlock = activeBlock >= 0 ? blocks[activeBlock] : blocks[0];

  const scrollToElement = (el: HTMLElement | null) => {
    if (!el) return;
    requestAnimationFrame(() => {
      const headerHeight = 96;
      const absTop = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, absTop - headerHeight);
    });
  };
  const hasMultipleSubcategories = currentBlock.subcategories.length > 1;

  return (
    <section
      id="cursos"
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
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
            {competencies.map((comp) => (
              <div
                key={comp.label}
                className="flex items-center gap-1.5 md:gap-2 bg-white/15 backdrop-blur-sm rounded-md px-2.5 md:px-4 py-1.5 md:py-2 border border-white/20"
                data-testid={`badge-competency-${comp.label.toLowerCase().replace(/ /g, "-")}`}
              >
                <comp.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                <span className="text-xs md:text-sm font-medium text-white">{comp.label}</span>
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
          <div className="text-center lg:text-center text-left mb-10">
            <h3 className="text-heading-1 md:text-display-sm font-heading font-bold text-[#0A2E76] mb-3">
              Uma estrutura hierárquica de aprendizado
            </h3>
            <p className="text-body-lg text-[hsl(215,15%,45%)] max-w-2xl mx-auto leading-relaxed">
              Desenvolvemos uma estrutura hierarquicamente organizada, para que você se desenvolva sem qualquer dificuldade.
            </p>
          </div>

          {/* Desktop: sidebar + panel */}
          <div className="hidden lg:grid lg:grid-cols-[320px_1fr] gap-8 items-start">
            <div className="space-y-1">
              {blocks.map((block, idx) => (
                <button
                  key={block.id}
                  onClick={() => {
                    setActiveBlock(idx);
                    setOpenSubcategory(0);
                    if (contentPanelRef.current) {
                      const rect = contentPanelRef.current.getBoundingClientRect();
                      if (rect.top < 90) {
                        contentPanelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                        window.scrollBy({ top: -100, behavior: "smooth" });
                      }
                    }
                  }}
                  className={`w-full text-left px-5 py-4 rounded-lg transition-all duration-200 ${
                    activeBlock === idx
                      ? "bg-[#0A2E76] shadow-lg"
                      : "bg-[#F4F5F7]"
                  }`}
                  data-testid={`tab-block-${block.id}`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <block.icon className={`w-5 h-5 shrink-0 ${activeBlock === idx ? "text-white" : "text-[#0065FF]"}`} />
                    <span className={`text-base font-bold ${activeBlock === idx ? "text-white" : "text-[#0A2E76]"}`}>
                      {block.name}
                    </span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ml-auto shrink-0 ${
                      activeBlock === idx ? "bg-white/20 text-white" : "bg-[#E2E5EA] text-[hsl(215,15%,55%)]"
                    }`}>
                      {block.totalCourses}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed pl-8 ${activeBlock === idx ? "text-white/75" : "text-[hsl(215,15%,55%)]"}`}>
                    {block.description}
                  </p>
                </button>
              ))}
            </div>

            <div ref={contentPanelRef} className="bg-[#F4F5F7] rounded-2xl p-6 md:p-8 min-h-[500px] lg:sticky lg:top-[90px] lg:max-h-[calc(100vh-110px)] lg:overflow-y-auto">
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
                    <h4 className="text-xl font-heading font-bold text-[#0A2E76]">
                      {currentBlock.name}
                    </h4>
                  </div>
                  <p className="text-base text-[hsl(215,15%,45%)] mb-6">
                    {currentBlock.subtitle} — <span className="font-semibold text-[#0065FF]">{currentBlock.totalCourses} cursos</span>
                  </p>

                  <div className="space-y-3">
                    {currentBlock.subcategories.map((sub, subIdx) => {
                      const isOpen = hasMultipleSubcategories ? openSubcategory === subIdx : true;
                      return (
                        <div key={sub.name} className="rounded-xl overflow-hidden">
                          {hasMultipleSubcategories && (
                            <button
                              onClick={() => setOpenSubcategory(isOpen ? -1 : subIdx)}
                              className={`w-full flex items-center gap-2 px-5 py-3.5 transition-colors duration-200 ${
                                isOpen ? "bg-[#0A2E76]" : "bg-white"
                              }`}
                              data-testid={`accordion-subcategory-${currentBlock.id}-${subIdx}`}
                            >
                              {isOpen ? (
                                <ChevronDown className="w-4 h-4 text-white shrink-0" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-[#0065FF] shrink-0" />
                              )}
                              <h5 className={`text-base font-heading font-semibold ${isOpen ? "text-white" : "text-[#0A2E76]"}`}>
                                {sub.name}
                              </h5>
                              <span className={`text-sm font-semibold ml-auto shrink-0 ${
                                isOpen ? "text-white/80" : "text-[#0065FF]"
                              }`}>
                                {isOpen ? "Fechar" : "Ver cursos"}
                              </span>
                            </button>
                          )}
                          {!hasMultipleSubcategories && (
                            <div className="flex items-center gap-2 mb-3">
                              <ChevronRight className="w-4 h-4 text-[#0065FF]" />
                              <h5 className="text-base font-heading font-semibold text-[#0A2E76]">
                                {sub.name}
                              </h5>
                              <span className="text-xs text-[hsl(215,15%,55%)] bg-white px-2 py-0.5 rounded-full">
                                {sub.courses.length} {sub.courses.length === 1 ? "curso" : "cursos"}
                              </span>
                            </div>
                          )}
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className={`space-y-2 ${hasMultipleSubcategories ? "pt-3" : ""}`}>
                                  {sub.courses.map((course, courseIdx) => (
                                    <button
                                      key={course.name}
                                      onClick={() => setSyllabusModal(course)}
                                      className="w-full text-left bg-white rounded-lg px-5 py-4 flex items-start justify-between gap-4 transition-colors duration-150 hover:bg-[#F0F4FF] cursor-pointer group"
                                      data-testid={`course-item-${currentBlock.id}-${subIdx}-${courseIdx}`}
                                    >
                                      <div className="flex items-start gap-3 min-w-0">
                                        <div className="w-8 h-8 rounded-md bg-[#F4F5F7] border border-[#E2E5EA] flex items-center justify-center shrink-0 mt-0.5">
                                          <BookOpen className="w-3.5 h-3.5 text-[#0065FF]" />
                                        </div>
                                        <div className="min-w-0">
                                          <p className="text-[15px] font-semibold text-[#0A2E76] leading-snug">
                                            {course.name}
                                          </p>
                                          <p className="text-sm text-[hsl(215,15%,50%)] mt-1 leading-relaxed">
                                            {course.description}
                                          </p>
                                        </div>
                                      </div>
                                      <span
                                        className="text-sm font-semibold text-[#0065FF] whitespace-nowrap shrink-0 mt-1 bg-[#E8F0FE] px-3 py-1 rounded-md group-hover:bg-[#0065FF] group-hover:text-white transition-colors duration-150"
                                        data-testid={`button-syllabus-${currentBlock.id}-${subIdx}-${courseIdx}`}
                                      >
                                        Ver ementa
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
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
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile: accordion - conteúdo aparece logo abaixo de cada aba */}
          <div className="lg:hidden space-y-3" style={{ overflowAnchor: "none" }}>
            {blocks.map((block, idx) => {
              const isMobileActive = activeBlock === idx;
              const mobileBlock = blocks[idx];
              const mobileHasMultipleSubs = mobileBlock.subcategories.length > 1;
              return (
                <div key={block.id} ref={(el) => { mobileBlockRefs.current[idx] = el; }} className="rounded-xl overflow-hidden">
                  <button
                    onClick={() => {
                      if (isMobileActive) {
                        setActiveBlock(-1);
                      } else {
                        setActiveBlock(idx);
                        setOpenSubcategory(0);
                        scrollToElement(mobileBlockRefs.current[idx]);
                      }
                    }}
                    className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 ${
                      isMobileActive
                        ? "bg-[#0A2E76] shadow-lg rounded-b-none"
                        : "bg-[#F4F5F7]"
                    }`}
                    data-testid={`tab-block-mobile-${block.id}`}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <block.icon className={`w-5 h-5 shrink-0 ${isMobileActive ? "text-white" : "text-[#0065FF]"}`} />
                      <span className={`text-base font-bold ${isMobileActive ? "text-white" : "text-[#0A2E76]"}`}>
                        {block.name}
                      </span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ml-auto shrink-0 ${
                        isMobileActive ? "bg-white/20 text-white" : "bg-[#E2E5EA] text-[hsl(215,15%,55%)]"
                      }`}>
                        {block.totalCourses}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed pl-8 ${isMobileActive ? "text-white/75" : "text-[hsl(215,15%,55%)]"}`}>
                      {block.description}
                    </p>
                  </button>

                  <AnimatePresence initial={false}>
                    {isMobileActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="bg-[#F4F5F7] rounded-b-xl p-4 pt-5">
                          <p className="text-sm text-[hsl(215,15%,45%)] mb-4">
                            {mobileBlock.subtitle} — <span className="font-semibold text-[#0065FF]">{mobileBlock.totalCourses} cursos</span>
                          </p>

                          <div className="space-y-3">
                            {mobileBlock.subcategories.map((sub, subIdx) => {
                              const isSubOpen = mobileHasMultipleSubs ? openSubcategory === subIdx : true;
                              return (
                                <div key={sub.name} ref={(el) => { mobileSubcategoryRefs.current[`${idx}-${subIdx}`] = el; }} className="rounded-xl border border-[#E2E5EA] bg-white overflow-hidden">
                                  {mobileHasMultipleSubs && (
                                    <button
                                      onClick={() => {
                                        const newVal = isSubOpen ? -1 : subIdx;
                                        setOpenSubcategory(newVal);
                                        if (newVal >= 0) {
                                          scrollToElement(mobileSubcategoryRefs.current[`${idx}-${subIdx}`]);
                                        }
                                      }}
                                      className={`w-full flex items-center gap-2 px-4 py-3 transition-colors duration-200 ${
                                        isSubOpen ? "bg-[#0A2E76]" : "bg-white"
                                      }`}
                                      data-testid={`accordion-subcategory-mobile-${mobileBlock.id}-${subIdx}`}
                                    >
                                      {isSubOpen ? (
                                        <ChevronDown className="w-4 h-4 text-white shrink-0" />
                                      ) : (
                                        <ChevronRight className="w-4 h-4 text-[#0065FF] shrink-0" />
                                      )}
                                      <h5 className={`text-sm font-heading font-semibold text-left ${isSubOpen ? "text-white" : "text-[#0A2E76]"}`}>
                                        {sub.name}
                                      </h5>
                                      <span className={`text-xs font-semibold ml-auto shrink-0 ${
                                        isSubOpen ? "text-white/80" : "text-[#0065FF]"
                                      }`}>
                                        {isSubOpen ? "Fechar" : "Ver cursos"}
                                      </span>
                                    </button>
                                  )}
                                  {!mobileHasMultipleSubs && (
                                    <div className="flex items-center gap-2 px-4 py-3">
                                      <ChevronRight className="w-4 h-4 text-[#0065FF]" />
                                      <h5 className="text-sm font-heading font-semibold text-[#0A2E76]">
                                        {sub.name}
                                      </h5>
                                      <span className="text-xs text-[hsl(215,15%,55%)] bg-[#F4F5F7] px-2 py-0.5 rounded-full">
                                        {sub.courses.length} {sub.courses.length === 1 ? "curso" : "cursos"}
                                      </span>
                                    </div>
                                  )}
                                  <AnimatePresence initial={false}>
                                    {isSubOpen && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                      >
                                        <div className="border-t border-[#E2E5EA]">
                                          <div className="space-y-0 divide-y divide-[#E2E5EA]">
                                            {sub.courses.map((course, courseIdx) => (
                                              <button
                                                key={course.name}
                                                onClick={() => setSyllabusModal(course)}
                                                className="w-full text-left px-4 py-3 flex items-start justify-between gap-3 cursor-pointer group bg-[#FAFBFC]"
                                                data-testid={`course-item-mobile-${mobileBlock.id}-${subIdx}-${courseIdx}`}
                                              >
                                                <div className="flex items-start gap-2.5 min-w-0">
                                                  <div className="w-7 h-7 rounded-md bg-white border border-[#E2E5EA] flex items-center justify-center shrink-0 mt-0.5">
                                                    <BookOpen className="w-3 h-3 text-[#0065FF]" />
                                                  </div>
                                                  <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-[#0A2E76] leading-snug text-left">
                                                      {course.name}
                                                    </p>
                                                    <p className="text-xs text-[hsl(215,15%,50%)] mt-1 leading-relaxed line-clamp-2 text-left">
                                                      {course.description}
                                                    </p>
                                                  </div>
                                                </div>
                                                <span
                                                  className="text-xs font-semibold text-[#0065FF] whitespace-nowrap shrink-0 mt-1 bg-[#E8F0FE] px-2.5 py-1 rounded-md"
                                                  data-testid={`button-syllabus-mobile-${mobileBlock.id}-${subIdx}-${courseIdx}`}
                                                >
                                                  Ementa
                                                </span>
                                              </button>
                                            ))}
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <div className="mt-6 flex flex-col gap-2">
              <Button
                size="lg"
                data-testid="button-hub-start-mobile"
                className="bg-[#0065FF] text-white border-[#0065FF] font-semibold w-full"
              >
                Comece gratuitamente
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                data-testid="button-hub-plans-mobile"
                className="font-semibold w-full border-white text-white"
              >
                Ver planos
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <Dialog open={syllabusModal !== null} onOpenChange={(open) => { if (!open) setSyllabusModal(null); }}>
        <DialogContent className="max-w-lg p-0 gap-0 max-h-[85vh] flex flex-col overflow-hidden" data-testid="dialog-syllabus">
          {syllabusModal && (
            <>
              <div className="p-6 pb-4 shrink-0 border-b border-[#E2E5EA]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F4F5F7] border border-[#E2E5EA] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-[#0065FF]" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[#0A2E76] leading-snug">
                    {syllabusModal.name}
                  </h3>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 pt-4">
                <p className="text-base text-[hsl(215,15%,45%)] mb-5 leading-relaxed">
                  {syllabusModal.description}
                </p>
                <p className="text-xs font-semibold text-[hsl(215,15%,55%)] uppercase tracking-wider mb-3">
                  Ementa do curso
                </p>
                <ul className="space-y-2.5">
                  {syllabusModal.syllabus.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-base text-[hsl(215,15%,40%)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0065FF] mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 pt-4 shrink-0 border-t border-[#E2E5EA] bg-[#F9FAFB]">
                <Button
                  size="lg"
                  data-testid="button-syllabus-cta"
                  className="w-full bg-[#0065FF] text-white border-[#0065FF] font-semibold"
                >
                  Cadastrar gratuitamente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default HubSection;
