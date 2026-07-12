import Link from "next/link";
import type { ReactNode } from "react";
import { AppBackdrop, AppPersonaBubble } from "@/components/chrome/SiteChrome";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MobileNav } from "@/components/nav/MobileNav";
import { LogoLink, Logo } from "@/components/brand/Logo";
import { CtaButton } from "@/components/ui/CtaButton";
import { primaryNav, primaryCta, footerGroups } from "@/content/navigation";
import { CONTACT, whatsappLink, mailtoLink, telLink } from "@/lib/contact";

/**
 * SiteFrame — sitenin sinematik çerçevesi (header + footer + backdrop).
 *
 * Navigasyon ve footer bağlantıları content/navigation.ts'ten gelir
 * (kodda sabit liste yok). Masaüstünde yatay nav, mobilde MobileNav —
 * kullanıcı hiçbir noktada navigasyonsuz kalmaz.
 */
export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AppBackdrop />

      <div className="relative z-10 min-h-screen flex flex-col">
        <header
          className="sticky top-0 z-30 px-6 md:px-10 py-4 md:py-5 flex items-center justify-between"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,6,15,0.78) 0%, rgba(7,6,15,0.62) 60%, rgba(7,6,15,0.42) 100%)",
            backdropFilter: "blur(12px) saturate(120%)",
            WebkitBackdropFilter: "blur(12px) saturate(120%)",
            borderBottom: "1px solid rgba(201,169,106,0.12)",
            boxShadow: "0 4px 20px -6px rgba(0,0,0,0.45)",
          }}
        >
          <LogoLink markSize={42} />

          <nav className="hidden md:flex items-center gap-7 mono-tag" aria-label="Ana menü">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-mist-300 transition-colors hover:text-tower-gold"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <CtaButton cta={primaryCta} size="sm" className="hidden md:inline-flex" />
            <MobileNav items={primaryNav} cta={primaryCta} />
          </div>
        </header>

        <main className="relative z-10 flex-1">{children}</main>

        <footer className="relative z-10 mt-24 border-t border-border-subtle px-6 md:px-10 py-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-mist-300">
            <div className="md:col-span-2">
              <Logo variant="image" width={240} />
              <p className="editorial-italic text-mist-100 text-xl md:text-2xl mt-6 leading-snug">
                Fikirleri dijital dünyalara dönüştüren yaratıcı teknoloji stüdyosu.
              </p>
              <div className="mt-6">
                <CtaButton cta={primaryCta} size="sm" />
              </div>
            </div>

            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="mono-tag text-mist-500">{group.title}</p>
                <ul className="text-base mt-3 space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="hover:text-tower-gold transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="max-w-6xl mx-auto mt-10 pt-8 border-t border-border-subtle grid md:grid-cols-2 gap-6 text-sm text-mist-400">
            <ul className="space-y-2">
              <li>İstanbul · Boğaz hattı</li>
              <li>
                <a href={telLink()} className="hover:text-tower-gold transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink("Footer")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-tower-gold transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={mailtoLink("Footer")}
                  className="hover:text-tower-gold transition-colors break-words"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
            <div className="flex flex-wrap gap-4 md:justify-end items-start">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-tower-gold transition-colors"
              >
                Instagram
              </a>
              <a
                href={CONTACT.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-tower-gold transition-colors"
              >
                YouTube
              </a>
              <Link href="/iletisim" className="hover:text-tower-gold transition-colors">
                İletişim
              </Link>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm text-mist-500">
            <p>© {new Date().getFullYear()} CR YAPIM · Caelinus AI ailesidir.</p>
            <p className="mono-tag">cryapim.com</p>
          </div>
        </footer>
      </div>

      <AppPersonaBubble />
    </ThemeProvider>
  );
}
