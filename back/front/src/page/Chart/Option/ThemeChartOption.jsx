import { useTranslation } from "react-i18next";
export const ThemeChartOption = ({ handleThemePath, theme, ...props }) => {
  const { t } = useTranslation();
  return (
    <div>
      <select
        name="chart-option"
        id="chart-option"
        onChange={handleThemePath}
        value={theme}
      >
        <option value={t(`question.inner_feelings`)}>
          {t(`question.inner_feelings`)}
        </option>
        <option value={t(`question.love`)}>{t(`question.love`)}</option>
        <option value={t(`question.human_relationships`)}>
          {t(`question.human_relationships`)}
        </option>
        <option value={t(`question.finance`)}>{t(`question.finance`)}</option>
        <option value={t(`question.occupation`)}>
          {t(`question.occupation`)}
        </option>
        <option value={t(`question.career`)}>{t(`question.career`)}</option>
        <option value={t(`question.decision_making`)}>
          {t(`question.decision_making`)}
        </option>
      </select>
    </div>
  );
};
