// GAIA Bloom Detector (Squad F, F1)
// ─────────────────────────────────────────────────────────────────────────
// Turns the satellite DataCube into a single human-actionable signal: where
// is the water dangerous to fish, is it getting worse, and why.
//
// The five HAB-signature channels (already in the pipeline):
//   CHL              — algal biomass (primary bloom indicator)
//   FLH              — active living phytoplankton (bloom is growing, not decaying)
//   CHL_disagreement — signed; positive = OC4ME overestimates = Case-2 turbid = unreliable = treat as risk
//   aphy             — phytoplankton absorption (biological vs mineral turbidity)
//   TSM              — suspended matter (decaying-bloom / hypoxia tail)
//
// All channels except CHL_disagreement are normalized [0,1]. CHL_disagreement
// is signed; only its POSITIVE half feeds risk (turbid-water flag).

import type { DataCube, VariableName } from "../types";

// Positive-disagreement scale: signed CHL_disagreement is divided by this and
// clamped to [0,1] to extract the "turbid/unreliable" fraction.
const DIS_SCALE = 2.0;

// Risk weights (sum = 1.0). Tuned to OLCI bloom literature emphasis: biomass
// and active fluorescence dominate; turbidity flags modulate.
export const RISK_WEIGHTS: Record<"chl" | "flh" | "dis" | "aphy" | "tsm", number> = {
  chl: 0.35,
  flh: 0.25,
  dis: 0.20,
  aphy: 0.15,
  tsm: 0.05,
};

export interface ZoneThresholds {
  amber: number; // risk ≥ amber → caution
  red: number;   // risk ≥ red   → stay away
}

export const DEFAULT_THRESHOLDS: ZoneThresholds = { amber: 0.33, red: 0.66 };

export enum ZoneClass {
  Green = 0,
  Amber = 1,
  Red = 2,
}

const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Positive turbidity-bias fraction [0,1] from signed CHL_disagreement. */
function positiveBias(dis: number): number {
  return clamp01(dis / DIS_SCALE);
}

/**
 * Per-cell bloom risk in [0,1]. Returns a flat Float32Array (row-major,
 * length gridSize²). High = dangerous.
 */
export function computeBloomRisk(cube: DataCube): Float32Array {
  const { gridSize } = cube;
  const out = new Float32Array(gridSize * gridSize);
  const chl = cube.channels.CHL;
  const flh = cube.channels.FLH;
  const dis = cube.channels.CHL_disagreement;
  const aphy = cube.channels.aphy;
  const tsm = cube.channels.TSM;

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const risk =
        RISK_WEIGHTS.chl * clamp01(chl[r][c]) +
        RISK_WEIGHTS.flh * clamp01(flh[r][c]) +
        RISK_WEIGHTS.dis * positiveBias(dis[r][c]) +
        RISK_WEIGHTS.aphy * clamp01(aphy[r][c]) +
        RISK_WEIGHTS.tsm * clamp01(tsm[r][c]);
      out[r * gridSize + c] = clamp01(risk);
    }
  }
  return out;
}

export interface ZoneSummary {
  zones: Uint8Array;       // per-cell ZoneClass
  green: number;
  amber: number;
  red: number;
  total: number;
  unsafeFraction: number;  // (amber + red) / total
  dangerFraction: number;  // red / total
}

/** Classify a risk field into green/amber/red zones with counts. */
export function classifyZones(risk: Float32Array, thresholds: ZoneThresholds = DEFAULT_THRESHOLDS): ZoneSummary {
  const zones = new Uint8Array(risk.length);
  let green = 0, amber = 0, red = 0;
  for (let i = 0; i < risk.length; i++) {
    const v = risk[i];
    if (v >= thresholds.red) { zones[i] = ZoneClass.Red; red++; }
    else if (v >= thresholds.amber) { zones[i] = ZoneClass.Amber; amber++; }
    else { zones[i] = ZoneClass.Green; green++; }
  }
  const total = risk.length || 1;
  return {
    zones, green, amber, red, total,
    unsafeFraction: (amber + red) / total,
    dangerFraction: red / total,
  };
}

export type TrendDirection = "growing" | "retreating" | "stable";

export interface BloomTrend {
  delta: number;          // mean(curr) - mean(prev)
  direction: TrendDirection;
}

/**
 * Compare two risk fields frame-to-frame. `eps` is the dead-band below which
 * change is reported as stable.
 */
export function computeBloomTrend(prev: Float32Array | null, curr: Float32Array, eps = 0.05): BloomTrend {
  if (!prev || prev.length !== curr.length) return { delta: 0, direction: "stable" };
  let ps = 0, cs = 0;
  for (let i = 0; i < curr.length; i++) { ps += prev[i]; cs += curr[i]; }
  const delta = cs / curr.length - ps / prev.length;
  const direction: TrendDirection = delta > eps ? "growing" : delta < -eps ? "retreating" : "stable";
  return { delta, direction };
}

// Maps the risk weight keys to the VariableName a fisherman would recognize.
const DRIVER_LABEL: Record<keyof typeof RISK_WEIGHTS, VariableName> = {
  chl: "CHL",
  flh: "FLH",
  dis: "CHL_disagreement",
  aphy: "aphy",
  tsm: "TSM",
};

/**
 * Which channel contributes most to risk in the high-risk cells — the "why".
 * Averages each weighted term over cells at/above the amber threshold.
 */
export function topRiskDriver(cube: DataCube, risk: Float32Array, thresholds: ZoneThresholds = DEFAULT_THRESHOLDS): VariableName {
  const { gridSize } = cube;
  const chl = cube.channels.CHL, flh = cube.channels.FLH, dis = cube.channels.CHL_disagreement,
    aphy = cube.channels.aphy, tsm = cube.channels.TSM;
  const acc: Record<keyof typeof RISK_WEIGHTS, number> = { chl: 0, flh: 0, dis: 0, aphy: 0, tsm: 0 };
  let count = 0;
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (risk[r * gridSize + c] < thresholds.amber) continue;
      acc.chl += RISK_WEIGHTS.chl * clamp01(chl[r][c]);
      acc.flh += RISK_WEIGHTS.flh * clamp01(flh[r][c]);
      acc.dis += RISK_WEIGHTS.dis * positiveBias(dis[r][c]);
      acc.aphy += RISK_WEIGHTS.aphy * clamp01(aphy[r][c]);
      acc.tsm += RISK_WEIGHTS.tsm * clamp01(tsm[r][c]);
      count++;
    }
  }
  // If nothing is unsafe, fall back to the globally dominant weighted channel.
  const keys = Object.keys(acc) as (keyof typeof RISK_WEIGHTS)[];
  let best = keys[0];
  for (const k of keys) if (acc[k] > acc[best]) best = k;
  void count;
  return DRIVER_LABEL[best];
}

export interface BloomHotspot {
  row: number;       // centroid grid row (fractional, 0..gridSize-1)
  col: number;       // centroid grid col (fractional, 0..gridSize-1)
  cellCount: number;
  meanRisk: number;
  peakRisk: number;
  // Real-world WGS-84 centroid. Only populated when the source cube actually
  // carries geo-referenced coords (e.g. a geo-tagged CSV upload) — never
  // fabricated for synthetic/ungeoreferenced data.
  lat: number | null;
  lon: number | null;
}

/**
 * Flood-fills 4-connected Red-zone cells into contiguous hotspot blobs and
 * returns one centroid per blob, sorted by mean risk descending. This turns
 * the per-cell risk field into a small, actionable list of "go here" /
 * "avoid here" coordinates instead of a raw heatmap.
 */
export function findHotspots(cube: DataCube, risk: Float32Array, zones: Uint8Array, minCells = 1): BloomHotspot[] {
  const { gridSize } = cube;
  const visited = new Uint8Array(zones.length);
  const hotspots: BloomHotspot[] = [];

  for (let start = 0; start < zones.length; start++) {
    if (zones[start] !== ZoneClass.Red || visited[start]) continue;

    const stack = [start];
    visited[start] = 1;
    const cells: number[] = [];

    while (stack.length) {
      const idx = stack.pop()!;
      cells.push(idx);
      const r = Math.floor(idx / gridSize);
      const c = idx % gridSize;
      const neighbors = [
        r > 0 ? idx - gridSize : -1,
        r < gridSize - 1 ? idx + gridSize : -1,
        c > 0 ? idx - 1 : -1,
        c < gridSize - 1 ? idx + 1 : -1,
      ];
      for (const n of neighbors) {
        if (n >= 0 && zones[n] === ZoneClass.Red && !visited[n]) {
          visited[n] = 1;
          stack.push(n);
        }
      }
    }

    if (cells.length < minCells) continue;

    let rowSum = 0, colSum = 0, riskSum = 0, peakRisk = 0;
    let latSum = 0, lonSum = 0, geoCount = 0;
    for (const idx of cells) {
      const r = Math.floor(idx / gridSize);
      const c = idx % gridSize;
      rowSum += r;
      colSum += c;
      riskSum += risk[idx];
      if (risk[idx] > peakRisk) peakRisk = risk[idx];
      if (cube.coords) {
        const coord = cube.coords[r][c];
        latSum += coord.lat;
        lonSum += coord.lon;
        geoCount++;
      }
    }

    hotspots.push({
      row: rowSum / cells.length,
      col: colSum / cells.length,
      cellCount: cells.length,
      meanRisk: riskSum / cells.length,
      peakRisk,
      lat: geoCount > 0 ? latSum / geoCount : null,
      lon: geoCount > 0 ? lonSum / geoCount : null,
    });
  }

  return hotspots.sort((a, b) => b.meanRisk - a.meanRisk);
}

export type AlertLevel = "GREEN" | "AMBER" | "RED";

export interface FishermanSummary {
  level: AlertLevel;
  unsafePercent: number;   // 0–100, rounded
  direction: TrendDirection;
  driver: VariableName;
}

/** One-call summary for the Fisherman Summary Card. */
export function summarize(
  cube: DataCube,
  prevRisk: Float32Array | null,
  thresholds: ZoneThresholds = DEFAULT_THRESHOLDS
): { risk: Float32Array; zones: ZoneSummary; trend: BloomTrend; summary: FishermanSummary } {
  const risk = computeBloomRisk(cube);
  const zones = classifyZones(risk, thresholds);
  const trend = computeBloomTrend(prevRisk, risk);
  const driver = topRiskDriver(cube, risk, thresholds);

  const level: AlertLevel =
    zones.dangerFraction >= 0.15 ? "RED" : zones.unsafeFraction >= 0.25 ? "AMBER" : "GREEN";

  return {
    risk,
    zones,
    trend,
    summary: {
      level,
      unsafePercent: Math.round(zones.unsafeFraction * 100),
      direction: trend.direction,
      driver,
    },
  };
}
