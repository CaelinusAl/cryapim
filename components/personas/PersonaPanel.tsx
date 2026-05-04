"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import type { Persona } from "@/lib/personas/types";
import { useVoiceRecorder } from "./useVoiceRecorder";

/**
 * PersonaPanel — bir persona için slide-in chat penceresi.
 *
 * Tek bileşen, çok yüz: persona prop'undan gelen renk/metin/etikete
 * göre Sanrı, Rivayet AI, Şüpheci AI veya Selbi AI olarak görünür.
 *
 * Karakter detayları (her persona için ortak):
 *   - Yanıtlar typewriter etkisiyle harf harf belirir.
 *   - Persona düşünürken üç nokta dansı.
 *   - En fazla son 6 mesaj görünür (uzun sohbet hafıza yapımıyor —
 *     her soru yeniden bir kapı).
 *   - Karakter sınırı 800. Daha uzun girdi reddedilir.
 *   - Esc ile kapanır. Backdrop'a tıklamak da kapatır.
 */

type Turn = {
  id: string;
  role: "user" | "ai";
  text: string;
  /** Typewriter tamamlanmış mı? (AI yanıtları için) */
  done?: boolean;
};

type VoiceState =
  | { status: "idle" }
  | { status: "loading"; turnId: string }
  | { status: "playing"; turnId: string; audio: HTMLAudioElement };

const HISTORY_LIMIT = 6;
const TYPEWRITER_MS = 22; // her harf arasında

export function PersonaPanel({
  persona,
  open,
  onClose,
  initialQuestion,
}: {
  persona: Persona;
  open: boolean;
  onClose: () => void;
  initialQuestion?: string;
}) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcribing, setTranscribing] = useState(false);
  const [voice, setVoice] = useState<VoiceState>({ status: "idle" });
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typewriterTimers = useRef<Set<ReturnType<typeof setTimeout>>>(
    new Set()
  );
  const recorder = useVoiceRecorder();

  const accent = persona.accent;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [turns]);

  // Persona değişince geçmişi sıfırla — başka bir AI ile başka bir konuşma
  useEffect(() => {
    setTurns([]);
    setError(null);
    setInput("");
    stopVoicePlayback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persona.id]);

  /** Çalan TTS varsa durdur (persona değişimi, panel kapanışı vs.) */
  const stopVoicePlayback = useCallback(() => {
    setVoice((curr) => {
      if (curr.status === "playing") {
        curr.audio.pause();
        curr.audio.src = "";
      }
      return { status: "idle" };
    });
  }, []);

  /** Bir AI yanıtını sesli oynat — persona kendi sesi (voice alanı) ile */
  const playTurnVoice = useCallback(
    async (turn: Turn) => {
      if (turn.role !== "ai" || !turn.text.trim()) return;

      // Aynı turn çalıyorsa → durdur (toggle)
      if (voice.status === "playing" && voice.turnId === turn.id) {
        stopVoicePlayback();
        return;
      }
      // Başka bir turn çalıyorsa → onu durdur, yenisini başlat
      stopVoicePlayback();
      setVoice({ status: "loading", turnId: turn.id });

      try {
        const res = await fetch("/api/voice/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: turn.text,
            persona: persona.id,
          }),
        });
        if (!res.ok) {
          setVoice({ status: "idle" });
          setError("Ses üretilemedi.");
          return;
        }
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.onended = () => {
          URL.revokeObjectURL(url);
          setVoice({ status: "idle" });
        };
        audio.onerror = () => {
          URL.revokeObjectURL(url);
          setVoice({ status: "idle" });
          setError("Ses oynatılamadı.");
        };
        await audio.play();
        setVoice({ status: "playing", turnId: turn.id, audio });
      } catch (err) {
        console.error("[persona:voice] tts hata:", err);
        setVoice({ status: "idle" });
        setError("Ses servisi şu an düştü.");
      }
    },
    [voice, stopVoicePlayback, persona.id]
  );

  const ask = useCallback(
    async (rawQuestion: string) => {
      const question = rawQuestion.trim();
      if (!question) return;
      if (question.length > 800) {
        setError("Soru çok uzun. 800 karakter sınırı var.");
        return;
      }
      setError(null);
      setInput("");

      const userId = crypto.randomUUID();
      const userTurn: Turn = { id: userId, role: "user", text: question };
      setTurns((prev) => [...prev, userTurn].slice(-HISTORY_LIMIT));
      setThinking(true);

      try {
        const response = await fetch(`/api/persona/${persona.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        });
        const data = (await response.json()) as {
          answer?: string;
          error?: string;
        };

        if (!response.ok) {
          setError(data.error || `${persona.name} bir an kayboldu.`);
          setThinking(false);
          return;
        }

        const aiId = crypto.randomUUID();
        const fullText = data.answer || "Sessizlik de bir cevaptır.";
        const aiTurn: Turn = {
          id: aiId,
          role: "ai",
          text: "",
          done: false,
        };
        setTurns((prev) => [...prev, aiTurn].slice(-HISTORY_LIMIT));
        setThinking(false);

        for (let i = 1; i <= fullText.length; i++) {
          const t = setTimeout(
            () => {
              typewriterTimers.current.delete(t);
              setTurns((prev) =>
                prev.map((turn) =>
                  turn.id === aiId
                    ? {
                        ...turn,
                        text: fullText.slice(0, i),
                        done: i === fullText.length,
                      }
                    : turn
                )
              );
            },
            i * TYPEWRITER_MS
          );
          typewriterTimers.current.add(t);
        }
      } catch (err) {
        console.error(`[persona:${persona.id}] istek hatası:`, err);
        setError("Boğaz'da bir bağlantı koptu. Tekrar dene.");
        setThinking(false);
      }
    },
    [persona.id, persona.name]
  );

  // initialQuestion verildiyse otomatik gönder (örn. inline kart)
  useEffect(() => {
    if (open && initialQuestion && turns.length === 0) {
      void ask(initialQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialQuestion, persona.id]);

  // Bileşen kaldırıldığında bekleyen typewriter timer'larını temizle
  useEffect(() => {
    const timers = typewriterTimers.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!thinking) void ask(input);
  }

  /** Mikrofon toggle — başlat veya durdur+transkripsiyon+gönder */
  const onMicClick = useCallback(async () => {
    if (transcribing || thinking) return;

    if (recorder.state.recording) {
      // Kaydı bitir → blob al → STT → ask
      const blob = await recorder.stop();
      if (!blob) {
        setError("Ses kaydı boş geldi.");
        return;
      }
      setTranscribing(true);
      try {
        const form = new FormData();
        form.append(
          "audio",
          blob,
          blob.type.includes("mp4") ? "voice.mp4" : "voice.webm"
        );
        const res = await fetch("/api/voice/stt", {
          method: "POST",
          body: form,
        });
        const data = (await res.json()) as {
          transcript?: string;
          error?: string;
        };
        if (!res.ok) {
          setError(data.error || "Ses çözümlenemedi.");
          setTranscribing(false);
          return;
        }
        const transcript = (data.transcript || "").trim();
        setTranscribing(false);
        if (!transcript) {
          setError("Bir şey duyamadım. Bir daha dener misin?");
          return;
        }
        // Otomatik gönder — kullanıcı zaten konuşarak sordu
        void ask(transcript);
      } catch (err) {
        console.error("[persona:voice] stt hata:", err);
        setError("Ses tanıma servisi şu an düştü.");
        setTranscribing(false);
      }
      return;
    }

    // Kaydı başlat
    setError(null);
    await recorder.start();
  }, [recorder, transcribing, thinking, ask]);

  // Recorder hata kodlarını kullanıcı dostu hata bandına yansıt
  useEffect(() => {
    if (recorder.state.error === "permission_denied") {
      setError("Mikrofon izni reddedildi. Tarayıcı ayarlarından açabilirsin.");
    } else if (recorder.state.error === "unsupported") {
      setError("Bu tarayıcı ses kaydını desteklemiyor.");
    } else if (recorder.state.error === "generic") {
      setError("Mikrofon açılamadı.");
    }
  }, [recorder.state.error]);

  // Panel kapanırken çalan sesi durdur
  useEffect(() => {
    if (!open) stopVoicePlayback();
  }, [open, stopVoicePlayback]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label={`${persona.name}'yi kapat`}
        className="fixed inset-0 z-40 bg-night-950/70 backdrop-blur-sm"
        style={{ animation: "sanri-fade-in 200ms ease-out both" }}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="persona-title"
        className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] flex flex-col"
        style={{
          background:
            "linear-gradient(180deg, #0e0a22 0%, #07060f 80%, #050410 100%)",
          borderLeft: `1px solid ${accent}30`,
          boxShadow: `-30px 0 80px -20px rgba(0,0,0,0.7), inset 1px 0 0 ${accent}18`,
          animation: "sanri-slide-in 360ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
        }}
      >
        {/* Üst bant — persona kimliği */}
        <header
          className="flex items-center justify-between px-6 pt-6 pb-5"
          style={{ borderBottom: `1px solid ${accent}25` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-2xl"
              style={{
                color: accent,
                border: `1px solid ${accent}55`,
                boxShadow: `0 0 28px -4px ${accent}`,
                background: `${accent}10`,
              }}
              aria-hidden
            >
              {persona.symbol}
            </div>
            <div>
              <p
                id="persona-title"
                className="editorial text-2xl text-mist-100 leading-none"
              >
                {persona.name}
              </p>
              <p className="mono-tag text-mist-500 mt-1">
                {process.env.NEXT_PUBLIC_SANRI_LIVE === "1"
                  ? `${persona.tone} · canlı`
                  : persona.tone}
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
              persona={persona}
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
                <div className="max-w-[92%] flex items-start gap-3 group">
                  <span
                    aria-hidden
                    className="mt-1 text-lg shrink-0"
                    style={{ color: accent }}
                  >
                    {persona.symbol}
                  </span>
                  <div className="flex-1">
                    <p
                      className="editorial-italic text-lg md:text-xl leading-snug text-mist-100 whitespace-pre-wrap"
                      style={{
                        textShadow: t.done
                          ? "none"
                          : `0 0 14px ${accent}45`,
                      }}
                    >
                      {t.text}
                      {!t.done && (
                        <span
                          aria-hidden
                          className="inline-block w-[0.45em] h-[1em] align-[-0.1em] ml-[0.1em]"
                          style={{
                            background: accent,
                            animation:
                              "sanri-cursor-blink 0.8s steps(1) infinite",
                          }}
                        />
                      )}
                    </p>
                    {t.done && (
                      <ListenButton
                        accent={accent}
                        loading={
                          voice.status === "loading" && voice.turnId === t.id
                        }
                        playing={
                          voice.status === "playing" && voice.turnId === t.id
                        }
                        onClick={() => void playTurnVoice(t)}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {thinking && <Thinking persona={persona} />}
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
          className="px-4 py-4 flex items-center gap-2"
          style={{
            background: "rgba(7, 6, 15, 0.55)",
            borderTop: `1px solid ${accent}20`,
          }}
        >
          <MicButton
            accent={accent}
            recording={recorder.state.recording}
            initializing={recorder.state.initializing}
            transcribing={transcribing}
            elapsedMs={recorder.state.elapsedMs}
            disabled={thinking}
            onClick={onMicClick}
          />
          <input
            ref={inputRef}
            value={
              transcribing
                ? "Söylediğin yazıya dönüyor…"
                : recorder.state.recording
                ? "Dinliyorum…"
                : input
            }
            onChange={(e) => setInput(e.target.value)}
            placeholder={persona.inputPlaceholder}
            maxLength={800}
            disabled={thinking || transcribing || recorder.state.recording}
            className="flex-1 bg-night-800/60 outline-none rounded-full px-5 py-3 text-base text-mist-100 placeholder:text-mist-500 transition-colors disabled:opacity-70"
            style={{
              border: `1px solid ${accent}30`,
            }}
          />
          <button
            type="submit"
            disabled={
              thinking ||
              transcribing ||
              recorder.state.recording ||
              input.trim().length < 2
            }
            className="mono-tag px-5 py-3 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              color: "#0e0a22",
              background: accent,
              boxShadow: thinking ? "none" : `0 0 24px -6px ${accent}`,
            }}
          >
            {persona.ctaLabel} →
          </button>
        </form>

        {/* Alt mini etiket — kullanıcıya nazik bir hatırlatma */}
        <p className="px-6 pb-4 text-xs text-mist-500 leading-relaxed">
          {persona.hintFooter}
        </p>
      </aside>
    </>
  );
}

/* ---------- alt bileşenler ---------- */

function Welcome({
  persona,
  onSuggest,
}: {
  persona: Persona;
  onSuggest: (q: string) => void;
}) {
  return (
    <div className="space-y-6 mt-2">
      <div>
        <p className="editorial-italic text-2xl md:text-3xl text-mist-100 leading-snug">
          {persona.welcomeQuote}
        </p>
        <p className="mono-tag mt-3" style={{ color: persona.accent }}>
          {persona.name} seni dinliyor.
        </p>
      </div>

      <div>
        <p className="mono-tag text-mist-500 mb-3">başlamak için bir tohum</p>
        <ul className="grid grid-cols-1 gap-2">
          {persona.welcomeSeeds.map((s) => (
            <li key={s}>
              <button
                onClick={() => onSuggest(s)}
                className="w-full text-left rounded-xl px-4 py-3 text-base text-mist-100 transition-all"
                style={{
                  border: `1px solid ${persona.accent}25`,
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${persona.accent}88`;
                  e.currentTarget.style.background = `${persona.accent}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${persona.accent}25`;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ color: persona.accent }}>◐</span>
                <span className="ml-3">{s}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MicButton({
  accent,
  recording,
  initializing,
  transcribing,
  elapsedMs,
  disabled,
  onClick,
}: {
  accent: string;
  recording: boolean;
  initializing: boolean;
  transcribing: boolean;
  elapsedMs: number;
  disabled: boolean;
  onClick: () => void;
}) {
  const busy = initializing || transcribing;
  const label = recording
    ? `Kayıt — ${formatElapsed(elapsedMs)} · durdur ve gönder`
    : transcribing
    ? "Yazıya dönüyor…"
    : initializing
    ? "Mikrofon hazırlanıyor…"
    : "Sesli sor";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || busy}
      aria-label={label}
      title={label}
      className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
      style={{
        border: `1px solid ${recording ? "#ff4d6d" : accent + "40"}`,
        background: recording
          ? "rgba(255,77,109,0.18)"
          : busy
          ? `${accent}10`
          : "rgba(7,6,15,0.5)",
        boxShadow: recording
          ? "0 0 24px -4px rgba(255,77,109,0.55)"
          : `0 0 0 0 transparent`,
      }}
    >
      {/* Mikrofon ikonu — basit SVG, harici asset gerekmiyor */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke={recording ? "#ff4d6d" : accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="9" y="2" width="6" height="12" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0" />
        <path d="M12 18v3" />
      </svg>
      {recording && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            border: "1px solid #ff4d6d",
            animation: "sanri-pulse-ring 1.4s ease-out infinite",
          }}
        />
      )}
      {busy && !recording && (
        <span
          aria-hidden
          className="absolute -bottom-1 right-0 text-[8px] uppercase tracking-wider px-1 py-0.5 rounded-full"
          style={{
            color: accent,
            background: `${accent}20`,
            border: `1px solid ${accent}50`,
          }}
        >
          •••
        </span>
      )}
    </button>
  );
}

function ListenButton({
  accent,
  loading,
  playing,
  onClick,
}: {
  accent: string;
  loading: boolean;
  playing: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="mt-3 inline-flex items-center gap-2 mono-tag px-3 py-1.5 rounded-full transition-all opacity-60 hover:opacity-100 disabled:opacity-40"
      style={{
        color: accent,
        border: `1px solid ${accent}30`,
        background: playing ? `${accent}15` : "transparent",
      }}
      aria-label={playing ? "Sesli yanıtı durdur" : "Sesli yanıtı oynat"}
      title={playing ? "Durdur" : "Sesli dinle"}
    >
      {loading ? (
        <span aria-hidden>•••</span>
      ) : playing ? (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={accent}
          aria-hidden
        >
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={accent}
          aria-hidden
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
      <span>{loading ? "ses üretiliyor" : playing ? "durdur" : "dinle"}</span>
    </button>
  );
}

function formatElapsed(ms: number): string {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function Thinking({ persona }: { persona: Persona }) {
  return (
    <div className="flex items-center gap-3 mt-2">
      <span aria-hidden className="text-lg" style={{ color: persona.accent }}>
        {persona.symbol}
      </span>
      <span
        className="flex items-end gap-1"
        aria-label={`${persona.name} düşünüyor`}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-1.5 h-1.5 rounded-full"
            style={{
              background: persona.accent,
              animation: `sanri-thinking-dot 1.2s ease-in-out ${i * 0.18}s infinite`,
            }}
          />
        ))}
      </span>
      <span className="mono-tag text-mist-500">{persona.thinkingLabel}</span>
    </div>
  );
}
