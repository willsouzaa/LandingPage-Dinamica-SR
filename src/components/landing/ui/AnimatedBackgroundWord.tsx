"use client";

import { motion } from "framer-motion";

type AnimatedBackgroundWordProps = {
  word: string;
  className?: string;
};

export function AnimatedBackgroundWord({
  word,
  className,
}: AnimatedBackgroundWordProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {word}
    </motion.div>
  );
}
