import { useState } from 'react';
const useTarotManualModalState = (inputState) => {
  const initialState = inputState !== null && inputState !== undefined ? inputState : false;
  const [isTarotManualModalOpen, setTarotManualModalOpen] = useState(initialState);
  const updateTarotManualModalOpen = (newTarotManualModal) => {
    setTarotManualModalOpen(newTarotManualModal);
  };
  return [isTarotManualModalOpen, updateTarotManualModalOpen];
};
export default useTarotManualModalState;
