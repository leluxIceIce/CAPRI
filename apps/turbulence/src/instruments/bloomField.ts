// Bloom Field — the percolation translation, reinterpreted for physiology (not age).
// Particles seeded by CHL biomass; colour = FLH vitality (senescent amber → thriving
// cyan); size = CHL; blur = TSM turbidity (turbid water renders literally unclear =
// honest uncertainty); drift follows the real CHL gradient (front-following).
//
// Particles must persist across frames, so state lives module-level (one Stage tile).

import type { DataCube } from "@capri/core";
import { norm, drawReticle, type Selection } from "./signatureField";

export interface BloomParams { count: number; vit: number }
export const DEFAULT_BLOOM_PARAMS: BloomParams = { count: 0.8, vit: 1 };

const MAX = 1200;
const px = new Float32Array(MAX), py = new Float32Array(MAX), pa = new Float32Array(MAX), pl = new Float32Array(MAX);
let ready = false;
function seed(i: number, w: number, h: number) {
  px[i] = Math.random() * w; py[i] = Math.random() * h; pa[i] = 0; pl[i] = 0.5 + Math.random() * 0.9;
}
const VIT: Array<[number, number, number]> = [[122, 86, 40], [90, 120, 80], [79, 154, 120], [53, 224, 208], [120, 255, 190]];
function vit(t: number): [number, number, number] {
  const x = (t < 0 ? 0 : t > 1 ? 1 : t) * 4, i = Math.min(3, x | 0), f = x - i, a = VIT[i], b = VIT[i + 1];
  return [(a[0] + (b[0] - a[0]) * f) | 0, (a[1] + (b[1] - a[1]) * f) | 0, (a[2] + (b[2] - a[2]) * f) | 0];
}

export function drawBloomField(
  ctx: CanvasRenderingContext2D,
  cube: DataCube,
  w: number, h: number,
  params: BloomParams,
  _phase: number,
  selection?: Selection,
): void {
  if (!ready) { for (let i = 0; i < MAX; i++) seed(i, w, h); ready = true; }
  const N = cube.gridSize;
  const chl = cube.channels.CHL, flh = cube.channels.FLH, tsm = cube.channels.TSM;
  const cs = cube.stats.CHL, fs = cube.stats.FLH, ts = cube.stats.TSM;

  // fade (trails)
  ctx.fillStyle = "rgba(0,0,0,0.16)";
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";

  const n = Math.round(MAX * params.count);
  const at = (grid: number[][], gx: number, gy: number) => {
    const c = Math.max(0, Math.min(N - 1, (gx / w * N) | 0));
    const r = Math.max(0, Math.min(N - 1, (gy / h * N) | 0));
    return grid[r][c];
  };
  for (let i = 0; i < n; i++) {
    // biomass-weighted respawn: reject-sample toward high CHL
    if (pa[i] >= pl[i]) { seed(i, w, h); if (norm(at(chl, px[i], py[i]), cs.min, cs.max) < Math.random() * 0.7) { pa[i] = pl[i]; continue; } }
    const cN = norm(at(chl, px[i], py[i]), cs.min, cs.max);
    const fN = norm(at(flh, px[i], py[i]), fs.min, fs.max);
    const tN = norm(at(tsm, px[i], py[i]), ts.min, ts.max);
    // drift along CHL gradient
    const e = w / N;
    const gx = norm(at(chl, px[i] + e, py[i]), cs.min, cs.max) - norm(at(chl, px[i] - e, py[i]), cs.min, cs.max);
    const gy = norm(at(chl, px[i], py[i] + e), cs.min, cs.max) - norm(at(chl, px[i], py[i] - e), cs.min, cs.max);
    px[i] += gx * 40 + (Math.random() - 0.5) * 1.2;
    py[i] += gy * 40 + 0.4;
    pa[i] += 0.02;
    if (px[i] < 0 || px[i] > w || py[i] < 0 || py[i] > h) { pa[i] = pl[i]; continue; }
    const col = vit(fN * params.vit);
    const size = (0.6 + cN * 2.4) * (1 + tN);          // biomass size, turbidity swells + blurs
    const alpha = tN > 0.5 ? 0.16 : 0.5;                // turbid = faint/unclear
    ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`;
    ctx.fillRect(px[i], py[i], size, size);
  }
  ctx.globalCompositeOperation = "source-over";

  if (selection) {
    const cw = w / N, ch = h / N;
    drawReticle(ctx, (selection.col + 0.5) * cw, (selection.row + 0.5) * ch, Math.max(7, Math.min(cw, ch)));
  }
  ctx.fillStyle = "rgba(255,255,255,0.42)";
  ctx.font = "7px ui-monospace, monospace";
  ctx.fillText("colour = FLH vitality · size = CHL · blur = TSM turbidity · drift = front", 8, 12);
}
