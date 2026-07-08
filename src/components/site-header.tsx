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
          ? "border-gold/15 bg-black/40 backdrop-blur-sm"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-12 lg:px-20">
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
            className="h-8 w-auto opacity-90 sm:h-9"
          />
        </Link>

        <nav aria-label="Ana menü" className="hidden items-center gap-8 lg:flex">
          {NAV_ROUTES.map((route) => {
            const active = isActiveRoute(pathname, route.href);
            return (
              <Link
                key={route.href}
                href={route.href}
                aria-current={active ? "page" : undefined}
                className={`font-serif text-[0.78rem] tracking-[0.12em] transition-colors duration-300 ${
                  active ? "text-gold" : "text-ink/55 hover:text-gold"
                }`}
              >
                {route.label}
              </Link>
            );
          })}
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
