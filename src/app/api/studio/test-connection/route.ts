import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "OPENAI_API_KEY não configurada no .env" },
      { status: 500 }
    );
  }

  const openai = new OpenAI({ apiKey });

  try {
    const model = await openai.models.retrieve("gpt-image-2");

    return NextResponse.json({
      ok: true,
      model: model.id,
      created: model.created,
      message: "Chave válida e gpt-image-2 acessível nesta conta.",
    });
  } catch (err: unknown) {
    const status = (err as { status?: number }).status ?? 500;
    const message = (err as { message?: string }).message ?? "Erro desconhecido";

    const hint =
      status === 401 ? "Chave inválida ou expirada." :
      status === 404 ? "gpt-image-2 não disponível neste plano/conta." :
      "Erro ao contatar a OpenAI.";

    return NextResponse.json(
      { ok: false, status, error: message, hint },
      { status }
    );
  }
}
