import GiftBoxIcon from './GiftBoxIcon';
export const VoucherTitle = ({ product, browserLanguage, styles }) => {
  const cardStyleMap = {
    [import.meta.env.VITE_COSMOS_VOUCHERS_1]: 'one-card',
    [import.meta.env.VITE_COSMOS_VOUCHERS_2]: 'two-cards',
    [import.meta.env.VITE_COSMOS_VOUCHER_3]: 'three-cards',
    [import.meta.env.VITE_COSMOS_VOUCHERS_4]: 'four-cards',
    [import.meta.env.VITE_COSMOS_VOUCHERS_5]: 'five-cards',
    [import.meta.env.VITE_COSMOS_VOUCHERS_6]: 'six-cards',
    [import.meta.env.VITE_COSMOS_VOUCHERS_7]: 'seven-cards',
    [import.meta.env.VITE_COSMOS_VOUCHERS_8]: 'eight-cards',
    [import.meta.env.VITE_COSMOS_VOUCHERS_9]: 'nine-cards',
    [import.meta.env.VITE_COSMOS_VOUCHER_10]: 'ten-cards',
    [import.meta.env.VITE_COSMOS_VOUCHERS_11]: 'eleven-cards',
    [import.meta.env.VITE_COSMOS_VOUCHERS_13]: 'thirteen-cards',
  };
  const getFontStyle = language => {
    switch (language) {
      case 'ko':
      case 'en':
        return 'korean-dongle-font'; 
      case 'ja':
        return 'japanese-potta-font'; 
      default:
        return '';
    }
  };
  const getClassNames = () => {
    const baseClass = styles['voucher-title'];
    const cardClass = product?.id ? styles[cardStyleMap[product.id]] : '';
    const fontClass = styles[getFontStyle(browserLanguage)];
    return [baseClass, cardClass, fontClass]?.filter(Boolean).join(' ');
  };
  return (
    <h2 className={getClassNames()}>{product?.title || 'Unknown Product'}</h2>
  );
};
