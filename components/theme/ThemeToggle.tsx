"use client";

import { useTheme } from "./ThemeProvider";

/**
 * ThemeToggle — header sağ üstte minik güneş/ay butonu.
 *
 * Tek tıkla gece ↔ gündüz geçişi. Mount tamamlanmadan önce night
 * varsayıldığı için ay ikonu render olur; mount'tan sonra kullanıcının
 * tercihine geçer.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle, mounted } = useTheme();
  const isDay = mounted && theme === "day";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDay ? "Geceye geç" : "Gündüze geç"}
      title={isDay ? "Geceye geç" : "Gündüze geç"}
      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors ${className}`}
      style={{
        border: `1px solid ${isDay ? "rgba(212,178,106,0.55)" : "rgba(159,231,255,0.40)"}`,
        background: isDay
          ? "rgba(255,236,180,0.18)"
          : "rgba(7,6,15,0.55)",
        boxShadow: isDay
          ? "0 0 18px -4px rgba(212,178,106,0.6)"
          : "0 0 14px -4px rgba(159,231,255,0.45)",
      }}
    >
      {isDay ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d4b26a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4" fill="#f0d896" stroke="#d4b26a" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
          <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
          <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
          <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#9fe7ff"
          stroke="#9fe7ff"
          strokeWidth="1.5"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
