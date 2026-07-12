"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { CTA, NavItem } from "@/content/types";

/**
 * MobileNav — mobil için erişilebilir navigasyon (mevcut sitede eksikti).
 *
 * Hamburger → tam ekran katman. Esc ile kapanır, açıkken body kilitlenir,
 * ilk bağlantıya odak verilir. Kullanıcı hiçbir noktada navigasyonsuz kalmaz.
 * Yalnızca <md görünür; masaüstünde header'daki yatay nav kullanılır.
 */
type Props = { items: NavItem[]; cta: CTA };

export function MobileNav({ items, cta }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-tower-gold/40 text-mist-100"
            style={{ background: "rgba(201,169,106,0.08)" }}
      >
        <span aria-hidden className="text-lg leading-none">
          {open ? "✕" : "☰"}
        </span>
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigasyonu"
          className="fixed inset-0 z-50 flex flex-col"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,6,15,0.98) 0%, rgba(7,6,15,0.96) 100%)",
            backdropFilter: "blur(8px)",
            animation: "sanri-fade-in var(--duration-normal) var(--ease-soft) both",
          }}
        >
          <div className="flex items-center justify-end px-6 py-4">
            <button
              type="button"
              aria-label="Menüyü kapat"
              onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-full border border-tower-gold/40 text-mist-100"
                  style={{ background: "rgba(201,169,106,0.08)" }}
            >
              <span aria-hidden className="text-lg leading-none">
                ✕
              </span>
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center gap-2 px-8">
            {items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                autoFocus={i === 0}
                className="editorial text-3xl text-mist-100 py-3 hover:text-tower-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={cta.href}
              onClick={() => setOpen(false)}
              className="mono-tag mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-tower-gold/50 px-6 py-3 text-tower-gold"
                  style={{ background: "rgba(201,169,106,0.10)" }}
            >
              {cta.label} <span aria-hidden>→</span>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
