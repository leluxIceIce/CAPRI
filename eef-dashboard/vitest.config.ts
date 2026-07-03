import path from "node:path";
import { defineConfig } from "vitest/config";

// Standalone Vitest config — deliberately NOT reusing vite.config.ts, so the
// React/Tailwind plugins never load into the (pure node) test environment.
export default defineConfig({
  resolve: {
    alias: {
      // Shared scientific engine (M1) — same alias as vite.config.ts.
      "@capri/core": path.resolve(__dirname, "../packages/core/src"),
    },
  },
  test: {
    environment: "node",
    // The science tests moved to packages/core with the modules they verify
    // (M1); this app runs the whole suite so its CI still gates the engine.
    include: ["src/**/*.test.ts", "../packages/core/src/**/*.test.ts"],
    // gridValidation V.1.3–V.1.5 generate up to 500×500×21-channel cubes;
    // give them headroom instead of trimming the coverage.
    testTimeout: 60_000,
  },
});
