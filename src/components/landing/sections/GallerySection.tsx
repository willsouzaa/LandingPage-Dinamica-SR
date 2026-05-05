"use client";

import { useState } from "react";
import { SafeImage } from "../ui/SafeImage";
import { motion } from "framer-motion";
import type { Development } from "@/types/development";
import { GalleryLightbox } from "../ui/GalleryLightbox";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";

type GallerySectionProps = {
  development: Development;
};

export function GallerySection({ development }: GallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (development.gallery.length === 0) return null;

  const images = development.gallery;
  const total = images.length;

  const open = (i: number) => setActiveIndex(i);
  const close = () => setActiveIndex(null);
  const prev = () => setActiveIndex((i) => ((i ?? 0) - 1 + total) % total);
  const next = () => setActiveIndex((i) => ((i ?? 0) + 1) % total);

  return (
    <section className="bg-[var(--color-secondary)] px-5 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Galeria</SectionLabel>
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="font-display text-4xl font-black uppercase leading-none md:text-6xl">
            Visual de campanha,<br className="hidden md:block" /> desejo de visita.
          </h2>
          <p className="max-w-md text-white/65">
            Clique em qualquer imagem para abrir a galeria completa.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {images.map((image, index) => {
            const isFirst = index === 0;
            return (
              <Reveal
                key={image.src}
                delay={Math.min(index * 0.06, 0.24)}
                className={isFirst ? "md:col-span-2" : ""}
              >
                <motion.button
                  type="button"
                  onClick={() => open(index)}
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative block w-full overflow-hidden bg-black/40 ${isFirst ? "aspect-[4/5] md:aspect-[16/10]" : "aspect-[4/5]"}`}
                  aria-label={`Abrir ${image.alt}`}
                >
                  <SafeImage
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={isFirst ? "(min-width: 768px) 66vw, 90vw" : "(min-width: 768px) 33vw, 90vw"}
                    quality={85}
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* overlay com ícone de lupa */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-9 stroke-white opacity-0 drop-shadow-lg transition-opacity duration-300 group-hover:opacity-100"
                      fill="none"
                      strokeWidth={1.5}
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m21 21-4.35-4.35" strokeLinecap="round" />
                      <path d="M11 8v6M8 11h6" strokeLinecap="round" />
                    </svg>
                  </div>
                </motion.button>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-white/40">
                  {image.category}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>

      {activeIndex !== null && (
        <GalleryLightbox
          images={images}
          index={activeIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}
