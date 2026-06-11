/**
 * views/Transfer.ts — Transferability assessment view.
 */

import type { CubeData, TransferData } from '../api';

export function buildTransferView(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'page-view';
  el.id = 'view-transfer';
  el.innerHTML = `
    <div class="page-header">
      <h1>🔁 Transferability Assessment</h1>
      <p>Evaluate how well the encoder generalizes to unseen ecological regions</p>
    </div>
    <div class="page-scroll">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
        <!-- Upload external cube -->
        <div class="card">
          <div class="card-label" style="margin-bottom:12px;">External Cube Input</div>
          <div class="upload-zone" id="tr-drop-zone">
          <span class="upload-icon">Upload</span>
          <div class="upload-title">Drop Target Cube</div>
          <div class="upload-sub">CSV with 400 rows (20×20 grid)</div>
        </div>
          <button class="btn btn-primary" id="btn-assess-transfer-full" style="width:100%; justify-content:center;" disabled>
            Assess Transferability
          </button>
        </div>

        <!-- Current cube assessment -->
        <div class="card">
          <div class="card-label" style="margin-bottom:12px;">Assess Current Cube</div>
          <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px;">
            Run the transferability pipeline on the currently loaded cube to check its ecological novelty.
          </p>
          <button class="btn btn-primary" id="btn-assess-current" style="width:100%; justify-content:center;" disabled>
            Assess Current Cube
          </button>
        </div>
      </div>

      <!-- Results -->
      <div id="transfer-results" style="display:none;">
        <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:16px;">
          <div class="card" style="text-align:center;">
            <div class="card-label">Similarity Score</div>
            <div class="score-circle" style="margin:12px auto; width:72px; height:72px; font-size:18px;" id="tr-sim">—</div>
          </div>
          <div class="card" style="text-align:center;">
            <div class="card-label">Novelty Score</div>
            <div class="score-circle" style="margin:12px auto; width:72px; height:72px; font-size:18px; border-color:var(--violet); box-shadow:0 0 20px rgba(168,85,247,.4), inset 0 0 20px rgba(168,85,247,.1); color:var(--violet);" id="tr-nov">—</div>
          </div>
          <div class="card" style="text-align:center;">
            <div class="card-label">Nearest Regime</div>
            <div style="font-size:14px; font-weight:700; color:var(--cyan); margin-top:20px;" id="tr-regime">—</div>
          </div>
          <div class="card" style="text-align:center;">
            <div class="card-label">Confidence</div>
            <div style="margin-top:20px;">
              <div class="progress-track"><div class="progress-fill" id="tr-conf-bar" style="width:0%"></div></div>
              <div style="font-size:13px; font-weight:700; color:var(--text); margin-top:8px;" id="tr-conf-val">—</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-label" style="margin-bottom:12px;">Nearest Ecological Neighbors</div>
          <div id="transfer-neighbors"></div>
        </div>
      </div>
    </div>
  `;
  return el;
}

export function renderTransferResults(data: TransferData) {
  const results = document.getElementById('transfer-results');
  if (results) results.style.display = 'block';

  setInner('tr-sim', (data.similarity_score * 100).toFixed(0) + '%');
  setInner('tr-nov', (data.novelty_score * 100).toFixed(0) + '%');
  setInner('tr-regime', data.nearest_regime);
  setInner('tr-conf-val', (data.confidence * 100).toFixed(1) + '%');

  const confBar = document.getElementById('tr-conf-bar');
  if (confBar) confBar.style.width = (data.confidence * 100) + '%';

  const neighborsEl = document.getElementById('transfer-neighbors');
  if (neighborsEl) {
    neighborsEl.innerHTML = `
      <table style="width:100%; border-collapse:collapse; font-size:12px; font-family:var(--font-mono);">
        <thead>
          <tr>
            ${['Rank','Index','Distance','Regime'].map(h =>
              `<th style="text-align:left; padding:6px 12px; color:var(--text-dim); font-weight:600; border-bottom:1px solid var(--border);">${h}</th>`
            ).join('')}
          </tr>
        </thead>
        <tbody>
          ${data.top_k_neighbors.map((n, i) => `
            <tr style="border-bottom:1px solid rgba(100,160,255,.05);">
              <td style="padding:6px 12px; color:var(--text-dim);">#${i + 1}</td>
              <td style="padding:6px 12px; color:var(--text);">${n.idx}</td>
              <td style="padding:6px 12px; color:var(--cyan);">${n.distance.toFixed(4)}</td>
              <td style="padding:6px 12px; color:var(--text);">${n.regime}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
}

function setInner(id: string, val: string) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
