import React from 'react';
import styles from '../styles/scss/_AlertModal.module.scss';
import Card from '../UI/Card.jsx';
import Button from '../UI/Button.jsx';
import CancelButton from '../UI/CancelButton.jsx';
import useLanguageChange from '../hooks/useEffect/useLanguageChange.jsx';
import { useTranslation } from 'react-i18next';
const AlertModal = ({ ...props }) => {
  const browserLanguage = useLanguageChange();
  const { t } = useTranslation();
  const closeAlertModal = (e) => {
    if (props?.updateTarotAlertModalOpen) props?.updateTarotAlertModalOpen(false);
    if (props?.updateUserAlertModalOpen) props?.updateUserAlertModalOpen(false);
  };
  const handleConfirmClick = async (e) => {
    try {
      if (props?.handleDeleteTarotHistory && props?.tarotAndIndexInfo) {
        await props?.handleDeleteTarotHistory(props?.tarotAndIndexInfo);
      } else if (props?.deleteUserInfo) {
        await props?.deleteUserInfo(e);
      } else if (props?.handleDeleteAllTarotHistory) {
        await props?.handleDeleteAllTarotHistory();
      }
    } catch (error) {
      console.error("Error during delete operation:", error);
    } finally {
      closeAlertModal();
    }
  };
  return (
    <div>
      <div className={styles['backdrop']} onClick={closeAlertModal} />
      <Card className={styles['modal']}>
        <header
          className={browserLanguage === 'ja' ? styles['title-japanese'] : styles['title']}
        >
          <p>{t(`alert_modal.notice`)}</p>
        </header>
        <div
          className={browserLanguage === 'ja' ? styles['modal-content-japanese'] : styles['modal-content']}
        >
          <p>{props?.children}</p>
        </div>
        <footer className={styles['button-box']}>
          <Button
            className={styles['button']}
            onClick={handleConfirmClick}
            autoFocus={true}
          >
            {t(`button.confirm`)}
          </Button>
          <CancelButton
            className={styles['button']}
            onClick={(e=null)=>{closeAlertModal(e)}}
          >
            {t(`button.close`)}
          </CancelButton>
        </footer>
      </Card>
    </div>
  );
};
export default AlertModal;
