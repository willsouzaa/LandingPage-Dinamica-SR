import { NextRequest, NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";
import fs from "fs";
import path from "path";

// "low" = mais barato e rápido | "medium" = equilíbrio | "high" = máxima qualidade
const IMAGE_QUALITY = "medium" as const;

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const dadosPath   = path.join(process.cwd(), "src", "data", "developments", slug, "dados.json");
  const imagensPath = path.join(process.cwd(), "conteudo-marketing", slug, "dados", "imagens.json");

  if (!fs.existsSync(dadosPath)) {
    return NextResponse.json(
      { error: `dados.json não encontrado para "${slug}".` },
      { status: 404 }
    );
  }
  if (!fs.existsSync(imagensPath)) {
    return NextResponse.json(
      { error: `Pasta de marketing não encontrada. Execute: npm run marketing ${slug}` },
      { status: 404 }
    );
  }

  const d       = JSON.parse(fs.readFileSync(dadosPath,   "utf-8"));
  const indice  = JSON.parse(fs.readFileSync(imagensPath, "utf-8"));
  const imgBase = path.join(process.cwd(), "conteudo-marketing", slug);

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // ─── Helpers ──────────────────────────────────────────────────────────────

  function resolverImagem(categoria: string, index = 0): string | null {
    const lista = indice[categoria] ?? [];
    const item  = lista[index];
    if (!item) return null;
    const fullPath = path.join(imgBase, item.arquivo);
    return fs.existsSync(fullPath) ? fullPath : null;
  }

  async function carregarFoto(filePath: string) {
    const buffer = fs.readFileSync(filePath);
    const ext    = path.extname(filePath).toLowerCase().replace(".", "");
    const mime   = ext === "webp" ? "image/webp" : ext === "png" ? "image/png" : "image/jpeg";
    return toFile(buffer, path.basename(filePath), { type: mime });
  }

  function montarPrompt(instrucaoPost: string): string {
    return instrucaoPost;
  }

  // ─── Dados do empreendimento ──────────────────────────────────────────────

  const nome    = d.nome    as string;
  const bairro  = d.localizacao.bairro as string;
  const cidade  = d.localizacao.cidade as string;
  const status  = d.status === "pre-launch" ? "PRÉ-LANÇAMENTO" : "LANÇAMENTO";
  const frase   = (d.hero.fraseImpacto ?? d.hero.subtitulo) as string;
  const cta     = d.cta.botaoPrincipal as string;
  const primary = d.tema.primary as string;

  // ─── Configuração dos posts ────────────────────────────────────────────────

  type PostConfig = {
    label:         string;
    format:        string;
    size:          "1024x1024" | "1024x1536" | "1536x1024";
    fotoCategoria: string;
    fotoIndex:     number;
    instrucao:     string;
  };

  const posts: PostConfig[] = [
    {
      label:         "Feed",
      format:        "Instagram Feed 4:5",
      size:          "1024x1536",
      fotoCategoria: "fachada",
      fotoIndex:     0,
      instrucao:
        `Gere um post de feed Instagram 4:5 de alto padrão para imóvel de luxo.
Use EXATAMENTE a foto enviada como imagem principal — não substitua o edifício.
- Nome: "${nome}" em tipografia serif elegante
- Headline de impacto: "${frase}"
- Badge de status: "${status}"
- Localização: "${bairro}, ${cidade}"
- CTA: "${cta}"
- Cor de destaque: ${primary}
Todo texto em português brasileiro. Nenhuma palavra em inglês visível.`,
    },
    // Story e Carrossel desativados — descomentar quando Feed estiver aprovado
    // {
    //   label:         "Story",
    //   format:        "Instagram Story 9:16",
    //   size:          "1024x1536",
    //   fotoCategoria: "lazer",
    //   fotoIndex:     0,
    //   instrucao: `...`,
    // },
    // {
    //   label:         "Carrossel",
    //   format:        "Instagram Square 1:1",
    //   size:          "1024x1024",
    //   fotoCategoria: "lazer",
    //   fotoIndex:     1,
    //   instrucao: `...`,
    // },
  ];

  // ─── Geração com gpt-image-1 ───────────────────────────────────────────────

  const results = await Promise.all(
    posts.map(async (post) => {
      const fotoPath = resolverImagem(post.fotoCategoria, post.fotoIndex)
        ?? resolverImagem("fachada", 0);

      const prompt = montarPrompt(post.instrucao);
      let b64 = "";

      console.log(`[gerar-imagem] ${post.label} | foto: ${fotoPath ?? "nenhuma"}`);

      try {
        if (fotoPath) {
          const imageFile = await carregarFoto(fotoPath);
          const response  = await openai.images.edit({
            model:   "gpt-image-1",
            image:   imageFile,
            prompt,
            size:    post.size,
            quality: IMAGE_QUALITY,
            n:       1,
          });
          b64 = response.data?.[0]?.b64_json ?? "";
        } else {
          const response = await openai.images.generate({
            model:   "gpt-image-1",
            prompt,
            size:    post.size,
            quality: IMAGE_QUALITY,
            n:       1,
          });
          b64 = response.data?.[0]?.b64_json ?? "";
        }

        console.log(`[gerar-imagem] ${post.label} | b64 length: ${b64.length}`);
      } catch (err: unknown) {
        const message = (err as { message?: string }).message ?? "Erro desconhecido";
        console.error(`[gerar-imagem] ${post.label} | ERRO:`, message);
        return { label: post.label, format: post.format, b64: null, error: message };
      }

      return { label: post.label, format: post.format, b64 };
    })
  );

  return NextResponse.json({ imagens: results });
}
