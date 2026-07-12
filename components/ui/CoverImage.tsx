"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * CoverImage — full-bleed, kendini onaran sinematik kapak görseli.
 *
 * Dosya varsa next/image (object-cover); yoksa/yüklenemezse sakin, koyu
 * bir sinematik placeholder (mat altın ufuk çizgisi) — jenerik "AI galaksi"
 * ya da stilize illüstrasyon YOK. Dosya eklenince kendiliğinden gerçeğe geçer.
 */
type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Çok yavaş sinematik zoom/pan (Ken Burns). prefers-reduced-motion'da durur. */
  kenBurns?: boolean;
};

export function CoverImage({
  src,
  alt,
  priority = false,
  sizes = "100vw",
  className = "",
  kenBurns = false,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`absolute inset-0 ${className}`}
        role="img"
        aria-label={alt}
        style={{
          background:
            "radial-gradient(ellipse 120% 60% at 70% 42%, rgba(201,169,106,0.16) 0%, transparent 58%), linear-gradient(180deg, #0d0b08 0%, #12100c 55%, #171b1f 100%)",
        }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover ${kenBurns ? "ken-burns" : ""} ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
