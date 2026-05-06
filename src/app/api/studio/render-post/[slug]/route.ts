import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { generateMarketingPostSet, type MarketingPostData } from "@/marketing";
import type { MarketingImageType, MarketingTechnicalDatum } from "@/marketing/schemas/marketing-post.schema";

type DevelopmentData = {
  nome: string;
  status?: string;
  construtora?: string;
  localizacao?: {
    bairro?: string;
    cidade?: string;
    estado?: string;
  };
  hero?: {
    subtitulo?: string;
    fraseImpacto?: string;
    seloBadge?: string;
  };
  amenities?: string[];
  highlights?: string[];
  cta?: {
    botaoPrincipal?: string;
  };
  galeria?: Array<{
    arquivo: string;
    descricao?: string;
    categoria?: string;
  }>;
};

const categoryToImageType: Record<string, MarketingImageType> = {
  fachada: "fachada",
  lazer: "lazer",
  apartamento: "interior",
  localização: "entorno",
  localizacao: "entorno",
  planta: "planta",
  plantas: "planta",
  piscina: "piscina",
  gourmet: "gourmet",
  academia: "academia",
  natureza: "natureza",
};

function imageTypeFromGallery(item: { arquivo: string; categoria?: string }): MarketingImageType {
  const raw = `${item.categoria ?? ""} ${item.arquivo}`.toLowerCase();
  if (raw.includes("fachada")) return "fachada";
  if (raw.includes("rooftop")) return "rooftop";
  if (raw.includes("piscina")) return "piscina";
  if (raw.includes("gourmet")) return "gourmet";
  if (raw.includes("academia") || raw.includes("fitness")) return "academia";
  if (raw.includes("bosque") || raw.includes("natureza")) return "natureza";
  if (raw.includes("coworking")) return "coworking";
  if (raw.includes("localizacao") || raw.includes("localização")) return "entorno";
  return categoryToImageType[(item.categoria ?? "").toLowerCase()] ?? "lazer";
}

function themeForSlug(slug: string): string {
  if (slug.includes("parko")) return "nature_green";
  if (slug.includes("essencia")) return "gold_navy";
  if (slug.includes("brio")) return "terracotta_cream";
  return "minimal_light";
}

function technicalDataFromDevelopment(data: DevelopmentData): MarketingTechnicalDatum[] {
  const highlights = data.highlights ?? [];
  const technical: MarketingTechnicalDatum[] = [];

  const dorm = highlights.find((item) => /dorm|suíte|suite/i.test(item));
  if (dorm) technical.push({ type: "dormitorios", value: dorm.split(" ").slice(0, 4).join(" "), label: "tipologias" });

  const area = highlights.find((item) => /m²|m2/i.test(item));
  if (area) technical.push({ type: "area", value: area.split(" ").slice(0, 4).join(" "), label: "privativos" });

  const lazer = data.amenities?.find((item) => /piscina|lazer|bosque|rooftop/i.test(item));
  if (lazer) technical.push({ type: "lazer", value: lazer, label: "lazer" });

  if (!technical.length && data.localizacao?.bairro) {
    technical.push({ type: "localizacao", value: data.localizacao.bairro, label: data.localizacao.cidade });
  }

  return technical.slice(0, 3);
}

function buildPostData(slug: string, data: DevelopmentData): MarketingPostData {
  const images = (data.galeria ?? []).map((item, index) => ({
    src: `/empreendimentos/${slug}/catalogo/${item.arquivo}`,
    alt: item.descricao ?? item.arquivo,
    type: imageTypeFromGallery(item),
    priority: 100 - index,
    focalPoint: "center" as const,
  }));

  const hasNature = images.some((image) => image.type === "natureza");
  const goal = hasNature ? "lifestyle" : "lancamento";
  const bairro = data.localizacao?.bairro;
  const cidade = data.localizacao?.cidade;

  return {
    format: "feed",
    goal,
    empreendimento: {
      nome: data.nome,
      construtora: data.construtora,
      status: data.hero?.seloBadge ?? (data.status === "pre-launch" ? "PRÉ-LANÇAMENTO" : "LANÇAMENTO"),
      bairro,
      cidade,
      estado: data.localizacao?.estado,
    },
    copy: {
      headline: data.hero?.fraseImpacto ?? data.nome,
      headlineHighlight: hasNature ? "refúgio" : undefined,
      subtitle: data.hero?.subtitulo,
      cta: data.cta?.botaoPrincipal ?? "Solicite apresentação",
      badges: [data.hero?.seloBadge ?? "LANÇAMENTO"].filter(Boolean),
      bullets: (data.highlights ?? []).slice(0, 4),
      locationLine: [bairro, cidade].filter(Boolean).join(" | "),
    },
    technicalData: technicalDataFromDevelopment(data),
    images,
    visual: {
      theme: themeForSlug(slug),
      variant: hasNature ? "editorial" : "light",
    },
  };
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const dadosPath = path.join(process.cwd(), "src", "data", "developments", slug, "dados.json");

  if (!fs.existsSync(dadosPath)) {
    return NextResponse.json({ error: `dados.json não encontrado para "${slug}".` }, { status: 404 });
  }

  const dados = JSON.parse(fs.readFileSync(dadosPath, "utf-8")) as DevelopmentData;
  const postData = buildPostData(slug, dados);
  const results = await generateMarketingPostSet(postData, { outputSlug: slug, count: 4 });
  const primary = results[0];

  return NextResponse.json({
    ...primary,
    results,
    imagens: results.map((result) => {
      const pngBuffer = fs.readFileSync(result.pngPath);
      return {
        label: result.template,
        format: "Feed 1080x1350",
        b64: pngBuffer.toString("base64"),
        pngPath: result.pngPath,
        htmlPath: result.htmlPath,
      };
    }),
  });
}
