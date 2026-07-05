import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { Reveal } from "@/components/reveal";
import { getContent } from "@/lib/content";
import { SERVICE_SLUGS, SITE_URL } from "@/lib/routes";
import {
  getAdjacentServices,
  getService,
  getServiceIndex,
} from "@/lib/services";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const url = `${SITE_URL}/hizmetler/${service.slug}`;

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: {
      canonical: `/hizmetler/${service.slug}`,
    },
    openGraph: {
      type: "website",
      url,
      siteName: "CR YAPIM",
      title: service.seoTitle,
      description: service.seoDescription,
      locale: "tr_TR",
    },
  };
}

/** Serif başlıkta altın italik vurgu için başlığı böler: son sözcük vurgulanır. */
function splitTitle(title: string): { pre?: string; em: string } {
  const words = title.split(" ");
  if (words.length === 1) return { em: title };
  return {
    pre: words.slice(0, -1).join(" "),
    em: words[words.length - 1],
  };
}

function Divider() {
  return <div className="h-px w-full bg-gold/20" aria-hidden="true" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 text-[0.68rem] font-medium uppercase tracking-[0.45em] text-gold">
      {children}
    </h2>
  );
}

export default async function HizmetDetayPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const index = getServiceIndex(service.slug);
  const number = String(index + 1).padStart(2, "0");
  const { prev, next } = getAdjacentServices(service.slug);
  const { pre, em } = splitTitle(service.title);
  const cta = getContent("tr").cta;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription,
    url: `${SITE_URL}/hizmetler/${service.slug}`,
    serviceType: service.title,
    areaServed: {
      "@type": "Country",
      name: "TR",
    },
    provider: {
      "@type": "Organization",
      name: "CR YAPIM",
      url: SITE_URL,
      email: "merhaba@cryapim.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "İstanbul",
        addressCountry: "TR",
      },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <main>
      <PageHero
        label={`Hizmet / ${number}`}
        titlePre={pre}
        titleEm={em}
        lead={service.lead}
      />

      <div className="px-6 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl">
          {/* Ne yapıyoruz */}
          <section className="py-[clamp(3.5rem,6vw,5.5rem)]">
            <Reveal>
              <SectionLabel>Ne yapıyoruz</SectionLabel>
              <div className="space-y-6">
                {service.what.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="max-w-3xl text-[0.88rem] leading-relaxed text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* Yaklaşımımız */}
          <section className="py-[clamp(3.5rem,6vw,5.5rem)]">
            <Reveal>
              <SectionLabel>Yaklaşımımız</SectionLabel>
              <ol className="grid gap-px sm:grid-cols-2">
                {service.approach.map((step, i) => (
                  <li
                    key={step.title}
                    className="border border-gold/15 p-8"
                  >
                    <span className="mb-5 block text-[0.62rem] tracking-[0.35em] text-dim">
                      ↳ {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mb-3 font-serif text-lg leading-snug text-ink">
                      {step.title}
                    </h3>
                    <p className="text-[0.82rem] leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </section>

          <Divider />

          {/* Neler kazandırır */}
          <section className="py-[clamp(3.5rem,6vw,5.5rem)]">
            <Reveal>
              <SectionLabel>Neler kazandırır</SectionLabel>
              <ul className="space-y-4">
                {service.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-baseline gap-4 text-[0.86rem] leading-relaxed text-muted"
                  >
                    <span className="text-gold" aria-hidden="true">
                      —
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          <Divider />

          {/* Kimler için */}
          <section className="py-[clamp(3.5rem,6vw,5.5rem)]">
            <Reveal>
              <SectionLabel>Kimler için</SectionLabel>
              <p className="max-w-3xl font-serif text-[clamp(1.2rem,2.4vw,1.6rem)] leading-relaxed text-ink">
                {service.audience}
              </p>
            </Reveal>
          </section>

          <Divider />

          {/* SSS */}
          <section className="py-[clamp(3.5rem,6vw,5.5rem)]">
            <Reveal>
              <SectionLabel>Sık sorulan sorular</SectionLabel>
              <div className="divide-y divide-gold/15 border-y border-gold/15">
                {service.faq.map((item) => (
                  <details key={item.q} className="group">
                    <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-6 text-[0.88rem] text-ink transition-colors hover:text-gold [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <span
                        className="text-gold transition-transform duration-300 group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="max-w-3xl pb-8 text-[0.84rem] leading-relaxed text-muted">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* Diğer hizmetler */}
          <nav
            aria-label="Diğer hizmetler"
            className="py-[clamp(3.5rem,6vw,5.5rem)]"
          >
            <SectionLabel>Diğer hizmetler</SectionLabel>
            <div className="grid gap-px sm:grid-cols-2">
              <Link
                href={`/hizmetler/${prev.slug}`}
                className="group border border-gold/15 p-8 transition-colors duration-500 hover:border-gold/60"
              >
                <span className="mb-5 block text-[0.62rem] tracking-[0.35em] text-dim">
                  ← Önceki / {String(getServiceIndex(prev.slug) + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-lg leading-snug text-ink transition-colors duration-500 group-hover:text-gold">
                  {prev.title}
                </span>
              </Link>
              <Link
                href={`/hizmetler/${next.slug}`}
                className="group border border-gold/15 p-8 text-right transition-colors duration-500 hover:border-gold/60"
              >
                <span className="mb-5 block text-[0.62rem] tracking-[0.35em] text-dim">
                  Sonraki / {String(getServiceIndex(next.slug) + 1).padStart(2, "0")} →
                </span>
                <span className="font-serif text-lg leading-snug text-ink transition-colors duration-500 group-hover:text-gold">
                  {next.title}
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* CTA */}
      <section className="border-t border-gold/20 px-6 py-[clamp(5rem,9vw,8rem)] sm:px-12 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="font-serif text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.15] text-ink">
              {cta.headingPre}{" "}
              <em className="italic text-gold">{cta.headingEm}</em>{" "}
              {cta.headingPost}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[0.86rem] leading-relaxed text-muted">
              {cta.sub}
            </p>
            <Link
              href="/iletisim"
              className="mt-12 inline-block border border-gold/60 px-10 py-4 text-[0.68rem] font-medium uppercase tracking-[0.4em] text-gold transition-colors duration-500 hover:bg-gold hover:text-black"
            >
              {cta.btn}
            </Link>
          </Reveal>
        </div>
      </section>

      <BreadcrumbJsonLd
        items={[
          { name: "Hizmetler", path: "/hizmetler" },
          { name: service.title, path: `/hizmetler/${service.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}
