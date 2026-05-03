import type { Metadata } from "next";
import Link from "next/link";
import { PersonaInline } from "@/components/personas/PersonaInline";
import { ALL_PERSONAS, getPersona } from "@/lib/personas";

export const metadata: Metadata = {
  title: "Caelinus AI — Sahnenin sessiz oyuncusu",
  description:
    "Caelinus AI, CR YAPIM bünyesinde yapımlara sufle veren, izleyiciye sezgi köprüsü kuran yapay zekâ katmanıdır.",
};

export default function CaelinusAIPage() {
  return (
    <div className="px-6 md:px-10 max-w-4xl mx-auto pt-8 pb-24 crane-in">
      <p className="mono-tag text-tower-gold/80">caelinus AI</p>
      <h1 className="editorial mt-4 text-4xl md:text-6xl text-mist-100 leading-[1.05]">
        Sahnenin
        <br />
        <span className="editorial-italic text-ai-cyan">
          sessiz oyuncusu.
        </span>
      </h1>

      <p className="mt-8 body-readable text-mist-300 max-w-2xl">
        Caelinus AI burada bir alet değil; bir{" "}
        <em className="editorial-italic text-tower-gold">sufle</em>. Yapımın
        içinde yazara fısıldar, izleyicinin yanında bir göz olur, arşivin
        üstünde bir bellek görür.
      </p>

      <p className="mt-12 mono-tag text-mist-500">dört yüz, tek motor</p>
      <ul className="mt-4 grid md:grid-cols-2 gap-5">
        {ALL_PERSONAS.map((p) => (
          <li
            key={p.id}
            className="rounded-2xl p-6 transition-colors"
            style={{
              border: `1px solid ${p.accent}30`,
              background: "rgba(7, 6, 15, 0.35)",
            }}
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{
                  color: p.accent,
                  border: `1px solid ${p.accent}66`,
                  boxShadow: `0 0 18px -4px ${p.accent}`,
                  background: `${p.accent}10`,
                }}
              >
                {p.symbol}
              </span>
              <div>
                <p
                  className="editorial text-2xl text-mist-100 leading-none"
                >
                  {p.name}
                </p>
                <p className="mono-tag text-mist-500 mt-1">{p.tone}</p>
              </div>
            </div>
            <p className="editorial-italic text-mist-100 text-lg mt-4 leading-snug">
              “{p.tagline}”
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-14">
        <p className="mono-tag text-mist-500 mb-4">canlı dene — Sanrı kapıda</p>
        <PersonaInline
          persona={getPersona("sanri")}
          helpers={[
            "Caelinus AI nedir?",
            "Bana bir rüya ver.",
            "Bugün hangi kelimeyi taşıyayım?",
          ]}
        />
        <p className="mono-tag text-mist-500 mt-4">
          diğer personalar için sağ alttaki <span style={{ color: "#b59cf0" }}>AI'a sor</span> menüsünü aç.
        </p>
      </div>

      <div className="mt-16 flex flex-wrap gap-3">
        <Link
          href="/plato"
          className="mono-tag inline-flex items-center gap-2 border border-ai-cyan/40 text-ai-cyan hover:bg-ai-cyan/10 px-5 py-3 rounded-full transition-colors"
        >
          Plato Modu'nu dene →
        </Link>
        <Link
          href="/yapimlar"
          className="mono-tag inline-flex items-center gap-2 text-mist-300 hover:text-tower-gold px-5 py-3 rounded-full transition-colors"
        >
          Yapımlara dön
        </Link>
      </div>

      <p className="mt-16 mono-tag text-mist-500">
        not: Plato modu ve Sanrı canlı. Zamansız Arşiv katmanı sırada.
      </p>
    </div>
  );
}
