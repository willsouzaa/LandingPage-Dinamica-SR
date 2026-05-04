import type { DevelopmentTheme } from "./theme";

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
  essencia?: {
    sectionLabel?: string;
    title: string;
    text: string;
    cards: string[];
    ctaLabel?: string;
  };
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
