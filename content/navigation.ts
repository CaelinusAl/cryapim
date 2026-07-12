// ═══════════════════════════════════════════════════════════════
// NAVIGATION — header + footer. Kod içinde sabit nav YOK; buradan gelir.
//
// Ana sayfa bölümleri anchor (/#id) ile; böylece her route'tan çalışır
// (önce ana sayfaya gider, sonra bölüme kayar). Kullanıcı hiçbir noktada
// navigasyonsuz kalmaz (mobil için MobileNav bu listeyi kullanır).
// ═══════════════════════════════════════════════════════════════

import type { CTA, FooterGroup, NavItem } from "./types";

/** Bölüm id'leri — section component'leri ile SENKRON olmalı.
 *  IA (CR-WEB-YARATICI-MIMARI.md): açılış → ne yaparız → dünyalar →
 *  yaklaşım → hikâye → birlikte (CTA) → iletişim (form). */
export const SECTION_IDS = {
  hero: "giris",
  whatWeDo: "ne-yapariz",
  selectedWorlds: "dunyalar",
  approach: "yaklasim",
  originStory: "hikaye",
  contact: "birlikte",
  contactForm: "iletisim",
} as const;

/** Üst menü — mimari anlatı sırasına göre. */
export const primaryNav: NavItem[] = [
  { href: `/#${SECTION_IDS.whatWeDo}`, label: "Ne Yaparız" },
  { href: `/#${SECTION_IDS.selectedWorlds}`, label: "Dünyalar" },
  { href: `/#${SECTION_IDS.approach}`, label: "Yaklaşım" },
  { href: `/#${SECTION_IDS.originStory}`, label: "Hikâye" },
];

/** Sağ üst ana çağrı — kullanıcıyı fikirle gelmeye davet eder. */
export const primaryCta: CTA = {
  label: "Fikrini Anlat",
  href: `/#${SECTION_IDS.contactForm}`,
  intent: "primary",
};

/** Footer bağlantı grupları (mevcut route'lar korunur). */
export const footerGroups: FooterGroup[] = [
  {
    title: "Site",
    links: [
      { href: `/#${SECTION_IDS.whatWeDo}`, label: "Ne yaparız" },
      { href: `/#${SECTION_IDS.selectedWorlds}`, label: "Dünyalar" },
      { href: `/#${SECTION_IDS.approach}`, label: "Yaklaşım" },
      { href: `/#${SECTION_IDS.originStory}`, label: "Hikâye" },
      { href: `/#${SECTION_IDS.contactForm}`, label: "İletişim" },
    ],
  },
  {
    title: "Alanlar",
    links: [
      { href: "/studio", label: "Stüdyo" },
      { href: "/caelinus-ai", label: "Caelinus" },
      { href: "/sanri", label: "Sanrı" },
      { href: "/perde", label: "Perde" },
      { href: "/yapimlar", label: "Yapımlar" },
    ],
  },
];
