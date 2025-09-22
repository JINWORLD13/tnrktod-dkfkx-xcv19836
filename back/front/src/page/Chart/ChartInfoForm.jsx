import React, { useState, useEffect } from 'react';
import styles from '../../styles/scss/_ChartInfoForm.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TotalChart } from './Graph/TotalChart.jsx';
import {
  MYPAGE_CHART_PATH,
  MYPAGE_SUBJECTCHART_PATH,
  MYPAGE_QUESTION_TOPIC_CHART_PATH,
  MYPAGE_THEMECHART_CAREER_PATH,
  MYPAGE_THEMECHART_DECISION_MAKING_PATH,
  MYPAGE_THEMECHART_FINANCE_PATH,
  MYPAGE_THEMECHART_INNER_FEELING_PATH,
  MYPAGE_THEMECHART_LOVE_PATH,
  MYPAGE_THEMECHART_OCCUPATION_PATH,
  MYPAGE_THEMECHART_PATH,
  MYPAGE_THEMECHART_RELATIONSHIP_PATH,
  MYPAGE_TOTALCHART_PATH,
} from '../../config/Route/UrlPaths.jsx';
import { ChartAnalysisDurumagiModal } from '../../Modal/ChartAnalysisDurumagiModal.jsx';
import { SubjectChart } from './Graph/SubjectChart.jsx';
import { findTopFrequentSubjects } from '../../function/findTopFrequentSubjects.jsx';
import { findTopFrequentQuestionTopics } from '../../function/findTopFrequentQuestionTopics.jsx';
import useLanguageChange from '../../hooks/useEffect/useLanguageChange.jsx';
import { QuestionTopicChart } from './Graph/QuestionTopicChart.jsx';
import { DateChartOption } from './Option/DateChartOption.jsx';
import { QuestionChartOption } from './Option/QuestionChartOption.jsx';
import { SubjectChartOption } from './Option/SubjectChartOption.jsx';
import { QuestionTopicChartOption } from './Option/QuestionTopicChartOption.jsx';
import { ChartOption } from './Option/ChartOption.jsx';
const ChartInfoForm = ({
  userInfo,
  tarotHistory,
  pathName,
  setPathName,
  statistics,
  setStatistics,
  theme,
  setTheme,
  subject,
  setSubject,
  date,
  setDate,
  questionTopic,
  setQuestionTopic,
  question,
  setQuestion,
  updateBlinkModalForSaveOpen,
  updateBlinkModalForCopyOpen,
  ...props
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const browserLanguage = useLanguageChange();
  const currentPath = location.pathname;
  const handlePath = async e => {
    const statisticsOption = e.target.value;
    setStatistics(prev => statisticsOption);
    if (statisticsOption === t(`mypage.statistics-total`)) {
      setPathName(`${MYPAGE_CHART_PATH}/${MYPAGE_TOTALCHART_PATH}`);
      navigate(`${MYPAGE_CHART_PATH + '/' + MYPAGE_TOTALCHART_PATH}`);
    }
    if (statisticsOption === t(`mypage.statistics-target`)) {
      const topTenSubjectArr = findTopFrequentSubjects(
        tarotHistory,
        10,
        browserLanguage
      );
      setSubject(prev => topTenSubjectArr[0]);
      setQuestion(prev => t(`chart.statistics-total`));
      setPathName(MYPAGE_SUBJECTCHART_PATH);
      navigate(`${MYPAGE_CHART_PATH + '/' + MYPAGE_SUBJECTCHART_PATH}`);
    }
    if (statisticsOption === t(`mypage.statistics-question-topic`)) {
      const topTenQuestionTopicsArr = findTopFrequentQuestionTopics(
        tarotHistory,
        10,
        browserLanguage
      );
      setQuestionTopic(prev => topTenQuestionTopicsArr[0]);
      setDate(prev => t(`chart.statistics-total`));
      setPathName(MYPAGE_QUESTION_TOPIC_CHART_PATH);
      navigate(`${MYPAGE_CHART_PATH + '/' + MYPAGE_QUESTION_TOPIC_CHART_PATH}`);
    }
  };
  const handleSubjectPath = async e => {
    const subjectStatisticsOption = e.target.value;
    setSubject(prev => {
      setQuestion(t(`chart.statistics-total`));
      return subjectStatisticsOption;
    });
  };
  const handleQuestionPath = async e => {
    const questionStatisticsOption = e.target.value;
    setQuestion(prev => {
      return questionStatisticsOption;
    });
  };
  const handleQuestionTopicPath = async e => {
    const questionTopicStatisticsOption = e.target.value;
    setQuestionTopic(prev => {
      setDate(t(`chart.statistics-total`));
      return questionTopicStatisticsOption;
    });
  };
  const handleDatePath = async e => {
    const dateStatisticsOption = e.target.value;
    setDate(prev => {
      return dateStatisticsOption;
    });
  };
  useEffect(() => {
    setStatistics('');
    setTheme('');
    setSubject('');
    setQuestionTopic('');
    setQuestion('');
  }, []);
  return (
    <div className={styles['chart-info']}>
      <div className={styles['chart']}>
        <div className={styles['chart-option']}>
          <ChartOption handlePath={handlePath} statistics={statistics} />
          {}
          {statistics === t(`mypage.statistics-question-topic`) ? (
            <QuestionTopicChartOption
              tarotHistory={tarotHistory}
              handleQuestionTopicPath={handleQuestionTopicPath}
              questionTopic={questionTopic}
              browserLanguage={browserLanguage}
            />
          ) : null}
          {statistics === t(`mypage.statistics-target`) ? (
            <SubjectChartOption
              tarotHistory={tarotHistory}
              handleSubjectPath={handleSubjectPath}
              subject={subject}
              browserLanguage={browserLanguage}
            />
          ) : null}
          {statistics === t(`mypage.statistics-question-topic`) ? (
            <DateChartOption
              tarotHistory={tarotHistory}
              date={date}
              handleDatePath={handleDatePath}
              statistics={statistics}
              questionTopic={questionTopic}
              subject={subject}
              question={question}
              browserLanguage={browserLanguage}
            />
          ) : null}
          {statistics === t(`mypage.statistics-target`) ? (
            <QuestionChartOption
              tarotHistory={tarotHistory}
              question={question}
              handleQuestionPath={handleQuestionPath}
              statistics={statistics}
              questionTopic={questionTopic}
              subject={subject}
              browserLanguage={browserLanguage}
            />
          ) : null}
          {statistics === t(`mypage.statistics-target`) ? (
            <DateChartOption
              tarotHistory={tarotHistory}
              date={date}
              handleDatePath={handleDatePath}
              statistics={statistics}
              questionTopic={questionTopic}
              subject={subject}
              question={question}
              browserLanguage={browserLanguage}
            />
          ) : null}
        </div>
        {pathName === `${MYPAGE_CHART_PATH}/${MYPAGE_TOTALCHART_PATH}` ? (
          <TotalChart tarotHistory={tarotHistory} />
        ) : null}
        {pathName === MYPAGE_QUESTION_TOPIC_CHART_PATH ? (
          <QuestionTopicChart
            tarotHistory={tarotHistory}
            questionTopic={questionTopic}
            date={date}
          />
        ) : null}
        {pathName === MYPAGE_SUBJECTCHART_PATH ? (
          <SubjectChart
            tarotHistory={tarotHistory}
            subject={subject}
            question={question}
            date={date}
          />
        ) : null}
        {}
      </div>
      <div className={styles['chart-analyze']}>
        <ChartAnalysisDurumagiModal
          updateBlinkModalForSaveOpen={updateBlinkModalForSaveOpen}
          updateBlinkModalForCopyOpen={updateBlinkModalForCopyOpen}
        />
      </div>
    </div>
  );
};
export default ChartInfoForm;
