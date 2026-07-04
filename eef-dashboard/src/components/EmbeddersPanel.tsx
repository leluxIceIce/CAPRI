import React, { useEffect, useMemo, useState } from "react";
import { Boxes, Plus, Trash2, Database, Sparkles, Info } from "lucide-react";
import { DataCube } from "@capri/core/types";
import { ALL_VARIABLES, buildSamples } from "@capri/core/utils/mlData";
import {
  Embedder,
  EmbedderRegistry,
  TrainingDataset,
  DEFAULT_CONFIG,
  EMPTY_REGISTRY,
  totalSamples,
} from "@capri/core/embedders/embedderTypes";
import { loadRegistry, saveRegistry, storageLabel } from "../utils/embedderStore";

interface EmbeddersPanelProps {
  dataCube: DataCube;
  /** Human label for where the current scene came from (file name / stream). */
  sourceName: string;
}

// A contrastive encoder wants a few thousand+ samples to learn stable structure;
// below this we tell the user to keep adding scenes rather than train on too few.
const RECOMMENDED_SAMPLES = 3000;

function newId(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  } catch { /* fall through */ }
  return `e-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

export const EmbeddersPanel: React.FC<EmbeddersPanelProps> = ({ dataCube, sourceName }) => {
  const [registry, setRegistry] = useState<EmbedderRegistry>(EMPTY_REGISTRY);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load the persisted registry once on mount.
  useEffect(() => {
    let alive = true;
    loadRegistry().then((reg) => {
      if (!alive) return;
      setRegistry(reg);
      setSelectedId(reg.embedders[0]?.id ?? null);
      setLoading(false);
    });
    return () => { alive = false; };
  }, []);

  // Single funnel for every mutation: update state AND persist.
  const commit = (next: EmbedderRegistry) => {
    setRegistry(next);
    void saveRegistry(next);
  };

  const selected = useMemo(
    () => registry.embedders.find((e) => e.id === selectedId) ?? null,
    [registry, selectedId]
  );

  const cellCount = dataCube.gridSize * dataCube.gridSize;

  const createEmbedder = () => {
    const n = registry.embedders.length + 1;
    const now = Date.now();
    const e: Embedder = {
      id: newId(),
      name: `Embedder ${n}`,
      createdAt: now,
      updatedAt: now,
      config: { ...DEFAULT_CONFIG },
      datasets: [],
      status: "untrained",
    };
    commit({ ...registry, embedders: [...registry.embedders, e] });
    setSelectedId(e.id);
  };

  const updateEmbedder = (id: string, patch: Partial<Embedder>) => {
    commit({
      ...registry,
      embedders: registry.embedders.map((e) =>
        e.id === id ? { ...e, ...patch, updatedAt: Date.now() } : e
      ),
    });
  };

  const deleteEmbedder = (id: string) => {
    const remaining = registry.embedders.filter((e) => e.id !== id);
    commit({ ...registry, embedders: remaining });
    if (selectedId === id) setSelectedId(remaining[0]?.id ?? null);
  };

  const addCurrentScene = () => {
    if (!selected) return;
    const { rows, featureNames } = buildSamples(dataCube, ALL_VARIABLES);
    const ds: TrainingDataset = {
      id: newId(),
      name: sourceName,
      source: sourceName,
      addedAt: Date.now(),
      nSamples: rows.length,
      dim: featureNames.length,
      featureNames: featureNames as string[],
      features: rows.flat(),
    };
    updateEmbedder(selected.id, { datasets: [...selected.datasets, ds] });
  };

  const removeDataset = (dsId: string) => {
    if (!selected) return;
    updateEmbedder(selected.id, { datasets: selected.datasets.filter((d) => d.id !== dsId) });
  };

  const setLatentDim = (dim: number) => {
    if (!selected) return;
    updateEmbedder(selected.id, { config: { ...selected.config, latentDim: dim } });
  };

  return (
    <div className="flex flex-col gap-3 text-[var(--eef-text)] h-full">
      <div className="flex items-center gap-1.5 border-b border-[var(--eef-divider)] pb-3">
        <Boxes size={15} className="text-[var(--eef-accent)]" />
        <h3 className="text-[13px] font-semibold">Contrastive embedders</h3>
        <span className="ml-auto text-[9px] text-[var(--eef-text-3)]">{storageLabel()}</span>
      </div>

      <p className="text-[11px] text-[var(--eef-text-2)] leading-relaxed">
        Build and keep multiple embedders. Add scenes to one as training data over time;
        it all persists between sessions. Training the encoder lands in a follow-up —
        for now this accumulates the data a contrastive model needs.
      </p>

      {loading ? (
        <div className="flex items-center gap-2 p-6 text-[12px] text-[var(--eef-text-3)]">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--eef-border)] border-t-[var(--eef-accent)]" />
          Loading saved embedders…
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-3 min-h-0 flex-1">
          {/* Left: embedder list */}
          <div className="flex flex-col gap-2 min-h-0">
            <div className="flex flex-col gap-1 overflow-y-auto min-h-0">
              {registry.embedders.length === 0 && (
                <div className="text-[10.5px] text-[var(--eef-text-3)] glass-well p-3 text-center">
                  No embedders yet. Create one to start collecting training scenes.
                </div>
              )}
              {registry.embedders.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setSelectedId(e.id)}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[11px] border transition-colors ${
                    e.id === selectedId
                      ? "bg-[var(--eef-accent-soft)] border-[var(--eef-accent-ring)] text-[var(--eef-accent)]"
                      : "bg-[var(--eef-inset)] border-[var(--eef-border)] text-[var(--eef-text-2)] hover:bg-[var(--eef-surface-2)]"
                  }`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ background: e.status === "trained" ? "var(--eef-ok)" : "var(--eef-border-strong)" }}
                  />
                  <span className="truncate flex-1 font-semibold">{e.name}</span>
                  <span className="tnum text-[9px] text-[var(--eef-text-3)]">{totalSamples(e)}</span>
                </button>
              ))}
            </div>
            <button
              onClick={createEmbedder}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-[var(--eef-border-strong)] px-2 py-2 text-[11px] text-[var(--eef-text-2)] hover:bg-[var(--eef-surface-2)] hover:text-[var(--eef-text)] transition-colors"
            >
              <Plus size={13} /> New embedder
            </button>
          </div>

          {/* Right: selected embedder detail */}
          <div className="min-h-0 overflow-y-auto">
            {!selected ? (
              <div className="flex h-full items-center justify-center text-[11px] text-[var(--eef-text-3)] glass-well p-6">
                Select or create an embedder.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {/* Name */}
                <input
                  value={selected.name}
                  onChange={(e) => updateEmbedder(selected.id, { name: e.target.value })}
                  className="bg-[var(--eef-surface-2)] border border-[var(--eef-border)] rounded px-2.5 py-1.5 text-[12px] font-semibold text-[var(--eef-text)] focus:border-[var(--eef-accent-ring)] outline-none"
                  aria-label="Embedder name"
                />

                {/* Config */}
                <div className="flex items-center gap-3 text-[10px] text-[var(--eef-text-3)]">
                  <span>Latent dim</span>
                  <div className="flex gap-1">
                    {[2, 3].map((d) => (
                      <button
                        key={d}
                        onClick={() => setLatentDim(d)}
                        className={`px-2 py-0.5 rounded border text-[10px] ${
                          selected.config.latentDim === d
                            ? "bg-[var(--eef-accent-soft)] border-[var(--eef-accent-ring)] text-[var(--eef-accent)]"
                            : "bg-[var(--eef-inset)] border-[var(--eef-border)] text-[var(--eef-text-2)]"
                        }`}
                      >
                        {d}-D
                      </button>
                    ))}
                  </div>
                </div>

                {/* Training data */}
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--eef-text-2)] mb-1.5">
                    <Database size={12} /> Training data
                    <span className="ml-auto tnum text-[10px] text-[var(--eef-text-3)]">
                      {totalSamples(selected).toLocaleString()} samples
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 mb-2">
                    {selected.datasets.length === 0 && (
                      <div className="text-[10px] text-[var(--eef-text-3)] glass-well p-2.5 text-center">
                        No training scenes yet.
                      </div>
                    )}
                    {selected.datasets.map((d) => (
                      <div key={d.id} className="flex items-center gap-2 text-[10px] glass-well px-2.5 py-1.5">
                        <span className="truncate flex-1 text-[var(--eef-text-2)]">{d.name}</span>
                        <span className="tnum text-[9px] text-[var(--eef-text-3)] shrink-0">
                          {d.nSamples}×{d.dim}
                        </span>
                        <button
                          onClick={() => removeDataset(d.id)}
                          aria-label="Remove dataset"
                          className="text-[var(--eef-text-3)] hover:text-[var(--eef-alert)] shrink-0"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={addCurrentScene}
                    className="flex items-center justify-center gap-1.5 w-full rounded-lg px-3 py-2 text-[11px] font-semibold text-white bg-[var(--eef-accent)] hover:opacity-90 transition-opacity"
                  >
                    <Plus size={13} /> Add current scene ({cellCount} cells) from {sourceName}
                  </button>
                </div>

                {/* Readiness hint */}
                <div className="flex items-start gap-2 text-[9.5px] text-[var(--eef-text-2)] leading-relaxed glass-well p-2.5">
                  <Info size={12} className="mt-0.5 shrink-0 text-[var(--eef-text-3)]" />
                  {totalSamples(selected) < RECOMMENDED_SAMPLES ? (
                    <span>
                      You have {totalSamples(selected).toLocaleString()} samples. A contrastive
                      encoder learns stable structure best with ~{RECOMMENDED_SAMPLES.toLocaleString()}+
                      — keep adding scenes (different streams/uploads) before training.
                    </span>
                  ) : (
                    <span>
                      {totalSamples(selected).toLocaleString()} samples collected — enough to start
                      training a contrastive encoder.
                    </span>
                  )}
                </div>

                {/* Train (wired in a follow-up) */}
                <button
                  disabled
                  title="Encoder training lands in the next update"
                  className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-semibold border border-[var(--eef-border)] text-[var(--eef-text-3)] bg-[var(--eef-inset)] cursor-not-allowed"
                >
                  <Sparkles size={13} /> Train encoder — coming next update
                </button>

                {/* Delete */}
                <button
                  onClick={() => deleteEmbedder(selected.id)}
                  className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] text-[var(--eef-text-3)] hover:text-[var(--eef-alert)] transition-colors"
                >
                  <Trash2 size={12} /> Delete embedder
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
