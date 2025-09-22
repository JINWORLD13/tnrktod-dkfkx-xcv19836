const { tarotController } = require("../MVC/controller/index");
const checkTokenWithRefresh = require("../middlewares/checkTokenWithRefresh");
const tarotRouter = require("express").Router();
tarotRouter.post(
  "/question/normal",
  checkTokenWithRefresh,
  tarotController.postQuestionForNormalToAI
);
tarotRouter.post(
  "/question/deep",
  checkTokenWithRefresh,
  tarotController.postQuestionForDeepToAI
);
tarotRouter.post(
  "/question/serious",
  checkTokenWithRefresh,
  tarotController.postQuestionForSeriousToAI
);
tarotRouter.get(
  "/history",
  checkTokenWithRefresh,
  tarotController.getHistory
);
tarotRouter.delete(
  "/delete",
  checkTokenWithRefresh,
  tarotController.deleteHistory
);
module.exports = tarotRouter;
