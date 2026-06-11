/**
 * views/Encoder.ts — Neural cube encoder training view.
 */

import type { CubeData, TrainEvent } from '../api';

export function buildEncoderView(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'page-view';
  el.id = 'view-encoder';
  el.innerHTML = `
    <div class="page-header">
      <h1>Neural Cube Encoder</h1>
      <p>CubeNet learns ecological representations from the 20×20×8 observation space</p>
    </div>
    <div class="page-scroll">
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px;">
        <!-- Architecture card -->
        <div class="card">
          <div class="card-label">CubeNet Architecture</div>
          <div style="margin-top:12px; font-family:var(--font-mono); font-size:11px; color:var(--text-muted); line-height:2;">
            <div style="color:var(--cyan); font-size:13px; font-weight:700; margin-bottom:8px;">CubeNet</div>
            <div style="display:flex; flex-direction:column; gap:6px;">
              ${[
                ['Input', '20 × 20 × 8', 'var(--text)'],
                ['Conv2D', '64 filters, 3×3', 'var(--cyan)'],
                ['ResBlock 1', '2 blocks, 64-dim', 'var(--cyan)'],
                ['CBAM', 'Channel+Spatial Attention', 'var(--purple)'],
                ['ResBlock 2', '2 blocks, 128-dim', 'var(--cyan)'],
                ['ResBlock 3', '2 blocks, 256-dim', 'var(--cyan)'],
                ['ResBlock 4', '2 blocks, 256-dim', 'var(--cyan)'],
                ['AdaptivePool', '→ 2×2', 'var(--text-muted)'],
                ['FC', '128-dim latent space', 'var(--green)'],
              ].map(([name, detail, color]) => `
                <div style="display:flex; align-items:center; gap:12px;">
                  <span style="color:${color}; font-weight:600; min-width:110px;">${name}</span>
                  <span style="color:var(--text-dim);">${detail}</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div style="margin-top:16px; display:flex; flex-direction:column; gap:8px;">
            <div class="info-row" style="padding:0;">
              <span class="info-row-key">Loss function</span>
              <span class="info-row-val" style="font-size:11px;">InfoNCE (contrastive)</span>
            </div>
            <div class="info-row" style="padding:0;">
              <span class="info-row-key">Latent dim</span>
              <span class="info-row-val">128</span>
            </div>
            <div class="info-row" style="padding:0;">
              <span class="info-row-key">Parameters</span>
              <span class="info-row-val">5.7M</span>
            </div>
          </div>
        </div>

        <!-- Training controls -->
        <div class="card">
          <div class="card-label">Training</div>
          <div style="margin-top:12px; display:flex; flex-direction:column; gap:12px;">
            <div>
              <label style="font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;">Epochs</label>
              <input type="number" id="enc-epochs" value="10" min="1" max="100"
                     style="width:100%; padding:6px 10px; background:var(--surface-3); border:1px solid var(--border); border-radius:var(--r-sm); color:var(--text); font:inherit; font-size:13px;" />
            </div>
            <div>
              <label style="font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;">Batch size</label>
              <select id="enc-batch" style="width:100%; padding:6px 10px; background:var(--surface-3); border:1px solid var(--border); border-radius:var(--r-sm); color:var(--text); font:inherit; font-size:13px;">
                <option value="8">8</option>
                <option value="16" selected>16</option>
                <option value="32">32</option>
              </select>
            </div>
            <button class="btn btn-primary" id="btn-train-full" style="width:100%; justify-content:center;" disabled>
              Train CubeNet
            </button>
            <button class="btn btn-outline" id="btn-reset-encoder" style="width:100%; justify-content:center; border-color:rgba(255,71,87,0.3); color:rgba(255,71,87,0.85);">
              Reset Model
            </button>
            <div id="enc-status-msg" style="font-size:12px; color:var(--text-muted); text-align:center; display:none;"></div>
          </div>
        </div>

        <!-- Save model controls -->
        <div class="card">
          <div class="card-label">Save Trained Model</div>
          <div style="margin-top:12px; display:flex; flex-direction:column; gap:12px;">
            <div>
              <label style="font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;">Model Name</label>
              <input type="text" id="save-model-name" placeholder="e.g. cubenet_denmark_v1"
                     style="width:100%; padding:6px 10px; background:var(--surface-3); border:1px solid var(--border); border-radius:var(--r-sm); color:var(--text); font:inherit; font-size:13px;" />
            </div>
            <div>
              <label style="font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;">Description</label>
              <textarea id="save-model-desc" placeholder="Details about dataset, parameters..." rows="2"
                     style="width:100%; padding:6px 10px; background:var(--surface-3); border:1px solid var(--border); border-radius:var(--r-sm); color:var(--text); font:inherit; font-size:12px; resize:vertical;"></textarea>
            </div>
            <button class="btn btn-primary" id="btn-save-model" style="width:100%; justify-content:center;">
              Save Active Model
            </button>
            <div id="save-model-status" style="font-size:12px; color:var(--text-muted); text-align:center; display:none; margin-top:8px;"></div>
          </div>
        </div>
      </div>

      <!-- Loss chart -->
      <div class="card" style="margin-top:16px;">
        <div class="card-label">Contrastive Training Validation</div>
        <div id="enc-loss-chart" style="height:220px; margin-top:8px;"></div>
      </div>

      <!-- Embedding diagnostics -->
      <div class="card" style="margin-top:16px;">
        <div class="card-label">Embedding Diagnostics</div>
        <div id="enc-diagnostics" style="padding:40px; text-align:center; color:var(--text-muted); font-size:12px;">
          Train the encoder to see embedding diagnostics
        </div>
      </div>
    </div>
  `;
  return el;
}

export function initEncoderLossChart() {
  const el = document.getElementById('enc-loss-chart');
  if (!el || !(window as any).Plotly) return;
  
  const traceLoss = {
    x: [], y: [], type: 'scatter', mode: 'lines+markers',
    line: { color: '#00e5ff', width: 2 },
    marker: { color: '#00e5ff', size: 5 },
    name: 'InfoNCE Loss',
    yaxis: 'y'
  };
  
  const tracePos = {
    x: [], y: [], type: 'scatter', mode: 'lines+markers',
    line: { color: '#00ff9d', width: 2 },
    marker: { color: '#00ff9d', size: 5 },
    name: 'Positive Similarity',
    yaxis: 'y2'
  };

  const traceNeg = {
    x: [], y: [], type: 'scatter', mode: 'lines+markers',
    line: { color: '#ff4757', width: 2 },
    marker: { color: '#ff4757', size: 5 },
    name: 'Negative Similarity',
    yaxis: 'y2'
  };

  (window as any).Plotly.newPlot(el, [traceLoss, tracePos, traceNeg], {
    margin: { l: 48, r: 48, t: 24, b: 40 },
    paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
    font: { color: '#6890b8', size: 10, family: 'JetBrains Mono' },
    xaxis: { title: 'Epoch', gridcolor: 'rgba(100,160,255,.06)' },
    yaxis: { title: 'InfoNCE Loss', rangemode: 'tozero', gridcolor: 'rgba(100,160,255,.06)' },
    yaxis2: {
      title: 'Cosine Similarity',
      overlaying: 'y',
      side: 'right',
      range: [0.0, 1.0],
      gridcolor: 'rgba(100,255,160,.03)'
    },
    legend: { font: { size: 9 }, bgcolor: 'transparent', orientation: 'h', y: 1.15 }
  }, { responsive: true, displayModeBar: false });
}

export function appendEncoderLoss(epoch: number, loss: number, posSim = 0.5, negSim = 0.2) {
  const el = document.getElementById('enc-loss-chart');
  if (!el || !(window as any).Plotly) return;
  (window as any).Plotly.extendTraces(el, { 
    x: [[epoch], [epoch], [epoch]], 
    y: [[loss], [posSim], [negSim]] 
  }, [0, 1, 2]);
}

export function showEncoderDiagnostics(z: number[]) {
  const el = document.getElementById('enc-diagnostics');
  if (!el) return;
  const norm = Math.sqrt(z.reduce((a, b) => a + b * b, 0));
  const mean = z.reduce((a, b) => a + b, 0) / z.length;
  const std  = Math.sqrt(z.reduce((a, b) => a + (b - mean) ** 2, 0) / z.length);
  el.innerHTML = `
    <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px;">
      ${[
        ['Latent dim', '128'],
        ['‖z‖₂', norm.toFixed(3)],
        ['Mean', mean.toFixed(3)],
        ['Std', std.toFixed(3)],
      ].map(([label, value]) => `
        <div class="card" style="padding:12px; text-align:center;">
          <div class="card-label">${label}</div>
          <div class="card-value" style="font-size:18px; font-family:var(--font-mono); color:var(--cyan);">${value}</div>
        </div>
      `).join('')}
    </div>
  `;
}
