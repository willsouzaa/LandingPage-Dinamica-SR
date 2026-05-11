import Link from "next/link";
import { developments } from "@/data/developments";
import { listDevelopmentDrafts, listPublishedDevelopments } from "@/lib/landing-drafts";

export default function AdminPage() {
  const drafts = listDevelopmentDrafts();
  const published = listPublishedDevelopments();
  const registeredSlugs = new Set(developments.map((development) => development.slug));
  const draftOnly = drafts.filter((draft) => !registeredSlugs.has(draft.development.slug));
  const publishedOnly = published.filter((development) => !registeredSlugs.has(development.slug));

  return (
    <main className="min-h-svh bg-[#0b0b0b] px-5 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-[#c89b5a]">
          Motor de Landings
        </p>
        <h1 className="max-w-3xl text-5xl font-black uppercase leading-none md:text-7xl">
          Campanhas premium para empreendimentos imobiliarios.
        </h1>

        {publishedOnly.length > 0 ? (
          <section className="mt-10">
            <h2 className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-emerald-300">
              Publicadas por IA
            </h2>
            <div className="grid gap-4">
              {publishedOnly.map((development) => (
                <Link
                  key={development.slug}
                  href={`/empreendimento/${development.slug}`}
                  className="flex flex-col gap-2 border border-emerald-300/20 bg-emerald-300/[0.06] p-5 transition hover:bg-emerald-300/[0.1] sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="text-xl font-bold">{development.name}</span>
                  <span className="text-sm uppercase tracking-[0.16em] text-emerald-100/60">
                    /empreendimento/{development.slug}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {draftOnly.length > 0 ? (
          <section className="mt-10">
            <h2 className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-yellow-300">
              Drafts para revisar
            </h2>
            <div className="grid gap-4">
              {draftOnly.map((draft) => (
                <Link
                  key={draft.development.slug}
                  href={`/studio/preview/${draft.development.slug}`}
                  className="flex flex-col gap-2 border border-yellow-300/20 bg-yellow-300/[0.06] p-5 transition hover:bg-yellow-300/[0.1] sm:flex-row sm:items-center sm:justify-between"
                >
                  <span>
                    <span className="block text-xl font-bold">{draft.development.name}</span>
                    <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-yellow-100/50">
                      {draft.validation.warnings.length} atenção(ões) · abrir preview
                    </span>
                  </span>
                  <span className="text-sm uppercase tracking-[0.16em] text-yellow-100/60">
                    /studio/preview/{draft.development.slug}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-10">
          <h2 className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-white/40">
            Cadastradas no projeto
          </h2>
          <div className="grid gap-4">
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
        </section>
      </div>
    </main>
  );
}
