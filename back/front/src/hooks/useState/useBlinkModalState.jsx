import { useState } from 'react';
const useBlinkModalState = (inputState) => {
  const initialState = inputState !== null && inputState !== undefined ? inputState : false;
  const [IsBlinkModalOpen, setIsBlinkModalOpen] = useState(initialState);
  const updateBlinkModalOpen = (newBlinkModal) => {
    setIsBlinkModalOpen(newBlinkModal);
  };
  return [IsBlinkModalOpen, updateBlinkModalOpen];
};
export default useBlinkModalState;
