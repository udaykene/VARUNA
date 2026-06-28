import { motion, useSpring, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Animated counter hook
export function useAnimatedCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

// Background Beams Canvas Component
export function BackgroundBeams() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let t = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const beams = Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * Math.PI * 2,
      speed: 0.002 + Math.random() * 0.004,
      opacity: 0.08 + Math.random() * 0.15,
      width: 1 + Math.random() * 2,
      length: 0.4 + Math.random() * 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.005;

      beams.forEach((b) => {
        const angle = b.angle + t * b.speed * 100;
        const cx = w * 0.5;
        const cy = h * 0.4;
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);
        const len = Math.max(w, h) * b.length;

        const grad = ctx.createLinearGradient(cx, cy, cx + dx * len, cy + dy * len);
        grad.addColorStop(0, `rgba(56,189,248,${b.opacity})`);
        grad.addColorStop(0.45, `rgba(20,184,166,${b.opacity * 0.5})`);
        grad.addColorStop(1, `rgba(255,255,255,0)`);

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + dx * len, cy + dy * len);
        ctx.strokeStyle = grad;
        ctx.lineWidth = b.width;
        ctx.stroke();
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
      style={{ zIndex: 0 }}
    />
  );
}

// Spotlight (mouse-follow radial glow)
export function Spotlight() {
  const [pos, setPos] = useState({ x: '50%', y: '40%' });

  useEffect(() => {
    const handler = (e) => {
      setPos({ x: `${e.clientX}px`, y: `${e.clientY}px` });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background: `radial-gradient(600px circle at ${pos.x} ${pos.y}, rgba(56,189,248,0.18), rgba(20,184,166,0.08) 40%, transparent 70%)`,
        zIndex: 1,
      }}
    />
  );
}

// Grid background pattern
export function GridPattern() {
  return (
    <div
      className="absolute inset-0 opacity-[0.16] pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(14,165,233,0.55) 1px, transparent 1px),
          linear-gradient(90deg, rgba(14,165,233,0.55) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        zIndex: 0,
      }}
    />
  );
}

// Page transition wrapper
export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// Glowing separator
export function GlowSeparator({ className = '' }) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
      <div className="mx-4 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_2px_rgba(56,189,248,0.35)]" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
    </div>
  );
}
