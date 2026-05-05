"use client";

import { SafeImage } from "../ui/SafeImage";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import type { Development, GalleryImage } from "@/types/development";

type AmenitiesSectionProps = {
  development: Development;
};

type LeisureSlide = GalleryImage & {
  title: string;
  copy: string;
};

function buildLeisureSlides(development: Development): LeisureSlide[] {
  const source = development.gallery.length > 0 ? development.gallery : [];

  return source.slice(0, 6).map((image, index) => {
    const title = image.category ?? `Experiência ${index + 1}`;

    return {
      ...image,
      title,
      copy:
        image.recommendedUse ??
        "Um espaço pensado para transformar rotina em pausa, encontro e bem-estar.",
    };
  });
}

export function AmenitiesSection({ development }: AmenitiesSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });
  const slides = useMemo(() => buildLeisureSlides(development), [development]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  return (
    <section
      id="amenities"
      ref={ref}
      className="overflow-hidden bg-[var(--color-secondary)] px-5 py-20 text-white sm:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-primary)]">
              Lazer e bem-estar
            </p>
            <h2 className="mt-4 font-serif text-4xl font-black leading-none md:text-6xl">
              Áreas de lazer completas
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-white/62 md:justify-self-end">
            Mostre cada ambiente como uma promessa comercial: receber melhor, treinar sem sair de casa, relaxar, trabalhar e viver com mais conveniência.
          </p>
        </div>

        <div className="isolate grid gap-4 md:gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] md:items-stretch">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-0 aspect-[4/5] min-w-0 overflow-hidden rounded-2xl bg-[var(--color-muted)] md:aspect-[16/10]"
          >
            <AnimatePresence mode="wait">
              {activeSlide ? (
                <motion.div
                  key={activeSlide.src}
                  initial={{ opacity: 0, x: 46, scale: 1.04 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -46, scale: 0.98 }}
                  transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <SafeImage
                    src={activeSlide.src}
                    alt={activeSlide.alt}
                    fill
                    sizes="(min-width: 768px) 62vw, 92vw"
                    className="object-cover"
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,var(--color-secondary)_118%)] md:bg-[linear-gradient(180deg,transparent_45%,var(--color-secondary)_118%)]" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 md:justify-end">
              {activeSlide ? (
                <div className="min-w-0 md:hidden">
                  <p className="truncate text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                    {activeSlide.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm font-light leading-snug text-white/82">
                    {activeSlide.copy}
                  </p>
                </div>
              ) : null}
              <span className="rounded-full border border-[var(--color-primary)] px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-primary)] backdrop-blur">
                {activeIndex + 1} / {Math.max(slides.length, 1)}
              </span>
            </div>
          </motion.div>

          <div className="relative z-10 flex min-w-0 flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-[var(--color-secondary)]/95 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] md:gap-8 md:p-8">
            <AnimatePresence mode="wait">
              {activeSlide ? (
                <motion.div
                  key={activeSlide.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45 }}
                >
                  <div className="hidden rounded-full border border-[var(--color-primary)] px-5 py-2 text-sm font-light text-[var(--color-primary)] md:inline-flex">
                    {activeSlide.title}
                  </div>
                  <h3 className="font-serif text-2xl font-black leading-none md:mt-6 md:text-4xl">
                    Viver melhor também acontece fora do apartamento.
                  </h3>
                  <p className="mt-4 hidden leading-relaxed text-white/62 md:block">
                    {activeSlide.copy}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:grid md:gap-2 md:overflow-visible md:px-0 md:pb-0">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`flex shrink-0 items-center justify-between rounded-full border px-4 py-2 text-left text-sm transition md:w-full md:rounded-none md:border-x-0 md:border-t-0 md:px-0 md:py-3 ${
                    index === activeIndex
                      ? "border-[var(--color-primary)] text-[var(--color-primary)] md:border-white/10"
                      : "border-white/10 text-white/58 hover:text-white md:border-white/10"
                  }`}
                >
                  <span>{slide.title}</span>
                  <span className="ml-4 text-xs md:ml-0">{String(index + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {development.amenities.slice(0, 9).map((amenity, index) => (
            <motion.div
              key={amenity}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.45, delay: 0.12 + index * 0.04 }}
              className="border border-white/10 px-4 py-4 text-sm font-light text-white/72"
            >
              • {amenity}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
