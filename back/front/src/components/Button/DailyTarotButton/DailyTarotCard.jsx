import React, { useEffect, useState, useRef, useCallback } from 'react';
import TarotCardChoiceForm from '../../../Page/TarotCardForm/TarotCardChoiceForm';
import OneCardSpreadForm from '../../../Page/TarotCardForm/TarotCardSpreadForm/OneCardSpreadForm';
import DailyTarotFortune from './DailyTarotFortune';
import { DailyCardButton } from './DailyCardButton';
import { getTodayCardForNative } from '../../../utils/tokenPreference';
import { getTodayCard } from '../../../utils/tokenLocalStorage';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
const DailyTarotCard = ({
  modalForm,
  answerForm,
  isReadyToShowDurumagi,
  userInfo,
  cardForm,
  todayCardIndexInLocalStorage,
  styles,
  handleStateGroup,
  updateCardForm,
  stateGroup,
  setStateGroup,
  setClickedForTodayCardFromHome,
  isTokenFromHome
}) => {
  const [isClickedForTodayCard, setClickedForTodayCard] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());
  const [forceUpdate, setForceUpdate] = useState(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  useEffect(() => {
    setClickedForTodayCardFromHome(isClickedForTodayCard);
  }, [isClickedForTodayCard]);
  const isConditionMet = () => {
    return (
      isTokenFromHome &&
      !modalForm?.spread &&
      !modalForm?.tarot &&
      !answerForm?.isWaiting &&
      !answerForm?.isAnswered &&
      !isReadyToShowDurumagi &&
      userInfo?.email !== '' &&
      userInfo?.email !== undefined &&
      userInfo?.email !== null &&
      Object.keys(userInfo || {}).length > 0 
    );
  };
  const isCardChoiceConditionMet = () => {
    return isClickedForTodayCard && isConditionMet();
  };
  const checkIfNewDay = async userInfo => {
    if (!userInfo?.email) return false;
    const isNative = Capacitor.isNativePlatform();
    if (isNative) {
      const result = await getTodayCardForNative(userInfo);
      return result === null;
    } else {
      const result = getTodayCard(userInfo);
      return result === null;
    }
  };
  const handleDateChange = useCallback(async () => {
    if (!userInfo?.email) return;
    console.log('날짜가 변경되었습니다. 상태를 초기화합니다.');
    setClickedForTodayCard(false);
    updateCardForm(prevCardForm => ({
      ...prevCardForm,
      shuffle: 0,
      isReadyToShuffle: false,
      isSuffleFinished: false,
      spread: false,
      flippedIndex: [],
      selectedCardIndexList: [],
    }));
    setForceUpdate(prev => prev + 1);
  }, [userInfo?.email, updateCardForm]);
  useEffect(() => {
    if (!userInfo?.email) return;
    const scheduleNextMidnightCheck = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0); 
      const timeUntilMidnight = tomorrow.getTime() - now.getTime();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        const newDate = new Date().toDateString();
        console.log(
          `자정 체크: ${new Date().toLocaleTimeString()} - 날짜 변경: ${
            currentDate !== newDate
          }`
        );
        if (currentDate !== newDate) {
          setCurrentDate(newDate);
          handleDateChange();
        }
        scheduleNextMidnightCheck();
      }, timeUntilMidnight + 50); 
    };
    const startPeriodicCheck = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        const newDate = new Date().toDateString();
        if (currentDate !== newDate) {
          console.log(
            `주기적 체크에서 날짜 변경 감지: ${new Date().toLocaleTimeString()}`
          );
          setCurrentDate(newDate);
          handleDateChange();
        }
      }, 1000); 
    };
    scheduleNextMidnightCheck();
    startPeriodicCheck();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [userInfo?.email, currentDate, handleDateChange]);
  useEffect(() => {
    let stateChangeListener;
    if (Capacitor.isNativePlatform()) {
      stateChangeListener = App.addListener(
        'appStateChange',
        ({ isActive }) => {
          if (isActive) {
            const newDate = new Date().toDateString();
            if (currentDate !== newDate) {
              setCurrentDate(newDate);
              handleDateChange();
            }
          }
        }
      );
    }
    return () => {
      if (stateChangeListener) {
        stateChangeListener.remove();
      }
    };
  }, [currentDate, handleDateChange]);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const newDate = new Date().toDateString();
        if (currentDate !== newDate) {
          console.log('앱 활성화 시 날짜 변경 감지');
          setCurrentDate(newDate);
          handleDateChange();
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentDate, handleDateChange]);
  return (
    <div key={forceUpdate}>
      {isConditionMet() && (
        <DailyCardButton
          stateGroup={stateGroup}
          setStateGroup={setStateGroup}
          setClickedForTodayCard={setClickedForTodayCard}
          styles={styles}
          checkIfNewDay={checkIfNewDay}
          userInfo={userInfo}
        />
      )}
      {isCardChoiceConditionMet() && (
        <div className={styles['background']}>
          {cardForm?.selectedCardIndexList?.length === 0 &&
          !todayCardIndexInLocalStorage ? (
            <TarotCardChoiceForm
              stateGroup={stateGroup}
              setStateGroup={setStateGroup}
              handleStateGroup={handleStateGroup}
              userInfo={userInfo}
              from={1}
              todayCardIndex={todayCardIndexInLocalStorage}
              isClickedForTodayCard={isClickedForTodayCard}
            />
          ) : (
            <>
              <OneCardSpreadForm
                cardForm={cardForm}
                updateCardForm={updateCardForm}
                userInfo={userInfo}
                from={1}
                todayCardIndex={todayCardIndexInLocalStorage}
              />
              <DailyTarotFortune
                cardForm={cardForm}
                userInfo={userInfo}
                todayCardIndex={todayCardIndexInLocalStorage}
                checkIfNewDay={checkIfNewDay}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default DailyTarotCard;
