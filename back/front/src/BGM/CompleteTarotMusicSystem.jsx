import { useEffect, useState } from "react";
import { TarotCardMusic } from "./TarotCardMusic";
import { AudioVisualizer } from "./AudioVisualizer";
import { TarotCardInteraction } from "./TarotCardInteratctionMusic";
const CompleteTarotMusicSystem = () => {
  const [musicSystem, setMusicSystem] = useState(null);
  const [currentMode, setCurrentMode] = useState('ambient'); 
  const [volume, setVolume] = useState(0.3);
  useEffect(() => {
    const system = new TarotCardMusic();
    setMusicSystem(system);
    if (currentMode === 'ambient') {
      system.createAmbientNoise();
    }
  }, []);
  const switchMusicMode = (mode) => {
    setCurrentMode(mode);
    if (!musicSystem) return;
    switch(mode) {
      case 'ambient':
        musicSystem.createAmbientNoise();
        break;
      case 'silent':
        musicSystem.currentNodes.forEach(({oscillator}) => {
          try { oscillator.stop(); } catch(e) {}
        });
        break;
      case 'card-specific':
        break;
    }
  };
  return (
    <div className="complete-tarot-music">
      <div className="music-controls">
        <h3>🎭 타로 음악 시스템</h3>
        <div className="mode-selector">
          {['ambient', 'card-specific', 'silent'].map(mode => (
            <button 
              key={mode}
              onClick={() => switchMusicMode(mode)}
              className={currentMode === mode ? 'active' : ''}
            >
              {mode}
            </button>
          ))}
        </div>
        <div className="volume-control">
          <label>볼륨: </label>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1"
            value={volume}
            onChange={(e) => {
              setVolume(e.target.value);
              if (musicSystem) {
                musicSystem.masterGain.gain.value = e.target.value;
              }
            }}
          />
        </div>
      </div>
      <AudioVisualizer audioContext={musicSystem?.audioContext} />
      <TarotCardInteraction 
        onCardDraw={(card) => {
          if (currentMode === 'card-specific' && musicSystem) {
            musicSystem.generateCardMusic(card.name, card.suit);
          }
        }}
      />
    </div>
  );
};
export default CompleteTarotMusicSystem;
