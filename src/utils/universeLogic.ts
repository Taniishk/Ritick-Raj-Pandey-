import { TOTAL_SCENES } from '../data/scenesMeta';

export type StudioTabId = 'sweet' | 'us' | 'dates' | 'song';

export interface AboutUsAnswerEntry {
  choiceIdx?: number;
  customNote?: string;
}

export interface UniverseSavedState {
  currentScene: number;
  visitedScenes: number[];
  revealedReasonIds: number[];
  revealedSecretIds: string[];
  questionChoices: Record<string, 'A' | 'B'>;
  unlockedPromisesCount: number;
  giftOpened: boolean;
  finalHugGiven: boolean;
  musicEnabled: boolean;
  favoriteSweetWordIds: string[];
  aboutUsAnswers: Record<string, AboutUsAnswerEntry>;
  bookedDateIds: string[];
}

export const STORAGE_KEY = 'sonyyy_universe_state_v1';

export function clampSceneId(id: number): number {
  if (!Number.isFinite(id)) return 1;
  return Math.max(1, Math.min(TOTAL_SCENES, Math.round(id)));
}

export function createInitialState(): UniverseSavedState {
  return {
    currentScene: 1,
    visitedScenes: [1],
    revealedReasonIds: [],
    revealedSecretIds: [],
    questionChoices: {},
    unlockedPromisesCount: 0,
    giftOpened: false,
    finalHugGiven: false,
    musicEnabled: false,
    favoriteSweetWordIds: [],
    aboutUsAnswers: {},
    bookedDateIds: [],
  };
}

export function parseInitialQuery(search: string): {
  autostart: boolean;
  sceneOverride: number | null;
  studioOverride: StudioTabId | null;
} {
  const params = new URLSearchParams(search);
  const autostart = params.get('autostart') === '1';
  const rawScene = params.get('scene');
  let sceneOverride: number | null = null;
  if (rawScene !== null) {
    const parsed = Number(rawScene);
    if (Number.isFinite(parsed) && parsed >= 1 && parsed <= TOTAL_SCENES) {
      sceneOverride = Math.round(parsed);
    }
  }
  const rawStudio = params.get('studio');
  const studioOverride: StudioTabId | null =
    rawStudio === 'sweet' || rawStudio === 'us' || rawStudio === 'dates' || rawStudio === 'song'
      ? rawStudio
      : null;
  return { autostart, sceneOverride, studioOverride };
}

export function getActiveLyricIndex(
  lyrics: ReadonlyArray<{ timeSec: number }>,
  elapsedSec: number,
): number {
  if (lyrics.length === 0) return 0;
  let active = 0;
  for (let i = 0; i < lyrics.length; i += 1) {
    if (elapsedSec >= lyrics[i].timeSec) {
      active = i;
    } else {
      break;
    }
  }
  return active;
}

export function serializeState(state: UniverseSavedState): string {
  return JSON.stringify(state);
}

export function deserializeState(raw: string | null): UniverseSavedState {
  const base = createInitialState();
  if (!raw) return base;
  try {
    const parsed = JSON.parse(raw) as Partial<UniverseSavedState>;
    const currentScene = clampSceneId(
      typeof parsed.currentScene === 'number' ? parsed.currentScene : 1,
    );
    const visitedSet = new Set<number>(
      Array.isArray(parsed.visitedScenes)
        ? parsed.visitedScenes
            .filter((n): n is number => typeof n === 'number')
            .map(clampSceneId)
        : [1],
    );
    visitedSet.add(currentScene);

    const sanitizedAboutUs: Record<string, AboutUsAnswerEntry> = {};
    if (parsed.aboutUsAnswers && typeof parsed.aboutUsAnswers === 'object') {
      for (const [key, val] of Object.entries(parsed.aboutUsAnswers)) {
        if (val && typeof val === 'object') {
          const entry: AboutUsAnswerEntry = {};
          if (typeof val.choiceIdx === 'number' && val.choiceIdx >= 0 && val.choiceIdx <= 2) {
            entry.choiceIdx = Math.round(val.choiceIdx);
          }
          if (typeof val.customNote === 'string') {
            entry.customNote = val.customNote.slice(0, 280);
          }
          sanitizedAboutUs[key] = entry;
        }
      }
    }

    return {
      currentScene,
      visitedScenes: Array.from(visitedSet).sort((a, b) => a - b),
      revealedReasonIds: Array.isArray(parsed.revealedReasonIds)
        ? parsed.revealedReasonIds.filter((n): n is number => typeof n === 'number')
        : [],
      revealedSecretIds: Array.isArray(parsed.revealedSecretIds)
        ? parsed.revealedSecretIds.filter((s): s is string => typeof s === 'string')
        : [],
      questionChoices:
        parsed.questionChoices && typeof parsed.questionChoices === 'object'
          ? parsed.questionChoices
          : {},
      unlockedPromisesCount:
        typeof parsed.unlockedPromisesCount === 'number'
          ? Math.max(0, Math.min(6, parsed.unlockedPromisesCount))
          : 0,
      giftOpened: Boolean(parsed.giftOpened),
      finalHugGiven: Boolean(parsed.finalHugGiven),
      musicEnabled: Boolean(parsed.musicEnabled),
      favoriteSweetWordIds: Array.isArray(parsed.favoriteSweetWordIds)
        ? parsed.favoriteSweetWordIds.filter((s): s is string => typeof s === 'string')
        : [],
      aboutUsAnswers: sanitizedAboutUs,
      bookedDateIds: Array.isArray(parsed.bookedDateIds)
        ? parsed.bookedDateIds.filter((s): s is string => typeof s === 'string')
        : [],
    };
  } catch {
    return base;
  }
}

export function loadSavedState(): UniverseSavedState {
  if (typeof window === 'undefined') return createInitialState();
  try {
    return deserializeState(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return createInitialState();
  }
}

export function persistState(state: UniverseSavedState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, serializeState(state));
  } catch {
    // Ignore storage quota errors cleanly
  }
}
