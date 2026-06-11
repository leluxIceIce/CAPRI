/**
 * views/Statistics.ts — Full statistics page.
 */

import type { CubeData, StatsData } from '../api';

const VAR_COLORS = ['#00ff9d','#ffd700','#00e5ff','#ff7c29','#a855f7','#ffec3d','#4dabf7','#ff4757'];

export function buildStatisticsView(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'page-view';
  el.id = 'view-statistics';
  el.innerHTML = `
    <div class="page-header">
      <h1>📊 Statistical Intelligence</h1>
      <p>Correlation structure, distributions, and variable relationships of the ecological cube</p>
    </div>
    <div class="page-scroll">
      <div id="stats-placeholder" style="text-align:center; padding:60px; color:var(--text-muted);">
        <div style="font-size:48px; margin-bottom:16px;">📊</div>
        <p>Load a cube first to compute statistics</p>
      </div>
      <div id="stats-content" style="display:none;">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
          <div class="card">
            <div class="card-label">Correlation Matrix</div>
            <div id="full-corr-heatmap" style="height:280px; margin-top:8px;"></div>
          </div>
          <div class="card">
            <div class="card-label">Covariance Matrix</div>
            <div id="full-cov-heatmap" style="height:280px; margin-top:8px;"></div>
          </div>
        </div>
        <div class="card" style="margin-bottom:16px;">
          <div class="card-label">Variable Distributions</div>
          <div id="dist-chart" style="height:240px; margin-top:8px;"></div>
        </div>
        <div class="card">
          <div class="card-label">Summary Statistics</div>
          <div id="stats-table" style="margin-top:8px; overflow-x:auto;"></div>
        </div>
      </div>
    </div>
  `;
  return el;
}

export function renderStatisticsView(cube: CubeData, stats: StatsData) {
  document.getElementById('stats-placeholder')!.style.display = 'none';
  document.getElementById('stats-content')!.style.display = 'block';

  const P = (window as any).Plotly;
  if (!P) return;

  const makeHeatmap = (id: string, matrix: number[][], vars: string[]) => {
    const el = document.getElementById(id);
    if (!el) return;
    P.newPlot(el, [{
      type: 'heatmap', z: matrix, x: vars, y: vars,
      colorscale: [[0,'#1a0a2e'],[0.5,'#0a1628'],[1,'#00e5ff']],
      showscale: true,
    }], {
      margin: { l: 54, r: 8, t: 8, b: 54 },
      paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
      font: { color: '#6890b8', size: 9, family: 'JetBrains Mono' },
    }, { responsive: true, displayModeBar: false });
  };

  makeHeatmap('full-corr-heatmap', stats.correlation_matrix, cube.variables);
  makeHeatmap('full-cov-heatmap', stats.covariance_matrix, cube.variables);

  // Distributions
  const distEl = document.getElementById('dist-chart');
  if (distEl && stats.distributions) {
    P.newPlot(distEl,
      cube.variables.map((v, vi) => ({
        type: 'histogram', x: stats.distributions[v] || [], name: v,
        marker: { color: VAR_COLORS[vi], opacity: 0.7 },
        autobinx: true, nbinsx: 20,
      })),
      {
        barmode: 'overlay',
        margin: { l: 36, r: 8, t: 8, b: 36 },
        paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
        font: { color: '#6890b8', size: 9, family: 'JetBrains Mono' },
        legend: { font: { size: 9 }, bgcolor: 'transparent', orientation: 'h' },
      },
      { responsive: true, displayModeBar: false }
    );
  }

  // Summary table
  const tableEl = document.getElementById('stats-table');
  if (tableEl) {
    tableEl.innerHTML = `
      <table style="width:100%; border-collapse:collapse; font-size:12px; font-family:var(--font-mono);">
        <thead>
          <tr>
            ${['Variable','Mean','Std','Min','Max'].map(h =>
              `<th style="text-align:left; padding:6px 12px; color:var(--text-dim); font-weight:600; border-bottom:1px solid var(--border);">${h}</th>`
            ).join('')}
          </tr>
        </thead>
        <tbody>
          ${cube.variables.map((v, vi) => `
            <tr style="border-bottom:1px solid rgba(100,160,255,.05);">
              <td style="padding:6px 12px; color:${VAR_COLORS[vi]}; font-weight:700;">${v}</td>
              <td style="padding:6px 12px; color:var(--text);">${stats.variable_means[vi].toFixed(4)}</td>
              <td style="padding:6px 12px; color:var(--text);">${stats.variable_stds[vi].toFixed(4)}</td>
              <td style="padding:6px 12px; color:var(--text);">${stats.variable_mins[vi].toFixed(4)}</td>
              <td style="padding:6px 12px; color:var(--text);">${stats.variable_maxs[vi].toFixed(4)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
}
