const Tarot = require("../../db/model/tarot");
const commonErrors = require("../../misc/commonErrors");
const { sanitizeObject } = require("../../misc/util");
const tarotDAO = {
  create: async (tarotInfo) => {
    try {
      const userObjId = tarotInfo?.userInfo?._id ?? null;
      const { userInfo, ...rest } = tarotInfo;
      const tarotInfoWithoutUserInfo = rest;
      const newTarot = new Tarot({
        ...tarotInfoWithoutUserInfo,
        userInfo: userObjId,
      });
      await newTarot.save();
      const populatedTarot = await Tarot?.findOne({
        _id: newTarot?._id,
      }).populate("userInfo");
      return populatedTarot?.toObject();
    } catch (err) {
      err.name = commonErrors.tarotDAOCreateError;
      throw err;
    }
  },
  findById: async (tarotId) => {
    try {
      const plainTarot = await Tarot?.findOne({ _id: tarotId })?.lean();
      return plainTarot;
    } catch (err) {
      err.name = commonErrors.tarotDAOFindByIdError;
      throw err;
    }
  },
  findByUserId: async (userObjId) => {
    try {
      const plainTarot = await Tarot?.findOne({ userInfo: userObjId })?.lean();
      return plainTarot;
    } catch (err) {
      err.name = commonErrors.tarotDAOFindByUserIdError;
      throw err;
    }
  },
  findByAnswer: async (tarotAnswer) => {
    try {
      const plainTarot = await Tarot?.findOne({ answer: tarotAnswer })?.lean();
      return plainTarot;
    } catch (err) {
      err.name = commonErrors.tarotDAOFindByAnswerError;
      throw err;
    }
  },
  findByAnswerArr: async (tarotAnswerArr) => {
    try {
      const plainTarotArr = tarotAnswerArr?.map(async (tarotAnswer, i) => {
        return await Tarot?.findOne({ answer: tarotAnswer })?.lean();
      });
      return plainTarotArr;
    } catch (err) {
      err.name = commonErrors.tarotDAOFindByAnswerError;
      throw err;
    }
  },
  findManyById: async (tarotId) => {
    try {
      const plainTarotArr = await Tarot?.find({ _id: tarotId });
      return plainTarotArr;
    } catch (err) {
      err.name = commonErrors.tarotDAOFindManyByIdError;
      throw err;
    }
  },
  findManyByUserId: async (userObjId) => {
    try {
      const plainTarotArr = await Tarot?.find({ userInfo: userObjId });
      const plainTarotArrWithoutObjId = plainTarotArr.map((tarot, i) => {
        const {
          questionInfo,
          spreadInfo,
          answer,
          language,
          createdAt,
          updatedAt,
          timeOfCounselling,
          ...rest
        } = tarot;
        return {
          questionInfo,
          spreadInfo,
          answer,
          language,
          createdAt,
          updatedAt,
          timeOfCounselling, 
        };
      });
      return plainTarotArrWithoutObjId;
    } catch (err) {
      err.name = commonErrors.tarotDAOFindManyByUserIdError;
      throw err;
    }
  },
  findManyBySpread: async (spreadInfo) => {
    try {
      const plainTarotArr = await Tarot?.find({ spreadInfo })?.lean();
      return plainTarotArr;
    } catch (err) {
      err.name = commonErrors.tarotDAOFindManyBySpreadError;
      throw err;
    }
  },
  findManyByLanguage: async (languageInfo) => {
    try {
      const plainTarotArr = await Tarot?.find({
        language: languageInfo,
      })?.lean();
      return plainTarotArr;
    } catch (err) {
      err.name = commonErrors.tarotDAOFindManyByLanguageError;
      throw err;
    }
  },
  deleteById: async (tarotId) => {
    try {
      const result = await Tarot?.deleteOne({ _id: tarotId });
      return result;
    } catch (err) {
      err.name = commonErrors.tarotDAODeleteByIdError;
      throw err;
    }
  },
  deleteManyByIdArr: async (tarotIdArr) => {
    try {
      const resultArr = [];
      await tarotIdArr.map((tarotId, i) => {
        const result = Tarot?.deleteOne({ _id: tarotId });
        resultArr.push(result);
      });
      return resultArr;
    } catch (err) {
      err.name = commonErrors.tarotDAODeleteManyByIdError;
      throw err;
    }
  },
  deleteManyByUserId: async (userObjId) => {
    try {
      const result = await Tarot?.deleteMany({
        userInfo: userObjId,
      })?.lean();
      return result;
    } catch (err) {
      err.name = commonErrors.tarotDAODeleteManyByUserInfoError;
      throw err;
    }
  },
  deleteManyBySpread: async (spreadInfo) => {
    try {
      const result = await Tarot?.deleteMany({ spreadInfo })?.lean();
      return result;
    } catch (err) {
      err.name = commonErrors.tarotDAODeleteManyBySpreadError;
      throw err;
    }
  },
  deleteAll: async () => {
    try {
      const result = await Tarot?.deleteMany({})?.lean();
      return result;
    } catch (err) {
      err.name = commonErrors.tarotDAODeleteAllError;
      throw err;
    }
  },
};
module.exports = tarotDAO;
