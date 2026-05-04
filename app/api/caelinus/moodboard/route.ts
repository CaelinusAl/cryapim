import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/personas/ratelimit";
import { getPersona, pickFallback } from "@/lib/personas";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_PROMPT_LEN = 200;
const MIN_PROMPT_LEN = 3;

/**
 * Caelinus Moodboard — 4 anlatım katmanı.
 *
 * Caelinus AI'yı diğer AI moodboard'larından ayıran şey: jenerik
 * "kahve ceketli kadın" portreleri yerine her görselin farklı bir
 * ANLATIM TÜRÜ olması. Bir vibe → 4 katmanlı bir editöryel sayfa.
 *
 *   1) ATMOSFER → mekan / sahne (figürsüz veya silüet) — hikaye geniş açı
 *   2) DOKU     → makro doku (kumaş, kâğıt, ışık, malzeme yakını)
 *   3) FİGÜR    → editöryel portre (modern İstanbul kadını, Vogue Türkiye)
 *   4) NESNE    → curated still life / flat-lay (hat, çini, kandil, kitap)
 *
 * Her katmanın kendi DALL·E 3 prompt template'i var; vibe içeri
 * harmanlanır, sonuç editöryel İstanbul-imzalı bir moodboard.
 */
type NarrativeId = "atmosphere" | "texture" | "figure" | "object";

type Narrative = {
  id: NarrativeId;
  /** UI etiketi (Türkçe) */
  label: string;
  /** alt text için kısa Türkçe sıfat */
  altLabel: string;
  /** DALL·E 3'e gönderilecek prompt template — `{vibe}` placeholder'ı doldurulur */
  promptTemplate: (vibe: string) => string;
};

/* ---------- Caelinus imza tarifi (her promptun temelinde) ---------- */
/**
 * DALL·E 3 referansları. Bu cümleler hem stilistik düzey
 * hem de Caelinus AI'nın markasını öğretiyor — sıradan AI
 * çıktısından net bir kopuş.
 */
const CAELINUS_SIGNATURE = [
  "Editorial fashion photography in the style of Caelinus AI — Istanbul Bosphorus aesthetic.",
  "References: Vogue Türkiye spread, Cereal magazine still life, Tim Walker dreamy framing,",
  "Phantom Thread atelier moodiness, Wes Anderson controlled symmetry,",
  "shot on medium-format film, soft natural grain, painterly chiaroscuro,",
  "color signature: tower-gold #d4b26a, dusk magenta #c247c0, Bosphorus navy #122550, mist cream #f0e8d0.",
].join(" ");

const NEGATIVE_HINTS = [
  "AVOID: stock photography, AI-looking plastic skin, generic 'woman holding coffee in beige blazer',",
  "no Western suburban kitchens, no influencer poses, no watermarks, no text or logos,",
  "no oversaturated colors, no posed cliché smiles.",
].join(" ");

/* ---------- 4 Narrative ---------- */
const NARRATIVES: ReadonlyArray<Narrative> = [
  {
    id: "atmosphere",
    label: "Atmosfer",
    altLabel: "atmosfer · mekan",
    promptTemplate: (vibe) =>
      [
        CAELINUS_SIGNATURE,
        "FRAME 1 — ATMOSPHERE / SCENE.",
        `Vibe: ${vibe}.`,
        "Wide cinematic establishing shot of an Istanbul interior or Bosphorus terrace.",
        "Architectural elements: aged marble, brass detail, sheer linen curtain catching wind,",
        "an old İznik tile fragment on a wall, narrow Galata window with diffused light,",
        "or a side-view of the Bosphorus through a frame.",
        "Either no human, or a single small silhouette in deep background — atmosphere is the protagonist.",
        "Light is the soul: golden hour Bosphorus light, or magenta-blue dusk, or candlelit interior.",
        "Painterly, breathing, anti-stock. The viewer should feel like they walked into a poem.",
        NEGATIVE_HINTS,
      ].join(" "),
  },
  {
    id: "texture",
    label: "Doku",
    altLabel: "doku · makro",
    promptTemplate: (vibe) =>
      [
        CAELINUS_SIGNATURE,
        "FRAME 2 — TEXTURE / MACRO.",
        `Vibe: ${vibe}.`,
        "Extreme macro close-up — pure texture composition, no human face.",
        "Layered materials in conversation: raw silk, washed linen, hand-woven wool,",
        "aged velvet, parchment paper, brass with patina, hand-blown Beykoz glass,",
        "a single drop of water, dried rose petal, calligraphy ink on cream paper.",
        "Soft directional sidelight reveals fiber and grain. Painterly shadow falloff.",
        "Reference: Cereal magazine × Phaidon textile book × old Ottoman atlas.",
        "The image should make a stylist whisper. No portrait, no full body, only matter.",
        NEGATIVE_HINTS,
      ].join(" "),
  },
  {
    id: "figure",
    label: "Figür",
    altLabel: "figür · editöryel",
    promptTemplate: (vibe) =>
      [
        CAELINUS_SIGNATURE,
        "FRAME 3 — FIGURE / EDITORIAL PORTRAIT.",
        `Vibe: ${vibe}.`,
        "A single contemporary Turkish/Mediterranean woman, age 28-38, natural minimal makeup,",
        "real human skin texture (pores, soft imperfections), thoughtful not smiling,",
        "half-face or 3/4 profile, often partially obscured by curtain, hair, or shadow.",
        "Posture is contemplative — a held breath, not a pose. Wardrobe is editorial:",
        "cashmere, raw silk, structured wool, vintage gold jewelry, no logos.",
        "Soft natural sidelight from a window, painterly grain, deep shadow side.",
        "Reference: Steven Meisel × Tim Walker × Annie Leibovitz × Vogue Türkiye cover.",
        "She should look like she lives in this palette, not models for it.",
        NEGATIVE_HINTS,
      ].join(" "),
  },
  {
    id: "object",
    label: "Nesne",
    altLabel: "nesne · still life",
    promptTemplate: (vibe) =>
      [
        CAELINUS_SIGNATURE,
        "FRAME 4 — STILL LIFE / FLAT LAY.",
        `Vibe: ${vibe}.`,
        "Curated still life or arranged tabletop — objects telling a story, no human.",
        "Possible objects (3 to 6, restrained): handwritten letter on cream paper,",
        "brass Turkish coffee cup, silk ribbon, dried rose or lavender,",
        "antique leather-bound book, İznik ceramic shard, a single fountain pen,",
        "Beykoz glass perfume bottle, calligraphy plate (hat), aged map fragment.",
        "Soft overhead or 45° natural light. Painterly composition with negative space.",
        "Reference: Vogue editorial flat lay × Wallpaper magazine × old apothecary catalog.",
        "Each object earns its place — anti-cluttered, museum-quiet.",
        NEGATIVE_HINTS,
      ].join(" "),
  },
];

const IMAGE_COUNT = NARRATIVES.length;

type MoodboardImage = {
  url: string;
  alt: string;
  /** UI tarafında etiketlemek için: "Atmosfer", "Doku" vb. */
  label: string;
  narrativeId: NarrativeId;
  revisedPrompt?: string;
};

type SuccessBody = {
  images: MoodboardImage[];
  commentary: string;
  commentarySource: "openai" | "fallback";
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
 *   2) 4 paralel DALL·E 3 çağrısı (n=1, dört farklı NARRATIVE)
 *   3) Aynı zamanda Caelinus persona'sıyla yorum üret (paralel)
 *   4) Görseller veya yorum patlasa bile graceful: yorum yoksa fallback
 *
 * Maliyet:
 *   ~ $0.08 × 4 = $0.32 / istek (DALL·E 3 HD 1024x1024) — kalite artıyor
 *   + ~$0.001 yorum (gpt-4o-mini)
 *
 * Bu yüzden rate-limit sıkı kalmaya devam eder.
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
 * 4 paralel DALL·E 3 çağrısı — her biri farklı NARRATIVE.
 * Birinin patlaması diğerlerini bozmaz (Promise.allSettled).
 */
async function generateMoodboardImages(
  vibe: string,
  apiKey: string
): Promise<(MoodboardImage | null)[]> {
  const results = await Promise.allSettled(
    NARRATIVES.map((n) => generateOneImage(vibe, n, apiKey))
  );
  return results.map((r) => (r.status === "fulfilled" ? r.value : null));
}

async function generateOneImage(
  vibe: string,
  narrative: Narrative,
  apiKey: string
): Promise<MoodboardImage | null> {
  const prompt = narrative.promptTemplate(vibe);

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
        // HD modu — Caelinus için kalite > maliyet
        quality: "hd",
        // "natural" stili: anti-stock, painterly, sinematik
        style: "natural",
        response_format: "url",
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(
        "[caelinus/dalle] hata:",
        res.status,
        narrative.id,
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
      alt: `Caelinus moodboard — ${vibe} (${narrative.altLabel})`,
      label: narrative.label,
      narrativeId: narrative.id,
      revisedPrompt: item.revised_prompt,
    };
  } catch (err) {
    console.error("[caelinus/dalle] çağrı hata:", narrative.id, err);
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

export { IMAGE_COUNT };
