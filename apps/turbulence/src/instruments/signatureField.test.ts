import { describe, expect, it } from "vitest";
import { generateDataCube, type TelemetryStreamConfig } from "@capri/core";
import { OA_BANDS, FLUOR_BAND_INDEX, cellSpectrum, norm } from "./signatureField";

// M2 smoke test: proves the new app is genuinely wired to @capri/core (the alias
// resolves, a real DataCube is produced) and that the instrument's pure data path
// reads it correctly. The canvas render itself is exercised in the browser.

const config: TelemetryStreamConfig = {
  mode: "synthetic",
  speedHz: 1.5,
  noiseLevel: 0.03,
  currentAnomaly: 0.2,
  driftFactor: 0,
  flowSpeed: 1,
};

describe("Signature Field ↔ @capri/core wiring", () => {
  it("generates a complete 20×20 DataCube from the shared engine", () => {
    const cube = generateDataCube(0, config, 20);
    expect(cube.gridSize).toBe(20);
    expect(cube.channels.CHL).toHaveLength(20);
    expect(cube.channels.CHL[0]).toHaveLength(20);
    // every OLCI band the spectrum needs is present
    for (const b of OA_BANDS) {
      expect(cube.channels[b.key], `channel ${b.key}`).toBeTruthy();
    }
  });

  it("reads a 12-band OLCI spectrum in wavelength order, all finite", () => {
    const cube = generateDataCube(1, config, 20);
    const spec = cellSpectrum(cube, 7, 12);
    expect(spec).toHaveLength(12);
    expect(spec.every((v) => Number.isFinite(v))).toBe(true);
    // wavelengths strictly increasing 400 → 761 nm
    for (let i = 1; i < OA_BANDS.length; i++) {
      expect(OA_BANDS[i].wl).toBeGreaterThan(OA_BANDS[i - 1].wl);
    }
    // the flagged fluorescence band is OA10 / 681 nm
    expect(OA_BANDS[FLUOR_BAND_INDEX].key).toBe("OA10");
    expect(OA_BANDS[FLUOR_BAND_INDEX].wl).toBe(681);
  });

  it("normalises safely — flat fields map to 0, not NaN", () => {
    expect(norm(5, 5, 5)).toBe(0);
    expect(norm(0.5, 0, 1)).toBe(0.5);
    expect(norm(-3, 0, 1)).toBe(0);
    expect(norm(9, 0, 1)).toBe(1);
  });
});
