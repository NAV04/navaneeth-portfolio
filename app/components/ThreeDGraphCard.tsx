"use client";

import { useEffect, useRef } from "react";

export default function ThreeDGraphCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    type SkillNode = {
      label: string;
      value: number;
      color: string;
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      r: number;
      sx: number;
      sy: number;
      sr: number;
    };

    type Packet = {
      a: number;
      b: number;
      t: number;
      speed: number;
    };

    const nodes: SkillNode[] = [
      { label: "GENERATIVE", value: 95, color: "#2fffe5", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, r: 0, sx: 0, sy: 0, sr: 0 },
      { label: "RESEARCH", value: 92, color: "#38bdf8", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, r: 0, sx: 0, sy: 0, sr: 0 },
      { label: "RAG", value: 90, color: "#a78bfa", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, r: 0, sx: 0, sy: 0, sr: 0 },
      { label: "NLP", value: 88, color: "#f472b6", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, r: 0, sx: 0, sy: 0, sr: 0 },
      { label: "BACKEND", value: 85, color: "#10b981", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, r: 0, sx: 0, sy: 0, sr: 0 },
      { label: "CLOUD", value: 80, color: "#fde047", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, r: 0, sx: 0, sy: 0, sr: 0 },
      { label: "CV", value: 82, color: "#fb923c", x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, r: 0, sx: 0, sy: 0, sr: 0 },
    ];

    const packets: Packet[] = [];
    const activeLinks: Array<{ a: number; b: number; strength: number }> = [];
    let raf = 0;
    let width = 0;
    let height = 0;
    let lastTs = 0;
    let running = false;
    let tabVisible = document.visibilityState === "visible";
    let inView = true;
    let backgroundFill: CanvasGradient | null = null;
    const isMobileViewport =
      window.matchMedia("(max-width: 768px)").matches ||
      window.matchMedia("(pointer: coarse)").matches;
    const frameBudgetMs = 1000 / (isMobileViewport ? 30 : 45);
    const maxPackets = isMobileViewport ? 10 : 16;
    const glowBlurNode = isMobileViewport ? 7 : 10;
    const glowBlurPacket = isMobileViewport ? 4 : 6;
    const linkDistance = isMobileViewport ? 0.95 : 1.05;
    const packetSpawnChance = isMobileViewport ? 0.16 : 0.22;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bounds = { x: 1, y: 0.8, z: 1 };

    const resize = () => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      backgroundFill = ctx.createRadialGradient(
        width * 0.55,
        height * 0.5,
        20,
        width * 0.55,
        height * 0.5,
        width * 0.75,
      );
      backgroundFill.addColorStop(0, "rgba(16,185,129,0.05)");
      backgroundFill.addColorStop(1, "rgba(2,6,23,0)");
    };

    const seedNodes = () => {
      nodes.forEach((n, idx) => {
        const ring = idx % 2 === 0 ? 0.65 : 0.42;
        const a = (idx / nodes.length) * Math.PI * 2;
        n.x = Math.cos(a) * ring + (Math.random() - 0.5) * 0.2;
        n.y = Math.sin(a) * ring * 0.65 + (Math.random() - 0.5) * 0.18;
        n.z = (Math.random() - 0.5) * 1.4;
        n.vx = (Math.random() - 0.5) * 0.18;
        n.vy = (Math.random() - 0.5) * 0.14;
        n.vz = (Math.random() - 0.5) * 0.16;
        n.r = 5 + (n.value - 75) * 0.22;
      });
    };

    const projectNode = (n: SkillNode) => {
      const fov = 1.9;
      const depth = (n.z + 2.2) / 3.2;
      const scale = fov / (fov + n.z + 1.2);
      n.sx = width * 0.5 + n.x * width * 0.32 * scale;
      n.sy = height * 0.53 + n.y * height * 0.55 * scale;
      n.sr = n.r * (0.72 + depth * 0.65) * scale;
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

      const dt = Math.min(0.04, (ts - lastTs) / 1000);
      lastTs = ts;
      ctx.clearRect(0, 0, width, height);

      if (backgroundFill) ctx.fillStyle = backgroundFill;
      ctx.fillRect(0, 0, width, height);

      activeLinks.length = 0;

      nodes.forEach((n) => {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.z += n.vz * dt;

        if (Math.abs(n.x) > bounds.x) {
          n.x = Math.sign(n.x) * bounds.x;
          n.vx *= -1;
        }
        if (Math.abs(n.y) > bounds.y) {
          n.y = Math.sign(n.y) * bounds.y;
          n.vy *= -1;
        }
        if (Math.abs(n.z) > bounds.z) {
          n.z = Math.sign(n.z) * bounds.z;
          n.vz *= -1;
        }

        projectNode(n);
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const d3 = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
          if (d3 > linkDistance) continue;

          const strength = 1 - d3 / linkDistance;
          activeLinks.push({ a: i, b: j, strength });

          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.strokeStyle = `rgba(45,255,229,${0.08 + strength * 0.35})`;
          ctx.lineWidth = 0.8 + strength * 1.2;
          ctx.stroke();
        }
      }

      if (!prefersReducedMotion && activeLinks.length > 0 && packets.length < maxPackets && Math.random() < packetSpawnChance) {
        const link = activeLinks[Math.floor(Math.random() * activeLinks.length)];
        packets.push({
          a: link.a,
          b: link.b,
          t: Math.random() * 0.4,
          speed: 0.35 + Math.random() * 0.55,
        });
      }

      for (let i = packets.length - 1; i >= 0; i -= 1) {
        const p = packets[i];
        const from = nodes[p.a];
        const to = nodes[p.b];
        p.t += p.speed * dt;
        if (p.t >= 1) {
          packets.splice(i, 1);
          continue;
        }

        const x = from.sx + (to.sx - from.sx) * p.t;
        const y = from.sy + (to.sy - from.sy) * p.t;
        ctx.beginPath();
        ctx.arc(x, y, 2.1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(152,255,152,0.95)";
        ctx.shadowColor = "rgba(152,255,152,0.8)";
        ctx.shadowBlur = glowBlurPacket;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      const sorted = [...nodes].sort((a, b) => a.z - b.z);
      sorted.forEach((n) => {
        const g = ctx.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, n.sr * 2.5);
        g.addColorStop(0, `${n.color}F0`);
        g.addColorStop(0.38, `${n.color}99`);
        g.addColorStop(1, `${n.color}00`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, n.sr * 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.sx, n.sy, n.sr, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = glowBlurNode;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = "rgba(236,253,245,0.95)";
        ctx.font = "700 11px JetBrains Mono, monospace";
        ctx.textAlign = "center";
        ctx.fillText(`${n.value}%`, n.sx, n.sy - n.sr - 8);

        ctx.fillStyle = "rgba(226,232,240,0.88)";
        ctx.font = "700 10px JetBrains Mono, monospace";
        ctx.fillText(n.label, n.sx, n.sy + n.sr + 14);
      });

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
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
    };

    const observer = new IntersectionObserver(
      (entries) => {
        inView = Boolean(entries[0]?.isIntersecting);
      },
      { threshold: 0.1 },
    );

    resize();
    seedNodes();
    observer.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    start();
    window.addEventListener("resize", resize);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="rounded-2xl border border-cyan-300/20 bg-[#0A1020]/80 p-4 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm md:text-base font-semibold text-cyan-200">Skill Constellation Map</p>
        <p className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-gray-400">3D LIVE</p>
      </div>
      <canvas ref={canvasRef} className="w-full h-[220px] md:h-[260px] rounded-xl bg-[#060B16]" />
    </div>
  );
}
