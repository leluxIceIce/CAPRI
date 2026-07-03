// GAIA Source Adapter Layer (Squad S)
// ─────────────────────────────────────────────────────────────────────────
// A `SourceAdapter` is anything that converts some external input into the
// dashboard's universal `DataCube` contract (src/types.ts). Synthetic
// generation, CSV upload, GeoTIFF satellite tiles, and (separately) edge
// sensors all reduce to: input → DataCube[].
//
// This module defines the interface + the small set of grid helpers every
// adapter needs (blank grids, normalization, stats), so each adapter stays
// thin and consistent. Existing data paths are WRAPPED, not rewritten — see
// sourceAdapters.ts.

import type { DataCube, VariableName, VariableStats } from "../types";

/**
 * Converts a source-specific input into one or more DataCubes (one per time
 * frame). Async so adapters that fetch/decode (GeoTIFF, network) fit the same
 * shape as synchronous ones.
 */
export interface SourceAdapter<TInput = unknown> {
  /** Stable machine id, e.g. "synthetic" | "csv" | "geotiff". */
  readonly id: string;
  /** Human-facing label for UI/source pickers. */
  readonly label: string;
  ingest(input: TInput): Promise<DataCube[]>;
}

// ── Shared grid helpers ────────────────────────────────────────────────────

/** Row-major gridSize×gridSize grid filled with `fill` (default 0). */
export function makeGrid(gridSize: number, fill = 0): number[][] {
  const grid: number[][] = [];
  for (let r = 0; r < gridSize; r++) grid.push(new Array(gridSize).fill(fill));
  return grid;
}

/** Min/max/mean/std over a grid. Matches telemetryGenerator's computeGridStats. */
export function gridStats(grid: number[][]): VariableStats {
  let min = Infinity, max = -Infinity, sum = 0, n = 0;
  for (const row of grid) {
    for (const v of row) {
      if (v < min) min = v;
      if (v > max) max = v;
      sum += v;
      n++;
    }
  }
  if (n === 0) return { min: 0, max: 0, mean: 0, std: 0 };
  const mean = sum / n;
  let varAcc = 0;
  for (const row of grid) for (const v of row) { const d = v - mean; varAcc += d * d; }
  return { min, max, mean, std: Math.sqrt(varAcc / n) };
}

/**
 * Min-max normalize a grid into [0,1] in place. A constant grid (zero range)
 * maps to all-zeros (NOT all-0.5), consistent with the zero-variance handling
 * adopted in eigenmath after the dimension audit.
 */
export function normalizeGrid(grid: number[][]): number[][] {
  let min = Infinity, max = -Infinity;
  for (const row of grid) for (const v of row) { if (v < min) min = v; if (v > max) max = v; }
  const range = max - min;
  if (!(range > 0)) {
    for (const row of grid) for (let c = 0; c < row.length; c++) row[c] = 0;
    return grid;
  }
  for (const row of grid) for (let c = 0; c < row.length; c++) row[c] = (row[c] - min) / range;
  return grid;
}

/** Convenience: build the stats record for a fully-populated channels record. */
export function statsForChannels(channels: Record<VariableName, number[][]>): Record<VariableName, VariableStats> {
  const stats = {} as Record<VariableName, VariableStats>;
  (Object.keys(channels) as VariableName[]).forEach((k) => { stats[k] = gridStats(channels[k]); });
  return stats;
}

/** True if every cell of every channel is a finite number in [0,1]. */
export function isWellFormedCube(cube: DataCube): boolean {
  for (const key of Object.keys(cube.channels) as VariableName[]) {
    const grid = cube.channels[key];
    if (grid.length !== cube.gridSize) return false;
    for (const row of grid) {
      if (row.length !== cube.gridSize) return false;
      for (const v of row) {
        if (!Number.isFinite(v)) return false;
        // CHL_disagreement is signed by design; others must be in [0,1].
        if (key !== "CHL_disagreement" && (v < 0 || v > 1)) return false;
      }
    }
  }
  return true;
}
