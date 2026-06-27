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
  channel: "youtube" | "instagram" | "podcast";
  /** Programın platodaki (set) köşesinin adı — detay sayfasında gösterilir. */
  setLabel: string;
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
    setLabel: "Yatırım Masası",
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
    setLabel: "Atölye Köşesi",
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
    setLabel: "Şüphe Sahnesi",
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
    setLabel: "Arşiv Masası",
  },
  {
    slug: "sanriya-sor",
    title: "Sanrı'ya Sor",
    tagline: "Cevap senin değil, sorunun rüyasıdır.",
    intent: "Bilinçaltı diyalog, sezgi ve sembol.",
    symbol: "◉",
    accent: "#b59cf0",
    surface: "#150c2a",
    hero: "İzleyici sorar; sahne dinler.",
    description:
      "İzleyicilerin gönderdiği soruların doğrudan değil, hep bir rüya, bir sembol, bir geri-soru olarak yanıtlandığı diyalog yapımı. Burada amaç cevap vermek değil, soruyu derinleştirmek.",
    signature: "Her bölüm izleyiciden gelen tek bir soruyla açılır.",
    episodes: 32,
    cadence: "Haftalık · Çarşamba 22:22",
    channel: "instagram",
    setLabel: "Sanrı Köşesi",
    realPhoto: "/plato.jpg",
  },
  {
    slug: "perde",
    title: "Perde",
    tagline: "Filmin altındaki film.",
    intent: "Bilinçli izleyici penceresi, sinema okuması.",
    symbol: "◧",
    accent: "#c95a5a",
    surface: "#2a0d0d",
    hero: "Perde aralanır. Hikâyenin altındaki hikâye konuşur.",
    description:
      "Bir film ya da dizinin yüzeysel hikâyesini ayırıp altındaki temayı, sembolizmi, yönetmen niyeti ile izleyici algısı arasındaki çekişmeyi açan sinema yorumu programı. Eleştirmen değil, eşlikçi — her bölüm bir filmi katman katman okur.",
    signature: "Her bölüm bir filmi yüzeyinden değil, derininden anlatır.",
    episodes: 16,
    cadence: "Haftalık · Cuma 20:00",
    channel: "youtube",
    setLabel: "Perde Sahnesi",
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
    setLabel: "Açık Mutfak",
  },
];

export function programBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
