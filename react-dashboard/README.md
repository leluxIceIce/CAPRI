# EEF — Ecological Encoding Dashboard (React prototype)

An interactive 3D, real-time geospatial telemetry dashboard for the Ecological
Encoding Framework (EEF). Built as a client-side React + Vite + Three.js
prototype with a glassmorphic UI, live telemetry-stream simulator, CSV ingestion
and playback, and a scientific diagnostics panel. Also packages to a standalone
macOS desktop app (`.dmg`) via Electron.

> This is the standalone React prototype/dashboard. It lives alongside the main
> CAPRI platform (`../capri` Python backend + `../frontend` TypeScript app) but
> runs entirely on its own — no backend required.

## Features

- **Real-time 3D terrain HUD** — 7 stacked spectral variables (CHL, aphy, ADG,
  bbp, TSM, PAR, KD490) rendered as a 20×20 multi-layer Three.js terrain with
  orbit / zoom / spacing controls.
- **Stream signal modulators** — live sliders for flow velocity, Gaussian noise,
  thermal-front anomalies, sensor drift, and stream refresh rate.
- **CSV Playback** — drag-and-drop a 20×20 cell-vector CSV; frames are played
  back and persisted across reloads via `localStorage`.
- **Custom colormaps** — click any gradient strip to set a per-variable hex
  color; ramps are generated from the hex and applied live to the 3D heatmap.
- **Scientific diagnostics** — regime classification, tipping-point entropy,
  spatial-front index, and a heuristic novelty p-value (clearly labelled as
  illustrative heuristics, not a trained model).
- **Resizable panel layout** — draggable, container-query-aware panels.

## Live site

The app is deployed to **[leluxiceice.github.io/CAPRI](https://leluxiceice.github.io/CAPRI/)** and auto-redeploys
from `main` via `.github/workflows/deploy-pages.yml`. It has two routes (client-side,
`react-router-dom` `HashRouter`):

- `/` — landing page: project description, how-to-use guide, interactive resource cards
- `/dashboard` — the full interactive 3D telemetry console described below

The packaged Electron `.dmg` build skips the landing page and opens straight to `/dashboard`.

## Run locally

**Prerequisites:** Node.js 18+

```bash
cd react-dashboard
npm install
npm run dev        # http://localhost:3000
```

## Build the macOS desktop app

```bash
npm run electron:build   # outputs dist/EEF Dashboard-<version>-arm64.dmg
```

Drag the resulting `.dmg` to `/Applications` to install. The build is unsigned
(no Apple Developer ID), so on first launch use right-click → Open to bypass
Gatekeeper.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server on port 3000 |
| `npm run build` | Production web build to `dist/` |
| `npm run lint` | `tsc --noEmit` type-check |
| `npm run electron:preview` | Build + run the Electron shell |
| `npm run electron:build` | Build + package the macOS arm64 `.dmg` |

## Stack

React 19 · Vite 6 · Tailwind CSS v4 · Three.js (r0.184) ·
react-resizable-panels · Electron 33 (packaging only).

## Optional: Gemini API

`.env.example` documents a `GEMINI_API_KEY` slot inherited from the AI Studio
scaffold. The dashboard runs fully without it; copy `.env.example` to `.env` and
fill it in only if you wire up Gemini-backed features.
