import { useTranslation } from 'react-i18next';
import BlinkModal from '../../Modal/BlinkModal';
import { cardPositionInfo } from '../../function/cardPositionInfo';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange';
export const BlinkModalSet = ({
  stateGroup,
  setStateGroup,
  styles,
  ...orops
}) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  const {
    answerForm,
    questionForm,
    modalForm,
    whichTarot,
    isVoucherModeOn,
    isAdsWatched,
    isAdWatchedOnlyForBlinkModal,
    whichSpread,
    whichCardPosition,
    isReadyToShowDurumagi,
    isDoneAnimationOfBackground,
    isSpeedTarotNotificationOn,
    isBlinkModalForLoginOpen,
    isBlinkModalForCopyOpen,
    isBlinkModalForSaveOpen,
    isBlinkModalForChargingKRWOpen,
    isBlinkModalForChargingUSDOpen,
    isFilledInTheQuestion,
    isUnavailableVoucher,
    isUnavailableWhichTarot,
    isOverInTheQuestion,
    ...restOfState
  } = stateGroup;
  const {
    updateBlinkModalForLoginOpen,
    setFilledInTheQuestion,
    setUnavailableWhichTarot,
    setWhichSpread,
    setWhichCardPosition,
    setAdWatchedOnlyForBlinkModal,
    setSpeedTarotNotificationOn,
    updateBlinkModalForCopyOpen,
    updateBlinkModalForSaveOpen,
    setBlinkModalForChargingKRWOpen,
    setBlinkModalForChargingUSDOpen,
    setUnavailableVoucher,
    setOverInTheQuestion,
    restOfSetState,
  } = setStateGroup;
  if (whichTarot === 1 && whichSpread) {
    ['(General)', '(일반)', '(一般)'].forEach((elem, i) => {
      if (questionForm?.spreadTitle?.includes(elem))
        questionForm.spreadTitle = questionForm.spreadTitle.replace(elem, '');
    });
    ['6-day flow', '6일간의 흐름', '六日間の流れ'].forEach((elem, i) => {
      const nameArr = ['Six Cards', '여섯 장의 카드', 'シックスカード'];
      if (questionForm?.spreadTitle?.includes(elem))
        questionForm.spreadTitle = elem.replace(elem, nameArr[i]);
    });
  }
  const blinkModalInfoArr = [
    {
      state: isBlinkModalForLoginOpen,
      setState: updateBlinkModalForLoginOpen,
      stateName: 'isBlinkModalForLoginOpen',
      setStateName: 'updateBlinkModalForLoginOpen',
      translation: 'login',
      className: null,
      condition: isBlinkModalForLoginOpen,
    },
    {
      state: isBlinkModalForCopyOpen,
      setState: updateBlinkModalForCopyOpen,
      stateName: 'isBlinkModalForCopyOpen',
      setStateName: 'updateBlinkModalForCopyOpen',
      translation: 'copy',
      className: null,
      condition: isBlinkModalForCopyOpen,
    },
    {
      state: isBlinkModalForSaveOpen,
      setState: updateBlinkModalForSaveOpen,
      stateName: 'isBlinkModalForSaveOpen',
      setStateName: 'updateBlinkModalForSaveOpen',
      translation: 'save',
      className: null,
      condition: isBlinkModalForSaveOpen,
    },
    {
      state: isBlinkModalForChargingKRWOpen,
      setState: setBlinkModalForChargingKRWOpen,
      stateName: 'isBlinkModalForChargingKRWOpen',
      setStateName: 'setBlinkModalForChargingKRWOpen',
      translation: 'charging_KRW',
      className: 'charging',
      condition: isBlinkModalForChargingKRWOpen,
    },
    {
      state: isBlinkModalForChargingUSDOpen,
      setState: setBlinkModalForChargingUSDOpen,
      stateName: 'isBlinkModalForChargingUSDOpen',
      setStateName: 'setBlinkModalForChargingUSDOpen',
      translation: 'charging_USD',
      className: 'charging',
      condition: isBlinkModalForChargingUSDOpen,
    },
    {
      state: isFilledInTheQuestion,
      setState: setFilledInTheQuestion,
      stateName: 'isFilledInTheQuestion',
      setStateName: 'setFilledInTheQuestion',
      translation: 'fill-in-on-question',
      className: 'fill-in-the-question',
      condition: isFilledInTheQuestion !== undefined && !isFilledInTheQuestion,
    },
    {
      state: isOverInTheQuestion,
      setState: setOverInTheQuestion,
      stateName: 'isOverInTheQuestion',
      setStateName: 'setOverInTheQuestion',
      translation: 'over-in-on-question',
      className: 'over-in-the-question',
      condition: isOverInTheQuestion,
    },
    {
      state: isUnavailableVoucher,
      setState: setUnavailableVoucher,
      stateName: 'isUnavailableVoucher',
      setStateName: 'setUnavailableVoucher',
      translation: 'unavailable-voucher',
      className: 'unavailable-voucher',
      condition: isUnavailableVoucher,
    },
    {
      state: isUnavailableWhichTarot,
      setState: setUnavailableWhichTarot,
      stateName: 'isUnavailableWhichTarot',
      setStateName: 'setUnavailableWhichTarot',
      translation: 'unavailable-which-tarot',
      className: 'unavailable-which-tarot',
      condition: isUnavailableWhichTarot,
    },
    {
      state: isSpeedTarotNotificationOn,
      setState: setSpeedTarotNotificationOn,
      stateName: 'isSpeedTarotNotificationOn',
      setStateName: 'setSpeedTarotNotificationOn',
      translation: 'speed-tarot-notification',
      className: 'unavailable-which-tarot',
      condition:
        isSpeedTarotNotificationOn && whichTarot === 1 && modalForm?.tarot,
    },
    {
      state: whichCardPosition,
      setState: setWhichCardPosition,
      stateName: 'whichCardPosition',
      setStateName: 'setWhichCardPosition',
      translation: cardPositionInfo(
        whichTarot, 
        whichCardPosition,
        answerForm?.spreadInfo,
        browserLanguage,
        t
      ),
      translationSub: 'card-position',
      className: 'which-spread',
      condition:
        (whichCardPosition.isClicked &&
          whichCardPosition.position !== -1 &&
          restOfState?.isAnswerModalOpen) ||
        (whichCardPosition?.isClicked &&
          whichCardPosition?.position !== -1 &&
          ((modalForm?.tarot && whichTarot === 1) ||
            (!modalForm?.tarot &&
              answerForm?.isAnswered &&
              isReadyToShowDurumagi === true &&
              !(whichTarot === 2 && !isVoucherModeOn)) ||
            (!modalForm?.tarot &&
              answerForm?.isAnswered &&
              whichTarot === 2 &&
              !isVoucherModeOn))),
    },
    {
      state: whichSpread,
      setState: setWhichSpread,
      stateName: 'whichSpread',
      setStateName: 'setWhichSpread',
      state2: isAdWatchedOnlyForBlinkModal,
      setState2: setAdWatchedOnlyForBlinkModal,
      stateName2: 'isAdWatchedOnlyForBlinkModal',
      setStateName2: 'setAdWatchedOnlyForBlinkModal',
      translation: `${
        questionForm?.spreadTitle?.length > 0 
          ? questionForm?.spreadTitle
          : t(`blink_modal.none`)
      }`,
      translationSub: 'spread',
      className: 'which-spread',
      condition:
        modalForm?.tarot &&
        ((whichSpread &&
          questionForm?.spreadTitle?.length > 0 &&
          !(whichTarot === 2 && !isVoucherModeOn)) ||
          (!isDoneAnimationOfBackground &&
            !isReadyToShowDurumagi &&
            isAdWatchedOnlyForBlinkModal &&
            !isAdsWatched &&
            !answerForm?.isAnswered &&
            !answerForm?.isWaiting &&
            questionForm?.spreadTitle?.length > 0 &&
            whichTarot === 2 &&
            !isVoucherModeOn)),
    },
  ];
  return blinkModalInfoArr.map((modalInfo, index) => {
    const { state, setState, translation, className, condition, ...rest } =
      modalInfo;
    return condition ? (
      <BlinkModal
        key={`blink-modal-${index}`}
        className={className && styles[className]}
        state={state}
        setState={setState}
        stateName={rest?.stateName}
        setStateName={rest?.setStateName}
        {...(rest?.translationSub === 'spread' && {
          state2: rest?.state2,
          setState2: rest?.setState2,
          stateName2: rest?.stateName2,
          setStateName2: rest?.setStateName2,
        })}
        origin={'BlinkModalSet'}
      >
        {rest?.translationSub !== 'card-position' &&
        rest?.translationSub !== 'spread'
          ? t(`blink_modal.${translation}`)
          : translation}
      </BlinkModal>
    ) : null;
  });
};
