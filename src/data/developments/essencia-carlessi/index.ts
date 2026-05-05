import type { Development } from "@/types/development";

export const essenciaCarlessi: Development = {
  slug: "essencia-carlessi",
  template: "luxury-residence",
  name: "Essência Carlessi",
  status: "launch",

  brand: {
    name: "Construtora Carlessi",
    logo: "/empreendimentos/essencia-carlessi/catalogo/logo.webp",
    logoContrast: "dark",
  },

  hero: {
    variant: "side-impact",
    backgroundWord: "ESSÊNCIA",
    title: "Viver com Essência",
    subtitle:
      "No Córrego Grande, onde a cidade respira movimento e a natureza inspira.",
    impactPhrase: "Aqui, o bem-estar não é um extra — é o endereço.",
    badgeText: "LANÇAMENTO NO CÓRREGO GRANDE",
    buildingImage:
      "/empreendimentos/essencia-carlessi/catalogo/fachada-hero.webp",
    backgroundImage:
      "/empreendimentos/essencia-carlessi/catalogo/localizacao-aerea.webp",
  },

  theme: {
    primary: "#C4432A",
    secondary: "#1A1A1A",
    background: "#EEEAE5",
    surface: "#F7F4F1",
    text: "#2D2D2D",
    muted: "#7A7068",
    accent: "#C4432A",
    fontTitle: "Cormorant Garant",
    fontBody: "Inter",
  },

  essencia: {
    sectionLabel: "Essência",
    title:
      "Um projeto nascido onde a cidade encontra a natureza, criado para transformar rotina em bem-estar.",
    text:
      "Com acesso direto ao Parque Linear do Córrego Grande, o Essência conecta seus moradores a um estilo de vida moderno, saudável e integrado ao verde.",
    cards: [
      "Natureza ao seu redor",
      "Lazer de alto padrão",
      "Localização estratégica",
      "Construtora com tradição",
    ],
    ctaLabel: "Quero receber detalhes",
  },

  location: {
    neighborhood: "Córrego Grande",
    city: "Florianópolis",
    state: "SC",
    address: "Rua Sebastião Laurentino da Silva, 30",
    mapUrl:
      "https://maps.google.com/?q=Rua+Sebastião+Laurentino+da+Silva,+30,+Córrego+Grande,+Florianópolis",
    highlights: [
      "Acesso direto ao Parque Linear do Córrego Grande",
      "A minutos das Universidades UFSC e UDESC",
      "Próximo ao Shopping Villa Romana",
      "Perto da Cachoeira do Poção e do Parque Ecológico",
      "Comércios, supermercados, escolas e academias na redondeza",
    ],
    image: "/empreendimentos/essencia-carlessi/catalogo/localizacao.webp",
  },

  highlights: [
    "Acesso direto ao Parque Linear do Córrego Grande",
    "Piscina aquecida adulto e infantil no 2º pavimento",
    "Passeio comercial com 6 lojas no térreo",
    "Vista livre em todos os apartamentos",
    "Áreas comuns entregues mobiliadas e decoradas",
    "Construtora Carlessi: mais de 400 obras entregues desde 1986",
  ],

  spotlight: {
    image: "/empreendimentos/essencia-carlessi/catalogo/piscina-aquecida.webp",
    title: "Piscina aquecida com vista para a cidade.",
    description:
      "No 2º pavimento, uma piscina adulto aquecida com área de descanso, spa e piscina infantil — tudo com vista panorâmica para Florianópolis.",
    items: [
      "Piscina adulto aquecida",
      "Spa e piscina infantil aquecida",
      "Área de descanso com espreguiçadeiras",
      "Vista panorâmica para a cidade",
      "Salão de festas integrado ao lazer",
    ],
  },

  technology: {
    title: "Tecnologia, segurança e sustentabilidade",
    subtitle: "Inovação e responsabilidade ambiental em cada detalhe.",
    items: [
      "Hall de entrada com controle de acesso biométrico",
      "Sistema de segurança com câmeras",
      "Placas para energia solar nas áreas comuns",
      "Captação de água pluvial para jardins e limpeza",
      "Sensores de presença para iluminação",
      "Aptos com hidrômetros individuais",
      "Infraestrutura para veículos elétricos nas vagas",
      "Vagas para visitantes com tomada para carro elétrico",
      "Vagas individuais para bicicletas",
      "2 elevadores sociais",
    ],
  },

  apartmentFeatures: [
    "Porta de entrada com fechadura digital",
    "Persianas motorizadas nos dormitórios",
    "Churrasqueira a carvão nas sacadas",
    "Espera para ar-condicionado nas salas e dormitórios",
    "Lajes com atenuante acústico",
    "Piso porcelanato retificado",
    "Aquecimento de água nos banheiros e cozinha",
    "Tomadas USB nos apartamentos",
    "Medidores individuais de energia, água e gás",
    "Vista livre em todos os apartamentos",
  ],

  amenities: [
    "Piscina Adulto Aquecida",
    "Piscina Infantil Aquecida",
    "Spa",
    "Academia",
    "Salão de Festas",
    "Game Lounge",
    "Brinquedoteca",
    "Playground",
    "Pet Place",
    "Passeio Comercial com 6 lojas",
    "Hall com controle biométrico",
    "Vagas com infraestrutura para elétricos",
    "Bicicletário",
    "Vagas PcD",
  ],

  gallery: [
    {
      src: "/empreendimentos/essencia-carlessi/catalogo/hall-entrada.webp",
      alt: "Hall de entrada do Essência Carlessi",
      category: "Hall de Entrada",
      recommendedUse: "Seção de áreas comuns",
    },
    {
      src: "/empreendimentos/essencia-carlessi/catalogo/piscina-aquecida.webp",
      alt: "Piscina aquecida adulto do Essência Carlessi",
      category: "Piscina",
      recommendedUse: "Galeria principal",
    },
    {
      src: "/empreendimentos/essencia-carlessi/catalogo/spa-piscina-infantil.webp",
      alt: "Spa e piscina infantil aquecida do Essência Carlessi",
      category: "Spa",
      recommendedUse: "Galeria principal",
    },
    {
      src: "/empreendimentos/essencia-carlessi/catalogo/academia.webp",
      alt: "Academia com vista panorâmica do Essência Carlessi",
      category: "Academia",
      recommendedUse: "Galeria principal",
    },
    {
      src: "/empreendimentos/essencia-carlessi/catalogo/salao-festas.webp",
      alt: "Salão de festas do Essência Carlessi",
      category: "Salão de Festas",
      recommendedUse: "Galeria principal",
    },
    {
      src: "/empreendimentos/essencia-carlessi/catalogo/game-lounge.webp",
      alt: "Game Lounge do Essência Carlessi",
      category: "Game Lounge",
      recommendedUse: "Galeria de lazer",
    },
    {
      src: "/empreendimentos/essencia-carlessi/catalogo/brinquedoteca.webp",
      alt: "Brinquedoteca do Essência Carlessi",
      category: "Brinquedoteca",
      recommendedUse: "Galeria de lazer",
    },
    {
      src: "/empreendimentos/essencia-carlessi/catalogo/pet-place.webp",
      alt: "Pet Place do Essência Carlessi",
      category: "Pet Place",
      recommendedUse: "Galeria de lazer",
    },
    {
      src: "/empreendimentos/essencia-carlessi/catalogo/fachada-lojas.webp",
      alt: "Passeio comercial com lojas do Essência Carlessi",
      category: "Fachada",
      recommendedUse: "Seção de comodidades",
    },
    {
      src: "/empreendimentos/essencia-carlessi/catalogo/living-802.webp",
      alt: "Perspectiva de living do apartamento 802",
      category: "Apartamento",
      recommendedUse: "Seção de unidades",
    },
    {
      src: "/empreendimentos/essencia-carlessi/catalogo/suite-802.webp",
      alt: "Perspectiva de suíte do apartamento 802",
      category: "Apartamento",
      recommendedUse: "Seção de unidades",
    },
  ],

  floorPlans: [
    {
      name: "1 Dormitório",
      area: "37,15 m²",
      bedrooms: "1",
      suites: "0",
      parking: "não informado",
      image: "/empreendimentos/essencia-carlessi/catalogo/planta-1-dorm.webp",
    },
    {
      name: "2 Dormitórios — Tipo 1",
      area: "70,60 m²",
      bedrooms: "2",
      suites: "1",
      parking: "não informado",
      image:
        "/empreendimentos/essencia-carlessi/catalogo/planta-2-dorm-tipo-1.webp",
    },
    {
      name: "2 Dormitórios — Tipo 2",
      area: "63,00 m²",
      bedrooms: "2",
      suites: "1",
      parking: "não informado",
      image:
        "/empreendimentos/essencia-carlessi/catalogo/planta-2-dorm-tipo-2.webp",
    },
    {
      name: "Cobertura — Tipo 1",
      area: "171,32 m²",
      bedrooms: "3",
      suites: "1",
      parking: "não informado",
      image:
        "/empreendimentos/essencia-carlessi/catalogo/planta-cobertura-tipo-1.webp",
    },
    {
      name: "Cobertura — Tipo 2",
      area: "120,37 m²",
      bedrooms: "3",
      suites: "1",
      parking: "não informado",
      image:
        "/empreendimentos/essencia-carlessi/catalogo/planta-cobertura-tipo-2.webp",
    },
    {
      name: "Cobertura — Tipo 3",
      area: "159,53 m²",
      bedrooms: "3",
      suites: "1",
      parking: "não informado",
      image:
        "/empreendimentos/essencia-carlessi/catalogo/planta-cobertura-tipo-3.webp",
    },
  ],

  cta: {
    primaryLabel: "Receber catálogo",
    secondaryLabel: "Falar com consultor",
    whatsapp: "5548988506977",
    message:
      "Olá, tenho interesse no Essência Carlessi e gostaria de receber mais informações.",
  },

  seo: {
    title: "Essência Carlessi | Lançamento no Córrego Grande",
    description:
      "Apartamentos de 1 e 2 dorms com piscina aquecida e acesso ao Parque Linear. Lançamento da Construtora Carlessi no Córrego Grande, Florianópolis.",
    image: "/empreendimentos/essencia-carlessi/catalogo/fachada-hero.webp",
  },
};
