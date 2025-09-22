import React, { useEffect, useCallback, useState } from 'react';
import styles from '../../styles/scss/_AdComponent.module.scss';
import { Capacitor } from '@capacitor/core';
import { AdMob, InterstitialAdPluginEvents } from '@capacitor-community/admob';
import { initializeAdMob } from './initializeAdMob';
import { initializeAdSense } from './initializeAdsense';
import { getLocalizedContent } from './getLocalizedContent';
import { IS_PRODUCTION_MODE } from '../../function/IS_PRODUCTION_MODE';
import { useTranslation } from 'react-i18next';
import CancelButton from '../../UI/CancelButton';
import Button from '../../UI/Button';
const isNative = Capacitor.isNativePlatform();
const AdComponentForInterstital = ({
  stateGroup,
  setStateGroup,
  userInfo,
}) => {
  const { t } = useTranslation();
  const content = getLocalizedContent();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const {
    answerForm,
    cardForm,
    questionForm,
    modalForm,
    whichTarot,
    cssInvisible,
    country,
    tarotSpreadPricePoint,
    tarotSpreadVoucherPrice,
    isVoucherModeOn,
    isAdsWatched,
    whichAds,
    isChargeModalOpen,
    showInAppPurchase,
    whichSpread,
    whichCardPosition,
    isReadyToShowDurumagi,
    isDoneAnimationOfBackground,
    ...restOfStateGroup
  } = stateGroup;
  const {
    updateAnswerForm,
    updateCardForm,
    updateQuestionForm,
    updateModalForm,
    updateWhichTarot,
    updateCSSInvisible,
    updateCountry,
    updateBlinkModalForLoginOpen,
    updateChargeModalOpen,
    updateTarotSpreadPricePoint,
    updateTarotSpreadVoucherPrice,
    updateTarotManualModalOpen,
    setVoucherMode,
    setWhichAds,
    setAdsWatched,
    setShowInAppPurchase,
    setFilledInTheQuestion,
    setUnavailableWhichTarot,
    setWhichSpread,
    setWhichCardPosition,
    setAdWatchedOnlyForBlinkModal,
    setReadyToShowDurumagi,
    setAdmobReward,
    ...restOfSetStateGroup
  } = setStateGroup;
  const handleConfirm = useCallback(() => {
    setWhichAds(0);
    setAdsWatched(true);
    setAdWatchedOnlyForBlinkModal(true);
  }, [setWhichAds, setAdsWatched, setAdWatchedOnlyForBlinkModal]);
  const handleCancel = useCallback(
    e => {
      setWhichAds(0);
      setAdsWatched(true); 
      setAdWatchedOnlyForBlinkModal(false); 
      setIsLoading(false);
      setError(null);
    },
    [setWhichAds, setAdsWatched, setAdWatchedOnlyForBlinkModal]
  );
  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);
  const handleInitialConfirm = useCallback(() => {
    setIsLoading(true);
  }, []);
  const handleInitialCancel = useCallback(
    e => {
      setWhichAds(0);
      setAdsWatched(false);
      setAdWatchedOnlyForBlinkModal(false);
    },
    [setWhichAds, setAdsWatched, setAdWatchedOnlyForBlinkModal]
  );
  let listeners = {};
  let cleanup = async () => {
    await AdMob.removeAllListeners();
  };
  let initialFunction;
  useEffect(() => {
    const initializeAd = async () => {
      if (error === null) {
        try {
          if (isNative) {
            if (error !== null) {
              return;
            }
            initialFunction = await initializeAdMob({
              setError,
              setIsLoading,
              setAdmobReward,
              setAdsWatched,
              setAdWatchedOnlyForBlinkModal,
              setWhichAds,
              whichAds,
              whichTarot,
              userInfo,
              content,
              listeners,
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
      if (initialFunction) cleanup();
      if (initialFunction && Object.values(listeners).length > 0) {
        Object.values(listeners).forEach(listener => listener.remove());
        listeners = {};
      }
    };
  }, [error, initializeAdMob, initializeAdSense, whichAds, initialFunction]);
  if (error) {
    return (
      <div className={styles['backdrop']}>
        <div className={styles['backdrop-box']}>
          {}
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
    <>
      {!isNative && adLoaded ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: 'auto' }}
          data-ad-client="ca-pub-7748316956330968"
          data-ad-slot="3545458418"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : null}
    </>
  );
};
export default AdComponentForInterstital;
