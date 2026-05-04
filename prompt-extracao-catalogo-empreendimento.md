# Prompt de Extração — Catálogo Imobiliário para Landing Page

Envie este prompt junto com o PDF, imagens ou folder do empreendimento.

---

## Seu papel

Você é especialista em design, marketing imobiliário, copywriting e estruturação de landing pages premium.

Sua tarefa é analisar o material enviado e extrair tudo que for necessário para criar uma landing page sofisticada de divulgação do empreendimento. Siga rigorosamente as instruções abaixo. Não invente informações que não estejam no material — marque como `não identificado` e sinalize para preenchimento manual.

---

## Contexto do projeto

O projeto é um motor de landing pages imobiliárias em Next.js com TypeScript. Cada empreendimento é registrado como um objeto TypeScript tipado. As cores são aplicadas via CSS variables — por isso é essencial nomear cada cor corretamente conforme o papel que ela exerce, não apenas pelo valor hex.

Os campos do tipo `status`, `template` e `hero.variant` aceitam **somente** os valores listados abaixo. Use exatamente esses valores, sem variações.

### Valores válidos para `status`
```ts
"pre-launch"   → pré-lançamento, em breve, cadastre-se
"launch"       → lançamento ativo, unidades disponíveis
"ready"        → pronto para morar
"last-units"   → últimas unidades
"investment"   → foco em rentabilidade e retorno
```

### Valores válidos para `template`
```ts
"launch-impact"    → pré-lançamentos com hero impactante e palavra gigante
"luxury-residence" → alto padrão, cores escuras, tipografia elegante
"beach-lifestyle"  → praia, tons claros, sensação de leveza
"urban-modern"     → urbano, moderno, tons metálicos
"investment-value" → foco em dados de valorização e retorno
"catalogo"         → página de catálogo detalhado, mais informativa
```

### Valores válidos para `hero.variant`
```ts
"side-impact"       → prédio recortado sobreposto à palavra gigante (mais impactante)
"split-campaign"    → texto à esquerda, imagem à direita, layout de campanha
"editorial-luxury"  → imagem full-screen com texto sobreposto elegante
"lifestyle"         → foto de lifestyle com sensação de vida no local
```

---

## Regras de formatação obrigatórias

Siga estas regras em todos os campos do objeto TypeScript gerado:

- **`slug`**: apenas letras minúsculas, números e hífens. Sem acentos, espaços ou caracteres especiais. Exemplos: `brio778`, `reserva-das-flores`, `vista-mar-residence`.
- **`whatsapp`**: apenas números, formato `55` + DDD + número. Exemplo: `5548999999999`.
- **`cta.message`**: texto da mensagem pré-preenchida no WhatsApp. Deve citar o nome do empreendimento.
- **Nomes de arquivo de imagem**: apenas letras minúsculas, hífens e extensão `.webp`. Sem acentos, espaços ou caracteres especiais. Exemplos: `fachada-hero.webp`, `localizacao-aerea.webp`.
- **Todos os caminhos de imagem**: começam com `/empreendimentos/[slug]/catalogo/`.

---

## Fase 1 — Análise visual

### 1.1 Estilo visual geral

Classifique o estilo predominante do material:

```
Luxo clássico / Luxo moderno / Urbano sofisticado / Minimalista /
Praiano / Familiar / Investimento / Natureza/bem-estar /
Compacto moderno / Alto padrão / Popular/moderno
```

Justifique em 2 frases por que escolheu esse estilo.

---

### 1.2 Paleta de cores

Extraia as cores do material (logo, fundos, botões, destaques, textos) e atribua cada uma ao papel correto no projeto. Cada cor tem uma função específica nas CSS variables.

Responda exatamente neste formato:

```
primary    → #000000  | cor principal de botões, CTAs, destaques e elementos de marca
secondary  → #000000  | cor de fundo escuro, contraste e headers
background → #000000  | cor de fundo geral das seções
surface    → #000000  | cor de cards, formulários e áreas internas
text       → #000000  | cor do texto principal (deve ter contraste sobre surface)
muted      → #000000  | cor de textos de apoio, labels e legendas (versão esmaecida do text)
accent     → #000000  | cor de realce, animações e elementos decorativos
```

Indique o tom geral da landing:
```
Clara / Escura / Mista / Fundo premium/dourado / Fundo praiano / Fundo urbano
```

---

### 1.3 Tipografia

Analise o estilo do material e sugira fontes disponíveis no Google Fonts que mais se aproximam.

```
Fonte para títulos (fontTitle): [nome exato do Google Fonts]
Fonte para textos (fontBody):   [nome exato do Google Fonts]
```

Classifique o estilo tipográfico:
```
Elegante / Geométrica / Clássica / Minimalista / Condensada / Editorial / Institucional
```

---

### 1.4 Imagens para extrair

Liste todas as imagens relevantes do material. Para cada uma, informe:

```
Imagem: [descrição]
Caminho: /empreendimentos/[slug]/catalogo/[nome-sem-acento].webp
Uso no projeto: [qual campo recebe essa imagem]
Prioridade: Obrigatória / Recomendada / Opcional
```

Campos que recebem imagem:
- `hero.buildingImage` → fachada principal do prédio (obrigatória)
- `hero.backgroundImage` → imagem aérea ou de localização usada no fundo do hero
- `hero.transitionImages[]` → sequência de 2 a 3 imagens para transição animada
- `location.image` → imagem da localização ou vista do bairro
- `spotlight.image` → imagem do diferencial em destaque
- `brand.logo` → logotipo do empreendimento (obrigatória)
- `gallery[]` → imagens de lazer, apartamentos e diferenciais (mínimo 4)
- `floorPlans[].image` → imagens das plantas baixas

Nomeie os arquivos sem acentos e sem espaços.

---

### 1.5 Contraste da logo (`logoContrast`)

Analise o logotipo identificado no material e determine se ele é escuro ou claro:

```
Cor predominante da logo: [descreva]
logoContrast: "dark"   → logo preta, escura ou com elementos escuros predominantes
logoContrast: "light"  → logo branca, clara ou com elementos claros predominantes
```

> O header da landing page é transparente ao abrir a página (fundo escuro do hero atrás). Se a logo for escura (`"dark"`), o sistema inverte automaticamente para branco. Ao rolar, a logo volta às cores originais sobre o fundo claro.

---

### 1.7 Recorte da imagem principal

Avalie se existe uma imagem da fachada adequada para ser recortada e sobreposta ao hero:

```
Imagem indicada para recorte: [descrição ou nome]
Qualidade para recorte: alto / médio / baixo
Fundo da imagem prejudica o recorte? sim / não
Recomendação de uso:
```

---

### 1.8 Variante de hero recomendada

Com base no estilo visual e nas imagens disponíveis, escolha a variante:

```
"side-impact" / "split-campaign" / "editorial-luxury" / "lifestyle"
```

Justifique a escolha.

---

## Fase 2 — Extração comercial

### 2.1 Dados do empreendimento

```
Nome do empreendimento:
Slug sugerido:              [apenas letras minúsculas, números e hífens]
Construtora/incorporadora:
Bairro:
Cidade:
Estado (sigla):
Endereço completo:
Status comercial:           [use apenas: pre-launch / launch / ready / last-units / investment]
Tipo de imóvel:
Dormitórios disponíveis:
Suítes disponíveis:
Vagas de garagem:
Metragens (menor a maior):
Previsão de entrega:
Registro/incorporação:
```

---

### 2.2 Highlights do empreendimento

São os grandes diferenciais do projeto como um todo — o que o torna especial frente à concorrência. Máximo 6 itens, frases curtas e objetivas.

Vai para o campo `highlights[]`.

Exemplos do que pertence aqui:
- "570 m² de lazer e bem-estar"
- "Áreas comuns entregues mobiliadas e climatizadas"
- "Localização estratégica no Estreito"

---

### 2.3 Diferenciais internos do apartamento

São as características físicas e de acabamento das unidades. Máximo 8 itens.

Vai para o campo `apartmentFeatures[]`.

Exemplos do que pertence aqui:
- "Porcelanato 90×90 cm nas áreas sociais"
- "Persianas motorizadas nos quartos"
- "Fechadura digital"
- "Sacada com churrasqueira a carvão"

---

### 2.4 Áreas de lazer e infraestrutura

Liste todas as áreas comuns e comodidades identificadas no material.

Vai para o campo `amenities[]`.

Exemplos: Piscina adulto, Piscina infantil, Academia, Salão de festas, Coworking, Pet place, Sauna, Bicicletário, Market.

---

### 2.5 Localização

```
Bairro:
Cidade:
Estado:
Endereço:
URL do Google Maps: [se identificável, formato: https://maps.google.com/?q=...]
Destaques de localização: [3 a 5 frases curtas sobre pontos próximos e vantagens]
```

---

### 2.6 Tecnologia e sustentabilidade

Apenas se o material apresentar diferenciais de tecnologia, segurança ou sustentabilidade:

```
Título da seção: [ex: Segurança, tecnologia e sustentabilidade]
Subtítulo: [frase curta sobre o conceito]
Itens: [lista completa identificada no material]
```

Se não houver conteúdo suficiente, omita o campo `technology` do objeto final.

---

### 2.7 Spotlight — destaque especial

Identifique o diferencial mais visual e único do empreendimento para uma seção de destaque com imagem grande:

```
Imagem: [qual imagem usar — deve ser visualmente impactante]
Título: [frase curta e impactante — máximo 8 palavras]
Descrição: [1 a 2 frases explicando o diferencial]
Itens complementares: [3 a 5 itens relacionados]
```

Se não houver diferencial suficientemente único, omita o campo `spotlight`.

---

### 2.8 Público-alvo

Identifique os perfis mais prováveis com base no material:

```
Perfis: [ex: Famílias, Investidores, Casais jovens]
Motivo:
```

---

### 2.9 Tom de comunicação

Defina o tom ideal:

```
Tom: [ex: Sofisticado, Inspiracional, Direto, Familiar, Urbano, Praiano, Investidor]
Palavras-chave do universo do empreendimento: [6 a 10 palavras]
```

---

## Fase 3 — Copywriting

### 3.1 Palavra de impacto (backgroundWord)

Palavra ou frase curta usada em tamanho gigante no fundo do hero.

Dê 3 opções e indique a melhor:

```
Opção 1: [palavra ou frase]
Opção 2: [palavra ou frase]
Opção 3: [palavra ou frase]
Melhor opção: [qual e por quê]
```

---

### 3.2 Headline (title)

5 opções de título curto para o hero. Critérios: impactante, comercial, máximo 4 palavras, bom para mobile.

---

### 3.3 Subtítulo (subtitle)

5 opções de subtítulo para o hero. Critérios: citar localização ou proposta de valor, máximo 2 frases, direto.

---

### 3.4 Frase de impacto (impactPhrase)

3 opções de frase memorável para aparecer logo abaixo do título. Máximo 10 palavras, tom emocional.

---

### 3.5 Selo circular (badgeText)

5 opções de texto para o selo circular no hero. Deve ser curto, em maiúsculas, mencionar o status e a localização.

Exemplos: `PRÉ-LANÇAMENTO NO ESTREITO`, `LANÇAMENTO EXCLUSIVO`, `ÚLTIMAS UNIDADES`.

---

### 3.6 Essência

Crie o conteúdo para a seção de Essência — apresentação conceitual do empreendimento com 4 cards de diferenciais.

**Título da seção** (`essencia.title`):
- Frase que resume a proposta de valor do empreendimento.
- Tom inspiracional, entre 10 e 16 palavras.
- Exemplo: "Um refúgio urbano pensado para transformar rotina em experiência."

**Texto de apoio** (`essencia.text`):
- 1 a 2 frases complementando o título com os pilares do projeto.
- Citar localização, arquitetura ou conceito de vida.
- Exemplo: "Natureza, saúde e bem-estar se unem em um projeto criado para quem quer viver melhor."

**4 Cards de diferenciais** (`essencia.cards[]`):
- Exatamente 4 itens curtos, cada um com 2 a 5 palavras.
- Representam os 4 maiores atributos do empreendimento.
- Exemplos: "Localização privilegiada", "Projeto contemporâneo", "Conforto e praticidade", "Potencial de valorização".

```
sectionLabel:  Essência
title:         [frase inspiracional — proposta de valor]
text:          [1 a 2 frases de apoio]
cards:
  - [diferencial 1 — 2 a 5 palavras]
  - [diferencial 2 — 2 a 5 palavras]
  - [diferencial 3 — 2 a 5 palavras]
  - [diferencial 4 — 2 a 5 palavras]
ctaLabel:      Quero receber detalhes
```

---

### 3.7 CTAs

```
CTA principal (primaryLabel):    [ex: Receber catálogo]
CTA secundário (secondaryLabel): [ex: Falar com consultor]
Mensagem WhatsApp (message):     [texto pré-preenchido citando o nome do empreendimento]
```

---

### 3.8 SEO

```
Título SEO (max 60 caracteres):       [Nome | Status no Bairro]
Descrição SEO (max 155 caracteres):   [Apresentação do empreendimento com palavras-chave]
```

---

### 3.9 Template recomendado

```
Template: [valor exato: launch-impact / luxury-residence / beach-lifestyle / urban-modern / investment-value]
Motivo:
```

---

## Fase 4 — Objeto TypeScript final

Gere o objeto completo preenchido com todos os dados extraídos. Substitua `[slug]` pelo slug real em todos os caminhos de imagem. Omita campos opcionais que não tiverem conteúdo.

Salvar em: `src/data/developments/[slug]/index.ts`

```ts
import type { Development } from "@/types/development";

export const nomeDoEmpreendimento: Development = {
  slug: "",
  template: "launch-impact",
  name: "",
  status: "pre-launch",

  brand: {
    name: "",
    logo: "/empreendimentos/[slug]/catalogo/logo.webp",
    logoContrast: "dark", // "dark" se a logo for preta/escura; "light" se for clara/branca
  },

  hero: {
    variant: "side-impact",
    backgroundWord: "",
    title: "",
    subtitle: "",
    impactPhrase: "",
    badgeText: "",
    buildingImage: "/empreendimentos/[slug]/catalogo/fachada-hero.webp",
    backgroundImage: "/empreendimentos/[slug]/catalogo/localizacao-aerea.webp",
    transitionImages: [
      "/empreendimentos/[slug]/catalogo/transicao1.webp",
      "/empreendimentos/[slug]/catalogo/transicao2.webp",
      "/empreendimentos/[slug]/catalogo/transicao3.webp",
    ],
  },

  theme: {
    primary: "",
    secondary: "",
    background: "",
    surface: "",
    text: "",
    muted: "",
    accent: "",
    fontTitle: "",
    fontBody: "",
  },

  essencia: {
    sectionLabel: "Essência",
    title: "",
    text: "",
    cards: [
      "",
      "",
      "",
      "",
    ],
    ctaLabel: "Quero receber detalhes",
  },

  location: {
    neighborhood: "",
    city: "",
    state: "",
    address: "",
    mapUrl: "",
    highlights: [],
    image: "/empreendimentos/[slug]/catalogo/localizacao.webp",
  },

  highlights: [],

  spotlight: {
    image: "/empreendimentos/[slug]/catalogo/spotlight.webp",
    title: "",
    description: "",
    items: [],
  },

  technology: {
    title: "",
    subtitle: "",
    items: [],
  },

  apartmentFeatures: [],
  amenities: [],

  gallery: [
    {
      src: "/empreendimentos/[slug]/catalogo/imagem-1.webp",
      alt: "",
      category: "",
      recommendedUse: "",
    },
  ],

  floorPlans: [
    {
      name: "",
      area: "",
      bedrooms: "",
      suites: "",
      parking: "",
      image: "/empreendimentos/[slug]/catalogo/planta-a.webp",
    },
  ],

  cta: {
    primaryLabel: "",
    secondaryLabel: "",
    whatsapp: "5548",
    message: "",
  },

  seo: {
    title: "",
    description: "",
    image: "/empreendimentos/[slug]/catalogo/fachada-hero.webp",
  },
};
```

Após gerar o objeto, informe como registrar em `src/data/developments/index.ts`:

```ts
import { nomeDoEmpreendimento } from "./nome-do-empreendimento/index";

export const developments: Development[] = [brio778, nomeDoEmpreendimento];
```

---

## Fase 5 — Checklist de entrega

Confirme cada item antes de finalizar:

```
[ ] Estilo visual identificado e justificado
[ ] Paleta completa com 7 cores e seus papéis
[ ] Fontes do Google Fonts sugeridas
[ ] Lista de imagens com caminhos e usos
[ ] Avaliação de recorte da fachada
[ ] Variante de hero escolhida e justificada
[ ] Dados comerciais completos
[ ] highlights[] preenchido (diferenciais do empreendimento)
[ ] apartmentFeatures[] preenchido (características das unidades)
[ ] amenities[] preenchido (áreas de lazer)
[ ] Localização com highlights
[ ] technology preenchido ou omitido intencionalmente
[ ] spotlight preenchido ou omitido intencionalmente
[ ] Público-alvo identificado
[ ] Tom de comunicação definido
[ ] backgroundWord com 3 opções
[ ] 5 headlines criadas
[ ] 5 subtítulos criados
[ ] 3 frases de impacto criadas
[ ] 5 opções de selo circular
[ ] Essência preenchida (title, text e 4 cards)
[ ] CTAs definidos
[ ] SEO title e description dentro do limite de caracteres
[ ] Template recomendado
[ ] Objeto TypeScript completo e sem campos em branco desnecessários
[ ] Instrução de registro em index.ts incluída
```

---

## Campos opcionais — quando omitir

Omita estes campos do objeto final se não houver conteúdo real para preenchê-los:

```
hero.transitionImages      → omitir se não há imagens de transição disponíveis
essencia                   → omitir se não houver conteúdo conceitual suficiente
spotlight                  → omitir se não há diferencial visual único
technology                 → omitir se não há itens de tecnologia/sustentabilidade
location.mapUrl            → omitir se não for possível identificar o endereço exato
location.image             → omitir se não houver imagem de localização adequada
floorPlans[].image         → omitir se não houver imagem da planta disponível
brand.logoContrast         → omitir se a logo já for clara/branca (visível sobre fundo escuro)
```
