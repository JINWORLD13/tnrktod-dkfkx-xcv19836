import React, { useEffect, useState } from 'react';
import { X, ArrowLeft, Sparkles, EyeOff, EyeIcon } from 'lucide-react';
import styles from './CardDetailModal.module.scss';
const CardDetailModal = ({ card, onClose, language = 'en' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCards, setShowCards] = useState(true);
  useEffect(() => {
    setIsVisible(true);
    const handleEscape = e => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };
  const getCardMeaning = cardName => {
    const meanings = {
    };
    return meanings[cardName] || meanings['Default'];
  };
  const cardMeaning = getCardMeaning(card.name);
  const isReversed = !!(
    card?.reversed ||
    card?.isReversed ||
    card?.orientation === 'reversed'
  );
  return (
    <div
      className={`${styles.cardDetailOverlay} ${
        isVisible ? styles.visible : ''
      }`}
    >
      <div
        className={`${styles.cardDetailModal} ${
          isVisible ? styles.visible : ''
        }`}
      >
        {}
        <div className={styles.cosmicBackground}>
          <div className={styles.stars}></div>
          <div className={styles.cosmicDust}></div>
        </div>
        {}
        <div className={styles.detailHeader}>
          <button className={styles.backBtn} onClick={handleClose}>
            <ArrowLeft />
            <span>Back</span>
          </button>
          <h2 className={styles.cardTitle}>
            <Sparkles className={styles.titleIcon} />
            {card.name}
            {isReversed && (
              <span className={styles.reversedIndicator}>(Reversed)</span>
            )}
          </h2>
          <button className={styles.closeBtn} onClick={handleClose}>
            <X />
          </button>
        </div>
        {}
        <div className={styles.detailContent}>
          {showCards && (
            <div className={styles.cardDisplay}>
              <div className={styles.cardRim}>
                <div
                  className={`${styles.cardImageContainer} ${
                    styles.imageClamp
                  } ${isReversed ? styles.reversed : ''}`}
                >
                  <img
                    src={card.image}
                    alt={`${card.name}${
                      isReversed ? ' (Reversed)' : ''
                    } tarot card`}
                  />
                  <div className={styles.cardAura}></div>
                </div>
              </div>{' '}
              <div className={`${styles.showCard} ${styles}`}>
                <button
                  className={styles.toggleCardsBtn}
                  onClick={() => setShowCards(prev => !prev)}
                >
                  {showCards ? <EyeOff /> : <EyeIcon />}
                </button>
              </div>
            </div>
          )}
          {!showCards && (
            <div
              className={`${
                showCards ? styles.showCard : styles['showCard-alt']
              }`}
            >
              <button
                className={styles.toggleCardsBtn}
                onClick={() => setShowCards(prev => !prev)}
              >
                {showCards ? <EyeOff /> : <EyeIcon />}
              </button>
            </div>
          )}
          {}
          <div className={styles.cardInfo}>
            <div className={styles.meaningSection}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.icon}>🔮</span>
                Current Interpretation
              </h3>
              <div className={styles.meaningContent}>
                <p className={styles.primaryMeaning}>
                  <strong>{isReversed ? 'Reversed:' : 'Upright:'}</strong>{' '}
                  {isReversed ? cardMeaning.reversed : cardMeaning.upright}
                </p>
              </div>
            </div>
            <div className={styles.meaningSection}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.icon}>⭐</span>
                General Meaning
              </h3>
              <div className={styles.meaningContent}>
                <p>{cardMeaning.general}</p>
              </div>
            </div>
            <div className={styles.meaningSection}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.icon}>💖</span>
                Love & Relationships
              </h3>
              <div className={styles.meaningContent}>
                <p>{cardMeaning.love}</p>
              </div>
            </div>
            <div className={styles.meaningSection}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.icon}>💼</span>
                Career & Finance
              </h3>
              <div className={styles.meaningContent}>
                <p>{cardMeaning.career}</p>
              </div>
            </div>
            <div className={`${styles.meaningSection} ${styles.advice}`}>
              <h3 className={styles.sectionTitle}>
                <span className={styles.icon}>✨</span>
                Cosmic Advice
              </h3>
              <div className={styles.meaningContent}>
                <p className={styles.adviceText}>{cardMeaning.advice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardDetailModal;
