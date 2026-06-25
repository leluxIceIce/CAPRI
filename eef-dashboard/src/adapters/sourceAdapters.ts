// GAIA Source Adapters — synthetic + CSV (Squad S, S2)
// ─────────────────────────────────────────────────────────────────────────
// Thin wrappers exposing the EXISTING data paths behind the SourceAdapter
// interface. The originals (generateDataCube, parseCSVToCubes) are unchanged
// and still imported directly elsewhere — these adapters add a uniform entry
// point so synthetic, CSV, GeoTIFF, etc. can be selected/composed the same way.

import type { DataCube, TelemetryStreamConfig } from "../types";
import { generateDataCube, parseCSVToCubes } from "../telemetryGenerator";
import type { SourceAdapter } from "./adapter";

// ── Synthetic ──────────────────────────────────────────────────────────────
export interface SyntheticInput {
  stepSeconds: number;
  config: TelemetryStreamConfig;
  gridSize?: number;
}

export const syntheticAdapter: SourceAdapter<SyntheticInput> = {
  id: "synthetic",
  label: "Synthetic generator",
  async ingest({ stepSeconds, config, gridSize = 20 }: SyntheticInput): Promise<DataCube[]> {
    return [generateDataCube(stepSeconds, config, gridSize)];
  },
};

// ── CSV upload ───────────────────────────────────────────────────────────
export interface CsvInput {
  csvText: string;
  gridSize?: number;
}

export const csvAdapter: SourceAdapter<CsvInput> = {
  id: "csv",
  label: "CSV upload",
  async ingest({ csvText, gridSize = 20 }: CsvInput): Promise<DataCube[]> {
    return parseCSVToCubes(csvText, gridSize);
  },
};
