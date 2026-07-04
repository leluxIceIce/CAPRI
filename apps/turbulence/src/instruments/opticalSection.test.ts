import { describe, expect, it } from "vitest";
import { classifyWaterType } from "./opticalSection";

// The water-type classifier is the scientific core of the Optical Section — it
// maps a cell's normalised (CHL, TSM, FLH) signature to an optical water mass.
describe("optical water-type classification", () => {
  it("names the archetypal masses", () => {
    expect(classifyWaterType(0.9, 0.2, 0.9)).toBe("bloom");       // high CHL + high FLH
    expect(classifyWaterType(0.1, 0.9, 0.1)).toBe("sediment");    // turbid, little chlorophyll
    expect(classifyWaterType(0.5, 0.8, 0.2)).toBe("case2");       // turbid Case-2
    expect(classifyWaterType(0.6, 0.2, 0.2)).toBe("productive");  // productive, senescing
    expect(classifyWaterType(0.1, 0.1, 0.1)).toBe("clear");       // Case-1 oligotrophic
  });
});
