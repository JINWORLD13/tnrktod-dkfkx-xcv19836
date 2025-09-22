const jwt = require("../misc/jwt");
const { userController } = require("../MVC/controller");
const { buildResponse } = require("../misc/util");
const AppError = require("../misc/AppError");
const {
  getGoogleAccessToken,
  getGoogleRefreshToken,
} = require("../misc/getGoogleToken");
const { userService } = require("../MVC/service");
const createAndSendTokens = async (req, res, next, redirectUri) => {
  try {
    const userId = req?.user?.id || req?.user;
    const googleAccessToken = await getGoogleAccessToken(userId);
    const googleRefreshToken = await getGoogleRefreshToken(userId);
    const userInfo = await userService.getUserById(userId);
    const token = jwt.sign(userInfo);
    const JWTAccessToken = token?.accessToken;
    const JWTRefreshToken = token?.refreshToken;
    const maxAge = 2 * 7 * 24 * 60 * 60 * 1000; 
    if (
      redirectUri &&
      redirectUri.startsWith("cosmostarot:
    ) {
      const queryParams = new URLSearchParams({
        cos: JWTAccessToken,
        sin: JWTRefreshToken,
      });
      res.redirect(`${redirectUri}?${queryParams.toString()}`);
    } else {
      if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.cookie("gAccessTokenCosmos", googleAccessToken, {
          maxAge
        });
        res.cookie("gRefreshTokenCosmos", googleRefreshToken, {
          maxAge
        });
        res.cookie("accessTokenCosmos", JWTAccessToken, {
          maxAge
        });
        res.cookie("refreshTokenCosmos", JWTRefreshToken, {
          maxAge
        }); 
      } else if (process.env.NODE_ENV === 'PRODUCTION'){
        res.cookie("gAccessTokenCosmos", googleAccessToken, {
          maxAge,
          secure: true, 
        });
        res.cookie("gRefreshTokenCosmos", googleRefreshToken, {
          maxAge,
          secure: true,
        });
        res.cookie("accessTokenCosmos", JWTAccessToken, {
          maxAge,
          secure: true,
        });
        res.cookie("refreshTokenCosmos", JWTRefreshToken, {
          maxAge,
          secure: true,
        });
      }
      res.redirect(process.env.CLIENT_URL);
    }
  } catch (err) {
    next(new AppError(err.name, err.message, 401));
  }
};
module.exports = createAndSendTokens;
