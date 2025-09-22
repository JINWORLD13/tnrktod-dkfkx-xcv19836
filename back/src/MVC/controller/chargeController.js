const { sanitizeObject, buildResponse } = require("../../misc/util");
const AppError = require("../../misc/AppError");
const commonErrors = require("../../misc/commonErrors");
const { userService, chargeService, violationService } = require("../service");
const axios = require("axios");
const { consoleForReceipt } = require("../../misc/console");
const {
  verifyPurchaseWithGooglePlay,
} = require("../../middlewares/verifyPurchaseWithGooglePlay");
const orderHistoryMaker = require("./ChargeController/orderHistoryMaker");
const orderVouchersArrMaker = require("./ChargeController/orderVouchersArrMaker");
const orderNameMaker = require("./ChargeController/orderNameMaker");
const updatedVouchersInDetailMaker = require("./ChargeController/updatedVouchersInDetailMaker");
const updatedVouchersMaker = require("./ChargeController/updatedVouchersMaker");
const adsFreePassExpiredDateMaker = require("./ChargeController/function/adsFreePassExpiredDateMaker");
const redisClient = require("../../cache/redisClient");


const RedisKeys = {
  userInfo: (userId) => `user:${userId}`,
  requestCount: (orderId) => `refund:count:${orderId}`,
  vouchersForRefund: (orderId) => `refund:vouchers:${orderId}`,
  googleOrderId: () => `refund:google:current`,
  paymentProgress: (userId, orderId) => `payment:progress:${userId}:${orderId}`,
  webhookProcessed: (orderId, status) => `webhook:${orderId}:${status}`,
  purchaseLimit: (productId, userId) => `cache:limit:${productId}:${userId}`,
};

let remainingPercentage = 1 - Number(process.env.CANCEL_PERCENTAGE);

const chargeController = {

  async getPurchaseLimit(req, res, next) {
    const userId = req?.user ?? req?.session?.user?.id ?? null;
    req.user = userId;
    const productId = req.query.productId;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    try {

      const cacheKey = RedisKeys.purchaseLimit(productId, userId);
      const cachedResult = await redisClient.get(cacheKey);

      if (cachedResult) {

        return res
          .status(200)
          .json({ success: true, purchaseLimit: cachedResult.limit });
      }


      const purchaseLimitArr = await chargeService.getChargesByProductId(
        productId
      );
      if (!purchaseLimitArr) {
        return res
          .status(404)
          .json({ success: false, message: "Purchase limit not found" });
      }

      const userInDB = await userService.getUserById(userId);
      const hasUserPurchased = purchaseLimitArr.some((charge) => {
        return charge?.userInfo?.equals(userInDB?._id);
      });

      let OverCountToStopFromPurchasingAgain = hasUserPurchased
        ? 1000000000000000
        : 0;
      let finalLimit;

      if (productId === process.env.PRODUCT_EVENT_PACKAGE) {
        finalLimit =
          purchaseLimitArr?.length + OverCountToStopFromPurchasingAgain;
      } else if (
        productId === process.env.VITE_COSMOS_VOUCHERS_BUNDLE_PACKAGE_NEWBIE
      ) {
        finalLimit = OverCountToStopFromPurchasingAgain;
      }

      await redisClient.set(
        cacheKey,
        { limit: finalLimit, hasUserPurchased },
        3600
      );

      res.status(200).json({ success: true, purchaseLimit: finalLimit });
    } catch (error) {
      console.error("Error fetching purchase limit:", error);
      next(new AppError(error?.message, commonErrors.chargeController, 500));
    }
  },

  async postPrePaymentForToss(req, res, next) {
    try {
      const userId = req?.user ?? req?.session?.user?.id ?? null;
      req.user = userId;

      if (!req?.isAuthenticated()) {
        return next(
          new AppError(
            commonErrors.chargeControllerPostPrePaymentForTossError,
            commonErrors.userInfoNotFoundError,
            404
          )
        );
      }

      const {
        orderId,
        paymentKey,
        orderName,
        orderHistory,
        orderVouchersArr,
        amount,
        currency,
        country,
        method,
        apiName,
      } = req.body;

      if (!orderId) return;

      const progressKey = RedisKeys.paymentProgress(userId, orderId);
      const isInProgress = await redisClient.exists(progressKey);

      if (isInProgress) {
        return res.status(200).json({
          success: false,
          message: "Payment already in progress.",
          status: "in_progress",
          orderId,
          action: "check_status",
        });
      }

      await redisClient.set(progressKey, "in_progress", 60);

      try {
        const userInDB = await userService.getUserById(userId);

        let createdChargeInfo;
        const chargeData = {
          orderId,
          paymentKey,
          orderName,
          orderHistory,
          orderVouchers: orderVouchersArr,
          amount,
          currency,
          country,
          method,
          apiName,
          userInfo: userInDB,
        };

        if (method === "가상계좌") {
          chargeData.refundReceiveAccount = {
            bank: "XX",
            accountNumber: "XXXXXXXXX",
            holderName: "XXX",
          };
        }

        createdChargeInfo = await chargeService.createChargeForTossPrePayment(
          chargeData
        );

        await redisClient.del(progressKey);

        res.status(200).json({
          success: true,
          message: "PrePayment for Toss processed successfully",
          createdChargeInfo,
        });
      } catch (error) {

        await redisClient.del(progressKey);
        throw error;
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      res
        .status(500)
        .json({ success: false, message: "Payment processing failed" });
    }
  },

  async getPrePaymentForToss(req, res, next) {
    try {
      const userId = req?.user ?? req?.session?.user?.id ?? null;
      req.user = userId;
      if (req?.isAuthenticated() === true) {
        const orderId = req?.query?.orderId ?? null;
        if (orderId === null || orderId === undefined) {
          return;
        }

        const chargeInDB = await chargeService.getChargeByOrderId(orderId);
        res.status(200).json({
          chargeInfo: chargeInDB,
        });
      } else {
        next(
          new AppError(
            commonErrors.chargeControllerGetPrePaymentForTossError,
            commonErrors.userInfoNotFoundError,
            404
          )
        );
      }
    } catch (error) {
      console.error("Error fetching pre-payment Info:", error);
      next(new AppError(error?.message, commonErrors.chargeController, 404));
    }
  },

  async deletePrePaymentForTossByOrderId(req, res, next) {
    try {
      const userId = req?.user ?? req?.session?.user?.id ?? null;
      req.user = userId;
      if (req?.isAuthenticated() === true) {
        const orderId = req?.body?.orderId;
        if (orderId === "" || orderId === undefined) return;
        await chargeService.deleteChargeByOrderId(orderId);
        res.status(200).json({ success: true });
      } else {
        next(
          new AppError(
            commonErrors.chargeControllerDeletePrePaymentForTossByOrderIdError,
            commonErrors.userInfoNotFoundError,
            404
          )
        );
      }
    } catch (error) {
      console.error("Error deleting pre-payment Info:", error);
      res
        .status(500)
        .json({ success: false, message: "Deleting Pre-Payment Info failed" });
    }
  },

  async deletePrePaymentForTossByPaymentKey(req, res, next) {
    try {
      const userId = req?.user ?? req?.session?.user?.id ?? null;
      req.user = userId;
      if (req?.isAuthenticated() === true) {
        const paymentKey = req?.body?.paymentKey;
        if (paymentKey === "" || paymentKey === undefined) return;
        const userInDB = await userService.getUserById(userId);
        const userObjId = userInDB._id;
        await chargeService.deleteChargeByUserObjIdAndPaymentKey(
          userObjId,
          paymentKey
        );
        res.status(200).json({ success: true });
      } else {
        next(
          new AppError(
            commonErrors.chargeControllerDeletePrePaymentForTossByPaymentKeyError,
            commonErrors.userInfoNotFoundError,
            404
          )
        );
      }
    } catch (error) {
      console.error("Error deleting pre-payment Info:", error);
      res
        .status(500)
        .json({ success: false, message: "Deleting Pre-Payment Info failed" });
    }
  },

  async putPrePaymentForToss(req, res, next) {
    try {
      const userId = req?.user ?? req?.session?.user?.id ?? null;
      req.user = userId;
      if (req?.isAuthenticated() === true) {
        const { orderId, paymentKey } = req.body;
        if (orderId === undefined || orderId === "") return;

        const chargeInDB = await chargeService.getChargeByOrderId(orderId);

        await chargeService.putChargeByOrderId(orderId, {
          paymentKey,
          orderHistory: {
            ...Object.fromEntries(
              Object.entries(chargeInDB?.orderHistory).map(
                ([key, valueOfArray]) => {
                  valueOfArray[5] = chargeInDB.createdAt;
                  valueOfArray[8] = chargeInDB.paymentKey;
                  return [key, valueOfArray];
                }
              )
            ),
          },
        });

        const userInDB = await userService.getUserById(req.user);

        await chargeController.updateUserVouchersInDetail(
          orderId,
          chargeInDB,
          userInDB
        );

        res.status(200).json({ success: true });
      } else {
        next(
          new AppError(
            commonErrors.chargeControllerPutPrePaymentForTossError,
            commonErrors.userInfoNotFoundError,
            404
          )
        );
      }
    } catch (error) {
      console.error("Error putting pre-payment Info:", error);
      res
        .status(500)
        .json({ success: false, message: "Putting Pre-Payment Info failed" });
    }
  },

  async postWebHookForToss(req, res, next) {
    const status = req?.body?.data?.status;
    const orderId = req?.body?.data?.orderId;

    if (!orderId) return res.status(200).end();

    const webhookKey = RedisKeys.webhookProcessed(orderId, status);
    const isProcessed = await redisClient.exists(webhookKey);

    if (isProcessed) {
      // console.log(`Webhook already processed: ${orderId}_${status}`);
      return res.status(200).json({ message: "Already processed" });
    }

    await redisClient.set(webhookKey, "processed", 3600);

    if (process.env.NODE_ENV === "DEVELOPMENT") {
      // console.log("웹훅 호출 시 status: ", status);
      // console.log("웹훅 호출 시 method: ", req?.body?.data?.method);
    }

    const chargeInDB = await chargeService.getChargeByOrderId(orderId);
    if (!chargeInDB) return res.status(200).end();

    const userObjId = chargeInDB?.userInfo;
    const orderVouchers = chargeInDB?.orderVouchers;
    const userInDB = await userService.getUserByObjId(userObjId);

    await redisClient.del(RedisKeys.userInfo(userInDB?.id));

    const vouchers = userInDB?.vouchers;

    if (req?.body?.data && req?.body?.data?.method !== "가상계좌") {
      return await chargeController.handleNonVirtualAccountWebhook(req, res, {
        status,
        orderId,
        chargeInDB,
        userInDB,
        vouchers,
      });
    }

    return await chargeController.handleVirtualAccountWebhook(req, res, {
      status,
      orderId,
      chargeInDB,
      userInDB,
      vouchers,
      orderVouchers,
    });
  },

  async handleNonVirtualAccountWebhook(
    req,
    res,
    { status, orderId, chargeInDB, userInDB, vouchers }
  ) {
    switch (status) {
      case "DONE":
        return await chargeController.handlePaymentDone(req, res, {
          orderId,
          chargeInDB,
          userInDB,
        });

      case "CANCELED":
        return await chargeController.handlePaymentCanceled(req, res, {
          orderId,
          userInDB,
          vouchers,
        });

      case "PARTIAL_CANCELED":
        return await chargeController.handlePartialCanceled(req, res, {
          orderId,
          userInDB,
          vouchers,
        });

      default:
        return res.status(200).end();
    }
  },

  async handleVirtualAccountWebhook(
    req,
    res,
    { status, orderId, chargeInDB, userInDB, vouchers, orderVouchers }
  ) {
    switch (status) {
      case "DONE":
        return await chargeController.handleVirtualAccountDone(req, res, {
          orderId,
          chargeInDB,
          userInDB,
          vouchers,
          orderVouchers,
        });

      case "CANCELED":
        if (chargeInDB.apiName === "Toss") {
          return await chargeController.handlePaymentCanceled(req, res, {
            orderId,
            userInDB,
            vouchers,
          });
        } else {
          await chargeService.deleteChargeByOrderId(orderId);
          return res.status(200).json({ status });
        }

      case "PARTIAL_CANCELED":
        return await chargeController.handlePartialCanceled(req, res, {
          orderId,
          userInDB,
          vouchers,
        });

      default:
        return res.status(200).end();
    }
  },

  async handlePaymentDone(req, res, { orderId, chargeInDB, userInDB }) {
    if (process.env.NODE_ENV === "DEVELOPMENT") console.log("결제 완료 처리");

    await chargeService.putChargeByOrderId(orderId, {
      apiName: "Toss",
      orderHistory: {
        ...Object.fromEntries(
          Object.entries(chargeInDB.orderHistory).map(([key, valueOfArray]) => {
            valueOfArray[5] = chargeInDB.createdAt;
            valueOfArray[8] = chargeInDB.paymentKey;
            return [key, valueOfArray];
          })
        ),
      },
    });

    await chargeController.updateUserVouchersInDetail(
      orderId,
      chargeInDB,
      userInDB
    );
    return res.status(200).json({ success: true });
  },

  async handleVirtualAccountDone(
    req,
    res,
    { orderId, chargeInDB, userInDB, vouchers, orderVouchers }
  ) {
    let updatedVouchersInDetail = Object.fromEntries(
      Object.entries(chargeInDB?.orderHistory).map(([key, valueOfArray]) => {
        let vouchersInDetailOfUser;
        if (!userInDB?.vouchersInDetail || !userInDB?.vouchersInDetail[key]) {
          vouchersInDetailOfUser = { [key]: [] };
        } else {
          vouchersInDetailOfUser = userInDB?.vouchersInDetail;
        }
        const doubleArray = [...vouchersInDetailOfUser?.[key]] || [];
        doubleArray.push(valueOfArray);
        return [key, doubleArray];
      })
    );

    let updatedVouchers = { ...vouchers };
    orderVouchers?.forEach((elem) => {
      const key = elem?.[0];
      updatedVouchers[key] = vouchers?.[key] + elem[1];
    });

    await userService.updateUser({
      ...userInDB,
      vouchersInDetail: {
        ...userInDB?.vouchersInDetail,
        ...updatedVouchersInDetail,
      },
      vouchers: { ...updatedVouchers },
    });

    await chargeService.putChargeByOrderId(orderId, {
      apiName: "Toss",
      orderHistory: {
        ...Object.fromEntries(
          Object.entries(chargeInDB.orderHistory).map(([key, valueOfArray]) => {
            valueOfArray[5] = chargeInDB.createdAt;
            valueOfArray[8] = chargeInDB.paymentKey;
            return [key, valueOfArray];
          })
        ),
      },
    });

    await chargeController.updateUserVouchersInDetail(
      orderId,
      chargeInDB,
      userInDB
    );
    return res.status(200).json({ success: true });
  },

  async handlePaymentCanceled(req, res, { orderId, userInDB, vouchers }) {
    const countKey = RedisKeys.requestCount(orderId);
    const requestCount = (await redisClient.get(countKey)) || 0;

    if (requestCount === 0) {
      return res.status(200).json({});
    }

    if (process.env.NODE_ENV === "DEVELOPMENT") {
      console.log("전액 취소 웹훅 진입, requestCount:", requestCount);
    }

    if (requestCount === 1) {
      const vouchersKey = RedisKeys.vouchersForRefund(orderId);
      const vouchersObjForRefund = (await redisClient.get(vouchersKey)) || {};

      if (Object.keys(vouchersObjForRefund).length === 0) {
        return res.status(200).json({});
      }

      await chargeController.processRefundVouchers(
        userInDB,
        vouchersObjForRefund
      );
      await chargeController.handleRefundCompletion(req, orderId);

      await redisClient.del(countKey);
      await redisClient.del(vouchersKey);
    }

    if (requestCount > 1) {
      await redisClient.set(countKey, requestCount - 1, 3600);
    } else {
      await redisClient.del(countKey);
    }

    return res.status(200).json({});
  },

  async handlePartialCanceled(req, res, { orderId, userInDB, vouchers }) {
    const countKey = RedisKeys.requestCount(orderId);
    const requestCount = (await redisClient.get(countKey)) || 0;

    if (requestCount === 0) {
      return res.status(200).json({});
    }

    if (process.env.NODE_ENV === "DEVELOPMENT") {
      console.log("부분 취소 웹훅 진입, requestCount:", requestCount);
    }

    if (requestCount === 1) {
      const vouchersKey = RedisKeys.vouchersForRefund(orderId);
      const vouchersObjForRefund = (await redisClient.get(vouchersKey)) || {};

      if (Object.keys(vouchersObjForRefund).length === 0) {
        return res.status(200).json({});
      }

      await chargeController.processRefundVouchers(
        userInDB,
        vouchersObjForRefund
      );
      await chargeController.handleRefundCompletion(req, orderId);

      await redisClient.del(countKey);
      await redisClient.del(vouchersKey);
    }

    if (requestCount > 1) {
      await redisClient.set(countKey, requestCount - 1, 3600);
    } else {
      await redisClient.del(countKey);
    }

    return res.status(200).json({});
  },

  async processRefundVouchers(userInDB, vouchersObjForRefund) {
    let updatedVouchers = { ...userInDB.vouchers };

    const keysArr = Object.keys(vouchersObjForRefund);
    const vouchersArrForRefund = keysArr.map((key) => {
      let total = 0;
      vouchersObjForRefund[key]?.forEach((arr) => {
        total += arr[0];
      });
      return [key, total];
    });

    vouchersArrForRefund.forEach((voucher) => {
      const key = voucher[0];
      const newValue = updatedVouchers[key] - voucher[1];
      updatedVouchers[key] = newValue < 0 ? 0 : newValue;
    });

    const updatedVouchersInDetail =
      chargeController.updateVouchersInDetailForRefund(
        userInDB.vouchersInDetail,
        vouchersObjForRefund
      );

    await userService.updateUser({
      ...userInDB,
      vouchersInDetail: {
        ...userInDB.vouchersInDetail,
        ...updatedVouchersInDetail,
      },
      vouchers: updatedVouchers,
    });
  },


  async handleRefundCompletion(req, orderId) {
    const minimumRefundableLimit =
      chargeController.calculateMinimumRefundableLimit(req);
    const remainingAmount = chargeController.getRemainingRefundableAmount(req);

    if (req?.body?.data?.cancels?.length > 0) {
      if (remainingAmount <= minimumRefundableLimit) {
        await chargeService.deleteChargeByOrderId(orderId);
      }
    }
  },

  async postConfirmForToss(req, res, next) {
    try {
      const userId = req?.user ?? req?.session?.user?.id ?? null;
      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized: User ID not found" });
      }
      req.user = userId;

      const { paymentKey, orderId, amount } = req.body;
      if (!paymentKey || !orderId || !amount) {
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields" });
      }

      const paymentProgressKey = RedisKeys.paymentProgress(userId, orderId);
      const isProcessing = await redisClient.get(paymentProgressKey);
      if (isProcessing === "processing") {
        // console.log(`Payment already completed for orderId: ${orderId}`);
        return res.status(200).json({
          success: true,
          message: "결제가 이미 완료되었습니다",
          status: "completed",
          orderId,
          action: "redirect_to_success",
        });
      }
      if (isProcessing === "completed") {
        // console.log(`Payment already processed for paymentKey: ${paymentKey}`);
        await redisClient.set(paymentProgressKey, "completed", 3600);
        return res.status(200).json({
          success: true,
          message: "결제가 이미 완료되었습니다",
          status: "completed",
          orderId,
          action: "redirect_to_success",
        });
      }

      // Toss Payments 결제 상태 확인
      const checkPaymentStatus = async (paymentKey) => {
        try {
          const response = await axios.get(
            `https://api.tosspayments.com/v1/payments/${paymentKey}`,
            {
              headers: {
                Authorization: `Basic ${Buffer.from(
                  `${process.env.TOSS_SECRET_KEY}:`
                ).toString("base64")}`,
                "Content-Type": "application/json",
              },
            }
          );
          return (
            response.data.status === "DONE" ||
            response.data.status === "CANCELED"
          );
        } catch (error) {
          console.error("Error checking payment status:", error);
          return false;
        }
      };

      const isAlreadyProcessed = await checkPaymentStatus(paymentKey);
      if (isAlreadyProcessed) {
        // console.log(`Payment already processed for paymentKey: ${paymentKey}`);
        await redisClient.set(paymentProgressKey, "completed", 3600);
        return res
          .status(400)
          .json({ success: false, message: "Payment already processed" });
      }

      await redisClient.set(paymentProgressKey, "processing", 300);

      const chargeInfo = await chargeService.getChargeByOrderId(orderId);
      if (!chargeInfo) {
        await redisClient.del(paymentProgressKey);
        return res
          .status(404)
          .json({ success: false, message: "Charge not found" });
      }

      let widgetSecretKey;
      if (
        chargeInfo?.orderHistory?.[
          Object.keys(chargeInfo?.orderHistory)?.[0]
        ]?.[7] === "KRW"
      ) {
        widgetSecretKey = process.env.TOSS_SECRET_KEY;
      } else if (
        chargeInfo?.orderHistory?.[
          Object.keys(chargeInfo?.orderHistory)?.[0]
        ]?.[7] === "USD"
      ) {
        widgetSecretKey = process.env.TOSS_SECRET_KEY_FOR_PAYPAL;
      }

      const encryptedSecretKey = `Basic ${Buffer.from(
        `${widgetSecretKey}:`
      ).toString("base64")}`;
      const idempotencyKey = `${orderId}-${paymentKey}`;

      // console.log(
      //   `Sending Toss payment confirm request: ${orderId}, ${paymentKey}`
      // );
      const response = await axios.post(
        process.env.TOSS_CONFIRM_URL,
        { orderId, amount, paymentKey },
        {
          headers: {
            Authorization: encryptedSecretKey,
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
          },
          responseType: "json",
        }
      );

      if (chargeInfo?.method === "가상계좌") {
        const refundReceiveAccount =
          response?.data?.virtualAccount?.refundReceiveAccount || {};
        await chargeService.putChargeByOrderId(orderId, {
          paymentKey,
          refundReceiveAccount: {
            bank: refundReceiveAccount?.bankCode || refundReceiveAccount?.bank,
            accountNumber: refundReceiveAccount?.accountNumber,
            holderName: refundReceiveAccount?.holderName,
          },
          apiName: "Toss(미입금상태)",
        });
      } else {
        const { orderHistory, orderVouchers } =
          await chargeService.getChargeByOrderId(orderId);
        const userInDB = await userService.getUserById(userId);
        if (!userInDB) {
          await redisClient.del(paymentProgressKey);
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }

        let updatedVouchersInDetail = Object.fromEntries(
          Object.entries(orderHistory).map(([key, valueOfArray]) => {
            const vouchersInDetailOfUser =
              userInDB?.vouchersInDetail?.[key] || [];
            const doubleArray = [...vouchersInDetailOfUser];
            doubleArray.push(valueOfArray);
            return [key, doubleArray];
          })
        );

        const vouchers = userInDB.vouchers || {};
        let updatedVouchers = { ...vouchers };
        orderVouchers?.forEach((elem) => {
          if (elem) {
            const key = elem[0];
            updatedVouchers[key] = (vouchers[key] || 0) + elem[1];
          }
        });

        const updatedUserInfo = await userService.updateUser({
          ...userInDB,
          vouchersInDetail: {
            ...userInDB?.vouchersInDetail,
            ...updatedVouchersInDetail,
          },
          vouchers: { ...updatedVouchers },
        });

        await redisClient.set(
          RedisKeys.userInfo(userId),
          updatedUserInfo,
          3600
        );
      }

      await redisClient.set(paymentProgressKey, "completed", 3600);
      res.status(200).json({ success: true, data: response.data });
    } catch (error) {
      console.error("Error in postConfirmForToss:", error);
      await redisClient.del(RedisKeys.paymentProgress(userId, orderId));
      if (error.response?.data?.code === "ALREADY_PROCESSED_PAYMENT") {
        await redisClient.set(
          RedisKeys.paymentProgress(userId, orderId),
          "completed",
          3600
        );
        return res
          .status(400)
          .json({ success: false, message: "Payment already processed" });
      }
      res.status(error.response?.status || 500).json({
        success: false,
        message: error.response?.data?.message || "Payment confirmation failed",
      });
    }
  },

  async postPartialCancelForToss(req, res, next) {
    const userId = req?.user ?? req?.session?.user?.id ?? null;
    req.user = userId;
    await redisClient.del(RedisKeys.userInfo(userId));

    const vouchersArrForRefund = Object.values(req.body)?.flat(1);

    if (!vouchersArrForRefund?.length || !vouchersArrForRefund[0]?.length) {
      return res.status(200).json({ message: "nothing" });
    }

    const orderId = vouchersArrForRefund[0][4];

    const countKey = RedisKeys.requestCount(orderId);
    const vouchersKey = RedisKeys.vouchersForRefund(orderId);

    await redisClient.set(countKey, vouchersArrForRefund.length, 3600);

    let filteredObj = {};
    const cancelPromises = vouchersArrForRefund.map(async (voucher, index) => {
      const orderId = voucher[4];
      const paymentKey = voucher[8];
      const listPrice = voucher[1];
      const quantity = voucher[0];
      const payMethod = voucher[9];
      const totalAmount = quantity * listPrice;
      const cancelAmount =
        Math.round(totalAmount * Number(process.env.CANCEL_PERCENTAGE) * 100) /
        100;
      const currency = voucher[7];
      let cancelOption;

      filteredObj = {
        ...filteredObj,
        ...Object.fromEntries(
          Object.entries(req.body)
            .map(([key, valueArray]) => [
              key,
              (filteredObj?.[key] || []).concat(
                valueArray?.filter(
                  (value) =>
                    value?.[4] === orderId &&
                    value?.[8] === paymentKey &&
                    value?.[0] === quantity &&
                    value?.[1] === listPrice
                )
              ),
            ])
            ?.filter(([_, filteredArray]) => filteredArray?.length > 0)
        ),
      };

      if (payMethod !== "가상계좌") {
        if (currency === "KRW") {
          cancelOption = {
            cancelReason: "고객이 취소를 원함.",
            cancelAmount: cancelAmount,
          };
        } else if (currency === "USD") {
          cancelOption = {
            cancelReason: "The customer has asked to cancel.",
            cancelAmount: cancelAmount,
            currency: currency,
          };
        }
      } else {
        const chargeInfo = await chargeService.getChargeByOrderId(orderId);
        const refundReceiveAccount = chargeInfo?.refundReceiveAccount;
        cancelOption = {
          cancelReason: "고객이 취소를 원함.",
          cancelAmount: cancelAmount,
          refundReceiveAccount: { ...refundReceiveAccount },
        };
      }

      const widgetSecretKey =
        currency === "KRW"
          ? process.env.TOSS_SECRET_KEY
          : process.env.TOSS_SECRET_KEY_FOR_PAYPAL;
      const encryptedSecretKey =
        "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");

      await new Promise((resolve) => setTimeout(resolve, index * 1500));

      try {
        const response = await axios.post(
          `${process.env.TOSS_CANCEL_URL}/${paymentKey}/cancel`,
          cancelOption,
          {
            headers: {
              Authorization: encryptedSecretKey,
              "Content-Type": "application/json",
            },
          }
        );

        if (process.env.NODE_ENV === "DEVELOPMENT") {
          console.log(`환불 성공(금액: ${cancelAmount})`);
        }

        return { success: true, response };
      } catch (error) {
        if (process.env.NODE_ENV === "DEVELOPMENT") {
          console.log(
            `환불 실패(금액: ${cancelAmount})`,
            error?.response?.data
          );
        }

        const currentCount = (await redisClient.get(countKey)) || 0;
        if (currentCount > 0) {
          await redisClient.set(countKey, currentCount - 1, 3600);
        }

        filteredObj = {
          ...Object.fromEntries(
            Object.entries(filteredObj)
              .map(([key, valueArray]) => [
                key,
                valueArray?.filter(
                  (value) =>
                    !(
                      value?.[4] === orderId &&
                      value?.[8] === paymentKey &&
                      value?.[0] === quantity &&
                      value?.[1] === listPrice
                    )
                ),
              ])
              ?.filter(([_, filteredArray]) => filteredArray?.length > 0)
          ),
        };

        return { success: false, error };
      }
    });

    try {
      const results = await Promise.all(cancelPromises);

      await redisClient.set(vouchersKey, filteredObj, 3600);

      const successResults = results?.filter((result) => result.success);
      const failureResults = results?.filter((result) => !result.success);

      if (successResults?.length > 0 && failureResults?.length === 0) {
        return res.status(200).json({
          statusCodeArr: successResults.map(
            (r) => r.response.request.res.statusCode
          ),
          dataArr: successResults.map((r) => r.response.data.cancels),
          message: "response",
        });
      } else if (successResults?.length === 0 && failureResults?.length > 0) {
        return res.status(200).json({ message: "error" });
      } else if (successResults?.length === 0 && failureResults?.length === 0) {
        return res.status(200).json({ message: "nothing" });
      } else {
        return res.status(200).json({ message: "both" });
      }
    } catch (error) {
      console.error("Error processing cancellations:", error);
      await redisClient.del(countKey);
      await redisClient.del(vouchersKey);
      return res.status(500).json({ message: "Internal server error" });
    }
  },


  async postChargeForGooglePayStore(req, res, next) {
    try {
      const userId = req?.user ?? req?.session?.user?.id ?? null;
      req.user = userId;
      await redisClient.del(RedisKeys.userInfo(userId));

      const {
        email,
        className,
        id,
        sourceReceiptClassName,
        transactionId,
        state,
        products,
        productId,
        platform,
        orderId,
        packageName,
        purchaseTime,
        purchaseState,
        purchaseToken,
        quantity,
        acknowledged,
        getPurchaseState,
        autoRenewing,
        accountId,
        purchaseId,
        purchaseDate,
        isPending,
        isAcknowledged,
        renewalIntent,
        sourcePlatform,
        sourcePurchaseToken,
        sourceOrderId,
        collection,
        latestReceipt,
        nativeTransactions,
        validationDate,
        zd,
        ...restOfPaymentInfo
      } = req.body;

      if (purchaseState !== 0) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid purchase state" });
      }

      const isValidPurchase = await verifyPurchaseWithGooglePlay(
        packageName,
        productId,
        purchaseToken
      );
      if (!isValidPurchase) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid purchase" });
      }

      let orderName = orderNameMaker(productId);
      if (orderName === "Unknown") {
        return res.status(406).end();
      }

      if (
        email === process.env.COS1 ||
        email === process.env.COS2 ||
        accountId === process.env.COS1 ||
        accountId === process.env.COS2
      ) {
        consoleForReceipt(req);
      }

      if (!orderId) return;

      const userInDB = await userService.getUserById(userId);
      const orderHistory = orderHistoryMaker({
        products,
        quantity,
        productId,
        orderId,
        purchaseDate,
        purchaseToken,
        packageName,
        zd,
      });
      const orderVouchersArr = orderVouchersArrMaker({ products, quantity });
      const adsFreePassExpiredDate = adsFreePassExpiredDateMaker({
        productId,
        purchaseDate,
      });
      const adsFreePass =
        adsFreePassExpiredDate !== "" && adsFreePassExpiredDate
          ? {
              name: orderName,
              expired: adsFreePassExpiredDate,
              description: [
                quantity,
                "NA",
                "NA",
                productId,
                orderId,
                purchaseDate,
                "NA",
                "NA",
                purchaseToken,
                packageName,
              ],
            }
          : {};

      const existingChargeInfo = await chargeService.getChargeByOrderId(
        orderId
      );

      if (!existingChargeInfo) {
        const createdChargeInfo =
          await chargeService.createChargeForAndroidGooglePlay({
            orderId,
            purchaseToken,
            orderName,
            adsFreePass,
            orderHistory,
            orderVouchers: orderVouchersArr,
            amount: quantity,
            productId,
            packageName,
            apiName: platform,
            userInfo: userInDB,
            createdAtForIAP: purchaseDate,
          });

        const updatedVouchers = updatedVouchersMaker({
          userInDB,
          createdChargeInfo,
        });
        const updatedVouchersInDetail = updatedVouchersInDetailMaker({
          orderHistory,
          userInDB,
          orderId,
        });

        if (adsFreePassExpiredDate !== "" && adsFreePassExpiredDate) {
          await userService.updateUser({
            ...userInDB,
            adsFreePass: {
              name: orderName,
              orderId: orderId,
              expired: adsFreePassExpiredDate,
            },
            vouchers: updatedVouchers,
            vouchersInDetail: updatedVouchersInDetail,
          });
        } else if (productId === process.env.PRODUCT_NEWBIE_PACKAGE) {
          await userService.updateUser({
            ...userInDB,
            vouchers: updatedVouchers,
            vouchersInDetail: updatedVouchersInDetail,
            purchased: { ...userInDB?.purchased, packageForNewbie: true },
          });
        } else {
          await userService.updateUser({
            ...userInDB,
            vouchers: updatedVouchers,
            vouchersInDetail: updatedVouchersInDetail,
          });
        }
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error processing payment:", error);
      res
        .status(500)
        .json({ success: false, message: "Payment(iap) processing failed" });
    }
  },


  async postRefundForGooglePlayStore(req, res, next) {
    // console.log("postRefundForGooglePlayStore 호출");
    try {
      if (!req?.body || !req?.body?.message) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid request from pub/sub" });
      }

      const message = JSON.parse(
        Buffer.from(req.body.message.data, "base64").toString("utf-8")
      );
      // console.log("Refund event:", JSON.stringify(message));

      const orderId = message?.voidedPurchaseNotification?.orderId || "";

      if (orderId) {

        await redisClient.set(RedisKeys.googleOrderId(), orderId, 3600);
        await processRefund(orderId);
      }

      res
        .status(200)
        .json({ success: true, message: "Refund processed successfully" });
    } catch (error) {
      console.error("Error processing refund:", error);
      res
        .status(500)
        .json({ success: false, message: "Refund processing failed" });
    }
  },


  async updateUserVouchersInDetail(orderId, chargeInDB, userInDB) {
    const updatedChargeInDB = await chargeService.getChargeByOrderId(orderId);
    const updatedOrderHistory = updatedChargeInDB.orderHistory;
    const keysArrOfOrderHistory = Object.keys(updatedOrderHistory);
    const updatedUserInDB = await userService.getUserByObjId(userInDB._id);
    let updatedVouchersInDetail2 = { ...updatedUserInDB?.vouchersInDetail };

    keysArrOfOrderHistory?.forEach((key) => {
      const check =
        updatedVouchersInDetail2?.[key]?.[
          updatedVouchersInDetail2?.[key]?.length - 1
        ] ?? [];

      if (check?.length === 0) return;

      if (
        updatedVouchersInDetail2?.[key]?.[
          updatedVouchersInDetail2?.[key]?.length - 1
        ]?.[4] === orderId
      ) {
        updatedVouchersInDetail2[key][
          updatedVouchersInDetail2[key].length - 1
        ][5] = updatedOrderHistory?.[key]?.[5];
        updatedVouchersInDetail2[key][
          updatedVouchersInDetail2[key].length - 1
        ][8] = updatedChargeInDB?.paymentKey;
      }
    });

    await userService.updateUser({
      ...updatedUserInDB,
      vouchersInDetail: updatedVouchersInDetail2,
    });
  },

  updateVouchersInDetailForRefund(vouchersInDetail, vouchersObjForRefund) {
    return Object.fromEntries(
      Object.entries(vouchersObjForRefund).map(([key, arrOfArray]) => {
        let vouchersInDetailOfUser = vouchersInDetail?.[key] || [];
        let doubleArray = [...vouchersInDetailOfUser];

        arrOfArray?.forEach((arr) => {
          doubleArray?.forEach((array) => {
            if (array?.[4] === arr?.[4] && Array.isArray(array)) {
              array[0] = array[0] - arr[0];
            }
          });
        });

        return [key, doubleArray.filter((array) => array[0] !== 0)];
      })
    );
  },

  calculateMinimumRefundableLimit(req) {
    return (
      (req?.body?.data?.cancels?.[0]?.cancelAmount +
        req?.body?.data?.cancels?.[0]?.refundableAmount) *
      remainingPercentage
    );
  },

  getRemainingRefundableAmount(req) {
    return req?.body?.data?.cancels[req?.body?.data?.cancels?.length - 1]
      ?.refundableAmount;
  },


  async postPartialCancelForToss1(req, res, next) {
    if (process.env.NODE_ENV === "DEVELOPMENT") console.log("들어옴 여기도");
    let widgetSecretKey = process.env.TOSS_SECRET_KEY_FOR_PAYPAL;
    let cancelReason1 = "The customer has asked to cancel.";

    const encryptedSecretKey1 =
      "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");

    if (process.env.NODE_ENV === "DEVELOPMENT") {
      console.log("widgetSecretKey : ", widgetSecretKey);
      console.log("encryptedSecretKey1 : ", encryptedSecretKey1);
    }

    try {
      const response = await axios.post(
        `${process.env.TOSS_API_BASE_URL}/payments/${process.env.TEST_PAYMENT_KEY}/cancel`,
        { cancelReason: cancelReason1 },
        {
          headers: {
            Authorization: encryptedSecretKey1,
            "Content-Type": "application/json",
          },
        }
      );

      res.status(200).json({ message: "response" });
    } catch (error) {
      if (process.env.NODE_ENV === "DEVELOPMENT") {
        console.log("환불 실패시 console : ", error?.response?.data);
      }
      res.status(200).json({ message: "error" });
    }
  },
};


async function processRefund(orderId) {
  try {
    // console.log(`Processing refund for orderId: ${orderId}`);

    let chargeInDB;
    let userInDB;

    try {
      chargeInDB = await chargeService.getChargeByOrderId(orderId);
    } catch (err) {
      // console.log(`No charge found for orderId: ${orderId}`);
      await violationService.createViolation({
        violationName: "GoogleInAppRefund",
        orderId,
        refundQuantity: "N.A",
        remainingQuantity: "null",
        violationDate: new Date(),
        violationDescription: "No charge info due to out of stock",
        userObjId: "N.A",
      });
      return;
    }

    try {
      userInDB = await userService.getUserByObjId(chargeInDB?.userInfo);
    } catch (err) {
      // console.log(`No user found for orderId due to withdraw: ${orderId}`);
      await violationService.createViolation({
        violationName: "GoogleInAppRefund",
        orderId,
        refundQuantity: `${chargeInDB?.amount}` ?? "null",
        remainingQuantity: "null",
        violationDate: new Date(),
        violationDescription: "No user info due to out of stock or withdraw",
        userObjId: chargeInDB?.userInfo,
      });
      return;
    }

    let orderItem;

    if (userInDB && userInDB?.email) {
      if (
        userInDB?.vouchersInDetail &&
        typeof userInDB?.vouchersInDetail === "object"
      ) {
        try {
          const vouchersValues = Object.values(userInDB?.vouchersInDetail);

          if (chargeInDB?.productId?.split("_")?.includes("package")) {
            if (typeof orderItem !== "object") orderItem = {};
            Object.entries(userInDB?.vouchersInDetail)
              ?.filter((elem) => {
                elem[1]?.forEach((arrElem) => {
                  return arrElem?.[4] === orderId;
                });
              })
              ?.forEach(([key, values]) => {
                orderItem[key] = values?.[0]?.[0] ?? 0;
              });
          } else {
            orderItem = vouchersValues
              ?.filter((elem) => elem?.length !== 0)
              .flat()
              .find((elem) => elem?.[4] === orderId);
          }
        } catch (objectError) {
          console.error("Object.values 처리 중 에러:", objectError);
        }
      } else {
        orderItem = null;
      }

      if (!orderItem) {
        // console.log(`No order item found for orderId: ${orderId}`);
      }
    }

    let remainingQuantity;
    let refundQuantity;

    if (chargeInDB?.productId?.split("_")?.includes("package")) {
      refundQuantity = {};
      remainingQuantity = {};

      Object.entries(chargeInDB?.orderHistory || {}).forEach(
        ([type, detail]) => {
          refundQuantity[type] = detail?.[0] ?? 0;
        }
      );

      Object.entries(chargeInDB?.orderHistory || {}).forEach(
        ([type, detail]) => {
          const matchingVoucher = userInDB?.vouchersInDetail?.[type]?.find(
            (v) => v?.[4] === orderId
          );
          remainingQuantity[type] = matchingVoucher ? matchingVoucher[0] : 0;
        }
      );
    } else {
      remainingQuantity = orderItem?.[0] ?? 0;
      refundQuantity = chargeInDB?.amount ?? 0;
    }

    let result;
    if (chargeInDB?.productId?.split("_")?.includes("package")) {
      result = Object.entries(refundQuantity).some(
        ([type, qty]) => (remainingQuantity[type] ?? 0) < qty
      );
    } else {
      result =
        (remainingQuantity >= 0 &&
          refundQuantity >= 0 &&
          remainingQuantity < refundQuantity) ||
        !remainingQuantity;
    }

    if (result) {
      // console.log(
      //   `Violation detected - OrderID: ${orderId}, holding Vouchers: ${JSON.stringify(
      //     remainingQuantity
      //   )}, Requesting Amount: ${JSON.stringify(
      //     refundQuantity
      //   )}, Time: ${new Date().toISOString()}`
      // );

      await violationService.createViolation({
        violationName: "GoogleInAppRefund",
        orderId,
        refundQuantity: JSON.stringify(refundQuantity),
        remainingQuantity: JSON.stringify(remainingQuantity),
        violationDate: new Date(),
        violationDescription: `Violation: holding ${JSON.stringify(
          remainingQuantity
        )}, requesting ${JSON.stringify(refundQuantity)}`,
        userObjId: userInDB?._id ?? null,
      });

      const originalViolationsInDetail = userInDB?.violationsInDetail || [];
      const violationsInDetail = [
        ...originalViolationsInDetail,
        [
          "GoogleInAppRefund",
          orderId,
          refundQuantity,
          remainingQuantity,
          new Date(),
        ],
      ];

      if (userInDB?.id) {
        // userInDB가 null 아니면
        await redisClient.del(RedisKeys.userInfo(userInDB.id));
      }

      try {
        await userService.updateUser({
          ...userInDB,
          isInViolation: true,
          violationsInDetail,
        });
      } catch (error) {
        console.error(
          `Fail to record history of violation - OrderID: ${orderId}`,
          error
        );
      }
    }

    const updatedUser = await updateUserVouchers(
      userInDB,
      chargeInDB.orderVouchers,
      chargeInDB.orderHistory
    );
    await userService.updateUser(updatedUser);
    await chargeService.deleteChargeByOrderId(orderId);
  } catch (error) {
    console.error(`Error processing refund for orderId ${orderId}:`, error);
  }
}

async function updateUserVouchers(user, orderVouchers, orderHistory) {
  const safeUser = user || {};
  const safeVouchers = safeUser?.vouchers || {};
  const safeVouchersInDetail = safeUser?.vouchersInDetail || {};
  const safeOrderHistory = orderHistory || {};

  const updatedVouchers = { ...safeVouchers };
  const updatedVouchersInDetail = { ...safeVouchersInDetail };

  let isDone = false;

  try {
    if (safeOrderHistory && typeof safeOrderHistory === "object") {
      const orderHistoryEntries = Object.entries(safeOrderHistory);

      orderHistoryEntries?.forEach(([voucherType, oneVoucherInDetail]) => {
        if (updatedVouchersInDetail[voucherType]?.length > 0) {
          if (Array.isArray(oneVoucherInDetail)) {
            oneVoucherInDetail?.forEach((detail) => {
              const index = updatedVouchersInDetail[voucherType].findIndex(
                (voucher) => {
                  if (voucher?.[4] === detail && voucher?.length === 10)
                    return true;
                  if (
                    voucher?.[4] === detail &&
                    voucher?.length > 10 &&
                    new Date(voucher?.[10]) > new Date()
                  )
                    return true;
                  if (
                    voucher?.[4] === detail &&
                    voucher?.length > 10 &&
                    (voucher?.[10] === "" || voucher?.[10] === "NA")
                  )
                    return true;
                  return false;
                }
              );

              if (index !== -1) {
                updatedVouchersInDetail[voucherType][index][0] -=
                  oneVoucherInDetail?.[0];
                if (updatedVouchersInDetail[voucherType]?.[index]?.[0] <= 0) {
                  updatedVouchersInDetail[voucherType].splice(index, 1);
                }
                isDone = true;
              }
            });
          }

          if (updatedVouchersInDetail[voucherType]?.length === 0) {
            updatedVouchersInDetail[voucherType] = [];
          }
        }
      });
    }
  } catch (entriesError) {
    console.error("Object.entries 처리 중 에러:", entriesError);
  }

  if (isDone && Array.isArray(orderVouchers)) {
    orderVouchers?.forEach(([voucherType, count]) => {
      if (updatedVouchers?.[voucherType] !== undefined) {
        updatedVouchers[voucherType] -= count;
        if (updatedVouchers?.[voucherType] < 0)
          updatedVouchers[voucherType] = 0;
      }
    });
  }

  return {
    ...safeUser,
    vouchers: { ...safeUser?.vouchers, ...updatedVouchers },
    vouchersInDetail: {
      ...safeUser?.vouchersInDetail,
      ...updatedVouchersInDetail,
    },
  };
}

module.exports = chargeController;
