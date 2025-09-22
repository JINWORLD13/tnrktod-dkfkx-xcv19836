import React, { useState, useEffect } from 'react';
import styles from '../../styles/scss/_TarotCardDeckForm.module.scss';
import TarotCardShuffleForm from './TarotCardDeckShuffleForm.jsx';
import { backImagePath } from '../../data/images/images.jsx';
import {
  useSelectedTarotCards,
  useTarotCardDeck,
} from '../../hooks/dispatch/tarotDispatch.jsx';
import { useDispatch } from 'react-redux';
import { shuffleTarotCardDeck } from '../../data/reduxStore/tarotCardStore.jsx';
const TarotCardDeckForm = props => {
  const dispatch = useDispatch();
  const [isClickable, setIsClickable] = useState(true);
  const [isDeckClicked, setIsDeckClicked] = useState(false);
  const tarotCardDeck = useTarotCardDeck();
  const selectedTarotCards = useSelectedTarotCards();
  const {
    answerForm,
    cardForm,
    questionForm,
    modalForm,
    whichTarot,
    cssInvisible,
    country,
  } = props.stateGroup;
  const {
    updateAnswerForm,
    updateCardForm,
    updateQuestionForm,
    updateModalForm,
    updateWhichTarot,
    updateCSSInvisible,
    updateCountry,
    setWhichCardPosition,
    ...rest
  } = props.setStateGroup;
  const { toggleSpreadModal, toggleTarotModal } = props.toggleModalGroup;
  const {
    handleAnsweredState,
    handleCardForm,
    handleQuestionForm,
    handleResetAll,
    handleResetDeck,
    handleSpreadValue,
    handleSuffleFinishValue,
    handleWhichTarot,
    ...rest3
  } = props.handleStateGroup;
  const handleShuffleDeck = () => {
    dispatch(shuffleTarotCardDeck);
    updateCardForm({ ...cardForm, shuffle: cardForm?.shuffle + 1 });
  };
  const [timeoutId, setTimeoutId] = useState(null);
  const handleDeckClick = () => {
    if (isClickable) {
      setIsClickable(false);
      setIsDeckClicked(true);
      const id = setTimeout(() => {
        setIsClickable(true);
        setIsDeckClicked(false);
      }, 300);
      setTimeoutId(id);
    }
  };
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);
  return (
    <>
      <div
        className={`${styles.deck}`}
        onClick={() => {
          if (answerForm?.isSubmitted === true || whichTarot === 1) {
            handleShuffleDeck();
            handleDeckClick();
          }
        }}
        onDragEnd={() => {
          if (answerForm?.isSubmitted === true || whichTarot === 1) {
            handleSpreadValue(true);
            handleSuffleFinishValue(true);
            updateCSSInvisible(true);
          }
        }}
      >
        {}
        {isDeckClicked === true && selectedTarotCards?.length === 0 ? (
          <TarotCardShuffleForm />
        ) : (
          tarotCardDeck.slice(0, 40).map((elem, i) => {
            return (
              <div
                className={`${styles.card}`}
                draggable={
                  answerForm?.isSubmitted === false &&
                  (whichTarot === 2 || whichTarot === 3 || whichTarot === 4)
                    ? false
                    : true
                }
              >
                <img src={backImagePath} alt="back" draggable={false} />
              </div>
            );
          })
        )}
      </div>
      {}
    </>
  );
};
export default TarotCardDeckForm;
