import { DataCube, VariableName } from "../types";
import {
  extractDataMatrix,
  covarianceMatrix,
  jacobiEigen,
  projectCells,
  kMeansClusters,
} from "../utils/eigenmath";

/**
 * Gate 2 Understanding Roots: Attractor Detection Engine
 *
 * Identifies stable equilibrium points (attractors) in PCA space.
 * These represent the latent ecological regimes that drive cluster formation.
 */

export interface EcologicalAttractor {
  id: number;
  centroidPC1: number;
  centroidPC2: number;
  centroidPC3: number;
  cellCount: number;
  stability: number; // 0-1: tightness of cluster around centroid
  dominance: number; // 0-1: fraction of total cells in this regime
  label: string;
}

export interface AttractorAnalysis {
  attractors: EcologicalAttractor[];
  projections: Float64Array; // n x 3 PCA projections
  clusterLabels: Uint8Array; // n-length cluster assignments
  varianceExplained: number[]; // [0-1] for each of 3 PCs
  metadata: {
    cellCount: number;
    regimeCount: number;
    timestamp: string;
    computeTimeMs: number;
  };
}

/**
 * Compute the intra-cluster tightness: average distance from each cell
 * in the cluster to the centroid, normalized by max distance.
 */
function computeClusterStability(
  projections: Float64Array,
  labels: Uint8Array,
  centroidIdx: number,
  regimeCount: number,
  dims: number = 3
): number {
  const cells = [];
  for (let i = 0; i < labels.length; i++) {
    if (labels[i] === centroidIdx) {
      cells.push(i);
    }
  }

  if (cells.length === 0) return 0;

  // Compute centroid
  const centroid = new Float64Array(dims);
  for (const cellIdx of cells) {
    for (let d = 0; d < dims; d++) {
      centroid[d] += projections[cellIdx * dims + d];
    }
  }
  for (let d = 0; d < dims; d++) centroid[d] /= cells.length;

  // Compute mean distance to centroid
  let totalDist = 0;
  for (const cellIdx of cells) {
    let dist = 0;
    for (let d = 0; d < dims; d++) {
      const diff = projections[cellIdx * dims + d] - centroid[d];
      dist += diff * diff;
    }
    totalDist += Math.sqrt(dist);
  }
  const meanDist = totalDist / cells.length;

  // Normalize by average inter-cluster distance (rough approximation)
  // Tighter clusters get higher stability scores
  const maxExpectedDist = 3.0; // Typical max PCA distance in normalized space
  const stability = Math.exp(-meanDist / maxExpectedDist);

  return Math.max(0, Math.min(1, stability));
}

/**
 * Analyze PCA projections to identify ecological attractors
 */
function analyzeAttractors(
  projections: Float64Array,
  labels: Uint8Array,
  regimeCount: number,
  totalCells: number
): EcologicalAttractor[] {
  const attractors: EcologicalAttractor[] = [];
  const dims = 3;

  for (let regimeId = 0; regimeId < regimeCount; regimeId++) {
    let cellCount = 0;
    const centroid = new Float64Array(3);

    // Count cells and compute centroid
    for (let i = 0; i < labels.length; i++) {
      if (labels[i] === regimeId) {
        cellCount++;
        for (let d = 0; d < dims; d++) {
          centroid[d] += projections[i * dims + d];
        }
      }
    }

    if (cellCount === 0) continue;

    for (let d = 0; d < dims; d++) centroid[d] /= cellCount;

    const stability = computeClusterStability(projections, labels, regimeId, regimeCount, dims);
    const dominance = cellCount / totalCells;

    attractors.push({
      id: regimeId,
      centroidPC1: centroid[0],
      centroidPC2: centroid[1],
      centroidPC3: centroid[2],
      cellCount,
      stability,
      dominance,
      label: `Regime ${regimeId + 1}`,
    });
  }

  return attractors;
}

/**
 * Detect ecological attractors in a data cube via PCA and k-means clustering
 */
export function detectAttractors(
  cube: DataCube,
  regimeCount: number = 5
): AttractorAnalysis {
  const startTime = performance.now();

  const n = cube.gridSize * cube.gridSize;
  const D = 9; // Number of ecological variables

  // Extract and normalize data
  const X = extractDataMatrix(cube);

  // Compute covariance and eigendecomposition
  const C = covarianceMatrix(X, n, D);
  const { values, vectors } = jacobiEigen(C, D);

  // Project to 3D PCA space
  const projections = projectCells(X, vectors, n, D, 3);

  // Cluster in PCA space
  const { labels } = kMeansClusters(projections, n, 3, regimeCount);

  // Compute variance explained
  const totalVar = values.reduce((s, v) => s + Math.max(0, v), 0) || 1;
  const varianceExplained: number[] = [];
  let cumulative = 0;
  for (let i = 0; i < 3; i++) {
    cumulative += Math.max(0, values[i]);
    varianceExplained.push(cumulative / totalVar);
  }

  // Detect and characterize attractors
  const attractors = analyzeAttractors(projections, labels, regimeCount, n);

  // Sort attractors by dominance (descending)
  attractors.sort((a, b) => b.dominance - a.dominance);
  attractors.forEach((a, i) => {
    a.id = i;
    a.label = `Regime ${i + 1}`;
  });

  const endTime = performance.now();

  return {
    attractors,
    projections,
    clusterLabels: labels,
    varianceExplained,
    metadata: {
      cellCount: n,
      regimeCount,
      timestamp: cube.timestamp,
      computeTimeMs: endTime - startTime,
    },
  };
}

/**
 * Get centroid coordinate by dimension index
 */
function getCentroidCoord(attractor: EcologicalAttractor, dim: number): number {
  if (dim === 0) return attractor.centroidPC1;
  if (dim === 1) return attractor.centroidPC2;
  return attractor.centroidPC3;
}

/**
 * Identify which cells are near attractor boundaries (high transition risk)
 */
export function findBoundaryCells(
  projections: Float64Array,
  labels: Uint8Array,
  attractors: EcologicalAttractor[],
  boundaryThreshold: number = 1.2 // std deviations from nearest centroid
): Set<number> {
  const boundaryCells = new Set<number>();
  const dims = 3;

  for (let i = 0; i < labels.length; i++) {
    const regimeId = labels[i];
    const attractor = attractors.find((a) => a.id === regimeId);
    if (!attractor) continue;

    // Distance to own centroid
    let ownDist = 0;
    for (let d = 0; d < dims; d++) {
      const diff = projections[i * dims + d] - getCentroidCoord(attractor, d);
      ownDist += diff * diff;
    }
    ownDist = Math.sqrt(ownDist);

    // Find second-nearest attractor
    let secondDist = Infinity;
    for (const other of attractors) {
      if (other.id === regimeId) continue;
      let dist = 0;
      for (let d = 0; d < dims; d++) {
        const diff = projections[i * dims + d] - getCentroidCoord(other, d);
        dist += diff * diff;
      }
      dist = Math.sqrt(dist);
      if (dist < secondDist) secondDist = dist;
    }

    // Cell is near boundary if ratio of distances is small
    if (ownDist > 0 && secondDist / ownDist < boundaryThreshold) {
      boundaryCells.add(i);
    }
  }

  return boundaryCells;
}

/**
 * Get statistical summary of an attractor's ecological character
 */
export function characterizeAttractor(
  attractor: EcologicalAttractor
): {
  summary: string;
  ecologicalType: string;
} {
  // Basic characterization based on dominance and stability
  let ecologicalType = "Unknown";

  if (attractor.dominance > 0.4) {
    ecologicalType = "Major Regime";
  } else if (attractor.dominance > 0.2) {
    ecologicalType = "Intermediate Regime";
  } else {
    ecologicalType = "Minor Regime";
  }

  if (attractor.stability > 0.7) {
    ecologicalType += " (Stable)";
  } else if (attractor.stability > 0.4) {
    ecologicalType += " (Transitional)";
  } else {
    ecologicalType += " (Diffuse)";
  }

  const summary =
    `${attractor.label}: ${(attractor.dominance * 100).toFixed(1)}% of cells, ` +
    `stability ${(attractor.stability * 100).toFixed(0)}%`;

  return { summary, ecologicalType };
}
