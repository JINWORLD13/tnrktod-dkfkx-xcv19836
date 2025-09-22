import React, { useEffect } from 'react';
import styles from '../../styles/scss/_TarotModal.module.scss';
import { tarotApi } from '../../api/tarotApi.jsx';
import {
  setTotalCardsNumberUtil,
  useTarotCardDeck,
  useTotalCardsNumber,
} from '../../hooks/dispatch/tarotDispatch.jsx';
import { useDispatch } from 'react-redux';
import {
  setIsAnswered,
  setIsDoneAnimationOfBackground,
  setIsReadyToShowDurumagi,
  setIsWaiting,
} from '../../data/reduxStore/booleanStore.jsx';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { QuestionTarot } from './module/QuestionTarot.jsx';
import { SpeedTarot } from './module/SpeedTarot.jsx';
import { IS_PRODUCTION_MODE } from '../../function/IS_PRODUCTION_MODE.js';
import { useRewardFromPreference } from '../../Page/GoogleAd/module/useRewardFromPreference.jsx';
import { isAdsFreePassValid } from '../../function/isAdsFreePassValid.jsx';
import { onSubmit } from './lib/onSubmit.jsx';
const TarotModal = ({
  stateGroup,
  setStateGroup,
  toggleModalGroup,
  handleStateGroup,
  userInfo,
  setAdmobReward,
  isInstructionOpen,
  setInstructionOpen,
  setQuestionKind,
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
    tarotSpreadPricePoint,
    tarotSpreadVoucherPrice,
    whichCardPosition,
    isVoucherModeOn,
    isPending,
    ...rest
  } = stateGroup;
  const {
    updateAnswerForm,
    updateCardForm,
    updateQuestionForm,
    updateModalForm,
    updateWhichTarot,
    updateCSSInvisible,
    updateCountry,
    updateTarotManualModalOpen,
    setWhichAds,
    setAdsWatched,
    setFilledInTheQuestion,
    setWhichCardPosition,
    ...rest2
  } = setStateGroup;
  const browserLanguage = useLanguageChange();
  const dispatch = useDispatch();
  setTotalCardsNumberUtil(questionForm?.cardCount);
  const tarotCardDeck = useTarotCardDeck();
  const totalCardsNumber = useTotalCardsNumber();
  useEffect(() => {
    if (tarotCardDeck?.length === 78) {
      updateCardForm({
        ...cardForm,
        selectedCardIndexList: [],
      });
    }
    return () => {};
  }, [tarotCardDeck]);
  useEffect(() => {
    updateCardForm({ ...cardForm, spread: false, shuffle: 0 });
    return () => {};
  }, [totalCardsNumber]);
  return (
    <>
      {whichTarot === 1 ? (
        <SpeedTarot
          styles={styles}
          stateGroup={stateGroup}
          setStateGroup={setStateGroup}
          toggleModalGroup={toggleModalGroup}
          handleStateGroup={handleStateGroup}
          userInfo={userInfo}
        />
      ) : null}
      {whichTarot === 2 || whichTarot === 3 || whichTarot === 4 ? (
        <QuestionTarot
          styles={styles}
          stateGroup={stateGroup}
          setStateGroup={setStateGroup}
          toggleModalGroup={toggleModalGroup}
          onSubmit={onSubmit}
          onSubmitParam={{
            setWhichAds,
            updateQuestionForm,
            updateAnswerForm,
            setWhichCardPosition,
            setAdsWatched,
            dispatch,
            setIsWaiting,
            setIsAnswered,
            setIsDoneAnimationOfBackground,
            setIsReadyToShowDurumagi,
            questionForm,
            userInfo,
            whichTarot,
            isVoucherModeOn,
            tarotSpreadVoucherPrice,
            browserLanguage,
            props,
            tarotApi,
            isAdsFreePassValid,
          }}
          handleStateGroup={handleStateGroup}
          isInstructionOpen={isInstructionOpen}
          setInstructionOpen={setInstructionOpen}
          setQuestionKind={setQuestionKind}
        />
      ) : null}
    </>
  );
};
export default TarotModal;
