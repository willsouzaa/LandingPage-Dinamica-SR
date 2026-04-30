import type { Development } from "@/types/development";
import { FloatingWhatsApp } from "../ui/FloatingWhatsApp";
import { BeachLifestyleTemplate } from "./BeachLifestyleTemplate";
import { CatalogoTemplate } from "./CatalogoTemplate";
import { InvestmentValueTemplate } from "./InvestmentValueTemplate";
import { LaunchImpactTemplate } from "./LaunchImpactTemplate";
import { LuxuryResidenceTemplate } from "./LuxuryResidenceTemplate";
import { UrbanModernTemplate } from "./UrbanModernTemplate";

type LandingTemplateRendererProps = {
  development: Development;
};

export function LandingTemplateRenderer({
  development,
}: LandingTemplateRendererProps) {
  const templates = {
    "launch-impact": LaunchImpactTemplate,
    "luxury-residence": LuxuryResidenceTemplate,
    "beach-lifestyle": BeachLifestyleTemplate,
    "urban-modern": UrbanModernTemplate,
    "investment-value": InvestmentValueTemplate,
    "catalogo": CatalogoTemplate,
  };
  const Template = templates[development.template] ?? LaunchImpactTemplate;

  return (
    <>
      <Template development={development} />
      <FloatingWhatsApp />
    </>
  );
}
