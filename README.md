<div align="center">

# CAPRI

### a state-discovery framework for algal activity and assesment

</div>

<img width="1080" height="1350" alt="AlgalBLOOM _1  - 1" src="https://github.com/user-attachments/assets/128f0c24-c1c4-4a66-9ef6-36f5c47797c4" />


---

> **The ocean has no walls, yet it holds rooms.**
>
> CAPRI stacks twenty-one channels of Sentinel-3 ocean colour — raw spectral
> bands and the biogeochemistry drawn from them — into a navigable terrain you
> can orbit, lift apart, and enter. Where the colour of water settles into
> recurrence, a state appears.
>
> The framework does not name these states. It shows you where they begin.

---

## Download

Grab the latest build from **[Releases](https://github.com/leluxIceIce/CAPRI/releases/latest)**:

- **`…aarch64.dmg`** — macOS (Apple Silicon) desktop app. Open it, drag to Applications.
  It's an **unsigned beta**, so on first launch right-click the app → **Open** → **Open**.
- **`capri-source-….zip`** — the full source for that release, to read or build yourself.

### No-install option — `bench/phyto-instruments.html`

Double-click it. One self-contained file: no terminal, no server, no internet, no install.
Six instruments, the real datasets baked in, and drag-in support for your own CSVs (parsed
locally — nothing is uploaded). See [`bench/README.md`](bench/README.md).

> `capri/eef_viewer.html` is the **legacy** viewer. It requires `python capri/server.py`
> running *and* internet access for its CDN scripts. Use `bench/` instead.

## What it is

A satellite scene carries 21 (or more) Sentinel-3 OLCI channels per pixel — raw
spectral bands and the products derived from them: chlorophyll, phytoplankton
absorption, backscatter, suspended sediment, light attenuation, fluorescence.
Read flat, in a table, that structure stays hidden. CAPRI renders it as a
**navigable 3D stack of spatial layers** — each variable given height and
colour — and then reads the stack for *state*: the regimes, fronts, and
anomalies a single flat map keeps to itself.

It runs entirely on your machine. No account, no server, no telemetry.

**Make sure to include the following bands: Oa1-Oa11,Oa13,ADG443_NN, CHL_NN, KD490_M07, PAR, TSM_NN, aphy_443, bbp_443, latitude, longitude**

## Inside

- **A layered terrain** — every channel becomes a displaced, colour-mapped
  surface. Orbit it, drag the layers into any order, toggle each one, drop into a
  true orthographic *plan* view where every layer reads at the same scale.
- **UMAP** — projects each cell's full spectral signature into a 2-D map so
  similar water lands together and regimes separate as clusters.
- **PLS regression + VIP** — asks *what drives* a chosen variable. Partial Least
  Squares is built for collinear spectral bands, so its importance scores stay
  honest where correlated bands would mislead a random forest. Validated by
  5-fold cross-validation.
- **Correlation & latent ecology** — the relationships and covariances between
  all channels, plus a PCA/k-means read of recurring regimes.
- **Embedders** *(in progress)* — create and persist contrastive embedders,
  feeding them scenes over time; the learned encoder is the next step.
- **Real data in** — synthetic streams for exploration, or your own
  **GeoTIFF** / **CSV** / sparse-sensor data. Derived products (e.g. ESA-standard
  Fluorescence Line Height) are computed from the raw bands, not invented.

Everything is computed from the observed (or uploaded) values, seeded for
reproducibility — no fabricated scores.

## Build from source

```bash
cd eef-dashboard
npm ci
npm run dev          # http://localhost:5173  — the dashboard in your browser
npm run tauri:build  # build the native macOS app (.dmg)
```

The shipping application lives in [`eef-dashboard/`](eef-dashboard) — a
TypeScript / React + Three.js front end in a Tauri (Rust) shell.

## Status

An honest beta. The macOS builds are unsigned; contrastive-embedder *training*
is not yet wired (the tab accumulates and persists training data today). Read
the in-app scores as relative skill across a single scene, not absolute accuracy.

## License

[Apache-2.0](LICENSE) — permissive, with an explicit patent grant. Use it, fork
it, build on it.
