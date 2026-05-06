# Psicometria Online Academy - Landing Page

## Overview
Site institucional (landing page) para a plataforma Psicometria Online Academy (POA). A plataforma principal já existe em outro projeto Replit (POA - Member Area). Este projeto é a página de marketing/institucional.

## Design System
- **Cores primárias:** Azul escuro (#0A2E76), azul claro (#0065FF), fundo claro (#F4F5F7)
- **Tipografia:** DM Sans (headings), Inter (corpo)
- **Estilo visual:** Inspirado em Zoom, Trello, Monday - seções com alternância de cores (azul escuro, cinza claro, branco)
- **Abordagem:** Construindo seção por seção com o usuário

## Estrutura Atual
- Home page com Hero Section
- Header responsivo com navegação
- Footer completo
- Páginas planejadas: /ferramentas, /cursos, /sobre, /contato

## Arquitetura
- Frontend: React + Wouter + Tailwind CSS + Shadcn UI + Framer Motion (lazy sections only)
- Backend: Express.js (mínimo, para servir app)
- Sem banco de dados necessário neste momento

## User Preferences
- Construir seção por seção, com aprovação das copys
- Visual extremamente profissional
- Idioma: Português (BR)
- Referências visuais: Zoom, Trello, Monday

## Performance
- Imagens convertidas para WebP (~95% redução) em attached_assets/optimized/
- loading="lazy" em todas imagens below-the-fold, fetchPriority="high" no hero (desktop only)
- Fontes self-hosted: Inter e DM Sans WOFF2 em client/public/fonts/ com @font-face inline no index.html
- font-display:swap + preload dos subsets latin para LCP rápido
- Framer Motion removido do bundle inicial (hero, header, trust) - substituído por CSS animations (keyframes em index.css)
- Framer Motion mantido apenas em seções lazy-loaded (tools, hub, support, certificate, cta, faq)
- Seções below-the-fold na Home com React.lazy + Suspense (Trust, Tools, Hub, Support, Certificate, CTA, FAQ)
- Páginas secundárias com React.lazy + Suspense (Sobre, Planos, Termos, Privacidade)
- Hero image desktop-only (hidden lg:block) - mobile LCP é texto, não imagem
- Dimensões explícitas em imagens above-the-fold (hero, trust logos) para reduzir reflow
- Mobile menu usa CSS transitions (não AnimatePresence)
- Script de conversão WebP: scripts/optimize-images.sh (requer cwebp/libwebp)

## SEO / AI Visibility
- Domínio: `https://academy-po.psicometriaonline.com.br`
- `client/public/robots.txt` — libera todos os bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot)
- `client/public/sitemap.xml` — 5 URLs com prioridades e lastmod
- `client/index.html` — Schema JSON-LD: EducationalOrganization + FAQPage (8 perguntas)
- `react-helmet-async` — meta title/description por página: home, planos, sobre
- `vite.config.ts` — `dedupe: ["react", "react-dom"]` para evitar React duplicado
- `llms.txt` — arquivo de contexto para LLMs na raiz do projeto
- `pricing-section-reference.md` — referência completa para replicar seção de planos em outro app

## Recent Changes
- 2026-05-06: SEO/AI visibility - robots.txt, sitemap.xml, JSON-LD schema, react-helmet-async, pricing-section-reference.md
- 2026-02-16: Deep mobile perf - Self-hosted fonts (WOFF2), Framer Motion removido do bundle inicial, CSS animations puras para hero/header/trust
- 2026-02-16: Mobile performance - Non-blocking fonts, lazy sections, conditional preload, explicit dimensions
- 2026-02-16: Performance - WebP images, lazy loading, font optimization, code splitting, LCP preload
- 2026-02-12: Setup inicial - Design system, Header, Footer, Hero Section
