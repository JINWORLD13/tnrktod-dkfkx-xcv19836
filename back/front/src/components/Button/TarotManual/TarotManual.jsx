import React, { useEffect, useState } from 'react';
import { hasAccessToken } from '../../../utils/tokenCookie';
import { hasAccessTokenForPreference } from '../../../utils/tokenPreference';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
import { TarotManualButton } from './TarotManualButton';
const TarotManual = ({
  modalForm,
  answerForm,
  isReadyToShowDurumagi,
  userInfo,
  cardForm,
  todayCardIndexInLocalStorage,
  styles,
  handleStateGroup,
  updateCardForm,
  stateGroup,
  updateTarotManualModalOpen,
  isClickedForTodayCardFromHome = false,
}) => {
  const [isClickedForTarotManual, setClickedForTarotManual] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const [isConditionMet, setConditionMet] = useState(false);
  useEffect(() => {
    const checkLogoutStatus = async () => {
      if (isNative) {
        const hasTokenForNative = await hasAccessTokenForPreference();
        setIsToken(hasTokenForNative);
        if (!hasTokenForNative) {
          setConditionMet(false);
          return;
        }
        setConditionMet(
          !modalForm?.spread &&
            !modalForm?.tarot &&
            !answerForm?.isWaiting &&
            !answerForm?.isAnswered &&
            !isReadyToShowDurumagi &&
            userInfo?.email !== '' &&
            userInfo?.email !== undefined
        );
        return;
      }
      if (!isNative) {
        setIsToken(hasAccessToken());
        if (!hasAccessToken()) {
          setConditionMet(false);
          return;
        }
        setConditionMet(
          !modalForm?.spread &&
            !modalForm?.tarot &&
            !answerForm?.isWaiting &&
            !answerForm?.isAnswered &&
            !isReadyToShowDurumagi &&
            userInfo?.email !== '' &&
            userInfo?.email !== undefined
        );
        return;
      }
      setConditionMet(
        !modalForm?.spread &&
          !modalForm?.tarot &&
          !answerForm?.isWaiting &&
          !answerForm?.isAnswered &&
          !isReadyToShowDurumagi &&
          userInfo?.email !== '' &&
          userInfo?.email !== undefined
      );
      return;
    };
    checkLogoutStatus();
  }, [
    userInfo?.email,
    modalForm?.spread,
    !modalForm?.tarot,
    answerForm?.isWaiting,
    answerForm?.isAnswered,
    isReadyToShowDurumagi,
  ]);
  return (
    <>
      {isConditionMet && !isClickedForTodayCardFromHome && (
        <TarotManualButton
          isToken={isToken}
          isClickedForTarotManual={isClickedForTarotManual}
          setClickedForTarotManual={setClickedForTarotManual}
          styles={styles}
          updateTarotManualModalOpen={updateTarotManualModalOpen}
        />
      )}
    </>
  );
};
export default TarotManual;
