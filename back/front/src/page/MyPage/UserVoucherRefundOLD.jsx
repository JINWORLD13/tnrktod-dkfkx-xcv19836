import { useTranslation } from 'react-i18next';
import styles from '../../styles/scss/_UserVoucherRefund.module.scss';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import Button from '../../UI/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
export const UserVoucherRefund = ({
  userInfo,
  refundableVoucher,
  isClickedForVoucherMenu,
  totalPriceForRefundAsObj,
  setTotalPriceForRefundAsObj,
  totalCountForRefund,
  setTotalCountForRefund,
  totalPriceForRefundAsObjForUSD,
  setTotalPriceForRefundAsObjForUSD,
  totalCountForRefundForUSD,
  setTotalCountForRefundForUSD,
  bucketForRefund,
  setBucketForRefund,
  i,
  ...props
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const browserLanguage = useLanguageChange();
  const [isLandscape, setIsLandscape] = useState(() => {
    if (typeof window !== 'undefined')
      window.screen.width > window.screen.height;
  });
  const [eachTotalPriceOfRequestToRefund, setEachTotalPriceOfRequestToRefund] =
    useState(0);
  const [countOfRequestToRefund, setCountOfRequestToRefund] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    13: 0,
  });
  useEffect(() => {
    setTotalCountForRefund(prev => {
      if (refundableVoucher[7] !== 'KRW') return { ...prev };
      let newState = { ...prev };
      if (newState[isClickedForVoucherMenu].length - 1 < i) {
        newState[isClickedForVoucherMenu].push(0);
      }
      let value = newState[isClickedForVoucherMenu][i];
      value = countOfRequestToRefund[isClickedForVoucherMenu];
      newState[isClickedForVoucherMenu][i] = value;
      return {
        ...prev,
        [isClickedForVoucherMenu]: newState[isClickedForVoucherMenu],
      };
    });
    setTotalCountForRefundForUSD(prev => {
      if (refundableVoucher[7] !== 'USD') return { ...prev };
      let newState = { ...prev };
      if (newState[isClickedForVoucherMenu].length - 1 < i) {
        newState[isClickedForVoucherMenu].push(0);
      }
      let value = newState[isClickedForVoucherMenu][i];
      value = countOfRequestToRefund[isClickedForVoucherMenu];
      newState[isClickedForVoucherMenu][i] = value;
      return {
        ...prev,
        [isClickedForVoucherMenu]: newState[isClickedForVoucherMenu],
      };
    });
  }, [countOfRequestToRefund]);
  useEffect(() => {
    setTotalPriceForRefundAsObj(prev => {
      if (refundableVoucher[7] !== 'KRW') return { ...prev };
      let newState = { ...prev };
      if (newState[isClickedForVoucherMenu].length - 1 < i) {
        newState[isClickedForVoucherMenu].push(0);
      }
      let value = newState[isClickedForVoucherMenu][i];
      value =
        countOfRequestToRefund[isClickedForVoucherMenu] * refundableVoucher[1];
      newState[isClickedForVoucherMenu][i] = value;
      return {
        ...prev,
        [isClickedForVoucherMenu]: newState[isClickedForVoucherMenu],
      };
    });
    setTotalPriceForRefundAsObjForUSD(prev => {
      if (refundableVoucher[7] !== 'USD') return { ...prev };
      let newState = { ...prev };
      if (newState[isClickedForVoucherMenu].length - 1 < i) {
        newState[isClickedForVoucherMenu].push(0);
      }
      let value = newState[isClickedForVoucherMenu][i];
      value =
        countOfRequestToRefund[isClickedForVoucherMenu] * refundableVoucher[1];
      newState[isClickedForVoucherMenu][i] = value;
      return {
        ...prev,
        [isClickedForVoucherMenu]: newState[isClickedForVoucherMenu],
      };
    });
  }, [
    eachTotalPriceOfRequestToRefund,
    countOfRequestToRefund[isClickedForVoucherMenu],
  ]);
  useEffect(() => {
    const handleOrientationChange = () => {
      if (typeof window !== 'undefined')
        setIsLandscape(window.screen.width > window.screen.height);
    };
    if (typeof window !== 'undefined')
      window.addEventListener('resize', handleOrientationChange);
    return () => {
      if (typeof window !== 'undefined')
        window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);
  const dateOfPurchase = new Date(refundableVoucher[5]);
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeZoneName: 'short',
  };
  let formattedDateOfPurchase;
  if (browserLanguage === 'en') {
    formattedDateOfPurchase = new Intl.DateTimeFormat('en-US', options).format(
      dateOfPurchase
    );
  } else if (browserLanguage === 'ko') {
    formattedDateOfPurchase = new Intl.DateTimeFormat('ko-KR', options).format(
      dateOfPurchase
    );
  } else if (browserLanguage === 'ja') {
    formattedDateOfPurchase = new Intl.DateTimeFormat('ja-JP', options).format(
      dateOfPurchase
    );
  }
  const date = new Date(refundableVoucher[5]);
  let yearOfRefund;
  let monthOfRefund;
  let dayOfRefund;
  let hoursOfRefund = date.getHours();
  let minutesOfRefund = date.getMinutes();
  let secondsOfRefund = date.getSeconds();
  if (
    refundableVoucher[9] === '계좌이체' ||
    refundableVoucher[9] === 'card' 
  ) {
    yearOfRefund = date.getFullYear();
    monthOfRefund = date.getMonth() + 3;
    dayOfRefund = date.getDate();
  }
  if (refundableVoucher[9] === '휴대폰') {
    yearOfRefund = date.getFullYear();
    monthOfRefund = date.getMonth();
    dayOfRefund = 0;
  }
  if (
    refundableVoucher[9] !== '휴대폰' &&
    refundableVoucher[9] !== '계좌이체' &&
    refundableVoucher[9] !== 'card'
  ) {
    yearOfRefund = date.getFullYear() + 1;
    monthOfRefund = date.getMonth();
    dayOfRefund = date.getDate();
  }
  const newDateOfRefund = new Date(
    yearOfRefund,
    monthOfRefund,
    dayOfRefund,
    hoursOfRefund,
    minutesOfRefund,
    secondsOfRefund
  );
  let formattedDateOfRefund;
  if (browserLanguage === 'en') {
    formattedDateOfRefund = new Intl.DateTimeFormat('en-US', options).format(
      newDateOfRefund
    );
  } else if (browserLanguage === 'ko') {
    formattedDateOfRefund = new Intl.DateTimeFormat('ko-KR', options).format(
      newDateOfRefund
    );
  } else if (browserLanguage === 'ja') {
    formattedDateOfRefund = new Intl.DateTimeFormat('ja-JP', options).format(
      newDateOfRefund
    );
  }
  const handleIncrement = useCallback(
    e => {
      e.stopPropagation();
      e.preventDefault();
      setCountOfRequestToRefund(prev => {
        if (prev[isClickedForVoucherMenu] >= refundableVoucher[0])
          return {
            ...prev,
            [isClickedForVoucherMenu]: refundableVoucher[0],
          };
        return {
          ...prev,
          [isClickedForVoucherMenu]: prev[isClickedForVoucherMenu] + 1,
        };
      });
      setEachTotalPriceOfRequestToRefund(prev => {
        if (prev >= refundableVoucher[0] * refundableVoucher[1])
          return refundableVoucher[0] * refundableVoucher[1];
        return prev + 1 * refundableVoucher[1];
      });
      setBucketForRefund(prev => {
        if (
          countOfRequestToRefund[isClickedForVoucherMenu] ===
          refundableVoucher[0]
        )
          return { ...prev };
        return {
          ...prev,
          [isClickedForVoucherMenu]: [
            ...prev[isClickedForVoucherMenu],
            [
              1,
              refundableVoucher[1],
              refundableVoucher[2],
              refundableVoucher[3],
              refundableVoucher[4],
              refundableVoucher[5],
              refundableVoucher[6],
              refundableVoucher[7],
              refundableVoucher[8],
              refundableVoucher[9],
            ],
          ],
        };
      });
    },
    [isClickedForVoucherMenu, refundableVoucher, countOfRequestToRefund]
  );
  const handleDecrement = useCallback(
    e => {
      e.stopPropagation();
      e.preventDefault();
      setCountOfRequestToRefund(prev => {
        if (prev[isClickedForVoucherMenu] <= 0)
          return { ...prev, [isClickedForVoucherMenu]: 0 };
        return {
          ...prev,
          [isClickedForVoucherMenu]: prev[isClickedForVoucherMenu] - 1,
        };
      });
      setEachTotalPriceOfRequestToRefund(prev => {
        if (prev <= 0) return 0;
        return prev - 1 * refundableVoucher[1];
      });
      setBucketForRefund(prev => {
        return {
          ...prev,
          [isClickedForVoucherMenu]: prev[isClickedForVoucherMenu]?.filter(
            (item, index) =>
              !(
                item[1] === refundableVoucher[1] &&
                item[2] === refundableVoucher[2] &&
                item[3] === refundableVoucher[3] &&
                item[4] === refundableVoucher[4] &&
                item[5] === refundableVoucher[5] &&
                item[6] === refundableVoucher[6] &&
                item[7] === refundableVoucher[7] &&
                item[8] === refundableVoucher[8] &&
                item[9] === refundableVoucher[9]
              ) ||
              index !==
                prev[isClickedForVoucherMenu].findIndex(
                  subItem =>
                    subItem[1] === refundableVoucher[1] &&
                    subItem[2] === refundableVoucher[2] &&
                    subItem[3] === refundableVoucher[3] &&
                    subItem[4] === refundableVoucher[4] &&
                    subItem[5] === refundableVoucher[5] &&
                    subItem[6] === refundableVoucher[6] &&
                    subItem[7] === refundableVoucher[7] &&
                    subItem[8] === refundableVoucher[8] &&
                    subItem[9] === refundableVoucher[9]
                )
          ),
        };
      });
    },
    [isClickedForVoucherMenu, refundableVoucher]
  );
  return (
    <>
      {browserLanguage !== 'ja' && (
        <>
          <h2
            className={`${styles['h2']} ${
              browserLanguage === 'ja'
                ? styles['japanese-potta-font2']
                : styles['korean-dongle-font2']
            }`}
          >
            {t(`refund.user-voucher-info`)}
          </h2>
          <div className={styles['user-info1-body']}>
            {}
            {}
            <div className={styles['user-info1-body-core']}>
              <div className={styles['user-info1-body-left']}>
                <p>{t(`refund.order-id`)}</p>
                <p>{t(`refund.voucher-name`)}</p>
                <p>{t(`refund.amount`)}</p>
                <p>{t(`refund.each-list-price`)}</p>
                {}
                <p>{t(`refund.purchase-date`)}</p>
                <p>{t(`refund.due-date`)}</p>
              </div>
              <div className={styles['user-info1-body-right']}>
                <p>: {refundableVoucher[4]}</p>
                <p>
                  :{' '}
                  {browserLanguage === 'en' && isClickedForVoucherMenu == 1
                    ? { isClickedForVoucherMenu } + '-Card Voucher'
                    : `${isClickedForVoucherMenu}${t(`refund.unit`)}`}
                </p>
                <p>
                  : {refundableVoucher[0] ?? 0}
                  {t(`unit.ea`)}
                </p>
                <p>
                  : {refundableVoucher[1]}
                  {t(`refund.money`)}
                </p>
                {}
                <p>: {formattedDateOfPurchase}</p>
                <p>: {formattedDateOfRefund}</p>
              </div>
            </div>
            <div className={styles['user-info1-bottom']}>
              <div className={styles['input-container']}>
                <div>
                  <label>{t(`refund.quantity`)} : </label>
                </div>
                <div>
                  <div>
                    <>
                      {refundableVoucher[7] === 'KRW' && (
                        <>
                          {totalCountForRefund[isClickedForVoucherMenu][i] ?? 0}
                        </>
                      )}
                    </>
                    <>
                      {refundableVoucher[7] === 'USD' && (
                        <>
                          {totalCountForRefundForUSD[isClickedForVoucherMenu][
                            i
                          ] ?? 0}
                        </>
                      )}
                    </>
                  </div>
                </div>
              </div>
              <Button
                onClick={e => {
                  handleIncrement(e);
                }}
              >
                +
              </Button>
              <Button
                onClick={e => {
                  handleDecrement(e);
                }}
              >
                -
              </Button>
              <Button
                onClick={e => {
                  setCountOfRequestToRefund(prev => {
                    setEachTotalPriceOfRequestToRefund(
                      refundableVoucher[0] * refundableVoucher[1]
                    );
                    return {
                      ...prev,
                      [isClickedForVoucherMenu]: refundableVoucher[0],
                    };
                  });
                  setBucketForRefund(prev => {
                    const currentCount =
                      countOfRequestToRefund[isClickedForVoucherMenu] || 0;
                    const remainingCount = refundableVoucher[0] - currentCount;
                    if (remainingCount <= 0) return prev;
                    let newArray = [];
                    for (let i = 0; i < remainingCount; i++) {
                      newArray.push([
                        1,
                        refundableVoucher[1],
                        refundableVoucher[2],
                        refundableVoucher[3],
                        refundableVoucher[4],
                        refundableVoucher[5],
                        refundableVoucher[6],
                        refundableVoucher[7],
                        refundableVoucher[8],
                        refundableVoucher[9],
                      ]);
                    }
                    return {
                      ...prev,
                      [isClickedForVoucherMenu]: [
                        ...(prev[isClickedForVoucherMenu] || []),
                        ...newArray,
                      ],
                    };
                  });
                }}
              >
                {t(`refund.total`)}
              </Button>
            </div>
          </div>
        </>
      )}
      {browserLanguage === 'ja' && (
        <>
          <h2
            className={`${styles['h2-japanese']} ${
              browserLanguage === 'ja'
                ? styles['japanese-potta-font2']
                : styles['korean-dongle-font2']
            }`}
          >
            {t(`refund.user-voucher-info`)}
          </h2>
          <div className={styles['user-info1-body-japanese']}>
            {}
            {}
            <div className={styles['user-info1-body-core-japanese']}>
              <div className={styles['user-info1-body-left-japanese']}>
                <p>{t(`refund.order-id`)}</p>
                <p>{t(`refund.voucher-name`)}</p>
                <p>{t(`refund.amount`)}</p>
                <p>{t(`refund.each-list-price`)}</p>
                {}
                <p>{t(`refund.purchase-date`)}</p>
                <p>{t(`refund.due-date`)}</p>
              </div>
              <div className={styles['user-info1-body-right-japanese']}>
                <p>: {refundableVoucher[4]}</p>
                <p>
                  :{' '}
                  {browserLanguage === 'en' && isClickedForVoucherMenu == 1
                    ? { isClickedForVoucherMenu } + '-Card Voucher'
                    : `${isClickedForVoucherMenu}${t(`refund.unit`)}`}
                </p>
                <p>
                  : {refundableVoucher[0] ?? 0}
                  {t(`unit.ea`)}
                </p>
                <p>
                  : {refundableVoucher[1]}
                  {t(`refund.money`)}
                </p>
                {}
                <p>: {formattedDateOfPurchase}</p>
                <p>: {formattedDateOfRefund}</p>
              </div>
            </div>
            <div className={styles['user-info1-bottom-japanese']}>
              <div className={styles['input-container-japanese']}>
                <div>
                  <label>{t(`refund.quantity`)} : </label>
                </div>
                <div>
                  <div>
                    <>
                      {refundableVoucher[7] === 'KRW' && (
                        <>
                          {totalCountForRefund[isClickedForVoucherMenu][i] ?? 0}
                        </>
                      )}
                    </>
                    <>
                      {refundableVoucher[7] === 'USD' && (
                        <>
                          {totalCountForRefundForUSD[isClickedForVoucherMenu][
                            i
                          ] ?? 0}
                        </>
                      )}
                    </>
                  </div>
                </div>
              </div>
              <Button
                onClick={e => {
                  handleIncrement(e);
                }}
              >
                +
              </Button>
              <Button
                onClick={e => {
                  handleDecrement(e);
                }}
              >
                -
              </Button>
              <Button
                onClick={e => {
                  setCountOfRequestToRefund(prev => {
                    setEachTotalPriceOfRequestToRefund(
                      refundableVoucher[0] * refundableVoucher[1]
                    );
                    return {
                      ...prev,
                      [isClickedForVoucherMenu]: refundableVoucher[0],
                    };
                  });
                  setBucketForRefund(prev => {
                    const currentCount =
                      countOfRequestToRefund[isClickedForVoucherMenu] || 0;
                    const remainingCount = refundableVoucher[0] - currentCount;
                    if (remainingCount <= 0) return prev;
                    let newArray = [];
                    for (let i = 0; i < remainingCount; i++) {
                      newArray.push([
                        1,
                        refundableVoucher[1],
                        refundableVoucher[2],
                        refundableVoucher[3],
                        refundableVoucher[4],
                        refundableVoucher[5],
                        refundableVoucher[6],
                        refundableVoucher[7],
                        refundableVoucher[8],
                        refundableVoucher[9],
                      ]);
                    }
                    return {
                      ...prev,
                      [isClickedForVoucherMenu]: [
                        ...(prev[isClickedForVoucherMenu] || []),
                        ...newArray,
                      ],
                    };
                  });
                }}
              >
                {t(`refund.total`)}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
