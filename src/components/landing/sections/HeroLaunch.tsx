"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SafeImage } from "../ui/SafeImage";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Development } from "@/types/development";
import { AnimatedBackgroundWord } from "../ui/AnimatedBackgroundWord";

type HeroLaunchProps = {
  development: Development;
};

gsap.registerPlugin(ScrollTrigger);

export function HeroLaunch({ development }: HeroLaunchProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      gsap.to(wordRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(buildingRef.current, {
        y: 30,
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
    <section id="hero" ref={sectionRef} className="relative min-h-svh overflow-hidden bg-[var(--color-secondary)]">
      <div className="relative h-[55svh] overflow-hidden bg-[var(--color-background)]">
        {development.hero.backgroundImage ? (
          <SafeImage
            src={development.hero.backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-75"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-background)_52%,transparent),color-mix(in_srgb,var(--color-primary)_48%,transparent))]" />
        <div ref={wordRef} className="absolute left-5 top-[22%] z-10 sm:left-8 md:left-[8vw]">
          <AnimatedBackgroundWord
            word={development.hero.backgroundWord}
            className="font-serif text-[clamp(80px,22vw,180px)] font-black uppercase leading-none text-[var(--color-secondary)]/25"
          />
        </div>
      </div>

      <div className="relative h-[45svh] bg-[var(--color-secondary)]" />

      <motion.div
        ref={buildingRef}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 top-[16svh] z-20 mx-auto h-[64svh] max-w-[min(82vw,720px)]"
      >
        <SafeImage
          src={development.hero.buildingImage}
          alt={`Fachada do ${development.name}`}
          fill
          priority
          sizes="(min-width: 768px) 720px, 82vw"
          className="object-contain object-bottom drop-shadow-[0_30px_55px_rgba(0,0,0,0.36)]"
        />
      </motion.div>
    </section>
  );
}
