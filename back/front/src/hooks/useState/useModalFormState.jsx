import { useState } from 'react';
const useModalFormState = (inputState) => {
  const initialState = inputState || { spread: false, tarot: false };
  const [modalForm, setModalForm] = useState(initialState);
  const updateModalForm = (newModalForm) => {
    setModalForm(newModalForm);
  };
  return [modalForm, updateModalForm];
};
export default useModalFormState;
