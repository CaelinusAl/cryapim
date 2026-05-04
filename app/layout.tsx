import type { Metadata } from "next";
import "./globals.css";
import { SiteFrame } from "@/components/SiteFrame";

export const metadata: Metadata = {
  metadataBase: new URL("https://cryapim.com"),
  title: {
    default:
      "CR YAPIM — İstanbul'un Boğaz manzaralı içerik & deneyim stüdyosu",
    template: "%s · CR YAPIM",
  },
  description:
    "İstanbul Boğazı'na bakan profesyonel içerik stüdyosu. Manzara sahnesi, Caelinus atölye, podcast köşesi, mutfak stüdyo. Saatlik / günlük kiralama + Caelinus AI moda deneyimi + Sanrı içerik ritüeli.",
  openGraph: {
    title: "CR YAPIM — Boğaz manzaralı içerik & deneyim stüdyosu",
    description:
      "Boğaz'da bir sahne. İçerik, moda, podcast, mutfak — aynı kapıda. Net fiyatlı kiralama paketleri.",
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
    title: "CR YAPIM — Boğaz manzaralı içerik & deneyim stüdyosu",
    description:
      "Manzara · Atölye · Podcast · Mutfak. İstanbul Boğaz hattında çekim & deneyim.",
    images: ["/studio-manzara.jpg"],
  },
  robots: { index: true, follow: true },
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
      </head>
      <body className="cinema-bars relative overflow-x-hidden">
        <div className="film-grain" aria-hidden />
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
