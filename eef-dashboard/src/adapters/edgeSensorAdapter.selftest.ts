// Standalone verification for edgeSensorAdapter (no test framework dependency).
// Run with:  npx tsx src/adapters/edgeSensorAdapter.selftest.ts
//
// Exits non-zero on any failed assertion so it can gate CI later. The assertion
// body is exported as runSelfTest() so the Vitest suite (edgeSensorAdapter.test.ts)
// can run the exact same checks — one source of truth, two entry points.

import { edgePacketsToDataCubes } from "./edgeSensorAdapter";
import type { EdgePacket } from "./telemetrySchema";
import { TELEMETRY_PROTOCOL_VERSION } from "./telemetrySchema";

/** Runs every assertion; returns the number of failures (0 = all passed). */
export function runSelfTest(): number {
  let failures = 0;
  function check(name: string, cond: boolean, detail = "") {
    if (cond) {
      console.log(`  ✓ ${name}`);
    } else {
      failures++;
      console.error(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`);
    }
  }

  // 5 fake probes spread across a small AOI, all at the same timestamp.
  const TS = "2026-06-17T12:00:00.000Z";
  const mk = (lat: number, lon: number, turbidity: number, ch4: number): EdgePacket => ({
    v: TELEMETRY_PROTOCOL_VERSION,
    reading: { deviceId: "probe-test", ts: TS, lat, lon, turbidity, temp: 18, ph: 7.8, do: 8, co2: 420, ch4 },
  });

  const packets: EdgePacket[] = [
    mk(54.0, 8.0, 50, 2),   // NW-ish, low turbidity
    mk(54.0, 8.4, 200, 5),  // NE
    mk(53.6, 8.2, 900, 40), // S center, very turbid + high methane (bloom-like)
    mk(53.8, 8.0, 120, 3),  // W
    mk(53.8, 8.4, 300, 8),  // E
  ];

  console.log("EdgeSensorAdapter self-test");
  const cubes = edgePacketsToDataCubes(packets, { gridSize: 20 });

  check("exactly one frame (single timestamp)", cubes.length === 1, `got ${cubes.length}`);
  const cube = cubes[0];

  check("gridSize is 20", cube.gridSize === 20, `got ${cube?.gridSize}`);
  check("timestamp preserved", cube.timestamp === TS, cube?.timestamp);

  // Turbidity channel present and well-formed.
  const turb = cube.channels.INSITU_TURB;
  check("INSITU_TURB channel present", !!turb);
  if (turb) {
    check("turb grid is 20x20", turb.length === 20 && turb.every((r) => r.length === 20));
    let allInRange = true;
    let anyNaN = false;
    for (const row of turb) for (const v of row) {
      if (v < 0 || v > 1) allInRange = false;
      if (Number.isNaN(v)) anyNaN = true;
    }
    check("turb values bounded [0,1]", allInRange);
    check("turb has no NaN", !anyNaN);
  }

  // Methane channel sanity.
  check("INSITU_CH4 channel present", !!cube.channels.INSITU_CH4);

  // Confidence: peaks at a probe location and decays toward an empty corner.
  const conf = cube.confidence;
  check("confidence grid is 20x20", conf.length === 20 && conf.every((r) => r.length === 20));

  // Probe at lat 53.6 (southernmost), lon 8.2 (center). With AOI auto-derived
  // from [53.6,54.0]×[8.0,8.4] + 5% margin, that probe maps near the bottom-center.
  // Confidence there should be ~1; a far corner should be much lower.
  let maxConf = 0, minConf = 1;
  for (const row of conf) for (const v of row) { if (v > maxConf) maxConf = v; if (v < minConf) minConf = v; }
  check("confidence peaks near 1 at a probe", maxConf > 0.95, `max=${maxConf.toFixed(3)}`);
  check("confidence decays below peak away from probes", minConf < maxConf - 0.1, `min=${minConf.toFixed(3)} max=${maxConf.toFixed(3)}`);
  let confNaN = false;
  for (const row of conf) for (const v of row) if (Number.isNaN(v)) confNaN = true;
  check("confidence has no NaN", !confNaN);

  // Incompatible-version packets are rejected.
  const badVersion = edgePacketsToDataCubes([{ v: "9.9.9", reading: packets[0].reading }]);
  check("rejects incompatible protocol version", badVersion.length === 0, `got ${badVersion.length} cubes`);

  // Empty input is safe.
  const empty = edgePacketsToDataCubes([]);
  check("empty input returns no cubes", empty.length === 0);

  return failures;
}

// CLI entry point (npx tsx …) — unchanged behaviour: non-zero exit on failure.
const isMainModule = typeof process !== "undefined" && import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  const failures = runSelfTest();
  if (failures > 0) {
    console.error(`\nFAILED: ${failures} assertion(s)`);
    process.exit(1);
  } else {
    console.log("\nAll assertions passed.");
  }
}
