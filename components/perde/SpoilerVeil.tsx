"use client";

import { useState, type ReactNode } from "react";

/**
 * SpoilerVeil — bir içerik bloğunun üzerine "perdeyi aralamak için tıkla"
 * örtüsü atan client bileşeni.
 *
 * `active` false ise hiçbir şey yapmaz — içeriği olduğu gibi gösterir
 * (mild/none spoiler için). True ise içeriği blur + tıklama bekleyen
 * bir kart olarak sunar; tıklayınca açılır kalır.
 */
export function SpoilerVeil({
  active,
  label,
  accent,
  children,
}: {
  active: boolean;
  label: string;
  accent: string;
  children: ReactNode;
}) {
  const [revealed, setRevealed] = useState(false);

  if (!active || revealed) return <>{children}</>;

  return (
    <button
      type="button"
      onClick={() => setRevealed(true)}
      aria-expanded={false}
      className="relative w-full text-left rounded-xl p-6 transition-colors"
      style={{
        border: `1px dashed ${accent}66`,
        background: `${accent}10`,
      }}
    >
      <div
        aria-hidden
        className="select-none pointer-events-none filter blur-md opacity-40 max-h-32 overflow-hidden"
      >
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span
          aria-hidden
          className="text-3xl mb-2"
          style={{ color: accent, textShadow: `0 0 14px ${accent}` }}
        >
          ◧
        </span>
        <span
          className="mono-tag-lg"
          style={{ color: accent, letterSpacing: "0.1em" }}
        >
          perde aralanır
        </span>
        <span className="text-sm text-mist-300 mt-1 max-w-xs">{label}</span>
      </div>
    </button>
  );
}
