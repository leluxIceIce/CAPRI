import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  generateDataCube,
  VARIABLE_METADATA,
  type DataCube,
  type TelemetryStreamConfig,
  type VariableName,
} from "@capri/core";
import { InstrumentCanvas } from "./instruments/InstrumentCanvas";
import { drawSignatureField, DEFAULT_SIG_PARAMS, type SigParams, type Selection } from "./instruments/signatureField";
import { drawOpticalSection, DEFAULT_OPT_PARAMS, type OptParams } from "./instruments/opticalSection";
import { cellReadout, pickCell } from "./lib/probe";
import { channelDiff } from "./lib/diff";

// M4 — the Stage goes multi-instrument. Signature Field + Optical Section share
// one linked selection, arrange as mosaic or focus, and the Timeline can pin two
// frames (A/B) to render the difference field. The remaining four instruments port
// onto the same generic host in M4 follow-ups; the DAG runtime + save/load in M5.

const CONFIG: TelemetryStreamConfig = {
  mode: "synthetic", speedHz: 1.5, noiseLevel: 0.03, currentAnomaly: 0.25, driftFactor: 0, flowSpeed: 1.1,
};
const GRID = 20;
const ALL_CHANNELS = Object.keys(VARIABLE_METADATA) as VariableName[];

const NETWORK: Array<{ fam: string; ops: Array<{ id: string; kind: string; active?: boolean }> }> = [
  { fam: "Sources", ops: [{ id: "synthetic", kind: "src", active: true }, { id: "csv_player", kind: "src" }, { id: "geotiff", kind: "src" }] },
  { fam: "Fields", ops: [{ id: "spatial_tensor", kind: "fld" }, { id: "relationship_tensor", kind: "fld" }] },
  { fam: "Reducers", ops: [{ id: "pca_3pc", kind: "red" }, { id: "umap", kind: "red" }, { id: "kmeans_regime", kind: "red" }] },
  { fam: "Detectors", ops: [{ id: "bloom_gaia", kind: "det" }, { id: "novelty", kind: "det" }] },
  { fam: "Instruments", ops: [{ id: "signature_field", kind: "ins", active: true }, { id: "optical_section", kind: "ins", active: true }, { id: "latent_volume", kind: "ins" }] },
];

type InstId = "signature" | "optical";
type Anchor = { step: number; cube: DataCube } | null;

export default function App() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [params, setParams] = useState<SigParams>(DEFAULT_SIG_PARAMS);
  const [optParams, setOptParams] = useState<OptParams>(DEFAULT_OPT_PARAMS);
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

  // Keyboard: 1/2 focus an instrument, 0 mosaic, space play/pause.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "1") { setStageMode("focus"); setFocusId("signature"); setSelected("signature"); }
      else if (e.key === "2") { setStageMode("focus"); setFocusId("optical"); setSelected("optical"); }
      else if (e.key === "0") setStageMode("mosaic");
      else if (e.key === " ") { e.preventDefault(); setPlaying((p) => !p); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onPick = useCallback((nx: number, ny: number) => {
    setSelection(pickCell(nx, ny, GRID));
    setFace("probe");
  }, []);

  const dragRef = useRef<VariableName | null>(null);
  const onDrop = (target: VariableName) => {
    const from = dragRef.current;
    dragRef.current = null;
    if (!from || from === target) return;
    setLayerOrder((prev) => {
      const next = prev.filter((k) => k !== from);
      next.splice(next.indexOf(target), 0, from);
      return next;
    });
  };

  // Difference field — active only when Δ is on and both anchors are pinned.
  const diffField = useMemo(
    () => (diffOn && anchorA && anchorB ? channelDiff(anchorA.cube, anchorB.cube, params.fieldChannel) : null),
    [diffOn, anchorA, anchorB, params.fieldChannel],
  );

  const sigRender = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, phase: number) =>
      drawSignatureField(ctx, cube, w, h, params, phase, selection, diffField),
    [cube, params, selection, diffField],
  );
  const optRender = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, phase: number) =>
      drawOpticalSection(ctx, cube, w, h, optParams, phase, selection),
    [cube, optParams, selection],
  );

  const frame = Math.round(step * CONFIG.speedHz);
  const activeMeta = VARIABLE_METADATA[params.fieldChannel];
  const readout = useMemo(
    () => (selection ? cellReadout(cube, selection.row, selection.col) : []),
    [cube, selection],
  );
  const bothAnchors = !!(anchorA && anchorB);

  const tiles: Array<{ id: InstId; name: string; ref: string; render: (c: CanvasRenderingContext2D, w: number, h: number, p: number) => void; legend: string }> = [
    {
      id: "signature", name: "Signature Field", ref: "Rosetta",
      render: sigRender,
      legend: diffField
        ? `Δ ${params.fieldChannel} · retreat ← 0 → grow · F${anchorA?.step.toFixed(0)} → F${anchorB?.step.toFixed(0)}`
        : `${activeMeta.label} + iso-contours · in-place OLCI spectra · 681 nm fluorescence · curve = FLH`,
    },
    {
      id: "optical", name: "Optical Section", ref: "petrography",
      render: optRender,
      legend: "optical water types · fronts = grain boundaries · click to probe",
    },
  ];

  const spine = useMemo(
    () => NETWORK.map((f) => (
      <div className="fam" key={f.fam}>
        <div className="fam-label">{f.fam}</div>
        {f.ops.map((o, i) => (
          <div key={o.id} className={`op op-${o.kind}${o.active ? " active" : ""}`}>
            {i > 0 && <span className="wire" />}<span className="op-dot" />{o.id}{o.active && <span className="op-run" />}
          </div>
        ))}
      </div>
    )),
    [],
  );

  return (
    <div className="app app-m3">
      {/* COMMAND BAR */}
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
        <span className="utc mono">{utc || "syncing…"}</span>
        <div className="mini-transport">
          <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? "pause" : "play"}>{playing ? "❚❚" : "►"}</button>
          <span className="mono fr">F{String(frame).padStart(4, "0")}</span>
        </div>
      </header>

      {/* MAIN */}
      <div className="main">
        <aside className="net">
          <div className="panel-hd"><h3>The Network</h3><span className="tag">pipeline</span></div>
          <div className="net-body">{spine}</div>
        </aside>

        <main className={`stage stage-multi`} data-mode={stageMode}>
          {tiles.map((t) => (
            <div
              key={t.id}
              className={`tile${selected === t.id ? " sel" : ""}${focusId === t.id ? " focused" : ""}`}
              onMouseDown={() => setSelected(t.id)}
            >
              <header className="tile-hd">
                <span className="led" />
                <span className="t">{t.name}</span>
                <span className="ref">ref · {t.ref}</span>
                <button className="focusbtn" title="focus (1/2)" onClick={(e) => { e.stopPropagation(); setStageMode("focus"); setFocusId(t.id); setSelected(t.id); }}>⤢</button>
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
            {face === "node" ? (
              selected === "signature" ? (
                <>
                  <h4 className="mono">signature_field</h4>
                  <p className="sub">Field channel is set from the layer stack. Live values from @capri/core.</p>
                  <div className="stat"><span>field channel</span><span className="mono" style={{ color: "var(--sel)" }}>{params.fieldChannel}</span></div>
                  <label className="prow"><span>spectra grid</span>
                    <input type="range" min={2} max={8} step={1} value={params.spectraStep} onChange={(e) => setParams((p) => ({ ...p, spectraStep: +e.target.value }))} /><span className="v mono">{params.spectraStep}</span></label>
                  <label className="prow"><span>contours</span>
                    <input type="range" min={0} max={9} step={1} value={params.contourLevels} onChange={(e) => setParams((p) => ({ ...p, contourLevels: +e.target.value }))} /><span className="v mono">{params.contourLevels}</span></label>
                  <label className="prow"><span>colour gain</span>
                    <input type="range" min={0.4} max={2} step={0.05} value={params.gain} onChange={(e) => setParams((p) => ({ ...p, gain: +e.target.value }))} /><span className="v mono">{params.gain.toFixed(2)}</span></label>
                </>
              ) : (
                <>
                  <h4 className="mono">optical_section</h4>
                  <p className="sub">Water types classified from real CHL/TSM/FLH; fronts render as grain boundaries.</p>
                  <label className="prow"><span>birefringence</span>
                    <input type="range" min={0.3} max={1.4} step={0.05} value={optParams.saturation} onChange={(e) => setOptParams((p) => ({ ...p, saturation: +e.target.value }))} /><span className="v mono">{optParams.saturation.toFixed(2)}</span></label>
                  <label className="prow"><span>grain edges</span>
                    <input type="range" min={0} max={1} step={0.05} value={optParams.fronts} onChange={(e) => setOptParams((p) => ({ ...p, fronts: +e.target.value }))} /><span className="v mono">{optParams.fronts.toFixed(2)}</span></label>
                </>
              )
            ) : (
              <>
                <h4 className="mono">{selection ? `cell ${String(selection.row).padStart(2, "0")} · ${String(selection.col).padStart(2, "0")}` : "no cell"}</h4>
                <p className="sub">Pixel probe — real values + z-scores. Shared across every instrument (linked selection).</p>
                {selection && readout.map((r) => (
                  <div className="stat" key={r.name}>
                    <span>{r.name}</span>
                    <span className="mono">{r.value.toFixed(3)}
                      <span className="zscore" style={{ color: Math.abs(r.z) > 1.5 ? "var(--amber)" : "var(--ink3)" }}> {r.z >= 0 ? "+" : ""}{r.z.toFixed(1)}σ</span>
                    </span>
                  </div>
                ))}
                {!selection && <p className="note">Nothing probed yet — click a cell in either instrument.</p>}
              </>
            )}
          </div>
        </aside>
      </div>

      {/* BOTTOM — Dock (layer stack) + Timeline (with difference anchors) */}
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
                  <span className="grip">⋮⋮</span>
                  <span className="sw" style={{ background: m.color }} />
                  <span className="nm">{k} <small>{m.label}</small></span>
                  <span className="mono lv">{cube.stats[k].mean.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </div>

        <footer className="timeline">
          <button className="tbtn" onClick={() => setPlaying((p) => !p)}>{playing ? "❚❚" : "►"}</button>
          <input className="scrub" type="range" min={0} max={80} step={1 / CONFIG.speedHz} value={Math.min(80, step)} onChange={(e) => scrubTo(+e.target.value)} aria-label="time" />
          <div className="anchors">
            <button className={`achip${anchorA ? " set" : ""}`} onClick={() => setAnchorA({ step, cube })} title="pin frame A">
              A{anchorA ? ` F${Math.round(anchorA.step * CONFIG.speedHz)}` : ""}
            </button>
            <button className={`achip${anchorB ? " set" : ""}`} onClick={() => setAnchorB({ step, cube })} title="pin frame B">
              B{anchorB ? ` F${Math.round(anchorB.step * CONFIG.speedHz)}` : ""}
            </button>
            <button className={`achip delta${diffOn ? " on" : ""}`} disabled={!bothAnchors} onClick={() => setDiffOn((d) => !d)} title="show difference field (B − A)">Δ</button>
          </div>
          <span className="provkind">{diffField ? "difference" : "procedural"}</span>
        </footer>
      </div>
    </div>
  );
}
