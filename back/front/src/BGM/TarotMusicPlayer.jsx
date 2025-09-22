import React, { useState, useEffect, useRef } from 'react';
import { TarotMusicGenerator } from './TarotMusicGenerator/TarotMusicGenerator';
export const TarotMusicPlayer = () => {
  const [musicGenerator, setMusicGenerator] = useState(null);
  const [isGenerativeMode, setIsGenerativeMode] = useState(false);
  const [currentMood, setCurrentMood] = useState('mystical');
  const intervalRef = useRef(null);
  useEffect(() => {
    const generator = new TarotMusicGenerator();
    setMusicGenerator(generator);
    return () => {
      if (generator) {
        generator.currentNodes.forEach(({ oscillator }) => {
          try {
            oscillator.stop();
          } catch (e) {}
        });
      }
    };
  }, []);
  const musicThemes = {
    mystical: {
      baseFreq: 220, 
      chordProgression: [220, 246.94, 277.18, 293.66], 
      bellInterval: 8000,
      ambientLevel: 0.3,
    },
    celtic: {
      baseFreq: 196, 
      chordProgression: [196, 220, 246.94, 261.63], 
      bellInterval: 12000,
      ambientLevel: 0.4,
    },
    cosmic: {
      baseFreq: 174, 
      chordProgression: [174, 196, 220, 233.08], 
      bellInterval: 15000,
      ambientLevel: 0.2,
    },
  };
  const startGenerativeMusic = () => {
    if (!musicGenerator) return;
    setIsGenerativeMode(true);
    const theme = musicThemes[currentMood];
    const ambient = musicGenerator.createAmbientNoise();
    ambient.source.start();
    let chordIndex = 0;
    const playChordProgression = () => {
      const freq = theme.chordProgression[chordIndex];
      musicGenerator.createMysticalChord(freq, 6);
      chordIndex = (chordIndex + 1) % theme.chordProgression.length;
    };
    playChordProgression();
    intervalRef.current = setInterval(playChordProgression, 4000);
    const bellTimer = () => {
      musicGenerator.createBellSound(theme.baseFreq * 2);
      setTimeout(bellTimer, theme.bellInterval + Math.random() * 5000);
    };
    setTimeout(bellTimer, theme.bellInterval);
  };
  const stopGenerativeMusic = () => {
    setIsGenerativeMode(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (musicGenerator) {
      musicGenerator.currentNodes.forEach(({ oscillator }) => {
        try {
          oscillator.stop();
        } catch (e) {}
      });
      musicGenerator.currentNodes = [];
    }
  };
  return (
    <div className="tarot-music-player">
      <h3>🎵 타로 음악 설정</h3>
      <div className="music-mode-selector">
        <label>
          <input
            type="radio"
            name="musicMode"
            checked={!isGenerativeMode}
            onChange={() => setIsGenerativeMode(false)}
          />
          파일 음악
        </label>
        <label>
          <input
            type="radio"
            name="musicMode"
            checked={isGenerativeMode}
            onChange={() => setIsGenerativeMode(true)}
          />
          생성 음악
        </label>
      </div>
      {isGenerativeMode && (
        <div className="generative-controls">
          <select
            value={currentMood}
            onChange={e => setCurrentMood(e.target.value)}
            disabled={musicGenerator?.isPlaying}
          >
            <option value="mystical">신비로운</option>
            <option value="celtic">켈틱</option>
            <option value="cosmic">우주적</option>
          </select>
          <button onClick={startGenerativeMusic}>🎼 생성 음악 시작</button>
          <button onClick={stopGenerativeMusic}>⏹️ 정지</button>
        </div>
      )}
    </div>
  );
};
