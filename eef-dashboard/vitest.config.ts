import { defineConfig } from "vitest/config";

// Standalone Vitest config — deliberately NOT reusing vite.config.ts, so the
// React/Tailwind plugins never load into the (pure node) test environment.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    // gridValidation V.1.3–V.1.5 generate up to 500×500×21-channel cubes;
    // give them headroom instead of trimming the coverage.
    testTimeout: 60_000,
  },
});
