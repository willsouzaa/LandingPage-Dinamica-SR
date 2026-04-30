"use client";

import { motion, useInView } from "framer-motion";
import { useActionState, useEffect, useRef, useState } from "react";
import type { Development } from "@/types/development";
import { submitLead, type LeadFormState } from "@/lib/lead-actions";
import { formatWhatsAppLink } from "@/lib/utils";

type FinalCtaSectionProps = {
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

export function FinalCtaSection({ development }: FinalCtaSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });
  const [state, action, pending] = useActionState(
    (prev: LeadFormState, formData: FormData) =>
      submitLead(development.slug, development.name, prev, formData),
    initialState,
  );
  const [formValues, setFormValues] = useState({ name: "", email: "", whatsapp: "", message: "" });

  useEffect(() => {
    if (!state.ok) return;

    const whatsappMessage = [
      development.cta.message,
      "",
      `Nome: ${formValues.name}`,
      `Telefone: ${formValues.whatsapp}`,
      formValues.email ? `E-mail: ${formValues.email}` : "",
      formValues.message ? `Mensagem: ${formValues.message}` : "",
    ].filter(Boolean).join("\n");

    window.location.href = formatWhatsAppLink(development.cta.whatsapp, whatsappMessage);
  }, [development.cta.message, development.cta.whatsapp, formValues, state.ok]);

  function updateField(field: keyof typeof formValues, value: string) {
    setFormValues((current) => ({ ...current, [field]: value }));
  }

  return (
    <section
      id="cadastro"
      ref={ref}
      className="bg-[var(--color-surface)] px-5 py-20 text-[var(--color-text)] sm:px-6"
    >
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.92fr_1.08fr] md:items-start">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="md:sticky md:top-24"
        >
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[var(--color-primary)]">
            Cadastre-se
          </p>
          <h2 className="mt-5 font-serif text-[clamp(42px,8vw,92px)] font-black leading-[0.9]">
            As condições
            <br />
            de pré-lançamento
            <br />
            são limitadas
            <br />
            e exclusivas.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-muted)]">
            Garanta prioridade para receber informações, plantas e atualizações comerciais do {development.name}.
          </p>
        </motion.div>

        <motion.form
          action={action}
          initial={{ opacity: 0, y: 34, clipPath: "inset(10% 0 0 0)" }}
          animate={
            isInView
              ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }
              : { opacity: 0, y: 34, clipPath: "inset(10% 0 0 0)" }
          }
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-4 border border-[var(--color-text)]/10 bg-white/55 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.08)] backdrop-blur md:p-8"
        >
          <input type="hidden" name="interest" value="pre-lancamento" />

          <label className="grid gap-2 text-sm font-bold">
            Nome
            <input
              name="name"
              required
              autoComplete="name"
              value={formValues.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="h-12 border border-[var(--color-text)]/15 bg-white px-4 outline-none transition focus:border-[var(--color-primary)]"
              placeholder="Seu nome completo"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold">
              E-mail
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formValues.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="h-12 border border-[var(--color-text)]/15 bg-white px-4 outline-none transition focus:border-[var(--color-primary)]"
                placeholder="voce@email.com"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Telefone
              <input
                name="whatsapp"
                required
                inputMode="numeric"
                autoComplete="tel"
                value={formValues.whatsapp}
                onChange={(e) => updateField("whatsapp", formatPhone(e.target.value))}
                className="h-12 border border-[var(--color-text)]/15 bg-white px-4 outline-none transition focus:border-[var(--color-primary)]"
                placeholder="(48) 99999-9999"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-bold">
            Mensagem
            <textarea
              name="message"
              value={formValues.message}
              onChange={(e) => updateField("message", e.target.value)}
              className="min-h-32 resize-none border border-[var(--color-text)]/15 bg-white px-4 py-3 outline-none transition focus:border-[var(--color-primary)]"
              placeholder="Quero saber mais sobre as condições de pré-lançamento."
            />
          </label>

          <button
            type="submit"
            disabled={pending}
            className="mt-2 bg-[var(--color-secondary)] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[var(--color-primary)] disabled:opacity-60"
          >
            {pending ? "Enviando..." : "Enviar cadastro"}
          </button>

          {state.message ? (
            <p className={state.ok ? "text-sm font-bold text-green-700" : "text-sm font-bold text-red-700"}>
              {state.message}
            </p>
          ) : null}
        </motion.form>
      </div>
    </section>
  );
}
