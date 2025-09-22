const adsFreePassExpiredDateMaker = ({ productId, purchaseDate }) => {
  if (!productId || !purchaseDate) {
    return ''; 
  }
  const startDate = new Date(purchaseDate);
  if (isNaN(startDate.getTime())) {
    return ''; 
  }
  const productIdSplitArr = productId.split("_");
  if (
    productIdSplitArr.includes("ads") &&
    productIdSplitArr.includes("remover")
  ) {
    const lastPart = productIdSplitArr[productIdSplitArr.length - 1];
    const date = lastPart.split("d")[0];
    return new Date(startDate.setDate(startDate.getDate() + Number(date)));
  }
  return '';
};
module.exports = adsFreePassExpiredDateMaker;
