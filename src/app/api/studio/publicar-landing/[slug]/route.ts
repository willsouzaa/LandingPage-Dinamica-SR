import { NextRequest, NextResponse } from "next/server";
import { publishDevelopmentDraft } from "@/lib/landing-drafts";

export const dynamic = "force-dynamic";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const published = publishDevelopmentDraft(slug);

  if (!published) {
    return NextResponse.json(
      { error: `Draft não encontrado para "${slug}".` },
      { status: 404 },
    );
  }

  return NextResponse.json({
    ok: true,
    url: `/empreendimento/${slug}`,
    published,
  });
}
