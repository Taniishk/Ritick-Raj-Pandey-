import { useState } from 'react';
import { Coffee, Flower2, MailOpen, Music, Sparkles, Frame, Cloud } from 'lucide-react';
import {
  CAFE_MENU_ITEMS,
  FLOWER_SHOP_BLOOMS,
  HEART_LETTERS,
  MUSEUM_FRAMES,
} from '../data/loveContent';
import { SceneRenderProps } from './Scenes01to10';
import { soundEngine } from '../audio/soundEngine';

export function Scene11EyeGalaxy({ meta, triggerBurst }: SceneRenderProps) {
  const [gazed, setGazed] = useState(false);

  return (
    <div className="flex flex-col items-center justify-end min-h-[calc(100vh-150px)] pb-2">
      <div
        className="w-full max-w-xl rounded-3xl border p-5 sm:p-7 shadow-2xl text-center"
        style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
      >
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: meta.textPrimary }}>
          Your Eyes Are My Favourite Universe ✨
        </h1>
        <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: meta.textSecondary }}>
          I could spend forever looking at the stars, but somehow my favourite universe would still be found in your eyes, Sonyyy ✨
        </p>
        <button
          type="button"
          onClick={() => {
            setGazed(true);
            soundEngine.playSparkle();
            triggerBurst('fireworks');
          }}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl px-7 py-3 text-sm sm:text-base font-bold text-white shadow-lg transition-transform active:scale-95"
          style={{ background: meta.buttonGradient }}
        >
          <Sparkles className="h-5 w-5" />
          {gazed ? 'Constellation Lit for Sonyyy ✨' : 'Light Up Heart Constellation ✨'}
        </button>
      </div>
    </div>
  );
}

export function Scene12ForeheadKisses({ meta, triggerBurst }: SceneRenderProps) {
  const [kissCount, setKissCount] = useState(1);

  const sendKisses = () => {
    setKissCount((c) => c + 25);
    soundEngine.playKiss();
    triggerBurst('kisses');
  };

  return (
    <div className="flex flex-col items-center justify-end min-h-[calc(100vh-150px)] pb-2">
      <div
        className="w-full max-w-xl rounded-3xl border p-5 sm:p-7 shadow-xl text-center"
        style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
      >
        <div className="text-2xl mb-1.5">💋 😘 💗</div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2.5" style={{ color: meta.textPrimary }}>
          A Million Forehead Kisses
        </h1>
        <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: meta.textSecondary }}>
          Unlimited forehead kisses, endless cuddles, a million soft little kisses, and a lifetime supply of my love. Your subscription neverrrrr expires 😭💗
        </p>
        <button
          type="button"
          onClick={sendKisses}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl px-8 py-3 text-sm sm:text-base font-bold text-white shadow-lg transition-transform active:scale-95"
          style={{ background: meta.buttonGradient }}
        >
          Send Flying Kisses 😘
        </button>
        <p className="mt-3 text-xs font-bold tabular-nums" style={{ color: meta.accentHex }}>
          Kisses delivered so far: {kissCount.toLocaleString()} (and counting!)
        </p>
      </div>
    </div>
  );
}

const CLOUD_NOTES = [
  'Cloud #1: Thinking about your laugh instantly brightens a slow afternoon.',
  'Cloud #2: You make even small errands feel like mini adventures.',
  'Cloud #3: Being soft with you is my favorite habit.',
];

export function Scene13CloudNine({ meta, triggerBurst }: SceneRenderProps) {
  const [cloudIdx, setCloudIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center justify-end min-h-[calc(100vh-150px)] pb-2">
      <div className="mb-3 flex flex-wrap justify-center gap-2.5">
        {CLOUD_NOTES.map((note, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setCloudIdx(idx);
              soundEngine.playSparkle();
              triggerBurst('butterflies');
            }}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-2xl border border-sky-200 bg-white/90 px-4 py-2 text-xs font-bold text-sky-900 shadow-sm hover:bg-sky-50"
          >
            <Cloud className="h-4 w-4 text-sky-500" />
            Tap Cloud #{idx + 1}
          </button>
        ))}
      </div>

      <div
        className="w-full max-w-xl rounded-3xl border p-5 sm:p-7 shadow-xl text-center"
        style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
      >
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2.5" style={{ color: meta.textPrimary }}>
          Cloud Nine ☁️🌈
        </h1>
        <p className="text-sm sm:text-base leading-relaxed mb-3" style={{ color: meta.textSecondary }}>
          You make ordinary days feel like the kind of memories people wish they could live twice.
        </p>
        {cloudIdx !== null && (
          <div className="rounded-2xl bg-sky-50 border border-sky-200 px-4 py-2.5 text-xs sm:text-sm font-semibold text-sky-900">
            {CLOUD_NOTES[cloudIdx]}
          </div>
        )}
      </div>
    </div>
  );
}

export function Scene14LoveCafe({ meta, triggerBurst }: SceneRenderProps) {
  const [served, setServed] = useState(CAFE_MENU_ITEMS[0]);

  return (
    <div
      className="w-full max-w-3xl mx-auto rounded-3xl border p-4 sm:p-6 shadow-xl flex flex-col max-h-[calc(100vh-146px)]"
      style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold" style={{ color: meta.textPrimary }}>
            Our Little Love Cafe ☕🧸
          </h1>
          <p className="text-xs sm:text-sm" style={{ color: meta.textSecondary }}>
            Cozy rain outside · Warm fairy lights · Tap any menu item to order
          </p>
        </div>
        <Coffee className="h-6 w-6 text-rose-700 shrink-0" />
      </div>

      {/* Interactive Menu */}
      <div className="romantic-scroll grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-y-auto mb-3 pr-1">
        {CAFE_MENU_ITEMS.map((item) => {
          const active = served.id === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setServed(item);
                soundEngine.playHeartPop();
                triggerBurst('hearts');
              }}
              className={`flex min-h-[54px] items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 text-left transition-all ${
                active
                  ? 'border-rose-500 bg-rose-100/90 shadow-sm'
                  : 'border-rose-200 bg-white/95 hover:bg-rose-50'
              }`}
            >
              <div>
                <div className="text-xs sm:text-sm font-bold text-rose-950">
                  {item.emoji} {item.label}
                </div>
                <div className="text-[11px] text-rose-700">{item.price}</div>
              </div>
              <span className="text-xs font-bold text-rose-600 shrink-0">
                {active ? 'Served!' : 'Order'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Surprise Tray */}
      <div className="rounded-2xl border border-rose-300 bg-rose-50/95 p-4 text-center">
        <div className="text-sm font-bold text-rose-900 mb-1">{served.surpriseTitle}</div>
        <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">{served.surpriseBody}</p>
      </div>
    </div>
  );
}

export function Scene15Museum({ meta, triggerBurst }: SceneRenderProps) {
  const [activeFrame, setActiveFrame] = useState(MUSEUM_FRAMES[0]);
  const [viewedIds, setViewedIds] = useState<number[]>([1]);

  return (
    <div
      className="w-full max-w-4xl mx-auto rounded-3xl border p-4 sm:p-6 shadow-xl flex flex-col max-h-[calc(100vh-146px)]"
      style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold" style={{ color: meta.textPrimary }}>
            The Compliment Museum 🖼️✨
          </h1>
          <p className="text-xs sm:text-sm tabular-nums" style={{ color: meta.textSecondary }}>
            20 curated exhibits celebrating Sonyyy · {viewedIds.length} / 20 admired
          </p>
        </div>
        <Frame className="h-5 w-5 text-amber-700" />
      </div>

      {/* Active Exhibit Spotlight */}
      <div className="mb-3 rounded-2xl border-2 border-amber-400/70 bg-amber-50/90 p-4 text-center">
        <div className="text-[11px] font-bold uppercase tracking-widest text-amber-800">
          Exhibit #{activeFrame.id} · {activeFrame.pillar}
        </div>
        <h2 className="font-display text-lg sm:text-xl font-bold text-amber-950 mt-0.5 mb-1">
          {activeFrame.title}
        </h2>
        <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
          {activeFrame.description}
        </p>
      </div>

      {/* 20 Glowing Picture Frames Grid */}
      <div className="romantic-scroll grid grid-cols-2 sm:grid-cols-4 gap-2 overflow-y-auto pr-1">
        {MUSEUM_FRAMES.map((frame) => {
          const isSelected = activeFrame.id === frame.id;
          return (
            <button
              key={frame.id}
              type="button"
              onClick={() => {
                setActiveFrame(frame);
                if (!viewedIds.includes(frame.id)) setViewedIds((p) => [...p, frame.id]);
                soundEngine.playSparkle();
                if (frame.id === 20) triggerBurst('fireworks');
              }}
              className={`min-h-[64px] rounded-xl border-2 p-2.5 text-left transition-all ${
                isSelected
                  ? 'border-amber-500 bg-amber-100 shadow-sm'
                  : 'border-amber-200/80 bg-white/95 hover:border-amber-400'
              }`}
            >
              <div className="text-[10px] font-bold text-amber-700 tabular-nums">
                Frame {String(frame.id).padStart(2, '0')}
              </div>
              <div className="text-xs font-semibold text-amber-950 leading-snug mt-0.5">
                {frame.pillar}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Scene16HeartLetters({ meta, triggerBurst }: SceneRenderProps) {
  const [openLetter, setOpenLetter] = useState(HEART_LETTERS[0]);

  return (
    <div
      className="w-full max-w-3xl mx-auto rounded-3xl border p-4 sm:p-6 shadow-2xl flex flex-col max-h-[calc(100vh-146px)]"
      style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
    >
      <div className="text-center mb-3">
        <h1 className="font-display text-xl sm:text-2xl font-bold" style={{ color: meta.textPrimary }}>
          Letters From My Heart 💌🕯️
        </h1>
        <p className="text-xs sm:text-sm" style={{ color: meta.textSecondary }}>
          Tap any floating envelope to open a handwritten note
        </p>
      </div>

      {/* Opened Handwritten Letter */}
      <div className="mb-3 rounded-2xl border border-amber-200 bg-[#fffaf2] p-4 sm:p-5 text-[#3a1628] shadow-inner">
        <div className="text-[11px] font-bold uppercase tracking-wider text-rose-700 mb-1">
          {openLetter.tag}
        </div>
        <p className="font-hand text-2xl font-bold text-rose-900">{openLetter.salutation}</p>
        <p className="font-hand text-xl sm:text-2xl leading-snug my-2 text-[#47162d]">
          {openLetter.body}
        </p>
        <p className="font-hand text-xl font-bold text-right text-rose-800">{openLetter.signOff}</p>
      </div>

      {/* Envelope Selector */}
      <div className="romantic-scroll grid grid-cols-2 sm:grid-cols-5 gap-2 overflow-y-auto pr-1">
        {HEART_LETTERS.map((letter) => {
          const isOpen = openLetter.id === letter.id;
          return (
            <button
              key={letter.id}
              type="button"
              onClick={() => {
                setOpenLetter(letter);
                soundEngine.playHeartPop();
                triggerBurst('petals');
              }}
              className={`flex min-h-[54px] flex-col items-center justify-center rounded-xl border p-2 text-center transition-all ${
                isOpen
                  ? 'border-amber-300 bg-amber-100/95 text-rose-950'
                  : 'border-white/20 bg-white/10 text-amber-100 hover:bg-white/20'
              }`}
            >
              <MailOpen className="h-4 w-4 mb-0.5" />
              <span className="text-[11px] font-semibold leading-tight">{letter.tag}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Scene17BeautyUniverse({ meta, triggerBurst }: SceneRenderProps) {
  return (
    <div className="flex flex-col items-center justify-end min-h-[calc(100vh-150px)] pb-2">
      <div
        className="w-full max-w-xl rounded-3xl border p-5 sm:p-7 shadow-xl text-center"
        style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
      >
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: meta.textPrimary }}>
          Sonyyy&apos;s Beauty Universe 🦪✨
        </h1>
        <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: meta.textSecondary }}>
          There&apos;s something about you that goes beyond beautiful. Your presence has a softness that makes ordinary things feel special. You have your own little magic, Sonyyy, and I don&apos;t think you even realise how much of it you carry.
        </p>
        <button
          type="button"
          onClick={() => {
            soundEngine.playSparkle();
            triggerBurst('butterflies');
          }}
          className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl px-7 py-2.5 text-sm font-bold text-white shadow-md"
          style={{ background: meta.buttonGradient }}
        >
          <Sparkles className="h-4 w-4" />
          Release Celestial Pearls &amp; Butterflies 🦋
        </button>
      </div>
    </div>
  );
}

export function Scene18DanceParty({ meta, triggerBurst, onStartMusicIfIdle }: SceneRenderProps) {
  const [danceMoves, setDanceMoves] = useState(0);

  const handleDance = () => {
    setDanceMoves((m) => m + 1);
    onStartMusicIfIdle();
    soundEngine.playDanceChime();
    triggerBurst('fireworks');
  };

  return (
    <div className="flex flex-col items-center justify-end min-h-[calc(100vh-150px)] pb-2">
      <div
        className="w-full max-w-xl rounded-3xl border p-5 sm:p-7 shadow-2xl text-center"
        style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
      >
        <div className="text-xs font-bold uppercase tracking-widest text-pink-300 mb-1">
          🪩 VIP Teddy Disco Room
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2.5" style={{ color: meta.textPrimary }}>
          The Teddy Dance Party 💃🏻🧸
        </h1>
        <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: meta.textSecondary }}>
          Breaking news: The world&apos;s cutest human has officially been invited to the most important dance party in my heart 😭💃🏻💗
        </p>
        <button
          type="button"
          onClick={handleDance}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl px-8 py-3 text-sm sm:text-base font-bold text-white shadow-lg transition-transform active:scale-95"
          style={{ background: meta.buttonGradient }}
        >
          <Music className="h-5 w-5" />
          Dance With the Teddies! 🪩{danceMoves > 0 ? ` (${danceMoves})` : ''}
        </button>
      </div>
    </div>
  );
}

export function Scene19FlowerShop({ meta, triggerBurst }: SceneRenderProps) {
  const [bloomedIds, setBloomedIds] = useState<number[]>([1]);
  const [selectedBloom, setSelectedBloom] = useState(FLOWER_SHOP_BLOOMS[0]);

  const touchFlower = (flower: (typeof FLOWER_SHOP_BLOOMS)[number]) => {
    setSelectedBloom(flower);
    if (!bloomedIds.includes(flower.id)) {
      setBloomedIds((prev) => [...prev, flower.id]);
    }
    soundEngine.playSparkle();
    triggerBurst('petals');
  };

  return (
    <div
      className="w-full max-w-3xl mx-auto rounded-3xl border p-4 sm:p-6 shadow-xl flex flex-col max-h-[calc(100vh-146px)]"
      style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold" style={{ color: meta.textPrimary }}>
            The Flower Shop 💐🌷
          </h1>
          <p className="text-xs sm:text-sm tabular-nums" style={{ color: meta.textSecondary }}>
            Touch any flower to make it bloom · {bloomedIds.length} / 12 bloomed
          </p>
        </div>
        <Flower2 className="h-6 w-6 text-rose-600 shrink-0" />
      </div>

      {/* Bloomed Message */}
      <div
        className="mb-3 rounded-2xl border p-3.5 text-center transition-all"
        style={{
          backgroundColor: 'rgba(255, 245, 250, 0.95)',
          borderColor: selectedBloom.color,
        }}
      >
        <div className="text-xs font-bold uppercase tracking-wider" style={{ color: selectedBloom.color }}>
          {selectedBloom.name} ({selectedBloom.species})
        </div>
        <p className="mt-1 text-sm font-semibold text-rose-950">{selectedBloom.compliment}</p>
      </div>

      {/* Flowers Grid */}
      <div className="romantic-scroll grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 overflow-y-auto pr-1">
        {FLOWER_SHOP_BLOOMS.map((fl) => {
          const isBloomed = bloomedIds.includes(fl.id);
          return (
            <button
              key={fl.id}
              type="button"
              onClick={() => touchFlower(fl)}
              className={`min-h-[68px] rounded-2xl border p-2.5 text-left transition-transform active:scale-95 ${
                selectedBloom.id === fl.id
                  ? 'border-rose-500 bg-rose-50 shadow-sm'
                  : 'border-pink-200 bg-white/95 hover:bg-pink-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="inline-block h-3.5 w-3.5 rounded-full"
                  style={{
                    backgroundColor: fl.color,
                    transform: isBloomed ? 'scale(1.25)' : 'scale(0.85)',
                    transition: 'transform 200ms ease',
                  }}
                />
                <span className="text-[10px] font-bold text-rose-700">
                  {isBloomed ? 'Bloomed 🌸' : 'Touch'}
                </span>
              </div>
              <div className="text-xs font-bold text-rose-950 leading-tight">{fl.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Scene20SafePlace({ meta, triggerBurst, updateVisualFlags }: SceneRenderProps) {
  const [resting, setResting] = useState(false);

  return (
    <div className="flex flex-col items-center justify-end min-h-[calc(100vh-150px)] pb-2">
      <div
        className="w-full max-w-xl rounded-3xl border p-5 sm:p-7 shadow-2xl text-center"
        style={{ backgroundColor: meta.cardSurface, borderColor: meta.cardBorder }}
      >
        <div className="text-xs font-semibold uppercase tracking-widest text-amber-300 mb-1.5">
          🕯️ Rain Outside · Warm Blankets Inside
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: meta.textPrimary }}>
          Your Safe Place
        </h1>
        <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: meta.textSecondary }}>
          You don&apos;t have to pretend to be okay around me. You can be happy, upset, silent, emotional, tired, or simply yourself. I want to understand every version of you—not just the ones that smile.
        </p>

        <button
          type="button"
          onClick={() => {
            setResting(true);
            soundEngine.playHugWarmth();
            triggerBurst('hearts');
            updateVisualFlags({ hugActive: true });
            window.setTimeout(() => updateVisualFlags({ hugActive: false }), 2500);
          }}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl px-7 py-3 text-sm sm:text-base font-bold text-white shadow-lg transition-transform active:scale-95"
          style={{ background: meta.buttonGradient }}
        >
          {resting ? 'You Are Safe Here Always 🤍🕯️' : 'Rest Your Heart Here 🕯️'}
        </button>
      </div>
    </div>
  );
}
