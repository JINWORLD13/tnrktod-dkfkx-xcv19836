const timezoneMap = {
  ko: {
    'Asia/Seoul': '한국 시간 기준',
    'Asia/Tokyo': '일본 시간 기준',
    'Asia/Singapore': '싱가포르 시간 기준',
    'Asia/Kuala_Lumpur': '말레이시아 쿠알라룸푸르 시간 기준',
    'Asia/Kolkata': '인도 뉴델리 시간 기준',
    'America/New_York': '미국 뉴욕 시간 기준',
    'America/Chicago': '미국 시카고 시간 기준',
    'America/Los_Angeles': '미국 로스앤젤레스 시간 기준',
    'America/Anchorage': '미국 알레스카 시간 기준',
    'America/Denver': '미국 덴버 시간 기준',
    'America/Phoenix': '미국 애리조나주 시간 기준',
    'Pacific/Honolulu': '미국 하와이 시간 기준',
    'Europe/Paris': '프랑스 파리 시간 기준',
    'Europe/London': '영국 런던 시간 기준',
    'Europe/Berlin': '독일 베를린 시간 기준',
    'Europe/Rome': '이탈리아 로마 시간 기준',
    'Europe/Madrid': '스페인 마드리드 시간 기준',
  },
  ja: {
    'Asia/Seoul': '韓国時間基準',
    'Asia/Tokyo': '日本時間基準',
    'Asia/Singapore': 'シンガポール時間基準',
    'Asia/Kuala_Lumpur': 'マレーシア・クアラルンプール時間基準',
    'Asia/Kolkata': 'インド・ニューデリー時間基準',
    'America/New_York': 'アメリカ・ニューヨーク時間基準',
    'America/Chicago': 'アメリカ・シカゴ時間基準',
    'America/Los_Angeles': 'アメリカ・ロサンゼルス時間基準',
    'America/Anchorage': 'アメリカ・アラスカ時間基準',
    'America/Denver': 'アメリカ・デンバー時間基準',
    'America/Phoenix': 'アメリカ・アリゾナ州時間基準',
    'Pacific/Honolulu': 'アメリカ・ハワイ時間基準',
    'Europe/Paris': 'フランス・パリ時間基準',
    'Europe/London': 'イギリス・ロンドン時間基準',
    'Europe/Berlin': 'ドイツ・ベルリン時間基準',
    'Europe/Rome': 'イタリア・ローマ時間基準',
    'Europe/Madrid': 'スペイン・マドリード時間基準',
  },
  en: {
    'Asia/Seoul': 'Korea Standard Time',
    'Asia/Tokyo': 'Japan Standard Time',
    'Asia/Singapore': 'Singapore Time',
    'Asia/Kuala_Lumpur': 'Malaysia Time',
    'Asia/Kolkata': 'India Standard Time',
    'America/New_York': 'Eastern Time',
    'America/Chicago': 'Central Time',
    'America/Los_Angeles': 'Pacific Time',
    'America/Anchorage': 'Alaska Time',
    'America/Denver': 'Mountain Time',
    'America/Phoenix': 'Arizona Time',
    'Pacific/Honolulu': 'Hawaii Time',
    'Europe/Paris': 'European Paris Time',
    'Europe/London': 'European London Time',
    'Europe/Berlin': 'European Berlin Time',
    'Europe/Rome': 'European Rome Time',
    'Europe/Madrid': 'European Madrid Time',
  },
};
export function localizeTimeZone(
  language,
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
) {
  if (!timezoneMap[language]) {
    return timezone;
  }
  return timezoneMap[language][timezone] || timezone;
}
