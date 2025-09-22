import React, { useState, useEffect, useCallback, Suspense } from 'react';
import styles from '../../styles/scss/_ETCForm.module.scss';
import { hasAccessToken } from '../../utils/tokenCookie.jsx';
import { useTranslation } from 'react-i18next';
import ETCSideMenuForm from './ETCSideMenuForm.jsx';
import {
  ETC_PATH,
  MORE_BUSINESS_INFO_PATH,
  MORE_TERMS_OF_SERVICE_PATH,
  TAROT_EXPLANATION_PATH,
  TAROT_LEARNING_PATH,
} from '../../config/Route/UrlPaths.jsx';
import BusinessInfoForm from './BusinessInfoForm.jsx';
import TermsOfServiceForm from './TermsOfServiceForm.jsx';
import TarotExplanationForm from '../TarotCardForm/TarotExplanationForm.jsx';
import TarotLearningForm from '../TarotCardForm/TarotLearningForm.jsx';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import LoadingForm from '../../Components/Loading/Loading.jsx';
const ETCForm = () => {
  const fullUrl = window.location.href; 
  const { t } = useTranslation();
  const [pathName, setPathName] = useState('');
  const browserLanguage = useLanguageChange();
  useEffect(() => {
    const domain =
      import.meta.env.VITE_SERVER_URL || 'https:
    switch (fullUrl) {
      case `${domain}/${browserLanguage}/${ETC_PATH}/${TAROT_EXPLANATION_PATH}`:
        setPathName(TAROT_EXPLANATION_PATH);
        break;
      case `${domain}/${browserLanguage}/${ETC_PATH}/${TAROT_LEARNING_PATH}`:
        setPathName(TAROT_LEARNING_PATH);
        break;
      case `${domain}/${browserLanguage}/${ETC_PATH}`:
        setPathName(MORE_TERMS_OF_SERVICE_PATH);
        break;
      case `${domain}/${browserLanguage}/${ETC_PATH}/${MORE_BUSINESS_INFO_PATH}`:
        setPathName(MORE_BUSINESS_INFO_PATH);
        break;
      default:
    }
  }, [fullUrl]);
  return (
    <Suspense fallback={<LoadingForm />}>
      <div className={styles['container']}>
        <div className={styles['container-box1']}>
          <ETCSideMenuForm setPathName={setPathName} />
        </div>
        <div className={styles['container-box2']}>
          {pathName === MORE_TERMS_OF_SERVICE_PATH ? (
            <TermsOfServiceForm />
          ) : null}
          {pathName === TAROT_EXPLANATION_PATH ? (
            <TarotExplanationForm />
          ) : null}
          {pathName === TAROT_LEARNING_PATH ? <TarotLearningForm /> : null}
          {pathName === MORE_BUSINESS_INFO_PATH ? <BusinessInfoForm /> : null}
        </div>
        {}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
          <h1>{t('page.etc.mainHeading')}</h1>
          <section>
            <p>{t('page.etc.intro.paragraph1')}</p>
            <p>{t('page.etc.intro.paragraph2')}</p>
          </section>
        </div>
        {}
      </div>
    </Suspense>
  );
};
export default ETCForm;
