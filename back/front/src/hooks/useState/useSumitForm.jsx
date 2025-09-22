import { useState, useCallback } from 'react';
const useSubmitFormState = (inputState) => {
  const getDefaultState = () => ({
    questionInfo: {
      question_topic: '',
      subject: '',
      object: '',
      relationship_subject: '',
      relationship_object: '',
      theme: '',
      situation: '',
      question: '',
    },
    spreadInfo: {
      spreadTitle: '',
      cardCount: 0,
      spreadListNumber: 0,
      selectedTarotCardsArr: [],
    },
  });
  const initialState = inputState || getDefaultState();
  const [submitForm, setSubmitForm] = useState(initialState);
  const updateSubmitForm = useCallback((newSubmitForm) => {
    setSubmitForm(newSubmitForm);
  }, []);
  return [submitForm, updateSubmitForm];
};
export default useSubmitFormState;
