import type { MetadataRoute } from "next";

/**
 * robots.txt — tüm motorlara izin ver, sitemap'i işaret et.
 * Üretken AI motorları (GEO) ve klasik arama botları aynı kaynağı okur.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://cryapim.com/sitemap.xml",
    host: "https://cryapim.com",
  };
}
