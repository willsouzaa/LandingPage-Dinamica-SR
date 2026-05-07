"use client";

import { SafeImage } from "../ui/SafeImage";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Images, MapPin, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import type { Development } from "@/types/development";
import { GalleryModal } from "../ui/GalleryModal";

type BuildingRevealSectionProps = {
  development: Development;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function BuildingRevealSection({ development }: BuildingRevealSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const featuredImages = development.gallery.slice(0, 4);

  const addressNumber =
    development.location.address?.match(/\d+/g)?.pop() ??
    development.name.match(/\d+/)?.[0] ??
    "";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [55, -55]);
  const decorY = useTransform(scrollYProgress, [0, 1], [-40, 70]);
  const numberY = useTransform(scrollYProgress, [0, 1], [80, -60]);
  const numberOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.8],
    [0.04, 0.08, 0.03],
  );

  return (
    <section
      id="building-reveal"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f4eee4] px-5 py-20 text-[#211d18] md:px-8 md:py-28"
    >
      {/* Background elegante */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.9),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.58),transparent_26%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

        <motion.div
          style={{ y: decorY, willChange: "transform" }}
          className="absolute -right-24 top-28 h-[420px] w-[420px] rounded-full border border-[var(--color-primary)]/15"
        />

        <motion.div
          style={{ y: decorY, willChange: "transform" }}
          className="absolute -left-24 bottom-24 h-[320px] w-[320px] rounded-full bg-[var(--color-primary)]/10 blur-[90px]"
        />
      </div>

      {/* Número editorial sutil */}
      {addressNumber && (
        <motion.div
          style={{ y: numberY, opacity: numberOpacity, willChange: "transform, opacity" }}
          className="pointer-events-none absolute right-4 top-8 z-0 font-serif text-[34vw] font-light leading-none tracking-[-0.12em] text-[#211d18] lg:right-14 lg:text-[24vw]"
        >
          {addressNumber}
        </motion.div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Cabeçalho editorial */}
        <div className="mb-12 flex flex-col gap-6 border-b border-[#211d18]/10 pb-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#211d18]/10 bg-white/55 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#211d18]/60 shadow-sm backdrop-blur-xl">
              <Sparkles size={13} className="text-[var(--color-primary)]" />
              {development.hero.badgeText}
            </div>

            <h2 className="font-serif text-[clamp(3rem,7vw,7rem)] font-light leading-[0.92] tracking-[-0.06em] text-[#211d18]">
              {development.hero.impactPhrase ?? development.hero.title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, delay: 0.12, ease }}
            className="max-w-md lg:pb-2"
          >
            <p className="text-sm leading-7 text-[#211d18]/62 sm:text-base">
              {development.hero.subtitle}
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[#211d18]/45">
              <MapPin size={15} className="text-[var(--color-primary)]" />
              <span>{development.location.address}</span>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          {/* Coluna esquerda */}
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease }}
            className="relative overflow-hidden rounded-[2rem] border border-[#211d18]/10 bg-[#211d18] p-7 text-white shadow-[0_28px_90px_rgba(32,25,18,0.20)] sm:p-9"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.14),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between gap-12">
              <div>
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.34em] text-white/45">
                  Experiência do projeto
                </p>

                <h3 className="max-w-lg font-serif text-4xl font-light leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl">
                  Arquitetura, localização e detalhes pensados para valorizar o morar.
                </h3>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/58">
                  Explore as imagens, conheça os ambientes e veja como o empreendimento se apresenta em cada detalhe.
                </p>
              </div>

              <div className="space-y-5">
                <button
                  type="button"
                  onClick={() => setGalleryOpen(true)}
                  className="group inline-flex w-full items-center justify-between rounded-full bg-white px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#211d18] transition duration-300 hover:scale-[1.015] hover:bg-white/92 sm:w-auto sm:min-w-[310px]"
                >
                  Ver galeria completa

                  <span className="grid size-10 place-items-center rounded-full bg-[var(--color-primary)] text-white transition duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </span>
                </button>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/38">
                      Projeto
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {development.name}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/38">
                      Galeria
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {development.gallery.length} imagens
                    </p>
                  </div>

                  <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl sm:col-span-1">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/38">
                      Destaque
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      Fachada e áreas comuns
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Coluna direita */}
          <div className="space-y-6">
            {/* Imagem principal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 36 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.95, ease }}
              className="relative h-[380px] overflow-hidden rounded-[2rem] border border-[#211d18]/10 bg-white shadow-[0_30px_100px_rgba(32,25,18,0.16)] sm:h-[460px] lg:h-[520px]"
            >
              <motion.div
                style={{ y: imageY, willChange: "transform" }}
                className="absolute inset-[-8%]"
              >
                <SafeImage
                  src={development.hero.buildingImage}
                  alt={`Fachada do ${development.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 56vw, 94vw"
                  className="object-cover"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#211d18]/82 via-[#211d18]/8 to-transparent" />

              <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/14 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-white backdrop-blur-xl">
                Fachada
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="max-w-xl">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.34em] text-white/55">
                    Primeira impressão
                  </p>

                  <h3 className="font-serif text-3xl font-light leading-tight tracking-[-0.04em] text-white sm:text-5xl">
                    Uma presença urbana com assinatura visual marcante.
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Galeria inferior */}
            {featuredImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, delay: 0.12, ease }}
                className="grid grid-cols-2 gap-4 sm:grid-cols-4"
              >
                {featuredImages.map((img, index) => (
                  <button
                    key={`${img.src}-${index}`}
                    type="button"
                    onClick={() => setGalleryOpen(true)}
                    className="group relative h-36 overflow-hidden rounded-3xl border border-[#211d18]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(32,25,18,0.16)] sm:h-44"
                  >
                    <SafeImage
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 220px, 45vw"
                      quality={85}
                      className="object-cover transition duration-[1200ms] ease-out group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#211d18]/70 via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                      <div className="mb-2 flex items-center gap-2 text-white/70">
                        <Images size={13} />
                        <span className="text-[9px] font-semibold uppercase tracking-[0.22em]">
                          {img.category ?? "Imagem"}
                        </span>
                      </div>
                    </div>

                    <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/15" />
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <GalleryModal
        images={development.gallery}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
    </section>
  );
}