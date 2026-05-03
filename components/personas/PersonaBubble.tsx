"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { ALL_PERSONAS, getPersona } from "@/lib/personas";
import type { PersonaId } from "@/lib/personas/types";

/**
 * PersonaBubble — site genelinde sağ alt köşede duran kalıcı düğme.
 *
 * Tek bir motor, dört yüz: tıklayınca üstte küçük bir persona seçici
 * menüsü açılır. Kullanıcı bir persona seçince o persona'nın paneli
 * açılır (Sanrı, Rivayet AI, Şüpheci AI veya Selbi AI).
 *
 * Diğer bileşenler de paneli "şu persona, şu soruyla" diye çağırabilir:
 *   window.dispatchEvent(new CustomEvent("persona:open", {
 *     detail: { personaId: "rivayet", question: "Üsküdar'da konak..." }
 *   }));
 *
 * Geriye uyumluluk: eski "sanri:open" event'i de dinlenir, otomatik
 * Sanrı paneline yönlendirilir.
 */

const PersonaPanel = dynamic(
  () => import("./PersonaPanel").then((m) => m.PersonaPanel),
  { ssr: false }
);

type OpenDetail = { personaId?: PersonaId; question?: string };

const DEFAULT_PERSONA: PersonaId = "sanri";

export function PersonaBubble() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<PersonaId | null>(null);
  const [seed, setSeed] = useState<string | undefined>(undefined);
  const menuRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLButtonElement>(null);

  // Site içi event köprüsü — başka bileşenler paneli çağırabilir
  useEffect(() => {
    function handlePersonaOpen(e: Event) {
      const detail = (e as CustomEvent<OpenDetail>).detail;
      const id = detail?.personaId ?? DEFAULT_PERSONA;
      setSeed(detail?.question);
      setActiveId(id);
      setMenuOpen(false);
    }
    function handleSanriOpenLegacy(e: Event) {
      const detail = (e as CustomEvent<{ question?: string }>).detail;
      setSeed(detail?.question);
      setActiveId("sanri");
      setMenuOpen(false);
    }
    window.addEventListener("persona:open", handlePersonaOpen as EventListener);
    window.addEventListener("sanri:open", handleSanriOpenLegacy as EventListener);
    return () => {
      window.removeEventListener("persona:open", handlePersonaOpen as EventListener);
      window.removeEventListener(
        "sanri:open",
        handleSanriOpenLegacy as EventListener
      );
    };
  }, []);

  // Menü açıkken dış tıklama / Esc ile kapanır
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    function onClick(e: MouseEvent) {
      const t = e.target as Node;
      if (
        menuRef.current?.contains(t) === false &&
        bubbleRef.current?.contains(t) === false
      ) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [menuOpen]);

  const onClose = useCallback(() => {
    setActiveId(null);
    setTimeout(() => setSeed(undefined), 400);
  }, []);

  function pick(id: PersonaId) {
    setSeed(undefined);
    setActiveId(id);
    setMenuOpen(false);
  }

  return (
    <>
      {/* Sağ alt köşe — kalıcı bubble + persona seçici menü */}
      <div className="fixed z-30 right-5 bottom-5 md:right-8 md:bottom-8">
        {/* Açılır menü — bubble'ın üstünde */}
        {menuOpen && (
          <div
            ref={menuRef}
            role="menu"
            aria-label="Caelinus AI personalarını seç"
            className="absolute bottom-full right-0 mb-3 w-72 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(7, 6, 15, 0.95)",
              border: "1px solid rgba(181, 156, 240, 0.25)",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 -20px 50px -12px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset",
              animation:
                "sanri-fade-in 180ms ease-out both, persona-menu-rise 220ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
            }}
          >
            <p
              className="mono-tag px-4 pt-4 pb-2"
              style={{ color: "#b59cf0", letterSpacing: "0.08em" }}
            >
              caelinus ai · personalar
            </p>
            <ul role="none" className="pb-2">
              {ALL_PERSONAS.map((p) => (
                <li key={p.id} role="none">
                  <button
                    role="menuitem"
                    type="button"
                    onClick={() => pick(p.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                    style={{ color: "#e9e6dc" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${p.accent}14`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <span
                      aria-hidden
                      className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-lg"
                      style={{
                        color: p.accent,
                        border: `1px solid ${p.accent}55`,
                        boxShadow: `0 0 14px -2px ${p.accent}`,
                        background: `${p.accent}10`,
                      }}
                    >
                      {p.symbol}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-base text-mist-100 leading-tight">
                        {p.name}
                      </span>
                      <span
                        className="block mono-tag text-mist-500 mt-0.5"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {p.tone}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bubble */}
        <button
          ref={bubbleRef}
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-label="Caelinus AI'a sor"
          className="flex items-center gap-3 rounded-full pl-4 pr-5 py-3 transition-all"
          style={{
            background: "rgba(14, 10, 34, 0.85)",
            border: "1px solid rgba(181, 156, 240, 0.45)",
            backdropFilter: "blur(8px)",
            color: "#e9e6dc",
            animation: menuOpen ? "none" : "sanri-pulse 2.6s ease-in-out infinite",
          }}
        >
          <span
            aria-hidden
            className="flex items-center gap-1"
            style={{ lineHeight: 1 }}
          >
            {ALL_PERSONAS.map((p) => (
              <span
                key={p.id}
                className="block w-2 h-2 rounded-full"
                style={{
                  background: p.accent,
                  boxShadow: `0 0 6px ${p.accent}`,
                }}
              />
            ))}
          </span>
          <span className="mono-tag">
            {menuOpen ? "kapat" : "AI'a sor"}
          </span>
        </button>
      </div>

      {/* Aktif persona varsa paneli render et */}
      {activeId && (
        <PersonaPanel
          persona={getPersona(activeId)}
          open={true}
          onClose={onClose}
          initialQuestion={seed}
        />
      )}
    </>
  );
}
