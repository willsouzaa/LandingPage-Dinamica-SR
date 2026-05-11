import { BriefcaseBusiness, Dumbbell, GlassWater, ShoppingBag, Sparkles } from "lucide-react";
import type { Development } from "@/types/development";
import { SafeImage } from "../../ui/SafeImage";

const pillars = [
  {
    title: "Trabalho",
    text: "Coworking, Podcast 365 e Café 365 para transformar o térreo em extensão produtiva da rotina.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Saúde",
    text: "Fitness 365, Fitness Sky, Zen 365 e sauna seca para manter bem-estar sem deslocamento.",
    icon: Dumbbell,
  },
  {
    title: "Rotina",
    text: "Market 365, Delivery 365, Lavanderia 365, Smart Locker, Praça 365 e Pet Place.",
    icon: ShoppingBag,
  },
  {
    title: "Lazer",
    text: "Piscina adulto e infantil, gourmet, salão de festas, sport bar e sky lounge no rooftop.",
    icon: GlassWater,
  },
];

const images = [
  {
    src: "/empreendimentos/cota-365/catalogo/lobby-cafe.webp",
    alt: "Lobby 365 com café e áreas de conexão",
    label: "Lobby 365",
  },
  {
    src: "/empreendimentos/cota-365/catalogo/praca-365.webp",
    alt: "Praça 365 integrada à rotina",
    label: "Praça 365",
  },
  {
    src: "/empreendimentos/cota-365/catalogo/piscina-rooftop.webp",
    alt: "Piscina no rooftop do Cota 365",
    label: "Rooftop",
  },
];

export function Cota365SmartEcosystemSection({ development }: { development: Development }) {
  return (
    <section className="bg-[#f3f2ef] px-5 py-20 text-[#242424] sm:px-6 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.32em] text-[var(--color-primary)]">
              <Sparkles size={14} />
              Smart 365
            </p>
            <h2 className="mt-5 font-serif text-5xl font-black leading-[0.92] text-[var(--color-secondary)] sm:text-6xl lg:text-7xl">
              Uma estrutura que trabalha a favor do {development.name} todos os dias.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-black/62 lg:justify-self-end">
            O Cota 365 transforma áreas comuns em argumento de compra: produtividade, conveniência,
            saúde e lazer conectados em um ecossistema pensado para uso real, 365 dias por ano.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article key={pillar.title} className="border border-black/10 bg-white p-5 shadow-[0_22px_70px_rgba(0,0,0,0.06)]">
                <span className="grid size-11 place-items-center rounded-full bg-[var(--color-primary)] text-white">
                  <Icon size={19} />
                </span>
                <h3 className="mt-5 text-2xl font-black text-[var(--color-secondary)]">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/58">{pillar.text}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {images.map((image) => (
            <figure key={image.src} className="overflow-hidden border border-black/10 bg-white">
              <div className="relative aspect-[16/10] bg-black/5">
                <SafeImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="flex items-center justify-between px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-[var(--color-secondary)]">
                {image.label}
                <span className="text-[var(--color-primary)]">365</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-6 grid gap-4 border border-black/10 bg-[var(--color-secondary)] p-6 text-white md:grid-cols-4 md:p-7">
          <div>
            <p className="text-4xl font-black text-[var(--color-primary)]">1.500m²</p>
            <p className="mt-2 text-sm text-white/62">de área de lazer</p>
          </div>
          <div>
            <p className="text-4xl font-black text-[var(--color-primary)]">175</p>
            <p className="mt-2 text-sm text-white/62">unidades residenciais</p>
          </div>
          <div>
            <p className="text-4xl font-black text-[var(--color-primary)]">4</p>
            <p className="mt-2 text-sm text-white/62">lojas comerciais</p>
          </div>
          <div>
            <p className="text-4xl font-black text-[var(--color-primary)]">365</p>
            <p className="mt-2 text-sm text-white/62">dias de uso inteligente</p>
          </div>
        </div>
      </div>
    </section>
  );
}
