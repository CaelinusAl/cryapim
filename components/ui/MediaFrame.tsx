"use client";

import Image from "next/image";
import { useState } from "react";
import type { MediaSource } from "@/content/types";

/**
 * MediaFrame — görsel/poster çerçevesi (placeholder-farkında, kendini onaran).
 *
 * poster varsa → next/image (optimize + lazy, hero'da priority).
 * poster YOKSA ya da dosya henüz eklenmemişse (yükleme hatası) → tasarımlı
 * CSS placeholder (gradient + tarama dokusu + etiket). Böylece content/*'e
 * gerçek yol yazılır; dosya eklenince kendiliğinden gerçek görsele geçer,
 * eksikken kırık görsel yerine zarif placeholder görünür.
 */
type Props = {
  media: MediaSource;
  /** Vurgu rengi (placeholder tonlaması). Varsayılan mat altın. */
  accent?: string;
  /** CSS aspect-ratio (örn. "16 / 9", "4 / 3"). */
  ratio?: string;
  /** Placeholder'da gösterilecek küçük etiket. */
  label?: string;
  /** İlk ekran görseli mi (LCP için priority + eager). */
  priority?: boolean;
  /** next/image sizes ipucu. */
  sizes?: string;
  className?: string;
};

export function MediaFrame({
  media,
  accent = "#c9a96a",
  ratio = "16 / 9",
  label = "görsel yakında",
  priority = false,
  sizes = "100vw",
  className = "",
}: Props) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(media.poster) && !failed;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl ${className}`}
      style={{ aspectRatio: ratio, background: "#12100c", border: `1px solid ${accent}33` }}
    >
      {showImage ? (
        <Image
          src={media.poster as string}
          alt={media.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          role="img"
          aria-label={media.alt}
          style={{
            background: `radial-gradient(ellipse 80% 70% at 50% 40%, ${accent}22 0%, transparent 70%), linear-gradient(180deg, #191712 0%, #12100c 100%)`,
          }}
        >
          {/* İnce tarama çizgileri — sinematik doku */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 3px)",
            }}
          />
          <span
            className="mono-tag relative"
            style={{ color: accent, letterSpacing: "0.18em" }}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
