"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Development } from "@/types/development";

const statusLabel: Record<string, string> = {
  "pre-launch": "Pré-Lançamento",
  launch: "Lançamento",
  ready: "Pronto para morar",
  "last-units": "Últimas Unidades",
  investment: "Investimento",
};

const fallbackManifesto =
  "É hora de viver com presença.\nÉ hora de dizer sim para tudo que pode ser vivido.";

type ManifestoLineProps = {
  paragraph: string;
  isFinal: boolean;
};

function ManifestoLine({ paragraph, isFinal }: ManifestoLineProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 38%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.38, 0.72, 1], [0.15, 1, 1, 0.3]);
  const x = useTransform(scrollYProgress, [0, 0.38], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.38, 0.72, 1], [0.97, 1, 1, 0.98]);

  return (
    <motion.p
      ref={ref}
      style={{ opacity, x, scale }}
      className={`origin-left leading-snug ${
        isFinal
          ? "font-bold text-[var(--color-primary)]"
          : "text-[var(--color-surface)]"
      }`}
    >
      {paragraph}
    </motion.p>
  );
}

export function ManifestoSection({ development }: { development: Development }) {
  const paragraphs = (development.manifesto ?? fallbackManifesto)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section
      id="manifesto"
      className="bg-[var(--color-secondary)] px-6 py-28 text-[var(--color-surface)]"
    >
      <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-[0.72fr_1.28fr] md:items-start">

        <div className="md:sticky md:top-28">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-primary)]">
            {statusLabel[development.status] ?? "Manifesto"}
          </p>
          <h2 className="mt-4 font-serif text-4xl font-black leading-none text-[var(--color-surface)] md:text-5xl">
            {development.name}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            {development.location.neighborhood}, {development.location.city}
          </p>
          <div className="mt-8 h-px w-10 bg-[var(--color-primary)]" />
        </div>

        <div className="space-y-8 font-serif text-2xl md:text-[1.75rem]">
          {paragraphs.map((paragraph, index) => (
            <ManifestoLine
              key={index}
              paragraph={paragraph}
              isFinal={index >= paragraphs.length - 2}
            />
          ))}

          <motion.a
            href="#cadastro"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex bg-[var(--color-primary)] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:opacity-90"
          >
            {development.cta.primaryLabel}
          </motion.a>
        </div>

      </div>
    </section>
  );
}
