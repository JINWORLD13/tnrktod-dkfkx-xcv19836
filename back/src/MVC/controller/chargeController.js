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

let orderIdForGooglePlay;

let vouchersArrForRefundToWebHook = [];
let vouchersObjForRefund = {};
let requestCountForMax = 0;
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
      const purchaseLimitArr = await chargeService.getChargesByProductId(
        productId
      );
      if (!purchaseLimitArr) {
        return res
          .status(404)
          .json({ success: false, message: "Purchase limit not found" });
      }

      const userInDB = await userService.getUserById(userId);
      const hasUserPurchased = purchaseLimitArr.some((charge, index) => {
        return charge?.userInfo?.equals(userInDB?._id);
      });

      let OverCountToStopFromPurchasingAgain = 0;
      OverCountToStopFromPurchasingAgain = hasUserPurchased
        ? 1000000000000000
        : 0;

      if (productId === process.env.PRODUCT_EVENT_PACKAGE) {
        res.status(200).json({
          success: true,
          purchaseLimit:
            purchaseLimitArr?.length + OverCountToStopFromPurchasingAgain,
        });
      } else if (productId === "cosmos_vouchers_bundle_package_newbie") {
        res.status(200).json({
          success: true,
          purchaseLimit: OverCountToStopFromPurchasingAgain,
        });
      }
    } catch (error) {
      console.error("Error fetching purchase limit:", error);
      next(new AppError(error?.message, commonErrors.chargeController, 500));
    }
  },
  async postPrePaymentForToss(req, res, next) {
    try {
      const userId = req?.user ?? req?.session?.user?.id ?? null;
      req.user = userId;
      if (req?.isAuthenticated() === true) {
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
          ...rest
        } = req.body;
        if (orderId === "" || orderId === undefined) return;
        const userInDB = await userService.getUserById(userId);
        let createdChargeInfo;
        if (method === "가상계좌") {
          createdChargeInfo = await chargeService.createChargeForTossPrePayment(
            {
              orderId,
              paymentKey,
              orderName,
              orderHistory,
              orderVouchers: orderVouchersArr,
              refundReceiveAccount: {
                bank: "XX",
                accountNumber: "XXXXXXXXX",
                holderName: "XXX",
              },
              amount,
              currency,
              country,
              method,
              apiName,
              userInfo: userInDB,
            }
          );
        } else if (method !== "가상계좌") {
          createdChargeInfo = await chargeService.createChargeForTossPrePayment(
            {
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
            }
          );
        }

        res.status(200).json({
          success: true,
          message: "PrePayment for Toss processed successfully",
          createdChargeInfo,
        });
      } else {
        next(
          new AppError(
            commonErrors.chargeControllerPostPrePaymentForTossError,
            commonErrors.userInfoNotFoundError,
            404
          )
        );
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

        const updatedChargeInDB = await chargeService.getChargeByOrderId(
          orderId
        );
        const updatedOrderHistory = updatedChargeInDB.orderHistory;
        const keysArrOfOrderHistory = Object.keys(updatedOrderHistory) || [];
        const updatedUserInDB = await userService.getUserById(userId);
        let updatedVouchersInDetail2 = { ...updatedUserInDB?.vouchersInDetail };
        keysArrOfOrderHistory?.forEach((key) => {
          const lastVoucher =
            updatedVouchersInDetail2?.[key]?.[
              updatedVouchersInDetail2?.[key]?.length - 1
            ] ?? [];

          if (lastVoucher?.length === 0) return;

          if (lastVoucher?.[4] === orderId) {
            if (updatedOrderHistory?.[key]?.[5] !== undefined) {
              lastVoucher[5] = updatedOrderHistory?.[key]?.[5];
            }

            if (updatedChargeInDB?.paymentKey !== undefined) {
              lastVoucher[8] = updatedChargeInDB?.paymentKey;
            }
          }
        });

        await userService.updateUser({
          ...updatedUserInDB,
          vouchersInDetail: updatedVouchersInDetail2,
        });

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
    if (orderId === "" || orderId === undefined) res.status(200).end();

    if (process.env.NODE_ENV === "DEVELOPMENT") {
      console.log("웹훅 호출 시 status: ", status);
      console.log("웹훅 호출 시 method: ", req?.body?.data?.method);
      console.log("웹훅 호출 시 requestCountForMax : ", requestCountForMax);
    }

    const chargeInDB = await chargeService.getChargeByOrderId(orderId);

    if (chargeInDB === null || chargeInDB === undefined) return;
    const userObjId = chargeInDB?.userInfo;
    const orderVouchers = chargeInDB?.orderVouchers;
    const userInDB = await userService.getUserByObjId(userObjId);
    await redisClient.del(`userInfo:${userInDB?.id}`);
    const vouchers = userInDB?.vouchers;

    if (
      req?.body?.data !== undefined &&
      req?.body?.data?.method !== "가상계좌"
    ) {
      if (status === "DONE") {
        if (process.env.NODE_ENV === "DEVELOPMENT") console.log("들어왔니?1");
        await chargeService.putChargeByOrderId(orderId, {
          apiName: "Toss",
          orderHistory: {
            ...Object.fromEntries(
              Object.entries(chargeInDB.orderHistory).map(
                ([key, valueOfArray]) => {
                  valueOfArray[5] = chargeInDB.createdAt;
                  valueOfArray[8] = chargeInDB.paymentKey;
                  return [key, valueOfArray];
                }
              )
            ),
          },
        });

        const updatedChargeInDB = await chargeService.getChargeByOrderId(
          orderId
        );
        const updatedOrderHistory = updatedChargeInDB.orderHistory;
        const keysArrOfOrderHistory = Object.keys(updatedOrderHistory);
        const updatedUserInDB = await userService.getUserByObjId(userObjId);
        let updatedVouchersInDetail2 = { ...updatedUserInDB?.vouchersInDetail };
        keysArrOfOrderHistory?.forEach((key, i) => {
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
              updatedVouchersInDetail2[key]?.length - 1
            ][8] = updatedChargeInDB?.paymentKey;
          }
        });
        await userService.updateUser({
          ...updatedUserInDB,
          vouchersInDetail: updatedVouchersInDetail2,
        });

        res.status(200).json({ success: true });
        return;
      }

      if (status === "CANCELED") {
        if (process.env.NODE_ENV === "DEVELOPMENT") console.log("들어왔니?2");
        if (requestCountForMax === 0 || requestCountForMax === undefined)
          return;
        if (process.env.NODE_ENV === "DEVELOPMENT")
          console.log("전액 취소 웹훅 진입");
        if (requestCountForMax === 1) {
          let updatedVouchers = { ...vouchers };
          const keysArr = Object.keys(vouchersObjForRefund);
          const updatedVouchersArr = keysArr.map((key) => {
            let box = [key, 0];
            vouchersObjForRefund?.[key]?.forEach((arr) => {
              box[1] = box?.[1] + arr?.[0];
            });
            return box;
          });
          vouchersArrForRefundToWebHook = [...updatedVouchersArr];

          if (vouchersArrForRefundToWebHook?.length === 0) return;
          vouchersArrForRefundToWebHook?.forEach((voucher) => {
            const key = voucher?.[0];
            const newValue = vouchers?.[key] - voucher[1];
            if (newValue < 0) {
              updatedVouchers[key] = 0;
            } else {
              updatedVouchers[key] = newValue;
            }
          });

          let updatedVouchersInDetail = Object.fromEntries(
            Object.entries(vouchersObjForRefund).map(([key, arrOfArray]) => {
              let vouchersInDetailOfUser;
              if (
                userInDB?.vouchersInDetail === undefined ||
                userInDB?.vouchersInDetail === null
              ) {
                vouchersInDetailOfUser = { [key]: [] };
              } else {
                if (
                  userInDB?.vouchersInDetail[key] === undefined ||
                  userInDB?.vouchersInDetail[key] === null ||
                  userInDB?.vouchersInDetail?.[key]?.length === 0
                ) {
                  vouchersInDetailOfUser = {
                    ...userInDB?.vouchersInDetail,
                    [key]: [],
                  };
                } else {
                  vouchersInDetailOfUser = userInDB?.vouchersInDetail;
                }
              }
              let doubleArray = [...vouchersInDetailOfUser?.[key]] || [];

              arrOfArray?.forEach((arr, i) => {
                doubleArray?.forEach((array) => {
                  if (array?.[4] === arr?.[4] && Array.isArray(array)) {
                    array[0] = array?.[0] - arr?.[0];
                  }
                });
              });
              let updatedDoubleArray = doubleArray?.filter(
                (array, i) => array?.[0] !== 0
              );
              return [key, updatedDoubleArray];
            })
          );

          await userService.updateUser({
            ...userInDB,
            vouchersInDetail: {
              ...userInDB?.vouchersInDetail,
              ...updatedVouchersInDetail,
            },
            vouchers: updatedVouchers,
          });

          const minimumRefundableLimit =
            (req?.body?.data?.cancels?.[0]?.cancelAmount +
              req?.body?.data?.cancels?.[0]?.refundableAmount) *
            0;
          const remainingAmount =
            req?.body?.data?.cancels[req?.body?.data?.cancels?.length - 1]
              ?.refundableAmount;
          if (req?.body?.data?.cancels?.length > 0) {
            if (remainingAmount <= minimumRefundableLimit) {
              await chargeService.deleteChargeByOrderId(orderId);
            }
          }
          if (requestCountForMax >= 1) requestCountForMax -= 1;
          res.status(200).json({});
          return;
        }

        if (requestCountForMax >= 1) requestCountForMax -= 1;
        res.status(200).json({});
        return;
      }

      if (status === "PARTIAL_CANCELED") {
        if (requestCountForMax === 0 || requestCountForMax === undefined)
          return;
        if (process.env.NODE_ENV === "DEVELOPMENT")
          console.log("부분 취소 웹훅 진입");
        if (requestCountForMax === 1) {
          let updatedVouchers = { ...vouchers };
          const keysArr = Object.keys(vouchersObjForRefund);
          const updatedVouchersArr = keysArr.map((key) => {
            let box = [key, 0];
            vouchersObjForRefund?.[key]?.forEach((arr) => {
              box[1] = box?.[1] + arr?.[0];
            });
            return box;
          });
          vouchersArrForRefundToWebHook = [...updatedVouchersArr];

          if (vouchersArrForRefundToWebHook?.length === 0) return;
          vouchersArrForRefundToWebHook?.forEach((voucher) => {
            const key = voucher?.[0];
            const newValue = vouchers?.[key] - voucher[1];
            if (newValue < 0) {
              updatedVouchers[key] = 0;
            } else {
              updatedVouchers[key] = newValue;
            }
          });

          let updatedVouchersInDetail = Object.fromEntries(
            Object.entries(vouchersObjForRefund).map(([key, arrOfArray]) => {
              let vouchersInDetailOfUser;
              if (
                userInDB?.vouchersInDetail === undefined ||
                userInDB?.vouchersInDetail === null
              ) {
                vouchersInDetailOfUser = { [key]: [] };
              } else {
                if (
                  userInDB?.vouchersInDetail[key] === undefined ||
                  userInDB?.vouchersInDetail[key] === null ||
                  userInDB?.vouchersInDetail?.[key]?.length === 0
                ) {
                  vouchersInDetailOfUser = {
                    ...userInDB?.vouchersInDetail,
                    [key]: [],
                  };
                } else {
                  vouchersInDetailOfUser = userInDB?.vouchersInDetail;
                }
              }
              let doubleArray = [...vouchersInDetailOfUser?.[key]] || [];

              arrOfArray?.forEach((arr, i) => {
                doubleArray?.forEach((array) => {
                  if (array?.[4] === arr?.[4] && Array.isArray(array)) {
                    array[0] = array?.[0] - arr?.[0];
                  }
                });
              });
              let updatedDoubleArray = doubleArray?.filter(
                (array, i) => array?.[0] !== 0
              );
              return [key, updatedDoubleArray];
            })
          );

          await userService.updateUser({
            ...userInDB,
            vouchersInDetail: {
              ...userInDB?.vouchersInDetail,
              ...updatedVouchersInDetail,
            },
            vouchers: updatedVouchers,
          });

          const minimumRefundableLimit =
            (req?.body?.data?.cancels?.[0]?.cancelAmount +
              req?.body?.data?.cancels?.[0]?.refundableAmount) *
            remainingPercentage;
          const remainingAmount =
            req?.body?.data?.cancels[req?.body?.data?.cancels?.length - 1]
              ?.refundableAmount;
          if (req?.body?.data?.cancels?.length > 0) {
            if (remainingAmount <= minimumRefundableLimit) {
              await chargeService.deleteChargeByOrderId(orderId);
            }
          }
          if (requestCountForMax >= 1) requestCountForMax -= 1;
          res.status(200).json({});
          return;
        }
        if (requestCountForMax >= 1) requestCountForMax -= 1;
        res.status(200).json({});
        return;
      }
    }

    const orderVouchersObj = Object.fromEntries(
      orderVouchers
        ?.filter((elem) => elem !== undefined)
        ?.map((elem) => [elem?.[0], elem[1]])
    );

    if (status === "DONE") {
      let updatedVouchersInDetail = Object.fromEntries(
        Object.entries(chargeInDB?.orderHistory).map(([key, valueOfArray]) => {
          let vouchersInDetailOfUser;
          if (
            userInDB?.vouchersInDetail === undefined ||
            userInDB?.vouchersInDetail === null
          ) {
            vouchersInDetailOfUser = { [key]: [] };
          } else {
            if (
              userInDB?.vouchersInDetail[key] === undefined ||
              userInDB?.vouchersInDetail[key] === null
            ) {
              vouchersInDetailOfUser = {
                ...userInDB?.vouchersInDetail,
                [key]: [],
              };
            } else {
              vouchersInDetailOfUser = userInDB?.vouchersInDetail;
            }
          }
          const doubleArray = [...vouchersInDetailOfUser?.[key]] || [];
          doubleArray.push(valueOfArray);
          return [key, doubleArray];
        })
      );

      let updatedVouchers = { ...vouchers };
      orderVouchers?.forEach((elem) => {
        const key = elem?.[0];
        const newValue = vouchers?.[key] + elem[1];

        updatedVouchers[key] = newValue;
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
            Object.entries(chargeInDB.orderHistory).map(
              ([key, valueOfArray]) => {
                valueOfArray[5] = chargeInDB.createdAt;
                valueOfArray[8] = chargeInDB.paymentKey;
                return [key, valueOfArray];
              }
            )
          ),
        },
      });

      const updatedChargeInDB = await chargeService.getChargeByOrderId(orderId);
      const updatedOrderHistory = updatedChargeInDB.orderHistory;
      const keysArrOfOrderHistory = Object.keys(updatedOrderHistory);
      const updatedUserInDB = await userService.getUserByObjId(userObjId);
      let updatedVouchersInDetail2 = { ...updatedUserInDB?.vouchersInDetail };
      keysArrOfOrderHistory?.forEach((key, i) => {
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

      res.status(200).json({ success: true });
      return;
    }

    if (status === "CANCELED") {
      if (chargeInDB.apiName === "Toss") {
        if (requestCountForMax === 0 || requestCountForMax === undefined)
          return;
        if (process.env.NODE_ENV === "DEVELOPMENT")
          console.log("전액 취소 웹훅 진입 - 가상계좌");
        if (requestCountForMax === 1) {
          let updatedVouchers = { ...vouchers };
          const keysArr = Object.keys(vouchersObjForRefund);
          const updatedVouchersArr = keysArr.map((key) => {
            let box = [key, 0];
            vouchersObjForRefund?.[key]?.forEach((arr) => {
              box[1] = box?.[1] + arr?.[0];
            });
            return box;
          });
          vouchersArrForRefundToWebHook = [...updatedVouchersArr];

          if (vouchersArrForRefundToWebHook?.length === 0) return;
          vouchersArrForRefundToWebHook?.forEach((voucher) => {
            const key = voucher?.[0];
            const newValue = vouchers?.[key] - voucher[1];
            if (newValue < 0) {
              updatedVouchers[key] = 0;
            } else {
              updatedVouchers[key] = newValue;
            }
          });

          let updatedVouchersInDetail = Object.fromEntries(
            Object.entries(vouchersObjForRefund).map(([key, arrOfArray]) => {
              let vouchersInDetailOfUser;
              if (
                userInDB?.vouchersInDetail === undefined ||
                userInDB?.vouchersInDetail === null
              ) {
                vouchersInDetailOfUser = { [key]: [] };
              } else {
                if (
                  userInDB?.vouchersInDetail[key] === undefined ||
                  userInDB?.vouchersInDetail[key] === null ||
                  userInDB?.vouchersInDetail?.[key]?.length === 0
                ) {
                  vouchersInDetailOfUser = {
                    ...userInDB?.vouchersInDetail,
                    [key]: [],
                  };
                } else {
                  vouchersInDetailOfUser = userInDB?.vouchersInDetail;
                }
              }
              let doubleArray = [...vouchersInDetailOfUser?.[key]] || [];

              arrOfArray?.forEach((arr, i) => {
                doubleArray?.forEach((array) => {
                  if (array?.[4] === arr?.[4] && Array.isArray(array)) {
                    array[0] = array?.[0] - arr?.[0];
                  }
                });
              });
              let updatedDoubleArray = doubleArray?.filter(
                (array, i) => array?.[0] !== 0
              );
              return [key, updatedDoubleArray];
            })
          );

          await userService.updateUser({
            ...userInDB,
            vouchersInDetail: {
              ...userInDB?.vouchersInDetail,
              ...updatedVouchersInDetail,
            },
            vouchers: updatedVouchers,
          });

          const minimumRefundableLimit =
            (req?.body?.data?.cancels?.[0]?.cancelAmount +
              req?.body?.data?.cancels?.[0]?.refundableAmount) *
            0;
          const remainingAmount =
            req?.body?.data?.cancels[req?.body?.data?.cancels?.length - 1]
              ?.refundableAmount;
          if (req?.body?.data?.cancels?.length > 0) {
            if (remainingAmount <= minimumRefundableLimit) {
              await chargeService.deleteChargeByOrderId(orderId);
            }
          }
          if (requestCountForMax >= 1) requestCountForMax -= 1;
          res.status(200).json({});
          return;
        }
        if (requestCountForMax >= 1) requestCountForMax -= 1;
        res.status(200).json({});
        return;
      }

      if (chargeInDB.apiName === "Toss(미입금상태)") {
        await chargeService.deleteChargeByOrderId(orderId);
        res.status(200).json({ status });
        return;
      }
    }

    if (status === "PARTIAL_CANCELED") {
      if (requestCountForMax === 0 || requestCountForMax === undefined) return;
      if (process.env.NODE_ENV === "DEVELOPMENT")
        console.log("부분 취소 웹훅 진입 - 가상계좌");

      if (requestCountForMax === 1) {
        let updatedVouchers = { ...vouchers };
        const keysArr = Object.keys(vouchersObjForRefund);
        const updatedVouchersArr = keysArr.map((key) => {
          let box = [key, 0];
          vouchersObjForRefund?.[key]?.forEach((arr) => {
            box[1] = box?.[1] + arr?.[0];
          });
          return box;
        });
        vouchersArrForRefundToWebHook = [...updatedVouchersArr];

        if (vouchersArrForRefundToWebHook?.length === 0) return;
        vouchersArrForRefundToWebHook?.forEach((voucher) => {
          const key = voucher?.[0];
          const newValue = vouchers?.[key] - voucher[1];
          if (newValue < 0) {
            updatedVouchers[key] = 0;
          } else {
            updatedVouchers[key] = newValue;
          }
        });

        let updatedVouchersInDetail = Object.fromEntries(
          Object.entries(vouchersObjForRefund).map(([key, arrOfArray]) => {
            let vouchersInDetailOfUser;
            if (
              userInDB?.vouchersInDetail === undefined ||
              userInDB?.vouchersInDetail === null
            ) {
              vouchersInDetailOfUser = { [key]: [] };
            } else {
              if (
                userInDB?.vouchersInDetail?.[key] === undefined ||
                userInDB?.vouchersInDetail?.[key] === null ||
                userInDB?.vouchersInDetail?.[key]?.length === 0
              ) {
                vouchersInDetailOfUser = {
                  ...userInDB?.vouchersInDetail,
                  [key]: [],
                };
              } else {
                vouchersInDetailOfUser = userInDB?.vouchersInDetail;
              }
            }
            let doubleArray = [...vouchersInDetailOfUser?.[key]] || [];

            arrOfArray?.forEach((arr, i) => {
              doubleArray?.forEach((array) => {
                if (array?.[4] === arr?.[4] && Array.isArray(array)) {
                  array[0] = array?.[0] - arr?.[0];
                }
              });
            });
            let updatedDoubleArray = doubleArray?.filter(
              (array, i) => array?.[0] !== 0
            );
            return [key, updatedDoubleArray];
          })
        );

        await userService.updateUser({
          ...userInDB,
          vouchersInDetail: {
            ...userInDB?.vouchersInDetail,
            ...updatedVouchersInDetail,
          },
          vouchers: updatedVouchers,
        });

        const minimumRefundableLimit =
          (req?.body?.data?.cancels?.[0]?.cancelAmount +
            req?.body?.data?.cancels?.[0]?.refundableAmount) *
          remainingPercentage;
        const remainingAmount =
          req?.body?.data?.cancels[req?.body?.data?.cancels?.length - 1]
            ?.refundableAmount;
        if (req?.body?.data?.cancels?.length > 0) {
          if (remainingAmount <= minimumRefundableLimit) {
            await chargeService.deleteChargeByOrderId(orderId);
          }
        }
        if (requestCountForMax >= 1) requestCountForMax -= 1;
        res.status(200).json({});
        return;
      }
      if (requestCountForMax >= 1) requestCountForMax -= 1;
      res.status(200).json({});
      return;
    }
    res.status(200).end();
  },

  async postConfirmForToss(req, res, next) {
    const userId = req?.user ?? req?.session?.user?.id ?? null;
    req.user = userId;
    await redisClient.del(`userInfo:${userId}`);

    const { paymentKey, orderId, amount } = req.body;
    if (paymentKey === undefined || paymentKey === null || paymentKey === "")
      return;
    if (orderId === undefined || orderId === null || orderId === "") return;
    if (amount === undefined || amount === null || amount === 0) return;

    const chargeInfo = await chargeService.getChargeByOrderId(orderId);

    if (chargeInfo === null || chargeInfo === undefined) {
      res.status(500).json({});
      return;
    }

    let widgetSecretKey;
    if (
      chargeInfo?.orderHistory &&
      Object.values(chargeInfo?.orderHistory)?.[0]?.[7] === "KRW"
    ) {
      widgetSecretKey = process.env.TOSS_SECRET_KEY;
    } else if (
      chargeInfo?.orderHistory &&
      Object.values(chargeInfo?.orderHistory)?.[0]?.[7] === "USD"
    ) {
      widgetSecretKey = process.env.TOSS_SECRET_KEY_FOR_PAYPAL;
    }
    const encryptedSecretKey =
      "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");

    await axios
      .post(
        process.env.TOSS_CONFIRM_URL,
        {
          orderId: orderId,
          amount: amount,
          paymentKey: paymentKey,
        },
        {
          headers: {
            Authorization: encryptedSecretKey,
            "Content-Type": "application/json",
          },
          responseType: "json",
        }
      )
      .then(async (response) => {
        if (chargeInfo?.method === "가상계좌") {
          const refundReceiveAccount = {
            ...response?.data?.virtualAccount?.refundReceiveAccount,
          };
          await chargeService.putChargeByOrderId(orderId, {
            paymentKey,
            refundReceiveAccount: {
              bank:
                refundReceiveAccount?.bankCode ||
                response?.data?.virtualAccount?.refundReceiveAccount?.bank,
              accountNumber: refundReceiveAccount?.accountNumber,
              holderName: refundReceiveAccount?.holderName,
            },
            apiName: "Toss(미입금상태)",
          });
          res.status(200).json();
          return;
        }

        const { orderHistory, orderVouchers, ...rest } =
          await chargeService.getChargeByOrderId(orderId);
        const userInDB = await userService.getUserById(userId);

        let updatedVouchersInDetail = Object.fromEntries(
          Object.entries(orderHistory).map(([key, valueOfArray]) => {
            let vouchersInDetailOfUser;
            if (
              userInDB?.vouchersInDetail === undefined ||
              userInDB?.vouchersInDetail === null
            ) {
              vouchersInDetailOfUser = { [key]: [] };
            } else {
              if (
                userInDB?.vouchersInDetail[key] === undefined ||
                userInDB?.vouchersInDetail[key] === null ||
                userInDB?.vouchersInDetail?.[key]?.length === 0
              ) {
                vouchersInDetailOfUser = {
                  ...userInDB?.vouchersInDetail,
                  [key]: [],
                };
              } else {
                vouchersInDetailOfUser = userInDB?.vouchersInDetail;
              }
            }
            const doubleArray = [...vouchersInDetailOfUser?.[key]] || [];
            doubleArray.push(valueOfArray);
            return [key, doubleArray];
          })
        );

        const vouchers = userInDB.vouchers;
        let updatedVouchers = { ...vouchers };
        orderVouchers?.forEach((elem) => {
          if (elem === null || elem === undefined) return;
          const key = elem?.[0];
          const newValue = vouchers?.[key] + elem[1];

          updatedVouchers[key] = newValue;
        });

        let updatedUserInfo = await userService.updateUser({
          ...userInDB,
          vouchersInDetail: {
            ...userInDB?.vouchersInDetail,
            ...updatedVouchersInDetail,
          },
          vouchers: { ...updatedVouchers },
        });
        await redisClient.set(`userInfo:${userId}`, updatedUserInfo, 3600);

        res
          .status(200)
          .status(response.request.res.statusCode)
          .json(response.data);
      })
      .catch((error) => {
        console.error(error);

        res.status(200).json(error);
      });
  },

  async postPartialCancelForToss(req, res, next) {
    const userId = req?.user ?? req?.session?.user?.id ?? null;
    req.user = userId;
    await redisClient.del(`userInfo:${userId}`);

    const vouchersArrForRefund = Object.values(req.body)?.flat(1);

    if (vouchersArrForRefund?.length === 0) return;
    if (vouchersArrForRefund?.length >= 1) {
      if (vouchersArrForRefund?.[0]?.length === 0) return;
    }

    requestCountForMax = vouchersArrForRefund?.length ?? 0;

    let cancelReason;
    let widgetSecretKey;

    let filteredObj = {};
    const cancelPromises = vouchersArrForRefund.map(async (voucher, index) => {
      const orderId = voucher[4];
      const paymentKey = voucher[8];
      const listPrice = voucher[1];
      const quantity = voucher?.[0];
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
          widgetSecretKey = process.env.TOSS_SECRET_KEY;
          cancelReason = "고객이 취소를 원함.";
          cancelOption = {
            cancelReason: cancelReason,
            cancelAmount: cancelAmount,
          };
        } else if (currency === "USD") {
          widgetSecretKey = process.env.TOSS_SECRET_KEY_FOR_PAYPAL;
          cancelReason = "The customer has asked to cancel.";
          cancelOption = {
            cancelReason: cancelReason,
            cancelAmount: cancelAmount,
            currency: currency,
          };
        }
      } else if (payMethod === "가상계좌") {
        const chargeInfo = await chargeService.getChargeByOrderId(orderId);
        widgetSecretKey = process.env.TOSS_SECRET_KEY;
        cancelReason = "고객이 취소를 원함.";
        const refundReceiveAccount = chargeInfo?.refundReceiveAccount;
        cancelOption = {
          cancelReason: cancelReason,
          cancelAmount: cancelAmount,
          refundReceiveAccount: { ...refundReceiveAccount },
        };
      }

      const encryptedSecretKey =
        "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");

      if (Object.values(filteredObj)?.flat())
        await new Promise((resolve) => setTimeout(resolve, index * 1500));

      try {
        const response = await axios.post(
          `${process.env.TOSS_CANCEL_URL}/${paymentKey}/cancel`,
          {
            ...cancelOption,
          },
          {
            headers: {
              Authorization: encryptedSecretKey,
              "Content-Type": "application/json",
            },
          }
        );

        if (process.env.NODE_ENV === "DEVELOPMENT")
          console.log(`환불 성공(금액 : ${cancelAmount})`);
        vouchersObjForRefund = { ...filteredObj };

        return { success: true, response };
      } catch (error) {
        if (process.env.NODE_ENV === "DEVELOPMENT")
          console.log(
            "환불 실패 : ",

            error?.response?.data
          );
        if (process.env.NODE_ENV === "DEVELOPMENT")
          console.log(`환불 실패(금액 : ${cancelAmount})`);
        if (requestCountForMax >= 1) requestCountForMax -= 1;
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

        const keysArr = Object.keys(filteredObj);
        const updatedVouchersArr = keysArr.map((key) => {
          let box = [key, 0];
          filteredObj?.[key]?.forEach((arr) => {
            box[1] = box?.[1] + arr?.[0];
          });
          return box;
        });

        vouchersObjForRefund = { ...filteredObj };

        return { success: false, error };
      }
    });

    try {
      const results = await Promise.all(cancelPromises);

      const successResults = results?.filter((result) => result.success);
      const failureResults = results?.filter((result) => !result.success);
      if (successResults?.length > 0 && failureResults?.length === 0) {
        const statusCodeArr = successResults.map(
          (result) => result.response.request.res.statusCode
        );
        const dataArr = successResults.map(
          (result) => result.response.data.cancels
        );

        res.status(200).json({ statusCodeArr, dataArr, message: "response" });
      } else if (successResults?.length === 0 && failureResults?.length > 0) {
        res.status(200).json({ message: "error" });
      } else if (successResults?.length === 0 && failureResults?.length === 0) {
        res.status(200).json({ message: "nothing" });
      } else {
        res.status(200).json({ message: "both" });
      }
    } catch (error) {
      console.error("Error processing cancellations:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async postPartialCancelForToss1(req, res, next) {
    if (process.env.NODE_ENV === "DEVELOPMENT") console.log("들어옴 여기도");
    let widgetSecretKey = process.env.TOSS_SECRET_KEY_FOR_PAYPAL;
    let cancelReason1 = "The customer has asked to cancel.";

    const encryptedSecretKey1 =
      "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");

    if (process.env.NODE_ENV === "DEVELOPMENT")
      console.log("widgetSecretKey : ", widgetSecretKey);
    if (process.env.NODE_ENV === "DEVELOPMENT")
      console.log("encryptedSecretKey1 : ", encryptedSecretKey1);

    try {
      const response = await axios.post(
        `${process.env.TOSS_API_BASE_URL}/payments/${process.env.TEST_PAYMENT_KEY}/cancel`,
        {
          cancelReason: cancelReason1,
        },
        {
          headers: {
            Authorization: encryptedSecretKey1,
            "Content-Type": "application/json",
          },
        }
      );

      res.status(200).json({ message: "response" });
    } catch (error) {
      if (process.env.NODE_ENV === "DEVELOPMENT")
        console.log(
          "환불 실패시 console : ",

          error?.response?.data
        );
      res.status(200).json({ message: "error" });
    }
  },

  async postChargeForGooglePayStore(req, res, next) {
    try {
      const userId = req?.user ?? req?.session?.user?.id ?? null;
      req.user = userId;
      await redisClient.del(`userInfo:${userId}`);
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
        res
          .status(400)
          .json({ success: false, message: "Invalid purchase state" });
        return;
      }

      const isValidPurchase = await verifyPurchaseWithGooglePlay(
        packageName,
        productId,
        purchaseToken
      );
      if (!isValidPurchase) {
        res.status(400).json({ success: false, message: "Invalid purchase" });
        return;
      }

      let orderName = orderNameMaker(productId);
      if (orderName === "Unknown") {
        res.status(406).end();
        return;
      }
      if (
        email === process.env.COS1 ||
        email === process.env.COS2 ||
        accountId === process.env.COS1 ||
        accountId === process.env.COS2
      ) {
        consoleForReceipt(req);
      }

      if (orderId === "" || orderId === undefined) return;
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
      let createdChargeInfo;
      if (!existingChargeInfo && !existingChargeInfo?.orderId) {
        createdChargeInfo =
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
    console.log("postRefundForGooglePlayStore 호출");
    try {
      if (!req?.body || !req?.body?.message) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid request from pub/sub" });
      }

      const message = JSON.parse(
        Buffer.from(req.body.message.data, "base64").toString("utf-8")
      );
      console.log("Refund event:", JSON.stringify(message));

      const orderId = message?.voidedPurchaseNotification?.orderId || "";
      if (orderIdForGooglePlay !== orderId) orderIdForGooglePlay = orderId;
      if (orderIdForGooglePlay) {
        await processRefund(orderIdForGooglePlay);
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
};

async function processRefund(orderId) {
  try {
    console.log(`Processing refund for orderId: ${orderId}`);

    let chargeInDB;
    let userInDB;

    try {
      chargeInDB = await chargeService.getChargeByOrderId(orderId);
    } catch (err) {
      console.log(`No charge found for orderId: ${orderId}`);

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
      console.log(`No user found for orderId due to withdraw: ${orderId}`);

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
        } catch (objectError) {}
      } else {
        orderItem = null;
      }

      if (!orderItem) {
        console.log(`No order item found for orderId: ${orderId}`);
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
      console.log(
        `Violation detected - OrderID: ${orderId}, holding Vouchers: ${JSON.stringify(
          JSON.stringify(refundQuantity)
        )}, Requesting Amount: ${refundQuantity}, Time: ${new Date().toISOString()}`
      );

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
    next(new AppError(error?.message, commonErrors.chargeController, 500));
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
          } else {
          }

          if (updatedVouchersInDetail[voucherType]?.length === 0) {
            updatedVouchersInDetail[voucherType] = [];
          }
        } else {
        }
      });
    } else {
    }
  } catch (entriesError) {}

  if (isDone && Array.isArray(orderVouchers)) {
    orderVouchers?.forEach(([voucherType, count]) => {
      if (updatedVouchers?.[voucherType] !== undefined) {
        updatedVouchers[voucherType] -= count;
        if (updatedVouchers?.[voucherType] < 0)
          updatedVouchers[voucherType] = 0;
      }
    });
  }

  const result = {
    ...safeUser,
    vouchers: { ...safeUser?.vouchers, ...updatedVouchers },
    vouchersInDetail: {
      ...safeUser?.vouchersInDetail,
      ...updatedVouchersInDetail,
    },
  };

  return result;
}

module.exports = chargeController;
