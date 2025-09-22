import React, { useRef, useEffect } from 'react';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import styles from '../styles/scss/_Button.module.scss';
import useLanguageChange from '../Hooks/useEffect/useLanguageChange.jsx';
const isNative = Capacitor.isNativePlatform();
const CancelButton = ({
  className = '',
  autoFocus = false,
  onClick,
  type = 'button',
  children = '',
  ...restProps
}) => {
  const browserLanguage = useLanguageChange();
  const buttonRef = useRef(null);
  useEffect(() => {
    let backButtonListener;
    if (isNative) {
      backButtonListener = App.addListener('backButton', e => {
        if (onClick) {
          onClick(e);
          return false; 
        }
      });
    }
    const handleEscKey = e => {
      if (e.key === 'Escape' && onClick) {
        e.preventDefault();
        onClick(e);
      }
    };
    if (!isNative) {
      if (typeof window !== 'undefined') window.addEventListener('keydown', handleEscKey);
    }
    return () => {
      if (isNative && backButtonListener) {
        backButtonListener.remove();
      } else if (!isNative) {
        if (typeof window !== 'undefined') window.removeEventListener('keydown', handleEscKey);
      }
    };
  }, [onClick]);
  const handleClick = e => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };
  const buttonClass = `${
    browserLanguage === 'ja' ? styles['btn-japanese'] : styles['btn']
  } ${className}`.trim();
  return (
    <button
      ref={buttonRef}
      className={buttonClass}
      type={type}
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </button>
  );
};
export default CancelButton;
