const { sanitizeObject, buildResponse } = require("../../misc/util");
const AppError = require("../../misc/AppError");
const commonErrors = require("../../misc/commonErrors");
const { adminService, userService } = require("../service");
const { userController } = require("./index");
const adminController = {
  async createAdmin(req, res, next) {
    try {
      const adminInfo = await userController?.findById(req?.user);
      const newAdminInfo = { ...adminInfo, role: "admin" };
      const newAdmin = await adminService.createAdmin(newAdminInfo);
      res?.status(200).json(buildResponse(newAdmin, null, 200));
    } catch (err) {
      const customedError = new AppError(err.name, err.message, 401);
      next(customedError);
    }
  },
  async getAdminById(req, res, next) {
    try {
      const adminId = (req?.user ?? req?.session?.user?.id) ?? null;
      req.user = adminId;
      const adminRole = await adminService.getAdminById(adminId).role;
      if (req?.isAuthenticated() === true && adminRole === "admin") {
        const adminInDB = await adminService.getAdminById(adminId);
        if (adminInDB === undefined || adminInDB === null) {
          next(
            new AppError(
              commonErrors.adminControllerGetAdminByIdError,
              commonErrors.adminInfoNotFoundError,
              404
            )
          );
        }
        return res.status(200).json(buildResponse(adminInDB, null, 200));
      } else {
        next(
          new AppError(
            commonErrors.adminControllerGetAdminByIdError,
            commonErrors.forbiddenError,
            403
          )
        );
      }
    } catch (err) {
      next(new AppError(err.name, err.message, err.statusCode));
    }
  },
  async getUserByEmail(req, res, next) {
    try {
      const adminId = (req?.user ?? req?.session?.user?.id) ?? null;
      req.user = adminId;
      const adminRole = await adminService.getAdminById(adminId).role;
      if (req?.isAuthenticated() === true && adminRole === "admin") {
        const userEmail = req?.body.email;
        const userInDB = await adminService.getUserByEmail(userEmail, adminId);
        if (userInDB === undefined || userInDB === null) {
          next(
            new AppError(
              commonErrors.adminControllerGetUserByEmailError,
              commonErrors.adminInfoNotFoundError,
              404
            )
          );
        }
        return res.status(200).json(buildResponse(userInDB, null, 200));
      } else {
        next(
          new AppError(
            commonErrors.adminControllerGetUserByEmailError,
            commonErrors.forbiddenError,
            403
          )
        );
      }
    } catch (err) {
      next(new AppError(err.name, err.message, err.statusCode));
    }
  },
  async getUsersByRole(req, res, next) {
    try {
      const adminId = (req?.user ?? req?.session?.user?.id) ?? null;
      req.user = adminId;
      const adminRole = await adminService.getAdminById(adminId).role;
      if (req?.isAuthenticated() === true && adminRole === "admin") {
        const adminInDB = await adminService.getAdminById(adminId);
        if (adminInDB === undefined || adminInDB === null) {
          next(new AppError(
            commonErrors.adminControllerGetUsersByRoleError,
            commonErrors.adminInfoNotFoundError,
            404
          ))
        }
        let role = req?.body?.role;
        const userArrInDB = await adminService.getUsersByRole(role, adminId);
        res.status(200).json(buildResponse(userArrInDB, null, 200));
      } else {
        next(new AppError(
          commonErrors.adminControllerGetUsersByRoleError,
          commonErrors.forbiddenError,
          403
        ))
      }
    } catch (err) {
      next(new AppError(err.name, err.message, err.statusCode));
    }
  },
  async getAllUsers(req, res, next) {
    try {
      const adminId = (req?.user ?? req?.session?.user?.id) ?? null;
      req.user = adminId;
      const adminRole = await adminService.getAdminById(adminId).role;
      if (req?.isAuthenticated() === true && adminRole === "admin") {
        const adminInDB = await adminService.getAdminById(adminId);
        if (adminInDB === undefined || adminInDB === null) {
          next(new AppError(
            commonErrors.adminControllerGetAllUsersError,
            commonErrors.adminInfoNotFoundError,
            404
          ))
        }
        const allInDB = await adminService.getAll();
        res?.status(200).json(buildResponse(allInDB, null, 200));
      } else {
        next(new AppError(
          commonErrors.adminControllerGetAllUsersError,
          commonErrors.forbiddenError,
          403
        ))
      }
    } catch (err) {
      next(new AppError(err.name, err.message, err.statusCode));
    }
  },
  async putAdmin(req, res, next) {
    try {
      const adminId = (req?.user ?? req?.session?.user?.id) ?? null;
      req.user = adminId;
      const adminInfo = await adminService.getAdminById(adminId).role;
      const adminRole = await adminInfo.role;
      if (req?.isAuthenticated() === true && adminRole === "admin") {
        const adminInDB = await adminService.getAdminById(adminId);
        if (adminInDB === undefined || adminInDB === null) {
          next(new AppError(
            commonErrors.adminControllerPutAdminError,
            commonErrors.adminInfoNotFoundError,
            404
          ))
        }
        const transfferedInfo = req?.body;
        const updatedAdminDataArr = transfferedInfo?.filter(
          (elem) => elem?.length > 0
        );
        const updatedAdminInfo = { ...adminInfo, ...updatedAdminDataArr };
        const result = await adminService.updateUser(updatedAdminInfo);
        res?.status(200).json(buildResponse(result, null, 200));
      } else {
        next(new AppError(
          commonErrors.adminControllerPutAdminError,
          commonErrors.forbiddenError,
          403
        ))
      }
    } catch (err) {
      next(new AppError(err.name, err.message, err.statusCode));
    }
  },
  async putUser(req, res, next) {
    try {
      const adminId = (req?.user ?? req?.session?.user?.id) ?? null;
      req.user = adminId;
      const adminInfo = await adminService.getAdminById(adminId).role;
      const adminRole = await adminInfo.role;
      if (req?.isAuthenticated() === true && adminRole === "admin") {
        const adminInDB = await adminService.getAdminById(adminId);
        if (adminInDB === undefined || adminInDB === null) {
          next(new AppError(
            commonErrors.adminControllerPutUserError,
            commonErrors.adminInfoNotFoundError,
            404
          ))
        }
        const userEmail = req?.body?.email;
        const userInDB = await adminService.getUserByEmail(userEmail, adminId);
        const transfferedInfo = req?.body;
        const updatedUserDataArr = transfferedInfo?.filter(
          (elem) => elem?.length > 0
        );
        const updatedUserInfo = { ...userInDB, ...updatedUserDataArr };
        const result = await adminService.updateUser(updatedUserInfo);
        res?.status(200).json(buildResponse(result, null, 200));
      } else {
        next(new AppError(
          commonErrors.adminControllerPutUserError,
          commonErrors.forbiddenError,
          403
        ))
      }
    } catch (err) {
      next(new AppError(err.name, err.message, err.statusCode));
    }
  },
  async deleteAdminById(req, res, next) {
    try {
      const adminId = req?.user;
      const adminInfo = await adminService.getAdminById(adminId).role;
      const adminRole = await adminInfo.role;
      if (req?.isAuthenticated() === true && adminRole === "admin") {
        const adminInDB = await adminService.getAdminById(adminId);
        if (adminInDB === undefined || adminInDB === null) {
          next(new AppError(
            commonErrors.adminControllerDeleteAdminByIdError,
            "Not Found",
            404
          ))
        }
        await adminService.deleteAdminById(adminId);
        res?.status(204).json(buildResponse(null, null, 204)); 
      } else {
        next(new AppError(
          commonErrors.adminControllerDeleteAdminByIdError,
          "Unauthorized",
          401
        ))
      }
    } catch (err) {
      next(new AppError(err.name, 401, err.message));
    }
  },
  async deleteUserByEmail(req, res, next) {
    try {
      const adminId = req?.user;
      const adminInfo = await adminService.getAdminById(adminId).role;
      const adminRole = await adminInfo.role;
      if (req?.isAuthenticated() === true && adminRole === "admin") {
        const adminInDB = await adminService.getAdminById(adminId);
        if (adminInDB === undefined || adminInDB === null) {
          next(new AppError(
            commonErrors.adminControllerDeleteUserByEmailError,
            "Not Found",
            404
          ))
        }
        const userEmail = req?.body.email;
        await adminService.deleteUserByEmail(userEmail, adminId);
        res?.status(204).json(buildResponse(null, null, 204)); 
      } else {
        next(new AppError(
          commonErrors.adminControllerDeleteUserByEmailError,
          "Unauthorized",
          401
        ))
      }
    } catch (err) {
      next(new AppError(err.name, 401, err.message));
    }
  },
  async deleteUsersByEmail(req, res, next) {
    try {
      const adminId = req?.user;
      const adminInfo = await adminService.getAdminById(adminId).role;
      const adminRole = await adminInfo.role;
      if (req?.isAuthenticated() === true && adminRole === "admin") {
        const adminInDB = await adminService.getAdminById(adminId);
        if (adminInDB === undefined || adminInDB === null) {
          next(new AppError(
            commonErrors.adminControllerDeleteUsersByEmailError,
            "Not Found",
            404
          ))
        }
        const userEmailArr = req?.body.emails;
        await adminService.deleteUserByEmail(userEmailArr, adminId);
        const usersEmailArr = [...req?.body];
        await adminService.deleteUsersByEmail(usersEmailArr);
        res?.status(204).json(buildResponse(null, null, 204));
      } else {
        next(new AppError(
          commonErrors.adminControllerDeleteUsersByEmailError,
          "Unauthorized",
          401
        ))
      }
    } catch (err) {
      next(new AppError(err.name, 403, err.message));
    }
  },
};
module.exports = adminController;
