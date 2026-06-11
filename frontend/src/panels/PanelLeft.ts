/**
 * PanelLeft.ts — Left panel: data info, cube stats, correlation heatmap, layer controls.
 */

import type { CubeData, StatsData } from '../api';

const VAR_COLORS = ['#00ff9d','#ffd700','#00e5ff','#ff7c29','#a855f7','#ffec3d','#4dabf7','#ff4757'];

export function buildLeftPanel(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'panel panel-left';
  el.id = 'panel-left';
  el.innerHTML = `
    <div class="panel-header">
      <div class="panel-title"><span class="panel-title-icon">📊</span> Data & Cube</div>
      <div id="cube-status-pill" class="pill pill-idle">No Cube</div>
    </div>

    <!-- Upload zone -->
    <div id="upload-section">
      <div class="upload-zone" id="upload-drop-zone" role="button" tabindex="0"
           aria-label="Upload CSV — drag and drop or click">
        <input type="file" id="cube-file-input" accept=".csv,text/csv" />
        <span class="upload-icon">🌊</span>
        <div class="upload-title">Drop ecological CSV</div>
        <div class="upload-sub">or click to browse · 256 rows (16×16)</div>
      </div>
      <div style="padding: 0 16px 12px; display:flex; gap:8px;">
        <button class="btn btn-primary" id="btn-load-synthetic" style="flex:1; justify-content:center;">
          ⚡ Load Synthetic Cube
        </button>
      </div>
    </div>

    <!-- Cube metadata (shown after load) -->
    <div id="cube-meta-section" style="display:none;">
      <div class="section-divider"></div>
      <div class="info-row"><span class="info-row-key">Source</span><span class="info-row-val" id="meta-source">—</span></div>
      <div class="info-row"><span class="info-row-key">Dimensions</span><span class="info-row-val">16 × 16 × 8</span></div>
      <div class="info-row"><span class="info-row-key">Regime</span><span class="info-row-val" id="meta-regime">—</span></div>
      <div class="info-row"><span class="info-row-key">Completeness</span><span class="info-row-val" id="meta-completeness">—</span></div>
      <div class="info-row" id="meta-bounds-row" style="display:none;">
        <span class="info-row-key">Bounds</span>
        <span class="info-row-val" id="meta-bounds" style="font-size:10px;">—</span>
      </div>

      <div class="section-divider"></div>

      <!-- Variable means bar chart -->
      <div class="panel-title" style="padding: 8px 16px 4px; font-size:10px;">VARIABLE MEANS</div>
      <div class="var-bars" id="var-bars"></div>

      <div class="section-divider"></div>

      <!-- Layer controls -->
      <div class="panel-title" style="padding: 8px 16px 4px; font-size:10px;">LAYER OPACITY</div>
      <div class="layer-controls" id="layer-controls"></div>

      <div class="section-divider"></div>

      <!-- Correlation mini heatmap -->
      <div class="panel-title" style="padding: 8px 16px 4px; font-size:10px;">CORRELATION MATRIX</div>
      <div class="heatmap-wrap">
        <div id="corr-heatmap" class="plotly-wrap" style="height:200px;"></div>
      </div>
    </div>
  `;
  return el;
}

export function updateLeftPanel(cube: CubeData, stats: StatsData | null) {
  // Status pill
  const pill = document.getElementById('cube-status-pill');
  if (pill) { pill.className = 'pill pill-ready'; pill.textContent = '● Cube Ready'; }

  // Hide upload, show meta
  const up = document.getElementById('upload-section');
  const meta = document.getElementById('cube-meta-section');
  if (up) up.style.display = 'none';
  if (meta) meta.style.display = 'block';

  // Fill metadata
  setInner('meta-source', cube.source.length > 18 ? cube.source.slice(0, 15) + '…' : cube.source);
  setInner('meta-regime', cube.regime);
  setInner('meta-completeness', (cube.completeness * 100).toFixed(1) + '%');

  if (cube.coordinate_bounds) {
    const b = cube.coordinate_bounds;
    setInner('meta-bounds', `${b.lat_min.toFixed(1)}–${b.lat_max.toFixed(1)}°N, ${b.lon_min.toFixed(1)}–${b.lon_max.toFixed(1)}°E`);
    const row = document.getElementById('meta-bounds-row');
    if (row) row.style.display = 'flex';
  }

  // Variable means bars
  const varBars = document.getElementById('var-bars');
  if (varBars) {
    const means = stats?.variable_means || cube.variables.map((_, vi) => {
      const vals = cube.cube.flatMap(row => row.map(c => c[vi]));
      return vals.reduce((a, b) => a + b) / vals.length;
    });
    varBars.innerHTML = cube.variables.map((v, vi) => `
      <div class="var-bar-row">
        <span class="var-bar-label">${v}</span>
        <div class="var-bar-track">
          <div class="var-bar-fill" style="width:${(means[vi] * 100).toFixed(1)}%; background:${VAR_COLORS[vi]};"></div>
        </div>
        <span class="var-bar-val">${means[vi].toFixed(3)}</span>
      </div>
    `).join('');
  }

  // Layer controls
  const layerCtrl = document.getElementById('layer-controls');
  if (layerCtrl) {
    layerCtrl.innerHTML = cube.variables.map((v, vi) => `
      <div class="layer-row">
        <div class="layer-swatch" style="background:${VAR_COLORS[vi]};"></div>
        <span class="layer-name">${v}</span>
        <input type="range" class="layer-slider" min="0" max="1" step="0.05"
               value="0.85" data-layer="${vi}" id="layer-slider-${vi}" />
        <button class="layer-toggle active" data-layer="${vi}" id="layer-toggle-${vi}" title="Toggle layer">●</button>
      </div>
    `).join('');

    layerCtrl.querySelectorAll<HTMLInputElement>('.layer-slider').forEach(slider => {
      slider.addEventListener('input', () => {
        const idx = parseInt(slider.dataset.layer!);
        const val = parseFloat(slider.value);
        document.dispatchEvent(new CustomEvent('layer-opacity', { detail: { idx, val } }));
      });
    });

    layerCtrl.querySelectorAll<HTMLButtonElement>('.layer-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.layer!);
        const active = btn.classList.toggle('active');
        document.dispatchEvent(new CustomEvent('layer-toggle', { detail: { idx, visible: active } }));
      });
    });
  }

  // Correlation heatmap
  if (stats) renderCorrHeatmap(stats, cube.variables);
}

function renderCorrHeatmap(stats: StatsData, variables: string[]) {
  const el = document.getElementById('corr-heatmap');
  if (!el || !(window as any).Plotly) return;
  const Plotly = (window as any).Plotly;
  Plotly.newPlot(el, [{
    type: 'heatmap',
    z: stats.correlation_matrix,
    x: variables,
    y: variables,
    colorscale: [
      [0, '#1a0a2e'], [0.25, '#4b1d6e'], [0.5, '#0a1628'],
      [0.75, '#004d80'], [1.0, '#00e5ff']
    ],
    zmin: -1, zmax: 1,
    showscale: false,
  }], {
    margin: { l: 42, r: 8, t: 8, b: 42 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: { color: '#6890b8', size: 9, family: 'JetBrains Mono' },
    xaxis: { tickfont: { size: 9 } },
    yaxis: { tickfont: { size: 9 } },
  }, { responsive: true, displayModeBar: false });
}

function setInner(id: string, val: string) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
