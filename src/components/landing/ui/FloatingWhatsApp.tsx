"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true" className="size-7 shrink-0">
    <path
      fill="currentColor"
      d="M16.03 4C9.42 4 4.05 9.28 4.05 15.78c0 2.08.56 4.1 1.62 5.88L4 28l6.54-1.7a12.16 12.16 0 0 0 5.49 1.33C22.64 27.63 28 22.34 28 15.84C28 9.28 22.64 4 16.03 4Zm0 21.63c-1.8 0-3.55-.48-5.08-1.39l-.36-.21l-3.88 1.01l1.04-3.7l-.24-.38a9.7 9.7 0 0 1-1.48-5.18c0-5.39 4.49-9.78 10-9.78c5.52 0 10 4.39 10 9.84c0 5.4-4.48 9.79-10 9.79Zm5.49-7.31c-.3-.15-1.78-.86-2.06-.96c-.28-.1-.48-.15-.68.15c-.2.29-.78.95-.96 1.15c-.18.19-.35.22-.65.07c-.3-.15-1.27-.46-2.41-1.47a8.87 8.87 0 0 1-1.67-2.03c-.17-.3-.02-.46.13-.6c.13-.13.3-.35.45-.52c.15-.18.2-.3.3-.5c.1-.2.05-.37-.03-.52c-.07-.15-.68-1.61-.93-2.2c-.24-.58-.5-.5-.68-.51h-.58c-.2 0-.53.07-.8.37c-.28.3-1.05 1.01-1.05 2.47c0 1.45 1.08 2.86 1.23 3.06c.15.2 2.12 3.18 5.14 4.46c.72.3 1.28.49 1.71.62c.72.22 1.37.19 1.89.12c.58-.09 1.78-.72 2.03-1.41c.25-.69.25-1.28.18-1.41c-.08-.12-.28-.19-.58-.34Z"
    />
  </svg>
);

export function FloatingWhatsApp() {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setExpanded(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-5 z-50">
      {/* Anel de pulso */}
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[#F26522] opacity-25 animate-ping" />

      <motion.a
        href="#cadastro"
        aria-label="Receba o ebook em minutos"
        onHoverStart={() => setExpanded(true)}
        onHoverEnd={() => setExpanded(false)}
        animate={{ width: expanded ? "auto" : "3.5rem" }}
        transition={{ duration: 0.45, ease }}
        className="relative flex h-14 items-center gap-3 overflow-hidden rounded-full bg-[#F26522] px-4 text-[#003DA5] shadow-[0_8px_32px_rgba(242,101,34,0.4)] ring-1 ring-white/20"
      >
        <WhatsAppIcon />

        <AnimatePresence>
          {expanded && (
            <motion.span
              key="label"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.25, ease }}
              className="whitespace-nowrap pr-2 text-[11px] font-black uppercase tracking-[0.16em]"
            >
              Receba o ebook em minutos
            </motion.span>
          )}
        </AnimatePresence>
      </motion.a>
    </div>
  );
}
