"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SafeImage } from "../../ui/SafeImage";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Development } from "@/types/development";

type HeroSideImpactProps = {
  development: Development;
};

gsap.registerPlugin(ScrollTrigger);

export function HeroSideImpact({ development }: HeroSideImpactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const impactPhrase =
    development.hero.impactPhrase ?? "Um novo endereço para viver o agora com presença.";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      gsap.to(imageRef.current, {
        scale: 1.08,
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(wordRef.current, {
        xPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative isolate min-h-svh overflow-hidden bg-[var(--color-secondary)] px-5 pt-20 text-white sm:px-6"
    >
      <div
        ref={wordRef}
        className="pointer-events-none absolute right-0 top-24 -z-10 font-serif text-[clamp(72px,20vw,190px)] font-black uppercase leading-none text-white/[0.06]"
      >
        {development.hero.backgroundWord}
      </div>

      <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl gap-8 pb-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, x: -42, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[50svh] overflow-hidden rounded-2xl bg-[var(--color-muted)] md:min-h-[76svh]"
        >
          <SafeImage
            src={development.hero.buildingImage}
            alt={`Fachada do ${development.name}`}
            fill
            priority
            sizes="(min-width: 768px) 52vw, 92vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_54%,var(--color-secondary)_110%)]" />
        </motion.div>

        <div className="pb-6 md:pb-0">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-primary)]"
          >
            {development.hero.badgeText}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-serif text-[clamp(58px,11vw,128px)] font-black uppercase leading-[0.84]"
          >
            {development.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.5 }}
            className="mt-6 max-w-md text-2xl font-light leading-tight text-white/88"
          >
            {impactPhrase}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.64 }}
            className="mt-5 max-w-md text-base leading-relaxed text-white/58"
          >
            {development.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.78 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#essencia"
              className="inline-flex justify-center bg-[var(--color-primary)] px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[var(--color-surface)] hover:text-[var(--color-secondary)]"
            >
              Descobrir
            </a>
            <a
              href="#cadastro"
              className="inline-flex justify-center border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              Falar agora
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
