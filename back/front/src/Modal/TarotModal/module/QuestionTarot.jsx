import { useTranslation } from 'react-i18next';
import { useTotalCardsNumber } from '../../../hooks/dispatch/tarotDispatch';
import { useQuestionFormState } from '../../../hooks/useState';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange';
import { TarotModalCard } from './TarotModalCard';
import TarotCardChoiceForm from '../../../Page/TarotCardForm/TarotCardChoiceForm';
import TarotCardDeckForm from '../../../Page/TarotCardForm/TarotCardDeckForm';
import { detectComputer } from '../../../function/detectComputer';
import { QuestionContainer } from './QuestionContainer';
import { DeepTarotBtnBox } from './DeepTarotBtnBox';
import { Capacitor } from '@capacitor/core';
import { SpeedTarotBtnBox } from './SpeedTarotBtnBox';
import { GuidanceBox } from './GuidanceBox';
import Button from '../../../UI/Button';
import { useState, useTransition } from 'react';
import TarotQuestionInstructionModal from '../../TarotQuestionInstructionModal';
import fontStyles from '../../../styles/scss/_Font.module.scss';
const isNative = Capacitor.isNativePlatform();
export const QuestionTarot = ({
  styles,
  stateGroup,
  setStateGroup,
  toggleModalGroup,
  handleStateGroup,
  onSubmit,
  onSubmitParam,
  isInstructionOpen,
  setInstructionOpen,
  setQuestionKind,
  ...props
}) => {
  const { t } = useTranslation();
  const [isPending, startTransition] = useTransition(); 
  const {
    answerForm,
    cardForm,
    questionForm,
    modalForm,
    whichTarot,
    cssInvisible,
    country,
    questionMode,
    ...rest
  } = stateGroup;
  const [isSimpleClicked, setIsSimpleClicked] = useState(() => {
    if (questionMode === 1) {
      return true;
    } else {
      return false;
    }
  });
  const [isDetailClicked, setIsDetailClicked] = useState(() => {
    if (questionMode === 2) {
      return true;
    } else {
      return false;
    }
  });
  const {
    updateAnswerForm,
    updateCardForm,
    updateQuestionForm,
    updateModalForm,
    updateWhichTarot,
    updateCSSInvisible,
    updateCountry,
    updateTarotManualModalOpen,
    setFilledInTheQuestion,
    setQuestionMode,
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
    handleWhichTarot,
    ...rest3
  } = handleStateGroup;
  const totalCardsNumber = useTotalCardsNumber();
  const [questionFormInTarotModal, updateQuestionFormInTarotModal] =
    useQuestionFormState();
  const browserLanguage = useLanguageChange();
  return (
    <>
      <TarotModalCard
        className={`${
          !(
            cardForm?.spread === true && cardForm?.isShuffleFinished === true
          ) &&
          answerForm?.isSubmitted &&
          cardForm?.isReadyToShuffle === true
            ? null
            : styles['question-tarot-modal-card']
        }`}
        styles={styles}
      >
        {cardForm?.spread === true && cardForm?.isShuffleFinished === true ? (
          <>
            {cardForm?.selectedCardIndexList?.length !== totalCardsNumber && (
              <>
                <div className={styles['flex-grow3']}></div>
                <div className={styles['question-tarot-choice-form']}>
                  <TarotCardChoiceForm
                    stateGroup={stateGroup}
                    setStateGroup={setStateGroup}
                    toggleModalGroup={toggleModalGroup}
                    handleStateGroup={handleStateGroup}
                    onSubmit={onSubmit}
                    onSubmitParam={onSubmitParam}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {answerForm?.isSubmitted === true &&
            cardForm?.isReadyToShuffle === true ? (
              <>
                <div className={styles['flex-grow4']}></div>
                <div className={styles['deck-form']}>
                  <TarotCardDeckForm
                    stateGroup={stateGroup}
                    setStateGroup={setStateGroup}
                    toggleModalGroup={toggleModalGroup}
                    handleStateGroup={handleStateGroup}
                  />
                </div>
                <div className={styles['flex-grow']}></div>
                <GuidanceBox
                  styles={styles}
                  cssInvisible={cssInvisible}
                  whichTarot={whichTarot}
                />
                <div className={styles['flex-grow2']}></div>
                <SpeedTarotBtnBox
                  styles={styles}
                  stateGroup={stateGroup}
                  setStateGroup={setStateGroup}
                  toggleModalGroup={toggleModalGroup}
                  handleStateGroup={handleStateGroup}
                />
              </>
            ) : (
              <>
                <div className={styles['flex-grow']}></div>
                {}
                {}
                {cssInvisible === true && answerForm?.isSubmitted === true ? (
                  <div className={styles['guidance-box']}>
                    <h2
                      className={` ${
                        browserLanguage === 'ja'
                          ? fontStyles['japanese-font-small-title']
                          : fontStyles['korean-font-small-title']
                      } ${cardForm?.spread ? styles['invisible'] : null}`}
                    >
                      {isNative || !detectComputer()
                        ? t(
                            `instruction.tarot_modal_question_card_not_computer`
                          )
                        : t(`instruction.tarot_modal_question_card`)}
                      {}
                    </h2>
                  </div>
                ) : (
                  <div className={styles['guidance-box']}>
                    <h2
                      className={`${
                        browserLanguage === 'ja'
                          ? fontStyles['japanese-font-small-title']
                          : fontStyles['korean-font-small-title']
                      }`}
                    >
                      {t(`instruction.tarot_modal_question`)}
                      {}
                    </h2>
                  </div>
                )}
                {}
                <div className={styles['input-mode-button-box']}>
                  <Button
                    className={`${
                      browserLanguage === 'ja'
                        ? styles['input-mode-button-japanese']
                        : styles['input-mode-button']
                    } ${
                      isSimpleClicked
                        ? styles['selected-color']
                        : styles['normal-color']
                    }`}
                    onClick={e => {
                      e.preventDefault();
                      setQuestionMode(prev => {
                        setIsSimpleClicked(true);
                        setIsDetailClicked(false);
                        return 1;
                      });
                    }}
                  >
                    {t(`button.simple-input`)}
                  </Button>
                  <Button
                    className={`${
                      browserLanguage === 'ja'
                        ? styles['input-mode-button-japanese']
                        : styles['input-mode-button']
                    } ${
                      isDetailClicked
                        ? styles['selected-color']
                        : styles['normal-color']
                    }`}
                    onClick={e => {
                      e.preventDefault();
                      setQuestionMode(prev => {
                        setIsSimpleClicked(false);
                        setIsDetailClicked(true);
                        return 2;
                      });
                    }}
                  >
                    {t(`button.detailed-input`)}
                  </Button>
                </div>
                <div className={styles['flex-grow']}></div>
                {cardForm?.spread === true ? null : (
                  <QuestionContainer
                    styles={styles}
                    stateGroup={stateGroup}
                    setStateGroup={setStateGroup}
                    toggleModalGroup={toggleModalGroup}
                    handleStateGroup={handleStateGroup}
                    questionFormInTarotModal={questionFormInTarotModal}
                    updateQuestionFormInTarotModal={
                      updateQuestionFormInTarotModal
                    }
                    questionMode={questionMode}
                    startTransition={startTransition}
                    setInstructionOpen={setInstructionOpen}
                    setQuestionKind={setQuestionKind}
                  />
                )}
                <div className={styles['flex-grow']}></div>
                <DeepTarotBtnBox
                  styles={styles}
                  stateGroup={stateGroup}
                  setStateGroup={setStateGroup}
                  toggleModalGroup={toggleModalGroup}
                  handleStateGroup={handleStateGroup}
                  questionFormInTarotModal={questionFormInTarotModal}
                  isPending={isPending}
                  isInstructionOpen={isInstructionOpen}
                  setInstructionOpen={setInstructionOpen}
                />
              </>
            )}
          </>
        )}
        {}
      </TarotModalCard>
    </>
  );
};
