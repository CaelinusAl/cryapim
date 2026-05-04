import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/personas/ratelimit";

export const runtime = "nodejs";

const MAX_AUDIO_BYTES = 12 * 1024 * 1024; // 12 MB ≈ 6 dk webm/opus

/**
 * POST /api/voice/stt
 *
 * Multipart form-data:
 *   audio: File  (webm/ogg/mp3/wav/m4a)
 *
 * Yanıt: { transcript: string }
 *
 * Whisper Türkçeyi mükemmel anlıyor — language="tr" hint'iyle daha
 * tutarlı çıktı veriyor. Süre/uzunluk OpenAI tarafında 25 MB ile
 * sınırlı; biz daha agresif (12 MB) keserek istemcide kötü kayıt
 * yüklenmesine engel oluyoruz.
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

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Ses tanıma servisi çevrimdışı." },
      { status: 503 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Geçersiz form verisi." },
      { status: 400 }
    );
  }

  const audio = form.get("audio");
  if (!(audio instanceof File)) {
    return NextResponse.json({ error: "Ses dosyası yok." }, { status: 400 });
  }
  if (audio.size > MAX_AUDIO_BYTES) {
    return NextResponse.json(
      { error: "Ses dosyası çok büyük (12 MB sınır)." },
      { status: 413 }
    );
  }

  try {
    const upstream = new FormData();
    upstream.set("file", audio, audio.name || "voice.webm");
    upstream.set("model", "whisper-1");
    upstream.set("language", "tr");
    upstream.set("response_format", "json");

    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}` },
        body: upstream,
      }
    );

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error("[voice/stt] Whisper hata:", response.status, errText);
      return NextResponse.json(
        { error: "Ses çözümlenemedi." },
        { status: 502 }
      );
    }

    const data = (await response.json()) as { text?: string };
    const transcript = (data.text || "").trim();
    return NextResponse.json({ transcript });
  } catch (err) {
    console.error("[voice/stt] istek hatası:", err);
    return NextResponse.json(
      { error: "Ses tanıma düştü." },
      { status: 500 }
    );
  }
}
