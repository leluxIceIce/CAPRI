import React from "react";
import { DataCube } from "@capri/core/types";

// Hover state shared by the UMAP and RF scatter plots. (px, py) are in the
// plots' common 0..200 SVG viewBox space so the tooltip can be positioned as a
// percentage over a `relative`-wrapped <svg>, independent of its rendered size.
export interface HoverCell {
  row: number;
  col: number;
  px: number;
  py: number;
}

/**
 * Tooltip for a hovered scatter point, tracing it back to its source grid cell.
 * Shows CHL (always present) and the cell's real lat/lon when the cube carries
 * geolocation (uploaded geo-tagged data); for synthetic/ungeoreferenced cubes
 * `coords` is absent, so it falls back to the grid index instead of fabricating
 * coordinates. Render it as the last child of a `relative` container that wraps
 * the 0..200 viewBox <svg>.
 */
export const CellTooltip: React.FC<{ cube: DataCube; hover: HoverCell | null }> = ({ cube, hover }) => {
  if (!hover) return null;
  const { row, col, px, py } = hover;
  const chl = cube.channels.CHL?.[row]?.[col];
  const coord = cube.coords?.[row]?.[col] ?? null;

  return (
    <div
      className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-[var(--eef-border)] bg-[var(--eef-surface-2)] px-2 py-1 text-[9px] leading-snug text-[var(--eef-text)] shadow-[var(--eef-shadow)] backdrop-blur-md"
      style={{ left: `${(px / 200) * 100}%`, top: `calc(${(py / 200) * 100}% - 5px)` }}
    >
      <div className="tnum font-semibold">
        CHL {Number.isFinite(chl) ? `${(chl as number).toFixed(3)} mg/m³` : "—"}
      </div>
      {coord ? (
        <div className="tnum text-[var(--eef-text-3)]">
          {coord.lat.toFixed(4)}°, {coord.lon.toFixed(4)}°
        </div>
      ) : (
        <div className="text-[var(--eef-text-3)]">
          cell [{row}, {col}] · no geolocation
        </div>
      )}
    </div>
  );
};
