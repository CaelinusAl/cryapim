import type { Metadata } from "next";
import "./globals.css";
import { SiteFrame } from "@/components/SiteFrame";

export const metadata: Metadata = {
  metadataBase: new URL("https://cryapim.com"),
  title: {
    default: "CR YAPIM — İstanbul Boğaz manzaralı içerik & yapım stüdyosu",
    template: "%s · CR YAPIM",
  },
  description:
    "İstanbul Boğazı'na bakan profesyonel içerik stüdyosu. Manzara sahnesi, atölye, podcast köşesi ve mutfak stüdyo; saatlik, günlük ve deneyim paketleriyle çekim, reels ve marka filmleri için hazır.",
  keywords: [
    "İstanbul stüdyo kiralama",
    "Boğaz manzaralı stüdyo",
    "içerik stüdyosu",
    "podcast stüdyosu",
    "marka çekimi",
    "reels çekimi",
    "yemek çekimi stüdyosu",
    "CR Yapım",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "CR YAPIM — Boğaz manzaralı içerik & yapım stüdyosu",
    description:
      "Boğaz'da bir sahne. İçerik, marka, podcast, mutfak — aynı kapıda. Net fiyatlı kiralama paketleri.",
    url: "https://cryapim.com",
    siteName: "CR YAPIM",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/studio-manzara.jpg",
        width: 1024,
        height: 682,
        alt: "CR Yapım Stüdyo — Boğaz manzaralı sahne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CR YAPIM — Boğaz manzaralı içerik & yapım stüdyosu",
    description:
      "Manzara · Atölye · Podcast · Mutfak. İstanbul Boğaz hattında profesyonel çekim stüdyosu.",
    images: ["/studio-manzara.jpg"],
  },
  robots: { index: true, follow: true },
};

/**
 * LocalBusiness JSON-LD — arama motorları ve üretken AI motorları (GEO)
 * için yapılandırılmış kimlik. Stüdyonun ne olduğunu, nerede olduğunu ve
 * nasıl ulaşılacağını makine-okur biçimde tanımlar.
 */
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "CR YAPIM",
  description:
    "İstanbul Boğazı'na bakan profesyonel içerik ve yapım stüdyosu; stüdyo kiralama ve içerik programları.",
  url: "https://cryapim.com",
  image: "https://cryapim.com/studio-manzara.jpg",
  email: "hello@cryapim.com",
  telephone: "+90 533 022 22 21",
  areaServed: "İstanbul, Türkiye",
  address: {
    "@type": "PostalAddress",
    addressLocality: "İstanbul",
    addressCountry: "TR",
  },
  sameAs: [
    "https://instagram.com/cryapim",
    "https://youtube.com/@cryapim",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </head>
      <body className="cinema-bars relative overflow-x-hidden">
        <div className="film-grain" aria-hidden />
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
