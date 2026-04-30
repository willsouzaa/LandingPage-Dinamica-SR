"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Development } from "@/types/development";

type HeroEditorialLuxuryProps = {
  development: Development;
};

export function HeroEditorialLuxury({ development }: HeroEditorialLuxuryProps) {
  return (
    <section id="hero" className="relative isolate min-h-svh overflow-hidden bg-[var(--color-secondary)] px-5 pb-8 pt-20 text-white sm:px-6">
      <motion.div
        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
        animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-5 bottom-8 top-24 -z-10 overflow-hidden rounded-2xl sm:inset-x-6 md:left-[32vw]"
      >
        <Image
          src={development.hero.buildingImage}
          alt={`Imagem do ${development.name}`}
          fill
          priority
          sizes="(min-width: 768px) 68vw, 92vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-secondary)_0%,color-mix(in_srgb,var(--color-secondary)_72%,transparent)_34%,transparent_100%)]" />
      </motion.div>

      <div className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl items-end">
        <div className="max-w-xl pb-10">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-primary)]"
          >
            {development.location.neighborhood}, {development.location.city}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(56px,12vw,132px)] font-black uppercase leading-[0.86]"
          >
            {development.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.48 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-white/70"
          >
            {development.hero.subtitle}
          </motion.p>
          <motion.a
            href="#cadastro"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.68 }}
            className="mt-8 inline-flex border border-[var(--color-primary)] px-7 py-4 text-sm font-bold uppercase tracking-widest text-[var(--color-primary)] transition hover:bg-[var(--color-primary)] hover:text-white"
          >
            {development.cta.secondaryLabel ?? development.cta.primaryLabel}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
