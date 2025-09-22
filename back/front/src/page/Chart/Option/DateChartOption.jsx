import { useTranslation } from 'react-i18next';
import { findTopFrequentQuestionTopics } from '../../../function/findTopFrequentQuestionTopics';
import { findDatesOfTopic } from '../../../function/findQuestionsWithTheTopic';
import styles from '../../../styles/scss/_ChartInfoForm.module.scss';
import { findTopFrequentSubjects } from '../../../function/findTopFrequentSubjects';
import { findDatesOfSubjectWithQuestion } from '../../../function/findQuestionsWithTheSubject';
import React, { useEffect, useState } from 'react';
export const DateChartOption = ({
  tarotHistory,
  date,
  handleDatePath,
  statistics,
  questionTopic,
  subject,
  question,
  browserLanguage,
  ...props
}) => {
  const { t } = useTranslation();
  const [topTenArr, setTopTenArr] = useState([]);
  const [datesOfTopic, setDateOfTopic] = useState([]);
  const [datesOfSubjectWithQuestion, setDatesOfSubjectWithQuestion] = useState(
    []
  );
  const [datesArr, setDatesArr] = useState([]);
  useEffect(() => {
    if (statistics === t(`mypage.statistics-question-topic`)) {
      setTopTenArr(() => {
        return findTopFrequentQuestionTopics(
          tarotHistory,
          10, 
          browserLanguage
        );
      });
      setDateOfTopic(() => {
        const uniqueDatesSet = new Set(
          findDatesOfTopic(
            tarotHistory,
            questionTopic,
            question,
            browserLanguage
          )
        );
        setDatesArr(Array.from(uniqueDatesSet));
        return Array.from(uniqueDatesSet);
      });
    }
    if (statistics === t(`mypage.statistics-target`)) {
      setTopTenArr(() => {
        return findTopFrequentSubjects(
          tarotHistory,
          10, 
          browserLanguage
        );
      });
      setDatesOfSubjectWithQuestion(() => {
        const uniqueDatesSet = new Set(
          findDatesOfSubjectWithQuestion(
            tarotHistory,
            subject,
            question,
            browserLanguage
          )
        );
        setDatesArr(Array.from(uniqueDatesSet));
        return Array.from(uniqueDatesSet);
      });
    }
  }, [
    statistics,
    tarotHistory,
    subject,
    question,
    questionTopic,
    browserLanguage,
  ]);
  return (
    <div>
      {datesArr?.length > 0 && (
        <select
          name="chart-option"
          id="chart-option"
          className={styles['dates-of-topic']}
          value={date}
          onChange={handleDatePath}
        >
          <>
            <option value={t(`chart.statistics-total`)}>
              {t(`chart.statistics-total`)}
            </option>
            {datesArr?.map((elem, i) => {
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
