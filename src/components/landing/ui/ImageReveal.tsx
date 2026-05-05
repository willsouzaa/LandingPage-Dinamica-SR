"use client";

import { motion } from "framer-motion";
import { SafeImage } from "./SafeImage";

type ImageRevealProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
};

export function ImageReveal({ src, alt, className, sizes = "(min-width: 768px) 33vw, 90vw" }: ImageRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      <SafeImage src={src} alt={alt} fill sizes={sizes} quality={85} className="object-cover" />
    </motion.div>
  );
}
