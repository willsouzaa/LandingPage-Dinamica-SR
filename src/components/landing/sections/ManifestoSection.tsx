"use client";

import { motion } from "framer-motion";
import type { Development } from "@/types/development";
import { SectionLabel } from "../ui/SectionLabel";
import { Reveal } from "../ui/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

const CARD_ICONS = [
  <svg key="pin" viewBox="0 0 24 24" fill="none" className="size-5 shrink-0 stroke-[var(--color-primary)]" strokeWidth={1.8}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="2.5" strokeLinecap="round" />
  </svg>,
  <svg key="layers" viewBox="0 0 24 24" fill="none" className="size-5 shrink-0 stroke-[var(--color-primary)]" strokeWidth={1.8}>
    <path d="M12 2 2 7l10 5 10-5-10-5Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="home" viewBox="0 0 24 24" fill="none" className="size-5 shrink-0 stroke-[var(--color-primary)]" strokeWidth={1.8}>
    <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="trend" viewBox="0 0 24 24" fill="none" className="size-5 shrink-0 stroke-[var(--color-primary)]" strokeWidth={1.8}>
    <path d="M22 7 13.5 15.5l-4-4L2 17" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 7h6v6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

export function ManifestoSection({ development }: { development: Development }) {
  const { essencia, cta } = development;

  if (!essencia) return null;

  const label = essencia.sectionLabel ?? "Essência";
  const ctaLabel = essencia.ctaLabel ?? cta.primaryLabel;

  return (
    <section
      id="essencia"
      className="bg-[var(--color-background)] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">

        <div className="mb-16 max-w-3xl">
          <SectionLabel>{label}</SectionLabel>

          <Reveal>
            <h2 className="mt-6 font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-black leading-[1.05] tracking-[-0.03em] text-[var(--color-secondary)]">
              {essencia.title}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
              {essencia.text}
            </p>
          </Reveal>
        </div>

        <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {essencia.cards.map((card, i) => (
            <Reveal key={card} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35, ease }}
                className="flex flex-col gap-4 border border-[var(--color-secondary)]/10 bg-[var(--color-surface)] p-6"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
                  {CARD_ICONS[i % CARD_ICONS.length]}
                </span>
                <p className="text-sm font-bold leading-snug text-[var(--color-text)]">
                  {card}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <motion.a
            href="#cadastro"
            whileHover={{ opacity: 0.88 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-3 bg-[var(--color-primary)] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white"
          >
            {ctaLabel}
            <svg viewBox="0 0 24 24" className="size-4 stroke-current" fill="none" strokeWidth={2}>
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </Reveal>

      </div>
    </section>
  );
}
