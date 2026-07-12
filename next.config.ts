import type { NextConfig } from "next";

/**
 * CR YAPIM — cryapim.com
 *
 * Caelinus stack'iyle aynı dilde, ama bu site bir yapım evinin
 * vitrini olduğu için ayrı bir Next.js uygulaması olarak kuruldu.
 * İleride paylaşılan paketlere (frequency, three-scenes) çıkartılabilir.
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  // Sol-alttaki "N" geliştirme göstergesini kapat (daldırıcı sayfalarda dikkat dağıtır).
  devIndicators: false,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "**.ytimg.com" },
      // TMDB film poster + backdrop CDN'i (Perde)
      { protocol: "https", hostname: "image.tmdb.org" },
      // Not: Caelinus moodboard artık gpt-image-1 (base64 → data URL)
      // döndürüyor; ayrı bir görsel CDN host'una gerek kalmadı.
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(self), microphone=(self), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
