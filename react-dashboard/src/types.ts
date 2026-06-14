export interface VariableStats {
  min: number;
  max: number;
  mean: number;
  std: number;
}

export type VariableName = "CHL" | "aphy" | "ADG" | "bbp" | "TSM" | "PAR" | "KD490";

export interface VariableMetadata {
  name: VariableName;
  label: string;
  unit: string;
  color: string;
  description: string;
}

export const VARIABLE_METADATA: Record<VariableName, VariableMetadata> = {
  CHL: {
    name: "CHL",
    label: "Chlorophyll-a Proxy",
    unit: "mg/m³",
    color: "#4ade80", // Vibrant emerald green
    description: "Indicates primary algal and phytoplankton biological productivity. Key marker for eutrophication.",
  },
  aphy: {
    name: "aphy",
    label: "Phytoplankton Absorption",
    unit: "m⁻¹",
    color: "#e879f9", // Vibrant purple/magenta
    description: "Absorption coefficient mapping light absorption profiles of phytoplankton cells.",
  },
  ADG: {
    name: "ADG",
    label: "Detritus & Gelbstoff",
    unit: "m⁻¹",
    color: "#fbbf24", // Vibrant amber/gold yellow
    description: "Colored dissolved organic matter (CDOM) and detrital particle absorption of light.",
  },
  bbp: {
    name: "bbp",
    label: "Particulate Backscattering",
    unit: "m⁻¹",
    color: "#22d3ee", // Vibrant cyan/teal
    description: "Measure of light backscattered by mineral suspended particles and micro-organic scatterers.",
  },
  TSM: {
    name: "TSM",
    label: "Suspended Solids",
    unit: "g/m³",
    color: "#f87171", // Vibrant soft red/copper
    description: "Total Dry Weight concentration of Suspended Matter. Measures overall water turbidity.",
  },
  PAR: {
    name: "PAR",
    label: "Solar Radiation (PAR)",
    unit: "μE/m²s",
    color: "#facc15", // Vibrant solar yellow
    description: "Photosynthetically Active Radiation. Measures solar energy available to primary producers.",
  },
  KD490: {
    name: "KD490",
    label: "Light Attenuation",
    unit: "m⁻¹",
    color: "#60a5fa", // Vibrant blue/glacier
    description: "Diffuse vertical attenuation of light at 490nm. Defines photic depth of the column.",
  }
};

export interface LayerState {
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

export interface DataCube {
  gridSize: number; // default 20 for 20x20
  timestamp: string;
  channels: Record<VariableName, number[][]>; // 20x20 matrices
  stats: Record<VariableName, VariableStats>;
}
