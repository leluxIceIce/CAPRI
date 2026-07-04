# CAPRI — Unified Platform UX/UI Specification

### A scientific instrument disguised as an interactive computational-media environment

> **The thesis, one line:** *The science belongs in the algorithms; the experience
> belongs in the interface.* CAPRI keeps its analytical rigor uncompromising and stops
> presenting it like a filing cabinet for numbers — the interface becomes an instrument
> for **perceiving** environmental dynamics, not a dashboard for reading them.

**Status:** product-level specification for review. No implementation here. The shared
scientific engine already exists (`@capri/core`, extracted in M1); this document
specifies the environment built on top of it and pairs with the visual mockup
`platform-shell.html`.

---

## 0 · One screen

**What it is.** A single, node-based, real-time workspace where CAPRI's entire
analytical pipeline is *visible and playable*, the six phyto-instruments are its
viewports, and every legacy capability (CSV/GeoTIFF import, JSON projects, UMAP,
PLS, layer control, drag-and-drop, the full analysis pipeline) is a first-class
operator in the same world.

**Two non-negotiables.**
1. **Nothing is lost.** Every current capability is preserved (§6 is the ledger).
2. **Every effect encodes information.** Particles, light, motion, depth, material,
   animation each carry a variable. No decoration (§9).

**The frame.**
```
┌───────────────────────────────────────────────────────────────────────────┐
│  COMMAND BAR — identity · workspace tabs · global search/spawn · transport  │
├──────────┬──────────────────────────────────────────────────┬──────────────┤
│          │                                                  │              │
│   THE    │                  THE  STAGE                       │    THE       │
│ NETWORK  │   instrument viewports — tile · tab · mosaic       │  INSPECTOR   │
│ (nodes = │   (the six instruments, linked selection)          │  (context:   │
│  the     │                                                  │   node /     │
│ pipeline)│                                                  │   cell /     │
│          │                                                  │   selection) │
├──────────┴──────────────────────────────────────────────────┴──────────────┤
│  THE DOCK — sources · layer stack · project · export (in-world, not cards)  │
├───────────────────────────────────────────────────────────────────────────┤
│  THE TIMELINE — frames · scrub · difference anchors · provenance stamp       │
└───────────────────────────────────────────────────────────────────────────┘
```
Not a dashboard. A workspace you *operate*.

---

## 1 · Design philosophy

**What we are.** A scientific instrument that happens to be a computational-media
experience — closer to TouchDesigner, a CFD post-processor, or a real-time
installation than to GIS or BI.

**What we refuse** (the anti-pattern list, explicitly):
- ✗ static dashboards & fixed panel grids
- ✗ spreadsheet/table-first aesthetics
- ✗ generic KPI cards / stat tiles as the primary surface
- ✗ business-intelligence layouts
- ✗ "charts and tables under a nav bar"

**The governing law — perception first, verification always.** Atmosphere gets you to
the right question fast; rigor (legends on every mark, exact numbers one gesture away,
seeded/reproducible math, visible provenance) lets you answer it defensibly. Beauty is
never allowed to cost clarity — if an effect doesn't carry a variable, it's cut.

---

## 2 · The organizing metaphor — **The Network**

The single idea that makes this cohere: **the node graph *is* the analysis pipeline.**
Not a decorative "flow" — the literal `@capri/core` dependency graph, made visible and
editable. This is the honest translation of TouchDesigner into science: operators are
real computations, wires are real data, and the instruments are output operators.

**Operator families (all backed by real `@capri/core` functions):**

| Family | Operators (examples) | Backing |
|---|---|---|
| **Sources** | `synthetic`, `csv_player`, `geotiff`, `edge_sensor` | `telemetryGenerator`, adapters |
| **Fields** | `spatial_tensor` (9 descriptors), `relationship_tensor`, `confidence` | `spatialTensor`, `relationshipTensor` |
| **Reducers** | `pca` (3-PC), `umap`, `kmeans_regime`, `attractors` | `eigenmath`, `umap-js`, `sceneStatistics`, gate2 |
| **Models** | `pls_vip` (+5-fold CV), `random_forest`, `embedder` | `plsRegression`, `ml-random-forest`, embedders |
| **Detectors** | `bloom_gaia`, `novelty` (Mahalanobis), `front_index` | `bloomDetector`, `sceneStatistics` |
| **Selectors** | `brush`, `threshold`, `layer_mask`, `channel_pick` | selection/filter layer (new, thin) |
| **Instruments** | the six viewports (§5) | render layer |

You never *have* to see the graph — but it's always there as the truth of what's being
computed, collapsible to a spine or opened as a full-screen map. Changing a parameter
anywhere is changing a node; the graph is the single source of state.

---

## 3 · Software architecture

```
@capri/core  ── framework-free science (DONE, M1) ─────────────┐
   types · telemetryGenerator · tensors · PCA/UMAP/kmeans ·     │  consumed as
   PLS/VIP/RF · bloom(GAIA) · novelty · gates · adapters        │  TS source
                                                                ▼
┌── runtime ────────────────────────────────────────────────────────────────┐
│  • Graph engine — operator DAG, dirty-propagation, memoized eval           │
│    (generalizes the useMemo chains already in the current App.tsx)          │
│  • Compute workers — heavy ops (UMAP/RF/PLS-CV/tensors) off the main thread │
│  • Render layer — WebGL2 (Three.js): instrument viewports + shared          │
│    DataTextures of the 21 channels; the proven context-loss recovery reused │
│  • Selection/time/project stores — the three global state objects (§7,§11)  │
└─────────────────────────────────────────────────────────────────────────────┘
                                                                ▼
   Shell (React 19 + Vite) — Command Bar · Network · Stage · Inspector ·
   Dock · Timeline. Two build targets: browser (primary) + Tauri desktop.
```
The current app's memoized derivations (`analysisResult`, `rootAnalysis`,
`latentEcology`, `bloomState`, tensors) become graph nodes verbatim — the refactor is a
re-housing, not a rewrite.

---

## 4 · Workspace organization

Canvas-first and dockable — **not** a fixed three-column layout. Six surfaces:

- **Command Bar** — identity, **workspace tabs** (saved layouts), a global
  search/spawn palette (`⌘K`: "add UMAP", "open Optical Section", "import GeoTIFF"),
  and the master play/agitation controls. One line, always present.
- **The Network** — the operator graph (§2). Collapsible to a left spine; expandable to
  a full-screen map. Selecting a node focuses the Inspector on it.
- **The Stage** — where instruments live. **Tile**, **tab**, or **mosaic** (all six at
  once). Any instrument can go fullscreen (`1–6`). Viewports are resizable and
  detachable. This is the heart; everything else serves it.
- **The Inspector** — context-sensitive: a node's parameters, a selected cell's dossier
  (the pixel inspector, reborn), or the active selection's stats. One panel, many faces.
- **The Dock** — the in-world home for the legacy utilities (sources, **layer stack**,
  project, export), styled as instrument modules, never as BI cards.
- **The Timeline** — temporal transport: frame scrub, play, **difference anchors** (pin
  two frames → a change field), and the provenance stamp (source, bbox, UTC, seed).

**Workspaces (layout presets)** ship curated and savable into project JSON:
*Survey* (Territorial Intel + Signature Field + Dock), *Physiology* (Bloom Field +
Optical Section + Timeline), *Latent* (Latent Volume + UMAP node + Inspector),
*Clean room* (one instrument, legends, numbers — the verification posture).

---

## 5 · The six instruments as operators

The instruments (live in `phyto-instruments.html`) are output operators on the Stage.
Each is a *translation* of a reference's communication strategy, bound to real
variables:

| Instrument | Translates | Encodes | Primary use |
|---|---|---|---|
| **Signature Field** | Rosetta spectral map | CHL colourmap + iso-contours + in-place 21-band spectra (681 nm FLH flagged) | read the raw spectrum where it lives |
| **Optical Section** | petrographic thin-section | water types as birefringence palettes; **fronts = grain boundaries**; regime labels | identify & bound water masses |
| **Latent Volume** | CFD scalar box | true 3-D reduction (PC1·CHL / PC2·FLH / PC3·TSM); regime knots; novelty outliers | see high-dim structure (3-D sibling of UMAP) |
| **Bloom Field** | RealFlow percolation | colour = FLH vitality, size = CHL, **blur = TSM turbidity**, drift = front gradient | feel bloom physiology & uncertainty |
| **Density Cartography** | SOYO + dot-terrain | CHL stipple; **■ confident / ● uncertain** (disagreement); drift route; locator | biomass + sensor-agreement at a glance |
| **Territorial Intel** | Po-river territorial map | lat/lon graticule; themed layers (CHL/TSM/front/bloom-risk); hotspot strip + distances | situate everything in real space |

Every instrument shares the same selection, time, and colour law, so switching between
them is switching *lenses on one scene*, never changing datasets.

---

## 6 · Preservation ledger — every existing capability's new home

The hard constraint. Nothing below is removed; each gains an in-world home.

| Existing capability | New home |
|---|---|
| CSV import (multi-frame) + raw-row inspector | `csv_player` **source** node; raw rows in the Inspector's "Ledger" face |
| GeoTIFF import (observational) | `geotiff` source node; provenance to the Timeline stamp |
| Edge/sparse-sensor intake | `edge_sensor` source node |
| Synthetic + presets (coastal/deep-sea/estuary) | `synthetic` source node with preset param |
| Save / load **project JSON** | Project module in the Dock; **the graph + layout + selection** serialize (superset of today's snapshot) |
| Persisted custom colours, uploaded cubes | Project store; unchanged semantics |
| **Layer visibility / opacity / reorder (drag)** | Layer-stack module in the Dock **and** a `layer_mask` operator; drag-reorder kept |
| Per-variable colormaps + custom base/peak colours | Colour law editor in the Inspector; same ramps |
| 21 channels + metadata + stats | The scene; stats live in the readout gutter + Signature Field |
| **UMAP** embedding | `umap` reducer node → rendered in Latent Volume (3-D) and a 2-D view |
| **PLS + VIP + 5-fold CV** | `pls_vip` model node; VIP can **repaint any instrument** (drivers in space) |
| Random-forest regression | `random_forest` model node |
| k-means regimes + posterior shares | `kmeans_regime` node → Optical Section palettes + Latent Volume knots |
| Latent ecology (interaction matrix, attractors, transitions) | gate2 nodes → Latent Volume + Inspector matrix face |
| Pixel inspector (values, z-scores, PCA, neighbours) | Click any cell → Inspector "Probe" dossier; neighbours lit in-scene |
| GAIA bloom (risk/zones/trend/hotspots/alert) | `bloom_gaia` detector → Bloom Field + Territorial Intel + a global alert tint |
| Novelty (Mahalanobis + p) | `novelty` detector → Latent Volume outliers + a beacon |
| Spatial descriptors (9) | `spatial_tensor` node → Signature Field contours, Bloom Field drift, Optical fronts |
| Relationship/correlation tensor | `relationship_tensor` node → Inspector + an on-demand constellation |
| Confidence overlay | `confidence` node → Density Cartography ■/● split + Bloom Field blur |
| Camera presets (iso/top/profile) | Per-instrument vantages |
| PNG export (per layer) | Export module; joined by "plate" export of any viewport/workspace |
| Contrastive embedders (persisted) | `embedder` node; library in the Dock |
| Auto scientific-justification narrative | The Narrator line, ambient across the Stage |
| Live UTC clock, live/paused | Timeline + Command Bar |

If a row ever loses its home, the design is wrong.

---

## 7 · Interaction model

- **Selection is a first-class object (linked brushing).** One selection set spans every
  surface: brush cells in Territorial Intel → they ignite in Latent Volume, glow in
  Bloom Field, list in the Inspector, and drive any downstream `brush`/`threshold`
  operator. This is the multi-view analytical workspace — one scene, many synchronized
  lenses.
- **Node wiring & parameters.** Drag to connect operators; every parameter is a node
  parameter, so state is unified and undoable. Presets are saved subgraphs.
- **Drag-and-drop, preserved and extended.** Reorder layers (as today); drag a source
  file onto the canvas to spawn a source node; drag an instrument from a shelf onto the
  Stage; drag a channel onto an axis.
- **Gestures, one grammar everywhere.** Orbit / scroll-zoom / pan in spatial
  instruments; click = probe; shift-click = add to selection; `[`/`]` = step time;
  `⌘K` = spawn; `1–6` = focus an instrument; `0` = mosaic; hold `space` = the verify/
  plain-readout posture.
- **Filtering & thresholds** are operators, so a filter is visible, reusable, and part
  of the recorded pipeline — not a hidden UI toggle.

---

## 8 · Navigation

- **Workspaces** (saved layouts) are the top-level way you move — tabs in the Command
  Bar, switchable and serialized in the project.
- **The Network as a map.** Zoom the graph to navigate the analysis; double-click a node
  to open its instrument; the graph is a minimap of the whole session.
- **Focus ↔ mosaic** toggling (`0`/`1–6`) moves between the whole scene and one lens.
- **Command palette (`⌘K`)** is the universal jump: spawn any operator, open any
  instrument, run any analysis, load any workspace — searchable by name.
- Everything keyboard-reachable; nothing hidden behind a hover-only path.

---

## 9 · Visual language

**Ground & atmosphere.** Near-black cool ground (`#04060B`) with a faint sampled-light
grain; boldness spent on the data, chrome kept to hairline `#EAF0FF` at low alpha. The
scene feels like a dark calibrated volume, not a white document.

**Colour law (fixed, learnable, doubled by luminance for CVD):**
- **Spectral / ocean ramp** (violet→cyan→green→amber) = wavelength & CHL concentration.
- **Vitality ramp** (senescent amber → thriving cyan) = FLH physiology.
- **Semantic accents** (separate from data hues): cyan = flow/young/OK, amber = caution,
  crimson = high/RED alert, violet = latent, green = novelty.

**Typography.** Wide-tracked uppercase micro-labels (the plate-annotation voice) +
**monospace for every number** (the instrument voice) + one warm sentence-case face for
the Narrator. Annotation-rich, but every glyph decodes a real value.

**The encoding laws — every effect carries a variable:**

| Channel | Encodes |
|---|---|
| **Particles** (count / size / drift) | CHL biomass / density / front direction |
| **Colour** | wavelength, CHL, FLH vitality, water-type identity |
| **Blur / clarity** | TSM turbidity = honest visual uncertainty (you can't see clearly what the sensor couldn't) |
| **Motion / drift** | real spatial gradients & flow; settling = stability; tremor = regime-mixing entropy |
| **Depth / parallax** | confidence & latent distance (uncertain recedes into fog) |
| **Material / texture** | water-type "birefringence"; stipple density = quantity |
| **Lighting** | alert state & bloom intensity (the scene's weather) |
| **Animation** | reveals relationships (a wire lighting, a cluster forming) — never decorates a transition |

`prefers-reduced-motion` freezes every one of these to a crisp, fully-labeled static
plate — the information survives without the motion.

---

## 10 · Information hierarchy & progressive disclosure

- **Ambient → on-demand.** The scene and its alert weather are always visible; exact
  numbers live in a **readout gutter** and open fully in the Inspector on demand.
- **Novice → expert.** First run opens a single instrument + the Narrator teaching the
  colour law; the Network and multi-view mosaic reveal as the user reaches for them.
- **The verify posture.** Holding `space` collapses atmosphere to a flat, labelled,
  static readout of exactly what's under the cursor — one key between immersion and
  audit, always.
- **Provenance is never buried** — source, bbox, UTC, seed sit on the Timeline; synthetic
  vs observational is always legible.

---

## 11 · Data & temporal model

- **Sources** produce frames (`DataCube`s). Time is a global cursor; scrubbing advects
  the instruments continuously (no snapping).
- **Difference anchors** pin two frames → a change field any instrument can render (what
  grew, what retreated) — the temporal core of bloom-trend reasoning.
- **Provenance object** travels with every cube (source kind, bbox, timestamp, seed) and
  is always surfaced. Derived products stay computed, never invented.

---

## 12 · Emotional journey

**Arrival** — a dark volume breathing with one live scene; a single sentence of
narration; no wall of controls. *Curiosity, not intimidation.*
**Orientation** — brush a bloom; watch it ignite across lenses; feel the linkage. *"I can
touch this."*
**Fluency** — open the mosaic, wire a UMAP, repaint by VIP; the Network becomes a place.
*Flow.*
**Mastery** — saved workspaces, difference anchors, embedder library, plate exports for
the paper and the wall. *The instrument disappears; only the water remains.*

---

## 13 · Technology

- **Render:** WebGL2 via Three.js — shared 21-channel `DataTexture`s, GPU particles
  (`GPUComputationRenderer`), instrument-specific shader passes; the existing
  freeze-to-white **context-loss recovery ported verbatim**.
- **Graph runtime:** a small DAG engine with dirty-propagation + memoized eval
  (generalizing today's `useMemo` chains); operators are pure `@capri/core` calls.
- **Compute workers:** UMAP / RF / PLS-CV / tensors off the main thread; heavy nodes show
  a computing state rather than freezing the frame.
- **Perf tiers:** particle-count / DPR / lens tiers auto-selected; lenses individually
  toggleable; `prefers-reduced-motion` → static plates.
- **Targets:** browser first (the showpiece), Tauri desktop second — both on the same
  shell over the same `@capri/core`.

---

## 14 · Usability trade-offs & accessibility

- **Art vs. rigor** is resolved by the encoding laws (§9) + the verify posture (§10):
  every effect is legible as data, and plainness is always one key away.
- **Overwhelm** is bounded by progressive disclosure (§10) and workspaces (§4) — you
  never meet all six instruments at once unless you ask.
- **Accessibility:** every hue doubled by luminance + a CVD-safe palette; full keyboard
  navigation; motion opt-out; numbers always reachable; legends on every mark.
- **Trust:** seeded/reproducible math, visible provenance, honest uncertainty rendered
  as blur/fog rather than hidden — the interface is expressive *and* auditable.

---

## 15 · Build roadmap (maps onto the extraction already underway)

- **M1 ✓** — `@capri/core` extracted (shared engine).
- **M2** — Turbulence/Platform shell scaffold: Command Bar + Stage + one instrument on a
  live `DataCube` from core.
- **M3** — The Network runtime (operator DAG) + the Dock's layer stack + Inspector probe;
  wire sources → tensors → instruments.
- **M4** — All six instruments as Stage operators; linked selection; timeline + difference.
- **M5** — Reducers/models as nodes (UMAP/PLS/RF/embedders); VIP-repaint; project JSON
  (graph+layout+selection).
- **M6** — Perf tiers, a11y pass, plate export, Tauri packaging.

Each milestone is a standalone PR that merges green against the M0 CI wall.

---

## 16 · Open decisions to confirm

1. **Product name** — keep it **CAPRI** (recommended; the codenames Deep Field /
   TURBULENCE were concepts), or brand the environment separately?
2. **Node graph exposure** — always-present spine (recommended) vs. power-user mode only.
3. **First instrument for M2** — I'd start with **Signature Field** (it exercises the
   colour law + spectra + contours and is the most legible entry point). Agree?
4. **Legacy dashboard** — retire `eef-dashboard`'s UI once the platform reaches parity,
   or keep it as the "clean room" fallback shell?

> Traditional scientific software looks like it was designed during a tax audit. There is
> no law of physics requiring that. CAPRI keeps the math honest and lets the interface
> become what the data has always been underneath: alive.
