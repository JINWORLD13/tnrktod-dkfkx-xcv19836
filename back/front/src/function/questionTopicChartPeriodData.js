import { useTranslation } from 'react-i18next';
import * as tarotQuestionTopicData from './tarotQuestionTopicData.js';
const dailyColors = ['purple', '#D70B0D'];
const weeklyColors = ['#904CD7', '#FF8042'];
const monthlyColors = ['#9B582B', '#E0D700'];
const totalColors = ['#424ED1', '#8FE000'];
export const colors = [totalColors, monthlyColors, weeklyColors, dailyColors];
export const minorColors = ['#0088FE', '#00C49F', '#FF8042', '#9B582B'];
const TotalMajorToMinorQuestionTopicData = (tarotHistory, questionTopic, date) => {
  const { t } = useTranslation();
  return( [
    {
      name: t(`mypage.chart-major-total`),
      value: tarotQuestionTopicData.TotalMajorCount(tarotHistory, questionTopic, date),
    },
    {
      name: t(`mypage.chart-minor-total`),
      value: tarotQuestionTopicData.TotalMinorCount(tarotHistory, questionTopic, date),
    },
  ]);
};
const MonthlyMajorToMinorQuestionTopicData = (tarotHistory, questionTopic, date) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-major-this-month`),
      value: tarotQuestionTopicData.MonthlyMajorCount(tarotHistory, questionTopic, date),
    },
    {
      name: t(`mypage.chart-minor-this-month`),
      value: tarotQuestionTopicData.MonthlyMinorCount(tarotHistory, questionTopic, date),
    },
  ];
};
const WeeklyMajorToMinorQuestionTopicData = (tarotHistory, questionTopic, date) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-major-this-week`),
      value: tarotQuestionTopicData.WeeklyMajorCount(tarotHistory, questionTopic, date),
    },
    {
      name: t(`mypage.chart-minor-this-week`),
      value: tarotQuestionTopicData.WeeklyMinorCount(tarotHistory, questionTopic, date),
    },
  ];
};
const DailyMajorToMinorQuestionTopicData = (tarotHistory, questionTopic, date) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-major-today`),
      value: tarotQuestionTopicData.DailyMajorCount(tarotHistory, questionTopic, date),
    },
    {
      name: t(`mypage.chart-minor-today`),
      value: tarotQuestionTopicData.DailyMinorCount(tarotHistory, questionTopic, date),
    },
  ];
};
export const allPeriodMajorToMinorQuestionTopicData = (tarotHistory, questionTopic, date) => {
  return( [
    TotalMajorToMinorQuestionTopicData(tarotHistory, questionTopic, date),
    MonthlyMajorToMinorQuestionTopicData(tarotHistory, questionTopic, date),
    WeeklyMajorToMinorQuestionTopicData(tarotHistory, questionTopic, date),
    DailyMajorToMinorQuestionTopicData(tarotHistory, questionTopic, date),
  ])
};
const TotalMinorQuestionTopicData = (tarotHistory, questionTopic, date) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-cups-total`),
      value: tarotQuestionTopicData.TotalCupsCount(tarotHistory, questionTopic, date),
    },
    {
      name: t(`mypage.chart-swords-total`),
      value: tarotQuestionTopicData.TotalSwordsCount(tarotHistory, questionTopic, date),
    },
    {
      name: t(`mypage.chart-wands-total`),
      value: tarotQuestionTopicData.TotalWandsCount(tarotHistory, questionTopic, date),
    },
    {
      name: t(`mypage.chart-pentacles-total`),
      value: tarotQuestionTopicData.TotalPentaclesCount(tarotHistory, questionTopic, date),
    },
  ];
};
const MonthlyMinorQuestionTopicData = (tarotHistory, questionTopic, date) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-cups-this-month`),
      value: tarotQuestionTopicData.MonthlyCupsCount(tarotHistory, questionTopic, date),
    },
    {
      name: t(`mypage.chart-swords-this-month`),
      value: tarotQuestionTopicData.MonthlySwordsCount(tarotHistory, questionTopic, date),
    },
    {
      name: t(`mypage.chart-wands-this-month`),
      value: tarotQuestionTopicData.MonthlyWandsCount(tarotHistory, questionTopic, date),
    },
    {
      name: t(`mypage.chart-pentacles-this-month`),
      value: tarotQuestionTopicData.MonthlyPentaclesCount(tarotHistory, questionTopic, date),
    },
  ];
};
const WeeklyMinorQuestionTopicData = (tarotHistory, questionTopic, date) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-cups-this-week`),
      value: tarotQuestionTopicData.WeeklyCupsCount(tarotHistory, questionTopic, date),
    },
    {
      name: t(`mypage.chart-swords-this-week`),
      value: tarotQuestionTopicData.WeeklySwordsCount(tarotHistory, questionTopic, date),
    },
    {
      name: t(`mypage.chart-wands-this-week`),
      value: tarotQuestionTopicData.WeeklyWandsCount(tarotHistory, questionTopic, date),
    },
    {
      name: t(`mypage.chart-pentacles-this-week`),
      value: tarotQuestionTopicData.WeeklyPentaclesCount(tarotHistory, questionTopic, date),
    },
  ];
};
const DailyMinorQuestionTopicData = (tarotHistory, questionTopic, date) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-cups-today`),
      value: tarotQuestionTopicData.DailyCupsCount(tarotHistory, questionTopic, date),
    },
    {
      name: t(`mypage.chart-swords-today`),
      value: tarotQuestionTopicData.DailySwordsCount(tarotHistory, questionTopic, date),
    },
    {
      name: t(`mypage.chart-wands-today`),
      value: tarotQuestionTopicData.DailyWandsCount(tarotHistory, questionTopic, date),
    },
    {
      name: t(`mypage.chart-pentacles-today`),
      value: tarotQuestionTopicData.DailyPentaclesCount(tarotHistory, questionTopic, date),
    },
  ];
};
export const allPeriodMinorCardQuestionTopicData = (tarotHistory, questionTopic, date) => {
  return [
    TotalMinorQuestionTopicData(tarotHistory, questionTopic, date),
    MonthlyMinorQuestionTopicData(tarotHistory, questionTopic, date),
    WeeklyMinorQuestionTopicData(tarotHistory, questionTopic, date),
    DailyMinorQuestionTopicData(tarotHistory, questionTopic, date),
  ];
};
