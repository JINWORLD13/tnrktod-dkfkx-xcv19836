import { useState } from 'react';
const useCountryState = (inputState) => {
  const initialState = inputState !== null && inputState !== undefined ? inputState : '';
  const [country, setCountry] = useState(initialState);
  const updateCountry = (newCountry) => {
    setCountry(newCountry);
  };
  return [country, updateCountry];
};
export default useCountryState;
