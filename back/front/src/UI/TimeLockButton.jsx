import React from 'react';
import styles from '../styles/scss/_Button.module.scss';
import useButtonLock from '../hooks/useEffect/useButtonLock';
import useLanguageChange from '../hooks/useEffect/useLanguageChange';
const TimeLockButton = ({ ...props }) => {
  const browserLanguage = useLanguageChange();
  const { clickCount, isLocked, remainingTime, handleClick, isLoading } = useButtonLock({
    maxClicks: 5,
    particalLockDuration: 60 * 60 * 1000,
    lockDuration: 5 * 60 * 60 * 1000,
    uniqueId: 'myButton',
  });
  return (
    <div className={styles['container']}>
      <button
        onClick={handleClick}
        disabled={isLocked}
        className={`${
          browserLanguage === 'ja' ? styles['btn-japanese'] : styles['btn']
        } ${props?.className || ''} ${isLocked ? styles['locked'] : ''}`}
      >
        {clickCount === 5 ? remainingTime : `클릭하세요! ${clickCount}/5회`}
      </button>
    </div>
  );
};
export default TimeLockButton;
