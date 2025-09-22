export class TarotMusicGenerator {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.connect(this.audioContext.destination);
    this.masterGain.gain.value = 0.3;
    this.isPlaying = false;
    this.currentNodes = [];
  }
  createMysticalChord(frequency, duration = 4) {
    const now = this.audioContext.currentTime;
    const chord = [frequency, frequency * 1.25, frequency * 1.5, frequency * 2]; 
    chord.forEach((freq, index) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = freq;
      gainNode.gain.value = 0.1 / (index + 1);
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(gainNode.gain.value, now + 0.5);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain);
      oscillator.start(now);
      oscillator.stop(now + duration);
      this.currentNodes.push({ oscillator, gainNode });
    });
  }
  createAmbientNoise() {
    const bufferSize = this.audioContext.sampleRate * 2;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.1;
    }
    for (let i = 1; i < bufferSize; i++) {
      data[i] = data[i] * 0.1 + data[i-1] * 0.9;
    }
    const source = this.audioContext.createBufferSource();
    const filter = this.audioContext.createBiquadFilter();
    const gainNode = this.audioContext.createGain();
    source.buffer = buffer;
    source.loop = true;
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    gainNode.gain.value = 0.05;
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    return { source, filter, gainNode };
  }
  createBellSound(frequency = 440) {
    const now = this.audioContext.currentTime;
    const partials = [1, 2.76, 5.4, 8.93, 13.34];
    partials.forEach((partial, index) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      oscillator.frequency.value = frequency * partial;
      oscillator.type = 'sine';
      const volume = 0.2 / (index + 1);
      gainNode.gain.setValueAtTime(volume, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 3);
      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain);
      oscillator.start(now);
      oscillator.stop(now + 3);
    });
  }
}
