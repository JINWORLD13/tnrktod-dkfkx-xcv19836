import { useTranslation } from "react-i18next";
import { findTopFrequentSubjects } from "../../../function/findTopFrequentSubjects";
import styles from '../../../styles/scss/_ChartInfoForm.module.scss';
 export const SubjectChartOption = ({
  tarotHistory,
  handleSubjectPath,
  subject,
  browserLanguage,
  ...props
}) => {
  const { t } = useTranslation();
  const topTenArr = findTopFrequentSubjects(tarotHistory, 10, browserLanguage);
  return (
    <div>
      {topTenArr?.length > 0 && (
        <select
          name="chart-option"
          id="chart-option"
          className={styles['top-subjects']}
          onChange={handleSubjectPath}
          value={subject}
        >
          {topTenArr?.map((elem, i) => {
            return <option value={elem} key={i}>{elem}</option>;
          })}
        </select>
      )}
    </div>
  );
};
