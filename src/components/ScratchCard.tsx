import { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface ScratchCardProps {
  secretText: string;
  label?: string;
}

export function ScratchCard({ secretText, label = 'Scratch gently to reveal a secret note' }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawingRef = useRef(false);
  const strokeCountRef = useRef(0);

  useEffect(() => {
    setRevealed(false);
    strokeCountRef.current = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#f472b6');
    grad.addColorStop(0.5, '#ec4899');
    grad.addColorStop(1, '#a855f7');

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Rub / Scratch Here ✨', w / 2, h / 2);
  }, [secretText]);

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    strokeCountRef.current += 1;
    if (strokeCountRef.current >= 16 && !revealed) {
      setRevealed(true);
      soundEngine.playSparkle();
    }
  };

  return (
    <div className="w-full rounded-2xl border border-pink-300/60 bg-pink-50/90 p-3 text-center">
      <div className="mb-2 flex items-center justify-between gap-2 text-xs font-medium text-pink-900">
        <span>{label}</span>
        {!revealed && (
          <button
            type="button"
            onClick={() => {
              setRevealed(true);
              soundEngine.playSparkle();
            }}
            className="inline-flex min-h-[32px] items-center gap-1 rounded-lg bg-pink-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-pink-700"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Reveal
          </button>
        )}
      </div>

      <div className="relative h-20 w-full overflow-hidden rounded-xl border border-pink-200 bg-white flex items-center justify-center px-4">
        <p className="font-hand text-xl font-semibold text-pink-800 leading-snug">
          {secretText}
        </p>

        {!revealed && (
          <canvas
            ref={canvasRef}
            width={480}
            height={110}
            onPointerDown={(e) => {
              isDrawingRef.current = true;
              scratchAt(e.clientX, e.clientY);
            }}
            onPointerMove={(e) => {
              if (isDrawingRef.current) {
                scratchAt(e.clientX, e.clientY);
              }
            }}
            onPointerUp={() => {
              isDrawingRef.current = false;
            }}
            onPointerLeave={() => {
              isDrawingRef.current = false;
            }}
            style={{ touchAction: 'none' }}
            className="absolute inset-0 h-full w-full cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
