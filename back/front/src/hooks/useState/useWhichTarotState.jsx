import { useState } from 'react';
const useWhichTarotState = (inputState) => {
  const initialState = inputState !== null && inputState !== undefined ? inputState : 2; 
  const [whichTarot, setWhichTarot] = useState(initialState);
  const updateWhichTarot = (newWhichTarot) => {
    setWhichTarot(newWhichTarot);
  };
  return [whichTarot, updateWhichTarot];
};
export default useWhichTarotState;
