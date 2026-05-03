/**
 * Sanrı için basit IP bazlı rate limit (in-memory).
 *
 * Tek Node prosesi içinde çalışır; serverless ortamda her instance
 * kendi sayacını tutar — demo için yeterli, prod'da Upstash/Redis'e
 * yükselir.
 */

const buckets = new Map<string, { count: number; reset: number }>();

const LIMIT = 8;
const WINDOW_MS = 60_000;

// Bellek sızıntısını engellemek için zaman zaman süresi geçmiş
// kovaları temizle (her 100 istekte bir).
let opsSinceClean = 0;

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetMs: number;
};

export function rateLimit(key: string): RateLimitResult {
  const now = Date.now();
  if (++opsSinceClean > 100) {
    opsSinceClean = 0;
    for (const [k, v] of buckets) if (v.reset < now) buckets.delete(k);
  }

  const b = buckets.get(key);
  if (!b || now > b.reset) {
    buckets.set(key, { count: 1, reset: now + WINDOW_MS });
    return { ok: true, remaining: LIMIT - 1, resetMs: WINDOW_MS };
  }
  if (b.count >= LIMIT) {
    return { ok: false, remaining: 0, resetMs: b.reset - now };
  }
  b.count++;
  return { ok: true, remaining: LIMIT - b.count, resetMs: b.reset - now };
}
