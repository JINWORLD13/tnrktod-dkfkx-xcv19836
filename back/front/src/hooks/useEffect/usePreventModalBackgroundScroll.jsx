import { useEffect, useState } from 'react';
const checkAnyModalOpen = modalStateArray => {
  return modalStateArray.some(modalState => modalState);
};
const usePreventModalBackgroundScroll = modalStates => {
  useEffect(() => {
    const isAnyModalOpen = checkAnyModalOpen([modalStates]);
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalStates]);
};
export default usePreventModalBackgroundScroll;
