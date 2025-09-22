import { Preferences } from '@capacitor/preferences';
const TOKEN_EXPIRATION_TIME = 1209600000; 
export const setAccessTokenForPreference = async (accessTokenKey) => {
  if (accessTokenKey !== null && accessTokenKey !== undefined) {
    const expiresAt = Date.now() + TOKEN_EXPIRATION_TIME;
    await Preferences.set({
      key: 'accessTokenCosmos',
      value: JSON.stringify({ token: accessTokenKey, expiresAt })
    });
  }
};
export const setRefreshTokenForPreference = async (refreshTokenKey) => {
  if (refreshTokenKey !== null && refreshTokenKey !== undefined) {
    const expiresAt = Date.now() + TOKEN_EXPIRATION_TIME;
    await Preferences.set({
      key: 'refreshTokenCosmos',
      value: JSON.stringify({ token: refreshTokenKey, expiresAt })
    });
  }
};
export const getAccessTokenForPreference = async () => {
  const { value } = await Preferences.get({ key: 'accessTokenCosmos' });
  if (value) {
    const { token, expiresAt } = JSON.parse(value);
    if (Date.now() < expiresAt) {
      return token;
    }
  }
  return null;
};
export const getRefreshTokenForPreference = async () => {
  const { value } = await Preferences.get({ key: 'refreshTokenCosmos' });
  if (value) {
    const { token, expiresAt } = JSON.parse(value);
    if (Date.now() < expiresAt) {
      return token;
    }
  }
  return null;
};
export const hasAccessTokenForPreference = async () => {
  const accessToken = await getAccessTokenForPreference();
  return accessToken !== null;
};
export const hasRefreshTokenForPreference = async () => {
  const refreshToken = await getRefreshTokenForPreference();
  return refreshToken !== null;
};
export const setGoogleAccessTokenForPreference = async (accessTokenKey) => {
  if (accessTokenKey !== null && accessTokenKey !== undefined) {
    const expiresAt = Date.now() + TOKEN_EXPIRATION_TIME;
    await Preferences.set({
      key: 'gAccessTokenCosmos',
      value: JSON.stringify({ token: accessTokenKey, expiresAt })
    });
  }
};
export const setGoogleRefreshTokenForPreference = async (refreshTokenKey) => {
  if (refreshTokenKey !== null && refreshTokenKey !== undefined) {
    const expiresAt = Date.now() + TOKEN_EXPIRATION_TIME;
    await Preferences.set({
      key: 'gRefreshTokenCosmos',
      value: JSON.stringify({ token: refreshTokenKey, expiresAt })
    });
  }
};
export const removeAccessTokensForPreference = async () => {
  await Preferences.remove({ key: 'accessTokenCosmos' });
  await Preferences.remove({ key: 'gAccessTokenCosmos' });
};
export const removeRefreshTokensForPreference = async () => {
  await Preferences.remove({ key: 'refreshTokenCosmos' });
  await Preferences.remove({ key: 'gRefreshTokenCosmos' });
};
