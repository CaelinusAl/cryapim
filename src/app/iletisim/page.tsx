import type { Metadata } from "next";
import Link from "next/link";
import pages from "@/content/pages.tr.json";
import { getContent } from "@/lib/content";
import { PageHero } from "@/components/page-hero";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { Reveal } from "@/components/reveal";
import { ContactSection } from "@/features/contact/ContactSection";

const t = pages.iletisim;
const cta = getContent("tr").cta;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: "/iletisim",
  },
  openGraph: {
    type: "website",
    url: "https://cryapim.com/iletisim",
    siteName: "CR YAPIM",
    title: t.meta.title,
    description: t.meta.description,
    locale: "tr_TR",
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: t.meta.title,
  description: t.meta.description,
  url: "https://cryapim.com/iletisim",
  mainEntity: {
    "@type": "Organization",
    name: "CR YAPIM",
    legalName: "CR Yapım Teknoloji",
    email: "merhaba@cryapim.com",
    url: "https://cryapim.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "İstanbul",
      addressCountry: "TR",
    },
  },
};

export default function IletisimPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "İletişim", path: "/iletisim" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <PageHero
        label={t.hero.label}
        titlePre={t.hero.titlePre}
        titleEm={t.hero.titleEm}
        titlePost={t.hero.titlePost}
        lead={t.hero.lead}
      />

      <main>
        {/* Adres bloğu */}
        <section className="px-6 py-[clamp(4rem,7vw,6rem)] sm:px-12 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <h2 className="mb-10 text-[0.68rem] font-medium uppercase tracking-[0.45em] text-gold">
                {t.address.label}
              </h2>
              <div className="grid gap-10 sm:grid-cols-3">
                <div>
                  <p className="mb-2 text-[0.6rem] uppercase tracking-[0.35em] text-dim">
                    Şirket
                  </p>
                  <p className="text-[0.85rem] text-ink">{t.address.company}</p>
                </div>
                <div>
                  <p className="mb-2 text-[0.6rem] uppercase tracking-[0.35em] text-dim">
                    Konum
                  </p>
                  <p className="text-[0.85rem] text-ink">{t.address.city}</p>
                </div>
                <div>
                  <p className="mb-2 text-[0.6rem] uppercase tracking-[0.35em] text-dim">
                    E-posta
                  </p>
                  <a
                    href={`mailto:${t.address.email}`}
                    className="text-[0.85rem] text-gold transition-colors hover:text-ink"
                  >
                    {t.address.email}
                  </a>
                </div>
              </div>
              <p className="mt-10 max-w-xl text-[0.8rem] leading-relaxed text-muted">
                {t.address.note}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Form — mevcut bileşen yeniden kullanılır */}
        <ContactSection content={cta} />

        {/* Keşfet bağlantıları */}
        <section className="px-6 pb-[clamp(5rem,9vw,9rem)] sm:px-12 lg:px-20">
          <div className="mx-auto max-w-4xl border-t border-gold/20 pt-12 text-center">
            <Reveal>
              <p className="mb-8 text-[0.68rem] uppercase tracking-[0.35em] text-dim">
                {t.explore.pre}
              </p>
              <nav className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10">
                {t.explore.links.map((link) => (
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
          </div>
        </section>
      </main>
    </>
  );
}
