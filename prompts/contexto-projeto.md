agora p# Contexto do Projeto — Motor de Landing Pages Imobiliárias Premium

## Objetivo do projeto

Criar um sistema reutilizável para gerar landing pages sofisticadas de empreendimentos imobiliários, com foco em campanhas de divulgação, pré-lançamentos, lançamentos e captação de leads.

A ideia principal é ter uma arquitetura fixa, mas flexível, onde cada empreendimento possa ter sua própria identidade visual: cores, imagens, textos, chamadas, estilo de animação, galeria, selo promocional e CTA.

O projeto deve permitir criar páginas no estilo de campanha premium, com visual impactante, animações, hero em tela cheia, imagem do prédio destacada, texto grande no fundo, selo de pré-lançamento, formulário de interesse e botão de WhatsApp.

---

## Tecnologia recomendada

A stack recomendada é:

```txt
Next.js
TypeScript
Tailwind CSS
shadcn/ui
Framer Motion
GSAP
Lenis Scroll
Supabase
Vercel
```

### Next.js

Usar Next.js como framework principal porque ele oferece:

- Ótimo desempenho para landing pages.
- Rotas dinâmicas, como `/e/brio778` ou `/empreendimentos/brio778`.
- SEO forte.
- Otimização de imagens com `next/image`.
- Deploy simples na Vercel.
- Possibilidade futura de painel administrativo.

### TypeScript

Usar TypeScript para tipar os dados dos empreendimentos, temas, seções e componentes. Isso evita bagunça quando o projeto crescer.

### Tailwind CSS

Usar Tailwind CSS para construir o visual com rapidez e criar temas dinâmicos por empreendimento usando CSS variables.

Exemplo:

```css
:root {
  --color-primary: #c89b5a;
  --color-secondary: #050505;
  --color-background: #d9b36e;
  --color-surface: #f4e7d1;
  --color-text: #111111;
  --color-accent: #e6c27a;
}
```

Nos componentes:

```tsx
<section className="bg-[var(--color-background)] text-[var(--color-text)]">
  <button className="bg-[var(--color-primary)] text-white">
    Receber catálogo
  </button>
</section>
```

### shadcn/ui

Usar shadcn/ui para componentes base, como:

- Button
- Dialog
- Card
- Input
- Form
- Sheet/Menu lateral
- Accordion
- Tabs

A vantagem é que os componentes ficam dentro do projeto e podem ser customizados livremente.

### Framer Motion

Usar Framer Motion para animações de interface:

- Entrada de textos.
- Aparição de imagens.
- Cards animados.
- Botões com movimento.
- Transições suaves entre seções.

### GSAP

Usar GSAP para animações mais sofisticadas:

- Texto gigante se movimentando no scroll.
- Parallax.
- Selo girando.
- Animações por scroll com ScrollTrigger.
- Entrada cinematográfica do prédio.

### Lenis Scroll

Usar Lenis para scroll suave e sensação premium.

### Supabase

Usar Supabase para:

- Salvar leads.
- Guardar empreendimentos.
- Guardar configurações de tema.
- Guardar URLs de imagens.
- Futuramente criar painel admin.

### Vercel

Usar Vercel para deploy do projeto, preview rápido e domínio personalizado.

---

## Conceito do produto

O produto é um motor de landing pages imobiliárias. Ele não deve ser apenas um site com páginas estáticas, mas uma estrutura capaz de gerar várias campanhas a partir de dados.

Cada empreendimento deve ter:

- Slug da página.
- Nome do empreendimento.
- Construtora/incorporadora.
- Logo.
- Imagem principal do prédio.
- Imagens de galeria.
- Status comercial.
- Palavra de impacto.
- Selo promocional.
- Cores principais.
- Tipografia sugerida.
- Diferenciais.
- Localização.
- Plantas/unidades.
- CTA.
- WhatsApp.
- Formulário de lead.

---

## Fluxo de criação com IA no VS Code

Além dos empreendimentos já cadastrados manualmente em `src/data/developments`, o projeto suporta um fluxo de criação assistida por IA feito diretamente no VS Code.

O objetivo desse fluxo é permitir que a IA analise um PDF de catálogo/folder, imagens, briefing, extração textual ou dados comerciais e gere um **draft estruturado de landing page**, sem criar código React novo.

Essa análise não deve acontecer por uma API do Studio. A IA deve trabalhar no VS Code com acesso ao repositório, aos arquivos do PDF/imagens e aos prompts. Isso facilita a leitura visual, a seleção de imagens, a nomeação de arquivos e reduz custo/fragilidade.

### Arquitetura do fluxo

```txt
PDF/folder/briefing do empreendimento
  ↓
IA no VS Code usando prompts/criar-landing.md
  ↓
IA extrai dados, seleciona imagens e gera JSON com strategy + development
  ↓
IA cria src/data/developments/[slug]/dados.json com dados reutilizáveis
  ↓
IA executa npm run marketing [slug] para montar conteudo-marketing/[slug]/dados, imagens e marketing
  ↓
Validador confere campos obrigatórios, slug, CTA, cores e seções
  ↓
Draft salvo em conteudo-marketing/[slug]/landing/draft.json
  ↓
Preview em /studio/preview/[slug]
  ↓
Revisão humana antes da publicação definitiva
  ↓
API /api/studio/publicar-landing/[slug]
  ↓
Landing publicada em /empreendimento/[slug]
```

### Regra central

A IA deve começar tentando resolver a landing com o motor existente. Ela deve trabalhar com:

- Dados estruturados compatíveis com `Development`.
- Dados reutilizáveis em `src/data/developments/[slug]/dados.json`.
- Estrutura de marketing em `conteudo-marketing/[slug]/dados/`, `conteudo-marketing/[slug]/imagens/` e `conteudo-marketing/[slug]/marketing/`.
- Templates existentes.
- Variantes de hero existentes.
- Seções existentes no registry dinâmico.
- Seções customizadas em área controlada, quando houver justificativa comercial forte.
- Copywriting comercial e estratégia de composição.

### Arquivos principais

```txt
prompts/criar-landing.md
src/types/development.ts
src/types/development-draft.ts
src/lib/landing-draft-validator.ts
src/lib/landing-drafts.ts
src/app/api/studio/publicar-landing/[slug]/route.ts
src/app/studio/preview/[slug]/page.tsx
src/components/landing/templates/DynamicSectionsTemplate.tsx
src/components/landing/generated/registry.tsx
```

### Seções dinâmicas disponíveis

O campo opcional `sections` no objeto `Development` permite que a IA escolha a ordem da landing.

Valores permitidos:

```txt
hero
essencia
building
location
spotlight
technology
amenities
gallery
floorPlans
leadForm
footer
```

Também é possível usar seções customizadas no formato:

```txt
custom:nome-da-secao
```

Para funcionar, a seção precisa estar registrada em:

```txt
src/components/landing/generated/registry.tsx
```

Exemplo:

```tsx
import { InvestmentReturnSection } from "./parko-rtrees/InvestmentReturnSection";

export const generatedSectionRegistry = {
  "investment-return": InvestmentReturnSection,
};
```

No draft:

```json
["hero", "essencia", "location", "custom:investment-return", "leadForm", "footer"]
```

Exemplo para campanha de lançamento:

```json
["hero", "essencia", "building", "location", "spotlight", "technology", "leadForm", "footer"]
```

Exemplo para página mais completa:

```json
["hero", "essencia", "building", "location", "amenities", "gallery", "floorPlans", "technology", "leadForm", "footer"]
```

Se `sections` não existir, o sistema continua usando o template tradicional definido em `template`, mantendo compatibilidade com landings já existentes.

### Criação de novas seções pela IA

A IA pode criar novo código em casos específicos, mas sempre dentro da pasta controlada:

```txt
src/components/landing/generated/[slug]/
```

Use esse recurso quando uma landing precisar de uma abordagem comercial melhor do que as seções padrão, por exemplo:

- seção de retorno para investidores;
- comparação de unidades/tipologias;
- seção de prioridade de lançamento;
- narrativa de localização com dados de proximidade;
- assinatura arquitetônica;
- wellness, praia, família ou alto padrão.

Regras:

- O componente deve receber `{ development }`.
- Deve usar o tipo `Development`.
- Deve usar Tailwind e CSS variables do tema.
- Não deve alterar o motor central.
- Não deve instalar dependências.
- Deve ser registrado no `generatedSectionRegistry`.
- O draft deve usar `custom:nome-da-chave`.
- `npm run build` precisa passar antes de publicar.

### Validação obrigatória

Todo draft criado por IA precisa seguir o formato validável do sistema.

O validador deve conferir:

- `slug` em letras minúsculas, números e hífens.
- `status`, `template`, `hero.variant` e `sections` dentro dos valores permitidos.
- `cta.whatsapp` usando o número da San Remo: `5548988506977`.
- Cores do tema em formato hexadecimal.
- Campos obrigatórios de marca, hero, localização, CTA e SEO.
- Quantidade mínima recomendada de imagens, highlights e diferenciais.

### Como criar o draft no VS Code

1. Extraia do PDF as imagens úteis para a landing e salve as imagens finais em:

```txt
public/empreendimentos/[slug]/catalogo/
```

As imagens devem incluir, quando existirem no PDF:

- logo;
- fachada principal;
- imagem aérea/localização;
- lazer;
- interiores;
- plantas;
- diferenciais visuais usados em seções padrão ou customizadas.

Use nomes sem acentos e sem espaços, preferencialmente `.webp`.

2. Use `prompts/criar-landing.md` como instrução base para a IA.

3. Peça para a IA gerar o arquivo:

```txt
conteudo-marketing/[slug]/landing/draft.json
```

4. Abra o preview:

```txt
/studio/preview/[slug]
```

Também é possível abrir o admin e clicar no card do draft:

```txt
/admin
```

O admin lista:

- Landings cadastradas no projeto.
- Drafts gerados pela IA para revisão.
- Landings JSON já publicadas.

5. Se aprovado, publique pelo botão do preview. Depois de publicada, a landing passa a aparecer no admin como `Publicada por IA` e abre direto em `/empreendimento/[slug]`.

### Publicação

O preview em `/studio/preview/[slug]` é uma etapa de revisão. Quando aprovado, o botão de publicação chama:

```txt
POST /api/studio/publicar-landing/[slug]
```

Esse endpoint copia o draft validado para:

```txt
conteudo-marketing/[slug]/landing/published.json
```

A rota pública `/empreendimento/[slug]` primeiro procura empreendimentos cadastrados em `src/data/developments`. Se não encontrar, procura uma landing publicada em JSON.

Em uma evolução futura, esse mesmo conceito pode migrar para Supabase, substituindo os arquivos JSON por registros em banco.

---

## Estilo visual desejado

O estilo principal deve seguir a ideia de campanha premium imobiliária:

- Mobile first.
- Hero em tela cheia.
- Texto enorme no fundo, como `VEM AÍ`, `LANÇAMENTO`, `EXCLUSIVO`, `BREVE`.
- Imagem do prédio recortada em destaque.
- Selo circular promocional.
- Cores sofisticadas.
- Fundo com camadas.
- Base escura ou contrastante.
- Tipografia forte.
- Pouco texto na primeira dobra.
- Animações suaves e elegantes.
- Visual de campanha publicitária, não de site imobiliário comum.

---

## Templates disponíveis

```txt
1. LaunchImpactTemplate   → "launch-impact"
2. LuxuryResidenceTemplate → "luxury-residence"
3. BeachLifestyleTemplate  → "beach-lifestyle"
4. UrbanModernTemplate     → "urban-modern"
5. InvestmentValueTemplate → "investment-value"
6. CatalogoTemplate        → "catalogo"
```

### 1. LaunchImpactTemplate

Template para pré-lançamentos e lançamentos.

Características:

- Hero impactante.
- Palavra gigante no fundo.
- Prédio recortado.
- Selo circular.
- CTA de cadastro.
- Visual de campanha.

Uso ideal:

```txt
Vem aí
Pré-lançamento
Breve lançamento
Novo empreendimento
Cadastre-se para receber novidades
```

### 2. LuxuryResidenceTemplate

Template para imóveis de alto padrão.

Características:

- Cores escuras.
- Dourado, champagne, bege ou tons sofisticados.
- Fotos grandes.
- Tipografia elegante.
- Destaque para exclusividade.

### 3. BeachLifestyleTemplate

Template para imóveis próximos à praia.

Características:

- Visual claro.
- Tons areia, azul, branco, verde água.
- Fotos de lifestyle.
- Sensação de leveza, férias e bem-estar.

### 4. UrbanModernTemplate

Template para empreendimentos urbanos.

Características:

- Grafite, branco, preto, tons metálicos.
- Layout moderno.
- Destaque para localização, praticidade e mobilidade.

### 5. InvestmentValueTemplate

Template para campanhas com foco em investimento.

Características:

- Dados de valorização.
- Localização estratégica.
- Rentabilidade.
- Segurança.
- CTA mais direto.

### 6. CatalogoTemplate

Template de catálogo detalhado do empreendimento.

Características:

- Visual clean e informativo.
- Todas as seções em um único scroll.
- Stats strip com metragens, dormitórios e vagas.
- Galeria masonry.
- Plantas com ficha técnica.
- Botão de voltar para a landing principal.
- Ideal para ser linkado a partir do CTA "Ver catálogo completo".

---

## Variantes de Hero

Cada empreendimento pode escolher a variante de hero mais adequada ao seu estilo:

```txt
"split-campaign"    → Hero dividido: texto à esquerda, imagem à direita. Layout de campanha.
"editorial-luxury"  → Hero editorial com imagem full-screen e texto sobreposto elegante.
"lifestyle"         → Hero com foto de lifestyle e sensação de vida no local.
"side-impact"       → Hero com prédio recortado sobreposto sobre palavra gigante no fundo.
```

---

## Estrutura de pastas

```txt
src/
  app/
    empreendimento/
      [slug]/
        page.tsx                        ← rota dinâmica da landing
    admin/
      page.tsx                          ← painel futuro

  components/
    landing/
      templates/
        LaunchImpactTemplate.tsx
        LuxuryResidenceTemplate.tsx
        BeachLifestyleTemplate.tsx
        UrbanModernTemplate.tsx
        InvestmentValueTemplate.tsx
        CatalogoTemplate.tsx
        index.tsx                       ← LandingTemplateRenderer

      sections/
        heroes/
          HeroRenderer.tsx              ← escolhe a variante pelo campo hero.variant
          HeroSideImpact.tsx
          HeroEditorialLuxury.tsx
          HeroLifestyle.tsx
        HeroLaunch.tsx
        BuildingRevealSection.tsx
        ManifestoSection.tsx
        SpotlightSection.tsx
        DifferentialsSection.tsx
        TechnologySection.tsx
        AmenitiesSection.tsx
        GallerySection.tsx
        LocationSection.tsx
        FloorPlansSection.tsx
        LeadFormSection.tsx
        FinalCtaSection.tsx
        VideoSection.tsx
        FloatingWhatsApp.tsx
        BuilderSignature.tsx
        Footer.tsx

      ui/
        AnimatedBackgroundWord.tsx
        AnimatedTitle.tsx
        GalleryModal.tsx
        ImageReveal.tsx
        Reveal.tsx
        ScrollIndicator.tsx
        SectionLabel.tsx
        SmoothScroll.tsx
        StickyHeader.tsx
        FloatingWhatsApp.tsx

  data/
    developments/
      index.ts                          ← registro de todos os empreendimentos
      brio778/
        index.ts                        ← dados do empreendimento
        extracao.md                     ← resultado da extração do PDF
      example/
        index.ts                        ← template de referência com todos os campos
      [novo-empreendimento]/
        index.ts                        ← criar uma pasta por empreendimento
        extracao.md

  lib/
    supabase.ts
    themes.ts
    lead-actions.ts
    utils.ts

  types/
    development.ts
    theme.ts

public/
  empreendimentos/
    [slug]/
      catalogo/                         ← imagens extraídas do PDF
        fachada-hero.webp
        localizacao-aerea.webp
        salao-festas.webp
        piscina.webp
        fitness.webp
        espaco-gourmet.webp
        planta-a.webp
        ...
```

---

## Fluxo de trabalho — criar um novo empreendimento a partir do PDF

```txt
1. Enviar o PDF para a IA junto com o prompt-extracao-catalogo-empreendimento.md

2. A IA retorna:
   - Paleta de cores em HEX
   - Fontes sugeridas
   - Copy para hero, selos e CTAs
   - Objeto TypeScript completo do empreendimento

3. Criar a pasta do empreendimento:
   src/data/developments/[slug]/

4. Criar o arquivo de dados:
   src/data/developments/[slug]/index.ts
   (usar src/data/developments/example/index.ts como base)

5. Salvar o resultado da extração:
   src/data/developments/[slug]/extracao.md

6. Registrar o empreendimento no índice:
   src/data/developments/index.ts
   → Importar e adicionar ao array developments[]

7. Salvar as imagens extraídas do PDF:
   public/empreendimentos/[slug]/catalogo/

7. Acessar em: /empreendimento/[slug]
```

---

## Modelo de dados do empreendimento

Tipo TypeScript completo e atualizado:

```ts
export type DevelopmentStatus =
  | "pre-launch"
  | "launch"
  | "ready"
  | "last-units"
  | "investment";

export type LandingTemplate =
  | "launch-impact"
  | "luxury-residence"
  | "beach-lifestyle"
  | "urban-modern"
  | "investment-value"
  | "catalogo";

export type HeroVariant =
  | "split-campaign"
  | "editorial-luxury"
  | "lifestyle"
  | "side-impact";

export type DevelopmentTheme = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
  fontTitle?: string;
  fontBody?: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  category?: string;
  recommendedUse?: string;
};

export type FloorPlan = {
  name: string;
  area?: string;
  bedrooms?: string;
  suites?: string;
  parking?: string;
  image?: string;
};

export type Development = {
  slug: string;
  template: LandingTemplate;
  name: string;
  status: DevelopmentStatus;

  brand: {
    name: string;
    logo: string;
  };

  hero: {
    variant?: HeroVariant;
    backgroundWord: string;
    title: string;
    subtitle: string;
    impactPhrase?: string;
    badgeText: string;
    buildingImage: string;
    backgroundImage?: string;
    transitionImages?: string[];
  };

  theme: DevelopmentTheme;

  manifesto?: string;

  location: {
    neighborhood: string;
    city: string;
    state: string;
    address?: string;
    mapUrl?: string;
    highlights: string[];
    image?: string;
  };

  highlights: string[];

  spotlight?: {
    image: string;
    title: string;
    description: string;
    items?: string[];
  };

  technology?: {
    title: string;
    subtitle: string;
    items: string[];
  };

  apartmentFeatures: string[];
  amenities: string[];
  gallery: GalleryImage[];
  floorPlans?: FloorPlan[];

  cta: {
    primaryLabel: string;
    secondaryLabel?: string;
    whatsapp: string;
    message: string;
  };

  seo: {
    title: string;
    description: string;
    image?: string;
  };
};
```

---

## Exemplo de cadastro do empreendimento

```ts
export const brio778: Development = {
  slug: "brio778",
  template: "launch-impact",
  name: "Brio 778",
  status: "pre-launch",

  brand: {
    name: "D.Lohn com Grupo Imperatriz",
    logo: "/empreendimentos/brio778/catalogo/logo-brio.webp",
  },

  hero: {
    variant: "side-impact",
    backgroundWord: "Brio 778",
    title: "Brio 778",
    subtitle: "Aqui, viver bem é o padrão. Pré-lançamento no Estreito, ao lado da Beira-Mar Continental.",
    impactPhrase: "Um novo endereço para viver o Estreito com Brio.",
    badgeText: "PRÉ-LANÇAMENTO NO ESTREITO",
    buildingImage: "/empreendimentos/brio778/catalogo/fachada-hero.webp",
    backgroundImage: "/empreendimentos/brio778/catalogo/localizacao-aerea.webp",
    transitionImages: [
      "/empreendimentos/brio778/catalogo/transicao1.webp",
      "/empreendimentos/brio778/catalogo/transicao2.webp",
      "/empreendimentos/brio778/catalogo/transicao3.webp",
    ],
  },

  theme: {
    primary: "#C89B5A",
    secondary: "#050505",
    background: "#D9B36E",
    surface: "#F4E7D1",
    text: "#111111",
    muted: "#76695E",
    accent: "#C89B5A",
    fontTitle: "Inter",
    fontBody: "Inter",
  },

  manifesto: `É hora de decidir que a vida merece você por inteiro.
É hora de viver com Brio...`,

  location: {
    neighborhood: "Estreito",
    city: "Florianópolis",
    state: "SC",
    address: "Rua General Eurico Gaspar Dutra, 778",
    highlights: [
      "Ao lado da Beira-Mar Continental",
      "Região com valorização acima da média",
    ],
    image: "/empreendimentos/brio778/catalogo/boa-localizacao.png",
  },

  highlights: [
    "570 m² dedicados ao lazer e bem-estar",
    "Áreas comuns entregues mobiliadas, decoradas e climatizadas",
  ],

  spotlight: {
    image: "/empreendimentos/brio778/catalogo/coworking.webp",
    title: "Mini mercado dentro do seu prédio.",
    description: "Esqueça as corridas ao supermercado. O Brio 778 tem market, coworking, lojas e espaço para deliveries.",
    items: [
      "Market com produtos do dia a dia",
      "Coworking para trabalhar perto de casa",
    ],
  },

  technology: {
    title: "Segurança, tecnologia e sustentabilidade",
    subtitle: "Aqui a inovação e o conforto vivem em perfeita sintonia.",
    items: [
      "Acesso com reconhecimento facial",
      "Reaproveitamento de água da chuva",
      "Infraestrutura para carro elétrico",
    ],
  },

  apartmentFeatures: [
    "Sacada com churrasqueira a carvão",
    "Fechadura digital",
    "Persianas motorizadas",
  ],

  amenities: [
    "Piscina adulto",
    "Academia",
    "Salão de festas",
    "Coworking",
    "Pet place",
    "Market",
  ],

  gallery: [],

  cta: {
    primaryLabel: "Receber catálogo",
    secondaryLabel: "Falar com consultor",
    whatsapp: "5548999999999",
    message: "Olá, tenho interesse no Brio 778 e quero receber mais informações.",
  },

  seo: {
    title: "Brio 778 | Pré-lançamento no Estreito",
    description: "Conheça o Brio 778, empreendimento no Estreito em Florianópolis com apartamentos de 2 e 3 dormitórios.",
    image: "/empreendimentos/brio778/catalogo/fachada-hero.webp",
  },
};
```

---

## Seções recomendadas da landing

### 1. Hero de impacto

Deve conter:

- Logo.
- Menu hamburger.
- Palavra grande no fundo.
- Imagem principal do prédio.
- Selo circular.
- Nome do empreendimento.
- CTA principal.

### 2. Manifesto

Texto longo e inspiracional que transmite a identidade e proposta de vida do empreendimento. Usado para criar conexão emocional antes das informações técnicas.

### 3. Seção de revelação / Building Reveal

Apresenta a fachada do prédio com animação de entrada cinematográfica.

### 4. Spotlight

Destaque especial para um diferencial único do empreendimento com imagem de impacto.

### 5. Localização estratégica

Mostra bairro, cidade e pontos próximos.

### 6. Diferenciais dos apartamentos

Lista características internas, acabamento e conforto.

### 7. Tecnologia e sustentabilidade

Segurança, tecnologia embarcada e diferenciais de sustentabilidade.

### 8. Lazer e infraestrutura

Mostra áreas comuns e comodidades.

### 9. Galeria imersiva

Imagens grandes, carrossel, scroll horizontal ou grid sofisticado.

### 10. Plantas

Mostra opções de unidades e plantas.

### 11. Formulário de lead

Campos mínimos:

- Nome.
- WhatsApp.
- E-mail opcional.
- Interesse: morar, investir ou corretor.

### 12. CTA final

Chamada de conversão com WhatsApp e formulário.

---

## Funcionalidades do MVP

A primeira versão deve ter:

- Uma landing dinâmica por slug.
- Um template premium inicial.
- Dados em arquivos TypeScript.
- Tema por empreendimento.
- Formulário salvando leads no Supabase.
- Botão fixo de WhatsApp.
- SEO básico.
- Galeria.
- Animações com Framer Motion.
- Deploy na Vercel.

---

## Evolução futura

Depois do MVP, evoluir para:

- Painel admin.
- Cadastro de empreendimentos.
- Upload de imagens.
- Upload de PDF/catálogo.
- Extração automática de cores e textos com IA.
- Escolha de template.
- Publicação automática.
- Dashboard de leads.
- Integração com CRM.
- Integração com WhatsApp.
- Geração automática de copy da landing.

---

## Regras importantes de desenvolvimento

- O projeto deve ser mobile first.
- Não usar cores fixas dentro dos componentes principais.
- Usar CSS variables para todos os temas.
- Separar dados do empreendimento da estrutura visual.
- Criar componentes reaproveitáveis.
- Evitar textos longos na primeira dobra.
- Priorizar impacto visual e conversão.
- Garantir boa performance das imagens.
- Usar `next/image` sempre que possível.
- Manter o formulário simples.
- Fazer o WhatsApp receber mensagem dinâmica com nome do empreendimento.

---

## Resultado esperado

O resultado deve ser um sistema onde seja possível criar rapidamente uma nova landing de empreendimento apenas criando um novo arquivo de dados ou cadastro no painel.

Exemplo:

```txt
/empreendimento/brio778
/empreendimento/reserva-das-flores
/empreendimento/vista-mar
/empreendimento/prime-square
```

Cada página deve parecer única visualmente, mas reaproveitar a mesma arquitetura técnica.
