import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
export const detectComputer = () => {
  if (isNative) return false;
  const userAgent = navigator.userAgent.toLowerCase();
  if (
    /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
  ) {
    return false;
  }
  if (
    /ipad|tablet/i.test(userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  ) {
    return false;
  }
  if (navigator.userAgentData?.mobile) {
    return false;
  }
  if (/windows phone/i.test(userAgent)) {
    return false;
  }
  if (userAgent.includes('linux') && !userAgent.includes('android')) {
    return true;
  }
  if (/windows|macintosh|mac os x/i.test(userAgent)) {
    return true;
  }
  const screenWidth = window.screen.width;
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (hasTouch && screenWidth < 1024) {
    return false;
  }
  return true;
};
