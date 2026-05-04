import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-title)", "Georgia", "serif"],
        display: ["var(--font-title)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 24px 80px color-mix(in srgb, var(--color-primary) 32%, transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
