import type { Metadata } from "next";
import Link from "next/link";
import pages from "@/content/pages.tr.json";
import { PageHero } from "@/components/page-hero";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { Reveal } from "@/components/reveal";

const t = pages.hakkimizda;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: "/hakkimizda",
  },
  openGraph: {
    type: "website",
    url: "https://cryapim.com/hakkimizda",
    siteName: "CR YAPIM",
    title: t.meta.title,
    description: t.meta.description,
    locale: "tr_TR",
  },
};

function Divider() {
  return (
    <div
      className="mx-auto my-[clamp(4rem,7vw,6rem)] h-px max-w-4xl bg-gold/20"
      aria-hidden="true"
    />
  );
}

export default function HakkimizdaPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Hakkımızda", path: "/hakkimizda" }]} />

      <PageHero
        label={t.hero.label}
        titlePre={t.hero.titlePre}
        titleEm={t.hero.titleEm}
        titlePost={t.hero.titlePost}
        lead={t.hero.lead}
      />

      <main className="px-6 pb-[clamp(5rem,9vw,9rem)] sm:px-12 lg:px-20">
        {/* Kimiz */}
        <section className="mx-auto max-w-4xl pt-[clamp(4rem,7vw,6rem)]">
          <Reveal>
            <h2 className="mb-6 text-[0.68rem] font-medium uppercase tracking-[0.45em] text-gold">
              {t.who.label}
            </h2>
            <p className="mb-10 font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.15] text-ink">
              {t.who.headline}
            </p>
            <div className="max-w-2xl space-y-6">
              {t.who.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-[0.88rem] leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-gold/20 pt-8 sm:grid-cols-4">
              {t.meta_rows.map((row) => (
                <div key={row.label}>
                  <dt className="mb-2 text-[0.6rem] uppercase tracking-[0.35em] text-dim">
                    {row.label}
                  </dt>
                  <dd className="text-[0.78rem] text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        <Divider />

        {/* Vizyon & Misyon */}
        <section className="mx-auto grid max-w-4xl gap-14 sm:grid-cols-2">
          <Reveal>
            <h2 className="mb-6 text-[0.68rem] font-medium uppercase tracking-[0.45em] text-gold">
              {t.vision.label}
            </h2>
            <p className="font-serif text-[clamp(1.3rem,2.4vw,1.8rem)] leading-[1.3] text-ink">
              {t.vision.body}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mb-6 text-[0.68rem] font-medium uppercase tracking-[0.45em] text-gold">
              {t.mission.label}
            </h2>
            <p className="font-serif text-[clamp(1.3rem,2.4vw,1.8rem)] leading-[1.3] text-ink">
              {t.mission.body}
            </p>
          </Reveal>
        </section>

        <Divider />

        {/* Bizi farklı kılan */}
        <section className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="mb-6 text-[0.68rem] font-medium uppercase tracking-[0.45em] text-gold">
              {t.different.label}
            </h2>
            <p className="mb-10 font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.15] text-ink">
              {t.different.headline}
            </p>
            <div className="max-w-2xl space-y-6">
              {t.different.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-[0.88rem] leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </section>

        <Divider />

        {/* Değerler */}
        <section className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="mb-12 text-[0.68rem] font-medium uppercase tracking-[0.45em] text-gold">
              {t.values.label}
            </h2>
          </Reveal>
          <div className="grid gap-12 sm:grid-cols-3">
            {t.values.items.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.1}>
                <h3 className="mb-4 font-serif text-[1.35rem] italic text-gold">
                  {value.title}
                </h3>
                <p className="text-[0.82rem] leading-relaxed text-muted">
                  {value.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <Divider />

        {/* İç bağlantılar */}
        <section className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="mb-8 text-[0.68rem] uppercase tracking-[0.35em] text-dim">
              {t.cta.pre}
            </p>
            <nav className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10">
              {t.cta.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[0.78rem] uppercase tracking-[0.25em] text-gold transition-colors hover:text-ink"
                >
                  {link.label} <span aria-hidden="true">→</span>
                </Link>
              ))}
            </nav>
          </Reveal>
        </section>
      </main>
    </>
  );
}
