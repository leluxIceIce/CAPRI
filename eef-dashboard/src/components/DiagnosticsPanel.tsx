import React from "react";
import { AlertTriangle, ShieldCheck, Waves, Info, Radio, Compass, BarChart2 } from "lucide-react";
import { AnalysisResult, VariableName, VARIABLE_METADATA, DataCube } from "../types";
import { getCSSGradient } from "../utils/colormaps";
import { ColorPickerPopover } from "./ColorPickerPopover";

interface DiagnosticsPanelProps {
  analysis: AnalysisResult;
  dataCube: DataCube;
  layerState: Record<VariableName, { visible: boolean; opacity: number }>;
  onToggleLayer: (name: VariableName) => void;
  onChangeLayerOpacity: (name: VariableName, opacity: number) => void;
  customColors: Partial<Record<VariableName, string>>;
  onChangeCustomColor: (name: VariableName, hex: string) => void;
  onResetCustomColor: (name: VariableName) => void;
}

export const DiagnosticsPanel: React.FC<DiagnosticsPanelProps> = ({
  analysis,
  dataCube,
  layerState,
  onToggleLayer,
  onChangeLayerOpacity,
  customColors,
  onChangeCustomColor,
  onResetCustomColor,
}) => {
  // Translate entropy to risk levels
  const entropyPercent = (analysis.transitionEntropy * 100).toFixed(1);

  // Return conditional styling for regime badge — calm frosted glass well
  const getRegimeColor = (id: number) => {
    return "text-[var(--eef-text)] border-[var(--eef-border)] bg-[var(--eef-inset)]";
  };

  return (
    <div className="@container flex flex-col gap-4 text-[var(--eef-text)] select-none h-full overflow-y-auto pr-1">

      {/* 1. Critical Transitions and Boundary Zone Analytics — surfaced first so
            the latent / tipping-point entropy reads at the top of the stack. */}
      <div className="grid grid-cols-1 @sm:grid-cols-2 gap-3">

        {/* Entropy / Tipping point Risk Gauge */}
        <div className="glass-panel rounded-lg p-3.5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-medium text-[var(--eef-text-3)] block leading-tight">Regime mixing entropy</span>
            <div className="text-xl tnum font-semibold mt-2 text-[var(--eef-text)]">{entropyPercent}%</div>
          </div>

          <div className="mt-2.5">
            <span className="text-[9px] text-[var(--eef-text-3)] block">Transition risk level</span>
            {analysis.transitionRisk === "High (State Boundary)" ? (
              <span className="inline-flex items-center gap-1 font-semibold text-[10px] text-[var(--eef-alert)] mt-0.5">
                <AlertTriangle size={11} className="text-[var(--eef-alert)]" /> State boundary
              </span>
            ) : analysis.transitionRisk === "Moderate (Mixing)" ? (
              <span className="inline-flex items-center gap-1 font-semibold text-[10px] text-[var(--eef-warn)] mt-0.5">
                <AlertTriangle size={11} className="text-[var(--eef-warn)]" /> Turbid frontier
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 font-semibold text-[10px] text-[var(--eef-ok)] mt-0.5">
                <ShieldCheck size={11} className="text-[var(--eef-ok)]" /> Stable core
              </span>
            )}
          </div>

          {/* Subtle percentage tracker */}
          <div className="h-1 bg-[var(--eef-inset)] rounded-full overflow-hidden mt-2">
            <div
              className="h-full rounded-full transition-all duration-500 bg-[var(--eef-accent)]"
              style={{ width: `${Math.max(5, analysis.transitionEntropy * 100)}%` }}
            />
          </div>
        </div>

        {/* Structural Boundary Front indicator */}
        <div className="glass-panel rounded-lg p-3.5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-medium text-[var(--eef-text-3)] block leading-tight">Spatial front index</span>
            <div className="text-xl tnum font-semibold mt-2 text-[var(--eef-text)]">
              {analysis.isBoundaryZone ? "True" : "False"}
            </div>
          </div>

          <div className="mt-2.5">
            <span className="text-[9px] text-[var(--eef-text-3)] block">Hydrodynamic shift</span>
            <span className="text-[10px] tnum font-semibold text-[var(--eef-text-2)] mt-0.5 block truncate">
              dx={dataCube.stats.CHL.std.toFixed(2)}σ · TSM={dataCube.stats.TSM.std.toFixed(2)}σ
            </span>
          </div>

          {/* Quick explainer */}
          <span className="text-[9px] text-[var(--eef-text-3)] leading-snug mt-2 block">
            {analysis.isBoundaryZone
              ? "High pixel spatial gradients confirm a fluid shear front."
              : "Low local gradient shifts. Core uniform region."
            }
          </span>
        </div>

      </div>

      {/* 2. Classification & GMM Posterior probabilities */}
      <div className="glass-panel rounded-lg p-3.5 flex flex-col gap-2.5">
        <div className="flex justify-between items-center">
          <span className="text-[12px] font-semibold text-[var(--eef-text)] flex items-center gap-1.5">
            <Radio size={13} className="text-[var(--eef-accent)] eef-live-dot rounded-full p-0.5" /> Regime classification
          </span>
          <span className="text-[9px] text-[var(--eef-text-3)]">k-means · seeded</span>
        </div>
        <p className="text-[9px] text-[var(--eef-text-3)] leading-snug -mt-1">
          Regimes are discovered by seeded k-means clustering of this frame's
          cells (CHL/TSM/ADG/bbp). Shares below are the genuine fraction of cells
          in each cluster; names describe each cluster by its own optical level.
        </p>

        {/* Dynamic Big classification badge */}
        <div className={`border rounded-lg p-2.5 flex items-center gap-2.5 h-14 ${getRegimeColor(analysis.regimeId)}`}>
          <Waves size={24} className="stroke-[1.5] text-[var(--eef-accent)]" />
          <div>
            <div className="text-[10px] text-[var(--eef-text-3)]">Primary ocean regime</div>
            <div className="text-sm font-semibold tracking-tight text-[var(--eef-text)]">{analysis.regime}</div>
          </div>
        </div>

        {/* Cluster share bars */}
        <div className="flex flex-col gap-1.5 mt-1 border-t border-[var(--eef-divider)] pt-2">
          <span className="text-[10px] font-medium text-[var(--eef-text-3)] block">Regime cluster shares (fraction of cells)</span>

          {Object.entries(analysis.probabilities).map(([key, prob]) => {
            const numProb = prob as number;
            const widthPct = `${(numProb * 100).toFixed(1)}%`;

            return (
              <div key={key} className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[var(--eef-text-2)]">{key}</span>
                  <span className="tnum font-semibold text-[var(--eef-text)]">{widthPct}</span>
                </div>
                {/* Horizontal progress bar */}
                <div className="h-1 bg-[var(--eef-inset)] rounded-full overflow-hidden w-full">
                  <div
                    className="h-full rounded-full transition-all duration-300 bg-[var(--eef-accent)]"
                    style={{ width: widthPct }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Novelty Detection and Signatures */}
      <div className={`glass-panel rounded-lg p-3.5 transition-all flex flex-col gap-2 ${
        analysis.isNovel ? "border-[var(--eef-alert)] bg-[var(--eef-alert-soft)]" : ""
      }`}>
        <div className="flex justify-between items-center">
          <span className="text-[12px] font-semibold flex items-center gap-1.5 text-[var(--eef-text)]">
            <Compass size={13} className={analysis.isNovel ? "text-[var(--eef-alert)] eef-live-dot rounded-full p-0.5" : "text-[var(--eef-text-3)]"} /> {analysis.isNovel ? "Critical anomaly alert" : "State system integrity"}
          </span>
          <span className="text-[9px] text-[var(--eef-text-3)]">Mahalanobis χ² test</span>
        </div>
        <p className="text-[9px] text-[var(--eef-text-3)] leading-snug">
          Each cell's Mahalanobis distance is tested against the scene's own
          χ²₍0.975₎ threshold. The score is the fraction of multivariate-outlier
          cells; the p-value tests whether that exceeds the 2.5% a Gaussian yields.
        </p>

        <div className="flex justify-between items-baseline mt-1 gap-2">
          <div>
            <div className="text-[9px] text-[var(--eef-text-3)]">Outlier-cell fraction</div>
            <div className="text-lg tnum font-semibold text-[var(--eef-text)]">{(analysis.stateNoveltyScore * 100).toFixed(1)}%</div>
          </div>

          <div className="text-right">
            <div className="text-[9px] text-[var(--eef-text-3)]">vs-Gaussian significance</div>
            <div className="text-[11px] tnum font-semibold text-[var(--eef-text)]">p={analysis.stateNoveltyPValue.toFixed(4)}</div>
          </div>
        </div>

        {analysis.isNovel ? (
          <div className="text-[10.5px] border border-[var(--eef-alert)] bg-[var(--eef-alert-soft)] text-[var(--eef-text)] rounded p-2.5 leading-relaxed mt-1">
            <strong className="text-[var(--eef-alert)]">Anomalous structure:</strong> the scene has significantly more multivariate-outlier cells ({(analysis.stateNoveltyScore * 100).toFixed(1)}%) than a single Gaussian of the same mean/covariance would produce (p={analysis.stateNoveltyPValue.toFixed(3)}).
          </div>
        ) : (
          <div className="text-[10px] bg-[var(--eef-ok-soft)] border border-[var(--eef-border)] text-[var(--eef-text-2)] rounded p-2 leading-normal text-center">
            Outlier fraction is consistent with a single Gaussian population (p={analysis.stateNoveltyPValue.toFixed(3)})
          </div>
        )}
      </div>

      {/* 4. Narrative justification explanation */}
      <div className="glass-panel rounded-lg p-3.5 flex flex-col gap-1.5">
        <span className="text-[12px] font-semibold text-[var(--eef-text)] flex items-center gap-1.5">
          <Info size={13} className="text-[var(--eef-text-3)]" /> Scientific explorer briefing
        </span>
        <p className="text-[10.5px] text-[var(--eef-text-2)] leading-relaxed glass-well p-2 select-text">
          {analysis.scientificJustification}
        </p>
      </div>

      {/* 5. Layer HUD Quick Toggles & Opacity */}
      <div className="glass-panel rounded-lg p-3.5 flex flex-col gap-2">
        <span className="text-[12px] font-semibold text-[var(--eef-text)] flex items-center gap-1.5">
          <BarChart2 size={13} className="text-[var(--eef-text-3)]" /> Layer visibility
        </span>

        <div className="flex flex-col gap-2 mt-1">
          {(Object.keys(VARIABLE_METADATA) as VariableName[]).map((key) => {
            const meta = VARIABLE_METADATA[key];
            const ls = layerState[key] || { visible: true, opacity: 0.70 };

            return (
              <div key={key} className="flex items-center gap-2 text-xs select-none">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={ls.visible}
                  onChange={() => onToggleLayer(key)}
                  className="w-3.5 h-3.5 bg-[var(--eef-inset)] border-[var(--eef-border)] rounded focus:ring-[var(--eef-accent)] focus:ring-1 accent-[var(--eef-accent)]"
                />
                
                {/* Miniature gradient colormap representation — click to customize */}
                <div className="w-8 flex-shrink-0">
                  <ColorPickerPopover
                    label={key}
                    gradient={getCSSGradient(key, customColors[key])}
                    value={customColors[key]}
                    defaultHex={meta.color}
                    onChange={(hex) => onChangeCustomColor(key, hex)}
                    onReset={() => onResetCustomColor(key)}
                  />
                </div>
                
                {/* Name */}
                <span className="w-12 font-semibold ml-1" style={{ color: meta.color }}>{key}</span>

                {/* Opacity slider */}
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={ls.opacity}
                  onChange={(e) => onChangeLayerOpacity(key, parseFloat(e.target.value))}
                  className="flex-1 h-0.5 bg-[var(--eef-border-strong)] rounded appearance-none cursor-pointer accent-[var(--eef-accent)]"
                />

                <span className="text-[10px] tnum text-[var(--eef-text-3)] w-6 text-right">{(ls.opacity * 100).toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
