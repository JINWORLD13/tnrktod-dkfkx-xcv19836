import { useTranslation } from 'react-i18next';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange';
import { detectComputer } from '../../../function/detectComputer';
import fontStyles from '../../../styles/scss/_Font.module.scss';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
export const GuidanceBox = ({ styles, cssInvisible, whichTarot, ...props }) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  return (
    <h2
      className={`${
        browserLanguage === 'ja'
          ? fontStyles['japanese-font-small-title']
          : fontStyles['korean-font-small-title']
      } ${
        cssInvisible === true && whichTarot === 1 ? styles['invisible'] : null
      } `}
    >
      {whichTarot === 1 &&
        (isNative || !detectComputer()
          ? t(`instruction.speed_modal_card_not_computer`)
          : t(`instruction.speed_modal_card`))}
      {whichTarot !== 1 &&
        (isNative || !detectComputer()
          ? t(`instruction.tarot_modal_card_not_computer`)
          : t(`instruction.tarot_modal_card`))}
    </h2>
  );
};
