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
import styles from '../../../styles/scss/_SubjectChart.module.scss';
import {
  colors,
  allPeriodMajorToMinorSubjectData,
  allPeriodMinorCardSubjectData,
  minorColors,
} from '../../../function/subjectChartPeriodData.js';
import useWindowSizeState from '../../../hooks/useState/useWindowSizeState.jsx';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange.jsx';
import { formattingDate } from '../../../function/formattingDate.jsx';
import { useTranslation } from 'react-i18next';
export const SubjectChart = ({
  tarotHistory,
  subject,
  question,
  date,
  ...props
}) => {
  const browswerLanguage = useLanguageChange();
  const filteredTarotHistory = tarotHistory?.filter((elem, i) => {
    return (
      elem.language === browswerLanguage &&
      elem.questionInfo.subject === subject
    );
  });
  return (
    <div className={styles['container']}>
      <div className={styles['box']}>
        <AllPeriodMajorToMinorChart
          tarotHistory={filteredTarotHistory}
          subject={subject}
          question={question}
          date={date}
        />
      </div>
      <div className={styles['box']}>
        <AllPeriodMinorCardChart
          tarotHistory={filteredTarotHistory}
          subject={subject}
          question={question}
          date={date}
        />
      </div>
    </div>
  );
};
const AllPeriodMajorToMinorChart = ({
  tarotHistory,
  subject,
  question,
  date,
  ...props
}) => {
  const { windowWidth, windowHeight } = useWindowSizeState();
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  const filteredTarotHistory = tarotHistory?.filter((elem, i) => {
    let formattedDate = formattingDate(elem?.updatedAt, browserLanguage);
    if (question === t(`chart.statistics-total`)) {
      return true;
    }
    if (question === elem.questionInfo.question) {
      if (date === t(`chart.statistics-total`)) {
        return true;
      }
      if (formattedDate === date) {
        return true;
      }
    }
  });
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
          {allPeriodMajorToMinorSubjectData(
            filteredTarotHistory,
            subject,
            question
          ).map((totalCardPeriodDatum, i) => {
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
          })}
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
          {allPeriodMajorToMinorSubjectData(
            filteredTarotHistory,
            subject,
            question
          ).map((totalCardPeriodDatum, i) => {
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
          })}
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
          {allPeriodMajorToMinorSubjectData(
            filteredTarotHistory,
            subject,
            question
          ).map((totalCardPeriodDatum, i) => {
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
          })}
        </PieChart>
      )}
    </>
  );
};
const AllPeriodMinorCardChart = ({
  tarotHistory,
  subject,
  question,
  date,
  ...props
}) => {
  const { t } = useTranslation();
  const browserLanguage = useLanguageChange();
  const filteredTarotHistory = tarotHistory?.filter((elem, i) => {
    let formattedDate = formattingDate(elem?.updatedAt, browserLanguage);
    if (question === t(`chart.statistics-total`)) {
      return true;
    }
    if (question === elem.questionInfo.question) {
      if (date === t(`chart.statistics-total`)) {
        return true;
      }
      if (formattedDate === date) {
        return true;
      }
    }
  });
  return (
    <>
      {allPeriodMinorCardSubjectData(
        filteredTarotHistory,
        subject,
        question
      ).map((minorCardPeriodDatum, i) => {
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
      })}
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
