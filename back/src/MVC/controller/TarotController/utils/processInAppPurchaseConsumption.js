const {
  consumeInAppPurchase,
} = require("../../../../middlewares/consumeInAppPurchase");
async function processInAppPurchaseConsumption(
  packageName,
  productId,
  purchaseToken,
  userInfo,
  prevOrderId,
  orderId
) {
  let isFirstConsumption;
  if (prevOrderId === undefined || prevOrderId === orderId) {
    console.log("First consumption in this session");
    isFirstConsumption = false;
  } else if (prevOrderId !== orderId) {
    console.log("New order detected, marking as first consumption");
    isFirstConsumption = true;
  }
  try {
    await consumeInAppPurchase(
      packageName,
      productId,
      purchaseToken,
      isFirstConsumption
    );
    console.log("In-app purchase consumed successfully");
  } catch (error) {
    console.error("Error consuming in-app purchase:", error);
  }
  return orderId;
}
module.exports = processInAppPurchaseConsumption;
