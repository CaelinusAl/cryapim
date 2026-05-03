import { NextRequest, NextResponse } from "next/server";
import { tryPersona, pickFallback } from "@/lib/personas";
import type { AnswerSource, Persona } from "@/lib/personas/types";
import { rateLimit } from "@/lib/personas/ratelimit";

export const runtime = "nodejs";

const MAX_INPUT_LEN = 800;
const MIN_INPUT_LEN = 2;

type SuccessBody = { answer: string; source: AnswerSource };
type ErrorBody = { error: string };

/**
 * Generic persona endpoint — POST /api/persona/{slug}
 *
 * Body: { question: string }
 * Slug: sanri | rivayet | supheci | selbi
 *
 * Bilinmeyen slug → 404. Boş soru → 400. IP rate-limit aşılırsa → 429.
 * OPENAI_API_KEY varsa OpenAI; yoksa veya hata olursa elle yazılmış
 * fallback yanıt döner. Her durumda persona karakterinden çıkmaz.
 */
export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string }> }
): Promise<NextResponse<SuccessBody | ErrorBody>> {
  const { slug } = await ctx.params;
  const persona = tryPersona(slug);
  if (!persona) {
    return NextResponse.json({ error: "Persona bulunamadı." }, { status: 404 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anon";
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: `${persona.name} bir nefes alıyor. Az sonra tekrar dene.` },
      {
        status: 429,
        headers: { "Retry-After": Math.ceil(limit.resetMs / 1000).toString() },
      }
    );
  }

  let body: { question?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }
  const raw = typeof body.question === "string" ? body.question.trim() : "";
  if (raw.length < MIN_INPUT_LEN) {
    return NextResponse.json(
      { error: "Bir şey yaz — bir kelime bile yeter." },
      { status: 400 }
    );
  }
  const question = raw.slice(0, MAX_INPUT_LEN);

  if (process.env.OPENAI_API_KEY) {
    try {
      const answer = await callOpenAI(
        persona,
        question,
        process.env.OPENAI_API_KEY
      );
      if (answer) {
        return NextResponse.json({ answer, source: "openai" });
      }
    } catch (err) {
      console.error(`[persona:${persona.id}] OpenAI hatası:`, err);
      return NextResponse.json({
        answer: pickFallback(persona, question),
        source: "fallback-error",
      });
    }
  }

  return NextResponse.json({
    answer: pickFallback(persona, question),
    source: "fallback",
  });
}

async function callOpenAI(
  persona: Persona,
  question: string,
  apiKey: string
): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  // Selbi gibi liste/format üreten persona'lar daha geniş cevap yazar;
  // Sanrı gibi şiirsel persona'lar dar tutulur. Persona başına tune.
  // Bilinmeyen persona için güvenli varsayılana düş (ileride yeni
  // bir persona TUNES'a eklenmemiş olursa endpoint çökmesin).
  const tune = TUNES[persona.id] ?? DEFAULT_TUNE;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.SANRI_MODEL || "gpt-4o-mini",
        temperature: tune.temperature,
        max_tokens: tune.maxTokens,
        frequency_penalty: tune.frequencyPenalty,
        presence_penalty: tune.presencePenalty,
        messages: [
          { role: "system", content: persona.systemPrompt },
          { role: "user", content: question },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error(
        `[persona:${persona.id}] OpenAI status:`,
        response.status,
        await response.text()
      );
      return null;
    }
    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = data.choices?.[0]?.message?.content?.trim();
    return text || null;
  } finally {
    clearTimeout(timeout);
  }
}

type TuneParams = {
  temperature: number;
  maxTokens: number;
  frequencyPenalty: number;
  presencePenalty: number;
};

/** Persona başına model parametreleri — karakter "ses tonunu" sıkar/açar */
const TUNES: Record<string, TuneParams> = {
  sanri: {
    temperature: 0.95,
    maxTokens: 180,
    frequencyPenalty: 0.4,
    presencePenalty: 0.3,
  },
  rivayet: {
    temperature: 0.7,
    maxTokens: 240,
    frequencyPenalty: 0.3,
    presencePenalty: 0.2,
  },
  supheci: {
    temperature: 0.55,
    maxTokens: 320,
    frequencyPenalty: 0.2,
    presencePenalty: 0.1,
  },
  selbi: {
    temperature: 0.75,
    maxTokens: 380,
    frequencyPenalty: 0.3,
    presencePenalty: 0.2,
  },
  perde: {
    // Bilinçli izleyici — yapı titiz, halüsinasyon riski yüksek.
    // Düşük sıcaklık + geniş bütçe (8-12 cümlelik yapılandırılmış cevap)
    temperature: 0.5,
    maxTokens: 520,
    frequencyPenalty: 0.25,
    presencePenalty: 0.15,
  },
};

/** Bilinmeyen persona için güvenli varsayılan — orta yol */
const DEFAULT_TUNE: TuneParams = {
  temperature: 0.7,
  maxTokens: 300,
  frequencyPenalty: 0.3,
  presencePenalty: 0.2,
};
