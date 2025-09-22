import React, { useState, useEffect, Suspense } from 'react';
import styles from '../../styles/scss/_TarotSectionForm.module.scss';
import { useTranslation } from 'react-i18next';
import TarotSectionSideMenuForm from './TarotSectionSideMenuForm.jsx';
import {
  TAROT_EXPLANATION_PATH,
  TAROT_LEARNING_PATH,
  TAROT_PRINCIPLE_PATH,
} from '../../config/Route/UrlPaths.jsx';
import TarotExplanationForm from '../TarotCardForm/TarotExplanationForm.jsx';
import TarotLearningForm from '../TarotCardForm/TarotLearningForm.jsx';
import TarotCardPrincipleForm from '../TarotCardForm/TarotCardPrincipleForm.jsx';
import LoadingForm from '../../Components/Loading/Loading.jsx';
const TarotSectionForm = () => {
  const fullUrl = window.location.href;
  const { t } = useTranslation();
  const [pathName, setPathName] = useState('');
  useEffect(() => {
    const domain =
      import.meta.env.VITE_SERVER_URL || 'https:
    switch (fullUrl) {
      case `${domain}/${TAROT_PRINCIPLE_PATH}`:
        setPathName(TAROT_PRINCIPLE_PATH);
        break;
      case `${domain}/${TAROT_EXPLANATION_PATH}`:
        setPathName(TAROT_EXPLANATION_PATH);
        break;
      case `${domain}/${TAROT_LEARNING_PATH}`:
        setPathName(TAROT_LEARNING_PATH);
        break;
      default:
    }
  }, [fullUrl]);
  return (
    <Suspense fallback={<LoadingForm />}>
      <div className={styles['container']}>
        <div className={styles['container-box1']}>
          <TarotSectionSideMenuForm setPathName={setPathName} />
        </div>
        <div className={styles['container-box2']}>
          {pathName === TAROT_PRINCIPLE_PATH ? (
            <TarotCardPrincipleForm />
          ) : null} 
          {pathName === TAROT_EXPLANATION_PATH ? (
            <TarotExplanationForm />
          ) : null}
          {pathName === TAROT_LEARNING_PATH ? <TarotLearningForm /> : null}
        </div>
      </div>
    </Suspense>
  );
};
export default TarotSectionForm;
