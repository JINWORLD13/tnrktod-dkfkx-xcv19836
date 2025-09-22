import React, { useEffect, useCallback, useState } from 'react';
import styles from '../../styles/scss/_AdComponent.module.scss';
import Button from '../../UI/Button';
import CancelButton from '../../UI/CancelButton';
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
import { useSelectedTarotCards } from '../../hooks/dispatch/tarotDispatch';
import {
  setAdsFree,
  getRewardForPreference,
  useRewardForPreference,
  getAdsFree,
} from '../../utils/tokenPreference';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange';
import { tarotApi } from '../../api/tarotApi';
import { useDispatch } from 'react-redux';
import {
  setIsAnswered,
  setIsReadyToShowDurumagi,
  setIsWaiting,
} from '../../data/reduxStore/booleanStore';
import { IS_PRODUCTION_MODE } from '../../function/IS_PRODUCTION_MODE';
import { isNormalAccount } from '../../function/isNormalAccount';
import { useRewardFromPreference } from './module/useRewardFromPreference';
import useButtonLock from '../../hooks/useEffect/useButtonLock';
import AdLoadingComponent from './module/AdLoadingComponent';
const isNative = Capacitor.isNativePlatform();
const AdComponentForButton = ({
  stateGroup,
  setStateGroup,
  userInfo,
}) => {
  const dispatch = useDispatch();
  const content = getLocalizedContent();
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showInitialPrompt, setShowInitialPrompt] = useState(true);
  const browserLanguage = useLanguageChange();
  const [isTarotAble, setTarotAble] = useState(false); 
  const { clickCount, isLocked, remainingTime, handleClick } = useButtonLock({
    maxClicks: 5,
    particalLockDuration: 60 * 60 * 1000,
    lockDuration: 5 * 60 * 60 * 1000,
    uniqueId: userInfo?.email,
  });
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
      setAdsWatched(false); 
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
    setShowInitialPrompt(false);
    setIsLoading(true);
  }, []);
  const [isCancelButtonClicked, setCancelButtonClicked] = useState(false);
  const handleInitialCancel = useCallback(
    e => {
      try {
        if (isCancelButtonClicked) return;
        setCancelButtonClicked(true);
        setWhichAds(0);
        setAdsWatched(false);
        setAdWatchedOnlyForBlinkModal(false);
      } catch (error) {
        console.log(error);
      } finally {
        setCancelButtonClicked(false);
      }
    },
    [setWhichAds, setAdsWatched, setAdWatchedOnlyForBlinkModal]
  );
  const selectedTarotCards = useSelectedTarotCards();
  const onSubmit = async () => {
    const updatedSelectedTarotCards = [...selectedTarotCards];
    if (isNative) {
      if (whichTarot === 2 || whichTarot === 4)
        await useRewardFromPreference({
          userInfo,
          whichAds,
          whichTarot,
          isVoucherModeOn,
          setAdmobReward,
        });
      await setAdsFree(userInfo);
    }
    const tarotCardsNameArr = updatedSelectedTarotCards.map((elem, i) => {
      return elem?.name;
    });
    const reverseStatesArr = updatedSelectedTarotCards.map((elem, i) => {
      if (elem.reversed === true) {
        return 'reversed';
      } else {
        return 'normal_direction';
      }
    });
    const selectedTarotCardsArr = tarotCardsNameArr.map((elem, i) => {
      return elem + ' ' + '(' + reverseStatesArr[i] + ')';
    });
    const questionInfo = {
      question_topic: questionForm['question_topic'].trim(),
      subject: questionForm?.subject.trim(),
      object: questionForm?.object.trim(),
      relationship_subject: questionForm['relationship_subject'].trim(),
      relationship_object: questionForm['relationship_object'].trim(),
      theme: questionForm?.theme.trim(),
      situation: questionForm?.situation.trim(),
      question: questionForm?.question.trim(),
      firstOption: questionForm?.['firstOption']?.trim(),
      secondOption: questionForm?.['secondOption']?.trim(),
      thirdOption: questionForm?.['thirdOption']?.trim(),
    };
    const spreadInfo = {
      spreadTitle: questionForm?.spreadTitle,
      cardCount: questionForm?.cardCount,
      spreadListNumber: questionForm?.spreadListNumber,
      selectedTarotCardsArr: selectedTarotCardsArr,
    };
    let result;
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let tarotInfo = {
      questionInfo: { ...questionInfo },
      spreadInfo: { ...spreadInfo },
      tarotSpreadVoucherPrice: tarotSpreadVoucherPrice,
      language: browserLanguage,
      time: answerForm?.timeOfCounselling,
      formattedTime: answerForm?.timeOfCounselling?.toLocaleString(
        ['ko-KR', 'ja-JP', 'en-US'].find(locale =>
          locale.startsWith(browserLanguage)
        ) || 'en-US',
        {
          timeZone:
            browserLanguage === 'ko'
              ? 'Asia/Seoul'
              : browserLanguage === 'ja'
              ? 'Asia/Tokyo'
              : userTimeZone,
        }
      ),
      isVoucherModeOn: isVoucherModeOn ?? true,
    };
    if (whichTarot === 2 && !isVoucherModeOn) {
      try {
        updateAnswerForm(prev => {
          return {
            ...prev,
            isWaiting: true, 
            isAnswered: false, 
            isSubmitted: true,
          };
        });
        result = await tarotApi.postQuestionForNormalForAnthropicAPI(tarotInfo);
      } catch (error) {
        console.error(error);
      }
    }
    if (result?.response !== undefined && result?.response !== null) {
      setWhichCardPosition(prev => {
        return {
          isClicked: false,
          position: -1,
        };
      });
      const parsedObj = JSON.parse(result?.response?.answer);
      updateAnswerForm({
        questionInfo,
        spreadInfo,
        answer: parsedObj || result?.response?.answer,
        language: tarotInfo?.language,
        timeOfCounselling: tarotInfo?.time,
        createdAt: result?.response.createdAt,
        updatedAt: result?.response.updatedAt,
        isWaiting: false,
        isSubmitted: false,
        isAnswered: true,
      });
      dispatch(setIsWaiting(false));
      dispatch(setIsAnswered(true));
      dispatch(setIsReadyToShowDurumagi(true));
      setAdsWatched(false);
      setWhichAds(0);
    }
  };
  let listeners = {};
  let cleanup = async () => {
    await AdMob.removeAllListeners();
  };
  let initialFunction;
  useEffect(() => {
    const initializeAd = async () => {
      if (!showInitialPrompt && isLoading && error === null) {
        try {
          if (isNative) {
            if (error !== null) {
              return;
            }
            if (!isTarotAble) {
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
                setTarotAble,
                onSubmit,
                handleClick,
                listeners,
              });
            }
            if (
              ![1, 2, 4]?.includes(whichAds) ||
              isVoucherModeOn ||
              error !== null
            )
              return;
            if (!IS_PRODUCTION_MODE || !isNormalAccount(userInfo)) {
              console.log(
                `***************************whichAds ${whichAds}번 빠지나?`,
                error
              );
            }
          } else {
            await initializeAdSense(
              setError,
              setAdLoaded,
              setIsLoading,
              handleConfirm
            );
            if (!isVoucherModeOn) await onSubmit();
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
  }, [
    error,
    showInitialPrompt,
    initializeAdMob,
    initializeAdSense,
    isLoading,
    whichAds,
    isVoucherModeOn,
    initialFunction,
    isTarotAble,
  ]);
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
              <CancelButton
                onClick={(e = null) => {
                  handleInitialCancel(e);
                }}
              >
                {content?.initialPrompt.cancelButton}
              </CancelButton>
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
  if (isLoading) {
    return (
      <AdLoadingComponent
        setIsLoading={setIsLoading}
        setWhichAds={setWhichAds}
        setAdsWatched={setAdsWatched}
      />
    );
  }
  return (
    <>
      {isNative ? (
        <AdLoadingComponent
          setIsLoading={setIsLoading}
          setWhichAds={setWhichAds}
          setAdsWatched={setAdsWatched}
        />
      ) : (
        <div className={styles['backdrop']}>
          <div className={styles['backdrop-box']}>
            <div className={styles['ad-badge']}>{t(`ad.label`)}</div>
            <div className={styles['modal']}>
              {adLoaded && (
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
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AdComponentForButton;
