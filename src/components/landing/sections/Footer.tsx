import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const company = {
  name: "San Remo Investimentos Imobiliários LTDA",
  displayName: "San Remo Investimentos Imobiliários",
  creci: "CRECI 9715-J",
  phone: "(48) 3244-3344",
  phoneHref: "+554832443344",
  email: "contato@sanremoimoveis.com.br",
  address: "Rua Coronel Pedro Demoro, 1595 - Loja 02, Florianópolis/SC",
};

const quickLinks = [
  { label: "Empreendimentos", href: "/" },
  { label: "Sobre nós", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

const legalLinks = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: company.name,
    alternateName: company.displayName,
    email: company.email,
    telephone: company.phoneHref,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Coronel Pedro Demoro, 1595 - Loja 02",
      addressLocality: "Florianópolis",
      addressRegion: "SC",
      addressCountry: "BR",
    },
  };

  return (
    <footer
      role="contentinfo"
      className="w-full border-t border-white/10 bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent),var(--color-secondary))]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-2">
            <Image
              src="/logo-Branco-sem-fundo.png"
              alt="San Remo Imóveis"
              width={320}
              height={112}
              className="w-56 h-auto object-contain"
            />
            <p className="text-sm leading-relaxed text-white/72">
              Imóveis de alto padrão e soluções em investimento imobiliário. Atendimento personalizado
              para compra, venda e investimento em apartamentos e terrenos em Florianópolis e região.
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              {company.creci}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Explorar</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/72 transition-colors hover:text-[var(--color-surface)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Contato</h4>
            <address className="space-y-3 not-italic">
              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-[var(--color-surface)]" />
                <a
                  href={`tel:${company.phoneHref}`}
                  className="text-sm text-white/72 transition-colors hover:text-[var(--color-surface)]"
                >
                  {company.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-[var(--color-surface)]" />
                <a
                  href={`mailto:${company.email}`}
                  className="text-sm text-white/72 transition-colors hover:text-[var(--color-surface)]"
                >
                  {company.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-[var(--color-surface)]" />
                <span className="text-sm text-white/72">{company.address}</span>
              </div>
            </address>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Fale com a San Remo</h4>
            <p className="mb-5 text-sm leading-relaxed text-white/72">
              Nosso time de consultores auxilia na seleção de imóveis ideais para moradia ou investimento,
              com soluções focadas em resultado.
            </p>
            <a
              href="#cadastro"
              aria-label="Ir para o formulário de cadastro"
              className="inline-flex items-center gap-2 bg-[var(--color-surface)] px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-primary)] transition hover:bg-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} {company.name} · {company.creci}
          </p>
          <nav aria-label="Links legais">
            <ul className="flex flex-col gap-2 md:flex-row md:gap-4">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[var(--color-surface)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
