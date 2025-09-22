import { useTranslation } from "react-i18next";
import styles from '../../../styles/scss/_ChartInfoForm.module.scss';
import { findTopFrequentQuestionTopics } from "../../../function/findTopFrequentQuestionTopics";
 export const QuestionTopicChartOption = ({
  tarotHistory,
  handleQuestionTopicPath,
  questionTopic,
  browserLanguage,
  ...props
}) => {
  const { t } = useTranslation();
  const topTenArr = findTopFrequentQuestionTopics(
    tarotHistory,
    10, 
    browserLanguage
  );
  return (
    <div>
      {topTenArr?.length > 0 && (
        <select
          name="chart-option"
          id="chart-option"
          className={styles['top-question-topics']}
          onChange={handleQuestionTopicPath}
          value={questionTopic}
        >
          {topTenArr.map((elem, i) => {
            return <option value={elem}>{elem}</option>;
          })}
        </select>
      )}
    </div>
  );
};
