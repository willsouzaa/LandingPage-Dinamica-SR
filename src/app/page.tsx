import Link from "next/link";
import { developments } from "@/data/developments";

export default function HomePage() {
  return (
    <main className="min-h-svh bg-[#0b0b0b] px-5 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-[#c89b5a]">
          Motor de Landings
        </p>
        <h1 className="max-w-3xl text-5xl font-black uppercase leading-none md:text-7xl">
          Campanhas premium para empreendimentos imobiliarios.
        </h1>
        <div className="mt-10 grid gap-4">
          {developments.map((development) => (
            <Link
              key={development.slug}
              href={`/empreendimento/${development.slug}`}
              className="flex items-center justify-between border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.08]"
            >
              <span className="text-xl font-bold">{development.name}</span>
              <span className="text-sm uppercase tracking-[0.16em] text-white/50">
                /empreendimento/{development.slug}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
