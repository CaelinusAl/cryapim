import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/personas/ratelimit";
import { getPersona, pickFallback } from "@/lib/personas";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_PROMPT_LEN = 200;
const MIN_PROMPT_LEN = 3;
const IMAGE_COUNT = 4;

/**
 * 4 alt-açı: aynı vibe'ı dört farklı bakışla rendere
 * çeviriyoruz, böylece tek prompttan moodboard çıkar.
 */
const ANGLES = [
  "wide editorial composition, atmospheric establishing shot",
  "close-up texture detail, fabric and material focus",
  "single subject portrait, fashion editorial framing",
  "still life arrangement, mood objects and palette",
] as const;

type MoodboardImage = {
  url: string;
  alt: string;
  angle: (typeof ANGLES)[number];
  revisedPrompt?: string;
};

type SuccessBody = {
  images: MoodboardImage[];
  /** Caelinus'un 5-başlıklı okuması */
  commentary: string;
  /** Yorum kaynağı: openai veya fallback */
  commentarySource: "openai" | "fallback";
  /** Üretim süresi (ms) — UI debug */
  durationMs: number;
};
type ErrorBody = { error: string };

/**
 * POST /api/caelinus/moodboard
 *
 * Body: { vibe: string }
 *
 * Akış:
 *   1) Rate-limit + giriş doğrulama
 *   2) 4 paralel DALL·E 3 çağrısı (n=1, dört farklı açı)
 *   3) Aynı zamanda Caelinus persona'sıyla yorum üret (paralel)
 *   4) Görseller veya yorum patlasa bile graceful: yorum yoksa fallback
 *
 * Maliyet:
 *   ~ $0.04 × 4 = $0.16 / istek (DALL·E 3 standard 1024x1024)
 *   + ~$0.001 yorum (gpt-4o-mini, ~250 token)
 *
 * Bu yüzden rate-limit sıkı. KV cache eklenmedi çünkü DALL·E URL'leri
 * 1 saatlik geçerli — kalıcılaştırmak için Vercel Blob lazım (sonraki adım).
 */
export async function POST(
  req: NextRequest
): Promise<NextResponse<SuccessBody | ErrorBody>> {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anon";
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Caelinus bir nefes alıyor. Az sonra tekrar dene." },
      {
        status: 429,
        headers: { "Retry-After": Math.ceil(limit.resetMs / 1000).toString() },
      }
    );
  }

  let body: { vibe?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const raw = typeof body.vibe === "string" ? body.vibe.trim() : "";
  if (raw.length < MIN_PROMPT_LEN) {
    return NextResponse.json(
      { error: "Bir vibe yaz — bir mevsim, bir renk yeter." },
      { status: 400 }
    );
  }
  const vibe = raw.slice(0, MAX_PROMPT_LEN);

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Caelinus servisi şu an çevrimdışı." },
      { status: 503 }
    );
  }

  const startedAt = Date.now();

  try {
    // 4 görsel + yorum paralel — yorum görselleri beklemiyor
    const [imageResults, commentary] = await Promise.all([
      generateMoodboardImages(vibe, apiKey),
      generateCommentary(vibe, apiKey),
    ]);

    const images = imageResults.filter((i): i is MoodboardImage => !!i);
    if (images.length === 0) {
      return NextResponse.json(
        { error: "Görseller üretilemedi. Daha sade bir vibe dene." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      images,
      commentary: commentary.text,
      commentarySource: commentary.source,
      durationMs: Date.now() - startedAt,
    });
  } catch (err) {
    console.error("[caelinus/moodboard] hata:", err);
    return NextResponse.json(
      { error: "Caelinus düştü. Birkaç saniye sonra tekrar dene." },
      { status: 500 }
    );
  }
}

/**
 * 4 paralel DALL·E 3 çağrısı. Her biri kendi açısı için çağrılır;
 * birinin patlaması diğerlerini bozmaz (Promise.allSettled).
 */
async function generateMoodboardImages(
  vibe: string,
  apiKey: string
): Promise<(MoodboardImage | null)[]> {
  const results = await Promise.allSettled(
    ANGLES.map((angle) => generateOneImage(vibe, angle, apiKey))
  );
  return results.map((r) => (r.status === "fulfilled" ? r.value : null));
}

async function generateOneImage(
  vibe: string,
  angle: (typeof ANGLES)[number],
  apiKey: string
): Promise<MoodboardImage | null> {
  // CR Yapım editorial signature — DALL·E'ye Caelinus aesthetic'i öğretir
  const prompt = [
    "Editorial fashion moodboard photograph in Caelinus aesthetic.",
    "Cinematic depth, soft natural lighting, muted refined palette,",
    "subtle film grain texture, high-end magazine quality, no text.",
    `Composition: ${angle}.`,
    `Subject mood: ${vibe}.`,
  ].join(" ");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 50_000);

  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "url",
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(
        "[caelinus/dalle] hata:",
        res.status,
        text.slice(0, 200)
      );
      return null;
    }

    const data = (await res.json()) as {
      data?: Array<{ url?: string; revised_prompt?: string }>;
    };
    const item = data.data?.[0];
    if (!item?.url) return null;

    return {
      url: item.url,
      alt: `Caelinus moodboard — ${vibe} (${angle.split(",")[0]})`,
      angle,
      revisedPrompt: item.revised_prompt,
    };
  } catch (err) {
    console.error("[caelinus/dalle] çağrı hata:", err);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Caelinus persona'sıyla 5-başlıklı yorum üret. Hata olursa
 * persona fallback'lerinden birine düşer (deterministik).
 */
async function generateCommentary(
  vibe: string,
  apiKey: string
): Promise<{ text: string; source: "openai" | "fallback" }> {
  const persona = getPersona("caelinus");

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: process.env.SANRI_MODEL || "gpt-4o-mini",
        temperature: 0.65,
        max_tokens: 260,
        frequency_penalty: 0.3,
        presence_penalty: 0.15,
        messages: [
          { role: "system", content: persona.systemPrompt },
          { role: "user", content: `Vibe: ${vibe}` },
        ],
      }),
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.error("[caelinus/commentary] hata:", res.status);
      return { text: pickFallback(persona, vibe), source: "fallback" };
    }
    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) return { text: pickFallback(persona, vibe), source: "fallback" };
    return { text, source: "openai" };
  } catch (err) {
    console.error("[caelinus/commentary] çağrı hata:", err);
    return { text: pickFallback(persona, vibe), source: "fallback" };
  }
}
