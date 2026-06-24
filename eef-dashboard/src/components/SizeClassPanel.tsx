import React, { useMemo } from "react";
import type { DataCube } from "../types";
import { computeSizeClassFractions } from "../utils/sizeClassModel";

interface SizeClassPanelProps {
  activeDataCube: DataCube;
}

const CLASSES: { key: "pico" | "nano" | "micro"; label: string; range: string; color: string }[] = [
  { key: "pico", label: "Picoplankton", range: "<2µm", color: "#a78bfa" },
  { key: "nano", label: "Nanoplankton", range: "2-20µm", color: "#34d399" },
  { key: "micro", label: "Microplankton", range: ">20µm", color: "#fbbf24" },
];

// Decomposes the current frame's mean CHL into pico/nano/micro size-class
// fractions. See sizeClassModel.ts for the honesty note on parameter
// provenance — this is a structural proxy, not a calibrated retrieval.
export const SizeClassPanel: React.FC<SizeClassPanelProps> = ({ activeDataCube }) => {
  const fractions = useMemo(
    () => computeSizeClassFractions(activeDataCube.stats.CHL.mean),
    [activeDataCube]
  );

  return (
    <div className="flex flex-col gap-3 text-[11px]">
      <div className="flex items-center justify-between font-mono text-[10px] text-white/40">
        <span>Mean CHL this frame</span>
        <span className="text-white/70">{fractions.totalChl.toFixed(3)} mg/m³</span>
      </div>

      <div className="flex h-4 w-full overflow-hidden rounded border border-white/10">
        {CLASSES.map((c) => (
          <div
            key={c.key}
            style={{ width: `${Math.max(0, fractions[c.key]) * 100}%`, background: c.color }}
            title={`${c.label}: ${(fractions[c.key] * 100).toFixed(1)}%`}
          />
        ))}
      </div>

      <div className="flex flex-col gap-1.5 font-mono">
        {CLASSES.map((c) => (
          <div key={c.key} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ background: c.color }} />
            <span className="text-white/60 flex-1">
              {c.label} <span className="text-white/30">({c.range})</span>
            </span>
            <span className="text-white/80">{(fractions[c.key] * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>

      <div className="text-[9px] leading-snug text-white/30 border-t border-white/10 pt-2">
        Structural size-class proxy derived from total CHL via a three-component
        logistic decomposition (same diagnostic form as Uitz et al. 2006 / Brewin
        et al. 2010). Illustrative coefficients, not a calibrated retrieval — see
        sizeClassModel.ts.
      </div>
    </div>
  );
};
