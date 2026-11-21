import { useState } from 'react';
import { X, Sparkles, Lock, Check, Compass, Heart, Wand2 } from 'lucide-react';
import { CursorEffectType, SCENES_META } from '../data/scenesMeta';
import { RANDOM_COMPLIMENTS, SCRATCH_NOTES, SECRET_OBJECTS } from '../data/loveContent';
import { ScratchCard } from './ScratchCard';
import { soundEngine } from '../audio/soundEngine';

interface SceneDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentScene: number;
  visitedScenes: number[];
  revealedSecretIds: string[];
  cursorEffect: CursorEffectType;
  onSelectCursorEffect: (effect: CursorEffectType) => void;
  onSelectScene: (sceneId: number) => void;
  onResetUniverse: () => void;
}

export function SceneDrawer({
  isOpen,
  onClose,
  currentScene,
  visitedScenes,
  revealedSecretIds,
  cursorEffect,
  onSelectCursorEffect,
  onSelectScene,
  onResetUniverse,
}: SceneDrawerProps) {
  const [activeTab, setActiveTab] = useState<'chapters' | 'secrets' | 'extras'>('chapters');
  const [randomCompliment, setRandomCompliment] = useState(RANDOM_COMPLIMENTS[0]);
  const [scratchIdx, setScratchIdx] = useState(0);

  if (!isOpen) return null;

  const generateCompliment = () => {
    soundEngine.playHeartPop();
    const nextIdx = Math.floor(Math.random() * RANDOM_COMPLIMENTS.length);
    setRandomCompliment(RANDOM_COMPLIMENTS[nextIdx]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Universe Chapters and Secret Vault"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-3 sm:p-6"
    >
      <div className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-pink-200 bg-[#fff8fb] text-[#3a0d26] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-pink-100 px-5 py-4">
          <div>
            <h2 className="font-display text-xl font-bold text-pink-950">
              Sonyyy&apos;s Little Universe
            </h2>
            <p className="text-xs text-pink-700 tabular-nums">
              {visitedScenes.length} of 30 worlds explored · {revealedSecretIds.length} of 12 secrets found
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close universe map"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-pink-100 text-pink-900 hover:bg-pink-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-2 border-b border-pink-100 px-5 py-2.5 bg-pink-50/70">
          <button
            type="button"
            onClick={() => setActiveTab('chapters')}
            className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-xl px-3.5 text-xs font-semibold transition-colors ${
              activeTab === 'chapters'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-pink-800 hover:bg-pink-100'
            }`}
          >
            <Compass className="h-4 w-4" />
            30 Worlds
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('secrets')}
            className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-xl px-3.5 text-xs font-semibold transition-colors ${
              activeTab === 'secrets'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-pink-800 hover:bg-pink-100'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Secret Notes ({revealedSecretIds.length}/12)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('extras')}
            className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-xl px-3.5 text-xs font-semibold transition-colors ${
              activeTab === 'extras'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-pink-800 hover:bg-pink-100'
            }`}
          >
            <Wand2 className="h-4 w-4" />
            Magic &amp; Scratch
          </button>
        </div>

        {/* Body */}
        <div className="romantic-scroll flex-1 overflow-y-auto p-4 sm:p-5">
          {activeTab === 'chapters' && (
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {SCENES_META.map((scene) => {
                const isCurrent = scene.id === currentScene;
                const isVisited = visitedScenes.includes(scene.id);
                return (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => {
                      onSelectScene(scene.id);
                      onClose();
                    }}
                    className={`flex min-h-[54px] items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 text-left transition-all ${
                      isCurrent
                        ? 'border-pink-500 bg-pink-100/90 shadow-sm'
                        : 'border-pink-100 bg-white hover:border-pink-300 hover:bg-pink-50/70'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold text-pink-600 tabular-nums">
                        World {String(scene.id).padStart(2, '0')}
                      </div>
                      <div className="truncate text-sm font-semibold text-pink-950">
                        {scene.title}
                      </div>
                    </div>
                    {isCurrent ? (
                      <span className="shrink-0 rounded-lg bg-pink-600 px-2 py-1 text-[11px] font-semibold text-white">
                        Here
                      </span>
                    ) : isVisited ? (
                      <Check className="h-4 w-4 shrink-0 text-pink-500" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'secrets' && (
            <div className="space-y-3">
              <p className="text-sm text-pink-800">
                Look for tiny glowing clickable icons tucked inside the worlds (Stars, Butterflies, Teacups, Ribbons) to unlock all 12 hidden love messages!
              </p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {SECRET_OBJECTS.map((sec) => {
                  const found = revealedSecretIds.includes(sec.id);
                  return (
                    <div
                      key={sec.id}
                      className={`rounded-2xl border p-3.5 ${
                        found
                          ? 'border-pink-300 bg-white'
                          : 'border-pink-100 bg-pink-50/60 opacity-85'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-semibold text-pink-700">
                          {found ? `${sec.icon} ${sec.label}` : `🔒 Hidden in World ${sec.sceneId}`}
                        </span>
                        {!found && (
                          <button
                            type="button"
                            onClick={() => {
                              onSelectScene(sec.sceneId);
                              onClose();
                            }}
                            className="text-xs font-semibold text-pink-600 underline hover:text-pink-800"
                          >
                            Visit
                          </button>
                        )}
                      </div>
                      {found ? (
                        <p className="text-sm text-pink-950 leading-relaxed">{sec.message}</p>
                      ) : (
                        <p className="flex items-center gap-1.5 text-xs text-pink-600">
                          <Lock className="h-3.5 w-3.5" />
                          Tap the secret glowing object in World {sec.sceneId}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'extras' && (
            <div className="space-y-5">
              {/* Random Compliment Generator */}
              <div className="rounded-2xl border border-pink-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="font-display text-base font-bold text-pink-950">
                    Instant Sonyyy Compliment Generator
                  </h3>
                  <button
                    type="button"
                    onClick={generateCompliment}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-pink-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-pink-700"
                  >
                    <Heart className="h-3.5 w-3.5" />
                    New Compliment
                  </button>
                </div>
                <p className="rounded-xl bg-pink-50 p-3 text-sm font-medium text-pink-900">
                  &ldquo;{randomCompliment}&rdquo;
                </p>
              </div>

              {/* Scratch to Reveal */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-pink-950">
                    Scratch-to-Reveal Love Card
                  </span>
                  <button
                    type="button"
                    onClick={() => setScratchIdx((i) => (i + 1) % SCRATCH_NOTES.length)}
                    className="text-xs font-semibold text-pink-700 underline hover:text-pink-900"
                  >
                    Next Card ({scratchIdx + 1}/{SCRATCH_NOTES.length})
                  </button>
                </div>
                <ScratchCard secretText={SCRATCH_NOTES[scratchIdx]} />
              </div>

              {/* Cursor Trail Selector */}
              <div className="rounded-2xl border border-pink-200 bg-white p-4">
                <h3 className="text-sm font-semibold text-pink-950 mb-2.5">
                  Touch &amp; Cursor Trail Magic
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(
                    [
                      { id: 'hearts', label: '💗 Floating Hearts' },
                      { id: 'short_circuit', label: '⚡ Short Circuit' },
                      { id: 'butterflies', label: '🦋 Butterflies' },
                      { id: 'petals', label: '🌹 Rose Petals' },
                      { id: 'stardust', label: '✨ Stardust' },
                      { id: 'fireflies', label: '🌟 Fireflies' },
                      { id: 'bubbles', label: '🫧 Bubbles' },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectCursorEffect(item.id)}
                      className={`min-h-[44px] rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                        cursorEffect === item.id
                          ? 'border-pink-600 bg-pink-600 text-white'
                          : 'border-pink-200 bg-pink-50 text-pink-900 hover:bg-pink-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onResetUniverse();
                    onClose();
                  }}
                  className="min-h-[44px] rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                >
                  Replay From World 01
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
