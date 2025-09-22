import React, { useState, useEffect, memo } from 'react';
import styles from '../../styles/scss/_UserVoucherRefundForm.module.scss';
import { hasAccessToken } from '../../utils/tokenCookie.jsx';
import { Link, useNavigate } from 'react-router-dom';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { UserVoucherRefund } from './UserVoucherRefund.jsx';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
const UserVoucherRefundForm = memo(
  ({
    userInfo,
    isClickedForVoucherMenu,
    setTotalPriceOfRefund,
    setTotalPriceOfRefundForUSD,
    bucketForRefund,
    setBucketForRefund,
    ...props
  }) => {
    const navigate = useNavigate();
    const browserLanguage = useLanguageChange();
    useEffect(() => {
      const handleOrientationChange = () => {
        if (
          typeof window !== 'undefined' &&
          window.screen.width < window.screen.height
        ) {
          window.scrollTo(0, 0);
        }
      };
      if (typeof window !== 'undefined')
        window.addEventListener('orientationchange', handleOrientationChange);
      return () => {
        if (typeof window !== 'undefined')
          window.removeEventListener(
            'orientationchange',
            handleOrientationChange
          );
      };
    }, []);
    let refundableVouchersObj = {
      1: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],
      2: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],
      3: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],
      4: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],
      10: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],
    };
    if (
      userInfo?.vouchersInDetail !== undefined &&
      userInfo?.vouchersInDetail !== null &&
      Object.values(userInfo?.vouchersInDetail).flat(1).length >= 1
    ) {
      refundableVouchersObj = userInfo?.vouchersInDetail ?? {
        1: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],
        2: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],
        3: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],
        4: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],
        10: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],
      };
    } else {
      refundableVouchersObj = {
        1: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],
        2: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],
        3: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],
        4: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],
        10: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],
      };
    }
    if (refundableVouchersObj[isClickedForVoucherMenu] === undefined)
      refundableVouchersObj[isClickedForVoucherMenu] = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
    const [totalCountForRefund, setTotalCountForRefund] = useState({
      1: [0],
      2: [0],
      3: [0],
      4: [0],
      10: [0],
    });
    const [totalPriceForRefundAsObj, setTotalPriceForRefundAsObj] = useState({
      1: [0],
      2: [0],
      3: [0],
      4: [0],
      10: [0],
    });
    let maxLength = Object.values(refundableVouchersObj).reduce((max, arr) => {
      return arr.length > max ? arr.length : max;
    }, 0);
    let length;
    let currency;
    if (browserLanguage === 'ko') {
      length =
        refundableVouchersObj[isClickedForVoucherMenu]?.filter(
          elem => elem[7] === 'KRW' || elem[7] === 0
        ).length ?? 0;
      currency = 'KRW';
    }
    if (browserLanguage === 'ja') {
      length =
        refundableVouchersObj[isClickedForVoucherMenu]?.filter(
          elem => elem[7] === 'USD' || elem[7] === 0
        ).length ?? 0;
      currency = 'USD';
    }
    if (browserLanguage === 'en') {
      length =
        refundableVouchersObj[isClickedForVoucherMenu]?.filter(
          elem => elem[7] === 'USD' || elem[7] === 0
        ).length ?? 0;
      currency = 'USD';
    }
    console.log('length', length);
    console.log('refundableVouchersObj', refundableVouchersObj);
    console.log('maxLength', maxLength);
    for (let i = 0; i < maxLength - length; i++) {
      refundableVouchersObj[isClickedForVoucherMenu] = [
        ...refundableVouchersObj[isClickedForVoucherMenu],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
    }
    useEffect(() => {
      setTotalPriceOfRefund(prev => {
        return {
          ...prev,
          [isClickedForVoucherMenu]: totalPriceForRefundAsObj[
            isClickedForVoucherMenu
          ].reduce((acc, curr) => acc + curr, 0),
        };
      });
    }, [isClickedForVoucherMenu, totalPriceForRefundAsObj]);
    const [totalCountForRefundForUSD, setTotalCountForRefundForUSD] = useState({
      1: [0],
      2: [0],
      3: [0],
      4: [0],
      10: [0],
    });
    const [totalPriceForRefundAsObjForUSD, setTotalPriceForRefundAsObjForUSD] =
      useState({
        1: [0],
        2: [0],
        3: [0],
        4: [0],
        10: [0],
      });
    useEffect(() => {
      setTotalPriceOfRefundForUSD(prev => {
        return {
          ...prev,
          [isClickedForVoucherMenu]: totalPriceForRefundAsObjForUSD[
            isClickedForVoucherMenu
          ].reduce((acc, curr) => acc + curr, 0),
        };
      });
    }, [isClickedForVoucherMenu, totalPriceForRefundAsObjForUSD]);
    if (hasAccessToken() === false && isNative === false) return;
    return (
      <div
        className={`${
          browserLanguage === 'ja'
            ? styles['user-info-container-japanese']
            : styles['user-info-container']
        }`}
      >
        <div
          className={`${
            browserLanguage === 'ja'
              ? styles['user-info1-japanese']
              : styles['user-info1']
          }`}
        >
          {refundableVouchersObj[isClickedForVoucherMenu]
            ?.filter(elem => elem[7] === currency || elem[7] === 0)
            ?.map((refundableVoucher, i) => {
              return (
                <div
                  key={i} 
                  className={`${
                    browserLanguage === 'ja'
                      ? styles['user-info1-box2-japanese']
                      : styles['user-info1-box2']
                  } ${refundableVoucher[0] === 0 && styles['invisible']}`}
                >
                  <UserVoucherRefund
                    userInfo={userInfo}
                    refundableVoucher={refundableVoucher}
                    isClickedForVoucherMenu={isClickedForVoucherMenu}
                    totalPriceForRefundAsObj={totalPriceForRefundAsObj}
                    setTotalPriceForRefundAsObj={setTotalPriceForRefundAsObj}
                    totalCountForRefund={totalCountForRefund}
                    setTotalCountForRefund={setTotalCountForRefund}
                    totalPriceForRefundAsObjForUSD={
                      totalPriceForRefundAsObjForUSD
                    }
                    setTotalPriceForRefundAsObjForUSD={
                      setTotalPriceForRefundAsObjForUSD
                    }
                    totalCountForRefundForUSD={totalCountForRefundForUSD}
                    setTotalCountForRefundForUSD={setTotalCountForRefundForUSD}
                    i={i}
                    bucketForRefund={bucketForRefund}
                    setBucketForRefund={setBucketForRefund}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
);
export default UserVoucherRefundForm;
