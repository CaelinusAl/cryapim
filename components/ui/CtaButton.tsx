import Link from "next/link";
import type { CTA } from "@/content/types";

/**
 * CtaButton — content/*'teki CTA tipini tutarlı biçimde render eder.
 * primary = altın vurgu; ghost = ince çerçeve. Dış bağlantı yeni sekme.
 */
type Props = { cta: CTA; size?: "sm" | "lg"; className?: string };

export function CtaButton({ cta, size = "lg", className = "" }: Props) {
  const pad = size === "lg" ? "px-7 py-4" : "px-5 py-2.5";
  const base = `group inline-flex items-center gap-2.5 mono-tag rounded-full transition-colors ${pad} ${className}`;
  const style =
    cta.intent === "primary"
      ? "border border-tower-gold/55 text-tower-gold hover:bg-tower-gold/10"
      : "border border-mist-500/30 text-mist-200 hover:text-tower-gold hover:border-tower-gold/40";

  const inner = (
    <>
      {cta.label}
      <span aria-hidden className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </>
  );

  if (cta.external) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={`${base} ${style}`}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={cta.href} className={`${base} ${style}`}>
      {inner}
    </Link>
  );
}
