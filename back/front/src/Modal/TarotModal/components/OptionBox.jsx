import { useTranslation } from 'react-i18next';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange';
import { InstructionButton } from '../../../UI/InstructionButton';
import fontStyles from '../../../styles/scss/_Font.module.scss';
export const OptionBox = ({
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
            <div className={styles['input-box-object']}>
              <div
                className={`${styles['label-box']} ${
                  browserLanguage === 'ja'
                    ? fontStyles['japanese-font-label']
                    : fontStyles['korean-font-label']
                }`}
              >
                <label className={styles['object-label']} htmlFor="firstOption">
                  {t(`question.first_option`)}
                </label>{' '}
                <InstructionButton
                  onClick={e => {
                    setInstructionOpen(prev => !prev);
                    setQuestionKind(7);
                  }}
                ></InstructionButton>
              </div>
              <div className={styles['input-box']}>
                <input
                  id="first_option"
                  name="firstOption"
                  type="text"
                  className={fontStyles['normal-font']}
                  value={
                    isSubmittedMode
                      ? questionForm['firstOption']
                      : questionFormInTarotModal['firstOption']
                  }
                  placeholder={
                    isSubmittedMode
                      ? questionForm['firstOption']?.length === 0
                        ? t('question.omitted')
                        : questionForm?.spreadListNumber === 304
                        ? t(`question.third_option_instruction1`)
                        : t(`question.first_option_instruction`)
                      : questionForm?.spreadListNumber === 304
                      ? t(`question.third_option_instruction1`)
                      : t(`question.first_option_instruction`)
                  }
                  onInput={e => {
                    if (e?.target?.value?.length > 100) return;
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
                <label
                  className={styles['object-label']}
                  htmlFor="secondOption"
                >
                  {t(`question.second_option`)}
                </label>{' '}
                <InstructionButton
                  onClick={e => {
                    setInstructionOpen(prev => !prev);
                    setQuestionKind(8);
                  }}
                ></InstructionButton>
              </div>
              <div className={styles['input-box']}>
                <input
                  id="second_option"
                  name="secondOption"
                  type="text"
                  className={fontStyles['normal-font']}
                  value={
                    isSubmittedMode
                      ? questionForm['secondOption']
                      : questionFormInTarotModal['secondOption']
                  }
                  placeholder={
                    isSubmittedMode
                      ? questionForm['secondOption']?.length === 0
                        ? t('question.omitted')
                        : questionForm?.spreadListNumber === 304
                        ? t(`question.third_option_instruction2`)
                        : t(`question.second_option_instruction`)
                      : questionForm?.spreadListNumber === 304
                      ? t(`question.third_option_instruction2`)
                      : t(`question.second_option_instruction`)
                  }
                  onInput={e => {
                    if (e?.target?.value?.length > 100) return;
                    handleQuestionFormInTarotModal(e);
                  }}
                  autoComplete="off"
                  readOnly={isSubmittedMode}
                />
              </div>
            </div>
            {questionForm?.spreadListNumber === 304 && (
              <div className={styles['input-box-object']}>
                <div
                  className={`${styles['label-box']} ${
                    browserLanguage === 'ja'
                      ? fontStyles['japanese-font-label']
                      : fontStyles['korean-font-label']
                  }`}
                >
                  <label
                    className={styles['object-label']}
                    htmlFor="thirdOption"
                  >
                    {t(`question.third_option`)}
                  </label>{' '}
                  <InstructionButton
                    onClick={e => {
                      setInstructionOpen(prev => !prev);
                      setQuestionKind(9);
                    }}
                  ></InstructionButton>
                </div>
                <div className={styles['input-box']}>
                  <input
                    id="third_option"
                    name="thirdOption"
                    type="text"
                    className={fontStyles['normal-font']}
                    value={
                      isSubmittedMode
                        ? questionForm['thirdOption']
                        : questionFormInTarotModal['thirdOption']
                    }
                    placeholder={
                      isSubmittedMode
                        ? questionForm['thirdOption']?.length === 0
                          ? t('question.omitted')
                          : questionForm?.spreadListNumber === 304
                          ? t(`question.third_option_instruction3`)
                          : t(`question.third_option_instruction3`)
                        : t(`question.third_option_instruction3`)
                    }
                    onInput={e => {
                      if (e?.target?.value?.length > 100) return;
                      handleQuestionFormInTarotModal(e);
                    }}
                    autoComplete="off"
                    readOnly={isSubmittedMode}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
