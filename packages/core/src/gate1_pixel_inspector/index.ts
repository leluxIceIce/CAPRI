/**
 * Gate 1: Pixel Inspector - Main Entry Point
 *
 * This namespace provides isolated pixel-level inspection features for the
 * Ecological Encoding Dashboard. It maintains strict separation from Gate 2
 * (relationship graphs, attractors, latent ecology).
 *
 * Features:
 * - Click any grid point to inspect pixel-level statistics
 * - View all 9 ecological variables at that pixel
 * - PCA embedding distance and neighborhood analysis
 * - Similar pixel discovery with k-NN search
 * - Variable dependency visualization
 * - Optimized memoization for performance
 */

export * from "./types";
export * from "./pixelCompute";
