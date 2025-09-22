import React, { useEffect, useRef, useState } from 'react';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange';
export const HomePageButton = ({
  isToken,
  isClickedForHomePage,
  setClickedForHomePage,
  styles,
  ...props
}) => {
  const isWaitingForRedux = useSelector(state => state.booleanStore.isWaiting);
  const isAnsweredForRedux = useSelector(
    state => state.booleanStore.isAnswered
  );
  const navigate = useNavigate();
  const browserLanguage = useLanguageChange();
  const handleClick = async e => {
    try {
      if (isClickedForHomePage) return;
      setClickedForHomePage(true);
      navigate(`/${browserLanguage}`);
    } catch (err) {
      console.log(err);
    } finally {
      setClickedForHomePage(false);
    }
  };
  const loginButton = useRef(null);
  return (
    <div
      className={styles['homepage']}
      onClick={handleClick} 
      ref={loginButton}
    >
      <p>Home</p>
    </div>
  );
};
