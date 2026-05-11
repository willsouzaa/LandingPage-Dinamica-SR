import { Building2, Home, Ruler, Sparkles } from "lucide-react";
import type { Development } from "@/types/development";
import { SafeImage } from "../../ui/SafeImage";

const unitTypes = [
  {
    label: "101 Garden",
    area: "60,10m²",
    description: "1 dormitório, área de serviço separada e terraço garden.",
    image: "/empreendimentos/park-view-residence/catalogo/planta-101-garden.webp",
  },
  {
    label: "102 a 802",
    area: "32,96m²",
    description: "Studio integrado com sacada, ideal para morar ou investir.",
    image: "/empreendimentos/park-view-residence/catalogo/planta-102-802-studio.webp",
  },
  {
    label: "201 Garden",
    area: "64,96m²",
    description: "1 dormitório com terraço amplo e área de serviço separada.",
    image: "/empreendimentos/park-view-residence/catalogo/planta-201-garden.webp",
  },
  {
    label: "301 a 801",
    area: "48,83m²",
    description: "1 dormitório com sacada, terraço e planta funcional.",
    image: "/empreendimentos/park-view-residence/catalogo/planta-301-801.webp",
  },
];

export function ParkViewUnitMixSection({ development }: { development: Development }) {
  return (
    <section className="bg-[#f7f4ed] px-5 py-20 text-[#26231f] sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.32em] text-[var(--color-primary)]">
              <Sparkles size={14} />
              16 unidades residenciais
            </p>
            <h2 className="mt-5 font-serif text-5xl font-black leading-[0.9] text-[var(--color-secondary)] sm:text-6xl lg:text-7xl">
              Um mix compacto, raro e comercialmente forte em Coqueiros.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="border border-black/10 bg-white/70 p-5">
              <Building2 className="mb-4 text-[var(--color-primary)]" size={22} />
              <p className="text-3xl font-black">Torre única</p>
              <p className="mt-2 text-sm leading-relaxed text-black/58">
                Poucas unidades, leitura boutique e endereço de alta demanda.
              </p>
            </div>
            <div className="border border-black/10 bg-white/70 p-5">
              <Home className="mb-4 text-[var(--color-primary)]" size={22} />
              <p className="text-3xl font-black">Studios</p>
              <p className="mt-2 text-sm leading-relaxed text-black/58">
                Plantas enxutas para morar bem ou compor portfólio de renda.
              </p>
            </div>
            <div className="border border-black/10 bg-white/70 p-5">
              <Ruler className="mb-4 text-[var(--color-primary)]" size={22} />
              <p className="text-3xl font-black">32 a 65m²</p>
              <p className="mt-2 text-sm leading-relaxed text-black/58">
                Opções garden, sacada, terraço e área de serviço separada.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {unitTypes.map((unit) => (
            <article
              key={unit.label}
              className="overflow-hidden border border-black/10 bg-white shadow-[0_24px_70px_rgba(22,18,12,0.08)]"
            >
              <div className="relative aspect-[4/4.5] bg-[#ece7dc]">
                <SafeImage
                  src={unit.image}
                  alt={`Planta ${unit.label} do ${development.name}`}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-black">{unit.label}</h3>
                  <span className="shrink-0 bg-[var(--color-secondary)] px-3 py-1.5 text-xs font-black text-white">
                    {unit.area}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-black/58">
                  {unit.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 border border-black/10 bg-[var(--color-secondary)] p-6 text-white md:grid-cols-[0.82fr_1.18fr] md:p-8">
          <div className="relative min-h-[260px] overflow-hidden bg-black/15">
            <SafeImage
              src="/empreendimentos/park-view-residence/catalogo/sala-comercial.webp"
              alt={`Sala comercial do ${development.name}`}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[var(--color-primary)]">
              Ativo no térreo
            </p>
              <h3 className="mt-4 font-serif text-4xl font-black leading-none md:text-5xl">
              Sala comercial de 125,19m² no hall de entrada.
            </h3>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
              Um espaço com mezanino, jardim e plataforma de elevação que reforça a vocação
              urbana do endereço, somando conveniência para moradores e potencial comercial
              para o empreendimento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
