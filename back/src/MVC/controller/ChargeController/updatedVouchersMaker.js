const updatedVouchersMaker = ({ userInDB, createdChargeInfo }) => {
  const vouchers = userInDB.vouchers || {};
  let updatedVouchers = { ...vouchers };
  createdChargeInfo?.orderVouchers?.forEach((elem) => {
    if (elem === null || elem === undefined) return;
    const key = elem[0];
    const prevValue = typeof vouchers[key] === "number" ? vouchers[key] : 0;
    const newValue = prevValue + elem[1];
    updatedVouchers[key] = newValue;
  });
  return updatedVouchers;
};
module.exports = updatedVouchersMaker;
