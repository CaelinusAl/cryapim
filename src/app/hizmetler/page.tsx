import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { Reveal } from "@/components/reveal";
import { SITE_URL } from "@/lib/routes";
import { getAllServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "Hizmetler | CR YAPIM",
  description:
    "Yapay zekâ çözümlerinden mobil uygulama geliştirmeye, web tasarımından marka kimliği ve hikâye tasarımına: bir fikrin bütün dijital evrenini kuran on hizmet.",
  alternates: {
    canonical: "/hizmetler",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/hizmetler`,
    siteName: "CR YAPIM",
    title: "Hizmetler | CR YAPIM",
    description:
      "Yapay zekâ, mobil ve web geliştirme, oyun, UI/UX, marka kimliği, hikâye ve evren tasarımı, içerik, sosyal medya ve 3D deneyimler. Tek çatı altında.",
    locale: "tr_TR",
  },
};

export default function HizmetlerPage() {
  const services = getAllServices();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CR YAPIM Hizmetleri",
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: service.title,
      url: `${SITE_URL}/hizmetler/${service.slug}`,
    })),
  };

  return (
    <main>
      <PageHero
        label="Hizmetler"
        titlePre="Bir fikrin bütün"
        titleEm="dijital evrenini"
        titlePost="kuruyoruz."
        lead="Hikâyeden yazılıma, tasarımdan yapay zekâya on disiplin; tek çatı altında, tek ses. Her hizmet aynı amaca çalışır: markanızın içine girilebilen dünyasını kurmak."
      />

      <section className="px-6 py-[clamp(4rem,8vw,7rem)] sm:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={Math.min(i * 0.05, 0.3)}>
                <Link
                  href={`/hizmetler/${service.slug}`}
                  className="group flex h-full flex-col border border-gold/15 p-8 transition-colors duration-500 hover:border-gold/60"
                >
                  <span className="mb-6 text-[0.62rem] tracking-[0.35em] text-dim">
                    ↳ {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mb-4 font-serif text-xl leading-snug text-ink transition-colors duration-500 group-hover:text-gold">
                    {service.title}
                  </h2>
                  <p className="mb-8 flex-1 text-[0.82rem] leading-relaxed text-muted">
                    {service.short}
                  </p>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[0.62rem] uppercase tracking-[0.3em] text-gold/80">
                      {service.tags}
                    </span>
                    <span
                      className="text-[0.72rem] text-dim transition-colors duration-500 group-hover:text-gold"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BreadcrumbJsonLd items={[{ name: "Hizmetler", path: "/hizmetler" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </main>
  );
}
