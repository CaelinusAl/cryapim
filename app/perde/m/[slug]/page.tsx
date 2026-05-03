import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  perdeArchive,
  reviewBySlug,
  allReviewSlugs,
  type FilmReview,
} from "@/data/perde-archive";
import { PerdeReview } from "@/components/perde/PerdeReview";
import { PerdeSearch } from "@/components/perde/PerdeSearch";
import {
  getCachedReview,
  cachedToFilmReview,
  recordCacheHit,
  perdeCacheEnabled,
} from "@/lib/cache/perde-cache";
import { searchMoviePoster, tmdbEnabled } from "@/lib/tmdb/poster";

type Params = { slug: string };
const ACCENT = "#c95a5a";

/**
 * Curated arşiv için statik prerender. Topluluk yorumları (KV) için
 * dynamicParams=true sayesinde talep anında SSR.
 *
 * Topluluk sayfasını aşırı uzun cache'lemeyiz — yeni hit count'ları
 * yansısın diye revalidate kısa.
 */
export const dynamicParams = true;
export const revalidate = 60;

export function generateStaticParams() {
  return allReviewSlugs();
}

/**
 * Curated bir film için TMDB lookup yap (poster + backdrop). Statik
 * posterUrl tanımlıysa onu kullanır; backdrop her zaman TMDB'den gelir
 * (curated archive backdrop tutmuyor). In-memory 24 saat cache sayesinde
 * aynı build içinde tekrar fetch olmaz.
 */
async function enrichCurated(r: FilmReview): Promise<{
  review: FilmReview;
  backdropUrl: string | null;
}> {
  if (!tmdbEnabled) {
    return { review: r, backdropUrl: null };
  }
  const lookup = await searchMoviePoster(
    r.filmOriginalTitle ?? r.filmTitle,
    r.filmYear
  );
  return {
    review: {
      ...r,
      posterUrl: r.posterUrl ?? lookup?.posterUrl ?? undefined,
    },
    backdropUrl: lookup?.backdropUrl ?? null,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;

  const r = reviewBySlug(slug);
  if (r) {
    // TMDB poster URL varsa OG image olarak kullan — paylaşımda görünür
    const enriched = await enrichCurated(r);
    const ogImages = enriched.review.posterUrl
      ? [enriched.review.posterUrl]
      : undefined;
    return {
      title: `${r.filmTitle} (${r.filmYear}) — Perde'ye göre`,
      description: r.oz,
      openGraph: {
        title: `${r.filmTitle} — Perde'ye göre`,
        description: r.oz,
        type: "article",
        publishedTime: r.perdedeYayindaTarih,
        ...(ogImages ? { images: ogImages } : {}),
      },
      twitter: {
        card: "summary_large_image",
        title: `${r.filmTitle} — Perde'ye göre`,
        description: r.oz,
        ...(ogImages ? { images: ogImages } : {}),
      },
    };
  }

  const cached = await getCachedReview(slug);
  if (cached) {
    const fr = cachedToFilmReview(cached);
    const description =
      fr?.oz ?? `${cached.filmTitleRaw} — Perde'nin topluluk yorumu.`;
    const displayTitle = cached.tmdbTitle || cached.filmTitleRaw;
    const ogImages = cached.posterUrl ? [cached.posterUrl] : undefined;
    return {
      title: `${displayTitle} — Perde'ye göre (topluluk)`,
      description,
      openGraph: {
        title: `${displayTitle} — Perde'ye göre`,
        description,
        type: "article",
        publishedTime: new Date(cached.askedAt).toISOString(),
        ...(ogImages ? { images: ogImages } : {}),
      },
      twitter: {
        card: "summary_large_image",
        title: `${displayTitle} — Perde'ye göre`,
        description,
        ...(ogImages ? { images: ogImages } : {}),
      },
    };
  }

  return { title: "Bulunamadı · Perde" };
}

export default async function PerdeReviewPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  // 1) Curated arşivde mi?
  const curated = reviewBySlug(slug);
  if (curated) {
    const { review, backdropUrl } = await enrichCurated(curated);
    return (
      <ReviewLayout
        review={review}
        curatedSlug={curated.filmSlug}
        backdropUrl={backdropUrl}
      />
    );
  }

  // 2) KV cache'te mi?
  if (perdeCacheEnabled) {
    const cached = await getCachedReview(slug);
    if (cached) {
      const adapted = cachedToFilmReview(cached);
      if (adapted) {
        // Hit sayacını fire-and-forget güncelle
        void recordCacheHit(slug);
        return (
          <ReviewLayout
            review={adapted}
            backdropUrl={cached.backdropUrl ?? null}
            community={{
              askedAt: cached.askedAt,
              hitCount: cached.hitCount ?? 0,
            }}
          />
        );
      }
    }
  }

  // 3) Hiçbir yerde yok — 404
  notFound();
}

function ReviewLayout({
  review,
  curatedSlug,
  community,
  backdropUrl,
}: {
  review: FilmReview;
  curatedSlug?: string;
  community?: { askedAt: number; hitCount: number };
  backdropUrl?: string | null;
}) {
  const others = perdeArchive
    .filter((r) => r.filmSlug !== (curatedSlug ?? review.filmSlug))
    .slice(0, 3);

  return (
    <article
      className="relative pt-4 pb-24"
      style={{
        background: `radial-gradient(ellipse 100% 60% at 50% 0%, ${ACCENT}18 0%, transparent 70%)`,
      }}
    >
      <div className="px-6 md:px-10 max-w-4xl mx-auto">
        {/* Üst gezinme */}
        <div className="flex items-center justify-between gap-3 mb-10">
          <Link
            href="/perde"
            className="mono-tag transition-colors"
            style={{ color: ACCENT }}
          >
            ← Perde arşivi
          </Link>
          <Link
            href="/yapimlar/perde"
            className="mono-tag text-mist-500 hover:text-mist-100 transition-colors"
          >
            yapım kimliği →
          </Link>
        </div>

        <PerdeReview
          review={review}
          community={community}
          backdropUrl={backdropUrl}
        />

        {/* Bir başka film sor */}
        <section
          className="mt-16 rounded-3xl p-6 md:p-8"
          style={{
            border: `1px solid ${ACCENT}40`,
            background: `linear-gradient(180deg, ${ACCENT}10 0%, transparent 100%)`,
          }}
        >
          <p className="mono-tag" style={{ color: ACCENT }}>
            başka bir filmi de perde'ye sor
          </p>
          <p className="editorial-italic text-mist-100 text-lg md:text-xl mt-2 mb-4 leading-snug">
            Arşivde varsa hemen yorum sayfasına gider; yoksa Perde canlı
            yanıtlar.
          </p>
          <PerdeSearch placeholder="Bir film adı yaz..." ctaLabel="aç" />
        </section>

        {/* Diğer arşiv */}
        {others.length > 0 && (
          <section className="mt-16">
            <p className="mono-tag text-mist-500 mb-6">arşivden başkaları</p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {others.map((o) => (
                <li key={o.filmSlug}>
                  <Link
                    href={`/perde/m/${o.filmSlug}`}
                    className="group block rounded-2xl p-5 transition-all"
                    style={{
                      border: `1px solid ${ACCENT}30`,
                      background: "rgba(7, 6, 15, 0.45)",
                    }}
                  >
                    <p className="mono-tag" style={{ color: ACCENT }}>
                      {o.filmYear} · {o.filmDirector}
                    </p>
                    <p className="editorial text-xl text-mist-100 mt-2 group-hover:text-tower-gold transition-colors">
                      {o.filmTitle}
                    </p>
                    <p
                      className="editorial-italic text-sm mt-2 leading-snug line-clamp-2"
                      style={{ color: `${ACCENT}cc` }}
                    >
                      “{o.oz}”
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
