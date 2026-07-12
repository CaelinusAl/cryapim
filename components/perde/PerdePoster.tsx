import Link from "next/link";

/**
 * PerdePoster — bir analizin "sanat posteri".
 *
 * Telif: gerçek film afişi/karesi KULLANILMAZ. Poster tamamen kod-yerli —
 * tek bir sembol, geniş boşluk, Cormorant başlık ve renk alanı. Her poster
 * o esere özel basılmış, Perde'nin kendi görsel dilinde bir baskı gibi durur
 * (Criterion / A24 dokunuşu; Marvel/Netflix key-art estetiği değil).
 *
 * Duvarda (perde-poster-wall) bir postere gelince ötekiler söner → rack focus.
 */
type Props = {
  href: string;
  title: string;
  /** Ne okunuyor: Film · Dizi · Mitoloji · Marka … */
  kind: string;
  year?: string | null;
  /** "aslında ___ anlatıyor" tek satır öz */
  oz?: string | null;
  /** Tek sembol/glif */
  symbol?: string;
  /** Renk alanı için sıcak/derin bir ton */
  hue?: string;
  spoiler?: boolean;
};

const GOLD = "#b98f4e";
const AMBER = "#e7a94f";

export function PerdePoster({
  href,
  title,
  kind,
  year,
  oz,
  symbol = "◧",
  hue = "#2a1d12",
  spoiler = false,
}: Props) {
  return (
    <Link
      href={href}
      className="perde-poster group relative block overflow-hidden rounded-[3px]"
      style={{
        aspectRatio: "2 / 3",
        border: `1px solid ${GOLD}33`,
        background: `radial-gradient(ellipse 95% 65% at 50% 32%, ${hue}66 0%, transparent 66%), linear-gradient(180deg, #16110b 0%, #0b0a08 100%)`,
        boxShadow: "0 20px 60px -30px rgba(0,0,0,0.8)",
      }}
    >
      {/* Baskı dokusu — çok ince tarama */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 3px)",
        }}
      />

      {/* Tek sembol — üst-orta, sönük, dev */}
      <span
        aria-hidden
        className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 leading-none select-none"
        style={{
          fontSize: "clamp(4.5rem, 12vw, 7rem)",
          color: GOLD,
          opacity: 0.5,
          textShadow: `0 0 60px ${hue}`,
        }}
      >
        {symbol}
      </span>

      {/* Hover spotlight — amber ışık düşer */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse 80% 55% at 50% 28%, ${AMBER}22 0%, transparent 62%)`,
        }}
      />

      {/* Üst etiket — ne okunuyor */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
        <span
          className="mono-tag"
          style={{ color: GOLD, letterSpacing: "0.16em" }}
        >
          {[kind, year].filter(Boolean).join(" · ")}
        </span>
        {spoiler && (
          <span
            className="mono-tag px-2 py-0.5 rounded-sm"
            style={{
              color: "#0b0a08",
              background: "#8e2b24",
              letterSpacing: "0.12em",
            }}
          >
            spoiler
          </span>
        )}
      </div>

      {/* Alt — başlık + öz */}
      <div
        className="absolute inset-x-0 bottom-0 p-5 pt-14"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(11,10,8,0.85) 55%, rgba(11,10,8,0.97) 100%)",
        }}
      >
        <p className="editorial text-2xl md:text-[1.7rem] leading-tight text-mist-100 transition-colors group-hover:text-[color:var(--perde-amber)]">
          {title}
        </p>
        {oz && (
          <p
            className="editorial-italic text-sm md:text-[0.95rem] mt-2 leading-snug line-clamp-2"
            style={{ color: "#b6a893" }}
          >
            {oz}
          </p>
        )}
        <span
          aria-hidden
          className="mono-tag mt-3 inline-block opacity-0 -translate-x-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0"
          style={{ color: GOLD }}
        >
          perdeyi arala →
        </span>
      </div>
    </Link>
  );
}
