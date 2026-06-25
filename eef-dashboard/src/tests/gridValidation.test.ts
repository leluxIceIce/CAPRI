import { generateDataCube, parseCSVToCubes } from "../telemetryGenerator";
import { TelemetryStreamConfig, VariableName } from "../types";

// Simple assertion helpers
function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function assertEqual(actual: any, expected: any, message: string): void {
  if (actual !== expected) {
    throw new Error(`Assertion failed: ${message} (expected ${expected}, got ${actual})`);
  }
}

// Helper function to check if all values in a 2D array are finite (not NaN or Infinity)
function allValuesFinite(grid: number[][]): boolean {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (!isFinite(grid[r][c])) {
        return false;
      }
    }
  }
  return true;
}

// Helper to count total cells in a cube
function countTotalCells(cube: any): number {
  if (!cube.channels || !cube.channels.CHL) return 0;
  const grid = cube.channels.CHL;
  let count = 0;
  for (let r = 0; r < grid.length; r++) {
    count += grid[r].length;
  }
  return count;
}

// Base config for testing
const baseConfig: TelemetryStreamConfig = {
  mode: "preset_coastal",
  speedHz: 1,
  noiseLevel: 0.1,
  currentAnomaly: 0.3,
  driftFactor: 0.05,
  flowSpeed: 0.5,
  mosaicScale: 20
};

// Test V.1.1 — 20×20 Grid Correctness
function testV1_1_Grid20x20Correctness(): void {
  console.log("Running Test V.1.1: 20×20 Grid Correctness");

  const cube = generateDataCube(0, baseConfig, 20);

  // Assert dimensions
  assertEqual(cube.gridSize, 20, "gridSize should be 20");
  assertEqual(cube.channels.CHL.length, 20, "CHL channel should have 20 rows");
  assertEqual(cube.channels.CHL[0].length, 20, "CHL channel should have 20 columns");

  // Assert total cells
  const totalCells = countTotalCells(cube);
  assertEqual(totalCells, 400, "Total cells should be 400 (20x20)");

  // Assert no NaN values
  for (const varName of Object.keys(cube.channels) as VariableName[]) {
    const hasNaN = !allValuesFinite(cube.channels[varName]);
    assert(!hasNaN, `${varName} should not contain NaN values`);
  }

  console.log("✓ Test V.1.1 passed");
}

// Test V.1.2 — 100×100 Grid Correctness
function testV1_2_Grid100x100Correctness(): void {
  console.log("Running Test V.1.2: 100×100 Grid Correctness");

  const cube = generateDataCube(0, baseConfig, 100);

  // Assert dimensions
  assertEqual(cube.gridSize, 100, "gridSize should be 100");
  assertEqual(cube.channels.CHL.length, 100, "CHL channel should have 100 rows");
  assertEqual(cube.channels.CHL[0].length, 100, "CHL channel should have 100 columns");

  // Assert total cells
  const totalCells = countTotalCells(cube);
  assertEqual(totalCells, 10000, "Total cells should be 10,000 (100x100)");

  // Assert stats are computed correctly
  assert(isFinite(cube.stats.CHL.mean), "CHL mean should be finite");
  assert(isFinite(cube.stats.CHL.std), "CHL std should be finite");
  assert(cube.stats.CHL.mean !== undefined, "CHL mean should be defined");
  assert(cube.stats.CHL.std !== undefined, "CHL std should be defined");

  console.log("✓ Test V.1.2 passed");
}

// Test V.1.3 — 500×500 Grid Correctness
function testV1_3_Grid500x500Correctness(): void {
  console.log("Running Test V.1.3: 500×500 Grid Correctness");

  const cube = generateDataCube(0, baseConfig, 500);

  // Assert dimensions
  assertEqual(cube.gridSize, 500, "gridSize should be 500");
  assertEqual(cube.channels.CHL.length, 500, "CHL channel should have 500 rows");

  // Assert total cells
  const totalCells = countTotalCells(cube);
  assertEqual(totalCells, 250000, "Total cells should be 250,000 (500x500)");

  // Assert stats are computed without error
  assert(isFinite(cube.stats.CHL.mean), "CHL mean should be finite and computed");
  assert(isFinite(cube.stats.CHL.std), "CHL std should be finite and computed");

  console.log("✓ Test V.1.3 passed");
}

// Test V.1.4 — Variable Consistency Across Sizes
function testV1_4_VariableConsistencyAcrossSizes(): void {
  console.log("Running Test V.1.4: Variable Consistency Across Sizes");

  const sizes = [20, 100, 500];
  const expectedVariables: VariableName[] = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490", "FLH", "CHL_disagreement"];

  for (const size of sizes) {
    const cube = generateDataCube(0, baseConfig, size);

    // Assert all 9 variables are present
    for (const varName of expectedVariables) {
      assert(cube.channels[varName] !== undefined, `${varName} should be present in grid size ${size}`);
      assert(cube.stats[varName] !== undefined, `${varName} stats should be computed for grid size ${size}`);
    }

    // Assert no undefined or Infinity values in any channel
    for (const varName of expectedVariables) {
      const hasInvalidValues = !allValuesFinite(cube.channels[varName]);
      assert(!hasInvalidValues, `${varName} should not contain undefined or Infinity values for grid size ${size}`);
    }

    // Assert stats have mean and std for all variables
    for (const varName of expectedVariables) {
      assert(isFinite(cube.stats[varName].mean), `${varName}.mean should be finite for grid size ${size}`);
      assert(isFinite(cube.stats[varName].std), `${varName}.std should be finite for grid size ${size}`);
    }
  }

  console.log("✓ Test V.1.4 passed");
}

// Test V.1.5 — Grid Dimensions Match Generated Data
function testV1_5_GridDimensionsMatchData(): void {
  console.log("Running Test V.1.5: Grid Dimensions Match Generated Data");

  const sizes = [20, 100, 500];

  for (const size of sizes) {
    const cube = generateDataCube(0, baseConfig, size);

    // Verify gridSize matches tensor dimensions
    assertEqual(cube.gridSize, size, `gridSize should equal ${size}`);
    assertEqual(cube.channels.CHL.length, size, `CHL rows should equal ${size}`);
    assertEqual(cube.channels.CHL[0].length, size, `CHL columns should equal ${size}`);

    // Check all channels have matching dimensions
    const expectedRows = size;
    const expectedCols = size;

    for (const varName of Object.keys(cube.channels) as VariableName[]) {
      const actualRows = cube.channels[varName].length;
      const actualCols = cube.channels[varName][0]?.length || 0;
      assertEqual(actualRows, expectedRows, `${varName} rows should be ${expectedRows} for grid size ${size}`);
      assertEqual(actualCols, expectedCols, `${varName} columns should be ${expectedCols} for grid size ${size}`);
    }

    // Verify confidence grid also matches
    assertEqual(cube.confidence.length, size, `Confidence grid rows should equal ${size}`);
    assertEqual(cube.confidence[0].length, size, `Confidence grid columns should equal ${size}`);
  }

  console.log("✓ Test V.1.5 passed");
}

// Main test runner
async function runAllTests(): Promise<void> {
  console.log("=".repeat(60));
  console.log("Grid Validation Test Suite");
  console.log("=".repeat(60));
  console.log();

  const tests = [
    testV1_1_Grid20x20Correctness,
    testV1_2_Grid100x100Correctness,
    testV1_3_Grid500x500Correctness,
    testV1_4_VariableConsistencyAcrossSizes,
    testV1_5_GridDimensionsMatchData
  ];

  let passedCount = 0;
  let failedCount = 0;
  const failedTests: string[] = [];

  for (const test of tests) {
    try {
      test();
      passedCount++;
    } catch (error) {
      failedCount++;
      const testName = test.name;
      failedTests.push(testName);
      console.error(`✗ ${testName} failed: ${error}`);
    }
    console.log();
  }

  console.log("=".repeat(60));
  console.log(`Test Results: ${passedCount} passed, ${failedCount} failed`);
  console.log("=".repeat(60));

  if (failedCount > 0) {
    console.error(`\nFailed tests: ${failedTests.join(", ")}`);
    process.exit(1);
  } else {
    console.log("\nAll tests passed!");
    process.exit(0);
  }
}

// Run tests if this is the main module
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  runAllTests().catch((error) => {
    console.error("Fatal error running tests:", error);
    process.exit(1);
  });
}

export { testV1_1_Grid20x20Correctness, testV1_2_Grid100x100Correctness, testV1_3_Grid500x500Correctness, testV1_4_VariableConsistencyAcrossSizes, testV1_5_GridDimensionsMatchData };
