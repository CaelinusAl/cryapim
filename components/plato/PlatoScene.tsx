"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";
import type { Program } from "@/data/programs";

/**
 * PlatoScene — Boğaz manzaralı plato maketi.
 *
 * Sahne kompozisyonu (yukarıdan bakış):
 *
 *   [Boğaz / deniz düzlemi — Z negatif yönde uzar]
 *      [Kız Kulesi — sahnenin tam ortasında, denizde]
 *   [Plato döşemesi (yarım daire) — kameraların üzerinde durduğu sahne]
 *      [6 program kamerası — sahnenin perimetresinde dağıtılmış]
 *      [Merkez sufle ışığı — Caelinus AI'ı temsil eden cyan glow]
 *
 * Her kamera bir programı temsil eder; tıklandığında onSelect tetiklenir.
 * Seçildiğinde kamera yükselir ve renkli halesi büyür.
 */
export function PlatoScene({
  programs,
  selectedSlug,
  onSelect,
}: {
  programs: Program[];
  selectedSlug: string | null;
  onSelect: (slug: string | null) => void;
}) {
  return (
    <>
      {/* Genel sahne ışığı — soğuk gece tonu */}
      <ambientLight intensity={0.15} color="#5a6b8a" />

      {/* Ay ışığı — sahnenin sol-üstünden gelir */}
      <directionalLight
        position={[-8, 12, 6]}
        intensity={0.6}
        color="#c8d6f0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Sıcak vurgu — Kız Kulesi tarafından gelen sıcak ışık */}
      <pointLight
        position={[0, 2, -8]}
        intensity={1.2}
        color="#d4b26a"
        distance={20}
        decay={2}
      />

      {/* Caelinus AI sufle — sahnenin tam ortasında cyan nefes */}
      <pointLight
        position={[0, 3, 0]}
        intensity={0.8}
        color="#9fe7ff"
        distance={10}
        decay={2}
      />

      {/* Deniz düzlemi */}
      <Sea />

      {/* Kız Kulesi */}
      <MaidensTower position={[0, 0, -8]} />

      {/* Uzak yaka silüeti */}
      <DistantShore />

      {/* Plato — sahnenin döşemesi */}
      <Stage />

      {/* Merkezdeki sufle — Caelinus AI prizmation */}
      <CaelinusBeacon />

      {/* 6 program kamerası */}
      {programs.map((p) => (
        <ProgramCamera
          key={p.slug}
          program={p}
          selected={selectedSlug === p.slug}
          onSelect={() => onSelect(p.slug)}
        />
      ))}
    </>
  );
}

/* ---------- Atomic parçalar ---------- */

function Sea() {
  // Hafif yansıyan, çok koyu bir düzlem; deniz hissi için animasyonlu offset
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const m = ref.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.02 + Math.sin(clock.elapsedTime * 0.4) * 0.01;
    }
  });
  return (
    <mesh
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.05, -6]}
      receiveShadow
    >
      <planeGeometry args={[60, 40, 1, 1]} />
      <meshStandardMaterial
        color="#0a1828"
        roughness={0.4}
        metalness={0.6}
        emissive="#0a1c30"
        emissiveIntensity={0.03}
      />
    </mesh>
  );
}

function MaidensTower({ position }: { position: [number, number, number] }) {
  // Sade bir kule + kubbe + tek sıcak ışık (lantern)
  return (
    <group position={position}>
      {/* Kayalık ada */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.4, 1.7, 0.2, 24]} />
        <meshStandardMaterial color="#0a1018" roughness={0.95} />
      </mesh>
      {/* Kule gövdesi */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.6, 1.8, 24]} />
        <meshStandardMaterial color="#1a232f" roughness={0.7} />
      </mesh>
      {/* Üst halka */}
      <mesh position={[0, 2.05, 0]} castShadow>
        <cylinderGeometry args={[0.65, 0.55, 0.18, 24]} />
        <meshStandardMaterial color="#222d3a" roughness={0.7} />
      </mesh>
      {/* Kubbe */}
      <mesh position={[0, 2.45, 0]} castShadow>
        <coneGeometry args={[0.6, 0.7, 24]} />
        <meshStandardMaterial color="#0f1825" roughness={0.6} />
      </mesh>
      {/* Mızrak */}
      <mesh position={[0, 3.05, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
        <meshStandardMaterial color="#3a4555" />
      </mesh>
      {/* Tepedeki nokta */}
      <mesh position={[0, 3.32, 0]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial
          color="#d4b26a"
          emissive="#d4b26a"
          emissiveIntensity={2}
        />
      </mesh>
      {/* Fener — kuleden sıcak ışık */}
      <pointLight
        position={[0, 1.6, 0]}
        intensity={1.4}
        color="#d4b26a"
        distance={8}
        decay={2}
      />
      <Float speed={1.2} rotationIntensity={0} floatIntensity={0.3}>
        <Html position={[0, 3.7, 0]} center distanceFactor={14}>
          <div className="mono-tag text-tower-gold/80 whitespace-nowrap">
            Kız Kulesi
          </div>
        </Html>
      </Float>
    </group>
  );
}

function DistantShore() {
  // Boğazın iki yakasını temsil eden uzak düzgünsüz silüet
  const points: [number, number, number][] = [];
  for (let i = -25; i <= 25; i += 1.2) {
    const h = 0.4 + Math.abs(Math.sin(i * 0.7) * 0.6) + Math.cos(i * 0.31) * 0.3;
    points.push([i, h, 0]);
  }
  return (
    <group position={[0, 0, -16]}>
      {points.map(([x, h], i) => (
        <mesh key={i} position={[x, h / 2, 0]}>
          <boxGeometry args={[1.1, h, 0.6]} />
          <meshStandardMaterial color="#070d18" roughness={1} />
        </mesh>
      ))}
      {/* Uzak yaka pencere ışıkları */}
      {points
        .filter((_, i) => i % 5 === 0)
        .map(([x, h], i) => (
          <mesh key={`l${i}`} position={[x, h * 0.6, 0.31]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color="#d4b26a"
              emissive="#d4b26a"
              emissiveIntensity={3}
            />
          </mesh>
        ))}
    </group>
  );
}

function Stage() {
  // Yarım daire döşeme — sahne hissi
  return (
    <group>
      {/* Ana döşeme */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[0, 7, 64, 1, -Math.PI, Math.PI]} />
        <meshStandardMaterial
          color="#13111e"
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>
      {/* İnce altın kenar */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6.85, 7, 64, 1, -Math.PI, Math.PI]} />
        <meshStandardMaterial
          color="#d4b26a"
          emissive="#d4b26a"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

function CaelinusBeacon() {
  // Sahnenin tam ortasında nefes alan cyan halka — Caelinus AI sufle
  const beaconRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (beaconRef.current) {
      const m = beaconRef.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 1.6 + Math.sin(t * 1.4) * 0.6;
    }
    if (ringRef.current) {
      ringRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.1);
      ringRef.current.rotation.z = t * 0.2;
    }
  });
  return (
    <group position={[0, 0, -1]}>
      <mesh ref={beaconRef} position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial
          color="#9fe7ff"
          emissive="#9fe7ff"
          emissiveIntensity={2}
        />
      </mesh>
      <mesh
        ref={ringRef}
        position={[0, 0.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.38, 0.46, 48]} />
        <meshStandardMaterial
          color="#9fe7ff"
          emissive="#9fe7ff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Html position={[0, 0.6, 0]} center distanceFactor={12}>
        <div className="mono-tag text-ai-cyan whitespace-nowrap">
          Caelinus AI · sufle
        </div>
      </Html>
    </group>
  );
}

function ProgramCamera({
  program,
  selected,
  onSelect,
}: {
  program: Program;
  selected: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (groupRef.current) {
      // Seçili kamera hafifçe yukarı kalkar; hover'da titrek bir nefes
      const targetY = selected ? 0.6 : hovered ? 0.25 : 0.1;
      groupRef.current.position.y +=
        (targetY - groupRef.current.position.y) * 0.12;
      // Sahne ortasına doğru bakacak
      const target = new THREE.Vector3(0, 1, -1);
      groupRef.current.lookAt(target);
    }
    if (haloRef.current) {
      const m = haloRef.current.material as THREE.MeshStandardMaterial;
      const base = selected ? 1.4 : hovered ? 0.9 : 0.5;
      m.emissiveIntensity = base + Math.sin(t * 1.6 + program.platoSeat.x) * 0.2;
      const targetScale = selected ? 1.8 : hovered ? 1.3 : 1;
      haloRef.current.scale.x +=
        (targetScale - haloRef.current.scale.x) * 0.15;
      haloRef.current.scale.y = haloRef.current.scale.x;
      haloRef.current.scale.z = haloRef.current.scale.x;
    }
  });

  const accent = program.accent;

  return (
    <group
      ref={groupRef}
      position={[program.platoSeat.x, 0.1, program.platoSeat.z]}
    >
      {/* Tıklanabilir, görünmez büyük hit-area */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        position={[0, 0.6, 0]}
      >
        <sphereGeometry args={[0.9, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Tripod */}
      {([
        [0.18, -0.05, 0.18],
        [-0.18, -0.05, 0.18],
        [0, -0.05, -0.22],
      ] as const).map((leg, i) => (
        <mesh
          key={i}
          position={[leg[0] / 2, 0.3, leg[2] / 2]}
          rotation={[Math.atan2(leg[2], 0.6), 0, Math.atan2(leg[0], 0.6)]}
        >
          <cylinderGeometry args={[0.015, 0.015, 0.7, 8]} />
          <meshStandardMaterial color="#1a1f29" metalness={0.6} roughness={0.5} />
        </mesh>
      ))}
      {/* Tripod tepe */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#1a1f29" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Kamera gövdesi */}
      <group position={[0, 0.85, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.45, 0.32, 0.32]} />
          <meshStandardMaterial color="#0e131c" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Lens */}
        <mesh position={[0, 0, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.2, 24]} />
          <meshStandardMaterial color="#1a1f29" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Lens göz — programın renginde glow */}
        <mesh position={[0, 0, 0.33]}>
          <circleGeometry args={[0.09, 24]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={1.6}
          />
        </mesh>
        {/* REC LED (sıcak) */}
        <mesh position={[0.18, 0.1, 0.16]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshStandardMaterial
            color="#ff5747"
            emissive="#ff5747"
            emissiveIntensity={2.4}
          />
        </mesh>
      </group>

      {/* Ayak izindeki frekans halesi */}
      <mesh
        ref={haloRef}
        position={[0, -0.04, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.4, 0.55, 48]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.6}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Etiket */}
      {(hovered || selected) && (
        <Html position={[0, 1.5, 0]} center distanceFactor={10}>
          <div
            className="mono-tag whitespace-nowrap px-2 py-1 rounded-full"
            style={{
              color: accent,
              background: "rgba(7, 6, 15, 0.8)",
              border: `1px solid ${accent}55`,
              boxShadow: `0 0 18px -4px ${accent}`,
            }}
          >
            {program.title}
          </div>
        </Html>
      )}
    </group>
  );
}
