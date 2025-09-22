import { Capacitor } from '@capacitor/core';
import {
  getAccessToken,
  getRefreshToken,
  removeAccessTokens,
  removeRefreshTokens,
} from '../utils/tokenCookie.jsx';
import {
  getAccessTokenForPreference,
  getRefreshTokenForPreference,
} from '../utils/tokenPreference.jsx';
const isNative = Capacitor.isNativePlatform();
const getAccessToken2 = async () => {
  if (isNative) {
    return await getAccessTokenForPreference();
  } else {
    return getAccessToken();
  }
};
const getRefreshToken2 = async () => {
  if (isNative) {
    return await getRefreshTokenForPreference();
  } else {
    return getRefreshToken();
  }
};
import { apiWithTokensModule, source } from './api.jsx';
import axios from 'axios';
export const userApi = {
  modify: async form => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.put('/user/userinfo/change', { ...form });
      return { response: res.data.data, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('userApi modify Error:', error);
        if (
          window.confirm('Network error occurred. Please connect internet.')
        ) {
          window.location.reload();
        } else {
          console.error('userApi modify Error:', error);
        }
      } else {
        console.error('userApi modify Error:', error);
      }
      return { response: null, cleanup };
    }
  },
  withdraw: async () => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.delete('/user/userinfo/withdraw');
      if (res.status === 204) {
        return { response: res.status, cleanup };
      }
      return { response: null, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('userApi withdraw Error:', error);
        if (
          window.confirm('Network error occurred. Please connect internet.')
        ) {
          window.location.reload();
        } else {
          console.error('userApi withdraw Error:', error);
        }
      } else {
        console.error('userApi withdraw Error:', error);
      }
      return { response: null, cleanup };
    }
  },
  get: async () => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.get('/user/userinfo', {
        cancelToken: source.token || undefined,
      });
      if (res.status >= 200 && res.status < 300) {
        return { response: res.data.data, cleanup };
      }
      throw new Error('Failed to fetch user info');
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('userApi get Error:', error);
        if (
          window.confirm('Network error occurred. Please connect internet.')
        ) {
          window.location.reload();
        } else {
          console.error('userApi get Error:', error);
        }
      } else {
        console.error('userApi get Error:', error);
      }
      return { response: null, cleanup };
    }
  },
  getForSub: async () => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.get('/user/userinfo');
      if (res.status >= 200 && res.status < 300) {
        return { response: res.data.data, cleanup };
      }
      throw new Error('Failed to fetch user info');
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('userApi getForSub Error:', error);
        if (
          window.confirm('Network error occurred. Please connect internet.')
        ) {
          window.location.reload();
        } else {
          console.error('userApi getForSub Error:', error);
        }
      } else {
        console.error('userApi getForSub Error:', error);
      }
      return { response: null, cleanup };
    }
  },
};
