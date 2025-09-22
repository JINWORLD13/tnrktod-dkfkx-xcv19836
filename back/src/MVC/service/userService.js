const { userDAO } = require("../DAO/index");
const commonErrors = require("../../misc/commonErrors");
const passwordCheckRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
class UserService {
  async createUser(userInfo) {
    try {
      const userInDB = await userDAO.findById(userInfo.id);
      if (userInDB !== null && userInDB !== undefined) {
        throw new Error(commonErrors.userInfoConflictError);
      } else {
        const newUser = await userDAO.create(userInfo);
        return newUser;
      }
    } catch (err) {
      if (err.name === commonErrors.userDAOFindByIdError) throw err;
      if (err.name === commonErrors.userDAOCreateError) throw err;
      err.name = commonErrors.userServiceCreateError;
      if ((err.message = commonErrors.userInfoConflictError)) err.statusCode = 409;
      throw err;
    }
  }
  async getUserByObjId(userObjId) {
    try {
      const userInDB = await userDAO.findByObjId(userObjId);
      return userInDB;
    } catch (err) {
      if (err.name === commonErrors.userDAOFindByObjIdError) throw err;
      err.name = commonErrors.userServiceGetUserByObjIdError;
      if (err.message === commonErrors.userInfoNotFoundError) err.statusCode = 404;
      throw err;
    }
  }
  async getUserById(userId) {
    try {
      const userInDB = await userDAO.findById(userId);
      return userInDB;
    } catch (err) {
      if (err.name === commonErrors.userDAOFindByIdError) throw err;
      err.name = commonErrors.userServiceGetUserByIdError;
      if (err.message === commonErrors.userInfoNotFoundError) err.statusCode = 404;
      throw err;
    }
  }
  async updateUser(updatedUserInfo) {
    try {
      const userId = updatedUserInfo.id;
      const userInDB = await userDAO.findById(userId);
      if (userInDB === undefined || userInDB === null) {
        throw new Error(commonErrors.userInfoNotFoundError);
      }
      const updatedUser = await userDAO.updateOne(updatedUserInfo);
      return updatedUser;
    } catch (err) {
      if (err.name === commonErrors.userDAOUpdateOneError) throw err;
      err.name = commonErrors.userServiceUpdateUserError;
      if (err.message === commonErrors.userInfoNotFoundError) err.statusCode = 404;
      throw err;
    }
  }
  async deleteUser(userInfo) {
    try {
      const userInDB = await userDAO.findById(userInfo.id);
      if (userInDB === null || userInDB === undefined) {
        throw new Error(commonErrors.userInfoNotFoundError);
      } 
      const deletedUser = await userDAO.deleteByIdAndReturnDeletedOne(userInfo.id);
      return deletedUser;
    } catch (err) {
      if (err.name === commonErrors.userDAOFindByIdError) throw err;
      if (err.name === commonErrors.userDAODeleteByIdError) throw err;
      err.name = commonErrors.userServiceDeleteUserError;
      if (err.message === commonErrors.adminInfoNotFoundError) err.statusCode = 404;
      throw err;
    }
  }
}
const userService = new UserService();
module.exports = userService;
