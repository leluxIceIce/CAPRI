# CAPRI — Immersive Scientific Redesign

### A UX/UI reform proposal for a next-generation ocean-colour state-discovery instrument

> *The ocean has no walls, yet it holds rooms.*
> CAPRI's job is to show you where a **state** begins. Today it does that through
> a light dashboard of panels, plots and readouts. This document proposes a
> different way to *inhabit* the same science — one where you don't decode the
> data, you stand inside it.

**Status:** blue-sky design proposal. No implementation is prescribed here. Every
capability listed in the *Feature Preservation Ledger* (§0) must survive the
redesign intact; nothing is simplified or removed. What changes is the *experience*.

---

## Table of contents

0. [Feature Preservation Ledger — what must survive](#0-feature-preservation-ledger)
1. [Design philosophy & vision](#1-design-philosophy--vision)
2. [The emotional journey — first launch to expert](#2-the-emotional-journey)
3. [The core interaction model](#3-the-core-interaction-model)
4. [The visual language](#4-the-visual-language)
5. [Representing environmental data beyond charts](#5-representing-environmental-data-beyond-charts)
6. [Immersive & spatial visualization](#6-immersive--spatial-visualization)
7. [Paradigms to preserve, paradigms to discard](#7-paradigms-to-preserve-paradigms-to-discard)
8. [Information architecture](#8-information-architecture)
9. [Advanced interactions, animations, filters, workflows](#9-advanced-interactions-animations-filters-workflows)
10. [Enabling technologies](#10-enabling-technologies)
11. [Usability trade-offs — art vs. rigor](#11-usability-trade-offs)
12. [Conceptual directions](#12-conceptual-directions)

---

## 0. Feature Preservation Ledger

Before proposing anything, the contract: **the redesign is a re-housing of an
existing scientific engine, not a re-scoping of it.** Below is the complete
inventory of what CAPRI does today. Each item is annotated with where it *lands*
in the new experience (forward-references to later sections). If it isn't in this
ledger and preserved, it isn't a valid design.

### 0.1 Data foundation
| Capability | Preserved as |
|---|---|
| 21 channels: 8 derived biogeochemistry (CHL, aphy, ADG, bbp, TSM, PAR, KD490, FLH), 1 QA flag (CHL_disagreement), 12 raw OLCI bands (Oa1–Oa11, Oa13; 400–761 nm) | The **spectral column** (§5.1, §6.1) — every channel remains an addressable layer |
| Configurable N×N grid DataCube per frame (default 20×20) | The **field lattice** — resolution control retained (§3) |
| Per-variable stats (min/max/mean/std) | Surfaced on demand in the **read-out gutter** (§4.6) |
| Per-cell aerosol-derived confidence [0,1] | **Volumetric fog / clarity** (§5.4) — no longer a hidden overlay |
| Per-cell WGS-84 lat/lon (when georeferenced) | Enables **Atlas posture** (§6.3, §12-B) |
| Sources: synthetic (seeded), CSV (+ raw-row inspector), GeoTIFF (real observational), sparse edge-sensor adapter | **Source intake** ritual (§2.1) with honest provenance signalling (§4.5) |
| Presets: coastal / deep-sea / estuary | **Regime presets** as ambient scene-moods (§2.1) |
| Streaming playback: speedHz, play/pause, frame scrub, reset | The **time ribbon** (§3.4, §9.3) |
| Config knobs: noiseLevel, currentAnomaly, driftFactor, flowSpeed | The **conditions console** (§8) |
| FLH derived via ESA-standard Fluorescence Line Height from raw bands | Unchanged math; shown as a *derived* layer with lineage (§4.5) |
| 100% client-side, no account/server/telemetry | Non-negotiable; reinforced by the "instrument on your bench" framing (§1) |

### 0.2 3D visualization (the current `ThreeViewport`)
| Capability | Preserved as |
|---|---|
| Layered terrain — each channel a displaced, colour-mapped surface, vertically stacked | **The Column** — the centrepiece, elevated from panel to environment (§6.1) |
| Orbit / zoom / pan | Retained; extended with **descent** and **cinematic camera paths** (§3.2, §9.4) |
| Drag-reorder layer stack | Retained as **spectral re-stacking** with fluid transitions (§9.1) |
| Per-layer visibility + opacity | Retained; opacity reframed as *presence/density* (§5) |
| Camera presets: iso / top (orthographic plan) / profile | Retained as named **vantages**; plan view = Atlas posture (§6.3) |
| Displacement gain, spacing, wireframe, labels, grid-floor toggles | Retained in the **instrument settings** tray (§8) |
| Per-variable custom colours (base + peak), persisted | Retained; governed by the **encoding law** (§4.3) |
| Per-variable scientific colormaps (Jet, Magma, Viridis, Turbo, Hot, Ocean, Rainbow, Seismic) | Retained and rationalised into a coherent **spectral palette system** (§4.3) |
| Pixel click → inspector | Becomes **the sounding probe** (§3.3, §5.6) |
| PNG export per layer | Retained; joined by **scene/plate export** (§9.5) |
| WebGL context-loss recovery + error boundaries | Retained wholesale — robustness is a feature, not a detail (§10.4) |

### 0.3 3D overlays
| Capability | Preserved as |
|---|---|
| Spatial-structure overlay — 9 descriptors (gradient dx/dy, laplacian, variance, entropy, Moran's I, semivariance, patchiness, texture contrast) per variable | The **structure terrain** (§5.2) — disagreement/structure literally becomes topography |
| Relationship graph mesh (channel correlations as 3D edges) | The **relationship constellation** (§5.5) |
| Confidence overlay plane | Absorbed into **volumetric clarity** (§5.4) |
| Latent-space geometric overlay (PCA distance field + cluster convex hulls draped on terrain) | The **regime membrane** (§5.3, §6.2) |

### 0.4 Scientific analysis (must remain byte-for-byte faithful in its math)
| Capability | Preserved as |
|---|---|
| Regime classification — seeded k-means (CHL/TSM/ADG/bbp) + posterior shares | **Regime bloom** — clusters as inhabited rooms (§5.3) |
| Transition risk / regime-mixing entropy (tipping-point) | **The tremor** — ambient instability signal (§5.7) |
| Spatial front index / boundary-zone detection (Moran's I, gradient magnitude) | **Fronts** rendered as luminous seams (§5.2) |
| State novelty score + p-value (Mahalanobis outlier test vs baseline) | **The anomaly beacon** (§5.7) |
| Auto-generated natural-language scientific justification | **The narrator** — always-available plain-language reading (§2.3, §4.6) |
| PCA / Jacobi eigenanalysis, cell projection, k-means | Powers the **latent chamber** (§6.2) |
| Latent ecology: interaction matrix (Pearson r), attractor landscape (dominance, stability, centroids), regime-transition map, strongest links, variance explained | The **latent chamber** — an explorable 3D attractor space, not a modal of heatmaps (§6.2) |
| Pixel inspector: per-pixel values, z-scores, PCA projection, neighbourhood similarity, variable dependencies | The **sounding probe** dossier (§5.6) |
| UMAP embedding of spectral signatures | **Similarity nebula** (§6.2) |
| PLS regression + VIP + 5-fold CV (R², RMSE, actual-vs-predicted) | **Driver analysis** workbench (§9.6) — kept rigorous, re-skinned |
| Random-forest regression | Retained in the driver workbench (§9.6) |
| Bloom detector (GAIA / Squad F): per-cell risk field, zone classes (green/amber/red), trend (growing/retreating/stable), top driver, hotspots, fisherman alert (GREEN/AMBER/RED) | The **risk weather** system — the app's most human-facing output (§5.7, §2.4) |
| Contrastive embedders (persisted, training-data accumulation; training WIP) | The **memory** — embedders as a growing library the instrument learns from (§8) |
| Correlation & covariance across all channels | Feeds the relationship constellation (§5.5) |
| CSV raw-row inspector (table + column chart) | Retained verbatim as a **"show me the numbers"** drawer (§7, §11) |

### 0.5 Session & shell
| Capability | Preserved as |
|---|---|
| Save/load session snapshot (JSON, view-settings only) | Retained as **instrument state** save/restore (§8) |
| Live UTC clock, live/paused status | Retained in the **status rail** (§4.6) |
| Persisted custom colours & uploaded cubes | Retained (localStorage / Tauri store) |
| Tauri desktop (macOS .dmg) + browser builds | Both remain first-class targets (§10) |

**If the redesign cannot host all of §0, the redesign is wrong.** Everything that
follows is in service of re-housing this ledger, not trimming it.

---

## 1. Design philosophy & vision

### 1.1 The one-line vision
> **CAPRI becomes a sounding instrument you descend into — a dark, calibrated
> volume where twenty-one channels of ocean colour behave like a living water
> column, and where *state* announces itself through light, density and motion
> before you ever read a number.**

### 1.2 The core reframing
The current app answers *"what are the values?"* with panels, cards and plots.
The redesign answers a different question first: ***"what is this water doing?"***
— and only then lets you drill to the values, which are always one gesture away.

We move CAPRI along three axes simultaneously:

| Axis | From (today) | To (proposed) |
|---|---|---|
| **Medium** | Dashboard of framed panels | A single continuous instrument-space |
| **Register** | Read (decode charts) | Perceive (feel fields), then read |
| **Atmosphere** | Light "Lucid Glass," calm, neutral | Dark calibrated void, luminous data, cinematic depth |
| **Primary object** | The panel | The data itself, monumental and centred |
| **Chrome** | Competes with data for the eye | Recedes to hairlines in the margins |

### 1.3 Four reference archetypes, held in tension
The brief asks the interface to sit between four things. We hold all four as
*design constraints*, each disciplining the others:

- **A scientific instrument** — every pixel is trustworthy, every colour means
  something, every number is reachable. *Discipline: nothing decorative that
  could be mistaken for data.*
- **An architectural installation** — the data has scale, weight and presence;
  you move *through* it. *Discipline: composition and negative space are
  designed, not accidental.*
- **An interactive exhibition** — it teaches itself; a newcomer feels invited,
  not tested. *Discipline: legibility and onboarding are first-class.*
- **A real-time CFD simulation** — fields flow, particles advect, time is
  continuous. *Discipline: motion encodes physics, never ornament.*

### 1.4 The prime directive
> **Every artistic decision must increase comprehension. If a beautiful effect
> does not make the science clearer, faster to read, or more trustworthy, it is
> cut.** Beauty here is a *consequence* of honest, dense, well-composed
> information — not a layer applied on top of it.

This is the lesson of all five reference images: they are gorgeous *because* they
are rigorous. The RealFlow percolation poster is beautiful because blue-to-red
is genuinely particle age and brightness is genuinely density. The occultation
diagram is beautiful because every glyph is a measured quantity. We inherit that
ethic, not the surface.

---

## 2. The emotional journey

The experience is designed as a deliberate arc from *awe* → *orientation* →
*fluency* → *mastery*. Each stage hands off to the next without a wall.

### 2.1 First 5 seconds — Arrival
- The app opens not on a grid of empty panels but on **the Column already
  breathing**: the default synthetic scene rendered as a slowly rotating,
  luminous stack of spectral fields suspended in a dark calibrated volume, faint
  measurement scaffolding (a wireframe bounding box, a dashed floor graticule, a
  scale bar) framing it like the reference bounding-box plots.
- Motion is present but *slow* — a 20-second idle orbit, particles drifting on
  the flow field. The message is immediate: *this is alive, this is real, this
  is instrument-grade.*
- A single quiet line of text fades in (the narrator's opening reading): e.g.
  *"Coastal regime dominant. One anomaly forming, north-east. Water clear."*
  Emotion target: **awe + safety.** Impressive, but it just told you what's going
  on in a sentence.

### 2.2 First minute — Orientation
- A gentle **guided reveal**: the scaffolding labels itself once (axes, the
  colour legend rail, the time ribbon) with hairline call-outs that fade after
  first read. Nothing blocks interaction.
- The user's first drag orbits the Column; it responds with weight and damping.
  First scroll descends *into* it. The interface rewards curiosity immediately —
  every gesture does something legible.
- Source intake is offered as a calm invitation ("Drop a GeoTIFF, CSV, or keep
  exploring the synthetic field"), never a blocking modal. Emotion target:
  **agency.**

### 2.3 First session — Comprehension
- The **narrator** (auto-generated scientific justification, already in the
  engine) is always docked as one line, expandable to the full reasoning. This
  is the bridge from *feeling* to *understanding*: the scene shows a red seam,
  the narrator says *"state boundary — CHL/TSM gradient front, transition risk
  high."* The user learns to read the visual language by pairing it with words.
- Hover anywhere → **ambient read-outs**. Click a cell → **the sounding probe**
  drops a dossier. The user discovers that everything visible is queryable.
  Emotion target: **trust.**

### 2.4 Recurring use — Fluency
- The user stops reading the narrator and starts reading the *scene*. A glance at
  the risk weather (green/amber/red atmosphere) and the tremor (ambient
  instability) tells them the headline before any panel opens.
- Muscle memory forms around **postures** (§3.1): flick to Atlas to place a bloom
  geographically, flick to Ephemeris to pull exact numbers for a report.

### 2.5 Expert use — Mastery
- Power users live in **Ephemeris posture** (§12-C): maximum information density,
  every descriptor visible, keyboard-driven, the atmosphere dialled down so the
  numbers dominate — but they can still flick back to Immersion to *show a
  colleague* what the water is doing. The same instrument serves the poster and
  the paper.
- Nothing about mastery requires abandoning beauty; the aesthetic scales down
  gracefully rather than switching to a different, uglier "pro mode."

**The through-line:** *the same scene, read at increasing depth.* We never make
the beginner learn a second app to become an expert.

---

## 3. The core interaction model

### 3.1 The Posture dial — the central innovation
The single most important interaction concept. Instead of choosing between an
*artistic* app and an *analytic* app, the user turns one continuous dial that
sets the **posture** of the instrument — its atmosphere, information density, and
motion budget — over the *same underlying scene and data*.

```
  IMMERSION  ─────────────────────────────  ATLAS  ─────────────────────────────  EPHEMERIS
  (feel)                                    (place)                                (measure)
  max atmosphere                            geographic frame                       max density
  particles, fog, depth                     map basemap + fields + vectors         wireframe + labels + numbers
  narrator prominent                        hydrology & flow foregrounded          every descriptor + colorbar
  motion budget: high                       motion budget: medium                  motion budget: low/frozen
```

- **Immersion** (§12-A): the dark water column, particle sedimentation,
  volumetric fog, cinematic camera. For perceiving and presenting.
- **Atlas** (§12-B): the georeferenced plan-view field-space, satellite basemap,
  glowing hydrology/flow vectors, dashed graticule. For placing phenomena in the
  world. (Only fully available when data carries lat/lon.)
- **Ephemeris** (§12-C): the precision instrument panel — wireframe bounding
  volume, exhaustive labels, colorbars, everything numeric. For measuring and
  reporting.

The dial is not three separate apps — it is a **continuous morph**. Transitions
are animated field cross-fades and camera moves (§9.4), so moving from feeling to
measuring is a smooth physical journey, never a context switch. This directly
resolves the art-vs-rigor tension (§11): rigor and expressiveness become a *user
setting*, not a product decision.

### 3.2 Navigation — orbit, descend, drift
- **Orbit** (drag): as today, but with tuned inertia so the Column feels like a
  suspended object with mass.
- **Descend** (scroll/pinch): the signature new move. Instead of only dollying
  the camera, scrolling *lowers you through the spectral stack*, layers parting
  around you like passing through strata of water. A depth indicator on the axis
  rail shows which channel band you're level with.
- **Drift** (idle): the camera performs a slow procedural orbit when untouched —
  the "living instrument" idle state — and stills the instant you touch it.

### 3.3 Selection — the sounding probe
- Click any cell in any layer → a **probe** drops a thin vertical line through the
  *entire* column at that (row, col), and a dossier opens showing that cell's full
  21-channel signature, z-scores, PCA position, nearest-neighbour cells (drawn as
  faint links in-scene), and variable dependencies. This is the existing pixel
  inspector, promoted from a side panel to an in-scene spatial gesture.
- Shift-click adds probes for **comparison**; two probes draw a difference ribbon
  between their signatures.

### 3.4 Time — the ribbon
- A horizontal **time ribbon** along the bottom edge replaces the playback
  controls. Scrubbing it advects the fields *continuously* (§5.8): the scene
  physically flows from frame to frame rather than snapping. Play/pause is the
  ribbon's transport; speed is its scrub-rate.
- For a single GeoTIFF (one frame) the ribbon collapses to a timestamp chip —
  honest about there being no sequence.

### 3.5 The gesture grammar (consistent everywhere)
| Gesture | Meaning (constant across postures) |
|---|---|
| Drag | Orbit / reframe |
| Scroll / pinch | Descend through the stack (Immersion) / zoom the plane (Atlas/Ephemeris) |
| Click | Sound a cell (probe) |
| Shift-click | Add comparison probe |
| Hover | Ambient read-out |
| `[` / `]` | Step time back / forward |
| `1` / `2` / `3` | Snap posture to Immersion / Atlas / Ephemeris |
| Drag a layer chip | Re-stack the spectral column |
| Double-click a layer chip | Solo that channel |

---

## 4. The visual language

Design-system name: **"Deep Field."** It replaces "Lucid Glass" for the
instrument-space, while a *lightened* variant remains available for accessibility
and print (§11.4).

### 4.1 Composition & spatial organization
- **The data is the monument.** Following every reference image, the data object
  is centred, large, and floats in generous negative space. Chrome lives in the
  margins as hairlines and small type.
- **Measurement scaffolding as frame.** A wireframe bounding box, dashed floor
  graticule, axis triad gizmo, and scale bar frame the data — borrowed from the
  bounding-box scientific plot and the occultation diagram. The scaffold is
  literal (it encodes real extent and scale) *and* atmospheric.
- **Corner-anchored metadata.** Scene metadata (source, provenance, frame, UTC,
  bounding coords) sits in the corners like the "FRAME_60 / CONSTANTINA
  AVRAAMIDES" and "© EPROC 2.6" annotations — present, precise, never central.
- **One focal hierarchy:** (1) the field, (2) the anomaly/front highlights,
  (3) the legend rail, (4) the narrator line, (5) everything else on demand.

### 4.2 Typography
- **Display / labels:** a clean grotesque (e.g. *Inter*, retained) but used in a
  new register — **wide letter-spacing, small sizes, uppercase for scaffolding
  labels** (`WATER PERCOLATION SIMULATION`, `PARTICLE DENSITY INCREASES`) to
  echo the reference posters' hairline-precise annotation feel. Used sparingly.
- **Numerics:** *JetBrains Mono*, tabular figures — retained and *expanded*.
  Every measured quantity is monospaced so columns of numbers align like an
  instrument read-out.
- **Narrator / prose:** Inter, sentence case, comfortable measure — the one place
  language is warm and readable, deliberately contrasting the clipped labels.
- **Hierarchy through position and weight, not boxes.** Like the ephemeris
  diagram, structure comes from placement and tracking, not from cards and
  borders.

### 4.3 Colour philosophy — the encoding law
Colour is **never** decorative. The governing rule:

> **Hue = which variable / which state. Luminance = value. Saturation & alpha =
> confidence/density. Motion = flux. The background is always the darkest thing.**

- **Base canvas:** near-black, cool (`#05070C`–`#0A0E17`), a calibrated void so
  luminous data reads with maximum contrast (all five references live here).
- **The spectral palette:** the 12 raw OLCI bands (400→761 nm) get a palette
  *derived from their actual wavelengths* — violet→blue→cyan→green→amber→crimson
  as you climb the spectrum. This is scientifically honest (the colour *is* the
  wavelength) and produces the reference posters' blue-to-red life you see in
  images 1 and 2.
- **Derived-variable colormaps** (CHL/Viridis-green, aphy/Magma, TSM/Turbo,
  KD490/Ocean, FLH/fluorescence-red, etc.) are **retained** but unified so their
  endpoints share the void as the zero and never fight one another when stacked.
- **Semantic accents (fixed, learnable):**
  - Cyan/teal `#35E0D0` — **flow, hydrology, life, "young"** (ref. 3 rivers, ref. 5)
  - Amber `#F2A93B` — **density, accumulation, caution**
  - Crimson `#F0402A` — **age, high value, danger, "old"** (ref. 1)
  - Violet `#7C5CFF` — **spectral low bands, density overlays** (ref. 3)
  - Green `#3BE06B` — **anomaly / novelty zones** (ref. 3 highlights)
  - White `#EAF0FF` — **structure, wireframe, measurement, text**
- **Colour-blind & accessibility:** every hue encoding is *doubled* by luminance
  and by an optional shape/texture channel; a CVD-safe palette variant and the
  light "Field" theme (§11.4) are switchable.

### 4.4 Iconography
- Iconography goes **line-weight and technical** — thin strokes matching the
  wireframe scaffolding, drawn on a consistent grid (the existing Lucide set,
  re-weighted). Icons are for *actions and postures*, never for data (data is
  never an emoji/glyph — only field, particle, colour, motion).
- A small family of **instrument marks**: the probe (crosshair-drop), the posture
  triad, the layer-chip stack, the anomaly beacon (a ranging reticle).

### 4.5 Materiality & provenance honesty
- **Data has material:** fields render as luminous *fluid/particulate* matter, not
  glossy plastic — subsurface glow, soft depth-fade fog, subtle grain. It should
  read as *sampled light*, echoing the point-cloud references (1, 5).
- **Provenance is visible in the material.** This is a scientific-ethics feature,
  not just style:
  - **Synthetic** data renders with a faint procedural shimmer / dashed
    "simulated" watermark on the scaffold — you can *see* it's not observed.
  - **Real (GeoTIFF/CSV)** data renders solid and grounded, with source + bounding
    coords in the corner.
  - **Derived** layers (FLH, CHL_disagreement) carry a small lineage tag ("derived
    from Oa1…Oa11") so you never mistake a computed product for a raw band.
- This directly serves CAPRI's stated ethic: *"no fabricated scores… everything
  computed from observed values."* The material makes that honesty legible.

### 4.6 The status rail & read-out gutter
- A slim **status rail** (top or side) holds the live UTC clock, live/paused dot,
  source + provenance, active posture, and frame index — the instrument's vitals.
- A **read-out gutter** (a thin margin column) shows whatever the cursor is over:
  variable, value, units, z-score, confidence — always tabular, always mono. This
  replaces scattered numeric cards with one predictable place the numbers live.

### 4.7 Motion principles
- **Physical, not UI-flashy.** Motion obeys implied physics: fields advect,
  particles fall/settle, fog rolls, camera eases with mass. No bouncy springs, no
  gratuitous fades.
- **Motion is a data channel.** Speed of drift = flow magnitude; agitation =
  turbulence/variance; settling = stability. Idle motion is slow; interaction
  quiets it so you can read.
- **Continuity over updates.** Temporal changes *transition* (advect/morph); the
  scene never blinks to a new state (§5.8). This is the CFD-simulation discipline.
- **Restraint by default.** A "reduce motion" setting (and auto-detect of
  `prefers-reduced-motion`) freezes everything to a crisp static instrument for
  accessibility and for expert measurement.

---

## 5. Representing environmental data beyond charts

This is the heart of the brief: *environmental variables become living systems.*
Each mapping below is concrete and tied to an existing CAPRI computation.

### 5.1 The spectral column (replaces the stacked-terrain panel)
- The 21 channels remain a vertical stack, but reconceived as a **water column**:
  a translucent volume you can orbit and *descend through*, each channel a
  luminous stratum. Height = displacement (as today); the new dimension is
  *inhabitability* — you can be inside it.
- Layers can be **lifted apart** (spacing, as today) or **fused** into a single
  volumetric field where channels blend by depth — a true volume rather than
  discrete planes.

### 5.2 Disagreement & structure become terrain (the brief's explicit example)
- The **9 spatial-structure descriptors** already computed (gradient, laplacian,
  variance, entropy, Moran's I, semivariance, patchiness, texture contrast) are
  reframed as **topography**: where datasets/algorithms disagree, or where
  structure is high, the surface *rises into ridges and rifts*. `CHL_disagreement`
  and high-gradient **fronts** render as luminous seams cutting the field —
  exactly the "disagreement as topographic terrain" the brief asks for.
- A front isn't a number in a card; it's a glowing ridge you can see from across
  the scene and fly along.

### 5.3 Regimes become inhabited rooms (the "rooms in the ocean")
- The seeded k-means regime classification and its posterior shares render as
  **spatial membranes**: the latent-space convex hulls (already drawn as overlays)
  become translucent *volumes* draping the field, tinted by regime. The dominant
  regime is the room you're standing in; boundaries between rooms glow.
- Posterior probability = membrane opacity; regime mixing = how much two membranes
  interpenetrate. You *see* a mixing frontier as two coloured fogs bleeding into
  each other, rather than reading "Moderate (Mixing) 42%."

### 5.4 Uncertainty as volumetric fog; confidence as clarity (brief's example)
- Per-cell **confidence** (aerosol-derived, already in the cube) stops being a
  hidden overlay plane and becomes the **clarity of the water itself**. Low
  confidence → volumetric fog thickens, the field there goes hazy and
  desaturated; high confidence → the water is clear and the field is crisp.
- This is honest *and* intuitive: you literally cannot see clearly where the data
  is uncertain — the epistemics are in the optics.

### 5.5 Relationships as a constellation (replaces correlation heatmap)
- The channel correlation/covariance structure (interaction matrix, relationship
  tensor) renders as a **3D constellation**: channels are nodes, correlations are
  luminous edges whose brightness/thickness = |r| and hue = sign
  (cyan = +, crimson = −). Threshold slider prunes weak edges (as today).
- The Pearson-r heatmap is *still available* (Ephemeris posture / numbers drawer)
  — but the default reading is a structure you can orbit, where tightly-coupled
  channels visibly cluster.

### 5.6 The sounding probe dossier (replaces pixel-inspector panel)
- Clicking a cell drops the probe (§3.3). The dossier is a **vertical read of the
  water at that point**: a mono column of all 21 values + units, a small z-score
  spark per channel, the cell's dot placed live in the latent chamber (§6.2), and
  its nearest-neighbour cells lit up *in the scene* as faint links. Everything the
  current inspector shows, spatialised.

### 5.7 Risk weather + the tremor + the anomaly beacon (the human headline)
- The **bloom detector** (risk field, zones, trend, top driver, hotspots,
  fisherman alert) is the app's most human output and gets the strongest ambient
  treatment:
  - **Risk weather:** the whole scene's *atmosphere* tints — a calm clear volume
    for GREEN, a gathering amber haze for AMBER, a charged crimson storm-light for
    RED. You feel the alert level on entering the scene, before reading anything.
  - **Hotspots** pulse as amber/crimson cells with a ranging reticle; the **top
    risk driver** is named in the narrator ("driven by CHL + FLH").
  - **Trend** (growing/retreating) shows as the hotspots *advancing or receding*
    over the last frames — motion, not an arrow glyph.
- **The tremor:** regime-mixing entropy / transition risk becomes a subtle
  *instability* in the scene — a faint shimmer/vibration in high-entropy zones.
  Stable cores are still; tipping points visibly quiver.
- **The anomaly beacon:** the Mahalanobis novelty score + p-value lights a ranging
  reticle on the novel region with its p-value in mono beside it — a genuine
  "sensor caught something" moment, not a table row.

### 5.8 Temporal evolution as advection (brief's example)
- Frame-to-frame change is rendered as **continuous physical transition**: fields
  morph and flow (advected by the flow field), particles carry values downstream,
  fog rolls in and out. Scrubbing the time ribbon is like scrubbing a fluid sim.
  No abrupt update ever — the CFD discipline made literal.

### 5.9 Particles as the base medium (the reference DNA)
- Optionally, any field can be rendered as a **GPU particle field** (like refs 1
  and 5): thousands of points sampled from the grid, coloured by value, sized by
  density, advected by flow, aged by time (young=cyan → old=crimson). This is the
  most direct homage — and it's *meaningful*: particle age can encode data recency
  / persistence, density can encode concentration. A "field ↔ particles ↔ volume"
  toggle lets each channel be shown as a surface, a point cloud, or a volume.

---

## 6. Immersive & spatial visualization

### 6.1 The Column as environment
- Promote the viewport from *a panel among panels* to *the environment the whole
  app lives in*. Controls float over it as hairline overlays; there is no
  separate "3D area" — the 3D **is** the app. (Panels dock as translucent trays
  that summon over the scene and dismiss, never permanently boxing it in.)

### 6.2 The latent chamber (a place, not a modal)
- Today the PCA/UMAP/attractor analysis lives in modals of scatter plots. Reframe
  it as a **second room** you fly to: a 3D **latent chamber** where every cell is
  a point positioned by PCA/UMAP, attractors are glowing wells with dominance =
  depth and stability = steadiness, and regime clusters are coloured nebulae.
- The chamber and the Column are **spatially linked**: probe a cell in the Column
  and its point lights up in the chamber, and vice-versa. Moving between them is a
  camera flight, reinforcing that they're two views of one dataset.

### 6.3 Atlas posture — the world (georeferenced)
- When lat/lon is present, the Atlas posture lays the fields onto a **dark
  satellite/terrain basemap** with a dashed km graticule, scale bar, and glowing
  hydrology/flow vectors — directly channelling reference image 3. Blooms and
  fronts gain geographic truth: *this* estuary, *these* coordinates. Selected
  cells highlight as luminous raster blocks (ref. 3's bright pixels).

### 6.4 Depth, lighting, and cinematics
- **Cinematic lighting:** a soft key light rakes the field to reveal topography,
  subtle subsurface scattering gives the water body; a gentle fog gradient gives
  atmospheric depth (as in every dark reference). Lighting is *diagnostic* — it's
  angled to maximise the readability of ridges/fronts, not for mood alone.
- **Depth-of-field & fog** fall off with distance so the focal field is crisp and
  the surroundings recede, focusing attention (used sparingly, off in Ephemeris).
- **Guided camera paths** (§9.4) let the scene present itself: an "anomaly tour"
  flies you to each novel region; a "front walk" traces the boundary seam.

### 6.5 Ambient feedback
- The instrument is quietly responsive: hovering a layer chip makes that stratum
  glow in-scene; approaching a hotspot swells its reticle; entering a high-tremor
  zone adds the faint shimmer. Feedback is *ambient and peripheral* — you feel the
  instrument acknowledging you without popups.

---

## 7. Paradigms to preserve, paradigms to discard

### 7.1 Preserve (they earn their place)
- **The 3D layered stack** — CAPRI's soul; elevate it, don't replace it.
- **Orthographic plan view** — becomes Atlas posture; genuinely necessary for
  same-scale spatial reading.
- **Per-layer toggle / opacity / reorder / custom colour** — core, kept as fluid
  in-scene controls.
- **The scientific colormaps & legends** — kept and rationalised; a colorbar is
  the honest key to any field and must always be reachable.
- **The auto-generated scientific justification (narrator)** — a quietly brilliant
  feature; promote it to the primary bridge between perception and understanding.
- **The raw-numbers escape hatches** — CSV raw-row inspector, exact stats,
  actual-vs-predicted plots, colorbars. *Scientists must always be able to demand
  the numbers.* These live in a "numbers drawer" and in Ephemeris posture.
- **Client-side, no-telemetry, reproducible/seeded** — architectural values that
  the redesign must not betray.
- **Robustness (WebGL recovery, error boundaries)** — keep every line.

### 7.2 Discard or transform
- **The three-column dashboard shell** → dissolved into one instrument-space with
  summonable trays. The permanent left/right side panels go.
- **Stat cards & KPI tiles as the primary readout** → replaced by the read-out
  gutter + ambient hover + narrator. (The information stays; the *card* as the
  vehicle goes.)
- **Modals for analysis (latent ecology / ML tools)** → become *rooms and trays*
  you fly to or slide in, not context-breaking pop-ups over a frozen app.
- **Neutral "office SaaS" chrome** (rounded frosted cards, avatar chip, generic
  header) → replaced by instrument scaffolding and margin metadata. The signed-in
  email/avatar becomes a tiny corner mark, not a toolbar citizen.
- **Light "Lucid Glass" as the *only* skin** → Deep Field becomes default; the
  light theme is retained as an accessibility/print option, not the identity.
- **Abrupt frame updates** → replaced by advected transitions.
- **Correlation heatmap-first** → constellation-first, heatmap-on-demand.

### 7.3 The test for each paradigm
For every existing UI element we asked: *does it carry information, or does it
merely frame information?* Information-carriers are preserved (often spatialised).
Pure frames (cards, modals, columns, chrome) are dissolved into the instrument.

---

## 8. Information architecture

The app reorganises from *"panels by feature"* to **"one scene, layered depths of
inquiry."** Three spatial zones and a set of summonable trays:

```
CAPRI — Deep Field
│
├─ THE INSTRUMENT-SPACE (always present; posture dial sets its mode)
│   ├─ The Column / Field         ← the 21-channel spectral stack (§5.1)
│   ├─ Scaffolding                 ← bbox, graticule, axis gizmo, scale bar
│   ├─ Legend rail                 ← per-active-channel colorbars (always reachable)
│   ├─ Narrator line               ← auto scientific reading (expandable)
│   ├─ Status rail                 ← UTC, live/paused, source+provenance, posture, frame
│   ├─ Read-out gutter             ← live tabular values under cursor
│   └─ Time ribbon                 ← scrub / play / speed
│
├─ ROOMS (fly-to spatial views, linked to the Column)
│   ├─ Latent chamber              ← PCA/UMAP points, attractors, regime nebulae (§6.2)
│   └─ Atlas                       ← georeferenced basemap + fields + hydrology (§6.3)
│
├─ TRAYS (summon over the scene; dismiss to return)
│   ├─ Source & conditions         ← intake (CSV/GeoTIFF/synthetic/edge), presets,
│   │                                 noise/anomaly/drift/flow, grid resolution
│   ├─ Spectral stack              ← layer list: toggle/opacity/reorder/colour/solo/export
│   ├─ Encodings                   ← spatial-descriptor & relationship & confidence selectors
│   ├─ Driver workbench            ← PLS+VIP+CV, random forest, UMAP controls (§9.6)
│   ├─ Numbers drawer              ← CSV raw rows, exact stats, colorbars, tables
│   └─ Memory (embedders)          ← persisted contrastive embedders library & intake
│
└─ SHELL
    ├─ Posture dial                ← Immersion ↔ Atlas ↔ Ephemeris (§3.1)
    ├─ Instrument state            ← save/load session snapshot (JSON, view-only)
    ├─ Export                      ← layer PNG, scene plate, dossier
    └─ Settings                    ← reduce-motion, theme (Deep Field / Field / CVD), quality
```

**Navigation principle:** depth of inquiry maps to spatial depth. Headline
(narrator + risk weather) is *ambient*; structure (fronts, regimes, relationships)
is *in the Column*; deep analysis (latent chamber, driver workbench) is *a flight
or a tray away*; raw numbers are *always one gesture down*. Nobody is forced
through analysis they don't need, and nothing is more than two moves from view.

---

## 9. Advanced interactions, animations, filters, workflows

### 9.1 Fluid re-stacking
Dragging a layer chip re-orders the column with an **eased physical animation** —
strata slide and re-settle through one another rather than snapping. Solo/mute a
channel and the others part to make room.

### 9.2 Cross-filtering (brushing that spans rooms)
- **Brush** a region in the Column → those cells highlight in the latent chamber,
  in the Atlas, and in the numbers drawer simultaneously (linked selection across
  all views).
- **Range filters:** drag on any colorbar to filter cells to a value band; the
  scene dims out-of-range cells to fog. Filter by regime, by confidence, by risk
  zone, by novelty — each as a scene-wide dimming, not a separate chart.

### 9.3 Time as a first-class dimension
- **Scrub, play, ping-pong, and compare-frames.** Drop two time anchors to see a
  **difference field** (what changed between t₁ and t₂) advected as flow. Trend
  (bloom growing/retreating) reads directly from this.
- **Trails:** optionally leave luminous trails of a hotspot's path over time (the
  particle-age motif), so persistence and drift are visible at a glance.

### 9.4 Cinematic camera & self-presentation
- **Guided tours** the scene can run on itself: *Anomaly tour* (fly to each novel
  region), *Front walk* (trace boundary seams), *Regime survey* (visit each room),
  *Descent* (sink through all 21 strata narrating each). Great for exhibitions,
  teaching, and screen-recording for papers.
- Smooth **posture transitions** (§3.1) are themselves camera+field animations.

### 9.5 Export & storytelling
- **Scene plate export:** render the current scene as a high-res plate *in the
  reference-poster idiom* — dark field, hairline scaffolding, legend rail, corner
  metadata, frame index — publication- and poster-ready. (Layer PNG export is
  retained underneath.)
- **Dossier export:** a probed cell's full signature as a clean report card.
- **Session/instrument-state** save & restore (existing JSON snapshot), so a
  configured view is shareable and reproducible.

### 9.6 The driver workbench (rigour, re-housed)
- PLS+VIP+5-fold CV and random-forest regression keep their exact statistics but
  gain a **spatial payoff**: after fitting, the VIP-weighted drivers can *paint
  the Column* — the field re-colours to show where the chosen target's top drivers
  dominate. The R²/RMSE/VIP/actual-vs-predicted plots remain, verbatim and honest,
  in the workbench tray. Analysis and scene stay coupled.

### 9.7 Ambient, non-blocking feedback
- Long computations (UMAP, RF, embedder ops) run without freezing the scene; the
  instrument keeps breathing and a hairline progress arc reports status in the
  status rail. (Preserves the existing lazy-load + error-boundary architecture.)

---

## 10. Enabling technologies

The current stack — **React + TypeScript + Three.js in a Tauri (Rust) shell,
Vite** — already supports most of this. The redesign *extends* it rather than
rewriting it.

### 10.1 Rendering core
- **Three.js (WebGL2)** — retained; it already drives the stack, overlays,
  ortho/persp cameras, and recovery logic. Most new work is materials + shaders,
  not a new engine.
- **Custom GLSL shaders** for the field material: value→colour mapping on the GPU,
  subsurface glow, fog by confidence, front/edge highlighting, and the
  "field/particle/volume" render modes. Moves per-cell colouring off the CPU
  canvas-texture path onto the GPU.
- **GPU particle systems** (instanced points / transform-feedback or a
  compute-via-fragment ping-pong) for §5.9 — thousands→millions of advected,
  aged, value-coloured particles at 60 fps.
- **Volumetric rendering** (ray-marched 3D textures) for the fused-volume mode and
  the fog/clarity confidence field (§5.4). Scoped to Immersion posture and quality
  budget.
- **Post-processing** (selective bloom on highlights only, DoF, fog) via a
  composer — **carefully**: the existing code *removed* full-screen UnrealBloom
  because sustained multi-target load crashed the Tauri WebView's GL context.
  Lesson honoured: post-effects must be cheap, optional, quality-gated, and
  covered by the existing context-loss recovery.

### 10.2 Compute
- **WebGL/WebGPU compute** for advection, particle update, and field structure so
  the CPU stays free. **WebGPU** where available (browser + newer WebViews), with
  a WebGL2 fallback — CAPRI's client-side-only ethic makes on-device GPU the right
  home for this.
- **Web Workers / WASM** for the heavier science (PCA/Jacobi, k-means, UMAP, PLS,
  RF, spatial tensors) so analysis never blocks the render loop. (Rust in the
  Tauri shell is available for the very heaviest paths.)
- Keep everything **seeded and reproducible** — GPU paths must match the CPU
  reference within tolerance, or stay on CPU. No fabricated smoothness.

### 10.3 UI & motion
- **React** for the tray/overlay layer; **a lightweight state store** (signals or
  Zustand) so scene and UI stay in sync without re-render storms.
- **Motion** via a spring/tween layer for camera and tray choreography;
  field/particle motion lives in shaders.
- **Typography:** Inter + JetBrains Mono (already loaded).

### 10.4 Robustness (non-negotiable, inherited)
- Keep the **WebGL context-loss watchdog, auto-remount, camera-state preservation,
  and per-panel error boundaries** exactly. Every new GPU feature must be
  quality-gated and degrade gracefully on weak hardware and inside the WebView.
- **Quality tiers** (Immersion-max / balanced / Ephemeris-lean) auto-selected from
  detected GPU, user-overridable — so the same app is a showpiece on a workstation
  and a solid instrument on a laptop.

### 10.5 Accessibility tech
- `prefers-reduced-motion` → freezes the sim to a crisp static instrument.
- CVD-safe palette variant; luminance-redundant encodings; full keyboard grammar
  (§3.5); the light "Field" theme for high-ambient-light and print.

---

## 11. Usability trade-offs — art vs. rigour

The central risk of this brief is producing a *beautiful toy*. Explicit
mitigations:

### 11.1 The trade-offs, named
| Risk | Mitigation |
|---|---|
| Dark, atmospheric scenes can hide precise values | The **read-out gutter, colorbars, and Ephemeris posture** guarantee exact numbers are always ≤1 gesture away. Atmosphere never *replaces* the numbers; it *precedes* them. |
| Motion can distract or mislead | Motion is **data-bound** (encodes flux) and **quiets on interaction**; `reduce-motion` freezes it. It is never decorative. |
| Immersion can slow expert tasks | The **posture dial** lets experts dial density up and atmosphere down to a fast, static, number-dense instrument. Beauty is opt-out for speed. |
| Novel metaphors have a learning curve | The **narrator** teaches the visual language in plain words continuously; onboarding call-outs; consistent gesture grammar; nothing hidden behind the metaphor that isn't also in the numbers drawer. |
| Spectacle can erode trust | **Provenance materiality** (§4.5), always-visible **legends/scaffolding/scale**, seeded reproducibility, and the raw-numbers escape hatches keep it audit-grade. |
| GPU features can crash the WebView | Quality tiers + the existing **context-loss recovery**; effects are cheap and optional. |
| Colour-as-meaning fails for CVD users | Redundant luminance/shape encodings + CVD palette. |

### 11.2 The governing principle
> **Perceive first, verify always.** The art gets you to the right question fast;
> the rigour lets you answer it defensibly. Any feature that offers the first
> without the second is rejected.

### 11.3 Measuring success
- **Time-to-headline:** how fast can a user state what the water is doing? (Target:
  seconds, via risk weather + narrator.)
- **Time-to-number:** how fast from a visual to its exact value? (Target: one
  gesture.)
- **Trust:** can an expert always trace a rendered feature back to its computation
  and raw data? (Must be yes.)
- **Fluency curve:** does the beginner become the expert *in the same app*?

### 11.4 Two themes, one instrument
- **Deep Field** (dark) — the identity; best for perceiving, presenting,
  low-light, exhibitions.
- **Field** (light) — a lineage-honouring lightened variant of today's Lucid
  Glass; best for bright rooms, print, and users who prefer it. Same layout, same
  data, inverted canvas. Nobody is forced into the dark.

---

## 12. Conceptual directions

Three coherent design philosophies emerged. **They are not competitors — they are
the three *postures* of §3.1**, and the strong recommendation is to ship all
three as one continuous instrument. Presented separately here so each can be
evaluated on its own.

### 12-A — "The Sounding" (Immersion) — *recommended primary*
**Philosophy:** the app is a dark calibrated volume you descend into; ocean colour
becomes a living water column of light, particle and fog.
**Best at:** perceiving state at a glance, presenting, teaching, wonder.
**Reference DNA:** the RealFlow percolation poster (1), the bounding-box volume
plot (2), the green point-cloud terrain (5).
**Signature moments:** descending through the 21 strata; risk weather tinting the
whole volume; fronts as luminous seams; uncertainty as fog you can't see through.
**Why primary:** it most directly *transforms the experience* the brief targets
while extending CAPRI's existing 3D soul, and it hosts the full ledger.

### 12-B — "The Atlas" (Atlas)
**Philosophy:** the app is a satellite-intelligence table; fields are layered onto
the real world with measured graticule and glowing hydrology.
**Best at:** placing phenomena geographically, operational monitoring, "where
exactly is this bloom?"
**Reference DNA:** the layered city/hydrology satellite map (3), the annotated
ephemeris frame (4).
**Signature moments:** blooms snapping to real coordinates; flow vectors advecting
over a dark basemap; selected cells as luminous raster blocks.
**Role:** the geographic posture — indispensable when data carries lat/lon;
gracefully unavailable when it doesn't.

### 12-C — "The Ephemeris" (Ephemeris)
**Philosophy:** the app is a precision instrument panel; everything is labelled,
measured, and dense; atmosphere yields to information.
**Best at:** rigorous measurement, report-making, expert speed, defensibility.
**Reference DNA:** the occultation diagram (4), the colorbar volume plot (2).
**Signature moments:** wireframe bounding volume with exhaustive axis labels;
every descriptor and colorbar visible; keyboard-driven; the numbers dominate.
**Role:** the trust-and-speed posture — where the science is pulled out to the
last digit. The essential counterweight that keeps the beauty honest.

### 12.1 The recommendation
Ship the **unified instrument**: one dark, calibrated CAPRI whose **posture dial**
morphs continuously from *The Sounding* through *The Atlas* to *The Ephemeris* over
the same scene and data. This single idea resolves the brief's core tension — it
makes "artistic vs. scientific" a **dial the user turns**, not a product we choose
for them. A newcomer arrives in *The Sounding* and feels the ocean; an expert
lives in *The Ephemeris* and trusts every digit; both are the same instrument,
and moving between them is a smooth descent, not a different app.

> *CAPRI does not name the states. It shows you where they begin —*
> *and now, it lets you stand there.*

---

### Appendix — one-screen summary

- **Vision:** a sounding instrument you descend into; state announces itself in
  light, density and motion before you read a number.
- **Core innovation:** the **posture dial** (Immersion ↔ Atlas ↔ Ephemeris) — art
  vs. rigour becomes a user setting over one scene.
- **Design language:** *Deep Field* — dark calibrated void, luminous data,
  measurement scaffolding as frame, hairline margin typography, colour = encoding,
  motion = physics.
- **Data as living systems:** fronts→terrain, regimes→rooms, uncertainty→fog,
  confidence→clarity, relationships→constellation, risk→weather, novelty→beacon,
  time→advection, fields→particles.
- **Preserved:** 100% of the §0 ledger — every channel, analysis, overlay, source,
  export, and the client-side/seeded/robust architecture.
- **Discarded:** the three-column dashboard shell, stat-card-first readouts,
  context-breaking modals, generic SaaS chrome, abrupt updates — dissolved into
  one instrument-space.
- **Tech:** extend the existing Three.js/Tauri stack with GLSL materials, GPU
  particles, optional volumetrics, WebGPU/Workers for compute — all quality-gated
  behind the existing context-loss recovery.
- **Ethic, non-negotiable:** perceive first, verify always. Nothing decorative
  masquerades as data; every rendered feature traces back to a real computation.
