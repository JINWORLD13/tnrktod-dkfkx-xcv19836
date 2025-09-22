import React, { useEffect, useState } from 'react';
import { hasAccessToken } from '../../../Utils/tokenCookie';
import { hasAccessTokenForPreference } from '../../../Utils/tokenPreference';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
import { HomePageButton } from './HomePageButton';
const HomePage = ({ answerForm, userInfo, styles, isAnswerModalOpen }) => {
  const [isClickedForHomePage, setClickedForHomePage] = useState(false);
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
          userInfo?.email !== '' && userInfo?.email !== undefined
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
          userInfo?.email !== '' && userInfo?.email !== undefined
        );
        return;
      }
      setConditionMet(userInfo?.email !== '' && userInfo?.email !== undefined);
      return;
    };
    checkLogoutStatus();
  }, [userInfo?.email]);
  return (
    <>
      {isConditionMet && !isAnswerModalOpen && (
        <HomePageButton
          isToken={isToken}
          isClickedForHomePage={isClickedForHomePage}
          setClickedForHomePage={setClickedForHomePage}
          styles={styles}
        />
      )}
    </>
  );
};
export default HomePage;
