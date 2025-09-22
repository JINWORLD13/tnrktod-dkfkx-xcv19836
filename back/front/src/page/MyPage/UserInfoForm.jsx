import React, { useState, useEffect, memo } from 'react';
import styles from '../../styles/scss/_UserInfoForm.module.scss';
import { hasAccessToken } from '../../utils/tokenCookie.jsx';
import { Link, useNavigate } from 'react-router-dom';
import QuestionInfo from './QuestionInfo.jsx';
import { TarotCountRecord } from './TarotCountRecord.jsx';
import { UserInfo } from './UserInfo.jsx';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { UserVoucherInfo } from './UserVoucherInfo.jsx';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
const UserInfoForm = memo(
  ({
    userInfo,
    tarotHistory,
    setAnswerModalOpen,
    updateAnswerForm,
    updateTarotAlertModalOpen,
    updateUserAlertModalOpen,
    updateTarotAndIndexInfo,
    showInAppPurchase,
    setShowInAppPurchase,
    isClickedForInvisible,
    handleDeleteTarotHistory,
    updateChargeModalOpen,
    resultOfHasUserEmail,
    ...props
  }) => {
    const navigate = useNavigate();
    const browserLanguage = useLanguageChange();
    useEffect(() => {
      const handleOrientationChange = () => {
        if (window.screen.width < window.screen.height) {
          window.scrollTo(0, 0);
        }
      };
      window.addEventListener('orientationchange', handleOrientationChange);
      return () => {
        window.removeEventListener(
          'orientationchange',
          handleOrientationChange
        );
      };
    }, []);
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
          <div
            className={`${
              browserLanguage === 'ja'
                ? styles['user-info1-box1-japanese']
                : styles['user-info1-box1']
            }`}
          >
            <UserInfo
              userInfo={userInfo}
              updateUserAlertModalOpen={updateUserAlertModalOpen}
              updateChargeModalOpen={updateChargeModalOpen}
            />
          </div>
          <div
            className={`${
              browserLanguage === 'ja'
                ? styles['user-info1-box2-japanese']
                : styles['user-info1-box2']
            }`}
          >
            <UserVoucherInfo
              userInfo={userInfo}
              updateUserAlertModalOpen={updateUserAlertModalOpen}
              updateChargeModalOpen={updateChargeModalOpen}
              showInAppPurchase={showInAppPurchase}
              setShowInAppPurchase={setShowInAppPurchase}
              resultOfHasUserEmail={resultOfHasUserEmail}
            />
          </div>
        </div>
      </div>
    );
  }
);
export default UserInfoForm;
