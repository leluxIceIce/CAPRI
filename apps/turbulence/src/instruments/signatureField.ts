// Signature Field — the pure, testable core of the instrument.
// Translation (see design/TRANSLATION_PRINCIPLES.md): the Rosetta water-vapour
// plate pinned each raw spectrum over the nucleus beside a concentration map +
// emission contours. Here we do the ocean-colour equivalent — a CHL concentration
// colourmap + iso-contours, with each cell's real OLCI reflectance spectrum drawn
// *in place*, the 681 nm fluorescence band flagged. Signal-in-place, not a heatmap.

import type { DataCube, VariableName } from "@capri/core";

/** The 12 raw OLCI reflectance bands actually present in the cube, in wavelength order. */
export const OA_BANDS: ReadonlyArray<{ key: VariableName; wl: number }> = [
  { key: "OA01", wl: 400 },
  { key: "OA02", wl: 412.5 },
  { key: "OA03", wl: 442.5 },
  { key: "OA04", wl: 490 },
  { key: "OA05", wl: 510 },
  { key: "OA06", wl: 560 },
  { key: "OA07", wl: 620 },
  { key: "OA08", wl: 665 },
  { key: "OA09", wl: 673 },
  { key: "OA10", wl: 681 }, // chlorophyll fluorescence peak — flagged in the plot
  { key: "OA11", wl: 708 },
  { key: "OA13", wl: 761 },
];

/** Index of the fluorescence band (OA10, 681 nm) within OA_BANDS. */
export const FLUOR_BAND_INDEX = OA_BANDS.findIndex((b) => b.key === "OA10");

/** The raw reflectance spectrum for one cell, as the 12 OLCI band values in wavelength order. */
export function cellSpectrum(cube: DataCube, row: number, col: number): number[] {
  return OA_BANDS.map((b) => {
    const grid = cube.channels[b.key];
    const v = grid && grid[row] ? grid[row][col] : 0;
    return Number.isFinite(v) ? v : 0;
  });
}

/** Min→max normalisation to [0,1]; a flat field maps to 0 (never NaN). */
export function norm(v: number, min: number, max: number): number {
  if (!(max > min)) return 0;
  const t = (v - min) / (max - min);
  return t < 0 ? 0 : t > 1 ? 1 : t;
}

export interface SigParams {
  /** Sample the in-place spectra every N cells (larger = sparser). */
  spectraStep: number;
  /** Number of iso-contour levels drawn over the CHL field. */
  contourLevels: number;
  /** Colourmap contrast gain applied to the normalised CHL value. */
  gain: number;
}

export const DEFAULT_SIG_PARAMS: SigParams = { spectraStep: 4, contourLevels: 5, gain: 1 };

// ── colour ramps ────────────────────────────────────────────────────────────
type RGB = [number, number, number];
const CHL_RAMP: RGB[] = [
  [11, 26, 58], [18, 63, 110], [31, 143, 143], [79, 208, 122], [216, 232, 90], [242, 178, 59],
];
const VIT_RAMP: RGB[] = [
  [122, 86, 40], [90, 120, 80], [79, 154, 120], [53, 224, 208], [120, 255, 190],
];
function lerpRamp(ramp: RGB[], t: number): RGB {
  const x = (t < 0 ? 0 : t > 1 ? 1 : t) * (ramp.length - 1);
  const i = Math.min(ramp.length - 2, x | 0);
  const f = x - i;
  const a = ramp[i], b = ramp[i + 1];
  return [
    (a[0] + (b[0] - a[0]) * f) | 0,
    (a[1] + (b[1] - a[1]) * f) | 0,
    (a[2] + (b[2] - a[2]) * f) | 0,
  ];
}
export function chlColour(t: number): RGB {
  return lerpRamp(CHL_RAMP, t);
}
export function vitalityColour(t: number): RGB {
  return lerpRamp(VIT_RAMP, t);
}

/**
 * Draw the Signature Field for a real DataCube. Pure w.r.t. the cube — all state
 * comes from the arguments; `phase` (seconds) drives only subtle, information-free
 * micro-motion (a breathing shimmer on the contours) and is frozen for reduced-motion.
 */
export function drawSignatureField(
  ctx: CanvasRenderingContext2D,
  cube: DataCube,
  w: number,
  h: number,
  params: SigParams,
  phase: number,
): void {
  const N = cube.gridSize;
  const chl = cube.channels.CHL;
  const flh = cube.channels.FLH;
  const chlStats = cube.stats.CHL;
  const flhStats = cube.stats.FLH;

  ctx.clearRect(0, 0, w, h);

  // 1 · CHL concentration colourmap — rendered at grid resolution into an offscreen
  //     buffer, then bilinearly upscaled so the field reads as a continuous surface.
  const off = document.createElement("canvas");
  off.width = N;
  off.height = N;
  const octx = off.getContext("2d");
  if (octx) {
    const img = octx.createImageData(N, N);
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        let t = norm(chl[r][c], chlStats.min, chlStats.max);
        t = Math.pow(t, 1 / Math.max(0.2, params.gain));
        const [cr, cg, cb] = chlColour(t);
        const o = (r * N + c) * 4;
        img.data[o] = cr; img.data[o + 1] = cg; img.data[o + 2] = cb; img.data[o + 3] = 255;
      }
    }
    octx.putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(off, 0, 0, N, N, 0, 0, w, h);
  }

  const cw = w / (N - 1);
  const ch = h / (N - 1);

  // 2 · iso-contours of the CHL field (marching squares on the normalised grid).
  ctx.lineWidth = 1;
  for (let li = 1; li <= params.contourLevels; li++) {
    const level = li / (params.contourLevels + 1) + Math.sin(phase * 0.6 + li) * 0.006;
    ctx.strokeStyle = `rgba(6,10,18,${0.28 + 0.5 * (li / params.contourLevels)})`;
    ctx.beginPath();
    for (let r = 0; r < N - 1; r++) {
      for (let c = 0; c < N - 1; c++) {
        const v00 = norm(chl[r][c], chlStats.min, chlStats.max);
        const v10 = norm(chl[r][c + 1], chlStats.min, chlStats.max);
        const v01 = norm(chl[r + 1][c], chlStats.min, chlStats.max);
        const v11 = norm(chl[r + 1][c + 1], chlStats.min, chlStats.max);
        const x0 = c * cw, y0 = r * ch, x1 = (c + 1) * cw, y1 = (r + 1) * ch;
        const pts: Array<[number, number]> = [];
        const edge = (a: number, b: number, ax: number, ay: number, bx: number, by: number) => {
          if ((a < level) !== (b < level)) {
            const f = (level - a) / (b - a);
            pts.push([ax + (bx - ax) * f, ay + (by - ay) * f]);
          }
        };
        edge(v00, v10, x0, y0, x1, y0);
        edge(v10, v11, x1, y0, x1, y1);
        edge(v01, v11, x0, y1, x1, y1);
        edge(v00, v01, x0, y0, x0, y1);
        for (let p = 0; p + 1 < pts.length; p += 2) {
          ctx.moveTo(pts[p][0], pts[p][1]);
          ctx.lineTo(pts[p + 1][0], pts[p + 1][1]);
        }
      }
    }
    ctx.stroke();
  }

  // 3 · in-place spectra — the actual OLCI reflectance curve at sampled cells,
  //     coloured by FLH vitality, with the 681 nm fluorescence band flagged.
  const step = Math.max(2, Math.round(params.spectraStep));
  const boxW = Math.min(cw * step * 0.8, 46);
  const boxH = Math.min(ch * step * 0.6, 26);
  ctx.lineWidth = 1;
  for (let r = 1; r < N; r += step) {
    for (let c = 1; c < N; c += step) {
      const spec = cellSpectrum(cube, r, c);
      let sMin = Infinity, sMax = -Infinity;
      for (const v of spec) { if (v < sMin) sMin = v; if (v > sMax) sMax = v; }
      const cx = c * cw, cy = r * ch;
      const vit = norm(flh[r][c], flhStats.min, flhStats.max);
      const [vr, vg, vb] = vitalityColour(vit);
      ctx.strokeStyle = `rgba(${vr},${vg},${vb},0.92)`;
      ctx.beginPath();
      for (let i = 0; i < spec.length; i++) {
        const px = cx - boxW / 2 + (i / (spec.length - 1)) * boxW;
        const py = cy + boxH / 2 - norm(spec[i], sMin, sMax) * boxH;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
      // fluorescence tick (OA10 · 681 nm)
      if (FLUOR_BAND_INDEX >= 0) {
        const fx = cx - boxW / 2 + (FLUOR_BAND_INDEX / (spec.length - 1)) * boxW;
        const fy = cy + boxH / 2 - norm(spec[FLUOR_BAND_INDEX], sMin, sMax) * boxH;
        ctx.fillStyle = "rgba(240,64,42,0.95)";
        ctx.fillRect(fx - 0.8, fy - 2, 1.6, 4);
      }
    }
  }
}
