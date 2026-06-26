import React, { useMemo, useState } from "react";
import { Sigma, Play, AlertTriangle } from "lucide-react";
import { DataCube, VariableName, VARIABLE_METADATA } from "../types";
import {
  ALL_VARIABLES,
  buildSamples,
  extractColumn,
  subsampleIndices,
} from "../utils/mlData";
import { trainPLSWithCV } from "../utils/plsRegression";
import { CellTooltip, type HoverCell } from "../utils/cellTooltip";
import { loadCached, saveCached } from "../utils/mlCache";

// NOTE: the export name is kept as RFRegressionPanel for import stability, but the
// model is now PLS regression (see below) — random forest was replaced because its
// impurity importance is unreliable on collinear spectral bands.

interface RFRegressionPanelProps {
  dataCube: DataCube;
}

const MAX_TRAIN_SAMPLES = 2000;
const SEED = 42;
// v2 key: the cached result shape changed when we moved RF → PLS, so don't load
// a stale RF summary into the new fields.
const CACHE_KEY = "eef.pls.result.v2";

interface TrainResult {
  target: VariableName;
  features: VariableName[];
  nSamples: number;
  maxComponents: number;
  nComponents: number; // CV-selected
  cvR2: number;
  cvRmse: number;
  vip: { name: VariableName; value: number }[];
  scatter: { actual: number; predicted: number; row: number; col: number }[];
}

/**
 * PLS (Partial Least Squares) regression trainer. Each grid cell is a sample; the
 * chosen target channel is predicted from the other channels. PLS is the
 * chemometrics standard for many COLLINEAR spectral bands — it projects the
 * predictors onto latent components maximising covariance with the target, so its
 * VIP importance stays honest under collinearity (correlated informative bands
 * BOTH score high) where random-forest impurity importance arbitrarily zeroes one
 * of them out. Validation is k-fold cross-validation: a genuine held-out estimate,
 * not a re-substitution score.
 */
export const RFRegressionPanel: React.FC<RFRegressionPanelProps> = ({ dataCube }) => {
  const [target, setTarget] = useState<VariableName>("CHL");
  const [maxComponents, setMaxComponents] = useState(10);
  const [running, setRunning] = useState(false);
  // Rehydrate the last trained model summary for this grid so it survives a modal
  // reopen or an app reload (otherwise lost when the panel unmounts).
  const [result, setResult] = useState<TrainResult | null>(() => loadCached<TrainResult>(CACHE_KEY, dataCube.gridSize));
  const [error, setError] = useState<string | null>(null);
  const [hover, setHover] = useState<HoverCell | null>(null);

  const totalCells = dataCube.gridSize * dataCube.gridSize;
  const willSubsample = totalCells > MAX_TRAIN_SAMPLES;
  const predictorCount = ALL_VARIABLES.length - 1;

  const maxVip = useMemo(
    () => (result ? Math.max(...result.vip.map((i) => i.value), 1e-9) : 1),
    [result]
  );

  const train = () => {
    setError(null);
    setRunning(true);
    setResult(null);
    // Defer so the "Training…" state paints before the synchronous fit blocks.
    setTimeout(() => {
      try {
        const features = ALL_VARIABLES.filter((v) => v !== target);
        const { rows, cellRefs } = buildSamples(dataCube, features);
        const yAll = extractColumn(dataCube, target);

        const idx = subsampleIndices(rows.length, MAX_TRAIN_SAMPLES, SEED);
        const X = idx.map((i) => rows[i]);
        const y = idx.map((i) => yAll[i]);

        // Guard: a constant target has no variance to explain.
        const yMin = Math.min(...y), yMax = Math.max(...y);
        if (yMax - yMin < 1e-9) {
          throw new Error(`${target} is constant across cells — nothing to regress.`);
        }

        const pls = trainPLSWithCV(X, y, features, {
          maxComponents,
          folds: 5,
          seed: SEED,
        });

        const vip = features
          .map((name, j) => ({ name, value: Number.isFinite(pls.vip[j]) ? pls.vip[j] : 0 }))
          .sort((a, b) => b.value - a.value);

        // Thin the scatter so the SVG stays light. cellRefs[idx[i]] is the source
        // grid cell for subsample row i; pls.cvPredicted is aligned to X/y order.
        const step = Math.max(1, Math.floor(y.length / 400));
        const scatter: { actual: number; predicted: number; row: number; col: number }[] = [];
        for (let i = 0; i < y.length; i += step) {
          const ref = cellRefs[idx[i]];
          scatter.push({ actual: y[i], predicted: pls.cvPredicted[i], row: ref.row, col: ref.col });
        }

        const trained: TrainResult = {
          target,
          features,
          nSamples: X.length,
          maxComponents,
          nComponents: pls.nComponents,
          cvR2: pls.cvR2,
          cvRmse: pls.cvRmse,
          vip,
          scatter,
        };
        setResult(trained);
        saveCached(CACHE_KEY, dataCube.gridSize, trained);
      } catch (err: any) {
        setError(err?.message || "Training failed.");
      } finally {
        setRunning(false);
      }
    }, 30);
  };

  // Scatter bounds for actual-vs-predicted plot.
  const scatterBounds = useMemo(() => {
    if (!result) return null;
    const all = result.scatter.flatMap((p) => [p.actual, p.predicted]);
    const lo = Math.min(...all), hi = Math.max(...all);
    const pad = (hi - lo) * 0.05 || 0.1;
    return { lo: lo - pad, hi: hi + pad };
  }, [result]);

  // Position (0–100%) of the VIP = 1 reference line within the bar track.
  const vipOnePct = Math.min(100, (1 / maxVip) * 100);

  return (
    <div className="glass-panel rounded-xl p-4 flex flex-col gap-4 text-[var(--eef-text)]">
      <div className="flex items-center gap-1.5 border-b border-[var(--eef-divider)] pb-3">
        <Sigma size={14} className="text-[var(--eef-accent)]" />
        <h3 className="text-[13px] font-semibold">PLS regression trainer</h3>
      </div>

      <p className="text-[11px] text-[var(--eef-text-2)] leading-relaxed">
        Predicts one channel from the other {predictorCount}, treating every grid cell as a
        training sample. PLS handles collinear bands, so its{" "}
        <span className="font-semibold">VIP</span> importance stays honest where correlated
        bands would confuse a random forest. Validation is{" "}
        <span className="font-semibold">5-fold cross-validation</span> — a real held-out estimate.
      </p>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-[10px] text-[var(--eef-text-3)]">
          Target channel
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value as VariableName)}
            className="bg-[var(--eef-surface-2)] border border-[var(--eef-border)] rounded px-2 py-1.5 text-[11px] text-[var(--eef-text)] cursor-pointer hover:border-[var(--eef-border-strong)]"
          >
            {ALL_VARIABLES.map((v) => (
              <option key={v} value={v}>{v} — {VARIABLE_METADATA[v].unit}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[10px] text-[var(--eef-text-3)]">
          Max components: <span className="text-[var(--eef-text)] font-semibold tnum">{maxComponents}</span>
          <input
            type="range" min="2" max="15" step="1"
            value={maxComponents}
            onChange={(e) => setMaxComponents(parseInt(e.target.value))}
            className="h-1 mt-2 bg-[var(--eef-border)] rounded-lg appearance-none cursor-pointer accent-[var(--eef-accent)]"
          />
        </label>
      </div>

      <button
        onClick={train}
        disabled={running}
        className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[12px] font-semibold text-white bg-[var(--eef-accent)] hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {running ? (
          <><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Training…</>
        ) : (
          <><Play size={13} /> Train on {willSubsample ? `${MAX_TRAIN_SAMPLES} of ${totalCells}` : totalCells} cells</>
        )}
      </button>

      {error && (
        <div className="flex items-start gap-2 text-[11px] text-[var(--eef-alert)] glass-well p-2.5">
          <AlertTriangle size={13} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      {result && (
        <>
          {/* Score cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="glass-well p-3">
              <div className="text-[10px] text-[var(--eef-text-3)]">CV R²</div>
              <div className="tnum text-lg font-semibold" style={{ color: result.cvR2 > 0.5 ? "var(--eef-ok)" : "var(--eef-warn)" }}>
                {Number.isNaN(result.cvR2) ? "—" : result.cvR2.toFixed(3)}
              </div>
              <div className="text-[9px] text-[var(--eef-text-3)]">variance explained (held-out)</div>
            </div>
            <div className="glass-well p-3">
              <div className="text-[10px] text-[var(--eef-text-3)]">CV RMSE</div>
              <div className="tnum text-lg font-semibold text-[var(--eef-text)]">{result.cvRmse.toFixed(4)}</div>
              <div className="text-[9px] text-[var(--eef-text-3)]">{VARIABLE_METADATA[result.target].unit} · {result.nComponents} comp.</div>
            </div>
          </div>

          {/* VIP importances */}
          <div>
            <div className="text-[11px] font-semibold text-[var(--eef-text-2)] mb-1">
              Variable importance (VIP) — what drives {result.target}
            </div>
            <div className="text-[9px] text-[var(--eef-text-3)] mb-2">
              VIP &gt; 1 (dashed line) = above-average influence. Collinear bands can both score high.
            </div>
            <div className="flex flex-col gap-1">
              {result.vip.map((imp) => (
                <div key={imp.name} className="flex items-center gap-2 text-[10px]">
                  <span className="w-28 shrink-0 text-[var(--eef-text-2)]">{imp.name}</span>
                  <div className="relative flex-1 h-3 rounded bg-[var(--eef-inset)] overflow-hidden">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${(imp.value / maxVip) * 100}%`,
                        background: imp.value >= 1 ? "var(--eef-accent)" : "var(--eef-border-strong)",
                      }}
                    />
                    {/* VIP = 1 reference marker */}
                    <div
                      className="absolute top-0 bottom-0 border-l border-dashed"
                      style={{ left: `${vipOnePct}%`, borderColor: "var(--eef-text-3)" }}
                    />
                  </div>
                  <span className="tnum w-10 text-right text-[var(--eef-text-3)]">{imp.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actual vs predicted (cross-validated) */}
          {scatterBounds && (
            <div>
              <div className="text-[11px] font-semibold text-[var(--eef-text-2)] mb-2">
                Cross-validated predicted vs. actual
              </div>
              <div className="relative">
                <svg viewBox="0 0 200 200" className="w-full glass-well" style={{ aspectRatio: "1 / 1" }}>
                  {/* 1:1 reference line */}
                  <line x1="0" y1="200" x2="200" y2="0" stroke="var(--eef-border-strong)" strokeWidth="1" strokeDasharray="3 3" />
                  {result.scatter.map((p, i) => {
                    const span = scatterBounds.hi - scatterBounds.lo || 1;
                    const px = ((p.actual - scatterBounds.lo) / span) * 200;
                    const py = 200 - ((p.predicted - scatterBounds.lo) / span) * 200;
                    return (
                      <circle
                        key={i}
                        cx={px}
                        cy={py}
                        r="2.2"
                        fill="var(--eef-accent)"
                        fillOpacity="0.5"
                        onMouseEnter={() => setHover({ row: p.row, col: p.col, px, py })}
                        onMouseLeave={() => setHover(null)}
                      />
                    );
                  })}
                </svg>
                <CellTooltip cube={dataCube} hover={hover} />
              </div>
              <div className="flex justify-between text-[9px] text-[var(--eef-text-3)] mt-1">
                <span>actual →</span><span>↑ predicted · dashed = perfect</span>
              </div>
            </div>
          )}

          {/* Honest caveat */}
          <div className="rounded-lg p-2.5 text-[9px] text-[var(--eef-text-2)] leading-relaxed" style={{ background: "var(--eef-accent-soft)", border: "1px solid var(--eef-border)" }}>
            Trained on a single frame's cells. Neighbouring cells are spatially
            autocorrelated, so even cross-validated R² is an optimistic upper bound
            on how well this generalises to unseen scenes — read it as relative
            skill across targets, not an absolute accuracy claim.
          </div>
        </>
      )}
    </div>
  );
};
