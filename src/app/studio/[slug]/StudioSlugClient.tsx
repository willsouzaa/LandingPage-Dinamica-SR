"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { developments } from "@/data/developments";

type ImageResult = {
  label: string;
  format: string;
  b64: string | null;
  error?: string;
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
        fetch(`/api/studio/gerar-imagem/${slug}`,  { method: "POST" }),
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

  function baixarImagem(img: ImageResult) {
    const a = document.createElement("a");
    a.href = `data:image/png;base64,${img.b64}`;
    a.download = `${slug}-${img.label.toLowerCase().replace(/\s+/g, "-")}.png`;
    a.click();
  }

  function baixarRoteiro() {
    const blob = new Blob([content.roteiro!], { type: "text/markdown" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `${slug}-roteiro.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const isLoading = loading !== null;

  return (
    <div className="space-y-8">

      {/* Cabeçalho */}
      <div>
        <Link href="/studio" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-2 inline-block">
          ← Empreendimentos
        </Link>
        <h1 className="text-xl font-semibold text-white">{dev.name}</h1>
        <p className="text-zinc-400 text-sm mt-0.5">
          {dev.location.neighborhood}, {dev.location.city} · {dev.status}
        </p>
      </div>

      {/* Botões de ação */}
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
          {loading === "imagens" ? "Gerando imagem…" : "🖼 Gerar Imagem"}
        </button>
        <button
          onClick={gerarTudo}
          disabled={isLoading}
          className="bg-white hover:bg-zinc-200 text-zinc-900 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading === "tudo" ? "Gerando tudo…" : "⚡ Gerar Tudo"}
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
          <div className="inline-block w-5 h-5 border-2 border-zinc-600 border-t-white rounded-full animate-spin mb-3" />
          <p className="text-zinc-400 text-sm">
            {loading === "roteiro" && "Gerando roteiro com GPT-4o…"}
            {loading === "imagens" && "Gerando imagem com gpt-image-2…"}
            {loading === "tudo"    && "Gerando roteiro e imagem em paralelo…"}
          </p>
        </div>
      )}

      {/* Erro */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Roteiro */}
      {content.roteiro && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-medium">Roteiro gerado</h2>
            <button
              onClick={baixarRoteiro}
              className="text-xs text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-lg transition-colors"
            >
              ⬇ Baixar .md
            </button>
          </div>
          <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed overflow-auto max-h-[500px]">
            {content.roteiro}
          </pre>
        </section>
      )}

      {/* Imagens */}
      {content.imagens.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-white font-medium">Imagens geradas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.imagens.map((img, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                {img.b64 ? (
                  <img
                    src={`data:image/png;base64,${img.b64}`}
                    alt={img.label}
                    className="w-full object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[4/5] flex flex-col items-center justify-center gap-2 px-4 text-center text-zinc-600 text-sm">
                    <span>Imagem não gerada</span>
                    {img.error && (
                      <span className="text-red-400 text-xs break-all">{img.error}</span>
                    )}
                  </div>
                )}
                <div className="p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-white text-sm font-medium">{img.label}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{img.format}</p>
                  </div>
                  {img.b64 && (
                    <button
                      onClick={() => baixarImagem(img)}
                      className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
                    >
                      ⬇ Baixar PNG
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
