import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from '../../styles/scss/_UserVoucherRefundPage.module.scss';
import { hasAccessToken } from '../../utils/tokenCookie.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { userApi } from '../../api/userApi.jsx';
import RefundNotificationForm from './RefundNotificationForm.jsx';
import UserVoucherRefundForm from './UserVoucherRefundForm.jsx';
import { useDispatch, useSelector } from 'react-redux';
import RefundVoucherMenuForm from './RefundVoucherMenuForm.jsx';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { chargeApi } from '../../api/chargeApi.jsx';
import Button from '../../UI/Button.jsx';
import { Capacitor } from '@capacitor/core';
import { setUserInfoForRefundAction } from '../../data/reduxStore/userInfoStore.jsx';
const isNative = Capacitor.isNativePlatform();
const UserVoucherRefundPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const fetchedUserInfo = location?.state?.userInfo ?? {};
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState(fetchedUserInfo);
  const [isRefunding, setIsRefunding] = useState(false);
  const browserLanguage = useLanguageChange();
  const scrollContainerRef = useRef(null);
  const scrollAmount = 20;
  const handleScroll = useCallback(event => {
    event.preventDefault();
    const delta = event.deltaY;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop +=
        delta > 0 ? scrollAmount : -scrollAmount;
    }
  }, []);
  const [isClickedForRefunding, setClickedForRefunding] = useState(false);
  const [isClickedForFoldingMenu, setClickedForFoldingMenu] = useState(false);
  const [isClickedForVoucherMenu, setClickedForVoucherMenu] = useState(1);
  const [bucketForRefund, setBucketForRefund] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    10: [],
  });
  const [refinedBucketForRefund, setRefinedBucketForRefund] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    10: [],
  });
  const [totalPriceOfRefund, setTotalPriceOfRefund] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    10: 0,
  });
  const [finalTotalPriceOfRefund, setFinalTotalPriceOfRefund] = useState(0);
  useEffect(() => {
    const calculatedFinalTotalPriceOfRefund =
      Object.values(totalPriceOfRefund)
        ?.flat()
        .reduce((acc, cur) => acc + cur, 0) || 0;
    setFinalTotalPriceOfRefund(calculatedFinalTotalPriceOfRefund);
  }, [totalPriceOfRefund]);
  const [totalPriceOfRefundForUSD, setTotalPriceOfRefundForUSD] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    10: 0,
  });
  const [finalTotalPriceOfRefundForUSD, setFinalTotalPriceOfRefundForUSD] =
    useState(0);
  useEffect(() => {
    const calculatedFinalTotalPriceOfRefundForUSD =
      Object.values(totalPriceOfRefundForUSD)
        ?.flat()
        .reduce((acc, cur) => acc + cur, 0) || 0;
    setFinalTotalPriceOfRefundForUSD(calculatedFinalTotalPriceOfRefundForUSD);
  }, [totalPriceOfRefundForUSD]);
  if (hasAccessToken() === false && isNative === false) return null;
  useEffect(() => {
    const reconstructedbucketForRefund = {};
    for (const key in bucketForRefund) {
      let newArray = [];
      bucketForRefund[key].forEach(array => {
        let foundArray = newArray.find(
          preArray => preArray[4] === array[4] && preArray[5] === array[5]
        );
        if (foundArray) {
          foundArray[0] += 1;
        } else {
          newArray.push([...array]);
        }
      });
      reconstructedbucketForRefund[key] = newArray;
    }
    setRefinedBucketForRefund(reconstructedbucketForRefund);
  }, [bucketForRefund]);
  const submitRefundInfo = useCallback(async () => {
    if (isClickedForRefunding === true) return;
    setClickedForRefunding(true);
    try {
      const { response, cleanup } = await chargeApi.postPartialCancelForToss({
        ...refinedBucketForRefund,
      });
      const result = response;
      if (
        result.data.message === 'response' ||
        result.data.message === 'both'
      ) {
        setIsRefunding(true);
      }
    } catch (error) {
      console.error('submit refund info error : ', error);
    } finally {
      setClickedForRefunding(false);
    }
  }, [
    isClickedForRefunding,
    browserLanguage,
    finalTotalPriceOfRefund,
    finalTotalPriceOfRefundForUSD,
    refinedBucketForRefund,
  ]);
  const userInfoForRefund = useSelector(
    state => state.userInfoStore.userInfoForRefund
  );
  useEffect(() => {
    let cleanupForGetSub;
    const fetchUserInfo = async () => {
      const { response, cleanup } = await userApi.getForSub();
      cleanupForGetSub = cleanup;
      const fetchedUserInfo = response;
      setUserInfo({ ...fetchedUserInfo });
      dispatch(setUserInfoForRefundAction({ ...fetchedUserInfo }));
    };
    if (Object.keys(userInfoForRefund).length === 0 && isRefunding === false) {
      fetchUserInfo();
      setIsRefunding(false);
    }
    if (Object.keys(userInfoForRefund).length !== 0 && isRefunding === true) {
      fetchUserInfo();
      setIsRefunding(false);
      if (typeof window !== 'undefined') window.location.reload();
    } else {
      setUserInfo({ ...userInfoForRefund });
    }
    return () => {
      if (cleanupForGetSub) cleanupForGetSub();
    };
  }, [isRefunding]);
  return (
    <div
      className={`${styles['container']}`}
      ref={scrollContainerRef}
      onWheel={handleScroll}
    >
      <div
        className={`${
          isClickedForFoldingMenu === false
            ? styles['container-box1']
            : styles['container-box1-folded']
        }`}
      >
        <RefundNotificationForm
          isClickedForFoldingMenu={isClickedForFoldingMenu}
          setClickedForFoldingMenu={setClickedForFoldingMenu}
        />
      </div>
      <div
        className={`${
          isClickedForFoldingMenu === false
            ? styles['container-box1']
            : styles['container-box1-folded']
        }`}
      >
        <RefundVoucherMenuForm
          isClickedForFoldingMenu={isClickedForFoldingMenu}
          isClickedForVoucherMenu={isClickedForVoucherMenu}
          setClickedForVoucherMenu={setClickedForVoucherMenu}
        />
      </div>
      <div
        className={`${
          isClickedForFoldingMenu === false
            ? styles['container-box1']
            : styles['container-box1-folded']
        }`}
      >
        <div className={styles['menu-folding-button-box']}>
          {isClickedForFoldingMenu === false ? (
            <button
              className={styles['menu-folding-button']}
              onClick={e => setClickedForFoldingMenu(prev => !prev)}
            >
              ▲
            </button>
          ) : (
            <button
              className={styles['menu-folding-button']}
              onClick={e => setClickedForFoldingMenu(prev => !prev)}
            >
              ▼
            </button>
          )}
        </div>
      </div>
      <div className={styles['container-box2']}>
        <UserVoucherRefundForm
          userInfo={userInfo}
          isClickedForVoucherMenu={isClickedForVoucherMenu}
          setTotalPriceOfRefund={setTotalPriceOfRefund}
          setTotalPriceOfRefundForUSD={setTotalPriceOfRefundForUSD}
          bucketForRefund={bucketForRefund}
          setBucketForRefund={setBucketForRefund}
        />
      </div>
      {browserLanguage === 'ja' ? (
        <div className={styles['total-price-info-container-japanese']}>
          <div>{t(`refund.caution`)}</div>
          <div>
            <div>{t(`refund.total-price`)}</div>
            <div>{' : '}</div>
            <div>
              {finalTotalPriceOfRefundForUSD}
              {t(`refund.money`)}
            </div>
          </div>
          <div className={styles['btn-box']}>
            <Button
              onClick={() => {
                navigate('/mypage');
              }}
            >
              {t(`button.mypage`)}
            </Button>
            <Button
              onClick={() => {
                submitRefundInfo();
              }}
            >
              {isClickedForRefunding
                ? t(`button.refunding`)
                : t(`button.apply`)}
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles['total-price-info-container']}>
          <div>{t(`refund.caution`)}</div>
          <div>
            <div>{t(`refund.total-price`)}</div>
            <div>{' : '}</div>
            <div>
              {browserLanguage === 'ko'
                ? finalTotalPriceOfRefund
                : finalTotalPriceOfRefundForUSD}
              {t(`refund.money`)}
            </div>
          </div>
          <div className={styles['btn-box']}>
            <Button
              onClick={() => {
                navigate('/mypage');
              }}
            >
              {t(`button.mypage`)}
            </Button>
            <Button
              onClick={() => {
                submitRefundInfo();
              }}
            >
              {isClickedForRefunding
                ? t(`button.refunding`)
                : t(`button.apply`)}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserVoucherRefundPage;
