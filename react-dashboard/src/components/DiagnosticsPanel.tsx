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
  onResetCustomColor
}) => {
  // Translate entropy to risk levels
  const entropyPercent = (analysis.transitionEntropy * 100).toFixed(1);

  // Return conditional styling for regime badge - updated to pristine monochromatic frosted glass
  const getRegimeColor = (id: number) => {
    return "text-white border-white/20 bg-white/5 shadow-[0_0_12px_rgba(255,255,255,0.03)]";
  };

  return (
    <div className="@container flex flex-col gap-4 text-white select-none h-full overflow-y-auto pr-1">
      
      {/* 1. Classification & GMM Posterior probabilities */}
      <div className="glass-panel rounded-lg p-3.5 flex flex-col gap-2.5">
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 flex items-center gap-1.5">
            <Radio size={13} className="text-white/60 pulse-teal-glow rounded-full p-0.5" /> REGIME CLASSIFICATION
          </span>
          <span className="text-[9px] font-mono text-white/40">heuristic demo</span>
        </div>
        <p className="text-[9px] text-white/30 leading-snug font-mono -mt-1">
          Regime score, entropy, and probability mixtures below are computed from
          hand-tuned heuristics for demonstrating the encoding pipeline — not
          outputs of a trained or peer-reviewed model.
        </p>

        {/* Dynamic Big classification badge */}
        <div className={`border rounded-lg p-2.5 flex items-center gap-2.5 h-14 ${getRegimeColor(analysis.regimeId)}`}>
          <Waves size={24} className="stroke-[1.5] text-white/80" />
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/50">Primary Ocean Regime</div>
            <div className="text-sm font-extrabold tracking-tight">{analysis.regime}</div>
          </div>
        </div>

        {/* GMM Progress Bars */}
        <div className="flex flex-col gap-1.5 mt-1 border-t border-white/5 pt-2">
          <span className="text-[10px] font-bold font-mono text-white/40 block">GMM POSTERIOR PROBABILITY MIXTURES:</span>
          
          {Object.entries(analysis.probabilities).map(([key, prob]) => {
            const numProb = prob as number;
            const widthPct = `${(numProb * 100).toFixed(1)}%`;
            const colorClass = "bg-white";
            const textStyle = "text-white/80";

            return (
              <div key={key} className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[11px] font-mono">
                  <span className={textStyle}>{key} Upwelling Profile</span>
                  <span className="font-bold">{widthPct}</span>
                </div>
                {/* Horizontal progress bar */}
                <div className="h-1 bg-white/5 rounded-full overflow-hidden w-full">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${colorClass}`}
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
            <span className="text-[10px] font-bold font-mono text-white/40 block leading-tight uppercase tracking-wider">Tipping point Entropy</span>
            <div className="text-xl font-mono font-black mt-2 text-white/95">{entropyPercent}%</div>
          </div>
          
          <div className="mt-2.5">
            <span className="text-[9px] font-mono text-white/40 block">TRANSITION RISK LEVEL:</span>
            {analysis.transitionRisk === "High (State Boundary)" ? (
              <span className="inline-flex items-center gap-1 font-bold text-[10px] text-white font-mono mt-0.5">
                <AlertTriangle size={11} className="text-white fill-white/15" /> STATE BOUNDARY
              </span>
            ) : analysis.transitionRisk === "Moderate (Mixing)" ? (
              <span className="inline-flex items-center gap-1 font-bold text-[10px] text-white/90 font-mono mt-0.5">
                <AlertTriangle size={11} className="text-white/80 fill-white/10" /> TURBID FRONTIER
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 font-bold text-[10px] text-white/80 font-mono mt-0.5">
                <ShieldCheck size={11} className="text-white/80" /> STABLE CORE
              </span>
            )}
          </div>
          
          {/* Subtle percentage tracker */}
          <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-2">
            <div
              className="h-full rounded-full transition-all duration-500 bg-white"
              style={{ width: `${Math.max(5, analysis.transitionEntropy * 100)}%` }}
            />
          </div>
        </div>

        {/* Structural Boundary Front indicator */}
        <div className="glass-panel rounded-lg p-3.5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold font-mono text-white/40 block leading-tight uppercase tracking-wider">Spatial Front Index</span>
            <div className="text-xl font-mono font-black mt-2 text-white/95">
              {analysis.isBoundaryZone ? "TRUE" : "FALSE"}
            </div>
          </div>

          <div className="mt-2.5">
            <span className="text-[9px] font-mono text-white/40 block">HYDRODYNAMIC SHIFT:</span>
            <span className="text-[10px] font-mono font-bold text-white/90 mt-0.5 block truncate">
              dx={dataCube.stats.CHL.std.toFixed(2)}σ · TSM={dataCube.stats.TSM.std.toFixed(2)}σ
            </span>
          </div>

          {/* Quick explainer */}
          <span className="text-[9px] text-white/30 leading-snug font-mono mt-2 block">
            {analysis.isBoundaryZone 
              ? "High pixel spatial gradients confirm a fluid shear front."
              : "Low local gradient shifts. Core uniform region."
            }
          </span>
        </div>

      </div>

      {/* 3. Novelty Detection and Signatures */}
      <div className={`glass-panel rounded-lg p-3.5 transition-all flex flex-col gap-2 ${
        analysis.isNovel ? "border-white/30 bg-white/10" : ""
      }`}>
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-white/90">
            <Compass size={13} className={analysis.isNovel ? "pulse-teal-glow rounded-full p-0.5" : ""} /> {analysis.isNovel ? "CRITICAL ANOMALY ALERT" : "STATE SYSTEM INTEGRITY"}
          </span>
          <span className="text-[9px] font-mono text-white/40">heuristic p-value</span>
        </div>
        <p className="text-[9px] text-white/30 leading-snug font-mono">
          Misfit distance and p-value are illustrative heuristics comparing the
          current frame to a synthetic baseline — not a validated statistical test.
        </p>

        <div className="flex justify-between items-baseline mt-1 gap-2">
          <div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-white/50">Misfit Distance Score</div>
            <div className="text-lg font-mono font-bold text-white/95">{analysis.stateNoveltyScore.toFixed(3)}</div>
          </div>

          <div className="text-right">
            <div className="text-[9px] font-mono uppercase tracking-widest text-white/50">Baseline Significance</div>
            <div className="text-[11px] font-mono font-extrabold text-white">p={analysis.stateNoveltyPValue.toFixed(4)}</div>
          </div>
        </div>

        {analysis.isNovel ? (
          <div className="text-[10.5px] border border-white/20 bg-white/5 text-white/90 rounded p-2.5 leading-relaxed font-mono mt-1">
            ▫ <strong>HIGH SYSTEM NOVELTY:</strong> Current geospatial signature exceeds 95% threshold of historical baseline archives. Anomaly status is active.
          </div>
        ) : (
          <div className="text-[10px] bg-white/3 border border-white/5 text-white/80 rounded p-2 leading-normal font-mono text-center">
            ✔ State resides safely within historical margins (Confidence {((1.0 - analysis.stateNoveltyPValue) * 100).toFixed(0)}%)
          </div>
        )}
      </div>

      {/* 4. Narrative justification explanation */}
      <div className="glass-panel rounded-lg p-3.5 flex flex-col gap-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 flex items-center gap-1.5">
          <Info size={13} className="text-white/60" /> SCIENTIFIC EXPLORER BRIEFING
        </span>
        <p className="text-[10.5px] text-white/70 leading-relaxed font-mono border border-white/5 bg-black/10 rounded p-2 select-text selection:bg-white selection:text-black">
          {analysis.scientificJustification}
        </p>
      </div>

      {/* 5. Layer HUD Quick Toggles & Opacity */}
      <div className="glass-panel rounded-lg p-3.5 flex flex-col gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 flex items-center gap-1.5">
          <BarChart2 size={13} className="text-white/60" /> STACK VISIBILITY TUNER
        </span>

        <div className="flex flex-col gap-2 mt-1">
          {(Object.keys(VARIABLE_METADATA) as VariableName[]).map((key) => {
            const meta = VARIABLE_METADATA[key];
            const ls = layerState[key] || { visible: true, opacity: 0.70 };

            return (
              <div key={key} className="flex items-center gap-2 text-xs font-mono select-none">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={ls.visible}
                  onChange={() => onToggleLayer(key)}
                  className="w-3.5 h-3.5 text-white bg-black/40 border-white/15 rounded focus:ring-white focus:ring-1 accent-white"
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
                <span className="w-12 font-bold ml-1" style={{ color: meta.color }}>{key}</span>
                
                {/* Opacity slider */}
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={ls.opacity}
                  onChange={(e) => onChangeLayerOpacity(key, parseFloat(e.target.value))}
                  className="flex-1 h-0.5 bg-white/15 rounded appearance-none cursor-pointer accent-white"
                />

                <span className="text-[10px] text-white/50 w-6 text-right">{(ls.opacity * 100).toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
