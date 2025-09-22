import { useState } from 'react';
const useAlertModalState = (inputState) => {
  const initialState = inputState !== null && inputState !== undefined ? inputState : false;
  const [isAlertModalOpen, setAlertModalOpen] = useState(initialState);
  const updateAlertModalOpen = (newIsAlertModalOpen) => {
    setAlertModalOpen(newIsAlertModalOpen);
  };
  return [isAlertModalOpen, updateAlertModalOpen];
};
export default useAlertModalState;
