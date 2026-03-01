        ))}

                <div className="border-t-2 border-[#E2E5EA]" />

                {detailedResources.map((group, gi) => (
                  <div key={gi}>
                    <div className="grid grid-cols-[1fr_120px_120px_120px] bg-[#0A2E76]/[0.08]">
                      <div className="px-5 py-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0A2E76]">
                          {group.category}
                        </span>
                      </div>
                      <div /><div /><div />
                    </div>
                    {group.rows.map((row, ri) => (
                      <div
                        key={ri}
                        className={`grid grid-cols-[1fr_120px_120px_120px] border-b border-[#F4F5F7] ${ri % 2 === 1 ? "bg-[#FAFBFC]" : ""}`}
                      >
                        <div className="px-5 py-3">
                          <span className="text-sm text-[hsl(215,15%,30%)]">{row.name}</span>
                        </div>
                        {row.plans.map((val, vi) => (
                          <div key={vi} className="px-3 py-3 flex items-center justify-center">
                            <DetailedPlanIcon value={val} />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* ==================== MOBILE TABLE ==================== */}
              <div className="md:hidden bg-white rounded-2xl border border-[#E2E5EA] shadow-sm">
                <div className="sticky top-[88px] z-30 grid grid-cols-[1fr_1fr_1fr] border-b border-[#E2E5EA] bg-[#0A2E76] rounded-t-2xl">
                  {planNames.map((name) => (
                    <div key={name} className="py-3 text-center">
                      <span className="text-[11px] font-bold text-white">{name}</span>
                    </div>
                  ))}
                </div>

                {detailedCourses.map((block, bi) => (
                  <div key={bi}>
                    <div className="px-4 py-3 bg-[#0A2E76]/[0.06]">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0A2E76]">
                        {block.name}
                      </span>
                    </div>

                    {block.subcategories.map((sub, si) => (
                      <div key={si}>
                        <div className="px-4 py-2 bg-[#F8F9FB]">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0A2E76]/60">
                            {sub.name}
                          </span>
                        </div>
                        {sub.courses.map((course, ci) => (
                          <div key={ci} className={`border-b border-[#F4F5F7] ${ci % 2 === 1 ? "bg-[#FAFBFC]" : ""}`}>
                            <div className="px-4 py-2">
                              <span className="text-xs text-[hsl(215,15%,30%)]">{course.name}</span>
                            </div>
                            <div className="grid grid-cols-3 pb-2.5">
                              {course.plans.map((val, vi) => (
                                <div key={vi} className="flex justify-center">
                                  <DetailedPlanIcon value={val} />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}

                <div className="border-t-2 border-[#E2E5EA]" />

                {detailedResources.map((group, gi) => (
                  <div key={gi}>
                    <div className="px-4 py-3 bg-[#0A2E76]/[0.06]">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0A2E76]">
                        {group.category}
                      </span>
                    </div>
                    {group.rows.map((row, ri) => (
                      <div key={ri} className={`border-b border-[#F4F5F7] ${ri % 2 === 1 ? "bg-[#FAFBFC]" : ""}`}>
                        <div className="px-4 py-2">
                          <span className="text-xs text-[hsl(215,15%,30%)]">{row.name}</span>
                        </div>
                        <div className="grid grid-cols-3 pb-2.5">
                          {row.plans.map((val, vi) => (
                            <div key={vi} className="flex justify-center">
                              <DetailedPlanIcon value={val} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* ==================== CTA FINAL ==================== */}
              <div className="flex justify-center mt-10">
                <a
                  href="https://psicometriaonline.com.br/academy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-detailed-cta"
                >
                  <Button
                    className="bg-[#0065FF] text-white font-semibold rounded-full px-10 py-6 text-base hover:bg-[#0050CC] shadow-lg shadow-[#0065FF]/30 gap-2"
                  >
                    Começar Já
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </div>
              </>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
```

---

## Estrutura da Tabela Desktop (Grid Layout)

A tabela desktop usa CSS Grid com a seguinte estrutura de colunas:

```
grid-cols-[1fr_120px_120px_120px]
```

- **1fr** — coluna de nome do curso/recurso (ocupa o espaço restante)
- **120px** — coluna Master
- **120px** — coluna Pro
- **120px** — coluna Premium

### Hierarquia visual (desktop):

```
┌─────────────────────────────────────────────────────────────┐
│ [Header sticky] Cursos e Recursos | Master | Pro | Premium │ ← bg-[#0A2E76], rounded-t-2xl
├─────────────────────────────────────────────────────────────┤
│ FORMAÇÃO BÁSICA EM PESQUISA CIENTÍFICA                     │ ← bg-[#0A2E76]/[0.08], uppercase, bold
├─────────────────────────────────────────────────────────────┤
│   COMPETÊNCIAS ESSENCIAIS                                  │ ← bg-[#F8F9FB], text-[11px], pl-9
├─────────────────────────────────────────────────────────────┤
│     Introdução à Metodologia Científica  |  ✓  |  ✓  |  ✓ │ ← pl-9, text-sm
│     Análise Bi e Multivariadas           |  ✓  |  ✓  |  ✓ │ ← alternating bg-[#FAFBFC]
├─────────────────────────────────────────────────────────────┤
│ ══════════════ border-t-2 ══════════════                   │ ← separador entre cursos e recursos
├─────────────────────────────────────────────────────────────┤
│ FERRAMENTAS ESTATÍSTICAS                                   │ ← mesma estrutura dos blocos
│   Calculadora de Tamanho Amostral        |  ✓  |  ✓  |  ✓ │
└─────────────────────────────────────────────────────────────┘
                    [ Começar Já → ]                           ← CTA centralizado
```

---

## Estrutura da Tabela Mobile

No mobile, o layout muda:

- Header sticky com `grid-cols-[1fr_1fr_1fr]` mostrando apenas os nomes dos planos
- Cada curso mostra seu nome em uma linha e os 3 ícones abaixo em `grid grid-cols-3`
- Nomes dos blocos e subcategorias ficam em linhas separadas com fundo diferenciado

---

## Comportamento e Interações

### Botão Toggle
- **Estado colapsado**: Texto "Ver todos os cursos por plano" com ícone `ChevronDown` apontando para baixo
- **Estado expandido**: Texto "Ocultar detalhes" com ícone `ChevronDown` rotacionado 180° (apontando para cima)
- **Animação do conteúdo**: fade-in/out com `framer-motion` (`opacity: 0 → 1` e vice-versa, duração 0.3s)
- **Estilo do botão**: `rounded-full`, fundo `#0A2E76`, texto branco, `shadow-md`

### Header Sticky
- **Desktop**: `top-[96px]` — ajustar conforme altura do header/navbar da sua aplicação
- **Mobile**: `top-[88px]` — ajustar conforme header
- **z-index**: `z-30` para ficar acima do conteúdo durante scroll

### Ícones
- `true` → círculo `w-5 h-5` com fundo `bg-[#0050CC]/10` e `Check` azul (`w-3 h-3`)
- `false` → círculo `w-5 h-5` com fundo `bg-[#F34266]/10` e `XIcon` vermelho (`w-3 h-3`)
- `string` → texto bold azul `text-xs` (usado para valores numéricos como tokens)

### CTA Final
- Botão `rounded-full` com fundo `#0065FF`, texto branco, sombra `#0065FF/30`
- Ícone `ArrowRight` ao lado do texto
- Link externo com `target="_blank"`

---

## Notas para Implementação

1. **Ajustar `top` do sticky**: Os valores `top-[96px]` (desktop) e `top-[88px]` (mobile) dependem da altura do header/navbar da aplicação destino.

2. **Link do CTA**: O botão aponta para `https://psicometriaonline.com.br/academy/`. Substitua pela URL desejada.

3. **`font-heading`**: Classe customizada de fonte. Configure no `tailwind.config.ts` ou substitua por `font-sans`.

4. **`data-testid`**: Atributos de teste incluídos nos elementos interativos e informativos.

5. **Sem animação (fallback)**: Se não quiser usar `framer-motion`, substitua `motion.div` por `div`, remova `AnimatePresence`, e use renderização condicional simples (`{isExpanded && <div>...</div>}`).

6. **shadcn Button**: Se não estiver usando shadcn, substitua `<Button>` por `<button>` nativo com as mesmas classes Tailwind.

7. **Dados separados**: Note que cursos (`detailedCourses`) e recursos (`detailedResources`) usam tipos diferentes. Cursos têm subcategorias com hierarquia de 3 níveis (bloco → subcategoria → curso). Recursos são flat (categoria → linhas).

8. **Divisor visual**: Entre cursos e recursos há um `<div className="border-t-2 border-[#E2E5EA]" />` como separador visual.
