// GAIA Edge-Sensor Adapter (Squad H)
// ─────────────────────────────────────────────────────────────────────────
// Converts sparse in-situ probe readings (EdgePacket[]) into a gridded
// EdgeDataCube that the dashboard can render alongside satellite data.
//
// Probes are sparse: a handful of (lat, lon) points per timestamp, NOT a full
// field. We fill each grid cell by Inverse-Distance-Weighting (IDW) the
// nearby readings, and we emit an honest `confidence` channel that is high
// near real probes and decays with distance — so the viewport's existing
// confidence overlay visually distinguishes "measured" from "extrapolated".
//
// Output is intentionally an EdgeDataCube (InSituChannel namespace), NOT a
// satellite DataCube, so this data never enters the 14-variable ML arrays.

import type { VariableStats } from "../types";
import {
  type AOIBounds,
  type EdgeDataCube,
  type EdgePacket,
  type EdgeReading,
  type InSituChannel,
  INSITU_CHANNELS,
  INSITU_METADATA,
  READING_FIELD_BY_CHANNEL,
  TELEMETRY_PROTOCOL_VERSION,
} from "./telemetrySchema";

export interface EdgeAdapterOptions {
  gridSize?: number;       // default 20 (matches satellite DataCube)
  idwPower?: number;       // IDW distance exponent, default 2
  // Confidence decay length as a FRACTION of the AOI diagonal. Larger =
  // confidence reaches further from each probe. Default 0.12.
  confidenceSigmaFrac?: number;
  // If provided, fixes the AOI. Otherwise it is derived from the readings'
  // bounding box (with a small margin) so a deployment auto-frames itself.
  bounds?: AOIBounds;
}

interface NormalizedPoint {
  row: number; // fractional grid row (0 = north edge)
  col: number; // fractional grid col (0 = west edge)
  value: number; // normalized [0,1]
}

const DEFAULTS = {
  gridSize: 20,
  idwPower: 2,
  confidenceSigmaFrac: 0.12,
};

// Normalize a raw sensor value into [0,1] using the channel's physical range.
function normalizeChannelValue(channel: InSituChannel, raw: number): number {
  const { physicalMin, physicalMax } = INSITU_METADATA[channel];
  const span = physicalMax - physicalMin;
  if (span <= 0) return 0;
  const t = (raw - physicalMin) / span;
  return t < 0 ? 0 : t > 1 ? 1 : t;
}

// Derive an AOI bounding box from the readings, padded by `margin` of the
// span on each side so probes never sit exactly on the grid edge. Falls back
// to a tiny box around a single point.
function deriveBounds(readings: EdgeReading[], margin = 0.05): AOIBounds {
  let minLat = Infinity, maxLat = -Infinity, minLon = Infinity, maxLon = -Infinity;
  for (const r of readings) {
    if (r.lat < minLat) minLat = r.lat;
    if (r.lat > maxLat) maxLat = r.lat;
    if (r.lon < minLon) minLon = r.lon;
    if (r.lon > maxLon) maxLon = r.lon;
  }
  if (!isFinite(minLat)) {
    // No readings — return a neutral 1°×1° box centered on the equator.
    return { minLat: -0.5, maxLat: 0.5, minLon: -0.5, maxLon: 0.5 };
  }
  let latSpan = maxLat - minLat;
  let lonSpan = maxLon - minLon;
  // Guard degenerate (single point or colinear) AOIs.
  if (latSpan < 1e-6) { minLat -= 0.05; maxLat += 0.05; latSpan = maxLat - minLat; }
  if (lonSpan < 1e-6) { minLon -= 0.05; maxLon += 0.05; lonSpan = maxLon - minLon; }
  return {
    minLat: minLat - latSpan * margin,
    maxLat: maxLat + latSpan * margin,
    minLon: minLon - lonSpan * margin,
    maxLon: maxLon + lonSpan * margin,
  };
}

// Map a (lat, lon) into fractional grid coordinates. Row 0 = north (maxLat).
function toGridCoords(lat: number, lon: number, bounds: AOIBounds, gridSize: number): { row: number; col: number } {
  const latFrac = (bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat); // 0 at north
  const lonFrac = (lon - bounds.minLon) / (bounds.maxLon - bounds.minLon); // 0 at west
  return {
    row: latFrac * (gridSize - 1),
    col: lonFrac * (gridSize - 1),
  };
}

function makeBlankGrid(gridSize: number, fill = 0): number[][] {
  const grid: number[][] = [];
  for (let r = 0; r < gridSize; r++) grid.push(new Array(gridSize).fill(fill));
  return grid;
}

function computeStats(grid: number[][], gridSize: number): VariableStats {
  let min = Infinity, max = -Infinity, sum = 0;
  const n = gridSize * gridSize;
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const v = grid[r][c];
      if (v < min) min = v;
      if (v > max) max = v;
      sum += v;
    }
  }
  const mean = sum / n;
  let varAcc = 0;
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const d = grid[r][c] - mean;
      varAcc += d * d;
    }
  }
  return { min, max, mean, std: Math.sqrt(varAcc / n) };
}

// IDW-interpolate one channel's points into a gridSize×gridSize grid.
function idwGrid(points: NormalizedPoint[], gridSize: number, power: number): number[][] {
  const grid = makeBlankGrid(gridSize);
  if (points.length === 0) return grid;
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      let wSum = 0;
      let vSum = 0;
      let exact = -1;
      for (let p = 0; p < points.length; p++) {
        const dr = r - points[p].row;
        const dc = c - points[p].col;
        const d2 = dr * dr + dc * dc;
        if (d2 < 1e-9) { exact = p; break; } // cell sits on a probe
        const w = 1 / Math.pow(d2, power / 2);
        wSum += w;
        vSum += w * points[p].value;
      }
      grid[r][c] = exact >= 0 ? points[exact].value : (wSum > 0 ? vSum / wSum : 0);
    }
  }
  return grid;
}

// Confidence = max over probes of exp(-d² / σ²), where d is grid-cell distance
// to a probe and σ scales with the AOI. Peaks at 1.0 on a probe, decays out.
function confidenceGrid(probeCoords: { row: number; col: number }[], gridSize: number, sigmaCells: number): number[][] {
  const grid = makeBlankGrid(gridSize);
  if (probeCoords.length === 0 || sigmaCells <= 0) return grid;
  const inv2Sig2 = 1 / (2 * sigmaCells * sigmaCells);
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      let best = 0;
      for (const p of probeCoords) {
        const dr = r - p.row;
        const dc = c - p.col;
        const conf = Math.exp(-(dr * dr + dc * dc) * inv2Sig2);
        if (conf > best) best = conf;
      }
      grid[r][c] = best;
    }
  }
  return grid;
}

// Group readings into time frames keyed by their ISO timestamp, preserving
// first-seen order so playback is chronological-as-received.
function groupByTimestamp(readings: EdgeReading[]): Map<string, EdgeReading[]> {
  const frames = new Map<string, EdgeReading[]>();
  for (const r of readings) {
    const arr = frames.get(r.ts);
    if (arr) arr.push(r);
    else frames.set(r.ts, [r]);
  }
  return frames;
}

/**
 * Convert a batch of edge telemetry packets into one EdgeDataCube per distinct
 * timestamp. Packets with an incompatible protocol major version are skipped.
 */
export function edgePacketsToDataCubes(packets: EdgePacket[], options: EdgeAdapterOptions = {}): EdgeDataCube[] {
  const gridSize = options.gridSize ?? DEFAULTS.gridSize;
  const power = options.idwPower ?? DEFAULTS.idwPower;
  const sigmaFrac = options.confidenceSigmaFrac ?? DEFAULTS.confidenceSigmaFrac;

  const expectedMajor = TELEMETRY_PROTOCOL_VERSION.split(".")[0];
  const readings: EdgeReading[] = [];
  for (const pkt of packets) {
    const major = (pkt.v ?? "").split(".")[0];
    if (major !== expectedMajor) continue; // reject incompatible firmware
    readings.push(pkt.reading);
  }

  const bounds = options.bounds ?? deriveBounds(readings);
  // σ in grid cells: a fraction of the grid diagonal.
  const diagCells = Math.SQRT2 * (gridSize - 1);
  const sigmaCells = Math.max(0.5, sigmaFrac * diagCells);

  const frames = groupByTimestamp(readings);
  const cubes: EdgeDataCube[] = [];

  for (const [ts, frameReadings] of frames) {
    const channels: Partial<Record<InSituChannel, number[][]>> = {};
    const stats: Partial<Record<InSituChannel, VariableStats>> = {};

    // Probe coordinates for the confidence field (any reading in this frame).
    const probeCoords = frameReadings.map((r) => toGridCoords(r.lat, r.lon, bounds, gridSize));

    for (const channel of INSITU_CHANNELS) {
      const field = READING_FIELD_BY_CHANNEL[channel];
      const points: NormalizedPoint[] = [];
      for (const r of frameReadings) {
        const raw = r[field];
        if (typeof raw !== "number" || Number.isNaN(raw)) continue; // sensor absent / failed read
        const { row, col } = toGridCoords(r.lat, r.lon, bounds, gridSize);
        points.push({ row, col, value: normalizeChannelValue(channel, raw) });
      }
      if (points.length === 0) continue; // no data for this channel this frame
      const grid = idwGrid(points, gridSize, power);
      channels[channel] = grid;
      stats[channel] = computeStats(grid, gridSize);
    }

    cubes.push({
      gridSize,
      timestamp: ts,
      bounds,
      channels,
      stats,
      confidence: confidenceGrid(probeCoords, gridSize, sigmaCells),
    });
  }

  return cubes;
}
