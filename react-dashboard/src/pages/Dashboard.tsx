import { useState, useEffect, useMemo, useRef, CSSProperties } from "react";
import { Link } from "react-router-dom";
import {
  Database,
  Radio,
  Settings,
  Compass,
  Waves,
  Sparkles,
  HelpCircle,
  User,
  Cpu,
  RefreshCw,
  Info,
  ArrowLeft
} from "lucide-react";
import {
  TelemetryStreamConfig,
  VariableName,
  VARIABLE_METADATA,
  LayerState,
  DataCube
} from "../types";
import {
  generateDataCube,
  evaluateScientificDiagnostics
} from "../telemetryGenerator";
import { ThreeViewport } from "../components/ThreeViewport";
import { TelemetryConsole } from "../components/TelemetryConsole";
import { DiagnosticsPanel } from "../components/DiagnosticsPanel";
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from "react-resizable-panels";
import { useUIStore } from "../store/useUIStore";

// Detects the packaged Electron shell so the header can clear the macOS traffic-light buttons
const isElectron = typeof navigator !== "undefined" && navigator.userAgent.includes("Electron");

export default function Dashboard() {
  const markDashboardLaunched = useUIStore((s) => s.markDashboardLaunched);
  useEffect(() => {
    markDashboardLaunched();
  }, [markDashboardLaunched]);

  // 1. Telemetry Coupling Configuration States
  const [config, setConfig] = useState<TelemetryStreamConfig>({
    mode: "synthetic",
    speedHz: 1.5,
    noiseLevel: 0.03,
    currentAnomaly: 0.0,
    driftFactor: 0.0,
    flowSpeed: 1.0,
  });

  const [isStreaming, setIsStreaming] = useState(true);
  const [stepSeconds, setStepSeconds] = useState(0);

  // 2. Custom Uploaded CSV Data Player States
  const [uploadedCubes, setUploadedCubes] = useState<DataCube[]>([]);
  const [activeFileName, setActiveFileName] = useState<string | null>(null);
  const [currentCSVFrameIdx, setCurrentCSVFrameIdx] = useState(0);

  // Custom per-variable accent colors, persisted across sessions
  const [customColors, setCustomColors] = useState<Partial<Record<VariableName, string>>>(() => {
    try {
      const saved = localStorage.getItem("eef.customColors");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("eef.customColors", JSON.stringify(customColors));
    } catch {
      // localStorage unavailable — ignore
    }
  }, [customColors]);

  const handleChangeCustomColor = (name: VariableName, hex: string) => {
    setCustomColors(prev => ({ ...prev, [name]: hex }));
  };

  const handleResetCustomColor = (name: VariableName) => {
    setCustomColors(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  // 3. 3D Render Engine States
  const [spacing, setSpacing] = useState(3.0);
  const [displacementGain, setDisplacementGain] = useState(2.5);
  const [showTerrain, setShowTerrain] = useState(true);
  const [showWireframe, setShowWireframe] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [cameraPreset, setCameraPreset] = useState<"iso" | "top" | "profile">("iso");

  // Layer toggles & opacities
  const [layerState, setLayerState] = useState<Record<VariableName, LayerState>>({
    CHL: { visible: true, opacity: 0.72 },
    aphy: { visible: true, opacity: 0.72 },
    ADG: { visible: true, opacity: 0.72 },
    bbp: { visible: true, opacity: 0.72 },
    TSM: { visible: true, opacity: 0.72 },
    PAR: { visible: true, opacity: 0.72 },
    KD490: { visible: true, opacity: 0.72 },
  });

  // 4. Real-time UTC Ticking Clock (For professional scientific console look)
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 5. Active Data Cube State (Either computed in real-time or loaded from Custom CSV Frames)
  const [activeDataCube, setActiveDataCube] = useState<DataCube>(() => {
    return generateDataCube(0, {
      mode: "synthetic",
      speedHz: 1.5,
      noiseLevel: 0.03,
      currentAnomaly: 0.0,
      driftFactor: 0.0,
      flowSpeed: 1.0,
    });
  });

  // Master telemetry tick generator loop
  useEffect(() => {
    if (!isStreaming) return;

    const intervalMs = 1000 / config.speedHz;

    const tick = () => {
      if (config.mode === "uploaded" && uploadedCubes.length > 0) {
        setCurrentCSVFrameIdx((prev) => {
          const nextIdx = (prev + 1) % uploadedCubes.length;
          setActiveDataCube(uploadedCubes[nextIdx]);
          return nextIdx;
        });
      } else {
        // Generate synthetic or preset fluid streams
        setStepSeconds((prevSec) => {
          const nextSec = prevSec + (1 / config.speedHz);
          const nextCube = generateDataCube(nextSec, config);
          setActiveDataCube(nextCube);
          return nextSec;
        });
      }
    };

    const timer = setInterval(tick, intervalMs);
    return () => clearInterval(timer);
  }, [isStreaming, config, uploadedCubes]);

  // Handle manual frame slide for custom CSV player (when playing or paused)
  const handleCSVFrameIndexChange = (idx: number) => {
    if (uploadedCubes[idx]) {
      setCurrentCSVFrameIdx(idx);
      setActiveDataCube(uploadedCubes[idx]);
    }
  };

  // Re-run spatial calculations when mode changes directly
  useEffect(() => {
    if (config.mode !== "uploaded") {
      const initialCube = generateDataCube(stepSeconds, config);
      setActiveDataCube(initialCube);
    } else if (uploadedCubes.length > 0) {
      setActiveDataCube(uploadedCubes[currentCSVFrameIdx] || uploadedCubes[0]);
    }
  }, [config.mode]);

  // 6. Multi-dimensional Scientific Analyst (calculates GMM, Novelty, Boundaries & reasons on active snapshot)
  const analysisResult = useMemo(() => {
    return evaluateScientificDiagnostics(activeDataCube);
  }, [activeDataCube]);

  // Calculate live average levels of each parameters to display on sparkline indicators
  const variableAverages = useMemo(() => {
    const avgs = {} as Record<VariableName, number>;
    const keys: VariableName[] = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490"];
    keys.forEach((key) => {
      avgs[key] = activeDataCube.stats[key].mean;
    });
    return avgs;
  }, [activeDataCube]);

  // Master handles
  const handleConfigChange = (newConfig: Partial<TelemetryStreamConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const handleUploadCSVData = (cubes: DataCube[], fileName?: string) => {
    if (cubes.length === 0) return;
    const name = fileName || "satellite_grid_mesh.csv";
    setUploadedCubes(cubes);
    setActiveFileName(name);
    setCurrentCSVFrameIdx(0);
    setActiveDataCube(cubes[0]);
    setConfig(prev => ({ ...prev, mode: "uploaded" }));
    try {
      localStorage.setItem("eef.uploadedCubes", JSON.stringify({ cubes, fileName: name }));
    } catch {
      // localStorage unavailable or quota exceeded — uploaded data won't persist
    }
  };

  // Restore previously uploaded CSV playback data on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("eef.uploadedCubes");
      if (!saved) return;
      const { cubes, fileName } = JSON.parse(saved) as { cubes: DataCube[]; fileName: string };
      if (Array.isArray(cubes) && cubes.length > 0) {
        setUploadedCubes(cubes);
        setActiveFileName(fileName);
        setActiveDataCube(cubes[0]);
        setConfig(prev => ({ ...prev, mode: "uploaded" }));
      }
    } catch {
      // ignore malformed/missing persisted data
    }
  }, []);

  const handleToggleLayer = (name: VariableName) => {
    setLayerState(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        visible: !prev[name].visible
      }
    }));
  };

  const handleLayerOpacityChange = (name: VariableName, opacity: number) => {
    setLayerState(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        opacity
      }
    }));
  };

  const handleResetStream = () => {
    setStepSeconds(0);
    setCurrentCSVFrameIdx(0);
    const blank = generateDataCube(0, {
      ...config,
      currentAnomaly: 0,
      driftFactor: 0,
      noiseLevel: 0.02
    });
    setActiveDataCube(blank);
    setConfig(prev => ({
      ...prev,
      currentAnomaly: 0,
      driftFactor: 0,
      noiseLevel: 0.02,
      flowSpeed: 1.0,
      speedHz: 1.5
    }));
  };

  return (
    <div className="h-screen bg-[#030307] text-[#f8fafc] flex flex-col antialiased selection:bg-white selection:text-black">
      
      {/* ── DESIGNER HEADER BAR ── */}
      {/* In the Electron shell, reserve space for the macOS traffic-light buttons */}
      {/* (hiddenInset title bar) and turn the header into a drag handle for the window. */}
      <header
        className={`h-[56px] border-b border-white/5 bg-[#030307]/80 backdrop-blur-xl pr-4 flex items-center justify-between z-10 sticky top-0 ${isElectron ? "pl-20" : "pl-4"}`}
        style={isElectron ? ({ WebkitAppRegion: "drag" } as CSSProperties) : undefined}
      >

        {/* Left Side: Brand & Ticking Status */}
        <div className="flex items-center gap-3">
          {!isElectron && (
            <Link
              to="/"
              className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
              aria-label="Back to overview"
            >
              <ArrowLeft size={14} />
            </Link>
          )}
          {/* Neon rotating radar logo */}
          <div className="relative w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-black text-sm select-none shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <Cpu size={16} className="animate-pulse" />
            <div className="absolute inset-0 rounded-lg border border-white/30 animate-ping-[duration:2s]" />
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black uppercase tracking-wider text-white">EEF</h1>
              <span className="text-white/30 text-xs">|</span>
              <span className="text-[11px] font-mono tracking-widest text-white/90 font-bold bg-white/10 border border-white/10 px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(255,255,255,0.05)]">
                ECOLOGICAL ENCODING FRAMEWORK
              </span>
            </div>
            <p className="text-[10px] text-white/40 font-mono tracking-tight leading-none mt-0.5">
              Multi-Layer Spectrometry Analysis Console
            </p>
          </div>
        </div>

        {/* Center: Live UTC Scientific Clock */}
        <div className="hidden md:flex items-center gap-2.5 px-3 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[11px] text-white font-bold">
          <span className="w-2 h-2 rounded-full bg-white pulse-teal-glow" />
          <span className="text-white/40 font-normal">LOCK TIMER:</span>
          <span>{currentTime || "UTC LOCKING..."}</span>
        </div>

        {/* Right Side: Environment metadata & email */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right font-mono">
            <span className="text-[10px] text-white/40 leading-none">FEEDBACK COUPLING:</span>
            <span className="text-[11px] text-white/80 leading-tight">iceicefelix@gmail.com</span>
          </div>
          
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/70">
            <User size={14} />
          </div>
        </div>
      </header>
 
      {/* ── MAIN COCKPIT BENTO CONTAINER ── */}
      <main className="flex-1 min-h-0 p-4 max-w-[1720px] w-full mx-auto overflow-hidden flex flex-col lg:block">
        <div className="hidden lg:block h-full">
        <PanelGroup orientation="horizontal" className="h-full gap-0">

          {/* SIDEBAR LEFT: Modulators & Coupling Controls */}
          <Panel defaultSize={33} minSize={22} className="flex flex-col min-h-0">
            <section className="flex flex-col gap-4 overflow-y-auto h-full min-h-0 pr-2">
              <div className="glass-panel rounded-xl p-4 flex-1 flex flex-col gap-3 min-h-[420px]">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
                    <Database size={13} className="text-white/60" /> SENSOR COUPLING AND DECODER CONSOLE
                  </h2>
                  <span className="text-[10px] font-mono text-white/40 font-bold">DECODER_CORE</span>
                </div>

                <div className="flex-1">
                  <TelemetryConsole
                    config={config}
                    onChangeConfig={handleConfigChange}
                    isStreaming={isStreaming}
                    onToggleStreaming={() => setIsStreaming(!isStreaming)}
                    onResetStream={handleResetStream}
                    onUploadCSVData={handleUploadCSVData}
                    customColors={customColors}
                    onChangeCustomColor={handleChangeCustomColor}
                    onResetCustomColor={handleResetCustomColor}
                    variableAverages={variableAverages}
                    activeCSVFileName={activeFileName}
                    csvFramesCount={uploadedCubes.length}
                    currentCSVFrameIdx={currentCSVFrameIdx}
                    onChangeCSVFrameIdx={handleCSVFrameIndexChange}
                    cameraPreset={cameraPreset}
                    onChangeCameraPreset={setCameraPreset}
                    showTerrain={showTerrain}
                    onChangeShowTerrain={setShowTerrain}
                    showWireframe={showWireframe}
                    onChangeShowWireframe={setShowWireframe}
                    showLabels={showLabels}
                    onChangeShowLabels={setShowLabels}
                    spacing={spacing}
                    onChangeSpacing={setSpacing}
                    displacementGain={displacementGain}
                    onChangeDisplacementGain={setDisplacementGain}
                    dataCube={activeDataCube}
                  />
                </div>
              </div>
            </section>
          </Panel>

          <PanelResizeHandle className="resize-handle" />

          {/* CENTER COLUMN: Interactive 3D WebGL Visualization */}
          <Panel defaultSize={42} minSize={20} className="flex flex-col min-h-0">
            <section className="flex flex-col gap-4 h-full min-h-0 px-2">
              <div className="glass-panel rounded-xl overflow-hidden flex-1 relative flex flex-col">

                {/* Hologram details on stage */}
                <div className="absolute top-3 left-3 z-20 pointer-events-none select-none">
                  <div className="flex items-center gap-1.5">
                    <Radio className="text-white pulse-teal-glow rounded-full p-0.5" size={12} />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">
                      REAL-TIME 3D GRIDS MATRIX HUD
                    </span>
                  </div>
                  <p className="text-[9px] font-mono text-white/45 leading-none mt-0.5">
                    Multi-Layer Spectrometry Terrain Map (20 × 20 Grid)
                  </p>
                </div>

                {/* Float helper in the stage corner */}
                <div className="absolute bottom-4 left-4 z-20 text-[10px] font-mono text-white/50 select-none bg-black/45 px-2.5 py-1.5 rounded-lg border border-white/5 backdrop-blur-md flex flex-col gap-0.5">
                  <span className="text-white/80 font-bold">DRAG:</span> Rotate angle (Orbit)
                  <span className="text-white/80 font-bold">WHEEL/PINCH:</span> Variable zoom scaling
                  <span className="text-white/80 font-bold">SHIFT KEYS:</span> Vertical spacing / Opacities
                </div>

                {/* Three.js Viewport element */}
                <div className="flex-1 w-full h-full">
                  <ThreeViewport
                    dataCube={activeDataCube}
                    layerState={layerState}
                    spacing={spacing}
                    displacementGain={displacementGain}
                    showTerrain={showTerrain}
                    showWireframe={showWireframe}
                    showLabels={showLabels}
                    cameraPreset={cameraPreset}
                    customColors={customColors}
                  />
                </div>
              </div>
            </section>
          </Panel>

          <PanelResizeHandle className="resize-handle" />

          {/* SIDEBAR RIGHT: Scientific Analyst and Statistical Diagnostic report */}
          <Panel defaultSize={25} minSize={16} className="flex flex-col min-h-0">
            <section className="flex flex-col gap-4 overflow-y-auto h-full min-h-0 pl-2">
              <div className="glass-panel rounded-xl p-4 flex-grow flex flex-col gap-3 min-h-[420px]">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
                    <Compass size={13} className="text-white/60" /> CLUSTER SEPARATION & ANOMALIES
                  </h2>
                  <span className="text-[10px] font-mono text-white/40 font-bold">DIAGNOSTICS_NODE</span>
                </div>

                <div className="flex-grow">
                  <DiagnosticsPanel
                    analysis={analysisResult}
                    dataCube={activeDataCube}
                    layerState={layerState}
                    onToggleLayer={handleToggleLayer}
                    onChangeLayerOpacity={handleLayerOpacityChange}
                    customColors={customColors}
                    onChangeCustomColor={handleChangeCustomColor}
                    onResetCustomColor={handleResetCustomColor}
                  />
                </div>
              </div>
            </section>
          </Panel>

        </PanelGroup>
        </div>

        {/* Mobile/narrow fallback: stacked layout, no resize handles */}
        <div className="lg:hidden flex flex-col gap-4 overflow-y-auto h-full">
          <div className="glass-panel rounded-xl p-4 flex flex-col gap-3 min-h-[420px]">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
                <Database size={13} className="text-white/60" /> SENSOR COUPLING AND DECODER CONSOLE
              </h2>
              <span className="text-[10px] font-mono text-white/40 font-bold">DECODER_CORE</span>
            </div>
            <TelemetryConsole
              config={config}
              onChangeConfig={handleConfigChange}
              isStreaming={isStreaming}
              onToggleStreaming={() => setIsStreaming(!isStreaming)}
              onResetStream={handleResetStream}
              onUploadCSVData={handleUploadCSVData}
              customColors={customColors}
              onChangeCustomColor={handleChangeCustomColor}
              onResetCustomColor={handleResetCustomColor}
              variableAverages={variableAverages}
              activeCSVFileName={activeFileName}
              csvFramesCount={uploadedCubes.length}
              currentCSVFrameIdx={currentCSVFrameIdx}
              onChangeCSVFrameIdx={handleCSVFrameIndexChange}
              cameraPreset={cameraPreset}
              onChangeCameraPreset={setCameraPreset}
              showTerrain={showTerrain}
              onChangeShowTerrain={setShowTerrain}
              showWireframe={showWireframe}
              onChangeShowWireframe={setShowWireframe}
              showLabels={showLabels}
              onChangeShowLabels={setShowLabels}
              spacing={spacing}
              onChangeSpacing={setSpacing}
              displacementGain={displacementGain}
              onChangeDisplacementGain={setDisplacementGain}
              dataCube={activeDataCube}
            />
          </div>

          <div className="glass-panel rounded-xl overflow-hidden relative flex flex-col h-[420px]">
            <div className="absolute top-3 left-3 z-20 pointer-events-none select-none">
              <div className="flex items-center gap-1.5">
                <Radio className="text-white pulse-teal-glow rounded-full p-0.5" size={12} />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">
                  REAL-TIME 3D GRIDS MATRIX HUD
                </span>
              </div>
              <p className="text-[9px] font-mono text-white/45 leading-none mt-0.5">
                Multi-Layer Spectrometry Terrain Map (20 × 20 Grid)
              </p>
            </div>
            <div className="flex-1 w-full h-full">
              <ThreeViewport
                dataCube={activeDataCube}
                layerState={layerState}
                spacing={spacing}
                displacementGain={displacementGain}
                showTerrain={showTerrain}
                showWireframe={showWireframe}
                showLabels={showLabels}
                cameraPreset={cameraPreset}
                customColors={customColors}
              />
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4 flex flex-col gap-3 min-h-[420px]">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
                <Compass size={13} className="text-white/60" /> CLUSTER SEPARATION & ANOMALIES
              </h2>
              <span className="text-[10px] font-mono text-white/40 font-bold">DIAGNOSTICS_NODE</span>
            </div>
            <DiagnosticsPanel
              analysis={analysisResult}
              dataCube={activeDataCube}
              layerState={layerState}
              onToggleLayer={handleToggleLayer}
              onChangeLayerOpacity={handleLayerOpacityChange}
              customColors={customColors}
              onChangeCustomColor={handleChangeCustomColor}
              onResetCustomColor={handleResetCustomColor}
            />
          </div>
        </div>
      </main>

      {/* ── COCOS COCKPIT UNDERGUARD FOOTER ── */}
      <footer className="h-[28px] border-t border-white/5 bg-[#030307] text-[10px] text-white/30 font-mono flex items-center justify-between px-4 select-none">
        <div>
          <span>EEF PIPELINE ENGINE · CLIENT-SIDE SPECTRAL RECONSTRUCTION CORE</span>
        </div>
        <div className="flex gap-4">
          <span>SYSTEM MODE: ACTIVE MATRIX</span>
        </div>
      </footer>

    </div>
  );
}
