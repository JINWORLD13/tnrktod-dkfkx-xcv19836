import { useTranslation } from 'react-i18next';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange';
import { InstructionButton } from '../../../UI/InstructionButton';
import fontStyles from '../../../styles/scss/_Font.module.scss';
export const QuestionBox = ({
  styles,
  setInstructionOpen,
  setQuestionKind,
  questionFormInTarotModal,
  handleQuestionFormInTarotModal,
  isSubmittedMode,
  questionForm,
  ...props
}) => {
  const browserLanguage = useLanguageChange();
  const { t } = useTranslation();
  return (
    <div
      className={`${
        isSubmittedMode ? styles['submitted-box'] : styles['question-box']
      }`}
    >
      <div className={styles['textarea-container']}>
        <div
          className={`${styles['label-box']} ${
            browserLanguage === 'ja'
              ? fontStyles['japanese-font-label']
              : fontStyles['korean-font-label']
          }`}
        >
          <label htmlFor="question" className={styles['question-label']}>
            {t(`question.question`)}
          </label>
          <InstructionButton
            onClick={e => {
              setInstructionOpen(prev => !prev);
              setQuestionKind(6);
            }}
          ></InstructionButton>
        </div>
        <div className={styles['textarea-box']}>
          {browserLanguage === 'en' ? (
            <textarea
              id="question"
              name="question"
              type="text"
              className={fontStyles['normal-font']}
              value={`${
                isSubmittedMode
                  ? questionForm?.spreadListNumber === 201 ||
                    questionForm?.spreadListNumber === 304
                    ? (browserLanguage === 'en' &&
                        questionForm['question']?.length > 1100) ||
                      ((browserLanguage === 'ko' || browserLanguage === 'ja') &&
                        questionForm['question']?.length > 700)
                      ? t('question.omitted')
                      : questionForm['question']
                    : (browserLanguage === 'en' &&
                        questionForm['question']?.length > 600) ||
                      ((browserLanguage === 'ko' || browserLanguage === 'ja') &&
                        questionForm['question']?.length > 400)
                    ? t('question.omitted')
                    : questionForm['question']
                  : questionFormInTarotModal['question']
              }`}
              placeholder={`${
                isSubmittedMode
                  ? questionForm['question']?.length === 0
                    ? t('question.omitted')
                    : t('question.six_principle_instruction')
                  : questionForm?.spreadListNumber === 201 ||
                    questionForm?.spreadListNumber === 304
                  ? t(`question.six_principle_instruction_options`)
                  : t(`question.six_principle_instruction`)
              }`}
              onInput={e => {
                if (
                  questionForm?.spreadListNumber === 201 ||
                  questionForm?.spreadListNumber === 304
                ) {
                  if (e?.target?.value?.length > 1100) return;
                  handleQuestionFormInTarotModal(e);
                } else {
                  if (e?.target?.value?.length > 600) return;
                  handleQuestionFormInTarotModal(e);
                }
              }}
              autoComplete="off"
              readOnly={isSubmittedMode}
            />
          ) : (
            <textarea
              id="question"
              name="question"
              type="text"
              className={fontStyles['normal-font']}
              value={`${
                isSubmittedMode
                  ? questionForm?.spreadListNumber === 201 ||
                    questionForm?.spreadListNumber === 304
                    ? (browserLanguage === 'en' &&
                        questionForm['question']?.length > 1100) ||
                      ((browserLanguage === 'ko' || browserLanguage === 'ja') &&
                        questionForm['question']?.length > 700)
                      ? t('question.omitted')
                      : questionForm['question']
                    : (browserLanguage === 'en' &&
                        questionForm['question']?.length > 600) ||
                      ((browserLanguage === 'ko' || browserLanguage === 'ja') &&
                        questionForm['question']?.length > 400)
                    ? t('question.omitted')
                    : questionForm['question']
                  : questionFormInTarotModal['question']
              }`}
              placeholder={`${
                isSubmittedMode
                  ? questionForm['question']?.length === 0
                    ? t('question.omitted')
                    : t('question.six_principle_instruction')
                  : questionForm?.spreadListNumber === 201 ||
                    questionForm?.spreadListNumber === 304
                  ? t(`question.six_principle_instruction_options`)
                  : t(`question.six_principle_instruction`)
              }`}
              onInput={e => {
                if (
                  questionForm?.spreadListNumber === 201 ||
                  questionForm?.spreadListNumber === 304
                ) {
                  if (e?.target?.value?.length > 700) return;
                  handleQuestionFormInTarotModal(e);
                } else {
                  if (e?.target?.value?.length > 400) return;
                  handleQuestionFormInTarotModal(e);
                }
              }}
              autoComplete="off"
              readOnly={isSubmittedMode}
            />
          )}
        </div>
      </div>
    </div>
  );
};
