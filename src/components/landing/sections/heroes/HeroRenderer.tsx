import type { Development } from "@/types/development";
import { HeroLaunch } from "../HeroLaunch";
import { HeroEditorialLuxury } from "./HeroEditorialLuxury";
import { HeroLifestyle } from "./HeroLifestyle";
import { HeroSideImpact } from "./HeroSideImpact";

type HeroRendererProps = {
  development: Development;
};

export function HeroRenderer({ development }: HeroRendererProps) {
  const variant = development.hero.variant ?? "split-campaign";

  if (variant === "editorial-luxury") {
    return <HeroEditorialLuxury development={development} />;
  }

  if (variant === "lifestyle") {
    return <HeroLifestyle development={development} />;
  }

  if (variant === "side-impact") {
    return <HeroSideImpact development={development} />;
  }

  return <HeroLaunch development={development} />;
}
