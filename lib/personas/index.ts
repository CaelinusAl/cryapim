/**
 * Persona registry — CAELİNUS AI'ın tek motor / çok yüz çekirdeği.
 *
 * Yeni bir persona eklemek için:
 *   1) Bu klasörde yeni bir dosya aç (örn: `koc.ts`).
 *   2) `Persona` tipinde bir kayıt export et.
 *   3) Bu dosyaya import edip `PERSONAS` map'ine ekle.
 *   4) `PersonaId` tipine yeni id'yi ekle (`./types.ts`).
 *
 * Bütün UI ve API katmanı bu registry'den okur. Kişiyi değiştirmek
 * için kod değil, sadece içerik dosyası dokunulur.
 */

import type { Persona, PersonaId } from "./types";
import { sanri } from "./sanri";
import { caelinus } from "./caelinus";
import { rivayet } from "./rivayet";
import { supheci } from "./supheci";
import { selbi } from "./selbi";
import { perde } from "./perde";

const RECORDS = {
  sanri,
  caelinus,
  rivayet,
  supheci,
  selbi,
  perde,
} as const satisfies Record<PersonaId, Persona>;

/** Kanonik sıra — UI'da bubble menüsü ve grid'ler bu sırayı takip eder. */
export const PERSONA_ORDER: readonly PersonaId[] = [
  "sanri",
  "caelinus",
  "perde",
  "rivayet",
  "supheci",
  "selbi",
];

export const ALL_PERSONAS: readonly Persona[] = PERSONA_ORDER.map(
  (id) => RECORDS[id]
);

export function getPersona(id: PersonaId): Persona {
  return RECORDS[id];
}

/**
 * Slug'tan güvenli persona çekme — bilinmeyen id geldiğinde
 * `null` döner ki çağıranlar 404 atabilsin.
 */
export function tryPersona(id: string): Persona | null {
  return id in RECORDS ? RECORDS[id as PersonaId] : null;
}

/**
 * Bir program slug'ına bağlı persona varsa onu getirir.
 * Yapımlar sayfasında inline AI demo'sunu yerleştirmek için kullanılır.
 */
export function personaForProgram(programSlug: string): Persona | null {
  return ALL_PERSONAS.find((p) => p.relatedProgramSlug === programSlug) ?? null;
}

/**
 * Soruya deterministik fallback seçer (FNV-1a hash). Aynı soru her
 * zaman aynı yanıtı alır — bu personalara "hatırlamış gibi konuşma"
 * hissi verir (rastgele değil, niyetli).
 */
export function pickFallback(persona: Persona, question: string): string {
  const seed = hashString(`${persona.id}:${question.toLowerCase().trim()}`);
  return persona.fallbacks[seed % persona.fallbacks.length];
}

function hashString(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  return h;
}

export type { Persona, PersonaId } from "./types";
