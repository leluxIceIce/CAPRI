// GAIA GeoTIFF Adapter (Squad S, S3)
// ─────────────────────────────────────────────────────────────────────────
// Converts a decoded multi-band raster (e.g. a Copernicus/Earthdata Sentinel
// GeoTIFF tile) into the dashboard's DataCube. Real satellite tiles are large
// (hundreds–thousands of px per side); this adapter BILINEAR-resamples each
// band down to the dashboard grid (default 20×20) and normalizes to [0,1].
//
// Decoding is deliberately separated from gridding: this module operates on a
// `DecodedRaster` (plain pixel bands), so it is dependency-free and fully
// unit-testable. The actual file decode is an I/O step performed by the caller
// — in the browser via geotiff.js (`fromArrayBuffer(buf).getImage().readRasters()`),
// or by the Squad D Node preprocessing script. Both produce a DecodedRaster.

import type { DataCube, VariableName } from "../types";
import { gridStats, makeGrid, normalizeGrid, type SourceAdapter } from "./adapter";

/** A decoded raster: each band is a row-major flat array of width*height. */
export interface DecodedRaster {
  width: number;
  height: number;
  bands: ArrayLike<number>[]; // bands[b][y*width + x]
  /** Optional value to treat as "no data" (e.g. fill/NaN sentinel); excluded from sampling. */
  noData?: number;
}

export interface GeoTiffInput {
  raster: DecodedRaster;
  /** Maps a raster band index → the DataCube VariableName it populates. */
  bandMap: Record<number, VariableName>;
  gridSize?: number;
  timestamp?: string;
}

// Sample a band at fractional pixel (fx, fy) with bilinear interpolation,
// skipping noData neighbors. Returns NaN only if all 4 corners are noData.
function bilinearSample(band: ArrayLike<number>, width: number, height: number, fx: number, fy: number, noData?: number): number {
  const x0 = Math.floor(fx), y0 = Math.floor(fy);
  const x1 = Math.min(width - 1, x0 + 1), y1 = Math.min(height - 1, y0 + 1);
  const dx = fx - x0, dy = fy - y0;

  const at = (x: number, y: number): { v: number; ok: boolean } => {
    const v = band[y * width + x] as number;
    const ok = Number.isFinite(v) && (noData === undefined || v !== noData);
    return { v, ok };
  };
  const c00 = at(x0, y0), c10 = at(x1, y0), c01 = at(x0, y1), c11 = at(x1, y1);

  // Weighted average over valid corners (handles noData gracefully).
  let wSum = 0, vSum = 0;
  const add = (c: { v: number; ok: boolean }, w: number) => { if (c.ok) { wSum += w; vSum += w * c.v; } };
  add(c00, (1 - dx) * (1 - dy));
  add(c10, dx * (1 - dy));
  add(c01, (1 - dx) * dy);
  add(c11, dx * dy);
  return wSum > 0 ? vSum / wSum : NaN;
}

/** Resample one raster band into a gridSize×gridSize, normalized [0,1] grid. */
function bandToGrid(band: ArrayLike<number>, width: number, height: number, gridSize: number, noData?: number): number[][] {
  const grid = makeGrid(gridSize);
  // Map grid cell centers across the full raster extent.
  for (let r = 0; r < gridSize; r++) {
    const fy = ((r + 0.5) / gridSize) * height - 0.5;
    const cy = Math.max(0, Math.min(height - 1, fy));
    for (let c = 0; c < gridSize; c++) {
      const fx = ((c + 0.5) / gridSize) * width - 0.5;
      const cx = Math.max(0, Math.min(width - 1, fx));
      const v = bilinearSample(band, width, height, cx, cy, noData);
      grid[r][c] = Number.isFinite(v) ? v : 0;
    }
  }
  return normalizeGrid(grid);
}

/**
 * Core (dependency-free, testable): decoded raster → DataCube.
 * Only the bands named in `bandMap` are populated; other VariableName channels
 * are left as zero grids so the cube is structurally complete.
 */
export function rasterToDataCube(input: GeoTiffInput): DataCube {
  const { raster, bandMap, gridSize = 20, timestamp } = input;
  const { width, height, bands, noData } = raster;

  const channels = {} as Record<VariableName, number[][]>;
  const stats = {} as Record<VariableName, import("../types").VariableStats>;

  // Populate mapped bands.
  const mapped = new Set<VariableName>();
  for (const [bandIdxStr, varName] of Object.entries(bandMap)) {
    const b = Number(bandIdxStr);
    if (b < 0 || b >= bands.length) continue;
    channels[varName] = bandToGrid(bands[b], width, height, gridSize, noData);
    stats[varName] = gridStats(channels[varName]);
    mapped.add(varName);
  }

  return {
    gridSize,
    timestamp: timestamp ?? new Date().toISOString(),
    channels,
    stats,
    confidence: makeGrid(gridSize, 1.0),
  };
}

export const geotiffAdapter: SourceAdapter<GeoTiffInput> = {
  id: "geotiff",
  label: "GeoTIFF satellite tile",
  async ingest(input: GeoTiffInput): Promise<DataCube[]> {
    return [rasterToDataCube(input)];
  },
};
