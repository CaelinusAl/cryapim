"use client";

import { useState, type FormEvent } from "react";
import type { Persona } from "@/lib/personas/types";

/**
 * PersonaInline — bir sayfa içine gömülen kompakt persona davetçisi.
 *
 * Kullanıcı buraya yazıp gönderdiğinde site genelindeki bubble'ın
 * panel'i açılır ve persona ilk soruyla otomatik cevaplamaya başlar.
 * Bu inline kart "kapı önünde karşılayan eşik" gibidir — tek bir
 * mesaj göndermek için tüm paneli açmaya gerek kalmaz.
 */
export function PersonaInline({
  persona,
  helpers,
  placeholder,
  ctaLabel,
}: {
  persona: Persona;
  /** Override etmek istersen örnek soruları değiştir. */
  helpers?: string[];
  placeholder?: string;
  ctaLabel?: string;
}) {
  const [value, setValue] = useState("");

  function open(question?: string) {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("persona:open", {
        detail: { personaId: persona.id, question },
      })
    );
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (q.length < 2) return;
    open(q);
    setValue("");
  }

  const seeds = helpers ?? persona.welcomeSeeds.slice(0, 3);
  const accent = persona.accent;

  return (
    <div
      className="rounded-3xl p-6 md:p-8 bg-night-900/50 backdrop-blur-sm"
      style={{ border: `1px solid ${accent}55` }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
          style={{
            color: accent,
            border: `1px solid ${accent}88`,
            boxShadow: `0 0 22px -4px ${accent}`,
            background: `${accent}10`,
          }}
          aria-hidden
        >
          {persona.symbol}
        </span>
        <div>
          <p className="mono-tag" style={{ color: accent }}>
            {persona.inlineHeadline}
          </p>
          <p className="editorial-italic text-mist-100 text-lg leading-snug mt-1">
            {persona.inlineSubline}
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="flex items-stretch gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder ?? persona.inputPlaceholder}
          maxLength={800}
          className="flex-1 bg-night-800/60 outline-none rounded-full px-5 py-3 text-base text-mist-100 placeholder:text-mist-500 transition-colors"
          style={{ border: `1px solid ${accent}30` }}
        />
        <button
          type="submit"
          disabled={value.trim().length < 2}
          className="mono-tag px-5 py-3 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            color: "#0e0a22",
            background: accent,
            boxShadow: `0 0 24px -6px ${accent}`,
          }}
        >
          {ctaLabel ?? persona.ctaLabel} →
        </button>
      </form>

      {seeds.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {seeds.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => open(h)}
              className="text-sm md:text-base rounded-full px-4 py-2 text-mist-300 hover:text-mist-100 transition-all"
              style={{
                border: `1px solid ${accent}30`,
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${accent}88`;
                e.currentTarget.style.background = `${accent}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${accent}30`;
                e.currentTarget.style.background = "transparent";
              }}
            >
              {h}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
