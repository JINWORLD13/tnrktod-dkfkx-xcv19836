import { useTranslation } from 'react-i18next';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange';
import fontStyles from '../../../styles/scss/_Font.module.scss';
export const ThemeBox = ({ styles, isSubmittedMode, ...props }) => {
  const browserLanguage = useLanguageChange();
  const { t } = useTranslation();
  return (
    <div
      className={`${
        isSubmittedMode ? styles['submitted-box'] : styles['question-box']
      }`}
    >
      <div className={styles['select-container']}>
        <div
          className={`${styles['label-box']} ${
            browserLanguage === 'ja'
              ? fontStyles['japanese-font-label']
              : fontStyles['korean-font-label']
          }`}
        >
          <label htmlFor="theme">{t(`question.theme`)}</label>{' '}
          {}
        </div>
        <div
          className={`${styles['select-box']} ${
            browserLanguage === 'ja'
              ? fontStyles['japanese-font-label']
              : fontStyles['korean-font-label']
          }`}
        >
          {t(`question.theme-description`)}
          {}
        </div>
      </div>
    </div>
  );
};
