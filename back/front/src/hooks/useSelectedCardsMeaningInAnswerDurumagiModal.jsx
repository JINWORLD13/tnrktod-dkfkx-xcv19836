import { useTranslation } from 'react-i18next';
import useLanguageChange from './useEffect/useLanguageChange';
import { translateTarotCardName } from '../Function/cardNameTranslator';
import styles from '../styles/scss/_UseSelectedCardsMeaningInAnswerDurumagiModal.module.scss';
export const useSelectedCardsMeaningInAnswerDurumagiModal = (
  whichTarot,
  isVoucherModeOn,
  answer,
  selectedTarotCards,
  translatedCardsNameArr,
  카드_방향_배열,
  fromAnswerModal = false
) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  const cardKeyWord = (selectedTarotCard, browserLanguage) => {
    if (browserLanguage === 'en')
      return selectedTarotCard?.keywords?.join(', ') + ' etc.';
    if (browserLanguage === 'ko')
      return selectedTarotCard?.keywords_ko?.join(', ') + ' 등.';
    if (browserLanguage === 'ja')
      return selectedTarotCard?.keywords_ja?.join(', ') + ' など.';
  };
  const cardPositiveMeaning = (selectedTarotCard, browserLanguage) => {
    if (browserLanguage === 'en')
      return selectedTarotCard?.meanings.light?.join(', ') + ', etc.';
    if (browserLanguage === 'ko')
      return selectedTarotCard?.meanings.light_ko?.join(', ') + ', 등.';
    if (browserLanguage === 'ja')
      return selectedTarotCard?.meanings.light_ja?.join(', ') + ', など.';
  };
  const cardNegativeMeaning = (selectedTarotCard, browserLanguage) => {
    if (browserLanguage === 'en')
      return selectedTarotCard?.meanings.shadow?.join(', ') + ', etc.';
    if (browserLanguage === 'ko')
      return selectedTarotCard?.meanings.shadow_ko?.join(', ') + ', 등.';
    if (browserLanguage === 'ja')
      return selectedTarotCard?.meanings.shadow_ja?.join(', ') + ', など.';
  };
  const cardFortuneTelling = (selectedTarotCard, browserLanguage) => {
    if (browserLanguage === 'en')
      return selectedTarotCard?.fortune_telling?.join(', ') + ', etc.';
    if (browserLanguage === 'ko')
      return selectedTarotCard?.fortune_telling_ko?.join(', ') + ', 등.';
    if (browserLanguage === 'ja')
      return selectedTarotCard?.fortune_telling_ja?.join(', ') + ', など.';
  };
  return (
    <>
      {!fromAnswerModal && (
        <>
          <p>
            {whichTarot == 2 && !isVoucherModeOn && answer?.length === 0
              ? '\n'
              : '\n'}
          </p>
          <p
            className={`${
              browserLanguage === 'ja'
                ? styles['card-symbolic-title-japanese']
                : styles['card-symbolic-title']
            }`}
          >
            {whichTarot == 2 && !isVoucherModeOn && answer?.length === 0
              ? t(`durumagi.cards-meaning-for-ads`)
              : t(`durumagi.cards-meaning`)}
          </p>
        </>
      )}
      {selectedTarotCards.map((elem, i) => {
        const numbering = i => {
          if (i === 0) return 'A. ';
          if (i === 1) return 'B. ';
          if (i === 2) return 'C. ';
          if (i === 3) return 'D. ';
          if (i === 4) return 'E. ';
          if (i === 5) return 'F. ';
          if (i === 6) return 'G. ';
          if (i === 7) return 'H. ';
          if (i === 8) return 'I. ';
          if (i === 9) return 'J. ';
          if (i === 10) return 'K. ';
          if (i === 11) return 'L. ';
          if (i === 12) return 'M. ';
          if (i === 13) return 'N. ';
        };
        const direction = (카드_방향_배열, browserLanguage, i) => {
          if (카드_방향_배열[i] === 'normal_direction') {
            if (browserLanguage === 'en') return 'Upright';
            if (browserLanguage === 'ko') return '정방향';
            if (browserLanguage === 'ja') return '正位置';
          }
          if (카드_방향_배열[i] === 'reversed') {
            if (browserLanguage === 'en') return 'Reversed';
            if (browserLanguage === 'ko') return '역방향';
            if (browserLanguage === 'ja') return '逆位置';
          }
        };
        if (
          browserLanguage !== 'en' &&
          (translatedCardsNameArr === undefined ||
            translatedCardsNameArr?.length === 0)
        )
          return;
        return (
          <>
            <p
              className={`${
                browserLanguage === 'ja'
                  ? styles[`each-card-title-${i}-japanese`]
                  : styles[`each-card-title-${i}`]
              }`}
            >
              {numbering(i)}
              {elem.file_name.split('_').splice(1)?.join(' ')}(
              {elem.suit === 'major'
                ? (translatedCardsNameArr?.[i] || elem?.name) +
                  ', ' +
                  direction(카드_방향_배열, browserLanguage, i) +
                  ', ' +
                  t(`durumagi.major`) +
                  ', ' +
                  (i + 1) +
                  t(`durumagi.card-order`)
                : (translatedCardsNameArr?.[i] || elem?.name) +
                  ', ' +
                  direction(카드_방향_배열, browserLanguage, i) +
                  ', ' +
                  t(`durumagi.minor`) +
                  ', ' +
                  (i + 1) +
                  t(`durumagi.card-order`)}
              )
            </p>
            <p>
              {'-' + ' ' + t(`durumagi.key-word`)}
              {cardKeyWord(elem, browserLanguage)}
            </p>
            <p>
              {'-' + ' ' + t(`durumagi.card-positive-meaning`)}
              {cardPositiveMeaning(elem, browserLanguage)}
            </p>
            <p>
              {'-' + ' ' + t(`durumagi.card-negative-meaning`)}
              {cardNegativeMeaning(elem, browserLanguage)}
            </p>
            <p>
              {'-' + ' ' + t(`durumagi.fortune-telling`)}
              {cardFortuneTelling(elem, browserLanguage)}
            </p>
          </>
        );
      })}
    </>
  );
};
