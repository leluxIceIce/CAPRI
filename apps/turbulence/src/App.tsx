import { useEffect, useMemo, useRef, useState } from "react";
import {
  generateDataCube,
  VARIABLE_METADATA,
  type DataCube,
  type TelemetryStreamConfig,
  type VariableName,
} from "@capri/core";
import { SignatureField } from "./instruments/SignatureField";
import { DEFAULT_SIG_PARAMS, type SigParams, type Selection } from "./instruments/signatureField";
import { cellReadout } from "./lib/probe";

// M3 — the shell becomes interactive: the Dock's layer stack picks the field
// channel (drag to reorder), and clicking any cell probes it into the Inspector.
// Sources/project/export docks, the live DAG runtime and the other five
// instruments arrive in M4+.

const CONFIG: TelemetryStreamConfig = {
  mode: "synthetic", speedHz: 1.5, noiseLevel: 0.03, currentAnomaly: 0.25, driftFactor: 0, flowSpeed: 1.1,
};
const GRID = 20;
const ALL_CHANNELS = Object.keys(VARIABLE_METADATA) as VariableName[];

const NETWORK: Array<{ fam: string; ops: Array<{ id: string; kind: string; active?: boolean }> }> = [
  { fam: "Sources", ops: [{ id: "synthetic", kind: "src", active: true }, { id: "csv_player", kind: "src" }, { id: "geotiff", kind: "src" }] },
  { fam: "Fields", ops: [{ id: "spatial_tensor", kind: "fld" }, { id: "relationship_tensor", kind: "fld" }, { id: "confidence", kind: "fld" }] },
  { fam: "Reducers", ops: [{ id: "pca_3pc", kind: "red" }, { id: "umap", kind: "red" }, { id: "kmeans_regime", kind: "red" }] },
  { fam: "Detectors", ops: [{ id: "bloom_gaia", kind: "det" }, { id: "novelty", kind: "det" }] },
  { fam: "Instruments", ops: [{ id: "signature_field", kind: "ins", active: true }, { id: "optical_section", kind: "ins" }, { id: "latent_volume", kind: "ins" }] },
];

export default function App() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [params, setParams] = useState<SigParams>(DEFAULT_SIG_PARAMS);
  const [cube, setCube] = useState<DataCube>(() => generateDataCube(0, CONFIG, GRID));
  const [layerOrder, setLayerOrder] = useState<VariableName[]>(ALL_CHANNELS);
  const [selection, setSelection] = useState<Selection>(null);
  const [face, setFace] = useState<"node" | "probe">("node");
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

  const scrubTo = (s: number) => {
    setStep(s);
    setCube(generateDataCube(s, CONFIG, GRID));
  };

  useEffect(() => {
    const tick = () => setUtc(new Date().toUTCString().replace("GMT", "UTC"));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const onPick = (cell: { row: number; col: number }) => {
    setSelection(cell);
    setFace("probe");
  };

  // Layer-stack drag reorder.
  const dragRef = useRef<VariableName | null>(null);
  const onDrop = (target: VariableName) => {
    const from = dragRef.current;
    dragRef.current = null;
    if (!from || from === target) return;
    setLayerOrder((prev) => {
      const next = prev.filter((k) => k !== from);
      const at = next.indexOf(target);
      next.splice(at, 0, from);
      return next;
    });
  };

  const frame = Math.round(step * CONFIG.speedHz);
  const activeMeta = VARIABLE_METADATA[params.fieldChannel];
  const readout = useMemo(
    () => (selection ? cellReadout(cube, selection.row, selection.col) : []),
    [cube, selection],
  );

  const spine = useMemo(
    () =>
      NETWORK.map((f) => (
        <div className="fam" key={f.fam}>
          <div className="fam-label">{f.fam}</div>
          {f.ops.map((o, i) => (
            <div key={o.id} className={`op op-${o.kind}${o.active ? " active" : ""}`}>
              {i > 0 && <span className="wire" />}
              <span className="op-dot" />{o.id}{o.active && <span className="op-run" />}
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

        <main className="stage">
          <div className="tile focus">
            <header className="tile-hd">
              <span className="led" />
              <span className="t">Signature Field</span>
              <span className="ref">field · {params.fieldChannel} — click to probe</span>
            </header>
            <SignatureField cube={cube} params={params} selection={selection} paused={!playing} onPick={onPick} />
            <div className="legend mono">
              {activeMeta.label} concentration + iso-contours · in-place OLCI spectra · red tick = 681 nm fluorescence · curve colour = FLH vitality
            </div>
          </div>
        </main>

        <aside className="insp">
          <div className="faces">
            <button aria-pressed={face === "node"} onClick={() => setFace("node")}>Node</button>
            <button aria-pressed={face === "probe"} onClick={() => setFace("probe")}>Probe</button>
          </div>
          <div className="insp-body">
            {face === "node" ? (
              <>
                <h4 className="mono">signature_field</h4>
                <p className="sub">Instrument parameters — a real node, editable live. Field channel is set from the layer stack.</p>
                <div className="stat"><span>field channel</span><span className="mono" style={{ color: "var(--sel)" }}>{params.fieldChannel}</span></div>
                <label className="prow">
                  <span>spectra grid</span>
                  <input type="range" min={2} max={8} step={1} value={params.spectraStep}
                    onChange={(e) => setParams((p) => ({ ...p, spectraStep: +e.target.value }))} />
                  <span className="v mono">{params.spectraStep}</span>
                </label>
                <label className="prow">
                  <span>contours</span>
                  <input type="range" min={0} max={9} step={1} value={params.contourLevels}
                    onChange={(e) => setParams((p) => ({ ...p, contourLevels: +e.target.value }))} />
                  <span className="v mono">{params.contourLevels}</span>
                </label>
                <label className="prow">
                  <span>colour gain</span>
                  <input type="range" min={0.4} max={2} step={0.05} value={params.gain}
                    onChange={(e) => setParams((p) => ({ ...p, gain: +e.target.value }))} />
                  <span className="v mono">{params.gain.toFixed(2)}</span>
                </label>
                <p className="note">Live values are computed by @capri/core — no fabricated numbers.</p>
              </>
            ) : (
              <>
                <h4 className="mono">{selection ? `cell ${String(selection.row).padStart(2, "0")} · ${String(selection.col).padStart(2, "0")}` : "no cell"}</h4>
                <p className="sub">Pixel probe — real per-channel values and z-scores from the DataCube. Click a cell in the field.</p>
                {selection && readout.map((r) => (
                  <div className="stat" key={r.name}>
                    <span>{r.name}</span>
                    <span className="mono">
                      {r.value.toFixed(3)}
                      <span className="zscore" style={{ color: Math.abs(r.z) > 1.5 ? "var(--amber)" : "var(--ink3)" }}>
                        {" "}{r.z >= 0 ? "+" : ""}{r.z.toFixed(1)}σ
                      </span>
                    </span>
                  </div>
                ))}
                {!selection && <p className="note">Nothing probed yet — click anywhere on the field.</p>}
              </>
            )}
          </div>
        </aside>
      </div>

      {/* BOTTOM — Dock (layer stack) + Timeline */}
      <div className="bottom">
        <div className="dock">
          <div className="panel-hd">
            <h3>Layer stack</h3>
            <span className="tag">field ← click · drag to reorder</span>
          </div>
          <div className="dock-body">
            {layerOrder.map((k) => {
              const m = VARIABLE_METADATA[k];
              const active = params.fieldChannel === k;
              return (
                <div
                  key={k}
                  className={`layer${active ? " active" : ""}`}
                  draggable
                  onDragStart={() => (dragRef.current = k)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDrop(k)}
                  onClick={() => setParams((p) => ({ ...p, fieldChannel: k }))}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setParams((p) => ({ ...p, fieldChannel: k })); } }}
                >
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
          <input className="scrub" type="range" min={0} max={80} step={1 / CONFIG.speedHz}
            value={Math.min(80, step)} onChange={(e) => scrubTo(+e.target.value)} aria-label="time" />
          <span className="prov mono">SYNTHETIC · seeded · {cube.gridSize}×{cube.gridSize} · {CONFIG.speedHz} Hz</span>
          <span className="provkind">procedural</span>
        </footer>
      </div>
    </div>
  );
}
