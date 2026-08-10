#!/usr/bin/env python3
"""
prep.py — OPTIONAL. Bakes raw CSVs into bench/data.js so the HTML opens on real data.

You do NOT need this to use the toolbox: phyto-instruments.html parses CSVs in the
browser via the CSV button. Run this only to change which datasets ship pre-loaded.

    python3 prep.py                       # reads ../capri/datasets/*/source.csv
    python3 prep.py path/to/a.csv b.csv   # or explicit files

Standard library only — no pandas, no numpy, no pip install.
Mirrors the binning in phyto-instruments.html and the column aliases in capri/tiler.py.
"""

import csv
import glob
import json
import math
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "data.js")

# Canonical channel aliases — kept in step with capri/tiler.py COLUMN_NAME_MAP
COLMAP = {
    "chl":      ["chl", "chl_nn", "chl_oc4me", "chlorophyll"],
    "tsm":      ["tsm", "tsm_nn", "total_suspended_matter"],
    "flh":      ["flh", "fluorescence", "fluo"],
    "aphy":     ["aphy", "aphy_443", "aphy443"],
    "kd490":    ["kd490", "kd490_m07", "kd_490"],
    "disagree": ["disagree", "chl_disagreement", "chldis"],
}
LON_AL = ["longitude", "lon", "lng", "long", "x"]
LAT_AL = ["latitude", "lat", "y"]


def find_col(head, aliases):
    """Exact match wins, then substring — same precedence as the JS findCol()."""
    for a in aliases:
        for i, h in enumerate(head):
            if h == a:
                return i
    for a in aliases:
        for i, h in enumerate(head):
            if a in h:
                return i
    return -1


def num(s):
    """'', 'Invalid pos.', 'NaN', -999 sentinels -> None (missing), never 0."""
    if s is None:
        return None
    s = str(s).strip()
    if not s:
        return None
    try:
        v = float(s)
    except ValueError:
        return None
    if v != v or v in (float("inf"), float("-inf")):
        return None
    if v <= -999 or v >= 1e20:
        return None
    return v


def detect_delim(sample):
    return ";" if sample.count(";") > sample.count(",") else ","


def parse(path):
    with open(path, "r", encoding="utf-8-sig", errors="replace") as f:
        text = f.read()
    lines = text.strip().split("\n")
    if len(lines) < 2:
        return None
    delim = detect_delim("\n".join(lines[:50]))
    rdr = csv.reader(lines, delimiter=delim)
    rowsraw = list(rdr)
    head_raw = [c.strip() for c in rowsraw[0]]
    head = [c.lower() for c in head_raw]

    cols, bind = {}, {}
    for k, al in COLMAP.items():
        i = find_col(head, al)
        if i >= 0:
            cols[k], bind[k] = i, head_raw[i]
    if not cols:
        return None

    li, la = find_col(head, LON_AL), find_col(head, LAT_AL)
    geo = li >= 0 and la >= 0
    have = list(cols.keys())

    pts = []
    for row in rowsraw[1:]:
        if len(row) < 2:
            continue
        vals = {k: (num(row[i]) if i < len(row) else None) for k, i in cols.items()}
        if all(v is None for v in vals.values()):
            continue
        rec = {"v": vals}
        if geo:
            lo = num(row[li]) if li < len(row) else None
            lt = num(row[la]) if la < len(row) else None
            if lo is None or lt is None:
                continue
            rec["lon"], rec["lat"] = lo, lt
        pts.append(rec)

    rows = len(pts)
    if not rows:
        return None

    bounds = None
    if geo:
        lo0 = min(p["lon"] for p in pts); lo1 = max(p["lon"] for p in pts)
        la0 = min(p["lat"] for p in pts); la1 = max(p["lat"] for p in pts)
        dx = (lo1 - lo0) or 1.0
        dy = (la1 - la0) or 1.0
        # adaptive grid size — same rule as the browser: step down until >=25% of cells hold data
        n = max(12, min(96, round(math.sqrt(rows / 1.5))))
        while n > 12:
            seen = set()
            for p in pts:
                ix = min(n - 1, int((p["lon"] - lo0) / dx * n))
                iy = min(n - 1, int((la1 - p["lat"]) / dy * n))
                seen.add((iy, ix))
            if len(seen) / float(n * n) >= 0.25:
                break
            n = max(12, int(round(n * 0.8)))
        cells = {k: {} for k in have}
        for p in pts:
            ix = min(n - 1, max(0, int((p["lon"] - lo0) / dx * n)))
            iy = min(n - 1, max(0, int((la1 - p["lat"]) / dy * n)))  # flip: north up
            for k in have:
                v = p["v"][k]
                if v is None:
                    continue
                s, c = cells[k].get((iy, ix), (0.0, 0))
                cells[k][(iy, ix)] = (s + v, c + 1)
        bounds = {"lon": [lo0, lo1], "lat": [la0, la1]}
    else:
        n = max(4, min(96, round(math.sqrt(rows))))
        cells = {k: {} for k in have}
        for r, p in enumerate(pts):
            ix, iy = r % n, r // n
            if iy >= n:
                break
            for k in have:
                v = p["v"][k]
                if v is not None:
                    cells[k][(iy, ix)] = (v, 1)

    cover = [[0] * n for _ in range(n)]
    filled = 0
    for y in range(n):
        for x in range(n):
            if any((y, x) in cells[k] for k in have):
                cover[y][x] = 1
                filled += 1

    grids = {}
    for k in have:
        vals = [s / c for (s, c) in cells[k].values() if c]
        mn, mx = (min(vals), max(vals)) if vals else (0.0, 1.0)
        d = (mx - mn) or 1.0
        grids[k] = [
            [round(((cells[k][(y, x)][0] / cells[k][(y, x)][1]) - mn) / d, 4)
             if (y, x) in cells[k] else 0
             for x in range(n)]
            for y in range(n)
        ]

    def derive(fn):
        return [[round(fn(x, y), 4) for x in range(n)] for y in range(n)]

    if "chl" not in grids:
        grids["chl"] = derive(lambda x, y: 0.4)
    if "tsm" not in grids:
        grids["tsm"] = derive(lambda x, y: 0.3)
    if "flh" not in grids:
        grids["flh"] = derive(lambda x, y: grids["chl"][y][x] * 0.85)
    if "aphy" not in grids:
        grids["aphy"] = derive(lambda x, y: grids["chl"][y][x] * 0.7)
    if "kd490" not in grids:
        grids["kd490"] = derive(lambda x, y: min(1, grids["tsm"][y][x] * 0.5 + grids["chl"][y][x] * 0.4))
    if "disagree" not in grids:
        grids["disagree"] = derive(
            lambda x, y: min(1, grids["tsm"][y][x] * (1 - abs(grids["chl"][y][x] - 0.5) * 1.4) * 1.3))

    diag = [
        "baked by prep.py from %s" % os.path.basename(path),
        "delimiter: '%s'" % delim,
        "columns (%d): %s" % (len(head_raw), ", ".join(head_raw)),
    ]
    for k in have:
        diag.append("bound  %-8s <-  column '%s'" % (k.upper(), bind[k]))
    if geo:
        diag.append("bound  LON/LAT  <-  '%s' / '%s'" % (head_raw[li], head_raw[la]))
        diag.append("bounds: lon %.4f .. %.4f   lat %.4f .. %.4f"
                    % (bounds["lon"][0], bounds["lon"][1], bounds["lat"][0], bounds["lat"][1]))
    else:
        diag.append("WARNING: no lon/lat column -> row-order fallback, geography not meaningful")
    ignored = [h for i, h in enumerate(head_raw)
               if i not in list(cols.values()) + ([li, la] if geo else [])]
    if ignored:
        diag.append("ignored columns (%d): %s" % (len(ignored), ", ".join(ignored)))
    diag.append("rows: %d in file -> %d usable" % (len(rowsraw) - 1, rows))
    diag.append("grid: %dx%d  coverage %d%% (%d cells with data, %d voids)"
                % (n, n, round(100.0 * filled / (n * n)), filled, n * n - filled))
    derived = [k for k in COLMAP if k not in have]
    if derived:
        diag.append("DERIVED (absent from file, synthesised from CHL/TSM): %s"
                    % ", ".join(d.upper() for d in derived))
        diag.append("  -> derived channels are not measurements. Any structure they show "
                    "is a function of CHL/TSM, not independent evidence.")
    if filled / float(n * n) < 0.15:
        diag.append("NOTE: sparse coverage — transect/point sampling rather than a filled raster.")

    return {"n": n, "grids": grids, "cover": cover, "channels": have, "bind": bind,
            "geo": geo, "bounds": bounds, "rows": rows, "filled": filled,
            "voids": n * n - filled, "diag": diag}


def inline_into_html(payload):
    """Bake the datasets straight into the HTML so it ships as ONE self-contained file."""
    html_path = os.path.join(HERE, "phyto-instruments.html")
    if not os.path.exists(html_path):
        print("  (no phyto-instruments.html beside prep.py — skipped --inline)")
        return
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()
    open_tag = '<script id="baked">'
    close_tag = "</script>"
    i = html.find(open_tag)
    if i < 0:
        print("  (no <script id=\"baked\"> slot found — skipped --inline)")
        return
    j = html.find(close_tag, i)
    new = html[:i + len(open_tag)] + "window.BAKED=" + payload + ";" + html[j:]
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(new)
    print("inlined into %s (%.1f KB total, single self-contained file)"
          % (html_path, os.path.getsize(html_path) / 1024.0))


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    inline = "--inline" in sys.argv[1:]
    if args:
        files = args
    else:
        files = sorted(glob.glob(os.path.join(HERE, "..", "capri", "datasets", "*", "source.csv")))

    if not files:
        print("no CSVs found. pass paths explicitly: python3 prep.py file.csv")
        return 1

    out = []
    for path in files:
        name = os.path.basename(os.path.dirname(path))
        if name in ("", "."):
            name = os.path.splitext(os.path.basename(path))[0]
        try:
            p = parse(path)
        except Exception as exc:                                  # noqa: BLE001 - report and continue
            print("  SKIP %-46s %s" % (name, exc))
            continue
        if not p:
            print("  SKIP %-46s no recognizable channel columns" % name)
            continue
        p["name"] = name
        out.append(p)
        cov = 100.0 * p["filled"] / (p["n"] * p["n"])
        print("  OK   %-46s %2dx%-2d  %5d pts  %4.1f%% cover  %s" %
              (name, p["n"], p["n"], p["rows"], cov, "geo" if p["geo"] else "row-order"))

    if not out:
        print("nothing baked.")
        return 1

    payload = json.dumps(out, separators=(",", ":"))
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("/* generated by prep.py — do not edit by hand */\n")
        f.write("window.BAKED=" + payload + ";\n")

    print("\nwrote %s (%.1f KB, %d datasets)" % (OUT, os.path.getsize(OUT) / 1024.0, len(out)))
    if inline:
        inline_into_html(payload)
    print("open phyto-instruments.html and pick a dataset from the menu next to CSV.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
