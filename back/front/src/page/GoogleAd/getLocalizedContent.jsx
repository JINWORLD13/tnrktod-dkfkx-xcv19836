import useLanguageChange from '../../hooks/useEffect/useLanguageChange';
export const getLocalizedContent = () => {
  const browserLanguage = useLanguageChange();
  switch (browserLanguage) {
    case 'ko':
      return {
        errorTitle: '오류가 발생했습니다',
        refreshSuggestion: '페이지를 새로고침하시겠습니까?',
        refreshButton: '새로고침',
        cancelButton: '취소',
        errors: {
          CONSENT_REQUIRED:
            '광고 표시를 위해서는 개인정보 처리 동의가 필요합니다.',
          AdSense_LOAD_FAILED: 'AdSense 광고 로드에 실패했습니다.',
          INTERSTITIAL_LOAD_FAILED: '전면 광고 로드에 실패했습니다.',
          REWARD_LOAD_FAILED: '보상형 광고 로드에 실패했습니다.',
          ADMOB_INIT_FAILED: 'AdMob 초기화에 실패했습니다.',
          REWARD_SHOW_FAILED: '보상형 광고 표시에 실패했습니다.',
        },
        initialPrompt: {
          title: '광고 시청하기',
          continueButton: '시청',
          continueButtonForAdMob: '시청 (+ 이용권 1장)',
          cancelButton: '취소',
        },
        instructionForAd1: '광고시청 후, 타로 서비스를 이용하실 수 있습니다.',
        instructionForAd1ForAdMob:
          '광고 시청 완료 시, 보통 타로의 모든 콘텐츠에 사용 가능한 이용권 1장을 획득하실 수 있습니다.',
      };
    case 'ja':
      return {
        errorTitle: 'エラーが発生しました',
        refreshSuggestion: 'ページをリロードしますか？',
        refreshButton: 'リロード',
        cancelButton: '取り消し',
        errors: {
          CONSENT_REQUIRED: '広告表示には個人情報処理の同意が必要です。',
          AdSense_LOAD_FAILED: 'AdSense広告の読み込みに失敗しました。',
          INTERSTITIAL_LOAD_FAILED:
            'インタースティシャル広告の読み込みに失敗しました。',
          REWARD_LOAD_FAILED: 'リワード広告の読み込みに失敗しました。',
          ADMOB_INIT_FAILED: 'AdMobの初期化に失敗しました。',
          REWARD_SHOW_FAILED: 'リワード広告の表示に失敗しました。',
        },
        initialPrompt: {
          title: '広告視聴',
          continueButton: '視聴',
          continueButtonForAdMob: '視聴 (+ 利用券1枚)',
          cancelButton: '取り消し',
        },
        instructionForAd1: '広告視聴後、タロットサービスをご利用いただけます。',
        instructionForAd1ForAdMob:
          '広告視聴完了時、通常タロの全コンテンツに使用可能な利用券を1枚獲得できます。',
      };
    case 'en':
    default:
      return {
        errorTitle: 'An error occurred',
        refreshSuggestion: 'Would you like to refresh the page?',
        refreshButton: 'Refresh',
        cancelButton: 'Cancel',
        errors: {
          CONSENT_REQUIRED:
            'Consent for data processing is required to show ads.',
          AdSense_LOAD_FAILED: 'Failed to load AdSense ad.',
          INTERSTITIAL_LOAD_FAILED: 'Failed to load interstitial ad.',
          REWARD_LOAD_FAILED: 'Failed to load reward ad.',
          ADMOB_INIT_FAILED: 'Failed to initialize AdMob.',
          REWARD_SHOW_FAILED: 'Failed to show reward ad.',
        },
        initialPrompt: {
          title: 'View an ad?',
          continueButton: 'View',
          continueButtonForAdMob: 'View (Get 1 Voucher)',
          cancelButton: 'Cancel',
        },
        instructionForAd1:
          'After watching the ad, you can access the tarot service.',
        instructionForAd1ForAdMob:
          'Upon completing the Ad viewing, you can acquire 1 voucher  that can be used for all tarot contents in normal mode.',
      };
  }
};
