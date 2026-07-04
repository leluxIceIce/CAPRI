# @capri/turbulence — the platform shell (M2)

The node-based, computational-media workspace specified in
[`design/PHYTO_PLATFORM_SPEC.md`](../../design/PHYTO_PLATFORM_SPEC.md). This is the
**M2** scaffold: the shell frame plus the first live instrument.

## What's here (M2)

- **Command Bar** — identity, workspace tabs, live UTC, transport.
- **The Network** — the analysis pipeline as an always-visible operator spine
  (static in M2; the live DAG runtime is M3).
- **The Stage** — the **Signature Field** instrument rendering a real streaming
  `DataCube` from `@capri/core` (CHL concentration + iso-contours + in-place OLCI
  spectra, 681 nm fluorescence flagged, curve colour = FLH vitality).
- **The Inspector** — live instrument parameters + real scene readouts.
- **The Timeline** — play / scrub / provenance.

## Architecture

Standalone Vite + React app that consumes the shared scientific engine
`@capri/core` **as TypeScript source** via a path alias (`vite.config.ts`,
`tsconfig.json`) — its own lockfile and `npm ci`, so nothing is duplicated and the
`.dmg` pipeline is untouched (the M1 "standalone sibling" pattern).

```bash
npm ci
npm run dev     # http://localhost:5273
npm run lint    # tsc --noEmit
npm test        # vitest — @capri/core wiring smoke test
npm run build   # vite production build
```

## Roadmap (design/PHYTO_PLATFORM_SPEC.md §15)

M3 — the Network DAG runtime, the Dock (layer stack), the Inspector probe.
M4 — all six instruments on the Stage + linked selection + difference timeline.
M5 — reducers/models as nodes (UMAP/PLS/RF/embedders), project JSON.
M6 — perf tiers, a11y, plate export, Tauri packaging.
