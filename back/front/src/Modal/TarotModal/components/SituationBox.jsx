import { useTranslation } from 'react-i18next';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange';
import { InstructionButton } from '../../../UI/InstructionButton';
import fontStyles from '../../../styles/scss/_Font.module.scss';
export const SituationBox = ({
  styles,
  setInstructionOpen,
  setQuestionKind,
  questionFormInTarotModal,
  handleQuestionFormInTarotModal,
  questionForm,
  isSubmittedMode,
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
          <label htmlFor="situation">{t(`question.situation`)}</label>
          <InstructionButton
            onClick={e => {
              setInstructionOpen(prev => !prev);
              setQuestionKind(5);
            }}
          ></InstructionButton>
        </div>
        <div className={styles['textarea-box']}>
          {browserLanguage === 'en' ? (
            <textarea
              id="situation"
              name="situation"
              type="text"
              className={fontStyles['normal-font']}
              value={
                isSubmittedMode
                  ? (browserLanguage === 'en' &&
                      questionForm['situation']?.length > 600) ||
                    ((browserLanguage === 'ko' || browserLanguage === 'ja') &&
                      questionForm['situation']?.length > 400)
                    ? t('question.omitted')
                    : questionForm['situation']
                  : questionFormInTarotModal['situation']
              }
              placeholder={
                isSubmittedMode
                  ? questionForm['situation']?.length === 0
                    ? t('question.omitted')
                    : t('question.situation_instruction')
                  : t(`question.situation_instruction`)
              }
              onInput={e => {
                if (e?.target?.value?.length > 600) return;
                handleQuestionFormInTarotModal(e);
              }}
              autoComplete="off"
              readOnly={isSubmittedMode}
            />
          ) : (
            <textarea
              id="situation"
              name="situation"
              type="text"
              className={fontStyles['normal-font']}
              value={
                isSubmittedMode
                  ? (browserLanguage === 'en' &&
                      questionForm['situation']?.length > 600) ||
                    ((browserLanguage === 'ko' || browserLanguage === 'ja') &&
                      questionForm['situation']?.length > 400)
                    ? t('question.omitted')
                    : questionForm['situation']
                  : questionFormInTarotModal['situation']
              }
              placeholder={
                isSubmittedMode
                  ? questionForm['situation']?.length === 0
                    ? t('question.omitted')
                    : t('question.situation_instruction')
                  : t(`question.situation_instruction`)
              }
              onInput={e => {
                if (e?.target?.value?.length > 400) return;
                handleQuestionFormInTarotModal(e);
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
