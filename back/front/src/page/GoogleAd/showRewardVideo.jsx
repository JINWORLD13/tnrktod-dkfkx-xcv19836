import { AdMob, RewardAdPluginEvents } from '@capacitor-community/admob';
import {
  getRewardForPreference,
  setRewardForPreference,
} from '../../utils/tokenPreference';
import { IS_PRODUCTION_MODE } from '../../function/IS_PRODUCTION_MODE';
import { isNormalAccount } from '../../function/isNormalAccount';
import { useEffect, useState } from 'react';
export async function showRewardVideo(
  setError,
  setIsLoading,
  setAdmobReward,
  setAdsWatched,
  setAdWatchedOnlyForBlinkModal,
  setWhichAds,
  TEST_IDS,
  userInfo,
  setTarotAble = undefined,
  handleClick = undefined,
  listeners={}
) {
  try {
    const option = {
      adId:
        IS_PRODUCTION_MODE && isNormalAccount(userInfo)
          ? '광고id'  
          : TEST_IDS.REWARD, 
      isTesting: IS_PRODUCTION_MODE && isNormalAccount(userInfo) ? false : true,
    };
    listeners.loaded = AdMob.addListener(RewardAdPluginEvents.Loaded, async () => {
      try {
      } catch (error) {
        console.error('Failed to show reward ad:', error);
        setError('REWARD_SHOW_FAILED');
      }
    });
    listeners.failedToLoad = AdMob.addListener(RewardAdPluginEvents.FailedToLoad, error => {
      console.error('Reward ad failed to load', JSON.stringify(error));
      setError('REWARD_LOAD_FAILED');
      setIsLoading(false);
      setWhichAds(0); 
    });
    listeners.showed = AdMob.addListener(RewardAdPluginEvents.Showed, () => {
      setIsLoading(false);
    });
    listeners.dismissed = AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
      console.log('Reward ad was dismissed before completion');
      setIsLoading(false);
      setWhichAds(0);
      setError('REWARD_CANCELLED');
    });
    listeners.rewarded = AdMob.addListener(RewardAdPluginEvents.Rewarded, async reward => {
      if (handleClick) handleClick();
      if (setTarotAble) setTarotAble(true);
      const { type, amount } = reward;
      await setRewardForPreference(
        IS_PRODUCTION_MODE && isNormalAccount(userInfo) ? type : 'coins', 
        amount * Math.ceil(3 * Math.random()), 
        userInfo?.email
      );
      const rewardOfUser = await getRewardForPreference(
        IS_PRODUCTION_MODE && isNormalAccount(userInfo) ? type : 'coins',
        userInfo?.email
      );
      setAdmobReward(prev => {
        if (!IS_PRODUCTION_MODE || !isNormalAccount(userInfo)) {
          console.log(
            '***********************************reward : ',
            rewardOfUser
          );
        }
        if (rewardOfUser === null) return 0;
        return rewardOfUser;
      });
      setAdsWatched(true);
      if (setAdWatchedOnlyForBlinkModal !== undefined)
        setAdWatchedOnlyForBlinkModal(true);
      setWhichAds(0); 
    });
    await AdMob.prepareRewardVideoAd(option);
    let rewardItem = await AdMob.showRewardVideoAd(); 
    return rewardItem;
  } catch (error) {
    console.error('Failed to show reward ad:', error);
    setError('REWARD_SHOW_FAILED');
    setIsLoading(false);
    return;
  }
}
