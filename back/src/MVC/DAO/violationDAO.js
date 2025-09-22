const Violation = require("../../db/model/violation");
const commonErrors = require("../../misc/commonErrors");
const { sanitizeObject } = require("../../misc/util");
const violationDAO = {
  create: async (form) => {
    try {
      const newViolation = new Violation({
        violationName: form?.violationName,
        orderId: form?.orderId,
        refundQuantity: form?.refundQuantity,
        remainingQuantity: form?.remainingQuantity,
        violationDate: form?.violationDate,
        violationDescription: form?.violationDescription,
        userInfo: form?.userObjId, 
      });
      await newViolation.save();
      const populatedViolation = await Violation?.findOne({
        _id: newViolation?._id,
      }).populate("userInfo");
      return populatedViolation?.toObject();
    } catch (err) {
      err.name = commonErrors.violationDAOCreateError;
      throw err;
    }
  },
  findByObjId: async (violationObjId) => {
    try {
      const plainViolation = await Violation?.findOne({
        _id: violationObjId,
      })?.lean();
      return plainViolation;
    } catch (err) {
      err.name = commonErrors.violationDAOFindByObjIdError;
      throw err;
    }
  },
  findByObjIdArr: async (violationObjIdArr) => {
    try {
      const resultArr = await Promise.all(
        violationObjIdArr.map((violationObjId) =>
          Violation?.findOne({ _id: violationObjId })?.lean()
        )
      );
      return resultArr;
    } catch (err) {
      err.name = commonErrors.violationDAOFindByObjIdArrError;
      throw err;
    }
  },
  findManyByUserObjId: async (userObjId) => {
    try {
      const plainViolationArr = await Violation?.find({ userInfo: userObjId });
      const plainViolationArrWithoutObjIdAndUserObjId = plainViolationArr.map(
        (violation, i) => {
          const {
            orderId,
            orderName,
            paymentKey,
            amount,
            currency,
            createdAt,
            updatedAt,
            ...rest
          } = violation;
          return {
            orderId,
            orderName,
            paymentKey,
            amount,
            currency,
            createdAt,
            updatedAt,
          };
        }
      );
      return plainViolationArrWithoutObjIdAndUserObjId;
    } catch (err) {
      err.name = commonErrors.violationDAOFindManyByUserObjIdError;
      throw err;
    }
  },
  findByOrderId: async (orderId) => {
    try {
      const violation = await Violation?.findOne({ orderId })?.lean();
      return violation;
    } catch (err) {
      err.name = commonErrors.violationDAOFindByOrderIdError;
      throw err;
    }
  },
  deleteByObjId: async (violationObjId) => {
    try {
      const result = await Violation?.deleteOne({ _id: violationObjId });
      return result;
    } catch (err) {
      err.name = commonErrors.violationDAODeleteByObjIdError;
      throw err;
    }
  },
  deleteByObjIdArr: async (violationObjIdArr) => {
    try {
      const resultArr = await Promise.all(
        violationObjIdArr.map((violationObjId) =>
          Violation?.deleteOne({ _id: violationObjId })
        )
      );
      return resultArr;
    } catch (err) {
      err.name = commonErrors.violationDAODeleteByObjIdError;
      throw err;
    }
  },
  deleteManyByUserObjId: async (userObjId) => {
    try {
      const result = await Violation?.deleteMany({
        userInfo: userObjId,
      });
      return result;
    } catch (err) {
      err.name = commonErrors.violationDAODeleteManyByUserObjIdError;
      throw err;
    }
  },
  deleteAll: async () => {
    try {
      const result = await Violation?.deleteMany({});
      return result;
    } catch (err) {
      err.name = commonErrors.violationDAODeleteAllError;
      throw err;
    }
  },
  updateByObjId: async (violationObjId, updateForm) => {
    try {
      const result = await Violation?.updateOne(
        { _id: violationObjId },
        { ...updateForm }
      );
      return result;
    } catch (err) {
      err.name = commonErrors.violationDAOUpdateByObjIdError;
      throw err;
    }
  },
  updateByUserObjId: async (userObjId, updateForm) => {
    try {
      const result = await Violation?.updateOne(
        { userInfo: userObjId },
        { ...updateForm }
      );
      return result;
    } catch (err) {
      err.name = commonErrors.violationDAOUpdateByUserObjIdError;
      throw err;
    }
  },
};
module.exports = violationDAO;
