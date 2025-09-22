const { deletedUserDAO } = require("../DAO/index");
const commonErrors = require("../../misc/commonErrors");
const passwordCheckRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
class DeletedUserService {
  async createUser(userInfo) {
    try {
      const deletedUserInDB = await deletedUserDAO.findByObjId(userInfo?._id);
      if (deletedUserInDB !== null && deletedUserInDB !== undefined) {
        throw new Error(commonErrors.deletedUserInfoConflictError);
      } else {
        const newDeletedUser = await deletedUserDAO.create(userInfo);
        return newDeletedUser;
      }
    } catch (err) {
      if (err.name === commonErrors.deletedUserDAOFindByIdError) throw err;
      if (err.name === commonErrors.deletedUserDAOCreateError) throw err;
      err.name = commonErrors.deletedUserServiceCreateError;
      if ((err.message = commonErrors.deletedUserInfoConflictError)) err.statusCode = 409;
      throw err;
    }
  }
  async getUserByObjId(userObjId) {
    try {
      const deletedUserInDB = await deletedUserDAO.findByObjId(userObjId);
      return deletedUserInDB;
    } catch (err) {
      if (err.name === commonErrors.deletedUserDAOFindByObjIdError) throw err;
      err.name = commonErrors.deletedUserServiceGetUserByObjIdError;
      if (err.message === commonErrors.deletedUserInfoNotFoundError) err.statusCode = 404;
      throw err;
    }
  }
  async getUserById(userId) {
    try {
      const deletedUserInDB = await deletedUserDAO.findById(userId);
      return deletedUserInDB;
    } catch (err) {
      if (err.name === commonErrors.deletedUserDAOFindByIdError) throw err;
      err.name = commonErrors.deletedUserServiceGetUserByIdError;
      if (err.message === commonErrors.deletedUserInfoNotFoundError) err.statusCode = 404;
      throw err;
    }
  }
  async updateUser(updatedUserInfo) {
    try {
      const userId = updatedUserInfo.id;
      const deletedUserInDB = await deletedUserDAO.findById(userId);
      if (deletedUserInDB === undefined || deletedUserInDB === null) {
        throw new Error(commonErrors.deletedUserInfoNotFoundError);
      }
      const updatedUser = await deletedUserDAO.updateOne(updatedUserInfo);
      return updatedUser;
    } catch (err) {
      if (err.name === commonErrors.deletedUserDAOUpdateOneError) throw err;
      err.name = commonErrors.deletedUserServiceUpdateUserError;
      if (err.message === commonErrors.deletedUserInfoNotFoundError) err.statusCode = 404;
      throw err;
    }
  }
  async deleteUser(userInfo) {
    try {
      const deletedUserInDB = await deletedUserDAO.findById(userInfo.id);
      if (deletedUserInDB === null || deletedUserInDB === undefined) {
        throw new Error(commonErrors.deletedUserInfoNotFoundError);
      } 
      const deletedUser = await deletedUserDAO.deleteByIdAndReturnDeletedOne(userInfo.id);
      return deletedUser;
    } catch (err) {
      if (err.name === commonErrors.deletedUserDAOFindByIdError) throw err;
      if (err.name === commonErrors.deletedUserDAODeleteByIdError) throw err;
      err.name = commonErrors.deletedUserServiceDeleteUserError;
      if (err.message === commonErrors.adminInfoNotFoundError) err.statusCode = 404;
      throw err;
    }
  }
}
const deletedUserService = new DeletedUserService();
module.exports = deletedUserService;
