import type { Metadata } from "next";
import { SmoothScroll } from "@/components/landing/ui/SmoothScroll";
import "./globals.css";

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
    <html lang="pt-BR">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
