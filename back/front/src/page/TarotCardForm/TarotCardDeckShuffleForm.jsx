import React from 'react';
import styles from '../../styles/scss/_TarotCardDeckShuffleForm.module.scss';
const TarotCardDeckShuffleForm = () => {
  let arr = [];
  for (let i = 1; i < 41; i++) {
    arr.push(i);
  }
  return (
    <>
      {arr.map((elem, i) => {
        return (
          <>
            <div className={`${styles.card} ${styles[`shuffle${elem}`]}`}>
              <img
                src={'/assets/images/tarot_card_back.jpg'}
                alt="back"
                draggable={false}
              />
            </div>
          </>
        );
      })}
    </>
  );
};
export default TarotCardDeckShuffleForm;
