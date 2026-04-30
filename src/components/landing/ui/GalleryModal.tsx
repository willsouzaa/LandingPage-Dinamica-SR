"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { GalleryImage } from "@/types/development";

interface GalleryModalProps {
  images: GalleryImage[];
  isOpen: boolean;
  onClose: () => void;
}

export function GalleryModal({ images, isOpen, onClose }: GalleryModalProps) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setActive(null);
      return;
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (active !== null) setActive(null);
        else onClose();
      }
      if (active === null) return;
      if (e.key === "ArrowRight") setActive((i) => (i! + 1) % images.length);
      if (e.key === "ArrowLeft") setActive((i) => (i! - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, active, onClose, images.length]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const prev = () => setActive((i) => (i! - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i! + 1) % images.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-md"
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between px-5 py-4 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-primary)]">
              Galeria do projeto
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar galeria"
              className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Grid de fotos */}
          <AnimatePresence mode="wait">
            {active === null ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 overflow-y-auto px-5 pb-8 sm:px-8"
              >
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {images.map((img, index) => (
                    <motion.button
                      key={img.src}
                      type="button"
                      onClick={() => setActive(index)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.04 }}
                      className="group relative overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                    >
                      <div className="relative aspect-[4/3] bg-white/5">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          {img.category && (
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-primary)]">
                              {img.category}
                            </p>
                          )}
                          <p className="mt-0.5 text-xs leading-snug text-white/90">{img.alt}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* Visualização individual */
              <motion.div
                key="detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-1 flex-col overflow-hidden"
              >
                {/* Imagem principal */}
                <div className="relative flex-1">
                  <Image
                    src={images[active].src}
                    alt={images[active].alt}
                    fill
                    sizes="100vw"
                    priority
                    className="object-contain"
                  />

                  {/* Setas de navegação */}
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Foto anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur transition hover:border-white/40 hover:text-white sm:left-6"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Próxima foto"
                    className="absolute right-3 top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur transition hover:border-white/40 hover:text-white sm:right-6"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Descrição e contador */}
                <div className="shrink-0 border-t border-white/10 px-5 py-5 sm:px-8">
                  <div className="mx-auto flex max-w-3xl items-start justify-between gap-6">
                    <div>
                      {images[active].category && (
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-primary)]">
                          {images[active].category}
                        </p>
                      )}
                      <p className="mt-1 text-sm leading-relaxed text-white/80">
                        {images[active].alt}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-xs text-white/40">
                        {active + 1} / {images.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActive(null)}
                        className="text-xs font-bold uppercase tracking-widest text-white/50 transition hover:text-white"
                      >
                        Ver todas
                      </button>
                    </div>
                  </div>
                </div>

                {/* Miniaturas */}
                <div className="shrink-0 overflow-x-auto px-5 pb-5 sm:px-8">
                  <div className="flex gap-2">
                    {images.map((img, index) => (
                      <button
                        key={img.src}
                        type="button"
                        onClick={() => setActive(index)}
                        className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition ${
                          index === active
                            ? "ring-2 ring-[var(--color-primary)]"
                            : "opacity-50 hover:opacity-80"
                        }`}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
