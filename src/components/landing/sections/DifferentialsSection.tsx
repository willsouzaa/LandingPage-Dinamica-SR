import type { Development } from "@/types/development";
import { AnimatedTitle } from "../ui/AnimatedTitle";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";

type DifferentialsSectionProps = {
  development: Development;
};

export function DifferentialsSection({ development }: DifferentialsSectionProps) {
  return (
    <section className="bg-[var(--color-secondary)] px-5 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionLabel>Diferenciais</SectionLabel>
          <AnimatedTitle className="font-display text-4xl font-black uppercase leading-none md:text-6xl">
            Um endereco pensado para viver melhor.
          </AnimatedTitle>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[...development.highlights, ...development.apartmentFeatures].map((item, index) => (
            <Reveal
              key={item}
              delay={Math.min(index * 0.035, 0.22)}
              className="group border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-[var(--color-accent)]/45 hover:bg-white/[0.07]"
            >
              <p className="text-lg font-bold text-white/88 transition group-hover:text-white">
                {item}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
