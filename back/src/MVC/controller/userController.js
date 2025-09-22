const { sanitizeObject, buildResponse } = require("../../misc/util");
const AppError = require("../../misc/AppError");
const commonErrors = require("../../misc/commonErrors");
const {
  userService,
  tarotService,
  chargeService,
  deletedUserService,
} = require("../service");
const redisClient = require("../../cache/redisClient");
const userController = {
  async createUser(req, res, next) {
    try {
      const userId = req?.user ?? req?.session?.user?.id ?? null;
      const userInfo = await userService.getUserById(userId);
      if (!userInfo) {
        const transmittedUserInfo = req?.body.userInfo;
        if (!transmittedUserInfo) {
          return next(
            new AppError(
              "UserInfoMissing",
              "User info is required to create a new user",
              400
            )
          );
        }
        const newUser = await userService.createUser(transmittedUserInfo);
        res?.status(200).json(buildResponse(newUser, null, 200));
      } else {
        next(
          new AppError(
            commonErrors.userControllerCreaetUserError,
            commonErrors.userInfoConflictError,
            409
          )
        );
      }
    } catch (err) {
      const customedError = new AppError(err.name, err.message, 401);
      next(customedError);
    }
  },
  async getUserById(req, res, next) {
    try {
      const userId = req?.user ?? req?.session?.user?.id ?? null;
      req.user = userId;
      if (req?.isAuthenticated() === true) {
        const cachedUser = await redisClient.get(`user:${userId}`);
        if (cachedUser) {
          return res.status(200).json(buildResponse(cachedUser, null, 200));
        }
        let finalUserInfo;
        const userInDB = await userService.getUserById(userId);
        if (userInDB === undefined || userInDB === null) {
          next(
            new AppError(
              commonErrors.userControllerGetUserByIdError,
              commonErrors.userInfoNotFoundError,
              404
            )
          );
        }
        finalUserInfo = userInDB;
        const hasValidAdsFreePass = (pass) => {
          return pass?.name && pass?.orderId && pass?.expired;
        };
        if (hasValidAdsFreePass(userInDB?.adsFreePass)) {
          const chargeInfo = await chargeService.getChargeByOrderId(
            userInDB?.adsFreePass?.orderId
          );
          if (!chargeInfo || !chargeInfo?.orderId) {
            finalUserInfo = await userService.updateUser({
              ...userInDB,
              adsFreePass: { name: "", orderId: "", expired: "" },
            });
          }
        }
        await redisClient.set(`user:${userId}`, finalUserInfo, 3600); 
        res?.status(200).json(buildResponse(finalUserInfo, null, 200));
      } else {
        next(
          new AppError(
            commonErrors.userControllerGetUserByIdError,
            commonErrors.userUnauthorizedError,
            401
          )
        );
      }
    } catch (err) {
      next(new AppError(err.name, err.message, 401));
    }
  },
  async putUser(req, res, next) {
    try {
      const userId = req?.user ?? req?.session?.user?.id ?? null;
      req.user = userId;
      if (req?.isAuthenticated() === true) {
        const userInDB = await userService.getUserById(userId);
        if (userInDB === undefined || userInDB === null) {
          next(
            new AppError(
              commonErrors.userControllerPutUserError,
              commonErrors.userInfoNotFoundError,
              404
            )
          );
        }
        const transfferedInfo = req?.body;
        const updatedInfoArr = transfferedInfo?.filter(
          (elem) => elem.length > 0
        );
        const updatedUserInfo = { ...userInDB, ...updatedInfoArr };
        const result = await userService.updateUser(updatedUserInfo);
        res?.status(200).json(buildResponse(result, null, 200));
      } else {
        next(
          new AppError(
            commonErrors.userControllerPutUserError,
            commonErrors.userUnauthorizedError,
            401
          )
        );
      }
    } catch (err) {
      next(new AppError(err.name, err.message, 401));
    }
  },
  async deleteUser(req, res, next) {
    try {
      const userId = req?.user ?? req?.session?.user?.id ?? null;
      req.user = userId;
      if (req?.isAuthenticated() === true) {
        await redisClient.del(`user:${userId}`);
        await redisClient.del(`cache:tarot:${userId}`);
        const userInDB = await userService.getUserById(userId);
        if (userInDB === undefined || userInDB === null) {
          next(
            new AppError(
              commonErrors.userControllerDeleteUserError,
              commonErrors.userInfoNotFoundError,
              404
            )
          );
        }
        const result = await tarotService.deleteTarotsByUserObjId(userInDB._id);
        const resultOfDeleteCharge =
          await chargeService.deleteChargesByUserObjId(userInDB._id);
        const deletedUser = await userService.deleteUser(userInDB);
        const updatedDeletedUser = {
          ...deletedUser?._doc,
        };
        const resultOfDeletedUser = await deletedUserService.createUser(
          updatedDeletedUser
        );
        res.clearCookie("gAccessTokenCosmos");
        res.clearCookie("gRefreshTokenCosmos");
        res.clearCookie("accessTokenCosmos");
        res.clearCookie("refreshTokenCosmos");
        res?.status(204).json(buildResponse({ success: true }, null, 204)); 
      } else {
        next(
          new AppError(
            commonErrors.userControllerDeleteUserError,
            commonErrors.userUnauthorizedError,
            401
          )
        );
      }
    } catch (err) {
      next(new AppError(err.name, err.message, 401));
    }
  },
};
module.exports = userController;
