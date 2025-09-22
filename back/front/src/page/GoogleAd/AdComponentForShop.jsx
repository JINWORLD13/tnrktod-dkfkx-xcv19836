import React, { useEffect, useCallback, useState } from 'react';
import styles from '../../styles/scss/_AdComponent.module.scss';
import Button from '../../UI/Button';
import CancelButton from '../../UI/CancelButton';
import { Capacitor } from '@capacitor/core';
import {
  AdMob,
  RewardAdPluginEvents,
  AdmobConsentStatus,
  AdmobConsentDebugGeography,
} from '@capacitor-community/admob';
import { useTranslation } from 'react-i18next';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange';
import { initializeAdMob } from './initializeAdMob';
import { getLocalizedContent } from './getLocalizedContent';
import { IS_PRODUCTION_MODE } from '../../function/IS_PRODUCTION_MODE';
import useButtonLock from '../../hooks/useEffect/useButtonLock';
import AdLoadingComponent from './module/AdLoadingComponent';
const isNative = Capacitor.isNativePlatform();
const AdComponentForShop = ({
  whichAds = 2,
  setWhichAds,
  setAdsWatched,
  userInfo = {},
  setAdmobReward,
}) => {
  const { t } = useTranslation();
  const content = getLocalizedContent();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { clickCount, isLocked, remainingTime, handleClick } = useButtonLock({
    maxClicks: 5,
    particalLockDuration: 60 * 60 * 1000,
    lockDuration: 5 * 60 * 60 * 1000,
    uniqueId: userInfo?.email,
  });
  const handleCancel = useCallback(
    e => {
      setWhichAds(0);
      setAdsWatched(false); 
      setIsLoading(false);
      setError(null);
    },
    [setWhichAds, setAdsWatched]
  );
  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);
  let listeners = {};
  let cleanup = async () => {
    await AdMob.removeAllListeners();
  };
  useEffect(() => {
    let initialFunction;
    const initializeAd = async () => {
      try {
        initialFunction = await initializeAdMob({
          setError,
          setIsLoading,
          setAdmobReward,
          setAdsWatched,
          setWhichAds,
          whichAds,
          userInfo,
          content,
          handleClick,
          listeners,
        });
      } catch (error) {
        console.error('Ad initialization error:', error);
        setError('AD_INIT_FAILED');
      } finally {
        setIsLoading(false);
      }
    };
    initializeAd();
    return () => {
      if (initialFunction) cleanup();
      if (initialFunction && Object.values(listeners).length > 0) {
        Object.values(listeners).forEach(listener => listener.remove());
        listeners = {};
      }
    };
  }, [initializeAdMob]);
  if (error) {
    return (
      <div className={styles['backdrop']}>
        <div className={styles['backdrop-box']}>
          <div className={styles['ad-badge']}>{t(`ad.label`)}</div>
          <div className={styles['modal']}>
            <h2>{content?.errorTitle}</h2>
            {}
            <div>
              <p>{content?.refreshSuggestion}</p>
            </div>
            <div className={styles['btn-box']}>
              <Button onClick={handleRefresh}>{content?.refreshButton}</Button>
              <CancelButton
                onClick={(e = null) => {
                  handleCancel(e);
                }}
              >
                {content?.cancelButton}
              </CancelButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <AdLoadingComponent
      setIsLoading={setIsLoading}
      setWhichAds={setWhichAds}
      setAdsWatched={setAdsWatched}
    />
  );
};
export default AdComponentForShop;
