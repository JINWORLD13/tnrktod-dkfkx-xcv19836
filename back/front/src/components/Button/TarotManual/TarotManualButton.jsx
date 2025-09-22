import React, { useEffect, useRef, useState } from 'react';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange';
export const TarotManualButton = ({
  isToken,
  isClickedForTarotManual,
  setClickedForTarotManual,
  styles,
  updateTarotManualModalOpen,
  ...props
}) => {
  const browserLanguage = useLanguageChange();
  const isWaitingForRedux = useSelector(state => state.booleanStore.isWaiting);
  const isAnsweredForRedux = useSelector(
    state => state.booleanStore.isAnswered
  );
  const navigate = useNavigate();
  const handleClick = async e => {
    try {
      if (isClickedForTarotManual) return;
      setClickedForTarotManual(true);
      updateTarotManualModalOpen(prev => !prev);
    } catch (err) {
      console.log(err);
    } finally {
      setClickedForTarotManual(false);
    }
  };
  const loginButton = useRef(null);
  return (
    <div
      className={styles['tarot-manual']}
      onClick={handleClick} 
      ref={loginButton}
    >
      <p>GUIDE</p>
    </div>
  );
};
