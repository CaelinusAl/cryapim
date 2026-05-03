import type { Metadata } from "next";
import Link from "next/link";
import { perdeArchive } from "@/data/perde-archive";
import { PerdeSearch } from "@/components/perde/PerdeSearch";

const ACCENT = "#c95a5a";

export const metadata: Metadata = {
  title: "Perde — Filmin altındaki film · Caelinus AI yapımı",
  description:
    "Perde, CR YAPIM'in bilinçli izleyici platformudur. Bir film adı yaz; yüzeysel hikâyenin altındaki temayı, sembolizmi, yönetmenin niyeti ile izleyicinin algısı arasındaki çekişmeyi göster. Caelinus AI'nın tamamen yönettiği ilk yapım.",
  openGraph: {
    title: "Perde — Filmin altındaki film",
    description:
      "Caelinus AI'nın yönettiği bilinçli izleyici platformu. Bir film yaz, perdeyi araladalım.",
    type: "website",
  },
};

export default function PerdeLandingPage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section
        className="px-6 md:px-10 pt-12 md:pt-20 pb-16 max-w-5xl mx-auto crane-in"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${ACCENT}26 0%, transparent 70%)`,
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <span
            aria-hidden
            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-2xl md:text-3xl"
            style={{
              color: ACCENT,
              border: `1px solid ${ACCENT}77`,
              boxShadow: `0 0 36px -6px ${ACCENT}`,
              background: `${ACCENT}10`,
              animation: "sanri-pulse 2.6s ease-in-out infinite",
            }}
          >
            ◧
          </span>
          <div>
            <p className="mono-tag" style={{ color: ACCENT }}>
              caelinus AI yapımı · sürekli yayında
            </p>
            <p className="mono-tag text-mist-500">cr yapım · perde</p>
          </div>
        </div>

        <h1 className="editorial text-5xl md:text-7xl lg:text-8xl text-mist-100 leading-[1.02]">
          Perde
        </h1>
        <p
          className="editorial-italic text-2xl md:text-4xl mt-5 leading-tight max-w-3xl"
          style={{ color: ACCENT }}
        >
          “Filmin altındaki film.”
        </p>

        <p className="body-readable text-mist-100/85 mt-8 max-w-2xl">
          Bir film adı yaz. Perde aralanır — yüzeysel hikâyeyi ayırır, gerçek
          temayı, bir sembolü, yönetmenin niyeti ile izleyici algısı
          arasındaki çekişmeyi gösterir. Tanımadığı filmi uydurmaz; künyeden
          bilgi ister. Bu, Caelinus AI'nın tamamen kendi yönettiği ilk
          yapımdır.
        </p>

        <div className="mt-10 max-w-3xl">
          <PerdeSearch large />
        </div>
      </section>

      {/* Arşiv */}
      <section className="px-6 md:px-10 pt-8 pb-12 max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-8">
          <p
            className="mono-tag-lg"
            style={{ color: ACCENT, letterSpacing: "0.12em" }}
          >
            ARŞİVDEKİ FİLMLER
          </p>
          <p className="mono-tag text-mist-500">
            {perdeArchive.length} film · daha fazlası geliyor
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {perdeArchive.map((r) => (
            <li key={r.filmSlug}>
              <Link
                href={`/perde/m/${r.filmSlug}`}
                className="group block rounded-2xl overflow-hidden transition-all"
                style={{
                  border: `1px solid ${ACCENT}30`,
                  background: "rgba(7, 6, 15, 0.55)",
                }}
              >
                {/* Mini sinematik poster — gradient + sembol */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: "16 / 10",
                    background: `radial-gradient(ellipse 70% 60% at 50% 45%, ${ACCENT}24 0%, transparent 70%), linear-gradient(180deg, #0a0719 0%, #050410 100%)`,
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none opacity-25"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 3px)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      aria-hidden
                      className="text-5xl md:text-6xl"
                      style={{
                        color: ACCENT,
                        textShadow: `0 0 36px ${ACCENT}`,
                      }}
                    >
                      ◧
                    </span>
                  </div>
                  {/* Üst sol — yıl */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="mono-tag-lg px-2.5 py-1 rounded-md"
                      style={{
                        color: ACCENT,
                        background: "rgba(7, 6, 15, 0.7)",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      {r.filmYear}
                    </span>
                  </div>
                  {/* Üst sağ — spoiler etiketi */}
                  {r.spoilerLevel === "heavy" && (
                    <div className="absolute top-3 right-3">
                      <span
                        className="mono-tag px-2.5 py-1 rounded-md"
                        style={{
                          color: ACCENT,
                          background: "rgba(7, 6, 15, 0.7)",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        spoiler
                      </span>
                    </div>
                  )}
                </div>
                {/* Kart içeriği */}
                <div className="p-5">
                  <p className="editorial text-xl md:text-2xl text-mist-100 leading-tight group-hover:text-tower-gold transition-colors">
                    {r.filmTitle}
                  </p>
                  <p className="mono-tag text-mist-500 mt-1">
                    {r.filmDirector} · {r.filmCountry}
                  </p>
                  <p
                    className="editorial-italic text-base mt-3 leading-snug line-clamp-3"
                    style={{ color: `${ACCENT}cc` }}
                  >
                    “{r.oz}”
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Manifesto + bağlantılar */}
      <section className="px-6 md:px-10 py-16 max-w-4xl mx-auto">
        <div
          className="rounded-3xl p-8 md:p-12"
          style={{
            border: `1px solid ${ACCENT}30`,
            background: `linear-gradient(180deg, ${ACCENT}10 0%, transparent 100%)`,
          }}
        >
          <p className="mono-tag" style={{ color: ACCENT }}>
            perde'nin manifestosu
          </p>
          <h2 className="editorial text-3xl md:text-5xl mt-3 text-mist-100 leading-tight">
            Bilinçli izleyici eleştirmen değildir.
          </h2>
          <p className="body-readable text-mist-100/85 mt-6">
            Perde, bir filmin yüzeysel hikâyesi ile gerçekten anlattığı şey
            arasındaki boşluğa bakar. Bir filmi puanlamaz, bir yönetmeni
            yermez, bir izleyiciye 'bunu anlamadın' demez. Üç şey yapar:{" "}
            <em className="editorial-italic" style={{ color: ACCENT }}>
              KONU'yu ayırır, ALTINDAKİ'ni gösterir, bir SEMBOL'ün izini
              sürer.
            </em>{" "}
            Tanımadığı filmde uydurmaz — bilinçli izleyici olmanın ilk kuralı
            budur.
          </p>
          <p className="body-readable text-mist-100/85 mt-4">
            Perde, CR YAPIM'in bir programı; ama yapımcısı insan değil,
            Caelinus AI'nın kendisi. İnsanlar konsept ve sınırı koyar; AI
            sahnede konuşur. Bu, sektörde yeni bir tür: sıradan AI ürünü
            değil, yapım kimliği olan AI.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/yapimlar/perde"
              className="mono-tag inline-flex items-center gap-2 px-5 py-3 rounded-full transition-colors"
              style={{
                color: "#0e0a22",
                background: ACCENT,
              }}
            >
              Perde'yi yapım olarak gör →
            </Link>
            <Link
              href="/caelinus-ai"
              className="mono-tag inline-flex items-center gap-2 px-5 py-3 rounded-full transition-colors text-mist-300 hover:text-tower-gold"
              style={{ border: `1px solid ${ACCENT}40` }}
            >
              Caelinus AI ailesi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
