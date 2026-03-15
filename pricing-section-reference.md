# Pricing Section Reference — Psicometria Online Academy

Arquivo de referência para replicar a página de Planos e Preços em outra aplicação.

---

## Descrição geral

A página `/planos` é composta por quatro seções independentes:

1. **Hero (banner azul escuro)** — título, subtítulo, CTA principal e social proof
2. **Tabela de planos** (`DesktopTable` + `MobileAccordion`) — toggle mensal/anual, comparativo de recursos
3. **Detalhamento de cursos** (`DetailedBreakdown`) — accordion expansível com todos os cursos por plano
4. **Carrossel de universidades** (`TrustCarousel`) — logos em scroll infinito

### Comportamentos interativos
- **Toggle Mensal/Anual**: alterna os preços exibidos na tabela e no accordion mobile; desconto anual calculado dinamicamente
- **Tabela desktop**: cabeçalho sticky com `top-[96px]` (altura do header); badge "Mais acessado" no plano Pro
- **Accordion mobile**: cabeçalho dos planos sticky com `top-[88px]`; cada categoria de recurso abre/fecha individualmente com Framer Motion
- **DetailedBreakdown**: seção colapsável; expande/recolhe com AnimatePresence

---

## Dependências externas

```json
{
  "react": "^18",
  "framer-motion": "^10",
  "lucide-react": "latest",
  "tailwindcss": "^3",
  "@shadcn/ui": "Button component"
}
```

### Imports necessários
```tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X as XIcon, ArrowRight, Plus, Minus, ChevronDown } from "lucide-react";
import { RegistrationLink } from "@/components/ui/registration-link";
```

`RegistrationLink` é um wrapper de `<a>` que lê parâmetros UTM da URL atual e os repassa ao destino (`https://membros.psicometriaonline.com.br`). Substitua por `<a href="https://membros.psicometriaonline.com.br">` em outros projetos.

---

## Paleta de cores e tokens

| Token | Valor | Uso |
|---|---|---|
| Azul escuro | `#0A2E76` | Títulos, cabeçalho tabela, badges, categorias |
| Azul CTA | `#0065FF` | Botões principais, preço anual highlight |
| Azul hover | `#0050CC` | Hover de botões |
| Azul claro | `#4D9FFF` | Destaque no título do hero |
| Vermelho ausente | `#F34266` | Ícone de "não incluído" |
| Fundo geral | `#F4F5F7` | Background da página e seções |
| Fundo linhas alt | `#FAFBFC` | Linhas ímpares da tabela |
| Fundo sub-header | `#F8F9FB` | Linha de subcategoria no breakdown |
| Borda | `#E2E5EA` | Bordas de tabelas e cards |
| Texto secundário | `hsl(215, 15%, 45%)` | Parágrafos e labels secundários |
| Texto muted | `hsl(215, 15%, 55%)` | Labels menores e preço/mês |
| Texto corpo | `hsl(215, 15%, 30%)` | Linhas de features na tabela |

### Gradiente do hero
```css
background: linear-gradient(135deg, #0A2E76 0%, #001A4D 50%, #0A2E76 100%);
```

### Pattern de pontos do hero
```css
background-image:
  radial-gradient(circle at 20% 50%, #0065FF 1px, transparent 1px),
  radial-gradient(circle at 80% 20%, #0065FF 1px, transparent 1px),
  radial-gradient(circle at 50% 80%, #0065FF 1px, transparent 1px);
background-size: 60px 60px, 80px 80px, 70px 70px;
opacity: 0.07;
```

---

## Referência visual

Imagem de layout: `attached_assets/image_1772039303341.png`

---

## Tipos e dados

```tsx
type BillingPeriod = "mensal" | "anual";
type CellValue = boolean | string;
type PlanAvailability = [boolean, boolean, boolean];

interface PlanHeader {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  yearlyTotal: number;
  badge?: string;
  cta: string;
}

interface FeatureRow {
  label: string;
  sub?: string;
  values: [CellValue, CellValue, CellValue];
}

interface CategoryGroup {
  category: string;
  rows: FeatureRow[];
}

interface DetailedCourse {
  name: string;
  plans: PlanAvailability;
}

interface DetailedSubcategory {
  name: string;
  courses: DetailedCourse[];
}

interface DetailedBlock {
  name: string;
  subcategories: DetailedSubcategory[];
}

interface DetailedResourceRow {
  name: string;
  plans: PlanAvailability | [string, string, string];
}

interface DetailedResourceGroup {
  category: string;
  rows: DetailedResourceRow[];
}
```

### Dados dos planos

```tsx
const planHeaders: PlanHeader[] = [
  {
    id: "master",
    name: "Master",
    monthlyPrice: 75.90,
    yearlyPrice: 58.08,
    yearlyTotal: 697.00,
    cta: "Começar Grátis",
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 109.90,
    yearlyPrice: 83.08,
    yearlyTotal: 997.00,
    badge: "Mais acessado",
    cta: "Começar Grátis",
  },
  {
    id: "premium",
    name: "Premium",
    monthlyPrice: 169.90,
    yearlyPrice: 124.75,
    yearlyTotal: 1497.00,
    cta: "Começar Grátis",
  },
];
```

### Tabela de recursos (featureTable)

```tsx
const featureTable: CategoryGroup[] = [
  {
    category: "Formações",
    rows: [
      { label: "Formação Básica em Pesquisa Científica", sub: "Método de Pesquisa, Análise de Dados Bi e Multivariadas, Escrita Científica, Cálculo de Poder Amostral, Gerenciadores de Referências", values: [true, true, true] },
      { label: "Formação Avançada em Psicometria e Análise de Dados", sub: "Modelos Mistos, Metanálise, Psicometria, Dados Textuais e Estudos Epidemiológicos", values: [false, true, true] },
      { label: "Formação Completa em Análise de Dados com R", sub: "Linguagem, Scripts e Funções, Análises de Dados Bi e Multivariadas, Análises Psicométricas, tidyverse e ggplot2", values: [false, true, true] },
    ],
  },
  {
    category: "Formações Especiais",
    rows: [
      { label: "Curso de Preparação para Concursos", values: [false, false, true] },
      { label: "Formação Viver de Análise de Dados", values: [false, false, true] },
      { label: "Inteligência Artificial Aplicada a Pesquisas Científicas", values: [false, false, true] },
    ],
  },
  {
    category: "Ferramentas Estatísticas",
    rows: [
      { label: "Calculadora de Tamanho Amostral", values: [true, true, true] },
      { label: "Calculadora de Tamanho de Efeito", values: [true, true, true] },
      { label: "Classificador de Análises Estatísticas", values: [true, true, true] },
      { label: "Gerador de Sintaxe em R", values: [true, true, true] },
    ],
  },
  {
    category: "Recursos Didáticos",
    rows: [
      { label: "Biblioteca Eletrônica", values: [true, true, true] },
      { label: "Glossário Acadêmico", values: [true, true, true] },
      { label: "Livros Metodológicos", values: [true, true, true] },
      { label: "Certificados de conclusão", values: [true, true, true] },
    ],
  },
  {
    category: "Suporte",
    rows: [
      { label: "Chatbot", values: [true, true, true] },
      { label: "Comunidade de alunos", values: [true, true, true] },
      { label: "Suporte por email", values: [false, true, true] },
      { label: "Suporte direto pela plataforma", values: [false, true, true] },
    ],
  },
  {
    category: "Inteligência Artificial",
    rows: [
      { label: "Tokens incluídos por mês", values: ["100.000", "300.000", "500.000"] },
    ],
  },
];
```

### Dados dos cursos detalhados (detailedCourses)

```tsx
const detailedCourses: DetailedBlock[] = [
  {
    name: "Formação Básica em Pesquisa Científica",
    subcategories: [
      {
        name: "Competências Essenciais",
        courses: [
          { name: "Introdução à Metodologia Científica", plans: [true, true, true] },
          { name: "Análise Bi e Multivariadas (SPSS e JASP)", plans: [true, true, true] },
          { name: "Escrita Científica de Alto Impacto", plans: [true, true, true] },
          { name: "Cálculo de Tamanho Amostral", plans: [true, true, true] },
        ],
      },
      {
        name: "Gerenciadores de Referências",
        courses: [
          { name: "Zotero", plans: [true, true, true] },
          { name: "Mendeley", plans: [true, true, true] },
          { name: "EndNote", plans: [true, true, true] },
        ],
      },
    ],
  },
  {
    name: "Formação Avançada em Psicometria e Análise de Dados",
    subcategories: [
      {
        name: "Modelos Mistos e Hierárquicos",
        courses: [
          { name: "Modelos Lineares Generalizados (GLM)", plans: [false, true, true] },
          { name: "Equações de Estimativas Generalizadas (GEE)", plans: [false, true, true] },
          { name: "Modelos Multinível", plans: [false, true, true] },
          { name: "Análise de Mediação e Moderação", plans: [false, true, true] },
        ],
      },
      {
        name: "Revisões da Literatura e Metanálise",
        courses: [
          { name: "Revisões da Literatura (Narrativa, Escopo e Sistemática)", plans: [false, true, true] },
          { name: "Metanálise", plans: [false, true, true] },
        ],
      },
      {
        name: "Análise de Dados Textuais",
        courses: [
          { name: "IRAMUTEQ", plans: [false, true, true] },
        ],
      },
      {
        name: "Psicometria Básica e Avançada",
        courses: [
          { name: "Construção, Adaptação & Validação de Instrumentos", plans: [false, true, true] },
          { name: "Análise Fatorial Exploratória e Confirmatória", plans: [false, true, true] },
          { name: "Modelagem por Equações Estruturais", plans: [false, true, true] },
          { name: "Teoria de Resposta ao Item (TRI)", plans: [false, true, true] },
          { name: "Análise de Redes: Teoria e Prática", plans: [false, true, true] },
          { name: "Análise de Classes e Perfis Latentes (LCA/LPA)", plans: [false, true, true] },
          { name: "Controle de Aquiescência", plans: [false, true, true] },
          { name: "Controle de Desejabilidade Social", plans: [false, true, true] },
          { name: "Métodos de Escolha Forçada", plans: [false, true, true] },
        ],
      },
      {
        name: "Estudos Epidemiológicos e Populacionais",
        courses: [
          { name: "Análise de Dados de Estudos Epidemiológicos", plans: [false, true, true] },
          { name: "Séries Temporais", plans: [false, true, true] },
          { name: "Pesquisa com Dados Abertos", plans: [false, true, true] },
        ],
      },
    ],
  },
  {
    name: "Formação Completa em Análise de Dados com R",
    subcategories: [
      {
        name: "Fundamentos do R",
        courses: [
          { name: "R: Linguagem, Scripts e Funções", plans: [false, true, true] },
        ],
      },
      {
        name: "Análises Estatísticas e Psicométricas",
        courses: [
          { name: "R: Análises Bi & Multivariadas", plans: [false, true, true] },
          { name: "R: Análise Fatorial e MEE", plans: [false, true, true] },
          { name: "R: Testes Não Paramétricos para Delineamentos Complexos", plans: [false, true, true] },
          { name: "R: Teoria de Resposta ao Item", plans: [false, true, true] },
        ],
      },
      {
        name: "Manipulação e Visualização de Dados",
        courses: [
          { name: "R: ggplot2", plans: [false, true, true] },
          { name: "R: Tidyverse", plans: [false, true, true] },
        ],
      },
    ],
  },
  {
    name: "Inteligência Artificial Aplicada a Pesquisas Científicas",
    subcategories: [
      {
        name: "Machine Learning e IA",
        courses: [
          { name: "Machine Learning Aplicado à Pesquisa Científica", plans: [false, false, true] },
          { name: "Processamento de Linguagem Natural", plans: [false, false, true] },
          { name: "Probabilistic Graph Models", plans: [false, false, true] },
          { name: "Redes Neurais Artificiais", plans: [false, false, true] },
        ],
      },
    ],
  },
  {
    name: "Desenvolvimento Profissional",
    subcategories: [
      {
        name: "Carreira Acadêmica e Mercado",
        courses: [
          { name: "Curso de Preparação para Concursos", plans: [false, false, true] },
          { name: "Viver de Análise de Dados", plans: [false, false, true] },
        ],
      },
    ],
  },
];
```

### Recursos detalhados (detailedResources)

```tsx
const detailedResources: DetailedResourceGroup[] = [
  {
    category: "Ferramentas Estatísticas",
    rows: [
      { name: "Calculadora de Tamanho Amostral", plans: [true, true, true] },
      { name: "Calculadora de Tamanho de Efeito", plans: [true, true, true] },
      { name: "Classificador de Análises Estatísticas", plans: [true, true, true] },
      { name: "Gerador de Sintaxe em R", plans: [true, true, true] },
    ],
  },
  {
    category: "Recursos Didáticos",
    rows: [
      { name: "Biblioteca Eletrônica", plans: [true, true, true] },
      { name: "Glossário Acadêmico", plans: [true, true, true] },
      { name: "Livros Metodológicos", plans: [true, true, true] },
      { name: "Certificados de conclusão", plans: [true, true, true] },
    ],
  },
  {
    category: "Suporte",
    rows: [
      { name: "Chatbot", plans: [true, true, true] },
      { name: "Comunidade de alunos", plans: [true, true, true] },
      { name: "Suporte por email", plans: [false, true, true] },
      { name: "Suporte direto pela plataforma", plans: [false, true, true] },
    ],
  },
  {
    category: "Inteligência Artificial",
    rows: [
      { name: "Tokens incluídos por mês", plans: ["100.000", "300.000", "500.000"] },
    ],
  },
];
```

---

## Funções auxiliares

```tsx
function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

function CellIcon({ value }: { value: CellValue }) {
  if (typeof value === "string") {
    return <span className="font-bold text-[#0A2E76] text-sm">{value}</span>;
  }
  if (value) {
    return (
      <div className="w-6 h-6 rounded-full bg-[#0050CC]/10 flex items-center justify-center mx-auto">
        <Check className="w-3.5 h-3.5 text-[#0050CC]" />
      </div>
    );
  }
  return (
    <div className="w-6 h-6 rounded-full bg-[#F34266]/10 flex items-center justify-center mx-auto">
      <XIcon className="w-3.5 h-3.5 text-[#F34266]" />
    </div>
  );
}

function DetailedPlanIcon({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="font-bold text-[#0A2E76] text-xs">{value}</span>;
  }
  if (value) {
    return (
      <div className="w-5 h-5 rounded-full bg-[#0050CC]/10 flex items-center justify-center mx-auto">
        <Check className="w-3 h-3 text-[#0050CC]" />
      </div>
    );
  }
  return (
    <div className="w-5 h-5 rounded-full bg-[#F34266]/10 flex items-center justify-center mx-auto">
      <XIcon className="w-3 h-3 text-[#F34266]" />
    </div>
  );
}
```

---

## Componente DesktopTable

Visível apenas em `md:` e acima. Usa `<table>` com `table-fixed`. Cabeçalho sticky com `top-[96px]`.

Proporções das colunas: 40% label / 20% Master / 20% Pro / 20% Premium.

```tsx
function DesktopTable({ billing }: { billing: BillingPeriod }) {
  return (
    <div className="hidden md:block relative bg-white rounded-2xl border border-[#E2E5EA] shadow-sm">
      <table className="w-full border-collapse table-fixed">
        <colgroup>
          <col className="w-[40%]" />
          <col className="w-[20%]" />
          <col className="w-[20%]" />
          <col className="w-[20%]" />
        </colgroup>
        <thead className="sticky top-[96px] z-30">
          <tr>
            <td colSpan={4} className="p-0" style={{ backgroundColor: "#F4F5F7" }}>
              <div className="flex" style={{ paddingLeft: "40%" }}>
                {planHeaders.map((plan) => (
                  <div key={plan.id} className="flex-1 flex justify-center">
                    {plan.badge && (
                      <span className="inline-block px-5 py-2 rounded-t-lg text-[11px] font-bold uppercase tracking-wider bg-[#0A2E76] text-white">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </td>
          </tr>
          <tr className="bg-white border-b border-[#E2E5EA]">
            <th className="p-5 text-left align-middle font-normal">
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(215,15%,55%)]">
                Recursos
              </span>
            </th>
            {planHeaders.map((plan) => (
              <th key={plan.id} className="p-5 text-center align-middle font-normal">
                <div className="font-heading font-bold text-lg text-[#0A2E76]">{plan.name}</div>
                {billing === "mensal" ? (
                  <div className="text-2xl font-heading font-bold text-[#0A2E76] mt-1">
                    {formatPrice(plan.monthlyPrice)}
                    <span className="text-xs font-normal text-[hsl(215,15%,55%)]">/mês</span>
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-heading font-bold text-[#0A2E76] mt-1">
                      {formatPrice(plan.yearlyTotal)}
                      <span className="text-xs font-normal text-[hsl(215,15%,55%)]">/ano</span>
                    </div>
                    <p className="text-[11px] text-[#0065FF] font-semibold mt-1">
                      Economia de {formatPrice(plan.monthlyPrice * 12 - plan.yearlyTotal)} -{Math.round(((plan.monthlyPrice * 12 - plan.yearlyTotal) / (plan.monthlyPrice * 12)) * 100)}%
                    </p>
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureTable.map((group, gi) => (
            <>
              <tr key={`cat-${gi}`} className="bg-[#0A2E76]/[0.06]">
                <td colSpan={4} className="px-5 py-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A2E76]">
                    {group.category}
                  </span>
                </td>
              </tr>
              {group.rows.map((row, ri) => (
                <tr
                  key={`row-${gi}-${ri}`}
                  className={`border-b border-[#F4F5F7] ${ri % 2 === 1 ? "bg-[#FAFBFC]" : ""}`}
                >
                  <td className="px-5 py-3.5 text-sm text-[hsl(215,15%,30%)]">
                    {row.label}
                    {row.sub && (
                      <span className="block text-xs text-[hsl(215,15%,55%)] mt-0.5">{row.sub}</span>
                    )}
                  </td>
                  {row.values.map((val, vi) => (
                    <td key={vi} className="px-5 py-3.5 text-center">
                      <CellIcon value={val} />
                    </td>
                  ))}
                </tr>
              ))}
            </>
          ))}
          <tr className="border-t-2 border-[#E2E5EA]">
            <td className="p-5" />
            {planHeaders.map((plan) => (
              <td key={plan.id} className="p-5 text-center">
                <a href="https://membros.psicometriaonline.com.br">
                  <Button className="w-full bg-[#0065FF] text-white font-semibold hover:bg-[#0050CC] gap-2">
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
```

---

## Componente MobileAccordion

Visível apenas abaixo de `md:`. Cabeçalho sticky com `top-[88px]`. Cada categoria é um accordion independente.

```tsx
function MobileAccordion({ billing }: { billing: BillingPeriod }) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const toggle = (index: number) =>
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));

  return (
    <div className="md:hidden">
      <div className="sticky top-[88px] z-30" style={{ backgroundColor: "#F4F5F7" }}>
        <div className="bg-white rounded-t-2xl border border-[#E2E5EA] shadow-sm">
          <div className="grid grid-cols-3 divide-x divide-[#E2E5EA]">
            {planHeaders.map((plan) => (
              <div key={plan.id} className="p-2 text-center relative">
                {plan.badge && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 inline-block px-3 py-1 rounded-t-lg text-[8px] font-bold uppercase tracking-wider bg-[#0A2E76] text-white whitespace-nowrap">
                    {plan.badge}
                  </span>
                )}
                <div className="font-heading font-bold text-xs text-[#0A2E76]">{plan.name}</div>
                {billing === "mensal" ? (
                  <div className="text-sm font-heading font-bold text-[#0A2E76] mt-0.5">
                    {formatPrice(plan.monthlyPrice)}
                    <span className="text-[9px] font-normal text-[hsl(215,15%,55%)]">/mês</span>
                  </div>
                ) : (
                  <>
                    <div className="text-sm font-heading font-bold text-[#0A2E76] mt-0.5">
                      {formatPrice(plan.yearlyTotal)}
                      <span className="text-[9px] font-normal text-[hsl(215,15%,55%)]">/ano</span>
                    </div>
                    <p className="text-[8px] text-[#0065FF] font-semibold mt-0.5 leading-tight">
                      -{Math.round(((plan.monthlyPrice * 12 - plan.yearlyTotal) / (plan.monthlyPrice * 12)) * 100)}%
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-b-2xl border-x border-b border-[#E2E5EA] shadow-sm">
        {featureTable.map((group, gi) => (
          <div key={gi}>
            <button
              onClick={() => toggle(gi)}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#0A2E76]/[0.06]"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A2E76]">
                {group.category}
              </span>
              {expanded[gi] ? (
                <Minus className="w-4 h-4 text-[#0A2E76]" />
              ) : (
                <Plus className="w-4 h-4 text-[#0A2E76]" />
              )}
            </button>
            <AnimatePresence>
              {expanded[gi] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  {group.rows.map((row, ri) => (
                    <div
                      key={ri}
                      className={`border-b border-[#F4F5F7] ${ri % 2 === 1 ? "bg-[#FAFBFC]" : ""}`}
                    >
                      <div className="px-4 py-2.5">
                        <span className="text-xs text-[hsl(215,15%,30%)]">{row.label}</span>
                        {row.sub && (
                          <span className="block text-[10px] text-[hsl(215,15%,55%)] mt-0.5">{row.sub}</span>
                        )}
                      </div>
                      <div className="grid grid-cols-3 pb-3">
                        {row.values.map((val, vi) => (
                          <div key={vi} className="flex justify-center">
                            <CellIcon value={val} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        <div className="flex justify-center p-4 border-t-2 border-[#E2E5EA]">
          <a href="https://membros.psicometriaonline.com.br">
            <Button className="bg-[#0065FF] text-white font-semibold hover:bg-[#0050CC] px-8">
              Começar Grátis
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
```

---

## Seção wrapper principal (toggle + título + hero)

```tsx
export default function Planos() {
  const [billing, setBilling] = useState<BillingPeriod>("anual");

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F4F5F7" }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #0A2E76 0%, #001A4D 50%, #0A2E76 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, #0065FF 1px, transparent 1px), radial-gradient(circle at 80% 20%, #0065FF 1px, transparent 1px), radial-gradient(circle at 50% 80%, #0065FF 1px, transparent 1px)",
            backgroundSize: "60px 60px, 80px 80px, 70px 70px",
          }}
        />
        <div className="relative pt-32 md:pt-40 pb-16 md:pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-5">
                Impulsione a sua carreira{" "}
                <span className="text-[#4D9FFF]">acadêmica</span>
              </h1>
              <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed mb-3">
                Acesse gratuitamente por 14 dias a maior plataforma de pesquisa quantitativa da América Latina.
              </p>
              <p className="text-sm text-white/50 tracking-wide mb-8">
                Ferramentas Estatísticas &bull; Cursos de Análise de Dados &bull; Suporte
              </p>
              <a href="https://membros.psicometriaonline.com.br">
                <Button className="bg-[#0065FF] text-white font-semibold rounded-full px-10 py-6 text-base hover:bg-[#0050CC] shadow-lg shadow-[#0065FF]/30">
                  Cadastre-se Gratuitamente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <div className="mt-5">
                <p className="text-[13px] text-white/55">Nenhum cartão de crédito requerido.</p>
                <p className="text-[13px] text-white/45 mt-0.5">Experimente todos os recursos antes de escolher seu plano.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Planos e Preços ── */}
      <section className="pt-16 md:pt-20 pb-20 md:pb-28" style={{ backgroundColor: "#F4F5F7" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#0A2E76] mb-4">
              Planos e Preços
            </h2>
            <p className="text-base text-[hsl(215,15%,45%)] max-w-2xl mx-auto leading-relaxed mb-8">
              Comece com acesso completo por 14 dias e escolha o plano que acompanhará o seu ritmo de crescimento.
            </p>

            {/* Toggle mensal/anual */}
            <div className="flex justify-center">
              <div className="inline-flex items-center p-1 rounded-full bg-[#0A2E76]/5 border border-[#0A2E76]/10">
                <button
                  onClick={() => setBilling("mensal")}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    billing === "mensal" ? "bg-[#0A2E76] text-white shadow-md" : "text-[#0A2E76]/60 hover:text-[#0A2E76]"
                  }`}
                >
                  Mensal
                </button>
                <button
                  onClick={() => setBilling("anual")}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 relative ${
                    billing === "anual" ? "bg-[#0A2E76] text-white shadow-md" : "text-[#0A2E76]/60 hover:text-[#0A2E76]"
                  }`}
                >
                  Anual
                  <span className="absolute -top-2.5 -right-6 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-green-500 text-white leading-none whitespace-nowrap">
                    até -27%
                  </span>
                </button>
              </div>
            </div>
          </div>

          <DesktopTable billing={billing} />
          <MobileAccordion billing={billing} />
        </div>
      </section>

    </main>
  );
}
```

---

## Notas de implementação

- O header da aplicação tem altura `96px` (desktop) e `88px` (mobile) — por isso os `top-[96px]` e `top-[88px]` nos elementos sticky
- A badge "até -27%" usa `absolute -top-2.5 -right-6` com `position: relative` no botão pai
- O desconto percentual anual é calculado dinamicamente: `Math.round(((monthlyPrice * 12 - yearlyTotal) / (monthlyPrice * 12)) * 100)`
- `font-heading` refere-se à fonte DM Sans configurada no `tailwind.config.ts`; substitua por qualquer fonte sans-serif bold
- Os botões CTA usam `RegistrationLink` no projeto original (encaminha UTMs); substituído por `<a href="...">` neste documento para uso genérico
- Logos das universidades são servidos de `/logos/*.webp` (arquivos na pasta `public/logos/`)
