"use client";

import { useActionState, useEffect, useState } from "react";
import { Clock3, MessageCircle, X } from "lucide-react";
import type { Development } from "@/types/development";
import { formatWhatsAppLink } from "@/lib/utils";
import { SafeImage } from "../../ui/SafeImage";
import { ClientPortal } from "../../ui/ClientPortal";
import { submitLead, type LeadFormState } from "@/lib/lead-actions";

const STORAGE_KEY = "sanremo-lead-capture-modal-seen";

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

export function LeadCaptureModal({ development }: { development: Development }) {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });
  const [state, action, pending] = useActionState(
    (prev: LeadFormState, formData: FormData) =>
      submitLead(development.slug, development.name, prev, formData),
    initialState,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORAGE_KEY) === development.slug) return;

    function showModal() {
      if (window.sessionStorage.getItem(STORAGE_KEY) === development.slug) return;
      window.sessionStorage.setItem(STORAGE_KEY, development.slug);
      setOpen(true);
    }

    const timer = window.setTimeout(showModal, 45000);

    function handleMouseOut(event: MouseEvent) {
      if (event.clientY <= 8 && !event.relatedTarget) {
        showModal();
      }
    }

    function handleScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable > 0.62) {
        showModal();
      }
    }

    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [development.slug]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

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

  if (!open) return null;

  const message = `${development.cta.message}\n\nQuero receber plantas, metragens e disponibilidade do ${development.name}.`;
  const whatsappUrl = formatWhatsAppLink(development.cta.whatsapp, message);

  function updateField(field: keyof typeof formValues, value: string) {
    setFormValues((current) => ({ ...current, [field]: value }));
  }

  return (
    <ClientPortal>
      <div
        className="fixed inset-0 z-[120] grid place-items-center bg-black/62 px-3 py-5 backdrop-blur-sm sm:px-4 sm:py-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-capture-modal-title"
      >
        <div className="relative grid max-h-[92dvh] w-full max-w-5xl overflow-y-auto bg-[#f7f4ed] text-[#24211d] shadow-[0_40px_120px_rgba(0,0,0,0.35)] md:grid-cols-[0.82fr_1.18fr]">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-10 grid size-10 place-items-center bg-white/90 text-[#24211d] shadow-sm transition hover:bg-white"
            aria-label="Fechar aviso"
          >
            <X size={18} />
          </button>

          <div className="relative min-h-[220px] bg-[#26231f] md:min-h-full">
            <SafeImage
              src={development.hero.buildingImage}
              alt={`Fachada do ${development.name}`}
              fill
              sizes="(min-width: 768px) 38vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/18 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="inline-flex items-center gap-2 bg-white/92 px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#24211d]">
                <Clock3 size={13} />
                {development.hero.badgeText}
              </p>
              <p className="mt-4 max-w-sm font-serif text-3xl font-black leading-[0.95] text-white sm:text-4xl">
                Receba plantas, metragens e disponibilidade.
              </p>
            </div>
          </div>

          <div className="px-5 py-8 sm:px-8 md:px-10">
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[var(--color-primary)]">
              Antes de sair
            </p>
            <h2
              id="lead-capture-modal-title"
              className="mt-4 font-serif text-4xl font-black leading-[0.9] text-[var(--color-secondary)] sm:text-5xl"
            >
              Quer receber o material completo do {development.name}?
            </h2>
            <p className="mt-4 text-sm leading-7 text-black/62">
              Preencha os dados e um consultor da San Remo envia catálogo, plantas, metragens
              e condições atualizadas pelo WhatsApp.
            </p>

            <form action={action} className="mt-6 grid gap-3">
              <input type="hidden" name="interest" value="modal-captacao" />

              <label className="grid gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-[#24211d]/72">
                Nome
                <input
                  name="name"
                  required
                  autoComplete="name"
                  value={formValues.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="h-11 border border-black/15 bg-white px-4 text-sm font-medium normal-case tracking-normal outline-none transition focus:border-[var(--color-primary)]"
                  placeholder="Seu nome completo"
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-[#24211d]/72">
                  E-mail
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formValues.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="h-11 border border-black/15 bg-white px-4 text-sm font-medium normal-case tracking-normal outline-none transition focus:border-[var(--color-primary)]"
                    placeholder="voce@email.com"
                  />
                </label>
                <label className="grid gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-[#24211d]/72">
                  Telefone
                  <input
                    name="whatsapp"
                    required
                    inputMode="numeric"
                    autoComplete="tel"
                    value={formValues.whatsapp}
                    onChange={(e) => updateField("whatsapp", formatPhone(e.target.value))}
                    className="h-11 border border-black/15 bg-white px-4 text-sm font-medium normal-case tracking-normal outline-none transition focus:border-[var(--color-primary)]"
                    placeholder="(48) 99999-9999"
                  />
                </label>
              </div>

              <label className="grid gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-[#24211d]/72">
                Mensagem
                <textarea
                  name="message"
                  value={formValues.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="min-h-24 resize-none border border-black/15 bg-white px-4 py-3 text-sm font-medium normal-case tracking-normal outline-none transition focus:border-[var(--color-primary)]"
                  placeholder="Quero receber catálogo, plantas e condições comerciais."
                />
              </label>

              <button
                type="submit"
                disabled={pending}
                className="mt-2 bg-[var(--color-secondary)] px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-[var(--color-primary)] disabled:opacity-60"
              >
                {pending ? "Enviando..." : "Receber catálogo no WhatsApp"}
              </button>

              {state.message ? (
                <p className={state.ok ? "text-sm font-bold text-green-700" : "text-sm font-bold text-red-700"}>
                  {state.message}
                </p>
              ) : null}
            </form>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={whatsappUrl}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--color-secondary)] transition hover:text-[var(--color-primary)]"
              >
                <MessageCircle size={15} />
                Falar direto
              </a>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-left text-xs font-bold uppercase tracking-[0.18em] text-black/40 transition hover:text-black/70"
              >
                Continuar navegando
              </button>
            </div>
          </div>
        </div>
      </div>
    </ClientPortal>
  );
}
