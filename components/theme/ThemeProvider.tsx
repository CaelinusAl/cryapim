"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/**
 * ThemeProvider — sahnenin saatini taşır.
 *
 * Mod:
 *   "night" → CR Yapım imza karanlığı: yıldızlı gökyüzü, mor-pembe köprü,
 *             altın şehir, hologram deniz. Varsayılan.
 *   "day"   → Gündüz Boğaz: açık mavi gökyüzü, soft altın atmosfer,
 *             ışıklar sönük, holografi gizli.
 *
 * Kalıcılık:
 *   localStorage["cr-theme"] — kullanıcı seçtiğinde kaydedilir.
 *   SSR sırasında daima "night" varsayar; mount sonrası kullanıcı
 *   tercihine geçer (kısa flicker olabilir, kabul edilebilir).
 */

export type Theme = "night" | "day";

type Ctx = {
  theme: Theme;
  /** Mount tamamlandı mı — flicker'ı yumuşatmak için UI'da kullanılır */
  mounted: boolean;
  setTheme: (t: Theme) => void;
  toggle: () => void;
};

const ThemeContext = createContext<Ctx>({
  theme: "night",
  mounted: false,
  setTheme: () => {},
  toggle: () => {},
});

const STORAGE_KEY = "cr-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("night");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "day" || saved === "night") {
        setThemeState(saved);
      }
    } catch {
      // localStorage yok / blocked — sessizce night ile devam
    }
    setMounted(true);
  }, []);

  // <html data-theme="..."> — CSS ve diğer componentler kolay okusun
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      window.localStorage.setItem(STORAGE_KEY, t);
    } catch {
      // yoksay
    }
  }, []);

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "night" ? "day" : "night";
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // yoksay
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, mounted, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): Ctx {
  return useContext(ThemeContext);
}
