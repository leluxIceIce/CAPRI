import React from "react";
import { AlertTriangle, ShieldCheck, Waves, Info, Radio, Compass, BarChart2 } from "lucide-react";
import { AnalysisResult, VariableName, VARIABLE_METADATA, DataCube, RootVisualizationState } from "../types";
import { getCSSGradient } from "../utils/colormaps";
import { ColorPickerPopover } from "./ColorPickerPopover";
import { type RootAnalysis } from "../utils/eigenmath";

const VARS: VariableName[] = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490", "FLH", "CHL_disagreement", "OA08", "OA09", "OA10", "OA11", "OA13"];

interface DiagnosticsPanelProps {
  analysis: AnalysisResult;
  dataCube: DataCube;
  layerState: Record<VariableName, { visible: boolean; opacity: number }>;
  onToggleLayer: (name: VariableName) => void;
  onChangeLayerOpacity: (name: VariableName, opacity: number) => void;
  customColors: Partial<Record<VariableName, string>>;
  onChangeCustomColor: (name: VariableName, hex: string) => void;
  onResetCustomColor: (name: VariableName) => void;
  rootAnalysis?: RootAnalysis;
  rootState?: RootVisualizationState;
  onChangeRootState?: (state: RootVisualizationState) => void;
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
  rootAnalysis,
  rootState,
  onChangeRootState
}) => {
  // Translate entropy to risk levels
  const entropyPercent = (analysis.transitionEntropy * 100).toFixed(1);

  // Return conditional styling for regime badge — calm frosted glass well
  const getRegimeColor = (id: number) => {
    return "text-[var(--eef-text)] border-[var(--eef-border)] bg-[var(--eef-inset)]";
  };

  return (
    <div className="@container flex flex-col gap-4 text-[var(--eef-text)] select-none h-full overflow-y-auto pr-1">

      {/* 1. Classification & GMM Posterior probabilities */}
      <div className="glass-panel rounded-lg p-3.5 flex flex-col gap-2.5">
        <div className="flex justify-between items-center">
          <span className="text-[12px] font-semibold text-[var(--eef-text)] flex items-center gap-1.5">
            <Radio size={13} className="text-[var(--eef-accent)] eef-live-dot rounded-full p-0.5" /> Regime classification
          </span>
          <span className="text-[9px] text-[var(--eef-text-3)]">heuristic demo</span>
        </div>
        <p className="text-[9px] text-[var(--eef-text-3)] leading-snug -mt-1">
          Regime score, entropy, and probability mixtures below are computed from
          hand-tuned heuristics for demonstrating the encoding pipeline — not
          outputs of a trained or peer-reviewed model.
        </p>

        {/* Dynamic Big classification badge */}
        <div className={`border rounded-lg p-2.5 flex items-center gap-2.5 h-14 ${getRegimeColor(analysis.regimeId)}`}>
          <Waves size={24} className="stroke-[1.5] text-[var(--eef-accent)]" />
          <div>
            <div className="text-[10px] text-[var(--eef-text-3)]">Primary ocean regime</div>
            <div className="text-sm font-semibold tracking-tight text-[var(--eef-text)]">{analysis.regime}</div>
          </div>
        </div>

        {/* GMM Progress Bars */}
        <div className="flex flex-col gap-1.5 mt-1 border-t border-[var(--eef-divider)] pt-2">
          <span className="text-[10px] font-medium text-[var(--eef-text-3)] block">GMM posterior probability mixtures</span>

          {Object.entries(analysis.probabilities).map(([key, prob]) => {
            const numProb = prob as number;
            const widthPct = `${(numProb * 100).toFixed(1)}%`;

            return (
              <div key={key} className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[var(--eef-text-2)]">{key} upwelling profile</span>
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

      {/* 2. Critical Transitions and Boundary Zone Analytics */}
      <div className="grid grid-cols-1 @sm:grid-cols-2 gap-3">
        
        {/* Entropy / Tipping point Risk Gauge */}
        <div className="glass-panel rounded-lg p-3.5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-medium text-[var(--eef-text-3)] block leading-tight">Tipping point entropy</span>
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

      {/* 3. Novelty Detection and Signatures */}
      <div className={`glass-panel rounded-lg p-3.5 transition-all flex flex-col gap-2 ${
        analysis.isNovel ? "border-[var(--eef-alert)] bg-[var(--eef-alert-soft)]" : ""
      }`}>
        <div className="flex justify-between items-center">
          <span className="text-[12px] font-semibold flex items-center gap-1.5 text-[var(--eef-text)]">
            <Compass size={13} className={analysis.isNovel ? "text-[var(--eef-alert)] eef-live-dot rounded-full p-0.5" : "text-[var(--eef-text-3)]"} /> {analysis.isNovel ? "Critical anomaly alert" : "State system integrity"}
          </span>
          <span className="text-[9px] text-[var(--eef-text-3)]">heuristic p-value</span>
        </div>
        <p className="text-[9px] text-[var(--eef-text-3)] leading-snug">
          Misfit distance and p-value are illustrative heuristics comparing the
          current frame to a synthetic baseline — not a validated statistical test.
        </p>

        <div className="flex justify-between items-baseline mt-1 gap-2">
          <div>
            <div className="text-[9px] text-[var(--eef-text-3)]">Misfit distance score</div>
            <div className="text-lg tnum font-semibold text-[var(--eef-text)]">{analysis.stateNoveltyScore.toFixed(3)}</div>
          </div>

          <div className="text-right">
            <div className="text-[9px] text-[var(--eef-text-3)]">Baseline significance</div>
            <div className="text-[11px] tnum font-semibold text-[var(--eef-text)]">p={analysis.stateNoveltyPValue.toFixed(4)}</div>
          </div>
        </div>

        {analysis.isNovel ? (
          <div className="text-[10.5px] border border-[var(--eef-alert)] bg-[var(--eef-alert-soft)] text-[var(--eef-text)] rounded p-2.5 leading-relaxed mt-1">
            <strong className="text-[var(--eef-alert)]">High system novelty:</strong> Current geospatial signature exceeds 95% threshold of historical baseline archives. Anomaly status is active.
          </div>
        ) : (
          <div className="text-[10px] bg-[var(--eef-ok-soft)] border border-[var(--eef-border)] text-[var(--eef-text-2)] rounded p-2 leading-normal text-center">
            State resides safely within historical margins (confidence {((1.0 - analysis.stateNoveltyPValue) * 100).toFixed(0)}%)
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

      {/* EIGENVALUE ROOT SYSTEM */}
      {rootAnalysis && rootState && onChangeRootState && (
        <div className="glass-panel rounded-lg p-3.5 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h3 className="text-[12px] font-semibold text-[var(--eef-text)] flex items-center gap-1.5">
              <Compass size={11} className="text-[var(--eef-text-3)]" /> Eigenvalue root system
            </h3>
            <button
              onClick={() => onChangeRootState({ ...rootState, visible: !rootState.visible })}
              className={`text-[9px] font-medium px-1.5 py-0.5 rounded border transition-colors ${
                rootState.visible
                  ? "bg-[var(--eef-accent-soft)] border-[var(--eef-accent)] text-[var(--eef-accent)]"
                  : "bg-transparent border-[var(--eef-border)] text-[var(--eef-text-3)]"
              }`}
            >
              {rootState.visible ? "On" : "Off"}
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-[var(--eef-text-3)]">Eigenvalue spectrum (λ₁…λ₉)</span>
            <div className="flex gap-[2px] h-5 items-end">
              {Array.from(rootAnalysis.eigenvalues, (val: number, i: number) => ({ val, i })).map(({ val, i }) => {
                const maxVal = rootAnalysis.eigenvalues[0] || 1;
                const h = Math.max(2, (Math.max(0, val) / maxVal) * 100);
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm transition-all"
                    style={{
                      height: `${h}%`,
                      backgroundColor: i < 3 ? `rgba(46,107,230,${0.7 - i * 0.18})` : "rgba(23,39,64,0.12)",
                    }}
                    title={`λ${i + 1} = ${val.toFixed(3)} (${VARS[i]})`}
                  />
                );
              })}
            </div>
            <span className="text-[9px] text-[var(--eef-text-3)]">
              PC1-3 capture {(rootAnalysis.varianceExplained[2] * 100).toFixed(0)}% of variance
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-[var(--eef-text-3)]">Root clusters</span>
            <div className="flex gap-1 flex-wrap">
              {(() => {
                const counts = new Array(rootAnalysis.clusterCount).fill(0);
                rootAnalysis.clusterLabels.forEach(l => { if (l < counts.length) counts[l]++; });
                const palette = ["#C8553D","#1FA38A","#736AD9","#C2843A","#5A8BC2","#B36AA0","#5A993D","#D97A6A"];
                return counts.map((c, i) => (
                  <span
                    key={i}
                    className="text-[9px] tnum px-1.5 py-0.5 rounded border border-[var(--eef-border)]"
                    style={{ backgroundColor: palette[i % palette.length] + "22", color: palette[i % palette.length] }}
                  >
                    C{i + 1}: {c}
                  </span>
                ));
              })()}
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-[var(--eef-text-3)]">Depth</span>
            <input
              type="range" min="1" max="4" step="1"
              value={rootState.depth}
              onChange={(e) => onChangeRootState({ ...rootState, depth: parseInt(e.target.value) })}
              className="flex-1 h-0.5 bg-[var(--eef-border-strong)] rounded appearance-none cursor-pointer accent-[var(--eef-accent)]"
            />
            <span className="text-[var(--eef-text-2)] tnum w-4 text-right">{rootState.depth}</span>
          </div>

          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-[var(--eef-text-3)]">Opacity</span>
            <input
              type="range" min="0.1" max="1" step="0.05"
              value={rootState.opacity}
              onChange={(e) => onChangeRootState({ ...rootState, opacity: parseFloat(e.target.value) })}
              className="flex-1 h-0.5 bg-[var(--eef-border-strong)] rounded appearance-none cursor-pointer accent-[var(--eef-accent)]"
            />
            <span className="text-[var(--eef-text-2)] tnum w-6 text-right">{(rootState.opacity * 100).toFixed(0)}%</span>
          </div>
        </div>
      )}

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
