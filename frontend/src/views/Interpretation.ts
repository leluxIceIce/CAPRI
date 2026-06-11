/**
 * views/Interpretation.ts — Ecological state interpretation view.
 */

import type { DiscoveryData } from '../api';

const STATE_DESCRIPTIONS: Record<string, { desc: string; chl: string; sst: string; tsm: string; season: string }> = {
  'Productive Coastal': {
    desc: 'High-biomass coastal environment driven by nutrient upwelling. Dense phytoplankton blooms with strong chlorophyll signal. Typically found in shelf waters with terrestrial nutrient input.',
    chl: 'High (0.65–0.85)', sst: 'Cool (12–16°C)', tsm: 'Elevated', season: 'Spring–Summer',
  },
  'Shelf Sea': {
    desc: 'Intermediate productivity shelf water with moderate mixing depth. Seasonal thermocline development supports stratified bloom dynamics. Transition zone between coastal and open ocean conditions.',
    chl: 'Moderate (0.35–0.55)', sst: 'Moderate (16–20°C)', tsm: 'Moderate', season: 'Spring',
  },
  'Open Ocean': {
    desc: 'Oligotrophic gyre waters with low nutrient concentrations limiting primary production. Stable stratification prevents deep mixing. Low chlorophyll, high optical transparency.',
    chl: 'Low (0.05–0.2)', sst: 'Warm (22–28°C)', tsm: 'Very low', season: 'Year-round',
  },
  'Deep Sea': {
    desc: 'Deep, clear pelagic water with minimal biological activity. Characteristic of the deep gyres and abyssal plain margins. Near-null chlorophyll with high optical depth.',
    chl: 'Trace (<0.05)', sst: 'Variable', tsm: 'Minimal', season: 'Year-round',
  },
  'Transition Zone': {
    desc: 'Dynamic frontal region between distinct water masses. Characterized by sharp gradients in temperature, salinity, and biology. Often sites of enhanced biological activity.',
    chl: 'Variable', sst: 'Gradient zone', tsm: 'Variable', season: 'All seasons',
  },
};

const VAR_COLORS = ['#00ff9d','#ffd700','#00e5ff','#ff7c29','#a855f7','#ffec3d','#4dabf7','#ff4757'];

export function buildInterpretationView(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'page-view';
  el.id = 'view-interpretation';
  el.innerHTML = `
    <div class="page-header">
      <h1>📖 Ecological Interpretation</h1>
      <p>Discovered states translated into ecosystem descriptions</p>
    </div>
    <div class="page-scroll">
      <div id="interp-placeholder" style="text-align:center; padding:60px; color:var(--text-muted);">
        <div style="font-size:48px; margin-bottom:16px;">📖</div>
        <p>Discover ecological states to see interpretations</p>
      </div>
      <div id="interp-content" style="display:none;">
        <div id="state-cards-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:16px;"></div>
      </div>
    </div>
  `;
  return el;
}

export function renderInterpretationView(discovery: DiscoveryData) {
  document.getElementById('interp-placeholder')!.style.display = 'none';
  const content = document.getElementById('interp-content');
  if (!content) return;
  content.style.display = 'block';

  const grid = document.getElementById('state-cards-grid');
  if (!grid) return;

  grid.innerHTML = discovery.cluster_names.map((name, ci) => {
    const info = STATE_DESCRIPTIONS[name] || {
      desc: 'An ecological regime discovered in the embedding space.',
      chl: '—', sst: '—', tsm: '—', season: '—',
    };
    const pct = ((discovery.cluster_sizes[ci] / discovery.hdbscan_labels.length) * 100).toFixed(1);
    return `
      <div class="state-card">
        <div class="state-card-header">
          <div class="state-dot" style="background:${discovery.cluster_colors[ci]};
               box-shadow:0 0 8px ${discovery.cluster_colors[ci]}80;"></div>
          <div class="state-name">${name}</div>
          <div class="state-count">${pct}% of obs</div>
        </div>
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px; line-height:1.6;">${info.desc}</p>
        <div class="state-metrics">
          <div class="state-metric">
            <span class="state-metric-key">CHL</span>
            <span class="state-metric-val" style="color:#00ff9d;">${info.chl}</span>
          </div>
          <div class="state-metric">
            <span class="state-metric-key">SST</span>
            <span class="state-metric-val" style="color:#ff4757;">${info.sst}</span>
          </div>
          <div class="state-metric">
            <span class="state-metric-key">TSM</span>
            <span class="state-metric-val" style="color:#ffd700;">${info.tsm}</span>
          </div>
          <div class="state-metric">
            <span class="state-metric-key">Season</span>
            <span class="state-metric-val">${info.season}</span>
          </div>
          <div class="state-metric">
            <span class="state-metric-key">N</span>
            <span class="state-metric-val">${discovery.cluster_sizes[ci]} observations</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}
