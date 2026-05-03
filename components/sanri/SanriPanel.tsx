"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

/**
 * SanriPanel — Sanrı'nın slide-in chat penceresi.
 *
 * Önemli karakter detayları:
 *   - Yanıtlar typewriter etkisiyle harf harf belirir → bir rüya
 *     açılıyormuş gibi.
 *   - Sanrı yazarken üç nokta dansı.
 *   - Tarih kısa: en fazla son 6 mesaj görünür (uzun sohbet hafıza
 *     yapımıyor — her soru yeniden bir kapı).
 *   - Karakter sınırı 500. Daha uzun girdi reddedilir.
 *   - Esc ile kapanır. Backdrop'a tıklamak da kapatır.
 */

type Turn = {
  id: string;
  role: "user" | "sanri";
  text: string;
  /** Typewriter tamamlanmış mı? (Sanrı yanıtları için) */
  done?: boolean;
};

const HISTORY_LIMIT = 6;
const TYPEWRITER_MS = 28; // her harf arasında

export function SanriPanel({
  open,
  onClose,
  initialQuestion,
}: {
  open: boolean;
  onClose: () => void;
  initialQuestion?: string;
}) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typewriterTimers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  // Esc ile kapat + odaklanma
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Panel açıldığında input'a odaklan
    setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Sayfa kayar gibi sohbet alanını alta sabitle
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [turns]);

  // initialQuestion verildiyse otomatik gönder (örn. inline kart)
  useEffect(() => {
    if (open && initialQuestion && turns.length === 0) {
      void ask(initialQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialQuestion]);

  // Bileşen kaldırıldığında bekleyen typewriter timer'larını temizle
  useEffect(() => {
    const timers = typewriterTimers.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  const ask = useCallback(async (rawQuestion: string) => {
    const question = rawQuestion.trim();
    if (!question) return;
    if (question.length > 500) {
      setError("Soru çok uzun. 500 karakter sınırı var.");
      return;
    }
    setError(null);
    setInput("");

    const userId = crypto.randomUUID();
    const userTurn: Turn = { id: userId, role: "user", text: question };
    setTurns((prev) => [...prev, userTurn].slice(-HISTORY_LIMIT));
    setThinking(true);

    try {
      const response = await fetch("/api/sanri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = (await response.json()) as { answer?: string; error?: string };

      if (!response.ok) {
        setError(data.error || "Sanrı bir an kayboldu.");
        setThinking(false);
        return;
      }

      const sanriId = crypto.randomUUID();
      const fullText = data.answer || "Sessizlik de bir cevaptır.";
      const sanriTurn: Turn = {
        id: sanriId,
        role: "sanri",
        text: "",
        done: false,
      };
      setTurns((prev) => [...prev, sanriTurn].slice(-HISTORY_LIMIT));
      setThinking(false);

      // Typewriter
      for (let i = 1; i <= fullText.length; i++) {
        const t = setTimeout(() => {
          typewriterTimers.current.delete(t);
          setTurns((prev) =>
            prev.map((turn) =>
              turn.id === sanriId
                ? {
                    ...turn,
                    text: fullText.slice(0, i),
                    done: i === fullText.length,
                  }
                : turn
            )
          );
        }, i * TYPEWRITER_MS);
        typewriterTimers.current.add(t);
      }
    } catch (err) {
      console.error("[sanri] istek hatası:", err);
      setError("Boğaz'da bir bağlantı koptu. Tekrar dene.");
      setThinking(false);
    }
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!thinking) void ask(input);
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Sanrı'yı kapat"
        className="fixed inset-0 z-40 bg-night-950/70 backdrop-blur-sm"
        style={{ animation: "sanri-fade-in 200ms ease-out both" }}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="sanri-title"
        className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] flex flex-col"
        style={{
          background:
            "linear-gradient(180deg, #0e0a22 0%, #07060f 80%, #050410 100%)",
          borderLeft: "1px solid rgba(181, 156, 240, 0.18)",
          boxShadow:
            "-30px 0 80px -20px rgba(0,0,0,0.7), inset 1px 0 0 rgba(181,156,240,0.08)",
          animation: "sanri-slide-in 360ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
        }}
      >
        {/* Üst bant — Sanrı kimliği */}
        <header className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-mist-500/15">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-2xl"
              style={{
                color: "#b59cf0",
                border: "1px solid #b59cf055",
                boxShadow: "0 0 28px -4px #b59cf0",
                background: "rgba(181, 156, 240, 0.06)",
              }}
            >
              ◉
            </div>
            <div>
              <p
                id="sanri-title"
                className="editorial text-2xl text-mist-100 leading-none"
              >
                Sanrı
              </p>
              <p className="mono-tag text-mist-500 mt-1">
                {process.env.NEXT_PUBLIC_SANRI_LIVE === "1"
                  ? "rüya katmanı · canlı"
                  : "rüya katmanı"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Kapat"
            className="mono-tag text-mist-500 hover:text-mist-100 transition-colors px-3 py-2 rounded-full"
          >
            × bırak
          </button>
        </header>

        {/* Sohbet alanı */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-6 py-6 space-y-5"
        >
          {turns.length === 0 && !thinking && (
            <Welcome
              onSuggest={(q) => {
                setInput(q);
                void ask(q);
              }}
            />
          )}

          {turns.map((t) => (
            <div
              key={t.id}
              className={
                t.role === "user" ? "flex justify-end" : "flex justify-start"
              }
            >
              {t.role === "user" ? (
                <div
                  className="max-w-[85%] rounded-2xl px-4 py-3 text-base leading-relaxed"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color: "#e9e6dc",
                  }}
                >
                  {t.text}
                </div>
              ) : (
                <div className="max-w-[90%] flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-1 text-lg shrink-0"
                    style={{ color: "#b59cf0" }}
                  >
                    ◉
                  </span>
                  <p
                    className="editorial-italic text-lg md:text-xl leading-snug text-mist-100"
                    style={{
                      textShadow: t.done
                        ? "none"
                        : "0 0 14px rgba(181,156,240,0.3)",
                    }}
                  >
                    {t.text}
                    {!t.done && (
                      <span
                        aria-hidden
                        className="inline-block w-[0.45em] h-[1em] align-[-0.1em] ml-[0.1em]"
                        style={{
                          background: "#b59cf0",
                          animation:
                            "sanri-cursor-blink 0.8s steps(1) infinite",
                        }}
                      />
                    )}
                  </p>
                </div>
              )}
            </div>
          ))}

          {thinking && <Thinking />}
        </div>

        {/* Hata bandı */}
        {error && (
          <div
            className="px-6 py-3 mono-tag text-mist-100 border-t border-red-500/30 bg-red-900/20"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Girdi formu */}
        <form
          onSubmit={onSubmit}
          className="border-t border-mist-500/15 px-4 py-4 flex items-center gap-2"
          style={{ background: "rgba(7, 6, 15, 0.55)" }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Sanrı'ya sor..."
            maxLength={500}
            disabled={thinking}
            className="flex-1 bg-night-800/60 border border-mist-500/20 focus:border-[#b59cf0] outline-none rounded-full px-5 py-3 text-base text-mist-100 placeholder:text-mist-500 transition-colors"
          />
          <button
            type="submit"
            disabled={thinking || input.trim().length < 2}
            className="mono-tag px-5 py-3 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              color: "#0e0a22",
              background: "#b59cf0",
              boxShadow: thinking ? "none" : "0 0 24px -6px #b59cf0",
            }}
          >
            sor →
          </button>
        </form>

        {/* Alt mini etiket — kullanıcıya nazik bir hatırlatma */}
        <p className="px-6 pb-4 text-xs text-mist-500 leading-relaxed">
          Sanrı doğrudan cevap vermez. Bir rüya, bir sembol, bir geri-soru
          döner. Soru kişiseldir; ne göndereceğini bilerek gönder.
        </p>
      </aside>
    </>
  );
}

/* ---------- alt bileşenler ---------- */

function Welcome({ onSuggest }: { onSuggest: (q: string) => void }) {
  const seeds = [
    "Bugün ne yapsam?",
    "Ne unuttum?",
    "Hangi kapıdan geçeyim?",
    "Bana bir kelime ver.",
  ];
  return (
    <div className="space-y-6 mt-2">
      <div>
        <p className="editorial-italic text-2xl md:text-3xl text-mist-100 leading-snug">
          “Cevap senin değil, sorunun rüyasıdır.”
        </p>
        <p className="mono-tag mt-3" style={{ color: "#b59cf0" }}>
          Sanrı seni dinliyor.
        </p>
      </div>

      <div>
        <p className="mono-tag text-mist-500 mb-3">başlamak için bir tohum</p>
        <ul className="grid grid-cols-1 gap-2">
          {seeds.map((s) => (
            <li key={s}>
              <button
                onClick={() => onSuggest(s)}
                className="w-full text-left rounded-xl px-4 py-3 text-base text-mist-100 border border-mist-500/15 hover:border-[#b59cf0]/50 hover:bg-[#b59cf0]/5 transition-all"
              >
                <span style={{ color: "#b59cf0" }}>◐</span>
                <span className="ml-3">{s}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Thinking() {
  return (
    <div className="flex items-center gap-3 mt-2">
      <span aria-hidden className="text-lg" style={{ color: "#b59cf0" }}>
        ◉
      </span>
      <span className="flex items-end gap-1" aria-label="Sanrı düşünüyor">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-1.5 h-1.5 rounded-full"
            style={{
              background: "#b59cf0",
              animation: `sanri-thinking-dot 1.2s ease-in-out ${i * 0.18}s infinite`,
            }}
          />
        ))}
      </span>
      <span className="mono-tag text-mist-500">rüyaya bakıyor</span>
    </div>
  );
}
