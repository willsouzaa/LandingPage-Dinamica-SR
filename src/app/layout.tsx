import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { SmoothScroll } from "@/components/landing/ui/SmoothScroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--loaded-inter",
  display: "swap",
});

const cormorantGarant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--loaded-cormorant-garant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Motor de Landings Imobiliarias",
  description: "Sistema para gerar landing pages premium de empreendimentos imobiliarios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cormorantGarant.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
