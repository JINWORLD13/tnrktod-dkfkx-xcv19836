export const initializeAdSense = async (
  setError,
  setAdLoaded,
  setIsLoading,
  handleConfirm
) => {
  const pushAd = () => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      if(setAdLoaded) setAdLoaded(true);
      if(setIsLoading) setIsLoading(false);
      if(handleConfirm) handleConfirm();
    } catch (e) {
      console.error('AdSense error:', e);
      setError(content?.errors?.AdSense_LOAD_FAILED);
      if(setIsLoading) setIsLoading(false);
      throw e;
    }
  };
  if (window.adsbygoogle) {
    pushAd();
    return () => {}; 
  } else {
    let attempts = 0;
    const maxAttempts = 4; 
    let timeoutId;
    const checkAdSense = async () => {
      while (attempts < maxAttempts) {
        if (window.adsbygoogle) {
          pushAd();
          return () => {
            if (timeoutId) clearTimeout(timeoutId);
          };
        }
        await new Promise(resolve => (timeoutId = setTimeout(resolve, 500)));
        attempts++;
      }
      setError('AdSense_NOT_AVAILABLE');
      if(setIsLoading) setIsLoading(false);
      throw new Error('AdSense not available after maximum attempts');
    };
    return await checkAdSense();
  }
};
