const DeletedUser = require("../../db/model/deletedUser");
const commonErrors = require("../../misc/commonErrors");
const { sanitizeObject } = require("../../misc/util");
const deletedUserDAO = {
  create : async (userInfo) => {
    try {
      const newDeletedUser = await DeletedUser?.create(userInfo);
      return newDeletedUser?.toObject();
    } catch (err) {
      err.name = commonErrors.deletedUserDAOCreateError;
      throw err;
    }
  },
  findByEmail : async (email) => {
    try {
      const plainUser = await DeletedUser?.findOne({ email })?.lean(); 
      return plainUser; 
    } catch (err) {
      err.name = commonErrors.deletedUserDAOFindByEmailError;
      throw err;
    }
  },
  findByObjId : async (userObjId) => {
    try {
      const plainUser = await DeletedUser?.findOne({ _id: userObjId })?.lean();
      return plainUser;
    } catch (err) {
      err.name = commonErrors.deletedUserDAOFindByObjIdError;
      throw err;
    }
  },
  findById : async (userId) => {
    try {
      const plainUser = await DeletedUser?.findOne({ id: userId })?.lean();
      return plainUser;
    } catch (err) {
      err.name = commonErrors.deletedUserDAOFindByIdError;
      throw err;
    }
  },
  updateOne : async (updatedUserInfo) => {
    try{
      const filter = { id: updatedUserInfo.id };
      const option = { returnOriginal: false };
      const update = { ...updatedUserInfo }
      const updatedUser = await DeletedUser?.findOneAndUpdate(filter, update, option);
      return updatedUser;
    }catch(err){
      err.name = commonErrors.deletedUserDAOUpdateOneError;
      throw err;
    }
  },
  deleteById : async (userId) => {
    try{
      const result = await DeletedUser?.deleteOne({ id: userId });
      return result;
    }catch(err){
      err.name = commonErrors.deletedUserDAODeleteByIdError;
      throw err;
    }
  },
  deleteByIdAndReturnDeletedOne : async (userId) => {
    try{
      const result = await DeletedUser?.findOneAndDelete({ id: userId });
      return result;
    }catch(err){
      err.name = commonErrors.deletedUserDAODeleteByIdError;
      throw err;
    }
  }
}
module.exports = deletedUserDAO;
