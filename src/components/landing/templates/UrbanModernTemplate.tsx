import type { Development } from "@/types/development";
import { LaunchImpactTemplate } from "./LaunchImpactTemplate";

type TemplateProps = {
  development: Development;
};

export function UrbanModernTemplate({ development }: TemplateProps) {
  return <LaunchImpactTemplate development={development} />;
}
