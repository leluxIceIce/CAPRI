export interface VariableStats {
  min: number;
  max: number;
  mean: number;
  std: number;
}

export type VariableName = "CHL" | "aphy" | "ADG" | "bbp" | "TSM" | "PAR" | "KD490" | "FLH" | "CHL_disagreement" | "OA01" | "OA02" | "OA03" | "OA04" | "OA05" | "OA06" | "OA07" | "OA08" | "OA09" | "OA10" | "OA11" | "OA13";

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
  OA01: {
    name: "OA01",
    label: "OLCI Band 01 (400nm)",
    unit: "sr⁻¹",
    color: "#7c3aed",
    description: "Raw spectral reflectance, 400nm / 15nm. Aerosol correction and improved water-constituent retrieval.",
  },
  OA02: {
    name: "OA02",
    label: "OLCI Band 02 (412.5nm)",
    unit: "sr⁻¹",
    color: "#6366f1",
    description: "Raw spectral reflectance, 412.5nm / 10nm. Yellow substance (CDOM / gelbstoff) and detrital pigment absorption; a key turbidity marker.",
  },
  OA03: {
    name: "OA03",
    label: "OLCI Band 03 (442.5nm)",
    unit: "sr⁻¹",
    color: "#3b82f6",
    description: "Raw spectral reflectance, 442.5nm / 10nm. Chlorophyll-a absorption maximum; core biogeochemistry band.",
  },
  OA04: {
    name: "OA04",
    label: "OLCI Band 04 (490nm)",
    unit: "sr⁻¹",
    color: "#06b6d4",
    description: "Raw spectral reflectance, 490nm / 10nm. High-chlorophyll signal; basis for the KD490 diffuse-attenuation product.",
  },
  OA05: {
    name: "OA05",
    label: "OLCI Band 05 (510nm)",
    unit: "sr⁻¹",
    color: "#14b8a6",
    description: "Raw spectral reflectance, 510nm / 10nm. Chlorophyll, suspended sediment, turbidity and red-tide discrimination.",
  },
  OA06: {
    name: "OA06",
    label: "OLCI Band 06 (560nm)",
    unit: "sr⁻¹",
    color: "#84cc16",
    description: "Raw spectral reflectance, 560nm / 10nm. Green reference band (chlorophyll reflectance minimum); baseline for colour-ratio algorithms.",
  },
  OA07: {
    name: "OA07",
    label: "OLCI Band 07 (620nm)",
    unit: "sr⁻¹",
    color: "#f97316",
    description: "Raw spectral reflectance, 620nm / 10nm. Suspended sediment loading.",
  },
  OA08: {
    name: "OA08",
    label: "OLCI Band 08 (665nm)",
    unit: "sr⁻¹",
    color: "#e11d48",
    description: "Raw spectral reflectance, 665nm / 10nm. Second chlorophyll-a absorption maximum; sediment.",
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
