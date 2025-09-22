import { useTranslation } from 'react-i18next';
import { useTotalCardsNumber } from '../../../hooks/dispatch/tarotDispatch';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange';
import Button from '../../../UI/Button';
import CancelButton from '../../../UI/CancelButton';
import { resetAllTarotCards } from '../../../data/reduxStore/tarotCardStore';
import { useDispatch } from 'react-redux';
export const SpeedTarotBtnBox = ({
  styles,
  stateGroup,
  setStateGroup,
  toggleModalGroup,
  handleStateGroup,
  ...props
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    answerForm,
    cardForm,
    questionForm,
    modalForm,
    whichTarot,
    cssInvisible,
    country,
    whichAds,
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
    setWhichCardPosition,
    setWhichAds,
    setAdsWatched,
    ...rest2
  } = setStateGroup;
  const { toggleSpreadModal, toggleTarotModal } = toggleModalGroup;
  const {
    handleAnsweredState,
    handleCardForm,
    handleQuestionForm,
    handleResetAll,
    handleResetDeck,
    handleSpreadValue,
    handleReadyToShuffleValue,
    handleSuffleFinishValue,
    handleWhichTarot,
    ...rest3
  } = handleStateGroup;
  const totalCardsNumber = useTotalCardsNumber();
  const browswerLanguage = useLanguageChange();
  return (
    <div className={styles['btn-box']}>
      <Button
        className={`${
          cssInvisible === true && whichTarot === 1
            ? styles['invisible']
            : browswerLanguage === 'ja'
            ? styles['btn-japanese']
            : styles['btn']
        } `}
        onClick={() => {
          handleSuffleFinishValue(true);
          handleSpreadValue(true);
          updateCSSInvisible(true);
          setWhichCardPosition(prev => {
            return {
              isClicked: false,
              position: -1,
            };
          });
        }}
        autoFocus={true}
      >
        {t(`button.select`)}
      </Button>
      <CancelButton
        className={`${
          cssInvisible === true && whichTarot === 1
            ? styles['invisible']
            : `${
                browswerLanguage === 'ja'
                  ? styles['btn-japanese']
                  : styles['btn']
              }`
        } `}
        onClick={(e = null) => {
          if (whichTarot === 1) {
            toggleTarotModal(
              false,
              questionForm?.spreadListNumber,
              questionForm?.spreadTitle,
              totalCardsNumber
            );
            setAdsWatched(false); 
          } else {
            toggleTarotModal(
              true,
              questionForm?.spreadListNumber,
              questionForm?.spreadTitle,
              totalCardsNumber
            );
            updateCardForm({
              ...cardForm,
              spread: false,
              isShuffleFinished: false,
              selectedCardIndexList: [],
            });
            dispatch(resetAllTarotCards());
          }
          updateCSSInvisible(false);
          handleReadyToShuffleValue(false);
          updateAnswerForm(prev => {
            return { ...prev, isSubmitted: false };
          });
        }}
      >
        {t(`button.cancel`)}
      </CancelButton>
    </div>
  );
};
