import { useTranslation } from 'react-i18next';
import { Capacitor } from '@capacitor/core';
import Button from '../../../UI/Button';
import CancelButton from '../../../UI/CancelButton';
import { IS_PRODUCTION_MODE } from '../../../function/IS_PRODUCTION_MODE';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const isNative = Capacitor.isNativePlatform();
export const BottomBox = ({
  styles,
  modalForm,
  whichTarot,
  admobReward,
  isVoucherModeOn,
  setVoucherMode,
  toggleTarotModal,
  toggleSpreadModal,
  browserLanguage,
  ...propd
}) => {
  const { t } = useTranslation();
  const [transformedAdmobReward, setTransformedAdmobReward] = useState(0);
  useEffect(() => {
    const handleAdmobReward = async () => {
      try {
        if (admobReward instanceof Promise) {
          const result = await admobReward;
          setTransformedAdmobReward(result);
        } else {
          setTransformedAdmobReward(admobReward);
        }
      } catch (error) {
        console.error('Error processing admobReward:', error);
      }
    };
    handleAdmobReward();
  }, [admobReward]);
  return (
    <div className={styles['btn-box']}>
      {whichTarot === 2 && isNative && (
        <Button
          className={`${
            browserLanguage === 'ja'
              ? styles['ads-btn-japanese']
              : styles['ads-btn']
          } ${isVoucherModeOn === true && styles['selected']}`}
          onClick={() => {
            if (isVoucherModeOn === false) {
              setVoucherMode(true);
              toggleTarotModal(false, '', '', '');
            }
            if (isVoucherModeOn === true) {
              setVoucherMode(false);
            }
          }}
        >
          {isVoucherModeOn ? t(`button.vouchers`) : t(`button.ads`)}
        </Button>
      )}
      <CancelButton
        className={`${
          browserLanguage === 'ja'
            ? styles['cancel-btn-japanese']
            : styles['cancel-btn']
        }`}
        onClick={(e = null) => {
          if (modalForm?.spread && !modalForm?.tarot) {
            toggleSpreadModal(false, 0, '', 0);
          }
        }}
      >
        {t(`button.cancel`)}
      </CancelButton>
      {whichTarot === 2 && isNative && isVoucherModeOn === false && (
        <div
          className={`${
            browserLanguage === 'ja'
              ? styles['ads-reward-japanese']
              : styles['ads-reward']
          }`}
        >
          {}
          {'◎' + ' : ' + transformedAdmobReward + ' '}
          {IS_PRODUCTION_MODE ? t(`unit.ea`) : 'C'}
        </div>
      )}
    </div>
  );
};
