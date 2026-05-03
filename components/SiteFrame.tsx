import Link from "next/link";
import type { ReactNode } from "react";
import { BosphorusBackdrop } from "@/components/BosphorusBackdrop";
import { SanriBubble } from "@/components/sanri/SanriBubble";

/**
 * SiteFrame — sitenin sinematik çerçevesi.
 *
 * Üst menüde maksimum 5 madde tutulur (vizyon kararı). İletişim
 * footer'a bırakılır. Logotype küçük: marka mütevazı, içerik
 * gürültücü.
 *
 * Boğaz arka planı tüm sayfalara hizmet eden tek bir sabit
 * (fixed) katman: scroll'da yerinde kalır, içerik üstüne kayar.
 */
const NAV = [
  { href: "/yapimlar", label: "Yapımlar" },
  { href: "/plato", label: "Plato" },
  { href: "/caelinus-ai", label: "Caelinus AI" },
  { href: "/arsiv", label: "Arşiv" },
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

        <nav className="hidden md:flex items-center gap-8 mono-tag">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-mist-300 hover:text-tower-gold transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/iletisim"
          className="hidden md:inline-flex mono-tag text-night-950 bg-tower-gold/90 hover:bg-tower-gold px-4 py-2 rounded-full transition-colors"
        >
          İş birliği
        </Link>
      </header>

      <main className="relative z-10 flex-1">{children}</main>

      <footer className="relative z-10 mt-24 border-t border-mist-500/15 px-6 md:px-10 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-mist-300">
          <div>
            <p className="mono-tag text-mist-500">CR YAPIM</p>
            <p className="editorial-italic text-mist-100 text-xl md:text-2xl mt-3 leading-snug">
              Duyulmamış bir hikâyeyi, duyulmuş gibi anlatma sanatı.
            </p>
          </div>
          <div>
            <p className="mono-tag text-mist-500">Plato</p>
            <p className="text-base mt-3">İstanbul · Boğaz</p>
            <p className="text-sm text-mist-500 mt-2 leading-relaxed">
              Adres mahremiyet için yayınlanmıyor — iş birliği talepleri için form.
            </p>
          </div>
          <div>
            <p className="mono-tag text-mist-500">Bağlantı</p>
            <ul className="text-base mt-3 space-y-2">
              <li>
                <a
                  href="https://youtube.com/@cryapim"
                  className="hover:text-tower-gold transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/cryapim"
                  className="hover:text-tower-gold transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="hover:text-tower-gold transition-colors"
                >
                  İletişim
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

      {/* Sanrı — sağ alt köşede, tüm sayfalarda */}
      <SanriBubble />
    </>
  );
}
