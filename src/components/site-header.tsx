"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ROUTES } from "@/lib/routes";
import { MobileMenu } from "@/components/mobile-menu";

function isActiveRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "border-gold/25 bg-black/70 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-12 lg:px-20">
        <Link
          href="/"
          aria-label="CR YAPIM — Ana sayfa"
          className="flex items-center py-2 transition-opacity hover:opacity-80"
        >
          <Image
            src="/brand/logo-wordmark.png"
            alt="CR YAPIM"
            width={126}
            height={96}
            priority
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <nav aria-label="Ana menü" className="hidden items-center gap-7 lg:flex">
          {NAV_ROUTES.map((route) => {
            const active = isActiveRoute(pathname, route.href);
            return (
              <Link
                key={route.href}
                href={route.href}
                aria-current={active ? "page" : undefined}
                className={`group relative text-[0.6rem] uppercase tracking-[0.28em] transition-colors duration-300 ${
                  active ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {route.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-gold transition-transform duration-300 ease-out ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
