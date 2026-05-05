import type { DevelopmentTheme } from "@/types/theme";

// Para adicionar nova fonte: 1) importar em layout.tsx com next/font/google + CSS variable, 2) adicionar entrada aqui
const FONT_VAR_MAP: Record<string, string> = {
  "Inter": "var(--loaded-inter, Inter)",
  "Cormorant Garant": "var(--loaded-cormorant-garant, Georgia, serif)",
  "Cormorant Garamond": "var(--loaded-cormorant-garant, Georgia, serif)",
};

function resolveFont(name?: string): string {
  if (!name) return "var(--loaded-inter, Inter)";
  return FONT_VAR_MAP[name] ?? name;
}

export function themeToStyle(theme: DevelopmentTheme) {
  return {
    "--color-primary": theme.primary,
    "--color-secondary": theme.secondary,
    "--color-background": theme.background,
    "--color-surface": theme.surface,
    "--color-text": theme.text,
    "--color-muted": theme.muted,
    "--color-accent": theme.accent,
    "--font-title": resolveFont(theme.fontTitle),
    "--font-body": resolveFont(theme.fontBody),
  } as React.CSSProperties;
}
