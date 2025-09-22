import { useTranslation } from 'react-i18next';
import styles from '../../styles/scss/_UserWithdrawalInfo.module.scss';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import Button from '../../UI/Button.jsx';
import { useEffect, useState } from 'react';
export const UserWithdrawalInfo = ({
  userInfo,
  updateUserAlertModalOpen,
  updateChargeModalOpen,
  ...props
}) => {
  const { t } = useTranslation();
  const [isLandscape, setIsLandscape] = useState(() => {
    if (typeof window !== 'undefined')
      window.screen.width > window.screen.height;
  });
  useEffect(() => {
    const handleOrientationChange = () => {
      if (typeof window !== 'undefined')
        setIsLandscape(() => {
          if (typeof window !== 'undefined')
            window.screen.width > window.screen.height;
        });
    };
    if (typeof window !== 'undefined')
      window.addEventListener('resize', handleOrientationChange);
    return () => {
      if (typeof window !== 'undefined')
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
      setUserInfo2({ ...userInfo });
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
        {t(`mypage.user-info-withdraw`)}
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
        {}
        {isLandscape && (
          <>
            <Button
              onClick={() => {
                openAlertModal();
              }}
            >
              {t(`button.withdraw`)}
            </Button>
          </>
        )}
        {!isLandscape && (
          <>
            <Button
              onClick={() => {
                openAlertModal();
              }}
            >
              {t(`button.withdraw`)}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
