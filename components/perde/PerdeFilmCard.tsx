import Link from "next/link";

/**
 * PerdeFilmCard — /perde landing'deki tek bir film kartı.
 *
 * İki varyantta çalışır:
 *   - "curated" → CR YAPIM ekibinin yazdığı, ◧ sembolüyle
 *   - "community" → kullanıcının sorduğu + AI'ın yanıtladığı, ◇ sembolüyle
 *
 * Telif: gerçek film posteri/karesi KULLANILMAZ. Kart görseli tamamen
 * kod-yerli — sinema perdesi gradyanı + sembol. Film adı + öz metin taşır.
 *
 * Tasarım: kırmızı sinema perdesi accent (#c95a5a), 16:10 aspect ratio
 * ile sinematik his.
 */

const ACCENT = "#c95a5a";

export type PerdeFilmCardProps = {
  href: string;
  title: string;
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
      {/* Görsel alanı — 16:10, kod-yerli sinema perdesi (telifli görsel yok) */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "16 / 10",
          background: `radial-gradient(ellipse 70% 60% at 50% 45%, ${ACCENT}24 0%, transparent 70%), linear-gradient(180deg, #0a0719 0%, #050410 100%)`,
        }}
      >
        {/* Tarama dokusu */}
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
            className="text-5xl md:text-6xl transition-transform duration-500 group-hover:scale-110"
            style={{
              color: ACCENT,
              textShadow: `0 0 36px ${ACCENT}`,
              opacity: variant === "community" ? 0.85 : 1,
            }}
          >
            {symbol}
          </span>
        </div>

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
