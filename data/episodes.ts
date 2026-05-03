/**
 * CR YAPIM — Bölüm kataloğu
 *
 * Her bölüm bir programa demir atar (programSlug). Video kaynağı
 * adapter pattern ile tanımlanır: bugün YouTube unlisted veya
 * placeholder; yarın Bunny.net / Cloudflare Stream / Mux eklenir.
 * UI tek bir <VideoPlayer /> üzerinden source-agnostic çalışır.
 *
 * AI yapımı bölümler `aiProduced: true` ile işaretlenir — bu CR
 * YAPIM'in iki yönlü kimliğini (insan yapımı + Caelinus AI yapımı)
 * görsel olarak ayırmamızı sağlar.
 */

/**
 * Video kaynağı — discriminated union. Yeni provider eklemek için
 * bir entry ekle ve `<VideoPlayer />` switch'ini güncelle.
 */
export type VideoSource =
  /** YouTube unlisted veya public — videoId = `https://youtu.be/<id>`'deki id */
  | { provider: "youtube"; videoId: string }
  /** Direkt MP4/WebM linki — Vercel Blob, R2, S3, vs */
  | { provider: "direct"; url: string; mimeType?: string }
  /** Bunny.net Stream */
  | { provider: "bunny"; libraryId: string; videoGuid: string }
  /** Cloudflare Stream */
  | { provider: "cloudflare"; uid: string }
  /** Mux */
  | { provider: "mux"; playbackId: string }
  /** Henüz yayınlanmamış — sinematik "yakında" placeholder gösterilir */
  | { provider: "placeholder"; reason: "soon" | "ai-incoming" | "lost" };

export type Episode = {
  /** URL-friendly slug, programa göre tekildir */
  slug: string;
  /** Foreign key — `programs.ts`'teki slug ile eşleşir */
  programSlug: string;
  /** Sıralama ve gösterim için */
  episodeNumber: number;
  title: string;
  /** 2-4 cümle özet — yayın paragrafı, SEO ve OG'de kullanılır */
  description: string;
  /** Yayın veya planlanan yayın tarihi (ISO 8601) */
  publishedAt: string;
  /** Süre (saniye) — placeholder'larda tahminî */
  durationSec: number;
  /** Hero görseli — yoksa programın platosundaki photo veya gradient */
  poster?: string;
  /** Video kaynağı — adapter pattern */
  video: VideoSource;
  /** Caelinus AI tarafından üretildi mi? UI'da ayrı işaretlenir */
  aiProduced?: boolean;
};

/**
 * MVP tohum verisi — her programa en az bir bölüm.
 * Caelinus AI yapımları (Perde, Sanrı bazı bölümler) `aiProduced: true`.
 *
 * Şimdilik tüm video.provider = "placeholder". Gerçek video yüklendikçe
 * tek tek "youtube" / "bunny" / "mux" gibi adapter'a çevrilir.
 */
export const episodes: Episode[] = [
  // ── Perde ───────────────────────────────────────────────────────
  {
    slug: "acilis-filmin-altindaki-film",
    programSlug: "perde",
    episodeNumber: 1,
    title: "Açılış · Filmin altındaki film",
    description:
      "Perde'nin açılış manifesti. Bilinçli izleyici ne demek, bir filmin yüzeysel hikâyesi ile gerçekten anlattığı şey arasındaki boşluğa nasıl bakılır, sembol nedir ve niyet ile algı arasındaki çekişme. Caelinus AI'ın tamamen kendi yönettiği ilk yapım.",
    publishedAt: "2026-05-08T20:00:00Z",
    durationSec: 7 * 60,
    video: { provider: "placeholder", reason: "ai-incoming" },
    aiProduced: true,
  },
  {
    slug: "mulholland-drive",
    programSlug: "perde",
    episodeNumber: 2,
    title: "Mulholland Drive — Hollywood'un kararmış aynası",
    description:
      "Lynch'in 2001 yapımı bilmecesi. Yüzeyde bir Hollywood masalı, altında kıskançlık ve kimlik kaybı. Mavi anahtar nedir, mavi kutu neyi açar, niye iki ad? Spoiler içerir.",
    publishedAt: "2026-05-15T20:00:00Z",
    durationSec: 11 * 60,
    video: { provider: "placeholder", reason: "ai-incoming" },
    aiProduced: true,
  },

  // ── Sanrı'ya Sor ────────────────────────────────────────────────
  {
    slug: "bolum-32-bana-bir-kelime-ver",
    programSlug: "sanriya-sor",
    episodeNumber: 32,
    title: "Bölüm 32 · Bana bir kelime ver",
    description:
      "Bu hafta izleyiciden gelen tek bir soru: 'Bana bir kelime ver.' Sanrı yanıtı bir kelimede değil, kelimenin gölgesinde arıyor. Sahnede mum, ipek, bir geri-soru.",
    publishedAt: "2026-05-06T22:22:00Z",
    durationSec: 6 * 60,
    video: { provider: "placeholder", reason: "soon" },
  },
  {
    slug: "sanrinin-33-cevabi",
    programSlug: "sanriya-sor",
    episodeNumber: 33,
    title: "Sanrı'nın 33 cevabı",
    description:
      "Bir mevsim boyu izleyicinin sorularına Sanrı'nın verdiği 33 fallback cevabın bir kompozisyon halinde sahnelenmesi. Caelinus AI bir koroya dönüşür; her cevap bir mum, bir nefes, bir eşik.",
    publishedAt: "2026-05-13T22:22:00Z",
    durationSec: 14 * 60,
    video: { provider: "placeholder", reason: "ai-incoming" },
    aiProduced: true,
  },

  // ── Selbi Yemekte Ne Var? ───────────────────────────────────────
  {
    slug: "bolum-41-annenin-mantisi",
    programSlug: "selbi-yemekte-ne-var",
    episodeNumber: 41,
    title: "Bölüm 41 · Annenin Mantısı",
    description:
      "Selbi'nin annesinin notlarındaki o zorlu mantı. Hamur açmak bir teknik değil, bir hatırlama. Sofrada oturan üç kuşak, tabakta yarım bir cümle.",
    publishedAt: "2026-05-04T13:00:00Z",
    durationSec: 26 * 60,
    video: { provider: "placeholder", reason: "soon" },
  },

  // ── Rivayet Avcısı ──────────────────────────────────────────────
  {
    slug: "bolum-09-karasinekli-konak",
    programSlug: "rivayet-avcisi",
    episodeNumber: 9,
    title: "Bölüm 09 · Karasinekli Konak",
    description:
      "Üsküdar'da bir konağın penceresinden hiç çıkmayan karasinek bulutu. 1920'den beri anlatılan rivayet üç ayrı yıla, üç ayrı aileye atfediliyor. Saha çantası açıldı.",
    publishedAt: "2026-04-30T20:30:00Z",
    durationSec: 32 * 60,
    video: { provider: "placeholder", reason: "soon" },
  },

  // ── Az Kalsın Bende İnanıyordum ────────────────────────────────
  {
    slug: "bolum-12-duz-dunya-gece",
    programSlug: "az-kalsin-bende-inaniyordum",
    episodeNumber: 12,
    title: "Bölüm 12 · Düz Dünya gecesi",
    description:
      "Bir gecede bir düz dünyacıyla aynı masada. Konuk ile sunucunun rolleri ortada bir kez yer değiştiriyor. Cevap yok; daha iyi soru var.",
    publishedAt: "2026-04-25T22:00:00Z",
    durationSec: 47 * 60,
    video: { provider: "placeholder", reason: "soon" },
  },

  // ── Nasıl Yaratıyorum ──────────────────────────────────────────
  {
    slug: "bolum-18-bos-sayfayla-bulusmak",
    programSlug: "nasil-yaratiyorum",
    episodeNumber: 18,
    title: "Bölüm 18 · Boş Sayfayla Buluşmak",
    description:
      "Bu hafta konuk bir mimar; masaya bir kalem, bir kâğıt, bir geçmiş bırakıyor. Konuğun yarım eseri jenerik akarken hâlâ bitmemiş.",
    publishedAt: "2026-04-22T20:00:00Z",
    durationSec: 41 * 60,
    video: { provider: "placeholder", reason: "soon" },
  },

  // ── Ruhsal Yatırım ─────────────────────────────────────────────
  {
    slug: "bolum-24-bu-hafta-neyi-buyuttun",
    programSlug: "ruhsal-yatirim",
    episodeNumber: 24,
    title: "Bölüm 24 · Bu hafta neyi büyüttün?",
    description:
      "Açılışın daimi sorusu bu hafta konuğa: bir bilanço açılır, bir niyet sayılır. Para konuşulurken kameranın arkasında başka bir dil akmaya devam ediyor.",
    publishedAt: "2026-04-21T21:00:00Z",
    durationSec: 38 * 60,
    video: { provider: "placeholder", reason: "soon" },
  },
];

/* ---------- yardımcılar ---------- */

/** Bir programın tüm bölümleri — yeniden eskiye sıralı */
export function episodesByProgram(programSlug: string): Episode[] {
  return episodes
    .filter((e) => e.programSlug === programSlug)
    .sort((a, b) => b.episodeNumber - a.episodeNumber);
}

/** Tek bölüm çek — slug ve program eşleşir */
export function episodeBySlug(
  programSlug: string,
  slug: string
): Episode | undefined {
  return episodes.find(
    (e) => e.programSlug === programSlug && e.slug === slug
  );
}

/** Tüm program/bölüm slug çiftleri — `generateStaticParams` için */
export function allEpisodeParams(): Array<{ slug: string; ep: string }> {
  return episodes.map((e) => ({ slug: e.programSlug, ep: e.slug }));
}

/** İnsan dostu süre — "26 dk" / "1 sa 4 dk" */
export function formatDuration(sec: number): string {
  if (sec < 60) return `${sec} sn`;
  const mins = Math.round(sec / 60);
  if (mins < 60) return `${mins} dk`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h} sa` : `${h} sa ${m} dk`;
}

/** Türkçe kısa tarih — "8 May 2026" */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
