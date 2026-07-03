// EEF Layer 2 — Spatial Structure Engine (TS port of capri/spatial_structure.py
// `SpatialStructureExtractor.compute_tensor`, no-padding path).
//
// Computes 9 spatial descriptors per variable across the 20x20 grid:
//   gradient_dx, gradient_dy, laplacian, variance, entropy, moran,
//   semivariance, patchiness, texture_contrast
//
// Output is a flat Float32Array of shape (gridSize, gridSize, V * 9) = (20, 20, 81)
// for the 9 canonical variables, row-major over (row, col, channel),
// where channel = v*9 + descriptorIdx.

import { DataCube, VariableName, SpatialDescriptorName } from "../types";
import { flattenGrid, buildPaddedGrid, boxBlur3x3, convolve3x3 } from "./gridOps";

export type { SpatialDescriptorName };

const VARS: VariableName[] = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490", "FLH", "CHL_disagreement"];

export const SPATIAL_DESCRIPTORS: SpatialDescriptorName[] = [
  "gradient_dx",
  "gradient_dy",
  "laplacian",
  "variance",
  "entropy",
  "moran",
  "semivariance",
  "patchiness",
  "texture_contrast",
];

const FEATURES_PER_VAR = SPATIAL_DESCRIPTORS.length; // 9

export interface SpatialTensor {
  data: Float32Array;
  gridSize: number;
  featureNames: string[];
}

// ── Descriptor implementations (operate on a row-major (gridSize x gridSize) grid) ──

// scipy.ndimage.sobel correlate kernels (axis=1 -> dx, axis=0 -> dy)
const SOBEL_DX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
const SOBEL_DY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

// ndimage.laplace: 4-neighbor discrete Laplacian (N+S+E+W - 4*center)
const LAPLACE_KERNEL = [0, 1, 0, 1, -4, 1, 0, 1, 0];

// Moran's I weight matrix: 8 neighbors, weight 1/8 each, center 0
const MORAN_WEIGHTS = [1 / 8, 1 / 8, 1 / 8, 1 / 8, 0, 1 / 8, 1 / 8, 1 / 8, 1 / 8];

function minMaxNormalize(arr: Float32Array): Float32Array {
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
    if (arr[i] > max) max = arr[i];
  }
  const out = new Float32Array(arr.length);
  if (max > min) {
    const range = max - min;
    for (let i = 0; i < arr.length; i++) out[i] = (arr[i] - min) / range;
  } else {
    out.fill(0.5);
  }
  return out;
}

function computeGradientDx(padded: Float32Array, paddedSize: number, gridSize: number): Float32Array {
  const dx = convolve3x3(SOBEL_DX, gridSize, { mode: "reflect", padded, paddedSize });
  return minMaxNormalize(dx);
}

function computeGradientDy(padded: Float32Array, paddedSize: number, gridSize: number): Float32Array {
  const dy = convolve3x3(SOBEL_DY, gridSize, { mode: "reflect", padded, paddedSize });
  return minMaxNormalize(dy);
}

function computeLaplacian(padded: Float32Array, paddedSize: number, gridSize: number): Float32Array {
  const lap = convolve3x3(LAPLACE_KERNEL, gridSize, { mode: "reflect", padded, paddedSize });
  return minMaxNormalize(lap);
}

function computeLocalVariance(padded: Float32Array, paddedSq: Float32Array, paddedSize: number, gridSize: number): Float32Array {
  const meanVal = boxBlur3x3(padded, paddedSize, gridSize);
  const sqMeanVal = boxBlur3x3(paddedSq, paddedSize, gridSize);
  const out = new Float32Array(gridSize * gridSize);
  let vMax = -Infinity;
  for (let i = 0; i < out.length; i++) {
    let v = sqMeanVal[i] - meanVal[i] * meanVal[i];
    if (v < 0) v = 0;
    out[i] = v;
    if (v > vMax) vMax = v;
  }
  vMax += 1e-6;
  for (let i = 0; i < out.length; i++) out[i] /= vMax;
  return out;
}

function computeLocalEntropy(grid: Float32Array, gridSize: number): Float32Array {
  const n = gridSize * gridSize;
  const discrete = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    let d = Math.floor(grid[i] * 9.99);
    if (d < 0) d = 0;
    if (d > 9) d = 9;
    discrete[i] = d;
  }

  const out = new Float32Array(n);
  const r = 1; // window_size // 2, window_size = 3

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const iMin = Math.max(0, i - r);
      const iMax = Math.min(gridSize, i + r + 1);
      const jMin = Math.max(0, j - r);
      const jMax = Math.min(gridSize, j + r + 1);

      const counts = new Map<number, number>();
      let total = 0;
      for (let ii = iMin; ii < iMax; ii++) {
        for (let jj = jMin; jj < jMax; jj++) {
          const val = discrete[ii * gridSize + jj];
          counts.set(val, (counts.get(val) || 0) + 1);
          total++;
        }
      }

      let entropy = 0;
      counts.forEach((count) => {
        const p = count / total;
        entropy += -(p * Math.log2(p + 1e-8));
      });

      let v = entropy / 3.32;
      if (v < 0) v = 0;
      if (v > 1) v = 1;
      out[i * gridSize + j] = v;
    }
  }
  return out;
}

function computeLocalMoran(grid: Float32Array, gridSize: number): Float32Array {
  const n = grid.length;
  let sum = 0;
  for (let i = 0; i < n; i++) sum += grid[i];
  const mean = sum / n;
  let sqSum = 0;
  for (let i = 0; i < n; i++) {
    const d = grid[i] - mean;
    sqSum += d * d;
  }
  const std = Math.sqrt(sqSum / n) + 1e-6;

  const z = new Float32Array(n);
  for (let i = 0; i < n; i++) z[i] = (grid[i] - mean) / std;

  // mode='constant', cval=0.0 -> operate directly on z with constant boundary
  const zLag = convolve3x3(MORAN_WEIGHTS, gridSize, { mode: "constant", grid: z, cval: 0 });

  const moranI = new Float32Array(n);
  for (let i = 0; i < n; i++) moranI[i] = z[i] * zLag[i];

  return minMaxNormalize(moranI);
}

function computeLocalSemivariance(grid: Float32Array, gridSize: number): Float32Array {
  const out = new Float32Array(grid.length);
  const r = 1;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const iMin = Math.max(0, i - r);
      const iMax = Math.min(gridSize, i + r + 1);
      const jMin = Math.max(0, j - r);
      const jMax = Math.min(gridSize, j + r + 1);

      const centerVal = grid[i * gridSize + j];
      let sumSq = 0;
      let count = 0;
      for (let ii = iMin; ii < iMax; ii++) {
        for (let jj = jMin; jj < jMax; jj++) {
          const diff = grid[ii * gridSize + jj] - centerVal;
          sumSq += diff * diff;
          count++;
        }
      }
      out[i * gridSize + j] = 0.5 * (sumSq / count);
    }
  }

  let svMax = -Infinity;
  for (let i = 0; i < out.length; i++) if (out[i] > svMax) svMax = out[i];
  svMax += 1e-6;
  for (let i = 0; i < out.length; i++) out[i] /= svMax;
  return out;
}

// Computes the median of a Float32Array (copy + sort).
function median(arr: Float32Array): number {
  const sorted = Array.from(arr).sort((a, b) => a - b);
  const n = sorted.length;
  const mid = Math.floor(n / 2);
  if (n % 2 === 0) return (sorted[mid - 1] + sorted[mid]) / 2;
  return sorted[mid];
}

// 8-connected connected component labeling via BFS (equivalent to
// ndimage.label with structure=np.ones((3,3))).
function computePatchiness(grid: Float32Array, gridSize: number): Float32Array {
  const n = grid.length;
  const threshold = median(grid);
  const binaryMask = new Uint8Array(n);
  for (let i = 0; i < n; i++) binaryMask[i] = grid[i] > threshold ? 1 : 0;

  const labels = new Int32Array(n).fill(0); // 0 = background
  let nextLabel = 1;
  const queue: number[] = [];

  for (let start = 0; start < n; start++) {
    if (binaryMask[start] !== 1 || labels[start] !== 0) continue;

    labels[start] = nextLabel;
    queue.length = 0;
    queue.push(start);

    while (queue.length > 0) {
      const idx = queue.pop()!;
      const r = Math.floor(idx / gridSize);
      const c = idx % gridSize;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const rr = r + dr;
          const cc = c + dc;
          if (rr < 0 || rr >= gridSize || cc < 0 || cc >= gridSize) continue;
          const nIdx = rr * gridSize + cc;
          if (binaryMask[nIdx] === 1 && labels[nIdx] === 0) {
            labels[nIdx] = nextLabel;
            queue.push(nIdx);
          }
        }
      }
    }
    nextLabel++;
  }

  // size 0 for label 0 (background)
  const sizes = new Map<number, number>();
  sizes.set(0, 0);
  for (let i = 0; i < n; i++) {
    sizes.set(labels[i], (sizes.get(labels[i]) || 0) + 1);
  }

  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = (sizes.get(labels[i]) || 0) / n;
  return out;
}

function computeTextureContrast(grid: Float32Array, gridSize: number): Float32Array {
  const n = grid.length;
  const discrete = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    let d = Math.floor(grid[i] * 7.99);
    if (d < 0) d = 0;
    if (d > 7) d = 7;
    discrete[i] = d;
  }

  const diff = new Float32Array(n);
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const idx = r * gridSize + c;
      let diffH = 0;
      let diffV = 0;
      if (c < gridSize - 1) {
        const d = discrete[idx + 1] - discrete[idx];
        diffH = d * d;
      }
      if (r < gridSize - 1) {
        const d = discrete[idx + gridSize] - discrete[idx];
        diffV = d * d;
      }
      diff[idx] = 0.5 * (diffH + diffV);
    }
  }

  // uniform_filter mode='constant', cval=0.0 -> 3x3 box filter, out-of-bounds = 0
  const out = new Float32Array(n);
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      let sum = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const rr = r + dr;
          const cc = c + dc;
          if (rr >= 0 && rr < gridSize && cc >= 0 && cc < gridSize) {
            sum += discrete[rr * gridSize + cc];
          }
        }
      }
      const contrast = sum / 9;
      let v = contrast / 49.0;
      if (v < 0) v = 0;
      if (v > 1) v = 1;
      out[r * gridSize + c] = v;
    }
  }
  return out;
}

export function spatialChannelIndex(varName: VariableName, descriptor: SpatialDescriptorName): number {
  const v = VARS.indexOf(varName);
  const d = SPATIAL_DESCRIPTORS.indexOf(descriptor);
  return v * FEATURES_PER_VAR + d;
}

export function getSpatialChannelGrid(tensor: SpatialTensor, channelIdx: number): Float32Array {
  const { data, gridSize } = tensor;
  const out = new Float32Array(gridSize * gridSize);
  const totalChannels = VARS.length * FEATURES_PER_VAR;
  for (let i = 0; i < gridSize * gridSize; i++) {
    out[i] = data[i * totalChannels + channelIdx];
  }
  return out;
}

export function computeSpatialTensor(cube: DataCube): SpatialTensor {
  const { gridSize } = cube;
  const totalChannels = VARS.length * FEATURES_PER_VAR;
  const data = new Float32Array(gridSize * gridSize * totalChannels);
  const featureNames: string[] = [];

  for (let v = 0; v < VARS.length; v++) {
    const varName = VARS[v];
    const grid = flattenGrid(cube.channels[varName], gridSize);
    const padded = buildPaddedGrid(cube.channels[varName], 1, gridSize);
    const paddedSize = gridSize + 2;

    const paddedSq = new Float32Array(padded.length);
    for (let i = 0; i < padded.length; i++) paddedSq[i] = padded[i] * padded[i];

    const descriptors: Float32Array[] = [
      computeGradientDx(padded, paddedSize, gridSize),
      computeGradientDy(padded, paddedSize, gridSize),
      computeLaplacian(padded, paddedSize, gridSize),
      computeLocalVariance(padded, paddedSq, paddedSize, gridSize),
      computeLocalEntropy(grid, gridSize),
      computeLocalMoran(grid, gridSize),
      computeLocalSemivariance(grid, gridSize),
      computePatchiness(grid, gridSize),
      computeTextureContrast(grid, gridSize),
    ];

    for (let d = 0; d < FEATURES_PER_VAR; d++) {
      featureNames.push(`${varName}_${SPATIAL_DESCRIPTORS[d]}`);
      const channelIdx = v * FEATURES_PER_VAR + d;
      const desc = descriptors[d];
      for (let i = 0; i < gridSize * gridSize; i++) {
        data[i * totalChannels + channelIdx] = desc[i];
      }
    }
  }

  return { data, gridSize, featureNames };
}
