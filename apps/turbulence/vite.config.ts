import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The platform shell. Consumes @capri/core as TypeScript source from the sibling
// package (the M1 "standalone sibling" pattern), so this app keeps its own
// lockfile / install and the shared science is never duplicated.
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@capri/core": path.resolve(__dirname, "../../packages/core/src"),
    },
  },
  server: {
    // Allow the dev server to serve the sibling @capri/core sources.
    fs: { allow: [path.resolve(__dirname, "../..")] },
  },
});
