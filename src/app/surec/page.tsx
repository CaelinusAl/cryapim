import type { Metadata } from "next";
import Link from "next/link";
import pages from "@/content/pages.tr.json";
import { PageHero } from "@/components/page-hero";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { Reveal } from "@/components/reveal";

const t = pages.surec;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: "/surec",
  },
  openGraph: {
    type: "website",
    url: "https://cryapim.com/surec",
    siteName: "CR YAPIM",
    title: t.meta.title,
    description: t.meta.description,
    locale: "tr_TR",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: t.faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function SurecPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Süreç", path: "/surec" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        label={t.hero.label}
        titlePre={t.hero.titlePre}
        titleEm={t.hero.titleEm}
        titlePost={t.hero.titlePost}
        lead={t.hero.lead}
      />

      <main className="px-6 pb-[clamp(5rem,9vw,9rem)] sm:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          {/* Adımlar */}
          {t.steps.map((step, i) => (
            <section
              key={step.num}
              className={`py-[clamp(4rem,7vw,6rem)] ${
                i > 0 ? "border-t border-gold/20" : ""
              }`}
            >
              <Reveal>
                <div className="grid gap-10 sm:grid-cols-[auto_1fr] sm:gap-16">
                  <span
                    aria-hidden="true"
                    className="font-serif text-[clamp(3.5rem,8vw,6rem)] leading-none italic text-gold/70"
                  >
                    {step.num}
                  </span>
                  <div>
                    <h2 className="mb-4 font-serif text-[clamp(1.7rem,3.6vw,2.6rem)] leading-[1.1] text-ink">
                      {step.title}
                    </h2>
                    <p className="mb-6 max-w-xl font-serif text-[1.05rem] italic leading-relaxed text-ink/80">
                      {step.body}
                    </p>
                    <p className="mb-8 max-w-xl text-[0.85rem] leading-relaxed text-muted">
                      {step.detail}
                    </p>
                    <p className="max-w-xl border-l border-gold/40 pl-5 text-[0.78rem] leading-relaxed text-dim">
                      {step.deliverable}
                    </p>
                  </div>
                </div>
              </Reveal>
            </section>
          ))}

          {/* SSS */}
          <section className="border-t border-gold/20 py-[clamp(4rem,7vw,6rem)]">
            <Reveal>
              <h2 className="mb-14 text-[0.68rem] font-medium uppercase tracking-[0.45em] text-gold">
                {t.faq.label}
              </h2>
            </Reveal>
            <div className="space-y-12">
              {t.faq.items.map((item, i) => (
                <Reveal key={item.q} delay={i * 0.06}>
                  <div className="grid gap-4 sm:grid-cols-[1fr_1.4fr] sm:gap-12">
                    <h3 className="font-serif text-[1.2rem] italic leading-snug text-ink">
                      {item.q}
                    </h3>
                    <p className="text-[0.84rem] leading-relaxed text-muted">
                      {item.a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-gold/20 pt-[clamp(4rem,7vw,6rem)] text-center">
            <Reveal>
              <p className="mb-10 font-serif text-[clamp(1.5rem,3.4vw,2.4rem)] italic leading-[1.2] text-ink">
                {t.cta.pre}
              </p>
              <Link
                href={t.cta.href}
                className="inline-block border border-gold/60 px-10 py-4 text-[0.72rem] font-medium uppercase tracking-[0.35em] text-gold transition-colors hover:bg-gold hover:text-black"
              >
                {t.cta.label} <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </section>
        </div>
      </main>
    </>
  );
}
