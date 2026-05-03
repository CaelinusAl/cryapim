import type { NextRequest } from "next/server";
import { POST as personaPost } from "../persona/[slug]/route";

export const runtime = "nodejs";

/**
 * /api/sanri — geriye uyumluluk kabuğu.
 *
 * Sanrı'nın ilk sürümünden kalan endpoint. Yeni mimaride bütün
 * persona'lar `/api/persona/[slug]` üzerinden çalışır; bu rota
 * gelen isteği "sanri" slug'ına yönlendirir ki dış bookmark veya
 * eski client'lar kırılmasın.
 */
export function POST(req: NextRequest) {
  return personaPost(req, { params: Promise.resolve({ slug: "sanri" }) });
}
