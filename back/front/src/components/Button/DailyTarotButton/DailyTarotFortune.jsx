import React, { useEffect, useState } from 'react';
import styles from './_TarotFortune.module.scss';
import fontStyles from '../../../styles/scss/_Font.module.scss';
import { tarotDeck } from '../../../data/TarotCardDeck/TarotCardDeck';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange';
import { useTranslation } from 'react-i18next';
import { getTodayCard } from '../../../utils/tokenLocalStorage';
import { getTodayCardForNative } from '../../../utils/tokenPreference';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
const DailyTarotFortune = ({
  cardForm,
  userInfo,
  todayCardIndex,
  checkIfNewDay,
  ...props
}) => {
  const [todayCardIndexInLocalStorage, setTodayCardIndexInLocalStorage] =
    useState(() => {
      if (todayCardIndex) return todayCardIndex;
      if (!isNative) return getTodayCard(userInfo);
      if (isNative) return null;
    });
  useEffect(() => {
    const fetchTodayCard = async () => {
      try {
        if (checkIfNewDay()) {
          setTodayCardIndexInLocalStorage(null);
        }
        let index;
        if (isNative) {
          index = await getTodayCardForNative(userInfo);
        } else {
          index = getTodayCard(userInfo);
        }
        if (
          cardForm?.selectedCardIndexList?.length !== 0 &&
          userInfo?.email !== undefined &&
          userInfo?.email !== ''
        )
          setTodayCardIndexInLocalStorage(cardForm?.selectedCardIndexList[0]);
        if (index) setTodayCardIndexInLocalStorage(index);
      } catch (error) {
        console.error("Error fetching today's card:", error);
      }
    };
    if (
      props?.from === 1 &&
      !todayCardIndex &&
      !todayCardIndexInLocalStorage &&
      userInfo?.email !== '' &&
      userInfo?.email !== undefined
    )
      fetchTodayCard();
  }, [isNative, userInfo?.email, cardForm?.selectedCardIndexList?.length]);
  const selectedCard =
    tarotDeck[todayCardIndexInLocalStorage] ||
    tarotDeck[cardForm?.selectedCardIndexList[0]];
  const browserLanguage = useLanguageChange();
  const { t } = useTranslation();
  const getLocalizedContent = (en, ko, ja) => {
    switch (browserLanguage) {
      case 'ko':
        return ko;
      case 'ja':
        return ja;
      default:
        return en;
    }
  };
  const Section = ({ title, content, color }) => (
    <div className={`${styles.section} ${styles[color]}`}>
      <h3
        className={`${
          browserLanguage === 'ja'
            ? fontStyles['japanese-font-small-title']
            : fontStyles['korean-font-small-title']
        }`}
      >
        {title}
      </h3>
      <ul className={styles.list}>
        {content?.map((item, index) => (
          <li
            className={`${
              browserLanguage === 'ja'
                ? fontStyles['japanese-font-label']
                : fontStyles['korean-font-label']
            }`}
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
  const Keywords = ({ keywords }) => (
    <div className={`${styles.section} ${styles.blue}`}>
      <h3
        className={`${
          browserLanguage === 'ja'
            ? fontStyles['japanese-font-small-title']
            : fontStyles['korean-font-small-title']
        }`}
      >
        {t(`daily-tarot.keyword`)}
      </h3>
      <div className={styles.keywords}>
        {keywords?.map((keyword, index) => (
          <span
            key={index}
            className={`${styles.keyword} ${
              browserLanguage === 'ja'
                ? fontStyles['japanese-font-label']
                : fontStyles['korean-font-label']
            }`}
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
  const fortuneTelling = getLocalizedContent(
    selectedCard.fortune_telling,
    selectedCard.fortune_telling_ko,
    selectedCard.fortune_telling_ja
  );
  const lightMeanings = getLocalizedContent(
    selectedCard.meanings.light,
    selectedCard.meanings.light_ko,
    selectedCard.meanings.light_ja
  ).slice(0, 3);
  const shadowMeanings = getLocalizedContent(
    selectedCard.meanings.shadow,
    selectedCard.meanings.shadow_ko,
    selectedCard.meanings.shadow_ja
  ).slice(0, 3);
  const keywords = getLocalizedContent(
    selectedCard.keywords,
    selectedCard.keywords_ko,
    selectedCard.keywords_ja
  );
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2
          className={`${
            browserLanguage === 'ja'
              ? fontStyles['japanese-font-title']
              : fontStyles['korean-font-title']
          }`}
        >
          {t(`daily-tarot.card`)}
        </h2>
        <h2
          className={`${
            browserLanguage === 'ja'
              ? fontStyles['japanese-font-title']
              : fontStyles['korean-font-title']
          }`}
        >
          {selectedCard.name}
        </h2>
      </div>
      <div className={styles.content}>
        <Section
          title={t(`daily-tarot.message`)}
          content={fortuneTelling}
          color="purple"
        />
        <Section
          title={t(`daily-tarot.positive-meaning`)}
          content={lightMeanings}
          color="green"
        />
        <Section
          title={t(`daily-tarot.negative-meaning`)}
          content={shadowMeanings}
          color="red"
        />
        <Keywords keywords={keywords} />
      </div>
    </div>
  );
};
export default DailyTarotFortune;
