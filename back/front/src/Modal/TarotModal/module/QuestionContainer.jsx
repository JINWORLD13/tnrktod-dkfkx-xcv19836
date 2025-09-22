import { useTranslation } from 'react-i18next';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange';
import { useCallback, useTransition } from 'react';
import { detectComputer } from '../../../function/detectComputer';
import { Capacitor } from '@capacitor/core';
import { InstructionButton } from '../../../UI/InstructionButton';
import { ThemeBox } from '../components/ThemeBox';
import { RelationshipBox } from '../components/RelationshipBox';
import { TargetAndCounterpartBox } from '../components/TargetAndCounterpartBox';
import { SituationBox } from '../components/SituationBox';
import { QuestionBox } from '../components/QuestionBox';
import { OptionBox } from '../components/OptionBox';
import { TopicBox } from '../components/TopicBox';
const isNative = Capacitor.isNativePlatform();
export const QuestionContainer = ({
  styles,
  stateGroup,
  setStateGroup,
  toggleModalGroup,
  handleStateGroup,
  questionFormInTarotModal,
  updateQuestionFormInTarotModal,
  questionMode,
  startTransition,
  setInstructionOpen,
  setQuestionKind,
  ...props
}) => {
  const { t } = useTranslation();
  const {
    answerForm,
    cardForm,
    questionForm,
    modalForm,
    whichTarot,
    cssInvisible,
    country,
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
    setFilledInTheQuestion,
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
  const browserLanguage = useLanguageChange();
  const handleQuestionFormInTarotModal = useCallback(e => {
    e.preventDefault();
    e.stopPropagation(); 
    const { name, value } = e.target;
    updateQuestionFormInTarotModal(prev => ({
      ...prev,
      [name]: value,
    }));
  });
  return (
    <div
      className={
        answerForm?.isSubmitted
          ? styles['submitted-container']
          : styles['question-container']
      }
    >
      {questionMode === 2 && (
        <>
          <div
            className={
              answerForm?.isSubmitted
                ? styles['submitted-container-compartment']
                : styles['question-container-compartment']
            }
          >
            {}
            <ThemeBox
              styles={styles}
              isSubmittedMode={answerForm?.isSubmitted}
            />
            <TopicBox
              styles={styles}
              setInstructionOpen={setInstructionOpen}
              setQuestionKind={setQuestionKind}
              questionFormInTarotModal={questionFormInTarotModal}
              handleQuestionFormInTarotModal={handleQuestionFormInTarotModal}
              questionForm={questionForm}
              isSubmittedMode={answerForm?.isSubmitted}
            />
            <TargetAndCounterpartBox
              styles={styles}
              setInstructionOpen={setInstructionOpen}
              setQuestionKind={setQuestionKind}
              questionFormInTarotModal={questionFormInTarotModal}
              handleQuestionFormInTarotModal={handleQuestionFormInTarotModal}
              questionForm={questionForm}
              isSubmittedMode={answerForm?.isSubmitted}
            />
            <RelationshipBox
              styles={styles}
              setInstructionOpen={setInstructionOpen}
              setQuestionKind={setQuestionKind}
              questionFormInTarotModal={questionFormInTarotModal}
              handleQuestionFormInTarotModal={handleQuestionFormInTarotModal}
              questionForm={questionForm}
              isSubmittedMode={answerForm?.isSubmitted}
            />
          </div>
        </>
      )}
      <div
        className={
          answerForm?.isSubmitted
            ? styles['submitted-container-compartment']
            : styles['question-container-compartment']
        }
      >
        {questionMode === 1 && (
          <ThemeBox styles={styles} isSubmittedMode={answerForm?.isSubmitted} />
        )}
        {questionMode === 2 &&
          questionForm?.spreadListNumber !== 201 &&
          questionForm?.spreadListNumber !== 304 && (
            <SituationBox
              styles={styles}
              setInstructionOpen={setInstructionOpen}
              setQuestionKind={setQuestionKind}
              questionFormInTarotModal={questionFormInTarotModal}
              handleQuestionFormInTarotModal={handleQuestionFormInTarotModal}
              questionForm={questionForm}
              isSubmittedMode={answerForm?.isSubmitted}
            />
          )}
        {(questionMode === 1 || questionMode === 2) &&
          (questionForm?.spreadListNumber === 201 ||
            questionForm?.spreadListNumber === 304) && (
            <OptionBox
              styles={styles}
              setInstructionOpen={setInstructionOpen}
              setQuestionKind={setQuestionKind}
              questionFormInTarotModal={questionFormInTarotModal}
              handleQuestionFormInTarotModal={handleQuestionFormInTarotModal}
              questionForm={questionForm}
              isSubmittedMode={answerForm?.isSubmitted}
            />
          )}
        <div className={styles['flex-grow']}></div>
        <QuestionBox
          styles={styles}
          setInstructionOpen={setInstructionOpen}
          setQuestionKind={setQuestionKind}
          questionFormInTarotModal={questionFormInTarotModal}
          handleQuestionFormInTarotModal={handleQuestionFormInTarotModal}
          isSubmittedMode={answerForm?.isSubmitted}
          questionForm={questionForm}
        />
      </div>
    </div>
  );
};
