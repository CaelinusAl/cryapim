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
          ? "border-gold/20 bg-black/55 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-6 sm:h-[4.75rem] sm:px-12 lg:px-16">
        <Link
          href="/"
          aria-label="CR YAPIM — Ana sayfa"
          className="flex items-center py-2 transition-opacity hover:opacity-90"
        >
          <Image
            src="/brand/logo-wordmark.png"
            alt="CR YAPIM"
            width={160}
            height={122}
            priority
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        <nav aria-label="Ana menü" className="hidden items-center gap-9 lg:flex">
          {NAV_ROUTES.map((route) => {
            const active = isActiveRoute(pathname, route.href);
            return (
              <Link
                key={route.href}
                href={route.href}
                aria-current={active ? "page" : undefined}
                className={`font-serif text-[0.92rem] tracking-[0.1em] transition-colors duration-300 ${
                  active ? "text-gold" : "text-ink/70 hover:text-gold"
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
