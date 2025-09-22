function checkVouchers(
  modelNumber,
  cardCount,
  userVouchers,
  inputQuestionData
) {
  const validCardCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const voucherRequirements = {
    2: 1,
    3: 2,
    4: 4,
  };
  if (!validCardCounts.includes(cardCount)) {
    return false; 
  }
  const isVoucherModeOn = inputQuestionData.isVoucherModeOn;
  if (isVoucherModeOn) {
    const requiredVouchers = voucherRequirements[modelNumber] || 0;
    return userVouchers?.[cardCount] >= requiredVouchers;
  } else {
    return true;
  }
}
module.exports = checkVouchers;
