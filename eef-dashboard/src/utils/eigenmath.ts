import { DataCube, VariableName } from "../types";

export const VARS: VariableName[] = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490", "FLH", "CHL_disagreement", "OA01", "OA02", "OA03", "OA04", "OA05", "OA06", "OA07", "OA08", "OA09", "OA10", "OA11", "OA13"];
// Feature dimensionality of the matrix extractDataMatrix produces. Exported so
// consumers (e.g. attractor PCA) use the real width instead of a stale literal.
export const FEATURE_DIM = VARS.length;
const D = FEATURE_DIM;

export function extractDataMatrix(cube: DataCube): Float64Array {
  const n = cube.gridSize * cube.gridSize;
  const X = new Float64Array(n * D);
  for (let v = 0; v < D; v++) {
    const varName = VARS[v];
    const grid = cube.channels[varName];
    const { mean, std } = cube.stats[varName];
    const s = std > 1e-12 ? std : null; // null = constant band
    for (let r = 0; r < cube.gridSize; r++) {
      for (let c = 0; c < cube.gridSize; c++) {
        X[(r * cube.gridSize + c) * D + v] = s !== null ? (grid[r][c] - mean) / s : 0.0;
      }
    }
  }
  return X;
}

export function covarianceMatrix(X: Float64Array, n: number, d: number): Float64Array {
  const C = new Float64Array(d * d);
  for (let i = 0; i < d; i++) {
    for (let j = i; j < d; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += X[k * d + i] * X[k * d + j];
      }
      const val = sum / (n - 1);
      C[i * d + j] = val;
      C[j * d + i] = val;
    }
  }
  return C;
}

export function jacobiEigen(
  Cin: Float64Array,
  d: number
): { values: Float64Array; vectors: Float64Array } {
  const A = new Float64Array(Cin);
  const V = new Float64Array(d * d);
  for (let i = 0; i < d; i++) V[i * d + i] = 1;

  // Compute initial Frobenius norm for relative convergence threshold
  let initOffDiag = 0;
  for (let p = 0; p < d; p++)
    for (let q = p + 1; q < d; q++)
      initOffDiag += Cin[p * d + q] * Cin[p * d + q];
  const relThreshold = initOffDiag * 1e-20;

  for (let sweep = 0; sweep < 100; sweep++) {
    let offDiag = 0;
    for (let p = 0; p < d; p++)
      for (let q = p + 1; q < d; q++)
        offDiag += A[p * d + q] * A[p * d + q];
    if (offDiag < relThreshold || offDiag < 1e-30) break;

    for (let p = 0; p < d; p++) {
      for (let q = p + 1; q < d; q++) {
        const apq = A[p * d + q];
        if (Math.abs(apq) < 1e-15) continue;

        const tau = (A[q * d + q] - A[p * d + p]) / (2 * apq);
        const t = Math.sign(tau) / (Math.abs(tau) + Math.sqrt(1 + tau * tau));
        const cosT = 1 / Math.sqrt(1 + t * t);
        const sinT = t * cosT;

        A[p * d + p] -= t * apq;
        A[q * d + q] += t * apq;
        A[p * d + q] = 0;
        A[q * d + p] = 0;

        for (let r = 0; r < d; r++) {
          if (r === p || r === q) continue;
          const arp = A[r * d + p];
          const arq = A[r * d + q];
          A[r * d + p] = A[p * d + r] = cosT * arp - sinT * arq;
          A[r * d + q] = A[q * d + r] = sinT * arp + cosT * arq;
        }

        for (let r = 0; r < d; r++) {
          const vrp = V[r * d + p];
          const vrq = V[r * d + q];
          V[r * d + p] = cosT * vrp - sinT * vrq;
          V[r * d + q] = sinT * vrp + cosT * vrq;
        }
      }
    }
  }

  const eigenvalues = new Float64Array(d);
  for (let i = 0; i < d; i++) eigenvalues[i] = A[i * d + i];

  const indices = Array.from({ length: d }, (_, i) => i);
  indices.sort((a, b) => eigenvalues[b] - eigenvalues[a]);

  const sortedValues = new Float64Array(d);
  const sortedVectors = new Float64Array(d * d);
  for (let newIdx = 0; newIdx < d; newIdx++) {
    const oldIdx = indices[newIdx];
    sortedValues[newIdx] = eigenvalues[oldIdx];
    for (let r = 0; r < d; r++) {
      sortedVectors[r * d + newIdx] = V[r * d + oldIdx];
    }
  }
  return { values: sortedValues, vectors: sortedVectors };
}

export function projectCells(
  X: Float64Array,
  vectors: Float64Array,
  n: number,
  d: number,
  k: number
): Float64Array {
  const P = new Float64Array(n * k);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < k; j++) {
      let dot = 0;
      for (let v = 0; v < d; v++) {
        dot += X[i * d + v] * vectors[v * d + j];
      }
      P[i * k + j] = dot;
    }
  }
  return P;
}

export function kMeansClusters(
  desc: Float64Array,
  n: number,
  dims: number,
  k: number
): { labels: Uint8Array; centroids: Float64Array } {
  const centroids = new Float64Array(k * dims);
  const labels = new Uint8Array(n);

  // Deterministic RNG (mulberry32). k-means previously used Math.random(), so the
  // latent-ecology regimes, cluster colours, and "dominant regime" prose changed
  // on every run for identical input — which (rightly) made the output look
  // arbitrary. Seeding from the problem size makes identical input reproducible.
  let seed = (0x9e3779b9 ^ (n * 2654435761) ^ (dims * 40503)) >>> 0;
  const rng = () => {
    seed = (seed + 0x6d2b79f5) >>> 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  // k-means++ initialization
  const firstIdx = Math.floor(rng() * n);
  for (let d = 0; d < dims; d++) centroids[d] = desc[firstIdx * dims + d];

  const dists = new Float64Array(n).fill(Infinity);
  for (let c = 1; c < k; c++) {
    for (let i = 0; i < n; i++) {
      let d2 = 0;
      for (let d = 0; d < dims; d++) {
        const diff = desc[i * dims + d] - centroids[(c - 1) * dims + d];
        d2 += diff * diff;
      }
      if (d2 < dists[i]) dists[i] = d2;
    }
    let total = 0;
    for (let i = 0; i < n; i++) total += dists[i];
    let r = rng() * total;
    let chosen = 0;
    for (let i = 0; i < n; i++) {
      r -= dists[i];
      if (r <= 0) { chosen = i; break; }
    }
    for (let d = 0; d < dims; d++) centroids[c * dims + d] = desc[chosen * dims + d];
  }

  // Lloyd iterations
  for (let iter = 0; iter < 15; iter++) {
    // Assign
    for (let i = 0; i < n; i++) {
      let bestDist = Infinity;
      let bestC = 0;
      for (let c = 0; c < k; c++) {
        let d2 = 0;
        for (let d = 0; d < dims; d++) {
          const diff = desc[i * dims + d] - centroids[c * dims + d];
          d2 += diff * diff;
        }
        if (d2 < bestDist) { bestDist = d2; bestC = c; }
      }
      labels[i] = bestC;
    }
    // Update centroids
    const counts = new Float64Array(k);
    const sums = new Float64Array(k * dims);
    for (let i = 0; i < n; i++) {
      const c = labels[i];
      counts[c]++;
      for (let d = 0; d < dims; d++) sums[c * dims + d] += desc[i * dims + d];
    }
    for (let c = 0; c < k; c++) {
      if (counts[c] === 0) continue;
      for (let d = 0; d < dims; d++) centroids[c * dims + d] = sums[c * dims + d] / counts[c];
    }
  }

  return { labels, centroids };
}

export interface RootAnalysis {
  eigenvalues: Float64Array;
  eigenvectors: Float64Array;
  projections: Float64Array;
  clusterLabels: Uint8Array;
  clusterCount: number;
  varianceExplained: number[];
}

let cachedCov: Float64Array | null = null;
let cachedResult: RootAnalysis | null = null;

function frobeniusDist(a: Float64Array, b: Float64Array): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const d = a[i] - b[i];
    sum += d * d;
  }
  return Math.sqrt(sum);
}

export function computeRootAnalysis(cube: DataCube, clusterCount = 5): RootAnalysis {
  const n = cube.gridSize * cube.gridSize;
  const X = extractDataMatrix(cube);
  const C = covarianceMatrix(X, n, D);

  if (cachedCov && cachedResult && frobeniusDist(C, cachedCov) < 0.40) {
    return cachedResult;
  }

  const { values, vectors } = jacobiEigen(C, D);
  const projections = projectCells(X, vectors, n, D, 3);
  const { labels } = kMeansClusters(projections, n, 3, clusterCount);

  const totalVar = values.reduce((s, v) => s + Math.max(0, v), 0) || 1;
  const varianceExplained: number[] = [];
  let cumulative = 0;
  for (let i = 0; i < 3; i++) {
    cumulative += Math.max(0, values[i]);
    varianceExplained.push(cumulative / totalVar);
  }

  cachedCov = new Float64Array(C);
  cachedResult = { eigenvalues: values, eigenvectors: vectors, projections, clusterLabels: labels, clusterCount, varianceExplained };
  return cachedResult;
}
