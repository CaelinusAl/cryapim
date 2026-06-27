import type { MetadataRoute } from "next";
import { programs } from "@/data/programs";
import { episodes } from "@/data/episodes";

/**
 * Sitemap — arama motorlarına sitenin tüm kalıcı rotalarını bildirir.
 * Statik sayfalar + dinamik program ve bölüm sayfaları veri dosyalarından
 * otomatik üretilir.
 */
const BASE = "https://cryapim.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/studio`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/yapimlar`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/biz`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/iletisim`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const programRoutes: MetadataRoute.Sitemap = programs.map((p) => ({
    url: `${BASE}/yapimlar/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const episodeRoutes: MetadataRoute.Sitemap = episodes.map((e) => ({
    url: `${BASE}/yapimlar/${e.programSlug}/${e.slug}`,
    lastModified: new Date(e.publishedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...programRoutes, ...episodeRoutes];
}
