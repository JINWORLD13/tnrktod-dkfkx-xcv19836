import { useTranslation } from 'react-i18next';
import * as tarotSubjectData from './tarotSubjectData.js';
const dailyColors = ['purple', '#D70B0D'];
const weeklyColors = ['#904CD7', '#FF8042'];
const monthlyColors = ['#9B582B', '#E0D700'];
const totalColors = ['#424ED1', '#8FE000'];
export const colors = [totalColors, monthlyColors, weeklyColors, dailyColors];
export const minorColors = ['#0088FE', '#00C49F', '#FF8042', '#9B582B'];
const TotalMajorToMinorSubjectData = (tarotHistory, subject, question) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-major-total`),
      value: tarotSubjectData.TotalMajorCount(tarotHistory, subject, question),
    },
    {
      name: t(`mypage.chart-minor-total`),
      value: tarotSubjectData.TotalMinorCount(tarotHistory, subject, question),
    },
  ];
};
const MonthlyMajorToMinorSubjectData = (tarotHistory, subject, question) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-major-this-month`),
      value: tarotSubjectData.MonthlyMajorCount(tarotHistory, subject, question),
    },
    {
      name: t(`mypage.chart-minor-this-month`),
      value: tarotSubjectData.MonthlyMinorCount(tarotHistory, subject, question),
    },
  ];
};
const WeeklyMajorToMinorSubjectData = (tarotHistory, subject, question) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-major-this-week`),
      value: tarotSubjectData.WeeklyMajorCount(tarotHistory, subject, question),
    },
    {
      name: t(`mypage.chart-minor-this-week`),
      value: tarotSubjectData.WeeklyMinorCount(tarotHistory, subject, question),
    },
  ];
};
const DailyMajorToMinorSubjectData = (tarotHistory, subject, question) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-major-today`),
      value: tarotSubjectData.DailyMajorCount(tarotHistory, subject, question),
    },
    {
      name: t(`mypage.chart-minor-today`),
      value: tarotSubjectData.DailyMinorCount(tarotHistory, subject, question),
    },
  ];
};
export const allPeriodMajorToMinorSubjectData = (tarotHistory, subject, question) => {
  return [
    TotalMajorToMinorSubjectData(tarotHistory, subject, question),
    MonthlyMajorToMinorSubjectData(tarotHistory, subject, question),
    WeeklyMajorToMinorSubjectData(tarotHistory, subject, question), 
    DailyMajorToMinorSubjectData(tarotHistory, subject, question),
  ];
};
const TotalMinorSubjectData = (tarotHistory, subject, question) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-cups-total`),
      value: tarotSubjectData.TotalCupsCount(tarotHistory, subject, question),
    },
    {
      name: t(`mypage.chart-swords-total`),
      value: tarotSubjectData.TotalSwordsCount(tarotHistory, subject, question),
    },
    {
      name: t(`mypage.chart-wands-total`),
      value: tarotSubjectData.TotalWandsCount(tarotHistory, subject, question),
    },
    {
      name: t(`mypage.chart-pentacles-total`),
      value: tarotSubjectData.TotalPentaclesCount(tarotHistory, subject, question),
    },
  ];
};
const MonthlyMinorSubjectData = (tarotHistory, subject, question) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-cups-this-month`),
      value: tarotSubjectData.MonthlyCupsCount(tarotHistory, subject, question),
    },
    {
      name: t(`mypage.chart-swords-this-month`),
      value: tarotSubjectData.MonthlySwordsCount(tarotHistory, subject, question),
    },
    {
      name: t(`mypage.chart-wands-this-month`),
      value: tarotSubjectData.MonthlyWandsCount(tarotHistory, subject, question),
    },
    {
      name: t(`mypage.chart-pentacles-this-month`),
      value: tarotSubjectData.MonthlyPentaclesCount(tarotHistory, subject, question),
    },
  ];
};
const WeeklyMinorSubjectData = (tarotHistory, subject, question) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-cups-this-week`),
      value: tarotSubjectData.WeeklyCupsCount(tarotHistory, subject, question),
    },
    {
      name: t(`mypage.chart-swords-this-week`),
      value: tarotSubjectData.WeeklySwordsCount(tarotHistory, subject, question),
    },
    {
      name: t(`mypage.chart-wands-this-week`),
      value: tarotSubjectData.WeeklyWandsCount(tarotHistory, subject, question),
    },
    {
      name: t(`mypage.chart-pentacles-this-week`),
      value: tarotSubjectData.WeeklyPentaclesCount(tarotHistory, subject, question),
    },
  ];
};
const DailyMinorSubjectData = (tarotHistory, subject, question) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-cups-today`),
      value: tarotSubjectData.DailyCupsCount(tarotHistory, subject, question),
    },
    {
      name: t(`mypage.chart-swords-today`),
      value: tarotSubjectData.DailySwordsCount(tarotHistory, subject, question),
    },
    {
      name: t(`mypage.chart-wands-today`),
      value: tarotSubjectData.DailyWandsCount(tarotHistory, subject, question),
    },
    {
      name: t(`mypage.chart-pentacles-today`),
      value: tarotSubjectData.DailyPentaclesCount(tarotHistory, subject, question),
    },
  ];
};
export const allPeriodMinorCardSubjectData = (tarotHistory, subject, question) => {
  return [
    TotalMinorSubjectData(tarotHistory, subject, question),
    MonthlyMinorSubjectData(tarotHistory, subject, question),
    WeeklyMinorSubjectData(tarotHistory, subject, question),
    DailyMinorSubjectData(tarotHistory, subject, question),
  ];
};
