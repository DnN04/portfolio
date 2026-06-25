// Ambient background effects: gradient blobs, particle canvas, grid overlay
import { useEffect, useRef } from "react";

/* ── Particle canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    const PARTICLE_COUNT = 50;

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      size: number; opacity: number;
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(53, 53%, 84%, ${p.opacity})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.5 }}
      aria-hidden
    />
  );
}

/* ── Main background component ── */
export const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Particle system */}
      <ParticleCanvas />



      {/* Ambient gradient blobs */}
      <div
        className="ambient-blob z-[3]"
        style={{
          width: "600px",
          height: "600px",
          top: "10%",
          right: "10%",
          background: "radial-gradient(circle, hsla(53, 53%, 84%, 0.06) 0%, transparent 70%)",
          animationDuration: "10s",
          animationDelay: "0s",
        }}
      />
      <div
        className="ambient-blob z-[3]"
        style={{
          width: "500px",
          height: "500px",
          bottom: "20%",
          left: "5%",
          background: "radial-gradient(circle, hsla(53, 40%, 60%, 0.05) 0%, transparent 70%)",
          animationDuration: "14s",
          animationDelay: "-4s",
        }}
      />
      <div
        className="ambient-blob z-[3]"
        style={{
          width: "400px",
          height: "400px",
          top: "50%",
          left: "40%",
          background: "radial-gradient(circle, hsla(53, 53%, 84%, 0.04) 0%, transparent 70%)",
          animationDuration: "18s",
          animationDelay: "-8s",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[4]"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, hsla(60, 4%, 9.8%, 0.6) 100%)",
        }}
      />
    </div>
  );
};
