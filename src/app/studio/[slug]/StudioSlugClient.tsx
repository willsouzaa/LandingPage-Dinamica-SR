"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { developments } from "@/data/developments";

type ImageResult = {
  label: string;
  format: string;
  b64: string;
  pngPath?: string;
  htmlPath?: string;
};

type GeneratedContent = {
  roteiro: string | null;
  imagens: ImageResult[];
};

export function StudioSlugClient() {
  const { slug } = useParams<{ slug: string }>();
  const dev = developments.find((d) => d.slug === slug);

  const [loading, setLoading] = useState<"roteiro" | "imagens" | "tudo" | null>(null);
  const [content, setContent] = useState<GeneratedContent>({ roteiro: null, imagens: [] });
  const [error, setError] = useState<string | null>(null);

  if (!dev) {
    return (
      <div className="text-zinc-400">
        Empreendimento <strong>{slug}</strong> não encontrado.{" "}
        <Link href="/studio" className="text-white underline">Voltar</Link>
      </div>
    );
  }

  async function gerarRoteiro() {
    setError(null);
    setLoading("roteiro");
    try {
      const res = await fetch(`/api/studio/gerar-roteiro/${slug}`, { method: "POST" });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setContent((prev) => ({ ...prev, roteiro: data.roteiro }));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao gerar roteiro.");
    } finally {
      setLoading(null);
    }
  }

  async function gerarImagens() {
    setError(null);
    setLoading("imagens");
    try {
      const res = await fetch(`/api/studio/gerar-imagem/${slug}`, { method: "POST" });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setContent((prev) => ({ ...prev, imagens: data.imagens }));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao gerar imagens.");
    } finally {
      setLoading(null);
    }
  }

  async function gerarTudo() {
    setError(null);
    setLoading("tudo");
    try {
      const [resR, resI] = await Promise.all([
        fetch(`/api/studio/gerar-roteiro/${slug}`, { method: "POST" }),
        fetch(`/api/studio/gerar-imagem/${slug}`, { method: "POST" }),
      ]);
      if (!resR.ok) throw new Error(await resR.text());
      if (!resI.ok) throw new Error(await resI.text());
      const [dataR, dataI] = await Promise.all([resR.json(), resI.json()]);
      setContent({ roteiro: dataR.roteiro, imagens: dataI.imagens });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao gerar conteúdo.");
    } finally {
      setLoading(null);
    }
  }

  async function baixarTudo() {
    const res = await fetch(`/api/studio/download/${slug}`);
    if (!res.ok) {
      setError("Nenhum conteúdo gerado para baixar ainda.");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}-marketing.zip`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const isLoading = loading !== null;
  const hasContent = content.roteiro || content.imagens.length > 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/studio" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-2 inline-block">
            ← Empreendimentos
          </Link>
          <h1 className="text-xl font-semibold text-white">{dev.name}</h1>
          <p className="text-zinc-400 text-sm mt-0.5">
            {dev.location.neighborhood}, {dev.location.city} · {dev.status}
          </p>
        </div>
        {hasContent && (
          <button
            onClick={baixarTudo}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            ⬇ Baixar tudo (.zip)
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={gerarRoteiro}
          disabled={isLoading}
          className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          {loading === "roteiro" ? "Gerando roteiro…" : "📝 Gerar Roteiro"}
        </button>
        <button
          onClick={gerarImagens}
          disabled={isLoading}
          className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          {loading === "imagens" ? "Gerando imagens…" : "🖼 Gerar Imagens"}
        </button>
        <button
          onClick={gerarTudo}
          disabled={isLoading}
          className="bg-white hover:bg-zinc-200 text-zinc-900 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading === "tudo" ? "Gerando tudo…" : "⚡ Gerar Tudo"}
        </button>
      </div>

      {isLoading && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
          <div className="inline-block w-5 h-5 border-2 border-zinc-600 border-t-white rounded-full animate-spin mb-3" />
          <p className="text-zinc-400 text-sm">
            {loading === "roteiro" && "Gerando roteiro com Claude…"}
            {loading === "imagens" && "Renderizando post HTML/CSS em PNG…"}
            {loading === "tudo" && "Gerando roteiro e renderizando post em paralelo…"}
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {content.roteiro && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-medium">Roteiro gerado</h2>
            <button
              onClick={() => {
                const blob = new Blob([content.roteiro!], { type: "text/markdown" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${slug}-roteiro.md`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="text-xs text-zinc-400 hover:text-white transition-colors"
            >
              ⬇ baixar .md
            </button>
          </div>
          <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed overflow-auto max-h-[500px]">
            {content.roteiro}
          </pre>
        </section>
      )}

      {content.imagens.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-white font-medium">Imagens geradas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {content.imagens.map((img, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <img
                  src={`data:image/png;base64,${img.b64}`}
                  alt={img.label}
                  className="w-full object-cover"
                />
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-white text-xs font-medium">{img.label}</p>
                    <p className="text-zinc-500 text-xs">{img.format}</p>
                  </div>
                  <button
                    onClick={() => {
                      const a = document.createElement("a");
                      a.href = `data:image/png;base64,${img.b64}`;
                      a.download = `${slug}-${img.label.toLowerCase().replace(/\s+/g, "-")}.png`;
                      a.click();
                    }}
                    className="text-zinc-400 hover:text-white text-xs transition-colors"
                  >
                    ⬇
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

