"use client";

import { useActionState, useState } from "react";
import type { Development } from "@/types/development";
import { submitLead, type LeadFormState } from "@/lib/lead-actions";
import { formatWhatsAppLink } from "@/lib/utils";
import { SectionLabel } from "../ui/SectionLabel";

type LeadFormSectionProps = {
  development: Development;
};

const initialState: LeadFormState = {
  ok: false,
  message: "",
};

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function LeadFormSection({ development }: LeadFormSectionProps) {
  const [phone, setPhone] = useState("");
  const [state, action, pending] = useActionState(
    (prev: LeadFormState, formData: FormData) =>
      submitLead(development.slug, development.name, prev, formData),
    initialState,
  );
  const whatsappUrl = formatWhatsAppLink(
    development.cta.whatsapp,
    development.cta.message,
  );

  return (
    <section
      id="lead"
      className="bg-[var(--color-secondary)] px-5 py-20 text-white md:px-8 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start">
        <div>
          <SectionLabel>Contato</SectionLabel>
          <h2 className="font-display text-4xl font-black uppercase leading-none md:text-6xl">
            Receba o catálogo em primeira mão.
          </h2>
          <p className="mt-5 max-w-md text-white/65">
            Informe seus dados e um consultor especialista no empreendimento entra em contato.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-primary)] px-7 text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-secondary)]"
          >
            {development.cta.secondaryLabel ?? "Falar no WhatsApp"}
          </a>
        </div>

        <form action={action} className="grid gap-4 bg-white p-5 text-[var(--color-text)] md:p-8">
          <label className="grid gap-2 text-sm font-bold">
            Nome
            <input
              name="name"
              required
              autoComplete="name"
              className="h-12 border border-black/15 px-4 outline-none focus:border-[var(--color-primary)]"
              placeholder="Seu nome completo"
            />
          </label>

          <label className="grid gap-2 text-sm font-bold">
            WhatsApp
            <input
              name="whatsapp"
              required
              inputMode="numeric"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              className="h-12 border border-black/15 px-4 outline-none focus:border-[var(--color-primary)]"
              placeholder="(48) 99999-9999"
            />
          </label>

          <label className="grid gap-2 text-sm font-bold">
            E-mail
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="h-12 border border-black/15 px-4 outline-none focus:border-[var(--color-primary)]"
              placeholder="voce@email.com"
            />
          </label>

          <label className="grid gap-2 text-sm font-bold">
            Interesse
            <select
              name="interest"
              defaultValue="morar"
              className="h-12 border border-black/15 px-4 outline-none focus:border-[var(--color-primary)]"
            >
              <option value="morar">Quero morar</option>
              <option value="investir">Quero investir</option>
              <option value="corretor">Sou corretor</option>
            </select>
          </label>

          <button
            type="submit"
            disabled={pending}
            className="mt-2 h-12 rounded-full bg-[var(--color-secondary)] px-7 text-sm font-bold uppercase tracking-[0.12em] text-white disabled:opacity-60"
          >
            {pending ? "Enviando..." : development.cta.primaryLabel}
          </button>

          {state.message ? (
            <p className={state.ok ? "text-sm font-bold text-green-700" : "text-sm font-bold text-red-700"}>
              {state.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
