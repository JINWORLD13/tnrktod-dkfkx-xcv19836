import { useState } from 'react';
const useTarotSpreadPricePointState = (inputState) => {
  const initialState = inputState !== null && inputState !== undefined ? inputState : 0;
  const [tarotSpreadPricePoint, setTarotSpreadPricePoint] = useState(initialState);
  const updateTarotSpreadPricePoint = (newTarotSpreadPricePoint) => {
    setTarotSpreadPricePoint(newTarotSpreadPricePoint);
  };
  return [tarotSpreadPricePoint, updateTarotSpreadPricePoint];
};
export default useTarotSpreadPricePointState;
