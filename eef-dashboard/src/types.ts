export interface VariableStats {
  min: number;
  max: number;
  mean: number;
  std: number;
}

export type VariableName = "CHL" | "aphy" | "ADG" | "bbp" | "TSM" | "PAR" | "KD490" | "FLH" | "CHL_disagreement" | "OA08" | "OA09" | "OA10" | "OA11" | "OA13";

export interface VariableMetadata {
  name: VariableName;
  label: string;
  unit: string;
  color: string;
  description: string;
}

// Order defines the 3D layer stack bottom→top: CHL at floor, CHL_disagreement at top.
// Biological primaries first, then optical bulk vars, then physiology, then QA flag.
// Variables whose DataCube channel values are signed floats (not clamped to [0,1]).
// ThreeViewport applies a different normalization for these before colormapping.
export const SIGNED_VARIABLES = new Set<VariableName>(["CHL_disagreement"]);

export const VARIABLE_METADATA: Record<VariableName, VariableMetadata> = {
  CHL: {
    name: "CHL",
    label: "Chlorophyll-a Proxy",
    unit: "mg/m³",
    color: "#4ade80",
    description: "Indicates primary algal and phytoplankton biological productivity. Key marker for eutrophication.",
  },
  aphy: {
    name: "aphy",
    label: "Phytoplankton Absorption",
    unit: "m⁻¹",
    color: "#e879f9",
    description: "Absorption coefficient mapping light absorption profiles of phytoplankton cells.",
  },
  PAR: {
    name: "PAR",
    label: "Solar Radiation (PAR)",
    unit: "μE/m²s",
    color: "#facc15",
    description: "Photosynthetically Active Radiation. Measures solar energy available to primary producers.",
  },
  TSM: {
    name: "TSM",
    label: "Suspended Solids",
    unit: "g/m³",
    color: "#f87171",
    description: "Total Dry Weight concentration of Suspended Matter. Measures overall water turbidity.",
  },
  KD490: {
    name: "KD490",
    label: "Light Attenuation",
    unit: "m⁻¹",
    color: "#60a5fa",
    description: "Diffuse vertical attenuation of light at 490nm. Defines photic depth of the column.",
  },
  ADG: {
    name: "ADG",
    label: "Detritus & Gelbstoff",
    unit: "m⁻¹",
    color: "#fbbf24",
    description: "Colored dissolved organic matter (CDOM) and detrital particle absorption of light.",
  },
  bbp: {
    name: "bbp",
    label: "Particulate Backscattering",
    unit: "m⁻¹",
    color: "#22d3ee",
    description: "Measure of light backscattered by mineral suspended particles and micro-organic scatterers.",
  },
  FLH: {
    name: "FLH",
    label: "Fluorescence Line Height",
    unit: "mW/cm²/μm/sr",
    color: "#f43f5e",
    description: "Chlorophyll fluorescence emission signal. A physiological-stress indicator largely independent of biomass, revealing photosynthetic health of phytoplankton.",
  },
  CHL_disagreement: {
    name: "CHL_disagreement",
    label: "CHL Algorithm Disagreement",
    unit: "mg/m³",
    color: "#fb923c",
    description: "Absolute disagreement between the Neural Network and OC4ME chlorophyll algorithms. Data-quality and Case-2 (optically complex) water flag.",
  },
  OA08: {
    name: "OA08",
    label: "OLCI Band 08 (665nm)",
    unit: "sr⁻¹",
    color: "#e11d48",
    description: "Raw spectral reflectance. Absorption maximum of chlorophyll-a.",
  },
  OA09: {
    name: "OA09",
    label: "OLCI Band 09 (673nm)",
    unit: "sr⁻¹",
    color: "#be123c",
    description: "Raw spectral reflectance. Chlorophyll fluorescence peak.",
  },
  OA10: {
    name: "OA10",
    label: "OLCI Band 10 (681nm)",
    unit: "sr⁻¹",
    color: "#9f1239",
    description: "Raw spectral reflectance. Chlorophyll fluorescence baseline / peak.",
  },
  OA11: {
    name: "OA11",
    label: "OLCI Band 11 (708nm)",
    unit: "sr⁻¹",
    color: "#881337",
    description: "Raw spectral reflectance. Phytoplankton absorption minimum / peak.",
  },
  OA13: {
    name: "OA13",
    label: "OLCI Band 13 (761nm)",
    unit: "sr⁻¹",
    color: "#4c0519",
    description: "Raw spectral reflectance. O2 absorption band, aerosol correction.",
  }
};

export interface LayerState {
  visible: boolean;
  opacity: number;
}

export interface ConfidenceOverlayState {
  visible: boolean;
  opacity: number;
}

export type StreamMode = "synthetic" | "uploaded" | "preset_coastal" | "preset_deepsea" | "preset_estuary";

export interface TelemetryStreamConfig {
  mode: StreamMode;
  speedHz: number; // updates per second: 1, 2, 5
  noiseLevel: number; // 0 to 0.2
  currentAnomaly: number; // intensity of simulated anomalies: 0 to 1
  driftFactor: number; // simulates sensor drift calibration loss: 0 to 0.1
  flowSpeed: number; // speed of spatial plume flows: 0 to 2
  mosaicScale: number; // Number of tiles in the ecological graph mosaic (20 to 100)
}

export enum ZoomLevel {
  Regional = "regional", // All tiles (Trunks)
  Cluster = "cluster",   // Tile groups (Branches)
  Local = "local",       // Individual tiles (Roots)
  Micro = "micro"        // Pixel level (Twigs)
}

export interface TileNode {
  id: number;
  worldX: number;
  worldZ: number;
  embedding: Float64Array; // Structural embedding proxy (eigenvalue spectrum) — NOT a learned/contrastive embedding; see affinityGraph.ts
  regimeId: number;
  cube: DataCube | null; // For local/micro view, holds actual grid data
}

export interface EcologicalGraph {
  nodes: TileNode[];
  edges: { source: number; target: number; weight: number; isSpatial: boolean }[];
  maxWeight: number;
}

export interface SpatialDescriptor {
  gradientDx: number[][];
  gradientDy: number[][];
  laplacian: number[][];
  localVariance: number[][];
}

export interface RelationshipDescriptor {
  correlations: Record<string, number>; // e.g., "CHL_TSM": value
  ratios: Record<string, number>; // e.g., "CHL_TSM": value, "aphy_CHL": value
  indices: {
    trophicState: number;
    turbidity: number;
    lightLimitation: number;
    organicCarbon: number;
  };
}

export interface AnalysisResult {
  regime: string;
  regimeId: number;
  probabilities: Record<string, number>; // probability of each regime
  transitionRisk: "Low (Stable)" | "Moderate (Mixing)" | "High (State Boundary)";
  transitionEntropy: number; // entropy score 0 to 1
  stateNoveltyScore: number; // distance to historical baseline
  stateNoveltyPValue: number; // p-value
  isNovel: boolean;
  isBoundaryZone: boolean;
  scientificJustification: string;
  timestamp: string;
}

export interface CellCoord {
  lat: number; // WGS-84 latitude, decimal degrees
  lon: number; // WGS-84 longitude, decimal degrees
}

export interface DataCube {
  gridSize: number; // default 20 for 20x20
  timestamp: string;
  channels: Record<VariableName, number[][]>; // 20x20 matrices
  stats: Record<VariableName, VariableStats>;
  confidence?: number[][]; // 20x20, [0,1], aerosol-derived confidence weight. Absent => assume all 1.0
  // 20x20, per-cell real-world WGS-84 coordinates. Only present when the source
  // data (e.g. a geo-tagged CSV) actually carried lat/lon columns — never
  // fabricated for synthetic/ungeoreferenced data.
  coords?: CellCoord[][];
}

export interface RootVisualizationState {
  visible: boolean;
  opacity: number;
  depth: number;
  colorMode: 'cluster' | 'eigenvalue' | 'variable';
  selectedCluster: number | null;
}

// The 9 spatial structure descriptors computed per variable by
// src/utils/spatialTensor.ts (TS port of capri's SpatialStructureExtractor).
export type SpatialDescriptorName =
  | "gradient_dx"
  | "gradient_dy"
  | "laplacian"
  | "variance"
  | "entropy"
  | "moran"
  | "semivariance"
  | "patchiness"
  | "texture_contrast";

export interface SpatialOverlayState {
  visible: boolean;
  opacity: number;
  variable: VariableName | null;
  descriptor: SpatialDescriptorName | null;
}

export interface RelationshipGraphState {
  visible: boolean;
  opacity: number;
  channelName: string | null;
  threshold: number;
}
