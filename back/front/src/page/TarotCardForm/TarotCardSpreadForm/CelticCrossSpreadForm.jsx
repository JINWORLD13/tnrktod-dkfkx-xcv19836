import React from 'react';
import styles from '../../../styles/scss/_CelticCrossSpreadForm.module.scss';
import { CelticCross, CelticCrossForSpread } from '../TarotCardTableForm.jsx';
const CelticCrossSpreadForm = props => {
  return (
    <>
      <div className={styles['spread-container']}>
        <CelticCross
          whichCardPosition={props?.whichCardPosition}
          setWhichCardPosition={props?.setWhichCardPosition}
        />
        {}
      </div>
    </>
  );
};
export default CelticCrossSpreadForm;
