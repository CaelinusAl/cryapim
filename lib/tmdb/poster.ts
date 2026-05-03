/**
 * TMDB (The Movie Database) poster lookup.
 *
 * Görev: bir film başlığı (opsiyonel yıl) verildiğinde TMDB'nin search
 * API'sine sorar; ilk eşleşmenin poster ve backdrop URL'lerini döner.
 *
 * Env: TMDB_API_TOKEN (v4 read access token, "eyJ..." JWT).
 *   https://www.themoviedb.org/settings/api → Request an API Key
 *
 * Env yoksa: tüm fonksiyonlar null döner; uygulama eski şekilde
 * (poster'sız) çalışmaya devam eder.
 *
 * Cache stratejisi:
 *   - In-memory (Map) — Vercel serverless instance içinde 24 saat tutulur.
 *   - "Bulunmadı" sonuçları da 24 saat cache'lenir (gereksiz API çağrısı
 *     yapmamak için). Hata sonuçları sadece 60sn cache'lenir.
 *
 * Rate limit: TMDB 50 req/sn'ye kadar tolere ediyor — pratikte sorun yok.
 */

const TMDB_API_BASE = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

const POSTER_SIZE = "w500"; // kart için optimum
const BACKDROP_SIZE = "w1280"; // detay sayfası hero için

const token = process.env.TMDB_API_TOKEN;
export const tmdbEnabled = !!token;

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 saat
const ERROR_CACHE_TTL_MS = 60 * 1000; // 60 sn

type TmdbCacheEntry = {
  value: TmdbLookup | null;
  expiresAt: number;
};
const cache = new Map<string, TmdbCacheEntry>();

export type TmdbLookup = {
  tmdbId: number;
  title: string;
  originalTitle: string;
  releaseYear: number | null;
  /** w500 boyutunda kart için */
  posterUrl: string | null;
  /** w1280 boyutunda hero için */
  backdropUrl: string | null;
  /** TMDB ortalama oyu (10 üzerinden) */
  voteAverage: number | null;
  /** Ham ülke listesi (ISO 3166-1) */
  originCountries: string[];
};

/**
 * Bir filmi TMDB'de ara. Yıl verirsen daha kesin sonuç döner.
 * Türkçe isim verirsen önce TR sonuçlara, eşleşme yoksa default'a düşer.
 */
export async function searchMoviePoster(
  query: string,
  year?: number
): Promise<TmdbLookup | null> {
  if (!token) return null;
  const trimmed = query.trim();
  if (trimmed.length < 2) return null;

  const cacheKey = `${trimmed.toLowerCase()}|${year ?? ""}`;
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  // İki dil deneme: önce tr-TR, sonuç yoksa en-US fallback.
  // (Türkçe başlık yazılmışsa TR daha iyi; orijinal isim yazılmışsa
  // en-US daha iyi sonuç verir.)
  const lookup =
    (await searchOnce(trimmed, "tr-TR", year)) ||
    (await searchOnce(trimmed, "en-US", year));

  cache.set(cacheKey, {
    value: lookup,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
  return lookup;
}

async function searchOnce(
  query: string,
  language: string,
  year?: number
): Promise<TmdbLookup | null> {
  if (!token) return null;
  const url = new URL(`${TMDB_API_BASE}/search/movie`);
  url.searchParams.set("query", query);
  url.searchParams.set("language", language);
  url.searchParams.set("include_adult", "false");
  if (year) url.searchParams.set("year", year.toString());

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
      next: { revalidate: 86400 }, // Next.js HTTP cache de devrede
    });

    if (!res.ok) {
      console.error(`[tmdb] search ${language} status:`, res.status);
      return null;
    }

    const data = (await res.json()) as { results?: TmdbApiMovie[] };
    const first = data.results?.[0];
    if (!first) return null;

    return mapResult(first);
  } catch (err) {
    if ((err as { name?: string })?.name !== "AbortError") {
      console.error(`[tmdb] search ${language} error:`, err);
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function mapResult(r: TmdbApiMovie): TmdbLookup {
  return {
    tmdbId: r.id,
    title: r.title ?? r.original_title ?? "",
    originalTitle: r.original_title ?? r.title ?? "",
    releaseYear: r.release_date ? parseInt(r.release_date.slice(0, 4), 10) : null,
    posterUrl: r.poster_path
      ? `${TMDB_IMAGE_BASE}/${POSTER_SIZE}${r.poster_path}`
      : null,
    backdropUrl: r.backdrop_path
      ? `${TMDB_IMAGE_BASE}/${BACKDROP_SIZE}${r.backdrop_path}`
      : null,
    voteAverage: typeof r.vote_average === "number" ? r.vote_average : null,
    originCountries: Array.isArray(r.origin_country) ? r.origin_country : [],
  };
}

type TmdbApiMovie = {
  id: number;
  title?: string;
  original_title?: string;
  release_date?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  origin_country?: string[];
};

/**
 * Test/debug için cache'i manuel temizle.
 */
export function clearTmdbCache(): void {
  cache.clear();
}
