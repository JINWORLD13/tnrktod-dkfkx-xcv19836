const AppError = require("../misc/AppError");
const { buildResponse } = require("../misc/util");
const { verify, refreshVerify } = require("../misc/jwt");
const jwt = require("jsonwebtoken");
const checkTokenWithRefresh = async (req, res, next) => {
  try {
    if (req.headers["authorization"] && req.headers["refresh-token"]) {
      const accessToken = req.headers["authorization"].slice(7);
      const refreshToken = req.headers["refresh-token"];
      const accessVerifiedResult = verify(accessToken);
      const accessTokenPayload = jwt.decode(accessToken);
      if (accessTokenPayload === null || accessTokenPayload === undefined) {
        next(new AppError("unauthorization", "권한이 없습니다!", 401));
      }
      req.user = accessTokenPayload?.user.id;
      const refreshVerifiedResult = refreshVerify(
        refreshToken,
        accessTokenPayload?.user?.id
      );
      if (accessVerifiedResult?.error?.message === "jwt expired") {
        if (
          refreshVerifiedResult?.error?.message === "jwt expired" ||
          refreshVerifiedResult?.error?.message === "invalid token"
        ) {
          next(
            new AppError(
              "unauthorization",
              "다시 로그인해주시길 바랍니다.",
              401
            )
          );
        } else {
          const data = {
            newAccessToken: refreshVerifiedResult.newAccessToken,
          };
          res.status(200).json(buildResponse(data, 200, null));
        }
      } else {
        next();
      }
    } else {
      next(
        new AppError(
          "no tokens error",
          "Access Token 혹은 Refresh Token이 없습니다.",
          400
        )
      );
    }
  } catch (err) {
    next(err);
  }
};
module.exports = checkTokenWithRefresh;
