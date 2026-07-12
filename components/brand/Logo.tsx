import Link from "next/link";
import Image from "next/image";

/**
 * CR YAPIM — marka logosu (web için vektörel yorum).
 *
 * Konsept (marka kılavuzu): C + R + insan yüzü silüeti — "Creative + Reality +
 * Hikâye". Tamamen SVG → her ölçekte keskin, tema-uyumlu, tek renk/negatif de
 * çalışır. Altın gradyan Kız Kulesi ışığı token'ıyla uyumludur.
 *
 * Kullanım:
 *   <Logo />                 → mark + "CR YAPIM" (header)
 *   <Logo variant="mark" />  → yalnız amblem
 *   <Logo variant="stacked" showTagline /> → dikey (footer/hero)
 */

export function CrMark({
  size = 40,
  className = "",
  title = "CR Yapım",
}: {
  size?: number;
  className?: string;
  title?: string;
}) {
  // Sabit id'ler — çoklu örnekte de aynı gradyanı çözer (RSC-uyumlu).
  const gold = "cr-gold";
  const deep = "cr-gold-deep";

  const cPath = "M133.2 148.9 A68 68 0 1 1 133.2 51.1";
  const rPath =
    "M120 50 L120 158 M120 50 C 160 50, 174 64, 174 74 C 174 90, 158 94, 120 94 M120 94 L184 160";
  const facePath =
    "M106 56 C 92 54, 82 62, 80 74 C 79 80, 69 84, 70 91 C 70 97, 80 96, 81 101 C 82 105, 79 108, 82 111 C 86 116, 95 117, 95 124";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 210 200"
      role="img"
      aria-label={title}
      className={className}
    >
      <defs>
        <linearGradient id={gold} x1="10%" y1="2%" x2="82%" y2="98%">
          <stop offset="0%" stopColor="#F7E7B4" />
          <stop offset="38%" stopColor="#D8B876" />
          <stop offset="70%" stopColor="#C9A96A" />
          <stop offset="100%" stopColor="#7E5D2B" />
        </linearGradient>
        <linearGradient id={deep} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6b4f22" />
          <stop offset="100%" stopColor="#3f2e14" />
        </linearGradient>
      </defs>

      {/* Derinlik gölgesi — hafif 3D kabartma hissi */}
      <g transform="translate(3 4)" opacity={0.55}>
        <path d={cPath} fill="none" stroke={`url(#${deep})`} strokeWidth={30} strokeLinecap="round" />
        <path
          d={rPath}
          fill="none"
          stroke={`url(#${deep})`}
          strokeWidth={26}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* C — solda büyük, sağı açık altın halka */}
      <path d={cPath} fill="none" stroke={`url(#${gold})`} strokeWidth={30} strokeLinecap="round" />

      {/* Yüz profili — üst-ortada, sola bakan tek çizgi */}
      <path
        d={facePath}
        fill="none"
        stroke={`url(#${gold})`}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* R — sağda baskın harf, uzun sarkan bacak */}
      <path
        d={rPath}
        fill="none"
        stroke={`url(#${gold})`}
        strokeWidth={26}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type LogoProps = {
  variant?: "full" | "mark" | "stacked" | "image";
  markSize?: number;
  showTagline?: boolean;
  className?: string;
  /** image varyantı için genişlik (px) */
  width?: number;
  priority?: boolean;
};

export function Logo({
  variant = "full",
  markSize = 40,
  showTagline = false,
  className = "",
  width = 260,
  priority = false,
}: LogoProps) {
  if (variant === "mark") {
    return <CrMark size={markSize} className={className} />;
  }

  if (variant === "image") {
    // Resmi 3D altın lockup — koyu zeminlerde birebir marka anı için.
    const h = Math.round((width * 584) / 541);
    return (
      <Image
        src="/brand/cr-logo.png"
        alt="CR Yapım — Hikâyenin gücü, gerçeğin yaratıcısı"
        width={width}
        height={h}
        priority={priority}
        className={className}
        sizes={`${width}px`}
      />
    );
  }

  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <CrMark size={markSize} />
        <div className="text-center">
          <span className="editorial text-2xl md:text-[1.75rem] tracking-[0.14em] text-mist-100">
            CR <span className="text-mist-300">YAPIM</span>
          </span>
          {showTagline && (
            <p
              className="mono-tag mt-2"
              style={{ color: "var(--color-tower-gold)", letterSpacing: "0.22em" }}
            >
              hikâye yazarız · dünya izler
            </p>
          )}
        </div>
      </div>
    );
  }

  // full — mark + inline wordmark
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <CrMark size={markSize} />
      <span
        className="editorial text-2xl md:text-[1.75rem] tracking-wide text-mist-100 transition-colors group-hover:text-tower-gold"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6), 0 0 18px rgba(0,0,0,0.4)" }}
      >
        CR <span className="text-mist-300">YAPIM</span>
      </span>
    </span>
  );
}

/**
 * Tıklanabilir logo — ana sayfaya döner. Header'da kullanılır.
 */
export function LogoLink({
  markSize = 40,
  className = "",
}: {
  markSize?: number;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="CR Yapım ana sayfa"
    >
      <Logo variant="full" markSize={markSize} />
    </Link>
  );
}
