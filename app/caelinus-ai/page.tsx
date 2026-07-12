import type { Metadata } from "next";
import Link from "next/link";
import { MoodboardStudio } from "@/components/caelinus/MoodboardStudio";
import { CoverImage } from "@/components/ui/CoverImage";
import { Reveal } from "@/components/ui/Reveal";
import { caelinusTr, type CaelinusCapability } from "@/content/caelinus";
import { ALL_PERSONAS } from "@/lib/personas";

export const metadata: Metadata = {
  title: "Caelinus — Bir Dünya. Bir Hikâye. Bir Miras.",
  description:
    "Caelinus, hayal gücünün sınırlarını zorlayan epik bir evren. CR Yapım'ın amiral gemisi: yazılan, tasarlanan ve inşa edilen yaşayan bir dünya.",
  openGraph: {
    title: "Caelinus — Bir evren doğuyor",
    description:
      "Caelinus bir proje değil, bir yolculuk. Senaryo, kitap, fikir, tasarım ve hikâyeli koleksiyonlarla kurulan yaşayan bir dünya.",
    type: "website",
  },
};

const c = caelinusTr;

export default function CaelinusAIPage() {
  return (
    <div className="pb-24">
      <div className="px-6 md:px-10 max-w-6xl mx-auto pt-8">
        <Link
          href="/#dunyalar"
          className="mono-tag text-mist-500 hover:text-tower-gold transition-colors inline-block"
        >
          ← CR Yapım · Dünyalar
        </Link>
      </div>

      {/* ═══ HERO — full-bleed sinematik gerçek görsel + canlı metin ═══ */}
      <section className="relative w-full min-h-[82vh] flex items-center overflow-hidden mt-4">
        {/* Gerçek görsel: public/worlds/caelinus.png eklenince otomatik; yokken
            sakin sinematik placeholder (stilize küre/AI galaksi YOK). */}
        <CoverImage
          src="/worlds/caelinus.png"
          alt="Caelinus — ofis penceresinde doğan bir dünya"
          priority
          kenBurns
        />

        {/* Okunabilirlik perdesi — sol koyu (metin), sağ (pencere/masa) nefes alsın.
            Küre sol-merkezde ışıdığı için sol perde biraz güçlü; yazı diri kalır. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,9,6,0.94) 0%, rgba(11,9,6,0.82) 30%, rgba(11,9,6,0.5) 55%, rgba(11,9,6,0.15) 78%, transparent 100%), linear-gradient(180deg, rgba(11,9,6,0.35) 0%, transparent 40%, transparent 60%, rgba(11,9,6,0.7) 100%)",
          }}
        />

        <div className="relative z-10 w-full px-6 md:px-10 max-w-6xl mx-auto">
          <div
            className="max-w-xl crane-in"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7), 0 0 24px rgba(0,0,0,0.45)" }}
          >
            <p className="mono-tag text-tower-gold/85">{c.tagline}</p>
            <h1
              className="editorial text-5xl md:text-7xl text-mist-100 leading-none mt-4"
              style={{ letterSpacing: "0.12em" }}
            >
              {c.title.toUpperCase()}
            </h1>

            <div className="mt-8 space-y-5 crane-in-slow">
              {c.body.slice(0, -1).map((p, i) => (
                <p key={i} className="body-readable text-mist-300">
                  {p}
                </p>
              ))}
            </div>

            <p className="editorial-italic text-2xl md:text-3xl text-tower-gold mt-8 leading-snug crane-in-slow">
              {c.body[c.body.length - 1]}
            </p>
          </div>
        </div>
      </section>

      {/* ═══ BİZ NE YAPIYORUZ? ═══ */}
      <section className="px-6 md:px-10 max-w-6xl mx-auto mt-24 md:mt-32 border-t border-border-subtle pt-14">
        <h2 className="editorial text-3xl md:text-4xl text-mist-100">
          {c.capabilitiesTitle}
        </h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {c.capabilities.map((cap, i) => (
            <Reveal as="li" key={cap.title} delay={i * 80}>
              <div className="h-full">
                <span className="inline-flex text-tower-gold" aria-hidden>
                  <CapabilityIcon icon={cap.icon} />
                </span>
                <h3 className="mono-tag text-mist-100 mt-4">{cap.title}</h3>
                <p className="body-readable text-mist-400 mt-2 text-[0.92rem]">
                  {cap.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ═══ KAPANIŞ — her dünya bir ilk cümleyle başlar ═══ */}
      <section className="px-6 md:px-10 max-w-6xl mx-auto mt-24 md:mt-32 text-center">
        <Reveal>
          <p className="editorial-italic text-3xl md:text-5xl text-mist-100 leading-snug max-w-3xl mx-auto text-balance">
            “{c.quote}”
          </p>
        </Reveal>
        <p className="mono-tag text-tower-gold/70 mt-8">{c.status}</p>
      </section>

      {/* ═══ İLK ÇALIŞAN KATMAN — stylist / moodboard (canlı, denenebilir) ═══ */}
      <section className="px-6 md:px-10 max-w-6xl mx-auto mt-24 md:mt-32 border-t border-border-subtle pt-14">
        <p className="mono-tag text-mist-500">ilk çalışan katman · dene</p>
        <h2 className="editorial mt-3 text-3xl md:text-4xl text-mist-100 leading-tight">
          Caelinus'un stylist katmanı.
        </h2>
        <p className="body-readable text-mist-400 mt-4 max-w-2xl">
          Evren yakında; ama motorun ilk yüzü şimdiden çalışıyor. Bir vibe yaz —
          bir mevsim, bir renk, bir his — Caelinus dört görsellik bir moodboard
          üretir ve renkleri, dokuyu, atmosferi okur.
        </p>

        <div className="mt-10">
          <MoodboardStudio />
        </div>

        <div className="mt-16">
          <p className="mono-tag text-mist-500">altı yüz · tek motor</p>
          <ul className="mt-6 grid md:grid-cols-2 gap-4">
            {ALL_PERSONAS.map((p) => (
              <li
                key={p.id}
                className="rounded-2xl p-6 transition-colors"
                style={{ border: `1px solid ${p.accent}25`, background: "rgba(18,16,12,0.4)" }}
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
                    <p className="editorial text-2xl text-mist-100 leading-none">{p.name}</p>
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
      </section>

      {/* ═══ Alt navigasyon ═══ */}
      <div className="px-6 md:px-10 max-w-6xl mx-auto mt-20 flex flex-wrap gap-3 border-t border-border-subtle pt-8">
        <Link
          href="/#birlikte"
          className="mono-tag inline-flex items-center gap-2 border border-tower-gold/45 text-tower-gold hover:bg-tower-gold/10 px-5 py-3 rounded-full transition-colors"
        >
          Bir dünya kuralım →
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

/** İnce çizgili ikonlar — capability anahtarına göre (stok ikon yok). */
function CapabilityIcon({ icon }: { icon: CaelinusCapability["icon"] }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (icon) {
    case "pen":
      return (
        <svg {...common}>
          <path d="M4 20c2-1 3-4 6-9s5-6 7-6c1 0 1 2-1 5s-6 6-9 8-3 2-3 2z" />
          <path d="M13 6l3 3" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5C4.7 19 4 18.3 4 17.5z" />
          <path d="M20 5.5C20 4.7 19.3 4 18.5 4H13v15h5.5c.8 0 1.5-.7 1.5-1.5z" />
        </svg>
      );
    case "bulb":
      return (
        <svg {...common}>
          <path d="M9 18h6" />
          <path d="M10 21h4" />
          <path d="M12 3a6 6 0 0 0-3.8 10.6c.5.4.8 1 .8 1.6v.8h6v-.8c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3z" />
        </svg>
      );
    case "design":
      return (
        <svg {...common}>
          <path d="M3 3l6 6-4 4-2-2 2-2" />
          <path d="M14 10l7 7-3 3-7-7" />
          <path d="M12 12l2 2" />
        </svg>
      );
    case "star":
    default:
      return (
        <svg {...common}>
          <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" />
        </svg>
      );
  }
}
