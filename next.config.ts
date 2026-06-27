import type { NextConfig } from "next";

/**
 * CR YAPIM — cryapim.com
 *
 * Boğaz manzaralı içerik & yapım stüdyosunun kurumsal vitrini.
 * Tek bir Next.js (App Router) uygulaması.
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,

  // Workspace kökünü bu projeye sabitle — üst dizinlerdeki alakasız
  // lockfile'ların "inferred root" uyarısını ve yanlış kök seçimini önler.
  turbopack: { root: __dirname },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // YouTube küçük resimleri (yapım bölümleri ileride YouTube'a bağlanırsa)
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "**.ytimg.com" },
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
