import { Preferences } from '@capacitor/preferences';
import { IS_PRODUCTION_MODE } from '../Function/IS_PRODUCTION_MODE';
const TOKEN_EXPIRATION_TIME = 14 * 24 * 60 * 60 * 1000; 
const REWARD_EXPIRATION_TIME = 365 * 24 * 60 * 60 * 1000; 
const removeExpiredToken = async key => {
  const preferenceData = await Preferences.get({
    key,
  });
  if (!preferenceData) return false;
  const { value } = preferenceData; 
  if (!value) {
    return false; 
  }
  const { token, expiresAt } = JSON.parse(value); 
  if (token) {
    if (Date.now() >= expiresAt) {
      await Preferences.remove({ key });
      return true;
    }
  }
  return false;
};
const setTokenForPreference = async (key, tokenKey) => {
  if (tokenKey !== null && tokenKey !== undefined) {
    const expiresAt = Date.now() + TOKEN_EXPIRATION_TIME;
    await Preferences.set({
      key,
      value: JSON.stringify({ token: tokenKey, expiresAt }),
    });
  }
};
const getTokenForPreference = async key => {
  if (await removeExpiredToken(key)) {
    return null;
  }
  const preferenceData = await Preferences.get({
    key,
  });
  if (!preferenceData) return null;
  const { value } = preferenceData; 
  if (!value) {
    return null; 
  }
  const parsedValue = JSON.parse(value); 
  const { token, expiresAt } = parsedValue;
  if (token) {
    if (Date.now() < expiresAt) {
      return token;
    } else {
      return null;
    }
  }
  return null;
};
export const setAccessTokenForPreference = async accessTokenKey => {
  await setTokenForPreference('accessTokenCosmos', accessTokenKey);
};
export const setRefreshTokenForPreference = async refreshTokenKey => {
  await setTokenForPreference('refreshTokenCosmos', refreshTokenKey);
};
export const getAccessTokenForPreference = async () => {
  return await getTokenForPreference('accessTokenCosmos');
};
export const getRefreshTokenForPreference = async () => {
  return await getTokenForPreference('refreshTokenCosmos');
};
export const hasAccessTokenForPreference = async () => {
  const accessToken = await getAccessTokenForPreference();
  return accessToken !== null;
};
export const hasRefreshTokenForPreference = async () => {
  const refreshToken = await getRefreshTokenForPreference();
  return refreshToken !== null;
};
export const setGoogleAccessTokenForPreference = async accessTokenKey => {
  await setTokenForPreference('gAccessTokenCosmos', accessTokenKey);
};
export const setGoogleRefreshTokenForPreference = async refreshTokenKey => {
  await setTokenForPreference('gRefreshTokenCosmos', refreshTokenKey);
};
export const removeAccessTokensForPreference = async () => {
  await Preferences.remove({ key: 'accessTokenCosmos' });
  await Preferences.remove({ key: 'gAccessTokenCosmos' });
};
export const removeRefreshTokensForPreference = async () => {
  await Preferences.remove({ key: 'refreshTokenCosmos' });
  await Preferences.remove({ key: 'gRefreshTokenCosmos' });
};
export const removeAllExpiredTokens = async () => {
  await removeExpiredToken('accessTokenCosmos');
  await removeExpiredToken('refreshTokenCosmos');
  await removeExpiredToken('gAccessTokenCosmos');
  await removeExpiredToken('gRefreshTokenCosmos');
};
export const removeExpiredReward = async (
  rewardType = 'Voucher',
  userEmail
) => {
  const userAccount = userEmail?.split('@')[0];
  const preferenceData = await Preferences.get({
    key: rewardType + userAccount + IS_PRODUCTION_MODE,
  });
  if (!preferenceData) return false;
  const { value } = preferenceData; 
  if (!value) {
    return false; 
  }
  const parsedValue = JSON.parse(value); 
  if (parsedValue?.rewardAmount > 0) {
    if (Date.now() >= parsedValue.expiresAt) {
      await Preferences.remove({
        key: rewardType + userAccount + IS_PRODUCTION_MODE,
      });
      return true;
    } else {
      return false;
    }
  }
  return false;
};
export const setRewardForPreference = async (
  rewardType = 'Voucher',
  newRewardAmount,
  userEmail
) => {
  if (
    typeof newRewardAmount === 'number' &&
    !isNaN(newRewardAmount) &&
    typeof userEmail === 'string' &&
    userEmail?.length > 0
  ) {
    const userAccount = userEmail.split('@')[0];
    const preferenceData = await Preferences.get({
      key: rewardType + userAccount + IS_PRODUCTION_MODE,
    });
    if (!preferenceData) return;
    const { value } = preferenceData; 
    const parsedValue = JSON.parse(value); 
    let existingReward = { rewardAmount: 0, expiresAt: 0 };
    if (parsedValue?.rewardAmount > 0) {
      existingReward = parsedValue;
      if (Date.now() >= existingReward.expiresAt) {
        existingReward.rewardAmount = 0;
      } else {
        existingReward.rewardAmount = parsedValue?.rewardAmount;
      }
    } else {
      if (!IS_PRODUCTION_MODE) {
        console.log(
          `${
            rewardType + userAccount + IS_PRODUCTION_MODE
          }에 대한 새로운 Preference 생성`
        );
      }
    }
    const updatedRewardAmount = existingReward.rewardAmount + newRewardAmount;
    const expiresAt = Date.now() + REWARD_EXPIRATION_TIME;
    await Preferences.set({
      key: rewardType + userAccount + IS_PRODUCTION_MODE,
      value: JSON.stringify({ rewardAmount: updatedRewardAmount, expiresAt }),
    });
    if (!IS_PRODUCTION_MODE) {
      console.log(
        `${
          rewardType + userAccount + IS_PRODUCTION_MODE
        } 리워드 업데이트: ${updatedRewardAmount}`
      );
    }
  }
};
export const getRewardForPreference = async (
  rewardType = 'Voucher',
  userEmail
) => {
  const userAccount = userEmail?.split('@')[0];
  if (userEmail === undefined || userEmail === null || userEmail === '')
    return 0;
  if (userAccount) {
    const ResultOfRemove = await removeExpiredReward(rewardType, userEmail);
    if (ResultOfRemove) {
      return 0;
    }
    if (
      userEmail === undefined ||
      userEmail === null ||
      userEmail === '' ||
      userAccount === undefined ||
      userAccount === null
    )
      return 0;
    const preferenceData = await Preferences.get({
      key: rewardType + userAccount + IS_PRODUCTION_MODE,
    });
    if (!preferenceData) return 0;
    const { value } = preferenceData; 
    if (!value) {
      return 0; 
    }
    const parsedValue = JSON.parse(value); 
    if (parsedValue?.rewardAmount > 0) {
      if (Date.now() < parsedValue.expiresAt) {
        return parsedValue.rewardAmount;
      } else {
        return 0;
      }
    }
    return 0;
  }
};
export const useRewardForPreference = async (
  rewardType = 'Voucher',
  amountToUse = 1,
  userEmail
) => {
  const userAccount = userEmail?.split('@')[0];
  if (userAccount) {
    const isExpired = await removeExpiredReward(rewardType, userEmail);
    if (isExpired) {
      console.log(
        `${
          rewardType + userAccount + IS_PRODUCTION_MODE
        } 리워드가 만료되어 제거되었습니다.`
      );
      return false;
    }
    const currentReward = await getRewardForPreference(rewardType, userEmail);
    if (currentReward === null || currentReward < amountToUse) {
      console.log(
        `${
          rewardType + userAccount + IS_PRODUCTION_MODE
        } 리워드가 부족하거나 없습니다.`
      );
      return false;
    }
    const updatedRewardAmount = currentReward - amountToUse;
    const expiresAt = Date.now() + REWARD_EXPIRATION_TIME;
    await Preferences.set({
      key: rewardType + userAccount + IS_PRODUCTION_MODE,
      value: JSON.stringify({ rewardAmount: updatedRewardAmount, expiresAt }),
    });
    console.log(
      `${
        rewardType + userAccount + IS_PRODUCTION_MODE
      } 리워드 사용: ${amountToUse}, 남은 수량: ${updatedRewardAmount}`
    );
    return true;
  }
};
export const formatLocalDate = (
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
) => {
  const now = new Date();
  return now
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: timezone,
    })
    .replace(/\
};
export const setTodayCardForNative = async (todayCardIndex, userInfo) => {
  try {
    if (
      todayCardIndex !== null &&
      todayCardIndex !== undefined &&
      userInfo?.email
    ) {
      const localDate = formatLocalDate();
      const cardData = {
        index: todayCardIndex,
        date: localDate,
      };
      await Preferences.set({
        key: `todayCard-${userInfo?.email.split('@')[0]}`,
        value: JSON.stringify(cardData),
      });
    }
  } catch (error) {
    console.error('Error setting today card : ', error);
  }
};
export const getTodayCardForNative = async (
  userInfo,
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
) => {
  try {
    if (!userInfo || !userInfo?.email || userInfo?.email === '') return null;
    const cardKey = `todayCard-${userInfo?.email.split('@')[0]}`;
    const result = await Preferences.get({
      key: cardKey,
    });
    const savedData = result.value;
    if (!savedData) return null;
    const cardData = JSON.parse(savedData);
    if (!cardData || !cardData.date) return null;
    const savedDate = new Date(cardData.date);
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const currentDateStr = formatter.format(now);
    const savedDateStr = formatter.format(savedDate);
    if (currentDateStr !== savedDateStr) {
      await Preferences.remove({ key: cardKey }); 
      return null;
    }
    if (cardData?.index === 0) return 0;
    return cardData?.index ?? null;
  } catch (error) {
    console.error('Error getting today card : ', error);
    return null;
  }
};
export const removeTodayCardsForNative = async userInfo => {
  try {
    if (userInfo?.email) {
      await Preferences.remove({
        key: `todayCard-${userInfo?.email.split('@')[0]}`,
      });
    }
  } catch (error) {
    console.error('Error removing today cards : ', error);
  }
};
export const setAdsFree = async userInfo => {
  try {
    if (!userInfo?.email || userInfo?.email === '') return false;
    const emailPrefix = userInfo?.email.split('@')[0];
    const key = `AF-${emailPrefix}`;
    const randomResult = Math.round(Math.random()); 
    const { value } = await Preferences.get({ key });
    let adFreeHistory = value ? JSON.parse(value) : [];
    if (!adFreeHistory || adFreeHistory?.length === 0) {
      adFreeHistory.push(randomResult);
      await Preferences.set({ key, value: JSON.stringify(adFreeHistory) });
      return;
    }
    if (adFreeHistory?.length === 1) {
      adFreeHistory[0] === 1 ? adFreeHistory.push(0) : adFreeHistory.push(1);
      await Preferences.set({ key, value: JSON.stringify(adFreeHistory) }); 
      return;
    }
    if (adFreeHistory?.length >= 2) {
      adFreeHistory.shift(); 
      adFreeHistory[0] === 1 ? adFreeHistory.push(0) : adFreeHistory.push(1);
      await Preferences.set({ key, value: JSON.stringify(adFreeHistory) }); 
      return;
    }
  } catch (error) {
    console.error('Error in isAdsFree:', error);
  }
};
export const getAdsFree = async userInfo => {
  try {
    if (!userInfo?.email || userInfo?.email === '') return false;
    const emailPrefix = userInfo?.email.split('@')[0];
    const key = `AF-${emailPrefix}`;
    const { value } = await Preferences.get({ key });
    let adFreeHistory = value ? JSON.parse(value) : [];
    if (!adFreeHistory || adFreeHistory?.length === 0) {
      const randomResult = Math.round(Math.random()); 
      adFreeHistory.push(randomResult);
      await Preferences.set({ key, value: JSON.stringify(adFreeHistory) });
      return adFreeHistory[0] === 1; 
    }
    return adFreeHistory[adFreeHistory?.length - 1] === 1;
  } catch (error) {
    console.error('Error in isAdsFree:', error);
    return false; 
  }
};
export const preferenceForLockButton = {
  async getItem(key) {
    const { value } = await Preferences.get({ key });
    return value ? JSON.parse(value) : null;
  },
  async setItem(key, value) {
    await Preferences.set({
      key,
      value: JSON.stringify(value),
    });
  },
  async removeItem(key) {
    await Preferences.remove({ key });
  },
  async clear() {
    await Preferences.clear();
  },
};
