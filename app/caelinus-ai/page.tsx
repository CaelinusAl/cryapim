import type { Metadata } from "next";
import Link from "next/link";
import { MoodboardStudio } from "@/components/caelinus/MoodboardStudio";
import { ALL_PERSONAS } from "@/lib/personas";

export const metadata: Metadata = {
  title: "Caelinus AI — Stilini yarat. Hisset. Çek.",
  description:
    "Caelinus AI, vibe'ından bir moodboard üreten ve onu stylist gibi okuyan AI katmanıdır. Bir mevsim ve birkaç renk yaz, dört görsel + palet okuması döner.",
  openGraph: {
    title: "Caelinus AI — Stylist sufle, moodboard motoru",
    description:
      "Bir vibe yaz: kış akşamı, kahve, bordo. Caelinus dört görsel üretir ve paleti, dokuyu, atmosferi okur.",
    type: "website",
  },
};

export default function CaelinusAIPage() {
  return (
    <div className="px-6 md:px-10 max-w-5xl mx-auto pt-8 pb-24">
      <Link
        href="/"
        className="mono-tag text-mist-500 hover:text-tower-gold transition-colors mb-6 inline-block"
      >
        ← CR Yapım
      </Link>

      <p className="mono-tag text-tower-gold/80 mt-4">caelinus AI</p>
      <h1 className="editorial mt-3 text-4xl md:text-6xl text-mist-100 leading-[1.05] crane-in">
        Stilini
        <br />
        <span className="editorial-italic text-ai-cyan">
          Caelinus okusun.
        </span>
      </h1>

      <p className="mt-8 body-readable text-mist-300 max-w-2xl crane-in-slow">
        Caelinus AI burada bir alet değil; bir{" "}
        <em className="editorial-italic text-tower-gold">sufle</em>. Bir vibe
        yaz — bir mevsim, bir renk, bir his — Caelinus dört görsellik bir
        moodboard üretir ve renkleri, dokuyu, atmosferi, giyimi okur.
      </p>

      {/* ===== MOODBOARD STUDIO — ana etkileşim ===== */}
      <div className="mt-12">
        <MoodboardStudio />
      </div>

      {/* ===== PERSONA AİLESİ — caelinus motorunun yüzleri ===== */}
      <div className="mt-20">
        <p className="mono-tag text-mist-500">altı yüz · tek motor</p>
        <h2 className="editorial mt-3 text-3xl md:text-4xl text-mist-100 leading-tight">
          Caelinus AI'ın diğer yüzleri.
        </h2>
        <p className="body-readable text-mist-400 mt-4 max-w-2xl">
          Caelinus stylist katmandır; aynı motor üzerinde Sanrı rüya, Perde
          sinema, Selbi ev mutfağı, Rivayet tarih, Şüpheci akıl olarak çıkar.
          Hepsi sağ alttaki <em>AI'a sor</em> menüsünden açılır.
        </p>

        <ul className="mt-8 grid md:grid-cols-2 gap-4">
          {ALL_PERSONAS.map((p) => (
            <li
              key={p.id}
              className="rounded-2xl p-6 transition-colors"
              style={{
                border: `1px solid ${p.accent}25`,
                background: "rgba(7, 6, 15, 0.35)",
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{
                    color: p.accent,
                    border: `1px solid ${p.accent}55`,
                    boxShadow: `0 0 18px -4px ${p.accent}`,
                    background: `${p.accent}10`,
                  }}
                >
                  {p.symbol}
                </span>
                <div>
                  <p className="editorial text-2xl text-mist-100 leading-none">
                    {p.name}
                  </p>
                  <p className="mono-tag text-mist-500 mt-1">{p.tone}</p>
                </div>
              </div>
              <p className="editorial-italic text-mist-100 text-base mt-4 leading-snug">
                “{p.tagline}”
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* ===== Alt navigasyon ===== */}
      <div className="mt-16 flex flex-wrap gap-3 border-t border-mist-500/10 pt-8">
        <Link
          href="/studio"
          className="mono-tag inline-flex items-center gap-2 border border-tower-gold/40 text-tower-gold hover:bg-tower-gold/10 px-5 py-3 rounded-full transition-colors"
        >
          Stüdyoda çek →
        </Link>
        <Link
          href="/perde"
          className="mono-tag inline-flex items-center gap-2 text-mist-300 hover:text-tower-gold px-5 py-3 rounded-full transition-colors"
        >
          Perde · Film yorumu
        </Link>
        <Link
          href="/yapimlar"
          className="mono-tag inline-flex items-center gap-2 text-mist-300 hover:text-tower-gold px-5 py-3 rounded-full transition-colors"
        >
          Yapımlar
        </Link>
      </div>
    </div>
  );
}
