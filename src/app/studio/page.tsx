import Link from "next/link";
import { developments } from "@/data/developments";

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
