"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, BedDouble, Ruler, Car, Star, Phone } from "lucide-react";
import type { Development } from "@/types/development";
import { formatWhatsAppLink } from "@/lib/utils";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function CatalogoTemplate({ development }: { development: Development }) {
  const whatsappUrl = formatWhatsAppLink(development.cta.whatsapp, development.cta.message);

  const stats = [
    development.floorPlans?.[0]?.bedrooms && {
      icon: <BedDouble size={18} />,
      label: "Dormitórios",
      value: `${development.floorPlans[0].bedrooms}${development.floorPlans.length > 1 ? ` a ${development.floorPlans[development.floorPlans.length - 2]?.bedrooms ?? development.floorPlans[0].bedrooms}` : ""}`,
    },
    development.floorPlans?.[0]?.area && {
      icon: <Ruler size={18} />,
      label: "Metragem",
      value: `${development.floorPlans[0].area}${development.floorPlans.length > 1 ? ` a ${development.floorPlans[development.floorPlans.length - 1]?.area ?? ""}` : ""}`,
    },
    development.floorPlans?.[0]?.parking && {
      icon: <Car size={18} />,
      label: "Vagas",
      value: `${development.floorPlans[0].parking}${development.floorPlans.length > 1 ? ` a ${development.floorPlans[development.floorPlans.length - 1]?.parking ?? ""}` : ""}`,
    },
    {
      icon: <MapPin size={18} />,
      label: "Bairro",
      value: development.location.neighborhood,
    },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string }[];

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)]">

      {/* ── Top bar ── */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[var(--color-text)]/10 bg-[var(--color-surface)]/90 px-4 py-3 backdrop-blur sm:px-6">
        <Link
          href={`/empreendimento/${development.slug}`}
          className="flex items-center gap-2 text-sm font-medium text-[var(--color-muted)] transition hover:text-[var(--color-primary)]"
        >
          <ArrowLeft size={16} />
          Voltar
        </Link>

        <Image
          src={development.brand.logo}
          alt={development.brand.name}
          width={120}
          height={40}
          className="h-8 w-auto object-contain"
        />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 bg-[var(--color-primary)] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:opacity-90 sm:flex"
        >
          <Phone size={13} />
          Falar agora
        </a>
      </header>

      {/* ── Hero ── */}
      <div className="relative h-[55vh] min-h-[360px] overflow-hidden bg-[var(--color-secondary)]">
        {development.hero.backgroundImage && (
          <Image
            src={development.hero.backgroundImage}
            alt={development.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-10 sm:px-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-2 text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-primary)]"
          >
            {development.hero.badgeText}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-serif text-[clamp(2.5rem,8vw,6rem)] font-black leading-none text-white"
          >
            {development.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base"
          >
            {development.hero.subtitle}
          </motion.p>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="border-b border-[var(--color-text)]/10 bg-[var(--color-secondary)] text-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 px-4 py-5 text-center">
              <span className="text-[var(--color-primary)]">{stat.icon}</span>
              <span className="text-xs text-white/50">{stat.label}</span>
              <span className="text-sm font-bold">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 sm:px-6">

        {/* ── Destaques ── */}
        <section>
          <Reveal>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">Por que escolher</p>
            <h2 className="font-serif text-3xl font-black sm:text-4xl">Diferenciais do empreendimento</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {development.highlights.map((item, i) => (
              <Reveal key={item} delay={i * 0.07}>
                <div className="flex items-start gap-3 rounded-xl border border-[var(--color-text)]/10 bg-white/60 p-5 shadow-sm">
                  <Star size={14} className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Galeria ── */}
        {development.gallery.length > 0 && (
          <section>
            <Reveal>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">Imagens</p>
              <h2 className="font-serif text-3xl font-black sm:text-4xl">Galeria</h2>
            </Reveal>
            <div className="mt-8 columns-1 gap-3 sm:columns-2 lg:columns-3">
              {development.gallery.map((img, i) => (
                <Reveal key={img.src} delay={i * 0.06} className="mb-3 break-inside-avoid">
                  <div className="group relative overflow-hidden rounded-xl">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    {img.category && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">{img.category}</p>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ── Fachada + apartamento ── */}
        <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative aspect-[3/4] overflow-hidden rounded-2xl">
            <Image
              src={development.hero.buildingImage}
              alt={`Fachada do ${development.name}`}
              fill
              sizes="(min-width: 1024px) 50vw, 92vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">Interior</p>
            <h2 className="font-serif text-3xl font-black sm:text-4xl">Detalhes do apartamento</h2>
            <ul className="mt-6 space-y-3">
              {development.apartmentFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
                  {feature}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ── Plantas ── */}
        {development.floorPlans && development.floorPlans.length > 0 && (
          <section>
            <Reveal>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">Opções</p>
              <h2 className="font-serif text-3xl font-black sm:text-4xl">Plantas</h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {development.floorPlans.map((plan, i) => (
                <Reveal key={plan.name} delay={i * 0.08}>
                  <div className="overflow-hidden rounded-xl border border-[var(--color-text)]/10 bg-white shadow-sm">
                    {plan.image && (
                      <div className="relative aspect-[4/3] bg-[var(--color-surface)]">
                        <Image
                          src={plan.image}
                          alt={plan.name}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 92vw"
                          className="object-contain p-4"
                        />
                      </div>
                    )}
                    <div className="border-t border-[var(--color-text)]/10 p-4">
                      <p className="font-bold">{plan.name}</p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-muted)]">
                        {plan.area && <span><strong>{plan.area}</strong> área</span>}
                        {plan.bedrooms && <span><strong>{plan.bedrooms}</strong> dorm.</span>}
                        {plan.suites && <span><strong>{plan.suites}</strong> suíte(s)</span>}
                        {plan.parking && <span><strong>{plan.parking}</strong> vaga(s)</span>}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ── Lazer ── */}
        {development.amenities.length > 0 && (
          <section>
            <Reveal>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">Infraestrutura</p>
              <h2 className="font-serif text-3xl font-black sm:text-4xl">Lazer e comodidades</h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {development.amenities.map((amenity, i) => (
                <Reveal key={amenity} delay={i * 0.04}>
                  <div className="rounded-lg border border-[var(--color-text)]/10 bg-white/70 px-4 py-3 text-center text-sm font-medium shadow-sm">
                    {amenity}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ── Localização ── */}
        <section className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">Onde fica</p>
            <h2 className="font-serif text-3xl font-black sm:text-4xl">Localização</h2>
            <p className="mt-3 text-[var(--color-muted)]">
              {development.location.address && `${development.location.address} — `}
              {development.location.neighborhood}, {development.location.city} / {development.location.state}
            </p>
            <ul className="mt-6 space-y-3">
              {development.location.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm leading-relaxed">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>

          {development.hero.backgroundImage && (
            <Reveal delay={0.1} className="relative aspect-video overflow-hidden rounded-2xl lg:aspect-[4/3]">
              <Image
                src={development.hero.backgroundImage}
                alt="Localização aérea"
                fill
                sizes="(min-width: 1024px) 50vw, 92vw"
                className="object-cover"
              />
            </Reveal>
          )}
        </section>

        {/* ── CTA ── */}
        <Reveal>
          <div className="rounded-2xl bg-[var(--color-secondary)] px-6 py-12 text-center text-white sm:px-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">Garanta sua unidade</p>
            <h2 className="mt-4 font-serif text-3xl font-black sm:text-5xl">
              Pronto para conhecer o {development.name}?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60">
              Fale com um consultor e receba todas as informações, condições de pré-lançamento e prioridade no atendimento.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--color-primary)] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:opacity-90"
              >
                <Phone size={14} />
                {development.cta.secondaryLabel ?? "Falar com consultor"}
              </a>
              <Link
                href={`/empreendimento/${development.slug}#cadastro`}
                className="inline-flex items-center border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                {development.cta.primaryLabel}
              </Link>
            </div>
          </div>
        </Reveal>

      </div>

      {/* ── Footer simples ── */}
      <footer className="border-t border-[var(--color-text)]/10 px-4 py-6 text-center text-xs text-[var(--color-muted)] sm:px-6">
        © {new Date().getFullYear()} {development.brand.name} · Todos os direitos reservados
      </footer>
    </div>
  );
}
