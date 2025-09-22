import React, { useEffect, useRef, useState } from 'react';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
import { useSelector } from 'react-redux';
export const SpreadButton = ({
  isToken,
  isClickedForSpread,
  setClickedForSpread,
  styles,
  setStateGroup,
  ...props
}) => {
  const isWaitingForRedux = useSelector(state => state.booleanStore.isWaiting);
  const isAnsweredForRedux = useSelector(
    state => state.booleanStore.isAnswered
  );
  const handleClick = async e => {
    try {
      if (isClickedForSpread) return;
      setClickedForSpread(true);
      setStateGroup?.updateModalForm(prev => {
        return { ...prev, spread: !prev.spread };
      });
    } catch (err) {
      console.log(err);
    } finally {
      setClickedForSpread(false);
    }
  };
  const loginButton = useRef(null);
  return (
    <div
      className={styles['spread']}
      onClick={handleClick} 
      ref={loginButton}
    >
      <p>TAROT</p>
    </div>
  );
};
