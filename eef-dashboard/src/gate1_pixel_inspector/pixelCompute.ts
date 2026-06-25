/**
 * Gate 1: Core pixel-level computation engine
 * Handles statistics extraction, PCA projection, neighborhood search with memoization
 */

import { DataCube, VariableName } from "../types";
import { extractDataMatrix, jacobiEigen, covarianceMatrix } from "../utils/eigenmath";
import {
  PixelCoord,
  PixelValues,
  PixelStatistics,
  SimilarPixel,
  VariableDependency,
  PixelComputationCache
} from "./types";

const VARS: VariableName[] = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490", "FLH", "CHL_disagreement", "OA08", "OA09", "OA10", "OA11", "OA13"];
const D = 9;

/**
 * Extract raw values for a single pixel from the data cube
 */
export function extractPixelValues(cube: DataCube, coord: PixelCoord): PixelValues {
  return {
    CHL: cube.channels.CHL[coord.row][coord.col],
    aphy: cube.channels.aphy[coord.row][coord.col],
    ADG: cube.channels.ADG[coord.row][coord.col],
    bbp: cube.channels.bbp[coord.row][coord.col],
    TSM: cube.channels.TSM[coord.row][coord.col],
    PAR: cube.channels.PAR[coord.row][coord.col],
    KD490: cube.channels.KD490[coord.row][coord.col],
    FLH: cube.channels.FLH[coord.row][coord.col],
    CHL_disagreement: cube.channels.CHL_disagreement[coord.row][coord.col]
  };
}

/**
 * Compute normalized (z-scored) values for a pixel
 */
export function normalizePixelValues(cube: DataCube, values: PixelValues): PixelValues {
  const normalized = { ...values };
  VARS.forEach((varName) => {
    const { mean, std } = cube.stats[varName];
    const s = std > 1e-12 ? std : 1;
    normalized[varName] = (values[varName] - mean) / s;
  });
  return normalized;
}

/**
 * Project pixel values into PCA space using global eigenvectors
 */
export function projectPixelToPCA(
  normalizedValues: PixelValues,
  eigenvectors: Float64Array,
  d: number = D
): Float64Array {
  const projection = new Float64Array(d);
  const pixelVector = VARS.map(v => normalizedValues[v]);

  for (let i = 0; i < d; i++) {
    let dot = 0;
    for (let j = 0; j < d; j++) {
      dot += pixelVector[j] * eigenvectors[j * d + i];
    }
    projection[i] = dot;
  }
  return projection;
}

/**
 * Compute Euclidean distance in normalized space
 */
export function computeNormalizedDistance(
  norm1: PixelValues,
  norm2: PixelValues
): number {
  let sumSq = 0;
  VARS.forEach((varName) => {
    const diff = norm1[varName] - norm2[varName];
    sumSq += diff * diff;
  });
  return Math.sqrt(sumSq);
}

/**
 * Compute local neighborhood statistics for a pixel
 */
export function computeNeighborhoodMetrics(
  cube: DataCube,
  coord: PixelCoord,
  radius: number = 1
): { localMean: PixelValues; localStd: PixelValues; localCorrelations: Record<string, number> } {
  const minRow = Math.max(0, coord.row - radius);
  const maxRow = Math.min(cube.gridSize - 1, coord.row + radius);
  const minCol = Math.max(0, coord.col - radius);
  const maxCol = Math.min(cube.gridSize - 1, coord.col + radius);

  const neighborValues: PixelValues[] = [];
  for (let r = minRow; r <= maxRow; r++) {
    for (let c = minCol; c <= maxCol; c++) {
      neighborValues.push(extractPixelValues(cube, { row: r, col: c }));
    }
  }

  const localMean: PixelValues = {
    CHL: 0, aphy: 0, ADG: 0, bbp: 0, TSM: 0, PAR: 0, KD490: 0, FLH: 0, CHL_disagreement: 0
  };
  VARS.forEach((varName) => {
    localMean[varName] = neighborValues.reduce((sum, pv) => sum + pv[varName], 0) / neighborValues.length;
  });

  const localStd: PixelValues = {
    CHL: 0, aphy: 0, ADG: 0, bbp: 0, TSM: 0, PAR: 0, KD490: 0, FLH: 0, CHL_disagreement: 0
  };
  VARS.forEach((varName) => {
    const variance = neighborValues.reduce(
      (sum, pv) => sum + Math.pow(pv[varName] - localMean[varName], 2),
      0
    ) / neighborValues.length;
    localStd[varName] = Math.sqrt(variance);
  });

  // Compute pairwise correlations
  const localCorrelations: Record<string, number> = {};
  for (let i = 0; i < VARS.length; i++) {
    for (let j = i + 1; j < VARS.length; j++) {
      const varI = VARS[i];
      const varJ = VARS[j];
      const key = `${varI}_${varJ}`;

      const denom = localStd[varI] * localStd[varJ];
      if (denom < 1e-12) {
        localCorrelations[key] = 0;
      } else {
        let covariance = 0;
        neighborValues.forEach((pv) => {
          covariance += (pv[varI] - localMean[varI]) * (pv[varJ] - localMean[varJ]);
        });
        covariance /= neighborValues.length;
        localCorrelations[key] = covariance / denom;
      }
    }
  }

  return { localMean, localStd, localCorrelations };
}

/**
 * Extract variable dependencies (full correlation row) for a pixel context
 */
export function extractVariableDependency(
  localCorrelations: Record<string, number>,
  variable: VariableName
): VariableDependency {
  const correlations: Record<VariableName, number> = {
    CHL: 0, aphy: 0, ADG: 0, bbp: 0, TSM: 0, PAR: 0, KD490: 0, FLH: 0, CHL_disagreement: 0, OA08: 0, OA09: 0, OA10: 0, OA11: 0, OA13: 0
  };

  VARS.forEach((varName) => {
    if (varName === variable) {
      correlations[varName] = 1.0;
    } else {
      const varA = variable < varName ? variable : varName;
      const varB = variable < varName ? varName : variable;
      const key = `${varA}_${varB}`;
      correlations[varName] = localCorrelations[key] ?? 0;
    }
  });

  return {
    variable,
    correlations
  };
}

/**
 * Find k nearest neighbors in normalized space (using memoization)
 */
export function findSimilarPixels(
  cube: DataCube,
  pixelCoord: PixelCoord,
  normalizedValues: PixelValues,
  k: number = 5
): SimilarPixel[] {
  const candidates: SimilarPixel[] = [];

  for (let r = 0; r < cube.gridSize; r++) {
    for (let c = 0; c < cube.gridSize; c++) {
      if (r === pixelCoord.row && c === pixelCoord.col) continue; // Skip self

      const candidateValues = extractPixelValues(cube, { row: r, col: c });
      const candidateNorm = normalizePixelValues(cube, candidateValues);
      const similarity = computeNormalizedDistance(normalizedValues, candidateNorm);

      candidates.push({
        coord: { row: r, col: c },
        similarity,
        values: candidateValues,
        rank: 0 // Will be assigned after sorting
      });
    }
  }

  // Sort by similarity (ascending = most similar first)
  candidates.sort((a, b) => a.similarity - b.similarity);

  // Assign ranks and return top k
  return candidates.slice(0, k).map((p, idx) => ({ ...p, rank: idx + 1 }));
}

/**
 * Main entry point: compute all statistics for a pixel (with memoization check)
 */
export function computePixelStatistics(
  cube: DataCube,
  coord: PixelCoord,
  cache: PixelComputationCache
): PixelStatistics {
  const cacheKey = `${coord.row}_${coord.col}`;

  // Return cached result if same dataCube timestamp
  if (cache.stats.has(cacheKey) && cache.timestamp === Date.now()) {
    const cached = cache.stats.get(cacheKey);
    if (cached) return cached;
  }

  // Extract values
  const values = extractPixelValues(cube, coord);
  const normalizedValues = normalizePixelValues(cube, values);

  // Compute PCA projection
  const X = extractDataMatrix(cube);
  const n = cube.gridSize * cube.gridSize;
  const cov = covarianceMatrix(X, n, D);
  const { vectors: eigenvectors } = jacobiEigen(cov, D);
  const pcaProjection = projectPixelToPCA(normalizedValues, eigenvectors, D);
  const pcaDistance = Math.sqrt(pcaProjection.reduce((sum, v) => sum + v * v, 0));

  // Neighborhood metrics
  const neighborhoodMetrics = computeNeighborhoodMetrics(cube, coord, 1);

  const stats: PixelStatistics = {
    coord,
    values,
    pcaProjection,
    pcaDistance,
    normalizedValues,
    neighborhoodMetrics
  };

  // Memoize
  cache.stats.set(cacheKey, stats);
  cache.timestamp = Date.now();

  return stats;
}

/**
 * Get similar pixels with caching
 */
export function getSimilarPixelsCached(
  cube: DataCube,
  pixelCoord: PixelCoord,
  normalizedValues: PixelValues,
  cache: PixelComputationCache,
  k: number = 5
): SimilarPixel[] {
  const cacheKey = `${pixelCoord.row}_${pixelCoord.col}`;

  if (cache.neighborhoodCache.has(cacheKey) && cache.timestamp === Date.now()) {
    return cache.neighborhoodCache.get(cacheKey) || [];
  }

  const neighbors = findSimilarPixels(cube, pixelCoord, normalizedValues, k);
  cache.neighborhoodCache.set(cacheKey, neighbors);

  return neighbors;
}

/**
 * Create a fresh computation cache
 */
export function createPixelCache(): PixelComputationCache {
  return {
    timestamp: Date.now(),
    stats: new Map(),
    neighborhoodCache: new Map()
  };
}

/**
 * Clear cache (call when dataCube changes)
 */
export function invalidateCache(cache: PixelComputationCache): void {
  cache.stats.clear();
  cache.neighborhoodCache.clear();
  cache.timestamp = 0;
}
