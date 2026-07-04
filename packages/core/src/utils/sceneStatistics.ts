// Genuine scene statistics that replace the old hand-tuned diagnostic heuristics
// (fixed GMM prototypes, magic-number thresholds, a fabricated novelty p-value).
// Everything here is computed from the cube's actual cell values:
//   • regime mixture  -> seeded k-means clustering of the cells themselves
//   • spatial front   -> Moran's I autocorrelation + mean gradient magnitude
//   • novelty         -> Mahalanobis multivariate-outlier test vs the χ² law
//
// No reference archive is invented: novelty is an INTERNAL test of whether the
// scene has more multivariate-outlier cells than a Gaussian of the same
// mean/covariance would produce — a real, self-contained statistic.

import { DataCube, VariableName } from "../types";
import { mulberry32, standardizeColumns } from "./mlData";

const SEED = 42;

// ── k-means (Lloyd's, seeded k-means++ init) ──────────────────────────────────

export interface KMeansResult {
  labels: number[];
  centroids: number[][];
  sizes: number[];
}

function sqDist(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) { const d = a[i] - b[i]; s += d * d; }
  return s;
}

export function seededKMeans(points: number[][], k: number, seed = SEED, maxIter = 50): KMeansResult {
  const n = points.length;
  const dim = n > 0 ? points[0].length : 0;
  if (n === 0 || k <= 0) return { labels: [], centroids: [], sizes: [] };
  const kk = Math.min(k, n);
  const rng = mulberry32(seed);

  // k-means++ seeding.
  const centroids: number[][] = [];
  centroids.push(points[Math.floor(rng() * n)].slice());
  while (centroids.length < kk) {
    const d2 = points.map((p) => Math.min(...centroids.map((c) => sqDist(p, c))));
    const total = d2.reduce((a, b) => a + b, 0) || 1;
    let r = rng() * total;
    let idx = 0;
    for (let i = 0; i < n; i++) { r -= d2[i]; if (r <= 0) { idx = i; break; } }
    centroids.push(points[idx].slice());
  }

  const labels = new Array(n).fill(0);
  for (let iter = 0; iter < maxIter; iter++) {
    let changed = false;
    for (let i = 0; i < n; i++) {
      let best = 0, bestD = Infinity;
      for (let c = 0; c < kk; c++) { const d = sqDist(points[i], centroids[c]); if (d < bestD) { bestD = d; best = c; } }
      if (labels[i] !== best) { labels[i] = best; changed = true; }
    }
    const sums = Array.from({ length: kk }, () => new Array(dim).fill(0));
    const counts = new Array(kk).fill(0);
    for (let i = 0; i < n; i++) { counts[labels[i]]++; for (let j = 0; j < dim; j++) sums[labels[i]][j] += points[i][j]; }
    for (let c = 0; c < kk; c++) {
      if (counts[c] === 0) continue;
      for (let j = 0; j < dim; j++) centroids[c][j] = sums[c][j] / counts[c];
    }
    if (!changed && iter > 0) break;
  }

  const sizes = new Array(kk).fill(0);
  for (const l of labels) sizes[l]++;
  return { labels, centroids, sizes };
}

/** Normalized Shannon entropy (base = number of classes) of a proportion vector,
 *  in [0,1]. 0 = one regime dominates; 1 = perfectly even mixture. */
export function normalizedEntropy(proportions: number[]): number {
  const k = proportions.length;
  if (k <= 1) return 0;
  let h = 0;
  for (const p of proportions) { if (p > 0) h -= p * Math.log(p); }
  return h / Math.log(k);
}

// ── Spatial statistics ────────────────────────────────────────────────────────

/** Moran's I spatial autocorrelation (rook contiguity) for a 2-D grid.
 *  +1 = strong spatial clustering/smoothness, ~0 = no spatial structure,
 *  <0 = checkerboard/dispersion. A textbook spatial statistic. */
export function moransI(grid: number[][]): number {
  const rows = grid.length;
  const cols = rows > 0 ? grid[0].length : 0;
  const n = rows * cols;
  if (n < 4) return 0;
  let mean = 0;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) mean += grid[r][c];
  mean /= n;
  let num = 0, den = 0, W = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dz = grid[r][c] - mean;
      den += dz * dz;
      const neigh = [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]];
      for (const [nr, nc] of neigh) {
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
        num += dz * (grid[nr][nc] - mean);
        W += 1;
      }
    }
  }
  if (den === 0 || W === 0) return 0;
  return (n / W) * (num / den);
}

/** Mean finite-difference gradient magnitude of a grid, normalized by the
 *  field's own range -> a dimensionless spatial-heterogeneity index (0 = flat). */
export function meanGradientMagnitude(grid: number[][]): number {
  const rows = grid.length;
  const cols = rows > 0 ? grid[0].length : 0;
  if (rows < 2 || cols < 2) return 0;
  let lo = Infinity, hi = -Infinity;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const v = grid[r][c]; if (v < lo) lo = v; if (v > hi) hi = v; }
  const range = hi - lo || 1;
  let sum = 0, count = 0;
  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols - 1; c++) {
      const gx = grid[r][c + 1] - grid[r][c];
      const gy = grid[r + 1][c] - grid[r][c];
      sum += Math.sqrt(gx * gx + gy * gy);
      count++;
    }
  }
  return count > 0 ? (sum / count) / range : 0;
}

// ── Mahalanobis multivariate-outlier test ─────────────────────────────────────

/** Invert a symmetric d×d matrix with ridge regularization (Gauss–Jordan).
 *  Ridge (λ on the diagonal) keeps singular/near-singular covariances invertible. */
export function invertSymmetric(mat: number[][], ridge = 1e-6): number[][] | null {
  const d = mat.length;
  const a = mat.map((row, i) => row.map((v, j) => v + (i === j ? ridge : 0)));
  const inv = Array.from({ length: d }, (_, i) => Array.from({ length: d }, (_, j) => (i === j ? 1 : 0)));
  for (let col = 0; col < d; col++) {
    let piv = col;
    for (let r = col + 1; r < d; r++) if (Math.abs(a[r][col]) > Math.abs(a[piv][col])) piv = r;
    if (Math.abs(a[piv][col]) < 1e-12) return null;
    [a[col], a[piv]] = [a[piv], a[col]];
    [inv[col], inv[piv]] = [inv[piv], inv[col]];
    const p = a[col][col];
    for (let j = 0; j < d; j++) { a[col][j] /= p; inv[col][j] /= p; }
    for (let r = 0; r < d; r++) {
      if (r === col) continue;
      const f = a[r][col];
      for (let j = 0; j < d; j++) { a[r][j] -= f * a[col][j]; inv[r][j] -= f * inv[col][j]; }
    }
  }
  return inv;
}

/** Standard normal CDF via the Abramowitz–Stegun erf approximation. */
export function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp(-z * z / 2);
  const p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z >= 0 ? 1 - p : p;
}

/** χ²_p quantile via the Wilson–Hilferty normal approximation (good for the
 *  upper critical values we need; df up to ~14). */
export function chiSquareQuantile(df: number, p: number): number {
  // standard-normal quantile for p via rational approximation (Beasley–Springer)
  const zp = normalQuantile(p);
  const t = 1 - 2 / (9 * df) + zp * Math.sqrt(2 / (9 * df));
  return df * t * t * t;
}

function normalQuantile(p: number): number {
  // Acklam's inverse-normal approximation.
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.383577518672690e2, -3.066479806614716e1, 2.506628277459239];
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
  const pl = 0.02425;
  if (p < pl) { const q = Math.sqrt(-2 * Math.log(p)); return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  if (p <= 1 - pl) { const q = p - 0.5, r = q * q; return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1); }
  const q = Math.sqrt(-2 * Math.log(1 - p)); return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
}

export interface OutlierTest {
  /** fraction of cells whose Mahalanobis d² exceeds the χ²_{0.975} critical value */
  outlierFraction: number;
  /** fraction a multivariate-normal scene would produce by chance (= 1 − 0.975) */
  expectedFraction: number;
  /** one-sided p-value: P(observed ≥ this many outliers | Gaussian), normal-approx binomial */
  pValue: number;
  dims: number;
  nCells: number;
}

/**
 * Mahalanobis multivariate-outlier test. Computes each cell's squared
 * Mahalanobis distance from the scene's own mean & (ridge-regularized)
 * covariance, counts how many exceed the χ²_{0.975}(d) critical value, and
 * tests — via a normal-approximation binomial — whether that exceeds the 2.5%
 * a Gaussian would yield. A small p-value => the scene is genuinely heavier-
 * tailed / more anomalous than multivariate-normal.
 */
export function mahalanobisOutlierTest(rows: number[][], alpha = 0.025): OutlierTest {
  const n = rows.length;
  const d = n > 0 ? rows[0].length : 0;
  const expectedFraction = alpha;
  if (n < d + 2 || d < 1) {
    return { outlierFraction: 0, expectedFraction, pValue: 1, dims: d, nCells: n };
  }
  const mean = new Array(d).fill(0);
  for (const row of rows) for (let j = 0; j < d; j++) mean[j] += row[j];
  for (let j = 0; j < d; j++) mean[j] /= n;

  const cov = Array.from({ length: d }, () => new Array(d).fill(0));
  for (const row of rows) {
    for (let i = 0; i < d; i++) {
      const di = row[i] - mean[i];
      for (let j = i; j < d; j++) { const v = di * (row[j] - mean[j]); cov[i][j] += v; if (i !== j) cov[j][i] += v; }
    }
  }
  for (let i = 0; i < d; i++) for (let j = 0; j < d; j++) cov[i][j] /= (n - 1);

  const inv = invertSymmetric(cov, 1e-6);
  if (!inv) return { outlierFraction: 0, expectedFraction, pValue: 1, dims: d, nCells: n };

  const crit = chiSquareQuantile(d, 1 - alpha);
  let outliers = 0;
  const tmp = new Array(d).fill(0);
  for (const row of rows) {
    for (let i = 0; i < d; i++) tmp[i] = row[i] - mean[i];
    let dm = 0;
    for (let i = 0; i < d; i++) { let s = 0; for (let j = 0; j < d; j++) s += inv[i][j] * tmp[j]; dm += tmp[i] * s; }
    if (dm > crit) outliers++;
  }

  const observed = outliers / n;
  // One-sided binomial test (normal approximation) of observed > alpha.
  const se = Math.sqrt((alpha * (1 - alpha)) / n) || 1e-9;
  const z = (observed - alpha) / se;
  const pValue = Math.max(1e-6, 1 - normalCdf(z));
  return { outlierFraction: observed, expectedFraction, pValue, dims: d, nCells: n };
}

// ── Cube helpers ──────────────────────────────────────────────────────────────

/** Build per-cell vectors for the requested channels (raw values). */
export function cellVectors(cube: DataCube, channels: VariableName[]): number[][] {
  const g = cube.gridSize;
  const out: number[][] = [];
  for (let r = 0; r < g; r++) {
    for (let c = 0; c < g; c++) {
      out.push(channels.map((ch) => { const v = cube.channels[ch]?.[r]?.[c]; return Number.isFinite(v) ? (v as number) : 0; }));
    }
  }
  return out;
}

/** Channels (from a candidate list) that actually vary in this cube — drops
 *  zero-filled/constant bands so covariance & clustering stay non-degenerate. */
export function informativeChannels(cube: DataCube, candidates: VariableName[]): VariableName[] {
  return candidates.filter((ch) => (cube.stats[ch]?.std ?? 0) > 1e-4);
}

export { standardizeColumns };
