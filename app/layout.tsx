import type { Metadata } from "next";
import "./globals.css";
import { SiteFrame } from "@/components/SiteFrame";

export const metadata: Metadata = {
  metadataBase: new URL("https://cryapim.com"),
  title: {
    default: "CR YAPIM — Fikirleri dijital dünyalara dönüştüren yaratıcı teknoloji stüdyosu",
    template: "%s · CR YAPIM",
  },
  description:
    "CR Yapım, bir fikirden başlayıp çalışan dijital evrenler kuran yaratıcı teknoloji stüdyosudur. Strateji, anlatı, teknoloji ve tasarımı tek üretim hattında birleştirir. İstanbul.",
  openGraph: {
    title: "CR YAPIM — Yaratıcı teknoloji stüdyosu",
    description:
      "Web sitesi yapmıyoruz; çalışan dijital evrenler kuruyoruz. Fikirden hikâyeye, teknolojiden dünyaya — uçtan uca.",
    url: "https://cryapim.com",
    siteName: "CR YAPIM",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/hero.jpeg",
        width: 1402,
        height: 1122,
        alt: "CR Yapım — Boğaz'a bakan atölye",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CR YAPIM — Yaratıcı teknoloji stüdyosu",
    description:
      "Bir fikirden başlayıp çalışan dijital evrenler kuruyoruz. İstanbul.",
    images: ["/hero.jpeg"],
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
      {/* Font CDN yok: başlık = sistem Didone (Didot/Bodoni/Baskerville…),
          gövde = system sans. FOUT yok, ilk kare < 1sn (DESIGN-TOKENS.md). */}
      <body className="cinema-bars relative overflow-x-hidden">
        <div className="film-grain" aria-hidden />
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
