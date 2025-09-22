import axios from 'axios';
import { setAccessToken } from '../utils/tokenCookie.jsx';
const serverUrl = import.meta.env.VITE_SERVER_URL;
export const source = axios.CancelToken.source(); 
const setupInterceptors = api => {
  const responseInterceptorId = api.interceptors.response.use(
    response => {
      const newAccessToken = response?.data?.newAccessToken ?? null;
      if (newAccessToken !== null && !response.config._retry) {
        setAccessToken(newAccessToken);
        response.config.headers.Authorization = `Bearer ${newAccessToken}`;
        response.config._retry = true;
        return api(response.config);
      }
      return response;
    },
    async error => {
      return Promise.reject(error);
    }
  );
  return () => {
    api.interceptors.response.eject(responseInterceptorId);
  };
};
export const apiModule = () => {
  const api = axios.create({
    baseURL: serverUrl,
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      'X-Client-Type': 'web',
    },
  });
  return { api }; 
};
export const apiWithTokensModule = (accessToken, refreshToken) => {
  const apiWithTokens = axios.create({
    baseURL: serverUrl,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`, 
      'Refresh-Token': `${refreshToken}`, 
      accept: 'application/json',
      'X-Client-Type': 'web', 
    },
  });
  const cleanup = setupInterceptors(apiWithTokens);
  return { apiWithTokens, cleanup }; 
};
