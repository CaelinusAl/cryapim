import { NextRequest, NextResponse } from "next/server";
import {
  SANRI_SYSTEM_PROMPT,
  pickFallback,
} from "@/lib/sanri/persona";
import { rateLimit } from "@/lib/sanri/ratelimit";

export const runtime = "nodejs";

const MAX_INPUT_LEN = 500;
const MIN_INPUT_LEN = 2;

type Source = "openai" | "fallback" | "fallback-error" | "fallback-rate";

type SuccessBody = { answer: string; source: Source };
type ErrorBody = { error: string };

export async function POST(req: NextRequest): Promise<NextResponse<SuccessBody | ErrorBody>> {
  // 1) Rate limit (IP başına)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anon";
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Sanrı bir nefes alıyor. Az sonra tekrar dene." },
      { status: 429, headers: { "Retry-After": Math.ceil(limit.resetMs / 1000).toString() } }
    );
  }

  // 2) Girdiyi doğrula
  let body: { question?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }
  const raw = typeof body.question === "string" ? body.question.trim() : "";
  if (raw.length < MIN_INPUT_LEN) {
    return NextResponse.json(
      { error: "Bir şey sor — bir kelime bile yeter." },
      { status: 400 }
    );
  }
  const question = raw.slice(0, MAX_INPUT_LEN);

  // 3) AI çağrısı (OpenAI varsa). Yoksa veya hata olursa fallback.
  if (process.env.OPENAI_API_KEY) {
    try {
      const answer = await callOpenAI(question, process.env.OPENAI_API_KEY);
      if (answer) {
        return NextResponse.json({ answer, source: "openai" });
      }
    } catch (err) {
      console.error("[sanri] OpenAI hatası:", err);
      return NextResponse.json({
        answer: pickFallback(question),
        source: "fallback-error",
      });
    }
  }

  return NextResponse.json({ answer: pickFallback(question), source: "fallback" });
}

async function callOpenAI(question: string, apiKey: string): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.SANRI_MODEL || "gpt-4o-mini",
        temperature: 0.95,
        max_tokens: 180,
        // Frequency / presence cezası tekrarı azaltır, daha taze cevaplar verir
        frequency_penalty: 0.4,
        presence_penalty: 0.3,
        messages: [
          { role: "system", content: SANRI_SYSTEM_PROMPT },
          { role: "user", content: question },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error("[sanri] OpenAI status:", response.status, await response.text());
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
