"use client";

import { useEffect, useRef } from "react";
import { clamp, prefersReducedMotion } from "@/lib/motion";

type Particle = { x: number; y: number; r: number; vx: number; vy: number; t: number };

/** Dust particles drifting inside the light beam. */
export default function Dust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || prefersReducedMotion()) return;

    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, running = false;
    let particles: Particle[] = [];

    const coneHalf = (y: number) => (0.1 + 0.4 * (y / h)) * w;
    const spawn = (anywhere: boolean): Particle => {
      const y = anywhere ? Math.random() * h * 0.85 : -5;
      return {
        y,
        x: w / 2 + (Math.random() * 2 - 1) * coneHalf(Math.max(y, 0)),
        r: Math.random() * 1.3 + 0.3,
        vy: Math.random() * 0.18 + 0.04,
        vx: (Math.random() - 0.5) * 0.12,
        t: Math.random() * Math.PI * 2,
      };
    };

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: 80 }, () => spawn(true));
    };

    const frame = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx + Math.sin((p.t += 0.01)) * 0.08;
        if (p.y > h * 0.85) Object.assign(p, spawn(false));
        const a = (1 - p.y / (h * 0.85)) * (0.45 + 0.4 * Math.sin(p.t * 3));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${clamp(a)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    resize();
    addEventListener("resize", resize);
    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas.closest("section") ?? canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="beam__dust" />;
}
