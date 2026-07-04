import { useEffect, useRef, type MouseEvent as ReactMouseEvent } from "react";
import type { DataCube } from "@capri/core";
import { drawSignatureField, type SigParams, type Selection } from "./signatureField";
import { pickCell } from "../lib/probe";

interface Props {
  cube: DataCube;
  params: SigParams;
  selection: Selection;
  paused: boolean;
  onPick: (cell: { row: number; col: number }) => void;
}

// Canvas host for the Signature Field instrument. Keeps the latest cube/params/
// selection in refs so the animation loop reads current values without
// re-subscribing; the loop exists only for the subtle contour shimmer (frozen when
// paused / reduced-motion). Clicking maps to a grid cell and raises onPick.
export function SignatureField({ cube, params, selection, paused, onPick }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cubeRef = useRef(cube);
  const paramsRef = useRef(params);
  const selRef = useRef(selection);
  cubeRef.current = cube;
  paramsRef.current = params;
  selRef.current = selection;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0;

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let raf = 0;
    let running = true;
    const t0 = performance.now();
    const frame = () => {
      if (!running) return;
      const phase = reduce ? 0 : (performance.now() - t0) / 1000;
      drawSignatureField(ctx, cubeRef.current, w, h, paramsRef.current, phase, selRef.current);
      if (!reduce && !paused) raf = requestAnimationFrame(frame);
    };
    frame();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [paused]);

  // Redraw immediately whenever a new cube / params / selection arrive.
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const r = wrap.getBoundingClientRect();
    drawSignatureField(ctx, cube, r.width, r.height, params, 0, selection);
  }, [cube, params, selection]);

  const handleClick = (e: ReactMouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const r = canvas.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    onPick(pickCell(nx, ny, cube.gridSize));
  };

  return (
    <div ref={wrapRef} className="inst-canvas-wrap">
      <canvas ref={canvasRef} onClick={handleClick} />
    </div>
  );
}
