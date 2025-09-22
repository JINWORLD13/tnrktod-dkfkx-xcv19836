import React, { useState } from 'react';
import AdComponentStyles from '../../../styles/scss/_AdComponent.module.scss';
import { useTranslation } from 'react-i18next';
const AdLoadingComponent = ({ ...props }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useTranslation();
  const handleClose = () => {
    setIsVisible(false);
    if (props?.setIsLoading) props?.setIsLoading(false);
    if (props?.setWhichAds) props?.setWhichAds(0);
    if (props?.setAdsWatched) props?.setAdsWatched(false);
  };
  if (!isVisible) return null;
  return (
    <div className={AdComponentStyles['backdrop']} >
      <div className={AdComponentStyles['backdrop-box']}>
         <button
            className={AdComponentStyles['close-button']}
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
        <div className={AdComponentStyles['ad-badge']}>{t(`ad.label`)}</div>
        <div className={AdComponentStyles['modal']}>
          <h1>{t(`instruction.loading`)}</h1>
          <div>
            <p>{t(`instruction.network-warnings`)}</p>
          </div>
          <div className={AdComponentStyles['loading-indicator']}>
            <div className={AdComponentStyles['spinner']}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdLoadingComponent;
