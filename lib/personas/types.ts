/**
 * Persona tipi — CAELİNUS AI'ın tek motor / çok yüz mimarisi.
 *
 * Her persona aynı API'yi paylaşır ama kendi sistem promptu, fallback
 * yanıtları, UI rengi, bubble etiketi ve karşılama tonu vardır. Yeni
 * bir persona eklemek demek sadece bir dosya açmak demektir.
 */

export type PersonaId =
  | "sanri"
  | "rivayet"
  | "supheci"
  | "selbi"
  | "perde";

/**
 * OpenAI TTS ses kimlikleri — her persona kendi sesini taşır.
 *   alloy   → nötr, kararlı (varsayılan)
 *   echo    → soğukkanlı, mesafeli (Şüpheci için)
 *   fable   → büyülü, hikayeci (Sanrı için)
 *   onyx    → derin, ağırbaşlı erkek (Rivayet için)
 *   nova    → sıcak, kadınsı, samimi (Selbi için)
 *   shimmer → yumuşak, narin (Perde için)
 *
 * @see https://platform.openai.com/docs/guides/text-to-speech
 */
export type PersonaVoice =
  | "alloy"
  | "echo"
  | "fable"
  | "onyx"
  | "nova"
  | "shimmer";

export type Persona = {
  /** URL ve API yollarında kullanılan tek kelimelik kimlik */
  id: PersonaId;
  /** Görünen isim — büyük başlık */
  name: string;
  /** Üst bantta ismin altındaki tek satır etiket */
  tone: string;
  /** Bir cümlede karakter — meta description'da da kullanılır */
  tagline: string;
  /** Welcome ekranındaki hero alıntı (italik, büyük) */
  welcomeQuote: string;
  /** Persona ikonu — tek glyph (◉ ◯ ✦ ❀ vb.) */
  symbol: string;
  /** Hex accent rengi — buton, ışıma, ikon halesi */
  accent: string;
  /** OpenAI'ye gönderilecek sistem promptu (Türkçe, sıkı kurallar) */
  systemPrompt: string;
  /**
   * AI key yoksa veya hata olursa kullanılan elle yazılmış yanıtlar.
   * Soru hash'i ile deterministik seçilir; aynı soru → aynı cevap.
   */
  fallbacks: readonly string[];
  /** Welcome ekranında öneri olarak gösterilen tohum sorular */
  welcomeSeeds: readonly string[];
  /** Input alanının placeholder metni */
  inputPlaceholder: string;
  /** Sağ alttaki kalıcı bubble etiketi */
  bubbleLabel: string;
  /** Form submit butonunun metni (genelde "sor", Selbi için "pişir" vb.) */
  ctaLabel: string;
  /** "Düşünüyor" göstergesindeki etiket — persona'ya özel */
  thinkingLabel: string;
  /** Inline kart üst etiketi (kapı önü davet) */
  inlineHeadline: string;
  /** Inline kart italik alt yazısı */
  inlineSubline: string;
  /** Panel altındaki nazik hatırlatma metni */
  hintFooter: string;
  /** Hangi programa demir atıyor (programs.ts slug'ı) */
  relatedProgramSlug?: string;
  /**
   * Persona'nın sesi (OpenAI TTS). Tanımlı değilse "alloy" varsayılır.
   * "Dinle" butonuna basıldığında bu ses ile mp3 üretilir.
   */
  voice?: PersonaVoice;
};

/** OpenAI'ye giden mesajların standart şekli */
export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

/** API'nin döndürdüğü yanıt kaynak etiketi */
export type AnswerSource =
  | "openai"
  | "fallback"
  | "fallback-error"
  | "fallback-rate";
