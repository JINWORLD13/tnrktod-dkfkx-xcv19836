const { tarotDAO, userDAO } = require("../DAO/index");
const commonErrors = require("../../misc/commonErrors");
const passwordCheckRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
class TarotService {
  async createTarot(tarotInfo) {
    try {
      const tarotInDB = await tarotDAO.findByAnswer(tarotInfo?.answer);
      if (tarotInDB !== null && tarotInDB !== undefined) {
        throw new Error(commonErrors.tarotInfoConflictError);
      } else {
        const newTarot = await tarotDAO.create(tarotInfo);
        return newTarot;
      }
    } catch (err) {
      if (err.name === commonErrors.tarotDAOFindByAnswerError) throw err;
      if (err.name === commonErrors.tarotDAOCreateError) throw err;
      err.name = commonErrors.tarotServiceCreateTarotError;
      if (err.message === commonErrors.tarotInfoConflictError)
        err.stausCode = 409;
      throw err;
    }
  }
  async getTarotById(tarotId) {
    try {
      const tarotInDB = await tarotDAO.findById(tarotId);
      if (tarotInDB !== null && tarotInDB !== undefined) {
        return tarotInDB;
      } else {
        throw new Error(commonErrors.tarotInfoNotFoundError);
      }
    } catch (err) {
      if (err.name === commonErrors.tarotDAOFindByIdError) throw err;
      err.name = commonErrors.tarotServiceGetTarotByIdError;
      if (err.message === commonErrors.tarotInfoNotFoundError)
        err.stausCode = 404;
      throw err;
    }
  }
  async getTarotsById(tarotId) {
    try {
      const tarotArrInDB = await tarotDAO.findManyById(tarotId);
      if (tarotArrInDB !== null && tarotArrInDB !== undefined) {
        return tarotArrInDB;
      } else {
        throw new Error(commonErrors.tarotsInfoNotFoundError);
      }
    } catch (err) {
      if (err.name === commonErrors.tarotDAOFindManyByIdError) throw err;
      err.name = commonErrors.tarotServiceGetTarotsByIdError;
      if (err.message === commonErrors.tarotsInfoNotFoundError)
        err.stausCode = 404;
      throw err;
    }
  }
  async getHistoryByUserId(userObjId) {
    try {
      const tarotArrInDB = await tarotDAO.findManyByUserId(userObjId);
      if (tarotArrInDB !== null && tarotArrInDB !== undefined) {
        return tarotArrInDB;
      } else {
        throw new Error(commonErrors.tarotsInfoNotFoundError);
      }
    } catch (err) {
      if (err.name === commonErrors.tarotDAOFindManyByUserIdError) throw err;
      err.name = commonErrors.tarotServiceGetHistoryByUserIdError;
      if (err.message === commonErrors.tarotsInfoNotFoundError)
        err.stausCode = 404;
      throw err;
    }
  }
  async getTarotsBySpread(spreadInfo) {
    try {
      const tarotArrInDB = await tarotDAO.findManyBySpread(spreadInfo);
      if (tarotArrInDB !== null && tarotArrInDB !== undefined) {
        return tarotArrInDB;
      } else {
        throw new Error(commonErrors.tarotsInfoNotFoundError);
      }
    } catch (err) {
      if (err.name === commonErrors.tarotDAOFindManyBySpreadError) throw err;
      err.name = commonErrors.tarotServiceGetTarotsBySpreadError;
      if (err.message === commonErrors.tarotsInfoNotFoundError)
        err.stausCode = 404;
      throw err;
    }
  }
  async deleteTarotByAnswer(tarotAnswer) {
    try {
      const tarotInDB = await tarotDAO.findByAnswer(tarotAnswer);
      if (tarotInDB !== null && tarotInDB !== undefined) {
        const deletedTarot = await tarotDAO.deleteById(tarotInDB._id);
        return deletedTarot;
      } else {
        throw new Error(commonErrors.tarotInfoNotFoundError);
      }
    } catch (err) {
      if (err.name === commonErrors.tarotDAOFindByAnswerError) throw err;
      if (err.name === commonErrors.tarotDAODeleteByIdError) throw err;
      err.name = commonErrors.tarotServiceDeleteTarotsByUserObjIdError;
      if (err.message === commonErrors.tarotInfoNotFoundError)
        err.stausCode = 404;
      throw err;
    }
  }
  async deleteTarotsByAnswerArr(tarotAnswerArr) {
    try {
      const tarotArrInDB = await tarotDAO.findByAnswerArr(tarotAnswerArr);
      const tarotIdArr = [];
      if (
        tarotArrInDB !== null &&
        tarotArrInDB !== undefined &&
        tarotArrInDB.length > 0
      ) {
        tarotArrInDB.map((tarotInDB, i) => {
          tarotIdArr.push(tarotInDB._id);
        });
        const deletedTarot = await tarotDAO.deleteManyByIdArr(tarotIdArr);
        return deletedTarot;
      } else {
        throw new Error(commonErrors.tarotInfoNotFoundError);
      }
    } catch (err) {
      if (err.name === commonErrors.tarotDAOFindByAnswerError) throw err;
      if (err.name === commonErrors.tarotDAODeleteByIdError) throw err;
      err.name = commonErrors.tarotServiceDeleteTarotByAnswerError;
      if (err.message === commonErrors.tarotInfoNotFoundError)
        err.stausCode = 404;
      throw err;
    }
  }
  async deleteTarotsByUserObjId(userObjId) {
    try {
      const tarotArrInDB = await tarotDAO.findManyByUserId(userObjId);
      if (tarotArrInDB !== null && tarotArrInDB !== undefined) {
        const result = await tarotDAO.deleteManyByUserId(userObjId);
        return result;
      } else {
        throw new Error(commonErrors.tarotsInfoNotFoundError);
      }
    } catch (err) {
      if (err.name === commonErrors.tarotDAOFindManyByUserIdError) throw err;
      if (err.name === commonErrors.tarotDAODeleteManyByIdError) throw err;
      err.name = commonErrors.tarotServiceDeleteTarotsByUserObjIdError;
      if (err.message === commonErrors.tarotsInfoNotFoundError)
        err.stausCode = 404;
      throw err;
    }
  }
  async deleteTarotsBySpread(spreadInfo) {
    try {
      const tarotArrInDB = await tarotDAO.findManyBySpread(spreadInfo);
      if (tarotArrInDB !== null && tarotArrInDB !== undefined) {
        const deletedTarots = await tarotDAO.deleteManyBySpread(spreadInfo);
        return deletedTarots;
      } else {
        throw new Error(commonErrors.tarotsInfoNotFoundError);
      }
    } catch (err) {
      if (err.name === commonErrors.tarotDAOFindManyBySpreadError) throw err;
      if (err.name === commonErrors.tarotDAODeleteManyBySpreadError) throw err;
      err.name = commonErrors.tarotServiceDeleteTarotsBySpreadError;
      if (err.message === commonErrors.tarotsInfoNotFoundError)
        err.stausCode = 404;
      throw err;
    }
  }
}
const tarotService = new TarotService();
module.exports = tarotService;
