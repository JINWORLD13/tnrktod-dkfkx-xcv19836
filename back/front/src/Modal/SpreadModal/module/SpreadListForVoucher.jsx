import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Capacitor } from '@capacitor/core';
import { useTranslation } from 'react-i18next';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange';
import { hasAccessTokenForPreference } from '../../../utils/tokenPreference';
import { hasAccessToken } from '../../../utils/tokenCookie';
import { spreadArr } from '../../../data/spreadList/spreadArr';
import { IS_PRODUCTION_MODE } from '../../../function/IS_PRODUCTION_MODE';
import { isNormalAccount } from '../../../function/isNormalAccount';
const isNative = Capacitor.isNativePlatform();
export const SpreadListForVoucher = ({
  styles,
  toggleTarotModal,
  stateGroup,
  setStateGroup,
  userCacheForRedux,
  admobReward,
  ...props
}) => {
  const { t } = useTranslation();
  const spreadList = spreadArr();
  const {
    answerForm,
    cardForm,
    questionForm,
    modalForm,
    whichTarot,
    cssInvisible,
    country,
    isVoucherModeOn,
    isAdsWatched,
    whichAds,
    isChargeModalOpen,
    showInAppPurchase,
    whichSpread,
    isSpeedTarotNotificationOn,
    ...rest1
  } = stateGroup;
  const {
    updateAnswerForm,
    updateBlinkModalForLoginOpen,
    updateChargeModalOpen,
    updateTarotSpreadPricePoint,
    updateTarotSpreadVoucherPrice,
    setVoucherMode,
    setWhichAds,
    setShowInAppPurchase,
    setWhichSpread,
    setAdWatchedOnlyForBlinkModal,
    setSpeedTarotNotificationOn,
    setRequiredVoucherInfo,
    setAdsWatched,
    ...rest2
  } = setStateGroup;
  const userInfoInRedux = useSelector(state => state.userInfoStore.userInfo);
  const [remainingVouchersOfUser, setRemainingVouchersOfUser] = useState({
    'one-card': 0,
    'two-cards': 0,
    'three-cards': 0,
    'four-cards': 0,
    'five-cards': 0,
    'six-cards': 0,
    'seven-cards': 0,
    'eight-cards': 0,
    'nine-cards': 0,
    'ten-cards': 0,
    'eleven-cards': 0,
    'thirteen-cards': 0,
  });
  useEffect(() => {
    const fetchedRemainingVouchersOfUser = async () => {
      const vouchers = userInfoInRedux?.vouchers ?? {
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
      };
      setRemainingVouchersOfUser(prev => {
        let originalVouchers;
        let vouchersInDetail;
        if (
          userCacheForRedux !== null &&
          userCacheForRedux !== undefined &&
          JSON.stringify(vouchers) ===
            JSON.stringify({
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
            })
        ) {
          originalVouchers = { ...userCacheForRedux?.vouchers };
          vouchersInDetail = userCacheForRedux?.vouchersInDetail;
        } else if (
          JSON.stringify(userInfoInRedux) != '{}' &&
          JSON.stringify(vouchers) ===
            JSON.stringify({
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
            })
        ) {
          originalVouchers = { ...userInfoInRedux?.vouchers };
          vouchersInDetail = userInfoInRedux?.vouchersInDetail;
        } else if (
          userCacheForRedux.size !== 0 &&
          JSON.stringify(vouchers) ===
            JSON.stringify({
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
            })
        ) {
          originalVouchers = { ...userCacheForRedux?.vouchers };
          vouchersInDetail = userCacheForRedux?.vouchersInDetail;
        } else {
          originalVouchers = { ...vouchers };
          vouchersInDetail =
            userInfoInRedux?.vouchersInDetail ||
            userCacheForRedux?.vouchersInDetail;
        }
        if (vouchersInDetail) {
          const now = new Date();
          Object.entries(vouchersInDetail).forEach(([type, arr]) => {
            if (arr && Array.isArray(arr)) {
              const expiredCount = arr?.filter(voucher => {
                const expire = voucher[10]; 
                if (
                  expire &&
                  expire !== 'NA' &&
                  expire !== 'N.A' &&
                  expire.toString().trim() !== ''
                ) {
                  const expireDate = new Date(expire);
                  return !isNaN(expireDate.getTime()) && expireDate < now; 
                }
                return false; 
              }).length;
              const typeNum = parseInt(type);
              if (originalVouchers[typeNum] !== undefined) {
                originalVouchers[typeNum] = Math.max(
                  0,
                  originalVouchers[typeNum] - expiredCount
                );
              }
            }
          });
        }
        return {
          'one-card': originalVouchers[1] || 0,
          'two-cards': originalVouchers[2] || 0,
          'three-cards': originalVouchers[3] || 0,
          'four-cards': originalVouchers[4] || 0,
          'five-cards': originalVouchers[5] || 0,
          'six-cards': originalVouchers[6] || 0,
          'seven-cards': originalVouchers[7] || 0,
          'eight-cards': originalVouchers[8] || 0,
          'nine-cards': originalVouchers[9] || 0,
          'ten-cards': originalVouchers[10] || 0,
          'eleven-cards': originalVouchers[11] || 0,
          'thirteen-cards': originalVouchers[13] || 0,
        };
      });
    };
    fetchedRemainingVouchersOfUser();
  }, [
    modalForm?.spread,
    modalForm?.tarot,
    answerForm?.isAnswered,
    answerForm?.isWaiting,
  ]); 
  const remainingVouchers = {
    2: {
      'one-card': remainingVouchersOfUser['one-card'],
      'two-cards': remainingVouchersOfUser['two-cards'],
      'three-cards': remainingVouchersOfUser['three-cards'],
      'four-cards': remainingVouchersOfUser['four-cards'],
      'five-cards': remainingVouchersOfUser['five-cards'],
      'six-cards': remainingVouchersOfUser['six-cards'],
      'seven-cards': remainingVouchersOfUser['seven-cards'],
      'eight-cards': remainingVouchersOfUser['eight-cards'],
      'nine-cards': remainingVouchersOfUser['nine-cards'],
      'ten-cards': remainingVouchersOfUser['ten-cards'],
      'eleven-cards': remainingVouchersOfUser['eleven-cards'],
      'thirteen-cards': remainingVouchersOfUser['thirteen-cards'],
    },
    3: {
      'one-card': remainingVouchersOfUser['one-card'],
      'two-cards': remainingVouchersOfUser['two-cards'],
      'three-cards': remainingVouchersOfUser['three-cards'],
      'four-cards': remainingVouchersOfUser['four-cards'],
      'five-cards': remainingVouchersOfUser['five-cards'],
      'six-cards': remainingVouchersOfUser['six-cards'],
      'seven-cards': remainingVouchersOfUser['seven-cards'],
      'eight-cards': remainingVouchersOfUser['eight-cards'],
      'nine-cards': remainingVouchersOfUser['nine-cards'],
      'ten-cards': remainingVouchersOfUser['ten-cards'],
      'eleven-cards': remainingVouchersOfUser['eleven-cards'],
      'thirteen-cards': remainingVouchersOfUser['thirteen-cards'],
    },
    4: {
      'one-card': remainingVouchersOfUser['one-card'],
      'two-cards': remainingVouchersOfUser['two-cards'],
      'three-cards': remainingVouchersOfUser['three-cards'],
      'four-cards': remainingVouchersOfUser['four-cards'],
      'five-cards': remainingVouchersOfUser['five-cards'],
      'six-cards': remainingVouchersOfUser['six-cards'],
      'seven-cards': remainingVouchersOfUser['seven-cards'],
      'eight-cards': remainingVouchersOfUser['eight-cards'],
      'nine-cards': remainingVouchersOfUser['nine-cards'],
      'ten-cards': remainingVouchersOfUser['ten-cards'],
      'eleven-cards': remainingVouchersOfUser['eleven-cards'],
      'thirteen-cards': remainingVouchersOfUser['thirteen-cards'],
    },
  };
  const checkRemainingVouchers = (
    whichTarot,
    spreadList,
    i,
    remainingVouchers
  ) => {
    if (whichTarot === 1) return true;
    const whichTarotToPrice = {
      2: 'voucherToPayForNormal',
      3: 'voucherToPayForDeep',
      4: 'voucherToPayForSerious',
    };
    const countToRemainingVouchers = {
      1: 'one-card',
      2: 'two-cards',
      3: 'three-cards',
      4: 'four-cards',
      5: 'five-cards',
      6: 'six-cards',
      7: 'seven-cards',
      8: 'eight-cards',
      9: 'nine-cards',
      10: 'ten-cards',
      11: 'eleven-cards',
      13: 'thirteen-cards',
    };
    const count = spreadList[i]?.count;
    const price = spreadList[i][whichTarotToPrice[whichTarot]][1];
    const remaining =
      remainingVouchers[whichTarot][countToRemainingVouchers[count]] || 0;
    if (price <= remaining) {
      return true;
    }
    setRequiredVoucherInfo(prev => {
      return {
        name: spreadList[i][whichTarotToPrice[whichTarot]][0],
        requiredAmount: price,
        remainingAmount: remaining,
      };
    });
    return false;
  };
  const handleTarotClick = useCallback(
    async (e, i) => {
      try {
        if (!hasAccessToken() && !isNative) {
          updateBlinkModalForLoginOpen(true);
          return;
        }
        const checkTokenInApp = await hasAccessTokenForPreference();
        if (isNative && !checkTokenInApp) {
          updateBlinkModalForLoginOpen(true);
          return;
        }
        const hasEnoughVoucher = checkRemainingVouchers(
          whichTarot,
          spreadList,
          i,
          remainingVouchers
        );
        if (!hasEnoughVoucher) {
          if (whichTarot === 2 && !isVoucherModeOn) {
            setWhichAds(spreadList[i]?.admobAds);
            setAdWatchedOnlyForBlinkModal(true); 
          } else {
            setWhichAds(0);
            isNative ? setShowInAppPurchase(true) : updateChargeModalOpen(true);
            return;
          }
        }
        const voucherPrices = {
          2: spreadList[i]?.voucherToPayForNormal,
          3: spreadList[i]?.voucherToPayForDeep,
          4: spreadList[i]?.voucherToPayForSerious,
        };
        if (whichTarot === 2 && !isVoucherModeOn) {
          setWhichAds(spreadList[i]?.admobAds);
          setAdWatchedOnlyForBlinkModal(true); 
        } else if ([2, 3, 4].includes(whichTarot)) {
          setWhichAds(0);
          updateTarotSpreadVoucherPrice(voucherPrices[whichTarot]);
        }
        setAdsWatched(false);
        updateAnswerForm(prev => {
          return {
            ...prev,
            isSubmitted: false,
            isWaiting: false,
            isAnswered: false,
          };
        });
        toggleTarotModal(
          true,
          spreadList[i]?.spreadListNumber,
          spreadList[i]?.title,
          spreadList[i]?.count
        );
        if (whichTarot !== 1) {
          setWhichSpread(true);
        }
      } catch (error) {
        console.error('Error in handleTarotClick:', error);
      }
    },
    [
      hasAccessToken,
      hasAccessTokenForPreference,
      isNative,
      isVoucherModeOn,
      isAdsWatched,
      whichTarot,
      spreadList,
      remainingVouchers,
      isChargeModalOpen,
      showInAppPurchase,
      updateBlinkModalForLoginOpen,
      updateTarotSpreadVoucherPrice,
      toggleTarotModal,
      setWhichAds,
      checkRemainingVouchers,
    ]
  );
  const browserLanguage = useLanguageChange();
  return (
    <div name={'list'} className={styles.list}>
      {spreadList.map((elem, i) => {
        if (elem.spreadListNumber === 201 && whichTarot === 1) return;
        if (elem.spreadListNumber === 301 && whichTarot === 1) return;
        if (elem.spreadListNumber === 302 && whichTarot === 1) return;
        if (elem.spreadListNumber === 303 && whichTarot === 1) return;
        if (elem.spreadListNumber === 304 && whichTarot === 1) return;
        if (elem.spreadListNumber === 601 && whichTarot === 1) return;
        if (elem.spreadListNumber === 602 && whichTarot === 1) return;
        return (
          <div
            key={i}
            name={'list_element'}
            className={styles['list-element']}
            onClick={async e => {
              e.preventDefault();
              if ([1, 2, 3, 4].includes(whichTarot)) {
                await handleTarotClick(e, i);
              } else {
                toggleTarotModal(
                  true,
                  spreadList[i]?.spreadListNumber,
                  spreadList[i]?.title,
                  spreadList[i]?.count
                );
              }
              if (whichTarot === 1) {
                setWhichSpread(true); 
                setSpeedTarotNotificationOn(true);
              }
            }}
          >
            <div
              name={'spread_box'}
              className={`${
                whichTarot === 2 || whichTarot === 3 || whichTarot === 4
                  ? styles['spread-box-purchase']
                  : styles['spread-box']
              }`}
            >
              <div name={'spread_image'} className={styles['spread-image']}>
                {}
                {spreadList[i]?.img}
              </div>
              <div
                name={'spread_description_box'}
                className={styles['spread-description-box']}
              >
                <div name={'spread_title'} className={styles['spread-title']}>
                  {whichTarot === 1 ? (
                    <p
                      className={`${
                        browserLanguage === 'ja'
                          ? styles['title-japanese']
                          : styles['title']
                      }`}
                    >
                      {spreadList[i]?.titleSpeedMode}
                    </p>
                  ) : (
                    <p
                      className={`${
                        browserLanguage === 'ja'
                          ? styles['title-japanese']
                          : styles['title']
                      }`}
                    >
                      {spreadList[i]?.title}
                    </p>
                  )}
                </div>
                <div
                  name={'spread_description'}
                  className={styles['spread-description']}
                >
                  {whichTarot === 1 ? (
                    <p
                      className={`${
                        browserLanguage === 'ja'
                          ? styles['description-japanese']
                          : styles['description']
                      }`}
                    >
                      {spreadList[i]?.descriptionSpeedMode}
                    </p>
                  ) : (
                    <p
                      className={`${
                        browserLanguage === 'ja'
                          ? styles['description-japanese']
                          : styles['description']
                      }`}
                    >
                      {spreadList[i]?.description}
                    </p>
                  )}
                </div>
                {whichTarot === 1 ? (
                  <div name={'spread_price'} className={styles['spread-price']}>
                    <p>{'  '}</p>
                  </div>
                ) : null}
                {whichTarot === 2 ? (
                  <div name={'spread_price'} className={styles['spread-price']}>
                    <div>
                      {isVoucherModeOn === true ? (
                        <p>{spreadList[i]?.voucherForNormal}</p>
                      ) : (
                        <p>{'  '}</p>
                      )}
                      {}
                    </div>
                  </div>
                ) : null}
                {whichTarot === 3 ? (
                  <div name={'spread_price'} className={styles['spread-price']}>
                    <div>
                      <p>{spreadList[i]?.voucherForDeep}</p>
                    </div>
                  </div>
                ) : null}
                {whichTarot === 4 ? (
                  <div name={'spread_price'} className={styles['spread-price']}>
                    <div>
                      <p>{spreadList[i]?.voucherForSerious}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
