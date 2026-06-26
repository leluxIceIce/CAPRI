// Data model for the Embedders tab. A user can create several named contrastive
// embedders; each accumulates training datasets (snapshots of a scene's per-cell
// feature vectors) and — in a later sprint — a learned encoder. Everything here
// is plain JSON-serializable so it persists cleanly via the Tauri Store plugin
// (see utils/embedderStore.ts).

/** One snapshot of training data added to an embedder (e.g. the current scene). */
export interface TrainingDataset {
  id: string;
  name: string;
  /** Where it came from — a file name, or "synthetic stream", etc. */
  source: string;
  addedAt: number; // epoch ms
  nSamples: number;
  dim: number; // feature dimensionality (channel count at capture time)
  featureNames: string[];
  /** Flattened nSamples × dim, row-major. Raw per-cell channel values — the
   *  trainer standardizes across the pooled datasets at fit time. */
  features: number[];
}

/** Placeholder for the learned encoder; populated by the training sprint. */
export interface EmbedderModel {
  trainedAt: number;
  sampleCount: number;
  latentDim: number;
  /** Encoder weights, flattened. Empty until training is wired in. */
  weights: number[];
}

export interface EmbedderConfig {
  latentDim: number; // 2 or 3
  epochs: number;
  /** Contrastive temperature (NT-Xent) — kept here so it persists with the embedder. */
  temperature: number;
}

export interface Embedder {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  config: EmbedderConfig;
  datasets: TrainingDataset[];
  model?: EmbedderModel;
  status: "untrained" | "trained";
}

export interface EmbedderRegistry {
  version: 1;
  embedders: Embedder[];
}

export const EMPTY_REGISTRY: EmbedderRegistry = { version: 1, embedders: [] };

export const DEFAULT_CONFIG: EmbedderConfig = {
  latentDim: 2,
  epochs: 200,
  temperature: 0.5,
};

/** Total accumulated training samples across an embedder's datasets. */
export function totalSamples(e: Embedder): number {
  return e.datasets.reduce((acc, d) => acc + d.nSamples, 0);
}
