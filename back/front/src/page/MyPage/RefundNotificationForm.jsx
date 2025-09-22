import React, { useState, useEffect } from 'react';
import styles from '../../styles/scss/_RefundNotificationForm.module.scss';
import { hasAccessToken } from '../../utils/tokenCookie.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
const RefundNotificationForm = ({
  isClickedForFoldingMenu,
  setClickedForFoldingMenu,
  ...props
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return (
    <>
      {isClickedForFoldingMenu === false ? (
        <div className={styles['menu']}>
          <div>
            <h2
              className={`${
                browserLanguage === 'ja'
                  ? styles['japanese-potta-font']
                  : styles['korean-dongle-font']
              }`}
            >
              {t(`page_title.refund`)}
            </h2>
          </div>
          <li>
            <ul>
              <div
                className={`${styles['link-style']} ${
                  browserLanguage === 'ja'
                    ? styles['japanese-potta-font2']
                    : styles['korean-dongle-font2']
                }`}
              >
                <p>{t(`refund.notification`)}</p>
              </div>
            </ul>
          </li>
        </div>
      ) : (
        <div className={styles['menu-folded']}></div>
      )}
    </>
  );
};
export default RefundNotificationForm;
