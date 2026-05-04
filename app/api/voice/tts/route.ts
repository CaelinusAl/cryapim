import { NextRequest, NextResponse } from "next/server";
import { tryPersona } from "@/lib/personas";
import type { PersonaVoice } from "@/lib/personas/types";
import { rateLimit } from "@/lib/personas/ratelimit";

export const runtime = "nodejs";

const MAX_TTS_LEN = 1500; // ~1500 karakter ≈ 90sn ses, $0.022 / istek
const DEFAULT_VOICE: PersonaVoice = "alloy";

/**
 * POST /api/voice/tts
 *
 * Body:
 *   { text: string, persona?: PersonaId, voice?: PersonaVoice }
 *
 * Persona slug verilirse o personanın sesi kullanılır; voice doğrudan
 * verilirse onu kullanır; ikisi de yoksa "alloy".
 *
 * Yanıt: audio/mpeg (mp3) stream — <audio src="..."> direkt çalar.
 *
 * Sınırlar:
 *   - Metin 1500 karaktere kırpılır (yaklaşık 90sn ses, ~$0.022)
 *   - IP rate-limit aynı persona engine ile paylaşılır
 *   - OPENAI_API_KEY yoksa 503 — sessiz başarısızlık değil, panel
 *     "ses geçici olarak yok" diyebilsin diye
 */
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anon";
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Çok hızlı. Az sonra tekrar dene." },
      {
        status: 429,
        headers: { "Retry-After": Math.ceil(limit.resetMs / 1000).toString() },
      }
    );
  }

  let body: { text?: unknown; persona?: unknown; voice?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (text.length < 1) {
    return NextResponse.json(
      { error: "Seslendirilecek metin boş." },
      { status: 400 }
    );
  }

  const voice = resolveVoice(body);
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Ses servisi şu an çevrimdışı." },
      { status: 503 }
    );
  }

  try {
    const upstream = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_TTS_MODEL || "tts-1",
        voice,
        input: text.slice(0, MAX_TTS_LEN),
        response_format: "mp3",
        speed: 1.0,
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const errText = await upstream.text().catch(() => "");
      console.error("[voice/tts] OpenAI hata:", upstream.status, errText);
      return NextResponse.json(
        { error: "Ses üretilemedi." },
        { status: 502 }
      );
    }

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400, immutable",
        "X-Voice": voice,
      },
    });
  } catch (err) {
    console.error("[voice/tts] istek hatası:", err);
    return NextResponse.json({ error: "Ses servisi düştü." }, { status: 500 });
  }
}

function resolveVoice(body: {
  persona?: unknown;
  voice?: unknown;
}): PersonaVoice {
  if (typeof body.voice === "string" && isVoice(body.voice)) {
    return body.voice;
  }
  if (typeof body.persona === "string") {
    const p = tryPersona(body.persona);
    if (p?.voice) return p.voice;
  }
  return DEFAULT_VOICE;
}

const VOICE_SET = new Set<PersonaVoice>([
  "alloy",
  "echo",
  "fable",
  "onyx",
  "nova",
  "shimmer",
]);

function isVoice(v: string): v is PersonaVoice {
  return (VOICE_SET as Set<string>).has(v);
}
