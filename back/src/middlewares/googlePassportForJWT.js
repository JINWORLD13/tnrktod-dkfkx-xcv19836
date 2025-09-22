const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { userService } = require("../MVC/service");
const {
  getGoogleAccessToken,
  getGoogleRefreshToken,
} = require("../misc/getGoogleToken");
const jwt = require("../misc/jwt");
const useragent = require("useragent");
const areObjectsEqual = require("../misc/areObjectsEqual");
passport.use(
  "google",
  new GoogleStrategy(
    {
      authorizationURL: process.env.GOOGLE_AUTH_URL,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_SIGN_REDIRECT_URI,
      passReqToCallback: true,
    },
    async function (req, accessToken, refreshToken, profile, done) {
      if (process.env.NODE_ENV === "DEVELOPMENT") {
        console.log("googlePassportForJWT 작동");
      }
      try {
        const agent = useragent.parse(req?.headers?.["user-agent"]);
        const user = {
          id: profile?.id, 
          email: profile?.emails[0]?.value,
          displayName: profile?.displayName,
          profilePictureUrl: profile?.photos[0]?.value,
          userAgent:
            {
              deviceType: agent.device.toString(),
              os: agent.os.toString(),
              browser: agent.toAgent(),
              login: new Date()
            } || {},
          ipAdd: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        };
        const userInDB = await userService.getUserById(user.id);
        let newUserInDB;
        let updatedUserInDB;
        const userWithTokens = { ...user, accessToken, refreshToken };
        if (userInDB === undefined || userInDB === null) {
          newUserInDB = await userService.createUser(userWithTokens);
        } else {
          const oldUser = {
            id: userInDB?.id,
            email: userInDB?.email,
            displayName: userInDB?.displayName,
            profilePictureUrl: userInDB?.profilePictureUrl,
            accessToken: userInDB?.accessToken,
            refreshToken: userInDB?.refreshToken,
            userAgent: userInDB?.userAgent || {},
            ipAdd: userInDB?.ipAdd || "",
          };
          if (!areObjectsEqual(userWithTokens, oldUser)) {
            updatedUserInDB = await userService.updateUser(userWithTokens);
          }
        }
        const googleAccessToken = await getGoogleAccessToken(user.id);
        const googleRefreshToken = await getGoogleRefreshToken(user.id);
        const userInfo = newUserInDB || updatedUserInDB || userInDB;
        const token = jwt.sign(userInfo);
        const JWTAccessToken = token?.accessToken;
        const JWTRefreshToken = token?.refreshToken;
        done(null, {
          id: profile.id,
          gAccessTokenCosmos: googleAccessToken,
          gRefreshTokenCosmos: googleRefreshToken,
          accessTokenCosmos: JWTAccessToken,
          refreshTokenCosmos: JWTRefreshToken,
        });
      } catch (err) {
        console.error(err);
        done(err);
      }
    }
  )
);
const googlePassport = passport;
module.exports = googlePassport;
