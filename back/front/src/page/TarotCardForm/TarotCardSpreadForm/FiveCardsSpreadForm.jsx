import React from 'react';
import styles from '../../../styles/scss/_FiveCardsSpreadForm.module.scss';
import {
  tarotCardImageFilesList,
  tarotCardImageFilesPathList,
} from '../../../data/images/images.jsx';
import { useSelectedTarotCards } from '../../../hooks/dispatch/tarotDispatch.jsx';
const FiveCardsSpreadForm = props => {
  const selectedTarotCards = useSelectedTarotCards();
  const imagePath = index => {
    if (selectedTarotCards?.length !== 0) {
      const foundIndex = tarotCardImageFilesList.findIndex(
        elem => elem.split('.')[0] === selectedTarotCards[index]['file_name']
      );
      return tarotCardImageFilesPathList[foundIndex];
    }
  };
  const handleFlip = selectedCardIndex => {
    props.updateCardForm({
      ...props.cardForm,
      flippedIndex: [...props.cardForm.flippedIndex, selectedCardIndex],
    });
  };
  const isCardClicked = selectedCardIndex =>
    props.cardForm.flippedIndex.includes(selectedCardIndex) &&
    selectedTarotCards?.length === props.totalCardsNumber;
  let totalCardsNumberList = [];
  for (let i = 0; i < props.totalCardsNumber; i++) {
    totalCardsNumberList.push(i);
  }
  return (
    <>
      <div className={styles['spread-container']}>
        {totalCardsNumberList.map(elem => {
          return (
            <>
              <div
                className={`${styles['flip']} ${
                  isCardClicked(selectedTarotCards[elem]?.index)
                    ? styles['flip-click']
                    : ''
                }`}
                onClick={() => {
                  if (selectedTarotCards?.length === props.totalCardsNumber) {
                    handleFlip(selectedTarotCards[elem]?.index);
                  }
                }}
              >
                {selectedTarotCards?.length >= elem + 1 ? (
                  <>
                    <div className={styles['front']}>
                      <img
                        src={imagePath(elem)}
                        alt="front"
                        draggable={false}
                      />
                    </div>
                    <div className={styles['back']}>
                      <img
                        src={'/assets/images/tarot_card_back.jpg'}
                        alt="back"
                        draggable={false}
                      />
                    </div>
                  </>
                ) : null}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default FiveCardsSpreadForm;
