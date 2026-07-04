// Optical Section — the pure renderer for the petrography translation.
// Translation (design/TRANSLATION_PRINCIPLES.md): a thin section identifies minerals
// by their birefringence colour under cross-polarised light, with grain boundaries
// framing each crystal. Here, optical *water types* (Case-1 clear / Case-2 turbid /
// bloom / sediment) each get a signature palette, and **fronts render as grain
// boundaries** (high spatial gradient). Classification is from real cube values.

import type { DataCube } from "@capri/core";
import { norm, drawReticle, type Selection } from "./signatureField";

export interface OptParams {
  /** Birefringence — colour saturation of the water-type palettes. */
  saturation: number;
  /** Grain-edge strength — how readily spatial gradients render as boundaries. */
  fronts: number;
}
export const DEFAULT_OPT_PARAMS: OptParams = { saturation: 1, fronts: 0.85 };

type RGB = [number, number, number];
export type WaterType = "clear" | "productive" | "bloom" | "case2" | "sediment";

const PALETTE: Record<WaterType, RGB> = {
  clear: [26, 41, 92],       // Case-1 oligotrophic — deep indigo
  productive: [40, 150, 130], // productive / senescing — teal-green
  bloom: [176, 66, 158],      // active bloom — feldspar magenta
  case2: [150, 96, 52],       // Case-2 turbid — oxide brown
  sediment: [176, 148, 92],   // sediment plume — ochre
};

export const WATER_TYPE_LABELS: Array<{ type: WaterType; label: string }> = [
  { type: "clear", label: "Case-1 clear" },
  { type: "productive", label: "productive" },
  { type: "bloom", label: "bloom" },
  { type: "case2", label: "Case-2 turbid" },
  { type: "sediment", label: "sediment" },
];

/** Classify one cell into an optical water type from its normalised signature. */
export function classifyWaterType(chlN: number, tsmN: number, flhN: number): WaterType {
  if (chlN > 0.55 && flhN > 0.5) return "bloom";
  if (tsmN > 0.55 && chlN < 0.35) return "sediment";
  if (tsmN > 0.5) return "case2";
  if (chlN > 0.45) return "productive";
  return "clear";
}

function mix(c: RGB, sat: number): RGB {
  // Desaturate toward a neutral petrographic grey as `sat` drops.
  const g = 70;
  return [
    (g + (c[0] - g) * sat) | 0,
    (g + (c[1] - g) * sat) | 0,
    (g + (c[2] - g) * sat) | 0,
  ];
}

export function drawOpticalSection(
  ctx: CanvasRenderingContext2D,
  cube: DataCube,
  w: number,
  h: number,
  params: OptParams,
  _phase: number,
  selection?: Selection,
): void {
  const N = cube.gridSize;
  const chl = cube.channels.CHL, tsm = cube.channels.TSM, flh = cube.channels.FLH;
  const cs = cube.stats.CHL, ts = cube.stats.TSM, fs = cube.stats.FLH;
  const cw = w / N, ch = h / N;

  ctx.clearRect(0, 0, w, h);

  // 1 · crystalline grains — one filled cell per pixel, coloured by water type.
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const chlN = norm(chl[r][c], cs.min, cs.max);
      const tsmN = norm(tsm[r][c], ts.min, ts.max);
      const flhN = norm(flh[r][c], fs.min, fs.max);
      const [cr, cg, cb] = mix(PALETTE[classifyWaterType(chlN, tsmN, flhN)], params.saturation);
      ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
      ctx.fillRect(c * cw, r * ch, cw + 1, ch + 1);
    }
  }

  // 2 · grain boundaries — bright edges where the CHL field changes sharply (fronts).
  const thresh = 0.12 + (1 - params.fronts) * 0.22;
  ctx.lineWidth = 1;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const v = norm(chl[r][c], cs.min, cs.max);
      if (c + 1 < N) {
        const dv = Math.abs(v - norm(chl[r][c + 1], cs.min, cs.max));
        if (dv > thresh) {
          ctx.strokeStyle = `rgba(240,240,255,${Math.min(0.9, dv * 1.4)})`;
          ctx.beginPath(); ctx.moveTo((c + 1) * cw, r * ch); ctx.lineTo((c + 1) * cw, (r + 1) * ch); ctx.stroke();
        }
      }
      if (r + 1 < N) {
        const dv = Math.abs(v - norm(chl[r + 1][c], cs.min, cs.max));
        if (dv > thresh) {
          ctx.strokeStyle = `rgba(240,240,255,${Math.min(0.9, dv * 1.4)})`;
          ctx.beginPath(); ctx.moveTo(c * cw, (r + 1) * ch); ctx.lineTo((c + 1) * cw, (r + 1) * ch); ctx.stroke();
        }
      }
    }
  }

  // 3 · water-type legend (the "mineral key").
  ctx.font = "8px ui-monospace, monospace";
  let lx = 8;
  const ly = h - 8;
  for (const { type, label } of WATER_TYPE_LABELS) {
    const [cr, cg, cb] = PALETTE[type];
    ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
    ctx.fillRect(lx, ly - 7, 7, 7);
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText(label, lx + 10, ly);
    lx += 12 + ctx.measureText(label).width + 8;
  }

  // 4 · selection reticle — shared with every instrument (linked selection).
  if (selection) {
    drawReticle(ctx, (selection.col + 0.5) * cw, (selection.row + 0.5) * ch, Math.max(7, Math.min(cw, ch)));
  }
}
