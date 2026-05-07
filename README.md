# Motor de Landing Pages Imobiliárias
### San Remo Imóveis — Florianópolis, SC

Sistema para criar e publicar landing pages de campanha para empreendimentos imobiliários premium. Cada empreendimento tem sua própria identidade visual, tema de cores, textos e animações, gerados a partir de um único arquivo de dados.

---

## Visão geral

```
PDF / Catálogo do empreendimento
        ↓
  Extração via IA (prompt)
        ↓
  dados.json + imagens organizadas
        ↓
  Landing page em /empreendimento/[slug]
        ↓
  Marketing Studio → roteiro + posts gerados por IA
        ↓
  Download do pacote .zip (imagens + roteiro)
```

A stack é **Next.js 15 + TypeScript + Tailwind CSS**, com animações via Framer Motion e GSAP, scroll suave com Lenis, leads salvos no Supabase e deploy na Vercel.

---

## Pré-requisitos

- Node.js 20+
- npm 10+
- Conta na [OpenAI](https://platform.openai.com) com acesso ao modelo `gpt-image-2` e `gpt-4o`
- Conta no [Supabase](https://supabase.com) (opcional — só para salvar leads)
- Instância do [n8n](https://n8n.io) (opcional — para automações de leads via webhook)

---

## Instalação

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd LandingPage-Dinamica-SR

# 2. Instale as dependências
npm install

# 3. Copie o arquivo de variáveis de ambiente
cp .env.example .env

# 4. Preencha o .env (veja a seção abaixo)

# 5. Suba o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`.

---

## Variáveis de ambiente

Edite o arquivo `.env` na raiz do projeto:

```env
# URL pública do site (mude para o domínio real no deploy)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Credenciais de acesso ao painel /admin e /studio
# Escolha um usuário e senha fortes — estas rotas ficam protegidas por Basic Auth
ADMIN_USER=seu-usuario
ADMIN_PASSWORD=sua-senha-segura

# Supabase — para salvar leads dos formulários (opcional)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# n8n — para encaminhar leads a fluxos de automação (opcional)
N8N_WEBHOOK_URL=https://seu-n8n.com/webhook/xxxxx
N8N_API_TOKEN=seu-token-n8n

# OpenAI — obrigatório para gerar imagens e roteiros no Marketing Studio
OPENAI_API_KEY=sk-proj-...

# Anthropic — reservado para futuras integrações com Claude
ANTHROPIC_API_KEY=sk-ant-...
```

### Como obter cada chave

#### OpenAI (`OPENAI_API_KEY`)
1. Acesse [platform.openai.com](https://platform.openai.com)
2. Vá em **API Keys** → **Create new secret key**
3. Dê um nome (ex: `sanremo-studio`) e copie a chave
4. Certifique-se de que sua conta tem saldo ou créditos ativos
5. O projeto usa `gpt-4o` para roteiros e `gpt-image-2` para imagens — verifique se seu plano tem acesso a ambos

#### Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)
1. Crie um projeto em [supabase.com](https://supabase.com)
2. Vá em **Project Settings → API**
3. Copie a **URL do projeto** → `NEXT_PUBLIC_SUPABASE_URL`
4. Copie a chave `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Copie a chave `service_role` (secreta) → `SUPABASE_SERVICE_ROLE_KEY`
6. Crie a tabela `leads` no banco (veja abaixo)

```sql
-- Execute no SQL Editor do Supabase
create table leads (
  id          uuid default gen_random_uuid() primary key,
  created_at  timestamp with time zone default now(),
  nome        text not null,
  whatsapp    text not null,
  email       text,
  interesse   text,
  slug        text,
  origem      text
);
```

#### n8n (`N8N_WEBHOOK_URL`, `N8N_API_TOKEN`)
- Configure um webhook no n8n para receber os dados do lead via POST
- O sistema envia os leads automaticamente para o webhook quando um formulário é submetido
- Se não usar n8n, deixe as variáveis em branco — o lead vai apenas para o Supabase

---

## Estrutura do projeto

```
src/
  app/
    empreendimento/[slug]/   → Landing page pública de cada empreendimento
    studio/                  → Marketing Studio (protegido por auth)
    studio/[slug]/           → Studio de um empreendimento específico
    admin/                   → Painel administrativo (protegido por auth)
    api/
      studio/gerar-roteiro/[slug]/  → POST: gera roteiro de marketing com IA
      studio/gerar-imagem/[slug]/   → POST: gera posts de Instagram com IA
      studio/download/[slug]/       → GET: baixa pacote .zip com todo o conteúdo

  components/landing/        → Templates e seções das landing pages
  data/developments/         → Dados de cada empreendimento (TypeScript)
  lib/                       → Supabase, temas, ações de lead
  types/                     → Tipos TypeScript (Development, Theme)

public/empreendimentos/[slug]/catalogo/   → Imagens do empreendimento
conteudo-marketing/[slug]/               → Conteúdo gerado pela IA
prompts/                                 → Prompts do sistema de geração
```

---

## Fluxo completo: do PDF à landing page

### Passo 1 — Extrair dados do catálogo com IA

Abra o arquivo [prompts/extracao-catalogo.md](prompts/extracao-catalogo.md) e envie-o junto com o PDF do empreendimento para o Claude ou ChatGPT.

A IA vai retornar:
- Um objeto TypeScript completo com todos os dados do empreendimento
- Paleta de cores em HEX
- Sugestões de fontes
- Copy para hero, badges e CTAs

### Passo 2 — Criar a pasta do empreendimento

```bash
# Estrutura a criar
src/data/developments/[slug]/
  index.ts        ← objeto TypeScript do empreendimento
  dados.json      ← versão JSON dos dados (usada pelo Marketing Studio)

public/empreendimentos/[slug]/catalogo/
  fachada-hero.webp
  lazer-piscina.webp
  planta-a.webp
  ...             ← imagens extraídas do PDF
```

Use `src/data/developments/brio778/` como referência de como estruturar o arquivo.

### Passo 3 — Registrar no índice

Abra [src/data/developments/index.ts](src/data/developments/index.ts) e importe o novo empreendimento:

```ts
import { novoEmpreendimento } from "./novo-empreendimento";

export const developments: Development[] = [
  brio778,
  essenciaCarlessi,
  novoEmpreendimento, // ← adicionar aqui
];
```

### Passo 4 — Preparar estrutura de marketing

```bash
npm run marketing [slug]
# Exemplo:
npm run marketing parko-rtrees
```

Este script lê o `dados.json` e cria a estrutura de pastas em `conteudo-marketing/[slug]/` com as imagens categorizadas por tipo (fachada, lazer, apartamento, plantas, localização, logo).

### Passo 5 — Acessar a landing page

```
http://localhost:3000/empreendimento/[slug]
```

---

## Marketing Studio

O Studio é a interface para gerar conteúdo de marketing com IA para cada empreendimento.

**Acesso:** `http://localhost:3000/studio`

O navegador vai pedir login. Use as credenciais configuradas em `ADMIN_USER` e `ADMIN_PASSWORD` no `.env`.

### Gerar roteiro de marketing

O roteiro inclui: posicionamento do empreendimento, Big Idea da campanha, scripts para corretores, roteiros de Reels, posts para feed, stories, mensagens de WhatsApp, análise estratégica, perfis de público e calendário editorial de 30 dias.

**Via interface:** Acesse `/studio/[slug]` e clique em **Gerar Roteiro**.

**Via API diretamente:**

```bash
curl -X POST http://localhost:3000/api/studio/gerar-roteiro/[slug] \
  -u "seu-usuario:sua-senha"
```

Resposta:
```json
{
  "roteiro": "# Nome do Empreendimento — Estratégia de Conteúdo\n..."
}
```

O roteiro também é salvo automaticamente em `conteudo-marketing/[slug]/marketing/roteiro.md`.

---

### Gerar imagens de posts

Gera posts de Instagram usando a API de edição de imagens da OpenAI (`gpt-image-2`). As fotos reais do empreendimento são enviadas para a API, que compõe o post com overlay, tipografia, badge de status e CTA.

**Via interface:** Acesse `/studio/[slug]` e clique em **Gerar Imagens**.

**Via API diretamente:**

```bash
curl -X POST http://localhost:3000/api/studio/gerar-imagem/[slug] \
  -u "seu-usuario:sua-senha"
```

Resposta:
```json
{
  "imagens": [
    {
      "label": "Post Feed",
      "format": "Instagram Feed 4:5",
      "b64": "iVBORw0KGgo..."
    }
  ]
}
```

Cada item em `imagens` contém a imagem em base64 (`b64`), pronta para exibir no browser ou salvar em disco:

```js
// Exemplo: salvar como arquivo
const buffer = Buffer.from(item.b64, "base64");
fs.writeFileSync("post-feed.png", buffer);
```

**Configuração dos posts gerados:**

Por padrão, apenas o Post Feed (4:5) está ativo. Para ativar Story (9:16) e Carrossel (1:1), edite [src/app/api/studio/gerar-imagem/[slug]/route.ts](src/app/api/studio/gerar-imagem/%5Bslug%5D/route.ts) e descomente os blocos correspondentes no array `posts`.

---

### Baixar pacote completo

Faz download de um arquivo `.zip` com o roteiro e todas as imagens geradas.

**Via interface:** Clique em **Baixar tudo** no Studio.

**Via API:**

```bash
curl -O -J http://localhost:3000/api/studio/download/[slug] \
  -u "seu-usuario:sua-senha"
# Salva como: [slug]-marketing.zip
```

O zip contém:
```
[slug]/
  roteiro.md
  posts-instagram/
    post-feed.png
    ...
  dados.json
```

---

## Prompts do sistema de IA

Os prompts ficam em [prompts/](prompts/) e são lidos diretamente pelas rotas da API em tempo de execução. Para ajustar o comportamento da geração de conteúdo, edite os arquivos — não é necessário reiniciar o servidor para mudanças nos prompts (só para mudanças no código TypeScript).

| Arquivo | Usado por | Finalidade |
|---------|-----------|------------|
| [prompts/extracao-catalogo.md](prompts/extracao-catalogo.md) | Uso manual (IA externa) | Extrai dados estruturados do PDF do empreendimento |
| [prompts/gerar-roteiro.md](prompts/gerar-roteiro.md) | `POST /api/studio/gerar-roteiro/[slug]` | Gera roteiro completo de marketing |
| [prompts/gerar-imagem.md](prompts/gerar-imagem.md) | `POST /api/studio/gerar-imagem/[slug]` | Define a direção criativa dos posts e a instrução para o `gpt-image-2` |

---

## Templates de landing disponíveis

| Template | Valor no dados.json | Ideal para |
|----------|-------------------|-----------|
| Launch Impact | `launch-impact` | Pré-lançamentos com hero impactante e palavra gigante |
| Luxury Residence | `luxury-residence` | Alto padrão, cores escuras, tipografia elegante |
| Beach Lifestyle | `beach-lifestyle` | Imóveis de praia, tons claros, sensação de leveza |
| Urban Modern | `urban-modern` | Empreendimentos urbanos, tons metálicos |
| Investment Value | `investment-value` | Foco em dados de valorização e rentabilidade |
| Catálogo | `catalogo` | Página informativa com todas as seções em scroll único |

---

## Variantes de Hero

| Variante | Valor | Descrição |
|----------|-------|-----------|
| Split Campaign | `split-campaign` | Texto à esquerda, imagem à direita |
| Editorial Luxury | `editorial-luxury` | Imagem full-screen com texto sobreposto elegante |
| Lifestyle | `lifestyle` | Foto de lifestyle com sensação de vida no local |
| Side Impact | `side-impact` | Prédio recortado sobreposto sobre palavra gigante no fundo |

---

## Scripts disponíveis

```bash
npm run dev        # Sobe servidor de desenvolvimento em http://localhost:3000
npm run build      # Gera build de produção
npm run start      # Sobe o servidor de produção (após build)
npm run lint       # Roda o ESLint
npm run marketing [slug]   # Prepara estrutura de marketing para o empreendimento
```

---

## Deploy na Vercel

1. Faça push do projeto para um repositório GitHub
2. Importe o projeto na [Vercel](https://vercel.com)
3. Em **Settings → Environment Variables**, adicione todas as variáveis do `.env`
4. Altere `NEXT_PUBLIC_SITE_URL` para o domínio de produção
5. Deploy automático a cada push na branch `main`

> As pastas `conteudo-marketing/` e `public/empreendimentos/` precisam estar commitadas no repositório para que os empreendimentos apareçam em produção. Imagens em base64 retornadas pela API não são salvas automaticamente em disco no ambiente Vercel (o sistema de arquivos é efêmero) — use o botão de download no Studio e salve localmente antes de commitar.

---

## Segurança

- As rotas `/admin`, `/studio` e `/api/studio/**` são protegidas por **HTTP Basic Auth** via middleware Next.js
- As credenciais são definidas em `ADMIN_USER` e `ADMIN_PASSWORD` no `.env` — nunca commite este arquivo
- O arquivo `.env.example` contém apenas os nomes das variáveis, sem valores reais
- A chave `SUPABASE_SERVICE_ROLE_KEY` tem privilégios administrativos no banco — use apenas no servidor, nunca exponha no client
