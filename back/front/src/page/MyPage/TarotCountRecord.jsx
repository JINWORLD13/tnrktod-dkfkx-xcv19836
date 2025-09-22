import { useTranslation } from 'react-i18next';
import {
  isWithinThisDay,
  isWithinThisMonth,
  isWithinThisWeek,
} from '../../function/isTimeAgo.js';
import styles from '../../styles/scss/_TarotCountRecord.module.scss';
import i18n from '../../locales/i18n.js';
import { useEffect } from 'react';
export const TarotCountRecord = ({ tarotHistory, ...props }) => {
  const { t } = useTranslation();
  const browserLanguage = i18n.language;
  return (
    <>
      <div
        className={`${
          browserLanguage === 'ja'
            ? styles['user-info2-body-japanese']
            : styles['user-info2-body']
        }`}
      >
        <div
          className={`${
            browserLanguage === 'ja'
              ? styles['user-info2-body-left-japanese']
              : styles['user-info2-body-left']
          }`}
        >
          <span>{t(`mypage.tarot-history-today`)}</span>
          <span>{t(`mypage.tarot-history-this-week`)}</span>
          <span>{t(`mypage.tarot-history-this-month`)}</span>
          <span>{t(`mypage.tarot-history-total`)}</span>
        </div>
        <div
          className={`${
            browserLanguage === 'ja'
              ? styles['user-info2-body-right-japanese']
              : styles['user-info2-body-right']
          }`}
        >
          <div>
            {': '}
            {tarotHistory.map((tarot, i) => {
                if (isWithinThisDay(tarot)) {
                  return tarot;
                }
              })
              .reduce((acc, current) => {
                if (current !== undefined && current !== null) {
                  return acc + 1;
                }
                return acc;
              }, 0)}
            {t(`mypage.times`)}
          </div>
          <div>
            {': '}
            {tarotHistory.map((tarot, i) => {
                if (isWithinThisWeek(tarot)) {
                  return tarot;
                }
              })
              .reduce((acc, current) => {
                if (current !== undefined && current !== null) {
                  return acc + 1;
                }
                return acc;
              }, 0)}
            {t(`mypage.times`)}
          </div>
          <div>
            {': '}
            {tarotHistory.map((tarot, i) => {
                if (isWithinThisMonth(tarot)) {
                  return tarot;
                }
              })
              .reduce((acc, current) => {
                if (current !== undefined && current !== null) {
                  return acc + 1;
                }
                return acc;
              }, 0)}
            {t(`mypage.times`)}
          </div>
          <div>
            {': '}
            {tarotHistory?.length}
            {t(`mypage.times`)}
          </div>
        </div>
      </div>
    </>
  );
};
