import type { Development } from "@/types/development";

export const parkoRtrees: Development = {
  slug: "parko-rtrees",
  template: "launch-impact",
  name: "PARKO R TRĒES",
  status: "launch",

  brand: {
    name: "RTRĒES",
    logo: "/empreendimentos/parko-rtrees/catalogo/logo-parko.webp",
  },

  hero: {
    variant: "side-impact",
    backgroundWord: "PARKO",
    title: "PARKO R TRĒES",
    subtitle: "Ecossistema de saúde e bem-estar no coração da Trindade, com 500 m² de bosque privativo e piscina no rooftop.",
    impactPhrase: "A cidade, na rua ao lado, parece distante.",
    badgeText: "LANÇAMENTO NA TRINDADE",
    buildingImage: "/empreendimentos/parko-rtrees/catalogo/fachada-hero.webp",
    backgroundImage: "/empreendimentos/parko-rtrees/catalogo/localizacao-aerea.webp",
    transitionImages: [
      "/empreendimentos/parko-rtrees/catalogo/transicao1.webp",
      "/empreendimentos/parko-rtrees/catalogo/transicao2.webp",
      "/empreendimentos/parko-rtrees/catalogo/transicao3.webp",
    ],
  },

  theme: {
    primary: "#4A6741",
    secondary: "#1A1A1A",
    background: "#F0EDE6",
    surface: "#FFFFFF",
    text: "#1A1A1A",
    muted: "#7B8B79",
    accent: "#6B8F64",
    fontTitle: "Cormorant Garant",
    fontBody: "Inter",
  },

  manifesto: `A cidade existe lá fora.
Aqui dentro, existe outra coisa.
O cheiro da manhã, a sombra das árvores, o silêncio do bosque.
Viver perto da natureza não é um luxo — é uma necessidade.
Saúde não começa na academia. Começa no espaço que você escolheu habitar.
Comunidade não é uma palavra bonita. É o vizinho que te reconhece no hall.
O tempo avança. Mas o modo de envelhecer é uma escolha.
Escolha o bosque. Escolha o rooftop ao entardecer. Escolha a paz de estar em casa.
Aqui, cada fase da vida tem espaço para ser vivida com intensidade e com cuidado.
Multigeracional não é uma tipologia. É uma filosofia.
Parko é o lugar onde o verde é arquitetura.
Onde saúde, convivência e natureza vivem em perfeita integração.
Celebre o tempo. Redescubra o futuro do viver.

PARKO R TRĒES — A paz de estar em casa.`,

  location: {
    neighborhood: "Trindade",
    city: "Florianópolis",
    state: "SC",
    address: "Rua José Batista Rosa, lotes 7, 9, 11, 13 e 15",
    highlights: [
      "Beira Mar a 400 m — natureza e conveniência juntas",
      "UFSC e UDESC a menos de 2 km — alta demanda de moradia e investimento",
      "Terminal TITRI a 380 m — mobilidade urbana garantida",
      "Angeloni Beira Mar a 1,2 km — tudo o que precisa, perto",
      "Hospital HU a 1,5 km — segurança para todas as idades",
    ],
    image: "/empreendimentos/parko-rtrees/catalogo/localizacao-aerea.webp",
  },

  highlights: [
    "850 m² de lazer e bem-estar multigeracional",
    "500 m² de bosque privativo no coração da Trindade",
    "Piscina aquecida e Fireplace no rooftop com vista panorâmica",
    "Ecossistema de saúde com Concierge e monitoramento remoto",
    "A Praça: comércio e serviços integrados já em operação no térreo",
    "Projeto aprovado e alvará de construção emitido",
  ],

  spotlight: {
    image: "/empreendimentos/parko-rtrees/catalogo/bosque.webp",
    title: "500 m² de bosque dentro do seu prédio.",
    description: "Um refúgio de natureza privativo onde você pode viver em comunidade, envelhecer com saúde e se cercar de verde todos os dias.",
    items: [
      "Bosque privativo de 500 m²",
      "Paisagismo para bem-estar e convivência multigeracional",
      "Pet Place integrado ao bosque",
      "Espaços de meditação e descanso ao ar livre",
    ],
  },

  technology: {
    title: "Tecnologia e sustentabilidade que inspiram o viver",
    subtitle: "Inovação e responsabilidade ambiental em perfeita sintonia.",
    items: [
      "Controle de acesso inteligente",
      "Central de monitoramento remoto com integração Apple Watch",
      "Placas solares instaladas para energia limpa",
      "Cisterna para reaproveitamento da água da chuva",
      "Infraestrutura para carregamento de carros elétricos em todas as vagas",
      "Iluminação LED com sensores de presença",
      "Peças sanitárias com tecnologia de baixa vazão",
      "Central de resíduos com triagem e coleta seletiva",
    ],
  },

  apartmentFeatures: [
    "Sacada com churrasqueira a carvão",
    "Piso porcelanato 90×90 cm nas áreas sociais",
    "Piso vinílico nos dormitórios",
    "Fechadura eletrônica na porta principal",
    "Persiana motorizada nos dormitórios",
    "Cozinha Gourmet com ponto para grill a gás",
    "Banheiros com nicho, pastilhas e azulejo na área do box",
    "Plantas adaptáveis para PCD sem custo adicional",
  ],

  amenities: [
    "Bosque privativo de 500 m²",
    "Piscina aquecida no rooftop",
    "Fireplace",
    "Gourmet 01",
    "Gourmet 02",
    "Academia",
    "Spa",
    "Pet Place",
    "Hall com design exclusivo",
    "Espaço de Saúde",
    "Concierge de Saúde",
    "Wellness Check",
    "A Praça — comércio integrado",
    "Qualidade do ar nas áreas comuns",
  ],

  gallery: [
    {
      src: "/empreendimentos/parko-rtrees/catalogo/bosque.webp",
      alt: "Bosque privativo de 500 m²",
      category: "Bosque",
      recommendedUse: "spotlight / hero background",
    },
    {
      src: "/empreendimentos/parko-rtrees/catalogo/bosque-noturno.webp",
      alt: "Bosque privativo iluminado à noite",
      category: "Bosque",
      recommendedUse: "gallery",
    },
    {
      src: "/empreendimentos/parko-rtrees/catalogo/piscina-rooftop.webp",
      alt: "Piscina aquecida no rooftop com vista panorâmica",
      category: "Rooftop",
      recommendedUse: "gallery / hero",
    },
    {
      src: "/empreendimentos/parko-rtrees/catalogo/fireplace.webp",
      alt: "Fireplace no terraço com vista para a natureza",
      category: "Rooftop",
      recommendedUse: "gallery",
    },
    {
      src: "/empreendimentos/parko-rtrees/catalogo/gourmet-01.webp",
      alt: "Espaço Gourmet 01",
      category: "Lazer",
      recommendedUse: "gallery",
    },
    {
      src: "/empreendimentos/parko-rtrees/catalogo/academia.webp",
      alt: "Academia com vista para a natureza",
      category: "Lazer",
      recommendedUse: "gallery",
    },
    {
      src: "/empreendimentos/parko-rtrees/catalogo/spa.webp",
      alt: "Spa",
      category: "Lazer",
      recommendedUse: "gallery",
    },
    {
      src: "/empreendimentos/parko-rtrees/catalogo/pet-place.webp",
      alt: "Pet Place integrado ao bosque",
      category: "Lazer",
      recommendedUse: "gallery",
    },
    {
      src: "/empreendimentos/parko-rtrees/catalogo/modelo-studio.webp",
      alt: "Modelo Studio decorado",
      category: "Apartamento",
      recommendedUse: "gallery",
    },
    {
      src: "/empreendimentos/parko-rtrees/catalogo/modelo-02-suites.webp",
      alt: "Modelo 02 Suítes decorado",
      category: "Apartamento",
      recommendedUse: "gallery",
    },
  ],

  cta: {
    primaryLabel: "Receber catálogo",
    secondaryLabel: "Falar com consultor",
    whatsapp: "5548996245294",
    message: "Olá, tenho interesse no PARKO R TRĒES e quero receber mais informações sobre o lançamento na Trindade.",
  },

  seo: {
    title: "PARKO R TRĒES | Lançamento na Trindade, Florianópolis",
    description: "Conheça o PARKO R TRĒES, ecossistema de saúde e natureza na Trindade. Bosque privativo, piscina no rooftop e concierge de saúde. Florianópolis, SC.",
    image: "/empreendimentos/parko-rtrees/catalogo/fachada-hero.webp",
  },
};
