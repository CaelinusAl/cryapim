// ═══════════════════════════════════════════════════════════════
// CONTENT · GİRİŞ — locale-farkında içerik erişimi.
//
// getSiteContent(locale) tek giriş noktası. Şimdilik yalnızca "tr";
// "en" eklenince buraya kaydolur (site.en.ts). Component'ler doğrudan
// dosya import etmez, bu seam üzerinden okur → i18n'e hazır.
// ═══════════════════════════════════════════════════════════════

import type { Locale, SiteContent } from "./types";
import { siteTr } from "./site.tr";

const CONTENT: Partial<Record<Locale, SiteContent>> = {
  tr: siteTr,
};

export const DEFAULT_LOCALE: Locale = "tr";

export function getSiteContent(locale: Locale = DEFAULT_LOCALE): SiteContent {
  return CONTENT[locale] ?? siteTr;
}

export { creationJourney } from "./services";
export { selectedWorlds } from "./projects";
export {
  primaryNav,
  primaryCta,
  footerGroups,
  SECTION_IDS,
} from "./navigation";
export type * from "./types";
