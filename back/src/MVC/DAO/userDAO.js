const User = require("../../db/model/user");
const commonErrors = require("../../misc/commonErrors");
const { sanitizeObject } = require("../../misc/util");
const userDAO = {
  create : async (userInfo) => {
    try {
      const newUser = await User?.create(userInfo);
      return newUser?.toObject();
    } catch (err) {
      err.name = commonErrors.userDAOCreateError;
      throw err;
    }
  },
  findByEmail : async (email) => {
    try {
      const plainUser = await User?.findOne({ email })?.lean(); 
      return plainUser; 
    } catch (err) {
      err.name = commonErrors.userDAOFindByEmailError;
      throw err;
    }
  },
  findByObjId : async (userObjId) => {
    try {
      const plainUser = await User?.findOne({ _id: userObjId })?.lean();
      return plainUser;
    } catch (err) {
      err.name = commonErrors.userDAOFindByObjIdError;
      throw err;
    }
  },
  findById : async (userId) => {
    try {
      const plainUser = await User?.findOne({ id: userId })?.lean();
      return plainUser;
    } catch (err) {
      err.name = commonErrors.userDAOFindByIdError;
      throw err;
    }
  },
  updateOne : async (updatedUserInfo) => {
    try{
      const filter = { id: updatedUserInfo.id };
      const update = { ...updatedUserInfo }
      const option = { returnOriginal: false };
      const updatedUser = await User?.findOneAndUpdate(filter, update, option);
      return updatedUser;
    }catch(err){
      err.name = commonErrors.userDAOUpdateOneError;
      throw err;
    }
  },
  deleteById : async (userId) => {
    try{
      const result = await User?.deleteOne({ id: userId });
      return result;
    }catch(err){
      err.name = commonErrors.userDAODeleteByIdError;
      throw err;
    }
  },
  deleteByIdAndReturnDeletedOne : async (userId) => {
    try{
      const result = await User?.findOneAndDelete({ id: userId });
      return result;
    }catch(err){
      err.name = commonErrors.userDAODeleteByIdError;
      throw err;
    }
  }
}
module.exports = userDAO;
