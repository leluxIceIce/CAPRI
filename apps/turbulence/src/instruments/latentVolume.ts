// Latent Volume — the CFD-box translation as a true dimensional reduction.
// The 21-channel signature of every cell, projected into its first three principal
// components by @capri/core (the 3-D sibling of the 2-D UMAP). Regime clusters read
// as knots; cells far out in PC space are flagged as novelty; drag-free auto-orbit.

import type { DataCube, RootAnalysis } from "@capri/core";
import { drawReticle, type Selection } from "./signatureField";

export interface LatentParams { orbit: number; size: number }
export const DEFAULT_LATENT_PARAMS: LatentParams = { orbit: 0.3, size: 1.4 };

const CLUSTER_COLOURS: Array<[number, number, number]> = [
  [59, 224, 107], [242, 169, 59], [53, 224, 208], [124, 92, 255], [240, 64, 42],
];

function project(x: number, y: number, z: number, cx: number, cy: number, sc: number, cosY: number, sinY: number, tilt: number): [number, number, number] {
  const xr = x * cosY + z * sinY;
  const zr = -x * sinY + z * cosY; // also the depth used for shading
  const d = 1 / (2.4 - zr * 0.5);
  return [cx + xr * sc * d, cy - y * sc * d - zr * sc * tilt * d, zr];
}

export function drawLatentVolume(
  ctx: CanvasRenderingContext2D,
  cube: DataCube,
  root: RootAnalysis,
  w: number, h: number,
  params: LatentParams,
  phase: number,
  selection?: Selection,
): void {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  const N = cube.gridSize;
  const n = N * N;
  const proj = root.projections;

  let m = 1e-6;
  for (let i = 0; i < n * 3; i++) { const a = Math.abs(proj[i]); if (a > m) m = a; }

  const cx = w * 0.5, cy = h * 0.52, sc = Math.min(w, h) * 0.32;
  const ry = phase * params.orbit, cosY = Math.cos(ry), sinY = Math.sin(ry), tilt = 0.32;

  // wireframe box (dotted far edges)
  const corners: Array<[number, number, number]> = [];
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) corners.push([sx, sy, sz]);
  const edges = [[0, 1], [1, 3], [3, 2], [2, 0], [4, 5], [5, 7], [7, 6], [6, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
  for (const [a, b] of edges) {
    const pa = project(corners[a][0], corners[a][1], corners[a][2], cx, cy, sc, cosY, sinY, tilt);
    const pb = project(corners[b][0], corners[b][1], corners[b][2], cx, cy, sc, cosY, sinY, tilt);
    const far = (pa[2] + pb[2]) / 2 > 0.2;
    ctx.strokeStyle = far ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.7)";
    ctx.setLineDash(far ? [2, 3] : []);
    ctx.beginPath(); ctx.moveTo(pa[0], pa[1]); ctx.lineTo(pb[0], pb[1]); ctx.stroke();
  }
  ctx.setLineDash([]);

  const selIdx = selection ? selection.row * N + selection.col : -1;
  let selPt: [number, number] | null = null;
  for (let i = 0; i < n; i++) {
    const x = proj[i * 3] / m, y = proj[i * 3 + 1] / m, z = proj[i * 3 + 2] / m;
    const [px, py, depth] = project(x, y, z, cx, cy, sc, cosY, sinY, tilt);
    const novelty = Math.sqrt(x * x + y * y + z * z) > 1.25;
    if (i === selIdx) { selPt = [px, py]; continue; }
    const col = CLUSTER_COLOURS[root.clusterLabels[i] % CLUSTER_COLOURS.length];
    ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${0.35 + depth * 0.4})`;
    const s = params.size * (novelty ? 1.7 : 1);
    ctx.fillRect(px, py, s, s);
    if (novelty) { ctx.strokeStyle = "rgba(240,64,42,0.6)"; ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.stroke(); }
  }
  if (selPt) drawReticle(ctx, selPt[0], selPt[1], 7);

  // labels + variance
  const ve = root.varianceExplained;
  ctx.fillStyle = "rgba(255,255,255,0.42)";
  ctx.font = "7px ui-monospace, monospace";
  ctx.fillText(`21 → 3-D reduction (PCA) · 3-PC var ${(ve[2] * 100) | 0}%`, 8, 12);
  ctx.fillText(`PC1 ${(ve[0] * 100) | 0}%`, cx + sc * 0.5, cy + sc * 0.92);
  ctx.fillText("PC2", cx - sc * 0.98, cy - sc * 0.72);
}
