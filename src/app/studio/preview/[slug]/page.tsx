import Link from "next/link";
import { notFound } from "next/navigation";
import { LandingTemplateRenderer } from "@/components/landing/templates";
import { getDevelopmentDraft } from "@/lib/landing-drafts";
import { themeToStyle } from "@/lib/themes";
import { PublishLandingButton } from "./PublishLandingButton";

type PreviewPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LandingDraftPreviewPage({ params }: PreviewPageProps) {
  const { slug } = await params;
  const draft = getDevelopmentDraft(slug);

  if (!draft) {
    notFound();
  }

  return (
    <div className="relative left-1/2 -my-10 w-screen -translate-x-1/2">
      <div className="sticky top-0 z-[80] border-b border-yellow-400/20 bg-zinc-950/95 px-5 py-3 text-white backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
              Preview de draft
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              {draft.development.name} · {draft.validation.warnings.length} atenção(ões)
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/studio"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              Voltar ao Studio
            </Link>
            <PublishLandingButton slug={draft.development.slug} />
          </div>
        </div>
      </div>

      {draft.validation.warnings.length > 0 ? (
        <div className="border-b border-yellow-400/15 bg-yellow-400/10 px-5 py-3 text-sm text-yellow-100">
          <div className="mx-auto max-w-7xl">
            {draft.validation.warnings.join(" ")}
          </div>
        </div>
      ) : null}

      <div style={themeToStyle(draft.development.theme)}>
        <LandingTemplateRenderer development={draft.development} />
      </div>
    </div>
  );
}
