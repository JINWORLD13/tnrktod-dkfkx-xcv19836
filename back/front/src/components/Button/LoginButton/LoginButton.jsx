import React, { useEffect, useRef, useState } from 'react';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
import { Preferences } from '@capacitor/preferences';
import { Browser } from '@capacitor/browser';
import { App } from '@capacitor/app';
import {
  setAccessTokenForPreference,
  setRefreshTokenForPreference,
} from '../../../utils/tokenPreference';
import { useSelector } from 'react-redux';
export const LoginButton = ({
  isToken,
  isClickedForLogin,
  setClickedForLogin,
  styles,
  ...props
}) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const appUrlScheme = 'cosmostarot';
  const appHost = 'cosmos-tarot.com';
  const isWaitingForRedux = useSelector(state => state.booleanStore.isWaiting);
  const isAnsweredForRedux = useSelector(
    state => state.booleanStore.isAnswered
  );
  const signin = async () => {
    if (isAnsweredForRedux || isWaitingForRedux) return;
    const loginUrl = `${serverUrl}/auth/google/sign`;
    if (isNative) {
      await Preferences.set({ key: 'wasSignedIn', value: 'false' }); 
    } else {
      localStorage.setItem('wasSignedIn', 'false'); 
    }
    if (isNative) {
      const redirectUrl = `${appUrlScheme}:
      await Browser.open({
        url: `${loginUrl}?redirect_uri=${encodeURIComponent(redirectUrl)}`,
        windowName: '_self',
      });
    } else {
      if (typeof window !== 'undefined') window.location.reload();
      if (typeof window !== 'undefined') window.open(loginUrl, '_self');
    }
  };
  const handleAppUrlOpen = async data => {
    Browser.close();
    if (data.url.startsWith(`${appUrlScheme}:
      const url = new URL(data.url);
      const accessToken = url.searchParams.get('cos'); 
      const refreshToken = url.searchParams.get('sin'); 
      if (accessToken) await setAccessTokenForPreference(accessToken);
      if (refreshToken) await setRefreshTokenForPreference(refreshToken);
    }
    if (typeof window !== 'undefined') window.location.reload();
  };
  useEffect(() => {
    if (isNative) {
      const urlOpenListener = App.addListener('appUrlOpen', handleAppUrlOpen);
      return () => {
        urlOpenListener.remove();
      };
    }
  }, [isToken]);
  const [isLocked, setIsLocked] = useState(true);
  useEffect(() => {
    let timer = setTimeout(() => {
      setIsLocked(false);
    }, 500); 
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const handleClick = async e => {
    try {
      if (isClickedForLogin || isLocked) return;
      setClickedForLogin(true);
      await signin();
    } catch (err) {
      console.log(err);
    } finally {
      setClickedForLogin(false);
    }
  };
  const loginButton = useRef(null);
  return (
    <div
      className={styles['login']}
      onClick={handleClick} 
      ref={loginButton}
    >
      <p>Login</p>
    </div>
  );
};
