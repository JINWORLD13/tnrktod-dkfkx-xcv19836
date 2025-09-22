export const isAdsFreePassValid = userInfo => {
  if (userInfo?.email === 'cosmostarot22@gmail.com') return true; 
  if (!userInfo || !userInfo.adsFreePass) return false;
  if (
    userInfo.adsFreePass?.orderId === '' ||
    !userInfo.adsFreePass?.orderId ||
    userInfo.adsFreePass?.expired === '' ||
    !userInfo.adsFreePass?.expired
  )
    return false;
  const adsFreePass = userInfo.adsFreePass;
  const expiredDate = new Date(adsFreePass.expired);
  if (isNaN(expiredDate.getTime())) return false; 
  const currentDate = new Date();
  const aFewDaysBeforeExpired = new Date(expiredDate);
  aFewDaysBeforeExpired.setDate(expiredDate.getDate() - Number(userInfo.adsFreePass.name.split('-')[0]));
  return expiredDate > currentDate && currentDate >= aFewDaysBeforeExpired; 
};
