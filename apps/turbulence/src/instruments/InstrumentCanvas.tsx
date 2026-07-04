import { useEffect, useRef, type MouseEvent as ReactMouseEvent } from "react";

interface Props {
  /** Draw one frame. `phase` (seconds) is for subtle motion only; frozen when paused/reduced. */
  render: (ctx: CanvasRenderingContext2D, w: number, h: number, phase: number) => void;
  paused: boolean;
  /** Normalised (0..1) click position within the canvas. */
  onPick?: (nx: number, ny: number) => void;
}

// Generic canvas host shared by every instrument: owns DPR scaling, resize, the
// animation loop and reduced-motion handling, and turns clicks into normalised
// positions. Instruments are just a `render` closure over their own cube/params/
// selection — so adding the remaining lenses is a render function, not plumbing.
export function InstrumentCanvas({ render, paused, onPick }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderRef = useRef(render);
  renderRef.current = render;

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
      renderRef.current(ctx, w, h, 0);
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
      renderRef.current(ctx, w, h, phase);
      if (!reduce && !paused) raf = requestAnimationFrame(frame);
    };
    frame();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [paused]);

  // Redraw immediately when the render closure changes (new cube / params / selection),
  // covering the paused and reduced-motion cases where the loop isn't running.
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const r = wrap.getBoundingClientRect();
    render(ctx, r.width, r.height, 0);
  }, [render]);

  const handleClick = (e: ReactMouseEvent<HTMLCanvasElement>) => {
    if (!onPick) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const r = canvas.getBoundingClientRect();
    onPick((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
  };

  return (
    <div ref={wrapRef} className="inst-canvas-wrap">
      <canvas ref={canvasRef} onClick={handleClick} />
    </div>
  );
}
