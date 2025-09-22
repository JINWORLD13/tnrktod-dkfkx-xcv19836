import { useState } from 'react';
const useTarotSpreadVoucherPriceState = inputState => {
  const initialState =
    inputState !== null && inputState !== undefined
      ? inputState
      : null;
  const [tarotSpreadVoucherPrice, setTarotSpreadVoucherPrice] =
    useState(initialState);
  const updateTarotSpreadVoucherPrice = newTarotSpreadVoucherPrice => {
    setTarotSpreadVoucherPrice(newTarotSpreadVoucherPrice);
  };
  return [tarotSpreadVoucherPrice, updateTarotSpreadVoucherPrice];
};
export default useTarotSpreadVoucherPriceState;
