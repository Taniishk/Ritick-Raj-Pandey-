import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  HeartHandshake,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react';
import { getSceneMeta, TOTAL_SCENES } from './data/scenesMeta';
import { HUNDRED_REASONS, SECRET_OBJECTS, SecretObjectItem } from './data/loveContent';
import {
  AboutUsAnswerEntry,
  clampSceneId,
  createInitialState,
  loadSavedState,
  parseInitialQuery,
  persistState,
  StudioTabId,
  UniverseSavedState,
} from './utils/universeLogic';
import { UniverseCanvas, SceneVisualFlags } from './three/UniverseCanvas';
import { BurstEffectMode, PointerTrailOverlay } from './components/PointerTrailOverlay';
import { ActiveScreenEffects, AmbientFxCanvas } from './components/AmbientFxCanvas';
import { SceneAtmosphereLayer } from './components/SceneAtmosphereLayer';
import { SceneDrawer } from './components/SceneDrawer';
import { SpecialForSonyyyModal } from './components/SpecialForSonyyyModal';
import { EffectsStudioModal } from './components/EffectsStudioModal';
import { SceneView } from './scenes/SceneView';
import { soundEngine } from './audio/soundEngine';

export default function App() {
  const initialQuery = useMemo(
    () =>
      typeof window !== 'undefined'
        ? parseInitialQuery(window.location.search)
        : { autostart: false, sceneOverride: null, studioOverride: null },
    [],
  );

  const [state, setState] = useState<UniverseSavedState>(() => {
    const saved = loadSavedState();
    if (initialQuery.sceneOverride !== null) {
      const target = clampSceneId(initialQuery.sceneOverride);
      const visited = saved.visitedScenes.includes(target)
        ? saved.visitedScenes
        : [...saved.visitedScenes, target].sort((a, b) => a - b);
      return { ...saved, currentScene: target, visitedScenes: visited };
    }
    return saved;
  });

  const [isLoading, setIsLoading] = useState(
    !initialQuery.autostart && initialQuery.sceneOverride === null && initialQuery.studioOverride === null,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [studioOpen, setStudioOpen] = useState(initialQuery.studioOverride !== null);
  const [studioTab, setStudioTab] = useState<StudioTabId>(initialQuery.studioOverride ?? 'sweet');
  const [fxOpen, setFxOpen] = useState(false);

  const [cursorOverride, setCursorOverride] = useState<ReturnType<typeof getSceneMeta>['cursorEffect'] | null>(null);
  const [burstTrigger, setBurstTrigger] = useState(0);
  const [burstMode, setBurstMode] = useState<BurstEffectMode>('hearts');
  const [shortCircuitPulse, setShortCircuitPulse] = useState(0);
  const [screenEffects, setScreenEffects] = useState<ActiveScreenEffects>({
    shortCircuit: false,
    aurora: false,
    meteors: false,
    fireflies: false,
    bubbles: false,
    confetti: false,
  });

  const [visualFlags, setVisualFlags] = useState<SceneVisualFlags>({});
  const [activeSecretToast, setActiveSecretToast] = useState<SecretObjectItem | null>(null);

  const meta = getSceneMeta(state.currentScene);
  const effectiveCursor = cursorOverride ?? meta.cursorEffect;

  // Brief dreamy entrance curtain
  useEffect(() => {
    if (!isLoading) return;
    const timer = window.setTimeout(() => setIsLoading(false), 950);
    return () => window.clearTimeout(timer);
  }, [isLoading]);

  // Persist progress whenever state changes
  useEffect(() => {
    persistState(state);
  }, [state]);

  // Keep body state attribute synced for testability
  useEffect(() => {
    document.body.dataset.scene = String(state.currentScene);
    document.body.dataset.totalScenes = String(TOTAL_SCENES);
  }, [state.currentScene]);

  const goToScene = useCallback((nextId: number) => {
    const clamped = clampSceneId(nextId);
    setActiveSecretToast(null);
    setVisualFlags((prev) => ({
      ...prev,
      hugActive: false,
      giftOpened: clamped === 29 ? prev.giftOpened : false,
      finalHugBurst: false,
    }));
    setState((prev) => {
      const visited = prev.visitedScenes.includes(clamped)
        ? prev.visitedScenes
        : [...prev.visitedScenes, clamped].sort((a, b) => a - b);
      return { ...prev, currentScene: clamped, visitedScenes: visited };
    });
    soundEngine.playSparkle();
  }, []);

  const handleNext = useCallback(() => {
    if (state.currentScene < TOTAL_SCENES) {
      goToScene(state.currentScene + 1);
    }
  }, [state.currentScene, goToScene]);

  const handlePrev = useCallback(() => {
    if (state.currentScene > 1) {
      goToScene(state.currentScene - 1);
    }
  }, [state.currentScene, goToScene]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (drawerOpen || studioOpen || fxOpen) {
        if (e.key === 'Escape') {
          setDrawerOpen(false);
          setStudioOpen(false);
          setFxOpen(false);
        }
        return;
      }
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen, studioOpen, fxOpen, handleNext, handlePrev]);

  const toggleMusic = () => {
    setState((prev) => {
      const next = !prev.musicEnabled;
      soundEngine.toggleMusic(next);
      return { ...prev, musicEnabled: next };
    });
  };

  const stopAmbientMusic = useCallback(() => {
    soundEngine.stopMusic();
    setState((prev) => (prev.musicEnabled ? { ...prev, musicEnabled: false } : prev));
  }, []);

  const startMusicIfIdle = useCallback(() => {
    setState((prev) => {
      if (!prev.musicEnabled) {
        soundEngine.toggleMusic(true);
        return { ...prev, musicEnabled: true };
      }
      return prev;
    });
  }, []);

  const triggerBurst = useCallback((mode: BurstEffectMode) => {
    setBurstMode(mode);
    setBurstTrigger((n) => n + 1);
  }, []);

  const triggerShortCircuit = useCallback(() => {
    soundEngine.playElectricSpark();
    setShortCircuitPulse((p) => p + 1);
    setBurstMode('short_circuit');
    setBurstTrigger((n) => n + 1);
  }, []);

  const openStudio = useCallback((tab: StudioTabId) => {
    setStudioTab(tab);
    setStudioOpen(true);
    setDrawerOpen(false);
    setFxOpen(false);
  }, []);

  const updateVisualFlags = useCallback((patch: Partial<SceneVisualFlags>) => {
    setVisualFlags((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleRevealReason = useCallback((id: number) => {
    setState((prev) =>
      prev.revealedReasonIds.includes(id)
        ? prev
        : { ...prev, revealedReasonIds: [...prev.revealedReasonIds, id] },
    );
  }, []);

  const handleRevealAllReasons = useCallback(() => {
    setState((prev) => ({
      ...prev,
      revealedReasonIds: HUNDRED_REASONS.map((r) => r.id),
    }));
  }, []);

  const handleChooseQuestion = useCallback((qId: string, choice: 'A' | 'B') => {
    setState((prev) => ({
      ...prev,
      questionChoices: { ...prev.questionChoices, [qId]: choice },
    }));
  }, []);

  const handleToggleFavoriteSweetWord = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      favoriteSweetWordIds: prev.favoriteSweetWordIds.includes(id)
        ? prev.favoriteSweetWordIds.filter((x) => x !== id)
        : [...prev.favoriteSweetWordIds, id],
    }));
  }, []);

  const handleUpdateAboutUsAnswer = useCallback((qId: string, patch: AboutUsAnswerEntry) => {
    setState((prev) => ({
      ...prev,
      aboutUsAnswers: {
        ...prev.aboutUsAnswers,
        [qId]: { ...prev.aboutUsAnswers[qId], ...patch },
      },
    }));
  }, []);

  const handleToggleBookDate = useCallback((dateId: string) => {
    setState((prev) => ({
      ...prev,
      bookedDateIds: prev.bookedDateIds.includes(dateId)
        ? prev.bookedDateIds.filter((x) => x !== dateId)
        : [...prev.bookedDateIds, dateId],
    }));
  }, []);

  const handleUnlockNextPromise = useCallback(() => {
    setState((prev) => ({
      ...prev,
      unlockedPromisesCount: Math.min(6, prev.unlockedPromisesCount + 1),
    }));
  }, []);

  const handleOpenGift = useCallback(() => {
    setState((prev) => ({ ...prev, giftOpened: true }));
  }, []);

  const handleGiveFinalHug = useCallback(() => {
    setState((prev) => ({ ...prev, finalHugGiven: true }));
  }, []);

  const handleReplayUniverse = useCallback(() => {
    soundEngine.playSparkle();
    setVisualFlags({});
    setActiveSecretToast(null);
    setState((prev) => ({
      ...createInitialState(),
      musicEnabled: prev.musicEnabled,
    }));
  }, []);

  // Secret object for the current scene (if any)
  const sceneSecret = SECRET_OBJECTS.find((s) => s.sceneId === state.currentScene);
  const secretFound = sceneSecret ? state.revealedSecretIds.includes(sceneSecret.id) : false;

  const handleDiscoverSecret = (sec: SecretObjectItem) => {
    soundEngine.playGiftOpen();
    triggerBurst('fireworks');
    setActiveSecretToast(sec);
    setState((prev) =>
      prev.revealedSecretIds.includes(sec.id)
        ? prev
        : { ...prev, revealedSecretIds: [...prev.revealedSecretIds, sec.id] },
    );
  };

  const isDark = meta.themeMode === 'dark';
  const activeFxCount = Object.values(screenEffects).filter(Boolean).length;

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between transition-colors duration-700"
      style={{ background: meta.bgGradient, color: meta.textPrimary }}
    >
      {/* Persistent Three.js 3D Universe */}
      <UniverseCanvas
        sceneId={state.currentScene}
        visualFlags={{
          ...visualFlags,
          giftOpened: state.currentScene === 29 ? state.giftOpened : visualFlags.giftOpened,
          unlockProgress: state.currentScene === 24 ? state.unlockedPromisesCount : visualFlags.unlockProgress,
          finalHugBurst: state.currentScene === 30 ? state.finalHugGiven : visualFlags.finalHugBurst,
        }}
      />

      {/* Scene-specific 2D atmospheric accents */}
      <SceneAtmosphereLayer meta={meta} lanternCount={visualFlags.lanternLaunchCount} />

      {/* Toggleable & Short-Circuit Visual FX Canvas */}
      <AmbientFxCanvas effects={screenEffects} shortCircuitPulse={shortCircuitPulse} />

      {/* Pointer heart/butterfly/electric trail & celebratory bursts */}
      <PointerTrailOverlay
        cursorEffect={effectiveCursor}
        burstTrigger={burstTrigger}
        burstMode={burstMode}
      />

      {/* Dreamy initial loading curtain */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#ffd6e7] px-6 text-center"
          >
            <div className="mb-4 text-5xl animate-float-slow">🧸💗</div>
            <h1 className="font-display text-2xl sm:text-4xl font-bold text-pink-950 mb-2">
              Sonyyy&apos;s Little Universe
            </h1>
            <p className="text-sm font-medium text-pink-800">
              30 little worlds · One very special girl · Preparing the magic...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Top Bar (fits cleanly inside 390px mobile & desktop) */}
      <header
        className="relative z-20 flex items-center justify-between gap-1.5 sm:gap-2 px-2.5 sm:px-6 py-2 border-b"
        style={{
          backgroundColor: isDark ? 'rgba(18, 8, 34, 0.78)' : 'rgba(255, 248, 252, 0.84)',
          borderColor: meta.cardBorder,
        }}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="font-display text-sm sm:text-base font-bold whitespace-nowrap">
            <span className="sm:hidden">Sonyyy 💗</span>
            <span className="hidden sm:inline">Sonyyy&apos;s Little Universe 💗</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span
            data-testid="scene-progress"
            className="text-xs sm:text-sm font-bold tabular-nums px-1"
            style={{ color: meta.accentHex }}
          >
            {state.currentScene}/{TOTAL_SCENES}
          </span>

          <button
            type="button"
            onClick={toggleMusic}
            aria-label={state.musicEnabled ? 'Pause background music' : 'Play background music'}
            className="inline-flex min-h-[40px] items-center gap-1 rounded-xl border px-2.5 sm:px-3 py-1.5 text-xs font-semibold transition-colors"
            style={{
              backgroundColor: state.musicEnabled ? meta.accentHex : 'transparent',
              color: state.musicEnabled ? '#ffffff' : meta.textPrimary,
              borderColor: meta.cardBorder,
            }}
          >
            {state.musicEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            <span className="hidden md:inline">{state.musicEnabled ? 'Music On' : 'Music Off'}</span>
          </button>

          <button
            type="button"
            onClick={() => setFxOpen(true)}
            aria-label="Open Magical Effects and Short Circuit FX"
            className="inline-flex min-h-[40px] items-center gap-1 rounded-xl border px-2.5 sm:px-3 py-1.5 text-xs font-bold transition-colors"
            style={{
              backgroundColor: activeFxCount > 0 ? meta.accentHex : 'transparent',
              color: activeFxCount > 0 ? '#ffffff' : meta.textPrimary,
              borderColor: meta.cardBorder,
            }}
          >
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">FX</span>
          </button>

          <button
            type="button"
            onClick={() => openStudio('sweet')}
            aria-label="Open For You studio — Sweet Words, About Us, Date Plans and Song"
            className="inline-flex min-h-[40px] items-center gap-1 rounded-xl border px-2.5 sm:px-3 py-1.5 text-xs font-bold shadow-sm transition-transform active:scale-95"
            style={{
              backgroundColor: isDark ? 'rgba(236, 72, 153, 0.25)' : '#fff0f7',
              color: isDark ? '#fbcfe8' : '#9d174d',
              borderColor: meta.cardBorder,
            }}
          >
            <HeartHandshake className="h-4 w-4 shrink-0" />
            <span>For You</span>
          </button>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open 30 worlds and secrets drawer"
            className="inline-flex min-h-[40px] items-center gap-1 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-bold text-white shadow-sm"
            style={{ background: meta.buttonGradient }}
          >
            <Compass className="h-4 w-4 shrink-0" />
            <span>Worlds</span>
          </button>
        </div>
      </header>

      {/* Secret Clickable Object Easter Egg tucked cleanly into corner */}
      {sceneSecret && (
        <button
          type="button"
          onClick={() => handleDiscoverSecret(sceneSecret)}
          aria-label={`Secret object: ${sceneSecret.label}`}
          title={`Secret clue: ${sceneSecret.label}`}
          className="fixed right-3 top-16 sm:right-6 sm:top-20 z-30 flex h-11 w-11 items-center justify-center rounded-full border text-xl shadow-md transition-transform hover:scale-110 active:scale-95 animate-float-slow"
          style={{
            backgroundColor: isDark ? 'rgba(42, 16, 68, 0.85)' : 'rgba(255, 250, 253, 0.90)',
            borderColor: secretFound ? '#fbbf24' : meta.cardBorder,
          }}
        >
          <span>{sceneSecret.icon}</span>
        </button>
      )}

      {/* Secret Discovered Toast */}
      {activeSecretToast && (
        <div
          role="status"
          className="fixed left-1/2 top-16 z-40 w-[92vw] max-w-md -translate-x-1/2 rounded-2xl border border-amber-300 bg-[#fffaf2] p-3.5 text-[#3b1224] shadow-2xl"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700">
                <Sparkles className="h-3.5 w-3.5" />
                Secret Found · {activeSecretToast.label}
              </div>
              <p className="mt-1 text-xs sm:text-sm font-medium leading-snug">
                {activeSecretToast.message}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveSecretToast(null)}
              aria-label="Dismiss secret note"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-amber-800 hover:bg-amber-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Active Scene Stage */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-3 sm:px-6 py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentScene}
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.985 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <SceneView
              meta={meta}
              onNext={handleNext}
              onStartMusicIfIdle={startMusicIfIdle}
              triggerBurst={triggerBurst}
              updateVisualFlags={updateVisualFlags}
              visualFlags={visualFlags}
              revealedReasonIds={state.revealedReasonIds}
              onRevealReason={handleRevealReason}
              onRevealAllReasons={handleRevealAllReasons}
              questionChoices={state.questionChoices}
              onChooseQuestion={handleChooseQuestion}
              unlockedPromisesCount={state.unlockedPromisesCount}
              onUnlockNextPromise={handleUnlockNextPromise}
              giftOpened={state.giftOpened}
              onOpenGift={handleOpenGift}
              finalHugGiven={state.finalHugGiven}
              onGiveFinalHug={handleGiveFinalHug}
              onReplayUniverse={handleReplayUniverse}
              onTriggerShortCircuit={triggerShortCircuit}
              onOpenStudio={openStudio}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Bar (Android thumb-friendly 44px+ touch targets) */}
      <nav
        aria-label="Scene Navigation"
        className="relative z-20 flex items-center justify-between gap-2 px-3 sm:px-6 py-2.5 border-t"
        style={{
          backgroundColor: isDark ? 'rgba(18, 8, 34, 0.84)' : 'rgba(255, 248, 252, 0.88)',
          borderColor: meta.cardBorder,
        }}
      >
        <button
          type="button"
          onClick={handlePrev}
          disabled={state.currentScene <= 1}
          className="inline-flex min-h-[44px] min-w-[84px] items-center justify-center gap-1 rounded-xl border px-3.5 py-2 text-xs sm:text-sm font-bold transition-opacity disabled:opacity-35"
          style={{
            borderColor: meta.cardBorder,
            color: meta.textPrimary,
            backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
          }}
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        <div className="min-w-0 text-center px-1">
          <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: meta.accentHex }}>
            {meta.chapterLabel}
          </div>
          <div className="truncate text-xs sm:text-sm font-semibold">
            {meta.title}
          </div>
        </div>

        {state.currentScene < TOTAL_SCENES ? (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex min-h-[44px] min-w-[84px] items-center justify-center gap-1 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm transition-transform active:scale-95"
            style={{ background: meta.buttonGradient }}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReplayUniverse}
            className="inline-flex min-h-[44px] min-w-[84px] items-center justify-center gap-1 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm transition-transform active:scale-95"
            style={{ background: meta.buttonGradient }}
          >
            Replay ↺
          </button>
        )}
      </nav>

      {/* 30-World Navigator, Secret Vault & Scratch Extras Drawer */}
      <SceneDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentScene={state.currentScene}
        visitedScenes={state.visitedScenes}
        revealedSecretIds={state.revealedSecretIds}
        cursorEffect={effectiveCursor}
        onSelectCursorEffect={setCursorOverride}
        onSelectScene={goToScene}
        onResetUniverse={handleReplayUniverse}
      />

      {/* Just For Sonyyy Studio: Sweet Words, About Us, Dating Plans & Synced Lyric Song */}
      <SpecialForSonyyyModal
        isOpen={studioOpen}
        initialTab={studioTab}
        onClose={() => setStudioOpen(false)}
        favoriteSweetWordIds={state.favoriteSweetWordIds}
        onToggleFavoriteSweetWord={handleToggleFavoriteSweetWord}
        aboutUsAnswers={state.aboutUsAnswers}
        onUpdateAboutUsAnswer={handleUpdateAboutUsAnswer}
        bookedDateIds={state.bookedDateIds}
        onToggleBookDate={handleToggleBookDate}
        onStopAmbientMusic={stopAmbientMusic}
        triggerBurst={triggerBurst}
      />

      {/* Magical Visual Effects Studio: Short Circuit ⚡, Aurora, Shooting Stars, Fireflies, Bubbles, Confetti */}
      <EffectsStudioModal
        isOpen={fxOpen}
        onClose={() => setFxOpen(false)}
        activeEffects={screenEffects}
        onToggleEffect={(key) =>
          setScreenEffects((prev) => ({ ...prev, [key]: !prev[key] }))
        }
        onClearEffects={() =>
          setScreenEffects({
            shortCircuit: false,
            aurora: false,
            meteors: false,
            fireflies: false,
            bubbles: false,
            confetti: false,
          })
        }
        onTriggerBurst={triggerBurst}
        onTriggerShortCircuit={triggerShortCircuit}
        cursorEffect={effectiveCursor}
        onSelectCursorEffect={setCursorOverride}
      />
    </div>
  );
}
