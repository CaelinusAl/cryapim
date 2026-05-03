/**
 * Perde AI yanıt parser'ı.
 *
 * Perde'nin sistem promptu yanıtları sabit bir yapıyla istiyor:
 *
 *   Bu film aslında [öz]'i anlatıyor.
 *
 *   ▣ KONU
 *   ...
 *
 *   ◧ ALTINDAKİ
 *   ...
 *
 *   ◈ SEMBOL
 *   ...
 *
 *   ◇ NİYET / ALGI       (opsiyonel)
 *   ...
 *
 *   → Yeniden izlersen şuna dikkat et: ...
 *   → Benzer 3 film: A · B · C
 *
 * Bu parser yanıtın bu yapıya uyma derecesini kontrol eder. En az KONU + ALTINDAKİ
 * varsa "structured" sayar; yoksa null döner ve render tarafı raw yanıtı gösterir
 * (fallback / "tanımıyorum" cevapları için).
 *
 * Önemli: dijital kalite önceliği — ham AI çıktısını her zaman saklarız;
 * parse başarısızsa görüntü tarafı raw fallback'e düşer.
 */

export type ParsedPerdeAnswer = {
  /** "Bu film aslında ___ anlatıyor." satırı — boş olabilir */
  oz: string | null;
  /** ▣ KONU bloğu */
  konu: string | null;
  /** ◧ ALTINDAKİ bloğu */
  altindaki: string | null;
  /** ◈ SEMBOL — başlık varsa ayrılır, yoksa tüm metin */
  sembol: { baslik: string | null; metin: string } | null;
  /** ◇ NİYET / ALGI bloğu (opsiyonel) */
  niyet: string | null;
  /** → Yeniden izlersen şuna dikkat et */
  izleDikkat: string | null;
  /** → Benzer X film: ... — listeye parse edilmiş */
  benzerFilmler: string[];
  /** Spoiler uyarısı algılandı mı (AI "(Spoiler içerir)" yazdı mı) */
  spoilerWarning: boolean;
};

/**
 * AI yanıtını yapılandırılmış obje haline getir. Yapı yetersizse null.
 *
 * En az KONU + ALTINDAKİ bölümleri tanımlanmışsa structured sayılır.
 */
export function parsePerdeAnswer(text: string): ParsedPerdeAnswer | null {
  if (!text || text.trim().length === 0) return null;

  const cleaned = stripMarkdown(text).trim();

  // "Bu film aslında ___ anlatıyor" — ilk cümle (markdown'dan arınmış)
  const ozMatch = cleaned.match(
    /Bu (?:film|yapım|dizi|kitap)?\s*aslında[\s\S]*?(?:anlatıyor|söylüyor)\s*\.?/i
  );
  const oz = ozMatch ? ozMatch[0].trim() : null;

  const konu = extractBlock(cleaned, "▣", ["◧", "◈", "◇", "→"]);
  const altindaki = extractBlock(cleaned, "◧", ["◈", "◇", "→"]);
  const sembolBlock = extractBlock(cleaned, "◈", ["◇", "→"]);
  const niyet = extractBlock(cleaned, "◇", ["→"]);

  // Sembol içinden "SEMBOL · başlık" ayrılır (varsa)
  let sembol: ParsedPerdeAnswer["sembol"] = null;
  if (sembolBlock) {
    const headerMatch = sembolBlock.match(
      /^\s*SEMBOL[\s·:\-]+(.+?)(?:\n|$)([\s\S]*)/i
    );
    if (headerMatch) {
      sembol = {
        baslik: headerMatch[1].trim(),
        metin: headerMatch[2].trim() || sembolBlock,
      };
    } else {
      sembol = { baslik: null, metin: sembolBlock };
    }
  }

  // → Yeniden izlersen şuna dikkat et: ___
  const izleMatch = cleaned.match(
    /→\s*(?:Yeniden izlersen|Tekrar izlersen)[^:]*[:\.]\s*([^\n→]+)/i
  );
  const izleDikkat = izleMatch ? izleMatch[1].trim() : null;

  // → Benzer X film: A · B · C  (· veya • veya | veya virgül)
  const benzerMatch = cleaned.match(
    /→\s*Benzer[^:]*[:\.]\s*([\s\S]+?)(?:\n→|\n\n|$)/i
  );
  let benzerFilmler: string[] = [];
  if (benzerMatch) {
    benzerFilmler = benzerMatch[1]
      .split(/\s*[·•|,]\s*|\s+ve\s+/i)
      .map((s) => s.trim().replace(/[\(\)]/g, "").trim())
      .filter((s) => s.length > 0 && s.length < 120);
  }

  const spoilerWarning = /\(?\s*spoiler\s*içerir\s*\)?/i.test(text);

  // Asgari yapı kontrolü — KONU + ALTINDAKİ olmalı, yoksa parse başarısız
  if (!konu || !altindaki) {
    return null;
  }

  return {
    oz,
    konu,
    altindaki,
    sembol,
    niyet,
    izleDikkat,
    benzerFilmler,
    spoilerWarning,
  };
}

/**
 * Bir blok başlık sembolünden başlayıp bir sonraki sembol/işarete kadar
 * olan içeriği çıkar. Başlık satırı (örn. "▣ KONU") atılır, sadece body
 * döner.
 */
function extractBlock(
  text: string,
  startSymbol: string,
  endSymbols: string[]
): string | null {
  const startIdx = text.indexOf(startSymbol);
  if (startIdx === -1) return null;

  // Body başlangıcı: başlık satırını atla (\n'den sonra)
  const afterSymbol = text.slice(startIdx);
  const newlineIdx = afterSymbol.indexOf("\n");
  if (newlineIdx === -1) return null;
  const body = afterSymbol.slice(newlineIdx + 1);

  // En yakın bitiş sembolünü bul
  let endIdx = body.length;
  for (const sym of endSymbols) {
    const i = body.indexOf(sym);
    if (i !== -1 && i < endIdx) endIdx = i;
  }

  const block = body.slice(0, endIdx).trim();
  return block.length > 0 ? block : null;
}

/**
 * Hafif markdown temizliği — **kalın**, *italik*, `kod` işaretlerini
 * görüntü için ayır. Render tarafı zaten plain text gösteriyor.
 */
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1");
}

/**
 * Cache slug üretimi — Türkçe karakterleri normalize eder, lowercase,
 * dash. data/perde-archive.ts'deki slugifyTr ile uyumludur ama burada
 * tekrar tanımlanmıştır (cache modülü archive'a bağımlı olmasın diye).
 */
export function slugifyForCache(input: string): string {
  const map: Record<string, string> = {
    ç: "c",
    Ç: "c",
    ğ: "g",
    Ğ: "g",
    ı: "i",
    İ: "i",
    ö: "o",
    Ö: "o",
    ş: "s",
    Ş: "s",
    ü: "u",
    Ü: "u",
  };
  return input
    .toLowerCase()
    .split("")
    .map((c) => map[c] ?? c)
    .join("")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}
