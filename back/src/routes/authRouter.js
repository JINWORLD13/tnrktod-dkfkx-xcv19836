const authRouter = require("express").Router();
const googlePassport = require("../middlewares/googlePassportForJWT");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const createAndSendTokens = require("../middlewares/createAndSendTokens");
let xClientType;
let clientType;
let redirectUri;
authRouter.get(
  "/google/sign",
  (req, res, next) => {
    xClientType = req?.headers["x-client-type"] || "";
    clientType = req?.query?.clientType || ""; 
    redirectUri = req?.query?.redirect_uri || ""; 
    next();
  },
  googlePassport.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "offline", 
    prompt: "consent", 
  })
);
authRouter.get(
  "/google/sign/callback",
  googlePassport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/google/sign/fail",
  }),
  (req, res, next) => createAndSendTokens(req, res, next, redirectUri)
);
authRouter.get("/google/sign/fail", (req, res, next) => {
  if (redirectUri && redirectUri.startsWith("cosmostarot:
    res.redirect(`${redirectUri}`);
  } else {
    res.redirect(process.env.CLIENT_URL);
  }
});
authRouter.get("/google/logout", (req, res, next) => {
  try {
    res.clearCookie("gAccessTokenCosmos");
    res.clearCookie("gRefreshTokenCosmos");
    res.clearCookie("accessTokenCosmos");
    res.clearCookie("refreshTokenCosmos");
    if (
      redirectUri &&
      redirectUri.startsWith("cosmostarot:
    ) {
      res.redirect(`${redirectUri}`);
    } else {
      res.redirect(process.env.CLIENT_URL);
    }
  } catch (err) {
    console.log(err);
    next(new AppError(err.name, err.message, 401));
  }
});
module.exports = authRouter;
