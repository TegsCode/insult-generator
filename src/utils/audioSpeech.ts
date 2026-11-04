import { Era } from '../types/insult';

class AudioSynthesizer {
  private audioCtx: AudioContext | null = null;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Synthesize theatrical heraldic trumpet fanfare using Web Audio
  public playFanfare(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0, now + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + (idx === 3 ? 0.6 : 0.2));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.7);
    });
  }

  // Synthesize antique gavel or rapier clang
  public playGavel(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Synthesize quill / parchment flourish sound
  public playParchmentRustle(): void {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1800;
    filter.Q.value = 2.0;

    const gain = ctx.createGain();
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  }
}

export const soundEffects = new AudioSynthesizer();

export function reciteTheatricalBurn(
  text: string,
  era: Era,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  window.speechSynthesis.cancel();

  // Play fanfare right before delivery
  soundEffects.playFanfare();

  const utterance = new SpeechSynthesisUtterance(text);

  // Find preferred British / regal voices
  const voices = window.speechSynthesis.getVoices();
  const britishVoice = voices.find(
    v =>
      (v.lang.includes('en-GB') || v.lang.includes('en_GB') || v.name.toLowerCase().includes('british') || v.name.toLowerCase().includes('uk') || v.name.toLowerCase().includes('daniel') || v.name.toLowerCase().includes('oliver'))
  ) || voices.find(v => v.lang.startsWith('en'));

  if (britishVoice) {
    utterance.voice = britishVoice;
  }

  // Era-based theatrical vocal tuning
  if (era === 'victorian') {
    utterance.pitch = 0.9;
    utterance.rate = 0.88; // Stately, cold, deliberate
  } else if (era === 'elizabethan') {
    utterance.pitch = 1.05;
    utterance.rate = 0.92; // Theatrical Globe Theatre cadence
  } else if (era === 'medieval') {
    utterance.pitch = 0.85;
    utterance.rate = 0.95; // Rough, guttural
  } else {
    utterance.pitch = 0.95;
    utterance.rate = 0.90;
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopTheatricalBurn(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
