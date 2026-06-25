/**
 * Gate 1: Pixel Inspector namespace
 * Provides isolated type definitions for pixel-level inspection features.
 * Maintains strict isolation from Gate 2 (relationship graphs, attractors).
 */

import { VariableName } from "../types";

export interface PixelCoord {
  row: number;
  col: number;
}

export interface PixelValues {
  CHL: number;
  aphy: number;
  ADG: number;
  bbp: number;
  TSM: number;
  PAR: number;
  KD490: number;
  FLH: number;
  CHL_disagreement: number;
}

/**
 * Summary statistics for a single pixel
 */
export interface PixelStatistics {
  coord: PixelCoord;
  values: PixelValues;
  pcaProjection: Float64Array; // 9-dimensional PCA projection
  pcaDistance: number; // Distance from global mean in PCA space
  normalizedValues: PixelValues; // Z-scored values (mean=0, std=1)
  neighborhoodMetrics: {
    localMean: PixelValues;
    localStd: PixelValues;
    localCorrelations: Record<string, number>; // e.g., "CHL_TSM": value
  };
}

/**
 * Neighborhood search result
 */
export interface SimilarPixel {
  coord: PixelCoord;
  similarity: number; // Euclidean distance in normalized space (lower = more similar)
  values: PixelValues;
  rank: number; // 1 = most similar
}

/**
 * Variable dependency snapshot (correlation matrix row/column for a pixel)
 */
export interface VariableDependency {
  variable: VariableName;
  correlations: Record<VariableName, number>;
}

/**
 * Memoized computation cache (prevents recomputation on hover)
 */
export interface PixelComputationCache {
  timestamp: number; // DataCube timestamp when this was computed
  stats: Map<string, PixelStatistics>; // Key: "row_col"
  neighborhoodCache: Map<string, SimilarPixel[]>; // Key: "row_col"
}

/**
 * State for the Pixel Inspector panel
 */
export interface PixelInspectorState {
  visible: boolean;
  selectedPixel: PixelCoord | null;
  hoveredPixel: PixelCoord | null;
  neighborhoodRadius: number; // How many pixels to search (default 3)
  topNeighborCount: number; // How many similar pixels to show (default 5)
  selectedVariable: VariableName | null; // For dependency view
}
