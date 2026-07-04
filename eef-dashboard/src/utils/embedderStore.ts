// Persistence for the Embedders tab. Prefers the Tauri Store plugin — a real
// JSON file in the macOS app-data dir, so embedders + their training data
// survive app restarts and reinstalls-in-place. When not running under Tauri
// (the web/GitHub-Pages build or the dev preview), it transparently falls back
// to localStorage so the feature still works for inspection.

import { EmbedderRegistry, EMPTY_REGISTRY } from "@capri/core/embedders/embedderTypes";

const STORE_FILE = "embedders.json";
const REGISTRY_KEY = "registry";
const LS_KEY = "eef.embedders.v1";

/** True when running inside the Tauri (desktop) shell. */
export function isTauri(): boolean {
  return typeof window !== "undefined" &&
    ("__TAURI_INTERNALS__" in window || "__TAURI__" in window);
}

// The store handle is created lazily and reused. Typed loosely to avoid a hard
// dependency on the plugin's types in the non-Tauri build path.
let storePromise: Promise<{ get: <T>(k: string) => Promise<T | undefined | null>; set: (k: string, v: unknown) => Promise<void>; save: () => Promise<void> }> | null = null;

async function getStore() {
  if (!storePromise) {
    // Dynamic import so the web build never executes Tauri-only code at load.
    storePromise = import("@tauri-apps/plugin-store").then((m) => m.load(STORE_FILE, { defaults: {}, autoSave: false }));
  }
  return storePromise;
}

export async function loadRegistry(): Promise<EmbedderRegistry> {
  try {
    if (isTauri()) {
      const store = await getStore();
      const reg = await store.get<EmbedderRegistry>(REGISTRY_KEY);
      if (reg && Array.isArray(reg.embedders)) return reg;
    } else if (typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const reg = JSON.parse(raw) as EmbedderRegistry;
        if (reg && Array.isArray(reg.embedders)) return reg;
      }
    }
  } catch {
    // Corrupt/missing store — start clean rather than crash the tab.
  }
  return EMPTY_REGISTRY;
}

export async function saveRegistry(reg: EmbedderRegistry): Promise<void> {
  try {
    if (isTauri()) {
      const store = await getStore();
      await store.set(REGISTRY_KEY, reg);
      await store.save();
    } else if (typeof localStorage !== "undefined") {
      localStorage.setItem(LS_KEY, JSON.stringify(reg));
    }
  } catch {
    // Best-effort persistence; never let a save failure break the UI.
  }
}

/** Where the data lives, for surfacing in the UI (honest about durability). */
export function storageLabel(): string {
  return isTauri() ? "saved to disk (app-data file)" : "saved in browser storage";
}
