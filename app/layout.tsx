import type { Metadata } from "next";
import "./globals.css";
import { SiteFrame } from "@/components/SiteFrame";

export const metadata: Metadata = {
  metadataBase: new URL("https://cryapim.com"),
  title: {
    default: "CR YAPIM — Boğaz'da bir plato, Caelinus AI sahnenin ardında",
    template: "%s · CR YAPIM",
  },
  description:
    "İstanbul Boğazı'nda, Kız Kulesi'nin gözü altında çekilen, Caelinus AI ile zamanı katlayan ruhsal yapımlar evi. Ruhsal Yatırım, Nasıl Yaratıyorum, Az Kalsın Bende İnanıyordum, Rivayet Avcısı, Sanrı'ya Sor, Selbi Yemekte Ne Var?",
  openGraph: {
    title: "CR YAPIM — Zamansız Yapımlar Evi",
    description:
      "Boğaz'da bir plato. Kız Kulesi tanık. Caelinus AI sufle veriyor.",
    url: "https://cryapim.com",
    siteName: "CR YAPIM",
    locale: "tr_TR",
    type: "website",
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
