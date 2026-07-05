'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/* ---------------------------------- Tuning --------------------------------- */

const PARTICLE_COUNT = 14000;
const BASE_RADIUS = 1.6;
const HOLD_SECONDS = 5;
const MORPH_SECONDS = 2;
const STARFIELD_COUNT = 2600;
const STARFIELD_COLOR = 0x9fb4ff;
const BASE_POINT_SIZE = 0.045;
const POINT_SIZE_PULSE = 0.006;
const PARALLAX_DAMPING = 0.04;
const CAMERA_Z = 5.2;
const MAX_PIXEL_RATIO = 2;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

type Vec3 = [number, number, number];

/* -------------------------------- Math helpers ----------------------------- */

/** Deterministic pseudo-random in [0, 1) from a particle index and a seed. */
function seededRandom(index: number, seed: number): number {
  const n = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

/** Evenly distributed unit-sphere point (fibonacci / golden-spiral lattice). */
function fibonacciSpherePoint(index: number): Vec3 {
  const y = 1 - (index / (PARTICLE_COUNT - 1)) * 2;
  const radius = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = GOLDEN_ANGLE * index;
  return [Math.cos(theta) * radius, y, Math.sin(theta) * radius];
}

function rotateAroundX(v: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
}

function rotateAroundY(v: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
}

function lerpVec3(a: Vec3, b: Vec3, t: number): Vec3 {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

/** Quintic smoothstep easing (6t^5 - 15t^4 + 10t^3). */
function smoothstepQuintic(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/* ------------------------------ Form generators ----------------------------
 * Each generator fills `positions` and `colors` (PARTICLE_COUNT * 3 floats).
 * -------------------------------------------------------------------------- */

type FormGenerator = (positions: Float32Array, colors: Float32Array) => void;

/** Organic cell: noisy sphere shell with a small bright nucleus cluster. */
const generateCell: FormGenerator = (positions, colors) => {
  const membraneColor: Vec3 = [0.35, 1, 0.78];
  const nucleusColor: Vec3 = [0.75, 1, 0.85];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const point = fibonacciSpherePoint(i);
    let radius = BASE_RADIUS * (0.82 + 0.18 * seededRandom(i, 1));
    const isNucleus = seededRandom(i, 2) < 0.14;
    if (isNucleus) radius *= 0.34;
    const o = i * 3;
    positions[o] = point[0] * radius;
    positions[o + 1] = point[1] * radius;
    positions[o + 2] = point[2] * radius;
    const color = isNucleus
      ? nucleusColor
      : lerpVec3(membraneColor, nucleusColor, 0.15 * seededRandom(i, 3));
    colors[o] = color[0];
    colors[o + 1] = color[1];
    colors[o + 2] = color[2];
  }
};

/** Spiral galaxy: three logarithmic arms in a thin disc, warm dense core. */
const generateGalaxy: FormGenerator = (positions, colors) => {
  const coreColor: Vec3 = [1, 0.86, 0.55];
  const armColor: Vec3 = [0.55, 0.65, 1];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const radialT = seededRandom(i, 3);
    const radius = BASE_RADIUS * 1.55 * Math.sqrt(radialT);
    const arm = i % 3;
    const angle =
      radius * 2.7 + arm * ((2 * Math.PI) / 3) + (seededRandom(i, 4) - 0.5) * 0.55;
    const coreDensity = Math.exp(-radius * 1.5) * 0.55;
    const o = i * 3;
    positions[o] = Math.cos(angle) * radius;
    positions[o + 2] = Math.sin(angle) * radius;
    positions[o + 1] = (seededRandom(i, 5) - 0.5) * (0.05 + coreDensity);
    const color = lerpVec3(armColor, coreColor, coreDensity / 0.55);
    colors[o] = color[0];
    colors[o + 1] = color[1];
    colors[o + 2] = color[2];
  }
};

/** Iris/eye: flat radial disc, amber core to violet rim with radial striations. */
const generateEye: FormGenerator = (positions, colors) => {
  const irisCenterColor: Vec3 = [1, 0.72, 0.28];
  const irisRimColor: Vec3 = [0.55, 0.35, 0.9];
  const highlightColor: Vec3 = [0.85, 0.88, 1];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const radius = BASE_RADIUS * (0.24 + 0.76 * Math.sqrt(seededRandom(i, 6)));
    const angle = seededRandom(i, 7) * 2 * Math.PI;
    const depth =
      Math.sqrt(Math.max(0, BASE_RADIUS * BASE_RADIUS - radius * radius)) * 0.42;
    const o = i * 3;
    positions[o] = Math.cos(angle) * radius;
    positions[o + 1] = Math.sin(angle) * radius;
    positions[o + 2] = depth;
    const striation = 0.5 + 0.5 * Math.abs(Math.sin(angle * 9));
    const radialRatio = radius / BASE_RADIUS;
    let color = lerpVec3(irisCenterColor, irisRimColor, radialRatio ** 3);
    color = lerpVec3(color, highlightColor, 0.15 * striation * radialRatio);
    const brightness = 0.7 + 0.3 * striation;
    colors[o] = color[0] * brightness;
    colors[o + 1] = color[1] * brightness;
    colors[o + 2] = color[2] * brightness;
  }
};

/** Atom: small warm nucleus plus three tilted electron rings. */
const generateAtom: FormGenerator = (positions, colors) => {
  const nucleusColor: Vec3 = [1, 0.8, 0.5];
  const ringColor: Vec3 = [0.4, 0.85, 1];
  const ringTilts: Array<[number, number]> = [
    [0, 0],
    [1.05, 0.6],
    [-0.9, -0.7],
  ];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const o = i * 3;
    if (seededRandom(i, 8) < 0.2) {
      const point = fibonacciSpherePoint(i);
      const radius = BASE_RADIUS * 0.24 * (0.5 + 0.5 * seededRandom(i, 9));
      positions[o] = point[0] * radius;
      positions[o + 1] = point[1] * radius;
      positions[o + 2] = point[2] * radius;
      colors[o] = nucleusColor[0];
      colors[o + 1] = nucleusColor[1];
      colors[o + 2] = nucleusColor[2];
    } else {
      const ring = i % 3;
      const angle = seededRandom(i, 10) * 2 * Math.PI;
      const ringRadius = BASE_RADIUS * 1.5 + (seededRandom(i, 11) - 0.5) * 0.04;
      let point: Vec3 = [
        Math.cos(angle) * ringRadius,
        Math.sin(angle) * ringRadius,
        (seededRandom(i, 12) - 0.5) * 0.03,
      ];
      point = rotateAroundX(point, ringTilts[ring][0]);
      point = rotateAroundY(point, ringTilts[ring][1]);
      positions[o] = point[0];
      positions[o + 1] = point[1];
      positions[o + 2] = point[2];
      colors[o] = ringColor[0];
      colors[o + 1] = ringColor[1];
      colors[o + 2] = ringColor[2];
    }
  }
};

/** Egg: elongated shell with a violet spiral yolk inside. */
const generateEgg: FormGenerator = (positions, colors) => {
  const shellColor: Vec3 = [1, 0.93, 0.82];
  const yolkColor: Vec3 = [0.7, 0.45, 1];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const o = i * 3;
    if (seededRandom(i, 13) < 0.14) {
      const radialT = seededRandom(i, 14);
      const radius = BASE_RADIUS * 0.6 * Math.sqrt(radialT);
      const angle = radius * 4 + seededRandom(i, 15) * 6.28;
      positions[o] = Math.cos(angle) * radius * 0.6;
      positions[o + 2] = Math.sin(angle) * radius * 0.6;
      positions[o + 1] = (seededRandom(i, 16) - 0.5) * 0.5;
      colors[o] = yolkColor[0];
      colors[o + 1] = yolkColor[1];
      colors[o + 2] = yolkColor[2];
    } else {
      const point = fibonacciSpherePoint(i);
      const taper = 1 - 0.16 * point[1];
      positions[o] = point[0] * BASE_RADIUS * 0.74 * taper;
      positions[o + 2] = point[2] * BASE_RADIUS * 0.74 * taper;
      positions[o + 1] = point[1] * BASE_RADIUS * 1.06;
      colors[o] = shellColor[0];
      colors[o + 1] = shellColor[1];
      colors[o + 2] = shellColor[2];
    }
  }
};

/** Ringed planet: sphere shaded equator-to-pole plus a tilted ring plane. */
const generatePlanet: FormGenerator = (positions, colors) => {
  const equatorColor: Vec3 = [1, 0.6, 0.32];
  const poleColor: Vec3 = [1, 0.85, 0.7];
  const ringColor: Vec3 = [0.85, 0.82, 0.95];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const o = i * 3;
    if (seededRandom(i, 17) < 0.3) {
      const ringRadius = BASE_RADIUS * 1.35 + seededRandom(i, 18) * BASE_RADIUS * 0.7;
      const angle = seededRandom(i, 19) * 2 * Math.PI;
      let point: Vec3 = [
        Math.cos(angle) * ringRadius,
        (seededRandom(i, 20) - 0.5) * 0.03,
        Math.sin(angle) * ringRadius,
      ];
      point = rotateAroundX(point, 0.32);
      positions[o] = point[0];
      positions[o + 1] = point[1];
      positions[o + 2] = point[2];
      colors[o] = ringColor[0];
      colors[o + 1] = ringColor[1];
      colors[o + 2] = ringColor[2];
    } else {
      const point = fibonacciSpherePoint(i);
      const radius = BASE_RADIUS * 0.95;
      positions[o] = point[0] * radius;
      positions[o + 1] = point[1] * radius;
      positions[o + 2] = point[2] * radius;
      const color = lerpVec3(equatorColor, poleColor, Math.abs(point[1]));
      colors[o] = color[0];
      colors[o + 1] = color[1];
      colors[o + 2] = color[2];
    }
  }
};

interface ParticleForm {
  name: string;
  positions: Float32Array;
  colors: Float32Array;
}

function buildForms(): ParticleForm[] {
  const definitions: Array<{ name: string; generate: FormGenerator }> = [
    { name: 'CELL', generate: generateCell },
    { name: 'GALAXY', generate: generateGalaxy },
    { name: 'EYE', generate: generateEye },
    { name: 'ATOM', generate: generateAtom },
    { name: 'EGG', generate: generateEgg },
    { name: 'PLANET', generate: generatePlanet },
  ];
  return definitions.map(({ name, generate }) => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    generate(positions, colors);
    return { name, positions, colors };
  });
}

/** Soft radial-gradient sprite used for every particle. */
function createParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.25, 'rgba(255,255,255,0.85)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  return new THREE.CanvasTexture(canvas);
}

function createStarfieldPositions(): Float32Array {
  const positions = new Float32Array(STARFIELD_COUNT * 3);
  for (let i = 0; i < STARFIELD_COUNT; i++) {
    const distance = 14 + Math.random() * 26;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = distance * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = distance * Math.cos(phi) - 10;
  }
  return positions;
}

/* --------------------------------- Component -------------------------------- */

export default function UniverseHero({
  className,
  showFormLabel = true,
}: {
  className?: string;
  showFormLabel?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formName, setFormName] = useState('CELL');

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const forms = buildForms();

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
    renderer.setClearColor(0x000000, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = CAMERA_Z;

    const spriteTexture = createParticleTexture();

    // Morphing particle cloud
    const particleGeometry = new THREE.BufferGeometry();
    const positionAttribute = new THREE.BufferAttribute(
      new Float32Array(forms[0].positions),
      3
    );
    const colorAttribute = new THREE.BufferAttribute(
      new Float32Array(forms[0].colors),
      3
    );
    positionAttribute.setUsage(THREE.DynamicDrawUsage);
    colorAttribute.setUsage(THREE.DynamicDrawUsage);
    particleGeometry.setAttribute('position', positionAttribute);
    particleGeometry.setAttribute('color', colorAttribute);

    const particleMaterial = new THREE.PointsMaterial({
      size: BASE_POINT_SIZE,
      map: spriteTexture,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Background starfield
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(createStarfieldPositions(), 3)
    );
    const starMaterial = new THREE.PointsMaterial({
      size: 0.08,
      map: spriteTexture,
      color: STARFIELD_COLOR,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const starfield = new THREE.Points(starGeometry, starMaterial);
    scene.add(starfield);

    // Sizing driven by the container, not the window, so the hero can be embedded.
    const resize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Pointer parallax
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let parallaxX = 0;
    let parallaxY = 0;
    const onPointerMove = (event: PointerEvent) => {
      pointerTargetX = event.clientX / window.innerWidth - 0.5;
      pointerTargetY = event.clientY / window.innerHeight - 0.5;
    };
    if (!prefersReducedMotion) {
      window.addEventListener('pointermove', onPointerMove);
    }

    // Morph state
    let currentFormIndex = 0;
    let nextFormIndex = 1;
    let phaseTimer = 0;
    let isMorphing = false;
    const livePositions = positionAttribute.array as Float32Array;
    const liveColors = colorAttribute.array as Float32Array;

    let animationFrameId = 0;
    let previousTime = performance.now();

    const animate = (time: number) => {
      const delta = Math.min(0.05, (time - previousTime) / 1000);
      previousTime = time;

      if (!prefersReducedMotion) {
        phaseTimer += delta;
        if (!isMorphing && phaseTimer >= HOLD_SECONDS) {
          isMorphing = true;
          phaseTimer = 0;
        }
        if (isMorphing) {
          const progress = Math.min(1, phaseTimer / MORPH_SECONDS);
          const eased = smoothstepQuintic(progress);
          const from = forms[currentFormIndex];
          const to = forms[nextFormIndex];
          for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
            livePositions[i] = from.positions[i] + (to.positions[i] - from.positions[i]) * eased;
            liveColors[i] = from.colors[i] + (to.colors[i] - from.colors[i]) * eased;
          }
          positionAttribute.needsUpdate = true;
          colorAttribute.needsUpdate = true;
          if (progress >= 1) {
            isMorphing = false;
            phaseTimer = 0;
            currentFormIndex = nextFormIndex;
            nextFormIndex = (nextFormIndex + 1) % forms.length;
            setFormName(forms[currentFormIndex].name);
          }
        }
      }

      particles.rotation.y += delta * 0.14;

      if (!prefersReducedMotion) {
        particles.rotation.x = Math.sin(time * 2e-4) * 0.12;
        const breathe = 1 + Math.sin(time * 0.0011) * 0.02;
        particles.scale.setScalar(breathe);
        particleMaterial.size = BASE_POINT_SIZE + Math.sin(time * 0.003) * POINT_SIZE_PULSE;

        starfield.rotation.y += delta * 0.006;
        starfield.rotation.x += delta * 0.002;

        parallaxX += (pointerTargetX - parallaxX) * PARALLAX_DAMPING;
        parallaxY += (pointerTargetY - parallaxY) * PARALLAX_DAMPING;
        camera.position.x = parallaxX * 0.9;
        camera.position.y = -parallaxY * 0.6;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      particleGeometry.dispose();
      particleMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      spriteTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className={className ?? 'absolute inset-0'}>
      <canvas ref={canvasRef} className="block h-full w-full" />
      {showFormLabel && (
        <div
          aria-live="polite"
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '1.5rem',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.35em',
            color: '#4a4844',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {formName}
        </div>
      )}
    </div>
  );
}
