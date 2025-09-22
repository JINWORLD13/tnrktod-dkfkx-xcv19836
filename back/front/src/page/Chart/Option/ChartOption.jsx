import React from 'react';
import { useTranslation } from "react-i18next";
import styles from '../../../styles/scss/_ChartInfoForm.module.scss';
 export const ChartOption = ({ handlePath, statistics, ...props }) => {
  const { t } = useTranslation();
  return (
    <div>
      <select
        name="chart-option"
        id="chart-option"
        className={styles['chart-select']}
        onChange={handlePath}
        value={statistics}
      >
        <option value={t(`mypage.statistics-total`)}>
          {t(`mypage.statistics-total`)}
        </option>
        <option value={t(`mypage.statistics-question-topic`)}>
          {t(`mypage.statistics-question-topic`)}
        </option>
        <option value={t(`mypage.statistics-target`)}>
          {t(`mypage.statistics-target`)}
        </option>
      </select>
    </div>
  );
};
