export let cardPositionInfo = (
  whichTarot,
  whichCardPosition,
  spreadInfo,
  browserLanguage,
  t
) => {
  if (whichTarot === 1) {
    if (browserLanguage === 'ja' || browserLanguage === 'ko') {
      return whichCardPosition?.position + t(`blink_modal.card-position`);
    }
    if (browserLanguage === 'en') {
      let order;
      if (whichCardPosition?.position === 1) order = '1st';
      if (whichCardPosition?.position === 2) order = '2nd';
      if (whichCardPosition?.position === 3) order = '3rd';
      if (whichCardPosition?.position === 4) order = '4th';
      if (whichCardPosition?.position === 5) order = '5th';
      if (whichCardPosition?.position === 6) order = '6th';
      if (whichCardPosition?.position === 7) order = '7th';
      if (whichCardPosition?.position === 8) order = '8th';
      if (whichCardPosition?.position === 9) order = '9th';
      if (whichCardPosition?.position === 10) order = '10th';
      if (whichCardPosition?.position === 11) order = '11th';
      if (whichCardPosition?.position === 12) order = '12th';
      if (whichCardPosition?.position === 13) order = '13th';
      return 'The' + ' ' + order + ' ' + 'Card';
    }
  }
  if (whichTarot !== 1) {
    if (
      spreadInfo?.spreadListNumber >= 200 
    ) {
      if (browserLanguage === 'ja' || browserLanguage === 'ko') {
        return whichCardPosition?.position + t(`blink_modal.card-position`);
      }
      if (browserLanguage === 'en') {
        let order;
        if (whichCardPosition?.position === 1) order = '1st';
        if (whichCardPosition?.position === 2) order = '2nd';
        if (whichCardPosition?.position === 3) order = '3rd';
        if (whichCardPosition?.position === 4) order = '4th';
        if (whichCardPosition?.position === 5) order = '5th';
        if (whichCardPosition?.position === 6) order = '6th';
        if (whichCardPosition?.position === 7) order = '7th';
        if (whichCardPosition?.position === 8) order = '8th';
        if (whichCardPosition?.position === 9) order = '9th';
        if (whichCardPosition?.position === 10) order = '10th';
        if (whichCardPosition?.position === 11) order = '11th';
        if (whichCardPosition?.position === 12) order = '12th';
        if (whichCardPosition?.position === 13) order = '13th';
        return 'The' + ' ' + order + ' ' + 'Card';
      }
    }
  }
};
