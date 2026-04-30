import type { Development } from "@/types/development";

type BuilderSignatureProps = {
  development: Development;
};

export function BuilderSignature({ development }: BuilderSignatureProps) {
  return (
    <footer className="bg-[var(--color-secondary)] px-5 py-8 text-white/55 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-sm md:flex-row">
        <p>{development.name}</p>
        <p>{development.brand.name}</p>
      </div>
    </footer>
  );
}
