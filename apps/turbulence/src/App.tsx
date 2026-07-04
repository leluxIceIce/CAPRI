import { useEffect, useMemo, useRef, useState } from "react";
import { generateDataCube, type DataCube, type TelemetryStreamConfig } from "@capri/core";
import { SignatureField } from "./instruments/SignatureField";
import { DEFAULT_SIG_PARAMS, type SigParams } from "./instruments/signatureField";

// M2 — the platform shell scaffold: Command Bar + always-on Network spine + Stage
// running the Signature Field instrument on a live DataCube from @capri/core, plus a
// context Inspector (instrument params) and a Timeline transport. Sources, the DAG
// runtime, linked selection and the remaining five instruments arrive in M3+.

const CONFIG: TelemetryStreamConfig = {
  mode: "synthetic",
  speedHz: 1.5,
  noiseLevel: 0.03,
  currentAnomaly: 0.25,
  driftFactor: 0,
  flowSpeed: 1.1,
};
const GRID = 20;

// The Network — the analysis pipeline as an operator list. Static in M2 (the live
// DAG is M3); shown as an always-visible spine per the platform spec.
const NETWORK: Array<{ fam: string; ops: Array<{ id: string; kind: string; active?: boolean }> }> = [
  { fam: "Sources", ops: [{ id: "synthetic", kind: "src", active: true }, { id: "csv_player", kind: "src" }, { id: "geotiff", kind: "src" }] },
  { fam: "Fields", ops: [{ id: "spatial_tensor", kind: "fld" }, { id: "relationship_tensor", kind: "fld" }, { id: "confidence", kind: "fld" }] },
  { fam: "Reducers", ops: [{ id: "pca_3pc", kind: "red" }, { id: "umap", kind: "red" }, { id: "kmeans_regime", kind: "red" }] },
  { fam: "Models", ops: [{ id: "pls_vip", kind: "mod" }, { id: "random_forest", kind: "mod" }] },
  { fam: "Detectors", ops: [{ id: "bloom_gaia", kind: "det" }, { id: "novelty", kind: "det" }] },
  { fam: "Instruments", ops: [{ id: "signature_field", kind: "ins", active: true }, { id: "optical_section", kind: "ins" }, { id: "latent_volume", kind: "ins" }] },
];

export default function App() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [params, setParams] = useState<SigParams>(DEFAULT_SIG_PARAMS);
  const [cube, setCube] = useState<DataCube>(() => generateDataCube(0, CONFIG, GRID));
  const [utc, setUtc] = useState("");

  // Streaming — regenerate a frame at the configured rate while playing.
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

  // Manual scrub → regenerate that frame deterministically.
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

  const frame = Math.round(step * CONFIG.speedHz);
  const meanCHL = cube.stats.CHL.mean;
  const meanFLH = cube.stats.FLH.mean;

  const spine = useMemo(
    () =>
      NETWORK.map((f) => (
        <div className="fam" key={f.fam}>
          <div className="fam-label">{f.fam}</div>
          {f.ops.map((o, i) => (
            <div key={o.id} className={`op op-${o.kind}${o.active ? " active" : ""}`}>
              {i > 0 && <span className="wire" />}
              <span className="op-dot" />
              {o.id}
              {o.active && <span className="op-run" />}
            </div>
          ))}
        </div>
      )),
    [],
  );

  return (
    <div className="app">
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
          <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? "pause" : "play"}>
            {playing ? "❚❚" : "►"}
          </button>
          <span className="mono fr">F{String(frame).padStart(4, "0")}</span>
        </div>
      </header>

      {/* MAIN */}
      <div className="main">
        {/* THE NETWORK (always-on spine) */}
        <aside className="net">
          <div className="panel-hd"><h3>The Network</h3><span className="tag">pipeline</span></div>
          <div className="net-body">{spine}</div>
        </aside>

        {/* THE STAGE */}
        <main className="stage">
          <div className="tile focus">
            <header className="tile-hd">
              <span className="led" />
              <span className="t">Signature Field</span>
              <span className="ref">ref · Rosetta — spectra in place</span>
            </header>
            <SignatureField cube={cube} params={params} paused={!playing} />
            <div className="legend mono">
              CHL concentration + iso-contours · in-place OLCI spectra · red tick = 681 nm fluorescence · curve colour = FLH vitality
            </div>
          </div>
        </main>

        {/* THE INSPECTOR */}
        <aside className="insp">
          <div className="panel-hd"><h3>Inspector</h3><span className="tag">signature_field</span></div>
          <div className="insp-body">
            <h4 className="mono">signature_field</h4>
            <p className="sub">Instrument parameters — a real node, editable live.</p>

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

            <div className="readout">
              <div className="stat"><span>mean CHL</span><span className="mono">{meanCHL.toFixed(3)}</span></div>
              <div className="stat"><span>mean FLH</span><span className="mono" style={{ color: "var(--cyan)" }}>{meanFLH.toFixed(3)}</span></div>
              <div className="stat"><span>grid</span><span className="mono">{cube.gridSize}×{cube.gridSize}</span></div>
              <div className="stat"><span>source</span><span className="mono">@capri/core</span></div>
            </div>
            <p className="note">Live values are computed by the shared engine — no fabricated numbers. Sources, linked selection and the other five instruments arrive in M3+.</p>
          </div>
        </aside>
      </div>

      {/* TIMELINE */}
      <footer className="timeline">
        <button className="tbtn" onClick={() => setPlaying((p) => !p)}>{playing ? "❚❚" : "►"}</button>
        <input className="scrub" type="range" min={0} max={80} step={1 / CONFIG.speedHz}
          value={Math.min(80, step)} onChange={(e) => scrubTo(+e.target.value)} aria-label="time" />
        <span className="prov mono">SYNTHETIC · seeded · {cube.gridSize}×{cube.gridSize} · {CONFIG.speedHz} Hz</span>
        <span className="provkind">procedural</span>
      </footer>
    </div>
  );
}
