/**
 * views/Spatial.ts — Spatial process layer view.
 */

import type { CubeData, SpatialData } from '../api';

export function buildSpatialView(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'page-view';
  el.id = 'view-spatial';
  el.innerHTML = `
    <div class="page-header">
      <h1>🗺️ Spatial Process Layer</h1>
      <p>Gradient structure, local variance, texture, and spatial organization of the cube</p>
    </div>
    <div class="page-scroll">
      <div id="spatial-placeholder" style="text-align:center; padding:60px; color:var(--text-muted);">
        <div style="font-size:48px; margin-bottom:16px;">🗺️</div>
        <p>Load a cube to compute spatial structure</p>
      </div>
      <div id="spatial-content" style="display:none;">
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px;">
          <div class="card">
            <div class="card-label">Gradient Magnitude</div>
            <div id="grad-chart" style="height:220px; margin-top:8px;"></div>
            <p style="font-size:11px; color:var(--text-dim); margin-top:8px;">
              Ecological fronts and boundary zones appear as high-gradient regions.
            </p>
          </div>
          <div class="card">
            <div class="card-label">Local Variance</div>
            <div id="var-chart" style="height:220px; margin-top:8px;"></div>
            <p style="font-size:11px; color:var(--text-dim); margin-top:8px;">
              Patchiness and heterogeneity — high variance indicates ecological complexity.
            </p>
          </div>
          <div class="card">
            <div class="card-label">Texture (Entropy)</div>
            <div id="tex-chart" style="height:220px; margin-top:8px;"></div>
            <p style="font-size:11px; color:var(--text-dim); margin-top:8px;">
              Spatial information content — mixing zones show elevated texture values.
            </p>
          </div>
        </div>
        <div class="card" style="margin-top:16px;">
          <div class="card-label">Spatial Structure Summary</div>
          <div id="spatial-stats" style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-top:12px;"></div>
        </div>
      </div>
    </div>
  `;
  return el;
}

export function renderSpatialView(cube: CubeData, spatial: SpatialData) {
  document.getElementById('spatial-placeholder')!.style.display = 'none';
  document.getElementById('spatial-content')!.style.display = 'block';

  const P = (window as any).Plotly;
  if (!P) return;

  const makeHeatmap = (id: string, data: number[][], colorscale: any[]) => {
    const el = document.getElementById(id);
    if (!el) return;
    P.newPlot(el, [{
      type: 'heatmap',
      z: data,
      colorscale,
      showscale: false,
    }], {
      margin: { l: 8, r: 8, t: 8, b: 8 },
      paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
      xaxis: { visible: false }, yaxis: { visible: false },
    }, { responsive: true, displayModeBar: false });
  };

  makeHeatmap('grad-chart', spatial.gradient_magnitude, [
    [0,'#04080f'],[0.3,'#1a3a6e'],[0.7,'#00e5ff'],[1,'#ffffff']
  ]);
  makeHeatmap('var-chart', spatial.local_variance, [
    [0,'#04080f'],[0.3,'#2d0a6e'],[0.7,'#a855f7'],[1,'#ffffff']
  ]);
  makeHeatmap('tex-chart', spatial.texture, [
    [0,'#04080f'],[0.3,'#4a1a00'],[0.7,'#ff7c29'],[1,'#ffffff']
  ]);

  // Summary stats
  const mean2d = (arr: number[][]) => arr.flat().reduce((a, b) => a + b, 0) / arr.flat().length;
  const max2d  = (arr: number[][]) => Math.max(...arr.flat());
  const statsEl = document.getElementById('spatial-stats');
  if (statsEl) {
    const metrics = [
      { label: 'Mean Gradient', value: mean2d(spatial.gradient_magnitude).toFixed(4) },
      { label: 'Max Gradient', value: max2d(spatial.gradient_magnitude).toFixed(4) },
      { label: 'Mean Variance', value: mean2d(spatial.local_variance).toFixed(4) },
      { label: 'Mean Texture', value: mean2d(spatial.texture).toFixed(4) },
    ];
    statsEl.innerHTML = metrics.map(m => `
      <div class="card" style="padding:12px; text-align:center;">
        <div class="card-label">${m.label}</div>
        <div class="card-value" style="font-size:18px; font-family:var(--font-mono);">${m.value}</div>
      </div>
    `).join('');
  }
}
