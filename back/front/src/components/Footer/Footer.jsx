import React, { useState, useEffect } from 'react';
import styles from '../../styles/scss/_Footer.module.scss';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { useTranslation } from 'react-i18next';
import AdComponentForBanner from '../../page/GoogleAd/AdComponentForBanner.jsx';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { isNativeAppVertical } from '../../function/detectVertical.js';
import { hasAccessToken } from '../../utils/tokenCookie.jsx';
import {
  getAdsFree,
  hasAccessTokenForPreference,
} from '../../utils/tokenPreference.jsx';
import { useSelector } from 'react-redux';
import { isAdsFreePassValid } from '../../function/isAdsFreePassValid.jsx';
import { useOutletContext } from 'react-router-dom';
const isNative = Capacitor.isNativePlatform();
const Footer = props => {
  const browserLanguage = useLanguageChange();
  const userInfoInRedux = useSelector(state => state.userInfoStore.userInfo);
  const isWaitingForRedux = useSelector(state => state.booleanStore.isWaiting);
  const isAnsweredForRedux = useSelector(
    state => state.booleanStore.isAnswered
  );
  const isReadyToShowDurumagiForRedux = useSelector(
    state => state.booleanStore.isReadyToShowDurumagi
  );
  const { t } = useTranslation();
  const totalQuoteSets = 3; 
  const [isFreeAdsMode, setFreeAdsMode] = useState(false);
  const [currentQuoteSet, setCurrentQuoteSet] = useState(null);
  const [isBannerOpen, setBannerOpen] = useState(() => {
    return (
      isNative && 
      !isAdsFreePassValid(userInfoInRedux) && 
      !(
        (
          !props?.answerFormForApp?.isWaiting && 
          !props?.answerFormForApp?.isAnswered &&
          !isWaitingForRedux && 
          !isAnsweredForRedux
        ) 
      ) &&
      (isWaitingForRedux || 
        (isAnsweredForRedux && 
          !isReadyToShowDurumagiForRedux &&
          props?.isVoucherModeOnForApp) ||
        (props?.isAdsWatchedForApp && 
          !isReadyToShowDurumagiForRedux &&
          !props?.isVoucherModeOnForApp &&
          props?.whichTarotForApp === 2))
    );
  });
  const [isNativeScreenVertical, setNativeScreenVertical] = useState(() => {
    return isNative && isNativeAppVertical();
  });
  const [isSignedIn, setIsSignedIn] = useState(null);
  useEffect(() => {
    if (isNative) {
      hasAccessTokenForPreference().then(setIsSignedIn);
    } else {
      setIsSignedIn(hasAccessToken());
    }
  }, [userInfoInRedux]); 
  const getStoredQuoteSet = async () => {
    try {
      if (isNative) {
        const { value } = await Preferences.get({ key: 'currentQuoteSet' });
        return value ? parseInt(value, 10) : 1;
      } else {
        const stored = localStorage.getItem('currentQuoteSet');
        return stored ? parseInt(stored, 10) : 1;
      }
    } catch (error) {
      console.error('저장소 접근 오류:', error);
    }
  };
  const setStoredQuoteSet = async value => {
    try {
      if (isNative) {
        await Preferences.set({
          key: 'currentQuoteSet',
          value: value.toString(),
        });
      } else {
        localStorage.setItem('currentQuoteSet', value.toString());
      }
    } catch (error) {
      console.error('저장소 저장 오류:', error);
    }
  };
  useEffect(() => {
    const initializeQuoteSet = async () => {
      const storedQuoteSet = await getStoredQuoteSet();
      let wasSignedOut;
      if (isNative) {
        const { value } = await Preferences.get({ key: 'wasSignedIn' });
        wasSignedOut = value !== 'true'; 
      } else {
        wasSignedOut = localStorage.getItem('wasSignedIn') !== 'true';
      }
      if (isSignedIn) {
        if (wasSignedOut) {
          setCurrentQuoteSet(1);
          await setStoredQuoteSet(1);
          if (isNative) {
            await Preferences.set({
              key: 'wasSignedIn',
              value: 'true',
            }); 
          } else {
            localStorage.setItem('wasSignedIn', 'true'); 
          }
        } else {
          setCurrentQuoteSet(storedQuoteSet);
        }
      } else if (isSignedIn === false && isSignedIn !== null) {
        if (wasSignedOut) {
          setCurrentQuoteSet(storedQuoteSet);
        } else {
          setCurrentQuoteSet(storedQuoteSet);
          if (isNative) {
            await Preferences.set({
              key: 'wasSignedIn',
              value: 'false',
            }); 
          } else {
            localStorage.setItem('wasSignedIn', 'false'); 
          }
        }
      }
    };
    initializeQuoteSet();
  }, [isSignedIn]); 
  useEffect(() => {
    if (currentQuoteSet) setStoredQuoteSet(currentQuoteSet);
  }, [currentQuoteSet]);
  useEffect(() => {
    let isFree = async () => {
      const result = await getAdsFree(userInfoInRedux);
      setFreeAdsMode(result);
    };
    isFree();
  }, [userInfoInRedux]);
  useEffect(() => {
    if (!isNative) return;
    const handleResize = () => {
      setNativeScreenVertical(isNativeAppVertical());
    };
    if (typeof window !== 'undefined') window.addEventListener('resize', handleResize);
    if (typeof window !== 'undefined') window.addEventListener('orientationchange', handleResize);
    handleResize();
    return () => {
      if (typeof window !== 'undefined') window.removeEventListener('resize', handleResize);
      if (typeof window !== 'undefined') window.removeEventListener('orientationchange', handleResize);
    };
  }, []);
  useEffect(() => {
    if (isNative) {
      let isVertical = isNativeAppVertical();
      setBannerOpen(() => {
        return (
          isNative &&
          !isAdsFreePassValid(userInfoInRedux) &&
          !(
            !props?.answerFormForApp?.isWaiting &&
            !props?.answerFormForApp?.isAnswered
          ) &&
          (isWaitingForRedux ||
            (isAnsweredForRedux &&
              !isReadyToShowDurumagiForRedux &&
              props?.isVoucherModeOnForApp) ||
            (props?.isAdsWatchedForApp &&
              !isReadyToShowDurumagiForRedux &&
              !props?.isVoucherModeOnForApp &&
              props?.whichTarotForApp === 2))
        );
      });
      setNativeScreenVertical(() => {
        return isNative && isVertical;
      });
    }
    return () => {
      setBannerOpen(false);
    };
  }, [
    isNativeScreenVertical,
    isSignedIn,
    isWaitingForRedux,
    isAnsweredForRedux,
    isReadyToShowDurumagiForRedux,
    props?.answerFormForApp?.isWaiting,
    props?.answerFormForApp?.isAnswered,
    props?.whichTarotForApp,
    props?.isVoucherModeOnForApp,
    props?.isAdsWatchedForApp,
    userInfoInRedux,
    isFreeAdsMode,
  ]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuoteSet(prevSet => (prevSet % totalQuoteSets) + 1);
    }, 20000); 
    return () => clearInterval(intervalId);
  }, []);
  const renderQuoteSet = setNumber => (
    <>
      <div
        className={
          browserLanguage === 'ja'
            ? styles['quotation-japanese']
            : styles['quotation']
        }
      >
        {t(`footer.quotation${setNumber}-1`)}
      </div>
      <div
        className={
          browserLanguage === 'ja'
            ? styles['quotation-japanese']
            : styles['quotation']
        }
      >
        {t(`footer.quotation${setNumber}-2`)}
      </div>
    </>
  );
  if (currentQuoteSet === null) return null;
  return (
    <footer className={styles.footer}>
      {isBannerOpen &&
        !isAdsFreePassValid(userInfoInRedux) &&
        isNativeScreenVertical && (
          <AdComponentForBanner
            userInfo={userInfoInRedux}
            isSignedIn={isSignedIn}
            position={
              isNativeScreenVertical ? 'BOTTOM_CENTER' : 'BOTTOM_CENTER'
            } 
            margin={isNativeScreenVertical ? 80 : 0} 
          />
        )}
      {isBannerOpen &&
        !isAdsFreePassValid(userInfoInRedux) &&
        !isNativeScreenVertical && (
          <AdComponentForBanner
            userInfo={userInfoInRedux}
            isSignedIn={isSignedIn}
            position={
              isNativeScreenVertical ? 'BOTTOM_CENTER' : 'BOTTOM_CENTER'
            } 
            margin={isNativeScreenVertical ? 80 : 0} 
          />
        )}
      {renderQuoteSet(currentQuoteSet)}
      {}
    </footer>
  );
};
export default Footer;
