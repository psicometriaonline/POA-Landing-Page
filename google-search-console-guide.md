# Guia: Google Search Console + Validação de Schema

## 1. Submeter o Sitemap ao Google Search Console

**Pré-requisito:** Ter o domínio `academy-po.psicometriaonline.com.br` verificado no Search Console.

### Passo a passo:

1. Acesse [search.google.com/search-console](https://search.google.com/search-console)
2. No painel esquerdo, selecione a propriedade `academy-po.psicometriaonline.com.br`
3. No menu lateral, clique em **Sitemaps** (seção "Indexação")
4. No campo "Adicionar novo sitemap", insira:
   ```
   sitemap.xml
   ```
5. Clique em **Enviar**
6. Aguarde alguns segundos — o status deve mudar para **"Sucesso"**

### O que esperar:
- O Search Console mostrará quantas URLs foram detectadas (deve ser 5)
- A indexação real pode levar de horas a alguns dias
- Acompanhe o relatório em **Cobertura de páginas** para verificar erros

---

## 2. Validar o Schema JSON-LD com Rich Results Test

1. Acesse [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
2. Digite a URL:
   ```
   https://academy-po.psicometriaonline.com.br
   ```
3. Clique em **Testar URL**
4. Aguarde a análise (cerca de 30 segundos)

### Resultados esperados:
- **FAQPage** — deve aparecer como resultado enriquecido válido (8 perguntas)
- **EducationalOrganization** — pode aparecer na aba "Itens detectados"
- Nenhum erro crítico deve ser reportado

---

## Status dos arquivos técnicos (já implementado)

| Arquivo | Status |
|---------|--------|
| `client/public/sitemap.xml` | ✅ 5 URLs válidas |
| `client/public/robots.txt` | ✅ Aponta para o sitemap |
| `client/index.html` (JSON-LD) | ✅ EducationalOrganization + FAQPage válidos |
| Schema JSON-LD parseado sem erros | ✅ |

---

## Sitemap URL
```
https://academy-po.psicometriaonline.com.br/sitemap.xml
```

## Rich Results Test URL
```
https://search.google.com/test/rich-results?url=https%3A%2F%2Facademy-po.psicometriaonline.com.br
```
