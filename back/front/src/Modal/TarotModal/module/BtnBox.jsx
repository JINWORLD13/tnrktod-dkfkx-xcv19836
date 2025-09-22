export const BtnBox = ({ styles, ...props }) => {
  return <div className={styles['btn-box']}>{props.children}</div>;
};
