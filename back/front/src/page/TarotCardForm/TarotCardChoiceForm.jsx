import React, { useEffect, useState } from 'react';
import styles from '../../styles/scss/_TarotCardChoiceForm.module.scss';
import { backImagePath } from '../../data/images/images.jsx';
import { useTranslation } from 'react-i18next';
import {
  useResetTarotCards,
  useSelectedTarotCards,
  useTarotCardDeck,
  useTotalCardsNumber,
} from '../../hooks/dispatch/tarotDispatch.jsx';
import { useDispatch } from 'react-redux';
import {
  drawCard,
  resetAllTarotCards,
  resetAllTarotCardsWithoutReverse,
} from '../../data/reduxStore/tarotCardStore.jsx';
import { setIsWaiting } from '../../data/reduxStore/booleanStore.jsx';
import Button from '../../UI/Button.jsx';
import CancelButton from '../../UI/CancelButton.jsx';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import useWindowSizeState from '../../hooks/useState/useWindowSizeState.jsx';
import { getTodayCard, setTodayCard } from '../../utils/tokenLocalStorage.jsx';
import {
  getTodayCardForNative,
  setTodayCardForNative,
} from '../../utils/tokenPreference.jsx';
import { Capacitor } from '@capacitor/core';
import { tarotDeck } from '../../data/TarotCardDeck/TarotCardDeck.jsx';
const isNative = Capacitor.isNativePlatform();
const TarotCardChoiceForm = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  let tarotCardDeck = useTarotCardDeck();
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
    ...restOfStateGroup
  } = props?.stateGroup;
  const {
    updateAnswerForm,
    updateCardForm,
    updateQuestionForm,
    updateModalForm,
    updateWhichTarot,
    updateCSSInvisible,
    updateCountry,
    setWhichCardPosition,
    ...restOfSetStateGroup
  } = props?.setStateGroup;
  const {
    toggleSpreadModal = () => {},
    toggleTarotModal = () => {},
    ...restOfToggleModalGroup
  } = props?.toggleModalGroup || {};
  const {
    handleAnsweredState,
    handleCardForm,
    handleQuestionForm,
    handleResetAll,
    handleResetDeck,
    handleReadyToShuffleValue,
    handleSpreadValue,
    handleWhichTarot,
    ...restOfHandleStateGroup
  } = props?.handleStateGroup;
  const [todayCardIndexInLocalStorage, setTodayCardIndexInLocalStorage] =
    useState(() => {
      if (props?.todayCardIndex) return props?.todayCardIndex;
      if (!isNative) return getTodayCard(props?.userInfo);
      if (isNative) return null;
    });
  useEffect(() => {
    const fetchTodayCard = async () => {
      try {
        const index = await getTodayCardForNative(props?.userInfo);
        if (cardForm?.selectedCardIndexList.length !== 0) {
          setTodayCardIndexInLocalStorage(cardForm?.selectedCardIndexList[0]);
        } else if (index) {
          setTodayCardIndexInLocalStorage(index);
        }
      } catch (error) {
        console.error("Error fetching today's card:", error);
      }
    };
    if (
      props?.from === 1 &&
      props?.isClickedForTodayCard &&
      isNative &&
      props?.userInfo?.email !== '' &&
      props?.userInfo?.email !== undefined
    ) {
      fetchTodayCard();
    }
    if (
      props?.from === 1 &&
      props?.isClickedForTodayCard &&
      !isNative &&
      props?.userInfo?.email !== '' &&
      props?.userInfo?.email !== undefined
    ) {
      setTodayCardIndexInLocalStorage(getTodayCard(props?.userInfo));
    }
  }, [
    isNative,
    props?.isClickedForTodayCard,
    props?.userInfo?.email,
    props?.userInfo,
    cardForm?.selectedCardIndexList?.length,
  ]);
  if (props?.from === 1) {
    const shuffleArray = array => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };
    tarotCardDeck = shuffleArray(tarotDeck);
  }
  const handleOnSubmit = (e, card) => {
    const updatedSelectedTarotCards = [...selectedTarotCards, card];
    if (totalCardsNumber === updatedSelectedTarotCards?.length) {
      if (whichTarot === 2 || whichTarot === 3 || whichTarot === 4) {
        closeAllModals();
        props?.onSubmit(e, updatedSelectedTarotCards, props?.onSubmitParam);
      }
    }
  };
  const [isClicked, setClicked] = useState(false);
  const handleDrawCard = i => {
    try {
      if (isClicked) return;
      setClicked(true);
      if (props?.from === 1) {
        if (!props?.userInfo?.email) {
          console.log('userInfo is invalid');
          return;
        }
        if (todayCardIndexInLocalStorage === null) {
          console.log('Setting today card...');
          if (isNative) setTodayCardForNative(i, props?.userInfo);
          if (!isNative) setTodayCard(i, props?.userInfo);
        }
        if (cardForm?.selectedCardIndexList?.length >= 1) {
          return;
        }
      }
      updateCardForm({
        ...cardForm,
        selectedCardIndexList: [...cardForm?.selectedCardIndexList, i],
      });
      dispatch(
        drawCard({ cardNumber: totalCardsNumber, shuffledCardIndex: i })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setClicked(false);
    }
  };
  const closeAllModals = () => {
    toggleSpreadModal &&
      toggleSpreadModal(false, questionForm?.spreadListNumber, '', 0);
    updateAnswerForm(prev => {
      return { ...prev, isWaiting: true };
    });
    toggleTarotModal &&
      toggleTarotModal(false, questionForm?.spreadListNumber, '', 0);
    dispatch(setIsWaiting(true));
  };
  const { windowWidth, windowHeight } = useWindowSizeState();
  return (
    <>
      {window !== 'undefined' && window.screen.width <= window.screen.height ? (
        <div className={styles['choice-box']}>
          <div className={styles['flex-grow3']} />
          <div className={styles['choice-spread']}>
            {tarotCardDeck?.slice(0, 13)?.map((card, i) => {
              return (
                <div
                  className={`${styles['choice-card']} ${
                    cardForm?.selectedCardIndexList?.includes(i)
                      ? styles['invisible']
                      : null
                  }
                      }`}
                  onClick={e => {
                    if (props?.from !== 1) {
                      if (cardForm?.selectedCardIndexList?.includes(i)) return;
                      if (
                        cardForm?.selectedCardIndexList?.length ===
                        totalCardsNumber
                      ) {
                        updateCSSInvisible(true);
                        return;
                      }
                      handleDrawCard(i);
                      handleOnSubmit(e, card);
                      setWhichCardPosition(prev => {
                        return {
                          ...prev,
                          isClicked: false,
                          position: -1,
                        };
                      });
                    } else {
                      if (cardForm?.selectedCardIndexList?.includes(i)) return;
                      handleDrawCard(card.index);
                      setWhichCardPosition(prev => {
                        return {
                          ...prev,
                          isClicked: false,
                          position: -1,
                        };
                      });
                    }
                  }}
                >
                  <img src={backImagePath} alt="back" draggable={false} />
                </div>
              );
            })}
          </div>
          <div className={styles['choice-spread']}>
            {tarotCardDeck?.slice(13, 26)?.map((card, i) => {
              return (
                <div
                  type="submit"
                  className={`${styles['choice-card']} ${
                    cardForm?.selectedCardIndexList?.includes(i + 13)
                      ? styles['invisible']
                      : null
                  }`}
                  onClick={e => {
                    if (props?.from !== 1) {
                      if (cardForm?.selectedCardIndexList?.includes(i + 13))
                        return;
                      if (
                        cardForm?.selectedCardIndexList?.length ===
                        totalCardsNumber
                      ) {
                        updateCSSInvisible(true);
                        return;
                      }
                      handleDrawCard(i + 13);
                      handleOnSubmit(e, card);
                      setWhichCardPosition(prev => {
                        return {
                          isClicked: false,
                          position: -1,
                        };
                      });
                    } else {
                      if (cardForm?.selectedCardIndexList?.includes(i)) return;
                      handleDrawCard(card.index);
                      setWhichCardPosition(prev => {
                        return {
                          ...prev,
                          isClicked: false,
                          position: -1,
                        };
                      });
                    }
                  }}
                >
                  <img src={backImagePath} alt="back" draggable={false} />
                </div>
              );
            })}
          </div>
          <div className={styles['choice-spread']}>
            {tarotCardDeck?.slice(26, 39)?.map((card, i) => {
              return (
                <div
                  type="submit"
                  className={`${styles['choice-card']} ${
                    cardForm?.selectedCardIndexList?.includes(i + 26)
                      ? styles['invisible']
                      : null
                  }`}
                  onClick={e => {
                    if (props?.from !== 1) {
                      if (cardForm?.selectedCardIndexList?.includes(i + 26))
                        return;
                      if (
                        cardForm?.selectedCardIndexList?.length ===
                        totalCardsNumber
                      ) {
                        updateCSSInvisible(true);
                        return;
                      }
                      handleDrawCard(i + 26);
                      handleOnSubmit(e, card);
                      setWhichCardPosition(prev => {
                        return {
                          isClicked: false,
                          position: -1,
                        };
                      });
                    } else {
                      if (cardForm?.selectedCardIndexList?.includes(i)) return;
                      handleDrawCard(card.index);
                      setWhichCardPosition(prev => {
                        return {
                          ...prev,
                          isClicked: false,
                          position: -1,
                        };
                      });
                    }
                  }}
                >
                  <img src={backImagePath} alt="back" draggable={false} />
                </div>
              );
            })}
          </div>
          <div className={styles['choice-spread']}>
            {tarotCardDeck?.slice(39, 52)?.map((card, i) => {
              return (
                <div
                  type="submit"
                  className={`${styles['choice-card']} ${
                    cardForm?.selectedCardIndexList?.includes(i + 39)
                      ? styles['invisible']
                      : null
                  }`}
                  onClick={e => {
                    if (props?.from !== 1) {
                      if (cardForm?.selectedCardIndexList?.includes(i + 39))
                        return;
                      if (
                        cardForm?.selectedCardIndexList?.length ===
                        totalCardsNumber
                      ) {
                        updateCSSInvisible(true);
                        return;
                      }
                      handleDrawCard(i + 39);
                      handleOnSubmit(e, card);
                      setWhichCardPosition(prev => {
                        return {
                          isClicked: false,
                          position: -1,
                        };
                      });
                    } else {
                      if (cardForm?.selectedCardIndexList?.includes(i)) return;
                      handleDrawCard(card.index);
                      setWhichCardPosition(prev => {
                        return {
                          ...prev,
                          isClicked: false,
                          position: -1,
                        };
                      });
                    }
                  }}
                >
                  <img src={backImagePath} alt="back" draggable={false} />
                </div>
              );
            })}
          </div>
          <div className={styles['choice-spread']}>
            {tarotCardDeck?.slice(52, 65)?.map((card, i) => {
              return (
                <div
                  type="submit"
                  className={`${styles['choice-card']} ${
                    cardForm?.selectedCardIndexList?.includes(i + 52)
                      ? styles['invisible']
                      : null
                  }`}
                  onClick={e => {
                    if (props?.from !== 1) {
                      if (cardForm?.selectedCardIndexList?.includes(i + 52))
                        return;
                      if (
                        cardForm?.selectedCardIndexList?.length ===
                        totalCardsNumber
                      ) {
                        updateCSSInvisible(true);
                        return;
                      }
                      handleDrawCard(i + 52);
                      handleOnSubmit(e, card);
                      setWhichCardPosition(prev => {
                        return {
                          isClicked: false,
                          position: -1,
                        };
                      });
                    } else {
                      if (cardForm?.selectedCardIndexList?.includes(i)) return;
                      handleDrawCard(card.index);
                      setWhichCardPosition(prev => {
                        return {
                          ...prev,
                          isClicked: false,
                          position: -1,
                        };
                      });
                    }
                  }}
                >
                  <img src={backImagePath} alt="back" draggable={false} />
                </div>
              );
            })}
          </div>
          <div className={styles['choice-spread']}>
            {tarotCardDeck?.slice(65, 78)?.map((card, i) => {
              return (
                <div
                  type="submit"
                  className={`${styles['choice-card']} ${
                    cardForm?.selectedCardIndexList?.includes(i + 65)
                      ? styles['invisible']
                      : null
                  }`}
                  onClick={e => {
                    if (props?.from !== 1) {
                      if (cardForm?.selectedCardIndexList?.includes(i + 65))
                        return;
                      if (
                        cardForm?.selectedCardIndexList?.length ===
                        totalCardsNumber
                      ) {
                        updateCSSInvisible(true);
                        return;
                      }
                      handleDrawCard(i + 65);
                      handleOnSubmit(e, card);
                      setWhichCardPosition(prev => {
                        return {
                          isClicked: false,
                          position: -1,
                        };
                      });
                    } else {
                      if (cardForm?.selectedCardIndexList?.includes(i)) return;
                      handleDrawCard(card.index);
                      setWhichCardPosition(prev => {
                        return {
                          ...prev,
                          isClicked: false,
                          position: -1,
                        };
                      });
                    }
                  }}
                >
                  <img src={backImagePath} alt="back" draggable={false} />
                </div>
              );
            })}
          </div>
          <div className={styles['flex-grow2']} />
          <div className={styles['btn-box']}>
            {props?.from !== 1 && (
              <CancelButton
                className={`${
                  browserLanguage === 'ja'
                    ? styles['btn-japanese']
                    : styles['btn']
                }`}
                onClick={(e = null) => {
                  handleResetDeck();
                  if (props?.from !== 1) {
                    if (whichTarot !== 1) {
                      updateCardForm({
                        ...cardForm,
                        isShuffleFinished: false,
                        selectedCardIndexList: [],
                      });
                      updateAnswerForm(prev => {
                        return {
                          ...prev,
                          isSubmitted: true,
                        };
                      });
                      handleReadyToShuffleValue(true);
                    }
                    if (whichTarot === 1) {
                      handleSpreadValue(false);
                      updateCSSInvisible(false);
                      updateAnswerForm(prev => {
                        return {
                          ...prev,
                          isSubmitted: false,
                          isWaiting: false,
                          isAnswered: false,
                        };
                      });
                    }
                    setWhichCardPosition(prev => {
                      return {
                        isClicked: false,
                        position: -1,
                      };
                    });
                  }
                }}
              >
                {t(`button.cancel`)}
              </CancelButton>
            )}
          </div>
        </div>
      ) : (
        <div className={styles['choice-box']}>
          <div className={styles['flex-grow3']} />
          <div className={styles['choice-spread']}>
            {tarotCardDeck?.slice(0, 26)?.map((card, i) => {
              return (
                <div
                  className={`${styles['choice-card']} ${
                    cardForm?.selectedCardIndexList?.includes(i)
                      ? styles['invisible']
                      : null
                  }
                      }`}
                  onClick={e => {
                    if (props?.from !== 1) {
                      if (cardForm?.selectedCardIndexList?.includes(i)) return;
                      if (
                        cardForm?.selectedCardIndexList?.length ===
                        totalCardsNumber
                      ) {
                        updateCSSInvisible(true);
                        return;
                      }
                      handleDrawCard(i);
                      handleOnSubmit(e, card);
                      setWhichCardPosition(prev => {
                        return {
                          isClicked: false,
                          position: -1,
                        };
                      });
                    } else {
                      if (cardForm?.selectedCardIndexList?.includes(i)) return;
                      handleDrawCard(card.index);
                      setWhichCardPosition(prev => {
                        return {
                          ...prev,
                          isClicked: false,
                          position: -1,
                        };
                      });
                    }
                  }}
                >
                  <img src={backImagePath} alt="back" draggable={false} />
                </div>
              );
            })}
          </div>
          <div className={styles['choice-spread']}>
            {tarotCardDeck?.slice(26, 52)?.map((card, i) => {
              return (
                <div
                  type="submit"
                  className={`${styles['choice-card']} ${
                    cardForm?.selectedCardIndexList?.includes(i + 26)
                      ? styles['invisible']
                      : null
                  }`}
                  onClick={e => {
                    if (props?.from !== 1) {
                      if (cardForm?.selectedCardIndexList?.includes(i + 26))
                        return;
                      if (
                        cardForm?.selectedCardIndexList?.length ===
                        totalCardsNumber
                      ) {
                        updateCSSInvisible(true);
                        return;
                      }
                      handleDrawCard(i + 26);
                      handleOnSubmit(e, card);
                      setWhichCardPosition(prev => {
                        return {
                          isClicked: false,
                          position: -1,
                        };
                      });
                    } else {
                      if (cardForm?.selectedCardIndexList?.includes(i)) return;
                      handleDrawCard(card.index);
                      setWhichCardPosition(prev => {
                        return {
                          ...prev,
                          isClicked: false,
                          position: -1,
                        };
                      });
                    }
                  }}
                >
                  <img src={backImagePath} alt="back" draggable={false} />
                </div>
              );
            })}
          </div>
          <div className={styles['choice-spread']}>
            {tarotCardDeck?.slice(52, 78)?.map((card, i) => {
              return (
                <div
                  type="submit"
                  className={`${styles['choice-card']} ${
                    cardForm?.selectedCardIndexList?.includes(i + 52)
                      ? styles['invisible']
                      : null
                  }`}
                  onClick={e => {
                    if (props?.from !== 1) {
                      if (cardForm?.selectedCardIndexList?.includes(i + 52))
                        return;
                      if (
                        cardForm?.selectedCardIndexList?.length ===
                        totalCardsNumber
                      ) {
                        updateCSSInvisible(true);
                        return;
                      }
                      handleDrawCard(i + 52);
                      handleOnSubmit(e, card);
                      setWhichCardPosition(prev => {
                        return {
                          isClicked: false,
                          position: -1,
                        };
                      });
                    } else {
                      if (cardForm?.selectedCardIndexList?.includes(i)) return;
                      handleDrawCard(card.index);
                      setWhichCardPosition(prev => {
                        return {
                          ...prev,
                          isClicked: false,
                          position: -1,
                        };
                      });
                    }
                  }}
                >
                  <img src={backImagePath} alt="back" draggable={false} />
                </div>
              );
            })}
          </div>
          <div className={styles['flex-grow2']} />
          <div className={styles['btn-box']}>
            {props?.from !== 1 && (
              <CancelButton
                className={`${
                  browserLanguage === 'ja'
                    ? styles['btn-japanese']
                    : styles['btn']
                }`}
                onClick={(e = null) => {
                  handleResetDeck();
                  if (props?.from !== 1) {
                    if (whichTarot !== 1) {
                      updateCardForm({
                        ...cardForm,
                        isShuffleFinished: false,
                        selectedCardIndexList: [],
                      });
                      updateAnswerForm(prev => {
                        return {
                          ...prev,
                          isSubmitted: true,
                        };
                      });
                      handleReadyToShuffleValue(true);
                    }
                    if (whichTarot === 1) {
                      handleSpreadValue(false);
                      updateCSSInvisible(false);
                      updateAnswerForm(prev => {
                        return {
                          ...prev,
                          isSubmitted: false,
                          isWaiting: false,
                          isAnswered: false,
                        };
                      });
                    }
                    setWhichCardPosition(prev => {
                      return {
                        isClicked: false,
                        position: -1,
                      };
                    });
                  }
                }}
              >
                {t(`button.cancel`)}
              </CancelButton>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default TarotCardChoiceForm;
