import React, { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import type { RawCSVData } from "../telemetryGenerator";

interface CSVInspectorPanelProps {
  raw: RawCSVData;
}

const PAGE_SIZE = 15;

const selectClass =
  "flex-1 bg-white/5 border border-white/10 rounded px-1.5 py-1 text-[10px] font-mono text-white/70 focus:outline-none focus:border-white/20 cursor-pointer";

// Raw-row table + sortable column chart for an uploaded CSV — looks at the data the
// way the user's own spreadsheet does (original rows/columns), as a separate, simpler
// 2D companion to the spatially-binned 20x20 3D grid view.
export const CSVInspectorPanel: React.FC<CSVInspectorPanelProps> = ({ raw }) => {
  const { headers, rows } = raw;

  const [sortColIdx, setSortColIdx] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [chartColIdx, setChartColIdx] = useState(0);
  const [zoomStart, setZoomStart] = useState(0);
  const [zoomEnd, setZoomEnd] = useState(rows.length - 1);

  const sortedRows = useMemo(() => {
    if (sortColIdx === null) return rows;
    const withIdx = rows.map((row, i) => ({ row, i }));
    withIdx.sort((a, b) => {
      const av = a.row[sortColIdx] ?? 0;
      const bv = b.row[sortColIdx] ?? 0;
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return withIdx.map((w) => w.row);
  }, [rows, sortColIdx, sortDir]);

  const pageCount = Math.max(1, Math.ceil(sortedRows.length / PAGE_SIZE));
  const pageRows = sortedRows.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const handleSortClick = (colIdx: number) => {
    if (sortColIdx === colIdx) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortColIdx(colIdx);
      setSortDir("asc");
    }
    setPage(0);
  };

  const clampedStart = Math.max(0, Math.min(zoomStart, rows.length - 1));
  const clampedEnd = Math.max(clampedStart, Math.min(zoomEnd, rows.length - 1));

  const chartValues = useMemo(() => {
    const vals: number[] = [];
    for (let i = clampedStart; i <= clampedEnd; i++) {
      vals.push(rows[i]?.[chartColIdx] ?? 0);
    }
    return vals;
  }, [rows, chartColIdx, clampedStart, clampedEnd]);

  const chartStats = useMemo(() => {
    if (chartValues.length === 0) return { min: 0, max: 0, mean: 0 };
    const min = Math.min(...chartValues);
    const max = Math.max(...chartValues);
    const mean = chartValues.reduce((a, b) => a + b, 0) / chartValues.length;
    return { min, max, mean };
  }, [chartValues]);

  const chartW = 100;
  const chartH = 100;
  const linePath = useMemo(() => {
    if (chartValues.length < 2) return "";
    const range = chartStats.max - chartStats.min || 1;
    return chartValues
      .map((v, i) => {
        const x = (i / (chartValues.length - 1)) * chartW;
        const y = chartH - ((v - chartStats.min) / range) * chartH;
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
  }, [chartValues, chartStats]);

  return (
    <div className="flex flex-col gap-3 text-[11px]">
      {/* Column chart with row-range zoom */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="text-white/40 w-14">Column</span>
          <select
            value={chartColIdx}
            onChange={(e) => setChartColIdx(parseInt(e.target.value))}
            className={selectClass}
          >
            {headers.map((h, i) => (
              <option key={i} value={i}>{h}</option>
            ))}
          </select>
        </div>

        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-28 bg-white/[0.03] border border-white/10 rounded">
          {linePath && (
            <path d={linePath} fill="none" stroke="#7dd3fc" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          )}
        </svg>

        <div className="flex justify-between font-mono text-[9px] text-white/30">
          <span>min {chartStats.min.toFixed(3)}</span>
          <span>mean {chartStats.mean.toFixed(3)}</span>
          <span>max {chartStats.max.toFixed(3)}</span>
        </div>

        <div className="flex items-center gap-2 text-[9px] font-mono text-white/40">
          <span className="w-14">Zoom rows</span>
          <input
            type="range"
            min={0}
            max={rows.length - 1}
            value={clampedStart}
            onChange={(e) => setZoomStart(parseInt(e.target.value))}
            className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
          />
          <input
            type="range"
            min={0}
            max={rows.length - 1}
            value={clampedEnd}
            onChange={(e) => setZoomEnd(parseInt(e.target.value))}
            className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
          />
          <span className="w-16 text-right">{clampedStart}–{clampedEnd}</span>
        </div>
      </div>

      {/* Raw-row sortable table */}
      <div className="overflow-x-auto border border-white/10 rounded">
        <table className="w-full text-[10px] font-mono">
          <thead>
            <tr className="bg-white/5">
              {headers.map((h, i) => (
                <th
                  key={i}
                  onClick={() => handleSortClick(i)}
                  className="px-2 py-1 text-left text-white/60 cursor-pointer hover:text-white whitespace-nowrap select-none"
                >
                  <span className="inline-flex items-center gap-1">
                    {h}
                    {sortColIdx === i ? (
                      sortDir === "asc" ? <ArrowUp size={10} /> : <ArrowDown size={10} />
                    ) : (
                      <ArrowUpDown size={10} className="opacity-30" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? "bg-white/0" : "bg-white/[0.02]"}>
                {row.map((v, ci) => (
                  <td key={ci} className="px-2 py-0.5 text-white/70 whitespace-nowrap">
                    {Number.isInteger(v) ? v : v.toFixed(4)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between font-mono text-[9px] text-white/40">
        <span>{sortedRows.length} rows total</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-2 py-0.5 rounded bg-white/5 border border-white/10 disabled:opacity-30"
          >
            Prev
          </button>
          <span>Page {page + 1} / {pageCount}</span>
          <button
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={page >= pageCount - 1}
            className="px-2 py-0.5 rounded bg-white/5 border border-white/10 disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
