import { useTranslation } from 'react-i18next';
export const SpreadModalTab = ({
  styles,
  whichTarot,
  handleWhichTarot,
  toggleTarotModal,
  updateAnswerForm,
  setAdsWatched,
  browserLanguage,
  ...propd
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles['btn-box']}>
      <button
        className={`${
          browserLanguage === 'ja'
            ? styles['which-tarot-btn-japanese']
            : styles['which-tarot-btn']
        } ${whichTarot === 1 ? styles['selected'] : null}`}
        onClick={() => {
          handleWhichTarot(1);
          setAdsWatched(false);
          updateAnswerForm(prev => {
            return {
              ...prev,
              isSubmitted: false,
              isWaiting: false,
              isAnswered: false,
            };
          });
          toggleTarotModal(false, '', '', '');
        }}
      >
        {t(`tab.speed_tarot`)}
      </button>
      <button
        className={`${
          browserLanguage === 'ja'
            ? styles['which-tarot-btn-japanese']
            : styles['which-tarot-btn']
        } ${whichTarot === 2 ? styles['selected'] : null}`}
        onClick={() => {
          handleWhichTarot(2);
          setAdsWatched(false);
          updateAnswerForm(prev => {
            return {
              ...prev,
              isSubmitted: false,
              isWaiting: false,
              isAnswered: false,
            };
          });
          toggleTarotModal(false, '', '', '');
        }}
      >
        {t(`tab.normal_question_tarot`)}
      </button>
      <button
        className={`${
          browserLanguage === 'ja'
            ? styles['which-tarot-btn-japanese']
            : styles['which-tarot-btn']
        } ${whichTarot === 3 ? styles['selected'] : null}`}
        onClick={() => {
          handleWhichTarot(3);
          setAdsWatched(false);
          updateAnswerForm(prev => {
            return {
              ...prev,
              isSubmitted: false,
              isWaiting: false,
              isAnswered: false,
            };
          });
          toggleTarotModal(false, '', '', '');
        }}
      >
        {t(`tab.deep_question_tarot`)}
      </button>
      <button
        className={`${
          browserLanguage === 'ja'
            ? styles['which-tarot-btn-japanese']
            : styles['which-tarot-btn']
        } ${whichTarot === 4 ? styles['selected'] : null}`}
        onClick={() => {
          handleWhichTarot(4);
          setAdsWatched(false);
          updateAnswerForm(prev => {
            return {
              ...prev,
              isSubmitted: false,
              isWaiting: false,
              isAnswered: false,
            };
          });
          toggleTarotModal(false, '', '', '');
        }}
      >
        {t(`tab.serious_question_tarot`)}
      </button>
    </div>
  );
};
