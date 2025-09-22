import React, { useEffect, useState } from 'react';
import styles from '../../../styles/scss/_OneCardSpreadForm.module.scss';
import {
  tarotCardImageFilesList,
  tarotCardImageFilesPathList,
} from '../../../data/images/images.jsx';
import {
  useSelectedTarotCards,
  useTotalCardsNumber,
} from '../../../hooks/dispatch/tarotDispatch.jsx';
import { getTodayCard } from '../../../utils/tokenLocalStorage.jsx';
import { getTodayCardForNative } from '../../../utils/tokenPreference.jsx';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
const OneCardSpreadForm = props => {
  const selectedTarotCards = useSelectedTarotCards();
  const totalCardsNumber = useTotalCardsNumber();
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
        if (props?.cardForm?.selectedCardIndexList?.length !== 0)
          setTodayCardIndexInLocalStorage(
            props?.cardForm?.selectedCardIndexList[0]
          );
        if (index) setTodayCardIndexInLocalStorage(index);
      } catch (error) {
        console.error("Error fetching today's card:", error);
      }
    };
    if (
      props?.from === 1 &&
      isNative &&
      props?.userInfo?.email !== '' &&
      props?.userInfo?.email !== undefined
    ) {
      fetchTodayCard();
    }
    if (
      props?.from === 1 &&
      !isNative &&
      props?.userInfo?.email !== '' &&
      props?.userInfo?.email !== undefined
    ) {
      setTodayCardIndexInLocalStorage(getTodayCard(props?.userInfo));
    }
  }, [
    isNative,
    props?.from,
    props?.userInfo?.email,
    props?.userInfo,
    props?.cardForm?.selectedCardIndexList?.length,
    todayCardIndexInLocalStorage,
  ]);
  const imagePath = index => {
    if (props?.from === 1 && todayCardIndexInLocalStorage === 0) {
      return tarotCardImageFilesPathList[0];
    }
    if (
      props?.from === 1 &&
      (props?.cardForm?.selectedCardIndexList?.length === 1 ||
        todayCardIndexInLocalStorage !== null ||
        todayCardIndexInLocalStorage !== undefined)
    ) {
      return tarotCardImageFilesPathList[
        todayCardIndexInLocalStorage ||
          props?.cardForm?.selectedCardIndexList[0]
      ];
    }
    if (selectedTarotCards?.length !== 0) {
      const foundIndex = tarotCardImageFilesList.findIndex(
        elem =>
          elem.split('.')[0] === selectedTarotCards?.[index]?.['file_name']
      );
      return tarotCardImageFilesPathList[foundIndex];
    }
  };
  const handleFlip = selectedCardIndex => {
    props?.updateCardForm({
      ...props?.cardForm,
      flippedIndex: [...props?.cardForm?.flippedIndex, selectedCardIndex],
    });
  };
  const isCardClicked = selectedCardIndex =>
    props?.cardForm?.flippedIndex?.includes(selectedCardIndex) &&
    selectedTarotCards?.length === totalCardsNumber;
  let totalCardsNumberList = [];
  if (props?.from !== 1) {
    for (let i = 0; i < totalCardsNumber; i++) {
      totalCardsNumberList.push(i);
    }
  } else {
    totalCardsNumberList.push(
      todayCardIndexInLocalStorage || props?.cardForm?.selectedCardIndexList[0]
    );
  }
  return (
    <>
      <div className={styles['linear-spread-container']}>
        {totalCardsNumberList.map(elem => {
          return (
            <>
              <div
                className={`${styles['flip']} ${
                  isCardClicked(selectedTarotCards[elem]?.index) ||
                  (props?.from === 1 &&
                    (props?.cardForm?.selectedCardIndexList?.length === 1 ||
                      todayCardIndexInLocalStorage !== null ||
                      todayCardIndexInLocalStorage !== undefined))
                    ? styles['flip-click']
                    : ''
                }`}
                onClick={() => {
                  if (selectedTarotCards?.length === totalCardsNumber) {
                    handleFlip(selectedTarotCards[elem]?.index);
                  }
                }}
              >
                {selectedTarotCards?.length >= elem ||
                (props?.from === 1 &&
                  (props?.cardForm?.selectedCardIndexList?.length === 1 ||
                    todayCardIndexInLocalStorage !== null ||
                    todayCardIndexInLocalStorage !== undefined)) ? (
                  <>
                    <div
                      className={`${styles['front']} ${
                        selectedTarotCards[elem]?.reversed
                          ? styles['front-reversed']
                          : ''
                      }`}
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
export default OneCardSpreadForm;
