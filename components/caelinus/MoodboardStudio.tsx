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
  /** UI etiketi — "Atmosfer", "Doku", "Figür", "Nesne" */
  label: string;
  /** Narrative ID — etiket renkleri için */
  narrativeId: "atmosphere" | "texture" | "figure" | "object";
  revisedPrompt?: string;
};

/**
 * Narrative renkleri — her katman kendi sinyaliyle gelir,
 * grid bir editöryel sayfa hissi versin.
 */
const NARRATIVE_COLORS: Record<MoodboardImage["narrativeId"], { bg: string; fg: string }> = {
  atmosphere: { bg: "rgba(159,231,255,0.20)", fg: "#9fe7ff" }, // ai cyan — mekan
  texture: { bg: "rgba(212,178,106,0.22)", fg: "#d4b26a" }, // tower gold — doku
  figure: { bg: "rgba(241,91,181,0.18)", fg: "#f5a5d0" }, // dusk magenta — figür
  object: { bg: "rgba(240,232,208,0.18)", fg: "#f0e8d0" }, // mist cream — nesne
};

type Result = {
  vibe: string;
  images: MoodboardImage[];
  commentary: string;
  commentarySource: "openai" | "fallback";
};

/**
 * Önerilen vibe'lar — CR Yapım editöryel diline uygun, İstanbul atmosferli.
 * Caelinus AI'nın imza repertuarı: mevsim + bir nesne + bir doku/renk.
 */
const SUGGESTED: ReadonlyArray<string> = [
  "kasım akşamı, kahve, bordo kadife",
  "ağustos sabahı Boğaz, keten, tuz",
  "Beyoğlu pasajı, yağmur, kül beton",
  "Galata gece, hat, donuk altın",
  "ilkbahar İznik, ipek, gül soğuğu",
];

const LOADING_PHASES: ReadonlyArray<string> = [
  "vibe okunuyor",
  "atmosfer kuruluyor — mekan ve ışık",
  "doku örülüyor — kumaş, kâğıt, brass",
  "figür çağrılıyor — yarım yüz, bir nefes",
  "nesneler diziliyor — masa hikayesi",
  "Caelinus paleti çözüyor",
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
        <p className="mono-tag text-ai-cyan">caelinus stylist · ai moodboard</p>
        <h2 className="editorial mt-3 text-3xl md:text-4xl text-mist-100 leading-tight">
          Bir vibe yaz —
          <br />
          <span className="editorial-italic text-ai-cyan">
            Caelinus dört katmanlı sayfa açsın.
          </span>
        </h2>
        <p className="body-readable text-mist-300 mt-4 max-w-2xl">
          Bir mevsim, bir renk, bir his. Caelinus AI dört editöryel kare üretir
          —{" "}
          <span className="text-mist-100">atmosfer · doku · figür · nesne</span>{" "}
          — ve paletten söze uzanan beş başlıklı bir okuma yazar.
        </p>
        <p className="mono-tag text-mist-500 mt-2 text-xs">
          dall·e 3 hd · gpt-4o-mini · anti-stock, İstanbul imzası
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

      {/* Görsel grid — her görsel kendi anlatım katmanıyla etiketli */}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {result.images.map((img, i) => {
          const colors = NARRATIVE_COLORS[img.narrativeId] ?? NARRATIVE_COLORS.atmosphere;
          return (
            <li
              key={`${img.url}-${i}`}
              className="aspect-[4/5] rounded-xl overflow-hidden relative group"
              style={{
                border: `1px solid ${colors.bg.replace("0.20", "0.45").replace("0.22", "0.45").replace("0.18", "0.45")}`,
                boxShadow: `0 0 32px -10px ${colors.fg}55`,
              }}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                unoptimized
              />

              {/* Üst sağ: katman etiketi — daima görünür */}
              <div
                className="absolute top-2.5 right-2.5 mono-tag rounded-full px-3 py-1 text-[10px] backdrop-blur-md"
                style={{
                  color: colors.fg,
                  background: colors.bg,
                  border: `1px solid ${colors.fg}55`,
                }}
              >
                {String(i + 1).padStart(2, "0")} · {img.label}
              </div>

              {/* Alt gradient — yazılar okunsun */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(7,6,15,0.85) 100%)",
                }}
              />

              {/* Alt: tam boy linki (hover'da) */}
              <a
                href={img.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 mono-tag rounded-full px-3 py-1 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
                style={{
                  color: "#0e0a22",
                  background: colors.fg,
                }}
              >
                tam boy ↗
              </a>
            </li>
          );
        })}
      </ul>

      {/* Caelinus 5-başlıklı yorum — editöryel sayfa olarak parse edilir */}
      <CaelinusReading commentary={result.commentary} />


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

/* ---------- Caelinus 5-başlıklı okuma — editöryel sayfa ---------- */

type ReadingSection = {
  /** Türkçe etiket — PALET, DOKU, ATMOSFER, GİYİM, SÖZ */
  key: "PALET" | "DOKU" | "ATMOSFER" | "GİYİM" | "SÖZ";
  /** Türkçe alt label — kullanıcı dostu */
  label: string;
  /** İkon karakteri */
  symbol: string;
  /** Renk imzası */
  color: string;
};

const READING_SECTIONS: ReadingSection[] = [
  { key: "PALET", label: "Palet", symbol: "◐", color: "#9fe7ff" },
  { key: "DOKU", label: "Doku", symbol: "▥", color: "#d4b26a" },
  { key: "ATMOSFER", label: "Atmosfer", symbol: "✦", color: "#f5a5d0" },
  { key: "GİYİM", label: "Giyim", symbol: "✺", color: "#f0e8d0" },
  { key: "SÖZ", label: "Söz", symbol: "❝", color: "#c9b9ec" },
];

/**
 * Caelinus okumasını "PALET — ...\nDOKU — ..." formatından
 * 5 ayrı editöryel kart olarak parse eder. Format bozulursa
 * tüm metni tek bloğa düşürür (graceful).
 */
function parseReading(text: string): { found: Map<ReadingSection["key"], string>; raw: string } {
  const found = new Map<ReadingSection["key"], string>();
  if (!text) return { found, raw: text };

  // "KEY — content" satır satır eşleştir; aynı satırda olabilir veya çok satırlı
  const pattern = /(PALET|DOKU|ATMOSFER|GİYİM|SÖZ)\s*[—–-]\s*([\s\S]*?)(?=(?:\n\s*(?:PALET|DOKU|ATMOSFER|GİYİM|SÖZ)\s*[—–-])|$)/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    const key = match[1] as ReadingSection["key"];
    const content = match[2].trim();
    if (content) found.set(key, content);
  }
  return { found, raw: text };
}

function CaelinusReading({ commentary }: { commentary: string }) {
  const { found, raw } = parseReading(commentary);
  const hasParsed = found.size >= 3;

  if (!hasParsed) {
    // Parse başarısızsa fallback: düz blok
    return (
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
          {raw}
        </pre>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-baseline gap-3 flex-wrap">
        <p className="mono-tag text-ai-cyan">caelinus okuması</p>
        <p className="text-mist-500 text-sm">
          beş başlıklı bir editöryel — paletten söze
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {READING_SECTIONS.map((section, idx) => {
          const content = found.get(section.key);
          if (!content) return null;

          // SÖZ özel: tek başına geniş kart
          const isQuote = section.key === "SÖZ";

          return (
            <li
              key={section.key}
              className={`rounded-2xl p-5 md:p-6 ${
                isQuote ? "md:col-span-2" : ""
              }`}
              style={{
                background: isQuote
                  ? "linear-gradient(135deg, rgba(201,185,236,0.08) 0%, rgba(7,6,15,0.5) 100%)"
                  : "linear-gradient(135deg, rgba(7,6,15,0.55) 0%, rgba(7,6,15,0.30) 100%)",
                border: `1px solid ${section.color}33`,
                boxShadow: `0 0 28px -10px ${section.color}40`,
              }}
            >
              <div className="flex items-baseline gap-2.5 mb-2">
                <span
                  aria-hidden
                  className="text-base"
                  style={{ color: section.color }}
                >
                  {section.symbol}
                </span>
                <p
                  className="mono-tag"
                  style={{ color: section.color, letterSpacing: "0.18em" }}
                >
                  {String(idx + 1).padStart(2, "0")} · {section.key}
                </p>
              </div>
              <p
                className={`${
                  isQuote
                    ? "editorial-italic text-mist-100 text-xl md:text-2xl leading-snug"
                    : "body-readable text-mist-100 text-base md:text-lg leading-relaxed"
                }`}
              >
                {isQuote ? <>&ldquo;{content}&rdquo;</> : content}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
