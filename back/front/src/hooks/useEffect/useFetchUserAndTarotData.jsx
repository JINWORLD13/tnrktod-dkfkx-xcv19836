import { useCallback, useMemo } from 'react';
const useFetchUserAndTarotData = (
  tarotApi,
  userApi,
  updateTarotHistory,
  setUserInfo
) => {
  const tarotCache = new Map();
  const userCache = new Map();
  const memoizedTarotData = useMemo(
    () => tarotCache.get('/tarot/history'),
    [tarotCache.size]
  );
  const memoizedUserData = useMemo(
    () => userCache.get('/user/userinfo'),
    [userCache.size]
  );
  const getUserAndTarot = useCallback(async () => {
    try {
      if (memoizedTarotData === undefined || memoizedTarotData === null) {
        const fetchedTarotData = await tarotApi.getHistory();
        tarotCache.set('/tarot/history', fetchedTarotData);
        updateTarotHistory(fetchedTarotData);
      }
      if (memoizedUserData === undefined || memoizedUserData === null) {
        const fetchedUserData = await userApi.get();
        userCache.set('/user/userinfo', fetchedUserData);
        setUserInfo(fetchedUserData);
      }
    } catch (err) {
      console.error(err);
    }
  }, [memoizedTarotData, memoizedUserData]);
  const clearCaches = useCallback(() => {
    tarotCache.clear();
    userCache.clear();
  }, []);
  return { getUserAndTarot, clearCaches };
};
export default useFetchUserAndTarotData;
