const { adminDAO } = require("../DAO/index");
const commonErrors = require("../../misc/commonErrors");
const passwordCheckRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
class AdminService {
  async createAdmin(adminInfo) {
    try {
      const adminInDB = await adminDAO.findById(adminInfo.id);
      if (adminInDB !== null || adminInDB !== undefined) {
        throw new Error(commonErrors.adminInfoConflictError);
      } else {
        const newAdmin = await adminDAO.create(adminInfo);
        return newAdmin;
      }
    } catch (err) {
      if(err.name === commonErrors.adminDAOFindByIdError) throw err;
      if(err.name === commonErrors.adminDAOCreateError) throw err;
      err.name = commonErrors.adminServiceCreateError;
      if (err.message = commonErrors.adminInfoConflictError) err.statusCode = 409;
      throw err;
    }
  }
  async getAdminById(adminId) {
    try {
      const adminInDB = await adminDAO.findById(adminId);
      if (adminInDB === undefined || adminInDB === null) {
        throw new Error(commonErrors.adminInfoNotFoundError);
      } else {
        const adminRole = await adminDAO.findById(adminId).role;
        if (adminRole === "admin") {
          return adminInDB;
        } else {
          throw new Error(commonErrors.forbiddenError);
        }
      }
    } catch (err) {
      if(err.name === commonErrors.adminDAOFindByIdError) throw err;
      err.name = commonErrors.adminServiceGetAdminByIdError;
      if (err.message === commonErrors.adminInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.forbiddenError) err.statusCode = 403;
      throw err;
    }
  }
  async getUserByEmail(userEmail, adminId) {
    try {
      const adminInDB = await adminDAO.findById(adminId);
      if (adminInDB === undefined || adminInDB === null) {
        throw new Error(commonErrors.adminInfoNotFoundError);
      } else {
        const adminRole = await adminDAO.findById(adminId).role;
        if (adminRole === "admin") {
          const userInDB = await adminDAO.findByEmail(userEmail);
          if ( userInDB === null || userInDB === undefined){
            throw new Error(commonErrors.userInfoNotFoundError);
          }
          return userInDB;
        } else {
          throw new Error(commonErrors.forbiddenError);
        }
      }
    } catch (err) {
      if(err.name === commonErrors.adminDAOFindByIdError) throw err;
      if(err.name === commonErrors.adminDAOFindByEmailError) throw err;
      err.name = commonErrors.adminServiceGetUserByEmailError;
      if (err.message === commonErrors.adminInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.userInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.forbiddenError) err.statusCode = 403;
      throw err;
    }
  }
  async getUsersByEmailArr(userEmailArr, adminId) {
    try {
      const adminInDB = await adminDAO.findById(adminId);
      if (adminInDB === undefined || adminInDB === null) {
        throw new Error(commonErrors.adminInfoNotFoundError);
      } else {
        const adminRole = await adminDAO.findById(adminId).role;
        if (adminRole === "admin") {
          const userInDBArr = await adminDAO.findManyByEmailArr(userEmailArr);
          if (
            userInDBArr?.length === 0 ||
            userInDBArr === null ||
            userInDBArr === undefined
          ) {
            throw new Error(commonErrors.usersInfoNotFoundError);
          }
          return userInDBArr;
        } else {
          throw new Error(commonErrors.forbiddenError);
        }
      }
    } catch (err) {
      if(err.name === commonErrors.adminDAOFindByIdError) throw err;
      if(err.name === commonErrors.adminDAOFindManyByEmailArrError) throw err;
      err.name = commonErrors.adminServiceGetUserByEmailError;
      if (err.message === commonErrors.adminInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.usersInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.forbiddenError) err.statusCode = 403;
      throw err;
    }
  }
  async getUsersByRole(userRole, adminId) {
    try {
      const adminInDB = await adminDAO.findById(adminId);
      if (adminInDB === undefined || adminInDB === null) {
        throw new Error(commonErrors.adminInfoNotFoundError);
      } else {
        const adminRole = await adminDAO.findById(adminId).role;
        if (adminRole === "admin") {
          const userInDBArr = await adminDAO.findManyByRole(userRole);
          if (
            userInDBArr?.length === 0 ||
            userInDBArr === null ||
            userInDBArr === undefined
          ) {
            throw new Error(commonErrors.usersInfoNotFoundError);
          }
          return userInDBArr;
        } else {
          throw new Error(commonErrors.forbiddenError);
        }
      }
    } catch (err) {
      if(err.name === commonErrors.adminDAOFindByIdError) throw err;
      if(err.name === commonErrors.adminDAOFindManyByRoleError) throw err;
      err.name = commonErrors.adminServiceGetUsersByRoleError;
      if (err.message === commonErrors.adminInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.usersInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.forbiddenError) err.statusCode = 403;
      throw err;
    }
  }
  async getAll(adminId) {
    try {
      const adminInDB = await adminDAO.findById(adminId);
      if (adminInDB === undefined || adminInDB === null) {
        throw new Error(commonErrors.adminInfoNotFoundError);
      } else {
        const adminRole = adminInDB.role;
        if (adminRole === "admin") {
          const allUsersInDBArr = await adminDAO.findAll();
          if (
            allUsersInDBArr === undefined ||
            allUsersInDBArr === null ||
            allUsersInDBArr.length === 0
          ) {
            throw new Error(commonErrors.allUsersInfoNotFoundError);
          }
          return allUsersInDBArr;
        } else {
          throw new Error(commonErrors.forbiddenError);
        }
      }
    } catch (err) {
      if(err.name === commonErrors.adminDAOFindByIdError) throw err;
      if(err.name === commonErrors.adminDAOFindAllError) throw err;
      err.name = commonErrors.adminServiceGetAllError;
      if (err.message === commonErrors.adminInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.allUsersInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.forbiddenError) err.statusCode = 403;
      throw err;
    }
  }
  async updateAdmin(updatedAdminInfo, adminId) {
    try {
      const adminInDB = await adminDAO.findById(adminId);
      if (adminInDB === undefined || adminInDB === null) {
        throw new Error(commonErrors.adminInfoNotFoundError);
      } else {
        const adminRole = adminInDB.role;
        if (adminRole === "admin") {
          const updatedAdmin = await adminDAO.updateOne(updatedAdminInfo);
          return updatedAdmin;
        } else {
          throw new Error(commonErrors.forbiddenError);
        }
      }
    } catch (err) {
      if(err.name === commonErrors.adminDAOFindByIdError) throw err;
      err.name = commonErrors.adminServiceUpdateAdminError;
      if (err.message === commonErrors.adminInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.forbiddenError) err.statusCode = 403;
      throw err;
    }
  }
  async updateUser(updatedUserInfo, adminId) {
    try {
      const adminInDB = await adminDAO.findById(adminId);
      if (adminInDB === undefined || adminInDB === null) {
        throw new Error(commonErrors.adminInfoNotFoundError);
      } else {
        const adminRole = await adminDAO.findById(adminId).role;
        if (adminRole === "admin") {
          const userEmail = updatedUserInfo.email;
          const userInDB = await adminDAO.findByEmail(userEmail);
          if (userInDB === null || userInDB === undefined) {
            throw new Error(commonErrors.userInfoNotFoundError);
          } else {
            const updatedUser = await adminDAO.updateOne(updatedUserInfo);
            return updatedUser;
          }
        } else {
          throw new Error(commonErrors.forbiddenError);
        }
      }
    } catch (err) {
      if(err.name === commonErrors.adminDAOFindByIdError) throw err;
      if(err.name === commonErrors.adminDAOFindByEmailError) throw err;
      err.name = commonErrors.adminServiceUpdateUserError;
      if (err.message === commonErrors.adminInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.userInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.forbiddenError) err.statusCode = 403;
      throw err;
    }
  }
  async updateUsers(updatedUserArr, adminId) {
    try {
      const adminInDB = await adminDAO.findById(adminId);
      if (adminInDB === undefined || adminInDB === null) {
        throw new Error(commonErrors.adminInfoNotFoundError);
      } else {
        const adminRole = await adminDAO.findById(adminId).role;
        if (adminRole === "admin") {
          const userInDBArr = await adminDAO.findManyByEmailArr(userEmailArr);
          if (
            userInDBArr === null ||
            userInDBArr === undefined ||
            userInDBArr?.length === 0
          ) {
            throw new Error(commonErrors.usersInfoNotFoundError);
          } else {
            const updatedUsers = await adminDAO.updateMany(updatedUserArr);
            return updatedUsers;
          }
        } else {
          throw new Error(commonErrors.forbiddenError);
        }
      }
    } catch (err) {
      if(err.name === commonErrors.adminDAOFindByIdError) throw err;
      if(err.name === commonErrors.adminDAOFindManyByEmailArrError) throw err;
      if(err.name === commonErrors.adminDAOUpdateManyError) throw err;
      err.name = commonErrors.adminServiceUpdateUserError;
      if (err.message === commonErrors.adminInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.usersInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.forbiddenError) err.statusCode = 403;
      throw err;
    }
  }
  async deleteAdminById(adminId) {
    try {
      const adminInDB = await adminDAO.findById(adminId);
      const adminRole = adminInDB.role;
      if (adminInDB === undefined || adminInDB === null) {
        throw new Error(commonErrors.adminInfoNotFoundError);
      } else {
        if (adminRole === "admin") {
          const deletedAdmin = await adminDAO.deleteById(adminId);
          return deletedAdmin;
        } else {
          throw new Error(commonErrors.forbiddenError);
        }
      }
    } catch (err) {
      if(err.name === commonErrors.adminDAOFindByIdError) throw err;
      if(err.name === commonErrors.adminDAODeleteByIdError) throw err;
      err.name = commonErrors.adminServiceDeleteAdminError;
      if (err.message === commonErrors.adminInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.forbiddenError) err.statusCode = 403;
      throw err;
    }
  }
  async deleteUserByEmail(userEmail, adminId) {
    try {
      const adminInDB = await adminDAO.findById(adminId);
      if (adminInDB === undefined || adminInDB === null) {
        throw new Error(commonErrors.adminInfoNotFoundError);
      } else {
        const adminRole = await adminDAO.findById(adminId).role;
        if (adminRole === "admin") {
          const userInDB = await adminDAO.findByEmail(userEmail);
          if (userInDB === null || userInDB === undefined) {
            throw new Error(commonErrors.userInfoNotFoundError);
          } else {
            const userId = userInDB?.id;
            const deletedUser = await adminDAO.deleteById(userId);
            return deletedUser;
          }
        } else {
          throw new Error(commonErrors.forbiddenError);
        }
      }
    } catch (err) {
      if(err.name === commonErrors.adminDAOFindByIdError) throw err;
      if(err.name === commonErrors.adminDAOFindByEmailError) throw err;
      if(err.name === commonErrors.adminDAODeleteByIdError) throw err;
      err.name = commonErrors.adminServiceDeleteUserError;
      if (err.message === commonErrors.adminInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.userInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.forbiddenError) err.statusCode = 403;
      throw err;
    }
  }
  async deleteUsersByEmail(userEmailArr, adminId) {
    try {
      const adminInDB = await adminDAO.findById(adminId);
      if (adminInDB === undefined || adminInDB === null) {
        throw new Error(commonErrors.adminInfoNotFoundError);
      } else {
        const adminRole = await adminDAO.findById(adminId).role;
        if (adminRole === "admin") {
          const userInDBArr = await adminDAO.findManyByEmailArr(userEmailArr);
          if (
            userInDBArr === null ||
            userInDBArr === undefined ||
            userInDBArr?.length === 0
          ) {
            throw new Error(commonErrors.usersInfoNotFoundError);
          } else {
            const userIdArr = userInDBArr.map((user, i) => {
              return user.id;
            });
            const deletedUser = await adminDAO.deleteManyById(userIdArr);
            return deletedUser;
          }
        } else {
          throw new Error(commonErrors.forbiddenError);
        }
      }
    } catch (err) {
      if(err.name === commonErrors.adminDAOFindByIdError) throw err;
      if(err.name === commonErrors.adminDAOFindManyByEmailArrError) throw err;
      if(err.name === commonErrors.adminDAODeleteManyByIdError) throw err;
      err.name = commonErrors.adminServiceDeleteUsersError;
      if (err.message === commonErrors.adminInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.usersInfoNotFoundError) err.statusCode = 404;
      if (err.message === commonErrors.forbiddenError) err.statusCode = 403;
      throw err;
    }
  }
}
const adminService = new AdminService();
module.exports = adminService;
