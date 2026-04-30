"use client";

import { motion } from "framer-motion";

type AnimatedTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function AnimatedTitle({ children, className }: AnimatedTitleProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.h2>
  );
}
