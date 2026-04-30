import type { Development } from "@/types/development";
import { LaunchImpactTemplate } from "./LaunchImpactTemplate";

type TemplateProps = {
  development: Development;
};

export function BeachLifestyleTemplate({ development }: TemplateProps) {
  return <LaunchImpactTemplate development={development} />;
}
