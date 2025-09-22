import { useEffect, useState } from "react";
import { TarotCardMusic } from "./TarotCardMusic";
export const TarotCardInteraction = ({ onCardDraw }) => {
  const [cardMusic, setCardMusic] = useState(null);
  const [drawnCard, setDrawnCard] = useState(null);
  useEffect(() => {
    const music = new TarotCardMusic();
    setCardMusic(music);
  }, []);
  const handleCardDraw = (card) => {
    setDrawnCard(card);
    cardMusic.createBellSound(440);
    setTimeout(() => {
      if (card.type === 'major') {
        cardMusic.generateCardMusic(card.name);
      } else {
        cardMusic.generateCardMusic(card.name, card.suit);
      }
    }, 500);
    onCardDraw(card);
  };
  const createSpreadMusic = (cards) => {
    cards.forEach((card, index) => {
      setTimeout(() => {
        const baseFreq = 220 * Math.pow(1.26, index); 
        cardMusic.createMysticalChord(baseFreq, 3);
      }, index * 1000);
    });
  };
  return (
    <div className="tarot-interaction">
      <button 
        onClick={() => handleCardDraw({
          name: 'fool', 
          type: 'major',
          meaning: 'new beginnings'
        })}
        className="draw-card-btn"
      >
        🃏 카드 뽑기
      </button>
      {drawnCard && (
        <div className="card-display">
          <h3>{drawnCard.name}</h3>
          <p>{drawnCard.meaning}</p>
        </div>
      )}
    </div>
  );
};
