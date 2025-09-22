import React from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Pie,
  PieChart,
  Cell,
  Label,
  LabelList,
} from 'recharts';
import styles from '../../../styles/scss/_ThemeChart.module.scss';
import {
  MYPAGE_THEMECHART_CAREER_PATH,
  MYPAGE_THEMECHART_DECISION_MAKING_PATH,
  MYPAGE_THEMECHART_FINANCE_PATH,
  MYPAGE_THEMECHART_INNER_FEELING_PATH,
  MYPAGE_THEMECHART_LOVE_PATH,
  MYPAGE_THEMECHART_OCCUPATION_PATH,
  MYPAGE_THEMECHART_PATH,
  MYPAGE_THEMECHART_RELATIONSHIP_PATH,
  MYPAGE_TOTALCHART_PATH,
} from '../../../config/Route/UrlPaths.jsx';
import { useTranslation } from 'react-i18next';
import {
  colors,
  allPeriodMajorToMinorThemeData,
  allPeriodMinorCardThemeData,
  minorColors,
} from '../../../function/themeChartPeriodData.js';
import useWindowSizeState from '../../../hooks/useState/useWindowSizeState.jsx';
export const ThemeChart = ({
  tarotHistory,
  theme,
  pathName,
  setPathName,
  ...props
}) => {
  const { t } = useTranslation();
  let themeForRender;
  switch (pathName) {
    case MYPAGE_THEMECHART_INNER_FEELING_PATH:
      themeForRender = t(`question.inner_feelings`);
      break;
    case MYPAGE_THEMECHART_PATH:
      themeForRender = t(`question.inner_feelings`);
      break;
    case MYPAGE_THEMECHART_LOVE_PATH:
      themeForRender = t(`question.love`);
      break;
    case MYPAGE_THEMECHART_CAREER_PATH:
      themeForRender = t(`question.career`);
      break;
    case MYPAGE_THEMECHART_DECISION_MAKING_PATH:
      themeForRender = t(`question.decision_making`);
      break;
    case MYPAGE_THEMECHART_FINANCE_PATH:
      themeForRender = t(`question.finance`);
      break;
    case MYPAGE_THEMECHART_OCCUPATION_PATH:
      themeForRender = t(`question.occupation`);
      break;
    case MYPAGE_THEMECHART_RELATIONSHIP_PATH:
      themeForRender = t(`question.human_relationships`);
      break;
    default:
      break;
  }
  return (
    <div className={styles['container']}>
      <div className={styles['box']}>
        <AllPeriodMajorToMinorChart
          tarotHistory={tarotHistory}
          themeForRender={themeForRender}
        />
      </div>
      <div className={styles['box']}>
        <AllPeriodMinorCardChart
          tarotHistory={tarotHistory}
          themeForRender={themeForRender}
        />
      </div>
    </div>
  );
};
const AllPeriodMajorToMinorChart = ({
  tarotHistory,
  themeForRender,
  ...props
}) => {
  const { t } = useTranslation();
  const { windowWidth, windowHeight } = useWindowSizeState();
  return (
    <>
      {windowWidth <= 414 && (
        <PieChart key={`PieChart`} width={280} height={450}>
          <Tooltip />
          <Legend
            iconSize={15}
            iconType="circle"
            align="center" 
            verticalAlign="bottom"
            layout="vertical"
          />
          {allPeriodMajorToMinorThemeData(tarotHistory, themeForRender).map(
            (totalCardPeriodDatum, i) => {
              return (
                <Pie
                  data={totalCardPeriodDatum}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={35 * i}
                  outerRadius={35 + 30 * i}
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {totalCardPeriodDatum.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[i][index]} />
                  ))}
                </Pie>
              );
            }
          )}
        </PieChart>
      )}
      {windowWidth > 414 && windowWidth <= 768 && (
        <PieChart key={`PieChart`} width={280} height={450}>
          <Tooltip />
          <Legend
            iconSize={15}
            iconType="circle"
            align="center" 
            verticalAlign="bottom"
            layout="vertical"
          />
          {allPeriodMajorToMinorThemeData(tarotHistory, themeForRender).map(
            (totalCardPeriodDatum, i) => {
              return (
                <Pie
                  data={totalCardPeriodDatum}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={35 * i}
                  outerRadius={35 + 30 * i}
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {totalCardPeriodDatum.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[i][index]} />
                  ))}
                </Pie>
              );
            }
          )}
        </PieChart>
      )}
      {windowWidth > 768 && (
        <PieChart key={`PieChart`} width={500} height={270}>
          <Tooltip />
          <Legend
            iconSize={15}
            iconType="circle"
            align="right"
            verticalAlign="middle"
            layout="vertical"
          />
          {allPeriodMajorToMinorThemeData(tarotHistory, themeForRender).map(
            (totalCardPeriodDatum, i) => {
              return (
                <Pie
                  data={totalCardPeriodDatum}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={35 * i}
                  outerRadius={38 + 30 * i}
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {totalCardPeriodDatum.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[i][index]} />
                  ))}
                </Pie>
              );
            }
          )}
        </PieChart>
      )}
    </>
  );
};
const AllPeriodMinorCardChart = ({
  tarotHistory,
  themeForRender,
  ...props
}) => {
  return (
    <>
      {allPeriodMinorCardThemeData(tarotHistory, themeForRender).map(
        (minorCardPeriodDatum, i) => {
          return (
            <>
              <PieChart key={`PieChart-${i}`} width={200} height={230}>
                <Tooltip />
                <Legend />
                <Pie
                  data={minorCardPeriodDatum}
                  cx="50%"
                  cy="50%"
                  outerRadius={65}
                  labelLine={false}
                  label={renderCustomizedLabel1}
                >
                  {minorCardPeriodDatum.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={minorColors[index]} />
                  ))}
                </Pie>
              </PieChart>
            </>
          );
        }
      )}
    </>
  );
};
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const renderCustomizedLabel1 = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
