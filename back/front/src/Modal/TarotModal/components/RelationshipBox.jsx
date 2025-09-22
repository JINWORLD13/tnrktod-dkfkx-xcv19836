import { useTranslation } from 'react-i18next';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange';
import { InstructionButton } from '../../../UI/InstructionButton';
import fontStyles from '../../../styles/scss/_Font.module.scss';
export const RelationshipBox = ({
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
        <div
          className={`${styles['label-box']} ${
            browserLanguage === 'ja'
              ? fontStyles['japanese-font-label']
              : fontStyles['korean-font-label']
          }`}
        >
          <div>{t(`question.relationships`)}</div>{' '}
          <InstructionButton
            onClick={e => {
              setInstructionOpen(prev => !prev);
              setQuestionKind(4);
            }}
          ></InstructionButton>
        </div>
        <div className={styles['input-box']}>
          <div className={`${styles['input-box-relationship']}`}>
            <div
              className={`${styles['input-box-subject']} ${
                browserLanguage === 'ja'
                  ? fontStyles['japanese-font-label']
                  : fontStyles['korean-font-label']
              }`}
            >
              <label htmlFor="relationship_subject">
                {t(`question.relationship_subject`)}
              </label>
              {window.screen.width > 1366 && (
                <input
                  id="relationship_subject"
                  className={`${styles['input-relationship']} ${fontStyles['normal-font']}`}
                  name="relationship_subject"
                  type="text"
                  value={
                    isSubmittedMode
                      ? questionForm['relationship_subject']
                      : questionFormInTarotModal['relationship_subject']
                  }
                  placeholder={
                    isSubmittedMode
                      ? questionForm['relationship_subject']?.length === 0
                        ? t('question.omitted')
                        : t('question.relationship_instruction_subject')
                      : t('question.relationship_instruction_subject')
                  }
                  onInput={e => {
                    if (e?.target?.value?.length > 40) return;
                    handleQuestionFormInTarotModal(e);
                  }}
                  autoComplete="off"
                  readOnly={isSubmittedMode}
                />
              )}
              {window.screen.width <= 1366 && (
                <input
                  id="relationship_subject"
                  className={`${styles['input-relationship']} ${fontStyles['normal-font']}`}
                  name="relationship_subject"
                  type="text"
                  value={
                    isSubmittedMode
                      ? questionForm['relationship_subject']
                      : questionFormInTarotModal['relationship_subject']
                  }
                  placeholder={
                    isSubmittedMode
                      ? questionForm['relationship_subject']?.length === 0
                        ? t('question.omitted')
                        : t('question.relationship_instruction_subject')
                      : t('question.relationship_instruction_subject')
                  }
                  onInput={e => {
                    if (e?.target?.value?.length > 40) return;
                    handleQuestionFormInTarotModal(e);
                  }}
                  autoComplete="off"
                  readOnly={isSubmittedMode}
                />
              )}
            </div>
            <div
              className={`${styles['input-box-object']} ${
                browserLanguage === 'ja'
                  ? fontStyles['japanese-font-label']
                  : fontStyles['korean-font-label']
              }`}
            >
              <label htmlFor="relationship_object">
                {t(`question.relationship_object`)}
              </label>
              {window.screen.width > 1366 && (
                <input
                  id="relationship_object"
                  className={`${styles['input-relationship']} ${fontStyles['normal-font']}`}
                  name="relationship_object"
                  type="text"
                  value={
                    isSubmittedMode
                      ? questionForm['relationship_object']
                      : questionFormInTarotModal['relationship_object']
                  }
                  placeholder={
                    isSubmittedMode
                      ? questionForm['relationship_object']?.length === 0
                        ? t('question.omitted')
                        : t('question.relationship_instruction_object')
                      : t('question.relationship_instruction_object')
                  }
                  onInput={e => {
                    if (e?.target?.value?.length > 40) return;
                    handleQuestionFormInTarotModal(e);
                  }}
                  autoComplete="off"
                  readOnly={isSubmittedMode}
                />
              )}
              {window.screen.width <= 1366 && (
                <input
                  id="relationship_object"
                  className={`${styles['input-relationship']} ${fontStyles['normal-font']}`}
                  name="relationship_object"
                  type="text"
                  value={
                    isSubmittedMode
                      ? questionForm['relationship_object']
                      : questionFormInTarotModal['relationship_object']
                  }
                  placeholder={
                    isSubmittedMode
                      ? questionForm['relationship_object']?.length === 0
                        ? t('question.omitted')
                        : t('question.relationship_instruction_object')
                      : t('question.relationship_instruction_object')
                  }
                  onInput={e => {
                    if (e?.target?.value?.length > 40) return;
                    handleQuestionFormInTarotModal(e);
                  }}
                  autoComplete="off"
                  readOnly={isSubmittedMode}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
