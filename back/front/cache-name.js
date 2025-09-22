import CryptoJS from 'crypto-js';
const currentTime = Date.now().toString();
export const CACHE_NAME =
  'cosmos-tarot-cache-' +
  new Date().toISOString().split('-')[0].slice(2, 4) +
  '-' +
  CryptoJS.SHA256(currentTime).toString();
export const CACHE_ID = CryptoJS.SHA256(currentTime).toString();
