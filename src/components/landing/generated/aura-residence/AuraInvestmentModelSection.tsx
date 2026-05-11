import { ArrowUpRight, BadgeDollarSign, CalendarClock, FileCheck2, Landmark, TrendingUp } from "lucide-react";
import type { Development } from "@/types/development";
import { SafeImage } from "../../ui/SafeImage";

const modelCards = [
  {
    title: "Preco de custo",
    text: "O empreendimento e apresentado em regime de administracao, conectando o comprador a uma oportunidade com logica de investimento.",
    icon: BadgeDollarSign,
  },
  {
    title: "SPE exclusiva",
    text: "A adesao acontece por uma sociedade de proposito especifico criada para viabilizar aquisicao do terreno e execucao da obra.",
    icon: Landmark,
  },
  {
    title: "Transparencia",
    text: "Custos, aportes, relatorios e assembleias fazem parte da governanca do modelo descrito no material comercial.",
    icon: FileCheck2,
  },
];

const timeline = [
  "Fechamento do grupo ate dezembro de 2025",
  "Pre-obra prevista em 12 meses",
  "Execucao prevista em 36 meses",
  "Entrega prevista para dezembro de 2029",
];

export function AuraInvestmentModelSection({ development }: { development: Development }) {
  return (
    <section className="bg-[#edf2ee] px-5 py-20 text-[#19251f] sm:px-6 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.32em] text-[var(--color-primary)]">
              <TrendingUp size={15} />
              Oportunidade de negocio
            </p>
            <h2 className="mt-5 font-serif text-5xl font-black leading-[0.9] text-[var(--color-secondary)] sm:text-6xl lg:text-7xl">
              A vista da Agronomica com racional de investimento.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-[#19251f]/68 lg:justify-self-end">
            O Aura combina localizacao Beira-Mar, arquitetura de alto desejo e modelo de
            construcao a preco de custo por SPE. A landing apresenta a oportunidade; plantas,
            memoriais e disponibilidade ficam para o atendimento comercial.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {modelCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className="border border-[#19251f]/10 bg-white p-6 shadow-[0_24px_70px_rgba(25,37,31,0.08)]">
                <span className="grid size-12 place-items-center rounded-full bg-[var(--color-secondary)] text-[var(--color-primary)]">
                  <Icon size={21} />
                </span>
                <h3 className="mt-6 text-2xl font-black text-[var(--color-secondary)]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#19251f]/60">
                  {card.text}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-5 grid overflow-hidden border border-[#19251f]/10 bg-[var(--color-secondary)] text-white lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[280px] bg-black/20 lg:min-h-[440px]">
            <SafeImage
              src="/empreendimentos/aura-residence/catalogo/cronograma-execucao.webp"
              alt={`Cronograma de execucao do ${development.name}`}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[var(--color-secondary)]/30" />
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.32em] text-[var(--color-primary)]">
              <CalendarClock size={15} />
              Cronograma previsto
            </p>
            <h3 className="mt-5 font-serif text-4xl font-black leading-[0.92] sm:text-5xl">
              Uma jornada clara para quem quer entrar cedo.
            </h3>
            <div className="mt-7 grid gap-3">
              {timeline.map((item, index) => (
                <div key={item} className="flex items-center gap-4 border border-white/10 bg-white/[0.04] p-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--color-primary)] text-xs font-black text-[var(--color-secondary)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-6 text-white/72">{item}</p>
                </div>
              ))}
            </div>
            <a
              href="#cadastro"
              className="mt-8 inline-flex w-full items-center justify-between gap-4 bg-white px-6 py-4 text-sm font-black uppercase tracking-widest text-[var(--color-secondary)] transition hover:bg-[var(--color-primary)] sm:w-fit sm:min-w-[330px]"
            >
              Receber detalhes da SPE
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
