// Procedural Web Audio API romantic music box, lyric song synth & sound effects (zero external 404s)

export type LyricSongId = 'teri-hasi' | 'chaand-aur-tum';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlayingMusic = false;
  private loopTimer: number | null = null;
  private stepIndex = 0;

  // Dedicated lyric song player state
  private isPlayingSong = false;
  private songTimer: number | null = null;
  private songTickTimer: number | null = null;
  private songElapsedSec = 0;
  private activeSongId: LyricSongId = 'teri-hasi';
  private songDurationSec = 48;
  private songTickCallback: ((elapsedSec: number) => void) | null = null;
  private songStepIdx = 0;

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.06,
    delay = 0,
  ): void {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume), now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.04);
  }

  private playWarmVoiceNote(freq: number, duration: number, volume = 0.055): void {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const mainOsc = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    mainOsc.type = 'triangle';
    mainOsc.frequency.setValueAtTime(freq, now);

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(freq * 2, now);

    // Gentle singing vibrato
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(5.2, now);
    lfoGain.gain.setValueAtTime(freq * 0.012, now);
    lfo.connect(lfoGain);
    lfoGain.connect(mainOsc.frequency);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1450, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(volume * 0.72, now + duration * 0.55);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    mainOsc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    lfo.start(now);
    mainOsc.start(now);
    subOsc.start(now);
    lfo.stop(now + duration + 0.05);
    mainOsc.stop(now + duration + 0.05);
    subOsc.stop(now + duration + 0.05);
  }

  public startMusic(): void {
    if (this.isPlayingMusic) return;
    this.stopLyricSong();
    const ctx = this.ensureContext();
    if (!ctx) return;
    this.isPlayingMusic = true;

    // Tender F-major / D-minor / Bb-major / C-major romantic progression
    const melodyNotes = [
      349.23, 440.0, 523.25, 659.25, 587.33, 523.25, 440.0, 349.23,
      293.66, 349.23, 440.0, 523.25, 440.0, 392.0, 349.23, 293.66,
      233.08, 349.23, 440.0, 587.33, 523.25, 466.16, 440.0, 349.23,
      261.63, 392.0, 440.0, 523.25, 659.25, 587.33, 523.25, 392.0,
    ];
    const bassNotes = [174.61, 146.83, 116.54, 130.81];

    const scheduleStep = () => {
      if (!this.isPlayingMusic) return;
      const note = melodyNotes[this.stepIndex % melodyNotes.length];
      this.playTone(note, 0.75, 'sine', 0.038);
      this.playTone(note * 2, 0.35, 'triangle', 0.012);

      if (this.stepIndex % 8 === 0) {
        const bass = bassNotes[Math.floor(this.stepIndex / 8) % bassNotes.length];
        this.playTone(bass, 2.2, 'sine', 0.032);
      }

      this.stepIndex += 1;
      this.loopTimer = window.setTimeout(scheduleStep, 430);
    };

    scheduleStep();
  }

  public stopMusic(): void {
    this.isPlayingMusic = false;
    if (this.loopTimer !== null) {
      window.clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
  }

  public toggleMusic(shouldPlay: boolean): void {
    if (shouldPlay) {
      this.startMusic();
    } else {
      this.stopMusic();
    }
  }

  public startLyricSong(
    songId: LyricSongId,
    durationSec: number,
    startAtSec = 0,
    onTick?: (elapsedSec: number) => void,
  ): void {
    this.stopMusic();
    this.stopLyricSong();

    this.activeSongId = songId;
    this.songDurationSec = durationSec;
    this.songElapsedSec = Math.max(0, Math.min(durationSec - 0.1, startAtSec));
    this.songTickCallback = onTick ?? null;
    this.isPlayingSong = true;
    this.ensureContext();

    // Musical arrangements for the 2 original romantic songs
    const teriHasiChords = [
      [220.0, 261.63, 329.63, 392.0], // Am7
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [130.81, 196.0, 261.63, 329.63], // C
      [196.0, 246.94, 293.66, 392.0], // G
    ];
    const teriHasiLead = [
      523.25, 493.88, 440.0, 392.0, 440.0, 523.25, 587.33, 523.25,
      440.0, 392.0, 349.23, 392.0, 440.0, 523.25, 493.88, 440.0,
      392.0, 440.0, 523.25, 659.25, 587.33, 523.25, 493.88, 392.0,
      440.0, 493.88, 523.25, 587.33, 659.25, 587.33, 523.25, 440.0,
    ];

    const chaandChords = [
      [174.61, 220.0, 261.63, 349.23], // F
      [146.83, 220.0, 261.63, 349.23], // Dm7
      [116.54, 174.61, 233.08, 293.66], // Bb
      [130.81, 196.0, 261.63, 329.63], // C
    ];
    const chaandLead = [
      440.0, 523.25, 587.33, 523.25, 440.0, 349.23,
      392.0, 440.0, 523.25, 440.0, 349.23, 293.66,
      349.23, 440.0, 466.16, 587.33, 523.25, 440.0,
      392.0, 440.0, 523.25, 659.25, 587.33, 523.25,
    ];

    const stepMs = this.activeSongId === 'teri-hasi' ? 395 : 420;
    const chords = this.activeSongId === 'teri-hasi' ? teriHasiChords : chaandChords;
    const lead = this.activeSongId === 'teri-hasi' ? teriHasiLead : chaandLead;
    this.songStepIdx = Math.floor(this.songElapsedSec / (stepMs / 1000));

    const playMusicStep = () => {
      if (!this.isPlayingSong) return;
      const chordIdx = Math.floor(this.songStepIdx / 4) % chords.length;
      const chord = chords[chordIdx];

      // Plucked acoustic arpeggio
      const arpNote = chord[this.songStepIdx % chord.length];
      this.playTone(arpNote, 0.72, 'sine', 0.032);

      // Warm pad chord on beat 1 of each bar
      if (this.songStepIdx % 4 === 0) {
        chord.forEach((f, idx) => {
          this.playTone(f * 0.5, 1.8, 'sine', idx === 0 ? 0.03 : 0.014, idx * 0.02);
        });
      }

      // Expressive vocal-like lead melody phrase
      const melodyFreq = lead[this.songStepIdx % lead.length];
      this.playWarmVoiceNote(melodyFreq, 0.78, 0.044);

      this.songStepIdx += 1;
      this.songTimer = window.setTimeout(playMusicStep, stepMs);
    };

    let lastWall = performance.now();
    this.songTickCallback?.(this.songElapsedSec);
    this.songTickTimer = window.setInterval(() => {
      if (!this.isPlayingSong) return;
      const now = performance.now();
      const dt = (now - lastWall) / 1000;
      lastWall = now;
      this.songElapsedSec = (this.songElapsedSec + dt) % this.songDurationSec;
      this.songTickCallback?.(this.songElapsedSec);
    }, 120);

    playMusicStep();
  }

  public seekLyricSong(timeSec: number): void {
    const clamped = Math.max(0, Math.min(this.songDurationSec - 0.1, timeSec));
    this.songElapsedSec = clamped;
    this.songTickCallback?.(clamped);
    if (this.isPlayingSong) {
      const cb = this.songTickCallback ?? undefined;
      this.startLyricSong(this.activeSongId, this.songDurationSec, clamped, cb);
    }
  }

  public stopLyricSong(): void {
    this.isPlayingSong = false;
    if (this.songTimer !== null) {
      window.clearTimeout(this.songTimer);
      this.songTimer = null;
    }
    if (this.songTickTimer !== null) {
      window.clearInterval(this.songTickTimer);
      this.songTickTimer = null;
    }
  }

  public playSparkle(): void {
    this.playTone(783.99, 0.22, 'sine', 0.05, 0);
    this.playTone(987.77, 0.24, 'sine', 0.045, 0.06);
    this.playTone(1174.66, 0.32, 'triangle', 0.04, 0.12);
  }

  public playHeartPop(): void {
    this.playTone(523.25, 0.15, 'sine', 0.055, 0);
    this.playTone(698.46, 0.22, 'sine', 0.055, 0.05);
  }

  public playKiss(): void {
    this.playTone(880.0, 0.12, 'sine', 0.045, 0);
    this.playTone(1046.5, 0.18, 'triangle', 0.045, 0.06);
  }

  public playHugWarmth(): void {
    this.playTone(261.63, 0.9, 'sine', 0.05, 0);
    this.playTone(329.63, 0.9, 'sine', 0.045, 0.08);
    this.playTone(392.0, 1.0, 'sine', 0.045, 0.16);
    this.playTone(523.25, 1.1, 'triangle', 0.035, 0.24);
  }

  public playGiftOpen(): void {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      this.playTone(n, 0.45, 'triangle', 0.05, idx * 0.09);
    });
  }

  public playDanceChime(): void {
    const notes = [587.33, 698.46, 880.0, 1046.5];
    notes.forEach((n, idx) => {
      this.playTone(n, 0.2, 'sine', 0.045, idx * 0.07);
    });
  }

  public playElectricSpark(): void {
    const freqs = [1480, 987.77, 1760, 1174.66, 2093];
    freqs.forEach((f, idx) => {
      this.playTone(f, 0.09, idx % 2 === 0 ? 'sawtooth' : 'triangle', 0.024, idx * 0.032);
    });
    this.playTone(659.25, 0.28, 'sine', 0.04, 0.14);
  }
}

export const soundEngine = new SoundEngine();
