import { describe, expect, it } from "vitest";
import { generateDataCube, type TelemetryStreamConfig } from "@capri/core";
import { cellReadout, pickCell, PROBE_CHANNELS } from "./probe";

const config: TelemetryStreamConfig = {
  mode: "synthetic", speedHz: 1.5, noiseLevel: 0.03, currentAnomaly: 0.2, driftFactor: 0, flowSpeed: 1,
};

describe("pixel probe", () => {
  it("reads a finite dossier for a real cell", () => {
    const cube = generateDataCube(0, config, 20);
    const rows = cellReadout(cube, 7, 12);
    expect(rows).toHaveLength(PROBE_CHANNELS.length);
    for (const r of rows) {
      expect(Number.isFinite(r.value), `${r.name} value`).toBe(true);
      expect(Number.isFinite(r.z), `${r.name} z`).toBe(true);
    }
    // CHL is first and matches the raw grid value
    expect(rows[0].name).toBe("CHL");
    expect(rows[0].value).toBe(cube.channels.CHL[7][12]);
  });

  it("clamps out-of-range indices instead of throwing", () => {
    const cube = generateDataCube(0, config, 20);
    expect(() => cellReadout(cube, -5, 999)).not.toThrow();
    const rows = cellReadout(cube, -5, 999);
    expect(rows[0].value).toBe(cube.channels.CHL[0][19]);
  });

  it("maps normalised click positions to grid cells", () => {
    expect(pickCell(0, 0, 20)).toEqual({ row: 0, col: 0 });
    expect(pickCell(0.999, 0.999, 20)).toEqual({ row: 19, col: 19 });
    expect(pickCell(0.5, 0.5, 20)).toEqual({ row: 10, col: 10 });
    // out of range clamps into the grid
    expect(pickCell(1.5, -0.2, 20)).toEqual({ row: 0, col: 19 });
  });
});
