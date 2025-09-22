const chargeRouter = require("express").Router();
const { chargeController } = require("../MVC/controller/index");
const checkTokenWithRefresh = require("../middlewares/checkTokenWithRefresh");
chargeRouter.post(
  "/toss/pre-payment",
  checkTokenWithRefresh,
  chargeController.postPrePaymentForToss
);
chargeRouter.get(
  "/toss/pre-payment",
  checkTokenWithRefresh,
  chargeController.getPrePaymentForToss
);
chargeRouter.delete(
  "/toss/pre-payment",
  checkTokenWithRefresh,
  chargeController.deletePrePaymentForTossByOrderId
);
chargeRouter.delete(
  "/toss/pre-payment/paymentKey",
  checkTokenWithRefresh,
  chargeController.deletePrePaymentForTossByPaymentKey
);
chargeRouter.put(
  "/toss/pre-payment",
  checkTokenWithRefresh,
  chargeController.putPrePaymentForToss
);
chargeRouter.post(
  "/toss/payment/confirm",
  checkTokenWithRefresh,
  chargeController.postConfirmForToss
);
chargeRouter.post(
  "/toss/payment/cancel/part",
  checkTokenWithRefresh,
  chargeController.postPartialCancelForToss
);
chargeRouter.post("/toss/hook/v3", chargeController.postWebHookForToss);
chargeRouter.post(
  "/iap/google-play-store/payment",
  checkTokenWithRefresh,
  chargeController.postChargeForGooglePayStore
);
chargeRouter.post(
  "/iap/google-play-store/refund",
  chargeController.postRefundForGooglePlayStore
);
chargeRouter.get(
  "/purchaseLimit",
  checkTokenWithRefresh,
  chargeController.getPurchaseLimit
);
module.exports = chargeRouter;
