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
import { apiWithTokensModule } from './api.jsx';
import axios from 'axios';
export const adsApi = {
  postAdMobReward: async form => {
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
      console.error(error);
      if (!axios.isCancel(error)) {
        if (
          window.confirm('Network error occurred. Please connect internet.')
        ) {
          window.location.reload();
        } else {
          if (error?.response) {
            console.error('SSV verification failed:', error?.response?.data);
          } else if (error?.request) {
            console.error('No response received:', error?.request);
          } else {
            console.error('Error setting up the request:', error?.message);
          }
          console.error('SSV verification failed');
        }
      } else {
        console.error('postQuestionForPurchase Error:', error);
      }
      return { data: null, cleanup }; 
    }
  },
};
