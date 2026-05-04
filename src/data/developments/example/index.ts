import type { Development } from "@/types/development";

export const exampleDevelopment: Development = {
  slug: "nome-do-empreendimento",
  template: "launch-impact",
  name: "Nome do Empreendimento",
  status: "pre-launch",

  brand: {
    name: "Nome da Construtora",
    logo: "/empreendimentos/nome-do-empreendimento/catalogo/logo.webp",
  },

  hero: {
    variant: "side-impact",
    backgroundWord: "PALAVRA DE IMPACTO",
    title: "Nome do Empreendimento",
    subtitle: "Subtítulo com proposta de valor e localização.",
    impactPhrase: "Frase de impacto curta e marcante.",
    badgeText: "STATUS COMERCIAL NO BAIRRO",
    buildingImage: "/empreendimentos/nome-do-empreendimento/catalogo/fachada-hero.webp",
    backgroundImage: "/empreendimentos/nome-do-empreendimento/catalogo/localizacao-aerea.webp",
    transitionImages: [
      "/empreendimentos/nome-do-empreendimento/catalogo/transicao1.webp",
      "/empreendimentos/nome-do-empreendimento/catalogo/transicao2.webp",
      "/empreendimentos/nome-do-empreendimento/catalogo/transicao3.webp",
    ],
  },

  theme: {
    primary: "#000000",
    secondary: "#000000",
    background: "#000000",
    surface: "#000000",
    text: "#000000",
    muted: "#000000",
    accent: "#000000",
    fontTitle: "Inter",
    fontBody: "Inter",
  },

  essencia: {
    sectionLabel: "Essência",
    title: "Um empreendimento pensado para transformar rotina em experiência.",
    text: "Localização, arquitetura e conforto se unem em um projeto criado para quem busca viver melhor e investir com inteligência.",
    cards: [
      "Localização privilegiada",
      "Projeto contemporâneo",
      "Conforto e praticidade",
      "Potencial de valorização",
    ],
    ctaLabel: "Quero receber detalhes",
  },

  location: {
    neighborhood: "Nome do Bairro",
    city: "Cidade",
    state: "UF",
    address: "Rua Exemplo, 000",
    mapUrl: "https://maps.google.com/?q=...",
    highlights: [
      "Destaque de localização 1",
      "Destaque de localização 2",
      "Destaque de localização 3",
    ],
    image: "/empreendimentos/nome-do-empreendimento/catalogo/localizacao.webp",
  },

  highlights: [
    "Destaque principal do empreendimento 1",
    "Destaque principal do empreendimento 2",
    "Destaque principal do empreendimento 3",
  ],

  spotlight: {
    image: "/empreendimentos/nome-do-empreendimento/catalogo/spotlight.webp",
    title: "Título do destaque especial.",
    description: "Descrição do diferencial em destaque. Máximo 2 frases.",
    items: [
      "Item do diferencial 1",
      "Item do diferencial 2",
      "Item do diferencial 3",
    ],
  },

  technology: {
    title: "Título da seção de tecnologia e segurança",
    subtitle: "Subtítulo explicando o conceito.",
    items: [
      "Item de tecnologia/segurança/sustentabilidade 1",
      "Item de tecnologia/segurança/sustentabilidade 2",
      "Item de tecnologia/segurança/sustentabilidade 3",
    ],
  },

  apartmentFeatures: [
    "Acabamento/feature do apartamento 1",
    "Acabamento/feature do apartamento 2",
    "Acabamento/feature do apartamento 3",
  ],

  amenities: [
    "Área de lazer 1",
    "Área de lazer 2",
    "Área de lazer 3",
  ],

  gallery: [
    {
      src: "/empreendimentos/nome-do-empreendimento/catalogo/imagem-1.webp",
      alt: "Descrição da imagem 1",
      category: "Categoria",
      recommendedUse: "Seção de uso recomendado",
    },
  ],

  floorPlans: [
    {
      name: "Tipo A",
      area: "00,00 m²",
      bedrooms: "0",
      suites: "0",
      parking: "0",
      image: "/empreendimentos/nome-do-empreendimento/catalogo/planta-a.webp",
    },
  ],

  cta: {
    primaryLabel: "Receber catálogo",
    secondaryLabel: "Falar com consultor",
    whatsapp: "5548999999999",
    message: "Olá, tenho interesse no [Nome do Empreendimento] e quero receber mais informações.",
  },

  seo: {
    title: "Nome do Empreendimento | Status Comercial no Bairro",
    description: "Descrição para SEO com palavras-chave relevantes, localização e status.",
    image: "/empreendimentos/nome-do-empreendimento/catalogo/fachada-hero.webp",
  },
};
