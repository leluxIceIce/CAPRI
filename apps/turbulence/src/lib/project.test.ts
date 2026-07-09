import { describe, expect, it } from "vitest";
import { VARIABLE_METADATA, type VariableName } from "@capri/core";
import { serializeProject, deserializeProject, reconcileLayerOrder, PROJECT_VERSION, type ProjectState } from "./project";
import { DEFAULT_SIG_PARAMS } from "../instruments/signatureField";
import { DEFAULT_OPT_PARAMS } from "../instruments/opticalSection";
import { DEFAULT_LATENT_PARAMS } from "../instruments/latentVolume";
import { DEFAULT_BLOOM_PARAMS } from "../instruments/bloomField";
import { DEFAULT_DENSITY_PARAMS } from "../instruments/densityCartography";
import { DEFAULT_INTEL_PARAMS } from "../instruments/territorialIntel";

const ALL = Object.keys(VARIABLE_METADATA) as VariableName[];

const sample: ProjectState = {
  version: PROJECT_VERSION,
  sig: { ...DEFAULT_SIG_PARAMS, fieldChannel: "FLH", contourLevels: 7 },
  opt: DEFAULT_OPT_PARAMS,
  latent: DEFAULT_LATENT_PARAMS,
  bloom: DEFAULT_BLOOM_PARAMS,
  density: DEFAULT_DENSITY_PARAMS,
  intel: DEFAULT_INTEL_PARAMS,
  layerOrder: ALL,
  stageMode: "focus",
  focusId: "latent",
  selected: "bloom",
  step: 12.5,
};

describe("project save/load", () => {
  it("round-trips a project", () => {
    const restored = deserializeProject(serializeProject(sample));
    expect(restored).not.toBeNull();
    expect(restored!.sig!.fieldChannel).toBe("FLH");
    expect(restored!.sig!.contourLevels).toBe(7);
    expect(restored!.stageMode).toBe("focus");
    expect(restored!.focusId).toBe("latent");
    expect(restored!.selected).toBe("bloom");
    expect(restored!.step).toBe(12.5);
    expect(restored!.layerOrder).toHaveLength(ALL.length);
  });

  it("returns null for malformed JSON rather than throwing", () => {
    expect(deserializeProject("{not json")).toBeNull();
    expect(deserializeProject("42")).toBeNull();
  });

  it("reconciles layer order — drops unknown, appends missing", () => {
    const partial = reconcileLayerOrder(["FLH", "not_a_channel", "CHL"]);
    expect(partial).toHaveLength(ALL.length);
    expect(partial[0]).toBe("FLH");
    expect(partial[1]).toBe("CHL");
    expect(partial).not.toContain("not_a_channel");
    // every real channel present exactly once
    expect(new Set(partial).size).toBe(ALL.length);
  });

  it("ignores unknown enum values safely", () => {
    const restored = deserializeProject(JSON.stringify({ version: 1, stageMode: "bogus", focusId: "nope" }));
    expect(restored).not.toBeNull();
    expect(restored!.stageMode).toBeUndefined();
    expect(restored!.focusId).toBeUndefined();
  });
});
