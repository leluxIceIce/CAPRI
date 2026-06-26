import React, { useMemo, useState } from "react";
import { Trees, Play, AlertTriangle } from "lucide-react";
import { RandomForestRegression } from "ml-random-forest";
import { DataCube, VariableName, VARIABLE_METADATA } from "../types";
import {
  ALL_VARIABLES,
  buildSamples,
  extractColumn,
  subsampleIndices,
  rSquared,
  rmse,
} from "../utils/mlData";
import { CellTooltip, type HoverCell } from "../utils/cellTooltip";
import { loadCached, saveCached } from "../utils/mlCache";

// ml-random-forest ships its feature-importance method at runtime but omits it
// from its .d.ts. Declare just the surface we use.
type RFModel = RandomForestRegression & {
  featureImportance(): number[];
  predictOOB(): number[];
};

interface RFRegressionPanelProps {
  dataCube: DataCube;
}

const MAX_TRAIN_SAMPLES = 2000;
const SEED = 42;
const CACHE_KEY = "eef.rf.result.v1";

interface TrainResult {
  target: VariableName;
  features: VariableName[];
  nSamples: number;
  nTrees: number;
  oobR2: number;
  oobRmse: number;
  importances: { name: VariableName; value: number }[];
  scatter: { actual: number; predicted: number; row: number; col: number }[];
}

/**
 * Random-Forest regression trainer. Each grid cell is a sample; the chosen
 * target channel is predicted from the other 13 channels. Validation uses the
 * forest's OUT-OF-BAG predictions (each tree scores the rows it didn't train
 * on) — a genuine held-out estimate, not a re-substitution score. Feature
 * importances are the library's impurity-reduction importances from the actual
 * trained trees.
 */
export const RFRegressionPanel: React.FC<RFRegressionPanelProps> = ({ dataCube }) => {
  const [target, setTarget] = useState<VariableName>("CHL");
  const [nTrees, setNTrees] = useState(80);
  const [running, setRunning] = useState(false);
  // Rehydrate the last trained model summary for this grid so it survives a modal
  // reopen or an app reload (otherwise lost when the panel unmounts).
  const [result, setResult] = useState<TrainResult | null>(() => loadCached<TrainResult>(CACHE_KEY, dataCube.gridSize));
  const [error, setError] = useState<string | null>(null);
  const [hover, setHover] = useState<HoverCell | null>(null);

  const totalCells = dataCube.gridSize * dataCube.gridSize;
  const willSubsample = totalCells > MAX_TRAIN_SAMPLES;

  const maxImportance = useMemo(
    () => (result ? Math.max(...result.importances.map((i) => i.value), 1e-9) : 1),
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

        const forest = new RandomForestRegression({
          // NOTE: ml-random-forest applies maxFeatures PER TREE (a fixed feature
          // subset for the whole tree), not per split like sklearn. A small value
          // (e.g. sqrt(d)) starves most trees of the real drivers and tanks the
          // score; a 0.7 fraction lets each tree see most channels while still
          // de-correlating the ensemble. (Verified with an OOB-R² smoke test.)
          maxFeatures: 0.7,
          nEstimators: nTrees,
          replacement: true,
          seed: SEED,
          useSampleBagging: true,
          selectionMethod: "mean",
        }) as unknown as RFModel;

        forest.train(X, y);

        // Out-of-bag predictions: genuine held-out validation.
        const oobPred = forest.predictOOB();
        const oobR2 = rSquared(y, oobPred);
        const oobRmse = rmse(y, oobPred);

        const rawImp = forest.featureImportance();
        const importances = features
          .map((name, j) => ({ name, value: Number.isFinite(rawImp[j]) ? rawImp[j] : 0 }))
          .sort((a, b) => b.value - a.value);

        // Thin the scatter so the SVG stays light. cellRefs[idx[i]] is the source
        // grid cell for subsample row i (same flat order throughout), threaded onto
        // each point for the hover tooltip's lat/lon + CHL lookup.
        const step = Math.max(1, Math.floor(y.length / 400));
        const scatter: { actual: number; predicted: number; row: number; col: number }[] = [];
        for (let i = 0; i < y.length; i += step) {
          const ref = cellRefs[idx[i]];
          scatter.push({ actual: y[i], predicted: oobPred[i], row: ref.row, col: ref.col });
        }

        const trained: TrainResult = {
          target,
          features,
          nSamples: X.length,
          nTrees,
          oobR2,
          oobRmse,
          importances,
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

  return (
    <div className="glass-panel rounded-xl p-4 flex flex-col gap-4 text-[var(--eef-text)]">
      <div className="flex items-center gap-1.5 border-b border-[var(--eef-divider)] pb-3">
        <Trees size={14} className="text-[var(--eef-accent)]" />
        <h3 className="text-[13px] font-semibold">Random-forest regression trainer</h3>
      </div>

      <p className="text-[11px] text-[var(--eef-text-2)] leading-relaxed">
        Predicts one channel from the other 13, treating every grid cell as a training
        sample. Validation is the forest's <span className="font-semibold">out-of-bag</span> score
        (each tree is scored only on rows it never saw) — a real held-out estimate.
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
          Trees: <span className="text-[var(--eef-text)] font-semibold tnum">{nTrees}</span>
          <input
            type="range" min="20" max="200" step="20"
            value={nTrees}
            onChange={(e) => setNTrees(parseInt(e.target.value))}
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
              <div className="text-[10px] text-[var(--eef-text-3)]">OOB R²</div>
              <div className="tnum text-lg font-semibold" style={{ color: result.oobR2 > 0.5 ? "var(--eef-ok)" : "var(--eef-warn)" }}>
                {Number.isNaN(result.oobR2) ? "—" : result.oobR2.toFixed(3)}
              </div>
              <div className="text-[9px] text-[var(--eef-text-3)]">variance explained (held-out)</div>
            </div>
            <div className="glass-well p-3">
              <div className="text-[10px] text-[var(--eef-text-3)]">OOB RMSE</div>
              <div className="tnum text-lg font-semibold text-[var(--eef-text)]">{result.oobRmse.toFixed(4)}</div>
              <div className="text-[9px] text-[var(--eef-text-3)]">{VARIABLE_METADATA[result.target].unit}</div>
            </div>
          </div>

          {/* Feature importances */}
          <div>
            <div className="text-[11px] font-semibold text-[var(--eef-text-2)] mb-2">
              Feature importance — what drives {result.target}
            </div>
            <div className="flex flex-col gap-1">
              {result.importances.map((imp) => (
                <div key={imp.name} className="flex items-center gap-2 text-[10px]">
                  <span className="w-28 shrink-0 text-[var(--eef-text-2)]">{imp.name}</span>
                  <div className="flex-1 h-3 rounded bg-[var(--eef-inset)] overflow-hidden">
                    <div className="h-full rounded" style={{ width: `${(imp.value / maxImportance) * 100}%`, background: "var(--eef-accent)" }} />
                  </div>
                  <span className="tnum w-12 text-right text-[var(--eef-text-3)]">{(imp.value * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actual vs predicted (OOB) */}
          {scatterBounds && (
            <div>
              <div className="text-[11px] font-semibold text-[var(--eef-text-2)] mb-2">
                Out-of-bag predicted vs. actual
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
            autocorrelated, so the OOB R² is an optimistic upper bound on how well
            this generalises to unseen scenes — read it as relative skill across
            targets, not an absolute accuracy claim.
          </div>
        </>
      )}
    </div>
  );
};
