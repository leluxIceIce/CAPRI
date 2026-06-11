/**
 * api.ts — Backend API wrapper with synthetic mock fallback.
 * Talks to the FastAPI backend on :8000; falls back to mock data
 * so the UI is always runnable without the Python server.
 */

export const API_BASE = 'http://localhost:8000';
export let USE_MOCK = true; // auto-detected at startup

export interface DatasetManifest {
  dataset_name: string;
  source_file: string;
  n_cubes: number;
  tile_shape: number[];
  variables_present: string[];
  variables_imputed: string[];
  resolution: number | string;
  completeness_threshold: number;
  tiles: {
    id: number;
    file: string;
    regime: string;
    completeness: number;
    lon_bounds: [number, number];
    lat_bounds: [number, number];
    field_position: [number, number];
  }[];
}

export interface CubeData {
  cube: number[][][];      // [20][20][8]
  variables: string[];     // ['CHL','TSM','APHY','ADG','BBP','PAR','KD490','SST']
  shape: [number, number, number];
  source: string;
  regime: string;
  completeness: number;
  coordinate_bounds?: { lat_min: number; lat_max: number; lon_min: number; lon_max: number };
}

export interface StatsData {
  correlation_matrix: number[][];
  covariance_matrix: number[][];
  variable_means: number[];
  variable_stds: number[];
  variable_mins: number[];
  variable_maxs: number[];
  distributions: { [key: string]: number[] };
}

export interface SpatialData {
  gradient_magnitude: number[][];
  local_variance: number[][];
  texture: number[][];
}

export interface TrainEvent {
  epoch: number; loss: number; elapsed: number;
}

export interface EmbedData {
  z: number[];  // latent vector R^128
  norm: number;
}

export interface DiscoveryData {
  umap_2d: number[][];        // [N, 2]
  umap_3d: number[][];        // [N, 3]
  hdbscan_labels: number[];   // [N]
  cluster_names: string[];
  cluster_sizes: number[];
  cluster_colors: string[];
  n_noise: number;
}

export interface TransferData {
  similarity_score: number;
  novelty_score: number;
  nearest_regime: string;
  confidence: number;
  top_k_neighbors: Array<{ idx: number; distance: number; regime: string }>;
}

// ── Connectivity check ──────────────────────────────────────────
export async function checkBackend(): Promise<boolean> {
  try {
    const r = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(1500) });
    if (r.ok) { USE_MOCK = false; return true; }
  } catch { /* offline */ }
  USE_MOCK = true;
  return false;
}

// ── API: Dataset Factory ──────────────────────────────────────────────────────

export async function compileDataset(file: File, completenessThreshold = 0.70): Promise<DatasetManifest> {
  if (USE_MOCK) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          dataset_name: "mock_dataset_001",
          source_file: file.name,
          n_cubes: 24,
          tile_shape: [20, 20, 8],
          variables_present: ["CHL", "TSM", "APHY", "ADG", "BBP", "PAR", "KD490", "SST"],
          variables_imputed: [],
          resolution: 0.01,
          completeness_threshold: completenessThreshold,
          tiles: Array.from({ length: 24 }, (_, i) => ({
            id: i,
            file: `cube_${i.toString().padStart(4, '0')}.npy`,
            regime: ["productive_coastal", "shelf_sea", "open_ocean"][i % 3],
            completeness: 0.85 + Math.random() * 0.15,
            lon_bounds: [3.0 + (i % 6) * 0.20, 3.20 + (i % 6) * 0.20],
            lat_bounds: [53.0 + Math.floor(i / 6) * 0.20, 53.20 + Math.floor(i / 6) * 0.20],
            field_position: [Math.floor(i / 6) * 20, (i % 6) * 20]
          }))
        });
      }, 1500);
    });
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('completeness_threshold', completenessThreshold.toString());

  const res = await fetch(`${API_BASE}/api/dataset/compile`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Failed to compile dataset');
  }
  return res.json();
}

export async function listDatasets(): Promise<DatasetManifest[]> {
  if (USE_MOCK) {
    return [
      {
        dataset_name: "north_sea_2023",
        source_file: "NS_2023_summer.csv",
        n_cubes: 42,
        tile_shape: [20, 20, 8],
        variables_present: ["CHL", "TSM", "APHY", "ADG", "BBP", "PAR", "KD490", "SST"],
        variables_imputed: [],
        resolution: 0.01,
        completeness_threshold: 0.70,
        tiles: []
      }
    ];
  }

  const res = await fetch(`${API_BASE}/api/dataset/list`);
  if (!res.ok) throw new Error('Failed to list datasets');
  const data = await res.json();
  return data.datasets || [];
}

// ── API: Cube Construction ───────────────────────────────────────────────────
export async function fetchSyntheticCube(): Promise<CubeData> {
  if (!USE_MOCK) {
    const r = await fetch(`${API_BASE}/api/cube/synthetic`);
    return r.json();
  }
  return generateMockCube('synthetic');
}

export async function uploadCubeCSV(file: File): Promise<CubeData> {
  if (!USE_MOCK) {
    const fd = new FormData();
    fd.append('file', file);
    const r = await fetch(`${API_BASE}/api/cube`, { method: 'POST', body: fd });
    return r.json();
  }
  return generateMockCube(file.name);
}

// ── Stats ───────────────────────────────────────────────────────
export async function fetchStats(cube: CubeData): Promise<StatsData> {
  if (!USE_MOCK) {
    const r = await fetch(`${API_BASE}/api/stats`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cube: cube.cube })
    });
    return r.json();
  }
  return generateMockStats(cube);
}

// ── Spatial ─────────────────────────────────────────────────────
export async function fetchSpatial(cube: CubeData): Promise<SpatialData> {
  if (!USE_MOCK) {
    const r = await fetch(`${API_BASE}/api/spatial`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cube: cube.cube })
    });
    return r.json();
  }
  return generateMockSpatial(cube);
}

// ── Encoder ─────────────────────────────────────────────────────
export async function trainEncoder(
  datasets: string[],
  onProgress: (e: TrainEvent) => void
): Promise<any> {
  if (!USE_MOCK) {
    const r = await fetch(`${API_BASE}/api/encoder/train`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ datasets, epochs: 10, batch_size: 8 })
    });
    return r.json();
  }
  // Simulate training with delays
  for (let epoch = 1; epoch <= 10; epoch++) {
    await new Promise(res => setTimeout(res, 180 + Math.random() * 120));
    const loss = 0.82 * Math.pow(0.88, epoch) + 0.02 * Math.random();
    onProgress({ epoch, loss: parseFloat(loss.toFixed(4)), elapsed: epoch * 0.3 });
  }
  return Array.from({ length: 42 }, () => ({
    z: Array.from({ length: 128 }, () => (Math.random() - 0.5) * 2),
    norm: 1 + Math.random()
  }));
}

export async function embedCube(cube: CubeData): Promise<EmbedData> {
  if (!USE_MOCK) {
    const r = await fetch(`${API_BASE}/api/encoder/embed`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cube: cube.cube })
    });
    return r.json();
  }
  return { z: Array.from({ length: 128 }, () => (Math.random() - 0.5) * 2), norm: 1.24 };
}

// ── Discovery ───────────────────────────────────────────────────
export async function fetchDiscovery(): Promise<DiscoveryData> {
  if (!USE_MOCK) {
    const r = await fetch(`${API_BASE}/api/discovery/fit`);
    return r.json();
  }
  return generateMockDiscovery();
}

// ── Transfer ────────────────────────────────────────────────────
export async function assessTransfer(cube: CubeData): Promise<TransferData> {
  if (!USE_MOCK) {
    const r = await fetch(`${API_BASE}/api/transfer`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cube: cube.cube })
    });
    return r.json();
  }
  return {
    similarity_score: 0.78 + Math.random() * 0.18,
    novelty_score: 0.12 + Math.random() * 0.2,
    nearest_regime: ['Productive Coastal', 'Shelf Sea', 'Open Ocean', 'Deep Sea'][Math.floor(Math.random() * 4)],
    confidence: 0.82 + Math.random() * 0.15,
    top_k_neighbors: [
      { idx: 3, distance: 0.12, regime: 'Productive Coastal' },
      { idx: 7, distance: 0.18, regime: 'Shelf Sea' },
      { idx: 12, distance: 0.24, regime: 'Productive Coastal' },
    ]
  };
}

// ── Mock Generators ─────────────────────────────────────────────

function gaussian(cx: number, cy: number, sx: number, sy: number, H: number, W: number): number[][] {
  return Array.from({ length: H }, (_, r) =>
    Array.from({ length: W }, (_, c) => {
      const dx = (c / W - cx) / sx;
      const dy = (r / H - cy) / sy;
      return Math.exp(-(dx * dx + dy * dy));
    })
  );
}

function sigmoid2d(H: number, W: number, angle = 0): number[][] {
  return Array.from({ length: H }, (_, r) =>
    Array.from({ length: W }, (_, c) => {
      const v = (c * Math.cos(angle) + r * Math.sin(angle)) / W;
      return 1 / (1 + Math.exp(-8 * (v - 0.5)));
    })
  );
}

function normalize2d(arr: number[][]): number[][] {
  let mn = Infinity, mx = -Infinity;
  arr.forEach(row => row.forEach(v => { mn = Math.min(mn, v); mx = Math.max(mx, v); }));
  const rng = mx - mn || 1;
  return arr.map(row => row.map(v => (v - mn) / rng));
}

function addNoise2d(arr: number[][], std = 0.04): number[][] {
  return arr.map(row => row.map(v => Math.max(0, Math.min(1, v + (Math.random() - 0.5) * std * 2))));
}

export function generateMockCube(source = 'synthetic'): CubeData {
  const H = 20, W = 20, V = 8;
  const plume  = gaussian(0.4, 0.3, 0.3, 0.25, H, W);
  const front  = sigmoid2d(H, W, Math.PI / 6);
  const patchy = Array.from({ length: H }, (_, r) =>
    Array.from({ length: W }, (_, c) => 0.5 + 0.4 * Math.sin(r / 2.5) * Math.cos(c / 2.5))
  );

  const rawLayers = [
    normalize2d(plume.map((row, r) => row.map((v, c) => v * 0.6 + patchy[r][c] * 0.3))),   // CHL
    normalize2d(front.map((row, r) => row.map((v, c) => v * 0.5 + patchy[r][c] * 0.3))),   // TSM
    normalize2d(plume.map((row, r) => row.map((v, c) => v * 0.55 + front[r][c] * 0.25))),  // APHY
    normalize2d(front.map((row, r) => row.map((v, c) => v * 0.7 + patchy[r][c] * 0.1))),   // ADG
    normalize2d(plume.map((row, r) => row.map((v, c) => v * 0.45 + front[r][c] * 0.4))),   // BBP
    normalize2d(Array.from({ length: H }, (_, r) =>                                          // PAR
      Array.from({ length: W }, (_, c) => 0.3 + 0.5 * (r / H) + 0.1 * (c / W)))),
    normalize2d(plume.map((row, r) => row.map((v, c) => v * 0.5 + front[r][c] * 0.4))),    // KD490
    normalize2d(Array.from({ length: H }, (_, r) =>                                          // SST
      Array.from({ length: W }, (_, c) => 0.25 + 0.5 * (1 - r / H) + patchy[r][c] * 0.2))),
  ];

  const cube: number[][][] = Array.from({ length: H }, (_, r) =>
    Array.from({ length: W }, (_, c) =>
      rawLayers.map(layer => parseFloat(addNoise2d([layer[r]])[0][c].toFixed(4)))
    )
  );

  return {
    cube,
    variables: ['CHL', 'TSM', 'APHY', 'ADG', 'BBP', 'PAR', 'KD490', 'SST'],
    shape: [H, W, V],
    source,
    regime: 'Productive Coastal',
    completeness: 0.96 + Math.random() * 0.04,
    coordinate_bounds: { lat_min: 54.2, lat_max: 55.8, lon_min: 3.4, lon_max: 5.6 }
  };
}

function generateMockStats(cube: CubeData): StatsData {
  const V = 8;
  const data = cube.variables.map((_, vi) =>
    cube.cube.flatMap(row => row.map(cell => cell[vi]))
  );
  const means = data.map(d => d.reduce((a, b) => a + b) / d.length);
  const stds  = data.map((d, i) => Math.sqrt(d.reduce((a, b) => a + (b - means[i]) ** 2, 0) / d.length));

  const corr = Array.from({ length: V }, (_, i) =>
    Array.from({ length: V }, (_, j) => {
      if (i === j) return 1.0;
      const r = 0.4 + 0.55 * Math.random() * (Math.random() > 0.5 ? 1 : -1);
      return parseFloat(Math.max(-1, Math.min(1, r)).toFixed(3));
    })
  );
  corr.forEach((row, i) => row.forEach((_, j) => { if (i !== j) corr[j][i] = corr[i][j]; }));

  return {
    correlation_matrix: corr,
    covariance_matrix: corr.map((row, i) => row.map((v, j) => parseFloat((v * stds[i] * stds[j]).toFixed(4)))),
    variable_means: means.map(v => parseFloat(v.toFixed(4))),
    variable_stds:  stds.map(v => parseFloat(v.toFixed(4))),
    variable_mins:  data.map(d => parseFloat(Math.min(...d).toFixed(4))),
    variable_maxs:  data.map(d => parseFloat(Math.max(...d).toFixed(4))),
    distributions:  Object.fromEntries(cube.variables.map((v, vi) => [v, data[vi].slice(0, 50)]))
  };
}

function generateMockSpatial(cube: CubeData): SpatialData {
  const H = 20, W = 20;
  const make = () => Array.from({ length: H }, () =>
    Array.from({ length: W }, () => parseFloat((Math.random()).toFixed(4)))
  );
  return { gradient_magnitude: make(), local_variance: make(), texture: make() };
}

function generateMockDiscovery(): DiscoveryData {
  const N = 40;
  const COLORS = ['#00ff9d', '#00e5ff', '#a855f7', '#ff7c29', '#ff4757'];
  const NAMES  = ['Productive Coastal', 'Shelf Sea', 'Open Ocean', 'Deep Sea', 'Transition Zone'];
  const labels: number[] = [];
  const umap2d: number[][] = [];
  const umap3d: number[][] = [];
  const centers = [[-3, 2], [3, 3], [-2, -3], [4, -2], [0, 0]];

  for (let i = 0; i < N; i++) {
    const cl = Math.floor(Math.random() * 4);
    labels.push(cl);
    const cx = centers[cl][0], cy = centers[cl][1];
    umap2d.push([cx + (Math.random() - 0.5) * 2, cy + (Math.random() - 0.5) * 2]);
    umap3d.push([cx + (Math.random() - 0.5) * 2, cy + (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 3]);
  }

  const sizes = NAMES.slice(0, 4).map((_, k) => labels.filter(l => l === k).length);

  return { umap_2d: umap2d, umap_3d: umap3d, hdbscan_labels: labels, cluster_names: NAMES.slice(0, 4), cluster_sizes: sizes, cluster_colors: COLORS.slice(0, 4), n_noise: 0 };
}
