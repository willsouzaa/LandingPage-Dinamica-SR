"use client";

import { useEffect, useCallback } from "react";
import { SafeImage } from "./SafeImage";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryImage } from "@/types/development";
import { ClientPortal } from "./ClientPortal";

type GalleryLightboxProps = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function GalleryLightbox({ images, index, onClose, onPrev, onNext }: GalleryLightboxProps) {
  const image = images[index];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <ClientPortal>
      <AnimatePresence>
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-6"
          onClick={onClose}
        >
          {/* Imagem */}
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[min(78dvh,760px)] w-full max-w-6xl rounded-2xl border border-white/10 bg-black shadow-[0_30px_110px_rgba(0,0,0,0.55)]"
            onClick={(e) => e.stopPropagation()}
          >
            <SafeImage
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 960px, 94vw"
              quality={90}
              className="object-contain"
              priority
            />
          </motion.div>

        {/* Fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar galeria"
          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-sm transition hover:bg-white/20 sm:right-6 sm:top-6"
        >
          <svg viewBox="0 0 24 24" className="size-5 stroke-current" fill="none" strokeWidth={2}>
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        {/* Anterior */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Foto anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-sm transition hover:bg-white/20 sm:left-6"
          >
            <svg viewBox="0 0 24 24" className="size-5 stroke-current" fill="none" strokeWidth={2}>
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Próximo */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Próxima foto"
            className="absolute right-4 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-sm transition hover:bg-white/20 sm:right-6"
          >
            <svg viewBox="0 0 24 24" className="size-5 stroke-current" fill="none" strokeWidth={2}>
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Contador + legenda */}
        <div className="absolute bottom-5 left-1/2 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-center backdrop-blur">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50">
            {image.category}
          </p>
          <p className="text-xs text-white/30">
            {index + 1} / {images.length}
          </p>
        </div>
        </motion.div>
      </AnimatePresence>
    </ClientPortal>
  );
}
