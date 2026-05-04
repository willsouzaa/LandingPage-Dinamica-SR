"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

type StickyHeaderProps = {
  logo: string;
  logoContrast?: "light" | "dark";
  brandName?: string;
  whatsapp?: string;
  whatsappMessage?: string;
};

const menuItems = [
  { label: "Início", href: "#hero" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Empreendimento", href: "#building-reveal" },
  { label: "Cadastro", href: "#cadastro" },
];

export function StickyHeader({
  logo,
  logoContrast = "light",
  brandName = "Empreendimento",
}: StickyHeaderProps) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  return (
    <>
      <motion.header
        animate={{
          backgroundColor: isScrolled ? "var(--color-surface)" : "transparent",
          borderColor: isScrolled ? "var(--color-secondary)" : "transparent",
        }}
        transition={{ duration: 0.28 }}
        className="fixed inset-x-0 top-0 z-50 border-b border-opacity-10 backdrop-blur-sm"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 text-[var(--color-secondary)] sm:px-6">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <Image
              src={logo}
              alt={brandName}
              width={132}
              height={44}
              priority
              className="h-8 w-auto max-w-[112px] object-contain sm:max-w-[132px] transition-[filter] duration-300"
              style={logoContrast === "dark" && !isScrolled ? { filter: "brightness(0) invert(1)" } : undefined}
            />
            <span className="h-8 w-px shrink-0 bg-[var(--color-secondary)]/20" aria-hidden="true" />
            <Image
              src={isScrolled ? "/san-remo-logo.png" : "/san-remo-logo1.png"}
              alt="San Remo Imóveis"
              width={132}
              height={44}
              priority
              className="h-8 w-auto max-w-[112px] object-contain sm:max-w-[132px] transition-opacity duration-300"
            />
          </div>
          <button
            type="button"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="grid size-10 shrink-0 place-items-center"
          >
            {isMenuOpen ? <X size={22} strokeWidth={2.2} /> : <Menu size={22} strokeWidth={2.2} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--color-secondary)]/72 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Menu principal"
              className="ml-auto flex h-full w-full max-w-sm flex-col bg-[var(--color-surface)] px-6 pb-8 pt-24 text-[var(--color-text)] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-primary)]">
                Navegação
              </p>
              <div className="mt-8 grid gap-1">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + index * 0.05 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="border-b border-[var(--color-text)]/10 py-5 font-serif text-3xl font-bold leading-none transition hover:text-[var(--color-primary)]"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto grid gap-4">
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                  Escolha uma seção ou fale com um consultor para receber os detalhes do empreendimento.
                </p>
                <a
                  href="#cadastro"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex justify-center bg-[var(--color-primary)] px-6 py-4 text-sm font-bold uppercase tracking-widest text-white"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
