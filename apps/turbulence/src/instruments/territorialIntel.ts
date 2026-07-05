// Territorial Intel — the Po-river map translation. The scene as registered
// territory: a dim CHL base, a coordinate graticule, top CHL hotspots boxed with
// stats, and the GAIA bloom-risk field (from @capri/core) as a red overlay.

import type { DataCube } from "@capri/core";
import { norm, fieldColour, drawReticle, type Selection } from "./signatureField";

export interface IntelParams { graticule: number; hotspots: number }
export const DEFAULT_INTEL_PARAMS: IntelParams = { graticule: 0.6, hotspots: 4 };

export function drawTerritorialIntel(
  ctx: CanvasRenderingContext2D,
  cube: DataCube,
  risk: Float32Array,
  w: number, h: number,
  params: IntelParams,
  _phase: number,
  selection?: Selection,
): void {
  ctx.fillStyle = "#04060b";
  ctx.fillRect(0, 0, w, h);
  const N = cube.gridSize;
  const chl = cube.channels.CHL, cs = cube.stats.CHL;
  const cw = w / N, ch = h / N;

  // dim CHL base layer
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    const [cr, cg, cb] = fieldColour(norm(chl[r][c], cs.min, cs.max));
    ctx.fillStyle = `rgba(${cr},${cg},${cb},0.45)`;
    ctx.fillRect(c * cw, r * ch, cw + 1, ch + 1);
  }

  // bloom-risk overlay (GAIA) — red where the water is dangerous
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    const rk = risk[r * N + c];
    if (rk < 0.4) continue;
    ctx.fillStyle = `rgba(240,64,42,${(rk - 0.4) * 0.7})`;
    ctx.fillRect(c * cw, r * ch, cw, ch);
  }

  // coordinate graticule (uses real lat/lon when the cube carries coords)
  if (params.graticule > 0) {
    ctx.strokeStyle = `rgba(255,255,255,${0.22 * params.graticule})`;
    ctx.setLineDash([2, 4]); ctx.lineWidth = 0.6;
    for (let i = 1; i < 6; i++) {
      ctx.beginPath(); ctx.moveTo((w * i) / 6, 0); ctx.lineTo((w * i) / 6, h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, (h * i) / 6); ctx.lineTo(w, (h * i) / 6); ctx.stroke();
    }
    ctx.setLineDash([]);
    const coords = cube.coords;
    if (coords) {
      ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "6px ui-monospace, monospace";
      ctx.fillText(`${coords[N - 1][0].lat.toFixed(2)}°  ${coords[0][0].lon.toFixed(2)}°`, 4, h - 4);
    }
  }

  // top-N CHL hotspots, boxed with a stat
  const cells: Array<{ r: number; c: number; v: number }> = [];
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) cells.push({ r, c, v: chl[r][c] });
  cells.sort((a, b) => b.v - a.v);
  const k = Math.max(0, Math.round(params.hotspots));
  ctx.font = "6px ui-monospace, monospace";
  for (let i = 0; i < k && i < cells.length; i++) {
    const { r, c } = cells[i];
    ctx.strokeStyle = "rgba(255,255,255,0.8)"; ctx.lineWidth = 1;
    ctx.strokeRect(c * cw - 5, r * ch - 5, cw + 10, ch + 10);
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText(`CHL ${norm(chl[r][c], cs.min, cs.max).toFixed(2)}`, c * cw + 8, r * ch - 2);
  }

  if (selection) drawReticle(ctx, (selection.col + 0.5) * cw, (selection.row + 0.5) * ch, Math.max(7, Math.min(cw, ch)));
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "7px ui-monospace, monospace";
  ctx.fillText("▬ CHL field  ▢ hotspot  ▧ GAIA bloom-risk  ⋱ graticule", 8, 12);
}
