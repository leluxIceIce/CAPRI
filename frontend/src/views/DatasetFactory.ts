import { compileDataset, listDatasets, type DatasetManifest } from '../api';

export function buildDatasetFactoryView(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'page-view';
  container.id = 'view-datasetfactory';
  container.style.display = 'none';

  container.innerHTML = `
    <div class="page-header">
      <h1>🏭 Dataset Factory</h1>
    </div>
    
    <div class="card" style="margin-bottom: var(--space-4);">
      <h3>Compile New Dataset</h3>
      <p style="color: var(--text-muted); margin-bottom: var(--space-3); font-size: 0.9em;">
        Upload a spatial CSV with lon/lat and ecological variables.
        The pipeline will reconstruct the continuous field, apply 20×20 non-overlapping tiling,
        and yield a collection of distinct observations.
      </p>
      
      <div style="display: flex; gap: var(--space-3); align-items: center; margin-bottom: var(--space-3);">
        <input type="file" id="df-file-input" accept=".csv" style="display: none;">
        <button id="df-upload-btn" class="btn">Select CSV</button>
        <span id="df-file-name" style="color: var(--text-muted); font-size: 0.9em;">No file selected</span>
      </div>
      
      <div style="display: flex; gap: var(--space-3); align-items: center; margin-bottom: var(--space-3);">
        <label for="df-threshold" style="font-size: 0.9em; color: var(--text-muted);">Completeness Threshold:</label>
        <input type="range" id="df-threshold" min="0.1" max="1.0" step="0.05" value="0.7" style="flex: 1;">
        <span id="df-threshold-val" style="font-family: monospace;">0.70</span>
      </div>
      
      <button id="df-compile-btn" class="btn btn-primary" disabled>Compile Dataset</button>
      
      <div id="df-progress-container" style="display: none; margin-top: var(--space-3);">
        <div style="font-size: 0.85em; color: var(--text-muted); margin-bottom: var(--space-2);">Compiling <span class="loading-dots"></span></div>
        <div class="progress-bar"><div class="progress-fill" style="width: 100%; animation: pulse 1.5s infinite;"></div></div>
      </div>
    </div>
    
    <div class="card" style="flex:1; overflow-y:auto;">
      <h3>Compiled Datasets</h3>
      <select id="df-datasets-dropdown" class="btn" style="width: 100%; margin-top: var(--space-2); background: rgba(0,0,0,0.2); color: var(--text-color); border: 1px solid var(--border-color); padding: 8px;">
        <option value="">Loading datasets...</option>
      </select>
      <div id="df-datasets-details" style="margin-top: var(--space-3); padding: var(--space-3); background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 4px; display: none;">
        <!-- Dataset details will appear here -->
      </div>
    </div>
  </div>`;

  // Wiring
  const fileInput = container.querySelector('#df-file-input') as HTMLInputElement;
  const uploadBtn = container.querySelector('#df-upload-btn') as HTMLButtonElement;
  const fileNameDisplay = container.querySelector('#df-file-name') as HTMLSpanElement;
  const compileBtn = container.querySelector('#df-compile-btn') as HTMLButtonElement;
  const thresholdInput = container.querySelector('#df-threshold') as HTMLInputElement;
  const thresholdVal = container.querySelector('#df-threshold-val') as HTMLSpanElement;
  const progressContainer = container.querySelector('#df-progress-container') as HTMLDivElement;
  const datasetsDropdown = container.querySelector('#df-datasets-dropdown') as HTMLSelectElement;
  const datasetsDetails = container.querySelector('#df-datasets-details') as HTMLDivElement;

  let currentManifests: DatasetManifest[] = [];

  uploadBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files.length > 0) {
      fileNameDisplay.textContent = fileInput.files[0].name;
      compileBtn.disabled = false;
    } else {
      fileNameDisplay.textContent = 'No file selected';
      compileBtn.disabled = true;
    }
  });

  thresholdInput.addEventListener('input', () => {
    thresholdVal.textContent = parseFloat(thresholdInput.value).toFixed(2);
  });

  const renderDatasets = async () => {
    try {
      const manifests = await listDatasets();
      currentManifests = manifests;
      if (manifests.length === 0) {
        datasetsDropdown.innerHTML = `<option value="">No datasets compiled yet.</option>`;
        datasetsDetails.style.display = 'none';
        return;
      }
      
      datasetsDropdown.innerHTML = `<option value="">Select a dataset...</option>` + 
        manifests.map(m => `<option value="${m.dataset_name}">${m.dataset_name} (${m.n_cubes} tiles)</option>`).join('');
      
    } catch (e) {
      datasetsDropdown.innerHTML = `<option value="">Failed to load datasets.</option>`;
    }
  };

  datasetsDropdown.addEventListener('change', () => {
    const selectedName = datasetsDropdown.value;
    const m = currentManifests.find(man => man.dataset_name === selectedName);
    if (!m) {
      datasetsDetails.style.display = 'none';
      return;
    }
    
    datasetsDetails.style.display = 'block';
    datasetsDetails.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
        <strong style="color: var(--variable-aphy);">${m.dataset_name}</strong>
        <span style="font-size: 0.8em; color: var(--text-muted);">${m.n_cubes} tiles</span>
      </div>
      <div style="font-size: 0.85em; color: var(--text-muted); margin-bottom: 4px;">Source: ${m.source_file}</div>
      <div style="font-size: 0.85em; color: var(--text-muted); margin-bottom: 4px;">Vars present: ${m.variables_present.join(', ')}</div>
      ${m.variables_imputed.length > 0 ? `<div style="font-size: 0.85em; color: var(--variable-sst);">Vars imputed: ${m.variables_imputed.join(', ')}</div>` : ''}
      <div style="margin-top: 12px; display:flex; gap: 8px;">
        <button id="btn-load-pool" class="btn btn-sm" style="flex:1; font-size:11px; padding:6px 0;">Load into Active Pool</button>
        <button id="btn-remove-dataset" class="btn btn-sm btn-outline" style="border-color:rgba(255,71,87,0.3); color:rgba(255,71,87,0.85); flex:1; font-size:11px; padding:6px 0;">Remove</button>
      </div>
    `;

    document.getElementById('btn-load-pool')?.addEventListener('click', async () => {
      try {
        const api = await import('../api');
        if (!api.USE_MOCK) {
          const res = await fetch(`${api.API_BASE}/api/dataset/merge`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ datasets: [m.dataset_name] })
          });
          const poolData = await res.json();
          alert(`Successfully loaded dataset into active pool! (Pool contains ${poolData.merged_count} cubes)`);
        } else {
          alert(`Loaded ${m.dataset_name} into Active Pool (Mock Mode).`);
        }
      } catch (e: any) {
        alert(`Failed to load dataset: ${e.message}`);
      }
    });

    document.getElementById('btn-remove-dataset')?.addEventListener('click', async () => {
      if (!confirm(`Are you sure you want to delete dataset "${m.dataset_name}" from disk?`)) return;
      try {
        const api = await import('../api');
        await api.removeDataset(m.dataset_name);
        alert(`Dataset "${m.dataset_name}" deleted.`);
        datasetsDetails.style.display = 'none';
        await renderDatasets();
      } catch (e: any) {
        alert(`Failed to delete dataset: ${e.message}`);
      }
    });
  });

  compileBtn.addEventListener('click', async () => {
    if (!fileInput.files || fileInput.files.length === 0) return;
    
    compileBtn.disabled = true;
    progressContainer.style.display = 'block';
    datasetsDropdown.innerHTML = `<option value="">Loading datasets...</option>`;
    
    try {
      const threshold = parseFloat(thresholdInput.value);
      await compileDataset(fileInput.files[0], threshold);
      fileInput.value = '';
      fileNameDisplay.textContent = 'No file selected';
      await renderDatasets();
    } catch (e: any) {
      alert(`Compilation failed: ${e.message}`);
    } finally {
      compileBtn.disabled = true;
      progressContainer.style.display = 'none';
    }
  });

  // Initial load
  renderDatasets();

  return container;
}
