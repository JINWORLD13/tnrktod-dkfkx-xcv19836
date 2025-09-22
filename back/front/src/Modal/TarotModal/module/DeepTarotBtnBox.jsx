import { useTranslation } from 'react-i18next';
import { useTotalCardsNumber } from '../../../hooks/dispatch/tarotDispatch';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange';
import Button from '../../../UI/Button';
import CancelButton from '../../../UI/CancelButton';
import fontStyles from '../../../styles/scss/_Font.module.scss';
export const DeepTarotBtnBox = ({
  styles,
  stateGroup,
  setStateGroup,
  toggleModalGroup,
  handleStateGroup,
  questionFormInTarotModal,
  isPending,
  isInstructionOpen,
  setInstructionOpen,
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
    isOverInTheQuestion,
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
    setOverInTheQuestion,
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
  const browserLanguage = useLanguageChange();
  return (
    <div className={styles['btn-box']}>
      <div className={styles['theme-example']} style={{ flexGrow: 1 }}></div>
      <div
        className={`${styles['theme-example']} ${
          browserLanguage === 'ja'
            ? fontStyles['japanese-font-label']
            : fontStyles['korean-font-label']
        }`}
      >
        <p>
          {t(`question.theme`)}
          {t(`question.theme-description`)}
        </p>
      </div>
      <div className={styles['theme-example']} style={{ flexGrow: 1 }}></div>
      {answerForm?.isSubmitted === false && (
        <Button
          className={`${
            answerForm?.isSubmitted === false
              ? browserLanguage === 'ja'
                ? styles['btn-japanese']
                : styles['btn']
              : ''
          } `}
          onClick={() => {
            updateCSSInvisible(true);
            updateTarotManualModalOpen(true);
            if (isInstructionOpen) setInstructionOpen(false);
          }}
        >
          {t(`button.tarot-manual`)}
        </Button>
      )}
      {answerForm?.isSubmitted === false && (
        <Button
          className={`${
            answerForm?.isSubmitted === false
              ? browserLanguage === 'ja'
                ? styles['btn-japanese']
                : styles['btn']
              : ''
          } `}
          onClick={() => {
            if (questionFormInTarotModal?.question?.trim()?.length <= 0) {
              setFilledInTheQuestion(false);
              return;
            } else if (questionFormInTarotModal?.question?.trim()?.length > 0) {
              setFilledInTheQuestion(true);
            }
            if (questionForm?.spreadListNumber === 201) {
              if (
                (browserLanguage === 'en' &&
                  questionForm['question']?.length > 1100) ||
                ((browserLanguage === 'ko' || browserLanguage === 'ja') &&
                  questionForm['question']?.length > 700)
              ) {
                setOverInTheQuestion(true)
                return;
              }
            } else {
              if (
                (browserLanguage === 'en' && questionForm['question']?.length > 600) ||
                ((browserLanguage === 'ko' || browserLanguage === 'ja') &&
                  questionForm['question']?.length > 400)
              ) {
                setOverInTheQuestion(true)
                return;
              }
            }
            updateCSSInvisible(true);
            updateAnswerForm(prev => {
              return { ...prev, isSubmitted: true };
            });
            updateQuestionForm(prev => {
              return {
                ...prev,
                question_topic:
                  questionFormInTarotModal?.question_topic?.trim(),
                subject: questionFormInTarotModal?.subject?.trim(),
                object: questionFormInTarotModal?.object?.trim(),
                relationship_subject:
                  questionFormInTarotModal?.relationship_subject?.trim(),
                relationship_object:
                  questionFormInTarotModal?.relationship_object?.trim(),
                theme: questionFormInTarotModal?.theme?.trim(),
                situation: questionFormInTarotModal?.situation?.trim(),
                question: questionFormInTarotModal?.question?.trim(),
                firstOption: questionFormInTarotModal?.firstOption?.trim(),
                secondOption: questionFormInTarotModal?.secondOption?.trim(),
                thirdOption: questionFormInTarotModal?.thirdOption?.trim(),
              };
            });
          }}
          autoFocus={true}
        >
          {t(`button.submit`)}
        </Button>
      )}
      {answerForm?.isSubmitted === true && (
        <Button
          className={`${
            answerForm?.isSubmitted && !cardForm.spread
              ? browserLanguage === 'ja'
                ? styles['btn-japanese']
                : styles['btn']
              : styles['none']
          }`}
          onClick={() => {
            handleReadyToShuffleValue(true);
            updateCSSInvisible(true);
            if (isInstructionOpen) setInstructionOpen(false);
          }}
          autoFocus={true}
        >
          {t(`button.shuffle`)}
        </Button>
      )}
      {answerForm?.isSubmitted === true && (
        <Button
          className={`${
            answerForm?.isSubmitted && !cardForm.spread
              ? browserLanguage === 'ja'
                ? styles['btn-japanese']
                : styles['btn']
              : styles['none']
          }`}
          onClick={() => {
            updateCSSInvisible(false);
            updateAnswerForm(prev => {
              return { ...prev, isSubmitted: false };
            });
          }}
        >
          {t(`button.rewrite`)}
        </Button>
      )}
      <CancelButton
        className={`${
          !answerForm?.isSubmitted
            ? browserLanguage === 'ja'
              ? styles['btn-japanese']
              : styles['btn']
            : `${
                !cardForm.spread
                  ? browserLanguage === 'ja'
                    ? styles['btn-japanese']
                    : styles['btn']
                  : styles['none']
              }`
        }`}
        onClick={(e = null) => {
          toggleTarotModal(
            false,
            questionForm?.spreadListNumber,
            questionForm?.spreadTitle,
            totalCardsNumber
          );
          updateCSSInvisible(false);
          updateTarotManualModalOpen(false);
          updateAnswerForm(prev => {
            return { ...prev, isSubmitted: false };
          });
          updateQuestionForm({
            question_topic: '',
            subject: '',
            object: '',
            relationship_subject: '',
            relationship_object: '',
            theme: '',
            situation: '',
            question: '',
            spreadTitle: '',
            cardCount: 0,
            spreadListNumber: 0,
            firstOption: '',
            secondOption: '',
            thirdOption: '',
          });
          if (isInstructionOpen) setInstructionOpen(false);
        }}
      >
        {t(`button.cancel`)}
      </CancelButton>
    </div>
  );
};
