// script.js — Hero fluid-trail reveal (Three.js + custom GLSL).
// The cursor (or a synthetic idle cursor) paints a soft trail into an
// off-screen ping-pong mask; where the mask crosses a threshold, the bottom
// portrait is revealed under the top portrait, with a gray halo on the edge.

import * as THREE from 'three';
import { vertexShader, fluidFragmentShader, displayFragmentShader } from './shaders.js';

const CONFIG = {
  // Simulation render-target size (square, ping-pong)
  simSize: 500,
  // Trail mask falloff
  decay: 0.97,
  lineWidth: 0.09,
  perFrameIntensity: 0.3,
  // Reveal threshold (display shader)
  revealThreshold: 0.02,
  edgeWidthBase: 0.004, // divided by uDpr in shader
  // Soft gray halo overlay (display shader)
  haloUpperMul: 2.0, // halo upper bound = revealThreshold * this
  haloMixStrength: 0.35,
  haloGray: [0.12, 0.12, 0.12],
  // Idle auto-trail
  idleThresholdMs: 2500,
  idleEaseInMs: 1500,
  autoLerp: 0.05,
  // Mouse stop detection
  stopAfterMs: 50,
  // Max texture size
  maxTextureSize: 4096,
};

const canvas = document.querySelector('.hero canvas');

if (!canvas) {
  console.warn('[hero] No .hero canvas found — skipping fluid-trail init.');
} else {
  initHero(canvas);
}

function initHero(canvas) {
  // ── Renderer ──────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    precision: 'highp',
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const simScene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  // ── Ping-pong render targets ──────────────────────────────────────────
  const rtOptions = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  };
  const pingPong = [
    new THREE.WebGLRenderTarget(CONFIG.simSize, CONFIG.simSize, rtOptions),
    new THREE.WebGLRenderTarget(CONFIG.simSize, CONFIG.simSize, rtOptions),
  ];
  // Clear both targets once at startup.
  pingPong.forEach((rt) => {
    renderer.setRenderTarget(rt);
    renderer.clear();
  });
  renderer.setRenderTarget(null);
  let currentTarget = 0;

  // ── Mouse state (normalized [0,1] canvas coords) ──────────────────────
  const mouse = new THREE.Vector2(0.5, 0.5);
  const prevMouse = new THREE.Vector2(0.5, 0.5);
  let isMoving = false;
  let lastMoveTime = 0;

  // Synthetic idle cursor state.
  const autoMouse = new THREE.Vector2(0.5, 0.5);
  const prevAutoMouse = new THREE.Vector2(0.5, 0.5);

  // ── Placeholder textures (so the sim always has something to sample) ──
  const topTexture = makeSolidTexture('#0000ff');
  const bottomTexture = makeSolidTexture('#ff0000');
  const topSize = new THREE.Vector2(1, 1);
  const bottomSize = new THREE.Vector2(1, 1);

  // Viewport-aware portraits: a vertical 4:5 crop for portrait/mobile screens,
  // a wide 16:9 crop for landscape/desktop. Picked by aspect ratio and swapped
  // on resize / orientation change so object-fit: cover never crops a head off
  // and each screen gets a correctly framed, full-resolution image.
  const PORTRAITS = {
    desktop: { top: '/portrait_top.png', bottom: '/portrait_bottom.png' },
    mobile: { top: '/portrait_top_mobile.png', bottom: '/portrait_bottom_mobile.png' },
  };
  const portraitCache = {};
  const mobileQuery = window.matchMedia('(max-aspect-ratio: 1/1)');
  let currentBucket = '';

  function loadInto(url, which) {
    const cached = portraitCache[url];
    if (cached) {
      displayMaterialReady(which)(cached.texture, cached.size);
      return;
    }
    const sizeVec = which === 'top' ? topSize : bottomSize;
    const placeholder = which === 'top' ? topTexture : bottomTexture;
    loadPortrait(url, placeholder, sizeVec, (tex, size) => {
      portraitCache[url] = { texture: tex, size: size.clone() };
      // Apply only if this url still belongs to the active bucket (avoid races
      // when the viewport flipped buckets mid-load).
      if (PORTRAITS[currentBucket] && PORTRAITS[currentBucket][which] === url) {
        displayMaterialReady(which)(tex, portraitCache[url].size);
      }
    });
  }

  function applyBucket() {
    const bucket = mobileQuery.matches ? 'mobile' : 'desktop';
    if (bucket === currentBucket) return;
    currentBucket = bucket;
    loadInto(PORTRAITS[bucket].top, 'top');
    loadInto(PORTRAITS[bucket].bottom, 'bottom');
  }
  applyBucket();
  mobileQuery.addEventListener('change', applyBucket);

  // ── Geometry + materials ──────────────────────────────────────────────
  const geometry = new THREE.PlaneGeometry(2, 2);

  const trailsMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: fluidFragmentShader,
    uniforms: {
      uPrevTrails: { value: pingPong[0].texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uPrevMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uDecay: { value: CONFIG.decay },
      uIsMoving: { value: false },
    },
  });

  const dpr = Math.min(window.devicePixelRatio, 2);
  const displayMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: displayFragmentShader,
    uniforms: {
      uFluid: { value: pingPong[0].texture },
      uTopTexture: { value: topTexture },
      uBottomTexture: { value: bottomTexture },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTopTextureSize: { value: topSize },
      uBottomTextureSize: { value: bottomSize },
      uDpr: { value: dpr },
    },
  });

  const simMesh = new THREE.Mesh(geometry, trailsMaterial);
  simScene.add(simMesh);
  const displayMesh = new THREE.Mesh(geometry, displayMaterial);
  scene.add(displayMesh);

  // ── Input ─────────────────────────────────────────────────────────────
  function updateFromClient(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const inside =
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom;
    if (!inside) {
      // Outside the canvas: stop drawing, but DON'T touch lastMoveTime —
      // that's what keeps the idle auto-trail running while the cursor is
      // elsewhere on the page.
      isMoving = false;
      return;
    }
    prevMouse.copy(mouse);
    mouse.x = (clientX - rect.left) / rect.width;
    mouse.y = 1 - (clientY - rect.top) / rect.height; // flip Y
    isMoving = true;
    lastMoveTime = performance.now();
  }

  window.addEventListener('mousemove', (e) => {
    updateFromClient(e.clientX, e.clientY);
  });

  window.addEventListener(
    'touchmove',
    (e) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      if (!t) return;
      const inside =
        t.clientX >= rect.left &&
        t.clientX <= rect.right &&
        t.clientY >= rect.top &&
        t.clientY <= rect.bottom;
      if (inside) e.preventDefault();
      updateFromClient(t.clientX, t.clientY);
    },
    { passive: false }
  );

  // ── Resize ────────────────────────────────────────────────────────────
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    const d = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(d);
    displayMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    displayMaterial.uniforms.uDpr.value = d;
    trailsMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
  });

  // ── Render loop ───────────────────────────────────────────────────────
  function animate() {
    requestAnimationFrame(animate);

    const now = performance.now();
    if (isMoving && now - lastMoveTime > CONFIG.stopAfterMs) isMoving = false;
    const idleTime = now - lastMoveTime;
    const autoActive = idleTime > CONFIG.idleThresholdMs;

    // Swap ping-pong
    const prevTarget = pingPong[currentTarget];
    currentTarget = (currentTarget + 1) % 2;
    const writeTarget = pingPong[currentTarget];
    trailsMaterial.uniforms.uPrevTrails.value = prevTarget.texture;

    if (autoActive) {
      const easeIn = Math.min(1, (idleTime - CONFIG.idleThresholdMs) / CONFIG.idleEaseInMs);
      // Layered low-frequency sines on INCOMMENSURATE frequencies — the
      // resulting path is organic, never repeats, never spikes off-canvas.
      const t = now * 0.001;
      const targetX = 0.5 + 0.3 * Math.sin(t * 0.41) + 0.12 * Math.sin(t * 0.93 + 1.3);
      const targetY = 0.5 + 0.28 * Math.cos(t * 0.37 + 0.5) + 0.1 * Math.cos(t * 1.11 + 2.7);

      prevAutoMouse.copy(autoMouse);
      autoMouse.x += (targetX - autoMouse.x) * CONFIG.autoLerp * easeIn;
      autoMouse.y += (targetY - autoMouse.y) * CONFIG.autoLerp * easeIn;

      trailsMaterial.uniforms.uMouse.value.copy(autoMouse);
      trailsMaterial.uniforms.uPrevMouse.value.copy(prevAutoMouse);
      trailsMaterial.uniforms.uIsMoving.value = true;

      // Mirror onto mouse/prevMouse so the next real move continues from
      // where auto left off — no stale long segment on the handoff frame.
      mouse.copy(autoMouse);
      prevMouse.copy(prevAutoMouse);
    } else {
      trailsMaterial.uniforms.uMouse.value.copy(mouse);
      trailsMaterial.uniforms.uPrevMouse.value.copy(prevMouse);
      trailsMaterial.uniforms.uIsMoving.value = isMoving;
      // Mirror so the next idle cycle starts from the user's last position.
      autoMouse.copy(mouse);
      prevAutoMouse.copy(mouse);
    }

    renderer.setRenderTarget(writeTarget);
    renderer.render(simScene, camera);

    displayMaterial.uniforms.uFluid.value = writeTarget.texture;
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
  }
  animate();

  // ── Helpers ───────────────────────────────────────────────────────────
  function makeSolidTexture(color) {
    const c = document.createElement('canvas');
    c.width = c.height = 2;
    const ctx = c.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 2, 2);
    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }

  // Returns a callback that swaps the real portrait into the right uniform.
  function displayMaterialReady(which) {
    return (texture, size) => {
      if (which === 'top') {
        displayMaterial.uniforms.uTopTexture.value = texture;
        displayMaterial.uniforms.uTopTextureSize.value.copy(size);
      } else {
        displayMaterial.uniforms.uBottomTexture.value = texture;
        displayMaterial.uniforms.uBottomTextureSize.value.copy(size);
      }
    };
  }

  function loadPortrait(url, placeholderTexture, sizeVec, onReady) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      let source = img;
      let w = img.naturalWidth;
      let h = img.naturalHeight;

      // Downscale oversized images via an offscreen 2D canvas.
      if (w > CONFIG.maxTextureSize || h > CONFIG.maxTextureSize) {
        const scale = CONFIG.maxTextureSize / Math.max(w, h);
        const oc = document.createElement('canvas');
        oc.width = Math.round(w * scale);
        oc.height = Math.round(h * scale);
        oc.getContext('2d').drawImage(img, 0, 0, oc.width, oc.height);
        source = oc;
        w = oc.width;
        h = oc.height;
      }

      const tex = new THREE.CanvasTexture(
        source.tagName === 'CANVAS' ? source : imageToCanvas(source, w, h)
      );
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;

      sizeVec.set(w, h);
      onReady(tex, sizeVec);
      console.log(`[hero] loaded ${url} (${w}×${h})`);
    };
    img.onerror = () => {
      console.error(`[hero] failed to load ${url} — keeping placeholder.`);
    };
    img.src = url;
  }

  function imageToCanvas(img, w, h) {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    c.getContext('2d').drawImage(img, 0, 0, w, h);
    return c;
  }
}
