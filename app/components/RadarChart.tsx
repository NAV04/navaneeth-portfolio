"use client";

import { useEffect, useRef } from "react";

type SkillPoint = {
  name: string;
  pct: number;
  col: string;
  desc: string;
};

const SKILLS: SkillPoint[] = [
  { name: "GEN AI", pct: 95, col: "#00ffe7", desc: "LLMs, RAG, FAISS, Fine-tuning" },
  { name: "DEEP ML", pct: 88, col: "#6e00ff", desc: "Transformers, CNNs, PyTorch" },
  { name: "NLP", pct: 87, col: "#ff2d9b", desc: "NMT, ASR, Language Models" },
  { name: "VISION", pct: 82, col: "#ff6b00", desc: "OpenCV, Object Detection" },
  { name: "BACKEND", pct: 85, col: "#00ff88", desc: "Flask, REST, PostgreSQL" },
  { name: "CLOUD", pct: 80, col: "#ffe600", desc: "GCP, Vertex AI, Docker" },
  { name: "RESEARCH", pct: 92, col: "#00b4ff", desc: "4x Publications, IIT Kanpur" },
];

export default function RadarChart() {
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
    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let radius = 0;
    let lastTs = 0;
    let hovered = -1;
    const pointer = { x: -9999, y: -9999, inside: false };
    const levelCount = 5;
    const frameBudgetMs = 1000 / 45;

    const spriteByColor = new Map<string, HTMLCanvasElement>();
    const nodePositions = SKILLS.map(() => ({ x: 0, y: 0 }));

    const makeNodeSprite = (hex: string) => {
      const size = 56;
      const node = document.createElement("canvas");
      node.width = size;
      node.height = size;
      const nctx = node.getContext("2d");
      if (!nctx) return node;
      const c = size / 2;

      const g = nctx.createRadialGradient(c, c, 0, c, c, c);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.24, hex);
      g.addColorStop(0.5, `${hex}AA`);
      g.addColorStop(1, `${hex}00`);

      nctx.fillStyle = g;
      nctx.beginPath();
      nctx.arc(c, c, c, 0, Math.PI * 2);
      nctx.fill();

      return node;
    };

    const getSprite = (color: string) => {
      const cached = spriteByColor.get(color);
      if (cached) return cached;
      const created = makeNodeSprite(color);
      spriteByColor.set(color, created);
      return created;
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = width * 0.5;
      cy = height * 0.5;
      radius = Math.min(width, height) * 0.33;
    };

    const drawRadarGrid = () => {
      for (let level = 1; level <= levelCount; level += 1) {
        const t = level / levelCount;
        ctx.beginPath();
        SKILLS.forEach((_, i) => {
          const angle = -Math.PI / 2 + (i / SKILLS.length) * Math.PI * 2;
          const x = cx + Math.cos(angle) * radius * t;
          const y = cy + Math.sin(angle) * radius * t;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.strokeStyle = `rgba(125,211,252,${0.08 + t * 0.08})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      SKILLS.forEach((_, i) => {
        const angle = -Math.PI / 2 + (i / SKILLS.length) * Math.PI * 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "rgba(148,163,184,0.18)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    };

    const updateNodePositions = (pulse: number) => {
      SKILLS.forEach((skill, i) => {
        const angle = -Math.PI / 2 + (i / SKILLS.length) * Math.PI * 2;
        const pctRadius = (skill.pct / 100) * radius * (1 + pulse);
        nodePositions[i].x = cx + Math.cos(angle) * pctRadius;
        nodePositions[i].y = cy + Math.sin(angle) * pctRadius;
      });
    };

    const resolveHover = () => {
      hovered = -1;
      if (!pointer.inside) return;
      for (let i = 0; i < nodePositions.length; i += 1) {
        const p = nodePositions[i];
        if (Math.hypot(pointer.x - p.x, pointer.y - p.y) <= 16) {
          hovered = i;
          break;
        }
      }
    };

    const drawDataShape = () => {
      const g = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
      g.addColorStop(0, "rgba(45,212,191,0.3)");
      g.addColorStop(1, "rgba(59,130,246,0.22)");

      ctx.beginPath();
      nodePositions.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = "rgba(94,234,212,0.85)";
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawNodesAndLabels = () => {
      SKILLS.forEach((skill, i) => {
        const p = nodePositions[i];
        const sprite = getSprite(skill.col);
        const spriteSize = hovered === i ? 34 : 28;
        ctx.drawImage(sprite, p.x - spriteSize / 2, p.y - spriteSize / 2, spriteSize, spriteSize);

        const angle = -Math.PI / 2 + (i / SKILLS.length) * Math.PI * 2;
        const lx = cx + Math.cos(angle) * (radius + 38);
        const ly = cy + Math.sin(angle) * (radius + 38);

        ctx.fillStyle = hovered === i ? "rgba(236,253,245,0.98)" : "rgba(226,232,240,0.86)";
        ctx.font = hovered === i ? "700 12px JetBrains Mono, monospace" : "600 11px JetBrains Mono, monospace";
        ctx.textAlign = "center";
        ctx.fillText(skill.name, lx, ly);
      });
    };

    const drawTooltip = () => {
      if (hovered < 0) return;
      const skill = SKILLS[hovered];
      const p = nodePositions[hovered];
      const text = `${skill.name} ${skill.pct}%`;
      const info = skill.desc;

      ctx.font = "700 12px JetBrains Mono, monospace";
      const w1 = ctx.measureText(text).width;
      ctx.font = "500 11px JetBrains Mono, monospace";
      const w2 = ctx.measureText(info).width;
      const boxW = Math.max(w1, w2) + 22;
      const boxH = 44;
      const bx = Math.min(width - boxW - 8, Math.max(8, p.x + 16));
      const by = Math.min(height - boxH - 8, Math.max(8, p.y - boxH - 6));

      ctx.fillStyle = "rgba(15,23,42,0.92)";
      ctx.strokeStyle = "rgba(45,212,191,0.45)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(bx, by, boxW, boxH, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "rgba(236,253,245,0.98)";
      ctx.font = "700 12px JetBrains Mono, monospace";
      ctx.textAlign = "left";
      ctx.fillText(text, bx + 10, by + 17);

      ctx.fillStyle = "rgba(203,213,225,0.9)";
      ctx.font = "500 11px JetBrains Mono, monospace";
      ctx.fillText(info, bx + 10, by + 33);
    };

    const draw = (ts: number) => {
      if (!running) return;

      if (!lastTs) lastTs = ts;
      if (ts - lastTs < frameBudgetMs) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastTs = ts;

      ctx.clearRect(0, 0, width, height);
      drawRadarGrid();

      const pulse = Math.sin(ts * 0.0015) * 0.02;
      updateNodePositions(pulse);
      resolveHover();
      drawDataShape();
      drawNodesAndLabels();
      drawTooltip();

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || !inView || !tabVisible) return;
      running = true;
      lastTs = 0;
      raf = requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onVisibility = () => {
      tabVisible = document.visibilityState === "visible";
      if (tabVisible) start();
      else stop();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        inView = Boolean(entries[0]?.isIntersecting);
        if (inView) start();
        else stop();
      },
      { threshold: 0.12 },
    );

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.inside = true;
    };

    const onPointerLeave = () => {
      pointer.inside = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    observer.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave, { passive: true });
    start();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="rounded-2xl border border-cyan-300/20 bg-[#0A1020]/80 p-4 md:p-6">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-cyan-200 md:text-base">Radar Skill Matrix</p>
        <p className="text-[10px] font-mono tracking-[0.2em] text-gray-400 md:text-xs">LIVE</p>
      </div>
      <canvas ref={canvasRef} className="h-[260px] w-full rounded-xl bg-[#060B16] md:h-[320px]" />
    </div>
  );
}
