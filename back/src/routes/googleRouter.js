const googleRouter = require("express").Router();
const checkTokenWithRefresh = require("../middlewares/checkTokenWithRefresh");
const { googleController } = require("../MVC/controller/index");
module.exports = googleRouter;
