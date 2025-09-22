import React, { useEffect, useCallback, useState } from 'react';
import styles from '../../styles/scss/_AdComponent.module.scss';
import Button from '../../UI/Button';
import { Capacitor } from '@capacitor/core';
import {
  AdMob,
  InterstitialAdPluginEvents,
  RewardAdPluginEvents,
  AdmobConsentStatus,
  AdmobConsentDebugGeography,
} from '@capacitor-community/admob';
import { useTranslation } from 'react-i18next';
import { initializeAdMob } from './initializeAdMob';
import { initializeAdSense } from './initializeAdsense';
import { getLocalizedContent } from './getLocalizedContent';
import { IS_PRODUCTION_MODE } from '../../function/IS_PRODUCTION_MODE';
const isNative = Capacitor.isNativePlatform();
const AdComponentForButton = ({
  whichAds,
  setWhichAds,
  setAdsWatched,
  setAdWatchedOnlyForBlinkModal,
  userInfo,
  setAdmobReward,
}) => {
  const content = getLocalizedContent();
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showInitialPrompt, setShowInitialPrompt] = useState(true);
  const handleConfirm = useCallback(() => {
    setWhichAds(0);
    setAdsWatched(true);
    setAdWatchedOnlyForBlinkModal(true);
  }, [setWhichAds, setAdsWatched, setAdWatchedOnlyForBlinkModal]);
  const handleCancel = useCallback(() => {
    setWhichAds(0);
    setAdsWatched(false); 
    setAdWatchedOnlyForBlinkModal(false); 
    setIsLoading(false);
    setError(null);
  }, [setWhichAds, setAdsWatched, setAdWatchedOnlyForBlinkModal]);
  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);
  const handleInitialConfirm = useCallback(() => {
    setShowInitialPrompt(false);
    setIsLoading(true);
  }, []);
  const handleInitialCancel = useCallback(() => {
    setWhichAds(0);
    setAdsWatched(false);
    setAdWatchedOnlyForBlinkModal(false);
  }, [setWhichAds, setAdsWatched, setAdWatchedOnlyForBlinkModal]);
  useEffect(() => {
    let initialFunction;
    let cleanup = () => {
      AdMob.removeListener(RewardAdPluginEvents.Loaded);
      AdMob.removeListener(RewardAdPluginEvents.FailedToLoad);
      AdMob.removeListener(RewardAdPluginEvents.Showed);
      AdMob.removeListener(RewardAdPluginEvents.Rewarded);
    };
    const initializeAd = async () => {
      if (!showInitialPrompt && isLoading) {
        try {
          if (isNative) {
            initialFunction = await initializeAdMob({
              setError,
              setIsLoading,
              setAdmobReward,
              setAdsWatched,
              setAdWatchedOnlyForBlinkModal,
              setWhichAds,
              whichAds,
              userInfo,
              content,
            });
          } else {
            await initializeAdSense(
              setError,
              setAdLoaded,
              setIsLoading,
              handleConfirm
            );
          }
        } catch (error) {
          console.error('Ad initialization error:', error);
          setError('AD_INIT_FAILED');
        }
      }
    };
    initializeAd();
    return () => {
      initialFunction && cleanup();
    };
  }, [
    showInitialPrompt,
    initializeAdMob,
    initializeAdSense,
    isLoading,
    whichAds,
  ]);
  console.log('error : ', error);
  console.log('isLoading : ', isLoading);
  if (showInitialPrompt) {
    return (
      <div className={styles['backdrop']}>
        <div className={styles['backdrop-box']}>
          <div className={styles['ad-badge']}>{t(`ad.label`)}</div>
          <div className={styles['modal']}>
            <h2>{content?.initialPrompt.title}</h2>
            <div>
              <p>
                {isNative
                  ? content?.instructionForAd1ForAdMob
                  : content?.instructionForAd1}
              </p>
            </div>
            {}
            <div></div>
            <div className={styles['btn-box']}>
              <Button onClick={handleInitialConfirm}>
                {isNative
                  ? content?.initialPrompt?.continueButtonForAdMob
                  : content?.initialPrompt?.continueButton}
              </Button>
              <Button onClick={handleInitialCancel}>
                {content?.initialPrompt.cancelButton}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
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
              <Button onClick={handleCancel}>{content?.cancelButton}</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className={styles['backdrop']}>
        <div className={styles['backdrop-box']}>
          <div className={styles['ad-badge']}>{t(`ad.label`)}</div>
          <div className={styles['modal']}>
            <h1>{t(`instruction.loading`)}</h1>
            <div>
              <p>{t(`instruction.network-warnings`)}</p>
            </div>
            <div className={styles['loading-indicator']}>
              <div className={styles['spinner']}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles['backdrop']}>
      <div className={styles['backdrop-box']}>
        <div className={styles['ad-badge']}>{t(`ad.label`)}</div>
        <div className={styles['modal']}>
          {!isNative && adLoaded ? (
            <>
              <ins
                className="adsbygoogle"
                style={{ display: 'block', width: '100%', height: 'auto' }}
                data-ad-client="ca-pub-7748316956330968"
                data-ad-slot="3545458418"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
              {}
            </>
          ) : (
            <>
              <h1>{t(`instruction.loading`)}</h1>
              <div>
                <p>{t(`instruction.network-warnings`)}</p>
              </div>
              <div className={styles['loading-indicator']}>
                <div className={styles['spinner']}></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdComponentForButton;
