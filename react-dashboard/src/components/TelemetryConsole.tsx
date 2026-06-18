import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, RefreshCw, Upload, FileSpreadsheet, Settings, Sliders, Zap, Sparkles, Database } from "lucide-react";
import { TelemetryStreamConfig, VariableName, VARIABLE_METADATA, StreamMode, DataCube } from "../types";
import { parseCSVToCubes } from "../telemetryGenerator";
import { getCSSGradient } from "../utils/colormaps";
import { ColorPickerPopover } from "./ColorPickerPopover";

interface TelemetryConsoleProps {
  config: TelemetryStreamConfig;
  onChangeConfig: (newConfig: Partial<TelemetryStreamConfig>) => void;
  isStreaming: boolean;
  onToggleStreaming: () => void;
  onResetStream: () => void;
  onUploadCSVData: (cubes: DataCube[], fileName?: string) => void;
  customColors: Partial<Record<VariableName, string>>;
  onChangeCustomColor: (name: VariableName, hex: string) => void;
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
}

export const TelemetryConsole: React.FC<TelemetryConsoleProps> = ({
  config,
  onChangeConfig,
  isStreaming,
  onToggleStreaming,
  onResetStream,
  onUploadCSVData,
  customColors,
  onChangeCustomColor,
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
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    KD490: Array(25).fill(0.4)
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
        const cubes = parseCSVToCubes(text);
        onUploadCSVData(cubes, file.name);
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
    <div className="@container flex flex-col gap-4 text-white h-full select-none">

      {/* 1. Header Toggles for Data Source */}
      <div className="glass-panel rounded-lg p-3.5 flex flex-col gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 flex items-center gap-1.5">
          <Database size={13} className="text-white/60" /> SELECT TELEMETRY COUPLING SOURCE
        </span>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 @lg:grid-cols-5 gap-1.5 mt-1">
          <button
            onClick={() => handlePresetSelect("synthetic")}
            className={`text-xs px-2 py-1.5 rounded font-medium border transition-all ${
              config.mode === "synthetic"
                ? "bg-white/15 border-white/40 text-white shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                : "bg-white/3 border-transparent text-white/60 hover:bg-white/8 hover:text-white"
            }`}
          >
            Synthetic Stream
          </button>
          <button
            onClick={() => handlePresetSelect("preset_coastal")}
            className={`text-xs px-2 py-1.5 rounded font-medium border transition-all ${
              config.mode === "preset_coastal"
                ? "bg-white/15 border-white/40 text-white shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                : "bg-white/3 border-transparent text-white/60 hover:bg-white/8 hover:text-white"
            }`}
          >
            Coastal Preset
          </button>
          <button
            onClick={() => handlePresetSelect("preset_deepsea")}
            className={`text-xs px-2 py-1.5 rounded font-medium border transition-all ${
              config.mode === "preset_deepsea"
                ? "bg-white/15 border-white/40 text-white shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                : "bg-white/3 border-transparent text-white/60 hover:bg-white/8 hover:text-white"
            }`}
          >
            Pelagic Preset
          </button>
          <button
            onClick={() => handlePresetSelect("preset_estuary")}
            className={`text-xs px-2 py-1.5 rounded font-medium border transition-all ${
              config.mode === "preset_estuary"
                ? "bg-white/15 border-white/40 text-white shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                : "bg-white/3 border-transparent text-white/60 hover:bg-white/8 hover:text-white"
            }`}
          >
            Estuary Preset
          </button>
          <button
            onClick={() => handlePresetSelect("uploaded")}
            disabled={!activeCSVFileName}
            className={`text-xs col-span-2 @lg:col-span-1 px-2 py-1.5 rounded font-medium border transition-all flex items-center justify-center gap-1 ${
              config.mode === "uploaded"
                ? "bg-white/15 border-white/40 text-white shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                : activeCSVFileName
                ? "bg-white/3 border-transparent text-white/60 hover:bg-white/8 hover:text-white"
                : "opacity-30 cursor-not-allowed bg-black/20 text-white/30 border-transparent"
            }`}
          >
            <FileSpreadsheet size={12} /> CSV Playback
          </button>
        </div>

        {/* Data provenance caption — clarifies what each source actually represents */}
        <p className="text-[10px] font-mono text-white/35 leading-relaxed mt-1">
          {config.mode === "uploaded"
            ? "User-supplied CSV grid data, played back frame-by-frame as uploaded."
            : "Illustrative synthetic parameter set generated locally — not derived from satellite observations or real sensor data."}
        </p>
      </div>

      {/* 2. Upload / Drag Zone if CSV selected */}
      <div className="grid grid-cols-1 @lg:grid-cols-3 gap-3">

        {/* CSV File Drop Box */}
        <div className="@lg:col-span-2 glass-panel rounded-lg p-3.5 flex flex-col justify-center">
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border border-dashed rounded-lg p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${
              dragActive ? "border-white bg-white/10" : "border-white/15 hover:border-white/40 hover:bg-white/5"
            }`}
          >
            <Upload className="text-white/40" size={20} />
            <span className="text-xs text-white/95">
              Drag-and-Drop <span className="text-white font-bold underline decoration-white/45">satellite.csv</span> or browse
            </span>
            <span className="text-[10px] text-white/40 font-mono">
              Accepts 20x20 cell vectors (400 samples/row-mesh)
            </span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv"
              className="hidden"
            />
          </div>

          {errorMsg && (
            <div className="mt-2 text-[11px] text-rose-300 font-mono text-center border border-rose-500/20 bg-rose-500/5 rounded p-1.5">
              ERROR: {errorMsg}
            </div>
          )}

          {activeCSVFileName && (
            <div className="mt-2 text-xs flex items-center justify-between border-t border-white/5 pt-2 text-white/50">
              <span className="flex items-center gap-1 text-[11px] font-mono text-white/80">
                <FileSpreadsheet size={11} className="text-white/40" /> {activeCSVFileName.length > 25 ? activeCSVFileName.substring(0, 25) + "..." : activeCSVFileName}
              </span>
              <span className="text-[10px] font-mono">
                Frame {currentCSVFrameIdx + 1} of {csvFramesCount}
              </span>
            </div>
          )}
        </div>

        {/* Real-time Status Gauge & Master Stream Triggers */}
        <div className="glass-panel rounded-lg p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/70">STREAM STATUS</span>
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-widest ${
                isStreaming ? "bg-white/15 text-white pulse-teal-glow shadow-[0_0_8px_rgba(255,255,255,0.1)]" : "bg-white/5 text-white/30"
              }`}>
                ● {isStreaming ? "COUPLED" : "STANDBY"}
              </span>
            </div>
            
            {/* Status explanation */}
            <p className="text-[10px] text-white/50 mt-1.5 leading-relaxed font-mono">
              {isStreaming 
                ? `Syncing dynamic spatial cubes at ${config.speedHz}Hz intervals to telemetry core.` 
                : "Active coupling offline. Spatial grids are static. Ready to fire stream."
              }
            </p>
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={onToggleStreaming}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded font-medium text-xs border transition-all ${
                isStreaming
                  ? "bg-white/10 border-white/20 hover:bg-white/20 text-white"
                  : "bg-white/25 border-white/40 hover:bg-white/35 text-white font-bold"
              }`}
            >
              {isStreaming ? (
                <>
                  <Pause size={12} fill="currentColor" /> MUTE COUPLING
                </>
              ) : (
                <>
                  <Play size={12} fill="currentColor" /> COUPLE TELEMETRY
                </>
              )}
            </button>
            
            <button
              onClick={onResetStream}
              title="Reset Calibration & Phase"
              className="px-2.5 py-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <RefreshCw size={12} className={isStreaming ? "animate-spin-[duration:8s]" : ""} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Parameter Controls and Variable Stats */}
      <div className="grid grid-cols-1 @2xl:grid-cols-3 gap-4">

        {/* Dynamic Controls Sliders (Left 2 columns) */}
        <div className="@2xl:col-span-2 glass-panel rounded-lg p-3.5 flex flex-col gap-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 flex items-center gap-1">
            <Sliders size={13} className="text-white/60" /> STREAM SIGNAL MODULATORS & PHYSICAL ANOMALIES
          </span>

          <div className="grid grid-cols-1 @lg:grid-cols-2 gap-x-4 gap-y-3 pt-1">
            
            {/* Speed Hz (If streaming or custom csv player) */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-white/60">Coupling Velocity (Hz)</span>
                <span className="text-white font-bold">{config.speedHz} fps (Hz)</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={config.speedHz}
                onChange={(e) => onChangeConfig({ speedHz: parseFloat(e.target.value) })}
                className="h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <span className="text-[9px] text-white/30">Drives processing rate of spatial telemetry ticks.</span>
            </div>

            {/* Current Flow Speed */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-white/60">Fluid Current Velocity</span>
                <span className="text-white font-bold">×{config.flowSpeed.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.2"
                value={config.flowSpeed}
                onChange={(e) => onChangeConfig({ flowSpeed: parseFloat(e.target.value) })}
                className="h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <span className="text-[9px] text-white/30">Modulates spatial drift speed for flowing plumes.</span>
            </div>

            {/* Signal Noise Injection */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-white/60">Gaussian Noise Injector (RMS)</span>
                <span className="text-white font-bold">{config.noiseLevel.toFixed(2)} σ</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.2"
                step="0.02"
                value={config.noiseLevel}
                onChange={(e) => onChangeConfig({ noiseLevel: parseFloat(e.target.value) })}
                className="h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <span className="text-[9px] text-white/30">Injects pixel-wise sensor scatter and atmospheric dispersion.</span>
            </div>

            {/* Physical Anomaly pulser */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-white/60">Eutrophic/Thermal Front Impulser</span>
                <span className="text-white font-bold">{(config.currentAnomaly * 100).toFixed(0)}% Intensity</span>
              </div>
              <input
                type="range"
                min="0"
                max="1.0"
                step="0.1"
                value={config.currentAnomaly}
                onChange={(e) => onChangeConfig({ currentAnomaly: parseFloat(e.target.value) })}
                className="h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <span className="text-[9px] text-white/30">Controls center-right sediment/phytoplankton focal outbreaks.</span>
            </div>

            {/* Sensor Calibration Drift */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-white/60">Radiometer Calibration Decay (Drift)</span>
                <span className="text-white font-bold">{config.driftFactor.toFixed(2)} Δ</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.1"
                step="0.01"
                value={config.driftFactor}
                onChange={(e) => onChangeConfig({ driftFactor: parseFloat(e.target.value) })}
                className="h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <span className="text-[9px] text-white/30">Simulates temporal decay and gain loss in specific wavebands.</span>
            </div>

            {/* If uploaded custom CSV files layout frame selector */}
            {config.mode === "uploaded" && (
              <div className="flex flex-col gap-1 select-none animate-fade-in">
                <div className="flex justify-between items-center text-[11px] font-mono">
                  <span className="text-white/60">Animate Frame Sweep</span>
                  <span className="text-white font-bold">Frame {currentCSVFrameIdx + 1} / {csvFramesCount}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(0, csvFramesCount - 1)}
                  step="1"
                  value={currentCSVFrameIdx}
                  onChange={(e) => onChangeCSVFrameIdx(parseInt(e.target.value))}
                  className="h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <span className="text-[9px] text-white/30">Step manually through multi-frame temporal sequences.</span>
              </div>
            )}
          </div>
        </div>

        {/* High-Contrast Interactive Layer Controls (Right column) */}
        <div className="glass-panel rounded-lg p-3.5 flex flex-col gap-2 justify-between">
          
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 flex items-center gap-1">
              <Settings size={13} className="text-white/60" /> 3D RENDER ENGINE CALIBRATION
            </span>
            
            <div className="flex flex-col gap-2.5 mt-2.5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/50">Vertical Layer Gap</span>
                  <span className="text-white font-bold">{spacing.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  step="0.5"
                  value={spacing}
                  onChange={(e) => onChangeSpacing(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer accent-white"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/50">Displacement Gain</span>
                  <span className="text-white font-bold">{displacementGain.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="0.1"
                  value={displacementGain}
                  onChange={(e) => onChangeDisplacementGain(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer accent-white"
                />
              </div>

              <div className="flex flex-wrap gap-1 mt-1">
                <button
                  onClick={() => onChangeShowTerrain(!showTerrain)}
                  className={`text-[10px] font-mono flex-1 min-w-[80px] py-1 rounded transition-all border ${
                    showTerrain
                      ? "bg-white/15 border-white/40 text-white"
                      : "bg-white/3 border-white/5 text-white/50 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  3D TERRAIN
                </button>
                <button
                  onClick={() => onChangeShowWireframe(!showWireframe)}
                  className={`text-[10px] font-mono flex-1 min-w-[80px] py-1 rounded transition-all border ${
                    showWireframe
                      ? "bg-white/15 border-white/40 text-white"
                      : "bg-white/3 border-white/5 text-white/50 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  WIREFRAME
                </button>
                <button
                  onClick={() => onChangeShowLabels(!showLabels)}
                  className={`text-[10px] font-mono flex-1 min-w-[80px] py-1 rounded transition-all border ${
                    showLabels
                      ? "bg-white/15 border-white/40 text-white"
                      : "bg-white/3 border-white/5 text-white/50 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  BILLBOARDS
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-2 mt-2">
            <span className="text-[10px] font-bold text-white/40 block tracking-wider font-mono">CAMERA MATRIX ANGLE presets</span>
            <div className="flex gap-1.5 mt-1.5">
              <button
                onClick={() => onChangeCameraPreset("iso")}
                className={`text-[10px] font-mono flex-1 py-1 rounded transition-all ${
                  cameraPreset === "iso" ? "bg-white text-black font-extrabold shadow-[0_0_10px_rgba(255,255,255,0.15)]" : "bg-white/5 text-white/80 hover:bg-white/10"
                }`}
              >
                ISOMETRIC (30°)
              </button>
              <button
                onClick={() => onChangeCameraPreset("top")}
                className={`text-[10px] font-mono flex-1 py-1 rounded transition-all ${
                  cameraPreset === "top" ? "bg-white text-black font-extrabold shadow-[0_0_10px_rgba(255,255,255,0.15)]" : "bg-white/5 text-white/80 hover:bg-white/10"
                }`}
              >
                PLAN VIEW (90°)
              </button>
              <button
                onClick={() => onChangeCameraPreset("profile")}
                className={`text-[10px] font-mono flex-1 py-1 rounded transition-all ${
                  cameraPreset === "profile" ? "bg-white text-black font-extrabold shadow-[0_0_10px_rgba(255,255,255,0.15)]" : "bg-white/5 text-white/80 hover:bg-white/10"
                }`}
              >
                ELEVATION (0°)
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Real-time Channel Sparkline Cockpit Gauges */}
      <div className="glass-panel rounded-lg p-3.5 flex flex-col gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-white/85 flex items-center gap-1.5">
          <Zap size={13} className="text-white/60 pulse-teal-glow rounded-full p-0.5" /> REAL-TIME SATELLITE BAND MATRIX TELEMETRY (SPARKLINES)
        </span>
        
        <div className="@container grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-7 gap-2.5 mt-1">
          {(Object.keys(VARIABLE_METADATA) as VariableName[]).map((key) => {
            const meta = VARIABLE_METADATA[key];
            const avg = variableAverages[key] || 0;
            const history = averageHistory[key] || Array(25).fill(0.5);
            const stats = dataCube.stats[key] || { min: 0, max: 1, mean: 0.5 };

            return (
              <div key={key} className="flex flex-col border border-white/5 rounded bg-black/40 p-2 relative group hover:border-white/10 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full rounded-l" style={{ backgroundColor: meta.color }} />

                {/* Hover explanation tooltip */}
                <div className="pointer-events-none absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-2 rounded-md bg-black/95 border border-white/10 text-[10px] text-white/80 leading-snug opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                  <span className="font-bold block mb-0.5" style={{ color: meta.color }}>{meta.label}</span>
                  {meta.description}
                </div>
                
                <div className="flex justify-between items-center text-xs font-mono ml-1">
                  <span className="font-extrabold" style={{ color: meta.color }}>{key}</span>
                  <span className="text-[10px] text-white/40">{meta.unit}</span>
                </div>

                {/* Sparkling value */}
                <div className="text-base font-bold font-mono tracking-tight text-white/95 mt-1 ml-1 flex items-baseline gap-0.5 justify-between">
                  <span>{avg.toFixed(3)}</span>
                  <span className="text-[9px] font-normal" style={{ color: meta.color }}>avg</span>
                </div>

                {/* SVG sparkline representing running history */}
                <div className="h-6 mt-1.5 ml-1">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 110 24" preserveAspectRatio="none">
                    {/* Glowing background path */}
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
                      className="animate-pulse"
                    />
                  </svg>
                </div>

                {/* Visual Scale and physical limits */}
                <div className="mt-2.5 ml-1 pt-2 border-t border-white/5 flex flex-col gap-1">
                  <ColorPickerPopover
                    label={key}
                    gradient={getCSSGradient(key, customColors[key])}
                    value={customColors[key]}
                    defaultHex={meta.color}
                    onChange={(hex) => onChangeCustomColor(key, hex)}
                    onReset={() => onResetCustomColor(key)}
                  />
                  <div className="flex justify-between items-center text-[9px] font-mono text-white/50 leading-none">
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
