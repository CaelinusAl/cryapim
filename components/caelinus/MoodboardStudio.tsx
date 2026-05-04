"use client";

import { useCallback, useState, type FormEvent } from "react";
import Image from "next/image";
import { whatsappLink } from "@/lib/contact";

/**
 * MoodboardStudio — Caelinus AI'nın stylist arayüzü.
 *
 * Akış:
 *   1) Kullanıcı vibe yazar (ör. "kış akşamı, kahve, bordo")
 *   2) Üret butonu → /api/caelinus/moodboard
 *   3) 4 görsel + 5-başlıklı Caelinus yorumu döner
 *   4) Sonuç altında "bu stili çek" → WhatsApp randevu CTA'sı
 *
 * Notlar:
 *   - DALL·E URL'leri 1 saat geçerli; reload sonrası kaybolur (kasıtlı)
 *   - Üretim ~10-30 sn sürer; aşamalı feedback ("ışıklar ayarlanıyor",
 *     "palet seçiliyor" vb.) ile bekleme yumuşatılır
 *   - Hata durumunda inline hata bandı + tekrar dene düğmesi
 */

type MoodboardImage = {
  url: string;
  alt: string;
  angle: string;
  revisedPrompt?: string;
};

type Result = {
  vibe: string;
  images: MoodboardImage[];
  commentary: string;
  commentarySource: "openai" | "fallback";
};

const SUGGESTED: ReadonlyArray<string> = [
  "kış akşamı, kahve, bordo",
  "yaz sabahı, deniz, beyaz",
  "sonbahar, kadife, mum",
  "ilkbahar Boğaz, ipek, gül",
  "Eylül tarafında bir vapur, ham keten, kül",
];

const LOADING_PHASES: ReadonlyArray<string> = [
  "vibe çözümleniyor",
  "ışıklar ayarlanıyor",
  "palet seçiliyor",
  "doku örülüyor",
  "Caelinus okuyor",
];

export function MoodboardStudio() {
  const [vibe, setVibe] = useState("");
  const [loading, setLoading] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (rawVibe: string) => {
      const trimmed = rawVibe.trim();
      if (trimmed.length < 3) {
        setError("Bir vibe yaz — bir mevsim, bir renk yeter.");
        return;
      }
      setError(null);
      setResult(null);
      setLoading(true);
      setPhaseIndex(0);

      // Loading fazlarını döndür — kullanıcıya hayat hissi
      const phaseTimer = setInterval(() => {
        setPhaseIndex((p) => (p + 1) % LOADING_PHASES.length);
      }, 2400);

      try {
        const res = await fetch("/api/caelinus/moodboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ vibe: trimmed }),
        });
        const data = (await res.json()) as {
          images?: MoodboardImage[];
          commentary?: string;
          commentarySource?: "openai" | "fallback";
          error?: string;
        };

        if (!res.ok) {
          setError(data.error || "Caelinus bir an kayboldu.");
          return;
        }

        setResult({
          vibe: trimmed,
          images: data.images || [],
          commentary: data.commentary || "",
          commentarySource: data.commentarySource || "fallback",
        });
      } catch (err) {
        console.error("[caelinus/studio] istek hatası:", err);
        setError("Boğaz'da bir bağlantı koptu. Tekrar dene.");
      } finally {
        clearInterval(phaseTimer);
        setLoading(false);
      }
    },
    []
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!loading) void generate(vibe);
  };

  return (
    <section className="relative">
      {/* ===== Form ===== */}
      <form
        onSubmit={onSubmit}
        className="rounded-2xl p-6 md:p-8 border border-ai-cyan/25"
        style={{
          background:
            "linear-gradient(135deg, rgba(159,231,255,0.06) 0%, rgba(212,178,106,0.04) 100%)",
        }}
      >
        <p className="mono-tag text-ai-cyan">caelinus stylist · moodboard</p>
        <h2 className="editorial mt-3 text-3xl md:text-4xl text-mist-100 leading-tight">
          Bir vibe yaz —
          <br />
          <span className="editorial-italic text-ai-cyan">
            Caelinus paleti çözsün.
          </span>
        </h2>
        <p className="body-readable text-mist-300 mt-4 max-w-2xl">
          Bir mevsim, bir renk, bir his. Caelinus dört görsellik bir moodboard
          üretir ve renkleri, dokuyu, atmosferi ve giyimi okur.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
            placeholder="kış akşamı, kahve, bordo"
            maxLength={200}
            disabled={loading}
            className="flex-1 bg-night-800/60 outline-none rounded-full px-5 py-3 text-base text-mist-100 placeholder:text-mist-500 transition-colors disabled:opacity-70"
            style={{ border: "1px solid rgba(159,231,255,0.30)" }}
          />
          <button
            type="submit"
            disabled={loading || vibe.trim().length < 3}
            className="mono-tag px-6 py-3 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            style={{
              color: "#0e0a22",
              background: "#9fe7ff",
              boxShadow: loading ? "none" : "0 0 28px -6px #9fe7ff",
            }}
          >
            {loading ? "üretiliyor…" : "moodboard üret →"}
          </button>
        </div>

        {/* Önerilen vibe'lar */}
        {!result && !loading && (
          <div className="mt-6">
            <p className="mono-tag text-mist-500 mb-3">örnek vibe</p>
            <ul className="flex flex-wrap gap-2">
              {SUGGESTED.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => {
                      setVibe(s);
                      void generate(s);
                    }}
                    className="rounded-full px-4 py-2 text-sm text-mist-200 transition-colors"
                    style={{
                      border: "1px solid rgba(159,231,255,0.25)",
                      background: "rgba(7,6,15,0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(159,231,255,0.7)";
                      e.currentTarget.style.background =
                        "rgba(159,231,255,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(159,231,255,0.25)";
                      e.currentTarget.style.background = "rgba(7,6,15,0.4)";
                    }}
                  >
                    ◐ {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hata bandı */}
        {error && (
          <div
            role="alert"
            className="mt-5 rounded-xl px-4 py-3 mono-tag text-mist-100"
            style={{
              border: "1px solid rgba(255,77,109,0.35)",
              background: "rgba(255,77,109,0.10)",
            }}
          >
            {error}
          </div>
        )}
      </form>

      {/* ===== Loading skeleton + faz göstergesi ===== */}
      {loading && (
        <div className="mt-8">
          <p className="mono-tag text-ai-cyan mb-4">
            <span
              className="inline-block w-2 h-2 rounded-full bg-ai-cyan mr-2"
              style={{
                animation: "sanri-thinking-dot 1.2s ease-in-out infinite",
              }}
            />
            {LOADING_PHASES[phaseIndex]}…
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <li
                key={i}
                className="aspect-square rounded-xl border border-ai-cyan/20 overflow-hidden relative"
                style={{
                  background:
                    "linear-gradient(110deg, rgba(159,231,255,0.04) 30%, rgba(159,231,255,0.10) 50%, rgba(159,231,255,0.04) 70%)",
                  backgroundSize: "200% 100%",
                  animation: "moodboard-shimmer 1.6s ease-in-out infinite",
                }}
              />
            ))}
          </ul>
        </div>
      )}

      {/* ===== Sonuç ===== */}
      {result && !loading && <ResultBlock result={result} />}
    </section>
  );
}

function ResultBlock({ result }: { result: Result }) {
  return (
    <div className="mt-10 space-y-8">
      <div className="flex items-baseline justify-between flex-wrap gap-3">
        <div>
          <p className="mono-tag text-ai-cyan">moodboard · {result.vibe}</p>
          <p className="editorial italic text-mist-300 mt-1">
            {result.commentarySource === "openai"
              ? "Caelinus okudu."
              : "Caelinus arşivden döndü."}
          </p>
        </div>
        <p className="mono-tag text-mist-500">
          görseller bir saat geçerli — beğendiğini sağ tıkla, kaydet.
        </p>
      </div>

      {/* Görsel grid */}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {result.images.map((img, i) => (
          <li
            key={`${img.url}-${i}`}
            className="aspect-square rounded-xl overflow-hidden border border-ai-cyan/20 relative group"
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              unoptimized
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, rgba(7,6,15,0.7) 100%)",
              }}
            />
            <a
              href={img.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 mono-tag rounded-full px-3 py-1 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                color: "#0e0a22",
                background: "#9fe7ff",
              }}
            >
              tam boy
            </a>
          </li>
        ))}
      </ul>

      {/* Caelinus 5-başlıklı yorum */}
      <div
        className="rounded-2xl p-6 md:p-8 border border-ai-cyan/25"
        style={{
          background:
            "linear-gradient(135deg, rgba(159,231,255,0.05) 0%, rgba(7,6,15,0.4) 100%)",
        }}
      >
        <p className="mono-tag text-ai-cyan">caelinus okuması</p>
        <pre
          className="editorial-italic text-mist-100 mt-4 whitespace-pre-wrap leading-relaxed text-base md:text-lg font-sans"
          style={{ fontFamily: "inherit" }}
        >
          {result.commentary}
        </pre>
      </div>

      {/* Aksiyon CTA — bu stil seninse stüdyoda çek */}
      <div
        className="rounded-2xl p-6 md:p-8 border border-tower-gold/25"
        style={{
          background:
            "linear-gradient(135deg, rgba(212,178,106,0.06) 0%, rgba(159,231,255,0.04) 100%)",
        }}
      >
        <p className="mono-tag text-tower-gold">stilini çek</p>
        <p className="editorial text-2xl md:text-3xl text-mist-100 mt-2 leading-tight">
          Bu vibe'da bir çekim mi?
        </p>
        <p className="body-readable text-mist-300 mt-3 max-w-2xl">
          CR Yapım stüdyosunda Boğaz manzaralı dört sahnede — atölye, manzara,
          podcast köşesi, mutfak — bu paletle çekim yapabiliriz. Caelinus
          okuması randevu notuna ekleniyor.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={whatsappLink(
              `Merhaba, "${result.vibe}" vibe'ında bir çekim için randevu almak istiyorum. Caelinus moodboard üzerinden geldim.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-tag inline-flex items-center gap-2 px-6 py-3 rounded-full transition-colors"
            style={{
              color: "#0e0a22",
              background: "#d4b26a",
              boxShadow: "0 0 24px -6px #d4b26a",
            }}
          >
            WhatsApp ile randevu al →
          </a>
          <a
            href="/studio"
            className="mono-tag inline-flex items-center gap-2 px-6 py-3 rounded-full transition-colors text-mist-200 hover:text-tower-gold"
            style={{
              border: "1px solid rgba(212,178,106,0.30)",
            }}
          >
            Stüdyo paketleri
          </a>
        </div>
      </div>
    </div>
  );
}
