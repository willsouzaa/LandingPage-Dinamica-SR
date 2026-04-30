"use client";

import { motion } from "framer-motion";
import { Car, Cpu, Droplets, Fingerprint, KeyRound, Leaf, Lightbulb, Shield, Smartphone, Volume2, Wifi } from "lucide-react";
import type { Development } from "@/types/development";

const ease = [0.22, 1, 0.36, 1] as const;

const itemIcons: Record<string, React.ReactNode> = {
  "gerador": <Shield size={20} />,
  "reconhecimento facial": <Fingerprint size={20} />,
  "fechadura": <KeyRound size={20} />,
  "acústico": <Volume2 size={20} />,
  "led": <Lightbulb size={20} />,
  "cftv": <Cpu size={20} />,
  "água da chuva": <Droplets size={20} />,
  "carro elétrico": <Car size={20} />,
  "app": <Smartphone size={20} />,
  "wi-fi": <Wifi size={20} />,
  "wifi": <Wifi size={20} />,
};

function getIcon(label: string): React.ReactNode {
  const key = Object.keys(itemIcons).find((k) =>
    label.toLowerCase().includes(k),
  );
  return key ? itemIcons[key] : <Leaf size={20} />;
}

export function TechnologySection({ development }: { development: Development }) {
  const { technology } = development;
  if (!technology) return null;

  return (
    <section className="relative overflow-hidden bg-[var(--color-secondary)] px-5 py-20 text-white sm:px-6 lg:py-28">
      {/* Fundo decorativo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[var(--color-primary)]/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[var(--color-primary)]/8 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Cabeçalho */}
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease }}
              className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-[var(--color-primary)]"
            >
              Tecnologia & Sustentabilidade
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease }}
              className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] font-black leading-[0.9] tracking-[-0.04em]"
            >
              {technology.title}
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            className="lg:text-right"
          >
            <p className="max-w-md text-base leading-relaxed text-white/60 lg:ml-auto">
              {technology.subtitle}
            </p>
            <p className="mt-3 text-[10px] text-white/30">
              * Imagens meramente ilustrativas.
            </p>
          </motion.div>
        </div>

        {/* Grid de itens */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {technology.items.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.06, ease }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:border-[var(--color-primary)]/50 hover:bg-white/8"
            >
              <span className="text-[var(--color-primary)] transition group-hover:scale-110">
                {getIcon(item)}
              </span>
              <p className="text-sm font-medium leading-snug text-white/80">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
