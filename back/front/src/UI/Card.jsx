import React from 'react';
import styles from '../styles/scss/_Card.module.scss';
const Card = props => {
  return (
    <div className={`${styles.card} ${props.className}`}>{props.children}</div>
  );
};
export default Card;
