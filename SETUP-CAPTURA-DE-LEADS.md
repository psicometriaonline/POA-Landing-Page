# Setup — Pop-up de captura → Active Campaign → Checkout Hotmart

> **Replit:** antes de rodar a aplicação, peça ao usuário os três secrets da
> seção 1 e cadastre-os em **Tools › Secrets**. Sem eles a página continua no ar
> e as vendas continuam acontecendo, mas **nenhum lead chega ao Active
> Campaign** — o servidor apenas registra um aviso no log de inicialização.

---

## 1. Secrets a cadastrar

| Secret | Onde encontrar | Exemplo |
|---|---|---|
| `ACTIVECAMPAIGN_API_URL` | Active Campaign › **Settings › Developer** › *API Access* › URL | `https://psicometriaonline.api-us1.com` |
| `ACTIVECAMPAIGN_API_KEY` | mesma tela, campo *Key* | `a1b2c3...` |
| `ACTIVECAMPAIGN_LIST_ID` | ID da lista **Leads** | `31` |

A URL vai **sem barra no final**. A chave é secreta: ela nunca é enviada ao
navegador — todas as chamadas ao Active Campaign partem do servidor.

Opcionalmente, `DATABASE_URL` (já provisionado pelo Replit) ativa a cópia local
dos leads. Depois de defini-lo, rode uma vez:

```bash
npm run db:push
```

## 2. Como o fluxo funciona

1. O visitante clica em **Assinar o Master / Pro / Premium** na página `/planos`.
2. Abre o pop-up pedindo nome, e-mail e telefone.
3. Ao enviar, o navegador chama `POST /api/leads`, que:
   - grava o lead no Postgres (se houver banco);
   - cria ou atualiza o contato no Active Campaign (`contact/sync`);
   - inscreve o contato na lista configurada;
   - aplica a tag do plano escolhido.
4. Em seguida abre-se uma nova aba com o checkout da Hotmart **já preenchido**
   com os dados informados.

O checkout nunca espera pelo CRM: se o Active Campaign estiver fora do ar ou
demorar, a resposta sai mesmo assim e o visitante segue para o pagamento.

## 3. Tags aplicadas

| Plano | Mensal | Anual |
|---|---|---|
| Master | `Lead-Master-Mensal` | `Lead-Master-Anual` |
| Pro | `Lead-Pro-Mensal` | `Lead-Pro-Anual` |
| Premium | `Lead-Premium-Mensal` | `Lead-Premium-Anual` |

As tags são criadas automaticamente na primeira vez que aparecem. Se você já as
criou no Active Campaign, elas são reaproveitadas pelo nome exato.

## 4. Checklist de validação em produção

Depois do deploy, com os secrets cadastrados:

- [ ] Abrir `/planos`, clicar em **Assinar o Pro** com o toggle em **Anual**.
- [ ] Preencher o pop-up e enviar.
- [ ] Conferir no Active Campaign: contato criado, na lista **Leads**, com a tag
      `Lead-Pro-Anual`.
- [ ] Conferir na aba do checkout se **nome, e-mail, DDD e telefone** aparecem
      preenchidos.
- [ ] Repetir para pelo menos mais uma combinação (ex.: Master · Mensal).

O passo do checkout é o único que não deu para verificar automaticamente: o
ambiente de desenvolvimento não tem acesso de rede a `pay.hotmart.com`. A URL
gerada segue os parâmetros documentados pela Hotmart (`name`, `email`,
`phoneac`, `phonenumber`), mas confirme visualmente na primeira execução.

## 5. Telefones fora do Brasil

A Hotmart não documenta um parâmetro para o código do país: o checkout deduz o
DDI pela localização do comprador. Enviar um número estrangeiro nos campos
`phoneac`/`phonenumber` faria o checkout montar um telefone errado.

Por isso o pop-up tem um seletor de país e:

- **Brasil (+55):** nome, e-mail e telefone vão pré-preenchidos.
- **Outros países:** nome e e-mail vão pré-preenchidos; o telefone fica em
  branco no checkout, para o comprador digitar sob o DDI correto.

Em todos os casos o telefone completo, com o código do país, é gravado no
Active Campaign em formato internacional (ex.: `+351912345678`).

## 6. Arquivos envolvidos

| Arquivo | Papel |
|---|---|
| `shared/lead-schema.ts` | validação e mapa de tags, compartilhado entre cliente e servidor |
| `client/src/lib/checkout.ts` | ofertas da Hotmart, países e montagem da URL do checkout |
| `client/src/components/checkout/lead-capture-modal.tsx` | o pop-up |
| `client/src/components/checkout/checkout-provider.tsx` | disponibiliza o pop-up para qualquer botão |
| `server/routes.ts` | endpoint `POST /api/leads` |
| `server/activecampaign.ts` | cliente da API do Active Campaign |
| `server/lead-store.ts` | cópia local dos leads |
| `server/rate-limit.ts` | proteção contra rajadas no endpoint |
