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
    <div className="glass-panel rounded-xl p-4 flex flex-col gap-4 text-white select-none overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
          <Search size={13} className="text-white/60" /> PIXEL INSPECTOR
        </h2>
        <button
          onClick={() => onChangeState({ ...inspectorState, visible: false })}
          className="text-white/40 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Pixel Location */}
      <div className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-lg p-2.5">
        <Grid3x3 size={16} className="text-white/60" />
        <div>
          <div className="text-[10px] font-mono text-white/40">SELECTED PIXEL</div>
          <div className="text-sm font-bold text-white">
            [{selectedStats.coord.row}, {selectedStats.coord.col}]
          </div>
        </div>
      </div>

      {/* 1. Raw Values */}
      <div>
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2 flex items-center gap-1.5">
          <Zap size={12} className="text-white/40" /> MEASURED VALUES
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {VARS.map((varName) => {
            const value = selectedStats.values[varName];
            const unit = VARIABLE_METADATA[varName].unit;
            return (
              <div key={varName} className="bg-white/5 border border-white/8 rounded p-2 text-[9px]">
                <div className="text-white/40 font-mono">{varName}</div>
                <div className="text-white font-bold">{value.toFixed(4)}</div>
                <div className="text-white/40 text-[8px]">{unit}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Normalized (Z-scored) Values */}
      <div>
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2 flex items-center gap-1.5">
          <TrendingUp size={12} className="text-white/40" /> Z-SCORED VALUES
        </h3>
        <div className="bg-white/5 border border-white/8 rounded-lg p-3">
          <div className="grid grid-cols-3 gap-2">
            {VARS.map((varName) => {
              const normalized = selectedStats.normalizedValues[varName];
              const isHigher = normalized > 0;
              return (
                <div
                  key={varName}
                  className={`text-center text-[9px] font-mono font-bold ${
                    isHigher ? "text-red-300" : "text-blue-300"
                  }`}
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
      <div className="bg-white/5 border border-white/8 rounded-lg p-3">
        <div className="text-[10px] font-mono text-white/40 mb-1">PCA DISTANCE FROM MEAN</div>
        <div className="text-lg font-bold text-white">{selectedStats.pcaDistance.toFixed(3)}</div>
        <div className="text-[9px] text-white/40 mt-1">
          Euclidean distance in principal component space (9D)
        </div>
      </div>

      {/* 4. Neighborhood Metrics */}
      <div>
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
          LOCAL NEIGHBORHOOD (3×3)
        </h3>
        <div className="space-y-2">
          <div className="bg-white/5 border border-white/8 rounded-lg p-2.5">
            <div className="text-[10px] font-mono text-white/40 mb-1">LOCAL MEAN</div>
            <div className="grid grid-cols-3 gap-1">
              {VARS.map((varName) => (
                <div key={varName} className="text-[8px] text-white/60 font-mono">
                  {selectedStats.neighborhoodMetrics.localMean[varName].toFixed(2)}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 border border-white/8 rounded-lg p-2.5">
            <div className="text-[10px] font-mono text-white/40 mb-1">LOCAL STD DEV</div>
            <div className="grid grid-cols-3 gap-1">
              {VARS.map((varName) => (
                <div key={varName} className="text-[8px] text-white/60 font-mono">
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
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/60">
              VARIABLE DEPENDENCIES
            </h3>
            <select
              value={inspectorState.selectedVariable || "CHL"}
              onChange={(e) =>
                onChangeState({
                  ...inspectorState,
                  selectedVariable: e.target.value as VariableName
                })
              }
              className="bg-white/5 border border-white/8 rounded px-2 py-1 text-[9px] text-white cursor-pointer hover:bg-white/8 transition-colors"
            >
              {VARS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-white/5 border border-white/8 rounded-lg p-2.5 space-y-1">
            {VARS.map((varName) => {
              const corr = variableDependency.correlations[varName];
              const corrNum = typeof corr === "number" ? corr : parseFloat(corr as unknown as string);
              const isPositive = corrNum > 0;
              return (
                <div key={varName} className="flex justify-between items-center text-[9px]">
                  <span className="text-white/60 font-mono">{varName}</span>
                  <span
                    className={`font-bold font-mono ${
                      isPositive ? "text-orange-300" : "text-cyan-300"
                    }`}
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
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
            MOST SIMILAR PIXELS (Top {Math.min(5, similarPixels.length)})
          </h3>
          <div className="space-y-1.5">
            {similarPixels.map((pixel) => (
              <div
                key={`${pixel.coord.row}_${pixel.coord.col}`}
                className="bg-white/5 border border-white/8 rounded-lg p-2.5 hover:bg-white/8 transition-colors cursor-pointer"
                onClick={() =>
                  onChangeState({
                    ...inspectorState,
                    selectedPixel: pixel.coord
                  })
                }
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-white">
                    Rank #{pixel.rank}: [{pixel.coord.row}, {pixel.coord.col}]
                  </span>
                  <span className="text-[9px] font-mono text-white/40">
                    dist={pixel.similarity.toFixed(3)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {VARS.slice(0, 3).map((varName) => (
                    <div key={varName} className="text-[8px] text-white/60">
                      <span className="text-white/40">{varName}:</span> {pixel.values[varName].toFixed(2)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help text */}
      <div className="bg-blue/5 border border-blue/20 rounded-lg p-2.5 text-[9px] text-white/40 font-mono">
        <Info size={12} className="inline mr-1" /> Click any pixel in the 3D grid to inspect its properties
      </div>
    </div>
  );
};
