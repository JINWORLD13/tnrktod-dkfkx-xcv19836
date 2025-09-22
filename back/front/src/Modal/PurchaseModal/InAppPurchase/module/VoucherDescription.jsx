export const VoucherDescription = ({ product, styles, t }) => {
  const voucherIds = [
    ...Array.from({ length: 13 }, (_, index) => {
      const number = index + 1;
      const suffix = number === 3 || number === 10 ? 'voucher' : 'vouchers';
      return `cosmos_${suffix}_${number}`;
    }),
  ];
  const matchingId = voucherIds.find(id => id === product?.id);
  if (!matchingId) {
    return null;
  }
  return (
    <p className={styles['voucher-description']}>
      {t(`product.${matchingId}`) || 'No description available'}
    </p>
  );
};
