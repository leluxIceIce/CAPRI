import { describe, expect, it } from "vitest";
import { generateDataCube, type TelemetryStreamConfig } from "@capri/core";
import { channelDiff, symmetricMax } from "./diff";

const config: TelemetryStreamConfig = {
  mode: "synthetic", speedHz: 1.5, noiseLevel: 0.03, currentAnomaly: 0.4, driftFactor: 0, flowSpeed: 1.2,
};

describe("difference field", () => {
  it("B − A is zero everywhere when A and B are the same frame", () => {
    const cube = generateDataCube(3, config, 20);
    const d = channelDiff(cube, cube, "CHL");
    expect(d).toHaveLength(20);
    expect(d.every((row) => row.every((v) => v === 0))).toBe(true);
    expect(symmetricMax(d)).toBe(0);
  });

  it("captures real per-cell change between two frames", () => {
    const a = generateDataCube(0, config, 20);
    const b = generateDataCube(6, config, 20);
    const d = channelDiff(a, b, "CHL");
    // matches the raw arithmetic exactly
    expect(d[5][9]).toBeCloseTo(b.channels.CHL[5][9] - a.channels.CHL[5][9], 10);
    // a moving scene produces a non-zero symmetric range
    expect(symmetricMax(d)).toBeGreaterThan(0);
  });
});
