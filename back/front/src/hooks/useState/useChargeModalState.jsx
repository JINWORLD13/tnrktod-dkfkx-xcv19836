import { useState } from 'react';
const useChargeModalState = (inputState) => {
  const initialState = inputState !== null && inputState !== undefined ? inputState : false;
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(initialState);
  const updateChargeModalOpen = (newBlinkModal) => {
    setIsChargeModalOpen(newBlinkModal);
  };
  return [isChargeModalOpen, updateChargeModalOpen];
};
export default useChargeModalState;
