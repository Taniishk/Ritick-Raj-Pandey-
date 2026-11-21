import { useEffect, useRef } from 'react';
import { CursorEffectType } from '../data/scenesMeta';

export type BurstEffectMode =
  | 'hearts'
  | 'butterflies'
  | 'petals'
  | 'fireworks'
  | 'kisses'
  | 'short_circuit'
  | 'bubbles'
  | 'fireflies';

interface TrailParticle {
  kind: 'symbol' | 'spark' | 'bubble' | 'firefly';
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  rotation: number;
  vr: number;
  symbol: string;
  color: string;
  boltSegments?: Array<{ dx: number; dy: number }>;
}

interface PointerTrailOverlayProps {
  cursorEffect: CursorEffectType;
  burstTrigger: number;
  burstMode: BurstEffectMode;
}

const SYMBOLS: Record<'hearts' | 'butterflies' | 'petals' | 'stardust', string[]> = {
  hearts: ['💗', '💖', '💕', '❤️'],
  butterflies: ['🦋', '✨', '🌸'],
  petals: ['🌹', '🌸', '🌺'],
  stardust: ['✨', '⭐', '💫'],
};

const COLORS = ['#ec4899', '#f43f5e', '#c084fc', '#fbbf24', '#38bdf8', '#f472b6'];

function makeBoltSegments(): Array<{ dx: number; dy: number }> {
  const segs: Array<{ dx: number; dy: number }> = [];
  const angle = Math.random() * Math.PI * 2;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < 4; i += 1) {
    const step = 8 + Math.random() * 12;
    const jitter = (Math.random() - 0.5) * 1.1;
    cx += Math.cos(angle + jitter) * step;
    cy += Math.sin(angle + jitter) * step;
    segs.push({ dx: cx, dy: cy });
  }
  return segs;
}

export function PointerTrailOverlay({
  cursorEffect,
  burstTrigger,
  burstMode,
}: PointerTrailOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<TrailParticle[]>([]);
  const effectRef = useRef(cursorEffect);
  const lastSpawnRef = useRef(0);

  effectRef.current = cursorEffect;

  // Trigger celebratory bursts (hugs, kisses, fireworks, heart explosions, short circuit)
  useEffect(() => {
    if (burstTrigger === 0) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const count = burstMode === 'fireworks' || burstMode === 'short_circuit' ? 110 : 72;

    if (burstMode === 'short_circuit') {
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.4 + Math.random() * 6.8;
        const isSpark = i % 3 !== 0;
        particlesRef.current.push({
          kind: isSpark ? 'spark' : 'symbol',
          x: w * (0.25 + Math.random() * 0.5),
          y: h * (0.25 + Math.random() * 0.5),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: isSpark ? 3 + Math.random() * 4 : 18 + Math.random() * 14,
          alpha: 1,
          decay: 0.018 + Math.random() * 0.014,
          rotation: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.12,
          symbol: i % 6 === 0 ? '⚡' : '💗',
          color: i % 2 === 0 ? '#f472b6' : i % 3 === 0 ? '#38bdf8' : '#fde047',
          boltSegments: isSpark ? makeBoltSegments() : undefined,
        });
      }
      if (particlesRef.current.length > 280) {
        particlesRef.current.splice(0, particlesRef.current.length - 280);
      }
      return;
    }

    if (burstMode === 'bubbles') {
      for (let i = 0; i < 65; i += 1) {
        particlesRef.current.push({
          kind: 'bubble',
          x: Math.random() * w,
          y: h * (0.4 + Math.random() * 0.6),
          vx: (Math.random() - 0.5) * 1.4,
          vy: -1.6 - Math.random() * 2.4,
          size: 10 + Math.random() * 20,
          alpha: 0.9,
          decay: 0.008 + Math.random() * 0.006,
          rotation: 0,
          vr: 0,
          symbol: '',
          color: COLORS[i % COLORS.length],
        });
      }
      return;
    }

    if (burstMode === 'fireflies') {
      for (let i = 0; i < 80; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.8 + Math.random() * 2.4;
        particlesRef.current.push({
          kind: 'firefly',
          x: w * (0.15 + Math.random() * 0.7),
          y: h * (0.2 + Math.random() * 0.65),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          size: 4 + Math.random() * 5,
          alpha: 1,
          decay: 0.009 + Math.random() * 0.007,
          rotation: 0,
          vr: 0,
          symbol: '',
          color: i % 3 === 0 ? '#f9a8d4' : '#fde047',
        });
      }
      return;
    }

    const modeSymbols: Record<'hearts' | 'butterflies' | 'petals' | 'fireworks' | 'kisses', string[]> = {
      hearts: ['💗', '💖', '❤️', '💕', '🧸'],
      butterflies: ['🦋', '✨', '🌸', '💗'],
      petals: ['🌹', '🌸', '🌺', '💗'],
      fireworks: ['✨', '💗', '🦋', '🌹', '🎆', '💖'],
      kisses: ['💋', '😘', '💗', '💕'],
    };

    const syms = modeSymbols[burstMode];
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.8 + Math.random() * 5.2;
      const originX = burstMode === 'petals' ? Math.random() * w : w * (0.2 + Math.random() * 0.6);
      const originY = burstMode === 'petals' ? -20 - Math.random() * 80 : h * (0.35 + Math.random() * 0.45);
      particlesRef.current.push({
        kind: 'symbol',
        x: originX,
        y: originY,
        vx: burstMode === 'petals' ? (Math.random() - 0.5) * 1.8 : Math.cos(angle) * speed,
        vy: burstMode === 'petals' ? 2.2 + Math.random() * 2.5 : Math.sin(angle) * speed - 2.2,
        size: 16 + Math.random() * 18,
        alpha: 1,
        decay: burstMode === 'petals' ? 0.006 : 0.011 + Math.random() * 0.008,
        rotation: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.08,
        symbol: syms[i % syms.length],
        color: COLORS[i % COLORS.length],
      });
    }
    if (particlesRef.current.length > 260) {
      particlesRef.current.splice(0, particlesRef.current.length - 260);
    }
  }, [burstTrigger, burstMode]);

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

    const spawnAt = (x: number, y: number) => {
      const now = performance.now();
      if (now - lastSpawnRef.current < 36) return;
      lastSpawnRef.current = now;
      const mode = effectRef.current;

      if (mode === 'short_circuit') {
        particlesRef.current.push({
          kind: 'spark',
          x,
          y,
          vx: (Math.random() - 0.5) * 3.5,
          vy: (Math.random() - 0.5) * 3.5,
          size: 3 + Math.random() * 3,
          alpha: 1,
          decay: 0.045,
          rotation: 0,
          vr: 0,
          symbol: '',
          color: Math.random() > 0.5 ? '#f472b6' : Math.random() > 0.5 ? '#38bdf8' : '#fde047',
          boltSegments: makeBoltSegments(),
        });
      } else if (mode === 'fireflies') {
        particlesRef.current.push({
          kind: 'firefly',
          x,
          y,
          vx: (Math.random() - 0.5) * 1.1,
          vy: -0.7 - Math.random() * 0.9,
          size: 4 + Math.random() * 4,
          alpha: 0.95,
          decay: 0.02,
          rotation: 0,
          vr: 0,
          symbol: '',
          color: Math.random() > 0.35 ? '#fde047' : '#f9a8d4',
        });
      } else if (mode === 'bubbles') {
        particlesRef.current.push({
          kind: 'bubble',
          x,
          y,
          vx: (Math.random() - 0.5) * 1.1,
          vy: -1.3 - Math.random() * 1.3,
          size: 8 + Math.random() * 12,
          alpha: 0.85,
          decay: 0.015,
          rotation: 0,
          vr: 0,
          symbol: '',
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      } else {
        const syms = SYMBOLS[mode];
        particlesRef.current.push({
          kind: 'symbol',
          x,
          y,
          vx: (Math.random() - 0.5) * 1.4,
          vy: -1.1 - Math.random() * 1.4,
          size: 14 + Math.random() * 10,
          alpha: 0.95,
          decay: 0.022,
          rotation: (Math.random() - 0.5) * 0.5,
          vr: (Math.random() - 0.5) * 0.05,
          symbol: syms[Math.floor(Math.random() * syms.length)],
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }

      if (particlesRef.current.length > 240) {
        particlesRef.current.shift();
      }
    };

    const onPointerMove = (e: PointerEvent) => spawnAt(e.clientX, e.clientY);
    const onPointerDown = (e: PointerEvent) => {
      spawnAt(e.clientX, e.clientY);
      spawnAt(e.clientX + 8, e.clientY - 6);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    let rafId = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const arr = particlesRef.current;
      for (let i = arr.length - 1; i >= 0; i -= 1) {
        const p = arr[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.kind === 'symbol') {
          p.vy += 0.03;
        } else if (p.kind === 'bubble') {
          p.vx += Math.sin(p.y * 0.05) * 0.04;
        }
        p.rotation += p.vr;
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          arr.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);

        if (p.kind === 'spark') {
          ctx.translate(p.x, p.y);
          ctx.strokeStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          p.boltSegments?.forEach((seg) => ctx.lineTo(seg.dx, seg.dy));
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, 0, Math.max(1.5, p.size * 0.45), 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === 'bubble') {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = 'rgba(255,255,255,0.45)';
          ctx.beginPath();
          ctx.arc(p.x - p.size * 0.35, p.y - p.size * 0.35, Math.max(1.5, p.size * 0.2), 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === 'firefly') {
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.font = `${Math.round(p.size)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.symbol, 0, 0);
        }

        ctx.restore();
      }
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-40 pointer-events-none"
    />
  );
}
