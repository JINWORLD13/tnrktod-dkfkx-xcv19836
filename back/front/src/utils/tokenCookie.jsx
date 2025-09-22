import Cookies from  'js-cookie';
export const setAccessToken = accessTokenKey => {
  if (accessTokenKey !== null && accessTokenKey !== undefined) {
    Cookies.set('accessTokenCosmos', accessTokenKey, { expires: 14 });
  }
};
export const setRefreshToken = refreshTokenKey => {
  if (refreshTokenKey !== null && refreshTokenKey !== undefined) {
    Cookies.set('refreshTokenCosmos', refreshTokenKey, { expires: 14 });
  }
};
export const getAccessToken = () => {
  const keyValue = Cookies.get('accessTokenCosmos') ?? null;
  const result = keyValue === undefined ? null : keyValue;
  return result; 
};
export const getRefreshToken = () => {
  const keyValue = Cookies.get('refreshTokenCosmos') ?? null;
  const result = keyValue === undefined ? null : keyValue;
  return result;
};
export const hasAccessToken = () => {
  const accessToken = getAccessToken();
  if(accessToken === undefined) {
    return false;
  }else{
    return accessToken !== null; 
  }
};
export const hasRefreshToken = () => {
  const refreshToken = getRefreshToken();
  if(refreshToken === undefined) {
    return false;
  }else{
    return refreshToken !== null; 
  }
};
export const setGoogleAccessToken = accessTokenKey => {
  if (accessTokenKey !== null && accessTokenKey !== undefined) {
    Cookies.set('gAccessTokenCosmos', accessTokenKey, { expires: 7 });
  }
};
export const setGoogleRefreshToken = refreshTokenKey => {
  if (refreshTokenKey !== null && refreshTokenKey !== undefined) {
    Cookies.set('gRefreshTokenCosmos', refreshTokenKey, { expires: 7 });
  }
};
export const getGoogleAccessToken = () => {
  const keyValue = Cookies.get('gAccessTokenCosmos') ?? null;
  const result = keyValue === undefined ? null : keyValue;
  return result; 
};
export const getGoogleRefreshToken = () => {
  const keyValue = Cookies.get('gRefreshTokenCosmos') ?? null;
  const result = keyValue === undefined ? null : keyValue;
  return result;
};
export const hasGoogleAccessToken = () => {
  const gAccessToken = getGoogleAccessToken();
  if(gAccessToken === undefined) {
    return false;
  }else{
    return gAccessToken !== null;
  }
};
export const hasGoogleRefreshToken = () => {
  const gRefreshToken = getGoogleRefreshToken();
  if(gRefreshToken === undefined) {
    return false;
  }else{
    return gRefreshToken !== null;
  }
};
export const removeAccessTokens = () => {
  Cookies.remove('accessTokenCosmos');
  Cookies.remove('gAccessTokenCosmos');
};
export const removeRefreshTokens = () => {
  Cookies.remove('refreshTokenCosmos');
  Cookies.remove('gRefreshTokenCosmos');
};
