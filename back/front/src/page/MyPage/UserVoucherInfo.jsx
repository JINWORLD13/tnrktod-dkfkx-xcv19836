import { useTranslation } from 'react-i18next';
import styles from '../../styles/scss/_UserVoucherInfo.module.scss';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import Button from '../../UI/Button.jsx';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
export const UserVoucherInfo = ({
  userInfo,
  updateUserAlertModalOpen,
  updateChargeModalOpen,
  showInAppPurchase,
  setShowInAppPurchase,
  resultOfHasUserEmail,
  ...props
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLandscape, setIsLandscape] = useState(
    window.screen.width > window.screen.height
  );
  useEffect(() => {
    const handleOrientationChange = () => {
      setIsLandscape(window.screen.width > window.screen.height);
    };
    window.addEventListener('resize', handleOrientationChange);
    return () => {
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);
  const openAlertModal = () => {
    updateUserAlertModalOpen(true);
  };
  const openChargeModal = () => {
    updateChargeModalOpen(true);
  };
  const browserLanguage = useLanguageChange();
  const [userInfo2, setUserInfo2] = useState({
    vouchers: {
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
    },
  });
  useEffect(() => {
  if (userInfo?.displayName !== undefined && userInfo2.displayName !== null) {
    const processExpiredVouchers = (userInfo) => {
      const currentDate = new Date();
      const updatedUserInfo = { ...userInfo };
      const updatedVoucherInDetail = { ...userInfo.vouchersInDetail };
      const updatedVouchers = { ...userInfo.vouchers };
      Object.keys(updatedVoucherInDetail).forEach(voucherType => {
        const voucherTypeNum = parseInt(voucherType);
        const vouchersArr = updatedVoucherInDetail[voucherType] || [];
        let expiredCount = 0;
        const validVouchers = vouchersArr?.filter(voucher => {
          try {
            const expireDate = voucher[10];
            if (expireDate && 
                expireDate !== null && 
                expireDate !== undefined && 
                expireDate !== "NA" && 
                expireDate.toString().trim() !== "") {
              const expireDateObj = new Date(expireDate);
              if (!isNaN(expireDateObj.getTime())) {
                if (expireDateObj < currentDate) {
                  console.log(`Expired voucher found: ${expireDate} < ${currentDate.toISOString()}`);
                  expiredCount++;
                  return false; 
                }
              }
            }
            return true; 
          } catch (error) {
            console.error('Error processing voucher expiration:', error);
            return true; 
          }
        });
        if (expiredCount > 0) {
          console.log(`Found ${expiredCount} expired vouchers in type ${voucherType}`);
          updatedVoucherInDetail[voucherType] = validVouchers;
          updatedVouchers[voucherTypeNum] = Math.max(0, 
            (updatedVouchers[voucherTypeNum] || 0) - expiredCount
          );
        }
      });
      const hasExpiredVouchers = Object.keys(updatedVoucherInDetail).some(type => 
        (updatedVoucherInDetail[type]?.length || 0) !== (userInfo.vouchersInDetail?.[type]?.length || 0)
      );
      if (hasExpiredVouchers) {
        console.log('Expired vouchers processed, updating user info');
        return {
          ...updatedUserInfo,
          vouchersInDetail: updatedVoucherInDetail,
          vouchers: updatedVouchers
        };
      }
      return userInfo;
    };
    const processedUserInfo = processExpiredVouchers(userInfo);
    setUserInfo2({ ...processedUserInfo });
  }
}, [userInfo, browserLanguage]);
  return (
    <>
      <h2
        className={`${
          browserLanguage === 'ja' ? styles['h2-japanese'] : styles['h2']
        } ${
          browserLanguage === 'ja'
            ? styles['japanese-potta-font']
            : styles['korean-dongle-font']
        }`}
      >
        {t(`mypage.user-voucher-info`)}
      </h2>
      <div
        className={`${
          browserLanguage === 'ja'
            ? styles['user-info1-body-japanese']
            : styles['user-info1-body']
        } ${
          browserLanguage === 'ja'
            ? styles['japanese-potta-font2']
            : styles['korean-dongle-font2']
        }`}
      >
        <div>
          <div className={styles['flex-grow2']}></div>
          <div
            className={`${
              browserLanguage === 'ja'
                ? styles['user-info1-body-left-japanese']
                : styles['user-info1-body-left']
            } ${
              browserLanguage === 'ja'
                ? styles['japanese-potta-font2']
                : styles['korean-dongle-font2']
            }`}
          >
            <span>{t(`mypage.voucher-1`)}</span>
            <span>{t(`mypage.voucher-2`)}</span>
            <span>{t(`mypage.voucher-3`)}</span>
            <span>{t(`mypage.voucher-4`)}</span>
            <span>{t(`mypage.voucher-5`)}</span>
            <span>{t(`mypage.voucher-6`)}</span>
          </div>
          <div
            className={`${
              browserLanguage === 'ja'
                ? styles['user-info1-body-right-japanese']
                : styles['user-info1-body-right']
            } ${
              browserLanguage === 'ja'
                ? styles['japanese-potta-font2']
                : styles['korean-dongle-font2']
            }`}
          >
            <div>
              {browserLanguage === 'ja' ? (
                <div
                  className={`${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {': '}
                  {'\n'}
                  <span
                    className={`${styles['one-card']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    I x{' '}
                  </span>
                  <span
                    className={`${styles['one-card-japanese']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    {userInfo2?.vouchers['1'] ?? 0}
                    {t(`unit.ea`)}
                  </span>{' '}
                </div>
              ) : (
                <div
                  className={`${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {': '}
                  {'\n'}
                  <span
                    className={`${styles['one-card']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    I x{' '}
                  </span>
                  <span
                    className={`${styles['one-card-japanese']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    {userInfo2?.vouchers['1'] ?? 0}
                    {t(`unit.ea`)}
                  </span>{' '}
                </div>
              )}
              {browserLanguage === 'ja' ? (
                <div
                  className={`${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {': '}
                  {'\n'}
                  <span
                    className={`${styles['two-cards']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    II x{' '}
                  </span>
                  <span
                    className={`${styles['two-cards-japanese']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    {userInfo2?.vouchers['2'] ?? 0}
                    {t(`unit.ea`)}
                  </span>{' '}
                </div>
              ) : (
                <div
                  className={`${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {': '}
                  {'\n'}
                  <span
                    className={`${styles['two-cards']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    II x{' '}
                  </span>
                  <span
                    className={`${styles['two-cards-japanese']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    {userInfo2?.vouchers['2'] ?? 0}
                    {t(`unit.ea`)}
                  </span>{' '}
                </div>
              )}
              {browserLanguage === 'ja' ? (
                <div
                  className={`${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {': '}
                  {'\n'}
                  <span
                    className={`${styles['three-cards']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    III x{' '}
                  </span>
                  <span
                    className={`${styles['three-cards']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    {userInfo2?.vouchers['3'] ?? 0}
                    {t(`unit.ea`)}
                  </span>{' '}
                </div>
              ) : (
                <div
                  className={`${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {': '}
                  {'\n'}
                  <span
                    className={`${styles['three-cards']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    III x{' '}
                  </span>
                  <span
                    className={`${styles['three-cards']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    {userInfo2?.vouchers['3'] ?? 0}
                    {t(`unit.ea`)}
                  </span>{' '}
                </div>
              )}
              {browserLanguage === 'ja' ? (
                <div
                  className={`${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {': '}
                  {'\n'}
                  <span
                    className={`${styles['four-cards']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    IV x{' '}
                  </span>
                  <span
                    className={`${styles['four-cards']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    {userInfo2?.vouchers['4'] ?? 0}
                    {t(`unit.ea`)}
                  </span>{' '}
                </div>
              ) : (
                <div
                  className={`${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {': '}
                  {'\n'}
                  <span
                    className={`${styles['four-cards']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    IV x{' '}
                  </span>
                  <span
                    className={`${styles['four-cards']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    {userInfo2?.vouchers['4'] ?? 0}
                    {t(`unit.ea`)}
                  </span>{' '}
                </div>
              )}
              {browserLanguage === 'ja' ? (
                <div
                  className={`${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {': '}
                  {'\n'}
                  <span
                    className={`${styles['five-cards']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    V x{' '}
                  </span>
                  <span
                    className={`${styles['five-cards']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    {userInfo2?.vouchers['5'] ?? 0}
                    {t(`unit.ea`)}
                  </span>{' '}
                </div>
              ) : (
                <div
                  className={`${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {': '}
                  {'\n'}
                  <span
                    className={`${styles['five-cards']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    V x{' '}
                  </span>
                  <span
                    className={`${styles['five-cards']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    {userInfo2?.vouchers['5'] ?? 0}
                    {t(`unit.ea`)}
                  </span>{' '}
                </div>
              )}
              {browserLanguage === 'ja' ? (
                <div
                  className={`${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {': '}
                  {'\n'}
                  <span
                    className={`${styles['six-cards']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    VI x{' '}
                  </span>
                  <span
                    className={`${styles['six-cards']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    {userInfo2?.vouchers['6'] ?? 0}
                    {t(`unit.ea`)}
                  </span>{' '}
                </div>
              ) : (
                <div
                  className={`${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {': '}
                  {'\n'}
                  <span
                    className={`${styles['six-cards']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    VI x{' '}
                  </span>
                  <span
                    className={`${styles['six-cards']} ${
                      browserLanguage === 'ja'
                        ? styles['japanese-potta-font2']
                        : styles['korean-dongle-font2']
                    }`}
                  >
                    {userInfo2?.vouchers['6'] ?? 0}
                    {t(`unit.ea`)}
                  </span>{' '}
                </div>
              )}
            </div>
          </div>
          <div className={styles['flex-grow2']}></div>
          <div
            className={`${
              browserLanguage === 'ja'
                ? styles['user-info1-body-left-japanese']
                : styles['user-info1-body-left']
            } ${
              browserLanguage === 'ja'
                ? styles['japanese-potta-font2']
                : styles['korean-dongle-font2']
            }`}
          >
            <span>{t(`mypage.voucher-7`)}</span>
            <span>{t(`mypage.voucher-8`)}</span>
            <span>{t(`mypage.voucher-9`)}</span>
            <span>{t(`mypage.voucher-10`)}</span>
            <span>{t(`mypage.voucher-11`)}</span>
            <span>{t(`mypage.voucher-13`)}</span>
          </div>
          <div>
            {browserLanguage === 'ja' ? (
              <div
                className={`${
                  browserLanguage === 'ja'
                    ? styles['japanese-potta-font2']
                    : styles['korean-dongle-font2']
                }`}
              >
                {': '}
                {'\n'}
                <span
                  className={`${styles['seven-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  VII x{' '}
                </span>
                <span
                  className={`${styles['seven-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {userInfo2?.vouchers['7'] ?? 0}
                  {t(`unit.ea`)}
                </span>{' '}
              </div>
            ) : (
              <div
                className={`${
                  browserLanguage === 'ja'
                    ? styles['japanese-potta-font2']
                    : styles['korean-dongle-font2']
                }`}
              >
                {': '}
                {'\n'}
                <span
                  className={`${styles['seven-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  VII x{' '}
                </span>
                <span
                  className={`${styles['seven-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {userInfo2?.vouchers['7'] ?? 0}
                  {t(`unit.ea`)}
                </span>{' '}
              </div>
            )}
            {browserLanguage === 'ja' ? (
              <div
                className={`${
                  browserLanguage === 'ja'
                    ? styles['japanese-potta-font2']
                    : styles['korean-dongle-font2']
                }`}
              >
                {': '}
                {'\n'}
                <span
                  className={`${styles['eight-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  VIII x{' '}
                </span>
                <span
                  className={`${styles['eight-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {userInfo2?.vouchers['8'] ?? 0}
                  {t(`unit.ea`)}
                </span>{' '}
              </div>
            ) : (
              <div
                className={`${
                  browserLanguage === 'ja'
                    ? styles['japanese-potta-font2']
                    : styles['korean-dongle-font2']
                }`}
              >
                {': '}
                {'\n'}
                <span
                  className={`${styles['eight-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  VIII x{' '}
                </span>
                <span
                  className={`${styles['eight-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {userInfo2?.vouchers['8'] ?? 0}
                  {t(`unit.ea`)}
                </span>{' '}
              </div>
            )}
            {browserLanguage === 'ja' ? (
              <div
                className={`${
                  browserLanguage === 'ja'
                    ? styles['japanese-potta-font2']
                    : styles['korean-dongle-font2']
                }`}
              >
                {': '}
                {'\n'}
                <span
                  className={`${styles['nine-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  IX x{' '}
                </span>
                <span
                  className={`${styles['nine-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {userInfo2?.vouchers['9'] ?? 0}
                  {t(`unit.ea`)}
                </span>{' '}
              </div>
            ) : (
              <div
                className={`${
                  browserLanguage === 'ja'
                    ? styles['japanese-potta-font2']
                    : styles['korean-dongle-font2']
                }`}
              >
                {': '}
                {'\n'}
                <span
                  className={`${styles['nine-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  IX x{' '}
                </span>
                <span
                  className={`${styles['nine-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {userInfo2?.vouchers['9'] ?? 0}
                  {t(`unit.ea`)}
                </span>{' '}
              </div>
            )}
            {browserLanguage === 'ja' ? (
              <div
                className={`${
                  browserLanguage === 'ja'
                    ? styles['japanese-potta-font2']
                    : styles['korean-dongle-font2']
                }`}
              >
                {': '}
                {'\n'}
                <span
                  className={`${styles['ten-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  X x{' '}
                </span>
                <span
                  className={`${styles['ten-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {userInfo2?.vouchers['10'] ?? 0}
                  {t(`unit.ea`)}
                </span>{' '}
              </div>
            ) : (
              <div
                className={`${
                  browserLanguage === 'ja'
                    ? styles['japanese-potta-font2']
                    : styles['korean-dongle-font2']
                }`}
              >
                {': '}
                {'\n'}
                <span
                  className={`${styles['ten-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  X x{' '}
                </span>
                <span
                  className={`${styles['ten-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {userInfo2?.vouchers['10'] ?? 0}
                  {t(`unit.ea`)}
                </span>{' '}
              </div>
            )}
            {browserLanguage === 'ja' ? (
              <div
                className={`${
                  browserLanguage === 'ja'
                    ? styles['japanese-potta-font2']
                    : styles['korean-dongle-font2']
                }`}
              >
                {': '}
                {'\n'}
                <span
                  className={`${styles['eleven-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  XI x{' '}
                </span>
                <span
                  className={`${styles['eleven-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {userInfo2?.vouchers['11'] ?? 0}
                  {t(`unit.ea`)}
                </span>{' '}
              </div>
            ) : (
              <div
                className={`${
                  browserLanguage === 'ja'
                    ? styles['japanese-potta-font2']
                    : styles['korean-dongle-font2']
                }`}
              >
                {': '}
                {'\n'}
                <span
                  className={`${styles['eleven-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  XI x{' '}
                </span>
                <span
                  className={`${styles['eleven-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {userInfo2?.vouchers['11'] ?? 0}
                  {t(`unit.ea`)}
                </span>{' '}
              </div>
            )}
            {browserLanguage === 'ja' ? (
              <div
                className={`${
                  browserLanguage === 'ja'
                    ? styles['japanese-potta-font2']
                    : styles['korean-dongle-font2']
                }`}
              >
                {': '}
                {'\n'}
                <span
                  className={`${styles['thirteen-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  XIII x{' '}
                </span>
                <span
                  className={`${styles['thirteen-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {userInfo2?.vouchers['13'] ?? 0}
                  {t(`unit.ea`)}
                </span>{' '}
              </div>
            ) : (
              <div
                className={`${
                  browserLanguage === 'ja'
                    ? styles['japanese-potta-font2']
                    : styles['korean-dongle-font2']
                }`}
              >
                {': '}
                {'\n'}
                <span
                  className={`${styles['thirteen-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  XIII x{' '}
                </span>
                <span
                  className={`${styles['thirteen-cards']} ${
                    browserLanguage === 'ja'
                      ? styles['japanese-potta-font2']
                      : styles['korean-dongle-font2']
                  }`}
                >
                  {userInfo2?.vouchers['13'] ?? 0}
                  {t(`unit.ea`)}
                </span>{' '}
              </div>
            )}
          </div>
          <div className={styles['flex-grow2']}></div>
        </div>
      </div>
      <div
        className={`${
          browserLanguage === 'ja'
            ? styles['user-info1-bottom-japanese']
            : styles['user-info1-bottom']
        }`}
      >
        {}
        {isLandscape && !isNative && (
          <>
            <Button
              onClick={() => {
                openChargeModal();
              }}
            >
              {t(`button.purchase`)}
            </Button>
            <Button
              onClick={() => {
                if (!resultOfHasUserEmail) return;
                navigate(`/${browserLanguage}/refund`, {
                  state: { userInfo: userInfo },
                });
              }}
            >
              {t(`button.refund`)}
            </Button>
          </>
        )}
        {!isLandscape && !isNative && (
          <>
            <Button
              onClick={() => {
                openChargeModal();
              }}
            >
              {t(`button.purchase`)}
            </Button>
            <Button
              onClick={() => {
                if (!resultOfHasUserEmail) return;
                navigate(`/${browserLanguage}/refund`, {
                  state: { userInfo: userInfo },
                });
              }}
            >
              {t(`button.refund`)}
            </Button>
          </>
        )}
        {isLandscape && isNative && (
          <>
            {}
            <Button onClick={() => setShowInAppPurchase(true)}>
              {t(`button.purchase`)}
            </Button>
            {}
          </>
        )}
        {!isLandscape && isNative && (
          <>
            {}
            <Button onClick={() => setShowInAppPurchase(true)}>
              {t(`button.purchase`)}
            </Button>
            {}
          </>
        )}
      </div>
    </>
  );
};
