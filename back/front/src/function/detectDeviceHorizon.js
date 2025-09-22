export const detectDeviceHorizon = () => {
  var userAgent = navigator.userAgent.toLowerCase();
  var screenWidth = window.screen.width;
  var screenHeight = window.screen.height;
  if(screenWidth < screenHeight) return false;
  if (userAgent.includes('Linux') === true) {
    return false;
  }
  if (
    /mobi|BlackBerry|Windows Phone|Nokia|Android|iphone|ipad|Tablet/i.test(
      userAgent
    ) ||
    navigator.userAgentData.mobile ||
    navigator.userAgentData.platform === 'Android'
  ) {
    return true; 
  }
  return false; 
};
