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
  "flex-1 glass-well rounded px-1.5 py-1 text-[10px] text-[var(--eef-text-2)] focus:outline-none focus:border-[var(--eef-accent-ring)] cursor-pointer";

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
      {/* Spatial structure overlay */}
      <div className="glass-panel rounded-lg p-3.5 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-[11px] font-semibold text-[var(--eef-text)] flex items-center gap-1.5">
            <Layers size={11} className="text-[var(--eef-text-3)]" /> Spatial structure
          </h3>
          <button
            onClick={() => onChangeSpatialOverlay({ ...spatialOverlay, visible: !spatialOverlay.visible })}
            className={`text-[9px] px-1.5 py-0.5 rounded border transition-colors ${
              spatialOverlay.visible
                ? "bg-[var(--eef-accent-soft)] border-[var(--eef-accent-ring)] text-[var(--eef-accent)]"
                : "bg-transparent border-[var(--eef-border)] text-[var(--eef-text-3)]"
            }`}
          >
            {spatialOverlay.visible ? "On" : "Off"}
          </button>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-[var(--eef-text-3)] w-14">Variable</span>
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

        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-[var(--eef-text-3)] w-14">Descriptor</span>
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

        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-[var(--eef-text-3)]">Opacity</span>
          <input
            type="range" min="0.1" max="1" step="0.05"
            value={spatialOverlay.opacity}
            onChange={(e) => onChangeSpatialOverlay({ ...spatialOverlay, opacity: parseFloat(e.target.value) })}
            className="flex-1 h-0.5 bg-[var(--eef-inset)] rounded appearance-none cursor-pointer accent-[var(--eef-accent)]"
          />
          <span className="tnum text-[var(--eef-text-2)] w-6 text-right">{(spatialOverlay.opacity * 100).toFixed(0)}%</span>
        </div>
      </div>

      {/* Relationship graph overlay */}
      <div className="glass-panel rounded-lg p-3.5 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-[11px] font-semibold text-[var(--eef-text)] flex items-center gap-1.5">
            <Network size={11} className="text-[var(--eef-text-3)]" /> Relationship graph
          </h3>
          <button
            onClick={() => onChangeRelationshipGraph({ ...relationshipGraph, visible: !relationshipGraph.visible })}
            className={`text-[9px] px-1.5 py-0.5 rounded border transition-colors ${
              relationshipGraph.visible
                ? "bg-[var(--eef-accent-soft)] border-[var(--eef-accent-ring)] text-[var(--eef-accent)]"
                : "bg-transparent border-[var(--eef-border)] text-[var(--eef-text-3)]"
            }`}
          >
            {relationshipGraph.visible ? "On" : "Off"}
          </button>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-[var(--eef-text-3)] w-14">Channel</span>
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

        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-[var(--eef-text-3)]">Threshold</span>
          <input
            type="range" min="0" max="1" step="0.05"
            value={relationshipGraph.threshold}
            onChange={(e) => onChangeRelationshipGraph({ ...relationshipGraph, threshold: parseFloat(e.target.value) })}
            className="flex-1 h-0.5 bg-[var(--eef-inset)] rounded appearance-none cursor-pointer accent-[var(--eef-accent)]"
          />
          <span className="tnum text-[var(--eef-text-2)] w-8 text-right">{relationshipGraph.threshold.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-[var(--eef-text-3)]">Opacity</span>
          <input
            type="range" min="0.1" max="1" step="0.05"
            value={relationshipGraph.opacity}
            onChange={(e) => onChangeRelationshipGraph({ ...relationshipGraph, opacity: parseFloat(e.target.value) })}
            className="flex-1 h-0.5 bg-[var(--eef-inset)] rounded appearance-none cursor-pointer accent-[var(--eef-accent)]"
          />
          <span className="tnum text-[var(--eef-text-2)] w-6 text-right">{(relationshipGraph.opacity * 100).toFixed(0)}%</span>
        </div>
      </div>

      {/* Data quality / confidence overlay */}
      {confidenceOverlay && onChangeConfidenceOverlay && (
        <div className="glass-panel rounded-lg p-3.5 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h3 className="text-[11px] font-semibold text-[var(--eef-text)] flex items-center gap-1.5">
              <ShieldCheck size={11} className="text-[var(--eef-text-3)]" /> Data confidence
            </h3>
            <button
              onClick={() => onChangeConfidenceOverlay({ ...confidenceOverlay, visible: !confidenceOverlay.visible })}
              className={`text-[9px] px-1.5 py-0.5 rounded border transition-colors ${
                confidenceOverlay.visible
                  ? "bg-[var(--eef-accent-soft)] border-[var(--eef-accent-ring)] text-[var(--eef-accent)]"
                  : "bg-transparent border-[var(--eef-border)] text-[var(--eef-text-3)]"
              }`}
            >
              {confidenceOverlay.visible ? "On" : "Off"}
            </button>
          </div>

          <p className="text-[9px] text-[var(--eef-text-3)] leading-snug -mt-1">
            Per-cell aerosol-derived confidence weight (T865), 0=low to 1=high.
            Rendered as a red-to-green plane above the terrain stack.
          </p>

          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-[var(--eef-text-3)]">Opacity</span>
            <input
              type="range" min="0.1" max="1" step="0.05"
              value={confidenceOverlay.opacity}
              onChange={(e) => onChangeConfidenceOverlay({ ...confidenceOverlay, opacity: parseFloat(e.target.value) })}
              className="flex-1 h-0.5 bg-[var(--eef-inset)] rounded appearance-none cursor-pointer accent-[var(--eef-accent)]"
            />
            <span className="tnum text-[var(--eef-text-2)] w-6 text-right">{(confidenceOverlay.opacity * 100).toFixed(0)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};
