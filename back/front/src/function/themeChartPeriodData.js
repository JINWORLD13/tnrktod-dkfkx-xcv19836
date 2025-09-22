import { useTranslation } from 'react-i18next';
import * as tarotThemeData from './tarotThemeData.js';
const dailyColors = ['purple', '#D70B0D'];
const weeklyColors = ['#904CD7', '#FF8042'];
const monthlyColors = ['#9B582B', '#E0D700'];
const totalColors = ['#424ED1', '#8FE000'];
export const colors = [totalColors, monthlyColors, weeklyColors, dailyColors];
export const minorColors = ['#0088FE', '#00C49F', '#FF8042', '#9B582B'];
const TotalMajorToMinorThemeData = (tarotHistory, themeForRender) => {
  const { t } = useTranslation();
  return( [
    {
      name: t(`mypage.chart-major-total`),
      value: tarotThemeData.TotalMajorCount(tarotHistory, themeForRender),
    },
    {
      name: t(`mypage.chart-minor-total`),
      value: tarotThemeData.TotalMinorCount(tarotHistory, themeForRender),
    },
  ]);
};
const MonthlyMajorToMinorThemeData = (tarotHistory, themeForRender) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-major-this-month`),
      value: tarotThemeData.MonthlyMajorCount(tarotHistory, themeForRender),
    },
    {
      name: t(`mypage.chart-minor-this-month`),
      value: tarotThemeData.MonthlyMinorCount(tarotHistory, themeForRender),
    },
  ];
};
const WeeklyMajorToMinorThemeData = (tarotHistory, themeForRender) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-major-this-week`),
      value: tarotThemeData.WeeklyMajorCount(tarotHistory, themeForRender),
    },
    {
      name: t(`mypage.chart-minor-this-week`),
      value: tarotThemeData.WeeklyMinorCount(tarotHistory, themeForRender),
    },
  ];
};
const DailyMajorToMinorThemeData = (tarotHistory, themeForRender) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-major-today`),
      value: tarotThemeData.DailyMajorCount(tarotHistory, themeForRender),
    },
    {
      name: t(`mypage.chart-minor-today`),
      value: tarotThemeData.DailyMinorCount(tarotHistory, themeForRender),
    },
  ];
};
export const allPeriodMajorToMinorThemeData = (tarotHistory, themeForRender) => {
  return( [
    TotalMajorToMinorThemeData(tarotHistory, themeForRender),
    MonthlyMajorToMinorThemeData(tarotHistory, themeForRender),
    WeeklyMajorToMinorThemeData(tarotHistory, themeForRender),
    DailyMajorToMinorThemeData(tarotHistory, themeForRender),
  ])
};
const TotalMinorThemeData = (tarotHistory, themeForRender) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-cups-total`),
      value: tarotThemeData.TotalCupsCount(tarotHistory, themeForRender),
    },
    {
      name: t(`mypage.chart-swords-total`),
      value: tarotThemeData.TotalSwordsCount(tarotHistory, themeForRender),
    },
    {
      name: t(`mypage.chart-wands-total`),
      value: tarotThemeData.TotalWandsCount(tarotHistory, themeForRender),
    },
    {
      name: t(`mypage.chart-pentacles-total`),
      value: tarotThemeData.TotalPentaclesCount(tarotHistory, themeForRender),
    },
  ];
};
const MonthlyMinorThemeData = (tarotHistory, themeForRender) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-cups-this-month`),
      value: tarotThemeData.MonthlyCupsCount(tarotHistory, themeForRender),
    },
    {
      name: t(`mypage.chart-swords-this-month`),
      value: tarotThemeData.MonthlySwordsCount(tarotHistory, themeForRender),
    },
    {
      name: t(`mypage.chart-wands-this-month`),
      value: tarotThemeData.MonthlyWandsCount(tarotHistory, themeForRender),
    },
    {
      name: t(`mypage.chart-pentacles-this-month`),
      value: tarotThemeData.MonthlyPentaclesCount(tarotHistory, themeForRender),
    },
  ];
};
const WeeklyMinorThemeData = (tarotHistory, themeForRender) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-cups-this-week`),
      value: tarotThemeData.WeeklyCupsCount(tarotHistory, themeForRender),
    },
    {
      name: t(`mypage.chart-swords-this-week`),
      value: tarotThemeData.WeeklySwordsCount(tarotHistory, themeForRender),
    },
    {
      name: t(`mypage.chart-wands-this-week`),
      value: tarotThemeData.WeeklyWandsCount(tarotHistory, themeForRender),
    },
    {
      name: t(`mypage.chart-pentacles-this-week`),
      value: tarotThemeData.WeeklyPentaclesCount(tarotHistory, themeForRender),
    },
  ];
};
const DailyMinorThemeData = (tarotHistory, themeForRender) => {
  const { t } = useTranslation();
  return [
    {
      name: t(`mypage.chart-cups-today`),
      value: tarotThemeData.DailyCupsCount(tarotHistory, themeForRender),
    },
    {
      name: t(`mypage.chart-swords-today`),
      value: tarotThemeData.DailySwordsCount(tarotHistory, themeForRender),
    },
    {
      name: t(`mypage.chart-wands-today`),
      value: tarotThemeData.DailyWandsCount(tarotHistory, themeForRender),
    },
    {
      name: t(`mypage.chart-pentacles-today`),
      value: tarotThemeData.DailyPentaclesCount(tarotHistory, themeForRender),
    },
  ];
};
export const allPeriodMinorCardThemeData = (tarotHistory, themeForRender) => {
  return [
    TotalMinorThemeData(tarotHistory, themeForRender),
    MonthlyMinorThemeData(tarotHistory, themeForRender),
    WeeklyMinorThemeData(tarotHistory, themeForRender),
    DailyMinorThemeData(tarotHistory, themeForRender),
  ];
};
