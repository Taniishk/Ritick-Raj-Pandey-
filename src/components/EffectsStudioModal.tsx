import { Sparkles, X, Zap } from 'lucide-react';
import { CursorEffectType } from '../data/scenesMeta';
import { ActiveScreenEffects } from './AmbientFxCanvas';
import { BurstEffectMode } from './PointerTrailOverlay';
import { soundEngine } from '../audio/soundEngine';

interface EffectsStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeEffects: ActiveScreenEffects;
  onToggleEffect: (key: keyof ActiveScreenEffects) => void;
  onClearEffects: () => void;
  onTriggerBurst: (mode: BurstEffectMode) => void;
  onTriggerShortCircuit: () => void;
  cursorEffect: CursorEffectType;
  onSelectCursorEffect: (effect: CursorEffectType) => void;
}

const SCREEN_TOGGLES: Array<{
  key: keyof ActiveScreenEffects;
  icon: string;
  label: string;
  desc: string;
}> = [
  { key: 'shortCircuit', icon: '⚡', label: 'Short Circuit', desc: 'Electric pink & gold love arcs' },
  { key: 'aurora', icon: '🌌', label: 'Aurora Sky', desc: 'Dreamy northern lights ribbons' },
  { key: 'meteors', icon: '🌠', label: 'Shooting Stars', desc: 'Wish-upon-a-star meteors' },
  { key: 'fireflies', icon: '✨', label: 'Fireflies', desc: 'Warm glowing night fireflies' },
  { key: 'bubbles', icon: '🫧', label: 'Love Bubbles', desc: 'Floating iridescent bubbles' },
  { key: 'confetti', icon: '🎊', label: 'Confetti Rain', desc: 'Celebration sparkles & petals' },
];

const POINTER_TRAILS: Array<{ id: CursorEffectType; label: string }> = [
  { id: 'short_circuit', label: '⚡ Electric Sparks' },
  { id: 'hearts', label: '💗 Floating Hearts' },
  { id: 'butterflies', label: '🦋 Butterflies' },
  { id: 'petals', label: '🌹 Rose Petals' },
  { id: 'stardust', label: '✨ Stardust' },
  { id: 'fireflies', label: '🌟 Fireflies' },
  { id: 'bubbles', label: '🫧 Bubbles' },
];

export function EffectsStudioModal({
  isOpen,
  onClose,
  activeEffects,
  onToggleEffect,
  onClearEffects,
  onTriggerBurst,
  onTriggerShortCircuit,
  cursorEffect,
  onSelectCursorEffect,
}: EffectsStudioModalProps) {
  if (!isOpen) return null;

  const activeCount = Object.values(activeEffects).filter(Boolean).length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Magical Visual Effects Studio"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-3 sm:p-6"
    >
      <div className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-pink-200 bg-[#fff8fb] text-[#3a0d26] shadow-2xl">
        <div className="flex items-center justify-between border-b border-pink-100 bg-gradient-to-r from-[#fff0f6] to-[#eef6ff] px-5 py-3.5">
          <div>
            <h2 className="font-display text-lg sm:text-xl font-bold text-pink-950">
              Magical Effects Studio ⚡✨
            </h2>
            <p className="text-xs text-pink-700">
              Trigger short-circuit sparks, aurora skies, shooting stars &amp; pointer magic on any world!
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close effects studio"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-pink-100 text-pink-900 hover:bg-pink-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="romantic-scroll flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* Featured Short Circuit Hero Trigger */}
          <div className="rounded-2xl border border-pink-300 bg-gradient-to-r from-[#2b0938] via-[#4a104c] to-[#1a1847] p-4 text-white shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-sky-300">
                  ⚡ High-Voltage Love Overload
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold">
                  Heart Short-Circuit Effect ⚡💗
                </h3>
                <p className="text-xs text-pink-100/90">
                  Sends glowing neon-pink, sky-blue &amp; golden electric arcs across the universe!
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onTriggerShortCircuit();
                  onClose();
                }}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-sky-500 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-lg transition-transform active:scale-95"
              >
                <Zap className="h-4 w-4 fill-current" />
                Zap Short Circuit! ⚡
              </button>
            </div>
          </div>

          {/* Instant Celebration Bursts */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-pink-700 mb-2">
              Instant Screen Bursts
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(
                [
                  { mode: 'short_circuit', label: '⚡ Electric Sparks' },
                  { mode: 'fireworks', label: '🎆 Love Fireworks' },
                  { mode: 'hearts', label: '💗 Heart Shower' },
                  { mode: 'butterflies', label: '🦋 Butterfly Burst' },
                  { mode: 'petals', label: '🌹 Rose Rain' },
                  { mode: 'kisses', label: '💋 Forehead Kisses' },
                  { mode: 'bubbles', label: '🫧 Bubble Pop' },
                  { mode: 'fireflies', label: '✨ Firefly Glow' },
                ] as const
              ).map((item) => (
                <button
                  key={item.mode}
                  type="button"
                  onClick={() => {
                    if (item.mode === 'short_circuit') {
                      onTriggerShortCircuit();
                    } else {
                      soundEngine.playSparkle();
                      onTriggerBurst(item.mode);
                    }
                  }}
                  className="min-h-[44px] rounded-xl border border-pink-200 bg-white px-3 py-2 text-xs font-bold text-pink-950 hover:bg-pink-50 active:scale-95 transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Persistent Layer Toggles */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-pink-700">
                Ambient Screen Layers ({activeCount} active)
              </h3>
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={onClearEffects}
                  className="text-xs font-semibold text-rose-600 underline hover:text-rose-800"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SCREEN_TOGGLES.map((fx) => {
                const enabled = activeEffects[fx.key];
                return (
                  <button
                    key={fx.key}
                    type="button"
                    onClick={() => {
                      onToggleEffect(fx.key);
                      if (!enabled) {
                        if (fx.key === 'shortCircuit') soundEngine.playElectricSpark();
                        else soundEngine.playSparkle();
                      }
                    }}
                    className={`flex min-h-[54px] items-center justify-between gap-2 rounded-2xl border px-3.5 py-2.5 text-left transition-all ${
                      enabled
                        ? 'border-pink-600 bg-pink-600 text-white shadow-sm'
                        : 'border-pink-200 bg-white text-pink-950 hover:bg-pink-50'
                    }`}
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-bold">
                        {fx.icon} {fx.label}
                      </div>
                      <div className={`text-[11px] ${enabled ? 'text-pink-100' : 'text-pink-700'}`}>
                        {fx.desc}
                      </div>
                    </div>
                    <span
                      className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase ${
                        enabled ? 'bg-white/20 text-white' : 'bg-pink-100 text-pink-700'
                      }`}
                    >
                      {enabled ? 'On' : 'Off'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Finger / Mouse Pointer Trail */}
          <div>
            <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-700 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              Touch &amp; Cursor Trail
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {POINTER_TRAILS.map((trail) => (
                <button
                  key={trail.id}
                  type="button"
                  onClick={() => {
                    onSelectCursorEffect(trail.id);
                    if (trail.id === 'short_circuit') soundEngine.playElectricSpark();
                    else soundEngine.playHeartPop();
                  }}
                  className={`min-h-[42px] rounded-xl border px-2.5 py-2 text-xs font-bold transition-colors ${
                    cursorEffect === trail.id
                      ? 'border-pink-600 bg-pink-600 text-white'
                      : 'border-pink-200 bg-white text-pink-900 hover:bg-pink-50'
                  }`}
                >
                  {trail.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
