# CAPRI · TURBULENCE

### A maximalist UX reform — the "feel the data" sibling app

> You didn't lose anything. This document's first job is to prove that: **every
> function in the current app is listed below with its new home** (§1). Its second
> job is the fun one — to go rampage on the UX, and turn CAPRI from a thing you
> *read* into a thing you *feel*, like standing inside a CFD post-processor during
> a storm (§2–§6).

**Read this first — the two-app strategy.** The earlier proposal (*Deep Field / The
Sounding*) is the **calm** instrument: one monument, restraint, presentation-grade,
gentle. This is its opposite twin: **TURBULENCE** — a dense, layered, luminous,
slightly-unhinged **observatory / war-room** where many artsy views of the same
data are alive at once and you compose your own visual madness on top of rigorous
numbers. Same scientific engine underneath. Two temperaments. You can ship one,
the other, or both as switchable "temperaments" of one codebase (recommendation in
§9).

Nothing here is built yet. This is the reform to react to before we build.

---

## 1. The Function Ledger — *everything you have, and where it goes*

This is the part that was missing last time. Below is the **entire** current
`eef-dashboard` feature set. Not a summary — the actual list. Each row keeps its
exact science and gains a maximalist treatment. **Zero features removed.**

### 1.1 Data intake & streaming — *the "Intake Manifold" rail (left)*
| Function (today) | Kept? | In TURBULENCE it becomes |
|---|---|---|
| Synthetic seeded generator | ✅ | A live "source reactor" tile; its procedural nature shown as a faint scanline watermark |
| Presets: coastal / deep-sea / estuary | ✅ | Three "weather fronts" you load — each preloads a scene mood |
| CSV upload (multi-frame playback) | ✅ | Frames become a **film strip** on the time ribbon (§4) |
| CSV raw-row inspector (table + column chart) | ✅ | The **"Ledger" drawer** — raw numbers on demand, unchanged |
| GeoTIFF upload (real observational) | ✅ | Renders "grounded/solid"; provenance + bbox stamped in the corner |
| Edge / sparse-sensor adapter | ✅ | A "sparse feed" mode with visible sample points |
| Grid resolution (N×N) | ✅ | The lattice density dial — visibly re-samples the field |
| Config: speedHz, noiseLevel, currentAnomaly, driftFactor, flowSpeed | ✅ | Five physical "conditions" faders that visibly perturb the sim |
| Play / pause / scrub / reset · live UTC clock · live/paused | ✅ | The **time transport** on the ribbon; UTC + FRAME_### in the corner |

### 1.2 The 21 channels — *the "Spectral Bank" (every one addressable)*
| Function (today) | Kept? | Treatment |
|---|---|---|
| CHL, aphy, ADG, bbp, TSM, PAR, KD490, FLH, CHL_disagreement | ✅ | 9 derived/QA channels, each a live layer with its own lens |
| OA01–OA11, OA13 (12 raw OLCI bands, 400–761 nm) | ✅ | The raw spectrum — coloured by true wavelength; drives the spectral-waterfall (§3.13) |
| Per-variable metadata (label, unit, description) | ✅ | On every hover + in each lens legend |
| Per-variable stats (min / max / mean / std) | ✅ | Live in the readout gutter + on each colorbar's ticks |
| Custom colours (base + peak), persisted | ✅ | Full per-channel palette control, kept |
| Per-variable scientific colormaps (Jet/Magma/Viridis/Turbo/Hot/Ocean/Rainbow/Seismic) | ✅ | Kept as selectable ramps, now GPU shaders |

### 1.3 The 3D field — *the central "Chamber"*
| Function (today) | Kept? | Treatment |
|---|---|---|
| Layered terrain (displaced, colour-mapped surfaces, stacked) | ✅ | The core object — now a fluid, particle-capable volume (§2) |
| Orbit / zoom / pan | ✅ | Kept, with weight + descent (§5) |
| Camera presets: iso / top (ortho plan) / profile | ✅ | Named "vantages"; top = the Atlas map view |
| Layer toggle / opacity / reorder (drag) | ✅ | The Spectral Bank list — drag to re-stack, live |
| displacementGain, spacing, wireframe, labels, grid-floor | ✅ | Kept in the "rig" tray |
| Pixel click → inspector | ✅ | The **Probe** — drops a core sample through the stack (§3.6) |
| PNG export per layer | ✅ | Kept; joined by "plate export" of the whole console (§7) |
| WebGL context-loss recovery + error boundaries | ✅ | Kept verbatim — every line |

### 1.4 Overlays — *stackable "field lenses"*
| Function (today) | Kept? | Treatment |
|---|---|---|
| Spatial-structure overlay: 9 descriptors (gradient dx/dy, laplacian, variance, entropy, Moran's I, semivariance, patchiness, texture-contrast) per variable | ✅ | Become the **vector-field / topography / interference** lenses (§3.2, §3.7) |
| Relationship graph mesh (correlations as 3D edges, threshold) | ✅ | The **Constellation** (§3.11) |
| Confidence overlay plane | ✅ | The **uncertainty fog** (§3.3) |
| Latent-space overlay (PCA distance field + cluster convex hulls) | ✅ | The **Aurora regime membranes** (§3.10) |

### 1.5 Analysis engines — *the "Diagnostics Column" (right)*
| Function (today) | Kept? | Treatment |
|---|---|---|
| Regime classification — seeded k-means (CHL/TSM/ADG/bbp) + posterior shares + regime names | ✅ | Live regime bars + Aurora membranes; math untouched |
| Transition risk / regime-mixing entropy | ✅ | The **Tremor** — the whole console vibrates with instability (§2.4) |
| Spatial front index / boundary-zone (Moran's I + gradient) | ✅ | Fronts as luminous seams + a live index |
| State novelty + p-value (Mahalanobis outlier test) | ✅ | The **Shatter beacon** (§3.12) |
| Auto natural-language scientific justification | ✅ | The **Narrator** ticker — always on, plain words |
| PCA / Jacobi eigen · cell projection · k-means | ✅ | Powers the Latent chamber + Aurora |
| Latent ecology: interaction matrix (Pearson r), attractor landscape (dominance/stability/centroids/variance-explained), regime-transition map, strongest links | ✅ | The **Orrery** — attractors as orbiting bodies (§3.16) + live matrix |
| Pixel inspector: values, z-scores, PCA projection, neighbour similarity, variable dependencies | ✅ | The Probe dossier (§3.6) |
| UMAP embedding | ✅ | The **Nebula** (§3.15) |
| PLS + VIP + 5-fold CV (R², RMSE, actual-vs-predicted) | ✅ | The **Driver Bench** — VIP bars can repaint the field (§8) |
| Random-forest regression | ✅ | Kept in the Driver Bench |
| Bloom detector (GAIA): risk field, zones (green/amber/red), trend, top driver, hotspots, fisherman alert (GREEN/AMBER/RED) | ✅ | The **Storm System** — the console's headline weather (§3.14) |
| Correlation & covariance across channels | ✅ | Feeds Constellation + interference lens |
| Contrastive embedders (persisted, training-data accumulation) | ✅ | The **Memory Bank** — a growing library the instrument learns from |

### 1.6 Session & shell
| Function (today) | Kept? | Treatment |
|---|---|---|
| Save / load session snapshot (JSON, view-settings) | ✅ | Kept — plus lens-stack presets ("madness presets") |
| Persisted custom colours & uploaded cubes | ✅ | Kept |
| Tauri desktop (macOS .dmg) + browser builds | ✅ | Both first-class |
| Update notifier | ✅ | Kept |

> **The contract:** if a row above ever falls out of the design, the design is
> wrong. TURBULENCE is a louder *house* for the same *engine*.

---

## 2. The design philosophy — *organized chaos*

The brief word was **"schizophrenic artsy but still functional, really not
casually."** Here's how those fight and resolve:

- **Maximalist, not minimalist.** Where Deep Field shows one monument in a void,
  TURBULENCE is a **mission-control plate**: a central live field ringed by many
  simultaneous readouts, colorbars, tickers, mini-plots — the density of the
  reference posters (exact ticks, scale bars, page counters, credits, wireframe
  debris) turned up to eleven. Every reference image is a *dense technical plate*;
  we embrace that.
- **Everything alive at once.** Multiple panels animate simultaneously and are
  **cross-linked** — brush the field, and the Nebula, the Orrery, the Storm and
  the numbers all light up together. That linkage is what keeps "many things
  moving" from becoming noise: it's one dataset refracted, not many datasets
  competing.
- **The discipline that earns the chaos** (this is the "still functional / not
  casually" half):
  1. **Every pixel of art is bound to a named variable + a legend.** No decoration
     that could be mistaken for data; no data without a key. (The refs earn their
     density with real tick labels — so do we.)
  2. **A master "AGITATION" dial** (0–100). At 0 it collapses to a calm, near-static
     analytic instrument (basically Deep Field). At 100 it's full storm. *You* set
     how unhinged it gets. Art is a slider, never a lock-in.
     Plus the **SOBER hold**: *hold* `0` and the console instantly snaps to a flat,
     labeled, static readout of exactly what's under your cursor — release, and the
     storm pours back in. One key between hallucination and audit, at all times.
  3. **The numbers are always ≤1 gesture away** — a readout gutter, colorbars with
     real ticks, and the raw-row Ledger drawer.
  4. **Linked selection everywhere** — nothing is an island, so density stays
     navigable.
- **Feel first, verify always.** You should *feel* a bloom as gathering storm-light
  and a front as a tearing seam before you read a single number — then be able to
  read every number.

### 2.1 Visual language — "Storm Optics"
- **Ground:** near-black, cool (`#04060B`), with a faint CRT/scan grain so it reads
  as sampled light, not dead black.
- **Boldness spent on the data**, everything else hairline-white. The spectral
  encoding gradient (violet→cyan→green→amber→crimson, = real wavelength) carries
  the colour; chrome is `#EAF0FF` at low alpha.
- **Semantic accents (learnable, fixed):** cyan `#35E0D0` = flow/life/young · amber
  `#F2A93B` = density/caution · crimson `#F0402A` = age/high/RED alert · violet
  `#7C5CFF` = spectral-low/latent · green `#3BE06B` = novelty/anomaly.
- **Typography:** wide-tracked uppercase micro-labels (the poster-annotation voice)
  + **monospace for every number** (the instrument voice) + one warm sentence-case
  face for the Narrator. Annotation-everywhere, like the ephemeris diagram — but
  every glyph is a real value.
- **Glitch as a *material*, not a gimmick** (see §3.4/§3.5): tearing, chromatic
  separation and datamosh are reserved for **uncertainty and disagreement** — the
  image becomes literally unstable exactly where the data is unreliable. That's the
  most "schizophrenic" idea here, and it's rigorously meaningful.

### 2.2 Motion = physics, always
Drift speed = flow magnitude; agitation/vibration = variance & entropy; settling =
stability; trails = temporal persistence. Idle = slow churn; interaction quiets the
neighbourhood you're reading. `prefers-reduced-motion` freezes it to a crisp plate.

### 2.3 Composition — the console
```
┌───────────────────────────────────────────────────────────────────────────┐
│  RAIL: CAPRI·TURBULENCE   AGITATION▮▮▮▮▯  UTC 22:19:03   FRAME_060   RED ▲   │
├──────────────┬───────────────────────────────────────────┬────────────────┤
│ INTAKE       │                                           │ DIAGNOSTICS     │
│ MANIFOLD     │            THE  CHAMBER                    │ COLUMN          │
│ · source     │   (central live field — lenses stack)     │ · regime bars   │
│ · conditions │       ┌───────────────────────┐           │ · entropy/tremor│
│ · lattice    │       │  particles · vectors  │  legend   │ · novelty shatter│
│              │       │  fog · glitch · aurora │  rail +   │ · STORM system  │
│ SPECTRAL     │       │      + probe core      │  colorbars│ · constellation │
│ BANK (×21)   │       └───────────────────────┘           │ · orrery/nebula │
│ [drag stack] │   corner: provenance · scale · credit     │ · narrator ticker│
├──────────────┴───────────────────────────────────────────┴────────────────┤
│ TIME RIBBON  ◄◄ ▮▮▮▮▮▯▯ ►►   +  SPECTRAL WATERFALL (21 ch)  +  LENS RACK ▤▤▤ │
└───────────────────────────────────────────────────────────────────────────┘
```
Dense on purpose — but every zone is a *known* zone, and the AGITATION dial can
quiet the whole thing.

### 2.4 The Tremor (ambient, whole-console)
Regime-mixing entropy / transition risk drives a *global* subtle agitation: at a
tipping point the whole plate develops a faint tremor and the scan-grain intensifies;
a stable core is calm and sharp. You feel instability in your peripheral vision.

---

## 3. The artsy-visualization catalog — *"what would you add?"*

This is the rampage. **16 stackable "lenses,"** each wild, each bound to a real
CAPRI computation and a real function from §1. You compose them in the **Lens Rack**
(§6) — stack two or three and the field becomes genuinely yours. Every lens ships
with a legend and can be dialled by AGITATION.

**3.1 · Advection particles (RealFlow homage — ref 1).** Each grid cell emits
thousands of GPU particles advected by the flow field; hue = value or **age**
(cyan→crimson), brightness = local density, two emitter modes. *Binds to:* any
channel + flowSpeed + streaming. *Reads:* "where is the water going, and is it
young or old."

**3.2 · Vector field / streaklines (LIC).** The `gradient_dx`/`gradient_dy`
descriptors drive a line-integral-convolution texture — the classic wind-map look —
so structure becomes visible *flow lines*. *Binds to:* spatial-structure engine.
*Reads:* fronts, shear, circulation. (The "electromagnetic / vector-field" reference.)

**3.3 · Volumetric uncertainty fog.** Per-cell confidence becomes 3D fog: low
confidence thickens into haze you literally can't see through. *Binds to:* the
confidence grid. *Reads:* "trust the clear water, distrust the murk."

**3.4 · Disagreement datamosh (the signature move).** `CHL_disagreement` drives
compression-artifact / pixel-sort **glitch**: exactly where the NN and OC4ME
algorithms disagree, the image *tears and smears*. *Binds to:* the QA channel.
*Reads:* unreliable Case-2 water is visually unstable — you can't *not* notice it.

**3.5 · Spectral chromatic aberration.** RGB separation proportional to variance
across the 12 raw OLCI bands — high spectral spread splits the image into colour
fringes. *Binds to:* raw-band stack. *Reads:* spectrally complex water shimmers apart.

**3.6 · The Probe (core sample).** Click any cell → a glowing core drops through the
entire 21-channel stack; a dossier shows values, z-scores, PCA position, and lights
the cell's nearest neighbours *in-scene* as filaments. *Binds to:* pixel inspector.

**3.7 · Breathing topography / iso-contours.** Any descriptor (variance, entropy,
disagreement) rises into terrain with live iso-contours that breathe with time.
*Binds to:* spatial tensor. *Reads:* "disagreement as terrain" — the brief's own idea.

**3.8 · Long-exposure trails.** Temporal persistence rendered as light-trails —
hotspots leave comet tails as they drift frame to frame. *Binds to:* bloom trend +
streaming. *Reads:* motion history at a glance.

**3.9 · Interference / moiré for correlation.** Two chosen channels' correlation
becomes an interference pattern: high |r| = coherent fringes, low = boiling noise.
*Binds to:* relationship tensor. *Reads:* coupling you can *see* beating.

**3.10 · Aurora regime membranes.** k-means regimes render as volumetric aurora
curtains draping the field; posterior share = opacity; **mixing = curtains
interpenetrating** as bleeding light. *Binds to:* regime classification + PCA hulls.
*Reads:* "which room am I in, and where do rooms blur." (The "rooms in the ocean.")

**3.11 · The Constellation (ref 4 star-map).** Channels are stars; correlations are
luminous edges (cyan +, crimson −), brightness = |r|, threshold prunes weak links;
tightly-coupled channels visibly cluster. *Binds to:* correlation/relationship graph.

**3.12 · Novelty Shatter beacon.** The Mahalanobis outlier test cracks the field
locally like stressed glass and fires a ranging reticle + p-value where it caught
something. *Binds to:* state-novelty test. *Reads:* "the sensor found an anomaly."

**3.13 · Spectral waterfall.** The 21 channels as a scrolling spectrogram along the
bottom — a living barcode of the scene over time (audio-style). *Binds to:* full
channel stack + time. *Reads:* the whole spectrum's pulse at once.

**3.14 · The Storm System (bloom weather — the headline).** The GAIA bloom risk
field becomes meteorology: pressure-isobar contours over the risk, a slow **radar
sweep**, hotspots as cells, and the **whole console tints** clear→amber-haze→
crimson-storm by GREEN/AMBER/RED alert. Trend = the storm advancing or receding.
*Binds to:* bloom detector (every part of it). *Reads:* you feel the alert on arrival.

**3.15 · The Nebula (UMAP).** The UMAP embedding as a drifting star-cloud; brush the
field and the matching stars ignite. *Binds to:* UMAP. *Reads:* similarity as a place.

**3.16 · The Orrery (attractors — ref 4 celestial mechanics).** PCA space rendered
as an orbital system: attractors are bodies, **dominance = mass**, **stability =
orbit tightness**, variance-explained = ring radii, cells orbit their attractor.
*Binds to:* latent-ecology attractor analysis. *Reads:* the scene's gravitational
regimes, literally.

> None of these are decoration: each one *is* a function from §1, wearing a costume
> that makes its meaning felt. That's the whole trick — art as a **more legible
> encoding**, not a layer on top.

---

## 4. Time — a first-class, physical dimension
- The **time ribbon** is transport + film-strip (CSV frames as thumbnails). Scrubbing
  **advects** the fields continuously — no snapping; it's a fluid sim you rewind.
- **Two anchors** → a **difference field** (what changed) shown as flow + the bloom
  trend read directly from it.
- Single GeoTIFF → the ribbon honestly collapses to a timestamp chip.
- The **spectral waterfall** (§3.13) is time made spatial along the bottom edge.

---

## 5. Navigation & interaction
- **Orbit / descend / drift** — drag to orbit with mass; scroll to *sink through the
  21 strata* (a depth read-out on the axis rail); idle = slow churn.
- **Brush-to-link** — lasso cells in the Chamber; they light up across Nebula,
  Orrery, waterfall, and the numbers simultaneously.
- **Probe / compare** — click to core-sample; shift-click a second probe → a
  difference ribbon between two signatures.
- **Consistent gesture grammar** across every panel (drag/scroll/click/shift-click/
  hover/`[` `]` time-step/`1-9` lens toggles/`0` = AGITATION to zero = calm mode).

---

## 6. The Lens Rack — artsy filters as a first-class system
The interaction centerpiece. A **rack of stackable lenses** (the 16 of §3) at the
bottom. Drag lenses onto the Chamber to stack them; reorder to change compositing;
each lens has an opacity + an "intensity" bound to AGITATION. Save a stack as a
**"madness preset."** Ships with curated presets:
- **"Fisherman's Storm"** — Storm System + advection particles + trails. (Is it safe?)
- **"Case-2 Chaos"** — datamosh + chromatic aberration + uncertainty fog. (Where's
  the data lying?)
- **"Regime Weather"** — Aurora + vector field + tremor. (What state, and is it tipping?)
- **"Latent Sky"** — Orrery + Nebula + Constellation. (The scene's hidden structure.)
- **"Clean Room"** — AGITATION 0, one lens, colorbars, numbers. (Deep-Field-calm.)

Filters are **composable, meaningful, and reversible** — the artsy freedom is real,
but it never detaches from the science.

---

## 7. Would it still be useful? — *the honest answer: yes, and here's why*
- **Density = bandwidth.** Experts don't want one number at a time; a war-room shows
  many linked readouts so patterns *pop*. The art raises the bandwidth, not the noise.
- **Feeling is faster than decoding.** You spot a tearing datamosh seam or a
  crimson storm-tint in your peripheral vision faster than you parse a table row —
  then you drill to the exact number. Time-to-headline drops; time-to-number stays ~1
  gesture.
- **The AGITATION dial is the safety valve.** Any moment it's "too much," dial it to
  0 and you're holding a sober analytic instrument. Nobody is trapped in the storm.
- **Everything is auditable.** Legends on every lens, colorbars with real ticks,
  seeded/reproducible math, the raw-row Ledger, provenance stamped in the corner. It
  is *art-grade AND audit-grade* — that's the "not casually" bar.
- **Export both ways** — a console "plate" (poster-grade, reference-idiom) *and* the
  plain PNG/CSV/report. It serves the gallery wall and the paper.

**Where it could hurt (and the mitigation):** cognitive overload for newcomers →
onboarding starts at AGITATION ~30 with 1–2 lenses and the Narrator teaching the
language; performance on weak GPUs → quality tiers behind the existing context-loss
recovery, lenses individually toggleable; colour reliance → every hue doubled by
luminance + a CVD palette. It's useful *because* the wildness is governed, not despite it.

---

## 8. Analysis stays rigorous (the Driver Bench)
PLS+VIP+5-fold CV and random forest keep their exact statistics and plots (R², RMSE,
VIP bars, actual-vs-predicted) — but gain a payoff: after a fit, the **VIP weights
can repaint the Chamber**, so you *see where a target's drivers dominate* in space.
Analysis and art stay coupled; the numbers never leave.

---

## 9. Two apps, one engine — the recommendation
- **Deep Field / The Sounding** = calm, focused, presentation, newcomer-friendly.
- **TURBULENCE** = dense, alive, expert, "feel it," exhibition-grade.
- **Recommendation:** build them as **two temperaments of one codebase**, switched by
  the AGITATION dial (0 = Deep Field, up = TURBULENCE) over the *same* shared
  scientific engine and the *same* function set. One app, two moods, zero forks of
  the science. If you'd rather, they can be two separate shells sharing a core —
  but the dial approach is less to maintain and lets a user slide between calm and
  storm mid-session.

---

## 10. What I'd want your steer on (so we can "go over it")
1. **Temperament:** one dial-driven app (recommended), or two distinct apps?
2. **Wildness ceiling:** how far up does AGITATION go by default — tasteful-dense, or
   full glitch-storm?
3. **Top lenses:** which 3–4 of the §3 catalog excite you most? I'll deepen those first.
4. **The glitch idea (§3.4/§3.5):** love it or too much? (It's the boldest call here.)
5. **Platform priority:** browser showpiece, or the Tauri desktop build first?

A companion interactive demo of this console (dense + functional, so you can *see*
the functions living inside the art) ships alongside this doc — open
`turbulence-console.html`.

> *Deep Field lets you stand in the water. TURBULENCE lets you stand in the storm —*
> *and hands you every instrument to prove what you're feeling is real.*
