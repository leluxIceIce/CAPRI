// EEF Layer 3 — Relationship Engine (TS port of capri/relationship_tensor.py
// `RelationshipStructureExtractor.compute_tensor(mode="all")` and the
// ratio/index definitions from ecological_encoder.py).
//
// Computes 193 relationship feature channels across the 20x20 grid:
//   - 91 local correlations (all i<j pairs of the 14 variables)
//   - 91 local mutual-information channels (discretized, 3 bins)
//   - 6 ecologically grounded ratios
//   - 5 composite ecological indices
//
// Output is a flat Float32Array of shape (gridSize, gridSize, 193), row-major
// over (row, col, channel).

import { DataCube, VariableName } from "../types";
import { flattenGrid, buildPaddedGrid, boxBlur3x3 } from "./gridOps";

const VARS: VariableName[] = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490", "FLH", "CHL_disagreement", "OA01", "OA02", "OA03", "OA04", "OA05", "OA06", "OA07", "OA08", "OA09", "OA10", "OA11", "OA13"];
const EPSILON = 1e-5;

export interface RelationshipTensor {
  data: Float32Array;
  gridSize: number;
  featureNames: string[];
}

// ── Local correlation ────────────────────────────────────────────────────

function computeLocalCorrelation(
  gridI: Float32Array,
  gridJ: Float32Array,
  gridSize: number
): Float32Array {
  const paddedSize = gridSize + 2;
  const n = gridSize * gridSize;

  const paddedI = padFromFlat(gridI, gridSize);
  const paddedJ = padFromFlat(gridJ, gridSize);

  const paddedISq = new Float32Array(paddedI.length);
  const paddedJSq = new Float32Array(paddedJ.length);
  const paddedProd = new Float32Array(paddedI.length);
  for (let i = 0; i < paddedI.length; i++) {
    paddedISq[i] = paddedI[i] * paddedI[i];
    paddedJSq[i] = paddedJ[i] * paddedJ[i];
    paddedProd[i] = paddedI[i] * paddedJ[i];
  }

  const meanI = boxBlur3x3(paddedI, paddedSize, gridSize);
  const meanJ = boxBlur3x3(paddedJ, paddedSize, gridSize);
  const meanISq = boxBlur3x3(paddedISq, paddedSize, gridSize);
  const meanJSq = boxBlur3x3(paddedJSq, paddedSize, gridSize);
  const meanProd = boxBlur3x3(paddedProd, paddedSize, gridSize);

  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const localCov = meanProd[i] - meanI[i] * meanJ[i];
    let varI = meanISq[i] - meanI[i] * meanI[i];
    let varJ = meanJSq[i] - meanJ[i] * meanJ[i];
    if (varI < 0) varI = 0;
    if (varJ < 0) varJ = 0;
    const stdIJ = Math.sqrt(varI * varJ);

    let localCorr = 0;
    if (stdIJ > EPSILON) {
      localCorr = localCov / stdIJ;
    }
    // Map from [-1, 1] to [0, 1]
    out[i] = (localCorr + 1.0) * 0.5;
  }
  return out;
}

// Pads a row-major (gridSize x gridSize) flat grid using reflect-mode halo=1.
function padFromFlat(grid: Float32Array, gridSize: number): Float32Array {
  const grid2d: number[][] = [];
  for (let r = 0; r < gridSize; r++) {
    const row: number[] = [];
    for (let c = 0; c < gridSize; c++) row.push(grid[r * gridSize + c]);
    grid2d.push(row);
  }
  return buildPaddedGrid(grid2d, 1, gridSize);
}

// ── Local mutual information ────────────────────────────────────────────

function computeLocalMI(gridI: Float32Array, gridJ: Float32Array, gridSize: number, bins = 3): Float32Array {
  const n = gridSize * gridSize;
  const d1 = new Int32Array(n);
  const d2 = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    let v1 = Math.floor(gridI[i] * (bins - 0.01));
    let v2 = Math.floor(gridJ[i] * (bins - 0.01));
    if (v1 < 0) v1 = 0;
    if (v1 > bins - 1) v1 = bins - 1;
    if (v2 < 0) v2 = 0;
    if (v2 > bins - 1) v2 = bins - 1;
    d1[i] = v1;
    d2[i] = v2;
  }

  const out = new Float32Array(n);
  const r = 1;
  const maxMi = Math.log2(bins);

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const iMin = Math.max(0, i - r);
      const iMax = Math.min(gridSize, i + r + 1);
      const jMin = Math.max(0, j - r);
      const jMax = Math.min(gridSize, j + r + 1);

      const jointCounts = new Float64Array(bins * bins);
      let count = 0;
      for (let ii = iMin; ii < iMax; ii++) {
        for (let jj = jMin; jj < jMax; jj++) {
          const idx = ii * gridSize + jj;
          jointCounts[d1[idx] * bins + d2[idx]]++;
          count++;
        }
      }

      const pX = new Float64Array(bins);
      const pY = new Float64Array(bins);
      const pXY = new Float64Array(bins * bins);
      for (let x = 0; x < bins; x++) {
        for (let y = 0; y < bins; y++) {
          const p = jointCounts[x * bins + y] / count;
          pXY[x * bins + y] = p;
          pX[x] += p;
          pY[y] += p;
        }
      }

      let mi = 0;
      for (let x = 0; x < bins; x++) {
        for (let y = 0; y < bins; y++) {
          const p = pXY[x * bins + y];
          if (p > 0) {
            mi += p * Math.log2(p / (pX[x] * pY[y] + 1e-12) + 1e-12);
          }
        }
      }

      let v = mi / maxMi;
      if (v < 0) v = 0;
      if (v > 1) v = 1;
      out[i * gridSize + j] = v;
    }
  }
  return out;
}

// ── Ratios & composite indices ───────────────────────────────────────────

function computeRatio(num: Float32Array, den: Float32Array, clampMax: number): Float32Array {
  const out = new Float32Array(num.length);
  for (let i = 0; i < num.length; i++) {
    let val = (num[i] + EPSILON) / (den[i] + EPSILON);
    if (val < 0) val = 0;
    if (val > clampMax) val = clampMax;
    out[i] = val / clampMax;
  }
  return out;
}

function computeProduct(a: Float32Array, b: Float32Array): Float32Array {
  const out = new Float32Array(a.length);
  for (let i = 0; i < a.length; i++) out[i] = a[i] * b[i];
  return out;
}

function computeRatioNoEpsNum(num: Float32Array, den: Float32Array, clampMax: number): Float32Array {
  // For indices: val = num / (den + EPSILON), clip(0, clampMax) / clampMax
  const out = new Float32Array(num.length);
  for (let i = 0; i < num.length; i++) {
    let val = num[i] / (den[i] + EPSILON);
    if (val < 0) val = 0;
    if (val > clampMax) val = clampMax;
    out[i] = val / clampMax;
  }
  return out;
}

// index_physiological_stress: raw = FLH / (CHL + EPSILON);
// val = clip(raw * (1 - CHL_disagreement), 0, clampMax) / clampMax
function computePhysiologicalStress(
  flh: Float32Array,
  chl: Float32Array,
  chlDisagreement: Float32Array,
  clampMax: number
): Float32Array {
  const out = new Float32Array(flh.length);
  for (let i = 0; i < flh.length; i++) {
    const raw = flh[i] / (chl[i] + EPSILON);
    let val = raw * (1 - chlDisagreement[i]);
    if (val < 0) val = 0;
    if (val > clampMax) val = clampMax;
    out[i] = val / clampMax;
  }
  return out;
}

// ── Public API ────────────────────────────────────────────────────────────

export function relationshipChannelIndex(tensor: RelationshipTensor, featureName: string): number {
  return tensor.featureNames.indexOf(featureName);
}

export function getRelationshipChannelGrid(tensor: RelationshipTensor, channelIdx: number): Float32Array {
  const { data, gridSize, featureNames } = tensor;
  const totalChannels = featureNames.length;
  const out = new Float32Array(gridSize * gridSize);
  for (let i = 0; i < gridSize * gridSize; i++) {
    out[i] = data[i * totalChannels + channelIdx];
  }
  return out;
}

export function computeRelationshipTensor(cube: DataCube): RelationshipTensor {
  const { gridSize } = cube;
  const n = gridSize * gridSize;

  const flatGrids: Record<VariableName, Float32Array> = {} as Record<VariableName, Float32Array>;
  for (const v of VARS) {
    flatGrids[v] = flattenGrid(cube.channels[v], gridSize);
  }

  const featureNames: string[] = [];
  const channels: Float32Array[] = [];

  // 1. Correlations (36)
  for (let i = 0; i < VARS.length; i++) {
    for (let j = i + 1; j < VARS.length; j++) {
      const corr = computeLocalCorrelation(flatGrids[VARS[i]], flatGrids[VARS[j]], gridSize);
      channels.push(corr);
      featureNames.push(`corr_${VARS[i]}_${VARS[j]}`);
    }
  }

  // 2. Mutual information (36)
  for (let i = 0; i < VARS.length; i++) {
    for (let j = i + 1; j < VARS.length; j++) {
      const mi = computeLocalMI(flatGrids[VARS[i]], flatGrids[VARS[j]], gridSize);
      channels.push(mi);
      featureNames.push(`mi_${VARS[i]}_${VARS[j]}`);
    }
  }

  // 3. Ratios (6)
  channels.push(computeRatio(flatGrids.CHL, flatGrids.TSM, 10.0));
  featureNames.push("ratio_CHL_TSM");

  channels.push(computeRatio(flatGrids.aphy, flatGrids.CHL, 2.0));
  featureNames.push("ratio_aphy_CHL");

  channels.push(computeRatio(flatGrids.ADG, flatGrids.bbp, 50.0));
  featureNames.push("ratio_ADG_bbp");

  channels.push(computeRatio(flatGrids.KD490, flatGrids.PAR, 5.0));
  featureNames.push("ratio_KD490_PAR");

  channels.push(computeRatio(flatGrids.CHL, flatGrids.aphy, 20.0));
  featureNames.push("ratio_CHL_aphy");

  channels.push(computeRatio(flatGrids.FLH, flatGrids.CHL, 5.0));
  featureNames.push("ratio_FLH_CHL");

  // 4. Composite indices (5)
  channels.push(computeProduct(flatGrids.CHL, flatGrids.PAR));
  featureNames.push("index_trophic_state");

  channels.push(computeProduct(flatGrids.TSM, flatGrids.KD490));
  featureNames.push("index_turbidity");

  channels.push(computeRatioNoEpsNum(flatGrids.PAR, flatGrids.KD490, 10.0));
  featureNames.push("index_light_limitation");

  channels.push(computeRatioNoEpsNum(flatGrids.bbp, flatGrids.TSM, 5.0));
  featureNames.push("index_organic_carbon");

  channels.push(computePhysiologicalStress(flatGrids.FLH, flatGrids.CHL, flatGrids.CHL_disagreement, 5.0));
  featureNames.push("index_physiological_stress");

  // Interleave into row-major (gridSize, gridSize, 193)
  const totalChannels = featureNames.length; // 193
  const data = new Float32Array(n * totalChannels);
  for (let c = 0; c < totalChannels; c++) {
    const ch = channels[c];
    for (let i = 0; i < n; i++) {
      data[i * totalChannels + c] = ch[i];
    }
  }

  return { data, gridSize, featureNames };
}
