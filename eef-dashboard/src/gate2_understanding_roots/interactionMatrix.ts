import { DataCube, VariableName } from "../types";

/**
 * Gate 2 Understanding Roots: Interaction Matrix Engine
 *
 * Computes ecological interaction matrices R(i,j) = correlation between
 * variables i and j across all cells in a data cube.
 *
 * This is the foundation for understanding WHY ecological clusters emerge.
 */

const VARIABLES: VariableName[] = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490", "FLH", "CHL_disagreement"];

export interface InteractionMatrix {
  correlations: Float64Array; // 9x9 row-major matrix of Pearson correlations
  variableNames: VariableName[];
  metadata: {
    cellCount: number;
    timestamp: string;
    computeTimeMs: number;
  };
}

export interface InteractionPair {
  var1: VariableName;
  var2: VariableName;
  correlation: number;
  strength: "strong" | "moderate" | "weak";
  direction: "positive" | "negative";
}

/**
 * Extract all variable values into a flattened array per variable
 */
function extractVariableArrays(cube: DataCube): Record<VariableName, Float64Array> {
  const n = cube.gridSize * cube.gridSize;
  const arrays: Record<VariableName, Float64Array> = {} as any;

  for (const varName of VARIABLES) {
    const grid = cube.channels[varName];
    const arr = new Float64Array(n);
    let idx = 0;
    for (let r = 0; r < cube.gridSize; r++) {
      for (let c = 0; c < cube.gridSize; c++) {
        arr[idx++] = grid[r][c];
      }
    }
    arrays[varName] = arr;
  }

  return arrays;
}

/**
 * Compute Pearson correlation coefficient between two arrays
 * Returns NaN if computation fails (e.g., zero variance)
 */
function pearsonCorrelation(x: Float64Array, y: Float64Array): number {
  const n = x.length;
  if (n < 2) return 0;

  let sumX = 0, sumY = 0;
  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += y[i];
  }
  const meanX = sumX / n;
  const meanY = sumY / n;

  let ssX = 0, ssY = 0, ssXY = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    ssX += dx * dx;
    ssY += dy * dy;
    ssXY += dx * dy;
  }

  if (ssX < 1e-12 || ssY < 1e-12) return 0; // zero variance

  return ssXY / Math.sqrt(ssX * ssY);
}

/**
 * Compute the full 9x9 interaction matrix R(i,j) from a data cube.
 * Each entry is the Pearson correlation between variables i and j.
 */
export function computeInteractionMatrix(cube: DataCube): InteractionMatrix {
  const startTime = performance.now();

  const arrays = extractVariableArrays(cube);
  const D = VARIABLES.length; // 9
  const correlations = new Float64Array(D * D);

  // Fill diagonal with 1.0 and compute off-diagonal correlations
  for (let i = 0; i < D; i++) {
    correlations[i * D + i] = 1.0; // diagonal is always 1
    for (let j = i + 1; j < D; j++) {
      const var1 = VARIABLES[i];
      const var2 = VARIABLES[j];
      const corr = pearsonCorrelation(arrays[var1], arrays[var2]);
      correlations[i * D + j] = corr;
      correlations[j * D + i] = corr; // symmetric
    }
  }

  const endTime = performance.now();

  return {
    correlations,
    variableNames: VARIABLES,
    metadata: {
      cellCount: cube.gridSize * cube.gridSize,
      timestamp: cube.timestamp,
      computeTimeMs: endTime - startTime,
    },
  };
}

/**
 * Get the top N interaction pairs by absolute correlation strength.
 * Useful for identifying dominant variable relationships.
 */
export function getStrongestInteractions(
  interaction: InteractionMatrix,
  topN: number = 10
): InteractionPair[] {
  const pairs: InteractionPair[] = [];
  const D = interaction.variableNames.length;

  for (let i = 0; i < D; i++) {
    for (let j = i + 1; j < D; j++) {
      const corr = interaction.correlations[i * D + j];
      const absCorr = Math.abs(corr);

      let strength: "strong" | "moderate" | "weak" = "weak";
      if (absCorr >= 0.7) strength = "strong";
      else if (absCorr >= 0.4) strength = "moderate";

      pairs.push({
        var1: interaction.variableNames[i],
        var2: interaction.variableNames[j],
        correlation: corr,
        strength,
        direction: corr >= 0 ? "positive" : "negative",
      });
    }
  }

  // Sort by absolute correlation descending
  pairs.sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));

  return pairs.slice(0, topN);
}

/**
 * Identify potential causal hypotheses from interaction matrix.
 * Returns pairs where one variable might drive others.
 */
export function hypothesizeCausalPaths(
  interaction: InteractionMatrix,
  minCorrelation: number = 0.5
): { driver: VariableName; targets: VariableName[]; strengths: number[] }[] {
  const D = interaction.variableNames.length;
  const drivers: { driver: VariableName; targets: VariableName[]; strengths: number[] }[] = [];

  for (let i = 0; i < D; i++) {
    const targets: VariableName[] = [];
    const strengths: number[] = [];

    for (let j = 0; j < D; j++) {
      if (i === j) continue;
      const corr = interaction.correlations[i * D + j];
      if (Math.abs(corr) >= minCorrelation) {
        targets.push(interaction.variableNames[j]);
        strengths.push(corr);
      }
    }

    if (targets.length > 0) {
      drivers.push({
        driver: interaction.variableNames[i],
        targets,
        strengths,
      });
    }
  }

  // Sort by total connectivity
  drivers.sort((a, b) => {
    const totA = a.strengths.reduce((s, x) => s + Math.abs(x), 0);
    const totB = b.strengths.reduce((s, x) => s + Math.abs(x), 0);
    return totB - totA;
  });

  return drivers;
}
