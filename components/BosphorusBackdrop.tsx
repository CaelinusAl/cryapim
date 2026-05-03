/**
 * BosphorusBackdrop — İstanbul Boğazı, gece, hologram ışıklı.
 *
 * Site geneli sabit (fixed) arka plan: tüm sayfalarda viewport'a
 * yapışık durur, içerik üstüne scroll yapar — bir tiyatro perdesi.
 *
 * Sahne katmanları (uzaktan yakına):
 *   1) Gökyüzü gradyanı (gece moru → boğaz mavisi → ufuk)
 *   2) Yıldızlar (deterministik, hydration-safe)
 *   3) Uzak Anadolu yakası silüeti
 *   4) Yakın Avrupa yakası silüeti + sıcak pencere ışıkları
 *   5) Boğaz Köprüsü — mor/pembe LED hatlı, asma kabloları,
 *      tepelerinde kırmızı havacılık lambası
 *   6) Kız Kulesi — uzakta, sağ ön planda, küçük ama tek altın ışıkla
 *   7) Deniz — koyu mavi, yatay hologram tarama çizgileri yukarı akar
 *   8) Köprünün ve kulenin sudaki titrek yansıması
 *   9) Vinyet — kenar kararması
 *
 * Stoğa sıfır bağımlılık — her şey SVG ve CSS animasyonu ile çiziliyor.
 * İleride gerçek plato fotoğrafları geldiğinde aynı katman slot'larına
 * doku olarak girer.
 */
export function BosphorusBackdrop() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* 1) Gökyüzü */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #060514 0%, #0a0a22 22%, #0d1438 48%, #122550 68%, #163565 86%, #1a4178 100%)",
        }}
      />

      {/* Mor/pembe atmosfer halesi — köprünün ışıklarının gökyüzüne yumuşak yansıması */}
      <div
        className="absolute inset-x-0"
        style={{
          top: "32%",
          height: "40%",
          background:
            "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(155,93,229,0.18) 0%, rgba(241,91,181,0.10) 35%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* 2) Yıldızlar */}
      <Stars />

      {/* 3) Uzak Anadolu yakası — silüet + yüzlerce titreşen pencere */}
      <svg
        viewBox="0 0 1600 600"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 top-[34%] h-[26%] w-full"
      >
        <path
          d="M0,420 L80,380 L140,400 L220,360 L260,380 L340,330 L420,380 L500,350 L600,390 L700,370 L820,330 L920,380 L1020,360 L1120,400 L1240,350 L1360,390 L1480,370 L1600,380 L1600,600 L0,600 Z"
          fill="#0a1428"
          opacity="0.55"
        />
        <ShoreLights count={70} yMin={395} yMax={485} sizeMin={0.6} sizeMax={1.2} seed={11} />
      </svg>

      {/* 4) Yakın Avrupa yakası — daha kalabalık ışıklı silüet */}
      <svg
        viewBox="0 0 1600 600"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 top-[42%] h-[22%] w-full"
      >
        <path
          d="M0,440 L60,420 L120,440 L200,400 L280,430 L360,395 L440,420 L520,385 L620,425 L720,400 L820,385 L920,415 L1020,385 L1120,425 L1240,395 L1360,420 L1480,400 L1600,420 L1600,600 L0,600 Z"
          fill="#04101a"
          opacity="0.85"
        />
        <ShoreLights count={90} yMin={415} yMax={520} sizeMin={0.8} sizeMax={1.5} seed={29} />
      </svg>

      {/* 5) Boğaz Köprüsü — sahnenin yıldızı */}
      <BosphorusBridge />

      {/* 7) Deniz */}
      <Sea />

      {/* 7b) Boğazda tekneler / şamandıralar — yeşil + beyaz seyir ışıkları */}
      <SeaLights />

      {/* 8) Yansımalar */}
      <Reflections />

      {/* 6) Kız Kulesi — sağda, ışıl ışıl, dönen fener ışınlı */}
      <MaidensTower />

      {/* 9) Vinyet */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, transparent 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}

/* ---------- Şehir / yaka pencere ışıkları ---------- */
/**
 * Deterministik dağılım — hydration mismatch olmasın diye seed bazlı.
 * Çoğunluk sıcak altın, aralarda beyaz/soğuk mavi, çok seyrek yeşil.
 * Her ışık kendi gecikmesi ve süresiyle titreşir (twinkle).
 */
function ShoreLights({
  count,
  yMin,
  yMax,
  sizeMin,
  sizeMax,
  seed,
}: {
  count: number;
  yMin: number;
  yMax: number;
  sizeMin: number;
  sizeMax: number;
  seed: number;
}) {
  const palette = [
    "#e8c878", // sıcak altın (en yaygın)
    "#d4b26a",
    "#e8c878",
    "#f0d896",
    "#d4b26a",
    "#e8c878",
    "#f0e8d0", // krem
    "#e9e6dc", // soft white
    "#ffffff", // beyaz
    "#c9d4e0", // soğuk mavi-beyaz
    "#a8c8d8",
    "#e8c878",
    "#d4b26a",
    "#9fdfa0", // yeşil — seyrek
    "#e8c878",
    "#ffffff",
    "#d4b26a",
  ];
  const lights = Array.from({ length: count }, (_, i) => {
    const k = (i * 137 + seed * 53) % 9973; // pseudo-random
    const x = ((i + 0.5) / count) * 1600 + ((k % 30) - 15);
    const y = yMin + ((k * 7) % (yMax - yMin));
    const r = sizeMin + ((k % 100) / 100) * (sizeMax - sizeMin);
    const color = palette[(i + seed) % palette.length];
    const delay = ((k % 700) / 100).toFixed(2) + "s";
    const dur = 3 + ((k % 6)) + "s";
    return { x, y, r, color, delay, dur };
  });
  return (
    <g>
      {lights.map((l, i) => (
        <g key={i}>
          {/* Çekirdek ışık */}
          <circle
            cx={l.x}
            cy={l.y}
            r={l.r}
            fill={l.color}
            opacity="0.9"
            style={{
              animation: `twinkle ${l.dur} ease-in-out ${l.delay} infinite`,
            }}
          />
          {/* Yumuşak hale (her 4. ışıkta — performans) */}
          {i % 4 === 0 && (
            <circle
              cx={l.x}
              cy={l.y}
              r={l.r * 3}
              fill={l.color}
              opacity="0.18"
              style={{
                animation: `twinkle ${l.dur} ease-in-out ${l.delay} infinite`,
              }}
            />
          )}
        </g>
      ))}
    </g>
  );
}

/* ---------- Boğazdaki tekne ve şamandıra ışıkları ---------- */
function SeaLights() {
  // Yeşil = sancak, beyaz = seyir/pruva, biri kırmızı (iskele) — gerçek deniz dili
  const lights = [
    { x: 18, y: 64, color: "#5af070", size: 1.6, delay: "0s", dur: "5s" }, // yeşil şamandıra solda
    { x: 28, y: 58, color: "#ffffff", size: 1.2, delay: "0.4s", dur: "4.5s" },
    { x: 42, y: 72, color: "#5af070", size: 1.4, delay: "1.2s", dur: "6s" },
    { x: 55, y: 50, color: "#ffffff", size: 1.0, delay: "0.8s", dur: "5s" },
    { x: 62, y: 78, color: "#5af070", size: 1.5, delay: "2.0s", dur: "6s" },
    { x: 70, y: 46, color: "#ffffff", size: 1.1, delay: "1.5s", dur: "4s" },
    { x: 78, y: 84, color: "#5af070", size: 1.3, delay: "0.3s", dur: "5.5s" },
    { x: 85, y: 56, color: "#ffffff", size: 1.4, delay: "1.0s", dur: "5s" },
    { x: 92, y: 68, color: "#5af070", size: 1.2, delay: "1.8s", dur: "6s" },
    // Bir kırmızı şamandıra — yanal denge için (gerçek deniz işareti)
    { x: 35, y: 80, color: "#ff5757", size: 1.3, delay: "1.4s", dur: "5s" },
    { x: 75, y: 90, color: "#ff5757", size: 1.1, delay: "0.6s", dur: "5.5s" },
  ];
  return (
    <div className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none">
      {lights.map((l, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${l.x}%`,
            top: `${l.y}%`,
            transform: "translate(-50%, -50%)",
            animation: `boat-drift ${20 + i}s ease-in-out ${i * 0.3}s infinite alternate`,
          }}
        >
          {/* Yumuşak hale */}
          <div
            style={{
              width: `${l.size * 18}px`,
              height: `${l.size * 18}px`,
              borderRadius: "9999px",
              background: `radial-gradient(circle, ${l.color}88 0%, ${l.color}22 40%, transparent 70%)`,
              filter: "blur(1px)",
              animation: `navlight ${l.dur} ease-in-out ${l.delay} infinite`,
              color: l.color,
            }}
          />
          {/* Çekirdek */}
          <div
            style={{
              width: `${l.size * 3}px`,
              height: `${l.size * 3}px`,
              borderRadius: "9999px",
              background: l.color,
              boxShadow: `0 0 ${l.size * 8}px ${l.color}`,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              animation: `navlight ${l.dur} ease-in-out ${l.delay} infinite`,
              color: l.color,
            }}
          />
          {/* Sudaki kısa yansıma kuyruğu */}
          <div
            style={{
              width: "1px",
              height: `${l.size * 14}px`,
              background: `linear-gradient(180deg, ${l.color}aa 0%, transparent 100%)`,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translateX(-50%)",
              filter: "blur(0.6px)",
              opacity: 0.6,
              animation: `navlight ${l.dur} ease-in-out ${l.delay} infinite`,
              color: l.color,
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ---------- Yıldızlar ---------- */
function Stars() {
  const stars = [
    [120, 60, 0.6],
    [240, 100, 0.4],
    [360, 50, 0.7],
    [520, 120, 0.3],
    [680, 70, 0.5],
    [820, 110, 0.4],
    [980, 60, 0.6],
    [1120, 90, 0.3],
    [1280, 130, 0.5],
    [1420, 70, 0.4],
    [1540, 110, 0.3],
    [60, 160, 0.4],
    [200, 180, 0.3],
    [440, 200, 0.5],
    [760, 190, 0.4],
    [1080, 210, 0.3],
    [1340, 180, 0.4],
    [180, 40, 0.5],
    [620, 30, 0.6],
    [1180, 40, 0.4],
    [1500, 200, 0.3],
  ] as const;
  return (
    <svg
      viewBox="0 0 1600 400"
      preserveAspectRatio="xMidYMin slice"
      className="absolute inset-x-0 top-0 h-[42%] w-full"
    >
      {stars.map(([x, y, o], i) => (
        <circle key={i} cx={x} cy={y} r={0.9} fill="#e9e6dc" opacity={o} />
      ))}
    </svg>
  );
}

/* ---------- Boğaz Köprüsü ---------- */
/**
 * Asma köprü matematiği — 1600x600 viewBox üzerinde:
 *   - Sol kule: x=400, y=tepe 110 → tabana 360 (deck seviyesi)
 *   - Sağ kule: x=1200, y=tepe 110 → tabana 360
 *   - Ana kablo parabolü: tepelerden orta sarkmaya (290), sonra geri yukarı.
 *     Quadratic bezier ile: control point (800, 470), uçlar (400,110) ve (1200,110).
 *   - Hangerlar (dikey kablolar): parabol üzerindeki noktalardan deck'e iner.
 *     y_cable(t) = 110 + 720*t*(1-t) için her t ∈ {1/24, 2/24, ..., 23/24}.
 */
function BosphorusBridge() {
  const leftX = 400;
  const rightX = 1200;
  const towerTop = 110;
  const deckY = 360;
  const span = rightX - leftX;
  const HANGERS = 23;

  const hangers = Array.from({ length: HANGERS }, (_, i) => {
    const t = (i + 1) / (HANGERS + 1);
    const x = leftX + t * span;
    const y = towerTop + 720 * t * (1 - t);
    return { x, y };
  });

  // Deck boyunca LED ışıklar — mor → magenta → pembe geçişi
  const DECK_LIGHTS = 80;
  const deckLights = Array.from({ length: DECK_LIGHTS }, (_, i) => {
    const t = i / (DECK_LIGHTS - 1);
    const x = 200 + t * 1200; // deck 200'den 1400'e uzanır
    // Mor → magenta → pembe (sinüsoidal mix)
    const r = Math.round(155 + (241 - 155) * t);
    const g = Math.round(93 + (91 - 93) * t);
    const b = Math.round(229 + (181 - 229) * t);
    const color = `rgb(${r},${g},${b})`;
    const delay = (i * 0.07) % 3;
    return { x, color, delay };
  });

  return (
    <svg
      viewBox="0 0 1600 600"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-x-0 top-[10%] h-[60%] w-full"
    >
      <defs>
        <linearGradient id="deck-glow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9b5de5" />
          <stop offset="50%" stopColor="#c247c0" />
          <stop offset="100%" stopColor="#f15bb5" />
        </linearGradient>
        <linearGradient id="cable-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7a4ec0" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#a14fa6" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#c84e9a" stopOpacity="0.55" />
        </linearGradient>
        <filter id="deck-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
        <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Hangerlar (önce çizilir, deck altında kalır) */}
      <g stroke="#243a5a" strokeWidth="0.7" opacity="0.65">
        {hangers.map((h, i) => (
          <line key={i} x1={h.x} y1={h.y} x2={h.x} y2={deckY} />
        ))}
      </g>

      {/* Ana asma kablo — sol uzantı, parabol, sağ uzantı (3 segment) */}
      <g fill="none" strokeLinecap="round">
        {/* Sol arka uzantı (kuleden sahile) */}
        <path
          d={`M 60 ${deckY + 10} Q 230 ${deckY - 80} ${leftX} ${towerTop}`}
          stroke="url(#cable-gradient)"
          strokeWidth="1.6"
          opacity="0.7"
        />
        {/* Ana parabol */}
        <path
          d={`M ${leftX} ${towerTop} Q 800 470 ${rightX} ${towerTop}`}
          stroke="url(#cable-gradient)"
          strokeWidth="2"
        />
        {/* Sağ arka uzantı */}
        <path
          d={`M ${rightX} ${towerTop} Q 1370 ${deckY - 80} 1540 ${deckY + 10}`}
          stroke="url(#cable-gradient)"
          strokeWidth="1.6"
          opacity="0.7"
        />
      </g>

      {/* Sol kule */}
      <Tower x={leftX} top={towerTop} bottom={deckY + 30} />
      {/* Sağ kule */}
      <Tower x={rightX} top={towerTop} bottom={deckY + 30} />

      {/* Deck — ince çubuk + mor-pembe glow */}
      <g>
        {/* Glow halesi */}
        <rect
          x="200"
          y={deckY - 1}
          width="1200"
          height="3"
          fill="url(#deck-glow)"
          filter="url(#strong-glow)"
          opacity="0.85"
        />
        {/* Asıl deck */}
        <rect
          x="200"
          y={deckY}
          width="1200"
          height="2.4"
          fill="url(#deck-glow)"
          filter="url(#deck-blur)"
        />
        {/* Deck altı koyu çizgi (yapı tarafı) */}
        <rect x="200" y={deckY + 2} width="1200" height="0.8" fill="#0a1018" />
      </g>

      {/* Deck LED ışıkları — her biri kendi nabzıyla */}
      <g>
        {deckLights.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={deckY}
            r="0.9"
            fill={d.color}
            style={{
              color: d.color,
              animation: `deck-pulse 3s ease-in-out ${d.delay}s infinite`,
            }}
          />
        ))}
      </g>

      {/* Kule tepelerinde kırmızı havacılık lambası — yavaş yanıp söner */}
      <circle
        cx={leftX}
        cy={towerTop - 6}
        r="2"
        fill="#ff3a3a"
        style={{
          animation: "aviation-blink 2.6s ease-in-out 0s infinite",
          filter: "drop-shadow(0 0 4px #ff3a3a)",
        }}
      />
      <circle
        cx={rightX}
        cy={towerTop - 6}
        r="2"
        fill="#ff3a3a"
        style={{
          animation: "aviation-blink 2.6s ease-in-out 1.3s infinite",
          filter: "drop-shadow(0 0 4px #ff3a3a)",
        }}
      />
    </svg>
  );
}

function Tower({
  x,
  top,
  bottom,
}: {
  x: number;
  top: number;
  bottom: number;
}) {
  // Asma köprü kulesi: iki ince dikey direk + tepedeki yatay traverse + alt traverse
  const w = 8;
  const left = x - w / 2;
  return (
    <g>
      {/* Sol direk */}
      <rect x={left - 3} y={top} width="3" height={bottom - top} fill="#0a121e" />
      {/* Sağ direk */}
      <rect x={left + w} y={top} width="3" height={bottom - top} fill="#0a121e" />
      {/* Üst yatay traverse */}
      <rect x={left - 5} y={top + 6} width={w + 10} height="2.2" fill="#0c1726" />
      {/* Orta traverse */}
      <rect
        x={left - 5}
        y={top + (bottom - top) * 0.5}
        width={w + 10}
        height="1.8"
        fill="#0c1726"
      />
      {/* İnce kontur ışığı — kuleyi mor/pembe çerçeve halinde aydınlat */}
      <rect
        x={left - 3.4}
        y={top}
        width="0.8"
        height={bottom - top}
        fill="#9b5de5"
        opacity="0.3"
      />
      <rect
        x={left + w + 2.6}
        y={top}
        width="0.8"
        height={bottom - top}
        fill="#f15bb5"
        opacity="0.3"
      />
    </g>
  );
}

/* ---------- Deniz + Hologram ---------- */
function Sea() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-[40%] overflow-hidden">
      {/* Temel deniz gradyanı — derin lacivert → koyu mavi */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0c2540 0%, #081930 40%, #050e1d 80%, #03070f 100%)",
        }}
      />

      {/* Köprünün suya vuran mor/pembe yansıması — geniş yumuşak şerit */}
      <div
        className="absolute inset-x-0"
        style={{
          top: "0%",
          height: "30%",
          background:
            "linear-gradient(180deg, rgba(155,93,229,0.22) 0%, rgba(241,91,181,0.16) 40%, transparent 100%)",
          filter: "blur(8px)",
          animation:
            "bridge-reflection 4.5s ease-in-out infinite",
          mixBlendMode: "screen",
        }}
      />

      {/* Hologram tarama çizgileri — birkaç katman, farklı hızlarda yukarı kayar */}
      <HologramScans />

      {/* Yatay sıvı parıltı — yana ileri-geri kayan cyan dalgası */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(159,231,255,0.10) 35%, rgba(159,231,255,0.18) 50%, rgba(159,231,255,0.10) 65%, transparent 100%)",
          mixBlendMode: "screen",
          animation: "liquid-shimmer 8s ease-in-out infinite alternate",
        }}
      />

      {/* Ön plan dalga çizgileri */}
      <svg
        viewBox="0 0 1600 200"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 h-[70%] w-full opacity-50"
      >
        {[20, 50, 80, 110, 140, 170].map((y, i) => (
          <path
            key={i}
            d={`M0,${y} Q200,${y - 5} 400,${y} T800,${y} T1200,${y} T1600,${y}`}
            fill="none"
            stroke="#1f4a73"
            strokeOpacity={0.45 - i * 0.06}
            strokeWidth={0.7}
          />
        ))}
        {/* Cyan vurgu çizgisi — bir hologram okunan satır gibi */}
        <path
          d="M0,95 Q200,90 400,95 T800,95 T1200,95 T1600,95"
          fill="none"
          stroke="#9fe7ff"
          strokeOpacity="0.35"
          strokeWidth="0.6"
          style={{ filter: "drop-shadow(0 0 3px #9fe7ff)" }}
        />
      </svg>

      {/* Hologram grid — üstten bakıldığında "veri masası" hissi */}
      <div
        className="absolute inset-x-0 bottom-0 h-[60%]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(159,231,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(159,231,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "80px 40px",
          maskImage:
            "linear-gradient(to top, black 0%, black 30%, transparent 90%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 30%, transparent 90%)",
          transform: "perspective(600px) rotateX(58deg)",
          transformOrigin: "bottom",
          opacity: 0.7,
        }}
      />
    </div>
  );
}

function HologramScans() {
  // 4 farklı katman, farklı delay/duration ile yukarı kayar — sürekli akış hissi
  const scans = [
    { delay: 0, duration: 6, top: "65%", color: "rgba(159,231,255,0.45)" },
    { delay: 1.5, duration: 7, top: "75%", color: "rgba(159,231,255,0.30)" },
    { delay: 3, duration: 5.5, top: "55%", color: "rgba(180,160,255,0.28)" },
    { delay: 4.2, duration: 8, top: "85%", color: "rgba(159,231,255,0.20)" },
  ];
  return (
    <>
      {scans.map((s, i) => (
        <div
          key={i}
          className="absolute inset-x-0"
          style={{
            top: s.top,
            height: "2px",
            background: `linear-gradient(90deg, transparent 0%, ${s.color} 50%, transparent 100%)`,
            filter: "blur(1.4px) drop-shadow(0 0 6px rgba(159,231,255,0.55))",
            animation: `hologram-scan ${s.duration}s ease-out ${s.delay}s infinite`,
            mixBlendMode: "screen",
          }}
        />
      ))}
    </>
  );
}

/* ---------- Yansımalar (köprü + kule sudaki) ---------- */
function Reflections() {
  return (
    <svg
      viewBox="0 0 1600 600"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-x-0 top-[58%] h-[24%] w-full pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    >
      <defs>
        <linearGradient id="refl-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c247c0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#9b5de5" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Köprünün dalgalı yansıması — birkaç titrek yatay çizgi */}
      {[6, 16, 28, 42, 58, 76].map((y, i) => (
        <path
          key={i}
          d={`M 200 ${y} Q 800 ${y + (i % 2 === 0 ? 2 : -2)} 1400 ${y}`}
          fill="none"
          stroke="url(#refl-fade)"
          strokeWidth={1.2 - i * 0.12}
          opacity={0.65 - i * 0.08}
          style={{ filter: "blur(0.6px)" }}
        />
      ))}
    </svg>
  );
}

/* ---------- Kız Kulesi (denizin içinde, sağ ön plan) ---------- */
/**
 * Bu kez sahne SVG'sinin içine gömmek yerine kendi
 * konumlandırılmış konteynerinde duruyor — böylece kuleyi
 * piksel cinsinden tam istediğimiz yere (deniz seviyesinin
 * üstüne) yerleştirebiliyoruz, fener ışını da onunla
 * tutarlı. Aspect-ratio sabit, responsive ölçek `clamp`.
 *
 * Sahnedeki yeri: hero'nun sağ alt çeyreği, deniz katmanının
 * ortası. Adanın altı sea div'iyle örtüşür.
 */
function MaidensTower() {
  // Tower viewBox koordinatları (90 wide × 130 tall)
  const W = 90;
  const H = 130;

  // Pencereler — kule gövdesinde 3 sıra
  const windows = [
    { x: 39, y: 62, c: "#f0d896" },
    { x: 45, y: 62, c: "#e8c878" },
    { x: 51, y: 62, c: "#f0d896" },
    { x: 36, y: 76, c: "#e8c878" },
    { x: 42, y: 76, c: "#f0d896" },
    { x: 48, y: 76, c: "#e8c878" },
    { x: 54, y: 76, c: "#f0d896" },
    { x: 39, y: 90, c: "#d4b26a" },
    { x: 45, y: 90, c: "#e8c878" },
    { x: 51, y: 90, c: "#d4b26a" },
  ];

  // Lantern viewBox konumu (kubbenin altındaki cam oda merkezi)
  const lanternX = 45;
  const lanternY = 42;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        // Sağ-orta, deniz seviyesinin biraz altına oturur
        right: "14%",
        bottom: "18%",
        width: "clamp(140px, 14vw, 220px)",
        aspectRatio: `${W} / ${H}`,
      }}
    >
      {/* Tower SVG */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="tower-island-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#f0c878" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#d4b26a" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#d4b26a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lantern-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#fff8d0" stopOpacity="1" />
            <stop offset="30%" stopColor="#f0d896" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d4b26a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Su altındaki halka yansıması — adanın etrafında parlak su */}
        <ellipse cx={45} cy={117} rx={42} ry={8} fill="url(#tower-island-glow)" />

        {/* Kayalık ada */}
        <ellipse cx={45} cy={114} rx={28} ry={3.5} fill="#070d18" />
        <ellipse cx={45} cy={112.5} rx={25} ry={3} fill="#0d1620" />

        {/* Kuleyi tabandan yıkayan sıcak spot */}
        <ellipse cx={45} cy={104} rx={20} ry={10} fill="#d4b26a" opacity="0.14" />

        {/* Kule gövdesi */}
        <rect x={32} y={50} width={26} height={62} fill="#0e1a28" />
        <rect
          x={32}
          y={50}
          width={26}
          height={62}
          fill="none"
          stroke="#1c2c40"
          strokeWidth={0.5}
        />

        {/* Pencereler */}
        {windows.map((w, i) => (
          <g key={i}>
            <rect
              x={w.x - 1.2}
              y={w.y - 1.6}
              width={2.4}
              height={3.2}
              fill={w.c}
              style={{
                animation: `twinkle ${3 + (i % 4)}s ease-in-out ${(i * 0.4) % 3}s infinite`,
              }}
            />
            <rect
              x={w.x - 2.2}
              y={w.y - 2.4}
              width={4.4}
              height={4.8}
              fill={w.c}
              opacity="0.2"
              style={{
                animation: `twinkle ${3 + (i % 4)}s ease-in-out ${(i * 0.4) % 3}s infinite`,
              }}
            />
          </g>
        ))}

        {/* Üst halka */}
        <rect x={29} y={47} width={32} height={3.6} fill="#142031" />
        <rect x={29} y={46.4} width={32} height={0.8} fill="#22344a" />

        {/* Fener bölmesi — kubbenin altındaki cam oda */}
        <rect x={37} y={37} width={16} height={10} fill="#1a2940" />
        <rect
          x={37}
          y={37}
          width={16}
          height={10}
          fill="none"
          stroke="#2a3a55"
          strokeWidth={0.4}
        />
        {[39, 42.6, 46.2, 49.8].map((x, i) => (
          <rect
            key={i}
            x={x - 1}
            y={38.5}
            width={2}
            height={7}
            fill="#fff8d0"
            opacity="0.85"
            style={{
              animation: `twinkle 2.5s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}

        {/* Kubbe */}
        <path d="M36,37 L45,24 L54,37 Z" fill="#0d1825" />
        <path
          d="M37.5,37 L45,26.5 L52.5,37 Z"
          fill="none"
          stroke="#22344a"
          strokeWidth={0.4}
        />

        {/* Mızrak */}
        <line x1={45} y1={24} x2={45} y2={11} stroke="#3a4a60" strokeWidth={0.7} />
        <circle cx={45} cy={11} r={1.1} fill="#d4b26a" />
        <circle cx={45} cy={11} r={3} fill="#d4b26a" opacity="0.35" />

        {/* Fener glow halesi — çok katmanlı */}
        <circle cx={lanternX} cy={lanternY} r={11} fill="url(#lantern-glow)" opacity="0.9" />
        <circle cx={lanternX} cy={lanternY} r={22} fill="url(#lantern-glow)" opacity="0.45" />
        <circle cx={lanternX} cy={lanternY} r={42} fill="url(#lantern-glow)" opacity="0.2" />
        <circle cx={lanternX} cy={lanternY} r={70} fill="url(#lantern-glow)" opacity="0.08" />

        {/* Çekirdek fener noktası */}
        <circle cx={lanternX} cy={lanternY} r={1.8} fill="#fff8d0">
          <animate
            attributeName="opacity"
            values="0.92;1;0.92"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Dönen deniz feneri ışını — fener konumuna ankrajlı (lanternX/W = %50, lanternY/H ≈ %32) */}
      <div
        className="absolute"
        style={{
          left: `${(lanternX / W) * 100}%`,
          top: `${(lanternY / H) * 100}%`,
          width: 0,
          height: 0,
        }}
      >
        {/* Ana ışın */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "1px",
            height: "1px",
            transformOrigin: "0 0",
            animation: "lighthouse-beam 14s linear infinite",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "-7px",
              width: "560px",
              height: "14px",
              transformOrigin: "0 50%",
              background:
                "linear-gradient(90deg, rgba(255,248,208,0.7) 0%, rgba(240,216,150,0.35) 30%, rgba(212,178,106,0.12) 70%, transparent 100%)",
              filter: "blur(4px)",
              mixBlendMode: "screen",
              clipPath: "polygon(0 45%, 100% 0%, 100% 100%, 0 55%)",
            }}
          />
        </div>
        {/* Karşı ışın */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "1px",
            height: "1px",
            transformOrigin: "0 0",
            animation: "lighthouse-beam 14s linear infinite",
            animationDelay: "-7s",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "-5px",
              width: "440px",
              height: "10px",
              transformOrigin: "0 50%",
              background:
                "linear-gradient(90deg, rgba(255,248,208,0.4) 0%, rgba(240,216,150,0.16) 40%, transparent 100%)",
              filter: "blur(5px)",
              mixBlendMode: "screen",
              clipPath: "polygon(0 45%, 100% 0%, 100% 100%, 0 55%)",
              opacity: 0.7,
            }}
          />
        </div>
      </div>

      {/* Sudaki uzun titrek altın yansıma — adanın altından aşağı sarkar */}
      <div
        className="absolute"
        style={{
          left: "50%",
          bottom: "-22%",
          width: "55%",
          height: "30%",
          transform: "translateX(-50%)",
          mixBlendMode: "screen",
        }}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          {[8, 22, 38, 56, 76].map((y, i) => (
            <ellipse
              key={i}
              cx={50}
              cy={y}
              rx={40 - i * 6}
              ry={1.2}
              fill="#d4b26a"
              opacity={0.55 - i * 0.09}
              style={{
                animation: `bridge-reflection ${4 + (i % 3)}s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
