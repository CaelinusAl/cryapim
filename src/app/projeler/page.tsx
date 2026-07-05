import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import pages from "@/content/pages.tr.json";
import { PageHero } from "@/components/page-hero";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { Reveal } from "@/components/reveal";

const t = pages.projeler;

const CASE_IMAGES = [
  {
    src: "/brand/egg-alt-800.webp",
    alt: "CR YAPIM — altın ve mor fırça darbeli seramik yumurta, proje sembolü",
  },
  {
    src: "/brand/egg-icon-swirl-800.webp",
    alt: "CR YAPIM marka amblemi — spiral altın-mor doku",
  },
  {
    src: "/brand/egg-landscape-800.webp",
    alt: "CR YAPIM kimlik görseli — CR YAPIM wordmark ile yumurta formu",
  },
];

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: "/projeler",
  },
  openGraph: {
    type: "website",
    url: "https://cryapim.com/projeler",
    siteName: "CR YAPIM",
    title: t.meta.title,
    description: t.meta.description,
    locale: "tr_TR",
  },
};

interface CaseBlockProps {
  label: string;
  text: string;
}

function CaseBlock({ label, text }: CaseBlockProps) {
  return (
    <div>
      <h3 className="mb-3 text-[0.62rem] font-medium uppercase tracking-[0.4em] text-gold">
        {label}
      </h3>
      <p className="text-[0.84rem] leading-relaxed text-muted">{text}</p>
    </div>
  );
}

export default function ProjelerPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Projeler", path: "/projeler" }]} />

      <PageHero
        label={t.hero.label}
        titlePre={t.hero.titlePre}
        titleEm={t.hero.titleEm}
        titlePost={t.hero.titlePost}
        lead={t.hero.lead}
      />

      <main className="px-6 pb-[clamp(5rem,9vw,9rem)] sm:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          {t.cases.map((work, i) => {
            const image = CASE_IMAGES[i % CASE_IMAGES.length];
            return (
            <article
              key={work.name}
              className={`py-[clamp(4rem,7vw,6rem)] ${
                i > 0 ? "border-t border-gold/20" : ""
              }`}
            >
              <Reveal>
                <div className="mb-10 grid gap-8 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                  <div className="relative hidden aspect-square w-20 shrink-0 overflow-hidden border border-gold/25 sm:block">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-baseline gap-5">
                    <span
                      aria-hidden="true"
                      className="font-serif text-[1.1rem] italic text-gold"
                    >
                      {work.badge}
                    </span>
                    <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] text-ink">
                      {work.name}
                    </h2>
                  </div>
                  <div className="hidden shrink-0 text-right text-[0.62rem] tracking-[0.35em] text-dim sm:block">
                    <div>({work.index})</div>
                    <div className="mt-2">{work.year}</div>
                  </div>
                </div>

                <p className="mb-4 text-[0.62rem] uppercase tracking-[0.35em] text-dim">
                  {work.tags}
                </p>
                <p className="mb-12 max-w-2xl text-[0.88rem] leading-relaxed text-ink/80">
                  {work.summary}
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="grid gap-10 sm:grid-cols-3">
                  <CaseBlock label="Zorluk" text={work.challenge} />
                  <CaseBlock label="Yaklaşım" text={work.approach} />
                  <CaseBlock label="Sonuç" text={work.outcome} />
                </div>
              </Reveal>
            </article>
            );
          })}

          {/* CTA */}
          <section className="border-t border-gold/20 pt-[clamp(4rem,7vw,6rem)] text-center">
            <Reveal>
              <h2 className="mb-6 font-serif text-[clamp(1.8rem,4.5vw,3.2rem)] leading-[1.12] text-ink">
                {t.cta.headingPre}{" "}
                <em className="italic text-gold">{t.cta.headingEm}</em>{" "}
                {t.cta.headingPost}
              </h2>
              <p className="mx-auto mb-12 max-w-xl text-[0.85rem] leading-relaxed text-muted">
                {t.cta.sub}
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
