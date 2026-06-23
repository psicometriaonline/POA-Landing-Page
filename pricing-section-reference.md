# Referência: Seção "Planos e Preços" — Psicometria Online Academy

> Documento de referência para replicar fielmente a subseção **Planos e Preços** (toggle Mensal/Anual + tabela comparativa desktop + accordion mobile) em outra aplicação. Todo o código abaixo reflete o estado atual da página `/planos`.

## Visão Geral

A página `/planos` é composta por três seções principais:

1. **Hero** — fundo escuro com gradiente azul, título, subtítulo e CTA
2. **Planos e Preços** — toggle mensal/anual + tabela comparativa (desktop) / accordion (mobile)
3. **Detalhamento de Cursos** — expansível via botão, tabela completa por plano + recursos

O foco deste documento é a subseção **Planos e Preços**: o toggle de período + `DesktopTable` + `MobileAccordion`.

---

## Comportamento Interativo

- **Toggle Mensal/Anual**: estado `billing: BillingPeriod` ("mensal" | "anual"), padrão `"anual"`. Ao mudar, todos os preços e cálculos de economia atualizam instantaneamente.
- **Tabela Desktop** (`hidden md:block`): header sticky com badge, nome e preço de cada plano; linhas agrupadas por categoria; botões CTA por coluna no rodapé.
- **Accordion Mobile** (`md:hidden`): header sticky com nome e preço; linhas de features colapsadas por categoria com ícones `+`/`-` (Plus/Minus) e animação de altura via framer-motion; um botão CTA no rodapé.
- **Desconto anual**: calculado dinamicamente como `Math.round(((monthlyPrice * 12 - yearlyTotal) / (monthlyPrice * 12)) * 100)`.
- **Economia anual (R$)**: `formatPrice(monthlyPrice * 12 - yearlyTotal)`.

---

## Dependências

```json
{
  "react": "^18",
  "framer-motion": "^11",
  "lucide-react": "latest",
  "@shadcn/ui Button": "componente local"
}
```

Ícones usados de `lucide-react`: `Check`, `X` (importado como `XIcon`), `ArrowRight`, `Plus`, `Minus`.

Tailwind CSS (configuração padrão é suficiente). Tokens de fonte usados:
- `font-heading` → DM Sans (configurar em `tailwind.config` como `fontFamily.heading`)
- Fonte de corpo padrão → Inter

Não há dependência de banco de dados nem de estado global; tudo é estático + `useState` local.

---

## Paleta de Cores e Tokens

| Token | Valor | Uso |
|---|---|---|
| Azul escuro | `#0A2E76` | Títulos, cabeçalhos de tabela, badges de categoria, toggle ativo |
| Azul principal | `#0065FF` | Botões CTA primários, textos de desconto |
| Azul hover | `#0050CC` | Hover dos botões, ícone de "incluído" |
| Azul check (bg) | `#0050CC` a 10% opacidade | Fundo do ícone de "incluído" |
| Vermelho X | `#F34266` | Ícone de "não incluído" |
| Vermelho X (bg) | `#F34266` a 10% opacidade | Fundo do ícone de "não incluído" |
| Texto corpo | `hsl(215, 15%, 30%)` | Labels de feature |
| Texto auxiliar | `hsl(215, 15%, 45%)` | Subtítulo da seção |
| Texto auxiliar 2 | `hsl(215, 15%, 55%)` | Sub-labels, sufixos de preço (/mês, /ano) |
| Fundo página | `#F4F5F7` | Background da seção e do header sticky |
| Fundo tabela | `#FFFFFF` | Card da tabela |
| Fundo categoria | `#0A2E76` a 6% opacidade (`bg-[#0A2E76]/[0.06]`) | Linhas de grupo |
| Fundo linha alt | `#FAFBFC` | Linhas pares (zebra) |
| Borda | `#E2E5EA` | Bordas da tabela e separadores |
| Borda linha | `#F4F5F7` | Bordas entre linhas |
| Verde desconto | `green-500` (Tailwind) | Badge "até -27%" no toggle anual |

---

## Tipos TypeScript

```typescript
type BillingPeriod = "mensal" | "anual";
type CellValue = boolean | string;

interface PlanHeader {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;   // preço por mês no plano anual
  yearlyTotal: number;   // total anual cobrado
  badge?: string;
  cta: string;
}

interface FeatureRow {
  label: string;
  sub?: string;
  values: [CellValue, CellValue, CellValue]; // [Master, Pro, Premium]
}

interface CategoryGroup {
  category: string;
  rows: FeatureRow[];
}
```

---

## Dados: `planHeaders`

```typescript
const planHeaders: PlanHeader[] = [
  {
    id: "master",
    name: "Master",
    monthlyPrice: 75.90,
    yearlyPrice: 58.08,
    yearlyTotal: 697.00,
    cta: "Quero a minha vaga",
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 109.90,
    yearlyPrice: 83.08,
    yearlyTotal: 997.00,
    badge: "Mais acessado",
    cta: "Quero a minha vaga",
  },
  {
    id: "premium",
    name: "Premium",
    monthlyPrice: 169.90,
    yearlyPrice: 124.75,
    yearlyTotal: 1497.00,
    cta: "Quero a minha vaga",
  },
];
```

---

## Dados: `featureTable`

```typescript
const featureTable: CategoryGroup[] = [
  {
    category: "Formações",
    rows: [
      {
        label: "Formação Básica em Pesquisa Científica",
        sub: "Método de Pesquisa, Análise de Dados Bi e Multivariadas, Escrita Científica, Cálculo de Poder Amostral, Gerenciadores de Referências",
        values: [true, true, true],
      },
      {
        label: "Formação Avançada em Psicometria e Análise de Dados",
        sub: "Modelos Mistos, Metanálise, Psicometria, Dados Textuais e Estudos Epidemiológicos",
        values: [false, true, true],
      },
      {
        label: "Formação Completa em Análise de Dados com R",
        sub: "Linguagem, Scripts e Funções, Análises de Dados Bi e Multivariadas, Análises Psicométricas, tidyverse e ggplot2",
        values: [false, true, true],
      },
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
      { label: "Suporte direto pela plataforma", values: [true, true, true] },
      { label: "Suporte por email", values: [false, true, true] },
      { label: "Suporte Ao Vivo (Academeeting)", values: [false, true, true] },
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

---

## Funções Auxiliares

```tsx
function formatPrice(price: number): string {
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
```

---

## Imports necessários

```tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X as XIcon, ArrowRight, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button"; // shadcn Button
```

> **Nota sobre os CTAs:** na aplicação original os botões são envolvidos por um wrapper de link. Nos exemplos abaixo eles aparecem como `<a>` + `<button>` genéricos — substitua o `href` pelo destino desejado (ex.: checkout, página de cadastro ou rota interna).

---

## Componente: `DesktopTable`

```tsx
function DesktopTable({ billing }: { billing: BillingPeriod }) {
  return (
    <div className="hidden md:block relative bg-white rounded-2xl border border-[#E2E5EA] shadow-sm">
      <table className="w-full border-collapse table-fixed" data-testid="table-plans">
        <colgroup>
          <col className="w-[40%]" />
          <col className="w-[20%]" />
          <col className="w-[20%]" />
          <col className="w-[20%]" />
        </colgroup>
        <thead className="sticky top-[96px] z-30">
          {/* Linha de badges acima do header */}
          <tr>
            <td colSpan={4} className="p-0" style={{ backgroundColor: "#F4F5F7" }}>
              <div className="flex" style={{ paddingLeft: "40%" }}>
                {planHeaders.map((plan) => (
                  <div key={plan.id} className="flex-1 flex justify-center">
                    {plan.badge && (
                      <span
                        className="inline-block px-5 py-2 rounded-t-lg text-[11px] font-bold uppercase tracking-wider bg-[#0A2E76] text-white"
                        data-testid={`badge-plan-${plan.id}`}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </td>
          </tr>
          {/* Linha de planos e preços */}
          <tr className="bg-white border-b border-[#E2E5EA]">
            <th className="p-5 text-left align-middle font-normal">
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(215,15%,55%)]">
                Recursos
              </span>
            </th>
            {planHeaders.map((plan) => (
              <th key={plan.id} className="p-5 text-center align-middle font-normal" data-testid={`th-plan-${plan.id}`}>
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
              {/* Linha de categoria */}
              <tr key={`cat-${gi}`} className="bg-[#0A2E76]/[0.06]">
                <td colSpan={4} className="px-5 py-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A2E76]">
                    {group.category}
                  </span>
                </td>
              </tr>
              {/* Linhas de features */}
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
          {/* Linha de CTAs (um por coluna de plano) */}
          <tr className="border-t-2 border-[#E2E5EA]">
            <td className="p-5" />
            {planHeaders.map((plan) => (
              <td key={plan.id} className="p-5 text-center">
                {/* Substitua href pelo destino desejado (checkout do plano, etc.) */}
                <a href="#" data-testid={`button-plan-cta-${plan.id}`}>
                  <button className="w-full bg-[#0065FF] text-white font-semibold hover:bg-[#0050CC] gap-2 px-4 py-2 rounded-md flex items-center justify-center">
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </button>
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

## Componente: `MobileAccordion`

```tsx
function MobileAccordion({ billing }: { billing: BillingPeriod }) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="md:hidden">
      {/* Header sticky com preços */}
      <div className="sticky top-[88px] z-30" style={{ backgroundColor: "#F4F5F7" }}>
        <div className="bg-white rounded-t-2xl border border-[#E2E5EA] shadow-sm">
          <div className="grid grid-cols-3 divide-x divide-[#E2E5EA]">
            {planHeaders.map((plan) => {
              const price = billing === "mensal" ? plan.monthlyPrice : plan.yearlyPrice;
              return (
                <div key={plan.id} className="p-2 text-center relative" data-testid={`mobile-th-${plan.id}`}>
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
              );
            })}
          </div>
        </div>
      </div>

      {/* Accordion de categorias */}
      <div className="bg-white rounded-b-2xl border-x border-b border-[#E2E5EA] shadow-sm">
        {featureTable.map((group, gi) => (
          <div key={gi}>
            <button
              onClick={() => toggle(gi)}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#0A2E76]/[0.06]"
              data-testid={`mobile-toggle-${gi}`}
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

        {/* CTA final */}
        <div className="flex justify-center p-4 border-t-2 border-[#E2E5EA]">
          {/* Substitua href pelo destino desejado */}
          <a href="#" data-testid="mobile-cta-main">
            <button className="bg-[#0065FF] text-white font-semibold hover:bg-[#0050CC] px-8 py-2 rounded-md">
              Quero a minha vaga
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
```

---

## Componente Wrapper: Seção Planos e Preços

```tsx
export default function PlanosSection() {
  const [billing, setBilling] = useState<BillingPeriod>("anual");

  return (
    <section className="pt-16 md:pt-20 pb-20 md:pb-28" style={{ backgroundColor: "#F4F5F7" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Título, subtítulo e toggle */}
        <div className="text-center mb-12">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#0A2E76] mb-4"
            data-testid="text-planos-pricing-title"
          >
            Planos e Preços
          </h2>
          <p className="text-base text-[hsl(215,15%,45%)] max-w-2xl mx-auto leading-relaxed mb-8">
            Escolha o plano que acompanhará o seu ritmo de crescimento e tenha acesso completo agora mesmo.
          </p>

          {/* Toggle Mensal / Anual */}
          <div className="flex justify-center">
            <div
              className="inline-flex items-center p-1 rounded-full bg-[#0A2E76]/5 border border-[#0A2E76]/10"
              data-testid="toggle-billing"
            >
              <button
                onClick={() => setBilling("mensal")}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  billing === "mensal"
                    ? "bg-[#0A2E76] text-white shadow-md"
                    : "text-[#0A2E76]/60 hover:text-[#0A2E76]"
                }`}
                data-testid="button-billing-mensal"
              >
                Mensal
              </button>
              <button
                onClick={() => setBilling("anual")}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 relative ${
                  billing === "anual"
                    ? "bg-[#0A2E76] text-white shadow-md"
                    : "text-[#0A2E76]/60 hover:text-[#0A2E76]"
                }`}
                data-testid="button-billing-anual"
              >
                Anual
                {/* Badge de desconto */}
                <span className="absolute -top-2.5 -right-6 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-green-500 text-white leading-none whitespace-nowrap">
                  até -27%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabelas */}
        <DesktopTable billing={billing} />
        <MobileAccordion billing={billing} />

      </div>
    </section>
  );
}
```

---

## Layout e Estrutura Visual

- **Página toda**: `background: #F4F5F7`
- **Card da tabela**: `bg-white rounded-2xl border border-[#E2E5EA] shadow-sm`
- **Header sticky**: `top-[96px]` no desktop (altura do header fixo = 96px); `top-[88px]` no mobile — **ajuste estes offsets conforme a altura do header da aplicação de destino**
- **Coluna de features**: 40% da largura; colunas de plano: 20% cada (via `<colgroup>` + `table-fixed`)
- **Badge "Mais acessado"**: posicionado acima do header, alinhado à coluna "Pro" (`paddingLeft: 40%` + flex), fundo `#0A2E76`, texto branco, `rounded-t-lg`
- **Zebra stripes**: linhas com índice ímpar recebem `bg-[#FAFBFC]`
- **Accordion mobile**: cada categoria abre/fecha com animação `height` do framer-motion; ícones `Plus`/`Minus`
- **Largura máxima do container**: `max-w-5xl mx-auto`

---

## Referência Visual

Layout disponível em: `attached_assets/image_1772039303341.png`

A imagem mostra o estado padrão (anual selecionado), com:
- Badge "Mais acessado" acima da coluna Pro
- Preços anuais exibidos com economia calculada (R$ + percentual)
- Tabela desktop com 4 colunas (Recursos + 3 planos: Master, Pro, Premium)
- Ícones de check azul (incluído) e X vermelho (não incluído) por feature
- Linha de tokens de IA exibindo valores em texto ("100.000", "300.000", "500.000")
