/**
 * Gate 2: Understanding Roots — Latent Ecology Analysis Engine
 *
 * This module provides the mathematical and computational foundation for
 * understanding WHY ecological clusters emerge by analyzing:
 *
 * 1. Interaction Matrices (correlations between variables)
 * 2. Attractor Detection (stable equilibrium points in PCA space)
 * 3. Latent Ecology State (unified analysis combining both)
 * 4. Boundary Detection (transition zones between regimes)
 *
 * All computations operate in the latent PCA space where ecological regimes
 * appear as distinct attractors surrounded by transition zones.
 */

export {
  computeInteractionMatrix,
  getStrongestInteractions,
  hypothesizeCausalPaths,
  type InteractionMatrix,
  type InteractionPair,
} from "./interactionMatrix";

export {
  detectAttractors,
  findBoundaryCells,
  characterizeAttractor,
  type EcologicalAttractor,
  type AttractorAnalysis,
} from "./attractorDetection";

export {
  exploreLatentEcology,
  summarizeLatentEcology,
  type LatentEcologyState,
} from "./latentEcologyExplorer";
