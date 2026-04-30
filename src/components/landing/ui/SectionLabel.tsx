type SectionLabelProps = {
  children: React.ReactNode;
};

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-primary)]">
      {children}
    </p>
  );
}
