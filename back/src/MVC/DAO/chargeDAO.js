const Charge = require("../../db/model/charge");
const commonErrors = require("../../misc/commonErrors");
const { sanitizeObject } = require("../../misc/util");
const chargeDAO = {
  createPreChargeForToss: async (preChargeInfoForToss) => {
    try {
      const userObjId = preChargeInfoForToss?.userInfo?._id ?? null;
      const {
        orderId,
        paymentKey,
        orderName,
        orderHistory,
        orderVouchers,
        refundReceiveAccount,
        amount,
        currency,
        country,
        method,
        apiName,
        userInfo,
        ...rest
      } = preChargeInfoForToss;
      let newCharge;
      if (method === "가상계좌") {
        newCharge = new Charge({
          orderId,
          paymentKey,
          orderName,
          orderHistory,
          orderVouchers,
          refundReceiveAccount,
          amount,
          currency,
          country,
          method,
          apiName,
          userInfo: userObjId,
          ...rest,
        });
      } else if (method !== "가상계좌") {
        newCharge = new Charge({
          orderId,
          paymentKey,
          orderName,
          orderHistory,
          orderVouchers,
          amount,
          currency,
          country,
          method,
          apiName,
          userInfo: userObjId,
          ...rest,
        });
      }
      await newCharge.save();
      const populatedCharge = await Charge?.findOne({
        _id: newCharge?._id,
      }).populate("userInfo");
      return populatedCharge?.toObject();
    } catch (err) {
      err.name = commonErrors.chargeDAOCreateError;
      throw err;
    }
  },
  createChargeForGooglePlay: async (preChargeInfoForToss) => {
    try {
      const userObjId = preChargeInfoForToss?.userInfo?._id ?? null;
      const {
        orderId,
        orderName,
        orderHistory,
        orderVouchers,
        amount,
        apiName,
        userInfo,
        createdAtForIAP,
        ...rest
      } = preChargeInfoForToss;
      const newCharge = new Charge({
        orderId,
        orderName,
        orderHistory,
        orderVouchers,
        amount,
        apiName,
        userInfo: userObjId,
        createdAtForIAP,
        ...rest,
      });
      await newCharge.save();
      const populatedCharge = await Charge?.findOne({
        _id: newCharge?._id,
      }).populate("userInfo");
      return populatedCharge?.toObject();
    } catch (err) {
      err.name = commonErrors.chargeDAOCreateError;
      throw err;
    }
  },
  findManyByProductId: async (productId) => {
    try {
      const plainChargeArr = await Charge?.find({
        productId: productId,
      })?.lean();
      return plainChargeArr;
    } catch (err) {
      err.name = commonErrors.chargeDAOFindManyByProductIdError;
      throw err;
    }
  },
  findByObjId: async (chargeObjId) => {
    try {
      const plainCharge = await Charge?.findOne({
        _id: chargeObjId,
      })?.lean();
      return plainCharge;
    } catch (err) {
      err.name = commonErrors.chargeDAOFindByObjIdError;
      throw err;
    }
  },
  findByObjIdArr: async (chargeObjIdArr) => {
    try {
      const resultArr = await Promise.all(
        chargeObjIdArr.map((chargeObjId) =>
          Charge.findOne({ _id: chargeObjId }).lean()
        )
      );
      return resultArr;
    } catch (err) {
      err.name = commonErrors.chargeDAOFindByObjIdArrError;
      throw err;
    }
  },
  findByOrderId: async (orderId) => {
    try {
      const plainCharge = await Charge?.findOne({
        orderId: orderId,
      })?.lean();
      return plainCharge || undefined;
    } catch (err) {
      err.name = commonErrors.chargeDAOFindByOrderIdError;
      throw err;
    }
  },
  findByUserObjId: async (userObjId) => {
    try {
      const plainCharge = await Charge?.findOne({
        userInfo: userObjId,
      })?.lean();
      return plainCharge;
    } catch (err) {
      err.name = commonErrors.chargeDAOFindByUserObjIdError;
      throw err;
    }
  },
  findManyByUserObjId: async (userObjId) => {
    try {
      const plainChargeArr = await Charge?.find({ userInfo: userObjId });
      const plainChargeArrWithoutObjIdAndUserObjId = plainChargeArr.map(
        (charge, i) => {
          const {
            orderId,
            orderName,
            paymentKey,
            amount,
            currency,
            createdAt,
            updatedAt,
            ...rest
          } = charge;
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
      return plainChargeArrWithoutObjIdAndUserObjId;
    } catch (err) {
      err.name = commonErrors.chargeDAOFindManyByUserObjIdError;
      throw err;
    }
  },
  findManyByCurrency: async (currency) => {
    try {
      const plainChargeArr = await Charge?.find({
        currency: currency,
      })?.lean();
      return plainChargeArr;
    } catch (err) {
      err.name = commonErrors.chargeDAOFindManyByCurrencyError;
      throw err;
    }
  },
  deleteByObjId: async (chargeObjId) => {
    try {
      const result = await Charge?.deleteOne({ _id: chargeObjId });
      return result;
    } catch (err) {
      err.name = commonErrors.chargeDAODeleteByObjIdError;
      throw err;
    }
  },
  deleteByObjIdArr: async (chargeObjIdArr) => {
    try {
      const resultArr = await Promise.all(
        chargeObjIdArr.map((chargeObjId) =>
          Charge.deleteOne({ _id: chargeObjId })
        )
      );
      return resultArr;
    } catch (err) {
      err.name = commonErrors.chargeDAODeleteByObjIdError;
      throw err;
    }
  },
  deleteManyByUserObjId: async (userObjId) => {
    try {
      const result = await Charge?.deleteMany({
        userInfo: userObjId,
      })?.lean();
      return result;
    } catch (err) {
      err.name = commonErrors.chargeDAODeleteManyByUserObjIdError;
      throw err;
    }
  },
  deleteManyByUserObjIdAndPaymentKey: async (userObjId, paymentKey) => {
    try {
      const result = await Charge?.deleteMany({
        userInfo: userObjId,
        paymentKey: paymentKey,
      })?.lean();
      return result;
    } catch (err) {
      err.name = commonErrors.chargeDAODeleteManyByUserObjIdAndPaymentKeyError;
      throw err;
    }
  },
  deleteAll: async () => {
    try {
      const result = await Charge?.deleteMany({})?.lean();
      return result;
    } catch (err) {
      err.name = commonErrors.chargeDAODeleteAllError;
      throw err;
    }
  },
  updateByObjId: async (chargeObjId, updateForm) => {
    try {
      const result = await Charge?.updateOne(
        { _id: chargeObjId },
        { ...updateForm }
      );
      return result;
    } catch (err) {
      err.name = commonErrors.chargeDAOUpdateByObjIdError;
      throw err;
    }
  },
  updateByUserObjId: async (userObjId, updateForm) => {
    try {
      const result = await Charge?.updateOne(
        { userInfo: userObjId },
        { ...updateForm }
      );
      return result;
    } catch (err) {
      err.name = commonErrors.chargeDAOUpdateByUserObjIdError;
      throw err;
    }
  },
};
module.exports = chargeDAO;
