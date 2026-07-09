// Density Cartography — the SOYO + dot-terrain translation. CHL biomass as a
// stipple; ■ high-confidence cells vs ● uncertain (CHL algorithm disagreement); a
// current-drift route threading the density; a multi-scale locator inset.

import type { DataCube } from "@capri/core";
import { norm, drawReticle, type Selection } from "./signatureField";

export interface DensityParams { pitch: number; route: number }
export const DEFAULT_DENSITY_PARAMS: DensityParams = { pitch: 7, route: 0.9 };

export function drawDensityCartography(
  ctx: CanvasRenderingContext2D,
  cube: DataCube,
  w: number, h: number,
  params: DensityParams,
  phase: number,
  selection?: Selection,
): void {
  ctx.fillStyle = "#04060b";
  ctx.fillRect(0, 0, w, h);
  const N = cube.gridSize;
  const chl = cube.channels.CHL, dis = cube.channels.CHL_disagreement;
  const cs = cube.stats.CHL, ds = cube.stats.CHL_disagreement;
  const cw = w / N, ch = h / N;
  const p = Math.max(4, params.pitch);

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const v = norm(chl[r][c], cs.min, cs.max);
      if (v < 0.22) continue;
      const cxp = (c + 0.5) * cw, cyp = (r + 0.5) * ch;
      const confident = norm(dis[r][c], ds.min, ds.max) < 0.45;
      const s = 1 + v * (p * 0.55);
      ctx.fillStyle = `rgba(${(80 + v * 120) | 0},${(200 + v * 40) | 0},${(150 + v * 60) | 0},${0.4 + v * 0.5})`;
      if (confident) {
        ctx.fillRect(cxp - s / 2, cyp - s / 2, s, s);            // ■ confident cell
      } else {
        ctx.beginPath(); ctx.arc(cxp, cyp, s * 0.5, 0, Math.PI * 2); ctx.fill(); // ● uncertain
      }
    }
  }

  // drift route — a smooth path riding the CHL crest, gently animated
  if (params.route > 0) {
    ctx.strokeStyle = `rgba(224,179,76,${0.5 * params.route})`;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 8) {
      const yy = h * 0.5 + Math.sin(x * 0.02 + phase * 0.5) * h * 0.2;
      if (x === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
    }
    ctx.stroke();
  }

  // multi-scale locator inset (a downsampled CHL thumbnail + viewport box)
  const lw = Math.min(60, w * 0.22), lh = lw * 0.8, lx = w - lw - 8, ly = 8;
  ctx.fillStyle = "rgba(8,11,19,0.9)"; ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.fillRect(lx, ly, lw, lh); ctx.strokeRect(lx, ly, lw, lh);
  const step = Math.max(1, (N / 10) | 0);
  for (let r = 0; r < N; r += step) for (let c = 0; c < N; c += step) {
    const v = norm(chl[r][c], cs.min, cs.max);
    if (v < 0.3) continue;
    ctx.fillStyle = `rgba(90,220,170,${v})`;
    ctx.fillRect(lx + (c / N) * lw, ly + (r / N) * lh, 2, 2);
  }
  ctx.strokeStyle = "rgba(224,179,76,0.8)"; ctx.strokeRect(lx + lw * 0.3, ly + lh * 0.3, lw * 0.4, lh * 0.4);

  if (selection) drawReticle(ctx, (selection.col + 0.5) * cw, (selection.row + 0.5) * ch, Math.max(7, Math.min(cw, ch)));
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "7px ui-monospace, monospace";
  ctx.fillText("■ confident  ● uncertain (disagreement)  — drift route", 8, h - 8);
}
