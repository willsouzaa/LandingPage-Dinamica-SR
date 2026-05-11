"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PublishLandingButtonProps = {
  slug: string;
};

export function PublishLandingButton({ slug }: PublishLandingButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function publish() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/studio/publicar-landing/${slug}`, {
        method: "POST",
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Não foi possível publicar.");
      router.push(data.url ?? `/empreendimento/${slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível publicar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={publish}
        disabled={loading}
        className="rounded-lg bg-yellow-300 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-yellow-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Publicando..." : "Publicar landing"}
      </button>
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
