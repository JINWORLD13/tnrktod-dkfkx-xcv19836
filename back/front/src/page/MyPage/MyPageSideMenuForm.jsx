import React, { useState, useEffect } from 'react';
import styles from './_MyPageSideMenuForm.module.scss';
import fontStyles from '../../styles/scss/_Font.module.scss';
import { hasAccessToken } from '../../utils/tokenCookie.jsx';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  MORE_BUSINESS_INFO_PATH,
  MYPAGE_CHART_PATH,
  MORE_TERMS_OF_SERVICE_PATH,
  MYPAGE_TOTALCHART_PATH,
  MYPAGE_USERINFO_PATH,
  MYPAGE_USERINFO_WITHDRAW_PATH,
  MYPAGE_READINGINFO_PATH,
} from '../../config/Route/UrlPaths.jsx';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
const MyPageSideMenuForm = ({ setPathName, setAnswerModalOpen, ...props }) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return (
    <div className={styles['menu']}>
      <div>
        <h2
          className={`${
            browserLanguage === 'ja'
              ? fontStyles['japanese-font-title']
              : fontStyles['korean-font-title']
          }`}
        >
          {t(`page_title.mypage`)}
        </h2>
      </div>
      <li>
        <ul
          onClick={() => {
            setPathName(MYPAGE_USERINFO_PATH);
            setAnswerModalOpen(false);
          }}
        >
          <Link
            to={`${MYPAGE_USERINFO_PATH}`}
            className={`${styles['link-style']} ${
              browserLanguage === 'ja'
              ? fontStyles['japanese-font-content']
              : fontStyles['korean-font-content']
            }`}
          >
            <div>{t(`mypage.user`)}</div>
          </Link>
        </ul>
        <ul
          onClick={() => {
            setPathName(MYPAGE_READINGINFO_PATH);
            setAnswerModalOpen(false);
          }}
        >
          <Link
            to={`${MYPAGE_READINGINFO_PATH}`}
            className={`${styles['link-style']} ${
              browserLanguage === 'ja'
              ? fontStyles['japanese-font-content']
              : fontStyles['korean-font-content']
            }`}
          >
            <div>{t(`mypage.tarot-history-info`)}</div>
          </Link>
        </ul>
        <ul
          onClick={() => {
            setPathName(`${MYPAGE_CHART_PATH}/${MYPAGE_TOTALCHART_PATH}`);
            setAnswerModalOpen(false);
          }}
        >
          <Link
            to={`${MYPAGE_CHART_PATH}/${MYPAGE_TOTALCHART_PATH}`}
            className={`${styles['link-style']} ${
              browserLanguage === 'ja'
              ? fontStyles['japanese-font-content']
              : fontStyles['korean-font-content']
            }`}
          >
            <div>{t(`mypage.statistics`)}</div>
          </Link>
        </ul>
        <ul
          onClick={() => {
            setPathName(`${MYPAGE_USERINFO_WITHDRAW_PATH}`);
            setAnswerModalOpen(false);
          }}
        >
          <Link
            to={`${MYPAGE_USERINFO_WITHDRAW_PATH}`}
            className={`${styles['link-style']} ${
              browserLanguage === 'ja'
              ? fontStyles['japanese-font-content']
              : fontStyles['korean-font-content']
            }`}
          >
            <div>{t(`mypage.user-info-withdraw`)}</div>
          </Link>
        </ul>
        {}
      </li>
    </div>
  );
};
export default MyPageSideMenuForm;
