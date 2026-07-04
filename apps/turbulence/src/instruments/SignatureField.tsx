import { useEffect, useRef } from "react";
import type { DataCube } from "@capri/core";
import { drawSignatureField, type SigParams } from "./signatureField";

interface Props {
  cube: DataCube;
  params: SigParams;
  paused: boolean;
}

// Canvas host for the Signature Field instrument. Keeps the latest cube/params in
// refs so the animation loop reads current values without re-subscribing; the loop
// exists only for the subtle contour shimmer (frozen when paused / reduced-motion).
export function SignatureField({ cube, params, paused }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cubeRef = useRef(cube);
  const paramsRef = useRef(params);
  cubeRef.current = cube;
  paramsRef.current = params;

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
      drawSignatureField(ctx, cubeRef.current, w, h, paramsRef.current, phase);
      if (!reduce && !paused) raf = requestAnimationFrame(frame);
    };
    // Always draw at least once; only keep looping when live.
    frame();
    if (reduce || paused) {
      // single static frame already drawn
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [paused]);

  // Redraw immediately whenever a new cube or params arrive (covers the paused case).
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const r = wrap.getBoundingClientRect();
    drawSignatureField(ctx, cube, r.width, r.height, params, 0);
  }, [cube, params]);

  return (
    <div ref={wrapRef} className="inst-canvas-wrap">
      <canvas ref={canvasRef} />
    </div>
  );
}
