// Shared data prep + metrics for the in-browser ML tools (UMAP embedding and
// Random-Forest regression). Everything here operates on REAL DataCube values —
// each grid cell becomes one sample whose features are its 14 spectral/derived
// channels. No synthetic stand-ins, no fabricated scores: the panels that use
// this compute genuinely from the observed (or uploaded) cube.

import { DataCube, VariableName, VARIABLE_METADATA } from "../types";

/** All 14 channels, in canonical metadata order. */
export const ALL_VARIABLES = Object.keys(VARIABLE_METADATA) as VariableName[];

export interface SampleMatrix {
  /** rows[i] = the feature vector for cell cellRefs[i]; columns follow featureNames. */
  rows: number[][];
  cellRefs: { row: number; col: number }[];
  featureNames: VariableName[];
}

/**
 * Flatten a DataCube into one sample per grid cell. By default every channel is
 * a feature; pass `features` to restrict the columns (e.g. to drop a regression
 * target from the predictor set).
 */
export function buildSamples(cube: DataCube, features: VariableName[] = ALL_VARIABLES): SampleMatrix {
  const g = cube.gridSize;
  const rows: number[][] = [];
  const cellRefs: { row: number; col: number }[] = [];
  for (let r = 0; r < g; r++) {
    for (let c = 0; c < g; c++) {
      const vec = features.map((f) => {
        const v = cube.channels[f]?.[r]?.[c];
        return Number.isFinite(v) ? (v as number) : 0;
      });
      rows.push(vec);
      cellRefs.push({ row: r, col: c });
    }
  }
  return { rows, cellRefs, featureNames: features };
}

/** Extract one channel's value for every cell, in the same order as buildSamples. */
export function extractColumn(cube: DataCube, varName: VariableName): number[] {
  const g = cube.gridSize;
  const out: number[] = [];
  for (let r = 0; r < g; r++) {
    for (let c = 0; c < g; c++) {
      const v = cube.channels[varName]?.[r]?.[c];
      out.push(Number.isFinite(v) ? (v as number) : 0);
    }
  }
  return out;
}

/** Column-wise z-score standardization. Returns the transformed matrix + the
 *  per-column mean/std used (std floored to 1e-9 so constant columns don't blow up). */
export function standardizeColumns(rows: number[][]): { z: number[][]; means: number[]; stds: number[] } {
  const n = rows.length;
  const d = n > 0 ? rows[0].length : 0;
  const means = new Array(d).fill(0);
  const stds = new Array(d).fill(0);
  for (let j = 0; j < d; j++) {
    let s = 0;
    for (let i = 0; i < n; i++) s += rows[i][j];
    means[j] = s / n;
    let v = 0;
    for (let i = 0; i < n; i++) { const dx = rows[i][j] - means[j]; v += dx * dx; }
    stds[j] = Math.sqrt(v / n) || 1e-9;
  }
  const z = rows.map((row) => row.map((val, j) => (val - means[j]) / stds[j]));
  return { z, means, stds };
}

/** Deterministic PRNG (mulberry32) so every run is reproducible from a seed —
 *  the app committed to reproducible analytics in the Sprint 7 honesty pass. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Pick up to `max` distinct indices from [0,n) deterministically (seeded
 *  Fisher–Yates prefix). Returns all indices if n <= max. */
export function subsampleIndices(n: number, max: number, seed: number): number[] {
  const idx = Array.from({ length: n }, (_, i) => i);
  if (n <= max) return idx;
  const rng = mulberry32(seed);
  for (let i = 0; i < max; i++) {
    const j = i + Math.floor(rng() * (n - i));
    const t = idx[i]; idx[i] = idx[j]; idx[j] = t;
  }
  return idx.slice(0, max);
}

/** Coefficient of determination R² of predictions vs. truth. */
export function rSquared(yTrue: number[], yPred: number[]): number {
  const n = yTrue.length;
  if (n === 0) return NaN;
  const mean = yTrue.reduce((a, b) => a + b, 0) / n;
  let ssRes = 0, ssTot = 0;
  for (let i = 0; i < n; i++) {
    ssRes += (yTrue[i] - yPred[i]) ** 2;
    ssTot += (yTrue[i] - mean) ** 2;
  }
  if (ssTot === 0) return NaN; // constant target — R² undefined
  return 1 - ssRes / ssTot;
}

/** Root-mean-square error. */
export function rmse(yTrue: number[], yPred: number[]): number {
  const n = yTrue.length;
  if (n === 0) return NaN;
  let s = 0;
  for (let i = 0; i < n; i++) s += (yTrue[i] - yPred[i]) ** 2;
  return Math.sqrt(s / n);
}
