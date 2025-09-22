const { sanitizeObject, buildResponse } = require("../../misc/util");
const AppError = require("../../misc/AppError");
const commonErrors = require("../../misc/commonErrors");
const { deletedUserService, tarotService } = require("../service");
const deletedUserController = {
  async createUser(req, res, next) {
    try {
      const userId = req?.user ?? req?.session?.user?.id ?? null;
      const deletedUserInfo = await deletedUserService.getUserById(userId);
      if (deletedUserInfo === null || deletedUserInfo === undefined) {
        const newUser = await deletedUserService.createUser(deletedUserInfo);
        res?.status(200).json(buildResponse(newUser, null, 200));
      } else {
        next(
          new AppError(
            commonErrors.deletedUserControllerCreaetUserError,
            commonErrors.deletedUserInfoConflictError,
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
        const userInDB = await deletedUserService.getUserById(userId);
        if (userInDB === undefined || userInDB === null) {
          next(
            new AppError(
              commonErrors.deletedUserControllerGetUserByIdError,
              commonErrors.deletedUserInfoNotFoundError,
              404
            )
          );
        }
        res?.status(200).json(buildResponse(userInDB, null, 200));
      } else {
        next(
          new AppError(
            commonErrors.deletedUserControllerGetUserByIdError,
            commonErrors.deletedUserUnauthorizedError,
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
        const userInDB = await deletedUserService.getUserById(userId);
        if (userInDB === undefined || userInDB === null) {
          next(
            new AppError(
              commonErrors.deletedUserControllerPutUserError,
              commonErrors.deletedUserInfoNotFoundError,
              404
            )
          );
        }
        const transfferedInfo = req?.body;
        const updatedInfoArr = transfferedInfo?.filter(
          (elem) => elem.length > 0
        );
        const updatedUserInfo = { ...userInDB, ...updatedInfoArr };
        const result = await deletedUserService.updateUser(updatedUserInfo);
        res?.status(200).json(buildResponse(result, null, 200));
      } else {
        next(
          new AppError(
            commonErrors.deletedUserControllerPutUserError,
            commonErrors.deletedUserUnauthorizedError,
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
        const userInDB = await deletedUserService.getUserById(userId);
        if (userInDB === undefined || userInDB === null) {
          next(
            new AppError(
              commonErrors.deletedUserControllerDeleteUserError,
              commonErrors.deletedUserInfoNotFoundError,
              404
            )
          );
        }
        res.clearCookie("gAccessTokenCosmos");
        res.clearCookie("gRefreshTokenCosmos");
        res.clearCookie("accessTokenCosmos");
        res.clearCookie("refreshTokenCosmos");
        res?.status(204).json(buildResponse({ success: true }, null, 204)); 
      } else {
        next(
          new AppError(
            commonErrors.deletedUserControllerDeleteUserError,
            commonErrors.deletedUserUnauthorizedError,
            401
          )
        );
      }
    } catch (err) {
      next(new AppError(err.name, err.message, 401));
    }
  },
};
module.exports = deletedUserController;
