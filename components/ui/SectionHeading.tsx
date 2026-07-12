import type { ReactNode } from "react";

/**
 * SectionHeading — bölüm başlığı için ortak, erişilebilir yapı.
 *
 * kicker (mono etiket) + başlık (editorial) + opsiyonel lead.
 * Server component; metin content/*'ten prop ile gelir.
 */
type Props = {
  kicker?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  /** Anlamsal başlık seviyesi (varsayılan h2). */
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  kicker,
  title,
  lead,
  align = "left",
  as: Heading = "h2",
  className = "",
}: Props) {
  const alignClass = align === "center" ? "text-center mx-auto items-center" : "";
  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      {/* Eyebrow sönük fildişi — mat altın imza anına (CTA) saklanır. */}
      {kicker && <p className="mono-tag text-mist-300">{kicker}</p>}
      <Heading className="editorial mt-3 text-3xl md:text-5xl leading-[1.08] text-mist-100 max-w-3xl text-balance">
        {title}
      </Heading>
      {lead && (
        <p
          className={`body-readable text-mist-300 mt-5 max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
