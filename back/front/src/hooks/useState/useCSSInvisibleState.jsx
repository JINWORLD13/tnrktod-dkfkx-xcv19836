import { useState } from 'react';
const useCSSInvisibleState = (inputState) => {
  const initialState = inputState !== null && inputState !== undefined ? inputState : false;
  const [IsCSSInvisible, setIsCSSInvisible] = useState(initialState);
  const updateCSSInvisible = (newCSSInvisible) => {
    setIsCSSInvisible(newCSSInvisible);
  };
  return [IsCSSInvisible, updateCSSInvisible];
};
export default useCSSInvisibleState;
