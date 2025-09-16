export const isNormalAccount = userInfo => {
  let email = userInfo?.email?.trim(); 
  if (email === import.meta.env.VITE_COS1) return false;
  return true;
};
