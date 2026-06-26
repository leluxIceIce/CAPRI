import React, { useMemo, useState, useRef } from "react";
import { Sparkle, Play, AlertTriangle } from "lucide-react";
import { UMAP } from "umap-js";
import { DataCube, VariableName } from "../types";
import {
  ALL_VARIABLES,
  buildSamples,
  extractColumn,
  standardizeColumns,
  subsampleIndices,
  mulberry32,
} from "../utils/mlData";
import { CellTooltip, type HoverCell } from "../utils/cellTooltip";
import { loadCached, saveCached } from "../utils/mlCache";

interface UmapPanelProps {
  dataCube: DataCube;
}

const MAX_POINTS = 1500;
const SEED = 42;
const CACHE_KEY = "eef.umap.result.v1";

interface EmbedResult {
  points: { x: number; y: number; value: number; row: number; col: number }[];
  colorBy: VariableName;
  nPoints: number;
  valueMin: number;
  valueMax: number;
}

// Self-contained blue→green→yellow ramp for the scatter (no coupling to the 3D
// colormap module). t in [0,1].
function rampColor(t: number): string {
  const stops = [
    [44, 111, 187],  // blue
    [46, 174, 122],  // green
    [245, 208, 32],  // yellow
  ];
  const x = Math.max(0, Math.min(1, t)) * (stops.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const a = stops[i];
  const b = stops[Math.min(stops.length - 1, i + 1)];
  const c = a.map((av, k) => Math.round(av + (b[k] - av) * f));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

/**
 * UMAP dimensionality reduction. Every grid cell's full channel vector is
 * z-scored and projected to 2-D with umap-js (a genuine UMAP implementation),
 * seeded for reproducibility. Points are coloured by a chosen channel so
 * clusters in the embedding can be read against a real variable.
 */
export const UmapPanel: React.FC<UmapPanelProps> = ({ dataCube }) => {
  const [colorBy, setColorBy] = useState<VariableName>("CHL");
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  // Rehydrate the last embedding for this grid so it survives a modal reopen or
  // an app reload (the result is otherwise lost when the panel unmounts).
  const [result, setResult] = useState<EmbedResult | null>(() => loadCached<EmbedResult>(CACHE_KEY, dataCube.gridSize));
  const [error, setError] = useState<string | null>(null);
  const [hover, setHover] = useState<HoverCell | null>(null);
  const runIdRef = useRef(0);

  const totalCells = dataCube.gridSize * dataCube.gridSize;
  const willSubsample = totalCells > MAX_POINTS;

  const runUmap = async () => {
    setError(null);
    setResult(null);
    setProgress(0);
    setRunning(true);
    const myRun = ++runIdRef.current;
    try {
      const { rows, cellRefs } = buildSamples(dataCube, ALL_VARIABLES);
      const { z } = standardizeColumns(rows);
      const colorVals = extractColumn(dataCube, colorBy);

      const idx = subsampleIndices(z.length, MAX_POINTS, SEED);
      const data = idx.map((i) => z[i]);
      const vals = idx.map((i) => colorVals[i]);

      if (data.length < 5) throw new Error("Need at least 5 cells to embed.");

      const nNeighbors = Math.max(2, Math.min(15, data.length - 1));
      const nEpochs = data.length > 800 ? 200 : 400;

      const umap = new UMAP({
        nComponents: 2,
        nNeighbors,
        minDist: 0.1,
        nEpochs,
        random: mulberry32(SEED),
      });

      const embedding = await umap.fitAsync(data, (epoch: number) => {
        if (myRun !== runIdRef.current) return false; // a newer run superseded us
        setProgress(Math.round((epoch / nEpochs) * 100));
        return true;
      });

      if (myRun !== runIdRef.current) return;

      const vMin = Math.min(...vals), vMax = Math.max(...vals);
      // cellRefs[idx[i]] is the source grid cell for embedded point i: buildSamples,
      // extractColumn and the subsample all preserve the same flat cell order, so
      // this threads (row,col) through for the hover tooltip's lat/lon + CHL lookup.
      const points = embedding.map((e, i) => {
        const ref = cellRefs[idx[i]];
        return { x: e[0], y: e[1], value: vals[i], row: ref.row, col: ref.col };
      });
      const embed: EmbedResult = { points, colorBy, nPoints: points.length, valueMin: vMin, valueMax: vMax };
      setResult(embed);
      saveCached(CACHE_KEY, dataCube.gridSize, embed);
    } catch (err: any) {
      if (myRun === runIdRef.current) setError(err?.message || "UMAP failed.");
    } finally {
      if (myRun === runIdRef.current) setRunning(false);
    }
  };

  const bounds = useMemo(() => {
    if (!result) return null;
    const xs = result.points.map((p) => p.x);
    const ys = result.points.map((p) => p.y);
    const xlo = Math.min(...xs), xhi = Math.max(...xs);
    const ylo = Math.min(...ys), yhi = Math.max(...ys);
    const px = (xhi - xlo) * 0.05 || 1, py = (yhi - ylo) * 0.05 || 1;
    return { xlo: xlo - px, xhi: xhi + px, ylo: ylo - py, yhi: yhi + py };
  }, [result]);

  return (
    <div className="glass-panel rounded-xl p-4 flex flex-col gap-4 text-[var(--eef-text)]">
      <div className="flex items-center gap-1.5 border-b border-[var(--eef-divider)] pb-3">
        <Sparkle size={14} className="text-[var(--eef-accent)]" />
        <h3 className="text-[13px] font-semibold">UMAP embedding</h3>
      </div>

      <p className="text-[11px] text-[var(--eef-text-2)] leading-relaxed">
        Projects every cell's {ALL_VARIABLES.length}-channel signature into 2-D. Nearby points have
        similar spectra; clusters suggest distinct regimes. UMAP axes are arbitrary
        and distances are qualitative — read structure, not coordinates.
      </p>

      <div className="grid grid-cols-2 gap-3 items-end">
        <label className="flex flex-col gap-1 text-[10px] text-[var(--eef-text-3)]">
          Colour by
          <select
            value={colorBy}
            onChange={(e) => setColorBy(e.target.value as VariableName)}
            className="bg-[var(--eef-surface-2)] border border-[var(--eef-border)] rounded px-2 py-1.5 text-[11px] text-[var(--eef-text)] cursor-pointer hover:border-[var(--eef-border-strong)]"
          >
            {ALL_VARIABLES.map((v) => (<option key={v} value={v}>{v}</option>))}
          </select>
        </label>
        <button
          onClick={runUmap}
          disabled={running}
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[12px] font-semibold text-white bg-[var(--eef-accent)] hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {running ? (
            <><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" /> {progress}%</>
          ) : (
            <><Play size={13} /> Run UMAP</>
          )}
        </button>
      </div>
      <div className="text-[9px] text-[var(--eef-text-3)] -mt-2">
        {willSubsample ? `Embedding ${MAX_POINTS} of ${totalCells} cells (seeded subsample).` : `Embedding all ${totalCells} cells.`}
      </div>

      {error && (
        <div className="flex items-start gap-2 text-[11px] text-[var(--eef-alert)] glass-well p-2.5">
          <AlertTriangle size={13} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      {result && bounds && (
        <div>
          <div className="relative">
            <svg viewBox="0 0 200 200" className="w-full glass-well" style={{ aspectRatio: "1 / 1" }}>
              {result.points.map((p, i) => {
                const px = ((p.x - bounds.xlo) / (bounds.xhi - bounds.xlo)) * 200;
                const py = 200 - ((p.y - bounds.ylo) / (bounds.yhi - bounds.ylo)) * 200;
                const t = result.valueMax > result.valueMin ? (p.value - result.valueMin) / (result.valueMax - result.valueMin) : 0.5;
                return (
                  <circle
                    key={i}
                    cx={px}
                    cy={py}
                    r="2.4"
                    fill={rampColor(t)}
                    fillOpacity="0.75"
                    onMouseEnter={() => setHover({ row: p.row, col: p.col, px, py })}
                    onMouseLeave={() => setHover(null)}
                  />
                );
              })}
            </svg>
            <CellTooltip cube={dataCube} hover={hover} />
          </div>
          {/* Colour legend */}
          <div className="flex items-center gap-2 mt-2 text-[9px] text-[var(--eef-text-3)]">
            <span className="tnum">{result.valueMin.toFixed(2)}</span>
            <div className="flex-1 h-2 rounded" style={{ background: "linear-gradient(to right, rgb(44,111,187), rgb(46,174,122), rgb(245,208,32))" }} />
            <span className="tnum">{result.valueMax.toFixed(2)}</span>
            <span className="ml-1">{result.colorBy}</span>
          </div>
        </div>
      )}
    </div>
  );
};
