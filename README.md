# Fluxo Certo Consultoria — site + painel

Recriação do site WordPress em **Vite + React**, hospedado na **Cloudflare Pages**, com
painel administrativo próprio onde **todos os textos e imagens** do site são editáveis.

- Site público: `/` (Início) e `/mentoria`
- Painel: `/admin`
- API: `/api/*` (Cloudflare Pages Functions)

Conteúdo salvo no **D1**, imagens enviadas pelo painel no **R2**. Se o banco ainda não tiver
conteúdo, o site cai automaticamente no conteúdo padrão embutido no bundle — ou seja, nunca
fica em branco.

---

## 1. Estrutura

```
functions/api/[[path]].js   API (login, conteúdo, upload, mídias, leads)
public/img/                 imagens originais do site
schema.sql                  tabelas do D1
src/content/defaultContent.js  ← conteúdo padrão / estrutura do CMS
src/components/             header, footer, seções reutilizáveis
src/pages/                  Home.jsx, Mentoria.jsx, NotFound.jsx
src/admin/                  painel (editor automático, imagens, cadastros)
```

O painel monta os formulários **automaticamente** a partir de `defaultContent.js`.
Criou um campo novo lá? Ele aparece no admin sem nenhum código extra.

---

## 2. Rodar localmente

```bash
npm install
cp .dev.vars.example .dev.vars     # e edite a senha/segredo
npm run build
npm run dev:api                    # site + API em http://127.0.0.1:8788
```

Para desenvolver a interface com hot reload, em outro terminal:

```bash
npm run dev                        # http://localhost:5173 (API vem da 8788)
```

---

## 3. Publicar na Cloudflare

### 3.1 Criar os recursos (uma vez)

```bash
npx wrangler login
npx wrangler d1 create fluxocerto
npx wrangler r2 bucket create fluxocerto-midia
```

Cole o `database_id` retornado no `wrangler.toml`, depois crie as tabelas:

```bash
npm run db:remote
```

### 3.2 Definir os segredos

```bash
npx wrangler pages secret put ADMIN_PASSWORD    # senha do painel
npx wrangler pages secret put SESSION_SECRET    # texto longo e aleatório
```

> Alternativa: em vez de `ADMIN_PASSWORD`, defina `ADMIN_PASSWORD_HASH` com o SHA-256 da
> senha em hexadecimal. A API aceita os dois.

### 3.3 Deploy

```bash
npm run deploy
```

Ou conecte o repositório no painel da Cloudflare Pages usando:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- Em *Settings → Functions → Bindings*, adicione `DB` (D1) e `MEDIA` (R2)
- Em *Settings → Environment variables*, adicione `ADMIN_PASSWORD` e `SESSION_SECRET`

### 3.4 Domínio

Em *Custom domains*, aponte `fluxocertoconsultoria.com.br` (e `www`) para o projeto Pages.
O redirecionamento `/inicio → /` já está configurado em `public/_redirects`, preservando
o endereço antigo do WordPress.

---

## 4. Usando o painel

1. Acesse `/admin` e entre com a senha.
2. **Conteúdo** — menu lateral com todas as seções das duas páginas. Textos, títulos, listas
   (adicionar / remover / reordenar) e imagens (upload direto para o R2).
3. **Imagens** — biblioteca de tudo que foi enviado, com link para reaproveitar.
4. **Cadastros** — quem preencheu o formulário da Mentoria, com exportação em CSV.
5. Clique em **Publicar**. A mudança vale imediatamente, sem novo deploy.

O botão *Restaurar conteúdo original* volta ao conteúdo de fábrica (só vale após Publicar).

---

## 5. Identidade visual

Extraída do site atual (tema Astra + Elementor):

| Item | Valor |
| --- | --- |
| Azul principal | `#0A6CFF` |
| Azul escuro (hover) | `#045CB4` |
| Fundo claro | `#F0F5FA` |
| Preto | `#020101` |
| Amarelo de destaque | `#FECB2D` |
| Títulos | Epilogue |
| Texto | DM Sans |

Definidos em `src/index.css` (`@theme`) — mudar ali reflete no site inteiro.
