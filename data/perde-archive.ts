/**
 * Perde Arşivi — curated film yorumları.
 *
 * Bu dosyadaki yorumlar Perde'nin AI sisteminden değil; CR YAPIM ekibi
 * tarafından Perde'nin sesiyle elle yazılmış vitrin yorumlarıdır. SEO,
 * sosyal medyada paylaşım, dış bağlantılar bu yorumların üzerine
 * kurulur. Kullanıcı yeni bir film sorduğunda canlı AI devreye girer
 * (chat panelinde) — arşivde olmayan filmler için.
 *
 * Yapı titiz: Perde'nin sistem promptundaki yapı (▣ KONU / ◧ ALTINDAKİ /
 * ◈ SEMBOL / NİYET / DİKKAT / BENZER) burada veri olarak modellenmiş.
 */

export type SimilarFilm = {
  title: string;
  /** Arşivde varsa slug; yoksa undefined */
  slug?: string;
  director?: string;
};

export type FilmReview = {
  /** URL slug (lowercase, dash-separated) */
  filmSlug: string;
  /** Görünen başlık */
  filmTitle: string;
  /** Orijinal başlık (varsa) */
  filmOriginalTitle?: string;
  /** Yıl — curated için bilinir, community için bilinmeyebilir */
  filmYear?: number;
  /** Yönetmen — curated için bilinir, community için bilinmeyebilir */
  filmDirector?: string;
  /** Ülke — curated için bilinir, community için bilinmeyebilir */
  filmCountry?: string;
  /** Kart sırasında poster gibi kullanılır; opsiyonel */
  posterUrl?: string;
  /** "Bu film aslında ___ anlatıyor" — tek satır öz */
  oz: string;
  /** ▣ KONU — yüzeysel hikâye (spoiler-free, 2-4 cümle) */
  konu: string;
  /** ◧ ALTINDAKİ — gerçek tema (2-4 cümle) */
  altindaki: string;
  /** ◈ SEMBOL — bir motif/sahne ve ne anlattığı */
  sembol: { baslik: string; metin: string };
  /** ◇ NİYET / ALGI — yönetmen niyeti vs izleyici algısı (opsiyonel) */
  niyet?: string;
  /** → Yeniden izlersen şuna dikkat et */
  izleDikkat: string;
  /** → Benzer 3-5 film */
  benzerFilmler: SimilarFilm[];
  /** Spoiler ağırlığı — UI buna göre uyarı koyar */
  spoilerLevel: "none" | "mild" | "heavy";
  /** Perde'de ilk kez göründüğü gün (ISO 8601) */
  perdedeYayindaTarih: string;
};

export const perdeArchive: FilmReview[] = [
  {
    filmSlug: "eternal-sunshine-of-the-spotless-mind",
    filmTitle: "Eternal Sunshine of the Spotless Mind",
    filmOriginalTitle: "Eternal Sunshine of the Spotless Mind",
    filmYear: 2004,
    filmDirector: "Michel Gondry",
    filmCountry: "ABD",
    oz: "Bu film aslında hatırlamanın acıyı taşımasını anlatıyor.",
    konu: "Joel ile Clementine ayrılır. Clementine birbirlerine dair tüm anılarını sildiren bir prosedürden geçer; Joel da aynısını yapar. Ama silme sürecinde, Joel anılar kayboldukça onları kaybetmek istemediğini fark eder.",
    altindaki:
      "Film, kaybı silmek isterken aslında kim olduğumuzun bir parçasını silmeye çalışmamızla ilgili. Acı veren anılar yalnızca acı değil; kimliğin tuğlalarıdır. Onları çıkarınca yapı çöker. Charlie Kaufman, sevgiyi 'tutmak' değil, 'tekrar tekrar seçmek' olarak tanımlar.",
    sembol: {
      baslik: "Sahil sahnesi",
      metin:
        "Joel rüyada Clementine'a 'kal' der; Clementine 'okay' diyerek karanlığa karışır. Bu 'okay' kelimesi tüm filmin tezi — kaybı kabul etmek silmekten farklı. Aynı 'okay', filmin sonunda yeniden tanışırken de gelir. Aynı kelime, aynı yer, başka anlam.",
    },
    niyet: "Kaufman senaryoyu Bjork'ün 'Hyperballad' şarkısından ilham alarak yazdığını söyler — 'eğer bu adamı sevmeseydim hangi ben olurdum?' sorusu. İzleyici çoğu zaman bunu bir 'romantik komedi' olarak yorumlar; halbuki Kaufman için varoluşsal bir sorudur.",
    izleDikkat:
      "Renk paletinin nasıl değiştiğine dikkat et. Anı silinirken renkler solar; geri döndüğünde canlanır. Kaufman karakterleri kelimelerle değil, paletle takip eder.",
    benzerFilmler: [
      { title: "Synecdoche, New York", director: "Charlie Kaufman" },
      { title: "La Jetée", director: "Chris Marker" },
      { title: "Past Lives", director: "Celine Song" },
      { title: "Mulholland Drive", slug: "mulholland-drive", director: "David Lynch" },
    ],
    spoilerLevel: "mild",
    perdedeYayindaTarih: "2026-05-03T20:00:00Z",
  },

  {
    filmSlug: "mulholland-drive",
    filmTitle: "Mulholland Drive",
    filmYear: 2001,
    filmDirector: "David Lynch",
    filmCountry: "ABD",
    oz: "Bu film aslında Hollywood rüyasının iç çürüten reddidir.",
    konu: "Bir araba kazasından sağ çıkan kayıp belleğe sahip bir kadın, Hollywood'a yeni gelmiş aktris adayı Betty'nin teyzesinin dairesine sığınır. İkisi birlikte kadının kim olduğunu bulmaya çalışırken film ortasından kırılır; aynı yüzler, başka isimler, başka kaderler.",
    altindaki:
      "Film, başarısızlık karşısında kendine anlattığımız hikâyenin nasıl çöktüğünü anlatır. Birinci yarı bir rüya — Diane'in Camilla'yı kaybetmiş benliğinin kendine inşa ettiği, daha güzel, daha umutlu bir yalan. İkinci yarı uyanıştır. Hollywood burada bir mekân değil; başkasının istediği biri olmaya çalışmanın metaforu.",
    sembol: {
      baslik: "Mavi anahtar ve mavi kutu",
      metin:
        "Mavi kutu rüyanın bittiği yer; mavi anahtar ise gerçeğin başlangıcı. Diane'in cinayet siparişi verdiğinde aldığı anahtar — film kendi gerçeğini bir nesneye sığdırır. Kutuyu açtığımızda perde aralanır.",
    },
    niyet: "Lynch açıklamayı reddeder ama yıllar içinde verdiği on ipucu (DVD'de) bir 'çözüm' değil, daha derin bir bilmece sunar. Çoğu izleyici filmi 'anlamayan film' olarak hatırlar; halbuki Lynch için anlam, çözümde değil hatırlamanın sızısındadır.",
    izleDikkat:
      "Espresso sahnesi, Club Silencio sahnesi, ve Winkie's lokantasındaki rüya — üçü de filmin gerçeklik katmanlarını söker. Club Silencio'da 'no hay banda — hepsi kayıt' uyarısı, film izleyicisine direkt seslenir.",
    benzerFilmler: [
      { title: "Lost Highway", director: "David Lynch" },
      { title: "Persona", director: "Ingmar Bergman" },
      { title: "Inland Empire", director: "David Lynch" },
      { title: "Black Swan", director: "Darren Aronofsky" },
    ],
    spoilerLevel: "heavy",
    perdedeYayindaTarih: "2026-05-03T20:30:00Z",
  },

  {
    filmSlug: "susuz-yaz",
    filmTitle: "Susuz Yaz",
    filmOriginalTitle: "Susuz Yaz",
    filmYear: 1963,
    filmDirector: "Metin Erksan",
    filmCountry: "Türkiye",
    oz: "Bu film aslında hak ile mülkiyetin birbirine karıştığı yerde insanın acımasızlaştığını anlatıyor.",
    konu: "Ege'de bir köyde, iki kardeşten büyüğü olan Osman, tarlasındaki suyu köyle paylaşmamaya karar verir. Küçük kardeş Hasan'ın bu karara karşı çıkışı, suya ihtiyacı olan köyün öfkesi ve Osman'ın Hasan'ın karısına yönelttiği bakış filmi bir trajediye doğru sürükler.",
    altindaki:
      "Film, kıtlığın insan ilişkilerini nasıl yeniden kurduğunu anlatır. Su burada sadece kaynak değil; ahlak, akrabalık ve hak duygusunun da terazisi. Erksan, 'benim toprağımdan akıyorsa benimdir' önermesinin altındaki çıplak şiddeti gösterir. Modernleşmemiş kırın değil; mülkiyetin her yerde geçerli sertliğinin filmidir.",
    sembol: {
      baslik: "Suyun kesilişi",
      metin:
        "Osman'ın suyu kestiği o ilk sahne, bir kararla ahlakın değişmesi: aynı insanlar, aynı tarlalar, ama artık başka bir köy. Erksan suyu hiç kahramanlaştırmaz; akarken doğal, kesildiğinde insanın yanında bir başka karakter olur.",
    },
    niyet: "Erksan'ın 1964'te Berlin Altın Ayı kazanmış bu filmi, Türk sinemasının dünyaya açıldığı eşik kabul edilir. Yönetmen 'köy gerçekliği' beklentisini reddedip Yunan trajedisi kurgusu kullanır; köy burada Korint'tir, su Antigone'nin yasası.",
    izleDikkat:
      "Ulvi Doğan'ın Osman portresine, özellikle yüzdeki gölgeye bak. Erksan ışığı ahlakı göstermek için kullanır — Osman'ın yüzü filmde aydınlandıkça karakter karanlığa düşer.",
    benzerFilmler: [
      { title: "Kuru Otlar Üstüne", director: "Nuri Bilge Ceylan" },
      { title: "Yılanların Öcü", director: "Metin Erksan" },
      { title: "Tabutta Rövaşata", director: "Derviş Zaim" },
      { title: "Kış Uykusu", slug: "kis-uykusu", director: "Nuri Bilge Ceylan" },
    ],
    spoilerLevel: "mild",
    perdedeYayindaTarih: "2026-05-04T20:00:00Z",
  },

  {
    filmSlug: "parasite",
    filmTitle: "Parasite",
    filmOriginalTitle: "기생충 (Gisaengchung)",
    filmYear: 2019,
    filmDirector: "Bong Joon-ho",
    filmCountry: "Güney Kore",
    oz: "Bu film aslında sınıfın bir koku, bir merdiven ve bir bodrum olduğunu anlatıyor.",
    konu: "Bodrum katında yaşayan Kim ailesi, oğullarının özel ders teklifi vesilesiyle tek tek zengin Park ailesinin evine — şoför, hizmetçi, sanat terapisti olarak — sızar. Sızma planı işlemeye başladığında evin gerçek sırrı ortaya çıkar.",
    altindaki:
      "Film, sınıfın görünür değil, kokulanır olduğunu söyler. Bay Park'ın 'metro kokusu' yorumu filmin kalbi. Bong, sınıf çatışmasını siyasi sloganla değil; kokuyla, merdivenle, yağmurun nereden aktığıyla anlatır. İki aile arasındaki gerçek mesafe servet değil; yağmurda evin altına mı üstüne mi düştüğündür.",
    sembol: {
      baslik: "Merdivenler",
      metin:
        "Filmde herkes ya yukarı çıkıyor, ya aşağı iniyor — düz koridor neredeyse yok. Park'ların evi yukarı, Kim'lerin yarı bodrumu aşağı, gizli bodrum daha aşağı. Bong, sınıfı dikey bir mimaride kurar. Yağmur sahnesinde Kim'ler aşağı, daha aşağı, daha aşağı koştukça bulundukları konum sözle değil topografyayla anlatılır.",
    },
    niyet: "Bong filmin Cannes Altın Palmiye + 4 Oscar (en iyi film dahil) kazanmasını 'lokal bir hikâye, evrensel bir derin yapı' ile açıklar. Çoğu izleyici filmi bir gerilim/hırsız komedisi olarak hatırlar; Bong için filmin türü 'kapitalizmin trajedisi'.",
    izleDikkat:
      "Işık kullanımına bak. Park'ların evinde gün ışığı düz girer; Kim'lerin bodrumunda ışık hep yukarıdan, hep yetersiz. İki ailenin yüzleri aynı sahnede bile farklı aydınlanır — Bong sınıfı mizansenle değil, ışık politikasıyla anlatır.",
    benzerFilmler: [
      { title: "Snowpiercer", director: "Bong Joon-ho" },
      { title: "Shoplifters", director: "Hirokazu Kore-eda" },
      { title: "The Square", director: "Ruben Östlund" },
      { title: "Burning", director: "Lee Chang-dong" },
    ],
    spoilerLevel: "mild",
    perdedeYayindaTarih: "2026-05-05T20:00:00Z",
  },

  {
    filmSlug: "the-truman-show",
    filmTitle: "The Truman Show",
    filmYear: 1998,
    filmDirector: "Peter Weir",
    filmCountry: "ABD",
    oz: "Bu film aslında özgürlüğün önce şüpheyi gerektirdiğini anlatıyor.",
    konu: "Truman Burbank, doğduğundan beri canlı yayında geçen, etrafındaki herkesin oyuncu olduğu dev bir TV setinin tek farkında olmayan kişisidir. Setteki ufak çatlaklar — düşen bir spot, beklenmedik bir karşılaşma — Truman'ı ilk kez 'bu dünya gerçek mi?' diye sormaya iter.",
    altindaki:
      "Film, sosyal medya henüz yokken gözetim toplumunu önceden okur. Ama daha derinde, bir 'mağara alegorisi'dir: Truman'ın güvenli, tahmin edilebilir, sevecen dünyasını terk etmesi için önce o dünyaya güvenmeyi öğrenmemesi gerekir. Özgürlük, daha iyi bir dünyaya değil; tanımadığın kapıya doğru atılan adımdır.",
    sembol: {
      baslik: "Ufuk çizgisi",
      metin:
        "Filmin son sahnesi: Truman'ın denize açılan teknesi setin sonu olan boyalı duvara çarpar. Çıkış kapısı küçücük bir merdivenin ucundadır. Bütün filmin temel sorusu burada görselleşir: özgürlük seni yepyeni bir dünyaya değil, bir karanlık eşiğe götürür. Ne olduğunu bilmeden de seçmek zorundasın.",
    },
    izleDikkat:
      "Christof'un (yönetmen) Truman'a verdiği son konuşmaya dikkat: 'Bizim dünyamızdaki kadar gerçeklik yok burada; ama yalan da yok.' Bu cümle filmin tezini iki kelimede tersine çevirir. Yine: Truman'ın 'günaydın, akşam görüşmek üzere, iyi geceler' selamlaması, otomatik yaşamın kasetidir.",
    benzerFilmler: [
      { title: "Dark City", director: "Alex Proyas" },
      { title: "Pleasantville", director: "Gary Ross" },
      { title: "The Matrix", director: "Wachowski Sisters" },
      { title: "EdTV", director: "Ron Howard" },
    ],
    spoilerLevel: "mild",
    perdedeYayindaTarih: "2026-05-06T20:00:00Z",
  },

  {
    filmSlug: "kis-uykusu",
    filmTitle: "Kış Uykusu",
    filmOriginalTitle: "Kış Uykusu",
    filmYear: 2014,
    filmDirector: "Nuri Bilge Ceylan",
    filmCountry: "Türkiye",
    oz: "Bu film aslında haklı olmanın insanı nasıl yalnızlaştırdığını anlatıyor.",
    konu: "Kapadokya'da bir otel işleten emekli oyuncu Aydın, çevresindeki insanlarla — eşi Nihal, kız kardeşi Necla, kiracıları olan yoksul aile — uzun, kâğıt gibi diyaloglara girer. Kış uzar, otel boşalır; konuşmalar uzun cümlelerin arkasına saklanan suskunlukları ortaya çıkarır.",
    altindaki:
      "Film, entelektüel olmanın etik bir kalkan olabileceği gerçeğini gösterir. Aydın haklıdır — neredeyse her tartışmada haklıdır. Ama bu 'haklı olma' onu sevemez biri yapar. Ceylan, eşitsizliği bir köy hikâyesinin altına gizlenmiş bir karakter çürümesi olarak kurar. 'Aydın olmak' fiilinin ironisi başlığın kendisinde: kış uykusu hem doğal hem ahlaki bir çekiliştir.",
    sembol: {
      baslik: "Çocuğun yaktığı para",
      metin:
        "Yoksul ailenin çocuğu, Aydın'ın eşi Nihal'in 'iyilik' olarak getirdiği parayı sobaya atar. Bu sahne filmin merkezi: yardım, alanı küçültür; gerçekten muhtaç olan, yardım edenin aynasında daha çok küçülür. Çocuğun jesti, üç saatlik diyalogların sığdıramadığı şeyi söyler.",
    },
    niyet: "Ceylan filmi Çehov'un 'Karım' ve 'İyi İnsanlar' hikâyelerinden uyarladığını söyler. Cannes Altın Palmiye 2014. Çoğu izleyici 'çok uzun, çok konuşmalı' tepkisini verir; halbuki Ceylan için film bir 'yorgunluk denemesi' — izleyicinin de Aydın'ın yorgunluğunu hissetmesini ister.",
    izleDikkat:
      "Demet Akbağ (Necla) ile Haluk Bilginer (Aydın) arasındaki on dakikalık 'kötülüğe direnmemek' tartışmasına bak. Necla'nın bir cümlesi Aydın'ı sustar — Ceylan o sessizliği iki saniye fazla tutar; o iki saniye filmin kalbidir.",
    benzerFilmler: [
      { title: "Once Upon a Time in Anatolia", director: "Nuri Bilge Ceylan" },
      { title: "Ahlat Ağacı", director: "Nuri Bilge Ceylan" },
      { title: "Susuz Yaz", slug: "susuz-yaz", director: "Metin Erksan" },
      { title: "Scenes from a Marriage", director: "Ingmar Bergman" },
    ],
    spoilerLevel: "mild",
    perdedeYayindaTarih: "2026-05-07T20:00:00Z",
  },
];

/* ---------- yardımcılar ---------- */

export function reviewBySlug(slug: string): FilmReview | undefined {
  return perdeArchive.find((r) => r.filmSlug === slug);
}

/** Statik üretim için tüm slug'lar */
export function allReviewSlugs(): Array<{ slug: string }> {
  return perdeArchive.map((r) => ({ slug: r.filmSlug }));
}

/**
 * Kullanıcının yazdığı serbest metni arşiv slug'ına çevirir.
 * Türkçe karakter normalizasyonu, lower-case, dash-separated.
 * Eşleşme bulunmazsa null döner — chat panel devreye girer.
 */
export function findReviewByQuery(raw: string): FilmReview | null {
  const slug = slugifyTr(raw);
  if (!slug) return null;
  // Tam slug eşleşme veya başlık eşleşme
  return (
    perdeArchive.find((r) => r.filmSlug === slug) ||
    perdeArchive.find((r) => slugifyTr(r.filmTitle) === slug) ||
    perdeArchive.find(
      (r) => r.filmOriginalTitle && slugifyTr(r.filmOriginalTitle) === slug
    ) ||
    null
  );
}

/** Türkçe karakterleri ASCII'ye normalize eden slugify */
export function slugifyTr(input: string): string {
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
    .replace(/-+/g, "-");
}
