import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Marketing Studio — San Remo Imóveis",
  robots: "noindex",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo-Branco-sem-fundo.png"
              alt="San Remo"
              width={100}
              height={32}
              className="h-7 w-auto"
            />
            <span className="text-zinc-600 text-sm">|</span>
            <span className="text-zinc-300 text-sm font-medium tracking-wide">
              Marketing Studio
            </span>
          </div>
          <Link
            href="/admin"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ← Voltar ao admin
          </Link>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
