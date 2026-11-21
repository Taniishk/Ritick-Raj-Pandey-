import test from 'node:test';
import assert from 'node:assert/strict';
import { SCENES_META, TOTAL_SCENES } from '../data/scenesMeta';
import {
  HUNDRED_REASONS,
  MUSEUM_FRAMES,
  TEDDY_ARMY_BEARS,
  HEART_PROMISES,
  FLIRTY_QUESTIONS,
  CHOCOLATE_TREATS,
  FLOWER_SHOP_BLOOMS,
  STAR_REASONS,
  SECRET_OBJECTS,
  SWEET_WORDS_FOR_GIRLS,
  ABOUT_US_QUESTIONS,
  DATING_PLANS,
  ROMANTIC_SONGS,
} from '../data/loveContent';
import {
  clampSceneId,
  createInitialState,
  deserializeState,
  getActiveLyricIndex,
  parseInitialQuery,
  serializeState,
} from './universeLogic';

test('all 30 scenes exist with unique titles, backgrounds, and diorama modes', () => {
  assert.equal(TOTAL_SCENES, 30);
  assert.equal(SCENES_META.length, 30);

  const ids = SCENES_META.map((s) => s.id);
  assert.deepEqual(ids, Array.from({ length: 30 }, (_, i) => i + 1));

  const titles = new Set(SCENES_META.map((s) => s.title));
  assert.equal(titles.size, 30);

  const bgs = new Set(SCENES_META.map((s) => s.bgGradient));
  assert.equal(bgs.size, 30);

  const modes = new Set(SCENES_META.map((s) => s.dioramaMode));
  assert.equal(modes.size, 30);
});

test('Page 06 contains 100 unique non-repeating compliments across all 12 categories', () => {
  assert.equal(HUNDRED_REASONS.length, 100);
  const texts = new Set(HUNDRED_REASONS.map((r) => r.text.trim().toLowerCase()));
  assert.equal(texts.size, 100);

  const categories = new Set(HUNDRED_REASONS.map((r) => r.category));
  assert.equal(categories.size, 12);
});

test('curated scene collections have expected unique counts', () => {
  assert.equal(MUSEUM_FRAMES.length, 20);
  assert.equal(new Set(MUSEUM_FRAMES.map((f) => f.description)).size, 20);

  assert.equal(TEDDY_ARMY_BEARS.length, 30);
  assert.equal(new Set(TEDDY_ARMY_BEARS.map((b) => b.compliment)).size, 30);

  assert.equal(HEART_PROMISES.length, 6);
  assert.equal(FLIRTY_QUESTIONS.length, 6);
  assert.equal(CHOCOLATE_TREATS.length, 12);
  assert.equal(FLOWER_SHOP_BLOOMS.length, 12);
  assert.equal(STAR_REASONS.length, 18);
  assert.equal(SECRET_OBJECTS.length, 12);
});

test('new sweet words, about-us questions, dating plans, and lyric songs are valid and monotonic', () => {
  assert.equal(SWEET_WORDS_FOR_GIRLS.length, 15);
  assert.equal(new Set(SWEET_WORDS_FOR_GIRLS.map((w) => w.id)).size, 15);

  assert.equal(ABOUT_US_QUESTIONS.length, 6);
  assert.equal(new Set(ABOUT_US_QUESTIONS.map((q) => q.id)).size, 6);

  assert.equal(DATING_PLANS.length, 8);
  assert.equal(new Set(DATING_PLANS.map((d) => d.id)).size, 8);

  assert.equal(ROMANTIC_SONGS.length, 2);
  for (const song of ROMANTIC_SONGS) {
    assert.ok(song.lyrics.length >= 6);
    for (let i = 1; i < song.lyrics.length; i += 1) {
      assert.ok(song.lyrics[i].timeSec > song.lyrics[i - 1].timeSec);
    }
    assert.ok(song.durationSec > song.lyrics[song.lyrics.length - 1].timeSec);
  }

  const song = ROMANTIC_SONGS[0];
  assert.equal(getActiveLyricIndex(song.lyrics, 0), 0);
  assert.equal(getActiveLyricIndex(song.lyrics, 7.5), 1);
  assert.equal(getActiveLyricIndex(song.lyrics, 44), song.lyrics.length - 1);
});

test('clampSceneId and URL query parser behave deterministically', () => {
  assert.equal(clampSceneId(-4), 1);
  assert.equal(clampSceneId(0), 1);
  assert.equal(clampSceneId(15.4), 15);
  assert.equal(clampSceneId(99), 30);
  assert.equal(clampSceneId(Number.NaN), 1);

  assert.deepEqual(parseInitialQuery('?autostart=1&scene=14&studio=song'), {
    autostart: true,
    sceneOverride: 14,
    studioOverride: 'song',
  });
  assert.deepEqual(parseInitialQuery('?scene=999&studio=invalid'), {
    autostart: false,
    sceneOverride: null,
    studioOverride: null,
  });
});

test('state serialization and deserialization preserve and sanitize progress including extras', () => {
  const initial = createInitialState();
  initial.currentScene = 7;
  initial.visitedScenes = [1, 2, 7];
  initial.revealedReasonIds = [1, 14, 99];
  initial.revealedSecretIds = ['sec-1'];
  initial.questionChoices = { q1: 'A' };
  initial.unlockedPromisesCount = 4;
  initial.giftOpened = true;
  initial.favoriteSweetWordIds = ['sw-1', 'sw-4'];
  initial.aboutUsAnswers = { 'us-1': { choiceIdx: 1, customNote: '2 AM voice call always' } };
  initial.bookedDateIds = ['date-1', 'date-3'];

  const restored = deserializeState(serializeState(initial));
  assert.equal(restored.currentScene, 7);
  assert.deepEqual(restored.visitedScenes, [1, 2, 7]);
  assert.deepEqual(restored.revealedReasonIds, [1, 14, 99]);
  assert.deepEqual(restored.revealedSecretIds, ['sec-1']);
  assert.deepEqual(restored.questionChoices, { q1: 'A' });
  assert.equal(restored.unlockedPromisesCount, 4);
  assert.equal(restored.giftOpened, true);
  assert.deepEqual(restored.favoriteSweetWordIds, ['sw-1', 'sw-4']);
  assert.deepEqual(restored.aboutUsAnswers, {
    'us-1': { choiceIdx: 1, customNote: '2 AM voice call always' },
  });
  assert.deepEqual(restored.bookedDateIds, ['date-1', 'date-3']);

  // Corrupt JSON falls back safely
  const fallback = deserializeState('{broken json');
  assert.equal(fallback.currentScene, 1);
  assert.deepEqual(fallback.visitedScenes, [1]);
  assert.deepEqual(fallback.bookedDateIds, []);
});
