"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { experience } from "@/config/experience.config";

/**
 * Reveal — görünüm alanına girince yumuşak beliriş (scroll-reveal).
 *
 * IntersectionObserver ile tek seferlik .is-visible ekler; görsel geçiş
 * globals.css'teki `.reveal` sınıfından (hareket token'larıyla) gelir.
 * prefers-reduced-motion'da CSS otomatik olarak anında/tam gösterir.
 * Kütüphane yok — hafif ve performans-dostu.
 */
type Props = {
  children: ReactNode;
  as?: ElementType;
  /** Kademeli beliriş için gecikme (ms). */
  delay?: number;
  className?: string;
};

export function Reveal({ children, as, delay = 0, className = "" }: Props) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      {
        threshold: experience.motion.revealThreshold,
        rootMargin: experience.motion.revealRootMargin,
      }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // createElement — polimorfik tag + ref'i JSX'in intrinsic-props
  // daralmasına takılmadan güvenle render eder.
  return createElement(
    Tag,
    {
      ref,
      className: `reveal ${visible ? "is-visible" : ""} ${className}`,
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children
  );
}
