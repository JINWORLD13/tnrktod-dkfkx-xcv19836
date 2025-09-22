import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './_MyPageForm.module.scss';
import {
  hasAccessToken,
  removeAccessTokens,
  removeRefreshTokens,
} from '../../utils/tokenCookie.jsx';
import { useNavigate } from 'react-router-dom';
import { tarotApi } from '../../api/tarotApi.jsx';
import { useTranslation } from 'react-i18next';
import { userApi } from '../../api/userApi.jsx';
import MyPageSideMenuForm from './MyPageSideMenuForm.jsx';
import {
  MORE_BUSINESS_INFO_PATH,
  MYPAGE_CHART_PATH,
  MYPAGE_SUBJECTCHART_PATH,
  MYPAGE_QUESTION_TOPIC_CHART_PATH,
  MORE_TERMS_OF_SERVICE_PATH,
  MYPAGE_THEMECHART_CAREER_PATH,
  MYPAGE_THEMECHART_DECISION_MAKING_PATH,
  MYPAGE_THEMECHART_FINANCE_PATH,
  MYPAGE_THEMECHART_INNER_FEELING_PATH,
  MYPAGE_THEMECHART_LOVE_PATH,
  MYPAGE_THEMECHART_OCCUPATION_PATH,
  MYPAGE_THEMECHART_PATH,
  MYPAGE_THEMECHART_RELATIONSHIP_PATH,
  MYPAGE_TOTALCHART_PATH,
  MYPAGE_USERINFO_PATH,
  MYPAGE_READINGINFO_PATH,
  MYPAGE_USERINFO_WITHDRAW_PATH,
  MYPAGE_MAIN_PATH,
} from '../../config/Route/UrlPaths.jsx';
import {
  useAlertModalState,
  useAnswerFormState,
  useBlinkModalState,
  useChargeModalState,
  useRefundPolicyState,
  useTarotAndIndexInfoState,
  useTarotHistoryState,
} from '../../hooks/useState/index.jsx';
import AnswerCardImagesModal from '../../Modal/AnswerModal/AnswerCardImagesModal.jsx';
import AnswerDurumagiModal from '../../Modal/AnswerModal/AnswerDurumagiModal.jsx';
import ChartInfoForm from '../Chart/ChartInfoForm.jsx';
import UserInfoForm from './UserInfoForm.jsx';
import AlertModal from '../../Modal/AlertModal.jsx';
import BlinkModal from '../../Modal/BlinkModal.jsx';
import ChargeModal from '../../Modal/PurchaseModal/TossPurchase/ChargeModal.jsx';
import InAppPurchase from '../../Modal/PurchaseModal/InAppPurchase/InAppPurchase.jsx';
import usePreventModalBackgroundScroll from '../../hooks/useEffect/usePreventModalBackgroundScroll.jsx';
import usePriceInfoModalState from '../../hooks/useState/usePriceInfoModalState.jsx';
import { useDispatch, useSelector } from 'react-redux';
import useFetchUserAndTarotDataWithRedux from '../../hooks/useEffect/useFetchUserAndTarotDataWithRedux.jsx';
import TarotReadingInfoForm from './TarotReadingInfoForm.jsx';
import UserInfoWithdrawalForm from './UserInfoWithdrawalForm.jsx';
import { setTarotHistoryAction } from '../../data/reduxStore/tarotHistoryStore.jsx';
import {
  getRewardForPreference,
  hasAccessTokenForPreference,
  removeAccessTokensForPreference,
  removeRefreshTokensForPreference,
} from '../../utils/tokenPreference.jsx';
import { checkViolationInGoogleInAppRefund } from '../../function/checkViolation.jsx';
import { cardPositionInfo } from '../../function/cardPositionInfo.jsx';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { Capacitor } from '@capacitor/core';
import isComDomain from '../../function/isComDomain.jsx';
import AdComponentForShop from '../GoogleAd/AdComponentForShop.jsx';
import { IS_PRODUCTION_MODE } from '../../function/IS_PRODUCTION_MODE.js';
import { BlinkModalSet } from '../Home/BlinkModalSet.jsx';
import { isBot } from '../../function/isBot.js';
import { isNormalAccount } from '../../function/isNormalAccount.js';
import useButtonLock from '../../hooks/useEffect/useButtonLock.jsx';
import { source } from '../../api/api.jsx';
import HomePage from '../../Components/Button/HomePageButton/HomePage.jsx';
const isNative = Capacitor.isNativePlatform();
const MyPageForm = () => {
  const fullUrl = window.location.href;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myPageFormRef = useRef(null);
  useEffect(() => {
    return () => {
      myPageFormRef.current = null;
    };
  }, []);
  const { t } = useTranslation();
  const [tarotHistory, updateTarotHistory] = useTarotHistoryState();
  const [userInfo, setUserInfo] = useState({});
  const [pathName, setPathName] = useState(MYPAGE_USERINFO_PATH);
  const [isAnswerModalOpen, setAnswerModalOpen] = useState(false);
  const [answerForm, updateAnswerForm] = useAnswerFormState();
  const [statistics, setStatistics] = useState('');
  const [theme, setTheme] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState(t(`chart.statistics-total`));
  const [questionTopic, setQuestionTopic] = useState('');
  const [question, setQuestion] = useState(t(`chart.statistics-total`));
  const [isUnavailableVoucher, setUnavailableVoucher] = useState(false);
  const [isChargeModalOpen, updateChargeModalOpen] = useChargeModalState();
  const [showInAppPurchase, setShowInAppPurchase] = useState(false);
  const [isRefundPolicyOpen, updateRefundPolicyOpen] =
    useRefundPolicyState(false);
  const [isPriceInfoModalOpen, updatePriceInfoModalOpen] =
    usePriceInfoModalState(false);
  const [isBlinkModalForChargingKRWOpen, setBlinkModalForChargingKRWOpen] =
    useState(false);
  const [isBlinkModalForChargingUSDOpen, setBlinkModalForChargingUSDOpen] =
    useState(false);
  const [isBlinkModalForCopyOpen, updateBlinkModalForCopyOpen] =
    useBlinkModalState();
  const [isBlinkModalForSaveOpen, updateBlinkModalForSaveOpen] =
    useBlinkModalState();
  const [isUserAlertModalOpen, updateUserAlertModalOpen] = useAlertModalState();
  const [isDeleteTarotClicked, setDeleteTarotClicked] = useState(false);
  const [isTarotAlertModalOpen, updateTarotAlertModalOpen] =
    useAlertModalState();
  const [tarotAndIndexInfo, updateTarotAndIndexInfo] =
    useTarotAndIndexInfoState();
  const [isClickedForInvisible, setClickedForInvisible] = useState([]);
  const [whichCardPosition, setWhichCardPosition] = useState({
    isClicked: false,
    position: -1,
  });
  const [whichAds, setWhichAds] = useState(0);
  const [isAdsWatched, setAdsWatched] = useState(false);
  const [admobReward, setAdmobReward] = useState(0);
  const browserLanguage = useLanguageChange();
  if (hasAccessToken() === false && isNative === false && !isBot()) return;
  if (hasAccessTokenForPreference() === false && isNative === true && !isBot())
    return;
  const deleteUserInfo = async e => {
    e.stopPropagation();
    const { response, cleanup } = await userApi.withdraw();
    const statusCode = response;
    if (statusCode === 204) {
      if (isNative) {
        removeAccessTokensForPreference();
        removeRefreshTokensForPreference();
      } else {
        removeAccessTokens();
        removeRefreshTokens();
      }
      navigate('/');
      window.location.reload();
    }
  };
  const handleDeleteTarotHistory = async tarotAndIndexInfo => {
    if (isDeleteTarotClicked) return;
    setDeleteTarotClicked(true);
    const { tarot, index } = tarotAndIndexInfo;
    try {
      const { response, cleanup } = await tarotApi.deleteHistory(tarot);
      const result = response;
      if (result === 'success') {
        setClickedForInvisible(prev => {
          if (!prev.includes(index)) return [...prev];
          return prev;
        });
        updateTarotHistory(currentHistorys => {
          const filteredArray = currentHistorys?.filter(tarotHistory => {
            return tarotHistory?.createdAt !== tarot?.createdAt;
          });
          dispatch(setTarotHistoryAction([...filteredArray]));
          return filteredArray;
        });
      } else {
        console.error('Failed to delete tarot history');
      }
    } catch (error) {
      console.error('Error deleting tarot history:', error);
    } finally {
      setDeleteTarotClicked(false);
    }
  };
  const handleDeleteAllTarotHistory = async () => {
    if (isDeleteTarotClicked) return;
    setDeleteTarotClicked(true);
    try {
      const { response, cleanup } = await tarotApi.deleteHistory();
      const result = response;
      if (result === 'success') {
        updateTarotHistory(() => {
          dispatch(setTarotHistoryAction([]));
          return [];
        });
      } else {
        console.error('Failed to delete all tarot history');
      }
    } catch (error) {
      console.error('Error deleting all tarot history:', error);
    } finally {
      setDeleteTarotClicked(false);
    }
  };
  const userInfoForRedux = useSelector(state => state?.userInfoStore?.userInfo);
  const tarotHistoryForRedux = useSelector(
    state => state?.tarotHistoryStore?.tarotHistory
  );
  const {
    getUserAndTarot: getUserAndTarotForRedux,
    clearCaches,
    cleanupInterceptorArr,
  } = useFetchUserAndTarotDataWithRedux(tarotApi, userApi, dispatch);
  const saveUserAndTarotInRedux = async () => {
    try {
      if (
        (Array.isArray(tarotHistoryForRedux) &&
          tarotHistoryForRedux?.length === 0) ||
        (typeof userInfoForRedux === 'object' &&
          Object.keys(userInfoForRedux)?.length === 0) ||
        tarotHistoryForRedux === undefined ||
        tarotHistoryForRedux === null ||
        userInfoForRedux === undefined ||
        userInfoForRedux === null
      ) {
        await getUserAndTarotForRedux();
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (
      (Array.isArray(tarotHistoryForRedux) &&
        tarotHistoryForRedux?.length === 0) ||
      tarotHistoryForRedux === undefined ||
      tarotHistoryForRedux === null
    ) {
      updateTarotHistory([]);
    } else {
      if (!isBot()) updateTarotHistory(tarotHistoryForRedux);
    }
    if (
      (typeof userInfoForRedux === 'object' &&
        Object.keys(userInfoForRedux)?.length === 0) ||
      userInfoForRedux === undefined ||
      userInfoForRedux === null
    ) {
      setUserInfo({});
    } else {
      if (!isBot()) setUserInfo(userInfoForRedux);
    }
    if (!isBot()) saveUserAndTarotInRedux();
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
  }, [
    userInfoForRedux,
    tarotHistory?.length,
    tarotHistoryForRedux?.length,
    isUserAlertModalOpen,
  ]);
  useEffect(() => {
    const domain =
      import.meta.env.VITE_NODE_ENV === 'DEVELOPMENT'
        ? 'http:
        : import.meta.env.VITE_SERVER_URL || 'https:
    switch (fullUrl) {
      case `${domain}/${browserLanguage}/${MYPAGE_MAIN_PATH}/${MYPAGE_READINGINFO_PATH}`:
        setPathName(MYPAGE_READINGINFO_PATH);
        break;
      case `${domain}/${browserLanguage}/${MYPAGE_MAIN_PATH}/${MYPAGE_CHART_PATH}/${MYPAGE_TOTALCHART_PATH}`:
        setPathName(`${MYPAGE_CHART_PATH}/${MYPAGE_TOTALCHART_PATH}`);
        break;
      case `${domain}/${browserLanguage}/${MYPAGE_MAIN_PATH}/${MYPAGE_CHART_PATH}/${MYPAGE_QUESTION_TOPIC_CHART_PATH}`:
        setPathName(MYPAGE_QUESTION_TOPIC_CHART_PATH);
        break;
      case `${domain}/${browserLanguage}/${MYPAGE_MAIN_PATH}/${MYPAGE_CHART_PATH}/${MYPAGE_SUBJECTCHART_PATH}`:
        setPathName(MYPAGE_SUBJECTCHART_PATH);
        break;
      case `${domain}/${browserLanguage}/${MYPAGE_MAIN_PATH}/${MYPAGE_USERINFO_WITHDRAW_PATH}`:
        setPathName(MYPAGE_USERINFO_WITHDRAW_PATH);
        break;
      default:
    }
  }, [fullUrl]);
  usePreventModalBackgroundScroll(
    isChargeModalOpen,
    isBlinkModalForCopyOpen,
    isBlinkModalForSaveOpen,
    isUserAlertModalOpen,
    isTarotAlertModalOpen,
    isRefundPolicyOpen
  );
  checkViolationInGoogleInAppRefund(userInfo);
  let [resultOfHasUserEmail, setResultOfHasUserEmail] = useState(false);
  useEffect(() => {
    setResultOfHasUserEmail(() => {
      return userInfo?.email ? isComDomain(userInfo?.email) : false;
    });
  }, [userInfo?.email]);
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
        setAdmobReward(0); 
      }
    };
    initializeReward();
  }, [admobReward, whichAds, showInAppPurchase, userInfo, userInfo?.email]);
  return (
    <div className={`${styles['container']}`} ref={myPageFormRef}>
      <HomePage
        answerForm={answerForm}
        userInfo={userInfo}
        styles={styles}
        isAnswerModalOpen={isAnswerModalOpen}
      />
      {isTarotAlertModalOpen === true ? (
        <AlertModal
          updateTarotAlertModalOpen={updateTarotAlertModalOpen}
          tarotAndIndexInfo={tarotAndIndexInfo}
          handleDeleteTarotHistory={handleDeleteTarotHistory}
        >
          {t(`alert_modal.delete_tarot_history`)}
        </AlertModal>
      ) : null}
      {isUserAlertModalOpen === true ? (
        <AlertModal
          updateUserAlertModalOpen={updateUserAlertModalOpen}
          deleteUserInfo={deleteUserInfo}
          handleDeleteAllTarotHistory={handleDeleteAllTarotHistory}
        >
          {t(`alert_modal.delete_user`)}
        </AlertModal>
      ) : null}
      <BlinkModalSet
        stateGroup={{
          answerForm,
          isBlinkModalForCopyOpen,
          isBlinkModalForSaveOpen,
          isBlinkModalForChargingKRWOpen,
          isBlinkModalForChargingUSDOpen,
          isUnavailableVoucher,
          whichCardPosition,
          isAnswerModalOpen,
        }}
        setStateGroup={{
          updateBlinkModalForCopyOpen,
          updateBlinkModalForSaveOpen,
          setBlinkModalForChargingKRWOpen,
          setBlinkModalForChargingUSDOpen,
          setUnavailableVoucher,
          setWhichCardPosition,
        }}
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
        >
          {t(`charge_modal.purchase`)}
        </ChargeModal>
      )}
      {showInAppPurchase && resultOfHasUserEmail && (
        <InAppPurchase
          updateRefundPolicyOpen={updateRefundPolicyOpen}
          updatePriceInfoModalOpen={updatePriceInfoModalOpen}
          userInfoFromMyPage={userInfo}
          isPriceInfoModalOpen={isPriceInfoModalOpen}
          showInAppPurchase={showInAppPurchase}
          setShowInAppPurchase={setShowInAppPurchase}
          setUnavailableVoucher={setUnavailableVoucher}
          setWhichAds={setWhichAds}
          setAdsWatched={setAdsWatched}
          admobReward={admobReward}
          setAdmobReward={setAdmobReward}
        >
          {t(`charge_modal.purchase`)}
        </InAppPurchase>
      )}
      {}
      {!isAdsWatched && whichAds !== 0 && (
        <AdComponentForShop
          whichAds={whichAds}
          setWhichAds={setWhichAds}
          setAdsWatched={setAdsWatched}
          setAdmobReward={setAdmobReward}
          userInfo={userInfo}
        />
      )}
      <div className={styles['container-box1']}>
        <MyPageSideMenuForm
          setPathName={setPathName}
          setAnswerModalOpen={setAnswerModalOpen}
        />
      </div>
      <div className={styles['container-box2']}>
        {pathName === MYPAGE_USERINFO_PATH ? (
          <UserInfoForm
            userInfo={userInfo}
            tarotHistory={tarotHistory}
            setAnswerModalOpen={setAnswerModalOpen}
            updateAnswerForm={updateAnswerForm}
            updateTarotAlertModalOpen={updateTarotAlertModalOpen}
            updateTarotAndIndexInfo={updateTarotAndIndexInfo}
            updateUserAlertModalOpen={updateUserAlertModalOpen}
            updateChargeModalOpen={updateChargeModalOpen}
            showInAppPurchase={showInAppPurchase}
            setShowInAppPurchase={setShowInAppPurchase}
            isClickedForInvisible={isClickedForInvisible}
            resultOfHasUserEmail={resultOfHasUserEmail}
          />
        ) : null}
        {isAnswerModalOpen && (
          <div className={styles['answer-container']}>
            <AnswerCardImagesModal
              stateGroup={{ answerForm, whichCardPosition }}
              setWhichCardPosition={setWhichCardPosition}
            />
            <AnswerDurumagiModal
              answerForm={answerForm}
              setAnswerModalOpen={setAnswerModalOpen}
              updateBlinkModalForSaveOpen={updateBlinkModalForSaveOpen}
              updateBlinkModalForCopyOpen={updateBlinkModalForCopyOpen}
              setWhichCardPosition={setWhichCardPosition}
            />
          </div>
        )}
        {pathName === MYPAGE_READINGINFO_PATH ? (
          <TarotReadingInfoForm
            userInfo={userInfo}
            tarotHistory={tarotHistory}
            updateTarotHistory={updateTarotHistory}
            setAnswerModalOpen={setAnswerModalOpen}
            updateAnswerForm={updateAnswerForm}
            updateTarotAlertModalOpen={updateTarotAlertModalOpen}
            updateTarotAndIndexInfo={updateTarotAndIndexInfo}
            updateUserAlertModalOpen={updateUserAlertModalOpen}
            updateChargeModalOpen={updateChargeModalOpen}
            isClickedForInvisible={isClickedForInvisible}
          />
        ) : null}
        {pathName === `${MYPAGE_CHART_PATH}/${MYPAGE_TOTALCHART_PATH}` ||
        pathName === MYPAGE_SUBJECTCHART_PATH ||
        pathName === MYPAGE_QUESTION_TOPIC_CHART_PATH ||
        pathName === MYPAGE_THEMECHART_PATH ||
        pathName === MYPAGE_THEMECHART_CAREER_PATH ||
        pathName === MYPAGE_THEMECHART_DECISION_MAKING_PATH ||
        pathName === MYPAGE_THEMECHART_FINANCE_PATH ||
        pathName === MYPAGE_THEMECHART_INNER_FEELING_PATH ||
        pathName === MYPAGE_THEMECHART_LOVE_PATH ||
        pathName === MYPAGE_THEMECHART_OCCUPATION_PATH ||
        pathName === MYPAGE_THEMECHART_RELATIONSHIP_PATH ? (
          <ChartInfoForm
            userInfo={userInfo}
            tarotHistory={tarotHistory}
            pathName={pathName}
            setPathName={setPathName}
            statistics={statistics}
            setStatistics={setStatistics}
            theme={theme}
            setTheme={setTheme}
            subject={subject}
            setSubject={setSubject}
            date={date}
            setDate={setDate}
            questionTopic={questionTopic}
            setQuestionTopic={setQuestionTopic}
            question={question}
            setQuestion={setQuestion}
            updateBlinkModalForSaveOpen={updateBlinkModalForSaveOpen}
            updateBlinkModalForCopyOpen={updateBlinkModalForCopyOpen}
          />
        ) : null}
        {pathName === MYPAGE_USERINFO_WITHDRAW_PATH ? (
          <UserInfoWithdrawalForm
            userInfo={userInfo}
            tarotHistory={tarotHistory}
            setAnswerModalOpen={setAnswerModalOpen}
            updateAnswerForm={updateAnswerForm}
            updateTarotAlertModalOpen={updateTarotAlertModalOpen}
            updateTarotAndIndexInfo={updateTarotAndIndexInfo}
            updateUserAlertModalOpen={updateUserAlertModalOpen}
            updateChargeModalOpen={updateChargeModalOpen}
            isClickedForInvisible={isClickedForInvisible}
          />
        ) : null}
        {}
      </div>
      {}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <h1>{t('page.mypage.mainHeading')}</h1>
        <section>
          <p>{t('page.mypage.intro.paragraph1')}</p>
          <p>{t('page.mypage.intro.paragraph2')}</p>
        </section>
        <section>
          <h2>{t('page.mypage.sections.title')}</h2>
          <ul>
            <li>{t('page.mypage.sections.history')}</li>
            <li>{t('page.mypage.sections.statistics')}</li>
            <li>{t('page.mypage.sections.profile')}</li>
          </ul>
        </section>
        <section>
          <h2>{t('page.mypage.features.title')}</h2>
          <div>
            <h3>{t('page.mypage.features.recordManagement.title')}</h3>
            <p>{t('page.mypage.features.recordManagement.description')}</p>
          </div>
          <div>
            <h3>{t('page.mypage.features.statisticalAnalysis.title')}</h3>
            <p>{t('page.mypage.features.statisticalAnalysis.description')}</p>
          </div>
        </section>
        <section>
          <h2>{t('page.mypage.dataManagement.title')}</h2>
          <p>{t('page.mypage.dataManagement.description')}</p>
        </section>
        <section>
          <h2>{t('page.mypage.personalGrowth.title')}</h2>
          <p>{t('page.mypage.personalGrowth.description')}</p>
        </section>
        <section>
          <h2>{t('page.mypage.privacy.title')}</h2>
          <p>{t('page.mypage.privacy.description')}</p>
        </section>
      </div>
    </div>
  );
};
export default MyPageForm;
