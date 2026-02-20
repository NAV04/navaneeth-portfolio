"use client";

import { useEffect, useRef } from "react";

export default function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let inView = true;
    let tabVisible = document.visibilityState === "visible";
    let lastTs = 0;
    const frameBudgetMs = 1000 / 30;
    const pointer = { x: -9999, y: -9999 };
    const nodes = Array.from({ length: 28 }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0018,
      vy: (Math.random() - 0.5) * 0.0018,
    }));

    const resize = () => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const draw = (ts: number) => {
      if (!running) return;

      if (!tabVisible || !inView) {
        raf = requestAnimationFrame(draw);
        return;
      }

      if (!lastTs) lastTs = ts;
      if (ts - lastTs < frameBudgetMs) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastTs = ts;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const ax = nodes[i].x * w;
          const ay = nodes[i].y * h;
          const bx = nodes[j].x * w;
          const by = nodes[j].y * h;
          const d = Math.hypot(ax - bx, ay - by);
          if (d < 150) {
            ctx.strokeStyle = `rgba(34,211,238,${0.11 - d / 1800})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const x = n.x * w;
        const y = n.y * h;
        const near = Math.hypot(pointer.x - x, pointer.y - y) < 100;
        ctx.fillStyle = near ? "rgba(59,130,246,0.95)" : "rgba(34,211,238,0.72)";
        ctx.beginPath();
        ctx.arc(x, y, near ? 2.6 : 1.9, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      tabVisible = document.visibilityState === "visible";
    };

    const observer = new IntersectionObserver(
      (entries) => {
        inView = Boolean(entries[0]?.isIntersecting);
      },
      { threshold: 0.1 },
    );

    resize();
    running = true;
    raf = requestAnimationFrame(draw);
    observer.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-45 pointer-events-none" />;
}
