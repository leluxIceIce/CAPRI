/**
 * views/Explainability.ts — Ecological Explainability & Relationship view.
 */

import type { CubeData, StatsData } from '../api';

let activeVariable = 'CHL';
let activeMetric = 'pearson' as 'pearson' | 'spearman' | 'mi';
let cachedCube: CubeData | null = null;
let cachedStats: StatsData | null = null;

const VAR_COLORS = {
  CHL: '#00ff9d',
  TSM: '#ffd700',
  APHY: '#00e5ff',
  ADG: '#ff7c29',
  BBP: '#a855f7',
  PAR: '#ffec3d',
  KD490: '#4dabf7',
  SST: '#ff4757'
} as Record<string, string>;

const VAR_DESCRIPTIONS = {
  CHL: 'Chlorophyll-a (Phytoplankton Biomass proxy)',
  TSM: 'Total Suspended Matter (Turbidity & scattering)',
  APHY: 'Phytoplankton Absorption (Specific biological signal)',
  ADG: 'Detritus and Gelbstoff Absorption (Organic matter)',
  BBP: 'Particulate Backscattering (Suspended sediment & cells)',
  PAR: 'Photosynthetically Active Radiation (Solar driver)',
  KD490: 'Diffuse Attenuation Coefficient (Light penetration depth)',
  SST: 'Sea Surface Temperature (Thermal metabolic controller)'
} as Record<string, string>;

export function buildExplainabilityView(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'page-view';
  el.id = 'view-explainability';
  el.innerHTML = `
    <div class="page-header">
      <h1>Ecological Relationship Discovery</h1>
      <p>Analyze physical drivers, biological responses, and optical interactions within the water column</p>
    </div>
    <div class="page-scroll">
      <div id="expl-placeholder" style="text-align:center; padding:60px; color:var(--text-muted);">
        <p>Load an ecological observation cube to map relationship pathways</p>
      </div>
      <div id="expl-content" style="display:none; flex:1; display:flex; flex-direction:column; gap:16px;">
        
        <div style="display:grid; grid-template-columns:320px 1fr; gap:16px; min-height:480px;">
          <!-- Left Column: Variable & Metric Selector + Drivers List -->
          <div class="card" style="display:flex; flex-direction:column; gap:16px;">
            <div>
              <div class="card-label" style="margin-bottom:8px;">Relationship Metric</div>
              <select id="expl-metric-select" style="width:100%; padding:6px 10px; background:var(--surface-3); border:1px solid var(--border); border-radius:var(--r-sm); color:var(--text); font:inherit; font-size:13px;">
                <option value="pearson">Pearson Linear Correlation</option>
                <option value="spearman">Spearman Rank Correlation</option>
                <option value="mi">Normalized Mutual Information</option>
              </select>
            </div>

            <div>
              <div class="card-label" style="margin-bottom:8px;">Target Variable</div>
              <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:6px;" id="expl-var-buttons">
                ${['CHL', 'TSM', 'APHY', 'ADG', 'BBP', 'PAR', 'KD490', 'SST'].map(v => `
                  <button class="btn btn-sm ${v === 'CHL' ? 'btn-primary' : ''}" data-var="${v}" style="justify-content:center; padding:6px 0; font-family:var(--font-mono); font-size:11px;">
                    ${v}
                  </button>
                `).join('')}
              </div>
            </div>

            <div style="border-top:1px solid var(--border); padding-top:12px; flex:1; display:flex; flex-direction:column; gap:12px;">
              <div id="expl-var-info">
                <div style="font-weight:700; color:var(--text); font-size:14px;" id="expl-target-title">CHL</div>
                <div style="font-size:11px; color:var(--text-muted); margin-top:2px;" id="expl-target-desc">Chlorophyll-a</div>
              </div>

              <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
                <div class="card-label">Identified Drivers</div>
                <div id="expl-drivers-list" style="display:flex; flex-direction:column; gap:8px; overflow-y:auto; max-height:260px;">
                  <!-- Drivers go here -->
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Interactive Ecological Dependency Graph -->
          <div class="card" style="display:flex; flex-direction:column;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <div class="card-label">Ecological Dependency Graph</div>
              <div style="display:flex; gap:8px; align-items:center;">
                <button id="btn-recompute-relations" class="btn btn-sm btn-outline" style="font-size:11px; padding:4px 8px;">Recompute Relationships</button>
                <div style="font-size:11px; color:var(--text-muted); display:inline-block;">
                  Thickness shows link strength · Hover to inspect values
                </div>
              </div>
            </div>
            <div style="flex:1; position:relative; min-height:400px; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,0.1); border-radius:var(--r-md); overflow:hidden;">
              <svg id="expl-graph-svg" style="width:100%; height:100%; min-height:400px;"></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  return el;
}

export function renderExplainabilityView(cube: CubeData, stats: StatsData) {
  cachedCube = cube;
  cachedStats = stats;

  const placeholder = document.getElementById('expl-placeholder');
  if (placeholder) placeholder.style.display = 'none';

  const content = document.getElementById('expl-content');
  if (content) content.style.display = 'flex';

  setupEventListeners();
  updateDriversList();
  drawDependencyGraph();
}

function setupEventListeners() {
  const metricSelect = document.getElementById('expl-metric-select') as HTMLSelectElement;
  if (metricSelect) {
    metricSelect.value = activeMetric;
    metricSelect.onchange = () => {
      activeMetric = metricSelect.value as any;
      updateDriversList();
      drawDependencyGraph();
    };
  }

  const buttons = document.querySelectorAll('#expl-var-buttons button');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e: Event) => {
      buttons.forEach(b => b.classList.remove('btn-primary'));
      const targetBtn = e.currentTarget as HTMLButtonElement;
      targetBtn.classList.add('btn-primary');
      activeVariable = targetBtn.dataset.var || 'CHL';
      updateDriversList();
      drawDependencyGraph();
    });
  });

  const recomputeBtn = document.getElementById('btn-recompute-relations') as HTMLButtonElement;
  if (recomputeBtn) {
    recomputeBtn.onclick = async () => {
      if (!cachedCube) return;
      recomputeBtn.disabled = true;
      recomputeBtn.textContent = 'Recomputing…';
      try {
        const api = await import('../api');
        const stats = await api.fetchStats(cachedCube);
        cachedStats = stats;
        updateDriversList();
        drawDependencyGraph();
        alert('Relationships recomputed successfully! dependency_graph.json updated.');
      } catch (e: any) {
        alert(`Failed to recompute relationships: ${e.message}`);
      } finally {
        recomputeBtn.disabled = false;
        recomputeBtn.textContent = 'Recompute Relationships';
      }
    };
  }
}

function updateDriversList() {
  const targetTitle = document.getElementById('expl-target-title');
  const targetDesc = document.getElementById('expl-target-desc');
  const driversList = document.getElementById('expl-drivers-list');

  if (!targetTitle || !targetDesc || !driversList || !cachedCube || !cachedStats) return;

  targetTitle.textContent = activeVariable;
  targetTitle.style.color = VAR_COLORS[activeVariable];
  targetDesc.textContent = VAR_DESCRIPTIONS[activeVariable] || '';

  // Calculate relationships for activeVariable
  const vars = cachedCube.variables;
  const targetIdx = vars.indexOf(activeVariable);

  let matrix: number[][];
  if (activeMetric === 'spearman' && cachedStats.spearman_matrix) {
    matrix = cachedStats.spearman_matrix;
  } else if (activeMetric === 'mi' && cachedStats.mi_matrix) {
    matrix = cachedStats.mi_matrix;
  } else {
    matrix = cachedStats.pearson_matrix || cachedStats.correlation_matrix;
  }

  const relationships = vars.map((name, idx) => {
    return {
      name,
      val: matrix[targetIdx][idx],
      absVal: Math.abs(matrix[targetIdx][idx])
    };
  }).filter(r => r.name !== activeVariable);

  // Sort by relationship strength (absolute value) descending
  relationships.sort((a, b) => b.absVal - a.absVal);

  driversList.innerHTML = relationships.map(r => {
    const isPositive = r.val >= 0;
    const percentage = Math.round(r.absVal * 100);
    const displayVal = activeMetric === 'mi' ? r.val.toFixed(2) : (isPositive ? `+${r.val.toFixed(2)}` : r.val.toFixed(2));
    
    // Choose bar color:
    // Pearson/Spearman: Green for positive correlation, Red for negative correlation
    // MI: Cyan/Blue gradient
    let barColor = 'var(--cyan)';
    if (activeMetric !== 'mi') {
      barColor = isPositive ? 'rgba(0, 255, 157, 0.6)' : 'rgba(255, 71, 87, 0.6)';
    }

    return `
      <div style="background:var(--surface-3); border:1px solid var(--border); border-radius:var(--r-sm); padding:8px 12px; display:flex; flex-direction:column; gap:4px;">
        <div style="display:flex; justify-content:space-between; align-items:center; font-family:var(--font-mono); font-size:12px;">
          <span style="font-weight:700; color:${VAR_COLORS[r.name]}">${r.name}</span>
          <span style="color:var(--text-dim); font-size:11px;">${displayVal}</span>
        </div>
        <div style="width:100%; height:4px; background:rgba(255,255,255,0.05); border-radius:2px; overflow:hidden;">
          <div style="width:${percentage}%; height:100%; background:${barColor}; border-radius:2px;"></div>
        </div>
        <div style="font-size:10px; color:var(--text-muted);">${VAR_DESCRIPTIONS[r.name] || ''}</div>
      </div>
    `;
  }).join('');
}

function drawDependencyGraph() {
  const svg = document.getElementById('expl-graph-svg') as unknown as SVGSVGElement;
  if (!svg || !cachedCube || !cachedStats) return;

  // Clear SVG
  svg.innerHTML = '';

  const w = svg.clientWidth || 600;
  const h = svg.clientHeight || 400;

  // Nodes metadata and coordinates
  const nodes = {
    PAR:   { label: 'PAR',   x: w * 0.5,  y: h * 0.15, category: 'driver' },
    SST:   { label: 'SST',   x: w * 0.8,  y: h * 0.15, category: 'driver' },
    CHL:   { label: 'CHL',   x: w * 0.5,  y: h * 0.50, category: 'biology' },
    APHY:  { label: 'APHY',  x: w * 0.8,  y: h * 0.50, category: 'biology' },
    BBP:   { label: 'BBP',   x: w * 0.8,  y: h * 0.80, category: 'optical' },
    KD490: { label: 'KD490', x: w * 0.5,  y: h * 0.80, category: 'optical' },
    TSM:   { label: 'TSM',   x: w * 0.2,  y: h * 0.50, category: 'interference' },
    ADG:   { label: 'ADG',   x: w * 0.2,  y: h * 0.80, category: 'interference' }
  } as Record<string, { label: string; x: number; y: number; category: string }>;

  // Links to draw: [from, to, type]
  // type can be: 'drive' (arrow), 'couple' (double-arrow), 'inhibit' (bar)
  const links = [
    { from: 'PAR',   to: 'CHL',   type: 'drive' },
    { from: 'SST',   to: 'CHL',   type: 'drive' },
    { from: 'APHY',  to: 'CHL',   type: 'couple' },
    { from: 'TSM',   to: 'CHL',   type: 'inhibit' },
    { from: 'ADG',   to: 'CHL',   type: 'inhibit' },
    { from: 'CHL',   to: 'KD490', type: 'drive' },
    { from: 'TSM',   to: 'KD490', type: 'drive' },
    { from: 'BBP',   to: 'TSM',   type: 'couple' }
  ];

  // Define Arrowheads and markers in SVG
  svg.innerHTML += `
    <defs>
      <marker id="arrow-drive" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="rgba(0, 229, 255, 0.7)" />
      </marker>
      <marker id="arrow-drive-active" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--cyan)" />
      </marker>
      <marker id="arrow-couple" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="rgba(168, 85, 247, 0.7)" />
      </marker>
      <marker id="arrow-inhibit" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 5 0 L 5 10" stroke="rgba(255, 71, 87, 0.7)" stroke-width="3" />
      </marker>
    </defs>
  `;

  // Draw links
  const vars = cachedCube.variables;
  let matrix: number[][];
  if (activeMetric === 'spearman' && cachedStats.spearman_matrix) {
    matrix = cachedStats.spearman_matrix;
  } else if (activeMetric === 'mi' && cachedStats.mi_matrix) {
    matrix = cachedStats.mi_matrix;
  } else {
    matrix = cachedStats.pearson_matrix || cachedStats.correlation_matrix;
  }

  links.forEach(link => {
    const fNode = nodes[link.from];
    const tNode = nodes[link.to];
    if (!fNode || !tNode) return;

    // Get calculated weight
    const fIdx = vars.indexOf(link.from);
    const tIdx = vars.indexOf(link.to);
    const rVal = matrix[fIdx][tIdx];
    const absVal = Math.abs(rVal);

    // Scaling edge thickness: width between 1.5px and 7px
    const strokeWidth = 1.5 + absVal * 5.5;

    // Edge color
    let strokeColor = 'rgba(255, 255, 255, 0.15)';
    const isActive = link.from === activeVariable || link.to === activeVariable;
    
    if (activeMetric === 'mi') {
      strokeColor = isActive ? 'rgba(0, 229, 255, 0.7)' : `rgba(0, 229, 255, ${0.1 + absVal * 0.4})`;
    } else {
      const isPositive = rVal >= 0;
      if (isPositive) {
        strokeColor = isActive ? 'rgba(0, 255, 157, 0.8)' : `rgba(0, 255, 157, ${0.1 + absVal * 0.35})`;
      } else {
        strokeColor = isActive ? 'rgba(255, 71, 87, 0.8)' : `rgba(255, 71, 87, ${0.1 + absVal * 0.35})`;
      }
    }

    // Determine marker ID
    let markerId = `arrow-${link.type}`;
    if (isActive && link.type === 'drive') markerId = 'arrow-drive-active';

    svg.innerHTML += `
      <line x1="${fNode.x}" y1="${fNode.y}" x2="${tNode.x}" y2="${tNode.y}" 
            stroke="${strokeColor}" stroke-width="${strokeWidth}"
            marker-end="url(#${markerId})" style="transition: all 0.3s ease;">
        <title>${link.from} - ${link.to}: ${rVal.toFixed(3)}</title>
      </line>
    `;
  });

  // Draw nodes
  Object.keys(nodes).forEach(key => {
    const node = nodes[key];
    const isTarget = key === activeVariable;
    
    // Circle style
    const color = VAR_COLORS[key] || 'var(--text)';
    const r = isTarget ? 24 : 20;
    const strokeWidth = isTarget ? 3 : 1.5;
    const strokeColor = isTarget ? '#ffffff' : 'rgba(255,255,255,0.2)';
    const shadow = isTarget ? `filter="drop-shadow(0 0 8px ${color}cc)"` : '';

    svg.innerHTML += `
      <g transform="translate(${node.x}, ${node.y})" style="cursor:pointer;" onclick="window.setExplainVariable('${key}')">
        <circle r="${r}" fill="#0e1628" stroke="${color}" stroke-width="${strokeWidth}" ${shadow} style="transition: all 0.3s ease;"></circle>
        <text text-anchor="middle" dy=".3em" fill="#ffffff" font-family="var(--font-mono)" font-size="11px" font-weight="700">${node.label}</text>
      </g>
    `;
  });
}

// Bind to window so SVG node click can trigger state change
(window as any).setExplainVariable = (v: string) => {
  activeVariable = v;
  const buttons = document.querySelectorAll('#expl-var-buttons button');
  buttons.forEach(btn => {
    const b = btn as HTMLButtonElement;
    if (b.dataset.var === v) {
      b.classList.add('btn-primary');
    } else {
      b.classList.remove('btn-primary');
    }
  });
  updateDriversList();
  drawDependencyGraph();
};
