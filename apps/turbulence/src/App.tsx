import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  generateDataCube,
  computeRootAnalysis,
  computeBloomRisk,
  VARIABLE_METADATA,
  type DataCube,
  type TelemetryStreamConfig,
  type VariableName,
} from "@capri/core";
import { InstrumentCanvas } from "./instruments/InstrumentCanvas";
import { drawSignatureField, DEFAULT_SIG_PARAMS, type SigParams, type Selection } from "./instruments/signatureField";
import { drawOpticalSection, DEFAULT_OPT_PARAMS, type OptParams } from "./instruments/opticalSection";
import { drawLatentVolume, DEFAULT_LATENT_PARAMS, type LatentParams } from "./instruments/latentVolume";
import { drawBloomField, DEFAULT_BLOOM_PARAMS, type BloomParams } from "./instruments/bloomField";
import { drawDensityCartography, DEFAULT_DENSITY_PARAMS, type DensityParams } from "./instruments/densityCartography";
import { drawTerritorialIntel, DEFAULT_INTEL_PARAMS, type IntelParams } from "./instruments/territorialIntel";
import { cellReadout, pickCell } from "./lib/probe";
import { channelDiff } from "./lib/diff";
import { serializeProject, deserializeProject, PROJECT_VERSION, type ProjectState } from "./lib/project";

// Finishing the Stage — all six translated instruments live on the generic host,
// reading the same DataCube and sharing one linked selection. Latent Volume uses
// real PCA (computeRootAnalysis) and Territorial Intel the real GAIA bloom risk.

const CONFIG: TelemetryStreamConfig = {
  mode: "synthetic", speedHz: 1.5, noiseLevel: 0.03, currentAnomaly: 0.25, driftFactor: 0, flowSpeed: 1.1,
};
const GRID = 20;
const ALL_CHANNELS = Object.keys(VARIABLE_METADATA) as VariableName[];

type InstId = "signature" | "optical" | "latent" | "bloom" | "density" | "intel";
const INST_ORDER: InstId[] = ["signature", "optical", "latent", "bloom", "density", "intel"];
type Anchor = { step: number; cube: DataCube } | null;

const NETWORK: Array<{ fam: string; ops: Array<{ id: string; kind: string; active?: boolean }> }> = [
  { fam: "Sources", ops: [{ id: "synthetic", kind: "src", active: true }, { id: "csv_player", kind: "src" }, { id: "geotiff", kind: "src" }] },
  { fam: "Reducers", ops: [{ id: "pca_3pc", kind: "red", active: true }, { id: "umap", kind: "red" }, { id: "kmeans_regime", kind: "red", active: true }] },
  { fam: "Detectors", ops: [{ id: "bloom_gaia", kind: "det", active: true }, { id: "novelty", kind: "det" }] },
  { fam: "Instruments", ops: INST_ORDER.map((id) => ({ id: `${id}`, kind: "ins", active: true })) },
];

function Slider({ label, min, max, step, value, onChange }: { label: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void }) {
  return (
    <label className="prow">
      <span>{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} />
      <span className="v mono">{step >= 1 ? value : value.toFixed(2)}</span>
    </label>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [params, setParams] = useState<SigParams>(DEFAULT_SIG_PARAMS);
  const [optParams, setOptParams] = useState<OptParams>(DEFAULT_OPT_PARAMS);
  const [latentParams, setLatentParams] = useState<LatentParams>(DEFAULT_LATENT_PARAMS);
  const [bloomParams, setBloomParams] = useState<BloomParams>(DEFAULT_BLOOM_PARAMS);
  const [densityParams, setDensityParams] = useState<DensityParams>(DEFAULT_DENSITY_PARAMS);
  const [intelParams, setIntelParams] = useState<IntelParams>(DEFAULT_INTEL_PARAMS);
  const [cube, setCube] = useState<DataCube>(() => generateDataCube(0, CONFIG, GRID));
  const [layerOrder, setLayerOrder] = useState<VariableName[]>(ALL_CHANNELS);
  const [selection, setSelection] = useState<Selection>(null);
  const [face, setFace] = useState<"node" | "probe">("node");
  const [selected, setSelected] = useState<InstId>("signature");
  const [stageMode, setStageMode] = useState<"mosaic" | "focus">("mosaic");
  const [focusId, setFocusId] = useState<InstId>("signature");
  const [anchorA, setAnchorA] = useState<Anchor>(null);
  const [anchorB, setAnchorB] = useState<Anchor>(null);
  const [diffOn, setDiffOn] = useState(false);
  const [utc, setUtc] = useState("");

  const stepRef = useRef(step);
  stepRef.current = step;
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      const next = stepRef.current + 1 / CONFIG.speedHz;
      setStep(next);
      setCube(generateDataCube(next, CONFIG, GRID));
    }, 1000 / CONFIG.speedHz);
    return () => window.clearInterval(id);
  }, [playing]);

  const scrubTo = (s: number) => { setStep(s); setCube(generateDataCube(s, CONFIG, GRID)); };

  useEffect(() => {
    const tick = () => setUtc(new Date().toUTCString().replace("GMT", "UTC"));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key >= "1" && e.key <= "6") {
        const id = INST_ORDER[+e.key - 1];
        setStageMode("focus"); setFocusId(id); setSelected(id);
      } else if (e.key === "0") setStageMode("mosaic");
      else if (e.key === " ") { e.preventDefault(); setPlaying((p) => !p); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onPick = useCallback((nx: number, ny: number) => { setSelection(pickCell(nx, ny, GRID)); setFace("probe"); }, []);

  const dragRef = useRef<VariableName | null>(null);
  const onDrop = (target: VariableName) => {
    const from = dragRef.current;
    dragRef.current = null;
    if (!from || from === target) return;
    setLayerOrder((prev) => { const next = prev.filter((k) => k !== from); next.splice(next.indexOf(target), 0, from); return next; });
  };

  // Project save / load — view + instrument state only (data is regenerable). M5.
  const fileRef = useRef<HTMLInputElement>(null);
  const buildProject = (): ProjectState => ({
    version: PROJECT_VERSION, sig: params, opt: optParams, latent: latentParams, bloom: bloomParams,
    density: densityParams, intel: intelParams, layerOrder, stageMode, focusId, selected, step,
  });
  const applyProject = (p: Partial<ProjectState>) => {
    if (p.sig) setParams(p.sig);
    if (p.opt) setOptParams(p.opt);
    if (p.latent) setLatentParams(p.latent);
    if (p.bloom) setBloomParams(p.bloom);
    if (p.density) setDensityParams(p.density);
    if (p.intel) setIntelParams(p.intel);
    if (p.layerOrder) setLayerOrder(p.layerOrder);
    if (p.stageMode) setStageMode(p.stageMode);
    if (p.focusId) setFocusId(p.focusId);
    if (p.selected) setSelected(p.selected);
    if (typeof p.step === "number") scrubTo(p.step);
  };
  const handleSave = () => {
    const blob = new Blob([serializeProject(buildProject())], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `capri-project-${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleLoadFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => { const p = deserializeProject(String(reader.result)); if (p) applyProject(p); };
    reader.readAsText(file);
  };
  const focusInstrument = (id: InstId) => { setStageMode("focus"); setFocusId(id); setSelected(id); };

  // Shared analyses — computed once per frame, consumed by the instruments.
  const rootAnalysis = useMemo(() => computeRootAnalysis(cube, 5), [cube]);
  const bloomRisk = useMemo(() => computeBloomRisk(cube), [cube]);
  const diffField = useMemo(
    () => (diffOn && anchorA && anchorB ? channelDiff(anchorA.cube, anchorB.cube, params.fieldChannel) : null),
    [diffOn, anchorA, anchorB, params.fieldChannel],
  );

  const sigRender = useCallback((c: CanvasRenderingContext2D, w: number, h: number, p: number) => drawSignatureField(c, cube, w, h, params, p, selection, diffField), [cube, params, selection, diffField]);
  const optRender = useCallback((c: CanvasRenderingContext2D, w: number, h: number, p: number) => drawOpticalSection(c, cube, w, h, optParams, p, selection), [cube, optParams, selection]);
  const latentRender = useCallback((c: CanvasRenderingContext2D, w: number, h: number, p: number) => drawLatentVolume(c, cube, rootAnalysis, w, h, latentParams, p, selection), [cube, rootAnalysis, latentParams, selection]);
  const bloomRender = useCallback((c: CanvasRenderingContext2D, w: number, h: number, p: number) => drawBloomField(c, cube, w, h, bloomParams, p, selection), [cube, bloomParams, selection]);
  const densityRender = useCallback((c: CanvasRenderingContext2D, w: number, h: number, p: number) => drawDensityCartography(c, cube, w, h, densityParams, p, selection), [cube, densityParams, selection]);
  const intelRender = useCallback((c: CanvasRenderingContext2D, w: number, h: number, p: number) => drawTerritorialIntel(c, cube, bloomRisk, w, h, intelParams, p, selection), [cube, bloomRisk, intelParams, selection]);

  const frame = Math.round(step * CONFIG.speedHz);
  const activeMeta = VARIABLE_METADATA[params.fieldChannel];
  const readout = useMemo(() => (selection ? cellReadout(cube, selection.row, selection.col) : []), [cube, selection]);
  const bothAnchors = !!(anchorA && anchorB);

  const tiles: Array<{ id: InstId; name: string; ref: string; render: (c: CanvasRenderingContext2D, w: number, h: number, p: number) => void; legend: string }> = [
    { id: "signature", name: "Signature Field", ref: "Rosetta", render: sigRender, legend: diffField ? `Δ ${params.fieldChannel} · retreat ← 0 → grow · F${Math.round((anchorA?.step ?? 0) * CONFIG.speedHz)}→F${Math.round((anchorB?.step ?? 0) * CONFIG.speedHz)}` : `${activeMeta.label} + contours + in-place OLCI spectra` },
    { id: "optical", name: "Optical Section", ref: "petrography", render: optRender, legend: "optical water types · fronts = grain boundaries" },
    { id: "latent", name: "Latent Volume", ref: "CFD box", render: latentRender, legend: "21→3-D PCA · clusters = regimes · outliers = novelty" },
    { id: "bloom", name: "Bloom Field", ref: "percolation", render: bloomRender, legend: "FLH vitality · CHL size · TSM blur · front drift" },
    { id: "density", name: "Density Cartography", ref: "SOYO", render: densityRender, legend: "CHL stipple · ■ confident / ● uncertain · drift route" },
    { id: "intel", name: "Territorial Intel", ref: "Po map", render: intelRender, legend: "CHL field · hotspots · GAIA bloom-risk · graticule" },
  ];

  const renderSpine = () => NETWORK.map((f) => (
    <div className="fam" key={f.fam}>
      <div className="fam-label">{f.fam}</div>
      {f.ops.map((o, i) => {
        const isInst = o.kind === "ins";
        const focused = isInst && focusId === o.id;
        return (
          <div key={o.id}
            className={`op op-${o.kind}${o.active ? " active" : ""}${focused ? " focused" : ""}${isInst ? " clickable" : ""}`}
            onClick={isInst ? () => focusInstrument(o.id as InstId) : undefined}
            role={isInst ? "button" : undefined} tabIndex={isInst ? 0 : undefined}
            onKeyDown={isInst ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); focusInstrument(o.id as InstId); } } : undefined}>
            {i > 0 && <span className="wire" />}<span className="op-dot" />{o.id}{o.active && <span className="op-run" />}
          </div>
        );
      })}
    </div>
  ));

  const nodeFace = () => {
    if (selected === "signature") return (
      <>
        <h4 className="mono">signature_field</h4>
        <p className="sub">Field channel is set from the layer stack. Live values from @capri/core.</p>
        <div className="stat"><span>field channel</span><span className="mono" style={{ color: "var(--sel)" }}>{params.fieldChannel}</span></div>
        <Slider label="spectra grid" min={2} max={8} step={1} value={params.spectraStep} onChange={(v) => setParams((p) => ({ ...p, spectraStep: v }))} />
        <Slider label="contours" min={0} max={9} step={1} value={params.contourLevels} onChange={(v) => setParams((p) => ({ ...p, contourLevels: v }))} />
        <Slider label="colour gain" min={0.4} max={2} step={0.05} value={params.gain} onChange={(v) => setParams((p) => ({ ...p, gain: v }))} />
      </>
    );
    if (selected === "optical") return (
      <>
        <h4 className="mono">optical_section</h4>
        <p className="sub">Water types from real CHL/TSM/FLH; fronts render as grain boundaries.</p>
        <Slider label="birefringence" min={0.3} max={1.4} step={0.05} value={optParams.saturation} onChange={(v) => setOptParams((p) => ({ ...p, saturation: v }))} />
        <Slider label="grain edges" min={0} max={1} step={0.05} value={optParams.fronts} onChange={(v) => setOptParams((p) => ({ ...p, fronts: v }))} />
      </>
    );
    if (selected === "latent") return (
      <>
        <h4 className="mono">latent_volume</h4>
        <p className="sub">Real PCA (computeRootAnalysis): the 21-channel space in 3 PCs. 3-PC variance {(rootAnalysis.varianceExplained[2] * 100) | 0}%.</p>
        <Slider label="orbit rate" min={0} max={1.5} step={0.05} value={latentParams.orbit} onChange={(v) => setLatentParams((p) => ({ ...p, orbit: v }))} />
        <Slider label="point size" min={0.5} max={3} step={0.1} value={latentParams.size} onChange={(v) => setLatentParams((p) => ({ ...p, size: v }))} />
      </>
    );
    if (selected === "bloom") return (
      <>
        <h4 className="mono">bloom_field</h4>
        <p className="sub">Physiology, not age: FLH vitality colour, CHL size, TSM blur, front-following drift.</p>
        <Slider label="cell density" min={0.2} max={1} step={0.05} value={bloomParams.count} onChange={(v) => setBloomParams((p) => ({ ...p, count: v }))} />
        <Slider label="vitality gain" min={0.4} max={1.6} step={0.05} value={bloomParams.vit} onChange={(v) => setBloomParams((p) => ({ ...p, vit: v }))} />
      </>
    );
    if (selected === "density") return (
      <>
        <h4 className="mono">density_cartography</h4>
        <p className="sub">CHL stipple; ■ confident vs ● uncertain (CHL disagreement); drift route + locator.</p>
        <Slider label="dot pitch" min={4} max={12} step={0.5} value={densityParams.pitch} onChange={(v) => setDensityParams((p) => ({ ...p, pitch: v }))} />
        <Slider label="drift route" min={0} max={1} step={0.05} value={densityParams.route} onChange={(v) => setDensityParams((p) => ({ ...p, route: v }))} />
      </>
    );
    return (
      <>
        <h4 className="mono">territorial_intel</h4>
        <p className="sub">CHL base + real GAIA bloom-risk overlay + coordinate graticule + CHL hotspots.</p>
        <Slider label="graticule" min={0} max={1} step={0.05} value={intelParams.graticule} onChange={(v) => setIntelParams((p) => ({ ...p, graticule: v }))} />
        <Slider label="hotspots" min={0} max={10} step={1} value={intelParams.hotspots} onChange={(v) => setIntelParams((p) => ({ ...p, hotspots: v }))} />
      </>
    );
  };

  return (
    <div className="app app-m3">
      <header className="cmd">
        <div className="brand">CAPRI<small>PLATFORM</small></div>
        <nav className="tabs">
          <button aria-pressed="true">Survey</button>
          <button aria-pressed="false">Physiology</button>
          <button aria-pressed="false">Latent</button>
          <button aria-pressed="false">Clean room</button>
        </nav>
        <span className="stage-toggle">
          <button aria-pressed={stageMode === "mosaic"} onClick={() => setStageMode("mosaic")}>mosaic</button>
          <button aria-pressed={stageMode === "focus"} onClick={() => setStageMode("focus")}>focus</button>
        </span>
        <span className="spacer" />
        <div className="proj">
          <input ref={fileRef} type="file" accept=".json,application/json" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) handleLoadFile(f); e.target.value = ""; }} />
          <button className="cmd-btn" onClick={handleSave} title="Save project (view + instruments)">save</button>
          <button className="cmd-btn" onClick={() => fileRef.current?.click()} title="Load a saved project">load</button>
        </div>
        <span className="utc mono">{utc || "syncing…"}</span>
        <div className="mini-transport">
          <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? "pause" : "play"}>{playing ? "❚❚" : "►"}</button>
          <span className="mono fr">F{String(frame).padStart(4, "0")}</span>
        </div>
      </header>

      <div className="main">
        <aside className="net">
          <div className="panel-hd"><h3>The Network</h3><span className="tag">click a lens</span></div>
          <div className="net-body">{renderSpine()}</div>
        </aside>

        <main className="stage stage-multi stage-six" data-mode={stageMode}>
          {tiles.map((t) => (
            <div key={t.id} className={`tile${selected === t.id ? " sel" : ""}${focusId === t.id ? " focused" : ""}`} onMouseDown={() => setSelected(t.id)}>
              <header className="tile-hd">
                <span className="led" /><span className="t">{t.name}</span><span className="ref">ref · {t.ref}</span>
                <button className="focusbtn" title="focus" onClick={(e) => { e.stopPropagation(); setStageMode("focus"); setFocusId(t.id); setSelected(t.id); }}>⤢</button>
              </header>
              <InstrumentCanvas render={t.render} paused={!playing} onPick={onPick} />
              <div className="legend mono">{t.legend}</div>
            </div>
          ))}
        </main>

        <aside className="insp">
          <div className="faces">
            <button aria-pressed={face === "node"} onClick={() => setFace("node")}>Node</button>
            <button aria-pressed={face === "probe"} onClick={() => setFace("probe")}>Probe</button>
          </div>
          <div className="insp-body">
            {face === "node" ? nodeFace() : (
              <>
                <h4 className="mono">{selection ? `cell ${String(selection.row).padStart(2, "0")} · ${String(selection.col).padStart(2, "0")}` : "no cell"}</h4>
                <p className="sub">Pixel probe — real values + z-scores. Shared across every instrument.</p>
                {selection && readout.map((r) => (
                  <div className="stat" key={r.name}>
                    <span>{r.name}</span>
                    <span className="mono">{r.value.toFixed(3)}
                      <span className="zscore" style={{ color: Math.abs(r.z) > 1.5 ? "var(--amber)" : "var(--ink3)" }}> {r.z >= 0 ? "+" : ""}{r.z.toFixed(1)}σ</span>
                    </span>
                  </div>
                ))}
                {!selection && <p className="note">Nothing probed yet — click a cell in any instrument.</p>}
              </>
            )}
          </div>
        </aside>
      </div>

      <div className="bottom">
        <div className="dock">
          <div className="panel-hd"><h3>Layer stack</h3><span className="tag">field ← click · drag to reorder</span></div>
          <div className="dock-body">
            {layerOrder.map((k) => {
              const m = VARIABLE_METADATA[k];
              const active = params.fieldChannel === k;
              return (
                <div key={k} className={`layer${active ? " active" : ""}`} draggable
                  onDragStart={() => (dragRef.current = k)} onDragOver={(e) => e.preventDefault()} onDrop={() => onDrop(k)}
                  onClick={() => setParams((p) => ({ ...p, fieldChannel: k }))} role="button" tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setParams((p) => ({ ...p, fieldChannel: k })); } }}>
                  <span className="grip">⋮⋮</span><span className="sw" style={{ background: m.color }} />
                  <span className="nm">{k} <small>{m.label}</small></span><span className="mono lv">{cube.stats[k].mean.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </div>

        <footer className="timeline">
          <button className="tbtn" onClick={() => setPlaying((p) => !p)}>{playing ? "❚❚" : "►"}</button>
          <input className="scrub" type="range" min={0} max={80} step={1 / CONFIG.speedHz} value={Math.min(80, step)} onChange={(e) => scrubTo(+e.target.value)} aria-label="time" />
          <div className="anchors">
            <button className={`achip${anchorA ? " set" : ""}`} onClick={() => setAnchorA({ step, cube })} title="pin frame A">A{anchorA ? ` F${Math.round(anchorA.step * CONFIG.speedHz)}` : ""}</button>
            <button className={`achip${anchorB ? " set" : ""}`} onClick={() => setAnchorB({ step, cube })} title="pin frame B">B{anchorB ? ` F${Math.round(anchorB.step * CONFIG.speedHz)}` : ""}</button>
            <button className={`achip delta${diffOn ? " on" : ""}`} disabled={!bothAnchors} onClick={() => setDiffOn((d) => !d)} title="difference field (B − A)">Δ</button>
          </div>
          <span className="provkind">{diffField ? "difference" : "procedural"}</span>
        </footer>
      </div>
    </div>
  );
}
