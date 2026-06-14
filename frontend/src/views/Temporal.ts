/**
 * views/Temporal.ts — Temporal Batches interactive library view.
 */

import {
  fetchTemporalBatches,
  fetchTemporalBatch,
  updateTemporalManifest,
  type TemporalBatchInfo,
  type TemporalBatchDetail,
  type TemporalBatchItem
} from '../api';

const BAND_COLORS: { [key: string]: string } = {
  CHL: '#34c759',
  TSM: '#ffd700',
  APHY: '#00e5ff',
  ADG: '#ff7c29',
  BBP: '#a855f7',
  PAR: '#ffec3d',
  KD490: '#4dabf7',
  SST: '#ff4757'
};

let activeBatchId: string | null = null;
let currentBatchDetail: TemporalBatchDetail | null = null;

export function buildTemporalView(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'page-view';
  container.id = 'view-temporal';
  container.style.display = 'none';

  // Split view layout: sidebar + main detail area
  container.style.cssText = 'flex: 1; display: none; flex-direction: row; overflow: hidden; height: 100%; width: 100%;';

  const sidebar = document.createElement('div');
  sidebar.style.cssText = 'width: 260px; min-width: 260px; border-right: var(--glass-border); background: var(--surface); display: flex; flex-direction: column; overflow: hidden;';
  sidebar.innerHTML = `
    <div style="padding: var(--s4); border-bottom: var(--glass-border); flex-shrink: 0;">
      <h3 style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Temporal Batches</h3>
      <p style="font-size: 11px; color: var(--text-dim); margin-top: 4px; line-height: 1.4;">Select a chronological sequence to analyze trajectory pathways, mean bands, correlation shifts, and transition dynamics.</p>
    </div>
    <div id="temporal-batch-list" style="flex: 1; overflow-y: auto; padding: var(--s3) var(--s2); display: flex; flex-direction: column; gap: var(--s2);">
      <div style="text-align: center; padding: var(--s4); color: var(--text-muted); font-size: 12px;">Loading batches...</div>
    </div>
  `;

  const detailArea = document.createElement('div');
  detailArea.id = 'temporal-detail-container';
  detailArea.style.cssText = 'flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0;';
  detailArea.innerHTML = `
    <div id="temporal-placeholder" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: var(--s10); text-align: center; color: var(--text-muted);">
      <div style="font-size: 48px; margin-bottom: var(--s4); filter: drop-shadow(0 2px 8px rgba(0,0,0,0.1));">⏳</div>
      <h2 style="font-size: 18px; font-weight: 700; color: var(--text);">Select a Temporal Batch</h2>
      <p style="margin-top: var(--s2); max-width: 400px; font-size: 13px; color: var(--text-muted); line-height: 1.5;">Choose a sequence from the left sidebar to render chronological state trajectories, dynamics, delta heatmaps, and configure training manifests.</p>
    </div>
    <div id="temporal-detail-content" style="display: none; flex: 1; flex-direction: column; overflow: hidden; min-width: 0;">
      <!-- Content populated dynamically -->
    </div>
  `;

  container.appendChild(sidebar);
  container.appendChild(detailArea);

  return container;
}

export async function renderTemporalView() {
  const container = document.getElementById('view-temporal');
  if (!container) return;

  const batchListEl = container.querySelector('#temporal-batch-list') as HTMLElement;
  const detailContainer = container.querySelector('#temporal-detail-container') as HTMLElement;

  if (batchListEl && detailContainer) {
    await loadBatches(batchListEl, detailContainer);
  }
}

async function loadBatches(batchListEl: HTMLElement, detailContainer: HTMLElement) {
  try {
    const batches = await fetchTemporalBatches();
    if (batches.length === 0) {
      batchListEl.innerHTML = `<div style="text-align: center; padding: var(--s4); color: var(--text-muted); font-size: 12px;">No temporal batches found.</div>`;
      return;
    }

    batchListEl.innerHTML = '';
    batches.forEach(b => {
      const btn = document.createElement('button');
      btn.className = 'nav-item';
      btn.style.cssText = 'width: 100%; text-align: left; margin-bottom: var(--s2); display: flex; flex-direction: column; align-items: flex-start; padding: var(--s3); border-radius: var(--r-md); border: 1px solid var(--border); background: var(--surface-2); cursor: pointer; color: var(--text-muted); transition: all 0.2s ease;';
      
      btn.innerHTML = `
        <strong class="batch-name" style="font-size: 12px; color: var(--text); display: block; width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${b.name}</strong>
        <span style="font-size: 10px; color: var(--text-dim); margin-top: 4px; display: block;">${b.startDate} to ${b.endDate}</span>
        <span style="font-size: 10px; color: var(--text-dim); display: block;">${b.itemCount} cubes</span>
      `;

      if (activeBatchId === b.id) {
        btn.classList.add('active');
        btn.style.borderColor = 'rgba(0, 113, 227, 0.2)';
        btn.style.background = 'var(--cyan-dim)';
        const strong = btn.querySelector('.batch-name') as HTMLElement;
        if (strong) strong.style.color = 'var(--cyan)';
      }

      btn.addEventListener('click', () => {
        batchListEl.querySelectorAll('button').forEach(button => {
          button.classList.remove('active');
          button.style.borderColor = 'var(--border)';
          button.style.background = 'var(--surface-2)';
          const strong = button.querySelector('.batch-name') as HTMLElement;
          if (strong) strong.style.color = 'var(--text)';
        });

        btn.classList.add('active');
        btn.style.borderColor = 'rgba(0, 113, 227, 0.2)';
        btn.style.background = 'var(--cyan-dim)';
        const strong = btn.querySelector('.batch-name') as HTMLElement;
        if (strong) strong.style.color = 'var(--cyan)';

        activeBatchId = b.id;
        loadBatchDetail(b.id, detailContainer);
      });

      batchListEl.appendChild(btn);
    });

    // Automatically load the active batch details if we already have one selected
    if (activeBatchId) {
      loadBatchDetail(activeBatchId, detailContainer);
    }
  } catch (err: any) {
    batchListEl.innerHTML = `<div style="text-align: center; padding: var(--s4); color: var(--danger); font-size: 12px;">Error: ${err.message}</div>`;
  }
}

async function loadBatchDetail(batchId: string, detailContainer: HTMLElement) {
  const placeholder = detailContainer.querySelector('#temporal-placeholder') as HTMLElement;
  const content = detailContainer.querySelector('#temporal-detail-content') as HTMLElement;

  if (placeholder) placeholder.style.display = 'none';
  if (content) {
    content.style.display = 'flex';
    content.innerHTML = `
      <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted); font-size: 13px; gap: var(--s3);">
        <div class="loading-dots" style="font-size: 14px; font-weight: 500;">Retrieving batch records</div>
        <p style="color:var(--text-dim); font-size:11px;">Please wait while the ecosystem timeline is parsed...</p>
      </div>
    `;
  }

  try {
    const batch = await fetchTemporalBatch(batchId);
    currentBatchDetail = batch;

    content.innerHTML = `
      <div style="padding: var(--s5); border-bottom: var(--glass-border); flex-shrink: 0; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="font-size: 18px; font-weight: 700; color: var(--text);">${batch.name}</h2>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">${batch.description}</p>
        </div>
      </div>

      <div class="page-scroll" style="flex: 1; overflow-y: auto; padding: var(--s5); display: flex; flex-direction: column; gap: var(--s5); min-width: 0;">
        
        <!-- Plotly Charts Tabbed Interface -->
        <div class="card" style="display: flex; flex-direction: column; min-height: 480px; min-width: 0;">
          <div class="panel-tabs" style="margin-bottom: var(--s4); display: flex; gap: var(--s2); border-bottom: var(--glass-border); flex-shrink: 0;">
            <button class="tab-btn active" data-tab="trajectory" style="flex: 1; padding: var(--s2) var(--s3); background: transparent; border: none; border-bottom: 2px solid var(--cyan); color: var(--cyan); font-weight: 600; cursor: pointer; transition: all 0.2s ease;">📈 Trajectory Plot</button>
            <button class="tab-btn" data-tab="bands" style="flex: 1; padding: var(--s2) var(--s3); background: transparent; border: none; border-bottom: 2px solid transparent; color: var(--text-dim); font-weight: 600; cursor: pointer; transition: all 0.2s ease;">📊 Band Time Series</button>
            <button class="tab-btn" data-tab="delta" style="flex: 1; padding: var(--s2) var(--s3); background: transparent; border: none; border-bottom: 2px solid transparent; color: var(--text-dim); font-weight: 600; cursor: pointer; transition: all 0.2s ease;">🗺️ Correlation Delta</button>
            <button class="tab-btn" data-tab="dynamics" style="flex: 1; padding: var(--s2) var(--s3); background: transparent; border: none; border-bottom: 2px solid transparent; color: var(--text-dim); font-weight: 600; cursor: pointer; transition: all 0.2s ease;">⚡ Velocity & Acceleration</button>
          </div>
          
          <div id="tab-content-trajectory" class="temporal-tab-panel" style="flex: 1; display: flex; flex-direction: column; min-width: 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--s2); flex-wrap: wrap; gap: 4px;">
              <div class="card-label" style="margin-bottom: 0;">2D State Space Projection Path</div>
              <p style="font-size: 11px; color: var(--text-muted); margin: 0;">Sequence tracking state evolution. Green = Start, Red = End.</p>
            </div>
            <div id="chart-trajectory" style="height: 380px; width: 100%; min-width: 0;"></div>
          </div>
          
          <div id="tab-content-bands" class="temporal-tab-panel" style="flex: 1; display: none; flex-direction: column; min-width: 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--s3); flex-wrap: wrap; gap: var(--s3);">
              <div class="card-label" style="margin-bottom: 0;">Selected Bands Mean Timeline</div>
              <div style="display: flex; gap: var(--s3); font-size: 11px; flex-wrap: wrap; align-items: center;" id="band-checkboxes-container"></div>
            </div>
            <div id="chart-bands" style="height: 380px; width: 100%; min-width: 0;"></div>
          </div>
          
          <div id="tab-content-delta" class="temporal-tab-panel" style="flex: 1; display: none; flex-direction: column; min-width: 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--s2); flex-wrap: wrap; gap: 4px;">
              <div class="card-label" style="margin-bottom: 0;">Correlation Matrix Delta (Batch vs Analog)</div>
              <p style="font-size: 11px; color: var(--text-muted); margin: 0;">Analog: <strong style="color:var(--cyan);">${batch.correlation_delta.closest_analog_name}</strong> (dist: ${batch.correlation_delta.closest_analog_distance.toFixed(3)})</p>
            </div>
            <div id="chart-delta" style="height: 380px; width: 100%; min-width: 0;"></div>
          </div>
          
          <div id="tab-content-dynamics" class="temporal-tab-panel" style="flex: 1; display: none; flex-direction: column; min-width: 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--s2); flex-wrap: wrap; gap: 4px;">
              <div class="card-label" style="margin-bottom: 0;">Transition Kinetics</div>
              <p style="font-size: 11px; color: var(--text-muted); margin: 0;">UMAP coordinate change rate (velocity) and rate of velocity change (acceleration).</p>
            </div>
            <div id="chart-dynamics" style="height: 380px; width: 100%; min-width: 0;"></div>
          </div>
        </div>

        <!-- Training Manifest Selections Card -->
        <div class="card" style="min-width: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--s3); flex-wrap: wrap; gap: var(--s3);">
            <div>
              <h3 style="font-size: 14px; font-weight: 600; color: var(--text);">Training Manifest Selections</h3>
              <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Approve chronological records to append to the contrastive pre-training corpus.</p>
            </div>
            <div style="display: flex; gap: 12px; align-items: center;">
              <span id="manifest-selection-count" style="font-size: 12px; color: var(--cyan); font-weight: 600; font-family: var(--font-mono);">0 / 0 selected</span>
              <button id="btn-update-manifest" class="btn btn-primary btn-sm">Update Training Manifest</button>
            </div>
          </div>
          
          <div id="manifest-status-message" style="display: none; padding: var(--s2) var(--s3); border-radius: var(--r-sm); margin-bottom: var(--s3); font-size: 12px;"></div>

          <div style="overflow-x: auto; max-height: 240px; border: 1px solid var(--border); border-radius: var(--r-md); background: rgba(0,0,0,0.02);">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 12px; font-family: var(--font-mono);">
              <thead>
                <tr style="border-bottom: 1px solid var(--border); background: rgba(0,0,0,0.04);">
                  <th style="padding: var(--s2) var(--s3); width: 40px; text-align: center;"><input type="checkbox" id="manifest-select-all" style="cursor:pointer;"></th>
                  <th style="padding: var(--s2) var(--s3); font-weight: 600; color: var(--text-dim);">Sample ID</th>
                  <th style="padding: var(--s2) var(--s3); font-weight: 600; color: var(--text-dim);">Timestamp</th>
                  <th style="padding: var(--s2) var(--s3); font-weight: 600; color: var(--text-dim);">Regime</th>
                </tr>
              </thead>
              <tbody id="manifest-items-tbody"></tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Setup tabs
    const tabBtns = content.querySelectorAll('.tab-btn');
    const tabPanels = content.querySelectorAll('.temporal-tab-panel');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => {
          (b as HTMLElement).style.color = 'var(--text-dim)';
          (b as HTMLElement).style.borderBottomColor = 'transparent';
        });
        tabPanels.forEach(p => (p as HTMLElement).style.display = 'none');

        (btn as HTMLElement).style.color = 'var(--cyan)';
        (btn as HTMLElement).style.borderBottomColor = 'var(--cyan)';
        const targetTab = btn.getAttribute('data-tab')!;
        const panel = content.querySelector(`#tab-content-${targetTab}`) as HTMLElement;
        if (panel) {
          panel.style.display = 'flex';
          triggerPlotlyRedraw(targetTab, batch, content);
        }
      });
    });

    // Draw initial Trajectory plot
    drawTrajectoryChart(content, batch);

    // Initialize Band selection checkboxes and chart
    initBandTimeSeries(content, batch);

    // Initialize Manifest items list
    renderManifestList(content, batch);

  } catch (err: any) {
    if (content) {
      content.innerHTML = `<div style="flex: 1; display: flex; align-items: center; justify-content: center; color: var(--danger); font-size: 14px;">Error: ${err.message}</div>`;
    }
  }
}

function triggerPlotlyRedraw(tab: string, batch: TemporalBatchDetail, container: HTMLElement) {
  if (tab === 'trajectory') {
    drawTrajectoryChart(container, batch);
  } else if (tab === 'bands') {
    drawBandsChart(container, batch);
  } else if (tab === 'delta') {
    drawDeltaChart(container, batch);
  } else if (tab === 'dynamics') {
    drawDynamicsChart(container, batch);
  }
}

function drawTrajectoryChart(container: HTMLElement, batch: TemporalBatchDetail) {
  const chartEl = container.querySelector('#chart-trajectory') as HTMLElement;
  if (!chartEl) return;
  const P = (window as any).Plotly;
  if (!P) return;

  const textLabels = batch.trajectory.t.map((_, i) => `${i + 1}`);
  const traceLine = {
    x: batch.trajectory.x,
    y: batch.trajectory.y,
    mode: 'lines',
    line: { color: 'rgba(0, 113, 227, 0.4)', width: 2, shape: 'spline' },
    showlegend: false,
    hoverinfo: 'none'
  };

  const traceMarkers = {
    x: batch.trajectory.x,
    y: batch.trajectory.y,
    text: textLabels,
    textposition: 'top center',
    mode: 'markers+text',
    type: 'scatter',
    marker: {
      size: 10,
      color: batch.trajectory.x.map((_, i) => {
        if (i === 0) return '#34c759'; // Start (Green)
        if (i === batch.trajectory.x.length - 1) return '#ff3b30'; // End (Red)
        return '#0071e3'; // Mid (Blue)
      }),
      line: { color: '#ffffff', width: 1.5 }
    },
    textfont: {
      color: '#86868b',
      size: 9,
      family: 'JetBrains Mono'
    },
    customdata: batch.trajectory.t,
    hovertemplate: '<b>Step %{text}</b><br>Date: %{customdata}<br>UMAP X: %{x}<br>UMAP Y: %{y}<extra></extra>',
    name: 'Time Steps'
  };

  const layout = {
    margin: { l: 40, r: 40, t: 20, b: 40 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: { color: '#86868b', size: 10, family: 'JetBrains Mono' },
    xaxis: { title: 'UMAP Coordinate 1', gridcolor: 'rgba(0,0,0,0.05)', zeroline: false },
    yaxis: { title: 'UMAP Coordinate 2', gridcolor: 'rgba(0,0,0,0.05)', zeroline: false },
    hovermode: 'closest'
  };

  P.newPlot(chartEl, [traceLine, traceMarkers], layout, { responsive: true, displayModeBar: false });
}

function initBandTimeSeries(container: HTMLElement, batch: TemporalBatchDetail) {
  const checkboxContainer = container.querySelector('#band-checkboxes-container')!;
  const variables = batch.correlation_delta.variables;
  
  // Default selected variables
  const defaultSelected = new Set(['CHL', 'SST', 'TSM', 'PAR']);

  checkboxContainer.innerHTML = variables.map(v => {
    const checked = defaultSelected.has(v) ? 'checked' : '';
    return `
      <label style="display: flex; align-items: center; gap: 4px; cursor: pointer; user-select: none;">
        <input type="checkbox" class="band-toggle-chk" value="${v}" ${checked} style="cursor:pointer;">
        <span style="color: ${BAND_COLORS[v] || 'var(--text)'}; font-weight: 600;">${v}</span>
      </label>
    `;
  }).join('');

  checkboxContainer.querySelectorAll('.band-toggle-chk').forEach(chk => {
    chk.addEventListener('change', () => {
      drawBandsChart(container, batch);
    });
  });

  drawBandsChart(container, batch);
}

function drawBandsChart(container: HTMLElement, batch: TemporalBatchDetail) {
  const chartEl = container.querySelector('#chart-bands') as HTMLElement;
  if (!chartEl) return;
  const P = (window as any).Plotly;
  if (!P) return;

  const checkboxes = container.querySelectorAll('.band-toggle-chk') as NodeListOf<HTMLInputElement>;
  const selectedBands: string[] = [];
  checkboxes.forEach(chk => {
    if (chk.checked) selectedBands.push(chk.value);
  });

  const traces = selectedBands.map(band => ({
    x: batch.band_time_series.time,
    y: batch.band_time_series.bands[band],
    name: band,
    type: 'scatter',
    mode: 'lines+markers',
    line: { color: BAND_COLORS[band] || '#0071e3', width: 2 },
    marker: { size: 6 }
  }));

  const layout = {
    margin: { l: 50, r: 20, t: 20, b: 40 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: { color: '#86868b', size: 10, family: 'JetBrains Mono' },
    xaxis: { gridcolor: 'rgba(0,0,0,0.05)' },
    yaxis: { title: 'Normalized Variable Means', gridcolor: 'rgba(0,0,0,0.05)' },
    legend: { font: { size: 10 }, bgcolor: 'transparent', orientation: 'h', y: -0.15 }
  };

  P.newPlot(chartEl, traces, layout, { responsive: true, displayModeBar: false });
}

function drawDeltaChart(container: HTMLElement, batch: TemporalBatchDetail) {
  const chartEl = container.querySelector('#chart-delta') as HTMLElement;
  if (!chartEl) return;
  const P = (window as any).Plotly;
  if (!P) return;

  const traces = [{
    type: 'heatmap',
    z: batch.correlation_delta.matrix,
    x: batch.correlation_delta.variables,
    y: batch.correlation_delta.variables,
    colorscale: [
      [0, '#ff3b30'],    // negative difference (red)
      [0.5, '#f5f5f7'],  // zero difference
      [1, '#34c759']     // positive difference (green)
    ],
    zmin: -0.5,
    zmax: 0.5,
    showscale: true
  }];

  const layout = {
    margin: { l: 60, r: 20, t: 20, b: 60 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: { color: '#86868b', size: 10, family: 'JetBrains Mono' }
  };

  P.newPlot(chartEl, traces, layout, { responsive: true, displayModeBar: false });
}

function drawDynamicsChart(container: HTMLElement, batch: TemporalBatchDetail) {
  const chartEl = container.querySelector('#chart-dynamics') as HTMLElement;
  if (!chartEl) return;
  const P = (window as any).Plotly;
  if (!P) return;

  const traces = [
    {
      x: batch.dynamics.time,
      y: batch.dynamics.velocity,
      name: 'Velocity',
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: '#0071e3', width: 2 },
      marker: { size: 6 }
    },
    {
      x: batch.dynamics.time,
      y: batch.dynamics.acceleration,
      name: 'Acceleration',
      type: 'scatter',
      mode: 'lines+markers',
      line: { color: '#af52de', width: 2, dash: 'dash' },
      marker: { size: 6 }
    }
  ];

  const layout = {
    margin: { l: 50, r: 20, t: 20, b: 40 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: { color: '#86868b', size: 10, family: 'JetBrains Mono' },
    xaxis: { gridcolor: 'rgba(0,0,0,0.05)' },
    yaxis: { title: 'Rate of Change', gridcolor: 'rgba(0,0,0,0.05)' },
    legend: { font: { size: 10 }, bgcolor: 'transparent', orientation: 'h', y: -0.15 }
  };

  P.newPlot(chartEl, traces, layout, { responsive: true, displayModeBar: false });
}

function renderManifestList(container: HTMLElement, batch: TemporalBatchDetail) {
  const tbody = container.querySelector('#manifest-items-tbody')!;
  const selectAll = container.querySelector('#manifest-select-all') as HTMLInputElement;
  const countSpan = container.querySelector('#manifest-selection-count')!;
  const updateBtn = container.querySelector('#btn-update-manifest') as HTMLButtonElement;
  const statusMsg = container.querySelector('#manifest-status-message') as HTMLDivElement;

  tbody.innerHTML = batch.items.map(item => `
    <tr style="border-bottom: 1px solid var(--border); transition: background 0.15s ease;">
      <td style="padding: var(--s2) var(--s3); text-align: center;">
        <input type="checkbox" class="manifest-item-chk" value="${item.id}" ${item.selected ? 'checked' : ''} style="cursor:pointer;">
      </td>
      <td style="padding: var(--s2) var(--s3); font-family: var(--font-mono); color: var(--text);">${item.id}</td>
      <td style="padding: var(--s2) var(--s3); color: var(--text-muted);">${item.timestamp}</td>
      <td style="padding: var(--s2) var(--s3);"><span class="cube-dim-badge" style="font-size: 10px; font-weight: 500;">${item.regime}</span></td>
    </tr>
  `).join('');

  const updateSelectionCount = () => {
    const checked = tbody.querySelectorAll('.manifest-item-chk:checked').length;
    const total = batch.items.length;
    countSpan.textContent = `${checked} / ${total} selected`;
    selectAll.checked = checked === total && total > 0;
  };

  // Wire row checkbox listeners
  tbody.querySelectorAll('.manifest-item-chk').forEach(chk => {
    chk.addEventListener('change', updateSelectionCount);
  });

  // Select all handler
  selectAll.addEventListener('change', () => {
    tbody.querySelectorAll('.manifest-item-chk').forEach(chk => {
      (chk as HTMLInputElement).checked = selectAll.checked;
    });
    updateSelectionCount();
  });

  updateSelectionCount();

  // Update button action
  updateBtn.onclick = async () => {
    const selectedIds: string[] = [];
    tbody.querySelectorAll('.manifest-item-chk:checked').forEach(chk => {
      selectedIds.push((chk as HTMLInputElement).value);
    });

    updateBtn.disabled = true;
    statusMsg.style.display = 'none';

    try {
      const res = await updateTemporalManifest(batch.id, selectedIds);
      statusMsg.style.display = 'block';
      statusMsg.style.background = 'var(--green-dim)';
      statusMsg.style.color = 'var(--green)';
      statusMsg.style.border = '1px solid rgba(52, 199, 89, 0.2)';
      statusMsg.textContent = res.message;

      // Update in-memory details state
      batch.items.forEach(item => {
        item.selected = selectedIds.includes(item.id);
      });
    } catch (e: any) {
      statusMsg.style.display = 'block';
      statusMsg.style.background = 'rgba(255, 59, 48, 0.1)';
      statusMsg.style.color = 'var(--danger)';
      statusMsg.style.border = '1px solid rgba(255, 59, 48, 0.25)';
      statusMsg.textContent = `Error: ${e.message}`;
    } finally {
      updateBtn.disabled = false;
    }
  };
}
