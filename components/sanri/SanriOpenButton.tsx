"use client";

/**
 * SanriOpenButton — server component'lerden Sanrı paneli tetiklemek
 * için küçük bir köprü. Tıklandığında window event yollar; SanriBubble
 * onu yakalar ve paneli pre-seeded soruyla açar.
 */
export function SanriOpenButton({
  question,
  label,
  className,
}: {
  question?: string;
  label: string;
  className?: string;
}) {
  function open() {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("sanri:open", {
        detail: question ? { question } : undefined,
      })
    );
  }
  return (
    <button
      type="button"
      onClick={open}
      className={
        className ||
        "mono-tag mt-5 inline-flex items-center gap-2 transition-colors"
      }
      style={{ color: "#b59cf0" }}
    >
      {label} →
    </button>
  );
}
