import { useTranslation } from 'react-i18next';
import * as tarotData from './tarotData.js';
const dailyColors = ['purple', '#D70B0D'];
const weeklyColors = ['#904CD7', '#FF8042'];
const monthlyColors = ['#9B582B', '#E0D700'];
const totalColors = ['#424ED1', '#8FE000'];
export const colors = [totalColors, monthlyColors, weeklyColors, dailyColors];
export const minorColors = ['#0088FE', '#00C49F', '#FF8042', '#9B582B'];
const TotalMajorToMinorData = tarotHistory => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-major-total`),
      value: tarotData.TotalMajorCount(tarotHistory),
    },
    {
      name: t(`mypage.chart-minor-total`),
      value: tarotData.TotalMinorCount(tarotHistory),
    },
  ];
};
const MonthlyMajorToMinorData = tarotHistory => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-major-this-month`),
      value: tarotData.MonthlyMajorCount(tarotHistory),
    },
    {
      name: t(`mypage.chart-minor-this-month`),
      value: tarotData.MonthlyMinorCount(tarotHistory),
    },
  ];
};
const WeeklyMajorToMinorData = tarotHistory => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-major-this-week`),
      value: tarotData.WeeklyMajorCount(tarotHistory),
    },
    {
      name: t(`mypage.chart-minor-this-week`),
      value: tarotData.WeeklyMinorCount(tarotHistory),
    },
  ];
};
const DailyMajorToMinorData = tarotHistory => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-major-today`),
      value: tarotData.DailyMajorCount(tarotHistory),
    },
    {
      name: t(`mypage.chart-minor-today`),
      value: tarotData.DailyMinorCount(tarotHistory),
    },
  ];
};
export const allPeriodMajorToMinorData = tarotHistory => {
  return [
    TotalMajorToMinorData(tarotHistory),
    MonthlyMajorToMinorData(tarotHistory),
    WeeklyMajorToMinorData(tarotHistory),
    DailyMajorToMinorData(tarotHistory),
  ];
};
const TotalMinorData = tarotHistory => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-cups-total`),
      value: tarotData.TotalCupsCount(tarotHistory),
    },
    {
      name: t(`mypage.chart-swords-total`),
      value: tarotData.TotalSwordsCount(tarotHistory),
    },
    {
      name: t(`mypage.chart-wands-total`),
      value: tarotData.TotalWandsCount(tarotHistory),
    },
    {
      name: t(`mypage.chart-pentacles-total`),
      value: tarotData.TotalPentaclesCount(tarotHistory),
    },
  ];
};
const MonthlyMinorData = tarotHistory => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-cups-this-month`),
      value: tarotData.MonthlyCupsCount(tarotHistory),
    },
    {
      name: t(`mypage.chart-swords-this-month`),
      value: tarotData.MonthlySwordsCount(tarotHistory),
    },
    {
      name: t(`mypage.chart-wands-this-month`),
      value: tarotData.MonthlyWandsCount(tarotHistory),
    },
    {
      name: t(`mypage.chart-pentacles-this-month`),
      value: tarotData.MonthlyPentaclesCount(tarotHistory),
    },
  ];
};
const WeeklyMinorData = tarotHistory => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-cups-this-week`),
      value: tarotData.WeeklyCupsCount(tarotHistory),
    },
    {
      name: t(`mypage.chart-swords-this-week`),
      value: tarotData.WeeklySwordsCount(tarotHistory),
    },
    {
      name: t(`mypage.chart-wands-this-week`),
      value: tarotData.WeeklyWandsCount(tarotHistory),
    },
    {
      name: t(`mypage.chart-pentacles-this-week`),
      value: tarotData.WeeklyPentaclesCount(tarotHistory),
    },
  ];
};
const DailyMinorData = tarotHistory => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-cups-today`),
      value: tarotData.DailyCupsCount(tarotHistory),
    },
    {
      name: t(`mypage.chart-swords-today`),
      value: tarotData.DailySwordsCount(tarotHistory),
    },
    {
      name: t(`mypage.chart-wands-today`),
      value: tarotData.DailyWandsCount(tarotHistory),
    },
    {
      name: t(`mypage.chart-pentacles-today`),
      value: tarotData.DailyPentaclesCount(tarotHistory),
    },
  ];
};
export const allPeriodMinorCardData = tarotHistory => {
  return [
    TotalMinorData(tarotHistory),
    MonthlyMinorData(tarotHistory),
    WeeklyMinorData(tarotHistory),
    DailyMinorData(tarotHistory),
  ];
};
