import Link from "next/link";
import { developments } from "@/data/developments";
import { listDevelopmentDrafts } from "@/lib/landing-drafts";

const statusLabel: Record<string, string> = {
  "pre-launch": "Pré-lançamento",
  "launch":     "Lançamento",
  "ready":      "Pronto para morar",
  "last-units": "Últimas unidades",
  "investment": "Investimento",
};

const statusColor: Record<string, string> = {
  "pre-launch": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "launch":     "bg-green-500/10 text-green-400 border-green-500/20",
  "ready":      "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "last-units": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "investment": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function StudioPage() {
  const drafts = listDevelopmentDrafts();

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-white mb-1">
          Empreendimentos
        </h1>
        <p className="text-zinc-400 text-sm">
          Selecione um empreendimento para gerar roteiro e imagens de marketing.
        </p>
      </div>

      {drafts.length > 0 ? (
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Drafts gerados
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {drafts.map((draft) => (
              <div
                key={draft.development.slug}
                className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5"
              >
                <h3 className="font-semibold text-white">{draft.development.name}</h3>
                <p className="mt-1 text-xs text-zinc-500">{draft.development.slug}</p>
                <p className="mt-3 text-xs text-yellow-200">
                  {draft.validation.warnings.length} atenção(ões) · {draft.development.sections?.length ?? 0} seções
                </p>
                <Link
                  href={`/studio/preview/${draft.development.slug}`}
                  className="mt-4 inline-flex rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-white"
                >
                  Abrir preview →
                </Link>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {developments.map((dev) => (
          <div
            key={dev.slug}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-4 hover:border-zinc-600 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-white font-semibold text-base leading-tight">
                  {dev.name}
                </h2>
                <p className="text-zinc-500 text-xs mt-1">{dev.slug}</p>
              </div>
              <span
                className={`shrink-0 text-xs px-2 py-1 rounded-full border ${statusColor[dev.status] ?? "bg-zinc-700 text-zinc-300 border-zinc-600"}`}
              >
                {statusLabel[dev.status] ?? dev.status}
              </span>
            </div>

            <div className="text-zinc-500 text-xs space-y-1">
              <p>{dev.location.neighborhood}, {dev.location.city} — {dev.location.state}</p>
              <p>{dev.gallery.length} imagens · {dev.floorPlans?.length ?? 0} plantas</p>
            </div>

            <Link
              href={`/studio/${dev.slug}`}
              className="mt-auto w-full text-center bg-white text-zinc-900 text-sm font-medium py-2 rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Abrir Studio →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
