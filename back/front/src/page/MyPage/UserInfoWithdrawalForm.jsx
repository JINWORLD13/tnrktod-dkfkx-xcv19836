import React, { useState, useEffect, memo } from 'react';
import styles from '../../styles/scss/_UserInfoWithdrawalForm.module.scss';
import { hasAccessToken } from '../../utils/tokenCookie.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { UserWithdrawalInfo } from './UserWithdrawalInfo.jsx';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
const UserInfoWithdrawalForm = memo(
  ({
    userInfo,
    tarotHistory,
    setAnswerModalOpen,
    updateAnswerForm,
    updateTarotAlertModalOpen,
    updateUserAlertModalOpen,
    updateTarotAndIndexInfo,
    isClickedForInvisible,
    handleDeleteTarotHistory,
    updateChargeModalOpen,
    ...props
  }) => {
    const navigate = useNavigate();
    const browserLanguage = useLanguageChange();
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
            <UserWithdrawalInfo
              userInfo={userInfo}
              updateUserAlertModalOpen={updateUserAlertModalOpen}
              updateChargeModalOpen={updateChargeModalOpen}
            />
          </div>
        </div>
      </div>
    );
  }
);
export default UserInfoWithdrawalForm;
