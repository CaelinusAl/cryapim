"use client";

import { useTheme } from "@/components/theme/ThemeProvider";

/**
 * BosphorusBackdrop — İstanbul Boğazı, gündüz veya gece.
 *
 * Site geneli sabit (fixed) arka plan: tüm sayfalarda viewport'a
 * yapışık durur, içerik üstüne scroll yapar — bir tiyatro perdesi.
 *
 * Gece teması (default):
 *   1) Gece moru → boğaz mavisi gökyüzü gradyanı
 *   2) Mor/pembe atmosfer halesi (köprünün yansıması)
 *   3) Yıldızlar
 *   4-5) Anadolu + Avrupa silüetleri + sıcak pencere ışıkları
 *   6) Boğaz Köprüsü — mor/pembe LED hatları + havacılık lambası
 *   7) Deniz + hologram tarama çizgileri
 *   8) Boat/buoy seyir ışıkları (yeşil + beyaz + kırmızı)
 *   9) Yansımalar
 *  10) Kız Kulesi + dönen fener ışını
 *
 * Gündüz teması:
 *   1) Açık mavi gökyüzü → soft altın ufuk
 *   2) Sıcak altın atmosfer halesi (güneş ışığı)
 *   3) Yıldızlar gizli, holografi sönük, LED'ler kapalı
 *   4) Şehir silüetleri belirgin ama ışıksız
 *   5) Kız Kulesi gündüz aydınlığında — fener çok hafif
 *
 * Tema kullanıcı tıklamasıyla değişir; ThemeProvider'da localStorage'a
 * kaydedilir. Geçişler `transition` ile yumuşak.
 */
export function BosphorusBackdrop() {
  const { theme } = useTheme();
  const isDay = theme === "day";

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ transition: "background 1.2s ease" }}
    >
      {/* 1) Gökyüzü — temaya göre değişir */}
      <div
        className="absolute inset-0"
        style={{
          background: isDay
            ? "linear-gradient(180deg, #cfe9f5 0%, #b9dff0 22%, #a4d3e8 48%, #c8d8e0 70%, #e8d8b0 88%, #f0d090 100%)"
            : "linear-gradient(180deg, #060514 0%, #0a0a22 22%, #0d1438 48%, #122550 68%, #163565 86%, #1a4178 100%)",
          transition: "background 1.4s ease",
        }}
      />

      {/* 2) Atmosfer halesi — gece mor/pembe, gündüz altın güneş */}
      <div
        className="absolute inset-x-0"
        style={{
          top: isDay ? "12%" : "32%",
          height: isDay ? "55%" : "40%",
          background: isDay
            ? "radial-gradient(ellipse 60% 50% at 70% 30%, rgba(255,224,150,0.55) 0%, rgba(255,200,120,0.30) 35%, transparent 70%)"
            : "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(155,93,229,0.18) 0%, rgba(241,91,181,0.10) 35%, transparent 70%)",
          filter: "blur(20px)",
          transition: "all 1.4s ease",
        }}
      />

      {/* Gündüz güneşi — sağ üstte yumuşak halka */}
      {isDay && (
        <div
          className="absolute"
          style={{
            top: "8%",
            right: "14%",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,248,210,1) 0%, rgba(255,228,160,0.7) 30%, rgba(255,200,120,0.3) 60%, transparent 80%)",
            filter: "blur(8px)",
            mixBlendMode: "screen",
          }}
        />
      )}

      {/* 3) Yıldızlar — gündüzde gizli */}
      <div
        style={{
          opacity: isDay ? 0 : 1,
          transition: "opacity 1.2s ease",
        }}
      >
        <Stars />
      </div>

      {/* 4) Uzak Anadolu yakası */}
      <svg
        viewBox="0 0 1600 600"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 top-[34%] h-[26%] w-full"
      >
        <path
          d="M0,420 L80,380 L140,400 L220,360 L260,380 L340,330 L420,380 L500,350 L600,390 L700,370 L820,330 L920,380 L1020,360 L1120,400 L1240,350 L1360,390 L1480,370 L1600,380 L1600,600 L0,600 Z"
          fill={isDay ? "#7a8ea5" : "#0a1428"}
          opacity={isDay ? 0.55 : 0.55}
          style={{ transition: "fill 1.2s ease" }}
        />
        {!isDay && (
          <ShoreLights count={70} yMin={395} yMax={485} sizeMin={0.6} sizeMax={1.2} seed={11} />
        )}
      </svg>

      {/* 5) Yakın Avrupa yakası */}
      <svg
        viewBox="0 0 1600 600"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 top-[42%] h-[22%] w-full"
      >
        <path
          d="M0,440 L60,420 L120,440 L200,400 L280,430 L360,395 L440,420 L520,385 L620,425 L720,400 L820,385 L920,415 L1020,385 L1120,425 L1240,395 L1360,420 L1480,400 L1600,420 L1600,600 L0,600 Z"
          fill={isDay ? "#5b6f88" : "#04101a"}
          opacity={isDay ? 0.85 : 0.85}
          style={{ transition: "fill 1.2s ease" }}
        />
        {!isDay && (
          <ShoreLights count={90} yMin={415} yMax={520} sizeMin={0.8} sizeMax={1.5} seed={29} />
        )}
      </svg>

      {/* 6) Boğaz Köprüsü */}
      <BosphorusBridge isDay={isDay} />

      {/* 7) Deniz */}
      <Sea isDay={isDay} />

      {/* 8) Tekne / şamandıra ışıkları — gündüzde sönük */}
      <div
        style={{
          opacity: isDay ? 0.15 : 1,
          transition: "opacity 1.2s ease",
        }}
      >
        <SeaLights />
      </div>

      {/* 9) Yansımalar — gündüzde gizli */}
      <div
        style={{
          opacity: isDay ? 0 : 1,
          transition: "opacity 1.2s ease",
        }}
      >
        <Reflections />
      </div>

      {/* 10) Kız Kulesi */}
      <MaidensTower isDay={isDay} />

      {/* 11) Vinyet — kenar kararması, gündüzde çok yumuşak */}
      <div
        className="absolute inset-0"
        style={{
          background: isDay
            ? "radial-gradient(ellipse at 50% 55%, transparent 60%, rgba(120,90,60,0.18) 100%)"
            : "radial-gradient(ellipse at 50% 55%, transparent 45%, rgba(0,0,0,0.55) 100%)",
          transition: "background 1.4s ease",
        }}
      />
    </div>
  );
}

/* ---------- Şehir / yaka pencere ışıkları ---------- */
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
    "#e8c878",
    "#d4b26a",
    "#e8c878",
    "#f0d896",
    "#d4b26a",
    "#e8c878",
    "#f0e8d0",
    "#e9e6dc",
    "#ffffff",
    "#c9d4e0",
    "#a8c8d8",
    "#e8c878",
    "#d4b26a",
    "#9fdfa0",
    "#e8c878",
    "#ffffff",
    "#d4b26a",
  ];
  const lights = Array.from({ length: count }, (_, i) => {
    const k = (i * 137 + seed * 53) % 9973;
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
  const lights = [
    { x: 18, y: 64, color: "#5af070", size: 1.6, delay: "0s", dur: "5s" },
    { x: 28, y: 58, color: "#ffffff", size: 1.2, delay: "0.4s", dur: "4.5s" },
    { x: 42, y: 72, color: "#5af070", size: 1.4, delay: "1.2s", dur: "6s" },
    { x: 55, y: 50, color: "#ffffff", size: 1.0, delay: "0.8s", dur: "5s" },
    { x: 62, y: 78, color: "#5af070", size: 1.5, delay: "2.0s", dur: "6s" },
    { x: 70, y: 46, color: "#ffffff", size: 1.1, delay: "1.5s", dur: "4s" },
    { x: 78, y: 84, color: "#5af070", size: 1.3, delay: "0.3s", dur: "5.5s" },
    { x: 85, y: 56, color: "#ffffff", size: 1.4, delay: "1.0s", dur: "5s" },
    { x: 92, y: 68, color: "#5af070", size: 1.2, delay: "1.8s", dur: "6s" },
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
function BosphorusBridge({ isDay }: { isDay: boolean }) {
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

  // LED ışıklar — gündüzde çok sönük
  const DECK_LIGHTS = 80;
  const deckLights = Array.from({ length: DECK_LIGHTS }, (_, i) => {
    const t = i / (DECK_LIGHTS - 1);
    const x = 200 + t * 1200;
    const r = Math.round(155 + (241 - 155) * t);
    const g = Math.round(93 + (91 - 93) * t);
    const b = Math.round(229 + (181 - 229) * t);
    const color = `rgb(${r},${g},${b})`;
    const delay = (i * 0.07) % 3;
    return { x, color, delay };
  });

  // Tema renkleri
  const cableColor = isDay ? "#6a7a8e" : "url(#cable-gradient)";
  const cableOpacity = isDay ? 0.7 : 1;
  const hangerColor = isDay ? "#5a6a82" : "#243a5a";
  const hangerOpacity = isDay ? 0.55 : 0.65;
  const towerFill = isDay ? "#6c7a8c" : "#0a121e";
  const towerCross = isDay ? "#7a8898" : "#0c1726";

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

      {/* Hangerlar */}
      <g
        stroke={hangerColor}
        strokeWidth="0.7"
        opacity={hangerOpacity}
        style={{ transition: "stroke 1.2s ease, opacity 1.2s ease" }}
      >
        {hangers.map((h, i) => (
          <line key={i} x1={h.x} y1={h.y} x2={h.x} y2={deckY} />
        ))}
      </g>

      {/* Ana asma kablo */}
      <g fill="none" strokeLinecap="round">
        <path
          d={`M 60 ${deckY + 10} Q 230 ${deckY - 80} ${leftX} ${towerTop}`}
          stroke={cableColor}
          strokeWidth="1.6"
          opacity={cableOpacity * 0.7}
        />
        <path
          d={`M ${leftX} ${towerTop} Q 800 470 ${rightX} ${towerTop}`}
          stroke={cableColor}
          strokeWidth="2"
          opacity={cableOpacity}
        />
        <path
          d={`M ${rightX} ${towerTop} Q 1370 ${deckY - 80} 1540 ${deckY + 10}`}
          stroke={cableColor}
          strokeWidth="1.6"
          opacity={cableOpacity * 0.7}
        />
      </g>

      <Tower x={leftX} top={towerTop} bottom={deckY + 30} fill={towerFill} cross={towerCross} />
      <Tower x={rightX} top={towerTop} bottom={deckY + 30} fill={towerFill} cross={towerCross} />

      {/* Deck */}
      <g style={{ opacity: isDay ? 0.2 : 1, transition: "opacity 1.2s ease" }}>
        <rect
          x="200"
          y={deckY - 1}
          width="1200"
          height="3"
          fill="url(#deck-glow)"
          filter="url(#strong-glow)"
          opacity="0.85"
        />
        <rect
          x="200"
          y={deckY}
          width="1200"
          height="2.4"
          fill="url(#deck-glow)"
          filter="url(#deck-blur)"
        />
        <rect x="200" y={deckY + 2} width="1200" height="0.8" fill="#0a1018" />
      </g>

      {/* Gündüz: gri deck siluetii */}
      {isDay && (
        <rect
          x="200"
          y={deckY - 0.5}
          width="1200"
          height="2.6"
          fill="#5a6a82"
          opacity="0.75"
        />
      )}

      {/* Deck LED ışıkları — gündüzde gizli */}
      {!isDay && (
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
      )}

      {/* Havacılık lambası — gündüzde de yanar (gerçek) */}
      <circle
        cx={leftX}
        cy={towerTop - 6}
        r="2"
        fill="#ff3a3a"
        opacity={isDay ? 0.55 : 1}
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
        opacity={isDay ? 0.55 : 1}
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
  fill,
  cross,
}: {
  x: number;
  top: number;
  bottom: number;
  fill: string;
  cross: string;
}) {
  const w = 8;
  const left = x - w / 2;
  return (
    <g style={{ transition: "fill 1.2s ease" }}>
      <rect x={left - 3} y={top} width="3" height={bottom - top} fill={fill} />
      <rect x={left + w} y={top} width="3" height={bottom - top} fill={fill} />
      <rect x={left - 5} y={top + 6} width={w + 10} height="2.2" fill={cross} />
      <rect
        x={left - 5}
        y={top + (bottom - top) * 0.5}
        width={w + 10}
        height="1.8"
        fill={cross}
      />
      <rect x={left - 3.4} y={top} width="0.8" height={bottom - top} fill="#9b5de5" opacity="0.3" />
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
function Sea({ isDay }: { isDay: boolean }) {
  return (
    <div className="absolute inset-x-0 bottom-0 h-[40%] overflow-hidden">
      {/* Temel deniz gradyanı */}
      <div
        className="absolute inset-0"
        style={{
          background: isDay
            ? "linear-gradient(180deg, #5fb7c8 0%, #3d8fa8 35%, #2c6b85 70%, #1f4d63 100%)"
            : "linear-gradient(180deg, #0c2540 0%, #081930 40%, #050e1d 80%, #03070f 100%)",
          transition: "background 1.4s ease",
        }}
      />

      {/* Köprünün suya yansıması — gündüzde gizli */}
      <div
        className="absolute inset-x-0"
        style={{
          top: "0%",
          height: "30%",
          background:
            "linear-gradient(180deg, rgba(155,93,229,0.22) 0%, rgba(241,91,181,0.16) 40%, transparent 100%)",
          filter: "blur(8px)",
          animation: "bridge-reflection 4.5s ease-in-out infinite",
          mixBlendMode: "screen",
          opacity: isDay ? 0 : 1,
          transition: "opacity 1.2s ease",
        }}
      />

      {/* Gündüz: Güneşin sudaki altın yansıması */}
      {isDay && (
        <div
          className="absolute inset-x-0"
          style={{
            top: "0%",
            height: "60%",
            background:
              "radial-gradient(ellipse 30% 100% at 70% 0%, rgba(255,228,160,0.65) 0%, rgba(255,200,120,0.3) 30%, transparent 70%)",
            mixBlendMode: "screen",
            filter: "blur(4px)",
          }}
        />
      )}

      {/* Hologram tarama çizgileri — gündüzde gizli */}
      <div
        style={{ opacity: isDay ? 0 : 1, transition: "opacity 1.2s ease" }}
      >
        <HologramScans />
      </div>

      {/* Yatay sıvı parıltı */}
      <div
        className="absolute inset-0"
        style={{
          background: isDay
            ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 35%, rgba(255,255,255,0.32) 50%, rgba(255,255,255,0.18) 65%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, rgba(159,231,255,0.10) 35%, rgba(159,231,255,0.18) 50%, rgba(159,231,255,0.10) 65%, transparent 100%)",
          mixBlendMode: "screen",
          animation: "liquid-shimmer 8s ease-in-out infinite alternate",
          transition: "background 1.4s ease",
        }}
      />

      {/* Ön plan dalga çizgileri */}
      <svg
        viewBox="0 0 1600 200"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 h-[70%] w-full"
        style={{ opacity: isDay ? 0.55 : 0.5 }}
      >
        {[20, 50, 80, 110, 140, 170].map((y, i) => (
          <path
            key={i}
            d={`M0,${y} Q200,${y - 5} 400,${y} T800,${y} T1200,${y} T1600,${y}`}
            fill="none"
            stroke={isDay ? "#a8d8ec" : "#1f4a73"}
            strokeOpacity={0.45 - i * 0.06}
            strokeWidth={0.7}
          />
        ))}
        {/* Cyan vurgu çizgisi — gündüzde gizli */}
        {!isDay && (
          <path
            d="M0,95 Q200,90 400,95 T800,95 T1200,95 T1600,95"
            fill="none"
            stroke="#9fe7ff"
            strokeOpacity="0.35"
            strokeWidth="0.6"
            style={{ filter: "drop-shadow(0 0 3px #9fe7ff)" }}
          />
        )}
      </svg>

      {/* Hologram grid — gündüzde gizli */}
      {!isDay && (
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
      )}
    </div>
  );
}

function HologramScans() {
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

/* ---------- Yansımalar (gece-özel) ---------- */
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

/* ---------- Kız Kulesi ---------- */
function MaidensTower({ isDay }: { isDay: boolean }) {
  const W = 90;
  const H = 130;

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

  const lanternX = 45;
  const lanternY = 42;

  // Tema renkleri
  const bodyFill = isDay ? "#c8a878" : "#0e1a28";
  const bodyStroke = isDay ? "#8a6f4a" : "#1c2c40";
  const islandColor = isDay ? "#6a5848" : "#070d18";
  const islandColor2 = isDay ? "#7a6852" : "#0d1620";
  const ringColor = isDay ? "#8a6f4a" : "#142031";
  const ringColor2 = isDay ? "#a48868" : "#22344a";
  const lanternBox = isDay ? "#a48868" : "#1a2940";
  const lanternBoxStroke = isDay ? "#7a5e40" : "#2a3a55";
  const domeColor = isDay ? "#7a5e40" : "#0d1825";
  const domeStroke = isDay ? "#a48868" : "#22344a";

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        right: "14%",
        bottom: "18%",
        width: "clamp(140px, 14vw, 220px)",
        aspectRatio: `${W} / ${H}`,
      }}
    >
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

        {/* Su altındaki halka — gündüzde sönük */}
        {!isDay && <ellipse cx={45} cy={117} rx={42} ry={8} fill="url(#tower-island-glow)" />}

        {/* Ada */}
        <ellipse cx={45} cy={114} rx={28} ry={3.5} fill={islandColor} style={{ transition: "fill 1.2s ease" }} />
        <ellipse cx={45} cy={112.5} rx={25} ry={3} fill={islandColor2} style={{ transition: "fill 1.2s ease" }} />

        {/* Sıcak spot — gece-özel */}
        {!isDay && <ellipse cx={45} cy={104} rx={20} ry={10} fill="#d4b26a" opacity="0.14" />}

        {/* Kule gövdesi */}
        <rect x={32} y={50} width={26} height={62} fill={bodyFill} style={{ transition: "fill 1.2s ease" }} />
        <rect
          x={32}
          y={50}
          width={26}
          height={62}
          fill="none"
          stroke={bodyStroke}
          strokeWidth={0.5}
        />

        {/* Pencereler — gündüzde koyu, gece ışıklı */}
        {windows.map((w, i) => (
          <g key={i} style={{ opacity: isDay ? 0.5 : 1, transition: "opacity 1.2s ease" }}>
            <rect
              x={w.x - 1.2}
              y={w.y - 1.6}
              width={2.4}
              height={3.2}
              fill={isDay ? "#5a4a3a" : w.c}
              style={
                isDay
                  ? undefined
                  : {
                      animation: `twinkle ${3 + (i % 4)}s ease-in-out ${(i * 0.4) % 3}s infinite`,
                    }
              }
            />
            {!isDay && (
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
            )}
          </g>
        ))}

        {/* Üst halka */}
        <rect x={29} y={47} width={32} height={3.6} fill={ringColor} style={{ transition: "fill 1.2s ease" }} />
        <rect x={29} y={46.4} width={32} height={0.8} fill={ringColor2} style={{ transition: "fill 1.2s ease" }} />

        {/* Fener bölmesi */}
        <rect x={37} y={37} width={16} height={10} fill={lanternBox} style={{ transition: "fill 1.2s ease" }} />
        <rect
          x={37}
          y={37}
          width={16}
          height={10}
          fill="none"
          stroke={lanternBoxStroke}
          strokeWidth={0.4}
        />
        {[39, 42.6, 46.2, 49.8].map((x, i) => (
          <rect
            key={i}
            x={x - 1}
            y={38.5}
            width={2}
            height={7}
            fill={isDay ? "#e8d090" : "#fff8d0"}
            opacity={isDay ? 0.6 : 0.85}
            style={
              isDay
                ? undefined
                : {
                    animation: `twinkle 2.5s ease-in-out ${i * 0.2}s infinite`,
                  }
            }
          />
        ))}

        {/* Kubbe */}
        <path d="M36,37 L45,24 L54,37 Z" fill={domeColor} style={{ transition: "fill 1.2s ease" }} />
        <path
          d="M37.5,37 L45,26.5 L52.5,37 Z"
          fill="none"
          stroke={domeStroke}
          strokeWidth={0.4}
        />

        {/* Mızrak */}
        <line x1={45} y1={24} x2={45} y2={11} stroke={isDay ? "#6a5840" : "#3a4a60"} strokeWidth={0.7} />
        <circle cx={45} cy={11} r={1.1} fill="#d4b26a" />
        <circle cx={45} cy={11} r={3} fill="#d4b26a" opacity="0.35" />

        {/* Fener glow halesi — gündüzde çok sönük */}
        <g style={{ opacity: isDay ? 0.25 : 1, transition: "opacity 1.2s ease" }}>
          <circle cx={lanternX} cy={lanternY} r={11} fill="url(#lantern-glow)" opacity="0.9" />
          <circle cx={lanternX} cy={lanternY} r={22} fill="url(#lantern-glow)" opacity="0.45" />
          <circle cx={lanternX} cy={lanternY} r={42} fill="url(#lantern-glow)" opacity="0.2" />
          <circle cx={lanternX} cy={lanternY} r={70} fill="url(#lantern-glow)" opacity="0.08" />
        </g>

        <circle cx={lanternX} cy={lanternY} r={1.8} fill="#fff8d0" opacity={isDay ? 0.7 : 1}>
          <animate
            attributeName="opacity"
            values={isDay ? "0.7;0.85;0.7" : "0.92;1;0.92"}
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Dönen deniz feneri ışını — gündüzde gizli */}
      {!isDay && (
        <div
          className="absolute"
          style={{
            left: `${(lanternX / W) * 100}%`,
            top: `${(lanternY / H) * 100}%`,
            width: 0,
            height: 0,
          }}
        >
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
      )}

      {/* Sudaki uzun titrek altın yansıma — gündüzde sönük */}
      <div
        className="absolute"
        style={{
          left: "50%",
          bottom: "-22%",
          width: "55%",
          height: "30%",
          transform: "translateX(-50%)",
          mixBlendMode: "screen",
          opacity: isDay ? 0.35 : 1,
          transition: "opacity 1.2s ease",
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
