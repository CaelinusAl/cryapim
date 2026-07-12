import { Cormorant_Garamond, Inter } from "next/font/google";

/**
 * Perde'ye özel tipografi katmanı — yalnızca /perde alt-ağacında geçerli.
 * Ana site token'larına (Didone editorial + system sans) DOKUNMAZ.
 *
 * Başlık: Cormorant Garamond (yüksek kontrastlı, edebi serif)
 * Metin:  Inter
 * next/font ile self-host → CDN yok, FOUT yok. latin-ext = Türkçe glifler.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-perde-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-perde-body",
  display: "swap",
});

export default function PerdeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${cormorant.variable} ${inter.variable} perde-theme`}>
      {children}
    </div>
  );
}
