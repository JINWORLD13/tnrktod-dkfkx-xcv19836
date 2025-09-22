const redisClient = require("../../../../cache/redisClient");
const AppError = require("../../../../misc/AppError");
const commonErrors = require("../../../../misc/commonErrors");
const { userService, tarotService } = require("../../../service");
const getTarotHistory = async (req, res, next) => {
  try {
    const userId = req?.user ?? req?.session?.user?.id ?? null;
    req.user = userId;
    if (req?.isAuthenticated() === true) {
      const cachedTarotHistory = await redisClient.get(
        `tarotHistory:${userId}`
      );
      if (cachedTarotHistory && cachedTarotHistory?.length > 0) {
        return res.status(200).json([...cachedTarotHistory]);
      }
      const userInfo = await userService.getUserById(userId);
      const userObjId = userInfo?._id;
      const tarotHistoryArr = await tarotService.getHistoryByUserId(userObjId);
      if (
        !cachedTarotHistory ||
        cachedTarotHistory === "" ||
        cachedTarotHistory?.length === 0
      ) {
        await redisClient.set(`tarotHistory:${userId}`, tarotHistoryArr, 3600); 
      }
      res.status(200).json([...tarotHistoryArr]);
    } else {
      next(
        new AppError(
          commonErrors.tarotControllerGetHistoryError,
          commonErrors.userInfoNotFoundError,
          404
        )
      );
    }
  } catch (err) {
    next(new AppError(err.name, err.message, err.statusCode));
  }
};
module.exports = getTarotHistory;
