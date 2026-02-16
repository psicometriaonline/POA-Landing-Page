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
- Frontend: React + Wouter + Tailwind CSS + Shadcn UI + Framer Motion
- Backend: Express.js (mínimo, para servir app)
- Sem banco de dados necessário neste momento

## User Preferences
- Construir seção por seção, com aprovação das copys
- Visual extremamente profissional
- Idioma: Português (BR)
- Referências visuais: Zoom, Trello, Monday

## Performance
- Imagens convertidas para WebP (~95% redução) em attached_assets/optimized/
- loading="lazy" em todas imagens below-the-fold, fetchPriority="high" no hero
- Fontes Google otimizadas (apenas pesos 400/500/600/700 Inter, 500/600/700 DM Sans)
- Páginas secundárias com React.lazy + Suspense (Sobre, Planos, Termos, Privacidade)
- Preload da imagem LCP do Hero no index.html
- Script de conversão WebP: scripts/optimize-images.sh (requer cwebp/libwebp)

## Recent Changes
- 2026-02-16: Performance - WebP images, lazy loading, font optimization, code splitting, LCP preload
- 2026-02-12: Setup inicial - Design system, Header, Footer, Hero Section
