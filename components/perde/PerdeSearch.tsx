"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { findReviewByQuery, perdeArchive } from "@/data/perde-archive";

/**
 * PerdeSearch — Perde'nin tek giriş arama kutusu.
 *
 * Akıllı yön belirleme:
 * 1) Kullanıcı film adı yazar.
 * 2) Arşivde varsa direkt o filmin yorum sayfasına gider (statik, hızlı).
 * 3) Yoksa, Perde panelini açar; AI canlı yorumu üretir.
 *
 * Bu sayede hem SEO/arşiv değerini koruruz (statik vitrin), hem de
 * kullanıcının hayal ettiği her filmle konuşmasına izin veririz.
 */

const ACCENT = "#c95a5a";

export function PerdeSearch({
  placeholder = "Bir film adı yaz... (örn: Mulholland Drive)",
  ctaLabel = "perdeyi aç",
  large = false,
}: {
  placeholder?: string;
  ctaLabel?: string;
  /** Hero alanında kullanıldığında daha büyük tipografi */
  large?: boolean;
}) {
  const [value, setValue] = useState("");
  const router = useRouter();

  function go(query: string) {
    const q = query.trim();
    if (q.length < 2) return;

    // 1) Arşivde varsa hemen yorum sayfasına git
    const match = findReviewByQuery(q);
    if (match) {
      router.push(`/perde/m/${match.filmSlug}`);
      setValue("");
      return;
    }

    // 2) Yoksa Perde panelini canlı AI ile aç
    window.dispatchEvent(
      new CustomEvent("persona:open", {
        detail: { personaId: "perde", question: q },
      })
    );
    setValue("");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    go(value);
  }

  const inputCls = large
    ? "flex-1 bg-night-900/60 outline-none rounded-full px-6 py-4 md:py-5 text-lg md:text-xl text-mist-100 placeholder:text-mist-500"
    : "flex-1 bg-night-800/60 outline-none rounded-full px-5 py-3 text-base text-mist-100 placeholder:text-mist-500";

  const buttonCls = large
    ? "mono-tag-lg px-6 md:px-8 py-4 md:py-5 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed"
    : "mono-tag px-5 py-3 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div className="space-y-3">
      <form onSubmit={onSubmit} className="flex items-stretch gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          maxLength={200}
          className={inputCls}
          style={{ border: `1px solid ${ACCENT}33` }}
        />
        <button
          type="submit"
          disabled={value.trim().length < 2}
          className={buttonCls}
          style={{
            color: "#0e0a22",
            background: ACCENT,
            boxShadow: `0 0 28px -6px ${ACCENT}`,
          }}
        >
          {ctaLabel} →
        </button>
      </form>

      {large && perdeArchive.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="mono-tag text-mist-500 self-center mr-2">
            arşivden hızlı:
          </span>
          {perdeArchive.slice(0, 4).map((r) => (
            <button
              key={r.filmSlug}
              type="button"
              onClick={() => go(r.filmTitle)}
              className="text-sm md:text-base rounded-full px-4 py-2 text-mist-300 hover:text-mist-100 transition-all"
              style={{
                border: `1px solid ${ACCENT}30`,
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${ACCENT}88`;
                e.currentTarget.style.background = `${ACCENT}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${ACCENT}30`;
                e.currentTarget.style.background = "transparent";
              }}
            >
              {r.filmTitle}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
