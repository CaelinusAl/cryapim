"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { experience } from "@/config/experience.config";

/**
 * HeroMedia — hero'nun full-bleed medya omurgası + ışık grade'i.
 *
 * Medya önceliği: (video varsa & hareket serbestse) sessiz otomatik video →
 * poster → tasarımlı CSS placeholder. Ses asla izinsiz açılmaz.
 *
 * Üstüne CSS ışık katmanları (pikseli değiştirmez, config/experience'ten):
 *   · pencere bloom'u (Boğaz nefes alsın)
 *   · laptop ekran parıltısı ("Caelinus çalışıyor" — sakin nabız)
 *   · pencereden god-ray + hafif üst sis (atmosfer)
 *   · güneşte yüzen toz tanecikleri
 * Hepsi reduced-motion'da durur; blend "screen" ile yalnız aydınlatır.
 */
type Props = { alt: string };

export function HeroMedia({ alt }: Props) {
  const [reduced, setReduced] = useState(false);
  // Poster dosyası henüz eklenmemişse (yükleme hatası) placeholder'a düş.
  const [posterFailed, setPosterFailed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const { poster, video, mobileVideo, autoPlayMuted, posterOnlyOnReducedMotion, light } =
    experience.hero;
  const useVideo = Boolean(video) && autoPlayMuted && !(reduced && posterOnlyOnReducedMotion);
  const usePoster = Boolean(poster) && !posterFailed;
  const a = light.atmosphere;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {useVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          preload="metadata"
        >
          {mobileVideo && (
            <source src={mobileVideo} media="(max-width: 768px)" type="video/mp4" />
          )}
          <source src={video} type="video/mp4" />
        </video>
      ) : usePoster ? (
        <Image
          src={poster as string}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          onError={() => setPosterFailed(true)}
        />
      ) : (
        // Tasarımlı placeholder — antrasit + Boğaz + mat altın (dummy dosya yok)
        <div
          className="absolute inset-0"
          role="img"
          aria-label={alt}
          style={{
            background:
              "radial-gradient(ellipse 90% 55% at 50% 100%, rgba(201,169,106,0.16), transparent 62%), radial-gradient(ellipse 70% 50% at 70% 20%, rgba(62,107,140,0.26), transparent 70%), linear-gradient(180deg, #12100c 0%, #171b1f 60%, #1c3b4d 100%)",
          }}
        />
      )}

      {/* ── Işık grade'i (yalnız aydınlatır; blend: screen) ── */}

      {/* Pencere / Boğaz bloom'u — sağ üst, sıcak, canlandırır */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          mixBlendMode: "screen",
          background: `radial-gradient(ellipse ${light.window.size} at ${light.window.x} ${light.window.y}, rgba(${light.window.warm},${light.window.intensity}) 0%, rgba(${light.window.warm},${light.window.intensity * 0.35}) 34%, transparent 62%)`,
        }}
      />

      {/* Pencereden god-ray — yumuşak diyagonal ışık huzmesi */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          mixBlendMode: "screen",
          opacity: a,
          background:
            "linear-gradient(122deg, transparent 40%, rgba(255,214,150,0.10) 58%, rgba(255,214,150,0.03) 70%, transparent 82%)",
        }}
      />

      {/* Laptop ekranı — "Caelinus çalışıyor" hissi (sakin nabız) */}
      <div
        className={`absolute inset-0 pointer-events-none ${reduced ? "" : "hero-screen-glow"}`}
        style={{
          mixBlendMode: "screen",
          background: `radial-gradient(ellipse ${light.screen.size} at ${light.screen.x} ${light.screen.y}, rgba(${light.screen.tone},${light.screen.intensity}) 0%, transparent 55%)`,
        }}
      />

      {/* Atmosfer — üstte hafif sis, arka planı yumuşat, göz metne otursun */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, rgba(120,110,92,${0.10 * a}) 0%, transparent 26%)`,
        }}
      />

      {/* Güneşte yüzen toz tanecikleri — AI-düzlüğü kırar, mekâna hayat verir */}
      {light.dust && !reduced && (
        <div
          className="absolute inset-0 pointer-events-none hero-dust"
          style={{
            backgroundImage:
              "radial-gradient(1.5px 1.5px at 68% 32%, rgba(255,236,200,0.55), transparent 60%), radial-gradient(1px 1px at 76% 24%, rgba(255,236,200,0.4), transparent 60%), radial-gradient(1.5px 1.5px at 82% 40%, rgba(255,236,200,0.45), transparent 60%), radial-gradient(1px 1px at 60% 44%, rgba(255,236,200,0.35), transparent 60%), radial-gradient(1.5px 1.5px at 88% 30%, rgba(255,236,200,0.4), transparent 60%)",
          }}
        />
      )}

      {/* İnce film grain — dijital düzlüğü kırar */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 3px)",
        }}
      />
    </div>
  );
}
