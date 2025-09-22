import { useState } from 'react';
const initialState = {
  questionInfo: {
    question_topic: '',
    subject: '',
    object: '',
    relationship_subject: '',
    relationship_object: '',
    theme: '',
    situation: '',
    question: '',
    firstOption: '',
    secondOption: '',
    thirdOption: '',
  },
  spreadInfo: {
    spreadTitle: '',
    cardCount: 0,
    spreadListNumber: 0,
    selectedTarotCardsArr: [],
  },
  answer: '',
  language: '',
  timeOfCounselling: '',
  createdAt: '',
  updatedAt: '',
  isSubmitted: false,
  isWaiting: false,
  isAnswered: false,
};
const useAnswerFormState = (inputState = null) => {
  const getInitialState = () => {
    if (!inputState || typeof inputState !== 'object') {
      return initialState;
    }
    return {
      ...initialState,
      ...inputState,
    };
  };
  const [answerForm, setAnswerForm] = useState(getInitialState());
  const updateAnswerForm = newState => {
    if (typeof newState === 'function') {
      setAnswerForm(prevState => ({
        ...initialState,
        ...prevState,
        ...newState(prevState),
      }));
    } else {
      setAnswerForm(prevState => ({
        ...initialState,
        ...prevState,
        ...newState,
      }));
    }
  };
  return [answerForm, updateAnswerForm];
};
export default useAnswerFormState;
