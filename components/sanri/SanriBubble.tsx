"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

/**
 * SanriBubble — site genelinde sağ alt köşede duran kalıcı düğme.
 *
 * Panel ağır olduğu için (typewriter + sohbet state'i) dinamik
 * import edilir; bubble görünür ama panel ancak ilk açılışta yüklenir.
 *
 * Diğer bileşenler "Sanrı'yı şu soruyla aç" demek istediğinde
 * window event'i göndererek tetikler:
 *   window.dispatchEvent(new CustomEvent("sanri:open", { detail: { question } }));
 */

const SanriPanel = dynamic(
  () => import("./SanriPanel").then((m) => m.SanriPanel),
  { ssr: false }
);

type SanriOpenDetail = { question?: string };

export function SanriBubble() {
  const [open, setOpen] = useState(false);
  const [seed, setSeed] = useState<string | undefined>(undefined);

  // Site içi event köprüsü: başka bir bileşen Sanrı'yı çağırabilir
  useEffect(() => {
    function handleOpen(e: Event) {
      const detail = (e as CustomEvent<SanriOpenDetail>).detail;
      setSeed(detail?.question);
      setOpen(true);
    }
    window.addEventListener("sanri:open", handleOpen as EventListener);
    return () =>
      window.removeEventListener("sanri:open", handleOpen as EventListener);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    // Bir sonraki açılışta seed temizlensin diye küçük bir gecikme
    setTimeout(() => setSeed(undefined), 400);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Sanrı'ya sor"
        className="group fixed z-30 right-5 bottom-5 md:right-8 md:bottom-8 flex items-center gap-3 rounded-full pl-4 pr-5 py-3 transition-all"
        style={{
          background: "rgba(14, 10, 34, 0.85)",
          border: "1px solid rgba(181, 156, 240, 0.45)",
          backdropFilter: "blur(8px)",
          color: "#e9e6dc",
          animation: "sanri-pulse 2.6s ease-in-out infinite",
        }}
      >
        <span
          aria-hidden
          className="text-2xl leading-none"
          style={{ color: "#b59cf0", textShadow: "0 0 12px #b59cf0" }}
        >
          ◉
        </span>
        <span
          className="mono-tag transition-colors"
          style={{ color: "#e9e6dc" }}
        >
          Sanrı'ya sor
        </span>
      </button>

      <SanriPanel open={open} onClose={onClose} initialQuestion={seed} />
    </>
  );
}
