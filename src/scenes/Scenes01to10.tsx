import { useMemo, useState } from 'react';
import { Heart, Sparkles, Crown, Smile, HandHeart, Candy, Zap } from 'lucide-react';
import { SceneMeta } from '../data/scenesMeta';
import {
  BLUSH_MACHINE_COMPLIMENTS,
  CHOCOLATE_TREATS,
  HUNDRED_REASONS,
  ReasonCategory,
} from '../data/loveContent';
import { SceneVisualFlags } from '../three/UniverseCanvas';
import { BurstEffectMode } from '../components/PointerTrailOverlay';
import { StudioTabId } from '../utils/universeLogic';
import { soundEngine } from '../audio/soundEngine';

export interface SceneRenderProps {
  meta: SceneMeta;
  onNext: () => void;
  onStartMusicIfIdle: () => void;
  triggerBurst: (mode: BurstEffectMode) => void;
  updateVisualFlags: (patch: Partial<SceneVisualFlags>) => void;
  visualFlags: SceneVisualFlags;
  revealedReasonIds: number[];
  onRevealReason: (id: number) => void;
  onRevealAllReasons?: () => void;
  questionChoices: Record<string, 'A' | 'B'>;
  onChooseQuestion: (qId: string, choice: 'A' | 'B') => void;
  unlockedPromisesCount: number;
  onUnlockNextPromise: () => void;
  giftOpened: boolean;
  onOpenGift: () => void;
  finalHugGiven: boolean;
  onGiveFinalHug: () => void;
  onReplayUniverse: () => void;
  onTriggerShortCircuit?: () => void;
  onOpenStudio?: (tab: StudioTabId) => void;
}

export function Scene01Entrance({ meta, onNext, onStartMusicIfIdle, triggerBurst }: SceneRenderProps) {
  const handleEnter = () => {
    soundEngine.playGiftOpen();
    onStartMusicIfIdle();
    triggerBurst('butterflies');
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-end min-h-[calc(100vh-150px)] pb-2 text-center">
      <div
        className="w-full max-w-xl rounded-3xl border p-5 sm:p-7 shadow-xl"
        style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: meta.accentHex }}>
          30 little worlds · One very special girl
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold leading-snug mb-3" style={{ color: meta.textPrimary }}>
          Welcome to your little universe, Sonyyy 💗
        </h1>
        <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: meta.textSecondary }}>
          Someone has created an entire magical world just to steal a little smile from your beautiful face.
        </p>
        <button
          type="button"
          onClick={handleEnter}
          className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-2xl px-8 py-3 text-base font-bold text-white shadow-lg transition-transform active:scale-95 hover:scale-[1.02]"
          style={{ background: meta.buttonGradient }}
        >
          <Sparkles className="h-5 w-5" />
          ENTER MY WORLD ✨
        </button>
      </div>
    </div>
  );
}

export function Scene02Apology({ meta, triggerBurst, updateVisualFlags }: SceneRenderProps) {
  const [hugSent, setHugSent] = useState(false);

  const handleHug = () => {
    setHugSent(true);
    soundEngine.playHugWarmth();
    triggerBurst('hearts');
    updateVisualFlags({ hugActive: true });
    window.setTimeout(() => updateVisualFlags({ hugActive: false }), 2400);
  };

  return (
    <div className="flex flex-col items-center justify-end min-h-[calc(100vh-150px)] pb-2">
      <div
        className="w-full max-w-xl rounded-3xl border p-5 sm:p-7 shadow-xl text-center"
        style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
      >
        <p className="font-hand text-2xl font-bold mb-1" style={{ color: meta.accentHex }}>
          A handwritten note from my heart
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: meta.textPrimary }}>
          My sweetest Sonyyy
        </h1>
        <p className="font-hand text-xl sm:text-2xl leading-relaxed mb-5" style={{ color: meta.textSecondary }}>
          I know words cannot instantly erase the moments that hurt you, but I genuinely want to understand your feelings and make things better. You deserve softness even on your difficult days.
        </p>

        <button
          type="button"
          onClick={handleHug}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl px-7 py-3 text-sm sm:text-base font-bold text-white shadow-md transition-transform active:scale-95"
          style={{ background: meta.buttonGradient }}
        >
          <HandHeart className="h-5 w-5" />
          {hugSent ? 'Sending Another Warm Hug 🫂💗' : 'Accept a Virtual Hug 🫂💗'}
        </button>

        {hugSent && (
          <p className="mt-3 text-sm font-semibold animate-float-slow" style={{ color: meta.accentHex }}>
            Wrapping you gently right now—take all the time your heart needs 🤍
          </p>
        )}
      </div>
    </div>
  );
}

export function Scene03Grumpy({ meta, triggerBurst, updateVisualFlags, visualFlags }: SceneRenderProps) {
  const melted = Boolean(visualFlags.grumpyMelted);

  const handleSmile = () => {
    soundEngine.playSparkle();
    triggerBurst('hearts');
    updateVisualFlags({ grumpyMelted: true });
  };

  return (
    <div className="flex flex-col items-center justify-end min-h-[calc(100vh-150px)] pb-2">
      <div
        className="w-full max-w-xl rounded-3xl border p-5 sm:p-7 shadow-xl text-center"
        style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
      >
        <div className="mb-2 text-2xl">{melted ? '🌈🧸🍫🌹' : '😤☁️ ➔ 🧸💐🍫'}</div>
        <h1 className="font-display text-xl sm:text-2xl font-bold mb-2.5" style={{ color: meta.textPrimary }}>
          Okayyyyy my prettiest little grumpy human 😭💗
        </h1>
        <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: meta.textSecondary }}>
          I surrender completely to those cute angry expressions of yours. But even when you&apos;re mad at me, you are still my favourite little person.
        </p>

        <button
          type="button"
          onClick={handleSmile}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl px-7 py-3 text-sm sm:text-base font-bold text-white shadow-md transition-transform active:scale-95"
          style={{ background: meta.buttonGradient }}
        >
          <Smile className="h-5 w-5" />
          {melted ? 'Angry Cloud Melted! Tiny Smile Unlocked 😌💗' : 'Melt That Angry Cloud 😊💗'}
        </button>

        {melted && (
          <p className="mt-3 text-sm font-semibold" style={{ color: meta.accentHex }}>
            Aha! Caught that tiny cute smile trying to sneak out! Mission 100% succeeded 🧸✨
          </p>
        )}
      </div>
    </div>
  );
}

export function Scene04GiantHug({ meta, triggerBurst, updateVisualFlags, visualFlags }: SceneRenderProps) {
  const [hugCount, setHugCount] = useState(0);

  const handleHugMe = () => {
    setHugCount((c) => c + 1);
    soundEngine.playHugWarmth();
    triggerBurst('hearts');
    updateVisualFlags({ hugActive: true });
    window.setTimeout(() => updateVisualFlags({ hugActive: false }), 2600);
  };

  return (
    <div className="flex flex-col items-center justify-end min-h-[calc(100vh-150px)] pb-2">
      <div
        className="w-full max-w-xl rounded-3xl border p-5 sm:p-7 shadow-xl text-center"
        style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
      >
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2.5" style={{ color: meta.textPrimary }}>
          The Giant Teddy Hug 🧸💗
        </h1>
        <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: meta.textSecondary }}>
          If I could teleport one thing to you right now, it would be the longest warmest safest hug everrr 🧸💗
        </p>

        <button
          type="button"
          onClick={handleHugMe}
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl px-9 py-3.5 text-base font-bold text-white shadow-lg transition-transform active:scale-95 hover:scale-[1.03]"
          style={{ background: meta.buttonGradient }}
        >
          <Heart className="h-5 w-5 fill-current" />
          HUG ME
        </button>

        {hugCount > 0 && (
          <p className="mt-3 text-sm font-semibold tabular-nums" style={{ color: meta.accentHex }}>
            {visualFlags.hugActive
              ? 'Squeezing you tight right now!! 🫂💗'
              : `Hugs teleported so far: ${hugCount} (unlimited refills!)`}
          </p>
        )}
      </div>
    </div>
  );
}

export function Scene05ButterflyParadise({
  meta,
  triggerBurst,
  updateVisualFlags,
  visualFlags,
}: SceneRenderProps) {
  const gathered = visualFlags.butterflyHeartFormation ?? true;

  const toggleFormation = () => {
    soundEngine.playSparkle();
    triggerBurst('butterflies');
    updateVisualFlags({ butterflyHeartFormation: !gathered });
  };

  return (
    <div className="flex flex-col items-center justify-end min-h-[calc(100vh-150px)] pb-2">
      <div className="mb-3 pointer-events-none select-none text-center">
        <div
          className="font-display text-3xl sm:text-5xl font-bold tracking-wide"
          style={{ color: meta.textPrimary }}
        >
          🦋 Sonyyy 🦋
        </div>
      </div>

      <div
        className="w-full max-w-xl rounded-3xl border p-5 sm:p-7 shadow-xl text-center"
        style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
      >
        <h1 className="font-display text-xl sm:text-2xl font-bold mb-2.5" style={{ color: meta.textPrimary }}>
          Butterfly Paradise
        </h1>
        <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: meta.textSecondary }}>
          Even the most beautiful garden would still be missing something without you in it.
        </p>
        <button
          type="button"
          onClick={toggleFormation}
          className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl px-6 py-2.5 text-sm font-bold text-white shadow-md transition-transform active:scale-95"
          style={{ background: meta.buttonGradient }}
        >
          <Sparkles className="h-4 w-4" />
          {gathered ? 'Let Butterflies Dance Freely 🦋' : 'Gather Into a Giant Heart 💗'}
        </button>
      </div>
    </div>
  );
}

const CATEGORIES: ('All' | ReasonCategory)[] = [
  'All',
  'Her Smile',
  'Personality',
  'Her Voice',
  'Kindness',
  'Little Habits',
  'Expressions',
  'Intelligence',
  'Beauty',
  'Innocence',
  'Emotional Depth',
  'Her Presence',
  'Uniqueness',
];

export function Scene06HundredReasons({
  meta,
  revealedReasonIds,
  onRevealReason,
  onRevealAllReasons,
  triggerBurst,
}: SceneRenderProps) {
  const [selectedCat, setSelectedCat] = useState<'All' | ReasonCategory>('All');
  const [spotlightId, setSpotlightId] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      selectedCat === 'All'
        ? HUNDRED_REASONS
        : HUNDRED_REASONS.filter((r) => r.category === selectedCat),
    [selectedCat],
  );

  const revealRandom = () => {
    const unrevealed = HUNDRED_REASONS.filter((r) => !revealedReasonIds.includes(r.id));
    const pool = unrevealed.length > 0 ? unrevealed : HUNDRED_REASONS;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    onRevealReason(pick.id);
    setSpotlightId(pick.id);
    soundEngine.playHeartPop();
    triggerBurst('hearts');
  };

  const spotlightReason = spotlightId ? HUNDRED_REASONS.find((r) => r.id === spotlightId) : null;

  return (
    <div
      className="w-full max-w-4xl mx-auto rounded-3xl border p-4 sm:p-6 shadow-xl flex flex-col max-h-[calc(100vh-146px)]"
      style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold" style={{ color: meta.textPrimary }}>
            100 Reasons I Adore Sonyyy
          </h1>
          <p className="text-xs sm:text-sm tabular-nums" style={{ color: meta.textSecondary }}>
            Tap any heart card to open it · {revealedReasonIds.length} / 100 opened
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={revealRandom}
            className="min-h-[40px] rounded-xl px-3.5 py-2 text-xs font-bold text-white shadow-sm"
            style={{ background: meta.buttonGradient }}
          >
            Open Random Heart 💗
          </button>
          {onRevealAllReasons && revealedReasonIds.length < 100 && (
            <button
              type="button"
              onClick={() => {
                onRevealAllReasons();
                soundEngine.playGiftOpen();
                triggerBurst('hearts');
              }}
              className="min-h-[40px] rounded-xl border border-pink-300 bg-white px-3 py-2 text-xs font-semibold text-pink-800 hover:bg-pink-50"
            >
              Open All 100
            </button>
          )}
        </div>
      </div>

      {spotlightReason && (
        <div className="mb-3 rounded-2xl border border-pink-300 bg-pink-50/95 px-4 py-2.5 text-sm text-pink-950">
          <span className="font-bold text-pink-700">
            #{spotlightReason.id} · {spotlightReason.category}:{' '}
          </span>
          {spotlightReason.text}
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 romantic-scroll shrink-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCat(cat)}
            className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              selectedCat === cat
                ? 'bg-pink-600 text-white'
                : 'bg-white/90 text-pink-900 border border-pink-200 hover:bg-pink-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 100 Interactive Heart Cards */}
      <div className="romantic-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 overflow-y-auto pr-1">
        {filtered.map((item) => {
          const isOpen = revealedReasonIds.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onRevealReason(item.id);
                setSpotlightId(item.id);
                soundEngine.playHeartPop();
              }}
              className={`min-h-[76px] rounded-2xl border p-3 text-left transition-all ${
                isOpen
                  ? 'border-pink-300 bg-white shadow-sm'
                  : 'border-pink-200/80 bg-pink-100/75 hover:bg-pink-100'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold text-pink-700 mb-1 tabular-nums">
                <span>
                  💗 #{String(item.id).padStart(3, '0')} · {item.category}
                </span>
                <span>{isOpen ? 'Opened' : 'Tap'}</span>
              </div>
              <p className="text-xs sm:text-sm leading-snug text-pink-950">
                {isOpen ? item.text : 'Tap this heart to reveal reason #' + item.id}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Scene07Princess({ meta, triggerBurst }: SceneRenderProps) {
  const [crowned, setCrowned] = useState(false);

  return (
    <div className="flex flex-col items-center justify-end min-h-[calc(100vh-150px)] pb-2">
      <div
        className="w-full max-w-xl rounded-3xl border p-5 sm:p-7 shadow-xl text-center"
        style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
      >
        <div className="mb-2 inline-flex items-center gap-1.5 text-amber-700 font-semibold text-xs uppercase tracking-widest">
          <Crown className="h-4 w-4" />
          Royal Decree for Sonyyy
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: meta.textPrimary }}>
          My Little Princess 👑
        </h1>
        <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: meta.textSecondary }}>
          You don&apos;t need a crown to be a queen, Sonyyy. But if the world ever forgets how special you are, I would happily remind it every single day.
        </p>

        <button
          type="button"
          onClick={() => {
            setCrowned(true);
            soundEngine.playGiftOpen();
            triggerBurst('fireworks');
          }}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl px-7 py-3 text-sm sm:text-base font-bold text-white shadow-md transition-transform active:scale-95"
          style={{ background: meta.buttonGradient }}
        >
          <Crown className="h-5 w-5" />
          {crowned ? 'Queen Sonyyy Crowned Forever ✨👑' : 'Claim Your Golden Crown 👑'}
        </button>
      </div>
    </div>
  );
}

export function Scene08Chocolate({ meta, triggerBurst }: SceneRenderProps) {
  const [picked, setPicked] = useState(CHOCOLATE_TREATS[0]);
  const [tastedIds, setTastedIds] = useState<string[]>([CHOCOLATE_TREATS[0].id]);

  const handlePick = (item: (typeof CHOCOLATE_TREATS)[number]) => {
    setPicked(item);
    if (!tastedIds.includes(item.id)) {
      setTastedIds((prev) => [...prev, item.id]);
    }
    soundEngine.playHeartPop();
    triggerBurst('hearts');
  };

  return (
    <div
      className="w-full max-w-3xl mx-auto rounded-3xl border p-4 sm:p-6 shadow-xl flex flex-col max-h-[calc(100vh-146px)]"
      style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
    >
      <div className="text-center mb-3">
        <h1 className="font-display text-xl sm:text-2xl font-bold mb-1" style={{ color: meta.textPrimary }}>
          Chocolate Wonderland 🍫🍓
        </h1>
        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: meta.textSecondary }}>
          I could bring you a thousand chocolates, but none of them would ever be as sweet as the way you make my world feel.
        </p>
      </div>

      {/* Selected Chocolate Flirty Reveal */}
      <div className="mb-3 rounded-2xl border border-amber-300/70 bg-amber-50/90 p-3.5 text-center">
        <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
          {picked.name} · {picked.flavor}
        </div>
        <p className="mt-1 text-sm sm:text-base font-semibold text-rose-950">
          &ldquo;{picked.compliment}&rdquo;
        </p>
      </div>

      {/* Clickable Chocolate Tray */}
      <div className="romantic-scroll grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 overflow-y-auto pr-1">
        {CHOCOLATE_TREATS.map((item) => {
          const isActive = picked.id === item.id;
          const isTasted = tastedIds.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handlePick(item)}
              className={`min-h-[68px] rounded-2xl border p-2.5 text-left transition-all ${
                isActive
                  ? 'border-rose-500 bg-rose-100/90 shadow-sm'
                  : 'border-amber-200 bg-white/95 hover:bg-amber-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-amber-950">
                <Candy className="h-3.5 w-3.5 text-rose-600" />
                <span className="text-[10px] text-rose-700">{isTasted ? 'Tasted 💗' : 'Tap'}</span>
              </div>
              <div className="mt-1 text-xs font-semibold text-amber-950 leading-tight">
                {item.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Scene09RoseSky({ meta, triggerBurst }: SceneRenderProps) {
  const [petalCount, setPetalCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-end min-h-[calc(100vh-150px)] pb-2">
      <div
        className="w-full max-w-xl rounded-3xl border p-5 sm:p-7 shadow-xl text-center"
        style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
      >
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: meta.textPrimary }}>
          A Sky Full of Roses 🌹
        </h1>
        <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: meta.textSecondary }}>
          If I had to choose between a thousand beautiful moments and one ordinary moment with you, I would still choose youuu.
        </p>
        <button
          type="button"
          onClick={() => {
            setPetalCount((c) => c + 1);
            soundEngine.playSparkle();
            triggerBurst('petals');
          }}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl px-7 py-3 text-sm sm:text-base font-bold text-white shadow-lg transition-transform active:scale-95"
          style={{ background: meta.buttonGradient }}
        >
          Shower More Roses 🌹{petalCount > 0 ? ` (${petalCount})` : ''}
        </button>
      </div>
    </div>
  );
}

export function Scene10BlushingMachine({
  meta,
  triggerBurst,
  updateVisualFlags,
  onTriggerShortCircuit,
}: SceneRenderProps) {
  const [index, setIndex] = useState(0);
  const [blushLevel, setBlushLevel] = useState(72);

  const current = BLUSH_MACHINE_COMPLIMENTS[index];

  const handlePress = () => {
    const next = (index + 1) % BLUSH_MACHINE_COMPLIMENTS.length;
    setIndex(next);
    const nextBlush = blushLevel >= 100 ? 78 : Math.min(100, blushLevel + 7);
    setBlushLevel(nextBlush);
    if (nextBlush >= 100) {
      onTriggerShortCircuit?.();
    } else {
      soundEngine.playKiss();
      triggerBurst('hearts');
    }
    updateVisualFlags({ blushPulse: Date.now() });
  };

  return (
    <div className="flex flex-col items-center justify-end min-h-[calc(100vh-150px)] pb-2">
      <div
        className="w-full max-w-xl rounded-3xl border-2 p-5 sm:p-6 shadow-xl text-center"
        style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
      >
        <div className="flex items-center justify-between text-xs font-bold mb-2" style={{ color: meta.accentHex }}>
          <span>💗 SONYYY BLUSH MACHINE</span>
          <span className="tabular-nums">
            Blush Meter: {blushLevel}%{blushLevel >= 100 ? ' ⚡ OVERLOAD!' : ''}
          </span>
        </div>

        {/* Heart Screen */}
        <div className="rounded-2xl border border-pink-300 bg-pink-50 p-4 mb-4">
          <div className="text-xs font-bold uppercase tracking-wider text-pink-700 mb-1">
            Focus: {current.trait}
          </div>
          <p className="font-display text-lg sm:text-xl font-bold text-pink-950 leading-snug mb-2">
            &ldquo;{current.line}&rdquo;
          </p>
          <div className="text-xs font-semibold text-rose-600">{current.reaction}</div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={handlePress}
            className="inline-flex min-h-[50px] flex-1 sm:flex-initial items-center justify-center gap-2 rounded-2xl px-7 py-3 text-sm sm:text-base font-bold text-white shadow-lg transition-transform active:scale-95"
            style={{ background: meta.buttonGradient }}
          >
            <Heart className="h-5 w-5 fill-current" />
            MAKE SONYYY BLUSH 💗
          </button>

          <button
            type="button"
            onClick={() => onTriggerShortCircuit?.()}
            className="inline-flex min-h-[50px] items-center justify-center gap-1.5 rounded-2xl border border-fuchsia-300 bg-fuchsia-50 px-4 py-3 text-xs sm:text-sm font-bold text-fuchsia-900 hover:bg-fuchsia-100 active:scale-95"
          >
            <Zap className="h-4 w-4 text-fuchsia-600" />
            Short Circuit ⚡
          </button>
        </div>
      </div>
    </div>
  );
}
