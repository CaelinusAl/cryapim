import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  message: z.string().min(10),
});

/** Mesajı Supabase'e kaydeder (RLS: anon rolü yalnızca insert yapabilir). */
async function saveToDatabase(data: {
  name: string;
  email: string;
  message: string;
  userAgent: string | null;
}): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn("[contact] SUPABASE_URL / SUPABASE_ANON_KEY not set");
    return false;
  }
  const res = await fetch(`${url}/rest/v1/cryapim_contact_messages`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      message: data.message,
      user_agent: data.userAgent,
    }),
  });
  if (!res.ok) {
    console.error("[contact] supabase insert failed:", res.status);
    return false;
  }
  return true;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "validation_failed" },
      { status: 400 },
    );
  }

  const { name, email, message } = parsed.data;

  const saved = await saveToDatabase({
    name,
    email,
    message,
    userAgent: request.headers.get("user-agent"),
  }).catch((err) => {
    console.error("[contact] supabase error:", err);
    return false;
  });

  let mailed = false;
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: "CR YAPIM <onboarding@resend.dev>",
        to: ["merhaba@cryapim.com"],
        replyTo: email,
        subject: `Yeni iletişim formu mesajı — ${name}`,
        text: `İsim: ${name}\nE-posta: ${email}\n\n${message}`,
      });
      if (error) console.error("[contact] resend error:", error);
      else mailed = true;
    } catch (err) {
      console.error("[contact] send failed:", err);
    }
  }

  // Veritabanı VEYA e-posta başarılıysa mesaj alınmış sayılır.
  if (!saved && !mailed) {
    console.log("[contact] no delivery channel succeeded — message logged:", {
      name,
      email,
    });
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
