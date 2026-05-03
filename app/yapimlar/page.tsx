import Link from "next/link";
import type { Metadata } from "next";
import { programs } from "@/data/programs";

export const metadata: Metadata = {
  title: "Yapımlar — Altı Bölüm, Tek Plato",
  description:
    "CR YAPIM bünyesindeki altı program: Ruhsal Yatırım, Nasıl Yaratıyorum, Az Kalsın Bende İnanıyordum, Rivayet Avcısı, Sanrı'ya Sor, Selbi Yemekte Ne Var?",
};

export default function YapimlarPage() {
  return (
    <div className="px-6 md:px-10 max-w-6xl mx-auto pt-8 pb-24">
      <header className="crane-in mb-16 max-w-3xl">
        <p className="mono-tag text-tower-gold/80">yapımlar</p>
        <h1 className="editorial mt-4 text-4xl md:text-6xl text-mist-100 leading-[1.05]">
          Altı bölüm,
          <br />
          <span className="editorial-italic text-tower-gold">tek bir plato.</span>
        </h1>
        <p className="mt-6 text-mist-300 text-lg md:text-xl leading-relaxed">
          Her program tek bir niyete demir atar; ama hepsi aynı denizin
          kıyısında çekilir. Bir hücreye girdiğinde, programın kendi
          frekansı tüm sayfayı değiştirir.
        </p>
      </header>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {programs.map((p, idx) => (
          <li key={p.slug} className="crane-in" style={{ animationDelay: `${idx * 80}ms` }}>
            <Link
              href={`/yapimlar/${p.slug}`}
              className="group relative block rounded-2xl border border-mist-500/20 hover:border-tower-gold/60 transition-all overflow-hidden h-full"
              style={{
                background: `radial-gradient(120% 80% at 0% 0%, ${p.surface} 0%, #07060f 70%)`,
              }}
            >
              {/* Frekans halesi — hover'da büyür */}
              <div
                aria-hidden
                className="absolute -top-12 -right-12 w-44 h-44 rounded-full opacity-30 group-hover:opacity-60 transition-opacity blur-2xl"
                style={{ background: p.accent }}
              />

              <div className="relative p-7 md:p-9 flex flex-col h-full min-h-[380px]">
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{
                      color: p.accent,
                      border: `1px solid ${p.accent}77`,
                      boxShadow: `0 0 22px -6px ${p.accent}88`,
                    }}
                  >
                    {p.symbol}
                  </div>
                  <span className="mono-tag-lg" style={{ color: p.accent }}>
                    {p.channel === "youtube"
                      ? "YouTube"
                      : p.channel === "instagram"
                        ? "Instagram"
                        : "Podcast"}
                  </span>
                </div>

                <h2 className="editorial mt-7 text-3xl md:text-4xl text-mist-100 leading-tight">
                  {p.title}
                </h2>
                <p className="editorial-italic text-xl md:text-2xl text-mist-300 mt-3 leading-snug">
                  {p.tagline}
                </p>

                <p className="body-readable text-mist-100/90 mt-6 line-clamp-3">
                  {p.intent}
                </p>

                <div className="mt-auto pt-7 flex items-end justify-between">
                  <div>
                    <p className="mono-tag text-mist-500">yayın</p>
                    <p className="text-base text-mist-100 mt-2">{p.cadence}</p>
                  </div>
                  <div className="text-right">
                    <p className="mono-tag text-mist-500">bölüm</p>
                    <p
                      className="editorial text-4xl md:text-5xl mt-1"
                      style={{ color: p.accent }}
                    >
                      {p.episodes}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-20 text-center">
        <Link
          href="/plato"
          className="mono-tag inline-flex items-center gap-3 border border-ai-cyan/40 text-ai-cyan hover:bg-ai-cyan/10 px-5 py-3 rounded-full transition-colors"
        >
          Hepsi nerede çekiliyor? Plato'yu dolaş
          <span aria-hidden>◐</span>
        </Link>
      </div>
    </div>
  );
}
