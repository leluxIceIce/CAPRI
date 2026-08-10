# CAPRI · Phyto-Instruments bench

**Double-click `phyto-instruments.html`. That's it.**

No terminal. No server. No internet. No install. One file, opens in any browser, works
offline. The five real datasets from `capri/datasets/` are already baked in — pick one
from the dropdown next to `CSV ↑`.

> If you remember a viewer that needed a terminal, that was the *old* one:
> `capri/eef_viewer.html` calls `fetch('/api/analyze')` (needs `python capri/server.py`)
> and loads three.js + PapaParse from a CDN (needs internet). This bench replaces it and
> has **zero** external dependencies.

## Using your own data

Press `CSV ↑` and choose any CSV. It is parsed **in the browser** — nothing is uploaded
anywhere. Then press `LOG` to see exactly what happened.

### What the CSV needs

| Column | Accepted spellings |
|---|---|
| longitude | `longitude`, `lon`, `lng`, `long`, `x` |
| latitude | `latitude`, `lat`, `y` |
| CHL | `CHL`, `CHL_NN`, `CHL_OC4ME`, `chlorophyll` |
| TSM | `TSM`, `TSM_NN`, `total_suspended_matter` |
| FLH | `FLH`, `fluorescence`, `fluo` |
| APHY | `APHY`, `aphy_443` |
| KD490 | `KD490`, `KD490_M07`, `kd_490` |

Aliases match `capri/tiler.py`'s `COLUMN_NAME_MAP`, so anything the Python tiler accepts,
this accepts. `,` and `;` delimiters are both detected automatically. **Only a channel
column is strictly required** — but without `longitude`/`latitude` the points fall back to
file order and the geography is meaningless (the log warns you loudly).

### How your points become a field

Points are **binned onto a lat/lon grid** — not reshaped in file order. The grid size is
chosen automatically so at least ~25% of cells hold data, because transect and coastline
sampling is line-shaped and over-resolving it produces a mostly-empty map.

Cells with no samples are **voids**: they render as empty, are excluded from
normalisation, and are skipped by hotspot detection and the latent sampler. Nothing is
invented to fill them.

Values that are not numbers — `Invalid pos.`, blanks, `NaN`, or sentinels like `-999` —
are treated as **missing**, never as `0`.

## The LOG button

Press `LOG` for a full ingest report: delimiter, every column found, what bound to which
channel, what was ignored, how many rows were dropped and why, grid size, coverage,
geographic bounds, per-channel raw ranges, and which channels were *derived* rather than
measured.

**`COPY` puts the whole report on your clipboard.** If a dataset renders oddly, paste that
report — it usually identifies the cause immediately.

> Watch for the `DERIVED` line. If your file has no FLH column, FLH is synthesised as
> `CHL × 0.85`, so any FLH-vs-CHL structure is arithmetic, not evidence.

## `prep.py` — optional

Only needed to change which datasets ship pre-loaded. Standard library only; no pandas,
no numpy, no `pip install`.

```bash
python3 prep.py              # bake ../capri/datasets/*/source.csv into the HTML
python3 prep.py a.csv b.csv  # bake specific files
python3 prep.py --no-inline  # write data.js only, leave the HTML untouched
```

Datasets are baked **into** `phyto-instruments.html` by default, so it stays one
self-contained file that needs no sibling files and makes **no network requests at all**.
`data.js` is just a by-product you can ignore.

## Instruments

| # | Instrument | Reads |
|---|---|---|
| 1 | Signature Field | CHL colourmap + iso-contours + 21-band spectra in place |
| 2 | Optical Section | optical water type, fronts as grain boundaries |
| 3 | Latent Volume | 3 channels **you choose** on X/Y/Z, k-means clusters (k = 2–6) |
| 4 | Bloom Field | FLH vitality, CHL biomass, TSM as literal blur |
| 5 | Density Cartography | biomass stipple, confident squares vs uncertain dots |
| 6 | Territorial Intel | graticule, themed layers, data-driven hotspots |

Keys `1`–`6` solo an instrument, `0` shows the mosaic, `space` plays/pauses.
`SAVE ↓` / `LOAD ↑` round-trip every parameter as JSON.
