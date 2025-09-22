import React from 'react';
import styles from '../../../styles/scss/_TwoCardsSpreadForm.module.scss';
import {
  tarotCardImageFilesList,
  tarotCardImageFilesPathList,
} from '../../../data/images/images.jsx';
import {
  useSelectedTarotCards,
  useTotalCardsNumber,
} from '../../../hooks/dispatch/tarotDispatch.jsx';
const TwoCardsSpreadForm = props => {
  const selectedTarotCards = useSelectedTarotCards();
  const totalCardsNumber = useTotalCardsNumber();
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
    selectedTarotCards?.length === totalCardsNumber;
  let totalCardsNumberList = [];
  for (let i = 0; i < totalCardsNumber; i++) {
    totalCardsNumberList.push(i);
  }
  return (
    <>
      <div className={styles['linear-spread-container']}>
        {totalCardsNumberList.map((elem, i) => {
          return (
            <>
              <div
                className={`${styles['flip']} ${
                  isCardClicked(selectedTarotCards[elem]?.index)
                    ? styles['flip-click']
                    : ''
                }`}
                onClick={() => {
                  if (selectedTarotCards?.length === totalCardsNumber) {
                    handleFlip(selectedTarotCards[elem]?.index);
                  }
                }}
              >
                {selectedTarotCards?.length >= elem + 1 ? (
                  <>
                    <div
                      className={`${styles['front']} ${
                        selectedTarotCards[elem].reversed
                          ? styles['front-reversed']
                          : ''
                      }`}
                      onClick={e => {
                        props?.setWhichCardPosition(prev => {
                          return { isClicked: true, position: i+1 };
                        });
                      }}
                    >
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
export default TwoCardsSpreadForm;
