import { useEffect, useState, useCallback } from 'react';
import Card from '../../UI/Card.jsx';
import styles from '../../styles/scss/_SpreadModal.module.scss';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { BottomBox } from './module/BottomBox.jsx';
import { SpreadModalTab } from './module/SpreadModalTab.jsx';
import { SpreadListForVoucher } from './module/SpreadListForVoucher.jsx';
import { SpreadListForPoint } from './module/SpreadListForPoint.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
const SpreadModal = ({
  stateGroup,
  setStateGroup,
  toggleModalGroup,
  handleStateGroup,
  userCacheForRedux,
  admobReward,
  ...props
}) => {
  const {
    answerForm,
    cardForm,
    questionForm,
    modalForm,
    whichTarot,
    cssInvisible,
    country,
    isVoucherModeOn,
    showInAppPurchase,
    whichSpread,
    ...rest
  } = stateGroup;
  const {
    updateAnswerForm,
    updateBlinkModalForLoginOpen,
    updateChargeModalOpen,
    updateTarotSpreadPricePoint,
    updateTarotSpreadVoucherPrice,
    setVoucherMode,
    setWhichAds,
    setShowInAppPurchase,
    setUnavailableWhichTarot,
    setWhichSpread,
    setAdsWatched,
    ...rest2
  } = setStateGroup;
  const { handleWhichTarot, ...rest3 } = handleStateGroup;
  const { toggleSpreadModal, toggleTarotModal } = toggleModalGroup;
  const browserLanguage = useLanguageChange();
  return (
    <Card className={styles.spreadModal}>
      <SpreadModalTab   
        styles={styles}
        whichTarot={whichTarot}
        handleWhichTarot={handleWhichTarot}
        toggleTarotModal={toggleTarotModal}
        updateAnswerForm={updateAnswerForm}
        setAdsWatched={setAdsWatched}
        browserLanguage={browserLanguage}
      />
      <SpreadListForVoucher
        styles={styles}
        toggleTarotModal={toggleTarotModal}
        stateGroup={stateGroup}
        setStateGroup={setStateGroup}
        userCacheForRedux={userCacheForRedux}
        admobReward={admobReward}
      />
      {}
      <BottomBox
        styles={styles}
        modalForm={modalForm}
        whichTarot={whichTarot}
        admobReward={admobReward}
        isVoucherModeOn={isVoucherModeOn}
        setVoucherMode={setVoucherMode}
        toggleTarotModal={toggleTarotModal}
        toggleSpreadModal={toggleSpreadModal}
        browserLanguage={browserLanguage}
      />
    </Card>
  );
};
export default SpreadModal;
