import { useTranslation } from 'react-i18next';
import styles from '../../styles/scss/_UserInfo.module.scss';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import React, { useEffect, useState } from 'react';
import { RankBadge } from '../../components/RankBadge/RankBadge.jsx';
export const UserInfo = ({
  userInfo,
  updateUserAlertModalOpen,
  updateChargeModalOpen,
  ...props
}) => {
  const { t } = useTranslation();
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
      setUserInfo2({ ...userInfo });
    }
  }, [userInfo, browserLanguage]);
  return (
    <>
      {}
      <h2
        className={`${
          browserLanguage === 'ja' ? styles['h2-japanese'] : styles['h2']
        } ${
          browserLanguage === 'ja'
            ? styles['japanese-potta-font']
            : styles['korean-dongle-font']
        }`}
      >
        {t(`mypage.user-info`)}
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
          <span>{t(`mypage.user-name`)}</span>
          <span>{t(`mypage.user-account`)}</span>
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
            {': '}
            {'\n'}
            {userInfo2?.displayName}
          </div>
          <div>
            {': '}
            {'\n'}
            {userInfo2?.email?.split('@')[0]}
          </div>
        </div>
      </div>
      {}
    </>
  );
};
