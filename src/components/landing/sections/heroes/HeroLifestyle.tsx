"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Development } from "@/types/development";

type HeroLifestyleProps = {
  development: Development;
};

export function HeroLifestyle({ development }: HeroLifestyleProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.24, 0.72]);
  const lifestyleImage = development.gallery[1]?.src ?? development.hero.backgroundImage ?? development.hero.buildingImage;
  const lifestyleAlt = development.gallery[1]?.alt ?? `Lifestyle do ${development.name}`;

  return (
    <section id="hero" ref={sectionRef} className="relative isolate min-h-svh overflow-hidden bg-[var(--color-secondary)] text-white">
      <motion.div style={{ scale: imageScale }} className="absolute inset-0 -z-20">
        <Image
          src={lifestyleImage}
          alt={lifestyleAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 -z-10 bg-[var(--color-secondary)]" />

      <div className="mx-auto grid min-h-svh max-w-7xl items-end px-5 pb-10 pt-20 sm:px-6">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-primary)]">
              {development.hero.badgeText}
            </p>
            <h1 className="font-serif text-[clamp(52px,14vw,148px)] font-black uppercase leading-[0.86]">
              {development.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/76">
              {development.hero.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } },
            }}
            className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3"
          >
            {development.highlights.slice(0, 3).map((highlight) => (
              <motion.div
                key={highlight}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="border border-white/18 bg-white/10 p-4 text-xs font-bold uppercase tracking-[0.08em] backdrop-blur"
              >
                {highlight}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
