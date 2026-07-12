import type { Metadata } from "next";
import Link from "next/link";
import { perdeArchive } from "@/data/perde-archive";
import { PerdeSearch } from "@/components/perde/PerdeSearch";
import { PerdePoster } from "@/components/perde/PerdePoster";
import { CoverImage } from "@/components/ui/CoverImage";
import { MediaFrame } from "@/components/ui/MediaFrame";
import {
  listRecentReviews,
  perdeCacheEnabled,
} from "@/lib/cache/perde-cache";

const GOLD = "#b98f4e";

/** Landing'i ISR ile yenile — 5 dakikada bir topluluk listesi tazelenir. */
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Perde — Anlatı laboratuvarı · Caelinus AI yapımı",
  description:
    "Perde film eleştirisi yapmaz; hikâyelerin nasıl çalıştığını inceler. Film, dizi, marka, reklam, mit, oyun, sembol — her şey önce bir senaryo olarak doğar. Caelinus AI'nın tamamen yönettiği ilk yapım, CR YAPIM.",
  openGraph: {
    title: "Perde — Her şey bir senaryodur.",
    description:
      "Hikâyelerin nasıl çalıştığını inceleyen dijital anlatı evi. Bir senaristin araştırma odası.",
    type: "website",
  },
};

/** "Neyi okuyoruz?" — Perde film blogu değil, anlatı laboratuvarı. */
const READS = [
  "Film",
  "Dizi",
  "Mitoloji",
  "Marka",
  "Reklam",
  "Kitap",
  "Oyun",
  "Müzik",
  "Sembol",
  "Mimari",
  "Şehir",
  "Tarih",
  "Bilinç",
];

const SYMBOLS = ["◧", "◈", "▣", "◇", "◆", "❖", "⟡", "✦"];
const HUES = ["#3a2a16", "#22303a", "#3a1e22", "#26332a", "#2b2440", "#332a18"];

export default async function PerdeLandingPage() {
  // Curated arşiv — gerçek film posteri KULLANILMAZ; her analiz kod-yerli
  // bir sanat posteri olarak basılır.
  const curated = perdeArchive;

  const curatedSlugs = curated.map((r) => r.filmSlug);
  const community = perdeCacheEnabled
    ? await listRecentReviews(9, curatedSlugs)
    : [];

  return (
    <div className="relative">
      {/* ── FRAME 0 · EŞİK — senaristin araştırma odası ───────────────── */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <CoverImage
          src="/worlds/perde-hero.png"
          alt="Bir senaristin gece çalışma odası: açık senaryo, storyboard, film makaraları, projektör huzmesi ve uzakta tek bir silüet"
          priority
          kenBurns
          sizes="100vw"
        />

        {/* Okunabilirlik — alt ve sol koyulaşır */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,10,8,0.55) 0%, rgba(11,10,8,0.15) 30%, rgba(11,10,8,0.6) 72%, rgba(11,10,8,0.96) 100%)",
          }}
        />
        {/* Projektör huzmesi — sıcak amber, çok ince titrer */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none perde-flicker"
          style={{
            background:
              "radial-gradient(ellipse 42% 60% at 66% 40%, rgba(231,169,79,0.10) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 w-full px-6 md:px-10 pb-16 md:pb-24 pt-36 max-w-5xl mx-auto crane-in-slow">
          <p
            className="mono-tag"
            style={{ color: GOLD, letterSpacing: "0.24em" }}
          >
            cr yapım · perde — anlatı laboratuvarı
          </p>

          <h1
            className="editorial text-[4.2rem] md:text-[8rem] lg:text-[9.5rem] text-mist-100 leading-[0.92] mt-4"
            style={{ textShadow: "0 4px 60px rgba(0,0,0,0.8)" }}
          >
            Perde
          </h1>

          <p
            className="editorial-italic text-3xl md:text-5xl mt-4 leading-tight"
            style={{ color: GOLD, textShadow: "0 2px 30px rgba(0,0,0,0.85)" }}
          >
            Her şey bir senaryodur.
          </p>

          <p
            className="body-readable text-mist-100/90 mt-8 max-w-2xl"
            style={{ textShadow: "0 1px 20px rgba(0,0,0,0.85)" }}
          >
            Bir film, bir dizi, bir marka, bir mit — bir isim yaz. Perde
            aralanır; yüzeydeki hikâyeyi ayırır, altındaki niyeti, tekrar eden
            motifi, söylenmeyeni gösterir. Tanımadığını uydurmaz.
          </p>

          <div className="mt-10 max-w-3xl">
            <PerdeSearch large />
          </div>
        </div>
      </section>

      {/* ── MANİFESTO — ilk saniyede Perde nedir ──────────────────────── */}
      <section className="px-6 md:px-10 py-20 md:py-28 max-w-4xl mx-auto text-center">
        <p className="mono-tag" style={{ color: GOLD, letterSpacing: "0.2em" }}>
          manifesto
        </p>
        <p className="editorial text-3xl md:text-5xl lg:text-[3.4rem] text-mist-100 mt-6 leading-[1.25]">
          Biz film eleştirisi yapmıyoruz.
          <br />
          <span style={{ color: GOLD }}>
            Hikâyelerin nasıl çalıştığını inceliyoruz.
          </span>
        </p>
        <p className="body-readable text-mist-100/80 mt-8 max-w-2xl mx-auto">
          Çünkü her medeniyet, her marka, her mit ve her film önce bir senaryo
          olarak doğar.
        </p>
      </section>

      {/* ── FRAME 1 · NEYİ OKUYORUZ — masanın üstü ─────────────────────── */}
      <section className="px-6 md:px-10 py-8 max-w-5xl mx-auto">
        <p
          className="mono-tag-lg text-center"
          style={{ color: GOLD, letterSpacing: "0.14em" }}
        >
          NEYİ OKUYORUZ?
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-4">
          {READS.map((r) => (
            <li key={r}>
              <span
                className="editorial text-2xl md:text-3xl px-4 py-1.5 inline-block text-mist-100"
                style={{
                  borderBottom: `1px solid ${GOLD}40`,
                }}
              >
                {r}
              </span>
            </li>
          ))}
        </ul>
        <p className="mono-tag text-mist-500 text-center mt-8 max-w-xl mx-auto">
          hepsi bir anlatıdır — perde hepsinin altına bakar
        </p>
      </section>

      {/* ── FRAME 2 · ANALİZLER — poster duvarı ─────────────────────────── */}
      <section className="px-6 md:px-10 pt-16 md:pt-24 pb-12 max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-10 flex-wrap gap-3">
          <p
            className="mono-tag-lg"
            style={{ color: GOLD, letterSpacing: "0.12em" }}
          >
            ANALİZLER
          </p>
          <p className="mono-tag text-mist-500">
            her biri o eser için basılmış özgün bir baskı · {curated.length}{" "}
            çözümleme
          </p>
        </div>

        <ul className="perde-poster-wall grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {curated.map((r, i) => (
            <li key={r.filmSlug}>
              <PerdePoster
                href={`/perde/m/${r.filmSlug}`}
                title={r.filmTitle}
                kind="Film"
                year={r.filmYear?.toString() ?? null}
                oz={r.oz}
                symbol={SYMBOLS[i % SYMBOLS.length]}
                hue={HUES[i % HUES.length]}
                spoiler={r.spoilerLevel === "heavy"}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Topluluk — izleyicilerin sorduğu, perde'nin canlı yanıtladığı */}
      {community.length > 0 && (
        <section className="px-6 md:px-10 pt-4 pb-12 max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-8 flex-wrap gap-3">
            <p
              className="mono-tag-lg"
              style={{ color: GOLD, letterSpacing: "0.12em" }}
            >
              TOPLULUKÇA SORULANLAR
            </p>
            <p className="mono-tag text-mist-500">
              {community.length} yeni çözümleme · son sorulanlar üstte
            </p>
          </div>

          <ul className="perde-poster-wall grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {community.map((c, i) => {
              const oz = c.parsed?.oz
                ?.replace(/^Bu (?:film|yapım|dizi)?\s*aslında\s*/i, "")
                .replace(/\s*anlatıyor\.?$/i, "");
              const displayTitle = c.tmdbTitle || c.filmTitleRaw;
              const yearLabel = c.tmdbYear ? `${c.tmdbYear}` : null;
              return (
                <li key={c.filmSlug}>
                  <PerdePoster
                    href={`/perde/m/${c.filmSlug}`}
                    title={displayTitle}
                    kind="Topluluk"
                    year={yearLabel}
                    oz={oz}
                    symbol={SYMBOLS[(i + 3) % SYMBOLS.length]}
                    hue={HUES[(i + 2) % HUES.length]}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* ── FRAME 3 · PERDE GÖZÜ — dedektif panosu ─────────────────────── */}
      <section className="px-6 md:px-10 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <MediaFrame
            media={{
              poster: "/worlds/perde-eye.png",
              alt: "Perde gözü — kırmızı iplerle bağlanmış fotoğraflar, notlar, karakter diyagramı ve zaman çizelgesinden oluşan bir çözümleme panosu",
            }}
            accent={GOLD}
            ratio="4 / 3"
            label="perde gözü"
            sizes="(min-width: 768px) 50vw, 100vw"
          />

          <div>
            <p
              className="mono-tag-lg"
              style={{ color: GOLD, letterSpacing: "0.12em" }}
            >
              PERDE GÖZÜ
            </p>
            <h2 className="editorial text-3xl md:text-5xl mt-3 text-mist-100 leading-tight">
              Çözümleyicinin panosu.
            </h2>
            <p className="body-readable text-mist-100/85 mt-6">
              Perde bir eseri afişinden değil, iskeletinden tanır. Fotoğraflar,
              notlar, kareler ve kırmızı ipler — her anlatı bir vaka gibi
              masaya yatırılır. Perde üç iz sürer:
            </p>

            <ul className="mt-8 space-y-4">
              {[
                ["KONU'yu ayırır", "yüzeydeki hikâye — perde önündeki anlatı"],
                ["ALTINDAKİ'ni gösterir", "eserin gerçekten anlattığı"],
                ["SEMBOL'ün izini sürer", "bir motif, bir sahne — neyin işareti"],
              ].map(([title, sub]) => (
                <li key={title} className="flex items-baseline gap-3">
                  <span
                    aria-hidden
                    className="text-lg leading-none shrink-0"
                    style={{ color: "#8e2b24" }}
                  >
                    ◉
                  </span>
                  <span>
                    <span
                      className="editorial text-xl md:text-2xl"
                      style={{ color: GOLD }}
                    >
                      {title}
                    </span>{" "}
                    <span className="mono-tag text-mist-500">— {sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FRAME 4 · KAPANIŞ — ışıklar kısılır ────────────────────────── */}
      <section className="px-6 md:px-10 py-20 max-w-4xl mx-auto">
        <div
          className="rounded-[4px] p-8 md:p-14 text-center"
          style={{
            border: `1px solid ${GOLD}2e`,
            background:
              "radial-gradient(ellipse 90% 80% at 50% 0%, rgba(231,169,79,0.07) 0%, transparent 70%)",
          }}
        >
          <p className="editorial-italic text-2xl md:text-4xl text-mist-100 leading-snug">
            “Bilinçli izleyici eleştirmen değildir. Bir eseri puanlamaz —
            <span style={{ color: GOLD }}> nasıl çalıştığını sorar.</span>”
          </p>
          <p className="body-readable text-mist-100/70 mt-6 max-w-2xl mx-auto">
            Perde, CR YAPIM'in bir programı; ama yapımcısı insan değil, Caelinus
            AI'nın kendisi. İnsanlar konsept ve sınırı koyar; AI sahnede
            konuşur. Sıradan bir AI ürünü değil — yapım kimliği olan AI.
          </p>

          <div className="flex flex-wrap gap-3 mt-10 justify-center">
            <Link
              href="/yapimlar/perde"
              className="mono-tag inline-flex items-center gap-2 px-6 py-3 rounded-full transition-colors"
              style={{ color: "#0b0a08", background: GOLD }}
            >
              Perde'yi yapım olarak gör →
            </Link>
            <Link
              href="/caelinus-ai"
              className="mono-tag inline-flex items-center gap-2 px-6 py-3 rounded-full transition-colors text-mist-300 hover:text-[color:var(--perde-amber)]"
              style={{ border: `1px solid ${GOLD}40` }}
            >
              Caelinus AI ailesi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
