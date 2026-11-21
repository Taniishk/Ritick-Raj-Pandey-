import { useEffect, useRef } from 'react';

export interface ActiveScreenEffects {
  shortCircuit: boolean;
  aurora: boolean;
  meteors: boolean;
  fireflies: boolean;
  bubbles: boolean;
  confetti: boolean;
}

interface AmbientFxCanvasProps {
  effects: ActiveScreenEffects;
  shortCircuitPulse: number;
}

interface BoltArc {
  points: Array<{ x: number; y: number }>;
  branches: Array<Array<{ x: number; y: number }>>;
  color: string;
  alpha: number;
  width: number;
}

interface MeteorItem {
  x: number;
  y: number;
  len: number;
  speed: number;
  alpha: number;
}

interface AmbientDot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  color: string;
}

function buildJaggedPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  segments = 11,
  jaggedness = 34,
): Array<{ x: number; y: number }> {
  const pts: Array<{ x: number; y: number }> = [{ x: x1, y: y1 }];
  for (let i = 1; i < segments; i += 1) {
    const t = i / segments;
    const bx = x1 + (x2 - x1) * t + (Math.random() - 0.5) * jaggedness;
    const by = y1 + (y2 - y1) * t + (Math.random() - 0.5) * jaggedness;
    pts.push({ x: bx, y: by });
  }
  pts.push({ x: x2, y: y2 });
  return pts;
}

function createBolt(w: number, h: number): BoltArc {
  const palette = ['#f472b6', '#38bdf8', '#fde047', '#c084fc'];
  const edgeStart = Math.random() > 0.5;
  const x1 = edgeStart ? Math.random() * w : (Math.random() > 0.5 ? 0 : w);
  const y1 = edgeStart ? (Math.random() > 0.5 ? 0 : h) : Math.random() * h;
  const x2 = w * (0.2 + Math.random() * 0.6);
  const y2 = h * (0.18 + Math.random() * 0.64);
  const main = buildJaggedPath(x1, y1, x2, y2, 12, 42);
  const branches: Array<Array<{ x: number; y: number }>> = [];
  for (let b = 0; b < 2; b += 1) {
    const pivot = main[3 + b * 3];
    if (pivot) {
      branches.push(
        buildJaggedPath(
          pivot.x,
          pivot.y,
          pivot.x + (Math.random() - 0.5) * 160,
          pivot.y + (Math.random() - 0.5) * 140,
          6,
          24,
        ),
      );
    }
  }
  return {
    points: main,
    branches,
    color: palette[Math.floor(Math.random() * palette.length)],
    alpha: 1,
    width: 1.8 + Math.random() * 1.8,
  };
}

export function AmbientFxCanvas({ effects, shortCircuitPulse }: AmbientFxCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const boltsRef = useRef<BoltArc[]>([]);
  const pulseDecayRef = useRef(0);

  const anyActive =
    effects.shortCircuit ||
    effects.aurora ||
    effects.meteors ||
    effects.fireflies ||
    effects.bubbles ||
    effects.confetti;

  // Trigger instant multi-bolt short-circuit overload whenever shortCircuitPulse increments
  useEffect(() => {
    if (shortCircuitPulse === 0) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (let i = 0; i < 8; i += 1) {
      boltsRef.current.push(createBolt(w, h));
    }
    pulseDecayRef.current = 1.6; // ~1.6s vivid short-circuit arc burst
  }, [shortCircuitPulse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const w = canvas.width;
    const h = canvas.height;

    const meteors: MeteorItem[] = Array.from({ length: 7 }, () => ({
      x: Math.random() * w * 1.2,
      y: -Math.random() * h * 0.5,
      len: 75 + Math.random() * 75,
      speed: 7 + Math.random() * 5,
      alpha: 0.4 + Math.random() * 0.6,
    }));

    const fireflies: AmbientDot[] = Array.from({ length: 34 }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.65,
      vy: (Math.random() - 0.5) * 0.55,
      r: 2.2 + (i % 3) * 1.2,
      phase: i * 0.7,
      color: i % 3 === 0 ? '#f9a8d4' : '#fde047',
    }));

    const bubbles: AmbientDot[] = Array.from({ length: 24 }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.9 - (i % 4) * 0.35,
      r: 8 + (i % 5) * 5,
      phase: i * 0.9,
      color: i % 2 === 0 ? '#f472b6' : '#a5f3fc',
    }));

    const confetti: AmbientDot[] = Array.from({ length: 42 }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 1.1,
      vy: 1.5 + (i % 4) * 0.65,
      r: 4 + (i % 3) * 2.5,
      phase: i * 0.45,
      color: ['#f472b6', '#fb7185', '#fbbf24', '#c084fc', '#38bdf8'][i % 5],
    }));

    let rafId = 0;
    let lastMs = performance.now();

    const frame = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastMs) / 1000);
      lastMs = now;
      const cw = canvas.width;
      const ch = canvas.height;
      const t = now / 1000;

      if (pulseDecayRef.current > 0) {
        pulseDecayRef.current = Math.max(0, pulseDecayRef.current - dt);
      }

      const shouldDraw = anyActive || pulseDecayRef.current > 0 || boltsRef.current.length > 0;
      ctx.clearRect(0, 0, cw, ch);

      if (shouldDraw) {
        // 1. Aurora Borealis ribbons
        if (effects.aurora) {
          const ribbons = [
            { yBase: ch * 0.16, c1: 'rgba(244,114,182,0.22)', c2: 'rgba(168,85,247,0.02)', phase: 0 },
            { yBase: ch * 0.24, c1: 'rgba(56,189,248,0.18)', c2: 'rgba(244,114,182,0.02)', phase: 1.8 },
          ];
          ribbons.forEach((rb) => {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (let x = 0; x <= cw; x += 48) {
              const y = rb.yBase + Math.sin(x * 0.006 + t * 0.9 + rb.phase) * 44;
              ctx.lineTo(x, y);
            }
            ctx.lineTo(cw, 0);
            ctx.closePath();
            const grad = ctx.createLinearGradient(0, 0, 0, rb.yBase + 60);
            grad.addColorStop(0, rb.c2);
            grad.addColorStop(0.65, rb.c1);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.restore();
          });
        }

        // 2. Shooting Stars / Meteors
        if (effects.meteors) {
          meteors.forEach((m) => {
            m.x -= m.speed;
            m.y += m.speed * 0.72;
            if (m.x < -120 || m.y > ch + 120) {
              m.x = cw * (0.3 + Math.random() * 0.9);
              m.y = -30 - Math.random() * 140;
            }
            ctx.save();
            const grad = ctx.createLinearGradient(m.x, m.y, m.x + m.len, m.y - m.len * 0.72);
            grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
            grad.addColorStop(0.4, `rgba(244, 114, 182, ${m.alpha * 0.7})`);
            grad.addColorStop(1, 'transparent');
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2.4;
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(m.x + m.len, m.y - m.len * 0.72);
            ctx.stroke();
            ctx.restore();
          });
        }

        // 3. Golden Fireflies
        if (effects.fireflies) {
          fireflies.forEach((f) => {
            f.x = (f.x + f.vx + Math.sin(t + f.phase) * 0.35 + cw) % cw;
            f.y = (f.y + f.vy + Math.cos(t * 0.8 + f.phase) * 0.25 + ch) % ch;
            const glow = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 3 + f.phase));
            ctx.save();
            ctx.globalAlpha = glow;
            ctx.fillStyle = f.color;
            ctx.shadowColor = f.color;
            ctx.shadowBlur = 14;
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
        }

        // 4. Pastel Love Bubbles
        if (effects.bubbles) {
          bubbles.forEach((b) => {
            b.y += b.vy;
            b.x += Math.sin(t * 1.4 + b.phase) * 0.5;
            if (b.y < -b.r * 2) {
              b.y = ch + b.r * 2;
              b.x = Math.random() * cw;
            }
            ctx.save();
            ctx.globalAlpha = 0.6;
            ctx.strokeStyle = b.color;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = 'rgba(255,255,255,0.45)';
            ctx.beginPath();
            ctx.arc(b.x - b.r * 0.32, b.y - b.r * 0.32, Math.max(2, b.r * 0.22), 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
        }

        // 5. Confetti Celebration Rain
        if (effects.confetti) {
          confetti.forEach((c) => {
            c.y += c.vy;
            c.x += Math.sin(t * 2 + c.phase) * 0.85;
            if (c.y > ch + 20) {
              c.y = -20;
              c.x = Math.random() * cw;
            }
            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.rotate(t * 2.5 + c.phase);
            ctx.fillStyle = c.color;
            ctx.globalAlpha = 0.82;
            ctx.fillRect(-c.r, -c.r * 0.45, c.r * 2, c.r * 0.9);
            ctx.restore();
          });
        }

        // 6. Short-Circuit Romantic Electric Lightning Arcs!
        if ((effects.shortCircuit || pulseDecayRef.current > 0) && Math.random() < 0.22) {
          boltsRef.current.push(createBolt(cw, ch));
        }

        if (pulseDecayRef.current > 1.25) {
          ctx.save();
          ctx.fillStyle = `rgba(244, 114, 182, ${(pulseDecayRef.current - 1.25) * 0.35})`;
          ctx.fillRect(0, 0, cw, ch);
          ctx.restore();
        }

        for (let i = boltsRef.current.length - 1; i >= 0; i -= 1) {
          const bolt = boltsRef.current[i];
          bolt.alpha -= 0.045;
          if (bolt.alpha <= 0) {
            boltsRef.current.splice(i, 1);
            continue;
          }
          ctx.save();
          ctx.globalAlpha = bolt.alpha;
          ctx.strokeStyle = bolt.color;
          ctx.shadowColor = bolt.color;
          ctx.shadowBlur = 16;
          ctx.lineWidth = bolt.width;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          ctx.beginPath();
          bolt.points.forEach((pt, idx) => {
            if (idx === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          ctx.stroke();

          // White hot core
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = bolt.width * 0.42;
          ctx.stroke();

          // Secondary electric forks
          ctx.strokeStyle = bolt.color;
          ctx.lineWidth = bolt.width * 0.6;
          bolt.branches.forEach((branch) => {
            ctx.beginPath();
            branch.forEach((pt, idx) => {
              if (idx === 0) ctx.moveTo(pt.x, pt.y);
              else ctx.lineTo(pt.x, pt.y);
            });
            ctx.stroke();
          });

          ctx.restore();
        }
      }

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [anyActive, effects]);

  return (
    <canvas
      ref={canvasRef}
      data-testid="ambient-fx-canvas"
      aria-hidden="true"
      className="fixed inset-0 z-[15] pointer-events-none"
    />
  );
}
