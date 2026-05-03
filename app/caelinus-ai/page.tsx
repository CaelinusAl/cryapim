import type { Metadata } from "next";
import Link from "next/link";
import { SanriInline } from "@/components/sanri/SanriInline";

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

      <ul className="mt-12 grid md:grid-cols-3 gap-5">
        {[
          {
            t: "Sanrı",
            d: "Site içi rehber. Niyetine göre bölüm önerir, arşivden seni çıkarır, sorunu rüya gibi geri çevirir.",
            tag: "site içi",
          },
          {
            t: "Zamansız Arşiv",
            d: "Her bölümün altında ‘bu bölümü uzat’ — sana özel, kişisel bir mektup olarak.",
            tag: "izleyici katmanı",
          },
          {
            t: "Plato Modu",
            d: "Boğaz manzaralı platonun 3D maketinde sahnenin arkasını dolaş, kameralara dokun.",
            tag: "showcase",
          },
        ].map((b) => (
          <li
            key={b.t}
            className="rounded-2xl border border-mist-500/20 p-6 hover:border-ai-cyan/40 transition-colors"
          >
            <p className="mono-tag text-mist-500">{b.tag}</p>
            <p className="editorial text-2xl md:text-3xl text-mist-100 mt-3">{b.t}</p>
            <p className="text-base text-mist-100/90 mt-3 leading-relaxed">{b.d}</p>
          </li>
        ))}
      </ul>

      <div className="mt-14">
        <p className="mono-tag text-mist-500 mb-4">canlı dene</p>
        <SanriInline
          placeholder="Sanrı'ya bir soru sor..."
          ctaLabel="sor"
          helpers={[
            "Caelinus AI nedir?",
            "Bana bir rüya ver.",
            "Bugün hangi kelimeyi taşıyayım?",
          ]}
        />
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
