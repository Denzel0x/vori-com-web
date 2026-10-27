"use client";

import { useEffect, useRef, useState } from "react";

type Particle = { id: number; x: number; y: number; color: string };

const colors = ["#b5a9ff", "#8a7cff", "#6f5cff", "#7fb5ff"];

export default function CursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || coarsePointer) return;

    function handleMove(e: MouseEvent) {
      const last = lastPos.current;
      const dx = last ? e.clientX - last.x : 999;
      const dy = last ? e.clientY - last.y : 999;
      if (Math.hypot(dx, dy) < 14) return;
      lastPos.current = { x: e.clientX, y: e.clientY };

      if (ticking.current) return;
      ticking.current = true;
      const { clientX, clientY } = e;
      requestAnimationFrame(() => {
        const id = idRef.current++;
        const color = colors[id % colors.length];
        setParticles((prev) => [...prev.slice(-24), { id, x: clientX, y: clientY, color }]);
        ticking.current = false;
        window.setTimeout(() => setParticles((prev) => prev.filter((p) => p.id !== id)), 650);
      });
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="trail-dot absolute h-2 w-2 rounded-full"
          style={{ left: p.x, top: p.y, backgroundColor: p.color, boxShadow: `0 0 8px ${p.color}` }}
        />
      ))}
    </div>
  );
}
