import { useTranslation } from "react-i18next";
import { findQuestionsOfSubject } from "../../../function/findQuestionsWithTheSubject";
import styles from '../../../styles/scss/_ChartInfoForm.module.scss';
export const QuestionChartOption = ({
  tarotHistory,
  question,
  handleQuestionPath,
  statistics,
  questionTopic,
  subject,
  browserLanguage,
  ...props
}) => {
  const { t } = useTranslation();
  let questionsOfSubject;
  if (statistics === t(`mypage.statistics-target`)) {
    questionsOfSubject = findQuestionsOfSubject(tarotHistory, subject);
    const uniqueQuestionsSet = new Set(questionsOfSubject);
    questionsOfSubject = Array.from(uniqueQuestionsSet);
  }
  return (
    <div>
      {questionsOfSubject?.length > 0 && (
        <select
          name="chart-option"
          id="chart-option"
          className={styles['questions-of-subject']}
          value={question}
          onChange={handleQuestionPath}
        >
          <>
            <option value={t(`chart.statistics-total`)}>
              {t(`chart.statistics-total`)}
            </option>
            {questionsOfSubject.map((elem, i) => {
              if (elem?.length > 50) {
                return (
                  <option value={elem} key={i}>{elem.slice(0, 48) + '...'}</option>
                );
              }
              return <option value={elem} key={i}>{elem}</option>;
            })}
          </>
        </select>
      )}
    </div>
  );
};
