import type { Development } from "@/types/development";
import { BuildingRevealSection } from "../sections/BuildingRevealSection";
import { FinalCtaSection } from "../sections/FinalCtaSection";
import { Footer } from "../sections/Footer";
import { HeroRenderer } from "../sections/heroes/HeroRenderer";
import { LocationSection } from "../sections/LocationSection";
import { ManifestoSection } from "../sections/ManifestoSection";
import { GallerySection } from "../sections/GallerySection";
import { SpotlightSection } from "../sections/SpotlightSection";
import { TechnologySection } from "../sections/TechnologySection";
import { StickyHeader } from "../ui/StickyHeader";

interface LaunchImpactTemplateProps {
  development: Development;
}

export function LaunchImpactTemplate({ development }: LaunchImpactTemplateProps) {
  return (
    <main className="bg-[var(--color-secondary)]">
      <StickyHeader
        logo={development.brand.logo}
        logoContrast={development.brand.logoContrast}
        brandName={development.brand.name}
        whatsapp={development.cta.whatsapp}
        whatsappMessage={development.cta.message}
      />
      <HeroRenderer development={development} />
      <ManifestoSection development={development} />
      <BuildingRevealSection development={development} />
      <LocationSection development={development} />
      <SpotlightSection development={development} />
      <TechnologySection development={development} />
      <FinalCtaSection development={development} />
      <Footer />
    </main>
  );
}

export default LaunchImpactTemplate;
