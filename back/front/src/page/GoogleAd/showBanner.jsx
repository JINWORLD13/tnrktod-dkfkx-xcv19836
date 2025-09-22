import {
  AdMob,
  BannerAdPluginEvents,
  BannerAdSize,
  BannerAdPosition,
} from '@capacitor-community/admob';
import { IS_PRODUCTION_MODE } from '../../function/IS_PRODUCTION_MODE';
import { isNormalAccount } from '../../function/isNormalAccount';
export async function showBanner(
  setError,
  TEST_IDS,
  userInfo,
  listeners = {},
  margin = 0,
  position = BannerAdPosition.BOTTOM_CENTER
) {
  try {
    const option = {
      adId:
        IS_PRODUCTION_MODE && isNormalAccount(userInfo)
          ? '광고id'  
          : TEST_IDS?.ADAPTIVE_BANNER, 
      isTesting: IS_PRODUCTION_MODE && isNormalAccount(userInfo) ? false : true,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position,
      margin,
    };
    listeners.loaded = AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
    });
    listeners.failedToLoad = AdMob.addListener(
      BannerAdPluginEvents.FailedToLoad,
      error => {
        console.error('Banner ad failed to load', error);
        setError('BANNER_LOAD_FAILED');
      }
    );
    listeners.opened = AdMob.addListener(BannerAdPluginEvents.Opened, () => {
    });
    await AdMob.showBanner(option);
    return 1; 
  } catch (error) {
    console.error('Failed to show banner:', error);
    setError('BANNER_SHOW_FAILED');
    return 0; 
  }
}
