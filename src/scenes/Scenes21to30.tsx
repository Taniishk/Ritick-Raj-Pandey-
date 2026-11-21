import { useState } from 'react';
import {
  Gift,
  Heart,
  KeyRound,
  RotateCcw,
  Sparkles,
  Star,
  Trees,
  CheckCircle2,
} from 'lucide-react';
import {
  DEEP_LETTER_PARAGRAPHS,
  DREAM_MEMORY_TREES,
  FLIRTY_QUESTIONS,
  HEART_PROMISES,
  SCRATCH_NOTES,
  STAR_REASONS,
  TEDDY_ARMY_BEARS,
} from '../data/loveContent';
import { SceneRenderProps } from './Scenes01to10';
import { ScratchCard } from '../components/ScratchCard';
import { soundEngine } from '../audio/soundEngine';

export function Scene21StarConstellation({ meta, triggerBurst }: SceneRenderProps) {
  const [litIds, setLitIds] = useState<number[]>([1]);
  const [activeStar, setActiveStar] = useState(STAR_REASONS[0]);

  const handleStarClick = (star: (typeof STAR_REASONS)[number]) => {
    setActiveStar(star);
    if (!litIds.includes(star.id)) {
      const next = [...litIds, star.id];
      setLitIds(next);
      if (next.length === STAR_REASONS.length) {
        triggerBurst('fireworks');
      }
    }
    soundEngine.playSparkle();
  };

  const connectAll = () => {
    setLitIds(STAR_REASONS.map((s) => s.id));
    soundEngine.playGiftOpen();
    triggerBurst('fireworks');
  };

  const perimeterStars = STAR_REASONS.slice(0, 16);

  return (
    <div
      className="w-full max-w-3xl mx-auto rounded-3xl border p-4 sm:p-6 shadow-2xl flex flex-col max-h-[calc(100vh-146px)]"
      style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold" style={{ color: meta.textPrimary }}>
            A Thousand Little Reasons ✨
          </h1>
          <p className="text-xs sm:text-sm tabular-nums" style={{ color: meta.textSecondary }}>
            Tap the glowing stars to connect Sonyyy&apos;s heart · {litIds.length} / {STAR_REASONS.length} lit
          </p>
        </div>
        <button
          type="button"
          onClick={connectAll}
          className="min-h-[40px] rounded-xl px-3.5 py-2 text-xs font-bold text-white shadow-sm"
          style={{ background: meta.buttonGradient }}
        >
          Connect Whole Heart ✨
        </button>
      </div>

      {/* Interactive Constellation Sky Box */}
      <div className="relative h-60 sm:h-72 w-full rounded-2xl border border-sky-300/30 bg-[#070b1e]/90 overflow-hidden mb-3 shrink-0">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full pointer-events-none">
          {perimeterStars.map((star, idx) => {
            const nextStar = perimeterStars[(idx + 1) % perimeterStars.length];
            const bothLit = litIds.includes(star.id) && litIds.includes(nextStar.id);
            return (
              <line
                key={star.id}
                x1={star.x}
                y1={star.y}
                x2={nextStar.x}
                y2={nextStar.y}
                stroke={bothLit ? '#f472b6' : 'rgba(186,230,253,0.16)'}
                strokeWidth={bothLit ? '0.9' : '0.4'}
                strokeDasharray={bothLit ? undefined : '1.5 1.5'}
              />
            );
          })}
        </svg>

        {STAR_REASONS.map((star) => {
          const isLit = litIds.includes(star.id);
          const isSelected = activeStar.id === star.id;
          return (
            <button
              key={star.id}
              type="button"
              aria-label={`Star reason ${star.id}`}
              onClick={() => handleStarClick(star)}
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full transition-transform ${
                isSelected ? 'scale-125' : 'hover:scale-110'
              }`}
            >
              <Star
                className={`h-4 w-4 ${
                  isLit ? 'fill-pink-400 text-amber-200' : 'text-sky-200/70'
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-pink-400/30 bg-pink-950/50 px-4 py-3 text-center">
        <div className="text-[11px] font-bold uppercase tracking-wider text-pink-300">
          Star #{activeStar.id}
        </div>
        <p className="text-sm sm:text-base font-semibold text-white mt-0.5">
          {activeStar.reason}
        </p>
      </div>
    </div>
  );
}

export function Scene22FlirtyGame({
  meta,
  questionChoices,
  onChooseQuestion,
  triggerBurst,
  onOpenStudio,
}: SceneRenderProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = FLIRTY_QUESTIONS[activeIdx];
  const selected = questionChoices[current.id];

  const pick = (choice: 'A' | 'B') => {
    onChooseQuestion(current.id, choice);
    soundEngine.playKiss();
    triggerBurst('hearts');
  };

  const answeredCount = Object.keys(questionChoices).length;

  return (
    <div
      className="w-full max-w-2xl mx-auto rounded-3xl border p-4 sm:p-6 shadow-xl flex flex-col max-h-[calc(100vh-146px)]"
      style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold" style={{ color: meta.textPrimary }}>
            The Flirty Question Game 💘
          </h1>
          <p className="text-xs sm:text-sm tabular-nums" style={{ color: meta.textSecondary }}>
            Question {activeIdx + 1} of {FLIRTY_QUESTIONS.length} · {answeredCount} answered
          </p>
        </div>
        <div className="flex gap-1.5">
          {FLIRTY_QUESTIONS.map((q, idx) => (
            <button
              key={q.id}
              type="button"
              aria-label={`Question ${idx + 1}`}
              onClick={() => setActiveIdx(idx)}
              className={`h-8 w-8 rounded-xl text-xs font-bold tabular-nums transition-colors ${
                idx === activeIdx
                  ? 'bg-rose-600 text-white'
                  : questionChoices[q.id]
                    ? 'bg-pink-200 text-rose-900'
                    : 'bg-white border border-pink-200 text-rose-700'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-pink-200 bg-white p-4 sm:p-5 text-center mb-3">
        <h2 className="font-display text-lg sm:text-2xl font-bold text-rose-950 mb-4">
          {current.question}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => pick('A')}
            className={`min-h-[54px] rounded-2xl border-2 px-4 py-3 text-sm font-bold transition-all ${
              selected === 'A'
                ? 'border-rose-600 bg-rose-600 text-white shadow-md'
                : 'border-pink-200 bg-pink-50 text-rose-950 hover:border-rose-400'
            }`}
          >
            {current.optionA}
          </button>
          <button
            type="button"
            onClick={() => pick('B')}
            className={`min-h-[54px] rounded-2xl border-2 px-4 py-3 text-sm font-bold transition-all ${
              selected === 'B'
                ? 'border-rose-600 bg-rose-600 text-white shadow-md'
                : 'border-pink-200 bg-pink-50 text-rose-950 hover:border-rose-400'
            }`}
          >
            {current.optionB}
          </button>
        </div>
      </div>

      {selected && (
        <div className="rounded-2xl border border-rose-300 bg-rose-50/95 p-4 text-center mb-3">
          <p className="text-sm sm:text-base font-semibold text-rose-900">
            {selected === 'A' ? current.responseA : current.responseB}
          </p>
        </div>
      )}

      <div className="flex flex-wrap justify-between items-center gap-2 mt-auto">
        <button
          type="button"
          disabled={activeIdx === 0}
          onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
          className="min-h-[42px] rounded-xl border border-pink-200 bg-white px-4 py-2 text-xs font-bold text-rose-900 disabled:opacity-40"
        >
          Previous Q
        </button>
        <button
          type="button"
          onClick={() => onOpenStudio?.('us')}
          className="min-h-[42px] rounded-xl border border-rose-300 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-800 hover:bg-rose-100"
        >
          Questions About Us 💞
        </button>
        <button
          type="button"
          onClick={() => setActiveIdx((i) => (i + 1) % FLIRTY_QUESTIONS.length)}
          className="min-h-[42px] rounded-xl px-5 py-2 text-xs font-bold text-white"
          style={{ background: meta.buttonGradient }}
        >
          {activeIdx < FLIRTY_QUESTIONS.length - 1 ? 'Next Question →' : 'Play From Q1 ↺'}
        </button>
      </div>
    </div>
  );
}

export function Scene23DreamGarden({ meta, triggerBurst, onOpenStudio }: SceneRenderProps) {
  const [selectedTree, setSelectedTree] = useState(DREAM_MEMORY_TREES[0]);

  return (
    <div
      className="w-full max-w-3xl mx-auto rounded-3xl border p-4 sm:p-6 shadow-xl flex flex-col max-h-[calc(100vh-146px)]"
      style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold" style={{ color: meta.textPrimary }}>
            Our Dream Memory Garden 🌳🦋
          </h1>
          <p className="text-xs sm:text-sm" style={{ color: meta.textSecondary }}>
            Future adventures, dates &amp; little moments waiting for us to create together
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenStudio?.('dates')}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold text-white shadow-sm"
          style={{ background: meta.buttonGradient }}
        >
          <Trees className="h-4 w-4" />
          Dream Date Tickets 🎟️
        </button>
      </div>

      <div className="mb-3 rounded-2xl border border-emerald-300 bg-emerald-50/90 p-4 text-center">
        <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
          {selectedTree.season} · {selectedTree.title}
        </div>
        <p className="mt-1 text-sm sm:text-base font-semibold text-emerald-950 leading-relaxed">
          {selectedTree.dreamMessage}
        </p>
      </div>

      <div className="romantic-scroll grid grid-cols-2 sm:grid-cols-4 gap-2 overflow-y-auto pr-1">
        {DREAM_MEMORY_TREES.map((tree) => (
          <button
            key={tree.id}
            type="button"
            onClick={() => {
              setSelectedTree(tree);
              soundEngine.playSparkle();
              triggerBurst('butterflies');
            }}
            className={`min-h-[68px] rounded-2xl border p-2.5 text-left transition-all ${
              selectedTree.id === tree.id
                ? 'border-emerald-600 bg-emerald-100/90 shadow-sm'
                : 'border-emerald-200 bg-white/95 hover:bg-emerald-50'
            }`}
          >
            <div className="text-[10px] font-bold text-emerald-700">{tree.season}</div>
            <div className="text-xs font-bold text-emerald-950 mt-0.5 leading-tight">
              🌳 {tree.title}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Scene24Promises({
  meta,
  unlockedPromisesCount,
  onUnlockNextPromise,
  triggerBurst,
  updateVisualFlags,
}: SceneRenderProps) {
  const handleTurnKey = () => {
    onUnlockNextPromise();
    soundEngine.playGiftOpen();
    triggerBurst('hearts');
    updateVisualFlags({ unlockProgress: Math.min(6, unlockedPromisesCount + 1) });
  };

  return (
    <div
      className="w-full max-w-2xl mx-auto rounded-3xl border p-4 sm:p-6 shadow-2xl flex flex-col max-h-[calc(100vh-146px)]"
      style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold" style={{ color: meta.textPrimary }}>
            Promises From My Heart 🔐💛
          </h1>
          <p className="text-xs sm:text-sm tabular-nums" style={{ color: meta.textSecondary }}>
            Turn the golden key to unlock each promise · {unlockedPromisesCount} / 6 unlocked
          </p>
        </div>

        <button
          type="button"
          onClick={handleTurnKey}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-md transition-transform active:scale-95"
          style={{ background: meta.buttonGradient }}
        >
          <KeyRound className="h-4 w-4" />
          {unlockedPromisesCount >= HEART_PROMISES.length ? 'All Promises Unlocked ✨' : 'Turn Golden Key 🔑'}
        </button>
      </div>

      <div className="romantic-scroll space-y-2 overflow-y-auto pr-1">
        {HEART_PROMISES.map((promise, idx) => {
          const unlocked = idx < unlockedPromisesCount;
          return (
            <div
              key={idx}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all ${
                unlocked
                  ? 'border-amber-300/60 bg-amber-950/45 text-amber-50'
                  : 'border-white/15 bg-white/5 text-purple-200/60'
              }`}
            >
              <CheckCircle2
                className={`h-5 w-5 shrink-0 ${unlocked ? 'text-amber-300' : 'text-white/25'}`}
              />
              <span className="text-sm sm:text-base font-medium">
                {unlocked ? promise : `Locked Promise #${idx + 1} — Turn the golden key above`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const CARRYING_ICONS: Record<(typeof TEDDY_ARMY_BEARS)[number]['carrying'], string> = {
  rose: '🌹',
  chocolate: '🍫',
  balloon: '🎈',
  apology: '💌',
  gift: '🎁',
};

export function Scene25TeddyArmy({ meta, triggerBurst }: SceneRenderProps) {
  const [selectedBear, setSelectedBear] = useState(TEDDY_ARMY_BEARS[0]);
  const [marchWave, setMarchWave] = useState(1);

  return (
    <div
      className="w-full max-w-4xl mx-auto rounded-3xl border p-4 sm:p-6 shadow-xl flex flex-col max-h-[calc(100vh-146px)]"
      style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold" style={{ color: meta.textPrimary }}>
            The Teddy Bear Army 🧸🎖️
          </h1>
          <p className="text-xs sm:text-sm" style={{ color: meta.textSecondary }}>
            30 adorable bears arriving from every direction—tap any recruit for their message!
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setMarchWave((w) => w + 1);
            soundEngine.playDanceChime();
            triggerBurst('hearts');
          }}
          className="min-h-[40px] rounded-xl px-4 py-2 text-xs font-bold text-white shadow-sm"
          style={{ background: meta.buttonGradient }}
        >
          March Teddy Army! 🧸 (Wave {marchWave})
        </button>
      </div>

      {/* Active Bear Speech Bubble */}
      <div className="mb-3 rounded-2xl border border-pink-300 bg-pink-50/95 p-3.5 text-center">
        <div className="text-xs font-bold text-pink-700">
          🧸 #{selectedBear.id} {selectedBear.name} · {selectedBear.badge}
        </div>
        <p className="mt-1 text-sm sm:text-base font-semibold text-pink-950">
          &ldquo;{selectedBear.compliment}&rdquo;
        </p>
      </div>

      {/* 30 Army Bears Grid */}
      <div className="romantic-scroll grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 overflow-y-auto pr-1">
        {TEDDY_ARMY_BEARS.map((bear) => {
          const active = selectedBear.id === bear.id;
          return (
            <button
              key={bear.id}
              type="button"
              onClick={() => {
                setSelectedBear(bear);
                soundEngine.playHeartPop();
              }}
              className={`min-h-[68px] rounded-2xl border p-2.5 text-center transition-all active:scale-95 ${
                active
                  ? 'border-pink-600 bg-pink-100 shadow-sm'
                  : 'border-pink-200 bg-white/95 hover:bg-pink-50'
              }`}
            >
              <div className="text-xl leading-none mb-1">
                🧸{CARRYING_ICONS[bear.carrying]}
              </div>
              <div className="text-[11px] font-bold text-pink-950 leading-tight truncate">
                {bear.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Scene26MoonlightBalcony({
  meta,
  triggerBurst,
  updateVisualFlags,
  visualFlags,
}: SceneRenderProps) {
  const lanterns = visualFlags.lanternLaunchCount ?? 0;

  return (
    <div className="flex flex-col items-center justify-end min-h-[calc(100vh-150px)] pb-2">
      <div
        className="w-full max-w-xl rounded-3xl border p-5 sm:p-7 shadow-2xl text-center"
        style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
      >
        <div className="text-xs font-semibold uppercase tracking-widest text-amber-300 mb-1.5">
          🌙 Midnight Balcony · Floating Lanterns
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: meta.textPrimary }}>
          The Moonlight Balcony
        </h1>
        <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: meta.textSecondary }}>
          Some people bring happiness into a room. You somehow bring a whole different kind of warmth into my existence—and honestly, Sonyyy, that feeling is difficult to put into words.
        </p>
        <button
          type="button"
          onClick={() => {
            soundEngine.playSparkle();
            triggerBurst('fireworks');
            updateVisualFlags({ lanternLaunchCount: lanterns + 1 });
          }}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl px-7 py-3 text-sm sm:text-base font-bold text-white shadow-lg transition-transform active:scale-95"
          style={{ background: meta.buttonGradient }}
        >
          Release a Wish Lantern 🏮{lanterns > 0 ? ` (${lanterns})` : ''}
        </button>
      </div>
    </div>
  );
}

export function Scene27HeartExplosion({
  meta,
  triggerBurst,
  updateVisualFlags,
  visualFlags,
}: SceneRenderProps) {
  const charge = visualFlags.heartChargeLevel ?? 0;

  const handleCharge = () => {
    const next = charge >= 1 ? 0.25 : Math.min(1, charge + 0.34);
    updateVisualFlags({ heartChargeLevel: next });
    soundEngine.playHeartPop();
    if (next >= 0.99) {
      soundEngine.playGiftOpen();
      triggerBurst('fireworks');
      window.setTimeout(() => triggerBurst('butterflies'), 250);
    } else {
      triggerBurst('hearts');
    }
  };

  return (
    <div className="flex flex-col items-center justify-end min-h-[calc(100vh-150px)] pb-2">
      <div
        className="w-full max-w-xl rounded-3xl border p-5 sm:p-7 shadow-2xl text-center"
        style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
      >
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: meta.textPrimary }}>
          The Biggest Heart Explosion 💥💗
        </h1>
        <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: meta.textSecondary }}>
          If all my feelings had a shape, even this entire universe wouldn&apos;t be big enough to contain them.
        </p>

        {/* Charge bar */}
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-rose-950/70 mb-4 border border-rose-400/30">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${Math.round(charge * 100)}%`,
              background: meta.buttonGradient,
            }}
          />
        </div>

        <button
          type="button"
          onClick={handleCharge}
          className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl px-8 py-3 text-base font-bold text-white shadow-lg transition-transform active:scale-95"
          style={{ background: meta.buttonGradient }}
        >
          <Heart className="h-5 w-5 fill-current" />
          {charge >= 0.99 ? 'UNIVERSE OVERFLOWING! 💥💗' : 'Grow & Explode My Heart 💗'}
        </button>
      </div>
    </div>
  );
}

export function Scene28DeepLetter({ meta }: SceneRenderProps) {
  return (
    <div
      className="w-full max-w-2xl mx-auto rounded-3xl border p-5 sm:p-8 shadow-xl flex flex-col max-h-[calc(100vh-146px)]"
      style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
    >
      <div className="text-center mb-4 shrink-0">
        <div className="text-xs font-bold uppercase tracking-widest text-rose-700 mb-1">
          🌹 For Your Heart Only
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: meta.textPrimary }}>
          The Letter That Says Everything
        </h1>
      </div>

      <div className="romantic-scroll overflow-y-auto pr-2 space-y-4 text-left">
        {DEEP_LETTER_PARAGRAPHS.map((para, idx) => (
          <p
            key={idx}
            className={
              idx === 0
                ? 'font-hand text-3xl font-bold text-rose-900'
                : 'text-sm sm:text-base leading-relaxed text-[#421226]'
            }
          >
            {para}
          </p>
        ))}

        <p className="font-hand text-2xl font-bold text-rose-800 text-right pt-2">
          Always choosing you gently, with all my love 💗
        </p>

        <div className="pt-2">
          <ScratchCard
            secretText={SCRATCH_NOTES[0]}
            label="Scratch below for a secret P.S. note"
          />
        </div>
      </div>
    </div>
  );
}

export function Scene29SurpriseGift({
  meta,
  giftOpened,
  onOpenGift,
  triggerBurst,
  updateVisualFlags,
}: SceneRenderProps) {
  const handleOpen = () => {
    onOpenGift();
    updateVisualFlags({ giftOpened: true });
    soundEngine.playGiftOpen();
    triggerBurst('fireworks');
  };

  return (
    <div className="flex flex-col items-center justify-end min-h-[calc(100vh-150px)] pb-2">
      <div
        className="w-full max-w-xl rounded-3xl border p-5 sm:p-7 shadow-xl text-center"
        style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
      >
        {!giftOpened ? (
          <>
            <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2.5" style={{ color: meta.textPrimary }}>
              The Biggest Surprise Gift 🎁🎀
            </h1>
            <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: meta.textSecondary }}>
              A giant pink gift box wrapped just for Sonyyy—tap below to slowly unwrap your surprise!
            </p>
            <button
              type="button"
              onClick={handleOpen}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl px-8 py-3.5 text-base font-bold text-white shadow-lg transition-transform active:scale-95 hover:scale-[1.03]"
              style={{ background: meta.buttonGradient }}
            >
              <Gift className="h-5 w-5" />
              OPEN YOUR SURPRISE
            </button>
          </>
        ) : (
          <>
            <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: meta.textPrimary }}>
              Surpriseeeee Sonyyy 💗
            </h1>
            <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: meta.textSecondary }}>
              You have officially won unlimited love, unlimited cuddles, unlimited kisses, unlimited reasons to smile, and the most ridiculously oversized teddy bear everrr 🧸
            </p>
            <button
              type="button"
              onClick={() => {
                soundEngine.playSparkle();
                triggerBurst('fireworks');
              }}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl px-6 py-2.5 text-sm font-bold text-white shadow-md"
              style={{ background: meta.buttonGradient }}
            >
              <Sparkles className="h-4 w-4" />
              More Confetti &amp; Balloons 🎉
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function Scene30FinalUniverse({
  meta,
  finalHugGiven,
  onGiveFinalHug,
  onReplayUniverse,
  triggerBurst,
  updateVisualFlags,
  onOpenStudio,
}: SceneRenderProps) {
  const handleFinalHug = () => {
    onGiveFinalHug();
    updateVisualFlags({ finalHugBurst: true, butterflyHeartFormation: true });
    soundEngine.playHugWarmth();
    triggerBurst('fireworks');
    window.setTimeout(() => triggerBurst('petals'), 260);
    window.setTimeout(() => triggerBurst('butterflies'), 520);
  };

  return (
    <div className="flex flex-col items-center justify-end min-h-[calc(100vh-150px)] pb-1">
      <div
        className="w-full max-w-xl rounded-3xl border p-4 sm:p-6 shadow-2xl flex flex-col max-h-[62vh] text-center transition-colors duration-500"
        style={{
          backgroundColor: finalHugGiven ? 'rgba(92, 11, 61, 0.90)' : meta.cardSurface,
          borderColor: finalHugGiven ? 'rgba(244, 114, 182, 0.7)' : meta.cardBorder,
        }}
      >
        <div className="mb-1.5 shrink-0">
          <span className="inline-block font-display text-2xl sm:text-3xl font-bold tracking-wide text-pink-200">
            Sonnyyyy ❤️
          </span>
        </div>

        <div className="romantic-scroll overflow-y-auto pr-1 space-y-2.5 text-xs sm:text-sm leading-relaxed mb-3.5" style={{ color: meta.textSecondary }}>
        <p>
          Out of all the beautiful things this universe could have given me, getting to love you is one of my favourites.
        </p>
        <p>
          You are not someone I want to impress for just one day. You are someone I want to understand, appreciate, respect, and keep choosing through ordinary days and difficult ones too.
        </p>
        <p>
          I don&apos;t expect you to smile just because I made this little universe. I just hope it reminds you that your feelings matter, your happiness matters, and you are loved beyond the little arguments we sometimes have.
        </p>
        <p>
          If I ever make you forget how special you are, let this little universe remind you again. You are my sweetest little wonder, my favourite notification, my prettiest distraction, and the little happiness I never want to take for granted.
        </p>
        <p className="font-display text-lg sm:text-xl font-bold text-pink-200">
          I love youuu Sonyyyyy 💗🧸✨
        </p>
      </div>

      {finalHugGiven && (
        <div className="mb-3 rounded-2xl border border-pink-300/60 bg-pink-500/25 px-4 py-3 text-pink-100">
          <p className="font-display text-lg sm:text-xl font-bold">
            Come hereee my babyyyy · One last hug · And then a million more 💗
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
        <button
          type="button"
          onClick={handleFinalHug}
          className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-2xl px-6 py-2.5 text-sm sm:text-base font-bold text-white shadow-xl transition-transform active:scale-95 hover:scale-[1.03]"
          style={{ background: meta.buttonGradient }}
        >
          ONE MORE HUG? 🧸
        </button>

        <button
          type="button"
          onClick={() => onOpenStudio?.('song')}
          className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-pink-300/60 bg-pink-500/25 px-5 py-2.5 text-sm font-bold text-pink-100 hover:bg-pink-500/40"
        >
          🎵 Her Song &amp; Date Plans 💝
        </button>

        <button
          type="button"
          onClick={() => {
            updateVisualFlags({ finalHugBurst: false, hugActive: false, giftOpened: false });
            onReplayUniverse();
          }}
          className="inline-flex min-h-[46px] w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-pink-300/40 bg-white/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-pink-100 hover:bg-white/20"
        >
          <RotateCcw className="h-4 w-4" />
          Replay Entire Universe
        </button>
      </div>
      </div>
    </div>
  );
}
