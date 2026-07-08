"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ROUTES } from "@/lib/routes";

const EASE = [0.22, 1, 0.36, 1] as const;

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  // Rota değişince menüyü kapat (render sırasında state uyarlama deseni)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  // Escape ile kapat + açıkken body scroll kilidi
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
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        onClick={() => setOpen((v) => !v)}
        className="relative z-[60] -mr-2 flex h-10 w-10 items-center justify-center text-ink transition-colors hover:text-gold"
      >
        {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md"
          >
            <motion.nav
              aria-label="Mobil menü"
              className="flex flex-col items-center gap-5"
              initial={reduce ? "visible" : "hidden"}
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
            >
              {NAV_ROUTES.map((route) => {
                const active =
                  pathname === route.href ||
                  pathname.startsWith(`${route.href}/`);
                return (
                  <motion.div
                    key={route.href}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, ease: EASE },
                      },
                    }}
                  >
                    <Link
                      href={route.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`font-serif text-3xl tracking-[0.08em] transition-colors ${
                        active ? "text-gold" : "text-ink/80 hover:text-gold"
                      }`}
                    >
                      {route.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 0.6, duration: 0.5 }}
              className="mt-12 text-[0.6rem] uppercase tracking-[0.4em] text-muted"
            >
              CR YAPIM — İstanbul
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
