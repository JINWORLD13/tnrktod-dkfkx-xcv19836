import { Capacitor } from '@capacitor/core';
import { getAccessToken, getRefreshToken } from '../utils/tokenCookie.jsx';
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
export const tarotApi = {
  getHistory: async () => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.get('/tarot/history', {
        cancelToken: source.token || undefined,
      });
      return { response: res.data, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Error fetch tarot:', error);
        if (
          window.confirm('Network error occurred. Please connect internet.')
        ) {
          window.location.reload();
        } else {
          console.error('Error:', error);
        }
      } else {
        console.error('getHistory Error:', error);
      }
      return { response: null, cleanup };
    }
  },
  getHistoryForSub: async () => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.get('/tarot/history');
      return { response: res.data, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('getHistoryForSub Error:', error);
        if (
          window.confirm('Network error occurred. Please connect internet.')
        ) {
          window.location.reload();
        } else {
          console.error('Error:', error);
        }
      } else {
        console.error('getHistoryForSub Error:', error);
      }
      return { response: null, cleanup };
    }
  },
  postQuestionForPurchase: async form => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.post('/tarot/question', { ...form });
      return { response: res.data, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error(error);
        if (
          window.confirm('Network error occurred. Please connect internet.')
        ) {
          window.location.reload();
        } else {
          console.error('Error:', error);
        }
      } else {
        console.error('postQuestionForPurchase Error:', error);
      }
      return { response: null, cleanup };
    }
  },
  postQuestionForAds: async form => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.post('/tarot/question/ads', { ...form });
      return { response: res.data, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error(error);
        if (
          window.confirm('Network error occurred. Please connect internet.')
        ) {
          window.location.reload();
        } else {
          console.error('Error:', error);
        }
      } else {
        console.error('postQuestionForAds Error:', error);
      }
      return { response: null, cleanup };
    }
  },
  postQuestionForNormalForAnthropicAPI: async form => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.post('/tarot/question/normal', {
        ...form,
      });
      return { response: res.data, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error(error);
        if (
          window.confirm('Network error occurred. Please connect internet.')
        ) {
          window.location.reload();
        } else {
          console.error('Error:', error);
        }
      } else {
        console.error('postQuestionForNormalForAnthropicAPI Error:', error);
      }
      return { response: null, cleanup };
    }
  },
  postQuestionForDeepForAnthropicAPI: async form => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.post('/tarot/question/deep', { ...form });
      return { response: res.data, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error(error);
        if (
          window.confirm('Network error occurred. Please connect internet.')
        ) {
          window.location.reload();
        } else {
          console.error('Error:', error);
        }
      } else {
        console.error('postQuestionForDeepForAnthropicAPI Error:', error);
      }
      return { response: null, cleanup };
    }
  },
  postQuestionForSeriousForAnthropicAPI: async form => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.post('/tarot/question/serious', {
        ...form,
      });
      return { response: res.data, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error(error);
        if (
          window.confirm('Network error occurred. Please connect internet.')
        ) {
          window.location.reload();
        } else {
          console.error('Error:', error);
        }
      } else {
        console.error('postQuestionForSeriousForAnthropicAPI Error:', error);
      }
      return { response: null, cleanup };
    }
  },
  deleteHistory: async tarotHistoryData => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.delete('/tarot/delete', {
        data: { tarotHistoryData },
      });
      if (res.status === 204) {
        return { response: 'success', cleanup };
      }
      return { response: null, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('deleteHistory Error:', error);
        if (
          window.confirm('Network error occurred. Please connect internet.')
        ) {
          window.location.reload();
        } else {
          console.error('Error:', error);
        }
      } else {
        console.error('deleteHistory Error:', error);
      }
      return { response: null, cleanup };
    }
  },
  deleteAllHistory: async () => {
    const accessToken = await getAccessToken2();
    const refreshToken = await getRefreshToken2();
    const { apiWithTokens, cleanup } = apiWithTokensModule(
      accessToken,
      refreshToken
    );
    try {
      const res = await apiWithTokens.delete('/tarot/delete');
      if (res.status === 204) {
        return { response: 'success', cleanup };
      }
      return { response: null, cleanup };
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('deleteAllHistory Error:', error);
        if (
          window.confirm('Network error occurred. Please connect internet.')
        ) {
          window.location.reload();
        } else {
          console.error('Error:', error);
        }
      } else {
        console.error('deleteAllHistory Error:', error);
      }
      return { response: null, cleanup };
    }
  },
};
