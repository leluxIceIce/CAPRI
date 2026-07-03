# TURBULENCE — Implementation Plan

### From concept (`TURBULENCE_MAXIMALIST_REFORM.md`) to a shipping browser app, without touching the science.

> **The strategy in one line:** extract CAPRI's proven scientific engine out of
> `eef-dashboard` into a shared, framework-free library, then build TURBULENCE as a
> *second* web app that consumes it — so both the existing dashboard and the new
> instrument compute from one source of truth and **no capability is re-derived,
> re-scoped, or lost.**

This plan is grounded in the real tree (verified against `eef-dashboard/src` on
`main` @ `26910f8`). It is incremental: **every milestone is its own PR that merges
green**, and the risky refactor (Phase 1) leaves the current app behaving
identically.

---

## 0. Guiding constraints

1. **Science is a library, not a copy.** One implementation of every algorithm,
   consumed by both shells. Zero forks, zero re-writes of numerics.
2. **The current app keeps working at every step.** `eef-dashboard` is refactored to
   *import* the extracted core; its behaviour, tests, and Tauri build stay intact.
3. **Two separate apps** (the decision from review) over **one shared core**.
   Browser first; Tauri desktop packaging follows.
4. **Preserve git history** — move files with `git mv`, never delete-and-recreate.
5. **Ship a safety net first.** Wire a test runner + web CI *before* the extraction,
   so the refactor is verified, not hoped.

---

## 1. Target architecture

npm **workspaces** (already npm + lockfile — no new package manager), added at the
repo root. `eef-dashboard/` stays where it is (moving it would break the Tauri build
paths and the `macos-beta.yml` `working-directory`); it simply becomes a workspace
member. The new app and the shared core are new directories.

```
CAPRI/
├─ package.json                 # NEW — workspace root: { "workspaces": ["packages/*","eef-dashboard","apps/*"] }
├─ packages/
│  └─ core/                     # NEW — @capri/core: the framework-free scientific engine
│     ├─ src/                   #   (moved, via git mv, from eef-dashboard/src/**)
│     ├─ package.json
│     └─ tsconfig.json          #   lib: ["ES2020"] — NO "DOM"; enforces purity at compile time
├─ eef-dashboard/               # UNCHANGED location — now imports @capri/core (the "Deep Field"-lineage app)
│  └─ src/                      #   keeps App.tsx, all React components, ThreeViewport, index.css
└─ apps/
   └─ turbulence/              # NEW — the maximalist web app (React 19 + Vite 6 + WebGL2)
      ├─ src/
      └─ package.json
```

**Why not move `eef-dashboard` into `apps/`?** It's tidier, but it rewrites the
Tauri config paths and CI `working-directory`, adding risk for no functional gain.
Keep it in place now; an optional cosmetic move to `apps/eef-dashboard/` can be a
later, isolated PR.

---

## 2. What goes in `@capri/core` (verified pure)

Everything below imports no React, Three, DOM, or Tauri — confirmed by grep. Moved
verbatim with `git mv`; only import paths update.

| Core module (from `eef-dashboard/src/…`) | Provides |
|---|---|
| `types.ts` | `DataCube`, `VariableName`, `VARIABLE_METADATA`, all analysis interfaces |
| `telemetryGenerator.ts` | `generateDataCube`, `evaluateScientificDiagnostics`, `parseCSVToCubes`, `parseCSVRaw`, `ensureCubeComplete` |
| `utils/eigenmath.ts` | PCA / Jacobi eigen, cell projection, k-means, `computeRootAnalysis` |
| `utils/sceneStatistics.ts` | seeded k-means, Moran's I, Mahalanobis outlier test, entropy |
| `utils/spatialTensor.ts` | the 9 spatial descriptors (gradient/laplacian/variance/entropy/Moran/semivariance/patchiness/texture) |
| `utils/relationshipTensor.ts` | correlations, ratios, ecological indices |
| `utils/bloomDetector.ts` | GAIA risk field, zones, trend, hotspots, fisherman alert |
| `utils/plsRegression.ts` | PLS fit/predict, VIP scores, 5-fold CV |
| `utils/mlData.ts` · `utils/mlCache.ts` · `utils/gridOps.ts` | sampling, standardization, seeded RNG, grid ops, in-memory cache |
| `utils/colormaps.ts` | scientific ramps → `{r,g,b}` (pure math; shells consume) |
| `gate1_pixel_inspector/*` | per-pixel values, z-scores, PCA projection, neighbour similarity |
| `gate2_understanding_roots/*` | interaction matrix, attractor detection, latent-ecology explorer |
| `adapters/{telemetrySchema,edgeSensorAdapter,sourceAdapters,geotiffAdapter,geotiffDecode,adapter}.ts` | source schemas, edge/sparse sensor, GeoTIFF→DataCube (`geotiff` is a pure npm lib, browser+node safe) |
| `embedders/embedderTypes.ts` | contrastive-embedder types |

**The two platform-bound modules — handled by a thin adapter seam, not moved as-is:**

| Module | Binding | Resolution |
|---|---|---|
| `utils/embedderStore.ts` | `localStorage` / Tauri Store | Core defines a `StorageAdapter` interface (`get/set/list/remove`). Each shell injects an impl: `localStorage` (web) or `@tauri-apps/plugin-store` (desktop). Persistence logic stays generic in core; only the backend is injected. |
| `utils/relationshipGeometry.ts` | `three` | Stays **shell-side** (it builds Three.js meshes — that's rendering, not science). TURBULENCE writes its own WebGL equivalent; `eef-dashboard` keeps using it directly. |

Test files travel with their targets: `tests/gridValidation.test.ts`,
`adapters/*.selftest.ts` → `packages/core`.

---

## 3. The TURBULENCE web shell

- **Framework:** React 19 + Vite 6 (match the existing toolchain — fastest path,
  reuses the memoized-derivation pattern already in `App.tsx`).
- **The Chamber renderer: WebGL2 via Three.js** (already a dependency; the team knows
  it). The doc scoped "WebGL/shaders"; concretely:
  - Channel grids upload once per frame as `DataTexture`s (21 channels → texture
    array / atlas). AGITATION, alert level, time are global uniforms.
  - **Particles** via `GPUComputationRenderer` (ping-pong FBO advection) — thousands
    of GPU particles, no CPU per-particle loop (the console demo's `fillRect` loop was
    the CPU stand-in for exactly this).
  - **Lenses = an ordered stack of fullscreen shader passes** reading the shared
    field textures. This is the core technical abstraction:

  ```
  interface Lens {
    id: string;                 // "storm", "aurora", "vectors", …
    enabled: boolean;
    wild?: boolean;             // default-off "wild" tier (datamosh, chroma)
    bind: (cube, analysis) => Uniforms;   // pulls from @capri/core outputs
    pass: ShaderPass;           // GPU fragment pass; agitation as uniform
    legend: LegendSpec;         // every lens ships a key — no unlabelled art
  }
  ```
  A `LensStack` composes enabled passes in order; toggling/reordering is cheap. Reuse
  `eef-dashboard`'s **WebGL context-loss recovery** (the freeze-to-white watchdog in
  `ThreeViewport.tsx`) verbatim — it's battle-tested.
- **Alt considered:** `regl` (lighter, shader-first) — viable and leaner, but adds a
  new dep and idiom. Recommend Three.js unless we want the smaller bundle.
- **Panels** (Intake Manifold, Spectral Bank, Diagnostics Column, waterfall, Lens
  Rack) are React components consuming memoized `@capri/core` outputs — the
  `turbulence-console.html` concept is the visual spec.

---

## 4. Lens → core-function binding (no orphan art)

Each lens in the catalog resolves to a real core call. This is the contract that
keeps "schizophrenic artsy" honest.

| Lens | Bound core output |
|---|---|
| Advection particles | flow field (`telemetryGenerator` flow) × channel value |
| Vector field (LIC) | `spatialTensor` `gradient_dx/dy` |
| Aurora regimes | `evaluateScientificDiagnostics` regimes + `eigenmath` PCA hulls |
| Storm radar *(lead)* | `bloomDetector.summarize` — risk / zones / trend / alert |
| Long-exposure trails | temporal accumulation of the risk/flow field over frames |
| Novelty shatter | `evaluateScientificDiagnostics` Mahalanobis novelty + p-value |
| Uncertainty fog | `cube.confidence` |
| Correlation moiré | `relationshipTensor` pairwise \|r\| |
| Constellation *(panel)* | `relationshipTensor` correlations |
| Spectral waterfall | 21-channel means over the time buffer |
| Probe (core sample) | `gate1` `pixelCompute` |
| Orrery | `gate2` `attractorDetection` |
| Nebula | `umap-js` via `mlData` |
| Breathing topography | `spatialTensor` descriptors |
| **Datamosh** *(wild, off)* | `CHL_disagreement` channel — cheap slice shader, no readback |
| **Chromatic split** *(wild, off)* | spectral variance across OA bands — cheap additive shader |

**Featured channels** (CHL · aphy · PAR · KD490 · OA11) are a config constant read by
the Spectral Bank (pin + accent) and the waterfall (brightness boost).

---

## 5. Milestones — each a standalone PR

| # | PR | Scope | Risk |
|---|---|---|---|
| **M0** | *Safety net* | Add npm workspaces root; add **Vitest**; wire `gridValidation.test.ts` + `*.selftest.ts` to it; add a **web CI workflow** (`tsc --noEmit` + `vitest run` + `vite build`) on PRs. **No app behaviour changes.** | Very low |
| **M1** | *Extract `@capri/core`* | `git mv` the pure modules (§2) into `packages/core`; add its `package.json`/`tsconfig` (no DOM lib); repoint `eef-dashboard` imports to `@capri/core`; introduce `StorageAdapter` and wire the web/Tauri impls for the embedder. Current app + tests behave identically. | Medium (mechanical; CI from M0 guards it) |
| **M2** | *Turbulence scaffold* | `apps/turbulence` (Vite+React), imports `@capri/core`, renders the **static** shell (panels, Spectral Bank, Diagnostics) off a live `DataCube` from core. No GPU yet. | Low |
| **M3** | *Chamber + first lenses* | WebGL2 Chamber, GPU particles, and **Storm radar + Aurora + Vector field** bound to real core outputs; context-loss recovery ported. | Medium |
| **M4** | *Full lens rack* | Trails, shatter, fog, moiré, waterfall, probe; the two **wild** opt-ins (datamosh, chroma) default-off; featured channels; Lens Rack + presets + AGITATION + SOBER hold. | Medium |
| **M5** | *Polish & tiers* | Perf/quality tiers (particle counts, DPR cap), `prefers-reduced-motion`, CVD-safe legends, "plate" export (PNG) + reuse core's CSV/report export, a11y pass. | Low |

**Start with M0.** It's zero-risk, and it's the harness that makes M1 safe.

---

## 6. Risks & mitigations

- **Extraction breaks an import path** → M0's CI (`tsc --noEmit` + build on every PR)
  catches it before merge; do M1 as one mechanical PR, reviewable as a move.
- **Tauri build paths** → mitigated by *not* moving `eef-dashboard`; only its imports
  change, not its location or config.
- **Two shells duplicate UI code** → accepted per the "two separate apps" decision;
  the shared core removes the *science* duplication, which is the part that matters.
- **WebGL perf / weak GPUs** → quality tiers + reduced-motion + the proven
  freeze-to-white recovery; heavy lenses (UMAP/RF/Nebula) lazy-loaded exactly as
  `eef-dashboard` already lazy-loads its ML modal.
- **Bundle size** (three + umap-js + ml-random-forest) → code-split per lens/panel;
  the ML lenses load on demand.

---

## 7. Open decisions to confirm (I have a default for each — veto any)

1. **Monorepo layout:** workspaces with `eef-dashboard` in place *(recommended, low
   risk)* vs. move it to `apps/eef-dashboard` (tidier, riskier). → **default: in place.**
2. **Chamber renderer:** Three.js (reuse, known) vs. `regl` (leaner bundle). →
   **default: Three.js.**
3. **Core package name:** `@capri/core`. → **default: yes.**
4. **Add the web CI workflow** (lint+test+build on PRs) in M0? → **default: yes** —
   there's currently none, and M1 needs it.
5. **Turbulence app directory/name:** `apps/turbulence`. → **default: yes.**

---

## 8. First slice, concretely

If you greenlight, the first PR (**M0**) is:

- add root `package.json` with `workspaces`;
- add `vitest` + a `test` script to `eef-dashboard` (and root);
- convert `gridValidation.test.ts` and the two `*.selftest.ts` files to Vitest specs;
- add `.github/workflows/web-ci.yml`: on PR → `npm ci`, `tsc --noEmit`, `vitest run`,
  `vite build`.

No source behaviour changes — purely the safety net. Then **M1** does the extraction
against that green CI.

> The result: one scientific engine, two instruments. Deep Field for calm reading,
> TURBULENCE for feeling the storm — and every number in both traces back to the same
> audited core.
