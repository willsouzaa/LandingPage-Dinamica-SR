"use client";

import { SafeImage } from "../ui/SafeImage";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import type { Development } from "@/types/development";
import { GalleryModal } from "../ui/GalleryModal";

type BuildingRevealSectionProps = {
  development: Development;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function BuildingRevealSection({ development }: BuildingRevealSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const featuredImages = development.gallery.slice(0, 5);

  const addressNumber =
    development.location.address?.match(/\d+/g)?.pop() ??
    development.name.match(/\d+/)?.[0] ??
    "";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const numberY = useTransform(scrollYProgress, [0, 1], [120, -80]);
  const numberOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75], [0.08, 0.16, 0.06]);
  const orbY = useTransform(scrollYProgress, [0, 1], [-80, 120]);

  return (
    <section
      id="building-reveal"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#090909] px-4 py-20 text-white sm:px-6 lg:px-10 lg:py-28"
    >
      {/* Background artístico */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.10),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

        <motion.div
          style={{ y: orbY, willChange: "transform" }}
          className="absolute -right-32 top-20 h-[420px] w-[420px] rounded-full bg-[var(--color-primary)]/20 blur-[110px]"
        />
      </div>

      {/* Número editorial gigante */}
      {addressNumber && (
        <motion.div
          style={{ y: numberY, opacity: numberOpacity, willChange: "transform, opacity" }}
          className="pointer-events-none absolute left-1/2 top-20 z-0 -translate-x-1/2 text-[34vw] font-black leading-none tracking-[-0.14em] text-white"
        >
          {addressNumber}
        </motion.div>
      )}

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        {/* Conteúdo */}
        <div className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-white/70 backdrop-blur-xl"
          >
            <Sparkles size={13} className="text-[var(--color-primary)]" />
            {development.hero.badgeText}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, ease }}
            className="max-w-3xl text-[clamp(3rem,8vw,7.8rem)] font-light leading-[0.84] tracking-[-0.08em]"
          >
            {development.hero.impactPhrase ?? development.hero.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, delay: 0.18, ease }}
            className="mt-7 max-w-lg text-sm leading-7 text-white/58 sm:text-base"
          >
            {development.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={() => setGalleryOpen(true)}
              className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-black transition duration-300 hover:scale-[1.03]"
            >
              Explorar o projeto
              <span className="grid size-8 place-items-center rounded-full bg-black/10 transition duration-300 group-hover:translate-y-1">
                <ArrowDown size={16} />
              </span>
            </button>

            <div className="h-px w-24 bg-white/15" />

            <p className="text-xs uppercase tracking-[0.24em] text-white/45">
              {development.name}
            </p>
          </motion.div>
        </div>

        {/* Composição visual */}
        <div className="relative min-h-[620px] sm:min-h-[760px] lg:min-h-[820px]">
          {/* Imagem principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 48 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease }}
            className="absolute left-1/2 top-16 z-20 h-[520px] w-[82%] -translate-x-1/2 overflow-hidden rounded-[2.75rem] border border-white/15 bg-white/5 shadow-[0_40px_140px_rgba(0,0,0,0.65)] sm:h-[640px] lg:h-[700px]"
          >
            <motion.div style={{ y: heroY, willChange: "transform" }} className="absolute inset-[-10%]">
              <SafeImage
                src={development.hero.buildingImage}
                alt={`Fachada do ${development.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 90vw"
                className="object-cover"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/25" />

            <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.34em] text-[var(--color-primary)]">
                Fachada autoral
              </p>

              <h3 className="max-w-md text-2xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
                Uma presença urbana desenhada para ser lembrada.
              </h3>
            </div>
          </motion.div>

          {/* Cards flutuantes */}
          {featuredImages.map((img, index) => {
            const positions = [
              "left-0 top-0 h-44 w-40 sm:h-56 sm:w-52 lg:h-64 lg:w-56",
              "right-0 top-8 h-40 w-44 sm:h-52 sm:w-60 lg:h-60 lg:w-64",
              "left-2 bottom-24 h-44 w-52 sm:h-56 sm:w-72 lg:h-64 lg:w-80",
              "right-4 bottom-10 h-40 w-40 sm:h-52 sm:w-52 lg:h-56 lg:w-56",
              "left-1/2 bottom-0 h-32 w-56 -translate-x-1/2 sm:h-40 sm:w-72 lg:h-44 lg:w-80",
            ];

            const rotations = [-8, 7, 6, -6, 2];

            return (
              <motion.article
                key={img.src}
                initial={{
                  opacity: 0,
                  y: 56,
                  rotate: rotations[index] * 1.5,
                  scale: 0.88,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: rotations[index],
                  scale: 1,
                }}
                whileHover={{
                  y: -10,
                  rotate: rotations[index] * 0.45,
                  scale: 1.045,
                  zIndex: 50,
                }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.85,
                  delay: 0.15 + index * 0.1,
                  ease,
                }}
                style={{ willChange: "transform" }}
                className={`group absolute z-30 overflow-hidden rounded-[1.6rem] border border-white/15 bg-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl ${positions[index]}`}
              >
                <SafeImage
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 320px, 240px"
                  quality={85}
                  className="object-cover transition duration-[1200ms] ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  {img.category && (
                    <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-white/70">
                      {img.category}
                    </p>
                  )}
                </div>

                <div className="absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-white/10" />
              </motion.article>
            );
          })}

          {/* Molduras decorativas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: 8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 4 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.35, ease }}
            className="absolute right-[8%] top-[18%] z-10 h-[440px] w-[280px] rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm sm:h-[560px] sm:w-[360px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease }}
            className="absolute left-[10%] top-[24%] z-10 h-[420px] w-[260px] rounded-[2.5rem] border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/[0.035] backdrop-blur-sm sm:h-[520px] sm:w-[320px]"
          />
        </div>
      </div>

      <GalleryModal
        images={development.gallery}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
    </section>
  );
}
