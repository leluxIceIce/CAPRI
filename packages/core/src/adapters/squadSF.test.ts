import { describe, expect, it } from "vitest";
import { runSelfTest } from "./squadSF.selftest";

// The self-test is the single source of truth for these assertions; it stays
// runnable standalone via `npx tsx src/adapters/squadSF.selftest.ts`.
describe("Squad S/F self-test (adapters + bloom detector)", () => {
  it("passes every assertion", () => {
    expect(runSelfTest()).toBe(0);
  });
});
