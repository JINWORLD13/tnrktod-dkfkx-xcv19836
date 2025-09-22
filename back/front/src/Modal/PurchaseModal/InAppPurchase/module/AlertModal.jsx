import React from 'react';
import Card from '../../../../UI/Card';
import CancelButton from '../../../../UI/CancelButton';
import Button from '../../../../UI/Button';
const AlertModal = ({
  t, 
  browserLanguage, 
  children, 
  stateGroup, 
  requiredVoucherName, 
  openChargePage, 
  closeChargeModal, 
  styles,
}) => {
  const requiredVoucherInfo = stateGroup?.requiredVoucherInfo;
  return (
    <Card className={styles['modal']}>
      <header
        className={`${
          browserLanguage === 'ja' ? styles['title-japanese'] : styles['title']
        }`}
      >
        <p>{t(`alert_modal.notice`)}</p>
      </header>
      <div
        className={`${
          browserLanguage === 'ja'
            ? styles['modal-content-japanese']
            : styles['modal-content']
        }`}
      >
        <p>{children}</p>
        {requiredVoucherInfo && (
          <p>
            {`${t(`voucher.required-voucher`)} : ${requiredVoucherName}${t(
              `unit.kind-of-voucher`
            )} x ${
              requiredVoucherInfo.requiredAmount -
              requiredVoucherInfo.remainingAmount
            }${t(`unit.ea`)}`}
          </p>
        )}
        {requiredVoucherInfo && (
          <p>
            {`${t(`voucher.remaining-voucher`)} : ${
              requiredVoucherInfo.remainingAmount
            }${t(`unit.ea`)}`}
          </p>
        )}
      </div>
      {}
      <footer className={styles['purchase-button-box']}>
        <Button
          className={`${styles['purchase-button']} ${
            browserLanguage === 'ja'
              ? styles['purchase-button-font-ja']
              : styles['purchase-button-font']
          }`}
          onClick={() => {
            openChargePage();
          }}
        >
          {t(`button.confirm`)}
        </Button>
        <CancelButton
          className={`${styles['purchase-button']} ${
            browserLanguage === 'ja'
              ? styles['purchase-button-font-ja']
              : styles['purchase-button-font']
          }`}
          onClick={(e = null) => {
            closeChargeModal();
          }}
        >
          {t(`button.close`)}
        </CancelButton>
      </footer>
    </Card>
  );
};
export default AlertModal;
