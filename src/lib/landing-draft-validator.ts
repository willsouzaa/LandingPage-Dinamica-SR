import type {
  BuiltInLandingSectionType,
  Development,
  DevelopmentStatus,
  HeroVariant,
  LandingTemplate,
} from "@/types/development";

type ValidationResult = {
  ok: boolean;
  issues: string[];
  warnings: string[];
};

const statuses: DevelopmentStatus[] = [
  "pre-launch",
  "launch",
  "ready",
  "last-units",
  "investment",
];

const templates: LandingTemplate[] = [
  "launch-impact",
  "luxury-residence",
  "beach-lifestyle",
  "urban-modern",
  "investment-value",
  "catalogo",
];

const heroVariants: HeroVariant[] = [
  "split-campaign",
  "editorial-luxury",
  "lifestyle",
  "side-impact",
];

const sections: BuiltInLandingSectionType[] = [
  "hero",
  "essencia",
  "building",
  "location",
  "spotlight",
  "technology",
  "amenities",
  "gallery",
  "floorPlans",
  "leadForm",
  "footer",
];

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const hexRegex = /^#[0-9a-fA-F]{6}$/;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function pushMissing(issues: string[], path: string, value: unknown) {
  if (!isString(value)) {
    issues.push(`Campo obrigatório ausente ou vazio: ${path}`);
  }
}

export function validateDevelopmentDraft(development: unknown): ValidationResult {
  const issues: string[] = [];
  const warnings: string[] = [];

  if (!isObject(development)) {
    return {
      ok: false,
      issues: ["O draft precisa ser um objeto JSON."],
      warnings,
    };
  }

  pushMissing(issues, "slug", development.slug);
  if (isString(development.slug) && !slugRegex.test(development.slug)) {
    issues.push("slug deve conter apenas letras minúsculas, números e hífens.");
  }

  pushMissing(issues, "name", development.name);

  if (!statuses.includes(development.status as DevelopmentStatus)) {
    issues.push(`status inválido: ${String(development.status)}`);
  }

  if (!templates.includes(development.template as LandingTemplate)) {
    issues.push(`template inválido: ${String(development.template)}`);
  }

  if (Array.isArray(development.sections)) {
    development.sections.forEach((section, index) => {
      const isCustomSection = typeof section === "string" && /^custom:[a-z0-9-]+$/.test(section);
      if (!sections.includes(section as BuiltInLandingSectionType) && !isCustomSection) {
        issues.push(`sections[${index}] inválida: ${String(section)}`);
      }
      if (isCustomSection) {
        warnings.push(`sections[${index}] usa seção customizada (${String(section)}). Confirme se ela foi registrada em src/components/landing/generated/registry.tsx.`);
      }
    });
  }

  const brand = development.brand;
  if (!isObject(brand)) {
    issues.push("brand é obrigatório.");
  } else {
    pushMissing(issues, "brand.name", brand.name);
    pushMissing(issues, "brand.logo", brand.logo);
  }

  const hero = development.hero;
  if (!isObject(hero)) {
    issues.push("hero é obrigatório.");
  } else {
    pushMissing(issues, "hero.backgroundWord", hero.backgroundWord);
    pushMissing(issues, "hero.title", hero.title);
    pushMissing(issues, "hero.subtitle", hero.subtitle);
    pushMissing(issues, "hero.badgeText", hero.badgeText);
    pushMissing(issues, "hero.buildingImage", hero.buildingImage);
    if (hero.variant && !heroVariants.includes(hero.variant as HeroVariant)) {
      issues.push(`hero.variant inválida: ${String(hero.variant)}`);
    }
  }

  const theme = development.theme;
  if (!isObject(theme)) {
    issues.push("theme é obrigatório.");
  } else {
    ["primary", "secondary", "background", "surface", "text", "muted", "accent"].forEach((key) => {
      const value = theme[key];
      if (!isString(value) || !hexRegex.test(value)) {
        issues.push(`theme.${key} deve ser uma cor hexadecimal no formato #RRGGBB.`);
      }
    });
    pushMissing(issues, "theme.fontTitle", theme.fontTitle);
    pushMissing(issues, "theme.fontBody", theme.fontBody);
  }

  const location = development.location;
  if (!isObject(location)) {
    issues.push("location é obrigatório.");
  } else {
    pushMissing(issues, "location.neighborhood", location.neighborhood);
    pushMissing(issues, "location.city", location.city);
    pushMissing(issues, "location.state", location.state);
    if (!isStringArray(location.highlights) || location.highlights.length < 3) {
      warnings.push("location.highlights deveria ter pelo menos 3 itens.");
    }
  }

  if (!isStringArray(development.highlights) || development.highlights.length < 3) {
    warnings.push("highlights deveria ter pelo menos 3 diferenciais comerciais.");
  }

  if (!isStringArray(development.amenities) || development.amenities.length < 3) {
    warnings.push("amenities deveria ter pelo menos 3 itens.");
  }

  if (!isStringArray(development.apartmentFeatures) || development.apartmentFeatures.length < 3) {
    warnings.push("apartmentFeatures deveria ter pelo menos 3 itens.");
  }

  if (!Array.isArray(development.gallery) || development.gallery.length < 4) {
    warnings.push("gallery deveria ter pelo menos 4 imagens.");
  }

  const cta = development.cta;
  if (!isObject(cta)) {
    issues.push("cta é obrigatório.");
  } else {
    pushMissing(issues, "cta.primaryLabel", cta.primaryLabel);
    pushMissing(issues, "cta.whatsapp", cta.whatsapp);
    pushMissing(issues, "cta.message", cta.message);
    if (cta.whatsapp !== "5548988506977") {
      warnings.push("cta.whatsapp deve usar o número padrão da San Remo: 5548988506977.");
    }
  }

  const seo = development.seo;
  if (!isObject(seo)) {
    issues.push("seo é obrigatório.");
  } else {
    pushMissing(issues, "seo.title", seo.title);
    pushMissing(issues, "seo.description", seo.description);
  }

  return {
    ok: issues.length === 0,
    issues,
    warnings,
  };
}

export function normalizeDevelopmentDraft(input: unknown): Development {
  const candidate = isObject(input) && isObject(input.development)
    ? input.development
    : input;

  return candidate as Development;
}
