import type { Content } from "@/lib/content";

export function MarqueeSection({
  content,
}: {
  content: Content["marquee"];
}) {
  const items = [...content.items, ...content.items];

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-gold/20 py-5"
    >
      <div className="marquee-track flex w-max animate-marquee items-center">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center whitespace-nowrap px-8 text-[0.72rem] uppercase tracking-[0.4em] text-muted"
          >
            {item}
            <span className="ml-16 text-gold/60">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
