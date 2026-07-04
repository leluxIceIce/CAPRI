import { describe, expect, it } from "vitest";
import { runSelfTest } from "./edgeSensorAdapter.selftest";

// The self-test is the single source of truth for these assertions; it stays
// runnable standalone via `npx tsx src/adapters/edgeSensorAdapter.selftest.ts`.
describe("edgeSensorAdapter self-test", () => {
  it("passes every assertion", () => {
    expect(runSelfTest()).toBe(0);
  });
});
