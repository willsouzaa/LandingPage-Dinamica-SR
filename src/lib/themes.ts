import type { DevelopmentTheme } from "@/types/theme";

export function themeToStyle(theme: DevelopmentTheme) {
  return {
    "--color-primary": theme.primary,
    "--color-secondary": theme.secondary,
    "--color-background": theme.background,
    "--color-surface": theme.surface,
    "--color-text": theme.text,
    "--color-muted": theme.muted,
    "--color-accent": theme.accent,
    "--font-title": theme.fontTitle ?? "Inter",
    "--font-body": theme.fontBody ?? "Inter",
  } as React.CSSProperties;
}
