// Hizmet detay içeriği yükleyicisi — src/content/services.tr.json'ı
// SERVICE_SLUGS (routes.ts) sırasına göre tipli olarak sunar.

import raw from "@/content/services.tr.json";
import { SERVICE_SLUGS, type ServiceSlug } from "@/lib/routes";

export interface ServiceStep {
  title: string;
  body: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceDetail {
  slug: ServiceSlug;
  title: string;
  /** site.tr.json services[].body ile birebir aynı kısa tanım */
  short: string;
  /** site.tr.json services[].tags ile birebir aynı etiketler */
  tags: string;
  seoTitle: string;
  seoDescription: string;
  lead: string;
  /** "Ne yapıyoruz" paragrafları */
  what: string[];
  /** "Yaklaşımımız" numaralı adımları */
  approach: ServiceStep[];
  /** "Neler kazandırır" maddeleri */
  benefits: string[];
  /** "Kimler için" kısa metni */
  audience: string;
  faq: ServiceFaq[];
}

const services = (raw as { services: ServiceDetail[] }).services;

const bySlug = new Map<string, ServiceDetail>(
  services.map((s) => [s.slug, s]),
);

/** Tüm hizmetler, SERVICE_SLUGS sırasıyla. */
export function getAllServices(): ServiceDetail[] {
  return SERVICE_SLUGS.map((slug) => {
    const service = bySlug.get(slug);
    if (!service) {
      throw new Error(`services.tr.json içinde eksik hizmet: ${slug}`);
    }
    return service;
  });
}

/** Tek hizmet; bilinmeyen slug için undefined döner. */
export function getService(slug: string): ServiceDetail | undefined {
  return bySlug.get(slug);
}

/** SERVICE_SLUGS içindeki 0 tabanlı sıra; bilinmeyen slug için -1. */
export function getServiceIndex(slug: string): number {
  return SERVICE_SLUGS.indexOf(slug as ServiceSlug);
}

/** Önceki / sonraki hizmet (uçlarda döngüsel). */
export function getAdjacentServices(slug: string): {
  prev: ServiceDetail;
  next: ServiceDetail;
} {
  const all = getAllServices();
  const index = getServiceIndex(slug);
  const prev = all[(index - 1 + all.length) % all.length];
  const next = all[(index + 1) % all.length];
  return { prev, next };
}
