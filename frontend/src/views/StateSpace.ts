/**
 * views/StateSpace.ts — Ecological attractor space (UMAP 2D/3D).
 */

import type { DiscoveryData } from '../api';

const CLUSTER_COLORS = ['#00ff9d','#00e5ff','#a855f7','#ff7c29','#ff4757'];

export function buildStateSpaceView(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'page-view';
  el.id = 'view-statespace';
  el.innerHTML = `
    <div class="page-header">
      <h1>🌌 Ecological Attractor Space</h1>
      <p>UMAP projection of latent embeddings — each point is a 16×16×8 ecological observation</p>
    </div>
    <div class="page-scroll">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div class="card-label">2D UMAP Projection</div>
            <button class="btn btn-sm" id="btn-discover" disabled>Discover States</button>
          </div>
          <div id="umap-2d-full" style="height:340px;"></div>
        </div>
        <div class="card">
          <div class="card-label" style="margin-bottom:12px;">3D UMAP Projection</div>
          <div id="umap-3d-full" style="height:340px;"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-label" style="margin-bottom:12px;">Density Map</div>
        <div id="density-map" style="height:200px;"></div>
      </div>
      <div id="statespace-placeholder" style="text-align:center; padding:60px; color:var(--text-muted);">
        <div style="font-size:48px; margin-bottom:16px;">🌌</div>
        <p>Train the encoder first, then discover ecological states</p>
      </div>
    </div>
  `;
  return el;
}

export function renderStateSpaceView(discovery: DiscoveryData) {
  const placeholder = document.getElementById('statespace-placeholder');
  if (placeholder) placeholder.style.display = 'none';

  const P = (window as any).Plotly;
  if (!P) return;

  const makeTraces = (d: number, discovery: DiscoveryData) =>
    discovery.cluster_names.map((name, ci) => {
      const mask = discovery.hdbscan_labels.map((l, i) => l === ci ? i : -1).filter(i => i >= 0);
      const src = d === 2 ? discovery.umap_2d : discovery.umap_3d;
      return {
        x: mask.map(i => src[i][0]),
        y: mask.map(i => src[i][1]),
        ...(d === 3 ? { z: mask.map(i => src[i][2]) } : {}),
        type: d === 3 ? 'scatter3d' : 'scatter',
        mode: 'markers',
        marker: {
          color: discovery.cluster_colors[ci], size: d === 3 ? 5 : 8,
          opacity: 0.85, line: { color: 'rgba(0,0,0,.2)', width: 1 }
        },
        name: name,
      };
    });

  const layout2d = {
    margin: { l: 8, r: 8, t: 8, b: 8 },
    paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
    font: { color: '#6890b8', size: 9, family: 'JetBrains Mono' },
    legend: { font: { size: 9 }, bgcolor: 'transparent', orientation: 'h', y: -0.08 },
    xaxis: { visible: false }, yaxis: { visible: false },
    hovermode: 'closest',
  };

  const layout3d = {
    margin: { l: 0, r: 0, t: 0, b: 0 },
    paper_bgcolor: 'transparent',
    scene: {
      bgcolor: 'transparent',
      xaxis: { visible: false }, yaxis: { visible: false }, zaxis: { visible: false },
    },
    legend: { font: { size: 9 }, bgcolor: 'transparent', orientation: 'h', y: -0.08 },
  };

  P.newPlot(document.getElementById('umap-2d-full')!, makeTraces(2, discovery), layout2d, { responsive: true, displayModeBar: false });
  P.newPlot(document.getElementById('umap-3d-full')!, makeTraces(3, discovery), layout3d, { responsive: true, displayModeBar: false });

  // Density heatmap using 2D data
  const allX = discovery.umap_2d.map(p => p[0]);
  const allY = discovery.umap_2d.map(p => p[1]);
  P.newPlot(document.getElementById('density-map')!, [{
    type: 'histogram2dcontour',
    x: allX, y: allY,
    colorscale: [[0,'rgba(0,0,0,0)'],[0.5,'rgba(0,229,255,0.3)'],[1,'rgba(0,229,255,0.9)']],
    showscale: false, ncontours: 12,
    line: { width: 0.5, color: 'rgba(0,229,255,0.3)' },
  }], {
    margin: { l: 8, r: 8, t: 8, b: 8 },
    paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
    xaxis: { visible: false }, yaxis: { visible: false },
  }, { responsive: true, displayModeBar: false });
}
