interface SectionHeadingProps {
  index: string;
  label: string;
  folio?: string;
}

export function SectionHeading({ index, label, folio }: SectionHeadingProps) {
  return (
    <div className="mb-14 flex items-end justify-between border-b border-gold/20 pb-4">
      <div className="flex items-baseline gap-4">
        <span className="text-[0.62rem] tracking-[0.4em] text-dim">
          {index}
        </span>
        <h2 className="text-[0.72rem] font-medium uppercase tracking-[0.45em] text-gold">
          {label}
        </h2>
      </div>
      {folio ? (
        <span className="text-[0.62rem] tracking-[0.4em] text-dim">
          {folio}
        </span>
      ) : null}
    </div>
  );
}
