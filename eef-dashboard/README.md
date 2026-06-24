# EEF Dashboard — full feature source (preserved snapshot)

This is the **feature-complete** EEF Dashboard source, preserved into git from a
previously-ephemeral working copy so it can never be lost to a container recycle.

It is the richer sibling of `../react-dashboard` (which is leaner / deploy-wired but
feature-behind). This tree contains the work that did **not** previously exist in git:

- 14-variable data model (`src/types.ts`) incl. FLH, CHL_disagreement, OA08–OA13
- Gate 1 pixel inspector (`src/gate1_pixel_inspector/`)
- Gate 2 latent-ecology / attractor engines (`src/gate2_understanding_roots/`)
- Source adapters: GeoTIFF, edge-sensor, telemetry schema (`src/adapters/`)
- Feature panels: CSV inspector, latent ecology, pixel inspector, size-class,
  spatial encoding, update notifier (`src/components/`)
- Utility engines: eigenmath, spatial/relationship tensors, bloom detector,
  affinity graph, size-class model, etc. (`src/utils/`)
- Vitest suite (`src/tests/`)
- Electron auto-update wiring (`electron/main.cjs`, `electron/preload.cjs`)

## Status

This is a **snapshot for durability**, not the final build target. The active
re-architecture sprint (lite <100MB packaging + light "lucid glass" redesign) will
reconcile this tree and `../react-dashboard` into one canonical app. See the sprint
plan in the project tracker.

`node_modules/` and `dist/` are intentionally excluded — run `npm install` to restore.
