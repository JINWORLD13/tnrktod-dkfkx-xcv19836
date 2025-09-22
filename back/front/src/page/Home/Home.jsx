import React, {
  useState,
  useEffect,
  useMemo,
  useTransition,
  Suspense,
  useCallback,
} from 'react';
import styles from './_Home.module.scss';
import SpreadModal from '../../Modal/SpreadModal/SpreadModal.jsx';
import TarotModal from '../../Modal/TarotModal/TarotModal.jsx';
import { useTranslation } from 'react-i18next';
import {
  useAnswerFormState,
  useQuestionFormState,
  useModalFormState,
  useCardFormState,
  useWhichTarotState,
  useCSSInvisibleState,
  useCountryState,
  useBlinkModalState,
  useChargeModalState,
  useTarotSpreadPricePointState,
  useTarotManualModalState,
  useRefundPolicyState,
  usePriceInfoModalState,
  useTarotSpreadVoucherPriceState,
} from '../../hooks/useState/index.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllTarotCards } from '../../data/reduxStore/tarotCardStore.jsx';
import {
  setIsAnswered,
  setIsWaiting,
  setIsDoneAnimationOfBackground,
  setIsReadyToShowDurumagi,
} from '../../data/reduxStore/booleanStore.jsx';
import AnswerDurumagiModal from '../../Modal/AnswerModal/AnswerDurumagiModal.jsx';
import AnswerCardImagesModal from '../../Modal/AnswerModal/AnswerCardImagesModal.jsx';
import TarotManualModal from '../../Modal/TarotManualModal.jsx';
import usePreventModalBackgroundScroll from '../../hooks/useEffect/usePreventModalBackgroundScroll.jsx';
import useFetchUserAndTarotDataWithRedux, {
  userCacheForRedux,
} from '../../hooks/useEffect/useFetchUserAndTarotDataWithRedux.jsx';
import { tarotApi } from '../../api/tarotApi.jsx';
import { userApi } from '../../api/userApi.jsx';
import { hasAccessToken } from '../../utils/tokenCookie.jsx';
import {
  getRewardForPreference,
  hasAccessTokenForPreference,
} from '../../utils/tokenPreference.jsx';
import AdComponentForButton from '../GoogleAd/AdComponentForButton.jsx';
import { source } from '../../api/api.jsx';
import ChargeModal from '../../Modal/PurchaseModal/TossPurchase/ChargeModal.jsx';
import InAppPurchase from '../../Modal/PurchaseModal/InAppPurchase/InAppPurchase.jsx';
import { checkViolationInGoogleInAppRefund } from '../../function/checkViolation.jsx';
import isComDomain from '../../function/isComDomain.jsx';
import { IS_PRODUCTION_MODE } from '../../function/IS_PRODUCTION_MODE.js';
import TarotMasterScene from '../ThreeScene/Model/TarotMasterSceneFirstEdition/TarotMasterScene.jsx';
import { BlinkModalSet } from './BlinkModalSet.jsx';
import TarotQuestionInstructionModal from '../../Modal/TarotQuestionInstructionModal.jsx';
import { getTodayCard } from '../../utils/tokenLocalStorage.jsx';
import { getTodayCardForNative } from '../../utils/tokenPreference.jsx';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
import AdComponentForInterstital from '../GoogleAd/AdComponentForInterstital.jsx';
import { isNormalAccount } from '../../function/isNormalAccount.js';
import { isAdsFreePassValid } from '../../function/isAdsFreePassValid.jsx';
import { useTotalCardsNumber } from '../../hooks/dispatch/tarotDispatch.jsx';
import { useOutletContext } from 'react-router-dom';
import DailyTarotCard from '../../Components/Button/DailyTarotButton/DailyTarotCard.jsx';
import Login from '../../Components/Button/LoginButton/Login.jsx';
import LoadingForm from '../../Components/Loading/Loading.jsx';
import Spread from '../../Components/Button/SpreadButton/Spread.jsx';
import MyPage from '../../Components/Button/MyPageButton/MyPage.jsx';
import NoticePopup from '../../Components/NoticePopup/NoticePopup.jsx';
import AnswerModal from '../../Modal/AnswerModal/AnswerModal.jsx';
import TarotManual from '../../Components/Button/TarotManual/TarotManual.jsx';
import TarotPage from '../TarotPage/TarotPage.jsx';
const Home = () => {
  const {
    setWhichTarotForApp,
    setIsVoucherModeOnForApp,
    setAdsWatchedForApp,
    setAnswerFormForApp,
  } = useOutletContext();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isToken, setIsToken] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [userInfo, setUserInfo] = useState({});
  const [answerForm, updateAnswerForm] = useAnswerFormState();
  const [isReadyToShowDurumagi, setReadyToShowDurumagi] = useState(false);
  const [isDoneAnimationOfBackground, setDoneAnimationOfBackground] =
    useState(false);
  const [cardForm, updateCardForm] = useCardFormState();
  const [questionForm, updateQuestionForm] = useQuestionFormState();
  const [modalForm, updateModalForm] = useModalFormState();
  const [whichTarot, updateWhichTarot] = useWhichTarotState();
  const [cssInvisible, updateCSSInvisible] = useCSSInvisibleState();
  const [country, updateCountry] = useCountryState();
  const [isVoucherModeOn, setVoucherMode] = useState(() => {
    if (isNative) return false; 
    if (!isNative) return true;
  }); 
  const [isAdsWatched, setAdsWatched] = useState(false); 
  const [isAdWatchedOnlyForBlinkModal, setAdWatchedOnlyForBlinkModal] =
    useState(false);
  const [whichAds, setWhichAds] = useState(0); 
  const [admobReward, setAdmobReward] = useState(null); 
  useEffect(() => {
    setWhichTarotForApp(whichTarot);
    setIsVoucherModeOnForApp(isVoucherModeOn);
    setAdsWatchedForApp(isAdsWatched);
    setAnswerFormForApp(answerForm);
  }, [
    whichTarot,
    isVoucherModeOn,
    isAdsWatched,
    answerForm.isWaiting,
    answerForm.isAnswered,
    answerForm.isSubmitted,
    answerForm.answer,
    answerForm.questionInfo.question,
  ]);
  useEffect(() => {
    let isMounted = true;
    const fetchReward = async () => {
      try {
        let type =
          IS_PRODUCTION_MODE && isNormalAccount(userInfo) ? 'Voucher' : 'coins';
        const rewardAmount = await getRewardForPreference(
          type,
          userInfo?.email
        );
        if (isMounted) {
          setAdmobReward(rewardAmount);
        }
      } catch (error) {
        if (error.name === 'AbortError') return; 
        console.error('Failed to fetch reward:', error);
      }
    };
    fetchReward();
    return () => {
      isMounted = false; 
    };
  }, [userInfo]); 
  const [isBlinkModalForLoginOpen, updateBlinkModalForLoginOpen] =
    useBlinkModalState();
  const [isBlinkModalForCopyOpen, updateBlinkModalForCopyOpen] =
    useBlinkModalState();
  const [isBlinkModalForSaveOpen, updateBlinkModalForSaveOpen] =
    useBlinkModalState();
  const [isChargeModalOpen, updateChargeModalOpen] = useChargeModalState();
  const [showInAppPurchase, setShowInAppPurchase] = useState(false);
  const [isTarotManualModalOpen, updateTarotManualModalOpen] =
    useTarotManualModalState();
  const [tarotSpreadPricePoint, updateTarotSpreadPricePoint] =
    useTarotSpreadPricePointState();
  const [tarotSpreadVoucherPrice, updateTarotSpreadVoucherPrice] =
    useTarotSpreadVoucherPriceState();
  const [isRefundPolicyOpen, updateRefundPolicyOpen] =
    useRefundPolicyState(false);
  const [isPriceInfoModalOpen, updatePriceInfoModalOpen] =
    usePriceInfoModalState(false);
  const [isBlinkModalForChargingKRWOpen, setBlinkModalForChargingKRWOpen] =
    useState(false);
  const [isBlinkModalForChargingUSDOpen, setBlinkModalForChargingUSDOpen] =
    useState(false);
  const [isFilledInTheQuestion, setFilledInTheQuestion] = useState(true);
  const [isOverInTheQuestion, setOverInTheQuestion] = useState(false);
  const [isUnavailableVoucher, setUnavailableVoucher] = useState(false);
  const [isUnavailableWhichTarot, setUnavailableWhichTarot] = useState(false);
  const [isSpeedTarotNotificationOn, setSpeedTarotNotificationOn] =
    useState(false);
  const [whichSpread, setWhichSpread] = useState(false);
  const [whichCardPosition, setWhichCardPosition] = useState({
    isClicked: false,
    position: -1,
  });
  const [questionMode, setQuestionMode] = useState(1);
  const [requiredVoucherInfo, setRequiredVoucherInfo] = useState({
    name: 0,
    requiredAmount: 0,
    remainingAmount: 0,
  });
  const toggleSpreadModal = useCallback(
    (value, list_number, spread_title, card_count) => {
      if (answerForm?.isWaiting === false) {
        updateModalForm({ ...modalForm, spread: value });
        updateQuestionForm(prev => ({
          ...prev,
          spreadTitle: spread_title,
          cardCount: card_count,
          spreadListNumber: list_number,
        }));
      }
    },
    [answerForm, modalForm, updateModalForm, updateQuestionForm] 
  );
  const toggleTarotModal = useCallback(
    (value, list_number, spread_title, card_count) => {
      updateModalForm(prev => {
        return { ...prev, tarot: value };
      });
      updateQuestionForm(prev => {
        return {
          ...prev,
          spreadTitle: spread_title,
          cardCount: card_count,
          spreadListNumber: list_number,
        };
      });
    }
  );
  const handleCardForm = useCallback(e => {
    e.preventDefault();
    const { name, value } = e.target; 
    updateCardForm(prev => ({
      ...prev, 
      [name]: value, 
    }));
  });
  const handleQuestionForm = useCallback(e => {
    e.preventDefault();
    const { name, value } = e.target;
    updateQuestionForm(prev => ({
      ...prev,
      [name]: value,
    }));
  });
  const handleWhichTarot = useCallback(number => {
    updateWhichTarot(number);
    if (number === 2 && isVoucherModeOn === false) {
    }
  });
  const handleAnsweredState = useCallback(() => {
    dispatch(setIsWaiting(false));
    dispatch(setIsAnswered(true));
    updateAnswerForm(prev => {
      return {
        ...prev,
        isSubmitted: false,
        isWaiting: false,
        isAnswered: true,
      };
    });
  });
  const handleNotAnsweredState = useCallback(() => {
    dispatch(setIsWaiting(false));
    dispatch(setIsAnswered(false));
    dispatch(setIsDoneAnimationOfBackground(false));
    dispatch(setIsReadyToShowDurumagi(false));
    updateAnswerForm(prev => {
      return {
        ...prev,
        isSubmitted: false,
        isWaiting: false,
        isAnswered: false,
      };
    });
  });
  const handleResetAll = useCallback(() => {
    dispatch(resetAllTarotCards());
    dispatch(setIsWaiting(false));
    dispatch(setIsAnswered(false));
    dispatch(setIsDoneAnimationOfBackground(false));
    dispatch(setIsReadyToShowDurumagi(false));
    updateAnswerForm(prev => {
      return {
        ...prev,
        questionInfo: {
          question_topic: '',
          subject: '',
          object: '',
          relationship_subject: '',
          relationship_object: '',
          theme: '',
          situation: '',
          question: '',
          firstOption: '',
          secondOption: '',
          thirdOption: '',
        },
        spreadInfo: {
          spreadTitle: '',
          cardCount: 0,
          spreadListNumber: 0,
          selectedTarotCardsArr: [],
        },
        answer: '',
        language: '',
        timeOfCounselling: '',
        createdAt: '',
        updatedAt: '',
        isSubmitted: false,
        isWaiting: false,
        isAnswered: false,
      };
    });
    updateQuestionForm(prev => {
      return {
        ...prev,
        question_topic: '',
        subject: '',
        object: '',
        relationship_subject: '',
        relationship_object: '',
        theme: '',
        situation: '',
        question: '',
        spreadTitle: '',
        cardCount: 0,
        spreadListNumber: 0,
        firstOption: '',
        secondOption: '',
      };
    });
    updateCardForm(prev => {
      return {
        ...prev,
        shuffle: 0,
        isReadyToShuffle: false,
        isSuffleFinished: false,
        spread: false,
        flippedIndex: [],
        selectedCardIndexList: [],
      };
    });
    updateCSSInvisible(false);
    setDoneAnimationOfBackground(false);
    setReadyToShowDurumagi(false);
    setWhichCardPosition(prev => {
      return {
        ...prev,
        isClicked: false,
        position: -1,
      };
    });
  });
  const handleResetDeck = useCallback(() => {
    dispatch(resetAllTarotCards());
    updateCardForm(prev => {
      return {
        ...prev,
        shuffle: 0,
        isReadyToShuffle: false,
        isSuffleFinished: false,
        spread: false,
        flippedIndex: [],
        selectedCardIndexList: [],
      };
    });
  });
  const handleSpreadValue = useCallback(value => {
    updateCardForm(prev => {
      return { ...prev, spread: value };
    });
  });
  const handleReadyToShuffleValue = useCallback(value => {
    updateCardForm(prev => {
      return { ...prev, isReadyToShuffle: value };
    });
  });
  const handleSuffleFinishValue = useCallback(value => {
    updateCardForm(prev => {
      return { ...prev, isShuffleFinished: value };
    });
  });
  const stateGroup = useMemo(
    () => ({
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
      isAdWatchedOnlyForBlinkModal,
      whichAds,
      isChargeModalOpen,
      showInAppPurchase,
      whichSpread,
      whichCardPosition,
      isReadyToShowDurumagi,
      isDoneAnimationOfBackground,
      admobReward,
      questionMode,
      isSpeedTarotNotificationOn,
      isBlinkModalForLoginOpen,
      isBlinkModalForCopyOpen,
      isBlinkModalForSaveOpen,
      isBlinkModalForChargingKRWOpen,
      isBlinkModalForChargingUSDOpen,
      isFilledInTheQuestion,
      isUnavailableVoucher,
      isUnavailableWhichTarot,
      requiredVoucherInfo,
      isPending,
      isOverInTheQuestion,
    }),
    [
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
      isAdWatchedOnlyForBlinkModal,
      whichAds,
      isChargeModalOpen,
      showInAppPurchase,
      whichSpread,
      whichCardPosition,
      isReadyToShowDurumagi,
      isDoneAnimationOfBackground,
      admobReward,
      questionMode,
      isSpeedTarotNotificationOn,
      isBlinkModalForLoginOpen,
      isBlinkModalForCopyOpen,
      isBlinkModalForSaveOpen,
      isBlinkModalForChargingKRWOpen,
      isBlinkModalForChargingUSDOpen,
      isFilledInTheQuestion,
      isUnavailableVoucher,
      isUnavailableWhichTarot,
      requiredVoucherInfo,
      isPending,
      isOverInTheQuestion,
    ]
  );
  const setStateGroup = useMemo(
    () => ({
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
      setQuestionMode,
      setSpeedTarotNotificationOn,
      updateBlinkModalForCopyOpen,
      updateBlinkModalForSaveOpen,
      setBlinkModalForChargingKRWOpen,
      setBlinkModalForChargingUSDOpen,
      setUnavailableVoucher,
      setRequiredVoucherInfo,
      startTransition,
      setOverInTheQuestion,
    }),
    [
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
      setQuestionMode,
      setSpeedTarotNotificationOn,
      updateBlinkModalForCopyOpen,
      updateBlinkModalForSaveOpen,
      setBlinkModalForChargingKRWOpen,
      setBlinkModalForChargingUSDOpen,
      setUnavailableVoucher,
      setRequiredVoucherInfo,
      startTransition,
      setOverInTheQuestion,
    ]
  );
  const toggleModalGroup = useMemo(
    () => ({
      toggleSpreadModal,
      toggleTarotModal,
    }),
    [toggleSpreadModal, toggleTarotModal]
  );
  const handleStateGroup = useMemo(
    () => ({
      handleAnsweredState,
      handleCardForm,
      handleQuestionForm,
      handleResetAll,
      handleResetDeck,
      handleSpreadValue,
      handleReadyToShuffleValue,
      handleSuffleFinishValue,
      handleWhichTarot,
    }),
    [
      handleAnsweredState,
      handleCardForm,
      handleQuestionForm,
      handleResetAll,
      handleResetDeck,
      handleSpreadValue,
      handleReadyToShuffleValue,
      handleSuffleFinishValue,
      handleWhichTarot,
    ]
  );
  const userInfoForRedux = useSelector(state => state?.userInfoStore?.userInfo);
  const { getUserAndTarot, clearCaches, cleanupInterceptorArr } =
    useFetchUserAndTarotDataWithRedux(tarotApi, userApi, dispatch);
  const saveUserAndTarotInRedux = async () => {
    if (hasAccessToken() === true && isNative === false)
      await getUserAndTarot();
    const checkTokenInApp =
      isNative === true ? await hasAccessTokenForPreference() : false;
    if (isNative === true && checkTokenInApp === true) await getUserAndTarot();
  };
  useEffect(() => {
    if (answerForm?.isWaiting === false && answerForm?.isAnswered === true) {
      saveUserAndTarotInRedux();
      setAdsWatched(false);
    } else {
      saveUserAndTarotInRedux();
    }
    return () => {
      if (
        cleanupInterceptorArr &&
        Array.isArray(cleanupInterceptorArr) &&
        cleanupInterceptorArr?.length > 0
      ) {
        cleanupInterceptorArr.forEach(cleanup => {
          cleanup();
        });
      }
      clearCaches();
      source.cancel('Cancelled all requests');
    };
  }, [answerForm?.isWaiting, answerForm?.isAnswered]);
  useEffect(() => {
    if (
      (typeof userInfoForRedux === 'object' &&
        Object.keys(userInfoForRedux)?.length === 0) ||
      userInfoForRedux === undefined ||
      userInfoForRedux === null
    ) {
      setUserInfo({});
    } else {
      setUserInfo(userInfoForRedux);
    }
    saveUserAndTarotInRedux();
    return () => {
      source.cancel('Cancelled all requests');
    };
  }, [
    userInfoForRedux,
    isChargeModalOpen,
    isTarotManualModalOpen,
    modalForm?.spread,
  ]);
  useEffect(() => {
    const checkToken = async () => {
      if (isNative) {
        const hasToken = await hasAccessTokenForPreference();
        setIsToken(hasToken);
      } else {
        setIsToken(hasAccessToken());
      }
    };
    checkToken();
  }, [isToken]);
  usePreventModalBackgroundScroll(isChargeModalOpen, isTarotManualModalOpen);
  checkViolationInGoogleInAppRefund(userInfo);
  let [resultOfHasUserEmail, setResultOfHasUserEmail] = useState(false);
  useEffect(() => {
    setResultOfHasUserEmail(() => {
      return userInfo?.email ? isComDomain(userInfo?.email) : false;
    });
  }, [userInfo?.email]);
  const isAdmobOn =
    isNative &&
    whichAds !== 0 && 
    isAdsWatched === false &&
    !isAdsFreePassValid(userInfo) &&
    ((!isVoucherModeOn && answerForm?.isAnswered && whichTarot === 2) || 
      (isVoucherModeOn && showInAppPurchase) || 
      (!isVoucherModeOn && showInAppPurchase && whichTarot !== 2)); 
  const totalCardsNumber = useTotalCardsNumber();
  const isAdmobInterstitialOn =
    isNative &&
    whichAds === 1 && 
    isAdsWatched === false &&
    whichTarot === 1 &&
    !isAdsFreePassValid(userInfo) &&
    cardForm?.selectedCardIndexList.length === totalCardsNumber && 
    modalForm.tarot; 
  const RenderTarotModal =
    modalForm?.tarot && userInfo?.email !== '' && userInfo?.email !== undefined;
  const initialAdsMode =
    whichTarot === 2 &&
    !isVoucherModeOn &&
    !answerForm?.isWaiting &&
    answerForm?.isAnswered &&
    !isReadyToShowDurumagi &&
    !isDoneAnimationOfBackground &&
    answerForm?.answer?.length === 0 &&
    !isAdsFreePassValid(userInfo);
  useEffect(() => {
    const initializeReward = async () => {
      try {
        if (!userInfo || Object.keys(userInfo)?.length === 0) return;
        let type =
          IS_PRODUCTION_MODE && isNormalAccount(userInfo) ? 'Voucher' : 'coins';
        if (userInfo?.email) {
          const rewardAmount = await getRewardForPreference(
            type,
            userInfo?.email
          );
          if (rewardAmount > 0) setAdmobReward(rewardAmount);
          if (rewardAmount === 0) setAdmobReward(0);
          return rewardAmount;
        }
      } catch (error) {
        console.error('error while initializing admobReward :', error);
      }
    };
    initializeReward();
  }, [
    whichTarot,
    isVoucherModeOn,
    isAdsWatched,
    admobReward,
    whichAds,
    userInfo,
    userInfo?.email,
    userInfoForRedux,
  ]);
  const [isInstructionOpen, setInstructionOpen] = useState(false);
  const [questionKind, setQuestionKind] = useState(0);
  const [isClickedForTodayCard, setClickedForTodayCard] = useState(false);
  const [todayCardIndexInLocalStorage, setTodayCardIndexInLocalStorage] =
    useState(() => {
      if (!isNative) return getTodayCard(userInfo); 
      if (isNative) return null;
    });
  useEffect(() => {
    const fetchTodayCard = async () => {
      try {
        let index;
        if (isNative) {
          index = await getTodayCardForNative(userInfo);
        } else {
          index = getTodayCard(userInfo);
        }
        if (
          cardForm?.selectedCardIndexList?.length !== 0 &&
          userInfo?.email !== undefined &&
          userInfo?.email !== ''
        )
          setTodayCardIndexInLocalStorage(cardForm?.selectedCardIndexList[0]);
        if (index) setTodayCardIndexInLocalStorage(index);
      } catch (error) {
        console.error("Error fetching today's card:", error);
      }
    };
    if (
      !todayCardIndexInLocalStorage &&
      userInfo?.email !== '' &&
      userInfo?.email !== undefined
    )
      fetchTodayCard();
  }, [isNative, userInfo?.email, cardForm?.selectedCardIndexList?.length]);
  return (
    <div className={styles['container']}>
      {}
      {}
      {new Date() < new Date('2025-08-26') && isNative && userInfo?.email && (
        <NoticePopup email={userInfo?.email} />
      )}
      {}
      {new Date() < new Date('2025-08-26') &&
        isNative &&
        (!userInfo || userInfo?.email === '' || !userInfo?.email) && (
          <NoticePopup email={'user@user.com'} />
        )}
      {}
      <Login
        userInfo={userInfo}
        isTokenFromHome={isToken}
        setIsTokenFromHome={setIsToken}
        styles={styles}
        stateGroup={stateGroup}
        setStateGroup={setStateGroup}
      />
      {}
      <DailyTarotCard
        modalForm={modalForm}
        answerForm={answerForm}
        isReadyToShowDurumagi={isReadyToShowDurumagi}
        userInfo={userInfo}
        cardForm={cardForm}
        todayCardIndexInLocalStorage={todayCardIndexInLocalStorage}
        styles={styles}
        handleStateGroup={handleStateGroup}
        updateCardForm={updateCardForm}
        stateGroup={stateGroup}
        setStateGroup={setStateGroup}
        setClickedForTodayCardFromHome={setClickedForTodayCard}
        isTokenFromHome={isToken}
      />
      <Spread
        modalForm={modalForm}
        answerForm={answerForm}
        isReadyToShowDurumagi={isReadyToShowDurumagi}
        userInfo={userInfo}
        cardForm={cardForm}
        todayCardIndexInLocalStorage={todayCardIndexInLocalStorage}
        styles={styles}
        handleStateGroup={handleStateGroup}
        updateCardForm={updateCardForm}
        stateGroup={stateGroup}
        setStateGroup={setStateGroup}
        isClickedForTodayCardFromHome={isClickedForTodayCard}
      />
      <MyPage
        modalForm={modalForm}
        answerForm={answerForm}
        isReadyToShowDurumagi={isReadyToShowDurumagi}
        userInfo={userInfo}
        cardForm={cardForm}
        todayCardIndexInLocalStorage={todayCardIndexInLocalStorage}
        styles={styles}
        handleStateGroup={handleStateGroup}
        updateCardForm={updateCardForm}
        stateGroup={stateGroup}
        setStateGroup={setStateGroup}
        isClickedForTodayCardFromHome={isClickedForTodayCard}
      />
      <TarotManual
        modalForm={modalForm}
        answerForm={answerForm}
        isReadyToShowDurumagi={isReadyToShowDurumagi}
        userInfo={userInfo}
        cardForm={cardForm}
        todayCardIndexInLocalStorage={todayCardIndexInLocalStorage}
        styles={styles}
        handleStateGroup={handleStateGroup}
        updateCardForm={updateCardForm}
        stateGroup={stateGroup}
        updateTarotManualModalOpen={updateTarotManualModalOpen}
        isClickedForTodayCardFromHome={isClickedForTodayCard}
      />
      <BlinkModalSet
        stateGroup={stateGroup}
        setStateGroup={setStateGroup}
        styles={styles}
      />
      {isChargeModalOpen && !isNative && resultOfHasUserEmail && (
        <ChargeModal
          updateChargeModalOpen={updateChargeModalOpen}
          isRefundPolicyOpen={isRefundPolicyOpen}
          updateRefundPolicyOpen={updateRefundPolicyOpen}
          isPriceInfoModalOpen={isPriceInfoModalOpen}
          updatePriceInfoModalOpen={updatePriceInfoModalOpen}
          setBlinkModalForChargingKRWOpen={setBlinkModalForChargingKRWOpen}
          setBlinkModalForChargingUSDOpen={setBlinkModalForChargingUSDOpen}
          userInfoFromMyPage={userInfo}
          setUnavailableVoucher={setUnavailableVoucher}
          requiredVoucherInfo={requiredVoucherInfo}
        >
          {t(`charge_modal.out-of-voucher`)}
        </ChargeModal>
      )}
      {showInAppPurchase && isNative && resultOfHasUserEmail && (
        <InAppPurchase
          updateRefundPolicyOpen={updateRefundPolicyOpen}
          updatePriceInfoModalOpen={updatePriceInfoModalOpen}
          userInfoFromMyPage={userInfo}
          isPriceInfoModalOpen={isPriceInfoModalOpen}
          showInAppPurchase={showInAppPurchase}
          setShowInAppPurchase={setShowInAppPurchase}
          stateGroup={stateGroup}
          setUnavailableVoucher={setUnavailableVoucher}
          setWhichAds={setWhichAds}
          admobReward={admobReward}
          setAdsWatched={setAdsWatched}
          setAdmobReward={setAdmobReward}
        >
          {t(`charge_modal.out-of-voucher`)}
        </InAppPurchase>
      )}
      {isTarotManualModalOpen && (
        <TarotManualModal
          updateTarotManualModalOpen={updateTarotManualModalOpen}
        />
      )}
      {}
      <div className={styles['tarot-master-container']}>
        <Suspense fallback={<LoadingForm />}>
          {}
          <TarotPage
            stateGroup={stateGroup}
            setStateGroup={setStateGroup}
            toggleModalGroup={toggleModalGroup}
            handleStateGroup={handleStateGroup}
            setReadyToShowDurumagi={setReadyToShowDurumagi}
            updateTarotManualModalOpen={updateTarotManualModalOpen}
            setDoneAnimationOfBackground={setDoneAnimationOfBackground}
            userInfo={userInfo}
            isClickedForTodayCard={isClickedForTodayCard}
          />
        </Suspense>
        {isInstructionOpen && (
          <TarotQuestionInstructionModal
            setInstructionOpen={setInstructionOpen}
            questionKind={questionKind}
          />
        )}
        <Suspense fallback={null}>
          {modalForm?.spread &&
            userInfo?.email !== '' &&
            userInfo?.email !== undefined && (
              <SpreadModal
                stateGroup={stateGroup}
                setStateGroup={setStateGroup}
                toggleModalGroup={toggleModalGroup}
                handleStateGroup={handleStateGroup}
                userCacheForRedux={userCacheForRedux}
                admobReward={admobReward}
              />
            )}
        </Suspense>
        <Suspense fallback={null}>
          {RenderTarotModal && (
            <TarotModal
              stateGroup={stateGroup}
              setStateGroup={setStateGroup}
              toggleModalGroup={toggleModalGroup}
              handleStateGroup={handleStateGroup}
              userInfo={userInfo}
              setAdmobReward={setAdmobReward}
              isInstructionOpen={isInstructionOpen}
              setInstructionOpen={setInstructionOpen}
              setQuestionKind={setQuestionKind}
            />
          )}
        </Suspense>
        {}
        {answerForm?.isAnswered &&
        whichTarot !== 1 &&
        !modalForm?.tarot &&
        !modalForm?.spread &&
        (initialAdsMode ||
          (isDoneAnimationOfBackground && isReadyToShowDurumagi)) ? (
          <>
            <AnswerCardImagesModal
              stateGroup={{ answerForm, whichCardPosition }}
              setWhichCardPosition={setWhichCardPosition}
            />
            <AnswerDurumagiModal
              questionForm={questionForm}
              answerForm={answerForm}
              updateAnswerForm={updateAnswerForm}
              tarotSpreadVoucherPrice={tarotSpreadVoucherPrice}
              handleNotAnsweredState={handleNotAnsweredState}
              handleResetAll={handleResetAll}
              updateBlinkModalForSaveOpen={updateBlinkModalForSaveOpen}
              updateBlinkModalForCopyOpen={updateBlinkModalForCopyOpen}
              whichTarot={whichTarot}
              whichAds={whichAds}
              setWhichAds={setWhichAds}
              admobReward={admobReward}
              setAdmobReward={setAdmobReward}
              isVoucherModeOn={isVoucherModeOn}
              userInfo={userInfo}
              setWhichCardPosition={setWhichCardPosition}
              setAdsWatched={setAdsWatched}
            />
          </>
        ) : null}
      </div>
      {}
      {}
      {}
      {}
      {}
      <div
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
        }}
      >
        <h1>{t('page.threejs.mainHeading')}</h1>
        <section>
          <p>{t('page.threejs.intro.paragraph1')}</p>
          <p>{t('page.threejs.intro.paragraph2')}</p>
        </section>
        <section>
          <h2>{t('page.threejs.pageFeatures.title')}</h2>
          <div>
            <h3>{t('page.threejs.pageFeatures.characterCompanion.title')}</h3>
            <p>
              {t('page.threejs.pageFeatures.characterCompanion.description')}
            </p>
          </div>
          <div>
            <h3>{t('page.threejs.pageFeatures.visualComfort.title')}</h3>
            <p>{t('page.threejs.pageFeatures.visualComfort.description')}</p>
          </div>
          <div>
            <h3>{t('page.threejs.pageFeatures.emotionalConnection.title')}</h3>
            <p>
              {t('page.threejs.pageFeatures.emotionalConnection.description')}
            </p>
          </div>
        </section>
        <section>
          <h2>{t('page.threejs.accessibility.title')}</h2>
          <p>{t('page.threejs.accessibility.description')}</p>
        </section>
      </div>
      <noscript>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>{t('page.threejs.noscript.title')}</h1>
          <p>{t('page.threejs.noscript.message1')}</p>
          <p>{t('page.threejs.noscript.message2')}</p>
        </div>
      </noscript>
    </div>
  );
};
export default Home;
