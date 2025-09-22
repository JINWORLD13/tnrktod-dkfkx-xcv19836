import React, { useEffect } from 'react';
import Card from '../UI/Card.jsx';
import styles from '../styles/scss/_BlinkModal.module.scss';
import useLanguageChange from '../hooks/useEffect/useLanguageChange.jsx';
const BlinkModal = ({ ...props }) => {
  const browserLanguage = useLanguageChange();
  const closeModal = () => {
    if (props?.origin === 'BlinkModalSet') {
      if (props?.setStateName === 'setWhichCardPosition') {
        props?.setState(prev => {
          return { isClicked: false, position: -1 };
        });
      } else if (props?.setStateName === 'setFilledInTheQuestion') {
        props?.setState(true);
      } else {
        props?.setState(false);
      }
    } else {
      if (
        props?.updateBlinkModalForLoginOpen !== undefined &&
        props?.updateBlinkModalForLoginOpen !== null
      ) {
        props?.updateBlinkModalForLoginOpen(false);
      } else if (
        props?.updateBlinkModalForCopyOpen !== undefined &&
        props?.updateBlinkModalForCopyOpen !== null
      ) {
        props?.updateBlinkModalForCopyOpen(false);
      } else if (
        props?.updateBlinkModalForSaveOpen !== undefined &&
        props?.updateBlinkModalForSaveOpen !== null
      ) {
        props?.updateBlinkModalForSaveOpen(false);
      } else if (
        props?.setBlinkModalForChargingKRWOpen !== undefined &&
        props?.setBlinkModalForChargingKRWOpen !== null
      ) {
        props?.setBlinkModalForChargingKRWOpen(false);
      } else if (
        props?.setBlinkModalForChargingUSDOpen !== undefined &&
        props?.setBlinkModalForChargingUSDOpen !== null
      ) {
        props?.setBlinkModalForChargingUSDOpen(false);
      } else if (
        props?.setFilledInTheQuestion !== undefined &&
        props?.setFilledInTheQuestion !== null
      ) {
        props?.setState(true);
        props?.setFilledInTheQuestion(true);
      } else if (
        props?.setOverInTheQuestion !== undefined &&
        props?.setOverInTheQuestion !== null
      ) {
        props?.setOverInTheQuestion(false);
      } else if (
        props?.setUnavailableVoucher !== undefined &&
        props?.setUnavailableVoucher !== null
      ) {
        props?.setUnavailableVoucher(false);
      } else if (
        props?.setUnavailableWhichTarot !== undefined &&
        props?.setUnavailableWhichTarot !== null
      ) {
        props?.setUnavailableWhichTarot(false);
      } else if (
        props?.setWhichSpread !== undefined &&
        props?.setWhichSpread !== null
      ) {
        props?.setWhichSpread(false);
      } else if (
        props?.setWhichCardPosition !== undefined &&
        props?.setWhichCardPosition !== null
      ) {
        props?.setWhichCardPosition(prev => {
          return { isClicked: false, position: -1 };
        });
      } else if (
        props?.setAdWatchedOnlyForBlinkModal !== undefined &&
        props?.setAdWatchedOnlyForBlinkModal !== null
      ) {
        props?.setAdWatchedOnlyForBlinkModal(false);
      } else if (
        props?.setSpeedTarotNotificationOn !== undefined &&
        props?.setSpeedTarotNotificationOn !== null
      ) {
        props?.setSpeedTarotNotificationOn(false);
      }
    }
  };
  const loginMsg =
    props?.origin !== 'BlinkModalSet'
      ? props?.isBlinkModalForLoginOpen || null
      : props?.state || null;
  const copyMsg =
    props?.origin !== 'BlinkModalSet'
      ? props?.isBlinkModalForCopyOpen || null
      : props?.state || null;
  const saveMsg =
    props?.origin !== 'BlinkModalSet'
      ? props?.isBlinkModalForSaveOpen || null
      : props?.state || null;
  const chargeKRWMsg =
    props?.origin !== 'BlinkModalSet'
      ? props?.isBlinkModalForChargingKRWOpen || null
      : props?.state || null;
  const chargeUSDMsg =
    props?.origin !== 'BlinkModalSet'
      ? props?.isBlinkModalForChargingUSDOpen || null
      : props?.state || null;
  const fillInQuestionMsg =
    props?.origin !== 'BlinkModalSet'
      ? props?.isFilledInTheQuestion || null
      : props?.state || null;
  const overInQuestionMsg =
    props?.origin !== 'BlinkModalSet'
      ? props?.isOverInTheQuestion || null
      : props?.state || null;
  const unavailableVoucherMsg =
    props?.origin !== 'BlinkModalSet'
      ? props?.isUnavailableVoucher || null
      : props?.state || null;
  const unavailableWhichTarotMsg =
    props?.origin !== 'BlinkModalSet'
      ? props?.isUnavailableWhichTarot || null
      : props?.state || null;
  const whichSpreadMsg =
    props?.origin !== 'BlinkModalSet'
      ? props?.whichSpread || null
      : props?.state || null;
  const whichCardPositionMsg =
    props?.origin !== 'BlinkModalSet'
      ? props?.whichCardPosition?.position || null
      : props?.state?.position || null;
  const speedTarotNotificationOn =
    props?.origin !== 'BlinkModalSet'
      ? props?.isSpeedTarotNotificationOn || null
      : props?.state || null;
  const adWatchedOnlyForBlinkModalMsg =
    props?.origin !== 'BlinkModalSet'
      ? props?.isAdWatchedOnlyForBlinkModal || null
      : props?.state2 || null;
  useEffect(() => {
    if (
      ((props?.origin !== 'BlinkModalSet' &&
        props?.whichCardPosition?.isClicked) ||
        (props?.origin === 'BlinkModalSet' && props?.state?.isClicked)) &&
      whichCardPositionMsg !== -1
    ) {
      const closeModalTimeoutForCardPosition = setTimeout(() => {
        if (
          props?.origin !== 'BlinkModalSet' &&
          props?.setWhichCardPosition !== undefined &&
          props?.setWhichCardPosition !== null
        ) {
          props?.setWhichCardPosition(prev => {
            return { isClicked: false, position: -1 };
          });
        }
        if (
          props?.origin === 'BlinkModalSet' &&
          props?.setStateName === 'setWhichCardPosition'
        ) {
          props?.setStateName(prev => {
            return { isClicked: false, position: -1 };
          });
        }
      }, 1000);
      return () => {
        clearTimeout(closeModalTimeoutForCardPosition);
      };
    }
    if (
      (props?.origin !== 'BlinkModalSet' &&
        props?.isSpeedTarotNotificationOn) ||
      (props?.origin === 'BlinkModalSet' &&
        props?.state &&
        props?.stateName === 'isSpeedTarotNotificationOn')
    ) {
      const closeModalTimeoutForSpeedTarotNotification = setTimeout(() => {
        if (
          props?.origin !== 'BlinkModalSet' &&
          props?.setSpeedTarotNotificationOn !== undefined &&
          props?.setSpeedTarotNotificationOn !== null
        ) {
          props?.setSpeedTarotNotificationOn(prev => {
            return false``;
          });
        }
        if (
          props?.origin === 'BlinkModalSet' &&
          props?.setStateName === 'setSpeedTarotNotificationOn'
        ) {
          props?.setStateName(prev => {
            return false;
          });
        }
      }, 1500);
      return () => {
        clearTimeout(closeModalTimeoutForSpeedTarotNotification);
      };
    }
    if (
      (props?.origin !== 'BlinkModalSet' && props?.isOverInTheQuestion) ||
      (props?.origin === 'BlinkModalSet' &&
        props?.state &&
        props?.stateName === 'isOverInTheQuestion')
    ) {
      const closeModalTimeoutForOverInTheQuestion = setTimeout(() => {
        if (
          props?.origin !== 'BlinkModalSet' &&
          props?.setOverInTheQuestion !== undefined &&
          props?.setOverInTheQuestion !== null
        ) {
          props?.setOverInTheQuestion(prev => {
            return false;
          });
        }
        if (
          props?.origin === 'BlinkModalSet' &&
          props?.setStateName === 'setOverIntheQuestion'
        ) {
          props?.setStateName(prev => {
            return false;
          });
        }
      }, 1000);
      return () => {
        clearTimeout(closeModalTimeoutForOverInTheQuestion);
      };
    }
  });
  useEffect(() => {
    const time =
      props?.setStateName === 'setSpeedTarotNotificationOn' ||
      props?.setSpeedTarotNotificationOn
        ? 1500
        : 1000;
    const closeModalTimeout = setTimeout(() => {
      closeModal();
    }, time);
    let closeModalTimeout2;
    if (
      props?.origin !== 'BlinkModalSet' &&
      props?.isAdWatchedOnlyForBlinkModal === true &&
      props?.className
    ) {
      closeModalTimeout2 = setTimeout(() => {
        props?.setAdWatchedOnlyForBlinkModal(false);
      }, 1500);
    } else if (
      props?.origin === 'BlinkModalSet' &&
      props?.stateName2 === 'isAdWatchedOnlyForBlinkModal' &&
      props?.state2 === true &&
      props?.className
    ) {
      closeModalTimeout2 = setTimeout(() => {
        props?.setState2(false);
      }, 1500);
    }
    return () => {
      if (
        (props?.origin !== 'BlinkModalSet' &&
          props?.isAdWatchedOnlyForBlinkModal === true) ||
        (props?.origin === 'BlinkModalSet' &&
          props?.stateName2 === 'isAdWatchedOnlyForBlinkModal' &&
          props?.state2 === true)
      ) {
        clearTimeout(closeModalTimeout2);
      } else {
        clearTimeout(closeModalTimeout);
      }
    };
  }, [
    loginMsg,
    copyMsg,
    saveMsg,
    chargeKRWMsg,
    chargeUSDMsg,
    fillInQuestionMsg,
    overInQuestionMsg,
    unavailableVoucherMsg,
    unavailableWhichTarotMsg,
    whichSpreadMsg,
    whichCardPositionMsg,
    adWatchedOnlyForBlinkModalMsg,
    speedTarotNotificationOn,
  ]);
  return (
    <>
      <Card
        className={`${
          browserLanguage === 'ja'
            ? styles['blink-modal-japanese']
            : styles['blink-modal']
        } ${props?.className ?? ''} ${
          props?.stateName === 'isSpeedTarotNotificationOn' &&
          (browserLanguage === 'ja'
            ? styles['speedTarotNotification-japanese']
            : styles['speedTarotNotification'])
        }`}
      >
        <div>{props?.children}</div>
      </Card>
    </>
  );
};
export default BlinkModal;
