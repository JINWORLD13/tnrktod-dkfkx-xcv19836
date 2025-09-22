import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
export let detectHorizon = () => {
  let browserWidth = window.innerWidth;
  let browserHeight = window.innerHeight;
  let screenWidth = window.screen.width;
  let screenHeight = window.screen.height;
  if (browserWidth > browserHeight * 1.32) {
    return true;
  }
  if (screenWidth >= screenHeight * 1.32) {
    return true;
  }
  return false;
};
export let isNativeAppHorizontal = () => {
  let screenWidth = window.screen.width;
  let screenHeight = window.screen.height;
  if (isNative && screenWidth > screenHeight * 1.2) {
    return true;
  }
  return false;
};
