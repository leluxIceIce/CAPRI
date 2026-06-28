# CAPRI — application source

This is the shipping application behind [CAPRI](../README.md): a state-discovery
framework for ocean colour. A TypeScript / React + Three.js front end packaged in
a Tauri (Rust) shell, building a native macOS app. It runs fully client-side — no
backend, no account, no telemetry.

## Develop

```bash
npm ci
npm run dev          # http://localhost:5173 — the dashboard in your browser
npm run tauri:build  # build the native macOS app (.dmg)
npm test             # Vitest suite
```

## Layout

| Path | What it is |
| --- | --- |
| `src/types.ts` | The data model — 21 OLCI channels (raw bands + derived products: CHL, aphy, ADG, bbp, TSM, PAR, KD490, FLH, …) |
| `src/components/` | The 3D viewport, telemetry console, UMAP / PLS panels, Embedders tab, diagnostics |
| `src/utils/` | The real computation: `plsRegression.ts` (PLS + VIP), `mlData.ts`, eigenmath, spatial/relationship tensors, colormaps |
| `src/gate1_pixel_inspector/` | Per-cell pixel inspection |
| `src/gate2_understanding_roots/` | Correlation / latent-ecology / attractor engines |
| `src/adapters/` | Real data in: GeoTIFF, edge-sensor, CSV/telemetry schema |
| `src/embedders/` | Contrastive-embedder data model (persisted via the Tauri Store plugin) |
| `src-tauri/` | The Rust shell |
| `src/tests/` | Vitest suite |

`node_modules/` and `dist/` are excluded — run `npm ci` to restore.

Licensed under [Apache-2.0](../LICENSE).
