"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useVoiceRecorder — tarayıcı mikrofonundan webm/opus kaydı.
 *
 * Akış:
 *   1) start() → izin iste, MediaRecorder başlat
 *   2) stop()  → kaydı durdur, blob döndür (transkripsiyon için)
 *
 * Tarayıcı uyumluluğu:
 *   - getUserMedia + MediaRecorder modern tüm tarayıcılarda var
 *   - audio/webm öncelik, yoksa audio/mp4 (Safari) fallback
 *
 * Hata durumları (state.error):
 *   - "permission_denied" — kullanıcı izin vermedi
 *   - "unsupported"       — tarayıcı MediaRecorder desteklemiyor
 *   - "generic"           — başka bir hata (mikrofon yok vs.)
 */

export type RecorderState = {
  /** Şu an kayıt yapılıyor mu */
  recording: boolean;
  /** Kullanıcı henüz mikrofon iznini test etmedi */
  initializing: boolean;
  /** Kayıt süresi (saniye) — UI sayaç için */
  elapsedMs: number;
  /** Hata kodu — null ise sorun yok */
  error: "permission_denied" | "unsupported" | "generic" | null;
};

export type RecorderHandle = {
  state: RecorderState;
  /** Kaydı başlat — izin akışı dahil */
  start: () => Promise<void>;
  /** Kaydı durdur ve blob döndür. recording=false ise null döner. */
  stop: () => Promise<Blob | null>;
  /** Kaydı sessizce iptal et (blob üretmez) */
  cancel: () => void;
};

export function useVoiceRecorder(): RecorderHandle {
  const [state, setState] = useState<RecorderState>({
    recording: false,
    initializing: false,
    elapsedMs: 0,
    error: null,
  });

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const startedAtRef = useRef<number>(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stopResolveRef = useRef<((blob: Blob | null) => void) | null>(null);

  const cleanup = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    recorderRef.current = null;
    chunksRef.current = [];
    stopResolveRef.current = null;
  }, []);

  useEffect(() => () => cleanup(), [cleanup]);

  const start = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices ||
      typeof window.MediaRecorder === "undefined"
    ) {
      setState((s) => ({ ...s, error: "unsupported" }));
      return;
    }

    setState((s) => ({ ...s, initializing: true, error: null, elapsedMs: 0 }));

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;

      const mime = pickSupportedMime();
      const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : {});
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const type = recorder.mimeType || mime || "audio/webm";
        const blob = new Blob(chunksRef.current, { type });
        const resolve = stopResolveRef.current;
        cleanup();
        setState({
          recording: false,
          initializing: false,
          elapsedMs: 0,
          error: null,
        });
        resolve?.(blob.size > 0 ? blob : null);
      };

      recorder.start(250);
      recorderRef.current = recorder;
      startedAtRef.current = Date.now();

      tickRef.current = setInterval(() => {
        setState((s) => ({
          ...s,
          elapsedMs: Date.now() - startedAtRef.current,
        }));
      }, 200);

      setState({
        recording: true,
        initializing: false,
        elapsedMs: 0,
        error: null,
      });
    } catch (err) {
      console.error("[recorder] start hata:", err);
      const code: RecorderState["error"] =
        err instanceof DOMException && err.name === "NotAllowedError"
          ? "permission_denied"
          : "generic";
      cleanup();
      setState({
        recording: false,
        initializing: false,
        elapsedMs: 0,
        error: code,
      });
    }
  }, [cleanup]);

  const stop = useCallback(async (): Promise<Blob | null> => {
    const rec = recorderRef.current;
    if (!rec || rec.state === "inactive") return null;
    return new Promise<Blob | null>((resolve) => {
      stopResolveRef.current = resolve;
      try {
        rec.stop();
      } catch (err) {
        console.error("[recorder] stop hata:", err);
        cleanup();
        resolve(null);
      }
    });
  }, [cleanup]);

  const cancel = useCallback(() => {
    const rec = recorderRef.current;
    if (rec && rec.state !== "inactive") {
      try {
        rec.stop();
      } catch {
        // yoksay
      }
    }
    cleanup();
    setState({
      recording: false,
      initializing: false,
      elapsedMs: 0,
      error: null,
    });
  }, [cleanup]);

  return { state, start, stop, cancel };
}

function pickSupportedMime(): string | null {
  if (typeof window === "undefined" || !window.MediaRecorder) return null;
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
  ];
  for (const m of candidates) {
    if (MediaRecorder.isTypeSupported(m)) return m;
  }
  return null;
}
