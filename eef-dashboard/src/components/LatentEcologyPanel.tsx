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
 * 1. DxD correlation heatmap of variable interactions (all channels)
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
  // Responsive heatmap: shrink cells and drop the inline numbers once there are
  // many channels (21+), so the matrix stays readable instead of overflowing.
  const cell = D > 12 ? 20 : 34;
  const headerH = D > 12 ? 54 : 80;
  const showNums = D <= 12;

  return (
    <div className="gate2-latent-ecology-panel" style={{ padding: "12px", overflowY: "auto" }}>
      <h3 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600, color: "var(--eef-text)" }}>
        Understanding roots
      </h3>

      {/* Interaction Heatmap */}
      <div style={{ marginBottom: "12px" }}>
        <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "var(--eef-text)" }}>
          Variable interactions (Pearson r)
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `48px repeat(${D}, ${cell}px)`,
            gap: "0",
            background: "var(--eef-surface-solid)",
            border: "1px solid var(--eef-border)",
            borderRadius: "8px",
            padding: "4px",
            overflowX: "auto",
            maxWidth: "100%",
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
                color: "var(--eef-text-2)",
                textAlign: "center",
                writing: "vertical-rl",
                textOrientation: "mixed",
                height: `${headerH}px`,
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
                  color: "var(--eef-text-2)",
                  textAlign: "right",
                  paddingRight: "4px",
                }}
              >
                {rowName}
              </div>
              {varNames.map((colName, j) => {
                const value = corr[i * D + j];
                const absValue = Math.abs(value);

                let bgColor = "var(--eef-surface-solid)";
                if (absValue >= 0.7) {
                  bgColor = value > 0 ? "var(--eef-accent)" : "var(--eef-alert)";
                } else if (absValue >= 0.5) {
                  bgColor = value > 0 ? "#6B97EC" : "#D77F6C";
                } else if (absValue >= 0.3) {
                  bgColor = value > 0 ? "#AAC2F4" : "#E5B0A4";
                } else {
                  bgColor = "var(--eef-inset)";
                }

                return (
                  <div
                    key={`cell-${i}-${j}`}
                    className="tnum"
                    style={{
                      background: bgColor,
                      border: "1px solid var(--eef-divider)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 600,
                      color:
                        absValue >= 0.7
                          ? "#FFFFFF"
                          : absValue >= 0.3
                            ? "var(--eef-text)"
                            : "var(--eef-text-3)",
                      cursor: "help",
                    }}
                    title={`${rowName} vs ${colName}: r=${value.toFixed(3)}`}
                  >
                    {showNums ? Math.round(value * 100) : ""}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Legend */}
        <div style={{ fontSize: "10px", marginTop: "6px", color: "var(--eef-text-3)" }}>
          Blue = positive correlation, red = negative correlation
        </div>
      </div>

      {/* Computation Metadata */}
      <div style={{ fontSize: "11px", color: "var(--eef-text-3)", marginBottom: "12px" }}>
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
          background: "var(--eef-inset)",
          border: "1px solid var(--eef-divider)",
          padding: "8px",
          borderRadius: "8px",
          marginBottom: "12px",
          fontSize: "12px",
          lineHeight: "1.5",
          color: "var(--eef-text)",
        }}
      >
        <div style={{ marginBottom: "6px" }}>
          <strong>Key findings</strong>
        </div>
        <div style={{ marginBottom: "4px", color: "var(--eef-text-2)" }}>
          {summary.ecologicalInterpretation}
        </div>
        {summary.topInteractions.length > 0 && (
          <div style={{ marginTop: "6px", fontSize: "11px", color: "var(--eef-text-2)" }}>
            <div style={{ marginBottom: "3px" }}>
              <strong>Top interactions</strong>
            </div>
            {summary.topInteractions.map((interaction, i) => (
              <div key={i}>• {interaction}</div>
            ))}
          </div>
        )}
      </div>

      {/* Attractor Summary */}
      <div style={{ marginBottom: "12px" }}>
        <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "var(--eef-text)" }}>
          Ecological regimes
        </div>
        {latentEcology.attractorAnalysis.attractors.map((attractor) => {
          const dominancePercent = (attractor.dominance * 100).toFixed(1);
          const stabilityPercent = (attractor.stability * 100).toFixed(0);

          return (
            <div
              key={attractor.id}
              style={{
                background: "var(--eef-inset)",
                border: "1px solid var(--eef-divider)",
                borderRadius: "8px",
                padding: "6px 8px",
                marginBottom: "6px",
                fontSize: "11px",
                color: "var(--eef-text)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong>{attractor.label}</strong>
                <span className="tnum" style={{ color: "var(--eef-text-3)" }}>
                  {dominancePercent}% · {stabilityPercent}% stable
                </span>
              </div>

              {/* Bar charts */}
              <div style={{ display: "flex", gap: "12px", fontSize: "10px", color: "var(--eef-text-2)" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: "2px" }}>Dominance</div>
                  <div
                    style={{
                      background: "var(--eef-border)",
                      height: "4px",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        background: "var(--eef-accent)",
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
                      background: "var(--eef-border)",
                      height: "4px",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        background: "var(--eef-ok)",
                        height: "100%",
                        width: `${attractor.stability * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Centroid coordinates */}
              <div className="tnum" style={{ marginTop: "4px", fontSize: "9px", color: "var(--eef-text-3)" }}>
                PCA: ({attractor.centroidPC1.toFixed(2)}, {attractor.centroidPC2.toFixed(2)}, {attractor.centroidPC3.toFixed(2)})
              </div>
            </div>
          );
        })}
      </div>

      {/* Variance Explained */}
      <div style={{ marginBottom: "12px" }}>
        <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "var(--eef-text)" }}>
          Variance explained by PCs
        </div>
        {latentEcology.attractorAnalysis.varianceExplained.map((variance, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "4px", fontSize: "11px", color: "var(--eef-text-2)" }}>
            <div className="tnum" style={{ width: "40px" }}>PC{i + 1}</div>
            <div
              style={{
                flex: 1,
                background: "var(--eef-border)",
                height: "16px",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                className="tnum"
                style={{
                  background: i === 0 ? "var(--eef-accent)" : "var(--eef-accent-soft)",
                  height: "100%",
                  width: `${variance * 100}%`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: i === 0 ? "#FFFFFF" : "var(--eef-text)",
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
      <div style={{ fontSize: "11px", color: "var(--eef-text-2)", background: "var(--eef-warn-soft)", border: "1px solid var(--eef-divider)", padding: "6px 8px", borderRadius: "8px" }}>
        <strong style={{ color: "var(--eef-warn)" }}>Transition zones:</strong> {Array.from(latentEcology.regimeTransitionMap.values()).filter((r: number) => r > 0.5).length}{" "}
        cells ({(((Array.from(latentEcology.regimeTransitionMap.values()).filter((r: number) => r > 0.5).length as number) / latentEcology.attractorAnalysis.metadata.cellCount) * 100).toFixed(0)}%) near regime boundaries
      </div>
    </div>
  );
}
