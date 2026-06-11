/**
 * main.ts — EPS Ecological Cube Discovery Platform
 *
 * Orchestrates the full application: sidebar navigation,
 * 4-panel homepage, and all full-page views.
 */

import './style.css';
import { CubeRenderer } from './cube3d';
import { buildLeftPanel, updateLeftPanel } from './panels/PanelLeft';
import { buildRightPanel, initRightPanelTabs, showSpectralProfile, showClusterList, showSimilarityScores, refreshCatalog } from './panels/PanelRight';
import { buildBottomPanel, initTrainingChart, updateTrainingProgress, trainingComplete, showUMAPChart, showTransferScores } from './panels/PanelBottom';
import { buildStatisticsView, renderStatisticsView } from './views/Statistics';
import { buildExplainabilityView, renderExplainabilityView } from './views/Explainability';
import { buildSpatialView, renderSpatialView } from './views/Spatial';
import { buildEncoderView, initEncoderLossChart, appendEncoderLoss, showEncoderDiagnostics } from './views/Encoder';
import { buildStateSpaceView, renderStateSpaceView } from './views/StateSpace';
import { buildInterpretationView, renderInterpretationView } from './views/Interpretation';
import { buildTransferView, renderTransferResults } from './views/Transfer';
import { buildExportView, enableExports, initExportHandlers } from './views/Export';
import { buildDatasetFactoryView } from './views/DatasetFactory';
import {
  checkBackend,
  fetchSyntheticCube, uploadCubeCSV,
  fetchStats, fetchSpatial,
  trainEncoder, embedCube,
  fetchDiscovery, assessTransfer,
  resetEncoder, resetDiscovery, resetDataset,
  type CubeData, type StatsData, type SpatialData, type DiscoveryData, type TransferData
} from './api';

// ── App State ──────────────────────────────────────────────────
const state = {
  cube: null as CubeData | null,
  stats: null as StatsData | null,
  spatial: null as SpatialData | null,
  discovery: null as DiscoveryData | null,
  transfer: null as TransferData | null,
  encoderTrained: false,
  currentView: 'home' as string,
};

let cubeRenderer: CubeRenderer | null = null;

// ── Navigation items ────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'home',           icon: '🧊', label: 'Cube Explorer',     section: 'Explore'   },
  { id: 'statistics',     icon: '📊', label: 'Statistics',         section: null        },
  { id: 'explainability', icon: '🔍', label: 'Explainability',     section: null        },
  { id: 'spatial',        icon: '🗺️', label: 'Spatial Layer',      section: null        },
  { id: 'encoder',        icon: '🧠', label: 'Encoder Training',   section: 'Analysis'  },
  { id: 'statespace',     icon: '🌌', label: 'State Space',        section: null        },
  { id: 'interpretation', icon: '📖', label: 'Interpretation',     section: null        },
  { id: 'transfer',       icon: '🔁', label: 'Transferability',    section: 'Science'   },
  { id: 'datasetfactory', icon: '🏭', label: 'Dataset Factory',    section: null        },
  { id: 'export',         icon: '📦', label: 'Export',             section: null        },
];

// ── Build app shell ─────────────────────────────────────────────
function buildApp() {
  const app = document.getElementById('app')!;

  // ── Sidebar ──
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <div class="logo-wordmark">
        <div class="logo-glyph">E</div>
        <div class="logo-text">
          <strong>EPS Platform</strong>
          <span>Ecological Profiling System</span>
        </div>
      </div>
    </div>
    <nav class="sidebar-nav" id="sidebar-nav"></nav>
    <div class="sidebar-footer" style="display:flex; flex-direction:column; gap:8px; width:100%; box-sizing:border-box;">
      <div class="cube-badge">
        <div class="badge-dot" id="ws-status-dot"></div>
        <span id="ws-status-text">Ready</span>
      </div>
      <button class="btn btn-sm btn-outline" id="btn-global-reset" style="width:100%; font-size:11px; justify-content:center; border-color:rgba(255,71,87,0.2); color:rgba(255,71,87,0.75);">
        Global Reset
      </button>
    </div>
  `;
  app.appendChild(sidebar);

  // Build nav items
  const nav = sidebar.querySelector('#sidebar-nav')!;
  let lastSection = '';
  NAV_ITEMS.forEach(item => {
    if (item.section && item.section !== lastSection) {
      lastSection = item.section;
      const label = document.createElement('div');
      label.className = 'nav-section-label';
      label.textContent = item.section;
      nav.appendChild(label);
    }
    const btn = document.createElement('button');
    btn.className = 'nav-item' + (item.id === 'home' ? ' active' : '');
    btn.id = `nav-${item.id}`;
    btn.dataset.view = item.id;
    btn.innerHTML = `<span class="nav-icon">${item.icon}</span>${item.label}`;
    btn.addEventListener('click', () => switchView(item.id));
    nav.appendChild(btn);
  });

  // ── Main area ──
  const mainArea = document.createElement('div');
  mainArea.className = 'main-area';

  // Topbar
  const topbar = document.createElement('header');
  topbar.className = 'topbar';
  topbar.innerHTML = `
    <div class="topbar-title" id="topbar-title">Cube Explorer</div>
    <div class="topbar-meta" id="topbar-meta" style="display:none; align-items:center; gap:var(--s4);">
      <div style="display:flex; align-items:center; gap:var(--s2);">
        <span style="color:var(--text-muted);">Source</span>
        <span style="color:var(--text); font-weight:600;" id="tb-source"></span>
      </div>
      <div style="width:1px; height:16px; background:var(--border);"></div>
      <div style="display:flex; align-items:center; gap:var(--s2);">
        <span style="color:var(--text-muted);">Regime</span>
        <span class="cube-dim-badge" id="tb-regime"></span>
      </div>
    </div>
  `;
  mainArea.appendChild(topbar);

  // View container (holds home + all page views)
  const viewContainer = document.createElement('div');
  viewContainer.style.cssText = 'flex:1; display:flex; flex-direction:column; overflow:hidden; min-height:0;';
  viewContainer.id = 'content-area';
  mainArea.appendChild(viewContainer);

  // ── Home view (4-panel grid) ──
  const homeView = document.createElement('div');
  homeView.id = 'view-home';
  homeView.style.cssText = 'flex:1; display:flex; flex-direction:column; overflow:hidden;';

  const grid = document.createElement('div');
  grid.className = 'content-grid';

  // Left panel
  const leftPanel = buildLeftPanel();
  grid.appendChild(leftPanel);

  // Center panel (3D cube hero)
  const centerPanel = document.createElement('div');
  centerPanel.className = 'panel panel-center';
  centerPanel.innerHTML = `
    <div class="cube-viewport" id="cube-viewport">
      <div id="cube-loading" class="cube-loading">
        <div class="cube-loading-title">EPS Ecological Cube</div>
        <div class="cube-loading-sub">Load a dataset to begin exploration</div>
        <div style="margin-top:20px;">
          <button class="btn btn-primary" id="btn-quick-load" style="padding:10px 24px; font-size:14px;">
            Quick Start: Synthetic Cube
          </button>
        </div>
      </div>
      <div id="pixel-coords" class="pixel-coords"></div>
      <div class="cube-controls-overlay" id="cube-controls" style="display:none;">
        <button class="ctrl-btn" id="ctrl-auto-rotate">Auto-rotate</button>
        <div class="ctrl-sep"></div>
        <button class="ctrl-btn" id="ctrl-reset">Reset</button>
        <div class="ctrl-sep"></div>
        <button class="ctrl-btn" id="ctrl-show-all">All layers</button>
      </div>
    </div>
  `;
  grid.appendChild(centerPanel);

  // Right panel
  const rightPanel = buildRightPanel();
  grid.appendChild(rightPanel);

  // Bottom panel
  const bottomPanel = buildBottomPanel();
  grid.appendChild(bottomPanel);

  homeView.appendChild(grid);
  viewContainer.appendChild(homeView);

  // ── Page views ──
  const statsView = buildStatisticsView();
  const explainabilityView = buildExplainabilityView();
  const spatialView = buildSpatialView();
  const encoderView = buildEncoderView();
  const stateSpaceView = buildStateSpaceView();
  const interpretationView = buildInterpretationView();
  const transferView = buildTransferView();
  const exportView = buildExportView();
  const datasetFactoryView = buildDatasetFactoryView();

  const views = {
    statistics: statsView,
    explainability: explainabilityView,
    spatial: spatialView,
    encoder: encoderView,
    statespace: stateSpaceView,
    interpretation: interpretationView,
    transfer: transferView,
    datasetfactory: datasetFactoryView,
    export: exportView,
  };
  Object.values(views).forEach(v => viewContainer.appendChild(v));

  app.appendChild(mainArea);
}

// ── Switch view ─────────────────────────────────────────────────
function switchView(viewId: string) {
  state.currentView = viewId;

  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  document.getElementById(`nav-${viewId}`)?.classList.add('active');

  // Update topbar
  const item = NAV_ITEMS.find(i => i.id === viewId);
  const titleEl = document.getElementById('topbar-title');
  if (titleEl && item) titleEl.textContent = `${item.icon} ${item.label}`;

  // Show/hide views
  document.getElementById('view-home')!.style.display = viewId === 'home' ? 'flex' : 'none';

  const pageIds = ['statistics','explainability','spatial','encoder','statespace','interpretation','transfer','datasetfactory','export'];
  pageIds.forEach(pid => {
    const el = document.getElementById(`view-${pid}`);
    if (el) el.style.display = pid === viewId ? 'flex' : 'none';
  });

  // Lazy-render views when first opened
  if (viewId === 'statistics' && state.cube && state.stats) {
    renderStatisticsView(state.cube, state.stats);
  }
  if (viewId === 'explainability' && state.cube && state.stats) {
    renderExplainabilityView(state.cube, state.stats);
  }
  if (viewId === 'spatial' && state.cube && state.spatial) {
    renderSpatialView(state.cube, state.spatial);
  }
  if (viewId === 'statespace' && state.discovery) {
    renderStateSpaceView(state.discovery);
  }
  if (viewId === 'interpretation' && state.discovery) {
    renderInterpretationView(state.discovery);
  }
}

// ── Load cube ────────────────────────────────────────────────────
async function loadCube(cubeData: CubeData) {
  state.cube = cubeData;

  // Initialize renderer
  const viewport = document.getElementById('cube-viewport')!;
  const loading  = document.getElementById('cube-loading')!;

  if (!cubeRenderer) {
    cubeRenderer = new CubeRenderer(viewport);
  }
  loading.style.display = 'none';

  const controls = document.getElementById('cube-controls');
  if (controls) controls.style.display = 'flex';

  cubeRenderer.loadCube(cubeData);

  // Update topbar
  const meta = document.getElementById('topbar-meta');
  if (meta) meta.style.display = 'flex';
  setInner('tb-source', cubeData.source);
  setInner('tb-regime', cubeData.regime);

  // Compute and show stats
  const stats = await fetchStats(cubeData);
  state.stats = stats;
  updateLeftPanel(cubeData, stats);

  // Compute spatial
  const spatial = await fetchSpatial(cubeData);
  state.spatial = spatial;

  // Enable training & assess buttons
  const trainBtn = document.getElementById('btn-train-encoder') as HTMLButtonElement;
  if (trainBtn) trainBtn.disabled = false;
  const trainFull = document.getElementById('btn-train-full') as HTMLButtonElement;
  if (trainFull) trainFull.disabled = false;
  const assessCurrent = document.getElementById('btn-assess-current') as HTMLButtonElement;
  if (assessCurrent) assessCurrent.disabled = false;
  const assessTransfer = document.getElementById('btn-assess-transfer') as HTMLButtonElement;
  if (assessTransfer) assessTransfer.disabled = false;
  const assessTransferFull = document.getElementById('btn-assess-transfer-full') as HTMLButtonElement;
  if (assessTransferFull) assessTransferFull.disabled = false;

  // If already on stats/explainability view, render immediately
  if (state.currentView === 'statistics') renderStatisticsView(cubeData, stats);
  if (state.currentView === 'explainability') renderExplainabilityView(cubeData, stats);
  if (state.currentView === 'spatial') renderSpatialView(cubeData, spatial);
}

// ── Train encoder ────────────────────────────────────────────────
async function runTraining() {
  if (!state.cube) return;

  const pill = document.getElementById('train-pill');
  if (pill) { pill.className = 'pill pill-running'; pill.textContent = 'Training…'; }

  const cubes = Array.from({ length: 20 }, () => state.cube!.cube);
  const epochsInput = document.getElementById('enc-epochs') as HTMLInputElement;
  const epochsInputBottom = document.getElementById('enc-epochs-bottom') as HTMLInputElement;
  let epochs = 10;
  if (epochsInputBottom && epochsInputBottom.value) epochs = parseInt(epochsInputBottom.value, 10);
  if (epochsInput && epochsInput.value && state.currentView === 'encoder') epochs = parseInt(epochsInput.value, 10);

  await trainEncoder(cubes, epochs, (event) => {
    updateTrainingProgress(event, epochs);
    appendEncoderLoss(event.epoch, event.loss, event.pos_sim, event.neg_sim);
  }).then(() => {
    state.encoderTrained = true;
    trainingComplete();
    const pill = document.getElementById('train-pill');
    if (pill) { pill.className = 'pill pill-ready'; pill.textContent = 'Encoder Trained'; }
    refreshCatalog();
  });

  // Embed current cube
  const embed = await embedCube(state.cube);
  showEncoderDiagnostics(embed.z);

  // Run discovery
  const discovery = await fetchDiscovery();
  state.discovery = discovery;
  showUMAPChart(discovery);
  showClusterList(discovery);

  // Enable state space / interpretation views
  const discBtn = document.getElementById('btn-discover') as HTMLButtonElement;
  if (discBtn) discBtn.disabled = false;

  // Render interpretation if already there
  if (state.currentView === 'statespace') renderStateSpaceView(discovery);
  if (state.currentView === 'interpretation') renderInterpretationView(discovery);

  // Enable exports
  enableExports();
}

// ── Transfer assessment ──────────────────────────────────────────
async function runTransfer() {
  if (!state.cube) return;
  const select = document.getElementById('transfer-model-select') as HTMLSelectElement;
  const modelName = select ? select.value : 'cubenet_v1';
  const data = await assessTransfer(state.cube, modelName);
  state.transfer = data;
  showSimilarityScores(data.similarity_score, data.novelty_score, data.nearest_regime, data.confidence);
  showTransferScores(data.similarity_score, data.novelty_score, data.confidence);
  renderTransferResults(data);
}

// ── Wire up events ───────────────────────────────────────────────
function wireEvents() {
  // Right panel tabs
  initRightPanelTabs();

  // Encoder loss chart
  initTrainingChart();
  initEncoderLossChart();

  // Export handlers
  initExportHandlers();

  // Quick load from center panel
  document.getElementById('btn-quick-load')?.addEventListener('click', async () => {
    const cube = await fetchSyntheticCube();
    await loadCube(cube);
  });

  // Load synthetic from left panel
  document.getElementById('btn-load-synthetic')?.addEventListener('click', async () => {
    const cube = await fetchSyntheticCube();
    await loadCube(cube);
  });

  // File upload from left panel
  const fileInput = document.getElementById('cube-file-input') as HTMLInputElement;
  const dropZone  = document.getElementById('upload-drop-zone');

  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => {
      (e as DragEvent).preventDefault();
      dropZone.classList.add('drag-over');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', async (e) => {
      (e as DragEvent).preventDefault();
      dropZone.classList.remove('drag-over');
      const file = (e as DragEvent).dataTransfer?.files[0];
      if (file) {
        try {
          dropZone.classList.add('uploading');
          const sub = dropZone.querySelector('.upload-sub') as HTMLElement;
          if (sub) sub.textContent = `Processing ${file.name}…`;
          const cube = await uploadCubeCSV(file);
          await loadCube(cube);
        } catch (err: any) {
          console.error('CSV upload error:', err);
          const sub = dropZone.querySelector('.upload-sub') as HTMLElement;
          if (sub) {
            sub.textContent = `❌ ${err.message || 'Upload failed'}`;
            sub.style.color = '#ff4757';
            setTimeout(() => {
              sub.textContent = 'or click to browse · any CSV with lon/lat';
              sub.style.color = '';
            }, 5000);
          }
        } finally {
          dropZone.classList.remove('uploading');
        }
      }
    });
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files?.[0];
      if (file) {
        try {
          const sub = dropZone.querySelector('.upload-sub') as HTMLElement;
          if (sub) sub.textContent = `Processing ${file.name}…`;
          const cube = await uploadCubeCSV(file);
          await loadCube(cube);
        } catch (err: any) {
          console.error('CSV upload error:', err);
          const sub = dropZone.querySelector('.upload-sub') as HTMLElement;
          if (sub) {
            sub.textContent = `❌ ${err.message || 'Upload failed'}`;
            sub.style.color = '#ff4757';
            setTimeout(() => {
              sub.textContent = 'or click to browse · any CSV with lon/lat';
              sub.style.color = '';
            }, 5000);
          }
        }
      }
      fileInput.value = '';  // reset so same file can be re-uploaded
    });
  }

  // Layer controls
  document.addEventListener('layer-opacity', (e: Event) => {
    const { idx, val } = (e as CustomEvent).detail;
    cubeRenderer?.setLayerOpacity(idx, val);
  });
  document.addEventListener('layer-toggle', (e: Event) => {
    const { idx, visible } = (e as CustomEvent).detail;
    cubeRenderer?.setLayerVisible(idx, visible);
  });

  // 3D cube controls
  let autoRotate = true;
  document.getElementById('ctrl-auto-rotate')?.addEventListener('click', (e) => {
    autoRotate = !autoRotate;
    cubeRenderer?.setAutoRotate(autoRotate);
    (e.target as HTMLButtonElement).style.color = autoRotate ? 'var(--cyan)' : 'var(--text-muted)';
  });
  document.getElementById('ctrl-reset')?.addEventListener('click', () => cubeRenderer?.resetCamera());
  document.getElementById('ctrl-show-all')?.addEventListener('click', () => cubeRenderer?.showAllLayers());

  // Pixel click → spectral explorer
  document.addEventListener('pixel-selected', (e: Event) => {
    const { x, y, values } = (e as CustomEvent).detail;
    if (state.cube) showSpectralProfile(x, y, values, state.cube.variables);
  });

  // Train encoder buttons (both bottom panel and full encoder view)
  ['btn-train-encoder', 'btn-train-full'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', async () => {
      if (!state.encoderTrained) await runTraining();
    });
  });

  // Transferability
  ['btn-assess-transfer', 'btn-assess-current', 'btn-assess-transfer-full'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', runTransfer);
  });

  // Transfer file drop zone
  const transferInput = document.getElementById('transfer-file-input') as HTMLInputElement;
  const transferDrop  = document.getElementById('transfer-drop-zone');
  if (transferDrop && transferInput) {
    transferDrop.addEventListener('click', () => transferInput.click());
    transferInput.addEventListener('change', async () => {
      const file = transferInput.files?.[0];
      if (file) {
        try {
          await uploadCubeCSV(file);
          await runTransfer();
        } catch (err) {
          console.error(err);
        }
      }
    });
    const assessBtn = document.getElementById('btn-assess-transfer-full') as HTMLButtonElement;
    if (assessBtn) assessBtn.disabled = false;
  }

  // Reset buttons
  document.getElementById('btn-global-reset')?.addEventListener('click', handleGlobalReset);
  document.getElementById('btn-reset-encoder')?.addEventListener('click', async () => {
    await resetEncoder();
    state.encoderTrained = false;
    const pill = document.getElementById('train-pill');
    if (pill) { pill.className = 'pill'; pill.textContent = 'Untrained'; }
    const diagnostics = document.getElementById('enc-diagnostics');
    if (diagnostics) diagnostics.innerHTML = 'Train the encoder to see embedding diagnostics';
    const bottomLossChart = document.getElementById('enc-loss-chart');
    if (bottomLossChart && (window as any).Plotly) (window as any).Plotly.purge(bottomLossChart);
    initEncoderLossChart();
    refreshCatalog();
  });
  document.getElementById('btn-reset-statespace')?.addEventListener('click', async () => {
    await resetDiscovery();
    state.discovery = null;
    const umap2d = document.getElementById('umap-2d-full');
    const umap3d = document.getElementById('umap-3d-full');
    const density = document.getElementById('density-map');
    const Plotly = (window as any).Plotly;
    if (Plotly) {
      if (umap2d) Plotly.purge(umap2d);
      if (umap3d) Plotly.purge(umap3d);
      if (density) Plotly.purge(density);
    }
    const debugCard = document.getElementById('umap-debug-card');
    if (debugCard) debugCard.style.display = 'none';
    const placeholder = document.getElementById('statespace-placeholder');
    if (placeholder) placeholder.style.display = 'block';
  });
}

async function handleGlobalReset() {
  // Reset backend pools
  await resetDataset();
  await resetEncoder();
  await resetDiscovery();
  
  // Clear frontend states
  state.cube = null;
  state.stats = null;
  state.spatial = null;
  state.discovery = null;
  state.transfer = null;
  state.encoderTrained = false;
  
  // Update UI Elements
  const bottomLossChart = document.getElementById('enc-loss-chart');
  const miniLossChart = document.getElementById('train-loss-chart');
  const umap2d = document.getElementById('umap-2d-full');
  const umap3d = document.getElementById('umap-3d-full');
  const density = document.getElementById('density-map');
  const debugCard = document.getElementById('umap-debug-card');
  const placeholder = document.getElementById('statespace-placeholder');

  const Plotly = (window as any).Plotly;
  if (Plotly) {
    if (bottomLossChart) Plotly.purge(bottomLossChart);
    if (miniLossChart) Plotly.purge(miniLossChart);
    if (umap2d) Plotly.purge(umap2d);
    if (umap3d) Plotly.purge(umap3d);
    if (density) Plotly.purge(density);
  }

  // Restore placeholders
  if (debugCard) debugCard.style.display = 'none';
  if (placeholder) placeholder.style.display = 'block';
  
  const statsPlaceholder = document.getElementById('stats-placeholder');
  const statsContent = document.getElementById('stats-content');
  if (statsPlaceholder) statsPlaceholder.style.display = 'block';
  if (statsContent) statsContent.style.display = 'none';

  const explPlaceholder = document.getElementById('expl-placeholder');
  const explContent = document.getElementById('expl-content');
  if (explPlaceholder) explPlaceholder.style.display = 'block';
  if (explContent) explContent.style.display = 'none';

  const spatialPlaceholder = document.getElementById('spatial-placeholder');
  const spatialContent = document.getElementById('spatial-content');
  if (spatialPlaceholder) spatialPlaceholder.style.display = 'block';
  if (spatialContent) spatialContent.style.display = 'none';

  const interpPlaceholder = document.getElementById('interp-placeholder');
  const interpContent = document.getElementById('interp-content');
  if (interpPlaceholder) interpPlaceholder.style.display = 'block';
  if (interpContent) interpContent.style.display = 'none';

  const diagnostics = document.getElementById('enc-diagnostics');
  if (diagnostics) diagnostics.innerHTML = 'Train the encoder to see embedding diagnostics';

  const pill = document.getElementById('train-pill');
  if (pill) { pill.className = 'pill'; pill.textContent = 'Untrained'; }

  refreshCatalog();

  // Re-disable discovery button and others
  const discBtn = document.getElementById('btn-discover') as HTMLButtonElement;
  if (discBtn) discBtn.disabled = true;

  // Clear 3D Cube Viewer
  if (cubeRenderer) {
    cubeRenderer.loadCube({
      cube: Array.from({length:20}, () => Array.from({length:20}, () => Array.from({length:8}, () => 0.0))),
      variables: ['CHL', 'TSM', 'APHY', 'ADG', 'BBP', 'PAR', 'KD490', 'SST'],
      shape: [20, 20, 8],
      source: 'None',
      regime: 'None',
      completeness: 0.0
    });
  }

  // Update topbar meta
  const meta = document.getElementById('topbar-meta');
  if (meta) meta.style.display = 'none';

  // Navigate to home
  switchView('home');
}

function setInner(id: string, val: string) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

// ── Startup ──────────────────────────────────────────────────────
async function main() {
  buildApp();
  wireEvents();

  // Check backend
  const online = await checkBackend();
  const badge = document.getElementById('backend-badge');
  if (badge) badge.textContent = online ? '● Backend online' : '○ Mock mode';

  // Default to home view
  switchView('home');
}

main().catch(console.error);
