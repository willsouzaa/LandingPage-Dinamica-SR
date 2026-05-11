import type { Development } from "@/types/development";
import type { ComponentType } from "react";
import { AuraInvestmentModelSection } from "./aura-residence/AuraInvestmentModelSection";
import { Cota365SmartEcosystemSection } from "./cota-365/SmartEcosystemSection";
import { LeadCaptureModal } from "./park-view-residence/LeadCaptureModal";
import { ParkViewUnitMixSection } from "./park-view-residence/UnitMixSection";

export type GeneratedLandingSectionComponent = ComponentType<{
  development: Development;
}>;

/**
 * Registro controlado de seções criadas pela IA no VS Code.
 *
 * Fluxo:
 * 1. Criar o componente em `src/components/landing/generated/[slug]/`.
 * 2. Importar o componente aqui.
 * 3. Registrar com uma chave sem o prefixo `custom:`.
 * 4. Usar `"custom:nome-da-chave"` no campo `sections` do draft.
 */
export const generatedSectionRegistry: Record<string, GeneratedLandingSectionComponent> = {
  "aura-investment-model": AuraInvestmentModelSection,
  "cota-365-smart-ecosystem": Cota365SmartEcosystemSection,
  "lead-capture-modal": LeadCaptureModal,
  "park-view-unit-mix": ParkViewUnitMixSection,
};
