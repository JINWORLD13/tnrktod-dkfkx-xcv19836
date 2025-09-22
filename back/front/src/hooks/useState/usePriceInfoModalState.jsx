import { useState } from 'react';
const usePriceInfoModalState = (inputState) => {
  const initialState = inputState !== null && inputState !== undefined ? inputState : false;
  const [isPriceInfoModalOpen, setPriceInfoModalOpen] = useState(initialState);
  const updatePriceInfoModalOpen = (newPriceInfoModal) => {
    setPriceInfoModalOpen(newPriceInfoModal);
  };
  return [isPriceInfoModalOpen, updatePriceInfoModalOpen];
};
export default usePriceInfoModalState;
