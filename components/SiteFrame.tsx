import Link from "next/link";
import type { ReactNode } from "react";
import { BosphorusBackdrop } from "@/components/BosphorusBackdrop";
import { PersonaBubble } from "@/components/personas/PersonaBubble";
import { BookCTA } from "@/components/BookCTA";

/**
 * SiteFrame — sitenin sinematik çerçevesi.
 *
 * Üst menü hiyerarşisi (vizyon kararı):
 *   Ön kapı     → Stüdyo (satış, ana CTA olarak parla)
 *   Derinlik    → Caelinus AI · Perde · Yapımlar (alt markalar/içerik)
 *   Hakkında    → Biz (footer'a kayar)
 * "Randevu Al" sağ üstte sabit altın CTA olarak duruyor.
 *
 * Boğaz arka planı tüm sayfalara hizmet eden tek bir sabit
 * (fixed) katman: scroll'da yerinde kalır, içerik üstüne kayar.
 */
const NAV = [
  { href: "/studio", label: "Stüdyo", accent: "#d4b26a" },
  { href: "/caelinus-ai", label: "Caelinus", accent: "#9fe7ff" },
  { href: "/perde", label: "Perde", accent: "#c95a5a" },
  { href: "/yapimlar", label: "Yapımlar" },
  { href: "/biz", label: "Biz" },
];

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Site geneli sahne perdesi — viewport'a yapışık */}
      <BosphorusBackdrop />

      <div className="relative z-10 min-h-screen flex flex-col">
      <header className="relative z-20 px-6 md:px-10 pt-10 pb-6 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span
            aria-hidden
            className="block w-10 h-10 rounded-full border border-tower-gold/40 flex items-center justify-center text-tower-gold text-base editorial-italic"
          >
            ✺
          </span>
          <span className="editorial text-2xl md:text-[1.75rem] tracking-wide text-mist-100 group-hover:text-tower-gold transition-colors">
            CR <span className="text-mist-300">YAPIM</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 mono-tag">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-tower-gold"
              style={{ color: item.accent ?? "#a8a4b8" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <BookCTA
          label="Randevu Al"
          variant="primary"
          size="sm"
          context="Üst menü"
          icon="📅"
          className="hidden md:inline-flex"
        />
      </header>

      <main className="relative z-10 flex-1">{children}</main>

      <footer className="relative z-10 mt-24 border-t border-mist-500/15 px-6 md:px-10 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-mist-300">
          <div className="md:col-span-2">
            <p className="mono-tag text-mist-500">CR YAPIM</p>
            <p className="editorial-italic text-mist-100 text-xl md:text-2xl mt-3 leading-snug">
              Boğaz manzaralı içerik & deneyim stüdyosu.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <BookCTA
                label="Randevu Al"
                variant="primary"
                size="sm"
                context="Footer"
              />
            </div>
          </div>
          <div>
            <p className="mono-tag text-mist-500">Sahneler</p>
            <ul className="text-base mt-3 space-y-2">
              <li>
                <Link href="/studio" className="hover:text-tower-gold transition-colors">
                  Stüdyo · kiralama
                </Link>
              </li>
              <li>
                <Link href="/caelinus-ai" className="hover:text-tower-gold transition-colors">
                  Caelinus · deneyim
                </Link>
              </li>
              <li>
                <Link href="/perde" className="hover:text-tower-gold transition-colors">
                  Perde · film yorumu
                </Link>
              </li>
              <li>
                <Link href="/yapimlar" className="hover:text-tower-gold transition-colors">
                  Yapımlar
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mono-tag text-mist-500">Bağlantı</p>
            <ul className="text-base mt-3 space-y-2">
              <li>İstanbul · Boğaz hattı</li>
              <li>
                <a
                  href="https://instagram.com/cryapim"
                  className="hover:text-tower-gold transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@cryapim"
                  className="hover:text-tower-gold transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="hover:text-tower-gold transition-colors"
                >
                  İletişim formu
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm text-mist-500">
          <p>© {new Date().getFullYear()} CR YAPIM · Caelinus AI ailesidir.</p>
          <p className="mono-tag">cryapim.com</p>
        </div>
      </footer>
      </div>

      {/* Caelinus AI personalar — sağ alt köşede, tüm sayfalarda */}
      <PersonaBubble />
    </>
  );
}
