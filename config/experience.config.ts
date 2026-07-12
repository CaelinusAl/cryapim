// ═══════════════════════════════════════════════════════════════
// EXPERIENCE CONFIG — deneyimin davranış/medya tek kaynağı.
//
// Metin content/*'te; burada YALNIZCA teknik/deneyim ayarları:
// hero medyası, hareket süreleri (globals.css token'larıyla eşleşir),
// ve özellik bayrakları. Section'lar bunu okur, kodda sabit yoktur.
// ═══════════════════════════════════════════════════════════════

export const experience = {
  /** Hero medya omurgası. Gerçek video gelene kadar poster placeholder.
   *  Video eklenince otomatik, sessiz (muted) oynar; mobilde hafif alternatif. */
  hero: {
    // Gerçek, yazısız hero görseli. public/hero.jpeg eklenince otomatik
    // devreye girer; yokken HeroMedia zarif placeholder'a düşer. Metin
    // görsele GÖMÜLMEZ — canlı HTML olarak üstte durur (mobil akış + düzenleme).
    poster: "/hero.jpeg",
    // İleride 10 sn'lik hero videosu: public/hero.mp4 → buraya yaz, sessiz oynar.
    video: undefined as string | undefined,
    mobileVideo: undefined as string | undefined,
    /** Videoyu sessiz otomatik oynat (kullanıcı sesi asla izinsiz açılmaz). */
    autoPlayMuted: true,
    /** reduced-motion'da video yerine yalnızca poster gösterilir. */
    posterOnlyOnReducedMotion: true,

    /** ── Işık grade'i (görselin ÜSTÜNE CSS katmanı; pikseli değiştirmez) ──
     * Sanat yönetimi: pencere daha çok nefes alsın, laptopta "bir şey
     * çalışıyor" hissi, göz metne otursun, arka plan yumuşasın. Konumlar
     * yüzde (object-cover kırpımına göre yaklaşık); ince ayar buradan. */
    light: {
      /** Pencere/Boğaz bloom'u — sağ üst, sıcak; Boğaz belirgin nefes alsın. */
      window: { x: "80%", y: "27%", size: "48% 54%", intensity: 0.52, warm: "255,218,156" },
      /** Laptop ekranı — Caelinus çalışıyor hissi (sakin nabız), okunur. */
      screen: { x: "34%", y: "61%", size: "18% 15%", intensity: 0.5, tone: "156,216,236" },
      /** Pencereden süzülen god-ray + üst sis şiddeti (0-1). */
      atmosphere: 0.58,
      /** Güneş ışığında yüzen ince toz tanecikleri. */
      dust: true,
    },
  },

  /** Hareket süreleri — CSS token'larının JS aynası (senkron tutulmalı). */
  motion: {
    fast: "var(--duration-fast)",
    normal: "var(--duration-normal)",
    slow: "var(--duration-slow)",
    easeSoft: "var(--ease-soft)",
    easeReveal: "var(--ease-reveal)",
    /** Scroll-reveal tetik eşiği (IntersectionObserver). */
    revealThreshold: 0.15,
    /** Reveal'in görünüm alanına ne kadar erken girmesi (rootMargin). */
    revealRootMargin: "0px 0px -12% 0px",
  },

  /** Özellik bayrakları. */
  flags: {
    showThemeToggle: true,
    /** Hero'dan sonra sticky nav görünür (kullanıcı asla navigasyonsuz kalmaz). */
    stickyNavAfterHero: true,
  },
} as const;

export type ExperienceConfig = typeof experience;
export default experience;
