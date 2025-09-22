export const setAccessToken = accessTokenKey => {
  if (accessTokenKey !== null && accessTokenKey !== undefined) {
    localStorage.setItem('accessToken', accessTokenKey);
  }
};
export const setRefreshToken = refreshTokenKey => {
  if (refreshTokenKey !== null && refreshTokenKey !== undefined) {
    localStorage.setItem('refreshToken', refreshTokenKey);
  }
};
export const getAccessToken = () => {
  const keyValue = localStorage?.getItem('accessToken') ?? null;
  const result = keyValue === undefined ? null : keyValue;
  return result;
};
export const getRefreshToken = () => {
  const keyValue = localStorage?.getItem('refreshToken') ?? null;
  const result = keyValue === undefined ? null : keyValue;
  return result;
};
export const hasAccessToken = () => {
  const accessToken = getAccessToken();
  if (accessToken === undefined) {
    return false;
  } else {
    return accessToken !== null; 
  }
};
export const hasRefreshToken = () => {
  const refreshToken = getRefreshToken();
  if (refreshToken === undefined) {
    return false;
  } else {
    return refreshToken !== null; 
  }
};
export const setGoogleAccessToken = accessTokenKey => {
  if (accessTokenKey !== null && accessTokenKey !== undefined) {
    localStorage.set('gAccessToken', accessTokenKey, { expires: 7 });
  }
};
export const setGoogleRefreshToken = refreshTokenKey => {
  if (refreshTokenKey !== null && refreshTokenKey !== undefined) {
    localStorage.set('gRefreshToken', refreshTokenKey, { expires: 7 });
  }
};
export const getGoogleAccessToken = () => {
  const keyValue = localStorage.get('gAccessToken') ?? null;
  const result = keyValue === undefined ? null : keyValue;
  return result; 
};
export const getGoogleRefreshToken = () => {
  const keyValue = localStorage.get('gRefreshToken') ?? null;
  const result = keyValue === undefined ? null : keyValue;
  return result;
};
export const hasGoogleAccessToken = () => {
  const gAccessToken = getGoogleAccessToken();
  if (gAccessToken === undefined) {
    return false;
  } else {
    return gAccessToken !== null;
  }
};
export const hasGoogleRefreshToken = () => {
  const gRefreshToken = getGoogleRefreshToken();
  if (gRefreshToken === undefined) {
    return false;
  } else {
    return gRefreshToken !== null;
  }
};
export const removeAccessTokens = () => {
  localStorage.remove('accessToken');
  localStorage.remove('gAccessToken');
};
export const removeRefreshTokens = () => {
  localStorage.remove('refreshToken');
  localStorage.remove('gRefreshToken');
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
export const setTodayCard = (todayCardIndex, userInfo) => {
  if (todayCardIndex !== null && todayCardIndex !== undefined) {
    const localDate = formatLocalDate();
    const cardData = {
      index: todayCardIndex,
      date: localDate,
    };
    localStorage.setItem(
      `todayCard-${userInfo?.email}`,
      JSON.stringify(cardData)
    );
  }
};
export const getTodayCard = (
  userInfo,
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
) => {
  try {
    if (
      !userInfo ||
      !userInfo?.email ||
      userInfo?.email === '' ||
      Object.keys(userInfo).length === 0
    )
      return null;
    const now = new Date();
    const cardKey = `todayCard-${userInfo?.email}`;
    const savedData = localStorage.getItem(`todayCard-${userInfo?.email}`);
    if (!savedData) return null;
    const cardData = JSON.parse(savedData);
    if (!cardData || !cardData.date) return null;
    const savedDate = new Date(cardData.date);
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const currentDateStr = formatter.format(now);
    const savedDateStr = formatter.format(savedDate);
    if (currentDateStr !== savedDateStr) {
      localStorage.removeItem(cardKey);
      return null;
    }
    if (cardData?.index === 0) return 0;
    return cardData?.index || null;
  } catch (e) {
    console.error('Error parsing today card data:', e);
    return null;
  }
};
export const removeTodayCards = userInfo => {
  localStorage.removeItem(`todayCard-${userInfo?.email}`);
};
export const localStorageForLockButton = {
  getItem(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
