// shaders.js — GLSL sources for the hero fluid-trail reveal.
// Three named exports, shared between the simulation pass and the display pass.

// Shared full-screen vertex shader.
export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Simulation pass — writes the trail mask into a ping-pong target every frame.
// Reads the previous mask, decays it, then stamps a continuous line segment
// between uPrevMouse and uMouse (closest-point-on-segment) so fast motion
// still produces an unbroken trail rather than dotted samples.
export const fluidFragmentShader = /* glsl */ `
  uniform sampler2D uPrevTrails;
  uniform vec2 uMouse;
  uniform vec2 uPrevMouse;
  uniform vec2 uResolution;
  uniform float uDecay;
  uniform bool uIsMoving;
  varying vec2 vUv;

  void main() {
    vec4 prev = texture2D(uPrevTrails, vUv);
    float newValue = prev.r * uDecay; // 0.97 decay

    if (uIsMoving) {
      vec2 dir = uMouse - uPrevMouse;
      float len = length(dir);
      if (len > 0.001) {
        vec2 d = dir / len;
        vec2 toPx = vUv - uPrevMouse;
        float proj = clamp(dot(toPx, d), 0.0, len);
        vec2 closest = uPrevMouse + proj * d;
        float dist = length(vUv - closest);
        float lineWidth = 0.09;
        float intensity = smoothstep(lineWidth, 0.0, dist) * 0.3;
        newValue += intensity;
      }
    }

    gl_FragColor = vec4(newValue, 0.0, 0.0, 1.0);
  }
`;

// Display pass — composites the final on-screen pixel.
// Samples top + bottom portraits with a CSS object-fit: cover mapping, then
// uses the trail mask to reveal the bottom image and paint a soft gray halo
// on the top image just before the reveal threshold.
export const displayFragmentShader = /* glsl */ `
  uniform sampler2D uFluid;
  uniform sampler2D uTopTexture;
  uniform sampler2D uBottomTexture;
  uniform vec2 uResolution;
  uniform vec2 uTopTextureSize;
  uniform vec2 uBottomTextureSize;
  uniform float uDpr;
  varying vec2 vUv;

  // Replicates CSS object-fit: cover, but with a vertical anchor so the
  // portrait's head stays in frame on wide screens (cover would otherwise
  // crop a thin central slice). anchor.y = 1.0 hugs the top of the image,
  // 0.5 centers. Top and bottom textures MUST share the same anchor so the
  // reveal lines up. Tune ANCHOR.y if the framing needs more/less headroom.
  vec2 getCoverUV(vec2 uv, vec2 ts) {
    if (ts.x < 1.0 || ts.y < 1.0) return uv;
    const vec2 ANCHOR = vec2(0.5, 0.92);
    vec2 s = uResolution / ts;
    float scale = max(s.x, s.y);
    vec2 scaled = ts * scale;
    vec2 offset = (uResolution - scaled) * ANCHOR;
    return (uv * uResolution - offset) / scaled;
  }

  void main() {
    float fluid = texture2D(uFluid, vUv).r;

    vec2 topUV = getCoverUV(vUv, uTopTextureSize);
    vec2 bottomUV = getCoverUV(vUv, uBottomTextureSize);
    vec4 topColor = texture2D(uTopTexture, topUV);
    vec4 bottomColor = texture2D(uBottomTexture, bottomUV);

    float threshold = 0.02;
    float edgeWidth = 0.004 / uDpr;
    float t = smoothstep(threshold, threshold + edgeWidth, fluid);

    // Soft gray trail-visibility overlay (top image only).
    // Halo peaks just before the reveal threshold and fades out as
    // t -> 1 so the bottom image still appears clean inside the trail.
    float halo = smoothstep(0.0, threshold * 2.0, fluid) * (1.0 - t);
    vec3 trailGray = vec3(0.12);
    vec3 tintedTop = mix(topColor.rgb, trailGray, halo * 0.35);

    vec4 finalColor = mix(vec4(tintedTop, topColor.a), bottomColor, t);
    gl_FragColor = finalColor;
  }
`;
