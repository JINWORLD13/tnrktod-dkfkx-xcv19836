import React, { useEffect } from 'react';
import styles from '../../styles/scss/_TarotCardChoiceForm.module.scss';
import { backImagePath } from '../../data/images/images.jsx';
import { useTranslation } from 'react-i18next';
import {
  useSelectedTarotCards,
  useTarotCardDeck,
  useTotalCardsNumber,
} from '../../hooks/dispatch/tarotDispatch.jsx';
import { useDispatch } from 'react-redux';
import { drawCard } from '../../data/reduxStore/tarotCardStore.jsx';
import { setIsWaiting } from '../../data/reduxStore/booleanStore.jsx';
import CancelButton from '../../UI/CancelButton.jsx';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
const TarotCardChoiceForm = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const tarotCardDeck = useTarotCardDeck();
  const selectedTarotCards = useSelectedTarotCards();
  const totalCardsNumber = useTotalCardsNumber();
  const browserLanguage = useLanguageChange();
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
    handleWhichTarot,
    ...rest3
  } = props.handleStateGroup;
  const handleOnSubmit = (e, card) => {
    const updatedSelectedTarotCards = [...selectedTarotCards, card];
    if (totalCardsNumber === updatedSelectedTarotCards.length) {
      if (whichTarot === 2 || whichTarot === 3 || whichTarot === 4) {
        closeAllModals();
        props.onSubmit(e, updatedSelectedTarotCards);
      }
    }
  };
  const handleDrawCard = i => {
    updateCardForm({
      ...cardForm,
      selectedCardIndexList: [...cardForm?.selectedCardIndexList, i],
    });
    dispatch(drawCard({ cardNumber: totalCardsNumber, shuffledCardIndex: i }));
  };
  const closeAllModals = () => {
    toggleSpreadModal(false, questionForm?.spreadListNumber, '', 0);
    toggleTarotModal(false, questionForm?.spreadListNumber, '', 0);
    updateAnswerForm(prev => {
      return { ...prev, isWaiting: true };
    });
    dispatch(setIsWaiting(true));
  };
  return (
    <>
      <div className={styles['choice-box']}>
        <div className={styles['flex-grow3']} />
        <div className={styles['choice-spread']}>
          {tarotCardDeck.slice(0, 26).map((card, i) => {
            return (
              <div
                className={`${styles['choice-card']} ${
                  cardForm?.selectedCardIndexList.includes(i)
                    ? styles['invisible']
                    : null
                }
                      }`}
                onClick={e => {
                  if (cardForm?.selectedCardIndexList.includes(i)) return;
                  if (
                    cardForm?.selectedCardIndexList?.length === totalCardsNumber
                  ) {
                    updateCSSInvisible(true);
                    return;
                  }
                  handleDrawCard(i);
                  handleOnSubmit(e, card);
                }}
              >
                <img src={backImagePath} alt="back" draggable={false} />
              </div>
            );
          })}
        </div>
        <div className={styles['choice-spread']}>
          {tarotCardDeck.slice(26, 52).map((card, i) => {
            return (
              <div
                type="submit"
                className={`${styles['choice-card']} ${
                  cardForm?.selectedCardIndexList.includes(i + 26)
                    ? styles['invisible']
                    : null
                }`}
                onClick={e => {
                  if (cardForm?.selectedCardIndexList.includes(i + 26)) return;
                  if (
                    cardForm?.selectedCardIndexList?.length === totalCardsNumber
                  ) {
                    updateCSSInvisible(true);
                    return;
                  }
                  handleDrawCard(i + 26);
                  handleOnSubmit(e, card);
                }}
              >
                <img src={backImagePath} alt="back" draggable={false} />
              </div>
            );
          })}
        </div>
        <div className={styles['choice-spread']}>
          {tarotCardDeck.slice(52, 78).map((card, i) => {
            return (
              <div
                type="submit"
                className={`${styles['choice-card']} ${
                  cardForm?.selectedCardIndexList.includes(i + 52)
                    ? styles['invisible']
                    : null
                }`}
                onClick={e => {
                  if (cardForm?.selectedCardIndexList.includes(i + 52)) return;
                  if (
                    cardForm?.selectedCardIndexList?.length === totalCardsNumber
                  ) {
                    updateCSSInvisible(true);
                    return;
                  }
                  handleDrawCard(i + 52);
                  handleOnSubmit(e, card);
                }}
              >
                <img src={backImagePath} alt="back" draggable={false} />
              </div>
            );
          })}
        </div>
        <div className={styles['flex-grow2']} />
        <div className={styles['btn-box']}>
          <CancelButton
            className={`${
              browserLanguage === 'ja' ? styles['btn-japanese'] : styles['btn']
            }`}
            onClick={(e=null) => {
              handleSpreadValue(false);
              handleResetDeck();
              updateCSSInvisible(false);
              updateAnswerForm(prev => {
                return { ...prev, isSubmitted: false };
              });
            }}
          >
            {t(`button.cancel`)}
          </CancelButton>
        </div>
      </div>
    </>
  );
};
export default TarotCardChoiceForm;
