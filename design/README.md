# CAPRI — Design

Blue-sky UX/UI reform work for CAPRI's next-generation experience. Nothing here
is implemented in the shipping app; this folder defines *what the ideal
experience could become* before any engineering decisions.

There are now **two temperaments** of the same vision — both preserve 100% of
the current app's functions, over the same scientific engine:

- **Deep Field** (Reform I) — the *calm* instrument. One monument in a void;
  restraint, focus, presentation-grade.
- **TURBULENCE** (Reform II) — the *storm* instrument. A maximalist, dense,
  cross-linked observatory where many artsy views of the same data are alive at
  once, governed by a master **AGITATION** dial (0 = Deep Field calm, 100 = full
  storm) and a **SOBER hold** that snaps to plain numbers at any moment.

## Contents

| File | What it is |
|---|---|
| [`IMMERSIVE_REDESIGN_PROPOSAL.md`](IMMERSIVE_REDESIGN_PROPOSAL.md) | **Reform I — Deep Field.** The full proposal: design philosophy, emotional journey, interaction model, visual language, data-representation concepts, information architecture, enabling technologies, usability trade-offs, and three conceptual directions. Opens with a **Feature Preservation Ledger** mapping every current capability to where it lands. |
| [`deep-field-concept.html`](deep-field-concept.html) | Interactive companion to Reform I: a live ocean-colour particle field with a working **Immersion / Atlas / Ephemeris** posture dial. Open in a browser — no build step, no external assets. |
| [`TURBULENCE_MAXIMALIST_REFORM.md`](TURBULENCE_MAXIMALIST_REFORM.md) | **Reform II — TURBULENCE.** The maximalist "feel the data" reform. Opens with the **Function Ledger** (§1) proving every existing capability keeps a home, then the 16-lens artsy-visualization catalog (advection particles, LIC vector fields, uncertainty fog, disagreement datamosh, aurora regimes, the Orrery, the Storm System…), the Lens Rack composition system, the AGITATION dial + SOBER hold, and the open questions to settle before building. |
| [`turbulence-console.html`](turbulence-console.html) | Interactive companion to Reform II: the full **console** concept, dense and functional — Intake Manifold, 21-channel Spectral Bank, the living Chamber (particles + vector field + aurora + datamosh + storm radar, all toggleable), Diagnostics Column (storm system, regime mixture, novelty, constellation, narrator), spectral waterfall, time transport, and the Lens Rack with madness presets. Open in a browser — no build step, no external assets. |
| [`TRANSLATION_PRINCIPLES.md`](TRANSLATION_PRINCIPLES.md) | **The design-thinking pivot.** Extracts the recurring communication strategies across all nine reference images and maps each to a *reinterpreted* phytoplankton tool — translating the strategy, never the appearance (e.g. percolation's particle-age → bloom *vitality* via FLH; the CFD box → a real 3-D dimensional reduction). |
| [`phyto-instruments.html`](phyto-instruments.html) | **The translated bench.** A TouchDesigner-style operator bench of six original instruments, each keyed to real ocean-colour variables: **Signature Field** (spectra-in-place, from Rosetta), **Optical Section** (water-type birefringence + fronts-as-grain-boundaries, from petrography), **Latent Volume** (21→3-D reduction, the 3-D sibling of the 2-D UMAP), **Bloom Field** (FLH vitality / TSM turbidity, from percolation), **Density Cartography** (biomass + sensor-agreement, from SOYO + dot-terrain), **Territorial Intel** (coordinate-registered themed layers, from the Po-river map). Open in a browser — no build step. |
| [`TURBULENCE_IMPLEMENTATION_PLAN.md`](TURBULENCE_IMPLEMENTATION_PLAN.md) | **The build plan.** How to get from the Reform II concept to a shipping browser app: extract the scientific engine out of `eef-dashboard` into a shared framework-free `@capri/core` library (verified module-by-module as pure), then build TURBULENCE as a second web app that consumes it. Includes the workspace architecture, the lens→core-function binding table, a WebGL Chamber/LensStack design, and a milestone plan where **every step is a standalone PR that merges green** (M0 safety-net → M1 extraction → M2–M5 the new app). |
| [`PHYTO_PLATFORM_SPEC.md`](PHYTO_PLATFORM_SPEC.md) | **The unified platform spec.** The complete product: one node-based, real-time, computational-media workspace where **the node graph *is* the `@capri/core` pipeline**, the six instruments are its viewports, and **every legacy capability is a first-class operator** (§6 is a full preservation ledger). Covers philosophy, architecture, the six workspace surfaces (Command Bar · Network · Stage · Inspector · Dock · Timeline), linked-selection interaction, the visual/encoding laws (every effect carries a variable), progressive disclosure, technology, and the M2→M6 roadmap. |
| [`platform-shell.html`](platform-shell.html) | Interactive companion to the platform spec: a **workspace mockup** of the whole environment — the Network operator graph, the Stage running all six instruments live with linked selection, the context Inspector (node / probe / selection), the in-world Dock (drag-reorder layer stack, sources, project, export), the Timeline (scrub, difference anchors, provenance), and a `⌘K` operator palette. A design mockup, not the production app. Open in a browser — no build step. |

## The one-line vision

> CAPRI becomes a **sounding instrument you descend into** — a dark, calibrated
> volume where twenty-one channels of ocean colour behave like a living water
> column, and where *state* announces itself through light, density and motion
> before you ever read a number.

## Core principle

**Perceive first, verify always.** Every artistic decision must increase
comprehension. The atmosphere gets you to the right question fast; the rigour
(always-reachable legends, exact numbers, seeded/reproducible math, provenance
made visible) lets you answer it defensibly. **100% of the current app's
capabilities are preserved** — this is a re-housing of a scientific engine, not a
re-scoping of it.
