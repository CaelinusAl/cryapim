import type { Metadata } from "next";
import Link from "next/link";
import pages from "@/content/pages.tr.json";
import { getContent } from "@/lib/content";
import { PageHero } from "@/components/page-hero";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { Reveal } from "@/components/reveal";

const t = pages.manifesto;
const manifesto = getContent("tr").manifesto;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: "/manifesto",
  },
  openGraph: {
    type: "website",
    url: "https://cryapim.com/manifesto",
    siteName: "CR YAPIM",
    title: t.meta.title,
    description: t.meta.description,
    locale: "tr_TR",
  },
};

export default function ManifestoPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Manifesto", path: "/manifesto" }]} />

      <PageHero
        label={t.hero.label}
        titlePre={t.hero.titlePre}
        titleEm={t.hero.titleEm}
      />

      <main className="px-6 pb-[clamp(5rem,9vw,9rem)] sm:px-12 lg:px-20">
        {/* Manifesto — birebir metin, sahneli akış */}
        <section className="mx-auto max-w-3xl py-[clamp(5rem,9vw,8rem)] text-center">
          <Reveal>
            <p className="mx-auto mb-[clamp(4rem,7vw,6rem)] max-w-2xl font-serif text-[clamp(1.4rem,3vw,2rem)] italic leading-[1.4] text-ink/85">
              {manifesto.lead}
            </p>
          </Reveal>

          <div className="space-y-[clamp(3rem,5vw,4.5rem)]">
            {manifesto.lines.map((line, i) => (
              <Reveal key={line.a} delay={0.1 + i * 0.12}>
                <p className="font-serif text-[clamp(1.7rem,4vw,2.8rem)] leading-[1.2] text-ink">
                  {line.a}
                </p>
                <p className="mt-3 font-serif text-[clamp(1.2rem,2.6vw,1.8rem)] italic leading-[1.3] text-muted">
                  {line.b}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div
              className="mx-auto my-[clamp(4rem,7vw,6rem)] h-px w-24 bg-gold/40"
              aria-hidden="true"
            />
            <p className="font-serif text-[clamp(2rem,5vw,3.4rem)] leading-[1.15] text-gold">
              {manifesto.close}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mx-auto mt-[clamp(4rem,7vw,6rem)] max-w-xl text-[0.78rem] leading-relaxed tracking-[0.08em] text-dim">
              {manifesto.sig}
            </p>
          </Reveal>
        </section>

        {/* Bu sizin için ne demek */}
        <section className="mx-auto max-w-4xl border-t border-gold/20 pt-[clamp(4rem,7vw,6rem)]">
          <Reveal>
            <h2 className="mb-6 text-[0.68rem] font-medium uppercase tracking-[0.45em] text-gold">
              {t.clients.label}
            </h2>
            <p className="mb-10 font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.15] text-ink">
              {t.clients.headline}
            </p>
            <div className="max-w-2xl space-y-6">
              {t.clients.body.map((paragraph) => (
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
            <nav className="mt-14 flex flex-col gap-4 border-t border-gold/20 pt-10 sm:flex-row sm:gap-10">
              {t.clients.links.map((link) => (
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
