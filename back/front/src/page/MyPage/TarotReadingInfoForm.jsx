import React, { memo } from 'react';
import styles from '../../styles/scss/_TarotReadingInfo.module.scss';
import { hasAccessToken } from '../../utils/tokenCookie.jsx';
import { useNavigate } from 'react-router-dom';
import QuestionInfo from './QuestionInfo.jsx';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { Capacitor } from '@capacitor/core';
import { useTranslation } from 'react-i18next';
const isNative = Capacitor.isNativePlatform();
const TarotReadingInfoForm = memo(
  ({
    tarotHistory,
    updateTarotHistory,
    setAnswerModalOpen,
    updateAnswerForm,
    updateTarotAlertModalOpen,
    updateTarotAndIndexInfo,
    isClickedForInvisible,
  }) => {
    const { t } = useTranslation();
    const browserLanguage = useLanguageChange();
    const isJapanese = browserLanguage === 'ja';
    if (!hasAccessToken() && !isNative) return null;
    return (
      <div
        className={
          isJapanese
            ? styles['user-info-container-japanese']
            : styles['user-info-container']
        }
      >
        <div
          className={
            isJapanese ? styles['user-info2-japanese'] : styles['user-info2']
          }
        >
          <div
            className={
              isJapanese
                ? styles['user-info2-box1-japanese']
                : styles['user-info2-box1']
            }
          >
            <h2
              className={`${
                browserLanguage === 'ja' ? styles['h2-japanese'] : styles['h2']
              } ${
                browserLanguage === 'ja'
                  ? styles['japanese-potta-font']
                  : styles['korean-dongle-font']
              }`}
            >
              {t(`mypage.tarot-history`)}
            </h2>
            <QuestionInfo
              tarotHistory={tarotHistory}
              updateTarotHistory={updateTarotHistory}
              setAnswerModalOpen={setAnswerModalOpen}
              updateAnswerForm={updateAnswerForm}
              updateTarotAlertModalOpen={updateTarotAlertModalOpen}
              updateTarotAndIndexInfo={updateTarotAndIndexInfo}
              isClickedForInvisible={isClickedForInvisible}
            />
          </div>
        </div>
      </div>
    );
  }
);
export default TarotReadingInfoForm;
