import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const dadosPath = path.join(process.cwd(), "src", "data", "developments", slug, "dados.json");

  if (!fs.existsSync(dadosPath)) {
    return NextResponse.json(
      { error: `dados.json não encontrado para "${slug}". Execute: npm run marketing ${slug}` },
      { status: 404 }
    );
  }

  const dados = JSON.parse(fs.readFileSync(dadosPath, "utf-8"));

  const promptBasePath = path.join(process.cwd(), "prompts", "gerar-roteiro.md");
  const promptBase = fs.existsSync(promptBasePath)
    ? fs.readFileSync(promptBasePath, "utf-8")
    : "";

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `${promptBase}

\`\`\`json
${JSON.stringify(dados, null, 2)}
\`\`\``;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const roteiro = completion.choices[0].message.content ?? "";

  // Salva em disco
  const marketingDir = path.join(process.cwd(), "conteudo-marketing", slug, "marketing");
  fs.mkdirSync(marketingDir, { recursive: true });
  fs.writeFileSync(path.join(marketingDir, "roteiro.md"), roteiro, "utf-8");

  return NextResponse.json({ roteiro });
}
