import React, { useEffect, useState } from 'react';
import { hasAccessToken } from '../../../utils/tokenCookie';
import { hasAccessTokenForPreference } from '../../../utils/tokenPreference';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
import { SpreadButton } from './SpreadButton';
const Spread = ({
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
  setStateGroup,
  isClickedForTodayCardFromHome = false,
}) => {
  const [isClickedForSpread, setClickedForSpread] = useState(false);
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
        <SpreadButton
          isToken={isToken}
          isClickedForSpread={isClickedForSpread}
          setClickedForSpread={setClickedForSpread}
          styles={styles}
          setStateGroup={setStateGroup}
        />
      )}
    </>
  );
};
export default Spread;
