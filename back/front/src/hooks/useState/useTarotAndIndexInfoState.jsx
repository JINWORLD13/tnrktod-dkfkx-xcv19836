import { useState } from 'react';
const useTarotAndIndexInfoState = (inputState) => {
  const initialState = inputState !== null && inputState !== undefined ? inputState : {tarot: {}, index: 0};
  const [tarotAndIndexInfo, setTarotAndIndexInfo] = useState(initialState);
  const updateTarotAndIndexInfo = (newTarotAndIndexInfo) => {
    setTarotAndIndexInfo(newTarotAndIndexInfo);
  };
  return [tarotAndIndexInfo, updateTarotAndIndexInfo];
};
export default useTarotAndIndexInfoState;
