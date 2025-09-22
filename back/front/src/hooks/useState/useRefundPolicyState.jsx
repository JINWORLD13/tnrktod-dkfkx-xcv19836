import { useState } from 'react';
const useRefundPolicyState = (inputState) => {
  const initialState = inputState !== null && inputState !== undefined ? inputState : false;
  const [isRefundPolicyOpen, setRefundPolicyOpen] = useState(initialState);
  const updateRefundPolicyOpen = (newRefundPolicyModal) => {
    setRefundPolicyOpen(newRefundPolicyModal);
  };
  return [isRefundPolicyOpen, updateRefundPolicyOpen];
};
export default useRefundPolicyState;
