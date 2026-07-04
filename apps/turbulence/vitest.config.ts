import path from "node:path";
import { defineConfig } from "vitest/config";

// Node-environment tests only (the pure data path + @capri/core wiring). The
// React/canvas instrument components are exercised in the browser, not here.
export default defineConfig({
  resolve: {
    alias: {
      "@capri/core": path.resolve(__dirname, "../../packages/core/src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    testTimeout: 30_000,
  },
});
