import React from "react";
import { Layers, Network, ShieldCheck } from "lucide-react";
import { SpatialOverlayState, RelationshipGraphState, VariableName, SpatialDescriptorName, ConfidenceOverlayState } from "../types";
import { SPATIAL_DESCRIPTORS } from "../utils/spatialTensor";

const VARS: VariableName[] = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490", "FLH", "CHL_disagreement", "OA08", "OA09", "OA10", "OA11", "OA13"];

const DESCRIPTOR_LABELS: Record<SpatialDescriptorName, string> = {
  gradient_dx: "Gradient (∂x)",
  gradient_dy: "Gradient (∂y)",
  laplacian: "Laplacian",
  variance: "Local Variance",
  entropy: "Local Entropy",
  moran: "Moran's I",
  semivariance: "Semivariance",
  patchiness: "Patchiness",
  texture_contrast: "Texture Contrast",
};

interface SpatialEncodingPanelProps {
  spatialOverlay: SpatialOverlayState;
  onChangeSpatialOverlay: (s: SpatialOverlayState) => void;
  relationshipGraph: RelationshipGraphState;
  onChangeRelationshipGraph: (s: RelationshipGraphState) => void;
  relationshipFeatureNames: string[];
  confidenceOverlay?: ConfidenceOverlayState;
  onChangeConfidenceOverlay?: (s: ConfidenceOverlayState) => void;
}

const selectClass =
  "flex-1 bg-white/5 border border-white/10 rounded px-1.5 py-1 text-[10px] font-mono text-white/70 focus:outline-none focus:border-white/20 cursor-pointer";

export const SpatialEncodingPanel: React.FC<SpatialEncodingPanelProps> = ({
  spatialOverlay,
  onChangeSpatialOverlay,
  relationshipGraph,
  onChangeRelationshipGraph,
  relationshipFeatureNames,
  confidenceOverlay,
  onChangeConfidenceOverlay,
}) => {
  const corrFeatures = relationshipFeatureNames.filter((f) => f.startsWith("corr_"));
  const miFeatures = relationshipFeatureNames.filter((f) => f.startsWith("mi_"));
  const ratioFeatures = relationshipFeatureNames.filter((f) => f.startsWith("ratio_"));
  const indexFeatures = relationshipFeatureNames.filter((f) => f.startsWith("index_"));

  return (
    <div className="flex flex-col gap-3">
      {/* SPATIAL STRUCTURE OVERLAY */}
      <div className="glass-panel rounded-lg p-3.5 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
            <Layers size={11} className="text-white/40" /> SPATIAL STRUCTURE OVERLAY
          </h3>
          <button
            onClick={() => onChangeSpatialOverlay({ ...spatialOverlay, visible: !spatialOverlay.visible })}
            className={`text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded border transition-colors ${
              spatialOverlay.visible
                ? "bg-white/15 border-white/30 text-white"
                : "bg-transparent border-white/10 text-white/40"
            }`}
          >
            {spatialOverlay.visible ? "ON" : "OFF"}
          </button>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="text-white/40 w-14">Variable</span>
          <select
            value={spatialOverlay.variable ?? ""}
            onChange={(e) =>
              onChangeSpatialOverlay({
                ...spatialOverlay,
                variable: (e.target.value || null) as VariableName | null,
              })
            }
            className={selectClass}
          >
            <option value="">— select —</option>
            {VARS.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="text-white/40 w-14">Descriptor</span>
          <select
            value={spatialOverlay.descriptor ?? ""}
            onChange={(e) =>
              onChangeSpatialOverlay({
                ...spatialOverlay,
                descriptor: (e.target.value || null) as SpatialDescriptorName | null,
              })
            }
            className={selectClass}
          >
            <option value="">— select —</option>
            {SPATIAL_DESCRIPTORS.map((d) => (
              <option key={d} value={d}>
                {DESCRIPTOR_LABELS[d]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="text-white/40">Opacity</span>
          <input
            type="range" min="0.1" max="1" step="0.05"
            value={spatialOverlay.opacity}
            onChange={(e) => onChangeSpatialOverlay({ ...spatialOverlay, opacity: parseFloat(e.target.value) })}
            className="flex-1 h-0.5 bg-slate-100 rounded appearance-none cursor-pointer accent-white"
          />
          <span className="text-white/60 w-6 text-right">{(spatialOverlay.opacity * 100).toFixed(0)}%</span>
        </div>
      </div>

      {/* RELATIONSHIP GRAPH OVERLAY */}
      <div className="glass-panel rounded-lg p-3.5 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
            <Network size={11} className="text-white/40" /> RELATIONSHIP GRAPH OVERLAY
          </h3>
          <button
            onClick={() => onChangeRelationshipGraph({ ...relationshipGraph, visible: !relationshipGraph.visible })}
            className={`text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded border transition-colors ${
              relationshipGraph.visible
                ? "bg-white/15 border-white/30 text-white"
                : "bg-transparent border-white/10 text-white/40"
            }`}
          >
            {relationshipGraph.visible ? "ON" : "OFF"}
          </button>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="text-white/40 w-14">Channel</span>
          <select
            value={relationshipGraph.channelName ?? ""}
            onChange={(e) =>
              onChangeRelationshipGraph({
                ...relationshipGraph,
                channelName: e.target.value || null,
              })
            }
            className={selectClass}
          >
            <option value="">— select —</option>
            {corrFeatures.length > 0 && (
              <optgroup label="Correlations">
                {corrFeatures.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </optgroup>
            )}
            {miFeatures.length > 0 && (
              <optgroup label="Mutual Information">
                {miFeatures.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </optgroup>
            )}
            {ratioFeatures.length > 0 && (
              <optgroup label="Ratios">
                {ratioFeatures.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </optgroup>
            )}
            {indexFeatures.length > 0 && (
              <optgroup label="Indices">
                {indexFeatures.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </optgroup>
            )}
          </select>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="text-white/40">Threshold</span>
          <input
            type="range" min="0" max="1" step="0.05"
            value={relationshipGraph.threshold}
            onChange={(e) => onChangeRelationshipGraph({ ...relationshipGraph, threshold: parseFloat(e.target.value) })}
            className="flex-1 h-0.5 bg-white/10 rounded appearance-none cursor-pointer accent-white"
          />
          <span className="text-white/60 w-8 text-right">{relationshipGraph.threshold.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="text-white/40">Opacity</span>
          <input
            type="range" min="0.1" max="1" step="0.05"
            value={relationshipGraph.opacity}
            onChange={(e) => onChangeRelationshipGraph({ ...relationshipGraph, opacity: parseFloat(e.target.value) })}
            className="flex-1 h-0.5 bg-slate-100 rounded appearance-none cursor-pointer accent-white"
          />
          <span className="text-white/60 w-6 text-right">{(relationshipGraph.opacity * 100).toFixed(0)}%</span>
        </div>
      </div>

      {/* DATA QUALITY / CONFIDENCE OVERLAY */}
      {confidenceOverlay && onChangeConfidenceOverlay && (
        <div className="glass-panel rounded-lg p-3.5 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
              <ShieldCheck size={11} className="text-white/40" /> DATA QUALITY / CONFIDENCE OVERLAY
            </h3>
            <button
              onClick={() => onChangeConfidenceOverlay({ ...confidenceOverlay, visible: !confidenceOverlay.visible })}
              className={`text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded border transition-colors ${
                confidenceOverlay.visible
                  ? "bg-white/15 border-white/30 text-white"
                  : "bg-transparent border-white/10 text-white/40"
              }`}
            >
              {confidenceOverlay.visible ? "ON" : "OFF"}
            </button>
          </div>

          <p className="text-[9px] text-white/30 leading-snug font-mono -mt-1">
            Per-cell aerosol-derived confidence weight (T865), 0=low to 1=high.
            Rendered as a red→green plane above the terrain stack.
          </p>

          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="text-white/40">Opacity</span>
            <input
              type="range" min="0.1" max="1" step="0.05"
              value={confidenceOverlay.opacity}
              onChange={(e) => onChangeConfidenceOverlay({ ...confidenceOverlay, opacity: parseFloat(e.target.value) })}
              className="flex-1 h-0.5 bg-slate-100 rounded appearance-none cursor-pointer accent-white"
            />
            <span className="text-white/60 w-6 text-right">{(confidenceOverlay.opacity * 100).toFixed(0)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};
