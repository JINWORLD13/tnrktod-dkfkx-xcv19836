const jwt = require("jsonwebtoken");
const AppError = require("./AppError");
const secretKey = require("../config/secretKey").secretKey;
const accessTokenOption = require("../config/secretKey").accessTokenOption;
const refreshTokenOption = require("../config/secretKey").refreshTokenOption;
module.exports = {
  sign: (user) => {
    const accessTokenPayload = {
      type: "access",
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        profilePictureUrl: user.profilePictureUrl,
        role: user.role,
      },
    };
    const refreshTokenPayload = {
      type: "refresh",
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        profilePictureUrl: user.profilePictureUrl,
        role: user.role,
      },
      canRefresh: true,
    };
    const result = {
      accessToken: jwt.sign(accessTokenPayload, secretKey, accessTokenOption),
      refreshToken: jwt.sign(
        refreshTokenPayload,
        secretKey,
        refreshTokenOption
      ),
    };
    return result;
  },
  verify: (token) => {
    let decodedPayload;
    try {
      decodedPayload = jwt.verify(token, secretKey);
    } catch (error) {
      return { error };
    }
    return decodedPayload;
  },
  refreshVerify: (refreshToken, userId) => {
    if (!refreshToken)
      throw new AppError(
        "no refresh token",
        "리프레시 토큰이 없습니다. 다시 로그인 해주세요.",
        401
      );
    return jwt.verify(refreshToken, secretKey, (error, result) => {
      if (error) return { error }; 
      if (result.user.id === userId) {
        const accessTokenPayload = {
          type: "access",
          user: {
            id: result.user.id,
            email: result.user.email,
            displayName: result.user.displayName,
            profilePictureUrl: result.user.profilePictureUrl,
            role: result.user.role,
          },
        };
        const newAccessToken = jwt.sign(
          accessTokenPayload,
          secretKey,
          accessTokenOption
        );
        return { newAccessToken };
      }
    });
  },
};
