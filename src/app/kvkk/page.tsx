import type { Metadata } from "next";
import Link from "next/link";
import pages from "@/content/pages.tr.json";
import { PageHero } from "@/components/page-hero";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";

const t = pages.kvkk;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: "/kvkk",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://cryapim.com/kvkk",
    siteName: "CR YAPIM",
    title: t.meta.title,
    description: t.meta.description,
    locale: "tr_TR",
  },
};

export default function KvkkPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "KVKK Aydınlatma Metni", path: "/kvkk" }]}
      />

      <PageHero
        label={t.hero.label}
        titlePre={t.hero.titlePre}
        titleEm={t.hero.titleEm}
        titlePost={t.hero.titlePost}
        lead={t.hero.lead}
      />

      <main className="px-6 pb-[clamp(5rem,9vw,9rem)] sm:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl pt-[clamp(3rem,6vw,5rem)]">
          {t.sections.map((section, i) => (
            <section
              key={section.title}
              className={i > 0 ? "mt-14 border-t border-gold/10 pt-14" : ""}
            >
              <h2 className="mb-6 text-[0.7rem] font-medium uppercase tracking-[0.35em] text-gold">
                {section.title}
              </h2>
              <div className="space-y-5">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-[0.84rem] leading-[1.9] text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <div className="mt-16 border-t border-gold/20 pt-10 text-[0.72rem] tracking-[0.15em] text-dim">
            <p>
              İlgili sayfa:{" "}
              <Link
                href="/gizlilik-politikasi"
                className="text-gold transition-colors hover:text-ink"
              >
                Gizlilik Politikası
              </Link>{" "}
              · Başvurularınız için:{" "}
              <a
                href="mailto:merhaba@cryapim.com"
                className="text-gold transition-colors hover:text-ink"
              >
                merhaba@cryapim.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
