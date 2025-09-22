const { chargeDAO, userDAO } = require("../DAO/index");
const commonErrors = require("../../misc/commonErrors");
class ChargeService {
  async createChargeForTossPrePayment(chargePreInfo) {
    try {
      const chargeInDB = await chargeDAO.findByOrderId(chargePreInfo?.orderId);
      if (chargeInDB !== null && chargeInDB !== undefined) {
        throw new Error(commonErrors.chargePreInfoConflictError);
      } else {
        const newCharge = await chargeDAO.createPreChargeForToss(chargePreInfo);
        return newCharge;
      }
    } catch (err) {
      if (err.name === commonErrors.chargeDAOFindByOrderIdError) throw err;
      if (err.name === commonErrors.chargeDAOCreateError) throw err;
      err.name = commonErrors.chargeServiceCreateChargeForTossPrePayment;
      if (err.message === commonErrors.chargePreInfoConflictError)
        err.statusCode = 409;
      throw err;
    }
  }
  async createChargeForAndroidGooglePlay(chargePreInfo) {
    try {
      const chargeInDB = await chargeDAO.findByOrderId(chargePreInfo?.orderId);
      if (chargeInDB !== null && chargeInDB !== undefined) {
        throw new Error(commonErrors.chargePreInfoConflictError);
      } else {
        const newCharge = await chargeDAO.createChargeForGooglePlay(
          chargePreInfo
        );
        return newCharge;
      }
    } catch (err) {
      if (err.name === commonErrors.chargeDAOFindByOrderIdError) throw err;
      if (err.name === commonErrors.chargeDAOCreateError) throw err;
      err.name = commonErrors.chargeServiceCreateChargeForAndroidGooglePlay;
      if (err.message === commonErrors.chargePreInfoConflictError)
        err.statusCode = 409;
      throw err;
    }
  }
  async getChargeByObjId(chargeObjId) {
    try {
      const chargeInDB = await chargeDAO.findByObjId(chargeObjId);
      return chargeInDB;
    } catch (err) {
      if (err.name === commonErrors.chargeDAOFindByObjIdError) throw err;
      err.name = commonErrors.chargeServiceGetChargeByObjIdError;
      throw err;
    }
  }
  async getChargesByProductId(productId) {
    try {
      const chargeInDB = await chargeDAO.findManyByProductId(productId);
      return chargeInDB;
    } catch (err) {
      if (err.name === commonErrors.chargeDAOFindManyByProductIdError) throw err;
      err.name = commonErrors.chargeServiceGetChargesByProductIdError;
      throw err;
    }
  }
  async getChargeByOrderId(orderId) {
    try {
      const chargeInDB = await chargeDAO.findByOrderId(orderId);
      return chargeInDB;
    } catch (err) {
      if (err.name === commonErrors.chargeDAOFindByObjIdError) throw err;
      err.name = commonErrors.chargeServiceGetChargeByOrderIdError;
      throw err;
    }
  }
  async getChargeByUserObjId(userObjId) {
    try {
      const chargeInDB = await chargeDAO.findByUserObjId(userObjId);
      return chargeInDB;
    } catch (err) {
      if (err.name === commonErrors.chargeDAOFindByUserObjIdError) throw err;
      err.name = commonErrors.chargeServiceGetChargeByUserObjIdError;
      throw err;
    }
  }
  async getChargesByUserObjId(userObjId) {
    try {
      const chargeArrInDB = await chargeDAO.findManyByUserObjId(userObjId);
      return chargeArrInDB;
    } catch (err) {
      if (err.name === commonErrors.chargeDAOFindManyByUserObjIdError)
        throw err;
      err.name = commonErrors.chargeServiceGetChargesByUserObjIdError;
      if (err.message === commonErrors.chargesInfoNotFoundError)
        err.statusCode = 404;
      throw err;
    }
  }
  async getChargesByCurrency(currency) {
    try {
      const chargeArrInDB = await chargeDAO.findManyByCurrency(currency);
      return chargeArrInDB;
    } catch (err) {
      if (err.name === commonErrors.chargeDAOFindManyByCurrencyError) throw err;
      err.name = commonErrors.chargeServiceGetChargesByCurrencyError;
      if (err.message === commonErrors.chargesInfoNotFoundError)
        err.statusCode = 404;
      throw err;
    }
  }
  async deleteChargeByOrderId(orderId) {
    try {
      const chargeInDB = await chargeDAO.findByOrderId(orderId);
      if (chargeInDB !== null && chargeInDB !== undefined) {
        const deletedCharge = await chargeDAO.deleteByObjId(chargeInDB._id);
        return deletedCharge;
      } else {
        throw new Error(commonErrors.chargeInfoNotFoundError);
      }
    } catch (err) {
      if (err.name === commonErrors.chargeDAOFindByOrderIdError) throw err;
      if (err.name === commonErrors.chargeDAODeleteByOrderIdError) throw err;
      err.name = commonErrors.chargeServiceDeleteChargeByOrderIdError;
      if (err.message === commonErrors.chargeInfoNotFoundError)
        err.statusCode = 404;
      throw err;
    }
  }
  async deleteChargeByObjId(chargeObjId) {
    try {
      const chargeInDB = await chargeDAO.findByObjId(chargeObjId);
      if (chargeInDB !== null && chargeInDB !== undefined) {
        const deletedCharge = await chargeDAO.deleteByObjId(chargeInDB._id);
        return deletedCharge;
      } else {
        throw new Error(commonErrors.chargeInfoNotFoundError);
      }
    } catch (err) {
      if (err.name === commonErrors.chargeDAOFindByObjIdError) throw err;
      if (err.name === commonErrors.chargeDAODeleteByObjIdError) throw err;
      err.name = commonErrors.chargeServiceDeleteChargeByObjIdError;
      if (err.message === commonErrors.chargeInfoNotFoundError)
        err.statusCode = 404;
      throw err;
    }
  }
  async deleteChargesByUserObjId(userObjId) {
    try {
      const chargeArrInDB = await chargeDAO.findManyByUserObjId(userObjId);
      if (chargeArrInDB !== null && chargeArrInDB !== undefined) {
        const result = await chargeDAO.deleteManyByUserObjId(userObjId);
        return result;
      } else {
        throw new Error(commonErrors.chargesInfoNotFoundError);
      }
    } catch (err) {
      if (err.name === commonErrors.chargeDAOFindManyByUserObjIdError)
        throw err;
      if (err.name === commonErrors.chargeDAODeleteManyByObjIdError) throw err;
      err.name = commonErrors.chargeServiceDeleteChargesByUserObjIdError;
      if (err.message === commonErrors.chargesInfoNotFoundError)
        err.statusCode = 404;
      throw err;
    }
  }
  async deleteChargeByUserObjIdAndPaymentKey(userObjId, paymentKey) {
    try {
      const chargeArrInDB = await chargeDAO.findManyByUserObjId(userObjId);
      if (chargeArrInDB !== null && chargeArrInDB !== undefined) {
        const result = await chargeDAO.deleteManyByUserObjIdAndPaymentKey(
          userObjId,
          paymentKey
        );
        return result;
      } else {
        throw new Error(commonErrors.chargesInfoNotFoundError);
      }
    } catch (err) {
      if (err.name === commonErrors.chargeDAOFindManyByUserObjIdError)
        throw err;
      if (
        err.name ===
        commonErrors.chargeDAODeleteManyByUserObjIdAndPaymentKeyError
      )
        throw err;
      err.name =
        commonErrors.chargeServiceDeleteChargesByUserObjIdAndPaymentKeyError;
      if (err.message === commonErrors.chargesInfoNotFoundError)
        err.statusCode = 404;
      throw err;
    }
  }
  async deleteChargesByObjIdArr(chargeObjIdArr) {
    try {
      const chargeArrInDB = await chargeDAO.findByObjIdArr(chargeObjIdArr);
      if (
        chargeArrInDB !== null &&
        chargeArrInDB !== undefined &&
        chargeArrInDB.length > 0
      ) {
        const deletedCharge = await chargeDAO.deleteByObjIdArr(chargeObjIdArr);
        return deletedCharge;
      } else {
        throw new Error(commonErrors.chargeInfoNotFoundError);
      }
    } catch (err) {
      if (err.name === commonErrors.chargeDAOFindByObjIdArrError) throw err;
      if (err.name === commonErrors.chargeDAODeleteByObjIdError) throw err;
      err.name = commonErrors.chargeServiceDeleteChargesByObjIdArrError;
      if (err.message === commonErrors.chargeInfoNotFoundError)
        err.statusCode = 404;
      throw err;
    }
  }
  async putChargeByOrderId(orderId, updateForm) {
    try {
      const chargeInDB = await chargeDAO.findByOrderId(orderId);
      if (chargeInDB !== null && chargeInDB !== undefined) {
        const updatedCharge = await chargeDAO.updateByObjId(
          chargeInDB._id,
          updateForm
        );
        return updatedCharge;
      } else {
        throw new Error(commonErrors.chargeInfoNotFoundError);
      }
    } catch (err) {
      if (err.name === commonErrors.chargeDAOFindByObjIdError) throw err;
      if (err.name === commonErrors.chargeDAOUpdateByObjIdError) throw err;
      err.name = commonErrors.chargeServicePutChargeByOrderIdError;
      if (err.message === commonErrors.chargeInfoNotFoundError)
        err.statusCode = 404;
      throw err;
    }
  }
  async putChargeByUserObjId(userObjId, updateForm) {
    try {
      const chargeInDB = await chargeDAO.findByUserObjId(userObjId);
      if (chargeInDB !== null && chargeInDB !== undefined) {
        const updatedCharge = await chargeDAO.updateByObjId(
          chargeInDB._id,
          updateForm
        );
        return updatedCharge;
      } else {
        throw new Error(commonErrors.chargeInfoNotFoundError);
      }
    } catch (err) {
      if (err.name === commonErrors.chargeDAOFindByObjIdError) throw err;
      if (err.name === commonErrors.chargeDAOUpdateByObjIdError) throw err;
      err.name = commonErrors.chargeServicePutChargeByObjIdError;
      if (err.message === commonErrors.chargeInfoNotFoundError)
        err.statusCode = 404;
      throw err;
    }
  }
}
const chargeService = new ChargeService();
module.exports = chargeService;
