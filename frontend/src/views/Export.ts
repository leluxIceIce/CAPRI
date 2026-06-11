/**
 * views/Export.ts — Model export view.
 */

export function buildExportView(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'page-view';
  el.id = 'view-export';
  el.innerHTML = `
    <div class="page-header">
      <h1>📦 Export & Deployment</h1>
      <p>Download trained model artifacts for use outside the EPS platform</p>
    </div>
    <div class="page-scroll">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
        <!-- Export bundle -->
        <div class="card">
          <div class="card-label" style="margin-bottom:12px;">Model Bundle</div>
          <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px;">
            Download all artifacts as a complete deployment bundle.
          </p>
          <button class="btn btn-primary" id="btn-export-bundle" style="width:100%; justify-content:center;" disabled>
            📦 Download Bundle (.zip)
          </button>
          <div id="export-status" style="margin-top:12px; font-size:12px; color:var(--text-muted); display:none;"></div>
        </div>

        <!-- Usage example -->
        <div class="card">
          <div class="card-label" style="margin-bottom:12px;">Usage</div>
          <pre style="font-family:var(--font-mono); font-size:11px; color:var(--green); background:var(--bg); padding:12px; border-radius:var(--r-md); overflow-x:auto; line-height:1.6;">
<span style="color:var(--text-muted);"># Load the encoder</span>
<span style="color:var(--cyan);">import</span> torch, json, numpy as np

model = torch.load(<span style="color:var(--orange);">'encoder.pt'</span>)
meta  = json.load(open(<span style="color:var(--orange);">'metadata.json'</span>))
norm  = json.load(open(<span style="color:var(--orange);">'normalization.json'</span>))

<span style="color:var(--text-muted);"># Predict on a new cube</span>
cube = np.load(<span style="color:var(--orange);">'new_cube.npy'</span>)  <span style="color:var(--text-dim);"># (16,16,8)</span>
z = model.predict(cube)   <span style="color:var(--text-dim);"># (128,)</span>
          </pre>
        </div>
      </div>

      <!-- Individual artifacts -->
      <div class="card">
        <div class="card-label" style="margin-bottom:12px;">Individual Artifacts</div>
        <div id="export-items">
          ${[
            ['encoder.pt',          'PyTorch encoder weights',              '🧠', 'Core CubeNet model weights (16×16×8 → R^128)'],
            ['metadata.json',       'Model metadata and config',            '📋', 'Architecture, training params, variable schema'],
            ['normalization.json',  'Normalization parameters',             '📐', 'Per-variable min/max used during training'],
            ['feature_schema.json', 'Variable definitions and ordering',    '📄', 'Canonical variable names, units, ordering'],
          ].map(([name, label, icon, desc]) => `
            <div class="export-item">
              <span class="export-icon">${icon}</span>
              <div class="export-info">
                <div class="export-name">${name}</div>
                <div class="export-desc">${desc}</div>
              </div>
              <button class="btn btn-sm" id="btn-dl-${name.replace(/\./g,'-')}" disabled>Download</button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  return el;
}

export function enableExports() {
  const ids = ['encoder-pt','metadata-json','normalization-json','feature_schema-json'];
  ids.forEach(id => {
    const btn = document.getElementById(`btn-dl-${id}`) as HTMLButtonElement;
    if (btn) btn.disabled = false;
  });
  const bundle = document.getElementById('btn-export-bundle') as HTMLButtonElement;
  if (bundle) bundle.disabled = false;
}

export function initExportHandlers() {
  // Mock download — create a fake file
  document.getElementById('btn-export-bundle')?.addEventListener('click', () => {
    const status = document.getElementById('export-status');
    if (status) {
      status.style.display = 'block';
      status.textContent = '✓ Bundle ready — encoder.pt + all JSON files packaged';
      status.style.color = 'var(--green)';
    }
    // In production: calls /api/export
    const blob = new Blob([JSON.stringify({ 
      bundle: 'eps-cube-encoder-bundle',
      created: new Date().toISOString(),
      files: ['encoder.pt','metadata.json','normalization.json','feature_schema.json'],
      note: 'Connect backend to download actual weights'
    }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'eps-encoder-bundle.json';
    a.click();
  });
}
