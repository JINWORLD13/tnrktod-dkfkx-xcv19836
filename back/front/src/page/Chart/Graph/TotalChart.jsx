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
import styles from '../../../styles/scss/_TotalChart.module.scss';
import {
  colors,
  allPeriodMajorToMinorData,
  allPeriodMinorCardData,
  minorColors,
} from '../../../function/totalChartPeriodData.js';
import useWindowSizeState from '../../../hooks/useState/useWindowSizeState.jsx';
import useLanguageChange from '../../../hooks/useEffect/useLanguageChange.jsx';
export const TotalChart = ({ tarotHistory, ...props }) => {
  const browswerLanguage = useLanguageChange();
  const filteredTarotHistory = tarotHistory?.filter((elem, i) => {
    return elem.language === browswerLanguage;
  });
  return (
    <div className={styles['container']}>
      <div className={styles['box']}>
        <AllPeriodMajorToMinorChart tarotHistory={filteredTarotHistory} />
      </div>
      <div className={styles['box']}>
        <AllPeriodMinorCardChart tarotHistory={filteredTarotHistory} />
      </div>
    </div>
  );
};
const AllPeriodMajorToMinorChart = ({ tarotHistory, ...props }) => {
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
          {allPeriodMajorToMinorData(tarotHistory).map(
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
          {allPeriodMajorToMinorData(tarotHistory).map(
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
          {allPeriodMajorToMinorData(tarotHistory).map(
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
const AllPeriodMinorCardChart = ({ tarotHistory, ...props }) => {
  return (
    <>
      {allPeriodMinorCardData(tarotHistory).map((minorCardPeriodDatum, i) => {
        return (
          <>
            <PieChart key={`PieChart-${i}`} width={200} height={230}>
              <Tooltip />
              <Legend />
              <Pie
                data={minorCardPeriodDatum}
                cx="50%"
                cy="50%"
                outerRadius={60}
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
