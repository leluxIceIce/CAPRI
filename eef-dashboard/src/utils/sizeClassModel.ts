// Phytoplankton size-class fractionation — pico / nano / microplankton.
// ─────────────────────────────────────────────────────────────────────────
// CHL (the dashboard's "Chlorophyll-a Proxy" channel, see types.ts) is a
// single aggregate biomass signal: it cannot itself distinguish a bloom of
// large diatoms (microplankton) from a bloom of cyanobacteria (picoplankton).
// Total chlorophyll vs. cell-size structure matters ecologically — small
// cells dominate oligotrophic/low-biomass water, large cells dominate
// blooms — so we decompose total CHL into a three-class fraction using the
// same diagnostic structure published in the ocean-color size-class
// literature (e.g. Uitz et al. 2006; Brewin et al. 2010): each component
// saturates as a logistic function of total chlorophyll, since small cells
// are present at all biomass levels but stop scaling up once a bloom is
// large enough to be dominated by large cells.
//
// HONESTY NOTE: the three logistic terms below use the same functional
// FORM as that literature, but the coefficients are illustrative defaults
// tuned to this dashboard's synthetic CHL range — NOT the exact globally-
// tuned coefficients from a specific paper. This is a structural proxy, the
// same category as the "Structural embedding proxy" in affinityGraph.ts:
// useful for showing how size structure should respond to biomass, but not
// a substitute for a regionally-calibrated, peer-reviewed parameterization
// if this were used for real scientific reporting.

export interface SizeClassFractions {
  pico: number;  // fraction of total CHL attributable to picoplankton (<2µm)
  nano: number;  // fraction attributable to nanoplankton (2-20µm)
  micro: number; // fraction attributable to microplankton (>20µm)
  totalChl: number; // the input total CHL this was derived from
}

// Logistic saturation: C_x = Cm * (1 - exp(-D/Cm * Ctot))
// Cm = asymptotic ceiling for this size class as Ctot -> infinity.
// D  = initial slope (how fast this class saturates at low biomass).
function logisticComponent(ctot: number, cMax: number, d: number): number {
  return cMax * (1 - Math.exp((-d / cMax) * ctot));
}

// Illustrative saturation parameters (mg/m³), ordered so 0 <= pico-ceiling
// <= combined-small-cell-ceiling <= plausible CHL range for this dashboard.
const PICO_CEILING = 0.25;
const PICO_SLOPE = 1.1;
const PICO_NANO_CEILING = 1.1;
const PICO_NANO_SLOPE = 0.9;

/**
 * Decomposes a total CHL value into pico/nano/micro fractions (summing to 1).
 * See module-level HONESTY NOTE above re: parameter provenance.
 */
export function computeSizeClassFractions(totalChl: number): SizeClassFractions {
  const ctot = Math.max(0, totalChl);
  if (ctot === 0) return { pico: 1 / 3, nano: 1 / 3, micro: 1 / 3, totalChl: 0 };

  const cPico = logisticComponent(ctot, PICO_CEILING, PICO_SLOPE);
  const cPicoNano = logisticComponent(ctot, PICO_NANO_CEILING, PICO_NANO_SLOPE);
  // Combined small-cell biomass can't exceed total, and micro is the remainder.
  const cPicoClamped = Math.min(cPico, ctot);
  const cPicoNanoClamped = Math.min(Math.max(cPicoNano, cPicoClamped), ctot);
  const cNano = cPicoNanoClamped - cPicoClamped;
  const cMicro = ctot - cPicoNanoClamped;

  return {
    pico: cPicoClamped / ctot,
    nano: cNano / ctot,
    micro: cMicro / ctot,
    totalChl: ctot,
  };
}
