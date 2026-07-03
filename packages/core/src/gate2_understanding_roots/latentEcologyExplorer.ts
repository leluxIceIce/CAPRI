import { DataCube, VariableName } from "../types";
import { InteractionMatrix, computeInteractionMatrix } from "./interactionMatrix";
import { AttractorAnalysis, detectAttractors } from "./attractorDetection";

/**
 * Gate 2 Understanding Roots: Latent Ecology Explorer
 *
 * Unified interface for visualizing:
 * - Variable interaction heatmaps (which variables correlate)
 * - Attractor landscapes (where cells cluster in PCA space)
 * - Regime transitions (which cells are in transition zones)
 */

export interface LatentEcologyState {
  interactionMatrix: InteractionMatrix;
  attractorAnalysis: AttractorAnalysis;
  regimeTransitionMap: Map<number, number>; // cell index -> transition risk 0-1
  strongestLinks: Array<{
    var1: VariableName;
    var2: VariableName;
    correlation: number;
  }>;
  metadata: {
    timestamp: string;
    computeTimeMs: number;
  };
}

/**
 * Compute transition risk for each cell based on distance to attractor boundaries
 */
function computeRegimeTransitionMap(
  projections: Float64Array,
  labels: Uint8Array,
  cellCount: number
): Map<number, number> {
  const transitionMap = new Map<number, number>();
  const dims = 3;

  for (let i = 0; i < cellCount; i++) {
    // Compute distance to own centroid
    const regimeId = labels[i];
    let ownDistSq = 0;
    let centroidCount = 0;
    let cx = 0,
      cy = 0,
      cz = 0;

    // Find centroid of this regime
    for (let j = 0; j < cellCount; j++) {
      if (labels[j] === regimeId) {
        centroidCount++;
        cx += projections[j * dims];
        cy += projections[j * dims + 1];
        cz += projections[j * dims + 2];
      }
    }

    if (centroidCount > 0) {
      cx /= centroidCount;
      cy /= centroidCount;
      cz /= centroidCount;

      ownDistSq =
        (projections[i * dims] - cx) ** 2 +
        (projections[i * dims + 1] - cy) ** 2 +
        (projections[i * dims + 2] - cz) ** 2;
    }

    // Transition risk: cells far from centroid have high risk
    const ownDist = Math.sqrt(ownDistSq);
    const riskScore = Math.tanh(ownDist / 1.5); // S-curve: 0->1 as distance increases

    transitionMap.set(i, riskScore);
  }

  return transitionMap;
}

/**
 * Extract strongest variable interactions for visualization
 */
function extractStrongestLinks(
  interaction: InteractionMatrix,
  topN: number = 6
): Array<{
  var1: VariableName;
  var2: VariableName;
  correlation: number;
}> {
  const links: Array<{
    var1: VariableName;
    var2: VariableName;
    correlation: number;
  }> = [];
  const D = interaction.variableNames.length;

  for (let i = 0; i < D; i++) {
    for (let j = i + 1; j < D; j++) {
      const corr = interaction.correlations[i * D + j];
      if (Math.abs(corr) > 0.3) {
        // Only include moderate+ correlations
        links.push({
          var1: interaction.variableNames[i],
          var2: interaction.variableNames[j],
          correlation: corr,
        });
      }
    }
  }

  // Sort by absolute correlation descending
  links.sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));

  return links.slice(0, topN);
}

/**
 * Compute unified Gate 2 latent ecology state
 */
export function exploreLatentEcology(
  cube: DataCube,
  regimeCount: number = 5
): LatentEcologyState {
  const startTime = performance.now();

  // Compute interaction matrix (variable correlations)
  const interactionMatrix = computeInteractionMatrix(cube);

  // Detect attractors in PCA space
  const attractorAnalysis = detectAttractors(cube, regimeCount);

  // Compute transition risk per cell
  const regimeTransitionMap = computeRegimeTransitionMap(
    attractorAnalysis.projections,
    attractorAnalysis.clusterLabels,
    attractorAnalysis.metadata.cellCount
  );

  // Extract strongest variable links
  const strongestLinks = extractStrongestLinks(interactionMatrix, 6);

  const endTime = performance.now();

  return {
    interactionMatrix,
    attractorAnalysis,
    regimeTransitionMap,
    strongestLinks,
    metadata: {
      timestamp: cube.timestamp,
      computeTimeMs: endTime - startTime,
    },
  };
}

/**
 * Generate a human-readable summary of latent ecology findings
 */
export function summarizeLatentEcology(state: LatentEcologyState): {
  dominantRegime: string;
  strongestDriver: VariableName | null;
  topInteractions: string[];
  ecologicalInterpretation: string;
} {
  // Find dominant regime
  const dominantRegime =
    state.attractorAnalysis.attractors[0]?.label || "Unknown";

  // Find variable with most interactions
  const varInteractionCount: Record<VariableName, number> = {} as any;
  for (const link of state.strongestLinks) {
    varInteractionCount[link.var1] = (varInteractionCount[link.var1] || 0) + 1;
    varInteractionCount[link.var2] = (varInteractionCount[link.var2] || 0) + 1;
  }

  let strongestDriver: VariableName | null = null;
  let maxCount = 0;
  for (const [varName, count] of Object.entries(varInteractionCount)) {
    if (count > maxCount) {
      maxCount = count;
      strongestDriver = varName as VariableName;
    }
  }

  // Top interactions
  const topInteractions = state.strongestLinks.slice(0, 3).map((link) => {
    const sign = link.correlation > 0 ? "co-varies" : "inversely varies";
    return `${link.var1} ${sign} with ${link.var2} (r=${link.correlation.toFixed(2)})`;
  });

  // Generate interpretation
  let interpretation = `System dominated by ${dominantRegime} (${(state.attractorAnalysis.attractors[0]?.dominance * 100).toFixed(0)}% of cells). `;

  if (strongestDriver) {
    interpretation += `${strongestDriver} appears to be a key driver with ${maxCount} strong interactions. `;
  }

  const transitionCount = Array.from(state.regimeTransitionMap.values()).filter(
    (risk) => risk > 0.5
  ).length;
  const transitionFraction = transitionCount / state.attractorAnalysis.metadata.cellCount;

  if (transitionFraction > 0.3) {
    interpretation += `Significant transition zone detected (${(transitionFraction * 100).toFixed(0)}% of cells at regime boundaries).`;
  } else {
    interpretation += `System shows clear regime separation with minimal transition zones.`;
  }

  return {
    dominantRegime,
    strongestDriver,
    topInteractions,
    ecologicalInterpretation: interpretation,
  };
}
