export const mapCountryToLanguage = country => {
  switch (country) {
    case 'US':
      return 'en';
    case 'KR':
      return 'ko';
    case 'JP':
      return 'ja';
    default:
      return;
  }
};
