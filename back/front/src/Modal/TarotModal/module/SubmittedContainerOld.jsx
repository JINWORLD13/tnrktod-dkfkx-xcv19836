import { useTranslation } from 'react-i18next';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange';
import { InstructionButton } from '../../../UI/InstructionButton';
import { ThemeBox } from '../components/ThemeBox';
import { QuestionBox } from '../components/QuestionBox';
import { TopicBox } from '../components/TopicBox';
import { TargetAndCounterpartBox } from '../components/TargetAndCounterpartBox';
import { RelationshipBox } from '../components/RelationshipBox';
import { SituationBox } from '../components/SituationBox';
import { OptionBox } from '../components/OptionBox';
export const SubmittedContainer = ({
  styles,
  stateGroup,
  setStateGroup,
  toggleModalGroup,
  handleStateGroup,
  questionMode,
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
  return (
    <div className={styles['submitted-container']}>
      {questionMode === 2 && (
        <>
          {' '}
          <div className={styles['submitted-container-compartment']}>
            {}
            <ThemeBox styles={styles} isSubmittedMode={answerForm?.isSubmitted} />
            <TopicBox
              styles={styles}
              setInstructionOpen={setInstructionOpen}
              setQuestionKind={setQuestionKind}
              questionForm={questionForm}
              isSubmittedMode={answerForm?.isSubmitted}
            />
            <TargetAndCounterpartBox
              styles={styles}
              setInstructionOpen={setInstructionOpen}
              setQuestionKind={setQuestionKind}
              questionForm={questionForm}
              isSubmittedMode={answerForm?.isSubmitted}
            />
            <RelationshipBox
              styles={styles}
              setInstructionOpen={setInstructionOpen}
              setQuestionKind={setQuestionKind}
              questionForm={questionForm}
              isSubmittedMode={answerForm?.isSubmitted}
            />
          </div>
        </>
      )}
      <div className={styles['submitted-container-compartment']}>
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
              questionForm={questionForm}
              isSubmittedMode={answerForm?.isSubmitted}
            />
          )}
        <div className={styles['flex-grow']}></div>
        <QuestionBox
          styles={styles}
          setInstructionOpen={setInstructionOpen}
          setQuestionKind={setQuestionKind}
          questionForm={questionForm}
          isSubmittedMode={answerForm?.isSubmitted}
        />
      </div>
    </div>
  );
};
