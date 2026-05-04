"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { Development } from "@/types/development";

const ease = [0.22, 1, 0.36, 1] as const;

export function LocationSection({ development }: { development: Development }) {
  const { location } = development;

  if (!location.image) return null;

  return (
    <section
      id="localizacao"
      className="overflow-hidden bg-[var(--color-secondary)] text-white"
    >
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        {/* Imagem */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
          className="relative min-h-[360px] bg-[var(--color-secondary)] lg:min-h-[640px]"
        >
          <Image
            src={location.image}
            alt={`Localização do ${development.name} no ${location.neighborhood}`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--color-secondary)] opacity-0 lg:opacity-60" />
        </motion.div>

        {/* Conteúdo */}
        <div className="flex flex-col justify-center px-8 py-16 sm:px-12 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease }}
            className="mb-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.32em] text-[var(--color-primary)]"
          >
            <MapPin size={13} />
            {location.neighborhood} · {location.city}/{location.state}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="font-serif text-[clamp(2.4rem,5vw,4.5rem)] font-black leading-[0.9] tracking-[-0.04em]"
          >
            Boa localização
            <br />
            <span className="text-[var(--color-primary)]">
              no coração do {location.neighborhood}.
            </span>
          </motion.h2>

          {location.address && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.12, ease }}
              className="mt-5 text-sm text-white/50"
            >
              {location.address}
            </motion.p>
          )}

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: 0.2, ease }}
            className="mt-8 space-y-4"
          >
            {location.highlights.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: 0.25 + index * 0.07, ease }}
                className="flex items-start gap-3 text-sm leading-relaxed text-white/75"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <motion.a
            href="#cadastro"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.45, ease }}
            className="mt-10 inline-flex w-fit items-center gap-2 bg-[var(--color-primary)] px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:opacity-90"
          >
            Quero saber mais
          </motion.a>
        </div>
      </div>
    </section>
  );
}
