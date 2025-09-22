import { useState } from 'react';
const defaultState = {
  shuffle: 0,
  isReadyToShuffle: false,
  isShuffleFinished: false, 
  spread: false,
  flippedIndex: [],
  selectedCardIndexList: [],
};
const useCardFormState = (inputState = null) => {
  const getInitialState = () => {
    if (!inputState || typeof inputState !== 'object') {
      return defaultState;
    }
    return {
      ...defaultState,
      ...inputState
    };
  };
  const [cardForm, setCardForm] = useState(getInitialState());
  const updateCardForm = (newState) => {
    if (typeof newState === 'function') {
      setCardForm(prevState => ({
        ...defaultState,
        ...prevState,
        ...newState(prevState)
      }));
    } else {
      setCardForm(prevState => ({
        ...defaultState,
        ...prevState,
        ...newState
      }));
    }
  };
  return [cardForm, updateCardForm];
};
export default useCardFormState;
