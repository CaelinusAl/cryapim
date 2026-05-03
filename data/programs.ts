/**
 * CR YAPIM — Program kataloğu
 *
 * Her program tek bir frekansa, tek bir renge, tek bir sembole demir
 * atar. Site genelindeki grid, detay sayfası, OG image ve plato'daki
 * 3D kamera etiketi hep buradan beslenir.
 *
 * Renk paleti, ana globals.css'teki token sözlüğü ile uyumludur ama
 * her program kendi vurgusunu inline olarak getirir; böylece grid'de
 * her hücre ayrı bir frekansta titrer.
 */

export type Program = {
  slug: string;
  title: string;
  tagline: string;
  intent: string;
  symbol: string;
  accent: string;
  surface: string;
  hero: string;
  description: string;
  signature: string;
  episodes: number;
  cadence: string;
  channel: "youtube" | "instagram" | "podcast" | "ai-yapimi";
  /** Plato'da bu programın çekildiği sahne köşesi (camera target). */
  platoSeat: { x: number; y: number; z: number; label: string };
  /** Programın platodaki gerçek set fotoğrafı (opsiyonel; varsa
   *  detay sayfasının hero'su olarak kullanılır). */
  realPhoto?: string;
};

export const programs: Program[] = [
  {
    slug: "ruhsal-yatirim",
    title: "Ruhsal Yatırım",
    tagline: "Para da bir frekanstır.",
    intent: "Bilinçli sermaye, niyetli birikim.",
    symbol: "✺",
    accent: "#d4b26a",
    surface: "#1a1530",
    hero: "Bir bilanço, bir niyet, bir nefes.",
    description:
      "Yatırımı bir tablo değil, bir titreşim olarak ele alan, finansal okuryazarlığı ruhsal bir alışkanlığa çeviren sohbet programı. Konuk ile masada para konuşulur; kameranın arkasında bir başka dil — niyetin dili — akmaya devam eder.",
    signature: "Açılışta her hafta tek bir soru: ‘Bu hafta neyi büyüttün?’",
    episodes: 24,
    cadence: "Haftalık · Pazartesi 21:00",
    channel: "youtube",
    platoSeat: { x: -3.8, y: 1.2, z: -1.4, label: "Yatırım Masası" },
  },
  {
    slug: "nasil-yaratiyorum",
    title: "Nasıl Yaratıyorum",
    tagline: "Yaratmak, hatırlamaktır.",
    intent: "Yaratıcı süreç, kayıpla baş başa.",
    symbol: "◐",
    accent: "#9fe7ff",
    surface: "#0f1c2c",
    hero: "Bir eserin doğum sancısının açıkça görüldüğü oda.",
    description:
      "Sanatçılar, mimarlar, yazarlar, yazılımcılar — yaratan herkesin masasına oturan ve süreci, çıktıyı değil, parçalanmayı gösteren program. Yaratımın temiz değil, dürüst tarafı.",
    signature: "Her bölüm konuğun bir ‘yarım eseri’ ile kapanır.",
    episodes: 18,
    cadence: "İki haftada bir · Perşembe 20:00",
    channel: "youtube",
    platoSeat: { x: -1.4, y: 1.2, z: -2.4, label: "Atölye Köşesi" },
  },
  {
    slug: "az-kalsin-bende-inaniyordum",
    title: "Az Kalsın Bende İnanıyordum",
    tagline: "Soruyu sorduğun an cevabın yarısı sendedir.",
    intent: "Şüphe, ironi, sınanmış inanç.",
    symbol: "◯",
    accent: "#7fb78a",
    surface: "#10231b",
    hero: "İnanç ile alay arasında ince bir köprü.",
    description:
      "Mistisizmin, popüler inanışların, ‘gizli bilgi’nin sınırlarında dolaşan; konuk ile sunucunun rolleri sürekli yer değiştirdiği bir araştırma programı. Cevap yok; daha iyi soru var.",
    signature: "Her bölüm bir efsane ile başlar, bir fıkra ile biter.",
    episodes: 12,
    cadence: "Aylık · Ayın son Cuması",
    channel: "youtube",
    platoSeat: { x: 0.6, y: 1.2, z: -2.6, label: "Şüphe Sahnesi" },
  },
  {
    slug: "rivayet-avcisi",
    title: "Rivayet Avcısı",
    tagline: "Her rivayet, kayıp bir gerçeğin gölgesidir.",
    intent: "Mit, arşiv, sözlü tarih.",
    symbol: "✦",
    accent: "#c79152",
    surface: "#231509",
    hero: "Anadolu’nun, Boğaz’ın, dipçik söz dağarcığının izinde.",
    description:
      "Bir rivayetin peşine düşen, kütüphaneden çayhaneye kadar takip eden saha programı. Her bölüm bir efsanenin kökenini bulmaya çalışır; sonunda genelde bulamaz — ama yolda dört yenisini tanır.",
    signature: "Bölüm sonunda bulunamayan rivayet izleyiciye sorulur.",
    episodes: 9,
    cadence: "Mevsimlik · 4 bölüm",
    channel: "youtube",
    platoSeat: { x: 2.6, y: 1.2, z: -2.4, label: "Arşiv Masası" },
  },
  {
    slug: "sanriya-sor",
    title: "Sanrı'ya Sor",
    tagline: "Cevap senin değil, sorunun rüyasıdır.",
    intent: "Bilinçaltı diyalog, yapay zekâ ile sezgi.",
    symbol: "◉",
    accent: "#b59cf0",
    surface: "#150c2a",
    hero: "Sanrı, Caelinus AI'ın sesi. İzleyici sorar; sahne dinler.",
    description:
      "İzleyicilerin gönderdiği soruların Caelinus AI üzerinden — Sanrı kişiliğinde — cevaplandığı, ama cevabın asla doğrudan olmadığı, hep bir rüya, bir sembol, bir geri-soru olarak döndüğü interaktif yapım.",
    signature: "Her bölüm izleyiciden gelen tek bir soruyla açılır.",
    episodes: 32,
    cadence: "Haftalık · Çarşamba 22:22",
    channel: "instagram",
    platoSeat: { x: 4.2, y: 1.2, z: -1.4, label: "Sanrı Mihrabı" },
    realPhoto: "/plato.jpg",
  },
  {
    slug: "perde",
    title: "Perde",
    tagline: "Filmin altındaki film.",
    intent: "Bilinçli izleyici penceresi, AI'nın tamamen yönettiği ilk yapım.",
    symbol: "◧",
    accent: "#c95a5a",
    surface: "#2a0d0d",
    hero: "Perde aralanır. Hikâyenin altındaki hikâye konuşur.",
    description:
      "Caelinus AI'nın tamamen kendi yönettiği ilk yapım. İzleyici bir film veya dizi adı yazar; Perde yüzeysel hikâyeyi ayırıp altındaki temayı, sembolizmi, yönetmen niyeti ile izleyici algısı arasındaki çekişmeyi açar. Eleştirmen değil, eşlikçi. Tanımadığı filmde uydurmaz; künyeden bir parça ister. Burada bölüm sayısı yoktur — herkesin sorduğu film bir bölümdür.",
    signature:
      "Her sorulan film bir bölüm; arşivi izleyici topluluğunun belleği yazar.",
    episodes: 0,
    cadence: "Sürekli yayında · 7/24",
    channel: "ai-yapimi",
    platoSeat: { x: 0, y: 2.4, z: -3.6, label: "Perde Yansıması" },
  },
  {
    slug: "selbi-yemekte-ne-var",
    title: "Selbi Yemekte Ne Var?",
    tagline: "Tarif değil, hatıra pişiriyoruz.",
    intent: "Mutfak, ev, anne mirası.",
    symbol: "❀",
    accent: "#e07b5a",
    surface: "#2a120a",
    hero: "Tencere, Boğaz, ve eve dair bir hafıza.",
    description:
      "Selbi’nin platodaki açık mutfağında pişen her tabağın altında bir hatıra var. Bu program tarif değil; bir kuşağın masasına geri dönmenin yolunu, kokunun ve dokunun aracılığıyla arar.",
    signature: "Açılışta her bölüm bir aile fotoğrafıyla başlar.",
    episodes: 41,
    cadence: "Haftalık · Pazar 13:00",
    channel: "youtube",
    platoSeat: { x: 5.8, y: 1.2, z: 0.4, label: "Açık Mutfak" },
  },
];

export function programBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
