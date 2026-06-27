import type { Episode, VideoSource } from "@/data/episodes";

/**
 * VideoPlayer — provider-agnostic video oynatıcı.
 *
 * Tek bileşen, çok motor: episode.video.provider'a göre doğru player'ı
 * render eder. Yarın Bunny / CF Stream / Mux'a geçtiğimizde UI'da tek
 * bir satır değişmez; sadece veri katmanı güncellenir.
 *
 * Server component — etkileşimli (kontroller) tarafları altta wrap'li.
 */

type Props = {
  episode: Episode;
  /** Programın accent rengi — placeholder'da kullanılır */
  accent: string;
  /** Programın sembolü — placeholder'da pulsing gösterilir */
  programSymbol: string;
  /** Programın başlığı — placeholder altyazısı için */
  programTitle: string;
};

export function VideoPlayer({
  episode,
  accent,
  programSymbol,
  programTitle,
}: Props) {
  const src = episode.video;
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-cinema"
      style={{
        aspectRatio: "16 / 9",
        background: "#050410",
        border: `1px solid ${accent}33`,
      }}
    >
      <PlayerSwitch
        src={src}
        title={episode.title}
        poster={episode.poster}
        accent={accent}
        programSymbol={programSymbol}
        programTitle={programTitle}
      />
    </div>
  );
}

function PlayerSwitch({
  src,
  title,
  poster,
  accent,
  programSymbol,
  programTitle,
}: {
  src: VideoSource;
  title: string;
  poster?: string;
  accent: string;
  programSymbol: string;
  programTitle: string;
}) {
  switch (src.provider) {
    case "youtube":
      return <YouTubeEmbed videoId={src.videoId} title={title} />;
    case "direct":
      return (
        <DirectVideo url={src.url} mimeType={src.mimeType} poster={poster} />
      );
    case "bunny":
      return (
        <BunnyEmbed
          libraryId={src.libraryId}
          videoGuid={src.videoGuid}
          title={title}
        />
      );
    case "cloudflare":
      return <CloudflareEmbed uid={src.uid} title={title} />;
    case "mux":
      return <MuxEmbed playbackId={src.playbackId} title={title} />;
    case "placeholder":
      return (
        <Placeholder
          reason={src.reason}
          accent={accent}
          symbol={programSymbol}
          programTitle={programTitle}
          episodeTitle={title}
        />
      );
  }
}

/* ---------- provider'lar ---------- */

function YouTubeEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  return (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="absolute inset-0 w-full h-full border-0"
    />
  );
}

function DirectVideo({
  url,
  mimeType,
  poster,
}: {
  url: string;
  mimeType?: string;
  poster?: string;
}) {
  return (
    <video
      controls
      preload="metadata"
      poster={poster}
      className="absolute inset-0 w-full h-full bg-night-950"
    >
      <source src={url} type={mimeType ?? "video/mp4"} />
      Bu tarayıcı yerleşik video oynatıcıyı desteklemiyor.
    </video>
  );
}

function BunnyEmbed({
  libraryId,
  videoGuid,
  title,
}: {
  libraryId: string;
  videoGuid: string;
  title: string;
}) {
  return (
    <iframe
      src={`https://iframe.mediadelivery.net/embed/${libraryId}/${videoGuid}?autoplay=false&preload=true`}
      title={title}
      loading="lazy"
      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
      allowFullScreen
      className="absolute inset-0 w-full h-full border-0"
    />
  );
}

function CloudflareEmbed({ uid, title }: { uid: string; title: string }) {
  return (
    <iframe
      src={`https://customer-iframe.cloudflarestream.com/${uid}/iframe?preload=metadata`}
      title={title}
      loading="lazy"
      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
      allowFullScreen
      className="absolute inset-0 w-full h-full border-0"
    />
  );
}

function MuxEmbed({
  playbackId,
  title,
}: {
  playbackId: string;
  title: string;
}) {
  // İlk MVP: iframe embed. İleride @mux/mux-player-react paketi ile değiştirilir.
  return (
    <iframe
      src={`https://stream.mux.com/${playbackId}.m3u8`}
      title={title}
      loading="lazy"
      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
      allowFullScreen
      className="absolute inset-0 w-full h-full border-0"
    />
  );
}

/* ---------- "yakında yayında" placeholder ---------- */

function Placeholder({
  reason,
  accent,
  symbol,
  programTitle,
  episodeTitle,
}: {
  reason: "soon" | "lost";
  accent: string;
  symbol: string;
  programTitle: string;
  episodeTitle: string;
}) {
  const labels: Record<typeof reason, { tag: string; line: string }> = {
    soon: {
      tag: "yakında yayında",
      line: "Bu bölümün perdesi şu sıralar açılıyor.",
    },
    lost: {
      tag: "kayıt arşivde",
      line: "Bu bölüm arşivde, gün yüzü için bekliyor.",
    },
  };
  const { tag, line } = labels[reason];

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
      style={{
        background: `radial-gradient(ellipse 80% 70% at 50% 40%, ${accent}26 0%, transparent 70%), linear-gradient(180deg, #0a0719 0%, #050410 100%)`,
      }}
    >
      {/* Sinematik tarama çizgileri (CSS keyframe — globals.css'teki hologram-scan) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 3px)",
        }}
      />

      {/* Pulsing program sembolü */}
      <div
        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-4xl md:text-5xl mb-6"
        style={{
          color: accent,
          border: `1px solid ${accent}88`,
          boxShadow: `0 0 60px -10px ${accent}, inset 0 0 30px -10px ${accent}55`,
          background: `${accent}14`,
          animation: "symbol-pulse 2.6s ease-in-out infinite",
        }}
        aria-hidden
      >
        {symbol}
      </div>

      <p
        className="mono-tag-lg mb-2"
        style={{ color: accent, letterSpacing: "0.16em" }}
      >
        {tag}
      </p>
      <p className="editorial-italic text-lg md:text-2xl text-mist-100 max-w-xl leading-snug">
        “{line}”
      </p>
      <p className="mono-tag text-mist-500 mt-6">
        {programTitle} · {episodeTitle}
      </p>

      {/* Sağ alt CR YAPIM filigranı */}
      <p className="absolute right-5 bottom-4 mono-tag text-mist-500 opacity-60">
        cryapim.com
      </p>
    </div>
  );
}
