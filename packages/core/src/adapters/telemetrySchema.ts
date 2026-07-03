// GAIA Edge-Sensor Telemetry Schema (Squad H)
// ─────────────────────────────────────────────────────────────────────────
// Shared wire contract between the ESP32 water-probe firmware
// (hardware/eef_water_probe/eef_water_probe.ino) and the software adapter
// (src/adapters/edgeSensorAdapter.ts).
//
// The firmware emits one `EdgePacket` per sample tick over LoRa → gateway →
// WebSocket. The adapter consumes an array of packets and interpolates the
// sparse (lat, lon) point readings into a grid the dashboard can render.
//
// IMPORTANT: in-situ measurements live in their OWN channel namespace
// (`InSituChannel`) and an `EdgeDataCube` that is structurally parallel to —
// but deliberately separate from — the 14-variable satellite `DataCube`.
// This keeps edge data out of the PCA / spatial / relationship VARS arrays
// (eigenmath.ts, spatialTensor.ts, relationshipTensor.ts) so adding sensors
// can never re-trigger the dimension-mismatch class of bug. Merging in-situ
// channels into the main union is a later, QA-gated step.

import type { VariableStats } from "../types";

// Wire-format protocol version. Bump on any breaking field change; the
// adapter rejects packets whose major version it does not understand.
export const TELEMETRY_PROTOCOL_VERSION = "1.0.0";

// ── In-situ channels ───────────────────────────────────────────────────────
// One per physical sensor on the probe. Raw units are documented here; the
// adapter normalizes each channel to [0,1] before gridding (matching the
// satellite DataCube convention).
export type InSituChannel =
  | "INSITU_TURB" // turbidity            — NTU
  | "INSITU_TEMP" // water temperature    — °C
  | "INSITU_PH"   // pH                   — pH units
  | "INSITU_DO"   // dissolved oxygen     — mg/L
  | "INSITU_CO2"  // atmospheric CO₂      — ppm
  | "INSITU_CH4"; // methane (qualitative)— ppm (MQ-4) or ppb (TDLAS upgrade)

export const INSITU_CHANNELS: InSituChannel[] = [
  "INSITU_TURB",
  "INSITU_TEMP",
  "INSITU_PH",
  "INSITU_DO",
  "INSITU_CO2",
  "INSITU_CH4",
];

// Display metadata for in-situ channels (label/unit/color), parallel to
// VARIABLE_METADATA but isolated to the edge namespace.
export interface InSituChannelMeta {
  channel: InSituChannel;
  label: string;
  unit: string;
  color: string;
  // Plausible physical min/max used for normalization to [0,1]. Chosen from
  // typical coastal-water sensor ranges; override per deployment if needed.
  physicalMin: number;
  physicalMax: number;
}

export const INSITU_METADATA: Record<InSituChannel, InSituChannelMeta> = {
  INSITU_TURB: { channel: "INSITU_TURB", label: "Turbidity (in-situ)", unit: "NTU", color: "#f59e0b", physicalMin: 0, physicalMax: 1000 },
  INSITU_TEMP: { channel: "INSITU_TEMP", label: "Water Temp (in-situ)", unit: "°C", color: "#ef4444", physicalMin: -2, physicalMax: 35 },
  INSITU_PH:   { channel: "INSITU_PH",   label: "pH (in-situ)",         unit: "pH", color: "#a855f7", physicalMin: 6, physicalMax: 9 },
  INSITU_DO:   { channel: "INSITU_DO",   label: "Dissolved O₂ (in-situ)", unit: "mg/L", color: "#22d3ee", physicalMin: 0, physicalMax: 15 },
  INSITU_CO2:  { channel: "INSITU_CO2",  label: "CO₂ (in-situ)",        unit: "ppm", color: "#94a3b8", physicalMin: 350, physicalMax: 2000 },
  INSITU_CH4:  { channel: "INSITU_CH4",  label: "Methane (in-situ)",    unit: "ppm", color: "#dc2626", physicalMin: 0, physicalMax: 100 },
};

// ── Wire packet ──────────────────────────────────────────────────────────
// A single sensor reading from one probe at one instant. Sensor fields are
// optional: a probe may carry a subset of sensors, and a failed read is
// omitted rather than sent as a sentinel.
export interface EdgeReading {
  deviceId: string; // unique probe identifier
  ts: string;       // ISO-8601 UTC timestamp of the sample
  lat: number;      // WGS-84 latitude (decimal degrees)
  lon: number;      // WGS-84 longitude (decimal degrees)

  turbidity?: number; // NTU
  temp?: number;      // °C
  ph?: number;        // pH units
  do?: number;        // mg/L  (dissolved oxygen)
  co2?: number;       // ppm
  ch4?: number;       // ppm (MQ-4) or ppb (TDLAS)

  battery?: number;   // volts — diagnostic, not gridded
  rssi?: number;      // LoRa signal strength dBm — diagnostic, not gridded
}

// The framed packet the firmware actually transmits. `v` lets the adapter
// reject incompatible firmware. A packet carries exactly one reading; the
// gateway batches packets into the array the adapter consumes.
export interface EdgePacket {
  v: string;            // protocol version, e.g. "1.0.0"
  reading: EdgeReading;
}

// Maps an EdgeReading sensor field to its in-situ channel. Used by the
// adapter to iterate sensors generically.
export const READING_FIELD_BY_CHANNEL: Record<InSituChannel, keyof EdgeReading> = {
  INSITU_TURB: "turbidity",
  INSITU_TEMP: "temp",
  INSITU_PH: "ph",
  INSITU_DO: "do",
  INSITU_CO2: "co2",
  INSITU_CH4: "ch4",
};

// ── Area of interest ───────────────────────────────────────────────────────
// Geographic bounding box the readings are gridded into. Row 0 = north
// (maxLat), col 0 = west (minLon), matching image/raster convention.
export interface AOIBounds {
  minLat: number;
  maxLat: number;
  minLon: number;
  maxLon: number;
}

// ── Edge data cube ─────────────────────────────────────────────────────────
// Structurally parallel to DataCube (src/types.ts) but keyed by InSituChannel.
// Deliberately a distinct type so in-situ data never flows into the satellite
// VARS arrays. Can later feed a dedicated calibration/ground-truth overlay.
export interface EdgeDataCube {
  gridSize: number;
  timestamp: string;
  bounds: AOIBounds;
  channels: Partial<Record<InSituChannel, number[][]>>; // only channels with data
  stats: Partial<Record<InSituChannel, VariableStats>>;
  confidence: number[][]; // [0,1] — high near probes, decays with distance
}
