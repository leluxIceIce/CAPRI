// Difference field — the pure, testable core of the "difference timeline".
// Pin two frames (A earlier, B later); this is B − A per cell for a channel, so
// the instruments can render *what changed* (grew vs retreated) instead of the
// raw field. It generalises the bloom detector's frame-to-frame trend to any
// channel, shown spatially. No fabricated numbers — straight cube arithmetic.

import type { DataCube, VariableName } from "@capri/core";

/** Per-cell change B − A for one channel. Returns a gridSize×gridSize matrix. */
export function channelDiff(a: DataCube, b: DataCube, channel: VariableName): number[][] {
  const n = Math.min(a.gridSize, b.gridSize);
  const ga = a.channels[channel];
  const gb = b.channels[channel];
  const out: number[][] = [];
  for (let r = 0; r < n; r++) {
    const row: number[] = [];
    for (let c = 0; c < n; c++) {
      const va = ga && ga[r] ? ga[r][c] : 0;
      const vb = gb && gb[r] ? gb[r][c] : 0;
      row.push((Number.isFinite(vb) ? vb : 0) - (Number.isFinite(va) ? va : 0));
    }
    out.push(row);
  }
  return out;
}

/** Largest absolute change in the field — the symmetric range for a diverging map. */
export function symmetricMax(diff: number[][]): number {
  let m = 0;
  for (const row of diff) for (const v of row) {
    const a = Math.abs(v);
    if (a > m) m = a;
  }
  return m;
}
