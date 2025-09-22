import { AdMob, InterstitialAdPluginEvents } from '@capacitor-community/admob';
import { IS_PRODUCTION_MODE } from '../../function/IS_PRODUCTION_MODE';
import {
  getRewardForPreference,
  setRewardForPreference,
} from '../../utils/tokenPreference';
import { isNormalAccount } from '../../function/isNormalAccount';
import { useEffect, useState } from 'react';
export async function showInterstitial(
  setError,
  setIsLoading,
  setAdmobReward,
  setAdsWatched,
  setAdWatchedOnlyForBlinkModal,
  setWhichAds,
  TEST_IDS,
  userInfo,
  whichTarot = 1,
  setTarotAble = undefined,
  onSubmit = undefined,
  listeners = undefined
) {
  try {
    let id = (whichTarot, TEST_IDS) => {
      if (IS_PRODUCTION_MODE && isNormalAccount(userInfo)) {
        if (whichTarot === 1) {
          return '광고id' ; 
        }
        if (whichTarot === 2) {
          return '광고id' ; 
        }
        return TEST_IDS.INTERSTITIAL;
      } else {
        return TEST_IDS.INTERSTITIAL;
      }
    };
    const option = {
      adId: id(whichTarot, TEST_IDS),
      isTesting: IS_PRODUCTION_MODE && isNormalAccount(userInfo) ? false : true,
    };
    listeners.loaded = AdMob.addListener(
      InterstitialAdPluginEvents.Loaded,
      () => {
        if (whichTarot === 1) {
        } else if (whichTarot === 2) {
          try {
          } catch (error) {
            console.error('Failed to show interstitial ad:', error);
            setError('INTERSTITIAL_SHOW_FAILED');
          }
        }
      }
    );
    listeners.failedToLoad = AdMob.addListener(
      InterstitialAdPluginEvents.FailedToLoad,
      error => {
        console.error('Interstitial ad failed to load', error);
        if (whichTarot === 1) {
          setIsLoading(false);
          setWhichAds(0); 
          setAdsWatched(false); 
          setError('INTERSTITIAL_LOAD_FAILED'); 
        } else if (whichTarot === 2) {
          setWhichAds(0); 
          setAdsWatched(false);
          setError('INTERSTITIAL_LOAD_FAILED');
        }
      }
    );
    listeners.showed = AdMob.addListener(
      InterstitialAdPluginEvents.Showed,
      () => {
        setIsLoading(false);
      }
    );
    listeners.dismissed = AdMob.addListener(
      InterstitialAdPluginEvents.Dismissed,
      async () => {
        if (setTarotAble) setTarotAble(true);
        setWhichAds(0); 
        if (whichTarot === 1) {
          setAdsWatched(true);
        } else if (whichTarot === 2) {
          setAdsWatched(true); 
          if (onSubmit) await onSubmit();
        }
        setIsLoading(false);
      }
    );
    await AdMob.prepareInterstitial(option);
    await AdMob.showInterstitial();
    return 1; 
  } catch (err) {
    console.error('Failed to show interstitial:', error);
    setError('INTERSTITIAL_SHOW_FAILED');
    return 0; 
  }
}
