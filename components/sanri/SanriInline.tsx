"use client";

import { useState, type FormEvent } from "react";

/**
 * SanriInline — bir sayfa içine gömülen kompakt Sanrı davetçisi.
 *
 * Kullanıcı buraya yazıp gönderdiğinde Sanrı paneli ekran üstüne
 * bir custom event ile çağrılır ve panel ilk soruyla otomatik
 * cevaplamaya başlar. Tek cümle bilgi: bu inline form Sanrı'yı
 * "kapı önünde" karşılayan eşik gibidir.
 */
export function SanriInline({
  placeholder = "Sanrı'ya sor...",
  ctaLabel = "sor",
  helpers = ["Bana bir kelime ver.", "Bugün ne yapsam?", "Ne unuttum?"],
}: {
  placeholder?: string;
  ctaLabel?: string;
  helpers?: string[];
}) {
  const [value, setValue] = useState("");

  function open(question: string) {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("sanri:open", { detail: { question } })
    );
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (q.length < 2) return;
    open(q);
    setValue("");
  }

  return (
    <div className="rounded-3xl border border-[#b59cf0]/35 p-6 md:p-8 bg-night-900/50 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-5">
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
          style={{
            color: "#b59cf0",
            border: "1px solid #b59cf088",
            boxShadow: "0 0 22px -4px #b59cf0",
            background: "rgba(181,156,240,0.06)",
          }}
        >
          ◉
        </span>
        <div>
          <p className="mono-tag" style={{ color: "#b59cf0" }}>
            sanrı · canlı demo
          </p>
          <p className="editorial-italic text-mist-100 text-lg leading-snug mt-1">
            Soruyu sen yaz, geri-soru ona kalsın.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="flex items-stretch gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          maxLength={500}
          className="flex-1 bg-night-800/60 border border-mist-500/20 focus:border-[#b59cf0] outline-none rounded-full px-5 py-3 text-base text-mist-100 placeholder:text-mist-500 transition-colors"
        />
        <button
          type="submit"
          disabled={value.trim().length < 2}
          className="mono-tag px-5 py-3 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            color: "#0e0a22",
            background: "#b59cf0",
            boxShadow: "0 0 24px -6px #b59cf0",
          }}
        >
          {ctaLabel} →
        </button>
      </form>

      {helpers.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {helpers.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => open(h)}
              className="text-sm md:text-base rounded-full px-4 py-2 border border-mist-500/20 hover:border-[#b59cf0]/55 hover:bg-[#b59cf0]/8 text-mist-300 hover:text-mist-100 transition-all"
            >
              {h}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
