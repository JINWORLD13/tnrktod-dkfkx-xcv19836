import { useState, useCallback } from 'react';
const useTarotHistory = (initialValue = []) => {
  const [tarotHistory, setTarotHistory] = useState(initialValue);
  const updateTarotHistory = useCallback((newHistory) => {
    setTarotHistory(newHistory);
  }, []);
  return [tarotHistory, updateTarotHistory];
};
export default useTarotHistory;
