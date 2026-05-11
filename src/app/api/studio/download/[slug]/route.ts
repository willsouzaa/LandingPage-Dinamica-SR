import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const marketingDir = path.join(process.cwd(), "conteudo-marketing", slug, "marketing");

  if (!fs.existsSync(marketingDir)) {
    return new NextResponse("Nenhum conteúdo gerado ainda para este empreendimento.", { status: 404 });
  }

  const zip = new JSZip();
  const pasta = zip.folder(slug) as JSZip;

  // Roteiro
  const roteiroPath = path.join(marketingDir, "roteiro.md");
  if (fs.existsSync(roteiroPath)) {
    pasta.file("roteiro.md", fs.readFileSync(roteiroPath));
  }

  // Imagens
  const postsDir = path.join(marketingDir, "posts", "instagram");
  if (fs.existsSync(postsDir)) {
    const imagens = pasta.folder("posts-instagram") as JSZip;
    fs.readdirSync(postsDir).forEach((file) => {
      imagens.file(file, fs.readFileSync(path.join(postsDir, file)));
    });
  }

  // Imagens da nova engine HTML/CSS
  const htmlEngineDir = path.join(marketingDir, "posts", "html-engine");
  if (fs.existsSync(htmlEngineDir)) {
    const imagens = pasta.folder("posts-html-engine") as JSZip;
    fs.readdirSync(htmlEngineDir).forEach((file) => {
      imagens.file(file, fs.readFileSync(path.join(htmlEngineDir, file)));
    });
  }

  // dados.json de referência
  const dadosPath = path.join(process.cwd(), "src", "data", "developments", slug, "dados.json");
  if (fs.existsSync(dadosPath)) {
    pasta.file("dados.json", fs.readFileSync(dadosPath));
  }

  const buffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });

  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      "Content-Type":        "application/zip",
      "Content-Disposition": `attachment; filename="${slug}-marketing.zip"`,
    },
  });
}
