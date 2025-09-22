import React, { useEffect, useRef, useState } from 'react';
import { hasAccessToken } from '../../../utils/tokenCookie';
import { hasAccessTokenForPreference } from '../../../utils/tokenPreference';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
const isNative = Capacitor.isNativePlatform();
export const DailyCardButton = ({
  stateGroup,
  setStateGroup,
  setClickedForTodayCard,
  styles,
  checkIfNewDay,
  ...props
}) => {
  const checkLoginStatus = async () => {
    if (!isNative) {
      if (!hasAccessToken()) {
        updateBlinkModalForLoginOpen(true);
        return false;
      }
      return true;
    }
    if (isNative) {
      const checkTokenInApp = await hasAccessTokenForPreference();
      if (!checkTokenInApp) {
        updateBlinkModalForLoginOpen(true);
        return false;
      }
      return true;
    }
    return false;
  };
  const [key, setKey] = useState(Date.now()); 
  const { updateCardForm, updateBlinkModalForLoginOpen, ...rest } =
    setStateGroup;
  const handleClick = async e => {
    const result = await checkLoginStatus();
    if (!result) return;
    if (checkIfNewDay()) {
      setKey(Date.now());
      updateCardForm(prevCardForm => ({
        ...prevCardForm,
        shuffle: 0,
        isReadyToShuffle: false,
        isSuffleFinished: false,
        spread: false,
        flippedIndex: [],
        selectedCardIndexList: [],
      }));
    }
    setClickedForTodayCard(prev => {
      if (
        stateGroup?.answerForm?.isWaiting ||
        stateGroup?.answerForm?.isAnswered ||
        stateGroup?.answerForm?.isSubmitted ||
        stateGroup?.modalForm?.spread ||
        stateGroup?.modalForm?.tarot
      )
        return false;
      return !prev;
    });
  };
  const dailyTarotButton = useRef(null);
  useEffect(() => {
    let backButtonListener;
    const handleEscKey = event => {
      if (event.key === 'Escape') {
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
      }
    };
    const handleBackButton = event => {
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
    };
    if (isNative) {
      backButtonListener = App.addListener('backButton', e => {
        handleBackButton(e);
        return false; 
      });
    }
    if (!isNative) {
      if (typeof window !== 'undefined')
        window?.addEventListener('keydown', handleEscKey);
    }
    return () => {
      if (isNative && backButtonListener) {
        backButtonListener.remove();
      } else if (!isNative) {
        if (typeof window !== 'undefined')
          window?.removeEventListener('keydown', handleEscKey);
      }
    };
  }, [dailyTarotButton, handleClick]);
  return (
    <div
      key={key}
      className={styles['today-card']}
      onClick={handleClick} 
      ref={dailyTarotButton}
    >
      <p>TODAY</p>
    </div>
  );
};
