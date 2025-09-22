export const formatPrice = (priceMicros, currencyCode, browserLanguage) => {
  if (!priceMicros || !currencyCode) return 'Price not available';
  const priceInUnits = priceMicros / 1000000;
  if (currencyCode === 'KRW') {
    const wholePart = Math.floor(priceInUnits);
    const fractionalPart = priceInUnits - wholePart;
    if (fractionalPart === 0) {
      return new Intl.NumberFormat(browserLanguage, {
        style: 'currency',
        currency: 'KRW',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(wholePart);
    } else {
      return `${new Intl.NumberFormat(browserLanguage, {
        style: 'currency',
        currency: 'KRW',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(wholePart)}.${(fractionalPart * 100)
        .toFixed(0)
        .padStart(2, '0')}`;
    }
  } else {
    return new Intl.NumberFormat(browserLanguage, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(priceInUnits);
  }
};
