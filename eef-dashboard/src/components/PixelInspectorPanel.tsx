/**
 * Gate 1: Pixel Inspector Panel Component
 * Displays detailed statistics for clicked/hovered pixels
 */

import React, { useState, useEffect, useMemo } from "react";
import { Search, X, Info, Zap, Grid3x3, TrendingUp } from "lucide-react";
import { DataCube, VariableName, VARIABLE_METADATA } from "../types";
import {
  PixelCoord,
  PixelStatistics,
  SimilarPixel,
  PixelInspectorState,
  PixelComputationCache
} from "../gate1_pixel_inspector/types";
import {
  computePixelStatistics,
  getSimilarPixelsCached,
  extractVariableDependency,
  invalidateCache,
  createPixelCache
} from "../gate1_pixel_inspector/pixelCompute";
import { getCSSGradient } from "../utils/colormaps";

const VARS: VariableName[] = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490", "FLH", "CHL_disagreement", "OA08", "OA09", "OA10", "OA11", "OA13"];

interface PixelInspectorPanelProps {
  dataCube: DataCube;
  inspectorState: PixelInspectorState;
  onChangeState: (state: PixelInspectorState) => void;
}

export const PixelInspectorPanel: React.FC<PixelInspectorPanelProps> = ({
  dataCube,
  inspectorState,
  onChangeState
}) => {
  const [cache, setCache] = React.useState<PixelComputationCache>(createPixelCache);

  // Invalidate cache when dataCube changes
  useEffect(() => {
    const newCache = createPixelCache();
    invalidateCache(newCache);
    setCache(newCache);
  }, [dataCube.timestamp]);

  // Compute statistics for selected pixel
  const selectedStats = useMemo(() => {
    if (!inspectorState.selectedPixel) return null;
    return computePixelStatistics(dataCube, inspectorState.selectedPixel, cache);
  }, [inspectorState.selectedPixel, dataCube, cache]);

  // Find similar pixels
  const similarPixels = useMemo(() => {
    if (!selectedStats) return [];
    return getSimilarPixelsCached(
      dataCube,
      selectedStats.coord,
      selectedStats.normalizedValues,
      cache,
      inspectorState.topNeighborCount
    );
  }, [selectedStats, inspectorState.topNeighborCount, dataCube, cache]);

  // Extract variable dependencies
  const variableDependency = useMemo(() => {
    if (!selectedStats || !inspectorState.selectedVariable) return null;
    return extractVariableDependency(
      selectedStats.neighborhoodMetrics.localCorrelations,
      inspectorState.selectedVariable
    );
  }, [selectedStats, inspectorState.selectedVariable]);

  if (!inspectorState.visible || !selectedStats) {
    return null;
  }

  return (
    <div className="glass-panel rounded-xl p-4 flex flex-col gap-4 text-[var(--eef-text)] select-none overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[var(--eef-divider)] pb-3">
        <h2 className="text-xs font-semibold text-[var(--eef-text)] flex items-center gap-1.5">
          <Search size={13} className="text-[var(--eef-text-3)]" /> Pixel inspector
        </h2>
        <button
          onClick={() => onChangeState({ ...inspectorState, visible: false })}
          className="text-[var(--eef-text-3)] hover:text-[var(--eef-text)] transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Pixel Location */}
      <div className="flex items-center gap-3 glass-well p-2.5">
        <Grid3x3 size={16} className="text-[var(--eef-text-3)]" />
        <div>
          <div className="text-[10px] text-[var(--eef-text-3)]">Selected pixel</div>
          <div className="tnum text-sm font-semibold text-[var(--eef-text)]">
            [{selectedStats.coord.row}, {selectedStats.coord.col}]
          </div>
          {dataCube.coords && (
            <div className="tnum text-[10px] text-[var(--eef-text-3)] mt-0.5">
              {dataCube.coords[selectedStats.coord.row][selectedStats.coord.col].lat.toFixed(4)}°,{" "}
              {dataCube.coords[selectedStats.coord.row][selectedStats.coord.col].lon.toFixed(4)}°
            </div>
          )}
        </div>
      </div>

      {/* 1. Raw Values */}
      <div>
        <h3 className="text-[11px] font-semibold text-[var(--eef-text-2)] mb-2 flex items-center gap-1.5">
          <Zap size={12} className="text-[var(--eef-text-3)]" /> Measured values
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {VARS.map((varName) => {
            const value = selectedStats.values[varName];
            const unit = VARIABLE_METADATA[varName].unit;
            return (
              <div key={varName} className="glass-well p-2 text-[9px]">
                <div className="text-[var(--eef-text-3)]">{varName}</div>
                <div className="tnum text-[var(--eef-text)] font-semibold">{value.toFixed(4)}</div>
                <div className="text-[var(--eef-text-3)] text-[8px]">{unit}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Normalized (Z-scored) Values */}
      <div>
        <h3 className="text-[11px] font-semibold text-[var(--eef-text-2)] mb-2 flex items-center gap-1.5">
          <TrendingUp size={12} className="text-[var(--eef-text-3)]" /> Z-scored values
        </h3>
        <div className="glass-well p-3">
          <div className="grid grid-cols-3 gap-2">
            {VARS.map((varName) => {
              const normalized = selectedStats.normalizedValues[varName];
              const isHigher = normalized > 0;
              return (
                <div
                  key={varName}
                  className="tnum text-center text-[9px] font-semibold"
                  style={{ color: isHigher ? "var(--eef-alert)" : "var(--eef-accent)" }}
                >
                  <div>{varName}</div>
                  <div>{normalized.toFixed(2)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. PCA Embedding Distance */}
      <div className="glass-well p-3">
        <div className="text-[10px] text-[var(--eef-text-3)] mb-1">PCA distance from mean</div>
        <div className="tnum text-lg font-semibold text-[var(--eef-text)]">{selectedStats.pcaDistance.toFixed(3)}</div>
        <div className="text-[9px] text-[var(--eef-text-3)] mt-1">
          Euclidean distance in principal component space (9D)
        </div>
      </div>

      {/* 4. Neighborhood Metrics */}
      <div>
        <h3 className="text-[11px] font-semibold text-[var(--eef-text-2)] mb-2">
          Local neighborhood (3×3)
        </h3>
        <div className="space-y-2">
          <div className="glass-well p-2.5">
            <div className="text-[10px] text-[var(--eef-text-3)] mb-1">Local mean</div>
            <div className="grid grid-cols-3 gap-1">
              {VARS.map((varName) => (
                <div key={varName} className="tnum text-[8px] text-[var(--eef-text-2)]">
                  {selectedStats.neighborhoodMetrics.localMean[varName].toFixed(2)}
                </div>
              ))}
            </div>
          </div>
          <div className="glass-well p-2.5">
            <div className="text-[10px] text-[var(--eef-text-3)] mb-1">Local std dev</div>
            <div className="grid grid-cols-3 gap-1">
              {VARS.map((varName) => (
                <div key={varName} className="tnum text-[8px] text-[var(--eef-text-2)]">
                  {selectedStats.neighborhoodMetrics.localStd[varName].toFixed(3)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Variable Dependency View */}
      {variableDependency && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-[11px] font-semibold text-[var(--eef-text-2)]">
              Variable dependencies
            </h3>
            <select
              value={inspectorState.selectedVariable || "CHL"}
              onChange={(e) =>
                onChangeState({
                  ...inspectorState,
                  selectedVariable: e.target.value as VariableName
                })
              }
              className="bg-[var(--eef-surface-2)] border border-[var(--eef-border)] rounded px-2 py-1 text-[9px] text-[var(--eef-text)] cursor-pointer hover:border-[var(--eef-border-strong)] transition-colors"
            >
              {VARS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div className="glass-well p-2.5 space-y-1">
            {VARS.map((varName) => {
              const corr = variableDependency.correlations[varName];
              const corrNum = typeof corr === "number" ? corr : parseFloat(corr as unknown as string);
              const isPositive = corrNum > 0;
              return (
                <div key={varName} className="flex justify-between items-center text-[9px]">
                  <span className="text-[var(--eef-text-2)]">{varName}</span>
                  <span
                    className="tnum font-semibold"
                    style={{ color: isPositive ? "var(--eef-warn)" : "var(--eef-ok)" }}
                  >
                    {corrNum.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Similar Pixels */}
      {similarPixels.length > 0 && (
        <div>
          <h3 className="text-[11px] font-semibold text-[var(--eef-text-2)] mb-2">
            Most similar pixels (top {Math.min(5, similarPixels.length)})
          </h3>
          <div className="space-y-1.5">
            {similarPixels.map((pixel) => (
              <div
                key={`${pixel.coord.row}_${pixel.coord.col}`}
                className="glass-well p-2.5 hover:bg-[var(--eef-surface-2)] transition-colors cursor-pointer"
                onClick={() =>
                  onChangeState({
                    ...inspectorState,
                    selectedPixel: pixel.coord
                  })
                }
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="tnum text-[10px] font-semibold text-[var(--eef-text)]">
                    Rank #{pixel.rank}: [{pixel.coord.row}, {pixel.coord.col}]
                  </span>
                  <span className="tnum text-[9px] text-[var(--eef-text-3)]">
                    dist={pixel.similarity.toFixed(3)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {VARS.slice(0, 3).map((varName) => (
                    <div key={varName} className="text-[8px] text-[var(--eef-text-2)]">
                      <span className="text-[var(--eef-text-3)]">{varName}:</span>{" "}
                      <span className="tnum">{pixel.values[varName].toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help text */}
      <div className="rounded-lg p-2.5 text-[9px] text-[var(--eef-text-2)]" style={{ background: "var(--eef-accent-soft)", border: "1px solid var(--eef-border)" }}>
        <Info size={12} className="inline mr-1 text-[var(--eef-accent)]" /> Click any pixel in the 3D grid to inspect its properties
      </div>
    </div>
  );
};
