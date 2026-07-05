// Project save/load — the pure, testable core of M5's persistence. Serialises the
// view/instrument state (never the data: cubes are regenerable/re-importable) to a
// small JSON file and restores it, reconciling against the current channel set.
// This is the platform's equivalent of eef-dashboard's session snapshot — a
// preserved capability, now covering all six instruments + the Stage layout.

import { VARIABLE_METADATA, type VariableName } from "@capri/core";
import type { SigParams } from "../instruments/signatureField";
import type { OptParams } from "../instruments/opticalSection";
import type { LatentParams } from "../instruments/latentVolume";
import type { BloomParams } from "../instruments/bloomField";
import type { DensityParams } from "../instruments/densityCartography";
import type { IntelParams } from "../instruments/territorialIntel";

export const PROJECT_VERSION = 1 as const;
export type InstId = "signature" | "optical" | "latent" | "bloom" | "density" | "intel";

export interface ProjectState {
  version: typeof PROJECT_VERSION;
  sig: SigParams;
  opt: OptParams;
  latent: LatentParams;
  bloom: BloomParams;
  density: DensityParams;
  intel: IntelParams;
  layerOrder: VariableName[];
  stageMode: "mosaic" | "focus";
  focusId: InstId;
  selected: InstId;
  step: number;
}

const ALL_CHANNELS = Object.keys(VARIABLE_METADATA) as VariableName[];

/** A complete, valid stacking order: keep known saved keys in order, drop retired
 *  ones, append any channels the save predates — so an old project never breaks. */
export function reconcileLayerOrder(saved: unknown): VariableName[] {
  const arr = Array.isArray(saved) ? (saved as VariableName[]) : [];
  const valid = arr.filter((k) => ALL_CHANNELS.includes(k));
  const seen = new Set(valid);
  return [...valid, ...ALL_CHANNELS.filter((k) => !seen.has(k))];
}

export function serializeProject(state: ProjectState): string {
  return JSON.stringify({ ...state, version: PROJECT_VERSION }, null, 2);
}

/** Parse + validate a project file into a partial state (only recognised fields).
 *  Returns null on anything unparseable, so a bad file never white-screens the app. */
export function deserializeProject(json: string): Partial<ProjectState> | null {
  let raw: unknown;
  try { raw = JSON.parse(json); } catch { return null; }
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const out: Partial<ProjectState> = {};
  const objField = <K extends keyof ProjectState>(k: K) => {
    if (o[k] && typeof o[k] === "object") out[k] = o[k] as ProjectState[K];
  };
  objField("sig"); objField("opt"); objField("latent");
  objField("bloom"); objField("density"); objField("intel");
  if ("layerOrder" in o) out.layerOrder = reconcileLayerOrder(o.layerOrder);
  if (o.stageMode === "mosaic" || o.stageMode === "focus") out.stageMode = o.stageMode;
  const ids: InstId[] = ["signature", "optical", "latent", "bloom", "density", "intel"];
  if (ids.includes(o.focusId as InstId)) out.focusId = o.focusId as InstId;
  if (ids.includes(o.selected as InstId)) out.selected = o.selected as InstId;
  if (typeof o.step === "number" && Number.isFinite(o.step)) out.step = o.step;
  return out;
}
