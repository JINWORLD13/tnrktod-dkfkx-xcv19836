import styles from '../../styles/scss/_LoadingForm.module.scss';
const LoadingForm = () => {
  return (
    <>
      <div id="load" className={styles['container']}>
        {}
        <img src="/assets/loading/Spinner.gif" alt="Loading Spinner" />
        <img src="/assets/loading/Spinner.gif" alt="Loading Spinner" />
        <img src="/assets/loading/Spinner.gif" alt="Loading Spinner" />
      </div>
    </>
  );
};
export default LoadingForm;
