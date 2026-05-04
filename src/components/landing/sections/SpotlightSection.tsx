"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { Development } from "@/types/development";

const ease = [0.22, 1, 0.36, 1] as const;

export function SpotlightSection({ development }: { development: Development }) {
  const { spotlight } = development;

  if (!spotlight) return null;

  return (
    <section className="overflow-hidden bg-[var(--color-surface)] text-[var(--color-text)]">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">

        {/* Conteúdo */}
        <div className="flex flex-col justify-center px-8 py-16 sm:px-12 lg:py-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease }}
            className="mb-5 text-[10px] font-bold uppercase tracking-[0.32em] text-[var(--color-primary)]"
          >
            Conveniência no seu endereço
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="font-serif text-[clamp(2.2rem,4.5vw,4rem)] font-black leading-[0.92] tracking-[-0.04em] text-[var(--color-secondary)]"
          >
            {spotlight.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-muted)]"
          >
            {spotlight.description}
          </motion.p>

          {spotlight.items && spotlight.items.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.22, ease }}
              className="mt-8 space-y-3"
            >
              {spotlight.items.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.28 + index * 0.07, ease }}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-[var(--color-primary)]"
                  />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          )}

          <motion.a
            href="#cadastro"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.5, ease }}
            className="mt-10 inline-flex w-fit bg-[var(--color-secondary)] px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[var(--color-primary)]"
          >
            Quero conhecer
          </motion.a>
        </div>

        {/* Imagem */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
          className="relative min-h-[360px] bg-[var(--color-surface)] lg:min-h-[640px]"
        >
          <Image
            src={spotlight.image}
            alt={spotlight.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[var(--color-surface)] opacity-0 lg:opacity-40" />
        </motion.div>

      </div>
    </section>
  );
}
