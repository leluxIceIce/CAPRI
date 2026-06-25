import { EcologicalGraph, TileNode, TelemetryStreamConfig, DataCube } from "../types";
import { generateDataCube } from "../telemetryGenerator";
import { extractDataMatrix, covarianceMatrix, jacobiEigen } from "./eigenmath";

const D = 9; // canonical variable count (mirrors eigenmath.ts D)

// RBF bandwidth for the structural-embedding similarity kernel below.
// Calibrated for normalized-eigenvalue-spectrum embeddings: each component
// is a variance fraction in [0,1] summing to 1, so per-dimension differences
// between tiles are typically small (~0.05-0.4). A bandwidth of ~0.12 keeps
// the sim>0.8 "long-range similarity" threshold meaningful at that scale.
const SIMILARITY_BANDWIDTH = 0.12;

/**
 * Structural embedding proxy (Epic 13 — pending real contrastive learning).
 *
 * NOT a learned representation. This returns the normalized eigenvalue
 * spectrum (D=9 variance fractions, summing to 1) of the tile's 9x9
 * covariance matrix — i.e. "how is this tile's internal variability
 * distributed across its principal axes", a coarse structural signature.
 *
 * Gate B (masked-reconstruction tile encoder, scoped separately) is the
 * planned replacement: its output embedding should drop in here directly.
 */
function computeStructuralEmbedding(cube: DataCube): Float64Array {
  const n = cube.gridSize * cube.gridSize;
  const X = extractDataMatrix(cube);
  const C = covarianceMatrix(X, n, D);
  const { values } = jacobiEigen(C, D);

  const total = values.reduce((s, v) => s + Math.max(0, v), 0) || 1;
  const spectrum = new Float64Array(D);
  for (let i = 0; i < D; i++) spectrum[i] = Math.max(0, values[i]) / total;
  return spectrum;
}

// Generates the mosaic graph based on mosaicScale (tileCount).
//
// Demo-mosaic scope note: each tile's cube is independently synthesized via
// generateDataCube, NOT read from the capri Python pipeline's regional
// mosaic (Gate 0's build_regional_mosaic / grid_coords / halo padding).
// To keep the mosaic visually/statistically coherent anyway, each tile's
// anomaly modulation is weighted by a smooth, grid-position-based field
// (regionalModulation below) so neighboring tiles vary similarly — i.e.
// spatially-autocorrelated, like a real satellite scene, rather than
// independent per-tile noise. Wiring this graph to real multi-tile cubes
// from capri is future work, not implied by the current implementation.
export function generateEcologicalGraph(stepSeconds: number, config: TelemetryStreamConfig): EcologicalGraph {
  const tileCount = config.mosaicScale || 20;
  const nodes: TileNode[] = [];
  const edges: { source: number; target: number; weight: number; isSpatial: boolean }[] = [];

  // Determine grid dimensions roughly square
  const cols = Math.ceil(Math.sqrt(tileCount));
  const rows = Math.ceil(tileCount / cols);

  // Space tile centers across the same 16x16 footprint (-8..8) used by the
  // terrain plane and per-cell roots, so the mosaic graph never extends
  // beyond the visible tile grid regardless of mosaicScale.
  const cellSpacing = 16 / Math.max(cols, rows);

  // Generate nodes
  for (let i = 0; i < tileCount; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;

    // World coordinates for the tile centers, centered within the grid bounds
    const worldX = (c - (cols - 1) / 2) * cellSpacing;
    const worldZ = (r - (rows - 1) / 2) * cellSpacing;

    // Smooth, low-frequency spatial field over the tile grid — neighboring
    // tiles get similar modulation, approximating spatial autocorrelation.
    const regionalModulation = 0.5 + 0.5 * Math.sin(c * 0.4 + stepSeconds * 0.05) * Math.cos(r * 0.35 - stepSeconds * 0.03);

    const cubeConfig = { ...config, currentAnomaly: config.currentAnomaly * regionalModulation };
    const cube = generateDataCube(stepSeconds + i * 0.1, cubeConfig, 20);

    // Structural embedding proxy — see computeStructuralEmbedding() doc above.
    const embedding = computeStructuralEmbedding(cube);

    // Regime ID mock based on dominant raw variable (separate from the
    // structural embedding above — this drives display/cluster coloring).
    let regimeId = 0;
    let maxMean = -Infinity;
    const varNames = Object.keys(cube.stats) as (keyof typeof cube.stats)[];
    for (let v = 0; v < varNames.length; v++) {
      const mean = cube.stats[varNames[v]].mean;
      if (mean > maxMean) {
        maxMean = mean;
        regimeId = v;
      }
    }

    nodes.push({
      id: i,
      worldX,
      worldZ,
      embedding,
      regimeId,
      cube
    });
  }

  // Generate edges (spatial adjacency + similarity)
  const couplingMultiplier = config.speedHz;

  let maxWeight = 0;

  for (let i = 0; i < tileCount; i++) {
    for (let j = i + 1; j < tileCount; j++) {
      const dx = nodes[i].worldX - nodes[j].worldX;
      const dz = nodes[i].worldZ - nodes[j].worldZ;
      const dist = Math.sqrt(dx * dx + dz * dz);

      const isSpatial = dist <= 22; // Adjacent in grid

      // Structural similarity edge — dimension-invariant RBF kernel
      // (mean squared difference rather than raw sum, so the sim>0.8
      // threshold stays meaningful as D changes, e.g. 7 -> 9 variables).
      let sumSq = 0;
      for (let k = 0; k < D; k++) {
        const diff = nodes[i].embedding[k] - nodes[j].embedding[k];
        sumSq += diff * diff;
      }
      const meanSqDiff = sumSq / D;
      const sim = Math.exp(-meanSqDiff / SIMILARITY_BANDWIDTH);

      // Dropout / Perturbation based on noiseLevel
      if (Math.random() < config.noiseLevel && !isSpatial) continue;

      let weight = 0;
      if (isSpatial) {
        weight = (0.5 + 0.5 * sim) * couplingMultiplier;
      } else if (sim > 0.8) {
        // High similarity distant connection
        weight = sim * couplingMultiplier * 0.5;
      }

      if (weight > 0) {
        edges.push({ source: i, target: j, weight, isSpatial });
        if (weight > maxWeight) maxWeight = weight;
      }
    }
  }

  return { nodes, edges, maxWeight };
}
