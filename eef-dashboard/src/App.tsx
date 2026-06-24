import { useState, useEffect, useMemo, useRef, CSSProperties } from "react";
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
  Layers,
  Save,
  Upload
} from "lucide-react";
import {
  TelemetryStreamConfig,
  VariableName,
  VARIABLE_METADATA,
  LayerState,
  DataCube,
  RootVisualizationState,
  SpatialOverlayState,
  RelationshipGraphState,
  ConfidenceOverlayState
} from "./types";
import {
  generateDataCube,
  evaluateScientificDiagnostics,
  type RawCSVData
} from "./telemetryGenerator";
import { computeRootAnalysis, type RootAnalysis } from "./utils/eigenmath";
import { computeSpatialTensor, getSpatialChannelGrid, spatialChannelIndex } from "./utils/spatialTensor";
import { computeRelationshipTensor } from "./utils/relationshipTensor";
import { summarize as summarizeBloom, findHotspots, type FishermanSummary } from "./utils/bloomDetector";
import { generateEcologicalGraph } from "./utils/affinityGraph";
import { ThreeViewport, type ThreeViewportHandle, type PixelClickEvent } from "./components/ThreeViewport";
import { TelemetryConsole } from "./components/TelemetryConsole";
import { DiagnosticsPanel } from "./components/DiagnosticsPanel";
import { SpatialEncodingPanel } from "./components/SpatialEncodingPanel";
import { PixelInspectorPanel } from "./components/PixelInspectorPanel";
import { LatentEcologyPanel } from "./components/LatentEcologyPanel";
import { CSVInspectorPanel } from "./components/CSVInspectorPanel";
import { SizeClassPanel } from "./components/SizeClassPanel";
import { UpdateNotifier } from "./components/UpdateNotifier";
import { type PixelInspectorState } from "./gate1_pixel_inspector/types";
import { exploreLatentEcology, type LatentEcologyState } from "./gate2_understanding_roots/latentEcologyExplorer";
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from "react-resizable-panels";

// Detects the packaged Electron shell so the header can clear the macOS traffic-light buttons
const isElectron = typeof navigator !== "undefined" && navigator.userAgent.includes("Electron");

// A serializable snapshot of view/visualization settings only — never raw data
// (activeDataCube/uploadedCubes/activeEcologicalGraph), so save/load stays a tiny JSON file.
interface SessionSnapshot {
  version: 1;
  config: TelemetryStreamConfig;
  customColors: Partial<Record<VariableName, string>>;
  customColorsFrom: Partial<Record<VariableName, string>>;
  spacing: number;
  displacementGain: number;
  showTerrain: boolean;
  showWireframe: boolean;
  showLabels: boolean;
  cameraPreset: "iso" | "top" | "profile";
  rootState: RootVisualizationState;
  layerState: Record<VariableName, LayerState>;
  spatialOverlayState: SpatialOverlayState;
  relationshipGraphState: RelationshipGraphState;
  confidenceOverlayState: ConfidenceOverlayState;
  bloomOverlayState: { visible: boolean; opacity: number };
  gate2Visible: boolean;
}

export default function App() {
  // 1. Telemetry Coupling Configuration States
  const [config, setConfig] = useState<TelemetryStreamConfig>({
    mode: "synthetic",
    speedHz: 1.5,
    noiseLevel: 0.03,
    currentAnomaly: 0.0,
    driftFactor: 0.0,
    flowSpeed: 1.0,
    mosaicScale: 20,
  });

  const [isStreaming, setIsStreaming] = useState(true);
  const [stepSeconds, setStepSeconds] = useState(0);

  // 2. Custom Uploaded CSV Data Player States
  const [uploadedCubes, setUploadedCubes] = useState<DataCube[]>([]);
  const [activeFileName, setActiveFileName] = useState<string | null>(null);
  const [currentCSVFrameIdx, setCurrentCSVFrameIdx] = useState(0);
  // Raw, un-binned CSV rows (original columns) kept alongside the spatially-binned
  // DataCube grid — powers the CSV Inspector's raw-row table + column chart, which
  // looks at the data the way the user's spreadsheet does rather than the 20x20 grid.
  const [csvRawData, setCsvRawData] = useState<RawCSVData | null>(null);
  const [csvInspectorVisible, setCsvInspectorVisible] = useState(false);
  const [sizeClassVisible, setSizeClassVisible] = useState(false);

  // Custom per-variable accent colors (bright peak), persisted across sessions
  const [customColors, setCustomColors] = useState<Partial<Record<VariableName, string>>>(() => {
    try { return JSON.parse(localStorage.getItem("eef.customColors") || "{}"); } catch { return {}; }
  });
  // Custom per-variable base colors (dark floor of gradient), persisted across sessions
  const [customColorsFrom, setCustomColorsFrom] = useState<Partial<Record<VariableName, string>>>(() => {
    try { return JSON.parse(localStorage.getItem("eef.customColorsFrom") || "{}"); } catch { return {}; }
  });

  useEffect(() => {
    try { localStorage.setItem("eef.customColors", JSON.stringify(customColors)); } catch { /* ignore */ }
  }, [customColors]);
  useEffect(() => {
    try { localStorage.setItem("eef.customColorsFrom", JSON.stringify(customColorsFrom)); } catch { /* ignore */ }
  }, [customColorsFrom]);

  const handleChangeCustomColor = (name: VariableName, hex: string) => {
    setCustomColors(prev => ({ ...prev, [name]: hex }));
  };
  const handleChangeCustomColorFrom = (name: VariableName, hex: string) => {
    setCustomColorsFrom(prev => ({ ...prev, [name]: hex }));
  };

  const handleResetCustomColor = (name: VariableName) => {
    setCustomColors(prev => { const next = { ...prev }; delete next[name]; return next; });
    setCustomColorsFrom(prev => { const next = { ...prev }; delete next[name]; return next; });
  };

  // 3. 3D Render Engine States
  const [spacing, setSpacing] = useState(3.0);
  const [displacementGain, setDisplacementGain] = useState(2.5);
  const [showTerrain, setShowTerrain] = useState(true);
  const [showWireframe, setShowWireframe] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [cameraPreset, setCameraPreset] = useState<"iso" | "top" | "profile">("iso");

  // Root visualization state
  const [rootState, setRootState] = useState<RootVisualizationState>({
    visible: true, opacity: 0.85, depth: 3, colorMode: 'cluster', selectedCluster: null
  });

  // Ref to main ThreeViewport for imperative PNG export
  const mainViewportRef = useRef<ThreeViewportHandle>(null);

  // Gate 1: Pixel Inspector state
  const [pixelInspectorState, setPixelInspectorState] = useState<PixelInspectorState>({
    visible: false,
    selectedPixel: null,
    hoveredPixel: null,
    neighborhoodRadius: 3,
    topNeighborCount: 5,
    selectedVariable: "CHL"
  });

  // Layer toggles & opacities
  const [layerState, setLayerState] = useState<Record<VariableName, LayerState>>({
    CHL: { visible: true, opacity: 0.72 },
    aphy: { visible: true, opacity: 0.72 },
    ADG: { visible: true, opacity: 0.72 },
    bbp: { visible: true, opacity: 0.72 },
    TSM: { visible: true, opacity: 0.72 },
    PAR: { visible: true, opacity: 0.72 },
    KD490: { visible: true, opacity: 0.72 },
    FLH: { visible: true, opacity: 0.72 },
    CHL_disagreement: { visible: true, opacity: 0.72 },
    OA08: { visible: true, opacity: 0.72 },
    OA09: { visible: true, opacity: 0.72 },
    OA10: { visible: true, opacity: 0.72 },
    OA11: { visible: true, opacity: 0.72 },
    OA13: { visible: true, opacity: 0.72 },
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
      mosaicScale: 20,
    });
  });

  const [activeEcologicalGraph, setActiveEcologicalGraph] = useState(() => {
    return generateEcologicalGraph(0, {
      mode: "synthetic",
      speedHz: 1.5,
      noiseLevel: 0.03,
      currentAnomaly: 0.0,
      driftFactor: 0.0,
      flowSpeed: 1.0,
      mosaicScale: 20,
    });
  });

  // Master telemetry tick generator loop
  useEffect(() => {
    if (!isStreaming) return;

    const intervalMs = 1000 / config.speedHz;
    let ecoTickCount = 0;
    const ECO_GRAPH_EVERY = 5; // Regenerate ecological graph every 5 ticks (~3s at 1.5Hz)

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
          if (ecoTickCount % ECO_GRAPH_EVERY === 0) {
            setActiveEcologicalGraph(generateEcologicalGraph(nextSec, config));
          }
          ecoTickCount++;
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
      setActiveEcologicalGraph(generateEcologicalGraph(stepSeconds, config));
    } else if (uploadedCubes.length > 0) {
      setActiveDataCube(uploadedCubes[currentCSVFrameIdx] || uploadedCubes[0]);
    }
  }, [config.mode, config.mosaicScale]);

  // 6. Multi-dimensional Scientific Analyst (calculates GMM, Novelty, Boundaries & reasons on active snapshot)
  const analysisResult = useMemo(() => {
    return evaluateScientificDiagnostics(activeDataCube);
  }, [activeDataCube]);

  // 7. Eigenvalue root analysis (PCA + clustering for root visualization)
  const rootAnalysis = useMemo(() => {
    return computeRootAnalysis(activeDataCube, 5);
  }, [activeDataCube]);

  // 7.5. Gate 2 — Understanding Roots (latent ecology, interaction matrices, attractors)
  const latentEcology = useMemo(() => {
    return exploreLatentEcology(activeDataCube, 5);
  }, [activeDataCube]);

  // 7.6. Squad F — Fisherman bloom alert (risk field + zones + frame-to-frame trend).
  // prevBloomRiskRef holds the prior frame's risk so trend can be computed; it is
  // updated AFTER each render so the memo always sees the previous frame.
  const prevBloomRiskRef = useRef<Float32Array | null>(null);
  const bloomState = useMemo(() => {
    return summarizeBloom(activeDataCube, prevBloomRiskRef.current);
  }, [activeDataCube]);
  useEffect(() => {
    prevBloomRiskRef.current = bloomState.risk;
  }, [bloomState]);
  // Contiguous high-risk blobs (red zone) reduced to one centroid marker each —
  // the "go here" / "avoid here" list for real-world fishing decisions. Real
  // lat/lon are only attached when activeDataCube actually carries geo-tagged coords.
  const bloomHotspots = useMemo(() => {
    return findHotspots(activeDataCube, bloomState.risk, bloomState.zones.zones);
  }, [activeDataCube, bloomState]);
  // Safe-zone overlay (3D categorical green/amber/red plane); on by default.
  const [bloomOverlayState, setBloomOverlayState] = useState<{ visible: boolean; opacity: number }>({
    visible: true,
    opacity: 0.65,
  });

  // Gate 2 visibility state
  const [gate2Visible, setGate2Visible] = useState(false);

  // 8. Gate A — spatial structure & relationship tensors (Layer 2 / Layer 3 ports)
  const [spatialOverlayState, setSpatialOverlayState] = useState<SpatialOverlayState>({
    visible: false, opacity: 0.7, variable: null, descriptor: null
  });
  const [relationshipGraphState, setRelationshipGraphState] = useState<RelationshipGraphState>({
    visible: false, opacity: 0.8, channelName: null, threshold: 0.5
  });
  const [confidenceOverlayState, setConfidenceOverlayState] = useState<ConfidenceOverlayState>({
    visible: false, opacity: 0.6
  });

  // Confidence grid for the active data cube (defaults to all-ones 20x20 if absent)
  const confidenceGrid = useMemo(() => {
    return activeDataCube.confidence ?? Array.from({ length: 20 }, () => Array(20).fill(1));
  }, [activeDataCube]);

  const spatialTensor = useMemo(() => computeSpatialTensor(activeDataCube), [activeDataCube]);
  const relationshipTensor = useMemo(() => computeRelationshipTensor(activeDataCube), [activeDataCube]);

  // Spatial overlay grid for the selected variable/descriptor channel
  const spatialOverlayGrid = useMemo(() => {
    if (!spatialOverlayState.variable || !spatialOverlayState.descriptor) return null;
    const idx = spatialChannelIndex(spatialOverlayState.variable, spatialOverlayState.descriptor);
    return getSpatialChannelGrid(spatialTensor, idx);
  }, [spatialTensor, spatialOverlayState.variable, spatialOverlayState.descriptor]);

  // Calculate live average levels of each parameters to display on sparkline indicators
  const variableAverages = useMemo(() => {
    const avgs = {} as Record<VariableName, number>;
    const keys: VariableName[] = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490", "FLH", "CHL_disagreement", "OA08", "OA09", "OA10", "OA11", "OA13"];
    keys.forEach((key) => {
      avgs[key] = activeDataCube.stats[key].mean;
    });
    return avgs;
  }, [activeDataCube]);

  // Master handles
  const handleConfigChange = (newConfig: Partial<TelemetryStreamConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const handleUploadCSVData = (cubes: DataCube[], fileName?: string, raw?: RawCSVData) => {
    if (cubes.length === 0) return;
    const name = fileName || "satellite_grid_mesh.csv";
    setUploadedCubes(cubes);
    setActiveFileName(name);
    setCurrentCSVFrameIdx(0);
    setActiveDataCube(cubes[0]);
    setConfig(prev => ({ ...prev, mode: "uploaded" }));
    setCsvRawData(raw ?? null);
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

  // Gate 1: Handle pixel click from 3D viewport
  const handlePixelClick = (event: PixelClickEvent) => {
    setPixelInspectorState(prev => ({
      ...prev,
      visible: true,
      selectedPixel: { row: event.row, col: event.col }
    }));
  };

  // 9. Session save/load — a JSON snapshot of view/visualization settings, deliberately
  // excluding raw data (activeDataCube/uploadedCubes/activeEcologicalGraph) since that's
  // either regenerable (synthetic) or re-uploaded by the user, and would bloat the file.
  const sessionFileInputRef = useRef<HTMLInputElement>(null);

  const handleExportSession = () => {
    const snapshot: SessionSnapshot = {
      version: 1,
      config,
      customColors,
      customColorsFrom,
      spacing,
      displacementGain,
      showTerrain,
      showWireframe,
      showLabels,
      cameraPreset,
      rootState,
      layerState,
      spatialOverlayState,
      relationshipGraphState,
      confidenceOverlayState,
      bloomOverlayState,
      gate2Visible,
    };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eef-session-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSession = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const snapshot = JSON.parse(reader.result as string) as Partial<SessionSnapshot>;
        if (snapshot.config) setConfig(snapshot.config);
        if (snapshot.customColors) setCustomColors(snapshot.customColors);
        if (snapshot.customColorsFrom) setCustomColorsFrom(snapshot.customColorsFrom);
        if (typeof snapshot.spacing === "number") setSpacing(snapshot.spacing);
        if (typeof snapshot.displacementGain === "number") setDisplacementGain(snapshot.displacementGain);
        if (typeof snapshot.showTerrain === "boolean") setShowTerrain(snapshot.showTerrain);
        if (typeof snapshot.showWireframe === "boolean") setShowWireframe(snapshot.showWireframe);
        if (typeof snapshot.showLabels === "boolean") setShowLabels(snapshot.showLabels);
        if (snapshot.cameraPreset) setCameraPreset(snapshot.cameraPreset);
        if (snapshot.rootState) setRootState(snapshot.rootState);
        if (snapshot.layerState) setLayerState(snapshot.layerState);
        if (snapshot.spatialOverlayState) setSpatialOverlayState(snapshot.spatialOverlayState);
        if (snapshot.relationshipGraphState) setRelationshipGraphState(snapshot.relationshipGraphState);
        if (snapshot.confidenceOverlayState) setConfidenceOverlayState(snapshot.confidenceOverlayState);
        if (snapshot.bloomOverlayState) setBloomOverlayState(snapshot.bloomOverlayState);
        if (typeof snapshot.gate2Visible === "boolean") setGate2Visible(snapshot.gate2Visible);
      } catch {
        window.alert("Could not load this session file — it may be corrupted or from an incompatible version.");
      }
    };
    reader.readAsText(file);
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
          {/* Neon rotating radar logo */}
          <div className="relative w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-black text-sm select-none shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <Cpu size={16} className="animate-pulse" />
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black uppercase tracking-wider text-white">EEF</h1>
              <span className="text-white/30 text-xs">|</span>
              <span className="text-[11px] font-mono tracking-widest text-white font-bold bg-white/10 border border-white/10 px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(255,255,255,0.05)]">
                ECOLOGICAL ENCODING FRAMEWORK
              </span>
            </div>
            <p className="text-[10px] text-white/40 font-mono tracking-tight leading-none mt-0.5">
              Multi-Layer Spectrometry Analysis Console
            </p>
          </div>
        </div>

        {/* Center: Live UTC Scientific Clock */}
        <div className="hidden md:flex items-center gap-2.5 px-3 py-1 bg-white/10 border border-white/20 rounded-md font-mono text-[11px] text-white font-bold">
          <span className="w-2 h-2 rounded-full bg-white pulse-teal-glow" />
          <span className="text-white/40 font-normal">LOCK TIMER:</span>
          <span>{currentTime || "UTC LOCKING..."}</span>
        </div>

        {/* Right Side: Session save/load, environment metadata & email */}
        <div className="flex items-center gap-3">
          <input
            ref={sessionFileInputRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImportSession(file);
              e.target.value = "";
            }}
          />
          <button
            onClick={handleExportSession}
            title="Save session (view settings) to a JSON file"
            className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <Save size={14} />
          </button>
          <button
            onClick={() => sessionFileInputRef.current?.click()}
            title="Load a previously saved session"
            className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <Upload size={14} />
          </button>

          <div className="hidden sm:flex flex-col text-right font-mono">
            <span className="text-[10px] text-white/40 leading-none">FEEDBACK COUPLING:</span>
            <span className="text-[11px] text-white leading-tight">iceicefelix@gmail.com</span>
          </div>

          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
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
                    customColorsFrom={customColorsFrom}
                    onChangeCustomColor={handleChangeCustomColor}
                    onChangeCustomColorFrom={handleChangeCustomColorFrom}
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
                    onExportLayer={(v) => mainViewportRef.current?.exportLayerPng(v)}
                    bloomSummary={bloomState.summary}
                    bloomOverlayVisible={bloomOverlayState.visible}
                    onToggleBloomOverlay={() => setBloomOverlayState((s) => ({ ...s, visible: !s.visible }))}
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
                    <Radio className="text-[#1A73E8] rounded-full p-0.5" size={12} />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">
                      REAL-TIME 3D GRIDS MATRIX HUD
                    </span>
                  </div>
                  <p className="text-[9px] font-mono text-white/45 leading-none mt-0.5">
                    Multi-Layer Spectrometry Terrain Map (20 × 20 Grid)
                  </p>
                </div>

                {/* Float helper in the stage corner */}
                <div className="absolute bottom-4 left-4 z-20 text-[10px] font-mono text-white/50 select-none bg-black/45 px-2.5 py-1.5 rounded-lg border border-white/5 backdrop-blur-md flex flex-col gap-0.5 shadow-sm">
                  <span className="text-white/80 font-bold">DRAG:</span> Rotate angle (Orbit)
                  <span className="text-white/80 font-bold">WHEEL/PINCH:</span> Variable zoom scaling
                  <span className="text-white/80 font-bold">SHIFT KEYS:</span> Vertical spacing / Opacities
                </div>

                {/* Three.js Viewport element */}
                <div className="flex-1 w-full h-full">
                  <ThreeViewport
                    ref={mainViewportRef}
                    dataCube={activeDataCube}
                    layerState={layerState}
                    spacing={spacing}
                    displacementGain={displacementGain}
                    showTerrain={showTerrain}
                    showWireframe={showWireframe}
                    showLabels={showLabels}
                    cameraPreset={cameraPreset}
                    customColors={customColors}
                    customColorsFrom={customColorsFrom}
                    rootAnalysis={rootAnalysis}
                    ecologicalGraph={activeEcologicalGraph}
                    rootState={rootState}
                    spatialOverlay={spatialOverlayState}
                    spatialOverlayGrid={spatialOverlayGrid}
                    relationshipGraph={relationshipGraphState}
                    relationshipTensor={relationshipTensor}
                    confidenceOverlay={confidenceOverlayState}
                    confidenceOverlayGrid={confidenceGrid}
                    latentOverlayVisible={false}
                    bloomOverlay={bloomOverlayState}
                    bloomZones={bloomState.zones.zones}
                    bloomHotspots={bloomHotspots}
                    onPixelClick={handlePixelClick}
                  />
                </div>
              </div>
            </section>
          </Panel>

          <PanelResizeHandle className="resize-handle" />

          {/* SIDEBAR RIGHT: Scientific Analyst and Statistical Diagnostic report */}
          <Panel defaultSize={25} minSize={16} className="flex flex-col min-h-0">
            <section className="flex flex-col gap-4 overflow-y-auto h-full min-h-0 pl-2">
              <div className="glass-panel rounded-xl p-4 flex-grow flex flex-col gap-3 min-h-0 overflow-y-auto">
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
                    customColorsFrom={customColorsFrom}
                    onChangeCustomColor={handleChangeCustomColor}
                    onResetCustomColor={handleResetCustomColor}
                    rootAnalysis={rootAnalysis}
                    rootState={rootState}
                    onChangeRootState={setRootState}
                  />
                </div>

                <SpatialEncodingPanel
                  spatialOverlay={spatialOverlayState}
                  onChangeSpatialOverlay={(s) => setSpatialOverlayState(s)}
                  relationshipGraph={relationshipGraphState}
                  onChangeRelationshipGraph={(s) => setRelationshipGraphState(s)}
                  relationshipFeatureNames={relationshipTensor.featureNames}
                  confidenceOverlay={confidenceOverlayState}
                  onChangeConfidenceOverlay={setConfidenceOverlayState}
                />

                {pixelInspectorState.visible && (
                  <PixelInspectorPanel
                    dataCube={activeDataCube}
                    inspectorState={pixelInspectorState}
                    onChangeState={setPixelInspectorState}
                  />
                )}

                <button
                  onClick={() => setGate2Visible(!gate2Visible)}
                  style={{
                    marginTop: "8px",
                    padding: "6px 8px",
                    background: gate2Visible ? "#1A73E8" : "rgba(255,255,255,0.06)",
                    color: gate2Visible ? "#fff" : "rgba(255,255,255,0.5)",
                    border: "1px solid",
                    borderColor: gate2Visible ? "#1A73E8" : "rgba(255,255,255,0.12)",
                    borderRadius: "4px",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {gate2Visible ? "Hide Gate 2: Understanding Roots" : "Show Gate 2: Understanding Roots"}
                </button>

                {gate2Visible && (
                  <LatentEcologyPanel
                    activeDataCube={activeDataCube}
                    visible={true}
                  />
                )}

                {csvRawData && (
                  <>
                    <button
                      onClick={() => setCsvInspectorVisible(!csvInspectorVisible)}
                      style={{
                        marginTop: "8px",
                        padding: "6px 8px",
                        background: csvInspectorVisible ? "#1A73E8" : "rgba(255,255,255,0.06)",
                        color: csvInspectorVisible ? "#fff" : "rgba(255,255,255,0.5)",
                        border: "1px solid",
                        borderColor: csvInspectorVisible ? "#1A73E8" : "rgba(255,255,255,0.12)",
                        borderRadius: "4px",
                        fontSize: "11px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {csvInspectorVisible ? "Hide CSV Inspector" : "Show CSV Inspector"}
                    </button>

                    {csvInspectorVisible && <CSVInspectorPanel raw={csvRawData} />}
                  </>
                )}

                <button
                  onClick={() => setSizeClassVisible(!sizeClassVisible)}
                  style={{
                    marginTop: "8px",
                    padding: "6px 8px",
                    background: sizeClassVisible ? "#1A73E8" : "rgba(255,255,255,0.06)",
                    color: sizeClassVisible ? "#fff" : "rgba(255,255,255,0.5)",
                    border: "1px solid",
                    borderColor: sizeClassVisible ? "#1A73E8" : "rgba(255,255,255,0.12)",
                    borderRadius: "4px",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {sizeClassVisible ? "Hide Size-Class Breakdown" : "Show Size-Class Breakdown"}
                </button>

                {sizeClassVisible && <SizeClassPanel activeDataCube={activeDataCube} />}
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
              customColorsFrom={customColorsFrom}
              onChangeCustomColorFrom={handleChangeCustomColorFrom}
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
              bloomSummary={bloomState.summary}
              bloomOverlayVisible={bloomOverlayState.visible}
              onToggleBloomOverlay={() => setBloomOverlayState((s) => ({ ...s, visible: !s.visible }))}
            />
          </div>

          <div className="glass-panel rounded-xl overflow-hidden relative flex flex-col h-[420px]">
            <div className="absolute top-3 left-3 z-20 pointer-events-none select-none">
              <div className="flex items-center gap-1.5">
                <Radio className="text-[#1A73E8] rounded-full p-0.5" size={12} />
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
                rootAnalysis={rootAnalysis}
                ecologicalGraph={activeEcologicalGraph}
                rootState={rootState}
                confidenceOverlay={confidenceOverlayState}
                confidenceOverlayGrid={confidenceGrid}
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
              rootAnalysis={rootAnalysis}
              rootState={rootState}
              onChangeRootState={setRootState}
            />
          </div>

          <div className="glass-panel rounded-xl p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
                <Layers size={13} className="text-white/60" /> SPATIAL & RELATIONSHIP ENCODING
              </h2>
              <span className="text-[10px] font-mono text-white/40 font-bold">ENCODING_NODE</span>
            </div>
            <SpatialEncodingPanel
              spatialOverlay={spatialOverlayState}
              onChangeSpatialOverlay={(s) => setSpatialOverlayState(s)}
              relationshipGraph={relationshipGraphState}
              onChangeRelationshipGraph={(s) => setRelationshipGraphState(s)}
              relationshipFeatureNames={relationshipTensor.featureNames}
              confidenceOverlay={confidenceOverlayState}
              onChangeConfidenceOverlay={setConfidenceOverlayState}
            />
          </div>

          <div className="glass-panel rounded-xl p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
                <Sparkles size={13} className="text-white/60" /> UNDERSTANDING ROOTS
              </h2>
              <span className="text-[10px] font-mono text-white/40 font-bold">GATE_2</span>
            </div>
            <button
              onClick={() => setGate2Visible(!gate2Visible)}
              style={{
                padding: "6px 8px",
                background: gate2Visible ? "#1A73E8" : "rgba(255,255,255,0.06)",
                color: gate2Visible ? "#fff" : "rgba(255,255,255,0.5)",
                border: "1px solid",
                borderColor: gate2Visible ? "#1A73E8" : "rgba(255,255,255,0.12)",
                borderRadius: "4px",
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {gate2Visible ? "Hide Analysis" : "Show Analysis"}
            </button>
            {gate2Visible && (
              <LatentEcologyPanel
                activeDataCube={activeDataCube}
                visible={true}
              />
            )}
          </div>

          {csvRawData && (
            <div className="glass-panel rounded-xl p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <h2 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
                  <Database size={13} className="text-white/60" /> CSV INSPECTOR
                </h2>
                <span className="text-[10px] font-mono text-white/40 font-bold">RAW_ROWS</span>
              </div>
              <button
                onClick={() => setCsvInspectorVisible(!csvInspectorVisible)}
                style={{
                  padding: "6px 8px",
                  background: csvInspectorVisible ? "#1A73E8" : "rgba(255,255,255,0.06)",
                  color: csvInspectorVisible ? "#fff" : "rgba(255,255,255,0.5)",
                  border: "1px solid",
                  borderColor: csvInspectorVisible ? "#1A73E8" : "rgba(255,255,255,0.12)",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {csvInspectorVisible ? "Hide CSV Inspector" : "Show CSV Inspector"}
              </button>
              {csvInspectorVisible && <CSVInspectorPanel raw={csvRawData} />}
            </div>
          )}

          <div className="glass-panel rounded-xl p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
                <Layers size={13} className="text-white/60" /> SIZE-CLASS BREAKDOWN
              </h2>
              <span className="text-[10px] font-mono text-white/40 font-bold">PICO_NANO_MICRO</span>
            </div>
            <button
              onClick={() => setSizeClassVisible(!sizeClassVisible)}
              style={{
                padding: "6px 8px",
                background: sizeClassVisible ? "#1A73E8" : "rgba(255,255,255,0.06)",
                color: sizeClassVisible ? "#fff" : "rgba(255,255,255,0.5)",
                border: "1px solid",
                borderColor: sizeClassVisible ? "#1A73E8" : "rgba(255,255,255,0.12)",
                borderRadius: "4px",
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {sizeClassVisible ? "Hide Size-Class Breakdown" : "Show Size-Class Breakdown"}
            </button>
            {sizeClassVisible && <SizeClassPanel activeDataCube={activeDataCube} />}
          </div>
        </div>
      </main>

      {/* ── COCOS COCKPIT UNDERGUARD FOOTER ── */}
      <footer className="h-[28px] border-t border-white/5 bg-[#030307] text-[10px] text-white/25 font-mono flex items-center justify-between px-4 select-none">
        <div>
          <span>EEF PIPELINE ENGINE · CLIENT-SIDE SPECTRAL RECONSTRUCTION CORE</span>
        </div>
        <div className="flex gap-4">
          <span>SYSTEM MODE: ACTIVE MATRIX</span>
        </div>
      </footer>

      <UpdateNotifier />
    </div>
  );
}
