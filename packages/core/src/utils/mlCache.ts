// Session-scoped persistence for the ML panels' computed results (UMAP
// embedding, RF training). UMAP/RF runs are expensive and were previously held
// only in each panel's local React state — so closing+reopening the ML modal,
// or reloading the app after a viewport freeze, discarded them ("they didn't
// save in the session"). Caching to sessionStorage lets a completed result
// survive a remount, a modal close/reopen, and a full page reload within the
// same app session.
//
// The cache is guarded by gridSize: a result computed against one grid must not
// be shown against a cube of a different resolution (the point→cell mapping
// would no longer line up), so a size mismatch is treated as a cache miss.

interface CacheEnvelope<T> {
  gridSize: number;
  result: T;
}

export function loadCached<T>(key: string, gridSize: number): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const env = JSON.parse(raw) as CacheEnvelope<T>;
    if (!env || env.gridSize !== gridSize) return null;
    return env.result;
  } catch {
    // Malformed JSON, storage disabled (private mode), or quota error — treat as
    // no cache rather than crashing the panel.
    return null;
  }
}

export function saveCached<T>(key: string, gridSize: number, result: T): void {
  try {
    sessionStorage.setItem(key, JSON.stringify({ gridSize, result } as CacheEnvelope<T>));
  } catch {
    // Storage unavailable or over quota — persistence is best-effort, so a failure
    // here must never break the run that just succeeded.
  }
}
