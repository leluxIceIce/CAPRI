// Standalone verification for Squad S (adapters) + Squad F (bloom detector).
// Run with:  npx tsx src/adapters/squadSF.selftest.ts
//
// The assertion body is exported as runSelfTest() so the Vitest suite
// (squadSF.test.ts) can run the exact same checks — one source of truth,
// two entry points.

import type { DataCube, VariableName, VariableStats } from "../types";
import { isWellFormedCube, normalizeGrid, gridStats, makeGrid } from "./adapter";
import { rasterToDataCube, type DecodedRaster } from "./geotiffAdapter";
import {
  computeBloomRisk,
  classifyZones,
  computeBloomTrend,
  summarize,
  DEFAULT_THRESHOLDS,
} from "../utils/bloomDetector";

const ALL_VARS: VariableName[] = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490", "FLH", "CHL_disagreement", "OA01", "OA02", "OA03", "OA04", "OA05", "OA06", "OA07", "OA08", "OA09", "OA10", "OA11", "OA13"];

// Build a synthetic DataCube where one corner is a hot bloom and the rest calm.
function makeTestCube(gridSize: number, hot: boolean): DataCube {
  const channels = {} as Record<VariableName, number[][]>;
  const stats = {} as Record<VariableName, VariableStats>;
  for (const v of ALL_VARS) {
    const grid = makeGrid(gridSize, 0.1);
    if (hot && (v === "CHL" || v === "FLH" || v === "aphy" || v === "TSM")) {
      // High values in the top-left quadrant.
      for (let r = 0; r < gridSize / 2; r++) for (let c = 0; c < gridSize / 2; c++) grid[r][c] = 0.95;
    }
    if (v === "CHL_disagreement") {
      // Signed: positive (turbid) in the same quadrant if hot.
      for (let r = 0; r < gridSize; r++) for (let c = 0; c < gridSize; c++) {
        grid[r][c] = hot && r < gridSize / 2 && c < gridSize / 2 ? 1.5 : -0.2;
      }
    }
    channels[v] = grid;
    stats[v] = gridStats(grid);
  }
  return { gridSize, timestamp: "2026-06-17T12:00:00.000Z", channels, stats, confidence: makeGrid(gridSize, 1) };
}

/** Runs every assertion; returns the number of failures (0 = all passed). */
export function runSelfTest(): number {
  let failures = 0;
  function check(name: string, cond: boolean, detail = "") {
    if (cond) console.log(`  ✓ ${name}`);
    else { failures++; console.error(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`); }
  }

  console.log("Squad S — adapter helpers");
  {
    const g = [[0, 0], [0, 0]];
    normalizeGrid(g);
    check("constant grid normalizes to all-zero (not 0.5)", g.every((row) => row.every((v) => v === 0)));

    const g2 = [[0, 10], [5, 0]];
    normalizeGrid(g2);
    check("normalizeGrid maps to [0,1]", g2[0][1] === 1 && g2[0][0] === 0 && g2[1][0] === 0.5);
  }

  console.log("Squad S — GeoTIFF adapter (raster → DataCube)");
  {
    // 4×4 raster, 2 bands. Band0 → CHL, Band1 → TSM. Resample to 20×20.
    const width = 4, height = 4;
    const band0 = [
      0, 0, 1, 1,
      0, 0, 1, 1,
      2, 2, 3, 3,
      2, 2, 3, 3,
    ];
    const band1 = band0.map((v) => 3 - v); // inverse gradient
    const raster: DecodedRaster = { width, height, bands: [band0, band1] };
    const cube = rasterToDataCube({ raster, bandMap: { 0: "CHL", 1: "TSM" }, gridSize: 20 });

    check("geotiff cube is 20×20", cube.gridSize === 20 && cube.channels.CHL.length === 20 && cube.channels.CHL[0].length === 20);
    check("geotiff CHL normalized [0,1]", cube.channels.CHL.every((row) => row.every((v) => v >= 0 && v <= 1)));
    check("geotiff CHL has corner gradient (top-left < bottom-right)", cube.channels.CHL[0][0] < cube.channels.CHL[19][19]);
    check("geotiff TSM inverse of CHL (top-left > bottom-right)", cube.channels.TSM[0][0] > cube.channels.TSM[19][19]);
    let anyNaN = false;
    for (const row of cube.channels.CHL) for (const v of row) if (Number.isNaN(v)) anyNaN = true;
    check("geotiff CHL no NaN", !anyNaN);

    // noData handling: a raster of all-noData should yield a zero grid, no NaN.
    const ndRaster: DecodedRaster = { width: 2, height: 2, bands: [[-9999, -9999, -9999, -9999]], noData: -9999 };
    const ndCube = rasterToDataCube({ raster: ndRaster, bandMap: { 0: "CHL" }, gridSize: 20 });
    let ndOk = true;
    for (const row of ndCube.channels.CHL) for (const v of row) if (!Number.isFinite(v)) ndOk = false;
    check("geotiff noData raster → finite zero grid", ndOk && ndCube.channels.CHL[0][0] === 0);
  }

  console.log("Squad F — bloom detector");
  {
    const calm = makeTestCube(20, false);
    const hot = makeTestCube(20, true);

    const calmRisk = computeBloomRisk(calm);
    const hotRisk = computeBloomRisk(hot);

    check("risk field length = gridSize²", hotRisk.length === 400);
    let bounded = true;
    for (const v of hotRisk) if (v < 0 || v > 1) bounded = false;
    check("risk bounded [0,1]", bounded);

    const calmMean = calmRisk.reduce((a, b) => a + b, 0) / calmRisk.length;
    const hotMean = hotRisk.reduce((a, b) => a + b, 0) / hotRisk.length;
    check("hot cube riskier than calm", hotMean > calmMean, `hot=${hotMean.toFixed(3)} calm=${calmMean.toFixed(3)}`);

    const hotZones = classifyZones(hotRisk, DEFAULT_THRESHOLDS);
    check("hot cube has red zones", hotZones.red > 0, `red=${hotZones.red}`);
    const calmZones = classifyZones(calmRisk, DEFAULT_THRESHOLDS);
    check("calm cube is all green", calmZones.red === 0 && calmZones.amber === 0);

    const trendUp = computeBloomTrend(calmRisk, hotRisk);
    check("trend calm→hot is growing", trendUp.direction === "growing", `delta=${trendUp.delta.toFixed(3)}`);
    const trendDown = computeBloomTrend(hotRisk, calmRisk);
    check("trend hot→calm is retreating", trendDown.direction === "retreating");
    const trendNull = computeBloomTrend(null, hotRisk);
    check("trend with no prev is stable", trendNull.direction === "stable");

    const s = summarize(hot, calmRisk);
    check("summary level RED for hot growing cube", s.summary.level === "RED", s.summary.level);
    check("summary unsafePercent > 0", s.summary.unsafePercent > 0, `${s.summary.unsafePercent}%`);
    check("summary driver is a known variable", ALL_VARS.includes(s.summary.driver), s.summary.driver);

    const sCalm = summarize(calm, null);
    check("summary level GREEN for calm cube", sCalm.summary.level === "GREEN", sCalm.summary.level);

    // Well-formedness guard recognizes the cube as valid.
    check("isWellFormedCube accepts a valid cube", isWellFormedCube(calm));
  }

  return failures;
}

// CLI entry point (npx tsx …) — unchanged behaviour: non-zero exit on failure.
const isMainModule = typeof process !== "undefined" && import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  const failures = runSelfTest();
  if (failures > 0) { console.error(`\nFAILED: ${failures} assertion(s)`); process.exit(1); }
  else console.log("\nAll assertions passed.");
}
