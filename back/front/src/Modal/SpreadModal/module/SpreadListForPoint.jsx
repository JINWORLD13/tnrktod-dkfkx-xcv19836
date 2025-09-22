import React, { useEffect, useState, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { useTranslation } from 'react-i18next';
import { spreadArrForPoint } from '../../../data/spreadList/spreadArr';
import { userApi } from '../../../api/userApi';
import { hasAccessTokenForPreference } from '../../../utils/tokenPreference';
import { hasAccessToken } from '../../../utils/tokenCookie';
const isNative = Capacitor.isNativePlatform();
export const SpreadListForPoint = ({
  styles,
  stateGroup,
  setStateGroup,
  userCacheForRedux,
  toggleTarotModal,
  whichTarot,
  ...props
}) => {
  const { t } = useTranslation();
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
    ...rest
  } = setStateGroup;
  const [remainingPointsOfUser, setRemainingPointsOfUser] = useState(0);
  const spreadListForPoint = spreadArrForPoint();
  useEffect(() => {
    const fetchedRemainingPointsOfUser = async () => {
      const user = await userApi.get();
      const points = user.response.points ?? 0;
      setRemainingPointsOfUser(points);
    };
    fetchedRemainingPointsOfUser();
  }, [remainingPointsOfUser]);
  return (
    <div name={'list'} className={styles.list}>
      {spreadListForPoint.map((elem, i) => {
        return (
          <div
            name={'list_element'}
            className={styles['list-element']}
            keys={i}
            onClick={async e => {
              if (
                whichTarot === 1 ||
                whichTarot === 2 ||
                whichTarot === 3 ||
                whichTarot === 4
              ) {
                if (hasAccessToken() === false && isNative === false) {
                  updateBlinkModalForLoginOpen(true);
                  return;
                }
                const checkTokenInApp = await hasAccessTokenForPreference();
                if (isNative === true && checkTokenInApp === false) {
                  updateBlinkModalForLoginOpen(true);
                  return;
                }
                if (
                  spreadListForPoint[i]?.listPointPriceForNormal >
                    remainingPointsOfUser &&
                  whichTarot === 2
                ) {
                  updateChargeModalOpen(true);
                  return;
                }
                if (
                  spreadListForPoint[i]?.listPointPriceForDeep >
                    remainingPointsOfUser &&
                  whichTarot === 3
                ) {
                  updateChargeModalOpen(true);
                  return;
                }
                if (
                  spreadListForPoint[i]?.listPointPriceForSerious >
                    remainingPointsOfUser &&
                  whichTarot === 4
                ) {
                  updateChargeModalOpen(true);
                  return;
                }
                if (
                  isNative === true &&
                  whichTarot === 2 &&
                  isVoucherModeOn === false &&
                  isAdsWatched === true &&
                  whichAds !== elem?.admobAds
                )
                  return;
                if (whichTarot === 2) {
                  updateTarotSpreadPricePoint(
                    spreadListForPoint[i]?.listPointPriceForNormal
                  );
                }
                if (whichTarot === 3) {
                  updateTarotSpreadPricePoint(
                    spreadListForPoint[i]?.listPointPriceForDeep
                  );
                }
                if (whichTarot === 4) {
                  updateTarotSpreadPricePoint(
                    spreadListForPoint[i]?.listPointPriceForSerious
                  );
                }
                e.preventDefault();
                toggleTarotModal(
                  true,
                  spreadListForPoint[i]?.spreadListNumber,
                  spreadListForPoint[i]?.title,
                  spreadListForPoint[i]?.count
                );
                return;
              }
              e.preventDefault();
              toggleTarotModal(
                true,
                spreadListForPoint[i]?.spreadListNumber,
                spreadListForPoint[i]?.title,
                spreadListForPoint[i]?.count
              );
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
                {spreadListForPoint[i]?.img}
              </div>
              <div
                name={'spread_description_box'}
                className={styles['spread-description-box']}
              >
                <div name={'spread_title'} className={styles['spread-title']}>
                  <p>{spreadListForPoint[i]?.title}</p>
                </div>
                <div
                  name={'spread_description'}
                  className={styles['spread-description']}
                >
                  <p>{spreadListForPoint[i]?.description}</p>
                </div>
                {whichTarot === 1 ? (
                  <div name={'spread_price'} className={styles['spread-price']}>
                    <p>{'  '}</p>
                  </div>
                ) : null}
                {whichTarot === 2 ? (
                  <div name={'spread_price'} className={styles['spread-price']}>
                    <div>
                      <p>
                        &#9734;
                        {spreadListForPoint[i]?.salePercentageForNormal +
                          '% Off'}
                        &#9734;
                      </p>
                    </div>
                    <div>
                      <p>
                        {spreadListForPoint[i]?.listPointPriceForNormal +
                          ' P' +
                          ' / '}
                      </p>
                      <p>
                        {spreadListForPoint[i]?.originalPointPriceForNormal}
                      </p>
                      <p>{' P'}</p>
                    </div>
                  </div>
                ) : null}
                {whichTarot === 3 ? (
                  <div name={'spread_price'} className={styles['spread-price']}>
                    <div>
                      <p>
                        &#9734;
                        {spreadListForPoint[i]?.salePercentageForDeep + '% Off'}
                        &#9734;
                      </p>
                    </div>
                    <div>
                      <p>
                        {spreadListForPoint[i]?.listPointPriceForDeep +
                          ' P' +
                          ' / '}
                      </p>
                      <p>{spreadListForPoint[i]?.originalPointPriceForDeep}</p>
                      <p>{' P'}</p>
                    </div>
                  </div>
                ) : null}
                {whichTarot === 4 ? (
                  <div name={'spread_price'} className={styles['spread-price']}>
                    <div>
                      <p>
                        &#9734;
                        {spreadListForPoint[i]?.salePercentageForSerious +
                          '% Off'}
                        &#9734;
                      </p>
                    </div>
                    <div>
                      <p>
                        {spreadListForPoint[i]?.listPointPriceForSerious +
                          ' P' +
                          ' / '}
                      </p>
                      <p>
                        {spreadListForPoint[i]?.originalPointPriceForSerious}
                      </p>
                      <p>{' P'}</p>
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
