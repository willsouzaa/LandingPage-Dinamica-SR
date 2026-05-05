import { BedDouble, Car, Ruler } from "lucide-react";
import { SafeImage } from "../ui/SafeImage";
import type { Development } from "@/types/development";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";

type FloorPlansSectionProps = {
  development: Development;
};

export function FloorPlansSection({ development }: FloorPlansSectionProps) {
  if (!development.floorPlans?.length) {
    return null;
  }

  return (
    <section className="bg-[var(--color-surface)] px-5 py-20 text-[var(--color-text)] md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Plantas</SectionLabel>
        <div className="grid gap-5 md:grid-cols-2">
          {development.floorPlans.map((plan, index) => (
            <Reveal
              key={plan.name}
              delay={Math.min(index * 0.05, 0.2)}
              className="overflow-hidden border border-[var(--color-text)]/15 bg-white/35"
            >
              {plan.image ? (
                <div className="relative aspect-[4/3] bg-white">
                  <SafeImage
                    src={plan.image}
                    alt={`Planta ${plan.name}`}
                    fill
                    sizes="(min-width: 768px) 45vw, 92vw"
                    className="object-contain p-4"
                  />
                </div>
              ) : null}
              <div className="p-6">
                <h3 className="font-display text-2xl font-black uppercase">{plan.name}</h3>
                <div className="mt-8 grid grid-cols-3 gap-3 text-sm font-bold text-[var(--color-muted)]">
                <span className="flex items-center gap-2">
                  <Ruler size={17} /> {plan.area ?? "Consultar"}
                </span>
                <span className="flex items-center gap-2">
                  <BedDouble size={17} /> {plan.bedrooms ?? "-"} dorm.
                </span>
                <span className="flex items-center gap-2">
                  <Car size={17} /> {plan.parking ?? "-"} vaga
                </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
