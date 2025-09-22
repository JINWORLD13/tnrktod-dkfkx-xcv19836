import { useCallback, useState } from 'react';
import { setTarotHistoryAction } from '../../data/reduxStore/tarotHistoryStore.jsx';
import { setUserInfoAction } from '../../data/reduxStore/userInfoStore.jsx';
export const userCacheForRedux = new Map();
export const tarotCacheForRedux = new Map();
const useFetchUserAndTarotDataWithRedux = (tarotApi, userApi, dispatch) => {
  const cleanupInterceptorArr = [];
  const [isActivated, setActivated] = useState(false);
  const getUserAndTarot = async () => {
    if (isActivated === true) return;
    setActivated(true);
    try {
      if (
        tarotCacheForRedux?.get('/tarot/history') === undefined ||
        tarotCacheForRedux?.get('/tarot/history') === null
      ) {
        let fetchedTarotData;
        const { response, cleanup: cleanupForGetHistory } =
          await tarotApi.getHistory();
        cleanupInterceptorArr.push(cleanupForGetHistory);
        fetchedTarotData = response;
        if (fetchedTarotData === undefined || fetchedTarotData === null) {
          const { response, cleanup: cleanupForGetHistorySub } =
            await tarotApi.getHistoryForSub();
          cleanupInterceptorArr.push(cleanupForGetHistorySub);
          fetchedTarotData = response;
        }
        tarotCacheForRedux?.set('/tarot/history', fetchedTarotData);
        dispatch(setTarotHistoryAction(fetchedTarotData)); 
      }
      if (
        userCacheForRedux?.get('/user/userinfo') === undefined ||
        userCacheForRedux?.get('/user/userinfo') === null
      ) {
        let fetchedUserData;
        const { response, cleanup: cleanupForGetUser } = await userApi.get();
        cleanupInterceptorArr.push(cleanupForGetUser);
        fetchedUserData = response;
        if (fetchedUserData === undefined || fetchedUserData === null) {
          const { response, cleanup: cleanupForGetUserSub } =
            await userApi.getForSub();
          cleanupInterceptorArr.push(cleanupForGetUserSub);
          fetchedUserData = response;
        }
        userCacheForRedux?.set('/user/userinfo', fetchedUserData);
        dispatch(setUserInfoAction(fetchedUserData)); 
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActivated(false);
    }
  };
  const clearCaches = useCallback(() => {
    tarotCacheForRedux.clear();
    userCacheForRedux.clear();
  }, []);
  return { getUserAndTarot, clearCaches, cleanupInterceptorArr };
};
export default useFetchUserAndTarotDataWithRedux;
