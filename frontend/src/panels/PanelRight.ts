/**
 * PanelRight.ts — Right panel: Spectral Explorer + Cluster Membership.
 */

import type { CubeData, DiscoveryData } from '../api';

const VAR_COLORS = ['#00ff9d','#ffd700','#00e5ff','#ff7c29','#a855f7','#ffec3d','#4dabf7','#ff4757'];

export function buildRightPanel(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'panel panel-right';
  el.id = 'panel-right';
  el.innerHTML = `
    <div class="panel-header">
      <div class="panel-title"><span class="panel-title-icon">🔬</span> Spectral Explorer</div>
    </div>

    <!-- Tabs -->
    <div class="panel-tabs">
      <button class="tab-btn active" data-tab="spectral" id="rtab-spectral">Spectral</button>
      <button class="tab-btn" data-tab="clusters" id="rtab-clusters">Clusters</button>
      <button class="tab-btn" data-tab="similarity" id="rtab-similarity">Similarity</button>
      <button class="tab-btn" data-tab="catalog" id="rtab-catalog">Catalog</button>
    </div>

    <!-- Spectral tab -->
    <div id="rtab-spectral-content" style="overflow-y:auto; flex:1;">
      <div class="spectral-placeholder" id="spectral-placeholder">
        <div class="spectral-placeholder-icon">🖱️</div>
        <p>Click any location on the<br>3D cube to inspect its<br>ecological profile</p>
      </div>
      <div id="spectral-content" style="display:none;">
        <div class="spectral-pixel-info" id="pixel-info">
          <div class="pixel-dot"></div>
          <span id="pixel-coord-label">Location (—, —)</span>
        </div>
        <div id="spectral-line-chart" style="height:160px;padding:0 8px;"></div>
        <div id="spectral-bar-chart" style="height:140px;padding:0 8px;"></div>
        <div class="section-divider"></div>
        <div class="var-bars" id="spectral-var-bars"></div>
      </div>
    </div>

    <!-- Clusters tab -->
    <div id="rtab-clusters-content" style="display:none; overflow-y:auto; flex:1;">
      <div class="spectral-placeholder" id="cluster-placeholder">
        <div class="spectral-placeholder-icon">🌌</div>
        <p>Train the encoder to<br>discover ecological states</p>
      </div>
      <div id="cluster-list-content" style="display:none;">
        <div class="cluster-list" id="cluster-list"></div>
      </div>
    </div>

    <!-- Similarity tab -->
    <div id="rtab-similarity-content" style="display:none; overflow-y:auto; flex:1; padding: 16px;">
      <div class="spectral-placeholder" id="similarity-placeholder">
        <div class="spectral-placeholder-icon">🔁</div>
        <p>Run transferability assessment<br>to see similarity scores</p>
      </div>
      <div id="similarity-scores" style="display:none;">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px;">
          <div class="card" style="text-align:center;">
            <div class="card-label">Similarity</div>
            <div class="card-value" id="sim-score">—</div>
          </div>
          <div class="card" style="text-align:center;">
            <div class="card-label">Novelty</div>
            <div class="card-value" id="nov-score">—</div>
          </div>
        </div>
        <div class="card" style="margin-bottom:12px;">
          <div class="card-label">Nearest Regime</div>
          <div style="font-size:15px; font-weight:700; color:var(--cyan); margin-top:4px;" id="nearest-regime">—</div>
        </div>
        <div class="card">
          <div class="card-label">Confidence</div>
          <div style="margin-top:8px;">
            <div class="progress-track"><div class="progress-fill" id="conf-bar" style="width:0%"></div></div>
            <div style="text-align:right; font-size:11px; color:var(--text-muted); margin-top:4px;" id="conf-val">—</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Catalog tab -->
    <div id="rtab-catalog-content" style="display:none; overflow-y:auto; flex:1; padding: 16px;">
      <div class="panel-title" style="margin-bottom: 12px; font-size: 11px;">MODELS</div>
      <div id="catalog-models-list">
        <!-- Dynamic models go here -->
      </div>
      <div class="section-divider" style="margin: 16px 0;"></div>
      <div class="panel-title" style="margin-bottom: 12px; font-size: 11px;">COMPILED DATASETS</div>
      <div id="catalog-datasets-list">
        <!-- Dynamic datasets go here -->
      </div>
    </div>
  `;
  return el;
}

export async function refreshCatalog() {
  const modelsContainer = document.getElementById('catalog-models-list');
  const datasetsContainer = document.getElementById('catalog-datasets-list');
  if (!modelsContainer || !datasetsContainer) return;

  try {
    const api = await import('../api');
    const models = await api.fetchModels();
    const datasets = await api.listDatasets();

    // Render Models
    if (models.length === 0) {
      modelsContainer.innerHTML = `<div style="font-size: 11px; color: var(--text-muted);">No models saved yet.</div>`;
    } else {
      modelsContainer.innerHTML = models.map(m => `
        <div class="card" style="margin-bottom: 12px; border-left: 3px solid ${m.active ? 'var(--cyan)' : 'transparent'};">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="font-weight:600; font-size:12px; color:var(--text);">${m.name}</div>
            ${m.active ? `<span style="font-size:9px; background:rgba(0, 229, 255, 0.1); color:var(--cyan); padding:2px 6px; border-radius:4px;">Active</span>` : ''}
          </div>
          <div style="font-size:10px; color:var(--text-muted); margin-top:4px;">File: ${m.file}</div>
          <div style="font-size:10px; color:var(--text-muted); margin-top:2px;">Description: ${m.description}</div>
          ${m.name === 'cubenet_active' ? `
            <div style="margin-top: 8px; display:flex; gap:6px;">
              <button class="btn btn-sm btn-outline btn-remove-model" data-name="${m.name}" style="flex:1; font-size:10px; padding:4px 0; border-color:rgba(255,71,87,0.3); color:rgba(255,71,87,0.85);">Delete</button>
            </div>
          ` : ''}
        </div>
      `).join('');
    }

    // Render Datasets
    if (datasets.length === 0) {
      datasetsContainer.innerHTML = `<div style="font-size: 11px; color: var(--text-muted);">No datasets compiled yet.</div>`;
    } else {
      datasetsContainer.innerHTML = datasets.map(d => `
        <div class="card" style="margin-bottom: 12px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="font-weight:600; font-size:12px; color:var(--text);">${d.dataset_name}</div>
            <span style="font-size:10px; color:var(--text-muted);">${d.n_cubes} tiles</span>
          </div>
          <div style="font-size:10px; color:var(--text-muted); margin-top:4px;">Source: ${d.source_file}</div>
          <div style="margin-top: 8px; display:flex; gap:6px;">
            <button class="btn btn-sm btn-load-dataset" data-name="${d.dataset_name}" style="flex:1; font-size:10px; padding:4px 0;">Load Pool</button>
            <button class="btn btn-sm btn-outline btn-remove-dataset" data-name="${d.dataset_name}" style="flex:1; font-size:10px; padding:4px 0; border-color:rgba(255,71,87,0.3); color:rgba(255,71,87,0.85);">Delete</button>
          </div>
        </div>
      `).join('');
    }

    // Bind Listeners
    modelsContainer.querySelectorAll('.btn-remove-model').forEach(btn => {
      btn.addEventListener('click', async () => {
        const name = (btn as HTMLElement).dataset.name!;
        if (!confirm(`Are you sure you want to remove model "${name}" and reset training weights?`)) return;
        await api.removeModel(name);
        alert(`Model "${name}" removed. Weights reset.`);
        await refreshCatalog();
      });
    });

    datasetsContainer.querySelectorAll('.btn-load-dataset').forEach(btn => {
      btn.addEventListener('click', async () => {
        const name = (btn as HTMLElement).dataset.name!;
        const res = await fetch(`${api.API_BASE}/api/dataset/merge`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ datasets: [name] })
        });
        const poolData = await res.json();
        alert(`Loaded dataset "${name}" into Active Pool. Pool contains ${poolData.merged_count} cubes.`);
      });
    });

    datasetsContainer.querySelectorAll('.btn-remove-dataset').forEach(btn => {
      btn.addEventListener('click', async () => {
        const name = (btn as HTMLElement).dataset.name!;
        if (!confirm(`Are you sure you want to delete dataset "${name}" from disk?`)) return;
        await api.removeDataset(name);
        alert(`Dataset "${name}" deleted.`);
        await refreshCatalog();
      });
    });

  } catch (e: any) {
    console.error('Failed to refresh catalog:', e);
  }
}

export function initRightPanelTabs() {
  const tabs = document.querySelectorAll<HTMLButtonElement>('[data-tab]');
  tabs.forEach(tab => {
    if (!tab.closest('#panel-right')) return;
    tab.addEventListener('click', () => {
      const name = tab.dataset.tab!;
      tabs.forEach(t => { if (t.closest('#panel-right')) t.classList.remove('active'); });
      tab.classList.add('active');
      ['spectral','clusters','similarity', 'catalog'].forEach(n => {
        const c = document.getElementById(`rtab-${n}-content`);
        if (c) c.style.display = n === name ? '' : 'none';
      });
      if (name === 'catalog') {
        refreshCatalog();
      }
    });
  });
}

export function showSpectralProfile(x: number, y: number, values: number[], variables: string[]) {
  const placeholder = document.getElementById('spectral-placeholder');
  const content = document.getElementById('spectral-content');
  if (placeholder) placeholder.style.display = 'none';
  if (content) content.style.display = 'block';

  const coordEl = document.getElementById('pixel-coord-label');
  if (coordEl) coordEl.textContent = `Location (${x}, ${y})`;

  // Line chart
  const lineEl = document.getElementById('spectral-line-chart');
  if (lineEl && (window as any).Plotly) {
    (window as any).Plotly.newPlot(lineEl, [{
      x: variables,
      y: values,
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: '#00e5ff', width: 2 },
      marker: { color: VAR_COLORS, size: 8 },
      fill: 'tozeroy',
      fillcolor: 'rgba(0,229,255,0.08)',
    }], {
      margin: { l: 36, r: 8, t: 8, b: 48 },
      paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
      font: { color: '#6890b8', size: 9, family: 'JetBrains Mono' },
      xaxis: { tickangle: -30 },
      yaxis: { range: [0, 1.05] },
    }, { responsive: true, displayModeBar: false });
  }

  // Bar chart (radar-style values)
  const barEl = document.getElementById('spectral-bar-chart');
  if (barEl && (window as any).Plotly) {
    (window as any).Plotly.newPlot(barEl, [{
      type: 'bar',
      x: values,
      y: variables,
      orientation: 'h',
      marker: { color: VAR_COLORS },
    }], {
      margin: { l: 54, r: 8, t: 8, b: 24 },
      paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
      font: { color: '#6890b8', size: 9, family: 'JetBrains Mono' },
      xaxis: { range: [0, 1.05] },
    }, { responsive: true, displayModeBar: false });
  }

  // Var bars
  const varBars = document.getElementById('spectral-var-bars');
  if (varBars) {
    varBars.innerHTML = variables.map((v, vi) => `
      <div class="var-bar-row">
        <span class="var-bar-label">${v}</span>
        <div class="var-bar-track">
          <div class="var-bar-fill" style="width:${(values[vi] * 100).toFixed(1)}%; background:${VAR_COLORS[vi]};"></div>
        </div>
        <span class="var-bar-val">${values[vi].toFixed(3)}</span>
      </div>
    `).join('');
  }
}

export function showClusterList(discovery: DiscoveryData) {
  const placeholder = document.getElementById('cluster-placeholder');
  const content = document.getElementById('cluster-list-content');
  if (placeholder) placeholder.style.display = 'none';
  if (content) content.style.display = 'block';

  const list = document.getElementById('cluster-list');
  if (!list) return;
  list.innerHTML = discovery.cluster_names.map((name, i) => `
    <div class="cluster-pill" data-cluster="${i}">
      <div class="cluster-color" style="background:${discovery.cluster_colors[i]};
           box-shadow:0 0 6px ${discovery.cluster_colors[i]}80;"></div>
      <span class="cluster-name">${name}</span>
      <span class="cluster-n">${discovery.cluster_sizes[i]} obs</span>
    </div>
  `).join('');

  list.querySelectorAll('.cluster-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      list.querySelectorAll('.cluster-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
}

export function showSimilarityScores(sim: number, nov: number, regime: string, conf: number) {
  const placeholder = document.getElementById('similarity-placeholder');
  const scores = document.getElementById('similarity-scores');
  if (placeholder) placeholder.style.display = 'none';
  if (scores) scores.style.display = 'block';

  // Switch to similarity tab
  const tab = document.getElementById('rtab-similarity');
  if (tab) tab.click();

  setInner('sim-score', (sim * 100).toFixed(1) + '%');
  setInner('nov-score', (nov * 100).toFixed(1) + '%');
  setInner('nearest-regime', regime);
  setInner('conf-val', (conf * 100).toFixed(1) + '%');
  const bar = document.getElementById('conf-bar');
  if (bar) bar.style.width = (conf * 100) + '%';
}

function setInner(id: string, val: string) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
