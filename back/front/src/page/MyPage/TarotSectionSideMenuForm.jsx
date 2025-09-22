import React, { useState, useEffect } from 'react';
import styles from '../../styles/scss/_TarotSectionSideMenuForm.module.scss';
import { hasAccessToken } from '../../utils/tokenCookie.jsx';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  MORE_BUSINESS_INFO_PATH,
  MORE_TERMS_OF_SERVICE_PATH,
  ETC_PATH,
  TAROT_EXPLANATION_PATH,
  TAROT_LEARNING_PATH,
} from '../../config/Route/UrlPaths.jsx';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
const TarotSectionSideMenuForm = ({ setPathName, ...props }) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return (
    <div className={styles['menu']}>
      <div>
        <h2
          className={`${
            browserLanguage === 'ja'
              ? styles['japanese-potta-font']
              : styles['korean-dongle-font']
          }`}
        >
          {t(`header.more`)}
        </h2>
      </div>
      <li>
        <ul
          onClick={() => {
            setPathName(`${TAROT_EXPLANATION_PATH}`);
          }}
        >
          <Link
            to={`${TAROT_EXPLANATION_PATH}`}
            className={`${styles['link-style']} ${
              browserLanguage === 'ja'
                ? styles['japanese-potta-font2']
                : styles['korean-dongle-font2']
            }`}
          >
            <div>{t(`mypage.tarot-explanation`)}</div>
          </Link>
        </ul>
        <ul
          onClick={() => {
            setPathName(`${TAROT_LEARNING_PATH}`);
          }}
        >
          <Link
            to={`${TAROT_LEARNING_PATH}`}
            className={`${styles['link-style']} ${
              browserLanguage === 'ja'
                ? styles['japanese-potta-font2']
                : styles['korean-dongle-font2']
            }`}
          >
            <div>{t(`mypage.tarot-learning`)}</div>
          </Link>
        </ul>
        <ul
          onClick={() => {
            setPathName(`${MORE_TERMS_OF_SERVICE_PATH}`);
          }}
        >
          <Link
            to={`${MORE_TERMS_OF_SERVICE_PATH}`}
            className={`${styles['link-style']} ${
              browserLanguage === 'ja'
                ? styles['japanese-potta-font2']
                : styles['korean-dongle-font2']
            }`}
          >
            <div>{t(`mypage.terms-of-service`)}</div>
          </Link>
        </ul>
        <ul
          onClick={() => {
            setPathName(`${MORE_BUSINESS_INFO_PATH}`);
          }}
        >
          <Link
            to={`${MORE_BUSINESS_INFO_PATH}`}
            className={`${styles['link-style']} ${
              browserLanguage === 'ja'
                ? styles['japanese-potta-font2']
                : styles['korean-dongle-font2']
            }`}
          >
            <div>{t(`mypage.business-info`)}</div>
          </Link>
        </ul>
      </li>
    </div>
  );
};
export default TarotSectionSideMenuForm;
