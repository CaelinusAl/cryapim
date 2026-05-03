import { Redis } from "@upstash/redis";
import type { ParsedPerdeAnswer } from "@/lib/perde-parse";
import type { FilmReview } from "@/data/perde-archive";

/**
 * Perde KV cache — Upstash Redis üzerinden topluluk arşivi.
 *
 * Mantık: kullanıcı "Solaris" sorar, Perde AI yanıtlar, biz yanıtı KV'ye
 * yazarız. İkinci kullanıcı "Solaris" yazdığında OpenAI'ya gitmeden cache'ten
 * geliriz. /perde landing'de "Toplulukça yorumlananlar" bölümü son N
 * kayıttan otomatik beslenir; her cache'lenmiş film paylaşılabilir
 * /perde/m/{slug} URL'sine sahip olur.
 *
 * Env (Vercel → Storage → Upstash for Redis):
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 *
 * Env yoksa: tüm fonksiyonlar sessizce no-op döner; uygulama eski şekilde
 * (cache'siz) çalışmaya devam eder.
 */

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis: Redis | null = url && token ? new Redis({ url, token }) : null;
export const perdeCacheEnabled = redis !== null;

const TTL_DAYS = 90;
const TTL_SECONDS = TTL_DAYS * 24 * 60 * 60;
const RECENT_LIST_MAX = 100;

const KEY_REVIEW = (slug: string) => `perde:review:${slug}`;
const KEY_RECENT = "perde:recent"; // sorted set: score=askedAt, member=slug
const KEY_COUNTERS = "perde:counters"; // hash: total, hits, misses

export type CachedPerdeReview = {
  /** Slug — URL anahtarı */
  filmSlug: string;
  /** Kullanıcının yazdığı orijinal sorgu (görüntülenecek başlık) */
  filmTitleRaw: string;
  /** AI'nın ham yanıtı — fallback olarak her zaman saklanır */
  rawAnswer: string;
  /** Yapılandırılmış parse — başarılıysa, değilse null */
  parsed: ParsedPerdeAnswer | null;
  /** İlk kez sorulduğu zaman (epoch ms) */
  askedAt: number;
  /** Kaç kez tekrar görüntülendiği (cache hit sayacı) */
  hitCount: number;
};

/**
 * Cache'ten bir film yorumu getir. Bulamazsa veya cache off ise null.
 */
export async function getCachedReview(
  slug: string
): Promise<CachedPerdeReview | null> {
  if (!redis) return null;
  try {
    const data = await redis.get<CachedPerdeReview>(KEY_REVIEW(slug));
    return data ?? null;
  } catch (err) {
    console.error("[perde-cache] getCachedReview error:", err);
    return null;
  }
}

/**
 * Cache hit'ini kaydet ve hit sayacını artır. Yan etki — yanıtı
 * görüntüledikten sonra fire-and-forget çağrılır.
 */
export async function recordCacheHit(slug: string): Promise<void> {
  if (!redis) return;
  try {
    const cached = await redis.get<CachedPerdeReview>(KEY_REVIEW(slug));
    if (!cached) return;
    cached.hitCount = (cached.hitCount ?? 0) + 1;
    await redis.set(KEY_REVIEW(slug), cached, { ex: TTL_SECONDS });
    await redis.hincrby(KEY_COUNTERS, "hits", 1);
  } catch (err) {
    console.error("[perde-cache] recordCacheHit error:", err);
  }
}

/**
 * Yeni bir film yorumunu cache'e yaz + recent listesine ekle.
 * Çağrılır: AI başarılı yanıt verdikten sonra (route handler içinden).
 */
export async function setCachedReview(
  review: Omit<CachedPerdeReview, "hitCount">
): Promise<void> {
  if (!redis) return;
  try {
    const full: CachedPerdeReview = { ...review, hitCount: 0 };
    await redis.set(KEY_REVIEW(review.filmSlug), full, { ex: TTL_SECONDS });
    await redis.zadd(KEY_RECENT, {
      score: review.askedAt,
      member: review.filmSlug,
    });
    // Eski kayıtları kırp — sadece en yeni RECENT_LIST_MAX kalsın
    await redis.zremrangebyrank(KEY_RECENT, 0, -(RECENT_LIST_MAX + 1));
    await redis.hincrby(KEY_COUNTERS, "total", 1);
    await redis.hincrby(KEY_COUNTERS, "misses", 1);
  } catch (err) {
    console.error("[perde-cache] setCachedReview error:", err);
  }
}

/**
 * En son sorulan N filmi (skor=askedAt sırasına göre, yeniden eskiye)
 * döner. Landing sayfasında "Topluluk yorumları" grid'inde kullanılır.
 *
 * Statik prerender değil, ISR ile (revalidate ile) çağrılır.
 */
export async function listRecentReviews(
  limit = 12,
  excludeSlugs: string[] = []
): Promise<CachedPerdeReview[]> {
  if (!redis) return [];
  try {
    // ZRANGE rev=true → en yeni en üstte. Fazladan birkaç çek, exclude sonrası
    // istediğimiz limit kalsın.
    const fetchCount = limit + excludeSlugs.length + 4;
    const slugs = await redis.zrange<string[]>(KEY_RECENT, 0, fetchCount - 1, {
      rev: true,
    });
    if (!slugs || slugs.length === 0) return [];

    const filtered = slugs.filter((s) => !excludeSlugs.includes(s));
    if (filtered.length === 0) return [];

    const items = await Promise.all(
      filtered.slice(0, limit).map((s) => getCachedReview(s))
    );
    return items.filter((x): x is CachedPerdeReview => x !== null);
  } catch (err) {
    console.error("[perde-cache] listRecentReviews error:", err);
    return [];
  }
}

/**
 * CachedPerdeReview'i FilmReview-benzeri obje yapar — aynı PerdeReview
 * bileşeni hem curated hem topluluk kayıtlarını render edebilsin diye.
 *
 * Eksik metadata (yıl, yönetmen, ülke) opsiyonel kalır; PerdeReview
 * conditional render ile bunları atlar.
 */
export function cachedToFilmReview(c: CachedPerdeReview): FilmReview | null {
  if (!c.parsed) return null;
  const p = c.parsed;
  return {
    filmSlug: c.filmSlug,
    filmTitle: c.filmTitleRaw,
    oz: p.oz ?? `Bu film aslında izleyiciyi başka bir şeyle baş başa bırakıyor.`,
    konu: p.konu ?? "",
    altindaki: p.altindaki ?? "",
    sembol: {
      baslik: p.sembol?.baslik ?? "Anahtar sahne",
      metin: p.sembol?.metin ?? "",
    },
    niyet: p.niyet ?? undefined,
    izleDikkat:
      p.izleDikkat ??
      "Bu yorum bir kullanıcı sorusu üzerine üretildi; ikinci izleyişte kendi gözünle de bak.",
    benzerFilmler: p.benzerFilmler.map((title) => ({ title })),
    spoilerLevel: p.spoilerWarning ? "heavy" : "mild",
    perdedeYayindaTarih: new Date(c.askedAt).toISOString(),
  };
}

/**
 * Toplam KV istatistikleri — admin/debug için.
 */
export async function getCacheStats(): Promise<{
  total: number;
  hits: number;
  misses: number;
  recentCount: number;
}> {
  if (!redis) return { total: 0, hits: 0, misses: 0, recentCount: 0 };
  try {
    const [counters, recentCount] = await Promise.all([
      redis.hgetall<Record<string, string>>(KEY_COUNTERS),
      redis.zcard(KEY_RECENT),
    ]);
    return {
      total: parseInt(counters?.total ?? "0", 10),
      hits: parseInt(counters?.hits ?? "0", 10),
      misses: parseInt(counters?.misses ?? "0", 10),
      recentCount: recentCount ?? 0,
    };
  } catch (err) {
    console.error("[perde-cache] getCacheStats error:", err);
    return { total: 0, hits: 0, misses: 0, recentCount: 0 };
  }
}
