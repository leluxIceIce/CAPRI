import { DataCube, VariableName, VariableStats, TelemetryStreamConfig, AnalysisResult, VARIABLE_METADATA, CellCoord } from "./types";
import {
  seededKMeans,
  normalizedEntropy,
  moransI,
  meanGradientMagnitude,
  mahalanobisOutlierTest,
  cellVectors,
  informativeChannels,
  standardizeColumns,
} from "./utils/sceneStatistics";

// Helper to make a blank grid of size NxN
export function makeBlankGrid(size: number, fill = 0): number[][] {
  return Array(size)
    .fill(null)
    .map(() => Array(size).fill(fill));
}

// ── PRESETS FOR THE STREAM GENERATOR ──────────────────────────────────────────

interface RegimeParams {
  CHL: { base: number; freq: number; plumeAmp: number };
  aphy: { base: number; freq: number; plumeAmp: number };
  ADG: { base: number; freq: number; plumeAmp: number };
  bbp: { base: number; freq: number; plumeAmp: number };
  TSM: { base: number; freq: number; plumeAmp: number };
  PAR: { base: number; freq: number; plumeAmp: number };
  KD490: { base: number; freq: number; plumeAmp: number };
  FLH: { base: number; freq: number; plumeAmp: number };
  CHL_disagreement: { base: number; freq: number; plumeAmp: number };
  OA01: { base: number; freq: number; plumeAmp: number };
  OA02: { base: number; freq: number; plumeAmp: number };
  OA03: { base: number; freq: number; plumeAmp: number };
  OA04: { base: number; freq: number; plumeAmp: number };
  OA05: { base: number; freq: number; plumeAmp: number };
  OA06: { base: number; freq: number; plumeAmp: number };
  OA07: { base: number; freq: number; plumeAmp: number };
  OA08: { base: number; freq: number; plumeAmp: number };
  OA09: { base: number; freq: number; plumeAmp: number };
  OA10: { base: number; freq: number; plumeAmp: number };
  OA11: { base: number; freq: number; plumeAmp: number };
  OA13: { base: number; freq: number; plumeAmp: number };
}

const REGIME_PRESETS: Record<string, RegimeParams> = {
  coastal: {
    CHL: { base: 0.72, freq: 2.1, plumeAmp: 0.25 },
    aphy: { base: 0.65, freq: 1.9, plumeAmp: 0.22 },
    ADG: { base: 0.58, freq: 1.5, plumeAmp: 0.18 },
    bbp: { base: 0.50, freq: 2.5, plumeAmp: 0.15 },
    TSM: { base: 0.62, freq: 2.8, plumeAmp: 0.28 },
    PAR: { base: 0.45, freq: 0.6, plumeAmp: 0.08 },
    KD490: { base: 0.68, freq: 2.3, plumeAmp: 0.24 },
    FLH: { base: 0.50, freq: 2.0, plumeAmp: 0.18 },
    CHL_disagreement: { base: 0.12, freq: 1.0, plumeAmp: 0.0 },
    OA01: { base: 0.55, freq: 1.6, plumeAmp: 0.12 },
    OA02: { base: 0.52, freq: 1.6, plumeAmp: 0.13 },
    OA03: { base: 0.50, freq: 1.7, plumeAmp: 0.14 },
    OA04: { base: 0.48, freq: 1.8, plumeAmp: 0.15 },
    OA05: { base: 0.45, freq: 1.9, plumeAmp: 0.16 },
    OA06: { base: 0.42, freq: 2.0, plumeAmp: 0.16 },
    OA07: { base: 0.38, freq: 2.1, plumeAmp: 0.18 },
    OA08: { base: 0.35, freq: 1.5, plumeAmp: 0.10 },
    OA09: { base: 0.30, freq: 1.6, plumeAmp: 0.12 },
    OA10: { base: 0.25, freq: 1.7, plumeAmp: 0.15 },
    OA11: { base: 0.20, freq: 1.8, plumeAmp: 0.18 },
    OA13: { base: 0.15, freq: 1.9, plumeAmp: 0.20 },
  },
  deepsea: {
    CHL: { base: 0.12, freq: 0.8, plumeAmp: 0.03 },
    aphy: { base: 0.10, freq: 0.7, plumeAmp: 0.02 },
    ADG: { base: 0.08, freq: 0.6, plumeAmp: 0.02 },
    bbp: { base: 0.05, freq: 0.5, plumeAmp: 0.01 },
    TSM: { base: 0.06, freq: 0.4, plumeAmp: 0.01 },
    PAR: { base: 0.82, freq: 0.2, plumeAmp: 0.04 },
    KD490: { base: 0.15, freq: 0.8, plumeAmp: 0.03 },
    FLH: { base: 0.08, freq: 0.7, plumeAmp: 0.02 },
    CHL_disagreement: { base: 0.12, freq: 1.0, plumeAmp: 0.0 },
    OA01: { base: 0.70, freq: 0.4, plumeAmp: 0.03 },
    OA02: { base: 0.66, freq: 0.4, plumeAmp: 0.03 },
    OA03: { base: 0.60, freq: 0.5, plumeAmp: 0.03 },
    OA04: { base: 0.45, freq: 0.5, plumeAmp: 0.02 },
    OA05: { base: 0.30, freq: 0.6, plumeAmp: 0.02 },
    OA06: { base: 0.20, freq: 0.6, plumeAmp: 0.02 },
    OA07: { base: 0.14, freq: 0.6, plumeAmp: 0.01 },
    OA08: { base: 0.10, freq: 0.6, plumeAmp: 0.02 },
    OA09: { base: 0.08, freq: 0.5, plumeAmp: 0.01 },
    OA10: { base: 0.07, freq: 0.5, plumeAmp: 0.01 },
    OA11: { base: 0.05, freq: 0.4, plumeAmp: 0.01 },
    OA13: { base: 0.03, freq: 0.3, plumeAmp: 0.01 },
  },
  estuary: {
    CHL: { base: 0.48, freq: 1.5, plumeAmp: 0.15 },
    aphy: { base: 0.42, freq: 1.3, plumeAmp: 0.12 },
    ADG: { base: 0.65, freq: 2.0, plumeAmp: 0.25 },
    bbp: { base: 0.72, freq: 3.2, plumeAmp: 0.30 },
    TSM: { base: 0.82, freq: 3.5, plumeAmp: 0.35 },
    PAR: { base: 0.32, freq: 1.0, plumeAmp: 0.12 },
    KD490: { base: 0.78, freq: 2.8, plumeAmp: 0.25 },
    FLH: { base: 0.35, freq: 1.4, plumeAmp: 0.10 },
    CHL_disagreement: { base: 0.12, freq: 1.0, plumeAmp: 0.0 },
    OA01: { base: 0.20, freq: 2.0, plumeAmp: 0.10 },
    OA02: { base: 0.25, freq: 2.2, plumeAmp: 0.12 },
    OA03: { base: 0.32, freq: 2.4, plumeAmp: 0.15 },
    OA04: { base: 0.45, freq: 2.6, plumeAmp: 0.18 },
    OA05: { base: 0.60, freq: 2.9, plumeAmp: 0.24 },
    OA06: { base: 0.70, freq: 3.1, plumeAmp: 0.28 },
    OA07: { base: 0.68, freq: 3.3, plumeAmp: 0.30 },
    OA08: { base: 0.60, freq: 2.5, plumeAmp: 0.20 },
    OA09: { base: 0.55, freq: 2.4, plumeAmp: 0.18 },
    OA10: { base: 0.50, freq: 2.3, plumeAmp: 0.16 },
    OA11: { base: 0.45, freq: 2.2, plumeAmp: 0.14 },
    OA13: { base: 0.40, freq: 2.1, plumeAmp: 0.12 },
  }
};

// Generates a smooth, flowing 2D observation grid with physical anomalies
export function generateFlowingGrid(
  varName: VariableName,
  stepSeconds: number,
  config: TelemetryStreamConfig,
  gridSize = 20
): number[][] {
  const grid = makeBlankGrid(gridSize);
  const flowVal = config.flowSpeed;

  // Drift: directional ramp that tilts the field, rotating slowly over time
  const driftAngle = stepSeconds * 0.12;
  const driftCos = Math.cos(driftAngle);
  const driftSin = Math.sin(driftAngle);

  // Choose base preset params
  let presetName = "coastal";
  if (config.mode === "preset_deepsea") presetName = "deepsea";
  if (config.mode === "preset_estuary") presetName = "estuary";

  const preset = REGIME_PRESETS[presetName] || REGIME_PRESETS.coastal;
  const { base, freq, plumeAmp } = preset[varName];

  // Moving coordinates — flowSpeed drives spatial animation speed
  const offsetTime = stepSeconds * 0.4 * flowVal;

  // Anomaly pulsation envelope
  const anomalyPulse = 0.6 + 0.4 * Math.sin(stepSeconds * 1.5);

  for (let r = 0; r < gridSize; r++) {
    const y = (r / gridSize) * 2 - 1.0;
    for (let c = 0; c < gridSize; c++) {
      const x = (c / gridSize) * 2 - 1.0;

      // Base background gradient (large scale spatial trends)
      const grad = Math.sin(x * 1.5 + offsetTime) * Math.cos(y * 1.5 - offsetTime * 0.8) * 0.15 + 0.5;

      // Highly coherent spatial plume (simulates river discharges, fronts or phytoplankton swirls)
      const plumeX = x - Math.sin(y * 2.0 + offsetTime * 0.5) * 0.3 - 0.2;
      const plumeY = y + Math.cos(x * 1.8 + offsetTime * 0.6) * 0.2 + 0.3;
      const distToPlume = Math.sqrt(plumeX * plumeX + plumeY * plumeY);
      const plumeIntensity = Math.exp(-(distToPlume * distToPlume) / 0.8);

      // Thermal/turbid anomaly — pulsing focal front, strong at full intensity
      let anomalyMask = 0;
      if (config.currentAnomaly > 0) {
        const anomalyX = x - 0.4;
        const anomalyY = y - 0.3;
        const anomalyDist = Math.sqrt(anomalyX * anomalyX + anomalyY * anomalyY);
        anomalyMask = Math.exp(-(anomalyDist * anomalyDist) / 0.12) * config.currentAnomaly * anomalyPulse;
      }

      // High frequency ripple — fBm-style octave sum, also driven by flowSpeed for
      // visible turbulence. Octave count scales with gridSize so a higher-resolution
      // grid genuinely resolves finer spatial structure (each added octave doubles
      // frequency and halves amplitude) instead of just resampling the same texture
      // more smoothly. At the default gridSize=20 this reduces to exactly one octave,
      // matching prior behavior.
      const rippleSpeed = offsetTime * 3;
      const octaveCount = Math.max(1, Math.floor(Math.log2(gridSize / 10)));
      let highFreq = 0;
      for (let o = 0; o < octaveCount; o++) {
        const freq = 6 * Math.pow(2, o);
        const amp = 0.05 * Math.pow(0.6, o);
        highFreq += Math.sin(x * freq + rippleSpeed) * Math.cos(y * freq - rippleSpeed * 0.83) * amp;
      }

      // Noise — doubled range so max noiseLevel (0.2) produces ±0.2 grain
      const noise = (Math.random() - 0.5) * config.noiseLevel * 2.0;

      // Drift — directional spatial ramp (not a global constant)
      const drift = (x * driftCos + y * driftSin) * config.driftFactor * 0.5;

      // Combine
      let finalVal = base * grad + plumeIntensity * plumeAmp + anomalyMask * 0.8 + highFreq + noise + drift;

      // PAR special case — honors flow and noise but has its own base shape
      if (varName === "PAR") {
        finalVal = (0.75 + Math.sin(x + offsetTime * 0.1) * 0.1) - (plumeIntensity * 0.12) + noise * 0.5 + drift;
      }

      // CHL_disagreement: signed anomaly = OC4ME bias − NN bias, range ~[-2, +2].
      // OC4ME (ratio algorithm) overestimates in turbid plume core; NN overestimates
      // at optical-mixing edges. Result is spatially structured ± field.
      if (varName === "CHL_disagreement") {
        const oc4meBias = plumeIntensity * 1.0 + base * 0.25;  // high in turbid core
        const nnBias    = base * 0.45 + highFreq * 2.0;         // tracks spatial variation
        finalVal = (oc4meBias - nnBias + noise * 0.7) / 0.4;   // σ_ref = 0.4
        grid[r][c] = Math.max(-2.0, Math.min(2.0, finalVal));
        continue;
      }

      // Enforce physical boundary [0.001, 1.0]
      grid[r][c] = Math.max(0.001, Math.min(1.0, finalVal));
    }
  }

  return grid;
}

// Computes min, max, mean, std for a grid
export function computeGridStats(grid: number[][]): VariableStats {
  let min = Infinity;
  let max = -Infinity;
  let sum = 0;
  
  const flat: number[] = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const val = grid[r][c];
      flat.push(val);
      if (val < min) min = val;
      if (val > max) max = val;
      sum += val;
    }
  }
  
  const mean = sum / flat.length;
  const variance = flat.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / flat.length;
  const std = Math.sqrt(variance);

  return {
    min: isFinite(min) ? min : 0,
    max: isFinite(max) ? max : 1,
    mean: isNaN(mean) ? 0.5 : mean,
    std: isNaN(std) ? 0.1 : std
  };
}

// Formulates the full datacube
export function generateDataCube(
  stepSeconds: number,
  config: TelemetryStreamConfig,
  gridSize = 20
): DataCube {
  const channels = {} as Record<VariableName, number[][]>;
  const stats = {} as Record<VariableName, VariableStats>;

  const keys: VariableName[] = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490", "FLH", "CHL_disagreement", "OA01", "OA02", "OA03", "OA04", "OA05", "OA06", "OA07", "OA08", "OA09", "OA10", "OA11", "OA13"];

  keys.forEach((key) => {
    channels[key] = generateFlowingGrid(key, stepSeconds, config, gridSize);
    stats[key] = computeGridStats(channels[key]);
  });

  // Synthetic confidence channel — full confidence everywhere (no aerosol degradation modeled)
  const confidence = makeBlankGrid(gridSize, 1.0);

  return {
    gridSize,
    timestamp: new Date().toISOString(),
    channels,
    stats,
    confidence
  };
}

// ── CUSTOM CSV UPLOAD PARSER ──────────────────────────────────────────────────

// Maps common CSV column names to canonical names
export function mapColumnToCanonical(csvCol: string): VariableName | null {
  const norm = csvCol.trim().toLowerCase();
  
  if (norm === "chl" || norm === "chl_nn" || norm === "chl_oc4me" || norm === "chlorophyll" || norm.includes("chlorophyll")) return "CHL";
  if (norm === "aphy" || norm === "aphy_443" || norm === "aphy443" || norm.includes("aphy")) return "aphy";
  if (norm === "adg" || norm === "adg_443" || norm === "adg443" || norm.includes("adg") || norm.includes("detritus")) return "ADG";
  if (norm === "bbp" || norm === "bbp_443" || norm === "bbp443" || norm.includes("bbp") || norm.includes("backscatter")) return "bbp";
  if (norm === "tsm" || norm === "tsm_nn" || norm === "suspended" || norm.includes("tsm") || norm.includes("solids") || norm === "spm") return "TSM";
  if (norm === "par" || norm === "solar" || norm === "radiation" || norm.includes("par")) return "PAR";
  if (norm === "kd490" || norm === "kd_490" || norm === "kd" || norm.includes("att") || norm.includes("kd490")) return "KD490";
  if (norm.includes("oa01") || norm.includes("oa1_") || norm === "oa1") return "OA01";
  if (norm.includes("oa02") || norm === "oa2") return "OA02";
  if (norm.includes("oa03") || norm === "oa3") return "OA03";
  if (norm.includes("oa04") || norm === "oa4") return "OA04";
  if (norm.includes("oa05") || norm === "oa5") return "OA05";
  if (norm.includes("oa06") || norm === "oa6") return "OA06";
  if (norm.includes("oa07") || norm === "oa7") return "OA07";
  if (norm.includes("oa08") || norm.includes("oa8")) return "OA08";
  if (norm.includes("oa09") || norm.includes("oa9")) return "OA09";
  if (norm.includes("oa10")) return "OA10";
  if (norm.includes("oa11")) return "OA11";
  if (norm.includes("oa13")) return "OA13";

  return null;
}

// Maps a CSV column name to "lat" or "lon" if it looks like a WGS-84 coordinate
// column. Used to attach real per-cell coordinates to the DataCube when the
// uploaded CSV is an actual geo-tagged satellite/probe pixel export.
export function mapGeoColumn(csvCol: string): "lat" | "lon" | null {
  const norm = csvCol.trim().toLowerCase().replace(/[_\s-]/g, "");
  if (norm === "lat" || norm === "latitude") return "lat";
  if (norm === "lon" || norm === "lng" || norm === "long" || norm === "longitude") return "lon";
  return null;
}

// Maps raw Sentinel-3 OLCI band / chlorophyll-algorithm CSV column names to their canonical raw-band keys.
// Used to derive FLH (fluorescence line height), CHL_disagreement, and confidence (from T865 aerosol thickness).
export function mapRawBandColumn(csvCol: string): "Oa08" | "Oa09" | "Oa10" | "Oa11" | "CHL_NN" | "CHL_OC4ME" | "T865" | "A865" | null {
  const norm = csvCol.trim().toLowerCase().replace(/[_\s-]/g, "");

  if (norm.includes("oa08") || norm.includes("oa8")) return "Oa08";
  if (norm.includes("oa09") || norm.includes("oa9")) return "Oa09";
  if (norm.includes("oa10")) return "Oa10";
  if (norm.includes("oa11")) return "Oa11";
  if (norm === "chlnn" || norm.includes("chl_nn") || norm.includes("chlnn")) return "CHL_NN";
  if (norm === "chloc4me" || norm.includes("oc4me")) return "CHL_OC4ME";
  if (norm.includes("t865")) return "T865";
  if (norm.includes("a865")) return "A865";

  return null;
}

// Lightweight CSV parse that keeps the original rows/columns untouched (no
// canonical-column mapping, no NxN binning). Used by the raw CSV inspector
// table/chart view, which works directly on the uploaded file's own rows
// instead of the spatially-binned DataCube.
export interface RawCSVData {
  headers: string[];
  rows: number[][];
}

export function parseCSVRaw(csvText: string): RawCSVData {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) throw new Error("CSV file does not contain header or rows.");

  const headerLine = lines[0];
  const delim = headerLine.includes(";") ? ";" : ",";
  const headers = headerLine.split(delim).map(c => c.trim().replace(/^["']|["']$/g, ""));

  const rows: number[][] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = line.split(delim);
    rows.push(parts.map(p => {
      const val = parseFloat(p.trim());
      return isNaN(val) ? 0 : val;
    }));
  }

  return { headers, rows };
}

// Parses standard string of CSV data and converts to sequential or NxN matrices
export function parseCSVToCubes(csvText: string, gridSize = 20): DataCube[] {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) throw new Error("CSV file does not contain header or rows.");

  // Identify delimiter
  const header = lines[0];
  const delim = header.includes(";") ? ";" : ",";
  const columns = header.split(delim).map(c => c.trim().replace(/^["']|["']$/g, ""));

  // Find column mapping index
  const mapIdx: Record<string, number> = {};
  columns.forEach((col, idx) => {
    const canon = mapColumnToCanonical(col);
    if (canon) {
      if (mapIdx[canon] === undefined) {
        mapIdx[canon] = idx;
      }
    }
  });

  // Verify we matched basic indicators
  const matchedKeys = Object.keys(mapIdx);
  if (matchedKeys.length < 2) {
    throw new Error(`CSV format not recognized. Found only ${matchedKeys.length} matching variables (${matchedKeys.join(", ")}). Expected columns: CHL, TSM, PAR, etc.`);
  }

  // Find raw-band column mapping index (Oa09/Oa10/Oa11/CHL_NN/CHL_OC4ME/T865/A865)
  const rawColIdx: Record<string, number> = {};
  columns.forEach((col, idx) => {
    const raw = mapRawBandColumn(col);
    if (raw) {
      if (rawColIdx[raw] === undefined) {
        rawColIdx[raw] = idx;
      }
    }
  });

  // Find lat/lon column indices, if this CSV is actually geo-tagged.
  const geoColIdx: Partial<Record<"lat" | "lon", number>> = {};
  columns.forEach((col, idx) => {
    const geo = mapGeoColumn(col);
    if (geo && geoColIdx[geo] === undefined) {
      geoColIdx[geo] = idx;
    }
  });
  const hasGeoCoords = geoColIdx.lat !== undefined && geoColIdx.lon !== undefined;

  // Parse numeric rows
  const parsedRows: number[][] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const parts = line.split(delim);
    const rowFloats = parts.map(p => {
      const val = parseFloat(p.trim());
      return isNaN(val) ? 0 : val;
    });
    parsedRows.push(rowFloats);
  }

  // Reshape into NxN patches. If rows < gridSize*gridSize, fill out with duplicates.
  // If there are many rows, we can partition them into multiple time steps (each gridSize*gridSize rows = 1 frame)!
  const rowCount = parsedRows.length;
  const frameSize = gridSize * gridSize;
  const totalFrames = Math.max(1, Math.ceil(rowCount / frameSize));
  
  const results: DataCube[] = [];

  for (let f = 0; f < totalFrames; f++) {
    const frameOffset = f * frameSize;
    const channels = {} as Record<VariableName, number[][]>;
    const stats = {} as Record<VariableName, VariableStats>;
    
    const allKeys: VariableName[] = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490", "FLH", "CHL_disagreement", "OA01", "OA02", "OA03", "OA04", "OA05", "OA06", "OA07", "OA08", "OA09", "OA10", "OA11", "OA13"];

    // Pre-compute derived raw-value arrays (per cell, length = frameSize) for the
    // FLH and CHL_disagreement channels from the raw OLCI band / algorithm columns.
    const hasFLHBands = rawColIdx.Oa08 !== undefined && rawColIdx.Oa10 !== undefined && rawColIdx.Oa11 !== undefined;
    const hasCHLDisagreementCols = rawColIdx.CHL_NN !== undefined && rawColIdx.CHL_OC4ME !== undefined;
    const hasT865 = rawColIdx.T865 !== undefined;

    const derivedRaw: Record<string, number[]> = {
      FLH: [],
      CHL_disagreement: []
    };
    const confidenceVals: number[] = [];
    const latVals: number[] = [];
    const lonVals: number[] = [];

    for (let i = 0; i < frameSize; i++) {
      const rowIdx = (frameOffset + i) % rowCount;
      const rowData = parsedRows[rowIdx];

      // ESA-standard FLH: Oa08(665nm), Oa10(681.25nm), Oa11(708.75nm)
      // weight = (681.25 - 665.0) / (708.75 - 665.0) = 0.3714
      if (hasFLHBands && rowData) {
        const oa08 = rowData[rawColIdx.Oa08] ?? 0;
        const oa10 = rowData[rawColIdx.Oa10] ?? 0;
        const oa11 = rowData[rawColIdx.Oa11] ?? 0;
        derivedRaw.FLH.push(oa10 - (oa08 + (oa11 - oa08) * 0.3714));
      } else {
        derivedRaw.FLH.push(0);
      }

      // CHL_disagreement = signed bias: positive = OC4ME overestimates (turbid), negative = NN overestimates
      if (hasCHLDisagreementCols && rowData) {
        const chlNN = rowData[rawColIdx.CHL_NN] ?? 0;
        const chlOC4ME = rowData[rawColIdx.CHL_OC4ME] ?? 0;
        derivedRaw.CHL_disagreement.push(chlOC4ME - chlNN);
      } else {
        derivedRaw.CHL_disagreement.push(0);
      }

      // confidence = 1 - clamp(T865 / 0.5, 0, 1)
      if (hasT865 && rowData) {
        const t865 = rowData[rawColIdx.T865] ?? 0;
        confidenceVals.push(1 - Math.max(0, Math.min(1, t865 / 0.5)));
      } else {
        confidenceVals.push(1.0);
      }

      // Real-world WGS-84 coordinates, only when the CSV actually carried lat/lon columns.
      if (hasGeoCoords && rowData) {
        latVals.push(rowData[geoColIdx.lat!] ?? 0);
        lonVals.push(rowData[geoColIdx.lon!] ?? 0);
      }
    }

    allKeys.forEach((key) => {
      channels[key] = makeBlankGrid(gridSize);

      const colIdx = mapIdx[key];
      const isDerivedFLH = key === "FLH";
      const isDerivedDisagreement = key === "CHL_disagreement";

      // Collect values for normalization
      const rawVals: number[] = [];

      for (let i = 0; i < frameSize; i++) {
        if (isDerivedFLH) {
          rawVals.push(hasFLHBands ? derivedRaw.FLH[i] : 0);
        } else if (isDerivedDisagreement) {
          rawVals.push(hasCHLDisagreementCols ? derivedRaw.CHL_disagreement[i] : 0);
        } else {
          const rowIdx = (frameOffset + i) % rowCount;
          const rowData = parsedRows[rowIdx];
          if (rowData && colIdx !== undefined && colIdx < rowData.length) {
            rawVals.push(rowData[colIdx]);
          } else {
            rawVals.push(0);
          }
        }
      }

      // If FLH/CHL_disagreement have no source columns, leave the channel as all-zero
      // (matches the Python backend's zero-fill + degenerate-channel behavior).
      const skipNormalization =
        (isDerivedFLH && !hasFLHBands) || (isDerivedDisagreement && !hasCHLDisagreementCols);

      let scaledVals: number[];
      if (skipNormalization) {
        scaledVals = rawVals.map(() => 0);
      } else {
        // Perform column-wise min-max scaling to align perfectly with the [0, 1] range expected
        const colMin = Math.min(...rawVals);
        const colMax = Math.max(...rawVals);
        const colRange = (colMax - colMin) || 1.0;

        scaledVals = rawVals.map(v => (v - colMin) / colRange);
      }

      // Distribute into NxN grid
      let valIdx = 0;
      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          if (skipNormalization) {
            channels[key][r][c] = scaledVals[valIdx];
          } else {
            channels[key][r][c] = scaledVals[valIdx] || 0.1;
          }
          valIdx++;
        }
      }

      stats[key] = computeGridStats(channels[key]);
    });

    // Build the confidence grid (NxN) from T865 if available, else default to all-1.0
    const confidence = makeBlankGrid(gridSize, 1.0);
    let confIdx = 0;
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        confidence[r][c] = confidenceVals[confIdx];
        confIdx++;
      }
    }

    // Build the coords grid (NxN) only if the CSV actually carried lat/lon columns.
    let coords: CellCoord[][] | undefined;
    if (hasGeoCoords) {
      coords = [];
      let geoIdx = 0;
      for (let r = 0; r < gridSize; r++) {
        const row: CellCoord[] = [];
        for (let c = 0; c < gridSize; c++) {
          row.push({ lat: latVals[geoIdx], lon: lonVals[geoIdx] });
          geoIdx++;
        }
        coords.push(row);
      }
    }

    results.push({
      gridSize,
      timestamp: new Date(Date.now() + f * 5000).toISOString(),
      channels,
      stats,
      confidence,
      coords
    });
  }

  return results;
}

// ── SCENE DIAGNOSTICS (genuine statistics) ─────────────────────────────────────
// Replaces the old hand-tuned "GMM brain" (fixed prototype vectors, magic-number
// thresholds, a fabricated novelty p-value) with statistics computed from the
// cube's actual cells: k-means regime mixture, Moran's I / gradient front index,
// and a Mahalanobis χ² multivariate-outlier test for novelty. See
// utils/sceneStatistics.ts.

const CLUSTER_CHANNELS: VariableName[] = ["CHL", "TSM", "ADG", "bbp"];
const NOVELTY_CHANNELS: VariableName[] = ["CHL", "TSM", "ADG", "bbp", "KD490", "PAR", "aphy", "FLH"];

/** Descriptive name for a discovered cluster from its trophic/turbidity rank
 *  (0 = most productive/turbid of the discovered clusters). Honest: it labels a
 *  genuinely-clustered group by its own centroid magnitude, not a fixed prototype. */
function regimeName(productivityRank: number, totalClusters: number): string {
  if (totalClusters <= 1) return "Uniform optical field";
  if (productivityRank === 0) return "Productive / turbid waters";
  if (productivityRank === totalClusters - 1) return "Clear / oligotrophic waters";
  return "Intermediate / mixed waters";
}

export function evaluateScientificDiagnostics(cube: DataCube): AnalysisResult {
  // 1. Regime mixture via genuine seeded k-means on the cells themselves.
  const clusterCh = informativeChannels(cube, CLUSTER_CHANNELS);
  let regime = "Uniform optical field";
  let regimeId = 0;
  let probabilities: Record<string, number> = { "Uniform optical field": 1 };
  let entropy = 0;

  if (clusterCh.length >= 1) {
    const rawRows = cellVectors(cube, clusterCh);
    const { z } = standardizeColumns(rawRows);
    const k = Math.min(3, rawRows.length);
    const km = seededKMeans(z, k);
    const n = rawRows.length;

    // Per-cluster productivity = mean raw sum of optical channels (for naming).
    const prod = new Array(km.centroids.length).fill(0);
    const cnt = new Array(km.centroids.length).fill(0);
    for (let i = 0; i < n; i++) {
      const l = km.labels[i];
      prod[l] += rawRows[i].reduce((a, b) => a + b, 0);
      cnt[l] += 1;
    }
    for (let c = 0; c < prod.length; c++) prod[c] = cnt[c] > 0 ? prod[c] / cnt[c] : 0;

    // Rank clusters by productivity (desc) -> rank 0 = most productive.
    const order = prod.map((p, c) => ({ p, c })).sort((a, b) => b.p - a.p);
    const rankOf = new Map<number, number>();
    order.forEach((o, rank) => rankOf.set(o.c, rank));

    const proportions = km.sizes.map((s) => s / n);
    entropy = normalizedEntropy(proportions);

    // Probabilities keyed by descriptive regime name = genuine cluster shares.
    probabilities = {};
    km.sizes.forEach((s, c) => {
      probabilities[regimeName(rankOf.get(c)!, km.centroids.length)] = s / n;
    });

    // Dominant regime = largest cluster.
    let domCluster = 0;
    for (let c = 1; c < km.sizes.length; c++) if (km.sizes[c] > km.sizes[domCluster]) domCluster = c;
    regimeId = rankOf.get(domCluster)!;
    regime = regimeName(regimeId, km.centroids.length);
  }

  // Interpret the genuine mixture entropy as transition risk (an even split
  // across regimes = a mixing/boundary scene).
  let transitionRisk: AnalysisResult["transitionRisk"] = "Low (Stable)";
  if (entropy > 0.72) transitionRisk = "High (State Boundary)";
  else if (entropy > 0.45) transitionRisk = "Moderate (Mixing)";

  // 2. Spatial front index — Moran's I autocorrelation + gradient magnitude on
  // the most informative biological channel (CHL when it varies).
  const frontChannel: VariableName = (cube.stats.CHL?.std ?? 0) > 1e-4
    ? "CHL"
    : (informativeChannels(cube, NOVELTY_CHANNELS)[0] ?? "CHL");
  const frontGrid = cube.channels[frontChannel];
  const moran = moransI(frontGrid);
  const gradIndex = meanGradientMagnitude(frontGrid);
  // Low spatial autocorrelation => patchy / frontal structure.
  const isBoundaryZone = moran < 0.4;

  // 3. Novelty — Mahalanobis multivariate-outlier test against the scene's own
  // χ² law (no invented historical archive).
  const novCh = informativeChannels(cube, NOVELTY_CHANNELS);
  const outlier = mahalanobisOutlierTest(cellVectors(cube, novCh));
  const stateNoveltyScore = outlier.outlierFraction;
  const stateNoveltyPValue = outlier.pValue;
  // Genuinely novel = significantly more multivariate outliers than a Gaussian
  // of the same mean/covariance would produce.
  const isNovel = outlier.pValue < 0.01 && outlier.outlierFraction > outlier.expectedFraction * 2;

  // 4. Narrative built entirely from the computed numbers.
  const pct = (x: number) => `${(x * 100).toFixed(0)}%`;
  let scientificJustification =
    `k-means (seeded) resolves the scene into ${Object.keys(probabilities).length} cluster(s); ` +
    `the dominant regime is "${regime}" (${pct(Math.max(...Object.values(probabilities)))} of cells), ` +
    `mixture entropy ${entropy.toFixed(2)}. ` +
    `Spatial autocorrelation of ${frontChannel} is Moran's I = ${moran.toFixed(2)} ` +
    `(${isBoundaryZone ? "weak — patchy/frontal structure" : "strong — smooth, homogeneous field"}; ` +
    `gradient index ${gradIndex.toFixed(3)}). ` +
    `A Mahalanobis test over ${outlier.dims} channels flags ${pct(stateNoveltyScore)} of cells as ` +
    `multivariate outliers vs the χ²₍0.975₎ threshold (a Gaussian expects ${pct(outlier.expectedFraction)}), ` +
    `one-sided p = ${stateNoveltyPValue.toFixed(3)}` +
    `${isNovel ? " — significantly heavier-tailed than normal." : " — consistent with a single Gaussian population."}`;

  return {
    regime,
    regimeId,
    probabilities,
    transitionRisk,
    transitionEntropy: entropy,
    stateNoveltyScore,
    stateNoveltyPValue,
    isNovel,
    isBoundaryZone,
    scientificJustification,
    timestamp: cube.timestamp
  };
}
