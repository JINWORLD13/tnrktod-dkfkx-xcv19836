import React, { useRef, useEffect } from 'react';
import styles from '../styles/scss/_Button.module.scss';
import useLanguageChange from '../Hooks/useEffect/useLanguageChange.jsx';
const Button = props => {
  const browserLanguage = useLanguageChange();
  const buttonRef = useRef(null);
  useEffect(() => {
    if (props?.autoFocus) {
      buttonRef.current.focus();
    }
  }, [props.autoFocus]);
  const handleKeyDown = event => {
    if (event.key === 'Enter' && props?.autoFocus) {
      event.preventDefault();
      event.stopPropagation();
      props.onClick(event);
    }
  };
  useEffect(() => {
    const handleGlobalKeyDown = event => {
      if (event.key === 'Enter' && props?.autoFocus) {
        event.preventDefault();
        event.stopPropagation();
        props.onClick(event);
      }
    };
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [props.onClick, props.autoFocus]);
  return (
    <button
      ref={buttonRef}
      className={`${
        browserLanguage === 'ja' ? styles['btn-japanese'] : styles['btn']
      } ${props?.className}`}
      type={props?.type || 'button'}
      onClick={props?.onClick}
      onKeyDown={handleKeyDown}
      autoFocus={props.autoFocus}
    >
      {props?.children}
    </button>
  );
};
export default Button;
