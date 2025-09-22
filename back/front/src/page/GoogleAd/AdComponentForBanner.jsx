import React, { useEffect, useCallback, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { AdMob, BannerAdPluginEvents } from '@capacitor-community/admob';
import { useTranslation } from 'react-i18next';
import { initializeAdMob } from './initializeAdMob';
import { initializeAdSense } from './initializeAdsense';
import { getLocalizedContent } from './getLocalizedContent';
import {
  setIsAnswered,
  setIsWaiting,
} from '../../data/reduxStore/booleanStore';
import { IS_PRODUCTION_MODE } from '../../function/IS_PRODUCTION_MODE';
import { isAdsFreePassValid } from '../../function/isAdsFreePassValid';
const isNative = Capacitor.isNativePlatform();
const AdComponentForBanner = ({ userInfo, isSignedIn = true, ...props }) => {
  const content = getLocalizedContent();
  const [error, setError] = useState(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const whichAds = 3;
  const handleCancel = useCallback(e => {
    setError(null);
  }, []);
  const handleRefresh = useCallback(async () => {
    try {
      await AdMob.removeAllListeners();
      await AdMob.removeBanner();
    } catch (e) {
      console.warn('배너 제거 중 에러:', e);
    }
    window.location.reload();
  }, []);
  let listeners = {};
  let cleanup = async () => {
    await AdMob.removeAllListeners();
    await AdMob.removeBanner(); 
  };
  useEffect(() => {
    let initialFunction;
    const initializeAd = async () => {
      if (error === null) {
        try {
          if (isNative) {
            if (error !== null) return;
            initialFunction = await initializeAdMob({
              setError,
              whichAds,
              userInfo,
              content,
              listeners,
              margin: props?.margin,
              position: props?.position,
            });
            if (import.meta.env.VITE_NODE_ENV === 'DEVELOPMENT') {
              console.log(
                '*************************initialFunction : ',
                JSON.stringify(initialFunction)
              );
              console.log(
                '*************************isSignedIn : ',
                JSON.stringify(isSignedIn)
              );
            }
          } else {
            await initializeAdSense(
              setError,
              setAdLoaded,
              undefined,
              undefined
            );
          }
        } catch (error) {
          console.error('Ad initialization error:', error);
          setError('AD_INIT_FAILED');
        }
      }
    };
    if (!isAdsFreePassValid(userInfo)) initializeAd();
    return () => {
      cleanup();
      (async () => {
        await AdMob.removeAllListeners();
        await AdMob.removeBanner();
      })();
      Object.values(listeners).forEach(listener => listener.remove());
      listeners = {};
    };
  }, [error, initializeAdMob, initializeAdSense, whichAds, userInfo?.email]);
  return (
    <>
      {!isNative && adLoaded ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: 'auto' }}
          data-ad-client='광고id' 
          data-ad-slot="3545458418"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : null}
    </>
  );
};
export default AdComponentForBanner;
