const { violationDAO } = require("../DAO/index");
const commonErrors = require("../../misc/commonErrors");
const mongoose = require("mongoose");
class ViolationService {
  async createViolation(violationInfo) {
    if (!violationInfo || !violationInfo.orderId || !violationInfo.userObjId) {
      throw new Error("Required input is missing.");
    }
    if (!mongoose.Types.ObjectId.isValid(violationInfo.userObjId)) {
      throw new Error("userObjId is not a valid ObjectId.");
    }
    try {
      const exists = await violationDAO.findByOrderId(violationInfo.orderId);
      if (exists) {
        const err = new Error(commonErrors.violationPreInfoConflictError || "Violation already exists for this orderId.");
        err.statusCode = 409;
        throw err;
      }
      return await violationDAO.create(violationInfo);
    } catch (err) {
      err.name = commonErrors.violationServiceCreateViolation;
      throw err;
    }
  }
  async getViolationByObjId(objId) {
    if (!mongoose.Types.ObjectId.isValid(objId)) {
      throw new Error("violationObjId is not a valid ObjectId.");
    }
    try {
      return await violationDAO.findByObjId(objId);
    } catch (err) {
      err.name = commonErrors.violationServiceGetViolationByObjIdError;
      throw err;
    }
  }
  async getViolationByOrderId(orderId) {
    if (!orderId) throw new Error("orderId is required.");
    try {
      const violation = await violationDAO.findByOrderId(orderId);
      if (!violation) {
        const err = new Error(commonErrors.violationInfoNotFoundError || "Violation not found.");
        err.statusCode = 404;
        throw err;
      }
      return violation;
    } catch (err) {
      err.name = commonErrors.violationServiceGetViolationByOrderIdError;
      throw err;
    }
  }
  async getViolationsByUserObjId(userObjId) {
    if (!mongoose.Types.ObjectId.isValid(userObjId)) {
      throw new Error("userObjId is not a valid ObjectId.");
    }
    try {
      const arr = await violationDAO.findManyByUserObjId(userObjId);
      if (!arr || arr.length === 0) {
        const err = new Error(commonErrors.violationsInfoNotFoundError || "No violations found for this userObjId.");
        err.statusCode = 404;
        throw err;
      }
      return arr;
    } catch (err) {
      err.name = commonErrors.violationServiceGetViolationsByUserObjIdError;
      throw err;
    }
  }
  async deleteViolationByObjId(objId) {
    if (!mongoose.Types.ObjectId.isValid(objId)) {
      throw new Error("violationObjId is not a valid ObjectId.");
    }
    try {
      const violation = await violationDAO.findByObjId(objId);
      if (!violation) {
        const err = new Error(commonErrors.violationInfoNotFoundError || "Violation not found.");
        err.statusCode = 404;
        throw err;
      }
      return await violationDAO.deleteByObjId(objId);
    } catch (err) {
      err.name = commonErrors.violationServiceDeleteViolationByObjIdError;
      throw err;
    }
  }
  async deleteViolationByOrderId(orderId) {
    if (!orderId) throw new Error("orderId is required.");
    try {
      const violation = await violationDAO.findByOrderId(orderId);
      if (!violation) {
        const err = new Error(commonErrors.violationInfoNotFoundError || "Violation not found.");
        err.statusCode = 404;
        throw err;
      }
      return await violationDAO.deleteByObjId(violation._id);
    } catch (err) {
      err.name = commonErrors.violationServiceDeleteViolationByOrderIdError;
      throw err;
    }
  }
  async deleteViolationsByUserObjId(userObjId) {
    if (!mongoose.Types.ObjectId.isValid(userObjId)) {
      throw new Error("userObjId is not a valid ObjectId.");
    }
    try {
      const arr = await violationDAO.findManyByUserObjId(userObjId);
      if (!arr || arr.length === 0) {
        const err = new Error(commonErrors.violationsInfoNotFoundError || "No violations found for this userObjId.");
        err.statusCode = 404;
        throw err;
      }
      return await violationDAO.deleteManyByUserObjId(userObjId);
    } catch (err) {
      err.name = commonErrors.violationServiceDeleteViolationsByUserObjIdError;
      throw err;
    }
  }
  async deleteViolationsByObjIdArr(objIdArr) {
    if (!Array.isArray(objIdArr) || objIdArr.length === 0) {
      throw new Error("objIdArr must be a non-empty array.");
    }
    if (!objIdArr.every(id => mongoose.Types.ObjectId.isValid(id))) {
      throw new Error("objIdArr contains invalid ObjectId(s).");
    }
    try {
      const arr = await violationDAO.findByObjIdArr(objIdArr);
      if (!arr || arr.length === 0) {
        const err = new Error(commonErrors.violationInfoNotFoundError || "No violations found for these objIds.");
        err.statusCode = 404;
        throw err;
      }
      return await violationDAO.deleteByObjIdArr(objIdArr);
    } catch (err) {
      err.name = commonErrors.violationServiceDeleteViolationsByObjIdArrError;
      throw err;
    }
  }
  async putViolationByOrderId(orderId, updateForm) {
    if (!orderId) throw new Error("orderId is required.");
    if (!updateForm || typeof updateForm !== "object") {
      throw new Error("updateForm is invalid.");
    }
    try {
      const violation = await violationDAO.findByOrderId(orderId);
      if (!violation) {
        const err = new Error(commonErrors.violationInfoNotFoundError || "Violation not found.");
        err.statusCode = 404;
        throw err;
      }
      return await violationDAO.updateByObjId(violation._id, updateForm);
    } catch (err) {
      err.name = commonErrors.violationServicePutViolationByOrderIdError;
      throw err;
    }
  }
  async putViolationByUserObjId(userObjId, updateForm) {
    if (!mongoose.Types.ObjectId.isValid(userObjId)) {
      throw new Error("userObjId is not a valid ObjectId.");
    }
    if (!updateForm || typeof updateForm !== "object") {
      throw new Error("updateForm is invalid.");
    }
    try {
      const arr = await violationDAO.findManyByUserObjId(userObjId);
      if (!arr || arr.length === 0) {
        const err = new Error(commonErrors.violationInfoNotFoundError || "No violations found for this userObjId.");
        err.statusCode = 404;
        throw err;
      }
      return await violationDAO.updateByObjId(arr[0]._id, updateForm);
    } catch (err) {
      err.name = commonErrors.violationServicePutViolationByUserObjIdError;
      throw err;
    }
  }
}
const violationService = new ViolationService();
module.exports = violationService;
