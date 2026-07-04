// Pixel probe — the pure, testable core of the Inspector's "Probe" face.
// Click a cell in any instrument → this reads its real per-channel values and
// z-scores straight from the DataCube (the pixel inspector, reborn as a context
// face). No fabricated numbers: everything comes from the shared engine.

import type { DataCube, VariableName } from "@capri/core";

/** Channels surfaced in the probe dossier, in a scientifically legible order. */
export const PROBE_CHANNELS: VariableName[] = [
  "CHL", "FLH", "TSM", "aphy", "ADG", "bbp", "KD490", "PAR", "CHL_disagreement",
];

export interface Reading {
  name: VariableName;
  value: number;
  /** Standardised deviation from the scene mean (σ). 0 when the field is flat. */
  z: number;
}

function readingFor(cube: DataCube, name: VariableName, row: number, col: number): Reading {
  const grid = cube.channels[name];
  const raw = grid && grid[row] ? grid[row][col] : 0;
  const value = Number.isFinite(raw) ? raw : 0;
  const s = cube.stats[name];
  const z = s && s.std > 1e-9 ? (value - s.mean) / s.std : 0;
  return { name, value, z };
}

/** Full per-cell dossier for the probed grid cell. */
export function cellReadout(cube: DataCube, row: number, col: number): Reading[] {
  const r = clampIndex(row, cube.gridSize);
  const c = clampIndex(col, cube.gridSize);
  return PROBE_CHANNELS.map((name) => readingFor(cube, name, r, c));
}

function clampIndex(i: number, n: number): number {
  if (!Number.isFinite(i)) return 0;
  const k = Math.floor(i);
  return k < 0 ? 0 : k > n - 1 ? n - 1 : k;
}

/** Map a normalised click position (0..1 in each axis) to a grid cell. */
export function pickCell(nx: number, ny: number, gridSize: number): { row: number; col: number } {
  return {
    row: clampIndex(ny * gridSize, gridSize),
    col: clampIndex(nx * gridSize, gridSize),
  };
}
