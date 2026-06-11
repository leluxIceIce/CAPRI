/**
 * PanelBottom.ts — Bottom panel: UMAP state space + training metrics + transferability summary.
 */

import type { DiscoveryData, TrainEvent } from '../api';

const CLUSTER_COLORS = ['#00ff9d','#00e5ff','#a855f7','#ff7c29','#ff4757'];

export function buildBottomPanel(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'panel panel-bottom';
  el.id = 'panel-bottom';

  el.innerHTML = `
    <!-- UMAP Section -->
    <div class="bottom-section" id="umap-section">
      <div class="panel-header">
        <div class="panel-title"><span class="panel-title-icon">🌌</span> Ecological State Space (UMAP)</div>
        <div class="pill pill-idle" id="umap-pill">Not computed</div>
      </div>
      <div class="bottom-section-body">
        <div id="umap-chart" style="width:100%; height:100%;"></div>
        <div id="umap-placeholder" style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-size:12px; gap:8px;">
          <span style="font-size:28px;">🌌</span>
          <span>Train encoder to see state space</span>
        </div>
      </div>
    </div>

    <!-- Training Section -->
    <div class="bottom-section" id="training-section">
      <div class="panel-header">
        <div class="panel-title"><span class="panel-title-icon">🧠</span> Encoder Training</div>
        <div class="pill pill-idle" id="train-pill">Idle</div>
      </div>
      <div class="bottom-section-body" style="padding: 8px 12px; display:flex; flex-direction:column; gap:8px; overflow-y:auto;">
        <button class="btn btn-primary" id="btn-train-encoder" style="width:100%; justify-content:center;" disabled>
          ▶ Train CubeNet Encoder
        </button>
        <div>
          <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-muted); margin-bottom:4px;">
            <span>Loss</span>
            <span id="train-loss-val">—</span>
          </div>
          <div class="progress-track"><div class="progress-fill" id="train-progress" style="width:0%"></div></div>
          <div style="text-align:right; font-size:10px; color:var(--text-dim); margin-top:3px;" id="train-epoch-val">Epoch 0 / 10</div>
        </div>
        <div id="train-loss-chart" style="flex:1; min-height:80px;"></div>
      </div>
    </div>

    <!-- Attractor / Transferability Summary -->
    <div class="bottom-section" style="border-right:none;">
      <div class="panel-header">
        <div class="panel-title"><span class="panel-title-icon">🔁</span> Transferability</div>
        <div class="pill pill-idle" id="transfer-pill">Not assessed</div>
      </div>
      <div class="bottom-section-body" style="padding:8px 12px; display:flex; flex-direction:column; gap:8px; overflow-y:auto;">
        <button class="btn" id="btn-assess-transfer" style="width:100%; justify-content:center;" disabled>
          Assess Current Cube
        </button>
        <div id="transfer-scores" style="display:none; flex-direction:column; gap:8px;">
          <div class="score-gauge">
            <div class="score-circle" id="transfer-sim-circle">—</div>
            <div class="score-label">Ecosystem Similarity</div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
            <div class="card" style="padding:10px;">
              <div class="card-label">Novelty</div>
              <div class="card-value" style="font-size:16px;" id="transfer-nov">—</div>
            </div>
            <div class="card" style="padding:10px;">
              <div class="card-label">Confidence</div>
              <div class="card-value" style="font-size:16px;" id="transfer-conf">—</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  return el;
}

export function initTrainingChart() {
  const el = document.getElementById('train-loss-chart');
  if (!el || !(window as any).Plotly) return;
  (window as any).Plotly.newPlot(el, [
    { x: [], y: [], type: 'scatter', mode: 'lines', line: { color: '#00e5ff', width: 2 }, name: 'Loss' }
  ], {
    margin: { l: 36, r: 8, t: 8, b: 24 },
    paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
    font: { color: '#6890b8', size: 9, family: 'JetBrains Mono' },
    xaxis: { title: 'Epoch' },
    yaxis: { title: 'Loss', rangemode: 'tozero' },
    showlegend: false,
  }, { responsive: true, displayModeBar: false });
}

const lossHistory: { epoch: number[]; loss: number[] } = { epoch: [], loss: [] };

export function updateTrainingProgress(event: TrainEvent) {
  lossHistory.epoch.push(event.epoch);
  lossHistory.loss.push(event.loss);

  const progress = (event.epoch / 10) * 100;
  const bar = document.getElementById('train-progress');
  if (bar) bar.style.width = progress + '%';
  setInner('train-loss-val', event.loss.toFixed(4));
  setInner('train-epoch-val', `Epoch ${event.epoch} / 10`);

  const pill = document.getElementById('train-pill');
  if (pill) { pill.className = 'pill pill-running'; pill.textContent = 'Training…'; }

  const el = document.getElementById('train-loss-chart');
  if (el && (window as any).Plotly) {
    (window as any).Plotly.extendTraces(el, { x: [[event.epoch]], y: [[event.loss]] }, [0]);
  }
}

export function trainingComplete() {
  const pill = document.getElementById('train-pill');
  if (pill) { pill.className = 'pill pill-done'; pill.textContent = '✓ Trained'; }

  const btn = document.getElementById('btn-train-encoder') as HTMLButtonElement;
  if (btn) { btn.textContent = '✓ Encoder Ready'; btn.disabled = false; }

  const bar = document.getElementById('train-progress');
  if (bar) bar.style.width = '100%';
}

export function showUMAPChart(discovery: DiscoveryData) {
  const placeholder = document.getElementById('umap-placeholder');
  if (placeholder) placeholder.style.display = 'none';

  const pill = document.getElementById('umap-pill');
  if (pill) { pill.className = 'pill pill-done'; pill.textContent = `${discovery.cluster_names.length} states`; }

  const el = document.getElementById('umap-chart');
  if (!el || !(window as any).Plotly) return;

  const traces = discovery.cluster_names.map((name, ci) => {
    const mask = discovery.hdbscan_labels.map((l, i) => l === ci ? i : -1).filter(i => i >= 0);
    return {
      x: mask.map(i => discovery.umap_2d[i][0]),
      y: mask.map(i => discovery.umap_2d[i][1]),
      type: 'scatter', mode: 'markers',
      marker: {
        color: discovery.cluster_colors[ci],
        size: 8, opacity: 0.8,
        line: { color: 'rgba(0,0,0,.3)', width: 1 }
      },
      name: name,
    };
  });

  (window as any).Plotly.newPlot(el, traces, {
    margin: { l: 8, r: 8, t: 8, b: 8 },
    paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
    font: { color: '#6890b8', size: 9, family: 'JetBrains Mono' },
    legend: { orientation: 'h', y: -0.05, font: { size: 9 }, bgcolor: 'transparent' },
    xaxis: { visible: false }, yaxis: { visible: false },
    hovermode: 'closest',
  }, { responsive: true, displayModeBar: false });
}

export function showTransferScores(sim: number, nov: number, conf: number) {
  const pill = document.getElementById('transfer-pill');
  if (pill) { pill.className = 'pill pill-done'; pill.textContent = 'Assessed'; }

  const div = document.getElementById('transfer-scores');
  if (div) { div.style.display = 'flex'; }

  const circle = document.getElementById('transfer-sim-circle');
  if (circle) circle.textContent = (sim * 100).toFixed(0) + '%';

  setInner('transfer-nov', (nov * 100).toFixed(1) + '%');
  setInner('transfer-conf', (conf * 100).toFixed(1) + '%');
}

function setInner(id: string, val: string) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
