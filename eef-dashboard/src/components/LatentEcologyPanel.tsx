import React, { useMemo } from "react";
import { DataCube } from "../types";
import {
  LatentEcologyState,
  exploreLatentEcology,
  summarizeLatentEcology,
} from "../gate2_understanding_roots/latentEcologyExplorer";

interface LatentEcologyPanelProps {
  activeDataCube: DataCube;
  visible: boolean;
}

/**
 * Gate 2 Understanding Roots: Latent Ecology Panel
 *
 * Visualizes:
 * 1. 9x9 correlation heatmap of variable interactions
 * 2. PCA attractor landscape with cluster centroids
 * 3. Regime stability and transition zones
 * 4. Key drivers and causal hypotheses
 */
export function LatentEcologyPanel({ activeDataCube, visible }: LatentEcologyPanelProps) {
  const latentEcology = useMemo(() => {
    return exploreLatentEcology(activeDataCube, 5);
  }, [activeDataCube]);

  const summary = useMemo(() => {
    return summarizeLatentEcology(latentEcology);
  }, [latentEcology]);

  if (!visible) return null;

  const varNames = latentEcology.interactionMatrix.variableNames;
  const D = varNames.length;
  const corr = latentEcology.interactionMatrix.correlations;

  return (
    <div className="gate2-latent-ecology-panel" style={{ padding: "12px", overflowY: "auto" }}>
      <h3 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600 }}>
        Gate 2: Understanding Roots
      </h3>

      {/* Computation Metadata */}
      <div style={{ fontSize: "11px", color: "#888", marginBottom: "12px" }}>
        <div>
          Computed in {latentEcology.metadata.computeTimeMs.toFixed(1)}ms
        </div>
        <div>
          Analyzed {latentEcology.attractorAnalysis.metadata.cellCount} cells
        </div>
      </div>

      {/* Summary */}
      <div
        style={{
          background: "#f5f5f5",
          padding: "8px",
          borderRadius: "4px",
          marginBottom: "12px",
          fontSize: "12px",
          lineHeight: "1.5",
        }}
      >
        <div style={{ marginBottom: "6px" }}>
          <strong>Key Findings:</strong>
        </div>
        <div style={{ marginBottom: "4px" }}>
          {summary.ecologicalInterpretation}
        </div>
        {summary.topInteractions.length > 0 && (
          <div style={{ marginTop: "6px", fontSize: "11px", color: "#555" }}>
            <div style={{ marginBottom: "3px" }}>
              <strong>Top Interactions:</strong>
            </div>
            {summary.topInteractions.map((interaction, i) => (
              <div key={i}>• {interaction}</div>
            ))}
          </div>
        )}
      </div>

      {/* Interaction Heatmap */}
      <div style={{ marginBottom: "12px" }}>
        <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>
          Variable Interaction Matrix (Pearson r)
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `28px repeat(${D}, 24px)`,
            gap: "0",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "4px",
          }}
        >
          {/* Column headers */}
          <div />
          {varNames.map((name) => (
            <div
              key={`col-${name}`}
              style={{
                fontSize: "9px",
                fontWeight: 600,
                textAlign: "center",
                writing: "vertical-rl",
                textOrientation: "mixed",
                height: "80px",
                overflow: "hidden",
              }}
            >
              {name}
            </div>
          ))}

          {/* Rows */}
          {varNames.map((rowName, i) => (
            <React.Fragment key={`row-${rowName}`}>
              <div
                style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  textAlign: "right",
                  paddingRight: "4px",
                }}
              >
                {rowName}
              </div>
              {varNames.map((colName, j) => {
                const value = corr[i * D + j];
                const absValue = Math.abs(value);

                let bgColor = "#fff";
                if (absValue >= 0.7) {
                  bgColor = value > 0 ? "#0ea5e9" : "#ef4444";
                } else if (absValue >= 0.5) {
                  bgColor = value > 0 ? "#38bdf8" : "#f87171";
                } else if (absValue >= 0.3) {
                  bgColor = value > 0 ? "#7dd3fc" : "#fca5a5";
                } else {
                  bgColor = "#f9fafb";
                }

                return (
                  <div
                    key={`cell-${i}-${j}`}
                    style={{
                      background: bgColor,
                      border: "1px solid #e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "9px",
                      fontWeight: 600,
                      color:
                        absValue >= 0.5
                          ? "#fff"
                          : absValue >= 0.3
                            ? "#333"
                            : "#999",
                      cursor: "help",
                      title: `${rowName} vs ${colName}: r=${value.toFixed(3)}`,
                    }}
                  >
                    {Math.round(value * 100)}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Legend */}
        <div style={{ fontSize: "10px", marginTop: "6px", color: "#666" }}>
          Blue = positive correlation | Red = negative correlation
        </div>
      </div>

      {/* Attractor Summary */}
      <div style={{ marginBottom: "12px" }}>
        <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>
          Ecological Regimes
        </div>
        {latentEcology.attractorAnalysis.attractors.map((attractor) => {
          const dominancePercent = (attractor.dominance * 100).toFixed(1);
          const stabilityPercent = (attractor.stability * 100).toFixed(0);

          return (
            <div
              key={attractor.id}
              style={{
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "4px",
                padding: "6px 8px",
                marginBottom: "6px",
                fontSize: "11px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong>{attractor.label}</strong>
                <span style={{ color: "#888" }}>
                  {dominancePercent}% | {stabilityPercent}% stable
                </span>
              </div>

              {/* Bar charts */}
              <div style={{ display: "flex", gap: "12px", fontSize: "10px", color: "#666" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: "2px" }}>Dominance</div>
                  <div
                    style={{
                      background: "#e5e7eb",
                      height: "4px",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        background: "#3b82f6",
                        height: "100%",
                        width: `${attractor.dominance * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: "2px" }}>Stability</div>
                  <div
                    style={{
                      background: "#e5e7eb",
                      height: "4px",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        background: "#10b981",
                        height: "100%",
                        width: `${attractor.stability * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Centroid coordinates */}
              <div style={{ marginTop: "4px", fontSize: "9px", color: "#888" }}>
                PCA: ({attractor.centroidPC1.toFixed(2)}, {attractor.centroidPC2.toFixed(2)}, {attractor.centroidPC3.toFixed(2)})
              </div>
            </div>
          );
        })}
      </div>

      {/* Variance Explained */}
      <div style={{ marginBottom: "12px" }}>
        <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>
          Variance Explained by PCs
        </div>
        {latentEcology.attractorAnalysis.varianceExplained.map((variance, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "4px", fontSize: "11px" }}>
            <div style={{ width: "40px" }}>PC{i + 1}</div>
            <div
              style={{
                flex: 1,
                background: "#e5e7eb",
                height: "16px",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: `hsl(${200 - i * 40}, 70%, 50%)`,
                  height: "100%",
                  width: `${variance * 100}%`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "9px",
                  fontWeight: 600,
                }}
              >
                {(variance * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transition Zone Info */}
      <div style={{ fontSize: "11px", color: "#666", background: "#fef3c7", padding: "6px 8px", borderRadius: "4px" }}>
        <strong>Transition Zones:</strong> {Array.from(latentEcology.regimeTransitionMap.values()).filter((r: number) => r > 0.5).length}{" "}
        cells ({(((Array.from(latentEcology.regimeTransitionMap.values()).filter((r: number) => r > 0.5).length as number) / latentEcology.attractorAnalysis.metadata.cellCount) * 100).toFixed(0)}%) near regime boundaries
      </div>
    </div>
  );
}
