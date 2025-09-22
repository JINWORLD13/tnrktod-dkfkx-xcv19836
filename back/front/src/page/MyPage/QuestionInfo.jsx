import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/scss/_QuestionForm.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  isWithinThisDay,
  isWithinThisWeek,
  isWithinThisMonth,
  isWithinThisThreeMonth,
} from '../../function/isTimeAgo.js';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import Button from '../../UI/Button.jsx';
import { formattingDate } from '../../function/formattingDate.jsx';
const QuestionInfo = ({
  tarotHistory = [],
  updateTarotHistory,
  setAnswerModalOpen,
  updateAnswerForm,
  updateTarotAlertModalOpen,
  updateTarotAndIndexInfo,
  isClickedForInvisible = [],
}) => {
  const [selectedHistory, setSelectedHistory] = useState(1) ;
  const [isWideScreen, setIsWideScreen] = useState(
    window.matchMedia('(min-width: 480px)').matches
  );
  const navigate = useNavigate();
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 480px)');
    const handleWidthChange = e => setIsWideScreen(e.matches);
    mediaQuery.addEventListener('change', handleWidthChange);
    return () => mediaQuery.removeEventListener('change', handleWidthChange);
  }, []);
  const timeFilters = {
    1: isWithinThisDay,
    2: isWithinThisWeek,
    3: isWithinThisMonth,
    4: isWithinThisThreeMonth,
  };
  const renderTarotHistory = filterFn => {
    if (!tarotHistory?.length) return null;
    return tarotHistory
      ?.filter(
        tarot =>
          browserLanguage === tarot?.language && (!filterFn || filterFn(tarot))
      )
      .map((tarot, i) => {
        const formattedDate = formattingDate(
          tarot?.timeOfCounselling ?? tarot?.createdAt,
          browserLanguage
        );
        return (
          <div
            key={i}
            className={`${styles['tarot-history-item']} ${
              browserLanguage === 'ja'
                ? styles['tarot-history-item-japanese']
                : ''
            } ${isClickedForInvisible.includes(i) ? styles['invisible'] : ''}`}
            onClick={() => {
              setAnswerModalOpen(prev => !prev);
              updateAnswerForm(tarot);
            }}
          >
            <div>
              <div>
                <div>{t('mypage.question')}</div>
                <div
                  className={`${
                    tarot.language === 'ja' && browserLanguage !== 'ja'
                      ? styles['font-japanese']
                      : ''
                  } ${
                    tarot.language !== 'ja' && browserLanguage === 'ja'
                      ? styles['font-english']
                      : ''
                  }`}
                >
                  {tarot?.questionInfo?.question}
                </div>
              </div>
              <div>{formattedDate}</div>
            </div>
            <div>
              <Button
                onClick={e => {
                  e.stopPropagation();
                  updateTarotAlertModalOpen(true);
                  updateTarotAndIndexInfo({ tarot, index: i });
                }}
              >
                {t('button.delete')}
              </Button>
            </div>
          </div>
        );
      })
      .reverse();
  };
  const getHistoryCount = filterFn => {
    if (!tarotHistory?.length) return 0;
    return tarotHistory?.filter(
      tarot =>
        browserLanguage === tarot?.language && (!filterFn || filterFn(tarot))
    ).length;
  };
  const handleScroll = event => {
    event.preventDefault();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop += event.deltaY > 0 ? 10 : -10;
    }
  };
  const menuItems = [
    { id: 1, label: t('mypage.question-today') },
    { id: 2, label: t('mypage.question-this-week') },
    { id: 3, label: t('mypage.question-this-month') },
    { id: 4, label: t('mypage.question-three-months') },
  ];
  return (
    <div
      className={`${styles['user-info3-body']} ${
        browserLanguage === 'ja' ? styles['user-info3-body-japanese'] : ''
      }`}
    >
      <div
        className={`${styles['user-info3-body-center']} ${
          browserLanguage === 'ja'
            ? styles['user-info3-body-center-japanese']
            : ''
        }`}
      >
        {isWideScreen && (
          <div
            className={`${styles['tarot-history-record']} ${
              browserLanguage === 'ja'
                ? styles['tarot-history-record-japanese']
                : ''
            }`}
          >
            <div>
              <span>
                {t(
                  `mypage.tarot-history-${
                    selectedHistory === 1
                      ? 'today'
                      : selectedHistory === 2
                      ? 'this-week'
                      : selectedHistory === 3
                      ? 'this-month'
                      : 'total'
                  }`
                )}
              </span>
              <span>
                {': '}
                {getHistoryCount(timeFilters[selectedHistory])}
                {t('mypage.times')}
              </span>
            </div>
          </div>
        )}
        <div
          className={`${styles['tarot-info']} ${
            browserLanguage === 'ja' ? styles['tarot-info-japanese'] : ''
          }`}
        >
          <div
            className={`${styles['tarot-history-menu-container']} ${
              browserLanguage === 'ja'
                ? styles['tarot-history-menu-container-japanese']
                : ''
            }`}
          >
            {menuItems.map(item => (
              <div
                key={item.id}
                className={`${styles['tarot-history-menu-box']} ${
                  browserLanguage === 'ja'
                    ? styles['tarot-history-menu-box-japanese']
                    : ''
                } ${
                  selectedHistory === item.id
                    ? browserLanguage === 'ja'
                      ? styles['tarot-history-menu-box-clicked-japanese']
                      : styles['tarot-history-menu-box-clicked']
                    : ''
                }`}
                onClick={() => setSelectedHistory(item.id)}
              >
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div
            className={`${styles['tarot-history']} ${
              browserLanguage === 'ja' ? styles['tarot-history-japanese'] : ''
            }`}
            ref={scrollContainerRef}
            onWheel={handleScroll}
          >
            {renderTarotHistory(timeFilters[selectedHistory])}
          </div>
          {!isWideScreen && (
            <div
              className={`${styles['tarot-history-record-bottom']} ${
                browserLanguage === 'ja'
                  ? styles['tarot-history-record-bottom-japanese']
                  : ''
              }`}
            >
              <div>
                <span>
                  {t(
                    `mypage.tarot-history-${
                      selectedHistory === 1
                        ? 'today'
                        : selectedHistory === 2
                        ? 'this-week'
                        : selectedHistory === 3
                        ? 'this-month'
                        : 'total'
                    }`
                  )}
                </span>
                <span>
                  {': '}
                  {getHistoryCount(timeFilters[selectedHistory])}
                  {t('mypage.times')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default QuestionInfo;
