"use client";

import type { PersonaId } from "@/lib/personas/types";

/**
 * PersonaOpenButton — server component'lerden bir persona panelini
 * tetiklemek için küçük bir köprü. Tıklandığında window event yollar;
 * PersonaBubble onu yakalar ve istenen persona'yı (varsa pre-seeded
 * soruyla) açar.
 */
export function PersonaOpenButton({
  personaId,
  question,
  label,
  className,
  accent,
}: {
  personaId: PersonaId;
  question?: string;
  label: string;
  className?: string;
  /** Persona'nın accent rengi (server'dan geçer; client persona objesini bilmeyebilir) */
  accent?: string;
}) {
  function open() {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("persona:open", {
        detail: { personaId, question },
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
      style={accent ? { color: accent } : undefined}
    >
      {label} →
    </button>
  );
}
