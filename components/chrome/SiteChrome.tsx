"use client";

import { usePathname } from "next/navigation";
import { BosphorusBackdrop } from "@/components/BosphorusBackdrop";
import { PersonaBubble } from "@/components/personas/PersonaBubble";

/**
 * Daldırıcı (immersive) rotalar — süsleme backdrop'u ve "AI'A SOR" widget'ı
 * burada SUSAR. Premium bir dünya sayfasında jenerik SaaS ögesi / dağınık
 * renkli yıldız alanı olmaz; boşluk ve gerçek görsel konuşur.
 * (CR-WEB-YARATICI-MIMARI.md + Claude notu.)
 */
const IMMERSIVE_PREFIXES = ["/caelinus-ai", "/sanri"];

function isImmersive(pathname: string | null): boolean {
  if (!pathname) return false;
  return IMMERSIVE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/** Boğaz backdrop'u — immersive rotalarda gizli (sade antrasit zemin kalır). */
export function AppBackdrop() {
  const pathname = usePathname();
  if (isImmersive(pathname)) return null;
  return <BosphorusBackdrop />;
}

/** "AI'A SOR" persona widget'ı — immersive rotalarda gizli. */
export function AppPersonaBubble() {
  const pathname = usePathname();
  if (isImmersive(pathname)) return null;
  return <PersonaBubble />;
}
