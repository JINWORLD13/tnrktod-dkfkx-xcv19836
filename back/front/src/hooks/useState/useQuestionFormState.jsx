import { useState } from 'react';
const initialState = {
  question_topic: '',
  subject: '',
  object: '',
  relationship_subject: '',
  relationship_object: '',
  theme: '',
  situation: '',
  question: '',
  spreadTitle: '',
  cardCount: 0,
  spreadListNumber: 0,
  firstOption: '',
  secondOption: '',
  thirdOption: '',
};
const useQuestionFormState = (inputState = null) => {
  const getInitialState = () => {
    if (!inputState || typeof inputState !== 'object' || Object.keys(inputState)?.length === 0) {
      return initialState;
    }
    return {
      ...initialState,
      ...inputState
    };
  };
  const [questionForm, setQuestionForm] = useState(getInitialState());
  const updateQuestionForm = (newState) => {
    if (typeof newState === 'function') {
      setQuestionForm(prevState => ({
        ...initialState,
        ...prevState,
        ...newState(prevState)
      }));
    } else {
      setQuestionForm(prevState => ({
        ...initialState,
        ...prevState,
        ...newState
      }));
    }
  };
  return [questionForm, updateQuestionForm];
};
export default useQuestionFormState;
