import {
  AdMob,
  RewardInterstitialAdPluginEvents,
} from '@capacitor-community/admob';
import { IS_PRODUCTION_MODE } from '../../function/IS_PRODUCTION_MODE';
import {
  getRewardForPreference,
  setRewardForPreference,
} from '../../utils/tokenPreference';
import { isNormalAccount } from '../../function/isNormalAccount';
export async function showRewardInterstitial(
  setError,
  setIsLoading,
  setAdmobReward,
  setAdsWatched,
  setAdWatchedOnlyForBlinkModal,
  setWhichAds,
  TEST_IDS,
  userInfo,
  setTarotAble = undefined,
  listeners = {}
) {
  try {
    listeners.loaded = AdMob.addListener(
      RewardInterstitialAdPluginEvents.Loaded,
      () => {
        try {
        } catch (error) {
          console.error('Failed to show reward interstitial ad:', error);
          setError('REWARD_INTERSTITIAL_SHOW_FAILED');
        }
      }
    );
    listeners.failedToLoaded = AdMob.addListener(
      RewardInterstitialAdPluginEvents.FailedToLoad,
      error => {
        console.error('Interstitial ad failed to load', error);
        setWhichAds(0); 
        setAdsWatched(false);
        setError('INTERSTITIAL_LOAD_FAILED');
      }
    );
    listeners.showed = AdMob.addListener(
      RewardInterstitialAdPluginEvents.Showed,
      () => {
        setIsLoading(false);
      }
    );
    listeners.dismissed = AdMob.addListener(
      RewardInterstitialAdPluginEvents.Dismissed,
      () => {
        setIsLoading(false);
        setWhichAds(0);
      }
    );
    listeners.rewarded = AdMob.addListener(
      RewardInterstitialAdPluginEvents.Rewarded,
      async reward => {
        if (setTarotAble) setTarotAble(true);
        const { type, amount } = reward;
        await setRewardForPreference(
          isNormalAccount(userInfo) ? type : 'coins', 
          amount,
          userInfo?.email
        );
        const rewardOfUser = await getRewardForPreference(
          isNormalAccount(userInfo) ? type : 'coins',
          userInfo?.email
        );
        setAdmobReward(prev => {
          if (rewardOfUser === null) return 0;
          return rewardOfUser;
        });
        setAdsWatched(true);
        if (setAdWatchedOnlyForBlinkModal !== undefined)
          setAdWatchedOnlyForBlinkModal(true);
        setWhichAds(0); 
      }
    );
    const rewardInterstitialOptions = {
      adId:
        IS_PRODUCTION_MODE && isNormalAccount(userInfo)
          ? '광고id' 
          : TEST_IDS.REWARD_INTERSTITIAL, 
      isTesting: IS_PRODUCTION_MODE && isNormalAccount(userInfo) ? false : true,
    };
    await AdMob.prepareRewardInterstitialAd(rewardInterstitialOptions);
    let rewardItem = await AdMob.showRewardInterstitialAd(); 
    if (!IS_PRODUCTION_MODE || !isNormalAccount(userInfo)) {
      console.log('Reward interstitial ad shown:', JSON.stringify(rewardItem));
    }
    return rewardItem || 1;
  } catch (error) {
    console.error('Failed to show reward interstitial ad:', error);
    setError('REWARD_INTERSTITIAL_SHOW_FAILED');
    setIsLoading(false);
    return;
  }
}
