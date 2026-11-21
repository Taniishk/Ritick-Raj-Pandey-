import { useEffect, useMemo, useRef, useState } from 'react';
import {
  CalendarHeart,
  Check,
  Disc3,
  Heart,
  MessageCircleHeart,
  Music,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Ticket,
  X,
} from 'lucide-react';
import {
  ABOUT_US_QUESTIONS,
  DATING_PLANS,
  ROMANTIC_SONGS,
  SWEET_WORDS_FOR_GIRLS,
  SweetWordMood,
} from '../data/loveContent';
import { AboutUsAnswerEntry, getActiveLyricIndex, StudioTabId } from '../utils/universeLogic';
import { soundEngine } from '../audio/soundEngine';

interface SpecialForSonyyyModalProps {
  isOpen: boolean;
  initialTab?: StudioTabId;
  onClose: () => void;
  favoriteSweetWordIds: string[];
  onToggleFavoriteSweetWord: (id: string) => void;
  aboutUsAnswers: Record<string, AboutUsAnswerEntry>;
  onUpdateAboutUsAnswer: (qId: string, patch: AboutUsAnswerEntry) => void;
  bookedDateIds: string[];
  onToggleBookDate: (dateId: string) => void;
  onStopAmbientMusic: () => void;
  triggerBurst: (mode: 'hearts' | 'butterflies' | 'petals' | 'fireworks' | 'kisses') => void;
}

const MOOD_FILTERS: Array<'All' | SweetWordMood> = [
  'All',
  'Chosen & Safe',
  'Overthinking Cure',
  'Little Details',
  'Unfiltered Pretty',
  'Always Yours',
];

function formatSec(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${String(rem).padStart(2, '0')}`;
}

export function SpecialForSonyyyModal({
  isOpen,
  initialTab = 'sweet',
  onClose,
  favoriteSweetWordIds,
  onToggleFavoriteSweetWord,
  aboutUsAnswers,
  onUpdateAboutUsAnswer,
  bookedDateIds,
  onToggleBookDate,
  onStopAmbientMusic,
  triggerBurst,
}: SpecialForSonyyyModalProps) {
  const [activeTab, setActiveTab] = useState<StudioTabId>(initialTab);

  // Tab 1: Sweet Words state
  const [moodFilter, setMoodFilter] = useState<'All' | SweetWordMood>('All');
  const [spotlightIdx, setSpotlightIdx] = useState(0);

  // Tab 2: Questions About Us state
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [noteDraft, setNoteDraft] = useState('');

  // Tab 3: Dating Plans state
  const [expandedDateId, setExpandedDateId] = useState<string>(DATING_PLANS[0].id);

  // Tab 4: Synced Lyric Song Player state
  const [selectedSongId, setSelectedSongId] = useState<'teri-hasi' | 'chaand-aur-tum'>('teri-hasi');
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [songElapsedSec, setSongElapsedSec] = useState(0);
  const activeLyricRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    } else {
      soundEngine.stopLyricSong();
      setIsSongPlaying(false);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    return () => {
      soundEngine.stopLyricSong();
    };
  }, []);

  const currentQuestion = ABOUT_US_QUESTIONS[activeQuestionIdx];
  useEffect(() => {
    setNoteDraft(aboutUsAnswers[currentQuestion.id]?.customNote ?? '');
  }, [currentQuestion.id, aboutUsAnswers]);

  const filteredSweetWords = useMemo(
    () =>
      moodFilter === 'All'
        ? SWEET_WORDS_FOR_GIRLS
        : SWEET_WORDS_FOR_GIRLS.filter((w) => w.mood === moodFilter),
    [moodFilter],
  );

  const safeSpotlightWord =
    filteredSweetWords[spotlightIdx % Math.max(1, filteredSweetWords.length)] ??
    SWEET_WORDS_FOR_GIRLS[0];

  const currentSong =
    ROMANTIC_SONGS.find((s) => s.id === selectedSongId) ?? ROMANTIC_SONGS[0];
  const activeLyricIdx = getActiveLyricIndex(currentSong.lyrics, songElapsedSec);

  useEffect(() => {
    if (activeTab === 'song' && isSongPlaying && activeLyricRef.current) {
      activeLyricRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeLyricIdx, activeTab, isSongPlaying]);

  if (!isOpen) return null;

  const handleNextWhisper = () => {
    soundEngine.playHeartPop();
    setSpotlightIdx((idx) => (idx + 1) % Math.max(1, filteredSweetWords.length));
  };

  const handlePlayPauseSong = () => {
    if (isSongPlaying) {
      soundEngine.stopLyricSong();
      setIsSongPlaying(false);
    } else {
      onStopAmbientMusic();
      setIsSongPlaying(true);
      soundEngine.startLyricSong(
        currentSong.id,
        currentSong.durationSec,
        songElapsedSec,
        (elapsed) => setSongElapsedSec(elapsed),
      );
    }
  };

  const handleRestartSong = () => {
    onStopAmbientMusic();
    setSongElapsedSec(0);
    setIsSongPlaying(true);
    soundEngine.startLyricSong(
      currentSong.id,
      currentSong.durationSec,
      0,
      (elapsed) => setSongElapsedSec(elapsed),
    );
  };

  const handleSwitchTrack = (id: 'teri-hasi' | 'chaand-aur-tum') => {
    const nextTrack = ROMANTIC_SONGS.find((s) => s.id === id) ?? ROMANTIC_SONGS[0];
    setSelectedSongId(id);
    setSongElapsedSec(0);
    if (isSongPlaying) {
      onStopAmbientMusic();
      soundEngine.startLyricSong(
        nextTrack.id,
        nextTrack.durationSec,
        0,
        (elapsed) => setSongElapsedSec(elapsed),
      );
    }
  };

  const handleJumpToLyric = (timeSec: number) => {
    setSongElapsedSec(timeSec);
    if (isSongPlaying) {
      soundEngine.seekLyricSong(timeSec);
    } else {
      onStopAmbientMusic();
      setIsSongPlaying(true);
      soundEngine.startLyricSong(
        currentSong.id,
        currentSong.durationSec,
        timeSec,
        (elapsed) => setSongElapsedSec(elapsed),
      );
    }
  };

  const handleSurpriseDate = () => {
    const idx = Math.floor(Math.random() * DATING_PLANS.length);
    setExpandedDateId(DATING_PLANS[idx].id);
    soundEngine.playSparkle();
    triggerBurst('hearts');
  };

  const answeredUsCount = ABOUT_US_QUESTIONS.filter(
    (q) =>
      aboutUsAnswers[q.id]?.choiceIdx !== undefined ||
      Boolean(aboutUsAnswers[q.id]?.customNote?.trim()),
  ).length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Special For Sonyyy — Sweet Words, About Us, Dating Plans & Our Song"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2.5 sm:p-5"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-pink-200 bg-[#fff8fb] text-[#3a0d26] shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-pink-100 bg-gradient-to-r from-[#fff0f6] via-[#fff8fb] to-[#f5ecff] px-4 sm:px-6 py-3.5">
          <div className="min-w-0">
            <h2 className="font-display text-lg sm:text-xl font-bold text-pink-950 truncate">
              Just For My Sonyyy 💝
            </h2>
            <p className="text-[11px] sm:text-xs text-pink-700 truncate">
              Words you deserve · Questions about us · Date tickets · A song with lyrics 🎵
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close special studio"
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-900 hover:bg-pink-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 4 Feature Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 border-b border-pink-100 bg-pink-50/75 px-3 sm:px-5 py-2.5">
          <button
            type="button"
            onClick={() => setActiveTab('sweet')}
            className={`inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl px-2.5 text-xs font-bold transition-colors ${
              activeTab === 'sweet'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'bg-white text-pink-900 border border-pink-200/70 hover:bg-pink-100'
            }`}
          >
            <Heart className="h-3.5 w-3.5" />
            <span>Sweet Words</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('us')}
            className={`inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl px-2.5 text-xs font-bold transition-colors ${
              activeTab === 'us'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'bg-white text-pink-900 border border-pink-200/70 hover:bg-pink-100'
            }`}
          >
            <MessageCircleHeart className="h-3.5 w-3.5" />
            <span>About Us ({answeredUsCount}/{ABOUT_US_QUESTIONS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dates')}
            className={`inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl px-2.5 text-xs font-bold transition-colors ${
              activeTab === 'dates'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'bg-white text-pink-900 border border-pink-200/70 hover:bg-pink-100'
            }`}
          >
            <CalendarHeart className="h-3.5 w-3.5" />
            <span>Date Plans ({bookedDateIds.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('song')}
            className={`inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl px-2.5 text-xs font-bold transition-colors ${
              activeTab === 'song'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'bg-white text-pink-900 border border-pink-200/70 hover:bg-pink-100'
            }`}
          >
            <Music className="h-3.5 w-3.5" />
            <span>Song &amp; Lyrics 🎵</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="romantic-scroll flex-1 overflow-y-auto p-4 sm:p-5">
          {/* TAB 1: SWEET WORDS GIRLS LOVE HEARING MOST */}
          {activeTab === 'sweet' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {MOOD_FILTERS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMoodFilter(m);
                      setSpotlightIdx(0);
                    }}
                    className={`min-h-[36px] rounded-xl px-3 py-1 text-xs font-semibold transition-colors ${
                      moodFilter === m
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-white border border-pink-200 text-pink-900 hover:bg-pink-50'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Spotlight Heartfelt Card */}
              <div className="rounded-3xl border border-pink-300 bg-gradient-to-br from-[#fff0f7] via-white to-[#f6ecff] p-5 text-center shadow-sm">
                <div className="text-[11px] font-bold uppercase tracking-widest text-rose-600 mb-1.5">
                  💗 {safeSpotlightWord.mood} · Dil Se For Sonyyy
                </div>
                <p className="font-display text-lg sm:text-xl font-bold text-rose-950 leading-snug mb-2">
                  &ldquo;{safeSpotlightWord.hinglish}&rdquo;
                </p>
                <p className="text-xs sm:text-sm text-pink-800 italic mb-4">
                  {safeSpotlightWord.whisper}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleNextWhisper}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm active:scale-95"
                  >
                    <Sparkles className="h-4 w-4" />
                    Whisper Another 💌
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onToggleFavoriteSweetWord(safeSpotlightWord.id);
                      soundEngine.playHeartPop();
                      triggerBurst('hearts');
                    }}
                    className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-2xl border px-4 py-2.5 text-xs sm:text-sm font-bold transition-colors ${
                      favoriteSweetWordIds.includes(safeSpotlightWord.id)
                        ? 'border-rose-500 bg-rose-600 text-white'
                        : 'border-pink-300 bg-white text-rose-900 hover:bg-pink-50'
                    }`}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favoriteSweetWordIds.includes(safeSpotlightWord.id) ? 'fill-current' : ''
                      }`}
                    />
                    {favoriteSweetWordIds.includes(safeSpotlightWord.id) ? 'Saved In Heart ❤️' : 'Save This Line'}
                  </button>
                </div>
              </div>

              {/* All filtered sweet lines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredSweetWords.map((item) => {
                  const isFav = favoriteSweetWordIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl border p-3.5 transition-all ${
                        isFav ? 'border-rose-400 bg-rose-50/70' : 'border-pink-100 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600">
                          {item.mood}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onToggleFavoriteSweetWord(item.id);
                            soundEngine.playHeartPop();
                          }}
                          aria-label={isFav ? 'Remove from heart favorites' : 'Save to heart favorites'}
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            isFav ? 'bg-rose-600 text-white' : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                          }`}
                        >
                          <Heart className={`h-3.5 w-3.5 ${isFav ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-pink-950 leading-snug">
                        {item.hinglish}
                      </p>
                      <p className="mt-1 text-[11px] text-pink-700">{item.whisper}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: QUESTIONS ABOUT US */}
          {activeTab === 'us' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-pink-950">
                    Questions About Us 💞
                  </h3>
                  <p className="text-xs text-pink-700">
                    Tap what feels most like us—or leave your own little answer!
                  </p>
                </div>
                <div className="flex gap-1.5">
                  {ABOUT_US_QUESTIONS.map((q, idx) => {
                    const answered =
                      aboutUsAnswers[q.id]?.choiceIdx !== undefined ||
                      Boolean(aboutUsAnswers[q.id]?.customNote?.trim());
                    return (
                      <button
                        key={q.id}
                        type="button"
                        aria-label={`About us question ${idx + 1}`}
                        onClick={() => setActiveQuestionIdx(idx)}
                        className={`h-9 w-9 rounded-xl text-xs font-bold tabular-nums transition-colors ${
                          idx === activeQuestionIdx
                            ? 'bg-pink-600 text-white shadow-sm'
                            : answered
                              ? 'bg-pink-200 text-pink-950'
                              : 'bg-white border border-pink-200 text-pink-800'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl border border-pink-200 bg-white p-4 sm:p-5 shadow-sm">
                <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600 mb-1">
                  {currentQuestion.tag}
                </div>
                <h4 className="font-display text-base sm:text-xl font-bold text-rose-950 mb-4 leading-snug">
                  {currentQuestion.question}
                </h4>

                <div className="grid grid-cols-1 gap-2.5 mb-4">
                  {currentQuestion.options.map((opt, oIdx) => {
                    const chosen = aboutUsAnswers[currentQuestion.id]?.choiceIdx === oIdx;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => {
                          onUpdateAboutUsAnswer(currentQuestion.id, {
                            ...aboutUsAnswers[currentQuestion.id],
                            choiceIdx: oIdx,
                          });
                          soundEngine.playKiss();
                          triggerBurst('hearts');
                        }}
                        className={`min-h-[48px] rounded-2xl border-2 px-4 py-2.5 text-left text-xs sm:text-sm font-bold transition-all ${
                          chosen
                            ? 'border-pink-600 bg-pink-600 text-white shadow-sm'
                            : 'border-pink-200 bg-pink-50/70 text-pink-950 hover:border-pink-400'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                {aboutUsAnswers[currentQuestion.id]?.choiceIdx !== undefined && (
                  <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50/90 p-3.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600 mb-0.5">
                      My Answer For You 💌
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-rose-950">
                      {
                        currentQuestion.options[
                          aboutUsAnswers[currentQuestion.id].choiceIdx!
                        ].reply
                      }
                    </p>
                  </div>
                )}

                {/* Optional custom note from Sonyyy */}
                <div className="border-t border-pink-100 pt-3">
                  <label
                    htmlFor="about-us-custom-note"
                    className="block text-xs font-bold text-pink-800 mb-1.5"
                  >
                    Want to write your own cute thought or wish for this? ✍️
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      id="about-us-custom-note"
                      type="text"
                      value={noteDraft}
                      onChange={(e) => setNoteDraft(e.target.value)}
                      placeholder="Write anything in your heart, Sonyyy..."
                      className="min-h-[44px] flex-1 rounded-xl border border-pink-200 bg-pink-50/40 px-3.5 text-xs sm:text-sm text-pink-950 placeholder:text-pink-400 focus:border-pink-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        onUpdateAboutUsAnswer(currentQuestion.id, {
                          ...aboutUsAnswers[currentQuestion.id],
                          customNote: noteDraft.trim(),
                        });
                        soundEngine.playSparkle();
                        triggerBurst('butterflies');
                      }}
                      className="min-h-[44px] rounded-xl bg-pink-600 px-4 text-xs font-bold text-white hover:bg-pink-700"
                    >
                      Save Note 💗
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  disabled={activeQuestionIdx === 0}
                  onClick={() => setActiveQuestionIdx((i) => Math.max(0, i - 1))}
                  className="min-h-[42px] rounded-xl border border-pink-200 bg-white px-4 text-xs font-bold text-pink-900 disabled:opacity-40"
                >
                  Previous Q
                </button>
                <button
                  type="button"
                  onClick={() => setActiveQuestionIdx((i) => (i + 1) % ABOUT_US_QUESTIONS.length)}
                  className="min-h-[42px] rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 px-5 text-xs font-bold text-white"
                >
                  Next Question →
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: DREAM DATING PLANS */}
          {activeTab === 'dates' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-pink-950">
                    Our Dream Dating Plans 🎟️🍓
                  </h3>
                  <p className="text-xs text-pink-700 tabular-nums">
                    Tap any plan to view details &amp; book your date ticket · {bookedDateIds.length} booked for us
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSurpriseDate}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Surprise Me With A Date ✨
                </button>
              </div>

              <div className="space-y-2.5">
                {DATING_PLANS.map((plan) => {
                  const isBooked = bookedDateIds.includes(plan.id);
                  const isExpanded = expandedDateId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      className={`rounded-2xl border transition-all ${
                        isBooked
                          ? 'border-amber-400 bg-gradient-to-r from-[#fff8ec] to-[#fff0f6]'
                          : 'border-pink-200 bg-white'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedDateId(plan.id)}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-2xl shrink-0">{plan.emoji}</span>
                          <div className="min-w-0">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                              {plan.number} · {plan.timeOfDay}
                            </div>
                            <div className="truncate text-sm sm:text-base font-bold text-pink-950">
                              {plan.title}
                            </div>
                          </div>
                        </div>

                        {isBooked ? (
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-amber-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                            <Check className="h-3.5 w-3.5" />
                            BOOKED 💗
                          </span>
                        ) : (
                          <span className="shrink-0 text-xs font-semibold text-pink-600">
                            {isExpanded ? 'Open' : 'View →'}
                          </span>
                        )}
                      </button>

                      {isExpanded && (
                        <div className="border-t border-pink-100 px-4 py-3.5 space-y-2.5 text-xs sm:text-sm">
                          <p className="font-medium text-pink-950 leading-relaxed">
                            {plan.description}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div className="rounded-xl bg-pink-50/80 p-2.5">
                              <span className="font-bold text-pink-800">What I&apos;ll Bring: </span>
                              <span className="text-pink-950">{plan.whatIllBring}</span>
                            </div>
                            <div className="rounded-xl bg-purple-50/80 p-2.5">
                              <span className="font-bold text-purple-800">Dress Vibe: </span>
                              <span className="text-purple-950">{plan.dressCode}</span>
                            </div>
                          </div>
                          <p className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-900">
                            💗 Date Promise: {plan.sweetPromise}
                          </p>
                          <div className="flex justify-end pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                onToggleBookDate(plan.id);
                                soundEngine.playGiftOpen();
                                triggerBurst('fireworks');
                              }}
                              className={`inline-flex min-h-[42px] items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-transform active:scale-95 ${
                                isBooked
                                  ? 'border border-amber-400 bg-white text-amber-800 hover:bg-amber-50'
                                  : 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-sm'
                              }`}
                            >
                              <Ticket className="h-4 w-4" />
                              {isBooked ? 'Ticket Booked! (Tap to Release)' : 'Book This Date Ticket 🎟️'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: ROMANTIC SONG WITH SYNCED LYRICS */}
          {activeTab === 'song' && (
            <div className="space-y-4">
              {/* Track Switcher */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ROMANTIC_SONGS.map((track) => {
                  const active = track.id === currentSong.id;
                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => handleSwitchTrack(track.id)}
                      className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                        active
                          ? 'border-pink-500 bg-gradient-to-r from-pink-100/90 to-purple-100/80 shadow-sm'
                          : 'border-pink-200 bg-white hover:bg-pink-50'
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          active ? 'bg-pink-600 text-white' : 'bg-pink-100 text-pink-700'
                        }`}
                      >
                        <Disc3 className={`h-5 w-5 ${active && isSongPlaying ? 'animate-spin' : ''}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-xs sm:text-sm font-bold text-pink-950">
                          {track.title}
                        </div>
                        <div className="truncate text-[11px] text-pink-700">
                          {track.bpmLabel}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Player Console */}
              <div className="rounded-3xl border border-pink-300 bg-gradient-to-br from-[#3b0a2a] via-[#4c103d] to-[#230936] p-4 sm:p-5 text-white shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-pink-300">
                      🎵 Dedicated Song With Lyrics · For Sonyyy
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white truncate">
                      {currentSong.title}
                    </h3>
                    <p className="text-xs text-pink-200/90">{currentSong.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleRestartSong}
                      aria-label="Restart song"
                      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-pink-300/35 bg-white/10 text-pink-100 hover:bg-white/20"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handlePlayPauseSong}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-lg transition-transform active:scale-95"
                    >
                      {isSongPlaying ? (
                        <>
                          <Pause className="h-4 w-4 fill-current" />
                          <span>Pause Song</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 fill-current" />
                          <span>Play Her Song 🎶</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div
                    role="slider"
                    aria-label="Song progress"
                    aria-valuemin={0}
                    aria-valuemax={currentSong.durationSec}
                    aria-valuenow={Math.round(songElapsedSec)}
                    tabIndex={0}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                      handleJumpToLyric(ratio * currentSong.durationSec);
                    }}
                    className="h-2.5 w-full cursor-pointer overflow-hidden rounded-full bg-white/15"
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 transition-[width] duration-150"
                      style={{
                        width: `${Math.min(100, (songElapsedSec / currentSong.durationSec) * 100)}%`,
                      }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-[11px] text-pink-200 tabular-nums">
                    <span>{formatSec(songElapsedSec)}</span>
                    <span>Tap any lyric line below to jump · {formatSec(currentSong.durationSec)}</span>
                  </div>
                </div>

                {/* Synchronized Scrolling Lyrics */}
                <div className="romantic-scroll max-h-60 space-y-2 overflow-y-auto pr-1 rounded-2xl bg-black/25 p-3 border border-white/10">
                  {currentSong.lyrics.map((item, idx) => {
                    const isActive = idx === activeLyricIdx;
                    return (
                      <button
                        key={item.timeSec}
                        ref={isActive ? activeLyricRef : null}
                        type="button"
                        onClick={() => handleJumpToLyric(item.timeSec)}
                        className={`w-full rounded-2xl px-3.5 py-2.5 text-left transition-all ${
                          isActive
                            ? 'bg-pink-500/30 border border-pink-300/60 shadow-md'
                            : 'bg-white/5 border border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div
                          className={`font-display text-sm sm:text-base font-bold leading-snug ${
                            isActive ? 'text-white' : 'text-pink-100'
                          }`}
                        >
                          {item.line}
                        </div>
                        <div className="mt-0.5 text-[11px] sm:text-xs text-pink-200/90 italic">
                          {item.meaning}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
