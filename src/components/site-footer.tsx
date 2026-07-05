import Link from "next/link";
import type { Content } from "@/lib/content";
import { LEGAL_ROUTES, NAV_ROUTES } from "@/lib/routes";

export function SiteFooter({ content }: { content: Content["footer"] }) {
  // Sayfa içi (#) bağlantı içeren eski kolonları at; iletişim/künye kolonları kalır.
  const infoColumns = content.columns.filter((col) =>
    col.links.every((l) => !l.href || !l.href.startsWith("#")),
  );

  return (
    <footer className="border-t border-gold/20 px-6 pb-10 pt-20 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-baseline">
          <div className="font-serif text-3xl tracking-[0.08em] text-ink">
            CR YAPIM
          </div>
          <div className="text-[0.68rem] uppercase tracking-[0.35em] text-muted">
            {content.tagline}
          </div>
        </div>

        <div className="mb-20 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          <div>
            <h4 className="mb-5 text-[0.62rem] font-medium uppercase tracking-[0.4em] text-gold">
              Sayfalar
            </h4>
            <ul className="space-y-3">
              {NAV_ROUTES.map((route) => (
                <li key={route.href} className="text-[0.78rem] text-muted">
                  <Link
                    href={route.href}
                    className="transition-colors hover:text-ink"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[0.62rem] font-medium uppercase tracking-[0.4em] text-gold">
              Yasal
            </h4>
            <ul className="space-y-3">
              {LEGAL_ROUTES.map((route) => (
                <li key={route.href} className="text-[0.78rem] text-muted">
                  <Link
                    href={route.href}
                    className="transition-colors hover:text-ink"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {infoColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-5 text-[0.62rem] font-medium uppercase tracking-[0.4em] text-gold">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label} className="text-[0.78rem] text-muted">
                    {link.href ? (
                      <a
                        href={link.href}
                        className="transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <span>
                        {link.accent ? (
                          <span className="mr-2 text-gold">●</span>
                        ) : null}
                        {link.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-gold/20 pt-6 text-[0.65rem] tracking-[0.2em] text-dim sm:flex-row sm:justify-between">
          <span>{content.base1}</span>
          <span>{content.base2}</span>
        </div>
      </div>
    </footer>
  );
}
