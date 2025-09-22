import { IS_PRODUCTION_MODE } from '../../../function/IS_PRODUCTION_MODE';
import { isNormalAccount } from '../../../function/isNormalAccount';
import {
  getAdsFree,
  getRewardForPreference,
  setAdsFree,
  useRewardForPreference,
} from '../../../utils/tokenPreference';
const isNative = Capacitor.isNativePlatform();
export const useRewardFromPreference = async ({
  userInfo,
  whichAds,
  whichTarot,
  isVoucherModeOn,
  setAdmobReward,
}) => {
  if (
    (whichAds === 0 || whichAds === 2 || whichAds === 4) &&
    whichTarot === 2 &&
    isNative &&
    !isVoucherModeOn
  ) {
    let type =
      IS_PRODUCTION_MODE && isNormalAccount(userInfo) ? 'Voucher' : 'coins';
    let amount = IS_PRODUCTION_MODE && isNormalAccount(userInfo) ? 1 : 10;
    await useRewardForPreference(type, amount, userInfo?.email);
    const rewardOfUser = await getRewardForPreference(type, userInfo?.email);
    setAdmobReward(prev => {
      if (rewardOfUser === null) return 0;
      return rewardOfUser;
    });
  }
};
