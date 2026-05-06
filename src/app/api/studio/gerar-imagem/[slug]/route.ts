import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const dadosPath    = path.join(process.cwd(), "src", "data", "developments", slug, "dados.json");
  const imagensPath  = path.join(process.cwd(), "conteudo-marketing", slug, "dados", "imagens.json");
  const promptMdPath = path.join(process.cwd(), "prompt-gerar-imagem.md");

  if (!fs.existsSync(dadosPath)) {
    return NextResponse.json({ error: `dados.json não encontrado para "${slug}".` }, { status: 404 });
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

  const promptBase = fs.existsSync(promptMdPath)
    ? fs.readFileSync(promptMdPath, "utf-8")
    : "";

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // ─── Helpers ──────────────────────────────────────────────────────────────

  function resolverImagem(categoria: string, index = 0): string | null {
    const lista = indice[categoria] ?? [];
    const item  = lista[index];
    if (!item) return null;
    const fullPath = path.join(imgBase, item.arquivo);
    return fs.existsSync(fullPath) ? fullPath : null;
  }

  function getMime(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase().replace(".", "");
    if (ext === "webp") return "image/webp";
    if (ext === "png")  return "image/png";
    return "image/jpeg";
  }

  function montarPrompt(instrucaoPost: string): string {
    return `${promptBase}

---

## DADOS DO EMPREENDIMENTO

\`\`\`json
${JSON.stringify(d, null, 2)}
\`\`\`

---

## INSTRUÇÃO ESPECÍFICA DESTE POST

${instrucaoPost}`;
  }

  // Com foto real: Responses API (gpt-image-2 via image_generation tool)
  async function gerarComFoto(fotoPath: string, prompt: string, size: string): Promise<string> {
    const base64 = fs.readFileSync(fotoPath).toString("base64");
    const mime   = getMime(fotoPath);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resp = await (openai as any).responses.create({
      model: "gpt-5.5",
      input: [
        {
          role: "user",
          content: [
            { type: "input_image", image_url: `data:${mime};base64,${base64}` },
            { type: "input_text",  text: prompt },
          ],
        },
      ],
      tools: [{ type: "image_generation", action: "edit", size }],
    });

    return (resp.output as Array<{ type: string; result?: string }>)
      .find(o => o.type === "image_generation_call")
      ?.result ?? "";
  }

  // Sem foto: Images API direta
  async function gerarSemFoto(prompt: string, size: string): Promise<string> {
    const result = await openai.images.generate({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      model: "gpt-image-2-2026-04-21" as any,
      prompt,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      size: size as any,
    });
    return result.data?.[0]?.b64_json ?? "";
  }

  // ─── Dados do empreendimento ──────────────────────────────────────────────

  const nome   = d.nome as string;
  const bairro = d.localizacao.bairro as string;
  const cidade = d.localizacao.cidade as string;
  const status = d.status === "pre-launch" ? "PRÉ-LANÇAMENTO" : "LANÇAMENTO";
  const frase  = (d.hero.fraseImpacto ?? d.hero.subtitulo) as string;
  const cta    = d.cta.botaoPrincipal as string;
  const primary = d.tema.primary as string;

  // ─── Posts ────────────────────────────────────────────────────────────────

  type PostConfig = {
    label:         string;
    format:        string;
    size:          string;
    fotoCategoria: string;
    fotoIndex:     number;
    instrucao:     string;
  };

  const posts: PostConfig[] = [
    // ── ATIVO: 1 post para testes ──────────────────────────────────────────
    {
      label:         "Post Feed",
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

    // ── DESATIVADO: descomentar quando testes aprovados ────────────────────
    // {
    //   label:         "Story",
    //   format:        "Instagram Story 9:16",
    //   size:          "1024x1536",
    //   fotoCategoria: "lazer",
    //   fotoIndex:     0,
    //   instrucao:
    //     `Gere um Story Instagram 9:16 para imóvel de luxo.
    // Use EXATAMENTE esta foto de área de lazer como fundo — preserve o espaço real.
    // - Nome: "${nome}"
    // - Headline: "${(d.highlights?.[0] ?? "")}"
    // - Status: "${status} · ${bairro}, ${cidade}"
    // - CTA: "${cta} →"
    // - Cor de destaque: ${primary}
    // Todo texto em português brasileiro.`,
    // },
    // {
    //   label:         "Carrossel",
    //   format:        "Instagram Square 1:1",
    //   size:          "1024x1024",
    //   fotoCategoria: "lazer",
    //   fotoIndex:     2,
    //   instrucao:
    //     `Gere um slide de carrossel Instagram 1:1 para imóvel de luxo.
    // Use EXATAMENTE esta foto como destaque — preserve o espaço real.
    // - Nome: "${nome}"
    // - Amenidades: ${(d.amenities ?? []).slice(0, 4).join(", ")}
    // - Indicador de slide: "2 / 5 →"
    // - Cor de destaque: ${primary}
    // Todo texto em português brasileiro.`,
    // },
  ];

  // ─── Geração sem salvar em disco ─────────────────────────────────────────

  const results = await Promise.all(
    posts.map(async (post) => {
      const fotoPath = resolverImagem(post.fotoCategoria, post.fotoIndex)
        ?? resolverImagem("fachada", 0);

      const prompt = montarPrompt(post.instrucao);

      const b64 = fotoPath
        ? await gerarComFoto(fotoPath, prompt, post.size)
        : await gerarSemFoto(prompt, post.size);

      return { label: post.label, format: post.format, b64 };
    })
  );

  return NextResponse.json({ imagens: results });
}
