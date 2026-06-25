import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, RefreshCw, Upload, FileSpreadsheet, Settings, Sliders, Zap, Sparkles, Database } from "lucide-react";
import { TelemetryStreamConfig, VariableName, VARIABLE_METADATA, StreamMode, DataCube } from "../types";
import type { FishermanSummary } from "../utils/bloomDetector";
import { parseCSVToCubes, parseCSVRaw, type RawCSVData } from "../telemetryGenerator";
import { getCSSGradient } from "../utils/colormaps";
import { ColorPickerPopover } from "./ColorPickerPopover";
import { rasterToDataCube } from "../adapters/geotiffAdapter";
import { geoTiffFileToInput } from "../adapters/geotiffDecode";

interface TelemetryConsoleProps {
  config: TelemetryStreamConfig;
  onChangeConfig: (newConfig: Partial<TelemetryStreamConfig>) => void;
  isStreaming: boolean;
  onToggleStreaming: () => void;
  onResetStream: () => void;
  onUploadCSVData: (cubes: DataCube[], fileName?: string, raw?: RawCSVData) => void;
  onUploadGeoTIFF: (cube: DataCube, fileName: string, bandInfo: string) => void;
  dataSourceKind: "synthetic" | "csv" | "geotiff";
  geotiffBandInfo: string | null;
  customColors: Partial<Record<VariableName, string>>;
  onChangeCustomColor: (name: VariableName, hex: string) => void;
  customColorsFrom?: Partial<Record<VariableName, string>>;
  onChangeCustomColorFrom?: (name: VariableName, hex: string) => void;
  onResetCustomColor: (name: VariableName) => void;
  variableAverages: Record<VariableName, number>;
  activeCSVFileName: string | null;
  csvFramesCount: number;
  currentCSVFrameIdx: number;
  onChangeCSVFrameIdx: (idx: number) => void;
  cameraPreset: "iso" | "top" | "profile";
  onChangeCameraPreset: (preset: "iso" | "top" | "profile") => void;
  showTerrain: boolean;
  onChangeShowTerrain: (val: boolean) => void;
  showWireframe: boolean;
  onChangeShowWireframe: (val: boolean) => void;
  showLabels: boolean;
  onChangeShowLabels: (val: boolean) => void;
  spacing: number;
  onChangeSpacing: (val: number) => void;
  displacementGain: number;
  onChangeDisplacementGain: (val: number) => void;
  dataCube: DataCube;
  onExportLayer?: (varName: VariableName) => void;
  bloomSummary?: FishermanSummary;
  gridResolution: number;
  onChangeGridResolution: (val: number) => void;
}

export const TelemetryConsole: React.FC<TelemetryConsoleProps> = ({
  config,
  onChangeConfig,
  isStreaming,
  onToggleStreaming,
  onResetStream,
  onUploadCSVData,
  onUploadGeoTIFF,
  dataSourceKind,
  geotiffBandInfo,
  customColors,
  onChangeCustomColor,
  customColorsFrom,
  onChangeCustomColorFrom,
  onResetCustomColor,
  variableAverages,
  activeCSVFileName,
  csvFramesCount,
  currentCSVFrameIdx,
  onChangeCSVFrameIdx,
  cameraPreset,
  onChangeCameraPreset,
  showTerrain,
  onChangeShowTerrain,
  showWireframe,
  onChangeShowWireframe,
  showLabels,
  onChangeShowLabels,
  spacing,
  onChangeSpacing,
  displacementGain,
  onChangeDisplacementGain,
  dataCube,
  onExportLayer,
  bloomSummary,
  gridResolution,
  onChangeGridResolution,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const geotiffInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Keep trail history of averages for dynamic running SVG sparklines
  const [averageHistory, setAverageHistory] = useState<Record<VariableName, number[]>>({
    CHL: Array(25).fill(0.5),
    aphy: Array(25).fill(0.45),
    ADG: Array(25).fill(0.4),
    bbp: Array(25).fill(0.35),
    TSM: Array(25).fill(0.5),
    PAR: Array(25).fill(0.7),
    KD490: Array(25).fill(0.4),
    FLH: Array(25).fill(0.4),
    CHL_disagreement: Array(25).fill(0.2)
  });

  // Track ticking stream variables to update sparklines
  useEffect(() => {
    setAverageHistory(prev => {
      const next = { ...prev };
      (Object.keys(variableAverages) as VariableName[]).forEach((key) => {
        const hist = [...(prev[key] || Array(25).fill(0.5))];
        hist.shift();
        hist.push(variableAverages[key]);
        next[key] = hist;
      });
      return next;
    });
  }, [variableAverages]);

  // CSV Drag and drop events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processUploadedCSV = (file: File) => {
    setErrorMsg(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const cubes = parseCSVToCubes(text, gridResolution);
        const raw = parseCSVRaw(text);
        onUploadCSVData(cubes, file.name, raw);
        onChangeConfig({ mode: "uploaded" });
      } catch (err: any) {
        console.error(err);
        setErrorMsg(err.message || "Failed to parse CSV. Check columns.");
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedCSV(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedCSV(e.target.files[0]);
    }
  };

  // Real GeoTIFF tile → decode → grid → DataCube, fed into the same pipeline.
  const processUploadedGeoTIFF = async (file: File) => {
    setErrorMsg(null);
    try {
      const input = await geoTiffFileToInput(file, gridResolution);
      const cube = rasterToDataCube(input);
      const mapping = Object.entries(input.bandMap)
        .map(([b, v]) => `band ${b} → ${v}`)
        .join(", ");
      const bandInfo = `${input.raster.bands.length} band(s) · ${input.raster.width}×${input.raster.height}px · ${mapping}`;
      onUploadGeoTIFF(cube, file.name, bandInfo);
      onChangeConfig({ mode: "uploaded" });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Failed to decode GeoTIFF. Is it a valid multi-band raster?");
    }
  };

  const handleGeoTIFFFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      void processUploadedGeoTIFF(e.target.files[0]);
    }
  };

  const handlePresetSelect = (mode: StreamMode) => {
    setErrorMsg(null);
    onChangeConfig({ mode });
  };

  // Sparkline path renderer helper
  const drawSparkline = (data: number[]) => {
    const min = 0;
    const max = 1;
    const width = 110;
    const height = 24;
    const step = width / (data.length - 1);
    
    const points = data.map((val, idx) => {
      const x = idx * step;
      // Invert Y axes for canvas-to-svg coordinates
      const y = height - ((val - min) / (max - min || 1.0)) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    
    return `M ${points.join(" L ")}`;
  };

  return (
    <div className="@container flex flex-col gap-4 text-[var(--eef-text)] h-full select-none">

      {/* 0. Fisherman Bloom Alert Card (Squad F) — plain-language HAB readout */}
      {bloomSummary && (() => {
        const level = bloomSummary.level;
        const palette = level === "RED"
          ? { dot: "var(--eef-alert)", title: "Bloom alert — high risk", borderColor: "var(--eef-alert)", bg: "var(--eef-alert-soft)", text: "var(--eef-alert)" }
          : level === "AMBER"
            ? { dot: "var(--eef-warn)", title: "Caution — elevated risk", borderColor: "var(--eef-warn)", bg: "var(--eef-warn-soft)", text: "var(--eef-warn)" }
            : { dot: "var(--eef-ok)", title: "Safe for fishing", borderColor: "var(--eef-ok)", bg: "var(--eef-ok-soft)", text: "var(--eef-ok)" };
        const trend = bloomSummary.direction === "growing"
          ? { arrow: "↑", label: "Growing — worse than last scan", cls: "var(--eef-alert)" }
          : bloomSummary.direction === "retreating"
            ? { arrow: "↓", label: "Retreating — improving", cls: "var(--eef-ok)" }
            : { arrow: "→", label: "Stable", cls: "var(--eef-text-3)" };
        const driverLabel = VARIABLE_METADATA[bloomSummary.driver]?.label ?? bloomSummary.driver;
        return (
          <div
            className="glass-panel rounded-xl p-3.5 flex flex-col gap-2"
            style={{ borderColor: palette.borderColor, background: palette.bg }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold flex items-center gap-2" style={{ color: palette.text }}>
                <span className="w-2 h-2 rounded-full eef-live-dot" style={{ background: palette.dot }} /> {palette.title}
              </span>
              <span className="text-[10px] text-[var(--eef-text-3)] font-medium">Bloom alert</span>
            </div>
            <div className="text-xs text-[var(--eef-text-2)]">
              <span className="text-lg font-semibold tnum text-[var(--eef-text)]">{bloomSummary.unsafePercent}%</span> of zone unsafe for fishing
            </div>
            <div className="text-[11px] flex items-center gap-1.5" style={{ color: trend.cls }}>
              <span className="text-sm font-semibold">{trend.arrow}</span> {trend.label}
            </div>
            <div className="text-[10px] text-[var(--eef-text-3)]">
              Main driver: <span className="text-[var(--eef-text-2)]">{driverLabel}</span>
            </div>
          </div>
        );
      })()}

      {/* 1. Header Toggles for Data Source */}
      <div className="glass-panel rounded-xl p-3.5 flex flex-col gap-2">
        <span className="text-[11px] font-semibold text-[var(--eef-text-2)] flex items-center gap-1.5">
          <Database size={13} className="text-[var(--eef-accent)]" /> Load scene — choose a data source for the 3D terrain
        </span>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 @lg:grid-cols-5 gap-1.5 mt-1">
          <button
            onClick={() => handlePresetSelect("synthetic")}
            className={`text-xs px-2 py-1.5 rounded-lg font-medium border transition-all ${
              config.mode === "synthetic"
                ? "bg-[var(--eef-accent-soft)] border-[var(--eef-accent-ring)] text-[var(--eef-accent)]"
                : "bg-[var(--eef-inset)] border-[var(--eef-border)] text-[var(--eef-text-2)] hover:bg-[var(--eef-surface-2)] hover:text-[var(--eef-text)]"
            }`}
          >
            Synthetic stream
          </button>
          <button
            onClick={() => handlePresetSelect("preset_coastal")}
            className={`text-xs px-2 py-1.5 rounded-lg font-medium border transition-all ${
              config.mode === "preset_coastal"
                ? "bg-[var(--eef-accent-soft)] border-[var(--eef-accent-ring)] text-[var(--eef-accent)]"
                : "bg-[var(--eef-inset)] border-[var(--eef-border)] text-[var(--eef-text-2)] hover:bg-[var(--eef-surface-2)] hover:text-[var(--eef-text)]"
            }`}
          >
            Coastal preset
          </button>
          <button
            onClick={() => handlePresetSelect("preset_deepsea")}
            className={`text-xs px-2 py-1.5 rounded-lg font-medium border transition-all ${
              config.mode === "preset_deepsea"
                ? "bg-[var(--eef-accent-soft)] border-[var(--eef-accent-ring)] text-[var(--eef-accent)]"
                : "bg-[var(--eef-inset)] border-[var(--eef-border)] text-[var(--eef-text-2)] hover:bg-[var(--eef-surface-2)] hover:text-[var(--eef-text)]"
            }`}
          >
            Pelagic preset
          </button>
          <button
            onClick={() => handlePresetSelect("preset_estuary")}
            className={`text-xs px-2 py-1.5 rounded-lg font-medium border transition-all ${
              config.mode === "preset_estuary"
                ? "bg-[var(--eef-accent-soft)] border-[var(--eef-accent-ring)] text-[var(--eef-accent)]"
                : "bg-[var(--eef-inset)] border-[var(--eef-border)] text-[var(--eef-text-2)] hover:bg-[var(--eef-surface-2)] hover:text-[var(--eef-text)]"
            }`}
          >
            Estuary preset
          </button>
          <button
            onClick={() => handlePresetSelect("uploaded")}
            disabled={!activeCSVFileName}
            className={`text-xs col-span-2 @lg:col-span-1 px-2 py-1.5 rounded-lg font-medium border transition-all flex items-center justify-center gap-1 ${
              config.mode === "uploaded"
                ? "bg-[var(--eef-accent-soft)] border-[var(--eef-accent-ring)] text-[var(--eef-accent)]"
                : activeCSVFileName
                ? "bg-[var(--eef-inset)] border-[var(--eef-border)] text-[var(--eef-text-2)] hover:bg-[var(--eef-surface-2)] hover:text-[var(--eef-text)]"
                : "opacity-40 cursor-not-allowed bg-[var(--eef-inset)] text-[var(--eef-text-3)] border-[var(--eef-border)]"
            }`}
          >
            <FileSpreadsheet size={12} /> CSV playback
          </button>
        </div>

        {/* Data provenance caption — states honestly what the ACTIVE data is */}
        <div className="mt-1 flex flex-col gap-1">
          <span
            className={`inline-flex w-fit items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${
              dataSourceKind === "geotiff"
                ? "bg-[var(--eef-ok-soft)] text-[var(--eef-ok)] border border-[var(--eef-ok)]"
                : dataSourceKind === "csv"
                  ? "bg-[var(--eef-accent-soft)] text-[var(--eef-accent)] border border-[var(--eef-accent-ring)]"
                  : "bg-[var(--eef-inset)] text-[var(--eef-text-3)] border border-[var(--eef-border)]"
            }`}
          >
            {dataSourceKind === "geotiff"
              ? "Real data · GeoTIFF"
              : dataSourceKind === "csv"
                ? "User data · CSV"
                : "Synthetic demo"}
          </span>
          <p className="text-[10px] text-[var(--eef-text-3)] leading-relaxed">
            {dataSourceKind === "geotiff"
              ? `Analysis is running over a real ocean-colour raster${geotiffBandInfo ? ` (${geotiffBandInfo})` : ""}. All metrics below are computed from these observed pixels.`
              : dataSourceKind === "csv"
                ? "User-supplied CSV grid data, played back frame-by-frame as uploaded."
                : "Illustrative synthetic parameter set generated locally — not derived from satellite observations or real sensor data. Classifications, entropy and the briefing are heuristic demonstrations."}
          </p>
        </div>
      </div>

      {/* 2. Upload / Drag Zone if CSV selected */}
      <div className="grid grid-cols-1 @lg:grid-cols-3 gap-3">

        {/* CSV File Drop Box */}
        <div className="@lg:col-span-2 glass-panel rounded-xl p-3.5 flex flex-col justify-center">
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border border-dashed rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${
              dragActive ? "border-[var(--eef-accent)] bg-[var(--eef-accent-soft)]" : "border-[var(--eef-border-strong)] hover:border-[var(--eef-accent-ring)] hover:bg-[var(--eef-inset)]"
            }`}
          >
            <Upload className="text-[var(--eef-text-3)]" size={20} />
            <span className="text-xs text-[var(--eef-text)]">
              Drag and drop <span className="text-[var(--eef-accent)] font-semibold underline decoration-[var(--eef-accent-ring)]">satellite.csv</span> or browse
            </span>
            <span className="text-[10px] text-[var(--eef-text-3)]">
              Accepts 20×20 cell vectors (400 samples per row-mesh)
            </span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv"
              className="hidden"
            />
          </div>

          {/* Real GeoTIFF ingestion — decodes a multi-band ocean-colour tile and
              runs the full analysis over the observed pixels. */}
          <button
            type="button"
            onClick={() => geotiffInputRef.current?.click()}
            className="mt-2 flex items-center justify-center gap-1.5 rounded-lg border border-[var(--eef-ok)] bg-[var(--eef-ok-soft)] px-3 py-2 text-[11px] font-semibold text-[var(--eef-ok)] transition-colors hover:brightness-95"
          >
            <Database size={12} /> Load real GeoTIFF tile (.tif)
          </button>
          <span className="mt-1 block text-center text-[9px] text-[var(--eef-text-3)]">
            Multi-band raster (Sentinel-3 / Copernicus). Bands map in order; resampled to the 20×20 grid.
          </span>
          <input
            type="file"
            ref={geotiffInputRef}
            onChange={handleGeoTIFFFileChange}
            accept=".tif,.tiff,image/tiff"
            className="hidden"
          />

          {errorMsg && (
            <div className="mt-2 text-[11px] text-[var(--eef-alert)] text-center border border-[var(--eef-alert)] bg-[var(--eef-alert-soft)] rounded-lg p-1.5">
              Error: {errorMsg}
            </div>
          )}

          {activeCSVFileName && (
            <div className="mt-2 text-xs flex items-center justify-between border-t border-[var(--eef-divider)] pt-2 text-[var(--eef-text-3)]">
              <span className="flex items-center gap-1 text-[11px] text-[var(--eef-text-2)]">
                <FileSpreadsheet size={11} className="text-[var(--eef-text-3)]" /> {activeCSVFileName.length > 25 ? activeCSVFileName.substring(0, 25) + "..." : activeCSVFileName}
              </span>
              <span className="text-[10px] tnum">
                Frame {currentCSVFrameIdx + 1} of {csvFramesCount}
              </span>
            </div>
          )}
        </div>

        {/* Real-time Status Gauge & Master Stream Triggers */}
        <div className="glass-panel rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-semibold text-[var(--eef-text-2)]">Stream status</span>
              <span
                className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-md text-[10px] font-medium"
                style={isStreaming
                  ? { background: "var(--eef-ok-soft)", color: "var(--eef-ok)" }
                  : { background: "var(--eef-inset)", color: "var(--eef-text-3)" }}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isStreaming ? "eef-live-dot" : ""}`} style={{ background: "currentColor" }} /> {isStreaming ? "Live" : "Standby"}
              </span>
            </div>

            {/* Status explanation */}
            <p className="text-[10px] text-[var(--eef-text-3)] mt-1.5 leading-relaxed">
              {isStreaming
                ? `Refreshing spatial grids at ${config.speedHz} Hz.`
                : "Stream paused. Spatial grids are static. Ready to resume."
              }
            </p>
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={onToggleStreaming}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs border transition-all ${
                isStreaming
                  ? "bg-[var(--eef-inset)] border-[var(--eef-border)] hover:bg-[var(--eef-surface-2)] text-[var(--eef-text-2)]"
                  : "bg-[var(--eef-accent-soft)] border-[var(--eef-accent-ring)] hover:bg-[var(--eef-accent-soft)] text-[var(--eef-accent)] font-semibold"
              }`}
            >
              {isStreaming ? (
                <>
                  <Pause size={12} fill="currentColor" /> Pause stream
                </>
              ) : (
                <>
                  <Play size={12} fill="currentColor" /> Resume stream
                </>
              )}
            </button>

            <button
              onClick={onResetStream}
              title="Reset calibration and phase"
              className="px-2.5 py-2 rounded-lg bg-[var(--eef-inset)] border border-[var(--eef-border)] text-[var(--eef-text-2)] hover:bg-[var(--eef-surface-2)] hover:border-[var(--eef-border-strong)] transition-all"
            >
              <RefreshCw size={12} className={isStreaming ? "animate-spin-[duration:8s]" : ""} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Parameter Controls and Variable Stats */}
      <div className="grid grid-cols-1 @2xl:grid-cols-3 gap-4">

        {/* Dynamic Controls Sliders (Left 2 columns) */}
        <div className="@2xl:col-span-2 glass-panel rounded-xl p-3.5 flex flex-col gap-2.5">
          <span className="text-[11px] font-semibold text-[var(--eef-text-2)] flex items-center gap-1">
            <Sliders size={13} className="text-[var(--eef-accent)]" /> Signal controls and anomalies
          </span>

          <div className="grid grid-cols-1 @lg:grid-cols-2 gap-x-4 gap-y-3 pt-1">

            {/* Mosaic Graph Scale */}
            <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-[var(--eef-divider)]">
              <div className="flex justify-between items-center text-[11px] text-[var(--eef-text-2)]">
                <span className="flex items-center gap-1"><Sparkles size={10} className="text-[var(--eef-accent)]" /> Ecological mosaic scale</span>
                <span className="font-semibold tnum text-[var(--eef-text)]">{config.mosaicScale} nodes</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="20"
                value={config.mosaicScale}
                onChange={(e) => onChangeConfig({ mosaicScale: parseInt(e.target.value) })}
                className="h-1 bg-[var(--eef-border)] rounded-lg appearance-none cursor-pointer accent-[var(--eef-accent)]"
              />
              <span className="text-[9px] text-[var(--eef-text-3)]">Dynamically scale the multi-tile affinity graph size (20-node steps).</span>
            </div>

            {/* 3D Terrain Grid Resolution */}
            <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-[var(--eef-divider)]">
              <div className="flex justify-between items-center text-[11px] text-[var(--eef-text-2)]">
                <span className="flex items-center gap-1"><Sliders size={10} className="text-[var(--eef-accent)]" /> 3D terrain resolution</span>
                <span className="font-semibold tnum text-[var(--eef-text)]">{gridResolution}×{gridResolution}</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="20"
                value={gridResolution}
                onChange={(e) => onChangeGridResolution(parseInt(e.target.value))}
                className="h-1 bg-[var(--eef-border)] rounded-lg appearance-none cursor-pointer accent-[var(--eef-accent)]"
              />
              <span className="text-[9px] text-[var(--eef-text-3)]">Cells per side of the terrain grid. Re-upload CSV/GeoTIFF after changing this to apply the new resolution.</span>
            </div>

            {/* Coupling Velocity / Stream Speed */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-[var(--eef-text-2)]">Stream speed</span>
                <span className="text-[var(--eef-text)] font-semibold tnum">{config.speedHz} Hz</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={config.speedHz}
                onChange={(e) => onChangeConfig({ speedHz: parseFloat(e.target.value) })}
                className="h-1 bg-[var(--eef-border)] rounded-lg appearance-none cursor-pointer accent-[var(--eef-accent)]"
              />
              <span className="text-[9px] text-[var(--eef-text-3)]">Amplifies edge weights in the ecological affinity graph.</span>
            </div>

            {/* Current Flow Speed */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-[var(--eef-text-2)]">Current velocity</span>
                <span className="text-[var(--eef-text)] font-semibold tnum">×{config.flowSpeed.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.2"
                value={config.flowSpeed}
                onChange={(e) => onChangeConfig({ flowSpeed: parseFloat(e.target.value) })}
                className="h-1 bg-[var(--eef-border)] rounded-lg appearance-none cursor-pointer accent-[var(--eef-accent)]"
              />
              <span className="text-[9px] text-[var(--eef-text-3)]">Adds directional bias to branch propagation and clustering.</span>
            </div>

            {/* Signal Noise Injection */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-[var(--eef-text-2)]">Gaussian noise (RMS)</span>
                <span className="text-[var(--eef-text)] font-semibold tnum">{config.noiseLevel.toFixed(2)} σ</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.2"
                step="0.02"
                value={config.noiseLevel}
                onChange={(e) => onChangeConfig({ noiseLevel: parseFloat(e.target.value) })}
                className="h-1 bg-[var(--eef-border)] rounded-lg appearance-none cursor-pointer accent-[var(--eef-accent)]"
              />
              <span className="text-[9px] text-[var(--eef-text-3)]">Controls embedding perturbation (similarity edge dropout).</span>
            </div>

            {/* Physical Anomaly pulser */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-[var(--eef-text-2)]">Thermal front intensity</span>
                <span className="text-[var(--eef-text)] font-semibold tnum">{(config.currentAnomaly * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1.0"
                step="0.1"
                value={config.currentAnomaly}
                onChange={(e) => onChangeConfig({ currentAnomaly: parseFloat(e.target.value) })}
                className="h-1 bg-[var(--eef-border)] rounded-lg appearance-none cursor-pointer accent-[var(--eef-accent)]"
              />
              <span className="text-[9px] text-[var(--eef-text-3)]">Adjusts spatial clustering thresholds (sharpens regime boundaries).</span>
            </div>

            {/* Sensor Calibration Drift */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-[var(--eef-text-2)]">Calibration drift</span>
                <span className="text-[var(--eef-text)] font-semibold tnum">{config.driftFactor.toFixed(2)} Δ</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.1"
                step="0.01"
                value={config.driftFactor}
                onChange={(e) => onChangeConfig({ driftFactor: parseFloat(e.target.value) })}
                className="h-1 bg-[var(--eef-border)] rounded-lg appearance-none cursor-pointer accent-[var(--eef-accent)]"
              />
              <span className="text-[9px] text-[var(--eef-text-3)]">Simulates temporal decay and gain loss in specific wavebands.</span>
            </div>

            {/* If uploaded custom CSV files layout frame selector */}
            {config.mode === "uploaded" && (
              <div className="flex flex-col gap-1 select-none animate-fade-in">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[var(--eef-text-2)]">Frame sweep</span>
                  <span className="text-[var(--eef-text)] font-semibold tnum">Frame {currentCSVFrameIdx + 1} / {csvFramesCount}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(0, csvFramesCount - 1)}
                  step="1"
                  value={currentCSVFrameIdx}
                  onChange={(e) => onChangeCSVFrameIdx(parseInt(e.target.value))}
                  className="h-1 bg-[var(--eef-border)] rounded-lg appearance-none cursor-pointer accent-[var(--eef-accent)]"
                />
                <span className="text-[9px] text-[var(--eef-text-3)]">Step manually through multi-frame temporal sequences.</span>
              </div>
            )}
          </div>
        </div>

        {/* High-Contrast Interactive Layer Controls (Right column) */}
        <div className="glass-panel rounded-xl p-3.5 flex flex-col gap-2 justify-between">

          <div>
            <span className="text-[11px] font-semibold text-[var(--eef-text-2)] flex items-center gap-1">
              <Settings size={13} className="text-[var(--eef-accent)]" /> Render settings
            </span>

            <div className="flex flex-col gap-2.5 mt-2.5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--eef-text-2)]">Layer gap</span>
                  <span className="text-[var(--eef-text)] font-semibold tnum">{spacing.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  step="0.5"
                  value={spacing}
                  onChange={(e) => onChangeSpacing(parseFloat(e.target.value))}
                  className="w-full h-1 bg-[var(--eef-border)] rounded appearance-none cursor-pointer accent-[var(--eef-accent)]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--eef-text-2)]">Displacement gain</span>
                  <span className="text-[var(--eef-text)] font-semibold tnum">{displacementGain.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="0.1"
                  value={displacementGain}
                  onChange={(e) => onChangeDisplacementGain(parseFloat(e.target.value))}
                  className="w-full h-1 bg-[var(--eef-border)] rounded appearance-none cursor-pointer accent-[var(--eef-accent)]"
                />
              </div>

              <div className="flex flex-wrap gap-1 mt-1">
                <button
                  onClick={() => onChangeShowTerrain(!showTerrain)}
                  className={`text-[10px] flex-1 min-w-[80px] py-1 rounded-lg transition-all border ${
                    showTerrain
                      ? "bg-[var(--eef-accent-soft)] border-[var(--eef-accent-ring)] text-[var(--eef-accent)]"
                      : "bg-[var(--eef-inset)] border-[var(--eef-border)] text-[var(--eef-text-3)] hover:bg-[var(--eef-surface-2)] hover:text-[var(--eef-text)]"
                  }`}
                >
                  Terrain
                </button>
                <button
                  onClick={() => onChangeShowWireframe(!showWireframe)}
                  className={`text-[10px] flex-1 min-w-[80px] py-1 rounded-lg transition-all border ${
                    showWireframe
                      ? "bg-[var(--eef-accent-soft)] border-[var(--eef-accent-ring)] text-[var(--eef-accent)]"
                      : "bg-[var(--eef-inset)] border-[var(--eef-border)] text-[var(--eef-text-3)] hover:bg-[var(--eef-surface-2)] hover:text-[var(--eef-text)]"
                  }`}
                >
                  Wireframe
                </button>
                <button
                  onClick={() => onChangeShowLabels(!showLabels)}
                  className={`text-[10px] flex-1 min-w-[80px] py-1 rounded-lg transition-all border ${
                    showLabels
                      ? "bg-[var(--eef-accent-soft)] border-[var(--eef-accent-ring)] text-[var(--eef-accent)]"
                      : "bg-[var(--eef-inset)] border-[var(--eef-border)] text-[var(--eef-text-3)] hover:bg-[var(--eef-surface-2)] hover:text-[var(--eef-text)]"
                  }`}
                >
                  Labels
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--eef-divider)] pt-2 mt-2">
            <span className="text-[10px] font-semibold text-[var(--eef-text-3)] block">Camera angle</span>
            <div className="flex gap-1.5 mt-1.5">
              <button
                onClick={() => onChangeCameraPreset("iso")}
                className={`text-[10px] flex-1 py-1 rounded-lg transition-all border ${
                  cameraPreset === "iso" ? "bg-[var(--eef-accent)] border-[var(--eef-accent)] text-white font-semibold" : "bg-[var(--eef-inset)] border-[var(--eef-border)] text-[var(--eef-text-2)] hover:bg-[var(--eef-surface-2)]"
                }`}
              >
                Isometric
              </button>
              <button
                onClick={() => onChangeCameraPreset("top")}
                className={`text-[10px] flex-1 py-1 rounded-lg transition-all border ${
                  cameraPreset === "top" ? "bg-[var(--eef-accent)] border-[var(--eef-accent)] text-white font-semibold" : "bg-[var(--eef-inset)] border-[var(--eef-border)] text-[var(--eef-text-2)] hover:bg-[var(--eef-surface-2)]"
                }`}
              >
                Plan view
              </button>
              <button
                onClick={() => onChangeCameraPreset("profile")}
                className={`text-[10px] flex-1 py-1 rounded-lg transition-all border ${
                  cameraPreset === "profile" ? "bg-[var(--eef-accent)] border-[var(--eef-accent)] text-white font-semibold" : "bg-[var(--eef-inset)] border-[var(--eef-border)] text-[var(--eef-text-2)] hover:bg-[var(--eef-surface-2)]"
                }`}
              >
                Elevation
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Real-time Channel Sparkline Cockpit Gauges */}
      <div className="glass-panel rounded-xl p-3.5 flex flex-col gap-2">
        <span className="text-[11px] font-semibold text-[var(--eef-text-2)] flex items-center gap-1.5">
          <Zap size={13} className="text-[var(--eef-accent)]" /> Satellite bands
        </span>

        <div className="@container grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-7 gap-2.5 mt-1">
          {(Object.keys(VARIABLE_METADATA) as VariableName[]).map((key) => {
            const meta = VARIABLE_METADATA[key];
            const avg = variableAverages[key] || 0;
            const history = averageHistory[key] || Array(25).fill(0.5);
            const stats = dataCube.stats[key] || { min: 0, max: 1, mean: 0.5 };

            return (
              <div key={key} className="flex flex-col border border-[var(--eef-border)] rounded-lg glass-panel p-2 relative group hover:border-[var(--eef-border-strong)] transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full rounded-l" style={{ backgroundColor: meta.color }} />

                <div className="flex justify-between items-center text-xs ml-1">
                  <span className="font-semibold" style={{ color: meta.color }}>{key.replace(/_/g, " ")}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-[var(--eef-text-3)]">{meta.unit}</span>
                    {onExportLayer && (
                      <button
                        type="button"
                        title={`Export ${key} layer as PNG`}
                        onClick={() => onExportLayer(key)}
                        className="text-[var(--eef-text-3)] hover:text-[var(--eef-accent)] text-[10px] leading-none px-0.5 transition-colors"
                      >↓</button>
                    )}
                  </div>
                </div>

                {/* Sparkling value */}
                <div className="text-base font-semibold tnum tracking-tight text-[var(--eef-text)] mt-1 ml-1 flex items-baseline gap-0.5 justify-between">
                  <span>{avg.toFixed(3)}</span>
                  <span className="text-[9px] font-normal" style={{ color: meta.color }}>avg</span>
                </div>

                {/* SVG sparkline representing running history */}
                <div className="h-6 mt-1.5 ml-1">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 110 24" preserveAspectRatio="none">
                    {/* Running history path */}
                    <path
                      d={drawSparkline(history)}
                      fill="none"
                      stroke={meta.color}
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Floating current dot */}
                    <circle
                      cx="110"
                      cy={24 - ((history[history.length - 1] - 0) / (1 - 0)) * 20 - 2}
                      r="2.5"
                      fill={meta.color}
                    />
                  </svg>
                </div>

                {/* Visual Scale and physical limits */}
                <div className="mt-2.5 ml-1 pt-2 border-t border-[var(--eef-divider)] flex flex-col gap-1">
                  <ColorPickerPopover
                    label={key}
                    gradient={getCSSGradient(key, customColors[key], customColorsFrom?.[key])}
                    value={customColors[key]}
                    defaultHex={meta.color}
                    onChange={(hex) => onChangeCustomColor(key, hex)}
                    onReset={() => onResetCustomColor(key)}
                    fromValue={customColorsFrom?.[key]}
                    defaultFromHex="#050508"
                    onChangeFrom={onChangeCustomColorFrom ? (hex) => onChangeCustomColorFrom(key, hex) : undefined}
                  />
                  <div className="flex justify-between items-center text-[9px] tnum text-[var(--eef-text-3)] leading-none">
                    <span>{stats.min.toFixed(2)}</span>
                    <span>{stats.max.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
