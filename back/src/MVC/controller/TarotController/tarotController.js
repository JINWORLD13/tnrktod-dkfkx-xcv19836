const postQuestionToAI = require("./handlers/postQuestionToAI");
const getTarotHistory = require("./handlers/getTarotHistory");
const deleteTarotHistory = require("./handlers/deleteTarotHistory");
const tarotController = {
  async postQuestionForNormalToAI(req, res, next) {
    await postQuestionToAI(req, res, next, 2);
  },
  async postQuestionForDeepToAI(req, res, next) {
    await postQuestionToAI(req, res, next, 3);
  },
  async postQuestionForSeriousToAI(req, res, next) {
    await postQuestionToAI(req, res, next, 4);
  },
  async getHistory(req, res, next) {
    await getTarotHistory(req, res, next);
  },
  async deleteHistory(req, res, next) {
    await deleteTarotHistory(req, res, next);
  },
};
module.exports = tarotController;
