import { DataCube, VariableName, VariableStats, TelemetryStreamConfig, AnalysisResult, VARIABLE_METADATA } from "./types";

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
  },
  deepsea: {
    CHL: { base: 0.12, freq: 0.8, plumeAmp: 0.03 },
    aphy: { base: 0.10, freq: 0.7, plumeAmp: 0.02 },
    ADG: { base: 0.08, freq: 0.6, plumeAmp: 0.02 },
    bbp: { base: 0.05, freq: 0.5, plumeAmp: 0.01 },
    TSM: { base: 0.06, freq: 0.4, plumeAmp: 0.01 },
    PAR: { base: 0.82, freq: 0.2, plumeAmp: 0.04 },
    KD490: { base: 0.15, freq: 0.8, plumeAmp: 0.03 },
  },
  estuary: {
    CHL: { base: 0.48, freq: 1.5, plumeAmp: 0.15 },
    aphy: { base: 0.42, freq: 1.3, plumeAmp: 0.12 },
    ADG: { base: 0.65, freq: 2.0, plumeAmp: 0.25 },
    bbp: { base: 0.72, freq: 3.2, plumeAmp: 0.30 },
    TSM: { base: 0.82, freq: 3.5, plumeAmp: 0.35 },
    PAR: { base: 0.32, freq: 1.0, plumeAmp: 0.12 },
    KD490: { base: 0.78, freq: 2.8, plumeAmp: 0.25 },
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
  const drift = (Math.sin(stepSeconds * 0.05) * config.driftFactor);
  
  // Choose base preset params
  let presetName = "coastal";
  if (config.mode === "preset_deepsea") presetName = "deepsea";
  if (config.mode === "preset_estuary") presetName = "estuary";
  
  const preset = REGIME_PRESETS[presetName] || REGIME_PRESETS.coastal;
  const { base, freq, plumeAmp } = preset[varName];

  // Moving coordinates
  const offsetTime = stepSeconds * 0.15 * flowVal;
  
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
      
      // Interactive/Configured physical anomalies
      let anomalyMask = 0;
      if (config.currentAnomaly > 0) {
        // Creates a highly focal, pulsing thermal/turbid circular front at center-right
        const anomalyX = x - 0.4;
        const anomalyY = y - 0.3;
        const anomalyDist = Math.sqrt(anomalyX * anomalyX + anomalyY * anomalyY);
        anomalyMask = Math.exp(-(anomalyDist * anomalyDist) / 0.12) * config.currentAnomaly;
      }

      // Small scale high frequency ripple patterns
      const highFreq = Math.sin(x * gridSize * 0.3 + offsetTime * 3) * Math.cos(y * gridSize * 0.3 - offsetTime * 2.5) * 0.05;

      // Noise factor
      const noise = (Math.random() - 0.5) * config.noiseLevel;

      // Combine values with physical bounds
      let finalVal = base * grad + plumeIntensity * plumeAmp + anomalyMask * 0.4 + highFreq + noise + drift;

      // Adjust specifically for solar radiation PAR (does not decay deeply but has soft spatial shading)
      if (varName === "PAR") {
        finalVal = (0.75 + Math.sin(x + offsetTime * 0.1) * 0.1) - (plumeIntensity * 0.12) + noise * 0.3;
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

  const keys: VariableName[] = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490"];
  
  keys.forEach((key) => {
    channels[key] = generateFlowingGrid(key, stepSeconds, config, gridSize);
    stats[key] = computeGridStats(channels[key]);
  });

  return {
    gridSize,
    timestamp: new Date().toISOString(),
    channels,
    stats
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
  
  return null;
}

// Parses standard string of CSV data and converts to sequential or 20x20 matrices
export function parseCSVToCubes(csvText: string): DataCube[] {
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

  // Reshape into 20x20 patches. If rows < 400, fill out with duplicates.
  // If there are many rows, we can partition them into multiple time steps (each 400 rows = 1 frame)!
  const rowCount = parsedRows.length;
  const frameSize = 400; // 20x20
  const totalFrames = Math.max(1, Math.ceil(rowCount / frameSize));
  
  const results: DataCube[] = [];

  for (let f = 0; f < totalFrames; f++) {
    const frameOffset = f * frameSize;
    const channels = {} as Record<VariableName, number[][]>;
    const stats = {} as Record<VariableName, VariableStats>;
    
    const allKeys: VariableName[] = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490"];
    
    allKeys.forEach((key) => {
      channels[key] = makeBlankGrid(20);
      
      const colIdx = mapIdx[key];
      // Collect values for normalization
      const rawVals: number[] = [];
      const indexMap: number[] = [];
      
      for (let i = 0; i < frameSize; i++) {
        const rowIdx = (frameOffset + i) % rowCount;
        const rowData = parsedRows[rowIdx];
        if (rowData && colIdx !== undefined && colIdx < rowData.length) {
          rawVals.push(rowData[colIdx]);
        } else {
          rawVals.push(0);
        }
      }

      // Perform column-wise min-max scaling to align perfectly with the [0, 1] range expected
      const colMin = Math.min(...rawVals);
      const colMax = Math.max(...rawVals);
      const colRange = (colMax - colMin) || 1.0;
      
      const scaledVals = rawVals.map(v => (v - colMin) / colRange);

      // Distribute into 20x20 grid
      let valIdx = 0;
      for (let r = 0; r < 20; r++) {
        for (let c = 0; c < 20; c++) {
          channels[key][r][c] = scaledVals[valIdx] || 0.1;
          valIdx++;
        }
      }

      stats[key] = computeGridStats(channels[key]);
    });

    results.push({
      gridSize: 20,
      timestamp: new Date(Date.now() + f * 5000).toISOString(),
      channels,
      stats
    });
  }

  return results;
}

// ── TELEMETRY SCIENTIFIC DIAGNOSTIC & GMM BRAIN ────────────────────────────────

// Simulated GMM Profiles for 3 primary regimes
const EXTREME_PROFILERS = {
  coastal_bloom: { CHL: 0.70, TSM: 0.65, ADG: 0.60, bbp: 0.55 },
  shallow_sea:   { CHL: 0.40, TSM: 0.35, ADG: 0.40, bbp: 0.32 },
  deep_pelagic:  { CHL: 0.10, TSM: 0.08, ADG: 0.08, bbp: 0.05 }
};

export function evaluateScientificDiagnostics(cube: DataCube): AnalysisResult {
  const chlMean = cube.stats.CHL.mean;
  const tsmMean = cube.stats.TSM.mean;
  const adgMean = cube.stats.ADG.mean;
  const bbpMean = cube.stats.bbp.mean;
  const parMean = cube.stats.PAR.mean;
  const kd490Mean = cube.stats.KD490?.mean || 0.5;

  // 1. Calculate Multi-dimensional Gaussian Mixture probabilities
  // We compute similarity score using simple squared exponential distance (RBF)
  const calcDist = (profile: typeof EXTREME_PROFILERS.coastal_bloom) => {
    return Math.pow(chlMean - profile.CHL, 2) +
           Math.pow(tsmMean - profile.TSM, 2) +
           Math.pow(adgMean - profile.ADG, 2) +
           Math.pow(bbpMean - profile.bbp, 2);
  };

  const distCoastal = calcDist(EXTREME_PROFILERS.coastal_bloom);
  const distShallow = calcDist(EXTREME_PROFILERS.shallow_sea);
  const distPelagic = calcDist(EXTREME_PROFILERS.deep_pelagic);

  // Convert to unnormalized probability densities (higher density for smaller distances)
  const densCoastal = Math.exp(-distCoastal / 0.08);
  const densShallow = Math.exp(-distShallow / 0.08);
  const densPelagic = Math.exp(-distPelagic / 0.08);

  const totalDensity = densCoastal + densShallow + densPelagic;
  const probCoastal = densCoastal / totalDensity;
  const probShallow = densShallow / totalDensity;
  const probPelagic = densPelagic / totalDensity;

  // Identify primary classification
  let regime = "Deep Pelagic Ocean Core";
  let regimeId = 2;
  let primary_prob = probPelagic;

  if (probCoastal > probShallow && probCoastal > probPelagic) {
    regime = "Coastal Eutrophic Upwelling Zone";
    regimeId = 0;
    primary_prob = probCoastal;
  } else if (probShallow > probCoastal && probShallow > probPelagic) {
    regime = "Shallow Sediment Estuary Front";
    regimeId = 1;
    primary_prob = probShallow;
  }

  // 2. Evaluate Transition Risk via Shannon Entropy of the GMM outputs
  // entropy = - sum (p * log2(p))
  const p1 = probCoastal + 1e-9;
  const p2 = probShallow + 1e-9;
  const p3 = probPelagic + 1e-9;
  const entropy = -(p1 * Math.log2(p1) + p2 * Math.log2(p2) + p3 * Math.log2(p3)) / Math.log2(3);

  let transitionRisk: AnalysisResult["transitionRisk"] = "Low (Stable)";
  if (entropy > 0.72) {
    transitionRisk = "High (State Boundary)";
  } else if (entropy > 0.45) {
    transitionRisk = "Moderate (Mixing)";
  }

  // 3. Evaluate State Novelty (measures if current values exceed expected profiles)
  // Highly driven by extreme value departures or high standard deviation anomalies
  const globalMisfit = (chlMean > 0.9 || tsmMean > 0.9 || bbpMean > 0.85 || chlMean < 0.03);
  let stateNoveltyScore = Math.max(0.05, Math.abs(chlMean - 0.4) * 1.5 + Math.abs(tsmMean - 0.35) * 1.2);
  
  if (globalMisfit) {
    stateNoveltyScore *= 1.8;
  }

  const isNovel = stateNoveltyScore > 0.75;
  const stateNoveltyPValue = isNovel ? 0.004 : (1.0 - Math.min(0.95, stateNoveltyScore));
  const confidence = `${((1.0 - stateNoveltyPValue) * 100).toFixed(1)}% Confidence`;

  // 4. Boundary Zone detection (spatial fluid gradients)
  // Assesses local spatial variance. If there's high standard deviation across pixels, it's a front!
  const chlStd = cube.stats.CHL.std;
  const tsmStd = cube.stats.TSM.std;
  const isBoundaryZone = (chlStd > 0.16 || tsmStd > 0.18);

  // 5. Generate rich scientific rationale justification
  const drivers: string[] = [];
  if (chlMean > 0.6) {
    drivers.push("extreme concentrations of chlorophyll-a, signaling high levels of phytoplankton biomass");
  } else if (chlMean > 0.3) {
    drivers.push("moderate chlorophyll pigments indicating stable biological productivity");
  } else {
    drivers.push("highly depauperate chlorophyll concentrations representing oligotrophic/desert ocean cores");
  }

  if (tsmMean > 0.5) {
    drivers.push("exceptionally heavy particulate loading and abiotic suspended sediment density");
  } else {
    drivers.push("superb water clarity indicating extremely sparse light-scattering mineral solids");
  }

  if (kd490Mean > 0.5) {
    drivers.push("rapid light transmission loss (high attenuation) in the blue-green spectrum");
  } else {
    drivers.push("excellent downwelling solar penetration depths");
  }

  if (parMean < 0.4) {
    drivers.push("restricted incident solar irradiance representing potential light-limited biological settings");
  } else {
    drivers.push("unfettered surface solar energy availability");
  }

  let scientificJustification = `System is locked in the ${regime}. Driven fundamentally by ${drivers.join(" combined with ")}.`;
  
  if (isBoundaryZone) {
    scientificJustification += " High local spatial variance confirms placement in a hydrodynamic front, inducing high patchiness, rapid spatial gradients, and increased ecological mixing.";
  } else {
    scientificJustification += " Consistent low spatial variance suggests placement inside a highly homogeneous regional ocean core with strong self-affinity.";
  }

  if (transitionRisk === "High (State Boundary)") {
    scientificJustification += " IMPORTANT: GMM state entropy exceeds 72%, flagging active critical transition or boundary shearing with high vulnerability to ecological regime tipping points.";
  }

  return {
    regime,
    regimeId,
    probabilities: {
      Coastal: probCoastal,
      Shallow: probShallow,
      Pelagic: probPelagic
    },
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
