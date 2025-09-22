import React, { useEffect, useState } from 'react';
import { hasAccessToken } from '../../../utils/tokenCookie';
import { hasAccessTokenForPreference } from '../../../utils/tokenPreference';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
import { LoginButton } from './LoginButton';
const Login = ({ userInfo, isTokenFromHome, setIsTokenFromHome, styles, stateGroup, setStateGroup }) => {
  const [isClickedForLogin, setClickedForLogin] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const [isConditionMet, setConditionMet] = useState(false);
  const [after2000ms, setAfter2000ms] = useState(false);
  useEffect(() => {
    let timer = setTimeout(() => {
      setAfter2000ms(true);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [userInfo?.email]);
  useEffect(() => {
    const checkLogoutStatus = async () => {
      if (isNative) {
        const hasTokenForNative = await hasAccessTokenForPreference();
        setIsTokenFromHome(hasTokenForNative); 
        setIsToken(hasTokenForNative);
        if (!hasTokenForNative) {
          setConditionMet(
            userInfo?.email === '' ||
              userInfo?.email === null ||
              userInfo?.email === undefined
          );
          return;
        }
        setConditionMet(
          !(
            userInfo?.email !== '' &&
            userInfo?.email !== null &&
            userInfo?.email !== undefined
          )
        );
        return;
      }
      if (!isNative) {
        setIsTokenFromHome(hasAccessToken()); 
        setIsToken(hasAccessToken());
        if (!hasAccessToken()) {
          setConditionMet(
            userInfo?.email === '' ||
              userInfo?.email === null ||
              userInfo?.email === undefined
          );
          return;
        }
        setConditionMet(
          !(
            userInfo?.email !== '' &&
            userInfo?.email !== null &&
            userInfo?.email !== undefined
          )
        );
        return;
      }
      setConditionMet(
        userInfo?.email === '' ||
          userInfo?.email === null ||
          userInfo?.email === undefined
      );
      return;
    };
    checkLogoutStatus();
  }, [userInfo?.email, isTokenFromHome]); 
  return (
    <>
      {isConditionMet && after2000ms && (
        <LoginButton
          isToken={isToken}
          isClickedForLogin={isClickedForLogin}
          setClickedForLogin={setClickedForLogin}
          styles={styles}
        />
      )}
    </>
  );
};
export default Login;
