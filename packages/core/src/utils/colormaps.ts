import { VariableName, VARIABLE_METADATA } from "../types";

export interface ColorStop {
  t: number; 
  r: number; 
  g: number; 
  b: number;
}

// Custom scientific 5-stop color gradients for each of the 7 spectrometry layers
// Using standard scientific plots (Jet, Thermal, Viridis, Ocean, Seismic, etc.)
export const COLORMAP_STOPS: Record<VariableName, ColorStop[]> = {
  CHL: [ // 'Jet' style (Blue -> Cyan -> Green -> Yellow -> Red)
    { t: 0.00, r: 0,   g: 0,   b: 131 },  // Dark blue
    { t: 0.25, r: 0,   g: 108, b: 255 },  // Light blue
    { t: 0.50, r: 142, g: 255, b: 111 },  // Green
    { t: 0.75, r: 255, g: 172, b: 0 },    // Orange/Yellow
    { t: 1.00, r: 128, g: 0,   b: 0 }     // Dark red
  ],
  aphy: [ // 'Magma' style (Black -> Purple -> Orange -> White)
    { t: 0.00, r: 0,   g: 0,   b: 4 },
    { t: 0.25, r: 81,  g: 18,  b: 124 },
    { t: 0.50, r: 183, g: 55,  b: 121 },
    { t: 0.75, r: 252, g: 137, b: 97 },
    { t: 1.00, r: 252, g: 253, b: 191 }
  ],
  ADG: [ // 'Copper / Thermal' style
    { t: 0.00, r: 0,   g: 0,   b: 0 },
    { t: 0.25, r: 76,  g: 25,  b: 0 },
    { t: 0.50, r: 153, g: 51,  b: 0 },
    { t: 0.75, r: 230, g: 102, b: 0 },
    { t: 1.00, r: 255, g: 191, b: 128 }
  ],
  bbp: [ // 'Viridis' style (Dark Purple -> Blue -> Green -> Yellow)
    { t: 0.00, r: 68,  g: 1,   b: 84 },
    { t: 0.25, r: 59,  g: 82,  b: 139 },
    { t: 0.50, r: 33,  g: 145, b: 140 },
    { t: 0.75, r: 94,  g: 201, b: 98 },
    { t: 1.00, r: 253, g: 231, b: 37 }
  ],
  TSM: [ // 'Turbo' style (Smooth Jet)
    { t: 0.00, r: 48,  g: 18,  b: 59 },
    { t: 0.25, r: 40,  g: 188, b: 235 },
    { t: 0.50, r: 164, g: 252, b: 60 },
    { t: 0.75, r: 251, g: 122, b: 36 },
    { t: 1.00, r: 122, g: 4,   b: 3 }
  ],
  PAR: [ // 'Hot' style (Black -> Red -> Yellow -> White)
    { t: 0.00, r: 11,  g: 0,   b: 0 },
    { t: 0.25, r: 139, g: 0,   b: 0 },
    { t: 0.50, r: 255, g: 0,   b: 0 },
    { t: 0.75, r: 255, g: 191, b: 0 },
    { t: 1.00, r: 255, g: 255, b: 255 }
  ],
  KD490: [ // 'Ocean' style (Deep Blue -> Cyan -> White)
    { t: 0.00, r: 0,   g: 0,   b: 80 },
    { t: 0.25, r: 0,   g: 80,  b: 180 },
    { t: 0.50, r: 0,   g: 180, b: 220 },
    { t: 0.75, r: 150, g: 230, b: 230 },
    { t: 1.00, r: 255, g: 255, b: 255 }
  ],
  FLH: [ // 'Rainbow' style
    { t: 0.00, r: 255, g: 0,   b: 255 },  // Magenta
    { t: 0.25, r: 0,   g: 0,   b: 255 },  // Blue
    { t: 0.50, r: 0,   g: 255, b: 0 },    // Green
    { t: 0.75, r: 255, g: 255, b: 0 },    // Yellow
    { t: 1.00, r: 255, g: 0,   b: 0 }     // Red
  ],
  CHL_disagreement: [ // 'Seismic' / Diverging style (Blue -> White -> Red)
    { t: 0.00, r: 0,   g: 0,   b: 76 },   // Deep blue
    { t: 0.25, r: 50,  g: 50,  b: 255 },  // Light blue
    { t: 0.50, r: 255, g: 255, b: 255 },  // White (Agreement)
    { t: 0.75, r: 255, g: 50,  b: 50 },   // Light red
    { t: 1.00, r: 76,  g: 0,   b: 0 }     // Deep crimson
  ],
  OA01: [ // 400nm — violet
    { t: 0.00, r: 0,  g: 0, b: 0 },
    { t: 0.50, r: 62, g: 0, b: 124 },
    { t: 1.00, r: 124, g: 58, b: 237 }
  ],
  OA02: [ // 412.5nm — indigo
    { t: 0.00, r: 0,  g: 0,  b: 0 },
    { t: 0.50, r: 49, g: 51, b: 120 },
    { t: 1.00, r: 99, g: 102, b: 241 }
  ],
  OA03: [ // 442.5nm — blue
    { t: 0.00, r: 0,  g: 0,  b: 0 },
    { t: 0.50, r: 29, g: 65, b: 123 },
    { t: 1.00, r: 59, g: 130, b: 246 }
  ],
  OA04: [ // 490nm — cyan-blue
    { t: 0.00, r: 0, g: 0,  b: 0 },
    { t: 0.50, r: 3, g: 91, b: 106 },
    { t: 1.00, r: 6, g: 182, b: 212 }
  ],
  OA05: [ // 510nm — teal
    { t: 0.00, r: 0,  g: 0,  b: 0 },
    { t: 0.50, r: 10, g: 92, b: 83 },
    { t: 1.00, r: 20, g: 184, b: 166 }
  ],
  OA06: [ // 560nm — green
    { t: 0.00, r: 0,  g: 0,  b: 0 },
    { t: 0.50, r: 66, g: 102, b: 11 },
    { t: 1.00, r: 132, g: 204, b: 22 }
  ],
  OA07: [ // 620nm — orange
    { t: 0.00, r: 0,   g: 0,  b: 0 },
    { t: 0.50, r: 124, g: 57, b: 11 },
    { t: 1.00, r: 249, g: 115, b: 22 }
  ],
  OA08: [
    { t: 0.00, r: 0,   g: 0,   b: 0 },
    { t: 0.50, r: 128, g: 0,   b: 0 },
    { t: 1.00, r: 255, g: 0,   b: 0 }
  ],
  OA09: [
    { t: 0.00, r: 0,   g: 0,   b: 0 },
    { t: 0.50, r: 128, g: 30,  b: 0 },
    { t: 1.00, r: 255, g: 60,  b: 0 }
  ],
  OA10: [
    { t: 0.00, r: 0,   g: 0,   b: 0 },
    { t: 0.50, r: 128, g: 60,  b: 0 },
    { t: 1.00, r: 255, g: 120, b: 0 }
  ],
  OA11: [
    { t: 0.00, r: 0,   g: 0,   b: 0 },
    { t: 0.50, r: 128, g: 0,   b: 128 },
    { t: 1.00, r: 255, g: 0,   b: 255 }
  ],
  OA13: [
    { t: 0.00, r: 0,   g: 0,   b: 0 },
    { t: 0.50, r: 128, g: 128, b: 128 },
    { t: 1.00, r: 255, g: 255, b: 255 }
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

// Generates a 5-stop colormap ramp interpolated between two explicit hex colors.
// Used when the user customises both gradient endpoints independently.
export function generateRampFromTwoHex(fromHex: string, toHex: string): ColorStop[] {
  const from = hexToRgb(fromHex);
  const to = hexToRgb(toHex);
  return [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    t,
    r: Math.round(from.r + t * (to.r - from.r)),
    g: Math.round(from.g + t * (to.g - from.g)),
    b: Math.round(from.b + t * (to.b - from.b)),
  }));
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
  customHex?: string,
  customFromHex?: string
): { r: number; g: number; b: number; a: number } {
  const tc = Math.max(0, Math.min(1, t));
  const to = hexToRgb(customHex || VARIABLE_METADATA[varName].color);
  const from = customFromHex ? hexToRgb(customFromHex) : { r: 255, g: 255, b: 255 };

  const r = Math.round(from.r + tc * (to.r - from.r));
  const g = Math.round(from.g + tc * (to.g - from.g));
  const b = Math.round(from.b + tc * (to.b - from.b));
  const a = 0.05 + tc * 0.90;

  return { r, g, b, a };
}

// Generic diverging colormap (blue -> white -> red) for normalized scalar
// fields in [0, 1] that are not tied to a specific VariableName (e.g.
// spatial/relationship tensor channels). t=0 -> blue, t=0.5 -> white, t=1 -> red.
export function getScalarFieldColor(t: number): { r: number; g: number; b: number } {
  const tc = Math.max(0, Math.min(1, t));
  const stops: ColorStop[] = [
    { t: 0.0, r: 33, g: 102, b: 172 },   // deep blue
    { t: 0.5, r: 247, g: 247, b: 247 },  // white
    { t: 1.0, r: 178, g: 24, b: 43 },    // deep red
  ];

  let i = 0;
  for (let k = 1; k < stops.length; k++) {
    if (tc <= stops[k].t) {
      i = k - 1;
      break;
    }
  }
  const s0 = stops[i];
  const s1 = stops[Math.min(i + 1, stops.length - 1)];
  const f = s1.t === s0.t ? 0 : (tc - s0.t) / (s1.t - s0.t);

  return {
    r: Math.round(s0.r + f * (s1.r - s0.r)),
    g: Math.round(s0.g + f * (s1.g - s0.g)),
    b: Math.round(s0.b + f * (s1.b - s0.b)),
  };
}

// Generates a CSS linear-gradient string for a variable.
// If both fromHex and toHex are provided, interpolates between them.
// If only toHex is provided, sweeps lightness at that hue.
// If neither, uses the built-in colormap.
export function getCSSGradient(varName: VariableName, toHex?: string, fromHex?: string): string {
  let stops: ColorStop[];
  if (toHex && fromHex) {
    stops = generateRampFromTwoHex(fromHex, toHex);
  } else if (toHex) {
    stops = generateRampFromHex(toHex);
  } else {
    stops = COLORMAP_STOPS[varName] || COLORMAP_STOPS.CHL;
  }
  return `linear-gradient(to right, ${stops.map(s => `rgb(${s.r},${s.g},${s.b}) ${(s.t * 100).toFixed(0)}%`).join(", ")})`;
}
