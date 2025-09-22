import React, { useEffect, useRef, useState } from 'react';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange';
export const MyPageButton = ({
  isToken,
  isClickedForMyPage,
  setClickedForMyPage,
  styles,
  setStateGroup,
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
      if (isClickedForMyPage) return;
      setClickedForMyPage(true);
      navigate(`/${browserLanguage}/mypage`);
    } catch (err) {
      console.log(err);
    } finally {
      setClickedForMyPage(false);
    }
  };
  const loginButton = useRef(null);
  return (
    <div
      className={styles['mypage']}
      onClick={handleClick} 
      ref={loginButton}
    >
      <p>MyPage</p>
    </div>
  );
};
