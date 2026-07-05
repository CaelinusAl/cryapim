import type { Metadata } from "next";
import { DM_Mono, Instrument_Serif } from "next/font/google";
import { getContent } from "@/lib/content";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  subsets: ["latin", "latin-ext"],
});

const content = getContent("tr");

export const metadata: Metadata = {
  metadataBase: new URL("https://cryapim.com"),
  title: content.meta.title,
  description: content.meta.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://cryapim.com",
    siteName: "CR YAPIM",
    title: content.meta.title,
    description: content.meta.description,
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.title,
    description: content.meta.description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CR YAPIM",
  url: "https://cryapim.com",
  description:
    "A creative technology studio turning ideas into living digital experiences — AI solutions, mobile and web development, games, digital product design (UI/UX), brand identity, story & universe design, content production and social media.",
  email: "merhaba@cryapim.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "İstanbul",
    addressCountry: "TR",
  },
  knowsAbout: [
    "Artificial intelligence",
    "Mobile app development",
    "Web development",
    "Game development",
    "UI/UX design",
    "Brand identity",
    "Storytelling",
    "Content production",
    "Social media",
    "3D experiences",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${instrumentSerif.variable} ${dmMono.variable} antialiased`}
    >
      <body className="bg-black text-ink">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
