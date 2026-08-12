# Texto para colar no Agent do Replit

Copie o bloco abaixo inteiro e cole no chat do Replit Agent. Antes disso, envie
o arquivo `popup-captura-leads.zip` para o Replit (ou puxe a branch
`claude/popup-cadastro-hotmart-ac-l5t0bj` do GitHub — nesse caso pule o passo 1
do prompt).

---

```
Estou adicionando um pop-up de captura de leads antes do checkout da Hotmart
nesta landing page. Os arquivos já estão prontos e testados — não reescreva a
lógica, apenas aplique e configure.

1. APLICAR OS ARQUIVOS
Descompacte o popup-captura-leads.zip na raiz do projeto, sobrescrevendo os
arquivos existentes. São 16 arquivos:

Novos:
  shared/lead-schema.ts
  client/src/lib/checkout.ts
  client/src/components/checkout/lead-capture-modal.tsx
  client/src/components/checkout/checkout-provider.tsx
  server/activecampaign.ts
  server/lead-store.ts
  server/rate-limit.ts
  server/log.ts
  .env.example
  SETUP-CAPTURA-DE-LEADS.md

Modificados:
  client/src/App.tsx        (envolve a árvore com <CheckoutProvider>)
  client/src/pages/planos.tsx (os 6 CTAs abrem o pop-up em vez de linkar direto)
  server/routes.ts          (novo endpoint POST /api/leads)
  server/index.ts           (a função log() saiu para server/log.ts)
  shared/schema.ts          (nova tabela "leads")
  .gitignore                (ignora .env)

2. PEDIR OS SECRETS PARA MIM
Me peça agora estes três valores e cadastre em Tools > Secrets. Não invente,
não deixe em branco e não coloque em nenhum arquivo do projeto:

  ACTIVECAMPAIGN_API_URL   -> URL da conta no Active Campaign, sem barra no
                              final. Fica em Settings > Developer.
                              Formato: https://SUACONTA.api-us1.com
  ACTIVECAMPAIGN_API_KEY   -> a chave da mesma tela Settings > Developer.
  ACTIVECAMPAIGN_LIST_ID   -> 31

3. BANCO DE DADOS
Confirme que DATABASE_URL existe. Depois rode uma vez:
  npm run db:push
Isso cria a tabela "leads", que guarda uma cópia local de cada cadastro caso o
Active Campaign falhe.

4. VERIFICAR
Rode "npm run check" (deve passar sem erros) e depois "npm run dev". No log de
inicialização NÃO pode aparecer a mensagem "Active Campaign incompleto" — se
aparecer, algum secret ficou faltando.

Em seguida abra /planos, clique em "Assinar o Pro" com o toggle em Anual,
preencha o pop-up e envie. Confirme comigo que:
  - a nova aba abriu no checkout da Hotmart com nome, e-mail, DDD e telefone
    já preenchidos;
  - no Active Campaign o contato entrou na lista Leads com a tag
    "Lead-Pro-Anual".

5. O QUE NÃO FAZER
- Não mova a chave do Active Campaign para o front-end. Todas as chamadas ao
  CRM partem do servidor, de propósito.
- Não faça o checkout esperar pela resposta do CRM. Se o Active Campaign cair,
  o visitante tem que seguir para o pagamento do mesmo jeito — o código já
  trata isso e não deve ser "otimizado".
- Não mexa nos códigos de oferta em client/src/lib/checkout.ts.
- Não altere o pop-up para redirecionar na mesma aba: a aba nova é aberta de
  forma síncrona no clique justamente para não ser bloqueada pelo navegador.
```
