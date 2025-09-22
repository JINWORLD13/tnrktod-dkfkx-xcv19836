const userRouter = require("express").Router();
const { userController } = require("../MVC/controller/index");
const checkTokenWithRefresh = require("../middlewares/checkTokenWithRefresh");
userRouter.get(
  "/userinfo",
  checkTokenWithRefresh,
  userController.getUserById
);
userRouter.delete(
  "/userinfo/withdraw",
  checkTokenWithRefresh,
  userController.deleteUser
);
userRouter.put(
  "/userinfo/change",
  checkTokenWithRefresh,
  userController.putUser
);
module.exports = userRouter;
