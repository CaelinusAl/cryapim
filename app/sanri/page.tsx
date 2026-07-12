import type { Metadata } from "next";
import Link from "next/link";
import { CoverImage } from "@/components/ui/CoverImage";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { CtaButton } from "@/components/ui/CtaButton";
import { Reveal } from "@/components/ui/Reveal";
import { SanriNewsletter } from "@/components/sanri/SanriNewsletter";
import { sanriTr } from "@/content/sanri";

export const metadata: Metadata = {
  title: "Sanrı — Bir Hikâye. Bir Yolculuk. Bir Sanrı.",
  description:
    "Sanrı, CR Yapım'ın geliştirdiği özgün bir hikâye evreni. Gerçek ile hayalin sınırında; romanlar, senaryolar ve hikâyelerle kurulan bir anlatı dünyası.",
  openGraph: {
    title: "Sanrı — Bir anlatı evreni",
    description:
      "Gerçek ile hayalin sınırında doğmuş bir hikâye evreni. Psikolojik derinlik, karakter odaklı anlatı, sinematografik dünya.",
    type: "website",
  },
};

const s = sanriTr;

export default function SanriPage() {
  return (
    <div
      className="pb-24"
      style={{
        ["--sanri-accent" as string]: s.accent,
        // Tek kanvas hissi: sayfa boyunca sürekli, çok hafif dikey ton geçişi.
        background:
          "linear-gradient(180deg, transparent 0%, rgba(180,166,198,0.05) 40%, rgba(11,9,6,0) 70%, rgba(180,166,198,0.04) 100%)",
      }}
    >
      <div className="px-6 md:px-10 max-w-6xl mx-auto pt-8">
        <Link
          href="/#dunyalar"
          className="mono-tag text-mist-500 hover:text-tower-gold transition-colors inline-block"
        >
          ← CR Yapım · Dünyalar
        </Link>
      </div>

      {/* ═══ HERO ═══ */}
      <section className="relative w-full min-h-[82vh] flex items-center overflow-hidden mt-4">
        <CoverImage
          src={s.hero.media.poster as string}
          alt={s.hero.media.alt}
          priority
          kenBurns
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,9,6,0.94) 0%, rgba(11,9,6,0.8) 32%, rgba(11,9,6,0.45) 58%, rgba(11,9,6,0.12) 80%, transparent 100%), linear-gradient(180deg, rgba(11,9,6,0.3) 0%, transparent 42%, transparent 55%, rgba(11,9,6,0.85) 100%)",
          }}
        />
        <div className="relative z-10 w-full px-6 md:px-10 max-w-6xl mx-auto">
          <div
            className="max-w-xl crane-in"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7), 0 0 24px rgba(0,0,0,0.45)" }}
          >
            <h1
              className="editorial text-5xl md:text-7xl text-mist-100 leading-none"
              style={{ letterSpacing: "0.14em" }}
            >
              {s.hero.title.toUpperCase()}
            </h1>
            <p className="mono-tag text-[color:var(--sanri-accent)] mt-6">{s.hero.eyebrow}</p>
            <div className="mt-6 space-y-3 crane-in-slow">
              {s.hero.body.map((p, i) => (
                <p key={i} className="body-readable text-mist-300">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 crane-in-slow">
              <CtaButton
                cta={{ label: s.hero.cta.label, href: s.hero.cta.href, intent: "ghost" }}
                size="sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ KÖKEN — "Sanrı, CR'nin içinde doğdu" ═══ */}
      <section className="px-6 md:px-10 max-w-3xl mx-auto mt-24 md:mt-32 text-center">
        <Reveal>
          <div>
            <p className="mono-tag text-[color:var(--sanri-accent)]">{s.origin.kicker}</p>
            <p className="editorial-italic text-3xl md:text-4xl text-mist-100 mt-4 leading-snug text-balance">
              {s.origin.line}
            </p>
            <p className="body-readable text-mist-400 mt-6 max-w-2xl mx-auto">{s.origin.body}</p>
            <Link
              href={s.origin.link.href}
              className="mono-tag mt-7 inline-flex items-center gap-2 text-mist-300 hover:text-tower-gold transition-colors"
            >
              {s.origin.link.label} <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* İnce bağ — beat'leri tek iplikte tutar */}
      <SpineThread />

      {/* ═══ SANRI NEDİR? ═══ */}
      <section id="sanri-nedir" className="px-6 md:px-10 max-w-6xl mx-auto mt-20 md:mt-24 scroll-mt-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <Reveal>
            <div>
              <h2 className="editorial text-3xl md:text-4xl text-mist-100">{s.nedir.heading}</h2>
              <span
                aria-hidden
                className="block h-px w-16 mt-5 mb-6"
                style={{ background: "var(--sanri-accent)" }}
              />
              {s.nedir.body.map((p, i) => (
                <p key={i} className="body-readable text-mist-300">
                  {p}
                </p>
              ))}
              <Link
                href={s.nedir.link.href}
                className="mono-tag mt-8 inline-flex items-center gap-2 text-[color:var(--sanri-accent)] hover:translate-x-1 transition-transform"
              >
                {s.nedir.link.label} <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <MediaFrame
              media={s.nedir.media}
              accent={s.accent}
              ratio="4 / 3"
              label="Sanrı · görsel yakında"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </Reveal>
        </div>
      </section>

      <SpineThread />

      {/* ═══ SANRI EVRENİ — 4 kart (her biri kendi kimliğinde) ═══ */}
      <section id="sanri-evreni" className="px-6 md:px-10 max-w-6xl mx-auto mt-20 md:mt-24 scroll-mt-24">
        <h2 className="editorial text-3xl md:text-4xl text-mist-100 text-center">
          {s.universe.heading}
        </h2>
        <span
          aria-hidden
          className="block h-px w-16 mx-auto mt-5"
          style={{ background: "var(--sanri-accent)" }}
        />
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {s.universe.items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 80}>
              <UniverseCard item={item} />
            </Reveal>
          ))}
        </ul>
      </section>

      <SpineThread />

      {/* ═══ ÜRÜN KÖPRÜSÜ — asksanri.com ═══ */}
      <section className="px-6 md:px-10 max-w-3xl mx-auto mt-20 md:mt-24 text-center">
        <Reveal>
          <div>
            <p className="mono-tag text-[color:var(--sanri-accent)]">{s.product.kicker}</p>
            <p className="editorial text-2xl md:text-3xl text-mist-100 mt-4 leading-snug text-balance">
              {s.product.line}
            </p>
            <div className="mt-8 inline-flex flex-col items-center gap-3">
              <a
                href={s.product.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 mono-tag rounded-full px-7 py-4 transition-colors"
                style={{
                  color: "var(--sanri-accent)",
                  border: "1px solid color-mix(in srgb, var(--sanri-accent) 55%, transparent)",
                  background: "color-mix(in srgb, var(--sanri-accent) 8%, transparent)",
                  boxShadow: "0 0 28px -8px color-mix(in srgb, var(--sanri-accent) 70%, transparent)",
                }}
              >
                {s.product.cta.label}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <span className="mono-tag text-mist-500">asksanri.com</span>
            </div>
          </div>
        </Reveal>
      </section>

      <SpineThread />

      {/* ═══ KAPANIŞ — alıntı + bülten ═══ */}
      <section className="px-6 md:px-10 max-w-6xl mx-auto mt-20 md:mt-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <Reveal>
            <div>
              <span
                className="editorial text-5xl leading-none"
                style={{ color: "color-mix(in srgb, var(--sanri-accent) 45%, transparent)" }}
                aria-hidden
              >
                “
              </span>
              <blockquote className="editorial-italic text-2xl md:text-3xl text-mist-100 leading-snug -mt-4">
                {s.quote.text.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </blockquote>
              <p className="mono-tag text-mist-500 mt-5">— {s.quote.author}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <h2 className="mono-tag text-mist-100 tracking-widest">{s.newsletter.heading}</h2>
              <p className="body-readable text-mist-400 mt-3">{s.newsletter.hint}</p>
              <div className="mt-6">
                <SanriNewsletter content={s.newsletter} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/** İnce, sönümlenen dikey iplik — beat'ler arası "tek akış" hissi verir. */
function SpineThread() {
  return (
    <div aria-hidden className="flex justify-center mt-20 md:mt-24">
      <span
        className="block w-px h-16"
        style={{
          background:
            "linear-gradient(180deg, transparent, color-mix(in srgb, var(--sanri-accent) 55%, transparent), transparent)",
        }}
      />
    </div>
  );
}

function UniverseCard({ item }: { item: (typeof sanriTr)["universe"]["items"][number] }) {
  const accent = item.accent;
  const body = (
    <article
      className="group h-full rounded-2xl overflow-hidden border border-border-subtle bg-night-900/40 transition-[transform,border-color] duration-500 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      style={{ ["--card-accent" as string]: accent, borderColor: `${accent}22` }}
    >
      <MediaFrame
        media={item.media}
        accent={accent}
        ratio="3 / 4"
        label={`${item.title} · yakında`}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="p-5">
        <h3 className="mono-tag" style={{ color: accent }}>
          {item.title}
        </h3>
        <p className="body-readable text-mist-400 mt-2 text-[0.9rem]">{item.description}</p>
        <p className="mono-tag mt-4">
          {item.href ? (
            <span
              className="inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform"
              style={{ color: accent }}
            >
              İncele <span aria-hidden>→</span>
            </span>
          ) : (
            <span className="text-mist-500">yakında</span>
          )}
        </p>
      </div>
    </article>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="block h-full">
        {body}
      </Link>
    );
  }
  return body;
}
