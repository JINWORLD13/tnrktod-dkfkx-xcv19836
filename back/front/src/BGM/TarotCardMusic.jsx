import { TarotMusicGenerator } from "./TarotMusicGenerator/TarotMusicGenerator";
export class TarotCardMusic extends TarotMusicGenerator {
  cardMusicMap = {
    major: {
      'fool': { scale: 'C_major', tempo: 'slow', mood: 'hopeful' },
      'magician': { scale: 'E_minor', tempo: 'medium', mood: 'powerful' },
      'death': { scale: 'D_minor', tempo: 'very_slow', mood: 'transformative' },
      'sun': { scale: 'D_major', tempo: 'fast', mood: 'joyful' }
    },
    suits: {
      'wands': { scale: 'G_major', tempo: 'fast', mood: 'energetic' },
      'cups': { scale: 'F_major', tempo: 'slow', mood: 'emotional' },
      'swords': { scale: 'A_minor', tempo: 'medium', mood: 'intellectual' },
      'pentacles': { scale: 'C_major', tempo: 'steady', mood: 'grounding' }
    }
  };
  generateCardMusic(cardName, suit = null) {
    const config = suit 
      ? this.cardMusicMap.suits[suit.toLowerCase()]
      : this.cardMusicMap.major[cardName.toLowerCase()];
    if (!config) return;
    const scaleFrequencies = this.getScaleFrequencies(config.scale);
    const melodyLength = this.getMelodyLength(config.tempo);
    this.playCardMelody(scaleFrequencies, melodyLength, config.mood);
  }
  getScaleFrequencies(scale) {
    const scales = {
      'C_major': [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88],
      'A_minor': [220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00],
      'G_major': [196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 369.99],
      'F_major': [174.61, 196.00, 220.00, 233.08, 261.63, 293.66, 329.63],
      'D_major': [146.83, 164.81, 185.00, 196.00, 220.00, 246.94, 277.18],
      'E_minor': [164.81, 185.00, 196.00, 220.00, 246.94, 261.63, 293.66],
      'D_minor': [146.83, 164.81, 174.61, 196.00, 220.00, 233.08, 261.63]
    };
    return scales[scale] || scales['C_major'];
  }
  getMelodyLength(tempo) {
    const tempos = {
      'very_slow': 2.0,
      'slow': 1.5,
      'medium': 1.0,
      'fast': 0.75,
      'very_fast': 0.5
    };
    return tempos[tempo] || 1.0;
  }
  playCardMelody(frequencies, noteLength, mood) {
    const now = this.audioContext.currentTime;
    const melodyPattern = this.generateMelodyPattern(mood);
    melodyPattern.forEach((noteIndex, i) => {
      const startTime = now + (i * noteLength);
      const frequency = frequencies[noteIndex];
      this.playNote(frequency, startTime, noteLength * 0.8, mood);
    });
  }
  generateMelodyPattern(mood) {
    const patterns = {
      'hopeful': [0, 2, 4, 5, 4, 2, 0], 
      'powerful': [0, 4, 0, 6, 4, 0], 
      'transformative': [0, 1, 2, 1, 0, 6, 5], 
      'joyful': [0, 2, 4, 6, 5, 4, 2, 0], 
      'energetic': [0, 4, 2, 6, 4, 0, 2], 
      'emotional': [0, 2, 1, 3, 2, 1, 0], 
      'intellectual': [0, 3, 1, 4, 2, 5, 0], 
      'grounding': [0, 0, 2, 2, 4, 4, 0] 
    };
    return patterns[mood] || patterns['hopeful'];
  }
  playNote(frequency, startTime, duration, mood) {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    const waveforms = {
      'hopeful': 'sine',
      'powerful': 'square',
      'transformative': 'sawtooth',
      'joyful': 'triangle',
      'energetic': 'square',
      'emotional': 'sine',
      'intellectual': 'triangle',
      'grounding': 'sine'
    };
    oscillator.type = waveforms[mood] || 'sine';
    oscillator.frequency.value = frequency;
    filter.type = 'lowpass';
    filter.frequency.value = frequency * 4;
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  }
}
