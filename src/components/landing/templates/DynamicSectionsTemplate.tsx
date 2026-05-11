import type { BuiltInLandingSectionType, Development, LandingSectionType } from "@/types/development";
import type { ReactNode } from "react";
import { generatedSectionRegistry } from "../generated/registry";
import { AmenitiesSection } from "../sections/AmenitiesSection";
import { BuildingRevealSection } from "../sections/BuildingRevealSection";
import { FinalCtaSection } from "../sections/FinalCtaSection";
import { FloorPlansSection } from "../sections/FloorPlansSection";
import { Footer } from "../sections/Footer";
import { GallerySection } from "../sections/GallerySection";
import { HeroRenderer } from "../sections/heroes/HeroRenderer";
import { LocationSection } from "../sections/LocationSection";
import { ManifestoSection } from "../sections/ManifestoSection";
import { SpotlightSection } from "../sections/SpotlightSection";
import { TechnologySection } from "../sections/TechnologySection";
import { StickyHeader } from "../ui/StickyHeader";

type DynamicSectionsTemplateProps = {
  development: Development;
};

const sectionRegistry: Record<
  BuiltInLandingSectionType,
  (development: Development) => ReactNode
> = {
  hero: (development) => <HeroRenderer development={development} />,
  essencia: (development) => <ManifestoSection development={development} />,
  building: (development) => <BuildingRevealSection development={development} />,
  location: (development) => <LocationSection development={development} />,
  spotlight: (development) => <SpotlightSection development={development} />,
  technology: (development) => <TechnologySection development={development} />,
  amenities: (development) => <AmenitiesSection development={development} />,
  gallery: (development) => <GallerySection development={development} />,
  floorPlans: (development) => <FloorPlansSection development={development} />,
  leadForm: (development) => <FinalCtaSection development={development} />,
  footer: () => <Footer />,
};

export const defaultDynamicSections: LandingSectionType[] = [
  "hero",
  "essencia",
  "building",
  "location",
  "spotlight",
  "technology",
  "leadForm",
  "footer",
];

export function DynamicSectionsTemplate({
  development,
}: DynamicSectionsTemplateProps) {
  const sections = development.sections?.length
    ? development.sections
    : defaultDynamicSections;

  return (
    <main className="bg-[var(--color-secondary)]">
      <StickyHeader
        logo={development.brand.logo}
        logoContrast={development.brand.logoContrast}
        brandName={development.brand.name}
        whatsapp={development.cta.whatsapp}
        whatsappMessage={development.cta.message}
      />
      {sections.map((section, index) => {
        const rendered = renderSection(section, development);
        return rendered ? <div key={`${section}-${index}`}>{rendered}</div> : null;
      })}
    </main>
  );
}

function renderSection(section: LandingSectionType, development: Development) {
  if (section.startsWith("custom:")) {
    const key = section.replace(/^custom:/, "");
    const GeneratedSection = generatedSectionRegistry[key];
    return GeneratedSection ? <GeneratedSection development={development} /> : null;
  }

  return sectionRegistry[section as BuiltInLandingSectionType]?.(development) ?? null;
}
