import React, { useRef } from 'react';
import styles from '../../../../styles/scss/_InAppPurchase.module.scss';
import fontStyles from '../../../../styles/scss/_Font.module.scss';
import lockStyles from '../../../../styles/scss/_Button.module.scss';
import { formatPrice } from '../../../../function/formatPrice.js';
import Button from '../../../../UI/Button.jsx';
const PurchaseItem = ({
  whichItem,
  iapProductId,
  iapProducts,
  icon,
  title,
  description,
  additionalDescription = false,
  buttonLockCondition = false,
  browserLanguage,
  purchasing,
  setPurchasing,
  orderProduct,
  t,
  adProps = {}, 
}) => {
  const product = iapProducts?.find(elem => elem?.id === iapProductId);
  const isAdMode = whichItem === 'ads';
  const {
    clickCount = 0,
    remainingTime = '',
    admobReward = 0,
    setAdsWatched,
    setWhichAds,
    handleClick,
  } = adProps;
  const isLocked = isAdMode ? clickCount >= 5 : buttonLockCondition;
  const purchasingRef = useRef(false); 
  const handleButtonClick = () => {
    try {
      if (purchasingRef.current) return; 
      if (purchasing || isLocked) return;
      purchasingRef.current = true;
      setPurchasing(true);
      if (isAdMode) {
        if (setAdsWatched) setAdsWatched(false);
        if (setWhichAds) setWhichAds(2);
        if (handleClick) handleClick();
      } else {
        orderProduct(product);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        purchasingRef.current = false;
        setPurchasing(false);
      }, 1500);
    }
  };
  return (
    <div key={whichItem} className={styles['voucher']}>
      <div className={styles['voucher-info-box']}>
        <h2
          className={`${styles['voucher-title']} ${styles['ads-card']} ${
            browserLanguage === 'ja'
              ? fontStyles['japanese-font-small-title']
              : fontStyles['korean-font-small-title']
          }`}
        >
          {isAdMode ? t('title.ads') : icon || null}
        </h2>
        <p className={`${styles['voucher-description']}`}>
          {isAdMode ? (
            <>
              <p
                className={`${
                  browserLanguage === 'ja'
                    ? fontStyles['japanese-font-content']
                    : fontStyles['korean-font-content-iap']
                }`}
              >
                {t('instruction.ads-voucher')}
              </p>
              <br />
              {clickCount !== 0 && `${t('time.ad_reset_time')}${remainingTime}`}
              <br />
              <p
                className={`${
                  browserLanguage === 'ja'
                    ? fontStyles['japanese-font-content']
                    : fontStyles['korean-font-content-iap']
                }`}
              >
                {`${t('time.remaining_ad_views')}${
                  5 - clickCount > 0 ? 5 - clickCount : 0
                } / 5 ${t('unit.times')}`}{' '}
              </p>
            </>
          ) : (
            <>
              <p
                className={`${
                  browserLanguage === 'ja'
                    ? fontStyles['japanese-font-small-title']
                    : fontStyles['korean-font-small-title']
                }`}
              >
                {title}
              </p>
              <br />
              <p
                className={`${
                  browserLanguage === 'ja'
                    ? fontStyles['japanese-font-content']
                    : fontStyles['korean-font-content-iap']
                }`}
              >
                {description}
              </p>
              {additionalDescription && (
                <>
                  <br />
                  <p
                    className={`${
                      browserLanguage === 'ja'
                        ? fontStyles['japanese-font-content']
                        : fontStyles['korean-font-content-iap']
                    }`}
                  >
                    {additionalDescription}
                  </p>
                </>
              )}
            </>
          )}
        </p>
      </div>
      <div className={styles['voucher-button-box']}>
        {isAdMode ? (
          <>
            <Button
              className={`${styles['owned-voucher-for-ads']} ${
                browserLanguage === 'ja'
                  ? styles['line-height-ja']
                  : styles['line-height-ko-and-en']
              } ${fontStyles['korean-font-small-title']}`}
            >
              {t('in_app_purchase_modal.owned')} ◎
            </Button>
            <Button
              className={`${styles['owned-voucher-for-ads']} ${
                browserLanguage === 'ja'
                  ? styles['line-height-ja']
                  : styles['line-height-ko-and-en']
              }`}
            >
              {admobReward} {t('unit.ea')}
            </Button>
            <Button
              className={`${styles['voucher-button']} ${
                purchasing || isLocked ? lockStyles['locked'] : ''
              }`}
              onClick={handleButtonClick}
              disabled={purchasingRef.current || purchasing || isLocked}
            >
              {purchasing ? t('button.loading') : t('button.view-ads')}
            </Button>
          </>
        ) : (
          <>
            <p className={styles['voucher-price']}>
              {formatPrice(
                product?.pricing?.priceMicros,
                product?.pricing?.currency,
                browserLanguage
              )}
            </p>
            <Button
              className={`${styles['voucher-button']} ${
                purchasing || isLocked ? lockStyles['locked'] : ''
              }`}
              onClick={handleButtonClick}
              disabled={purchasingRef.current || purchasing || isLocked}
            >
              {purchasing ? t('button.loading') : t('button.purchase')}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
export default PurchaseItem;
