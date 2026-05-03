import Link from "next/link";
import Image from "next/image";

/**
 * PerdeFilmCard — /perde landing'deki tek bir film kartı.
 *
 * İki varyantta çalışır:
 *   - "curated" → CR YAPIM ekibinin yazdığı, ◧ sembolüyle
 *   - "community" → kullanıcının sorduğu + AI'ın yanıtladığı, ◇ sembolüyle
 *
 * Poster davranışı:
 *   - posterUrl varsa next/image ile asıl film posteri (TMDB)
 *   - yoksa gradient + sembol fallback (önceki tasarım)
 *
 * Tasarım: kırmızı sinema perdesi accent (#c95a5a), 16:10 aspect ratio
 * ile sinematik his.
 */

const ACCENT = "#c95a5a";

export type PerdeFilmCardProps = {
  href: string;
  title: string;
  /** Poster URL (TMDB) — yoksa fallback */
  posterUrl?: string | null;
  /** Sol üst etiket (örn: yıl, "topluluk") */
  topLeftLabel?: string;
  /** Sağ üst etiket (örn: "spoiler", tarih) */
  topRightLabel?: string;
  /** Sağ alt etiket (örn: okuma sayısı) */
  bottomRightLabel?: string;
  /** "Bu film aslında ___ anlatıyor" kısa öz */
  oz?: string | null;
  /** Künye satırı (yönetmen · ülke veya başka) */
  byline?: string | null;
  /** Curated için ◧, community için ◇ */
  symbol?: string;
  /** Card varyantı — kenarlık stilini etkiler */
  variant?: "curated" | "community";
};

export function PerdeFilmCard({
  href,
  title,
  posterUrl,
  topLeftLabel,
  topRightLabel,
  bottomRightLabel,
  oz,
  byline,
  symbol = "◧",
  variant = "curated",
}: PerdeFilmCardProps) {
  const borderStyle =
    variant === "community"
      ? `1px dashed ${ACCENT}40`
      : `1px solid ${ACCENT}30`;

  return (
    <Link
      href={href}
      className="group block rounded-2xl overflow-hidden transition-all"
      style={{
        border: borderStyle,
        background: "rgba(7, 6, 15, 0.55)",
      }}
    >
      {/* Poster alanı — 16:10 aspect ratio */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "16 / 10",
          background: posterUrl
            ? "#050410"
            : `radial-gradient(ellipse 70% 60% at 50% 45%, ${ACCENT}24 0%, transparent 70%), linear-gradient(180deg, #0a0719 0%, #050410 100%)`,
        }}
      >
        {posterUrl ? (
          <>
            <Image
              src={posterUrl}
              alt={`${title} — film posteri`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              style={{
                // Posterler dik (2:3) — 16:10 kart içine cover ile sığar;
                // sağ/sol kenarlar kırpılır; merkez korunur
                objectPosition: "center 30%",
              }}
            />
            {/* Alt karartma — başlık okunsun */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, transparent 50%, rgba(7,6,15,0.85) 100%)",
              }}
            />
            {/* Hafif film grain */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-15"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 3px)",
              }}
            />
          </>
        ) : (
          <>
            {/* Fallback — sembol ortada */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 3px)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                aria-hidden
                className="text-5xl md:text-6xl"
                style={{
                  color: ACCENT,
                  textShadow: `0 0 36px ${ACCENT}`,
                  opacity: variant === "community" ? 0.85 : 1,
                }}
              >
                {symbol}
              </span>
            </div>
          </>
        )}

        {/* Sol üst etiket */}
        {topLeftLabel && (
          <div className="absolute top-3 left-3">
            <span
              className="mono-tag-lg px-2.5 py-1 rounded-md"
              style={{
                color: ACCENT,
                background: "rgba(7, 6, 15, 0.7)",
                backdropFilter: "blur(6px)",
              }}
            >
              {topLeftLabel}
            </span>
          </div>
        )}

        {/* Sağ üst etiket */}
        {topRightLabel && (
          <div className="absolute top-3 right-3">
            <span
              className="mono-tag px-2.5 py-1 rounded-md"
              style={{
                color: ACCENT,
                background: "rgba(7, 6, 15, 0.7)",
                backdropFilter: "blur(6px)",
              }}
            >
              {topRightLabel}
            </span>
          </div>
        )}

        {/* Sağ alt etiket — varsa */}
        {bottomRightLabel && (
          <div className="absolute bottom-3 right-3">
            <span
              className="mono-tag px-2.5 py-1 rounded-md"
              style={{
                color: ACCENT,
                background: "rgba(7, 6, 15, 0.7)",
                backdropFilter: "blur(6px)",
              }}
            >
              {bottomRightLabel}
            </span>
          </div>
        )}
      </div>

      {/* İçerik */}
      <div className="p-5">
        <p className="editorial text-xl md:text-2xl text-mist-100 leading-tight group-hover:text-tower-gold transition-colors">
          {title}
        </p>
        {byline && (
          <p className="mono-tag text-mist-500 mt-1">{byline}</p>
        )}
        {oz && (
          <p
            className="editorial-italic text-base mt-3 leading-snug line-clamp-3"
            style={{ color: `${ACCENT}cc` }}
          >
            “{oz}”
          </p>
        )}
      </div>
    </Link>
  );
}
