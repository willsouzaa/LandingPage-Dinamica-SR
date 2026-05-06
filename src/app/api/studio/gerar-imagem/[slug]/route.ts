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
  const catalogPath  = path.join(process.cwd(), "templates", "instagram", "catalog.json");
  const templatesDir = path.join(process.cwd(), "templates", "instagram", "feed");

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

  const catalog = fs.existsSync(catalogPath)
    ? JSON.parse(fs.readFileSync(catalogPath, "utf-8"))
    : { templates: [] };

  function lerTemplateHtml(templateId: string): string {
    const htmlPath = path.join(templatesDir, templateId, "template.html");
    return fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, "utf-8") : "";
  }

  const templatePorPost: Record<string, string> = {
    feed:      "feed-collage-dark",
    story:     "feed-hero-full",
    carrossel: "feed-split-clean",
  };

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

  function montarPrompt(templateId: string, instrucaoPost: string): string {
    const templateHtml = lerTemplateHtml(templateId);
    const catalogInfo  = (catalog.templates as Array<{ id: string; description: string }>)
      .map(t => `- ${t.id}: ${t.description}`)
      .join("\n");

    return `${promptBase}

---

## TEMPLATES DISPONÍVEIS

${catalogInfo}

---

## TEMPLATE SELECIONADO: ${templateId}

Use o HTML abaixo como referência visual de layout, hierarquia, paleta e tipografia.
Preserve a estrutura de zonas e o estilo visual definido.
A foto enviada é a imagem real do empreendimento — preserve-a como elemento principal.

\`\`\`html
${templateHtml}
\`\`\`

---

## DADOS DO EMPREENDIMENTO

\`\`\`json
${JSON.stringify(d, null, 2)}
\`\`\`

---

## INSTRUÇÃO ESPECÍFICA DESTE POST

${instrucaoPost}`;
  }

  // Gera imagem COM foto real — Responses API (correto para gpt-image-2 com edição)
  async function gerarComFoto(
    fotoPath: string,
    promptFinal: string,
    size: string
  ): Promise<string> {
    const buffer  = fs.readFileSync(fotoPath);
    const base64  = buffer.toString("base64");
    const mime    = getMime(fotoPath);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resp = await (openai as any).responses.create({
      model: "gpt-5.5",
      input: [
        {
          role: "user",
          content: [
            { type: "input_image", image_url: `data:${mime};base64,${base64}` },
            { type: "input_text",  text: promptFinal },
          ],
        },
      ],
      tools: [{ type: "image_generation", action: "edit", size }],
    });

    const b64 = (resp.output as Array<{ type: string; result?: string }>)
      .find(o => o.type === "image_generation_call")
      ?.result ?? "";

    return b64;
  }

  // Gera imagem SEM foto — Images API
  async function gerarSemFoto(
    promptFinal: string,
    size: string
  ): Promise<string> {
    const result = await openai.images.generate({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      model: "gpt-image-2-2026-04-21" as any,
      prompt: promptFinal,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      size: size as any,
    });

    return result.data?.[0]?.b64_json ?? "";
  }

  // ─── Dados do empreendimento ──────────────────────────────────────────────

  const nome      = d.nome as string;
  const bairro    = d.localizacao.bairro as string;
  const cidade    = d.localizacao.cidade as string;
  const status    = d.status === "pre-launch" ? "PRÉ-LANÇAMENTO" : "LANÇAMENTO";
  const frase     = (d.hero.fraseImpacto ?? d.hero.subtitulo) as string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const destaque1 = (d.highlights?.[0] ?? "") as string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const destaque2 = (d.highlights?.[1] ?? "") as string;
  const cta       = d.cta.botaoPrincipal as string;
  const primary   = d.tema.primary as string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const amenities = (d.amenities ?? []).slice(0, 4).join(", ");

  // ─── Posts ────────────────────────────────────────────────────────────────

  type PostConfig = {
    label:         string;
    format:        string;
    size:          string;
    fotoCategoria: string;
    fotoIndex:     number;
    templateKey:   string;
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
      templateKey:   "feed",
      instrucao:
        `Gere um post de feed Instagram 4:5 seguindo o template feed-collage-dark.
Use EXATAMENTE a foto enviada como imagem principal.
- Topo creme: "${nome}" em serif + construtora
- Headline: "${frase}" (última palavra itálico na cor ${primary})
- Badge: "${status} · ${bairro.toUpperCase()}"
- Rodapé escuro com dados e CTA: "${cta}"
- Localização: "${bairro}, ${cidade}"
Todo texto em português brasileiro.`,
    },

    // ── DESATIVADO: descomentar quando testes aprovados ────────────────────
    // {
    //   label:         "Story",
    //   format:        "Instagram Story 9:16",
    //   size:          "1024x1536",
    //   fotoCategoria: "lazer",
    //   fotoIndex:     0,
    //   templateKey:   "story",
    //   instrucao:
    //     `Gere um Story Instagram 9:16 seguindo o template feed-hero-full.
    // Use EXATAMENTE esta foto de lazer como fundo — preserve o ambiente real.
    // - Topo: "${nome}" + badge "${status}"
    // - Headline: "${destaque1}" em serif grande branca
    // - Apoio: "${destaque2}"
    // - Pill: "${status} · ${bairro}, ${cidade}" em ${primary}
    // - CTA: "${cta} →" em branco
    // Todo texto em português brasileiro.`,
    // },
    // {
    //   label:         "Carrossel",
    //   format:        "Instagram Square 1:1",
    //   size:          "1024x1024",
    //   fotoCategoria: "lazer",
    //   fotoIndex:     2,
    //   templateKey:   "carrossel",
    //   instrucao:
    //     `Gere um slide de carrossel Instagram 1:1 seguindo o template feed-split-clean.
    // Use EXATAMENTE esta foto como destaque — preserve o espaço real.
    // - Topo esquerdo: "${nome}"
    // - Headline: "Lazer que eleva seu dia" (última palavra itálico em ${primary})
    // - Amenidades: ${amenities}
    // - Indicador: "2 / 5 →" no canto direito
    // - Linha decorativa na cor ${primary}
    // Todo texto em português brasileiro.`,
    // },
  ];

  // ─── Geração em paralelo, sem salvar em disco ─────────────────────────────

  const results = await Promise.all(
    posts.map(async (post) => {
      const fotoPath = resolverImagem(post.fotoCategoria, post.fotoIndex)
        ?? resolverImagem("fachada", 0);

      const promptFinal = montarPrompt(templatePorPost[post.templateKey], post.instrucao);

      const b64 = fotoPath
        ? await gerarComFoto(fotoPath, promptFinal, post.size)
        : await gerarSemFoto(promptFinal, post.size);

      return { label: post.label, format: post.format, b64 };
    })
  );

  return NextResponse.json({ imagens: results });
}
