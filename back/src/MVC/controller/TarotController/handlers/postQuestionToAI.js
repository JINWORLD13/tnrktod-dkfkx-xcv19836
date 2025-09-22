const tarotCardInterpreterWithAIAPI = require("../../../../AI/tarotCardInterpreterWithAIAPI.js");
const redisClient = require("../../../../cache/redisClient.js");
const AppError = require("../../../../misc/AppError.js");
const {
  checkViolationInGoogleInAppRefund,
} = require("../../../../misc/checkViolation.js");
const { userService, chargeService } = require("../../../service/index.js");
const checkVouchers = require("../utils/checkVouchers.js");
const createTarotAndSendResponse = require("../utils/createTarotAndSendResponse.js");
const processInterpretation = require("../utils/processInterpretation.js");
const processVoucherConsumption = require("../utils/processVoucherConsumption.js");
async function postQuestionToAI(req, res, next, modelNumber) {
  try {
    const userId = req?.user ?? req?.session?.user?.id ?? null;
    req.user = userId;
    if (req?.isAuthenticated() === true) {
      const inputQuestionData = req?.body;
      const cachedUser = await redisClient.get(`user:${userId}`);
      const userInfo = cachedUser
        ? cachedUser
        : await userService.getUserById(userId);
      const cardCount = inputQuestionData?.spreadInfo?.cardCount;
      const userVouchers = userInfo?.vouchers;
      if (
        (modelNumber === 2 && inputQuestionData?.isVoucherModeOn) ||
        modelNumber === 3 ||
        modelNumber === 4
      ) {
        if (
          !checkVouchers(
            modelNumber,
            cardCount,
            userVouchers,
            inputQuestionData
          )
        ) {
          return res.status(500).json({ success: false });
        }
      }
      if (
        modelNumber === 2 &&
        !inputQuestionData?.isVoucherModeOn &&
        userInfo?.adsFreePass &&
        userInfo?.adsFreePass?.name &&
        userInfo?.adsFreePass?.orderId &&
        userInfo?.adsFreePass?.expired &&
        userInfo?.adsFreePass?.name !== "" &&
        userInfo?.adsFreePass?.orderId !== "" &&
        userInfo?.adsFreePass?.expired !== ""
      ) {
        const chargeInfo = await chargeService.getChargeByOrderId(
          userInfo?.adsFreePass?.orderId
        );
        if (!chargeInfo || !chargeInfo?.orderId) {
          await userService.updateUser({
            ...userInfo,
            adsFreePass: { name: "", orderId: "", expired: "" },
          });
          return res.status(500).json({ success: false });
        }
        if (new Date(userInfo?.adsFreePass?.expired) < new Date()) {
          return res.status(500).json({ success: false });
        }
      }
      const isViolated = checkViolationInGoogleInAppRefund(res, userInfo);
      if (isViolated) {
        return; 
      }
      let interpretation;
      if (modelNumber === 2 || modelNumber === 3 || modelNumber === 4) {
        interpretation = await tarotCardInterpreterWithAIAPI(
          {
            ...inputQuestionData,
          },
          modelNumber
        );
      }
      const interpretationWithoutQuestion = processInterpretation(
        interpretation,
        inputQuestionData
      );
      if (process.env.NODE_ENV === "DEVELOPMENT") {
        console.log("final answer : \n", interpretationWithoutQuestion);
      }
      let type;
      if (modelNumber === 2) {
        type = "anthropic_normal";
      } else if (modelNumber === 3) {
        type = "anthropic_deep";
      } else if (modelNumber === 4) {
        type = "anthropic_serious";
      }
      await redisClient.del(`user:${userId}`);
      await redisClient.del(`cache:tarot:${userId}`);
      if (
        inputQuestionData.tarotSpreadVoucherPrice !== undefined &&
        inputQuestionData.tarotSpreadVoucherPrice !== null
      ) {
        const updatedUserInfo = await processVoucherConsumption(
          userInfo,
          inputQuestionData
        );
        await redisClient.set(`user:${userId}`, updatedUserInfo, 3600); 
        await createTarotAndSendResponse(
          inputQuestionData,
          interpretationWithoutQuestion,
          type,
          updatedUserInfo,
          res
        );
      } else {
        const updatedUserInfo = await userService.updateUser({
          ...userInfo,
        });
        await redisClient.set(`user:${userId}`, updatedUserInfo, 3600); 
        await createTarotAndSendResponse(
          inputQuestionData,
          interpretationWithoutQuestion,
          type,
          userInfo,
          res
        );
      }
    } else {
      next(
        new AppError(
          commonErrors.tarotControllerPostQuestionError,
          commonErrors.userInfoNotFoundError,
          404
        )
      );
    }
  } catch (err) {
    next(new AppError(err.name, err.message, err.statusCode));
  }
}
module.exports = postQuestionToAI;
