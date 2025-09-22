import { useTranslation } from 'react-i18next';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange';
import { InstructionButton } from '../../../UI/InstructionButton';
import fontStyles from '../../../styles/scss/_Font.module.scss';
export const TargetAndCounterpartBox = ({
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
      <div className={styles['input-container']}>
        <div className={styles['input-box']}>
          <div className={styles['input-box-relationship']}>
            <div className={styles['input-box-subject']}>
              <div
                className={`${styles['label-box']} ${
                  browserLanguage === 'ja'
                    ? fontStyles['japanese-font-label']
                    : fontStyles['korean-font-label']
                }`}
              >
                <label className={styles['subject-label']} htmlFor="subject">
                  {t(`question.subject`)}
                </label>{' '}
                <InstructionButton
                  onClick={e => {
                    setInstructionOpen(prev => !prev);
                    setQuestionKind(2);
                  }}
                ></InstructionButton>
              </div>
              <div className={styles['input-box']}>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className={`${fontStyles['normal-font']}`}
                  value={`${
                    isSubmittedMode
                      ? questionForm['subject']
                      : questionFormInTarotModal['subject']
                  }`}
                  placeholder={
                    isSubmittedMode
                      ? questionForm['subject']?.length === 0
                        ? t('question.omitted')
                        : t('question.entity_or_individual_subject_instruction')
                      : t(`question.entity_or_individual_subject_instruction`)
                  }
                  onInput={e => {
                    if (e?.target?.value?.length > 40) return;
                    handleQuestionFormInTarotModal(e);
                  }}
                  autoComplete="off"
                  readOnly={isSubmittedMode}
                />
              </div>
            </div>
            <div className={styles['input-box-object']}>
              <div
                className={`${styles['label-box']} ${
                  browserLanguage === 'ja'
                    ? fontStyles['japanese-font-label']
                    : fontStyles['korean-font-label']
                }`}
              >
                <label className={styles['object-label']} htmlFor="object">
                  {t(`question.object`)}
                </label>{' '}
                <InstructionButton
                  onClick={e => {
                    setInstructionOpen(prev => !prev);
                    setQuestionKind(3);
                  }}
                ></InstructionButton>
              </div>
              <div className={styles['input-box']}>
                <input
                  id="object"
                  name="object"
                  type="text"
                  className={`${fontStyles['normal-font']}`}
                  value={
                    isSubmittedMode
                      ? questionForm['object']
                      : questionFormInTarotModal['object']
                  }
                  placeholder={
                    isSubmittedMode
                      ? questionForm['object']?.length === 0
                        ? t('question.omitted')
                        : t('question.entity_or_individual_object_instruction')
                      : t(`question.entity_or_individual_object_instruction`)
                  }
                  onInput={e => {
                    if (e?.target?.value?.length > 40) return;
                    handleQuestionFormInTarotModal(e);
                  }}
                  autoComplete="off"
                  readOnly={isSubmittedMode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
