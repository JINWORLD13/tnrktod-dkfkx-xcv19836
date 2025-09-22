const User = require("../../db/model/user");
const commonErrors = require("../../misc/commonErrors");
const { sanitizeObject } = require("../../misc/util");
const adminDAO = {
  create: async (adminInfo) => {
    try {
      const newAdmin = await User?.create(adminInfo);
      return newAdmin?.toObject();
    } catch (err) {
      err.name = commonErrors.adminDAOCreateError;
      throw err;
    }
  },
  findByEmail: async (email) => {
    try {
      const plainUser = await User?.findOne({ email })?.lean(); 
      return plainUser; 
    } catch (err) {
      err.name = commonErrors.adminDAOFindByEmailError;
      throw err;
    }
  },
  findManyByEmailArr: async (emailArr) => {
    try {
      const foundUsers = await emailArr.map((email, i) => {
        const plainUser = User?.findOne({ email })?.lean();
        return plainUser;
      });
      return foundUsers;
    } catch (err) {
      err.name = commonErrors.adminDAOFindManyByEmailArrError;
      throw err;
    }
  },
  findById: async (userId) => {
    try {
      const plainUser = await User?.findOne({ id: userId })?.lean();
      return plainUser;
    } catch (err) {
      err.name = commonErrors.adminDAOFindByIdError;
      throw err;
    }
  },
  findManyByEmail: async (usersEmailArr) => {
    try {
      const usersArrByEmail = [];
      await usersEmailArr.map((elem, i) => {
        const user = User?.find({ email: elem });
        usersArrByEmail.push(user);
      });
      return usersArrByEmail;
    } catch (err) {
      err.name = commonErrors.adminDAOFindManyByEmailError;
      throw err;
    }
  },
  findManyByRole: async (userRole) => {
    try {
      const users = await User?.find({ role: userRole });
      return users;
    } catch (err) {
      err.name = commonErrors.adminDAOFindManyByRoleError;
      throw err;
    }
  },
  findAll: async () => {
    try {
      const users = await User?.find({});
      return users;
    } catch (err) {
      err.name = commonErrors.adminDAOFindAllError;
      throw err;
    }
  },
  updateOne: async (updatedUserInfo) => {
    try {
      const filter = { id: updatedUserInfo.id };
      const option = { returnOriginal: false };
      const update = { ...updatedUserInfo };
      const updatedUser = await User?.findOneAndUpdate(filter, update, option);
      return updatedUser;
    } catch (err) {
      err.name = commonErrors.adminDAOUpdateOneError;
      throw err;
    }
  },
  updateMany: async (updatedUserArr) => {
    try {
      const updatedUsersArr = [];
      await updatedUserArr.map((updatedUserInfo, i) => {
        const filter = { id: updatedUserInfo.id };
        const option = { returnOriginal: false };
        const update = { ...updatedUserInfo };
        const updatedUser = User?.findOneAndUpdate(filter, update, option);
        updatedUsersArr.push(updatedUser);
      });
      return updatedUsersArr;
    } catch (err) {
      err.name = commonErrors.adminDAOUpdateOneError;
      throw err;
    }
  },
  deleteById: async (userId) => {
    try {
      const result = await User?.deleteOne({ id: userId });
      return result;
    } catch (err) {
      err.name = commonErrors.adminDAODeleteByIdError;
      throw err;
    }
  },
  deleteManyById: async (userIdArr) => {
    try {
      const delectedUsers = await userIdArr.map((userId, i) => {
        const result = User?.deleteOne({ id: userId });
        return result;
      });
      return delectedUsers;
    } catch (err) {
      err.name = commonErrors.adminDAODeleteManyByIdError;
      throw err;
    }
  },
};
module.exports = adminDAO;
