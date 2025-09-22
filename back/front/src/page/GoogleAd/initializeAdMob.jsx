import React, { useEffect, useCallback, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import {
  AdMob,
  AdmobConsentStatus,
  AdmobConsentDebugGeography,
  MaxAdContentRating,
} from '@capacitor-community/admob';
import { showRewardVideo } from './showRewardVideo';
import { showInterstitial } from './showInterstitial';
import { IS_PRODUCTION_MODE } from '../../function/IS_PRODUCTION_MODE';
import { showBanner } from './showBanner';
import { showRewardInterstitial } from './showRewardInterstitial';
import { isNormalAccount } from '../../function/isNormalAccount';
export const initializeAdMob = async ({
  setError = undefined,
  setIsLoading = undefined,
  setAdmobReward = undefined,
  setAdsWatched = undefined,
  setAdWatchedOnlyForBlinkModal = undefined,
  setWhichAds = undefined,
  whichAds = 1,
  whichTarot = 1,
  userInfo = {},
  content = {},
  setTarotAble = undefined,
  onSubmit = undefined,
  handleClick = undefined,
  listeners = {},
  margin = 0,
  position = "BOTTOM_CENTER", 
}) => {
  try {
    const TEST_IDS = {
      ADAPTIVE_BANNER: 'ca-app-pub-3940256099942544/6300978111',
      INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
      REWARD_INTERSTITIAL: 'ca-app-pub-3940256099942544/5354046379',
      REWARD: 'ca-app-pub-3940256099942544/5224354917',
      NATIVE_ADVANCED: 'ca-app-pub-3940256099942544/2247696110',
      NATIVE_ADVANCED_VIDEO: 'ca-app-pub-3940256099942544/1044960115',
    };
    let adMobInitOptions;
    if (!IS_PRODUCTION_MODE || !isNormalAccount(userInfo)) {
      adMobInitOptions = {
        testingDevices: ['E074094C7BF0529EFC739D4B3A49031F'], 
        initializeForTesting: true, 
        maxAdContentRating: MaxAdContentRating.Teen,
      };
    } else {
      adMobInitOptions = {
        maxAdContentRating: MaxAdContentRating.Teen, 
        tagForChildDirectedTreatment: false, 
        tagForUnderAgeOfConsent: false, 
      };
    }
    await AdMob.initialize(adMobInitOptions);
    const handleErrorIfConsentDeniedOrUnknown = async status => {
      if (status === AdmobConsentStatus.UNKNOWN) {
        console.log('Consent denied or unknown. Cannot proceed with ads.');
        await AdMob.resetConsentInfo();
        setError(content?.errors?.CONSENT_REQUIRED);
        setIsLoading(false);
        setWhichAds(0); 
      }
    };
    const [trackingInfo, consentInfo] = await Promise.all([
      Capacitor.getPlatform() === 'ios'
        ? await AdMob.trackingAuthorizationStatus()
        : { status: '없음' },
      !IS_PRODUCTION_MODE || !isNormalAccount(userInfo)
        ? AdMob.requestConsentInfo({
            debugGeography: AdmobConsentDebugGeography.EEA, 
            testDeviceIdentifiers: ['E074094C7BF0529EFC739D4B3A49031F'],
          })
        : AdMob.requestConsentInfo(), 
    ]);
    if (
      trackingInfo.status === 'notDetermined' &&
      Capacitor.getPlatform() === 'ios'
    ) {
      await AdMob.requestTrackingAuthorization();
    }
    const authorizationStatus = await AdMob.trackingAuthorizationStatus();
    if (consentInfo.status === AdmobConsentStatus.UNKNOWN) {
      if (
        (Capacitor.getPlatform() !== 'ios' ||
          (Capacitor.getPlatform() === 'ios' &&
            authorizationStatus.status === 'authorized')) &&
        consentInfo.isConsentFormAvailable
      ) {
        const { status } = await AdMob.showConsentForm();
        await handleErrorIfConsentDeniedOrUnknown(status);
      }
    }
    else if (consentInfo.status === AdmobConsentStatus.REQUIRED) {
      if (
        (Capacitor.getPlatform() !== 'ios' ||
          (Capacitor.getPlatform() === 'ios' &&
            trackingInfo.status === 'authorized')) &&
        consentInfo.isConsentFormAvailable
      ) {
        const { status } = await AdMob.showConsentForm();
        await handleErrorIfConsentDeniedOrUnknown(status);
      }
    }
    else if (consentInfo.status === AdmobConsentStatus.OBTAINED) {
      console.log('Consent already obtained, proceeding with ads');
    }
    if (setIsLoading) {
      setIsLoading(false);
    }
    if (whichAds === 1) {
      return await showInterstitial(
        setError,
        setIsLoading,
        setAdmobReward,
        setAdsWatched,
        setAdWatchedOnlyForBlinkModal,
        setWhichAds,
        TEST_IDS,
        userInfo,
        whichTarot,
        setTarotAble,
        onSubmit,
        listeners
      );
    } else if (whichAds === 2) {
      return await showRewardVideo(
        setError,
        setIsLoading,
        setAdmobReward,
        setAdsWatched,
        setAdWatchedOnlyForBlinkModal,
        setWhichAds,
        TEST_IDS,
        userInfo,
        setTarotAble,
        handleClick,
        listeners
      );
    } else if (whichAds === 3) {
      return await showBanner(setError, TEST_IDS, userInfo, listeners, margin, position);
    } else if (whichAds === 4) {
      return await showRewardInterstitial(
        setError,
        setIsLoading,
        setAdmobReward,
        setAdsWatched,
        setAdWatchedOnlyForBlinkModal,
        setWhichAds,
        TEST_IDS,
        userInfo,
        setTarotAble,
        listeners
      );
    }
  } catch (error) {
    console.error('AdMob initialization error:', error);
    setError(content?.errors?.ADMOB_INIT_FAILED);
    if (setIsLoading) {
      setIsLoading(false);
    }
  }
};
