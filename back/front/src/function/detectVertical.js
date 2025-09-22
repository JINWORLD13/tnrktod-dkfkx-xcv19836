import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
export let detectVertical = () => {
  let browserWidth = window.innerWidth;
  let browserHeight = window.innerHeight;
  let screenWidth = window.screen.width;
  let screenHeight = window.screen.height;
  if (browserWidth * 1.32 <= browserHeight) {
    return true;
  }
  if (screenWidth * 1.32 < screenHeight) {
    return true;
  }
  return false;
};
export let isNativeAppVertical = () => {
  let screenWidth = window.screen.width;
  let screenHeight = window.screen.height;
  if (isNative && screenWidth * 1.2 < screenHeight) {
    return true;
  }
  return false;
};
