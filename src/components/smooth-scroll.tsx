"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

/**
 * Lenis — yumuşak ama canlı kaydırma.
 * Ana sayfa Matrix yolculuğu için düşük duration + yüksök wheel çarpanı.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const lenis = new Lenis({
      duration: 0.55,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.35,
      touchMultiplier: 1.2,
      smoothWheel: true,
    });

    let rafId = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
