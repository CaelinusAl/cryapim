"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import { programs, type Program } from "@/data/programs";
import { PlatoScene } from "./PlatoScene";

/**
 * PlatoExperience — 3D plato + sağda yan panel.
 *
 * Sahnede kameralara tıklandığında ilgili program seçilir; sağ panel
 * o programa kayar. Mobilde panel altta açılır.
 */
export function PlatoExperience() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selected: Program | undefined = selectedSlug
    ? programs.find((p) => p.slug === selectedSlug)
    : undefined;

  return (
    <div className="grid lg:grid-cols-[1fr_320px] min-h-[600px]">
      <div className="relative aspect-[16/10] lg:aspect-auto bg-gradient-to-b from-[#040714] to-[#02040a]">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [10, 6, 14], fov: 38 }}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={["#02040a"]} />
          <fog attach="fog" args={["#040714", 18, 50]} />
          <Suspense fallback={null}>
            <Stars
              radius={80}
              depth={50}
              count={1200}
              factor={3}
              fade
              speed={0.4}
            />
            <Environment preset="night" />
            <PlatoScene
              programs={programs}
              selectedSlug={selectedSlug}
              onSelect={setSelectedSlug}
            />
          </Suspense>
          <OrbitControls
            makeDefault
            enablePan={false}
            minDistance={9}
            maxDistance={22}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            target={[0, 1, -1]}
            autoRotate={!selectedSlug}
            autoRotateSpeed={0.35}
          />
        </Canvas>

        {/* Hover hint */}
        <div className="absolute top-4 left-4 mono-tag text-mist-300/70 pointer-events-none">
          sürükle · döndür · yakınlaş
        </div>
        <div className="absolute bottom-4 right-4 mono-tag text-mist-500/70 pointer-events-none">
          plato v0.1 — eskiz maketi
        </div>
      </div>

      <aside className="bg-night-900/70 backdrop-blur p-6 lg:p-7 lg:border-l border-mist-500/15 flex flex-col">
        {selected ? (
          <SelectedProgram program={selected} onClose={() => setSelectedSlug(null)} />
        ) : (
          <PlatoIntro />
        )}
      </aside>
    </div>
  );
}

function PlatoIntro() {
  return (
    <div className="crane-in space-y-5">
      <p className="mono-tag text-tower-gold/80">plato rehberi</p>
      <p className="editorial text-2xl text-mist-100 leading-snug">
        Sahnedeki altı kameraya tıkla.
      </p>
      <p className="text-sm text-mist-300 leading-relaxed">
        Her kamera bir programın platodaki sabit köşesini işaret ediyor.
        Tıkladığında sağda o programın bilgisi açılır; sahne o noktaya doğru
        eğilir.
      </p>

      <div className="border border-mist-500/15 rounded-2xl p-4 mt-2">
        <p className="mono-tag text-mist-500">arka plan</p>
        <p className="editorial-italic text-mist-100 mt-1 leading-snug">
          Boğaz, Kız Kulesi, gece. Saat dilimi geliştikçe ışık değişecek.
        </p>
      </div>

      <ul className="space-y-2 mt-2">
        {programs.map((p) => (
          <li key={p.slug} className="flex items-center gap-3 text-sm">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: p.accent, boxShadow: `0 0 10px ${p.accent}` }}
            />
            <span className="text-mist-100">{p.title}</span>
            <span className="ml-auto mono-tag text-mist-500">
              {p.platoSeat.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SelectedProgram({
  program,
  onClose,
}: {
  program: Program;
  onClose: () => void;
}) {
  return (
    <div className="crane-in space-y-5">
      <div className="flex items-center justify-between">
        <p className="mono-tag" style={{ color: program.accent }}>
          {program.platoSeat.label}
        </p>
        <button
          onClick={onClose}
          className="mono-tag text-mist-500 hover:text-mist-100 transition-colors"
          aria-label="Seçimi temizle"
        >
          × bırak
        </button>
      </div>

      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
        style={{
          color: program.accent,
          border: `1px solid ${program.accent}aa`,
          boxShadow: `0 0 30px -8px ${program.accent}`,
        }}
      >
        {program.symbol}
      </div>

      <h3 className="editorial text-3xl text-mist-100 leading-tight">
        {program.title}
      </h3>
      <p
        className="editorial-italic text-base leading-snug"
        style={{ color: program.accent }}
      >
        “{program.tagline}”
      </p>

      <p className="text-sm text-mist-300 leading-relaxed">
        {program.description}
      </p>

      <div className="border-t border-mist-500/15 pt-4">
        <p className="mono-tag text-mist-500">yayın akışı</p>
        <p className="text-sm text-mist-100 mt-1">{program.cadence}</p>
      </div>

      <Link
        href={`/yapimlar/${program.slug}`}
        className="mono-tag inline-flex items-center justify-center gap-2 mt-3 px-4 py-2.5 rounded-full transition-colors"
        style={{
          background: `${program.accent}22`,
          color: program.accent,
          border: `1px solid ${program.accent}55`,
        }}
      >
        Programa git →
      </Link>
    </div>
  );
}
