import type { Development } from "@/types/development";
import { ImageReveal } from "../ui/ImageReveal";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";

type GallerySectionProps = {
  development: Development;
};

export function GallerySection({ development }: GallerySectionProps) {
  if (development.gallery.length === 0) {
    return null;
  }

  return (
    <section className="bg-[var(--color-secondary)] px-5 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Galeria</SectionLabel>
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="font-display text-4xl font-black uppercase leading-none md:text-6xl">
            Visual de campanha, desejo de visita.
          </h2>
          <p className="max-w-md text-white/65">
            Imagens grandes e editaveis para cada empreendimento, mantendo a landing com identidade propria.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {development.gallery.map((image, index) => (
            <Reveal
              key={image.src}
              delay={Math.min(index * 0.06, 0.24)}
              className={index === 0 ? "md:col-span-2" : ""}
            >
              <ImageReveal
                src={image.src}
                alt={image.alt}
                className={index === 0 ? "aspect-[4/5] md:aspect-[16/10]" : "aspect-[4/5]"}
                sizes={index === 0 ? "(min-width: 768px) 66vw, 90vw" : "(min-width: 768px) 33vw, 90vw"}
              />
              <p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-white/50">
                {image.category}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
