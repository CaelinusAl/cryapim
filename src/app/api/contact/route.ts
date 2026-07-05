import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  message: z.string().min(10),
});

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
      if (error) {
        console.error("[contact] resend error:", error);
        return Response.json(
          { ok: false, error: "send_failed" },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error("[contact] send failed:", err);
      return Response.json(
        { ok: false, error: "send_failed" },
        { status: 502 },
      );
    }
  } else {
    console.log("[contact] RESEND_API_KEY not set — logging message instead:", {
      name,
      email,
      message,
    });
  }

  return Response.json({ ok: true });
}
