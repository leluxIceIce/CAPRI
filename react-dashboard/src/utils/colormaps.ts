import { VariableName, VARIABLE_METADATA } from "../types";

export interface ColorStop {
  t: number; 
  r: number; 
  g: number; 
  b: number;
}

// Custom scientific 5-stop color gradients for each of the 7 spectrometry layers
export const COLORMAP_STOPS: Record<VariableName, ColorStop[]> = {
  CHL: [
    { t: 0.00, r: 4,   g: 24,  b: 15 },   // Deep forest green
    { t: 0.25, r: 16,  g: 73,  b: 54 },   // Sea mineral teal
    { t: 0.50, r: 34,  g: 139, b: 96 },   // Standard moss green
    { t: 0.75, r: 74,  g: 222, b: 128 },  // Electric neon green
    { t: 1.00, r: 163, g: 230, b: 53 }   // Flourescent lime gold
  ],
  aphy: [
    { t: 0.00, r: 18,  g: 12,  b: 28 },   // Shadow carbon plum
    { t: 0.25, r: 76,  g: 29,  b: 149 },  // Royal deep amethyst
    { t: 0.50, r: 139, g: 92,  b: 246 },  // Radiant warm purple
    { t: 0.75, r: 232, g: 121, b: 249 },  // Vibrant hot pink
    { t: 1.00, r: 253, g: 244, b: 255 }   // Pearl magenta glow
  ],
  ADG: [
    { t: 0.00, r: 24,  g: 16,  b: 10 },   // Deep silt mahogany
    { t: 0.25, r: 120, g: 53,  b: 4 },    // Rich burnt amber
    { t: 0.50, r: 217, g: 119, b: 6 },    // Golden honeycomb
    { t: 0.75, r: 251, g: 191, b: 36 },   // Sunshine yellow
    { t: 1.00, r: 254, g: 252, b: 232 }   // Faint sand reflection
  ],
  bbp: [
    { t: 0.00, r: 8,   g: 18,  b: 28 },   // Abyssal slate gray-blue
    { t: 0.25, r: 15,  g: 82,  b: 105 },  // Dark crystal teal
    { t: 0.50, r: 13,  g: 148, b: 136 },  // Deep marine turquoise
    { t: 0.75, r: 34,  g: 211, b: 238 },  // High scattering cyan
    { t: 1.00, r: 224, g: 242, b: 254 }   // Glacier ice white
  ],
  TSM: [
    { t: 0.00, r: 28,  g: 12,  b: 10 },   // Low visibility clay dark
    { t: 0.25, r: 153, g: 27,  b: 27 },   // Copper ore
    { t: 0.50, r: 220, g: 38,  b: 38 },   // Direct turbid red-orange
    { t: 0.75, r: 248, g: 113, b: 113 },  // Radiant suspended clay coral
    { t: 1.00, r: 254, g: 242, b: 242 }   // High silt frosted pink
  ],
  PAR: [
    { t: 0.00, r: 15,  g: 10,  b: 8 },    // Solar eclipse twilight
    { t: 0.25, r: 185, g: 28,  b: 28 },   // Deep fusion crimson
    { t: 0.50, r: 245, g: 158, b: 11 },   // Blazing heat orange
    { t: 0.75, r: 253, g: 224, b: 71 },   // Intense active yellow
    { t: 1.00, r: 255, g: 255, b: 255 }   // Solar white glare
  ],
  KD490: [
    { t: 0.00, r: 10,  g: 14,  b: 28 },   // Midnight ocean depth
    { t: 0.25, r: 29,  g: 78,  b: 216 },  // Sapphire blue
    { t: 0.50, r: 59,  g: 130, b: 246 },  // Direct light sky-blue
    { t: 0.75, r: 147, g: 197, b: 253 },  // Ice glacier silver
    { t: 1.00, r: 240, g: 246, b: 255 }   // Pure light beam prism
  ]
};

// Hex → HSL helper
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rn: h = ((gn - bn) / d) % 6; break;
      case gn: h = (bn - rn) / d + 2; break;
      case bn: h = (rn - gn) / d + 4; break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s, l };
}

// HSL → {r,g,b}
function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

// Generates a 5-stop colormap ramp from a single custom hex color by sweeping
// lightness (dark → light) at the color's own hue/saturation — used when a
// user picks a custom accent color for a variable.
export function generateRampFromHex(hex: string): ColorStop[] {
  const { h, s } = hexToHsl(hex);
  const lightnessStops = [0.08, 0.25, 0.45, 0.68, 0.92];
  return lightnessStops.map((l, idx) => {
    const { r, g, b } = hslToRgb(h, Math.max(s, 0.35), l);
    return { t: idx / (lightnessStops.length - 1), r, g, b };
  });
}

// Interpolates along the specific colormap definition for a variable.
// An optional `customStops` override (e.g. from a user-picked color) takes
// precedence over the built-in `COLORMAP_STOPS`.
export function interpolateColormap(varName: VariableName, t: number, customStops?: ColorStop[]): { r: number; g: number; b: number } {
  const tClamped = Math.max(0, Math.min(1, t));
  const stops = customStops || COLORMAP_STOPS[varName] || COLORMAP_STOPS.CHL;

  let i = 0;
  for (let k = 1; k < stops.length; k++) {
    if (tClamped <= stops[k].t) {
      i = k - 1;
      break;
    }
  }
  
  const s0 = stops[i];
  const s1 = stops[Math.min(i + 1, stops.length - 1)];
  const f = s1.t === s0.t ? 0 : (tClamped - s0.t) / (s1.t - s0.t);
  
  return {
    r: Math.round(s0.r + f * (s1.r - s0.r)),
    g: Math.round(s0.g + f * (s1.g - s0.g)),
    b: Math.round(s0.b + f * (s1.b - s0.b))
  };
}

// Hex → {r,g,b} parser for base variable colors
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

// S2 color encoding: maps normalized value [0→1] to white/transparent → variable hue/opaque.
// Returns { r, g, b, a } where a ∈ [0,1].
// At t=0: white (255,255,255), alpha ~0.05 (near-invisible)
// At t=1: full variable color,  alpha ~0.95 (fully opaque)
export function getVariableHueColor(
  varName: VariableName,
  t: number,
  customHex?: string
): { r: number; g: number; b: number; a: number } {
  const tc = Math.max(0, Math.min(1, t));
  const base = hexToRgb(customHex || VARIABLE_METADATA[varName].color);

  // Interpolate white → hue
  const r = Math.round(255 + tc * (base.r - 255));
  const g = Math.round(255 + tc * (base.g - 255));
  const b = Math.round(255 + tc * (base.b - 255));

  // Alpha: sparse data nearly invisible, peaks fully solid
  const a = 0.05 + tc * 0.90;

  return { r, g, b, a };
}

// Generates a CSS linear-gradient string for a variable. If `customHex` is
// provided (a user-picked accent color), the gradient is derived from it.
export function getCSSGradient(varName: VariableName, customHex?: string): string {
  const stops = customHex ? generateRampFromHex(customHex) : (COLORMAP_STOPS[varName] || COLORMAP_STOPS.CHL);
  const gradientStops = stops.map(stop => {
    return `rgb(${stop.r}, ${stop.g}, ${stop.b}) ${(stop.t * 100).toFixed(0)}%`;
  });
  return `linear-gradient(to right, ${gradientStops.join(", ")})`;
}
